// PeopleLabs Consulting — API server.
// Minimal Express service that receives contact-form submissions.
// Submissions are held in memory; swap in a database (e.g. MongoDB, per
// .env.example) when you're ready to persist them.
const express = require('express')

const app = express()
const PORT = process.env.PORT || 5050

app.use(express.json())

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
    company: (body.company || '').trim(),
    service: (body.service || '').trim(),
    message,
    receivedAt: new Date().toISOString(),
  }
  submissions.push(entry)
  console.log('New contact submission received:', entry)

  res.json({ ok: true })
})

app.listen(PORT, () => {
  console.log(`PeopleLabs API listening on http://localhost:${PORT}`)
})
