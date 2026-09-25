// PeopleLabs Consulting API server.
require('dotenv').config()

const express = require('express')
const multer = require('multer')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 5050
// Applications are always stored on the server so submissions never get lost,
// even when no SMTP mailbox is configured. This folder holds personal data and
// is git-ignored; retrieve it from the host or configure email delivery below.
const APPLICATIONS_DIR = path.join(__dirname, 'applications')
const MAX_RESUME_BYTES = 5 * 1024 * 1024
const allowedPositions = new Set([
  'Senior PeopleSoft FSCM Business Analyst',
  'PeopleSoft FSCM Business Analyst - Entry Level',
  'Technical Support Analyst',
])
const allowedExperience = new Set(['0–2 years', '3–6 years', '7+ years'])

// CORS: allow the deployed frontend (and local dev) to call the API directly.
const CORS_ORIGINS = new Set(
  (process.env.CORS_ORIGINS || 'https://peolelabs.vercel.app')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
    .concat(['http://localhost:5173', 'http://localhost:4173']),
)

app.use((req, res, next) => {
  const origin = req.headers.origin
  if (origin && (CORS_ORIGINS.has(origin) || /^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(origin))) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Vary', 'Origin')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    if (req.method === 'OPTIONS') return res.sendStatus(204)
  }
  next()
})

app.use(express.json({ limit: '16kb' }))

const submissions = []

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'peoplelabs-api' })
})

app.post('/api/contact', (req, res) => {
  const body = req.body || {}
  const name = (body.name || '').trim()
  const email = (body.email || '').trim()
  const message = (body.message || '').trim()

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ ok: false, error: 'Name, email and message are required.' })
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRe.test(email)) {
    return res.status(400).json({ ok: false, error: 'Invalid email address.' })
  }

  const entry = {
    name,
    email,
    phone: (body.phone || '').trim(),
    company: (body.company || '').trim(),
    service: (body.service || '').trim(),
    message,
    receivedAt: new Date().toISOString(),
  }
  submissions.push(entry)
  console.log('New contact submission received.')

  res.json({ ok: true })
})

const resumeUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_RESUME_BYTES,
    files: 1,
    fields: 8,
    fieldSize: 4000,
    parts: 9,
  },
  fileFilter(req, file, callback) {
    const hasPdfExtension = path.extname(file.originalname).toLowerCase() === '.pdf'
    if (file.mimetype !== 'application/pdf' || !hasPdfExtension) {
      return callback(null, false)
    }
    callback(null, true)
  },
})

function getCareersTransport() {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 587)
  const recipient = process.env.CAREERS_EMAIL
  const sender = process.env.CAREERS_FROM || process.env.SMTP_USER
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !recipient || !sender || !Number.isInteger(port) || port < 1 || port > 65535) {
    return null
  }
  if (Boolean(user) !== Boolean(pass)) return null

  const options = {
    host,
    port,
    secure: process.env.SMTP_SECURE === 'true' || (process.env.SMTP_SECURE !== 'false' && port === 465),
  }
  if (user && pass) options.auth = { user, pass }

  return { transporter: nodemailer.createTransport(options), recipient, sender }
}

function safeFilenameFor(originalname) {
  const cleaned = path.basename(originalname).replace(/[^a-zA-Z0-9._-]/g, '_').replace(/\.pdf$/i, '').slice(0, 110)
  return `${cleaned || 'resume'}.pdf`
}

// Persists one application (details + resume PDF) under applications/<id>/.
function storeApplication(record, file) {
  const id = `${new Date().toISOString().slice(0, 10)}-${crypto.randomBytes(4).toString('hex')}`
  const dir = path.join(APPLICATIONS_DIR, id)
  fs.mkdirSync(dir, { recursive: true })
  const resumeFile = safeFilenameFor(file.originalname)
  fs.writeFileSync(path.join(dir, resumeFile), file.buffer)
  fs.writeFileSync(path.join(dir, 'application.json'), `${JSON.stringify({ ...record, resumeFile }, null, 2)}\n`)
  fs.appendFileSync(path.join(APPLICATIONS_DIR, 'index.jsonl'), `${JSON.stringify({ id, ...record, resumeFile })}\n`)
  return { id, resumeFile }
}

function safeString(value) {
  return typeof value === 'string'
    ? value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim()
    : ''
}

function safeSingleLine(value) {
  return safeString(value).replace(/[\r\n\t]+/g, ' ')
}

app.post('/api/careers/apply', resumeUpload.single('resume'), async (req, res) => {
  const fullName = safeSingleLine(req.body?.fullName)
  const email = safeSingleLine(req.body?.email)
  const phone = safeSingleLine(req.body?.phone)
  const currentLocation = safeSingleLine(req.body?.currentLocation)
  const experienceLevel = safeSingleLine(req.body?.experienceLevel)
  const position = safeSingleLine(req.body?.position)
  const introduction = safeString(req.body?.introduction)

  if (!fullName || !email || !phone || !currentLocation || !experienceLevel || !position || !req.file) {
    return res.status(400).json({ ok: false, error: 'Please provide all required application fields and a PDF resume.' })
  }
  if (fullName.length > 120 || email.length > 254 || phone.length > 50 || currentLocation.length > 120 || introduction.length > 2000) {
    return res.status(400).json({ ok: false, error: 'One or more application fields exceed the allowed length.' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ ok: false, error: 'Please provide a valid email address.' })
  }
  if (!allowedPositions.has(position)) {
    return res.status(400).json({ ok: false, error: 'Please choose a valid position.' })
  }
  if (!allowedExperience.has(experienceLevel)) {
    return res.status(400).json({ ok: false, error: 'Please choose a valid experience level.' })
  }
  if (req.file.mimetype !== 'application/pdf' || req.file.buffer.subarray(0, 5).toString('ascii') !== '%PDF-') {
    return res.status(400).json({ ok: false, error: 'Resume must be a valid PDF file.' })
  }

  const record = {
    fullName,
    email,
    phone,
    currentLocation,
    experienceLevel,
    position,
    introduction,
    receivedAt: new Date().toISOString(),
  }

  let stored = null
  try {
    stored = storeApplication(record, req.file)
    console.log(`Careers application stored: ${stored.id}`)
  } catch (error) {
    console.error('Careers application storage failed:', error.message)
  }

  const delivery = getCareersTransport()
  const safeFilename = stored?.resumeFile || safeFilenameFor(req.file.originalname)
  const text = [
    'PeopleLabs Consulting careers application',
    '',
    `Applicant: ${fullName}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Current location: ${currentLocation}`,
    `Experience level: ${experienceLevel}`,
    `Position: ${position}`,
    '',
    'Brief introduction:',
    introduction || '(not provided)',
  ].join('\n')

  if (delivery) {
    try {
      await delivery.transporter.sendMail({
        from: delivery.sender,
        to: delivery.recipient,
        replyTo: email,
        subject: `Careers application: ${position}`,
        text,
        attachments: [{
          filename: safeFilename,
          content: req.file.buffer,
          contentType: 'application/pdf',
        }],
      })
      console.log('Careers application delivered by email.')
      return res.json({ ok: true, reference: stored?.id || null, emailed: true })
    } catch (error) {
      console.error('Careers application email delivery failed:', error.message)
      if (stored) {
        return res.json({ ok: true, reference: stored.id, emailed: false })
      }
      return res.status(502).json({ ok: false, error: 'Application submission is temporarily unavailable.' })
    }
  }

  if (stored) {
    return res.json({ ok: true, reference: stored.id, emailed: false })
  }
  return res.status(500).json({ ok: false, error: 'Application submission is temporarily unavailable.' })
})

app.use((error, req, res, next) => {
  if (req.path !== '/api/careers/apply') return next(error)

  if (error instanceof multer.MulterError) {
    const status = error.code === 'LIMIT_FILE_SIZE' ? 413 : 400
    const message = error.code === 'LIMIT_FILE_SIZE'
      ? 'Resume must be 5 MB or smaller.'
      : 'Please provide one PDF resume and valid application fields.'
    return res.status(status).json({ ok: false, error: message })
  }

  console.error('Careers application request failed:', error.message)
  return res.status(500).json({ ok: false, error: 'Application submission is temporarily unavailable.' })
})

app.listen(PORT, () => {
  console.log(`PeopleLabs API listening on http://localhost:${PORT}`)
})
