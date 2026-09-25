import { useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Icon from './Icon.jsx'
import { applicationPositions } from '../data/careers.js'
import { company } from '../data/content.js'
import { celebrate } from './fx/celebrate.js'

const MAX_RESUME_BYTES = 5 * 1024 * 1024
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const initialValues = {
  fullName: '',
  email: '',
  phone: '',
  currentLocation: '',
  experienceLevel: '',
  introduction: '',
}

function validateResume(file) {
  if (!file) return 'Please attach your resume as a PDF.'
  if (!file.name.toLowerCase().endsWith('.pdf') || file.type !== 'application/pdf') {
    return 'Resume must be a PDF file.'
  }
  if (!file.size) return 'The selected PDF is empty. Please choose another file.'
  if (file.size > MAX_RESUME_BYTES) return 'Resume must be 5 MB or smaller.'
  return ''
}

function formatFileSize(bytes) {
  return bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function fieldClass(hasError = false) {
  return `mt-2 block w-full rounded-lg border bg-slate-50 px-3.5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 ${hasError ? 'border-red-500' : 'border-slate-200'}`
}

export default function CareerApplicationForm({
  selectedPosition,
  onPositionChange,
  highlightPosition,
  positionRef,
  formRef,
  onApplicationSubmitted,
}) {
  const [values, setValues] = useState(initialValues)
  const [resume, setResume] = useState(null)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [reference, setReference] = useState('')
  const [submissionMessage, setSubmissionMessage] = useState('')
  const [dragging, setDragging] = useState(false)
  const reduceMotion = useReducedMotion()
  const fileInputRef = useRef(null)

  function setFieldError(field, message) {
    setErrors((current) => ({ ...current, [field]: message }))
  }

  function handleChange(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setStatus('idle')
    setErrors((current) => {
      if (!current[name]) return current
      const next = { ...current }
      delete next[name]
      return next
    })
  }

  function handlePositionChange(event) {
    onPositionChange(event.target.value)
    setStatus('idle')
    setErrors((current) => {
      if (!current.position) return current
      const next = { ...current }
      delete next.position
      return next
    })
  }

  function chooseResume(file) {
    const message = validateResume(file)
    setFieldError('resume', message)
    setStatus('idle')
    if (message) {
      setResume(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
      return
    }
    setResume(file)
  }

  function removeResume() {
    setResume(null)
    setFieldError('resume', '')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function validateForm() {
    const nextErrors = {}
    if (!values.fullName.trim()) nextErrors.fullName = 'Please enter your full name.'
    else if (values.fullName.trim().length < 2) nextErrors.fullName = 'Please enter at least two characters.'

    if (!values.email.trim()) nextErrors.email = 'Please enter your email address.'
    else if (!EMAIL_RE.test(values.email.trim())) nextErrors.email = 'Please enter a valid email address.'

    if (!values.phone.trim()) nextErrors.phone = 'Please enter your phone number.'
    else if (values.phone.trim().length < 7) nextErrors.phone = 'Please enter a valid phone number.'

    if (!values.currentLocation.trim()) nextErrors.currentLocation = 'Please enter your current location.'
    if (!values.experienceLevel) nextErrors.experienceLevel = 'Please select your experience level.'
    if (!selectedPosition) nextErrors.position = 'Please select a position.'

    const resumeError = validateResume(resume)
    if (resumeError) nextErrors.resume = resumeError

    setErrors(nextErrors)
    return nextErrors
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validateForm()
    if (Object.keys(nextErrors).length) {
      const firstField = Object.keys(nextErrors)[0]
      const target = firstField === 'position' ? positionRef.current : document.getElementById(`application-${firstField}`)
      target?.focus()
      return
    }

    setStatus('submitting')
    setSubmissionMessage('')
    const payload = new FormData()
    payload.append('fullName', values.fullName.trim())
    payload.append('email', values.email.trim())
    payload.append('phone', values.phone.trim())
    payload.append('currentLocation', values.currentLocation.trim())
    payload.append('experienceLevel', values.experienceLevel)
    payload.append('position', selectedPosition)
    payload.append('introduction', values.introduction.trim())
    payload.append('resume', resume, resume.name)

    try {
      const response = await fetch('/api/careers/apply', { method: 'POST', body: payload })
      const result = await response.json().catch(() => null)
      if (!response.ok || !result?.ok) {
        setSubmissionMessage(result?.error || 'Your application could not be sent right now.')
        setStatus('error')
        return
      }
      setStatus('success')
      setReference(typeof result?.reference === 'string' ? result.reference : '')
      celebrate()
      setSubmissionMessage('')
      setValues(initialValues)
      setResume(null)
      setErrors({})
      if (fileInputRef.current) fileInputRef.current.value = ''
      onApplicationSubmitted()
    } catch {
      setSubmissionMessage('We could not reach the application service. Please try again shortly.')
      setStatus('error')
    }
  }

  function handleDrop(event) {
    event.preventDefault()
    setDragging(false)
    chooseResume(event.dataTransfer.files?.[0] ?? null)
  }

  const positionError = selectedPosition ? '' : errors.position
  const fieldError = (name) => errors[name]
    ? <p id={`application-error-${name}`} className="mt-1.5 text-sm font-medium text-red-600" role="alert">{errors[name]}</p>
    : null

  return (
    <div ref={formRef} id="application-form" className="scroll-mt-28">
      <form onSubmit={handleSubmit} noValidate className="border-beam rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/5 [--beam-radius:1rem] sm:p-7 lg:p-8">
        <div className="mb-6 text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-sky-700">Careers</p>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Apply Now</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Interested in joining PeopleLabs Consulting? Submit your application for one of our current opportunities.
          </p>
        </div>

        <div className="grid gap-x-4 gap-y-4 sm:grid-cols-2">
          <div className="form-field group">
            <label htmlFor="application-fullName" className="block text-xs font-bold uppercase tracking-wide text-slate-700 transition-colors group-focus-within:text-sky-700">Full Name <span className="text-red-600">*</span></label>
            <input id="application-fullName" name="fullName" autoComplete="name" maxLength={120} value={values.fullName} onChange={handleChange} className={fieldClass(Boolean(errors.fullName))} aria-invalid={errors.fullName ? 'true' : undefined} aria-describedby={errors.fullName ? 'application-error-fullName' : undefined} required />
            {fieldError('fullName')}
          </div>
          <div className="form-field group">
            <label htmlFor="application-email" className="block text-xs font-bold uppercase tracking-wide text-slate-700 transition-colors group-focus-within:text-sky-700">Email Address <span className="text-red-600">*</span></label>
            <input id="application-email" name="email" type="email" autoComplete="email" maxLength={254} value={values.email} onChange={handleChange} className={fieldClass(Boolean(errors.email))} aria-invalid={errors.email ? 'true' : undefined} aria-describedby={errors.email ? 'application-error-email' : undefined} required />
            {fieldError('email')}
          </div>
          <div className="form-field group">
            <label htmlFor="application-phone" className="block text-xs font-bold uppercase tracking-wide text-slate-700 transition-colors group-focus-within:text-sky-700">Phone Number <span className="text-red-600">*</span></label>
            <input id="application-phone" name="phone" type="tel" autoComplete="tel" maxLength={50} value={values.phone} onChange={handleChange} className={fieldClass(Boolean(errors.phone))} aria-invalid={errors.phone ? 'true' : undefined} aria-describedby={errors.phone ? 'application-error-phone' : undefined} required />
            {fieldError('phone')}
          </div>
          <div className="form-field group">
            <label htmlFor="application-currentLocation" className="block text-xs font-bold uppercase tracking-wide text-slate-700 transition-colors group-focus-within:text-sky-700">Current Location <span className="text-red-600">*</span></label>
            <input id="application-currentLocation" name="currentLocation" autoComplete="address-level2" maxLength={120} value={values.currentLocation} onChange={handleChange} className={fieldClass(Boolean(errors.currentLocation))} aria-invalid={errors.currentLocation ? 'true' : undefined} aria-describedby={errors.currentLocation ? 'application-error-currentLocation' : undefined} required />
            {fieldError('currentLocation')}
          </div>
          <div className="form-field group">
            <label htmlFor="application-experienceLevel" className="block text-xs font-bold uppercase tracking-wide text-slate-700 transition-colors group-focus-within:text-sky-700">Experience Level <span className="text-red-600">*</span></label>
            <select id="application-experienceLevel" name="experienceLevel" value={values.experienceLevel} onChange={handleChange} className={fieldClass(Boolean(errors.experienceLevel))} aria-invalid={errors.experienceLevel ? 'true' : undefined} aria-describedby={errors.experienceLevel ? 'application-error-experienceLevel' : undefined} required>
              <option value="">Select experience</option>
              <option value="0–2 years">0–2 years</option>
              <option value="3–6 years">3–6 years</option>
              <option value="7+ years">7+ years</option>
            </select>
            {fieldError('experienceLevel')}
          </div>
          <div className="form-field group">
            <label htmlFor="application-position" className="block text-xs font-bold uppercase tracking-wide text-slate-700 transition-colors group-focus-within:text-sky-700">Position Applied For <span className="text-red-600">*</span></label>
            <motion.select
              ref={positionRef}
              id="application-position"
              name="position"
              value={selectedPosition}
              onChange={handlePositionChange}
              animate={highlightPosition && !reduceMotion ? {
                boxShadow: [
                  '0 0 0 0 rgba(14, 165, 233, 0)',
                  '0 0 0 5px rgba(14, 165, 233, 0.2)',
                  '0 0 0 0 rgba(14, 165, 233, 0)',
                ],
              } : undefined}
              transition={{ duration: 1, ease: 'easeInOut' }}
              className={fieldClass(Boolean(positionError))}
              aria-invalid={positionError ? 'true' : undefined}
              aria-describedby={positionError ? 'application-error-position' : undefined}
              required
            >
              <option value="">Select a position</option>
              {applicationPositions.map((position) => <option key={position} value={position}>{position}</option>)}
            </motion.select>
            {positionError && <p id="application-error-position" className="mt-1.5 text-sm font-medium text-red-600" role="alert">{positionError}</p>}
          </div>
          <div className="form-field group sm:col-span-2">
            <label htmlFor="application-introduction" className="block text-xs font-bold uppercase tracking-wide text-slate-700 transition-colors group-focus-within:text-sky-700">Brief Introduction</label>
            <textarea id="application-introduction" name="introduction" rows="3" maxLength="2000" value={values.introduction} onChange={handleChange} className={`${fieldClass()} resize-y`} placeholder="Tell us briefly about your PeopleSoft experience..." />
          </div>

          <div className="form-field group sm:col-span-2">
            <label htmlFor="application-resume" className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-700 transition-colors group-focus-within:text-sky-700">Resume Upload (PDF) <span className="text-red-600">*</span></label>
            <div
              onDragEnter={(event) => { event.preventDefault(); setDragging(true) }}
              onDragOver={(event) => { event.preventDefault(); setDragging(true) }}
              onDragLeave={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setDragging(false) }}
              onDrop={handleDrop}
              className={`rounded-xl border-2 border-dashed p-4 text-center transition-colors focus-within:ring-2 focus-within:ring-sky-500 focus-within:ring-offset-2 ${dragging ? 'border-sky-500 bg-sky-50' : errors.resume ? 'border-red-400 bg-red-50/40' : 'border-slate-300 bg-slate-50 hover:border-sky-300 hover:bg-sky-50/50'}`}
            >
              <input
                ref={fileInputRef}
                id="application-resume"
                name="resume"
                type="file"
                accept="application/pdf,.pdf"
                className="peer sr-only"
                aria-describedby={`application-resume-hint${errors.resume ? ' application-error-resume' : ''}`}
                aria-invalid={errors.resume ? 'true' : undefined}
                onChange={(event) => chooseResume(event.target.files?.[0] ?? null)}
                required
              />
              <AnimatePresence mode="wait" initial={false}>
                {!resume ? (
                  <motion.label
                    key="resume-empty"
                    htmlFor="application-resume"
                    initial={reduceMotion ? false : { opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -5 }}
                    transition={{ duration: reduceMotion ? 0 : 0.18, ease: 'easeOut' }}
                    className="flex min-h-24 cursor-pointer flex-col items-center justify-center rounded-lg px-3 py-4 outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-sky-500 peer-focus-visible:ring-offset-2"
                  >
                    <span className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-700 transition-transform duration-200 ${dragging && !reduceMotion ? '-translate-y-0.5 scale-105' : ''}`} aria-hidden="true"><Icon name="upload-cloud" size={21} /></span>
                    <span className="text-sm font-semibold text-slate-800">Click or drag your resume here</span>
                    <span className="mt-1 text-xs text-slate-500">PDF only • Maximum 5 MB</span>
                  </motion.label>
                ) : (
                  <motion.div
                    key="resume-selected"
                    initial={reduceMotion ? false : { opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -5 }}
                    transition={{ duration: reduceMotion ? 0 : 0.18, ease: 'easeOut' }}
                    className="flex min-h-24 items-center gap-3 rounded-lg bg-white px-3 py-3 text-left"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-700" aria-hidden="true"><Icon name="file" size={20} /></span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-slate-900">{resume.name}</span>
                      <span className="mt-1 block text-xs text-slate-500">{formatFileSize(resume.size)} · PDF</span>
                    </span>
                    <button type="button" onClick={removeResume} aria-label={`Remove ${resume.name}`} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-sky-50 hover:text-sky-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">
                      <Icon name="close" size={18} />
                    </button>
                    <label htmlFor="application-resume" className="cursor-pointer rounded-md px-2 py-1 text-xs font-semibold text-sky-700 hover:bg-sky-50 focus-within:outline-2 focus-within:outline-sky-600">Replace</label>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <p id="application-resume-hint" className="mt-2 text-xs text-slate-500">PDF only • Maximum 5 MB</p>
            {fieldError('resume')}
          </div>
        </div>

        {status === 'success' && (
          <div className="mt-5 flex gap-3 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800" role="status">
            <Icon name="check-circle" size={19} className="mt-0.5 shrink-0" />
            <p>
              <span className="font-semibold">Application submitted successfully.</span><br />
              Thank you for your interest in PeopleLabs Consulting. Your application and resume have been received
              {reference ? <> (reference <span className="font-mono font-semibold">{reference}</span>)</> : null}. Our hiring team will review it and get back to you.
            </p>
          </div>
        )}
        {status === 'error' && (
          <p className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm leading-6 text-red-700" role="alert">
            <span className="font-medium">{submissionMessage || 'We could not submit your application.'}</span>{' '}
            Please contact us by email at{' '}
            <a className="font-semibold underline underline-offset-2" href={company.emailHref}>{company.email}</a>{' '}
            and include your resume.
          </p>
        )}

        <p className="mt-5 text-xs leading-5 text-slate-500">
          By submitting this form, you are providing your information to PeopleLabs Consulting for recruitment purposes.
        </p>
        <motion.button
          type="submit"
          disabled={status === 'submitting'}
          whileHover={reduceMotion || status === 'submitting' ? undefined : { y: -2, boxShadow: '0 8px 18px rgba(2, 132, 199, .2)' }}
          whileTap={reduceMotion || status === 'submitting' ? undefined : { scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 420, damping: 24 }}
          className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:cursor-wait disabled:opacity-70"
        >
          {status === 'submitting' ? (
            <><span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />Submitting…</>
          ) : (
            <>Submit Application<Icon name="arrow-right" size={18} className="cta-arrow" /></>
          )}
        </motion.button>
      </form>
    </div>
  )
}
