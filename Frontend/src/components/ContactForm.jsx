import { useState } from 'react'
import Icon from './Icon.jsx'
import { company } from '../data/content.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const initialValues = { name: '', email: '', message: '' }

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  else if (values.name.trim().length < 2) errors.name = 'Please enter at least two characters.'
  if (!values.email.trim()) errors.email = 'Please enter your email address.'
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Please enter a valid email address.'
  if (!values.message.trim()) errors.message = 'Please enter a message.'
  else if (values.message.trim().length < 10) errors.message = 'Please enter at least 10 characters.'
  return errors
}

function inputClass(hasError) {
  return `mt-2 block w-full rounded-lg border bg-white px-3.5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 ${hasError ? 'border-red-500' : 'border-slate-300'}`
}

export default function ContactForm() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

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

  function handleCancel() {
    setValues(initialValues)
    setErrors({})
    setStatus('idle')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      document.getElementById(`contact-${Object.keys(nextErrors)[0]}`)?.focus()
      return
    }

    setStatus('submitting')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
        }),
      })
      const result = await response.json().catch(() => null)
      if (!response.ok || !result?.ok) throw new Error('Contact request was not accepted')
      setStatus('success')
      setValues(initialValues)
      setErrors({})
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7" onSubmit={handleSubmit} noValidate>
      <h3 className="mb-6 text-xl font-semibold tracking-tight text-slate-900">Drop us a line!</h3>
      <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-semibold text-slate-800">Name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            value={values.name}
            onChange={handleChange}
            className={inputClass(Boolean(errors.name))}
            aria-invalid={errors.name ? 'true' : undefined}
            aria-describedby={errors.name ? 'error-name' : undefined}
            required
          />
          {errors.name && <p id="error-name" className="mt-1.5 text-sm text-red-600" role="alert">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-semibold text-slate-800">Email<span className="ml-1 text-red-600" aria-hidden="true">*</span><span className="sr-only"> (required)</span></label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={values.email}
            onChange={handleChange}
            className={inputClass(Boolean(errors.email))}
            aria-invalid={errors.email ? 'true' : undefined}
            aria-describedby={errors.email ? 'error-email' : undefined}
            required
          />
          {errors.email && <p id="error-email" className="mt-1.5 text-sm text-red-600" role="alert">{errors.email}</p>}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className="block text-sm font-semibold text-slate-800">Message</label>
          <textarea
            id="contact-message"
            name="message"
            rows="4"
            placeholder="Tell us briefly about your requirements"
            value={values.message}
            onChange={handleChange}
            className={`${inputClass(Boolean(errors.message))} min-h-28 resize-y`}
            aria-invalid={errors.message ? 'true' : undefined}
            aria-describedby={errors.message ? 'error-message' : undefined}
            required
          />
          {errors.message && <p id="error-message" className="mt-1.5 text-sm text-red-600" role="alert">{errors.message}</p>}
        </div>
      </div>

      {status === 'success' && (
        <p className="mt-5 flex items-start gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-800" role="status">
          <Icon name="check-circle" size={18} className="mt-0.5 shrink-0" />
          <span>Thank you. Your message was sent successfully; we&apos;ll be in touch.</span>
        </p>
      )}
      {status === 'error' && (
        <p className="mt-5 rounded-lg bg-red-50 p-3 text-sm leading-6 text-red-700" role="alert">
          We couldn&apos;t send your message just now. Please try again or email{' '}
          <a className="font-semibold underline underline-offset-2" href={company.emailHref}>{company.email}</a>.
        </p>
      )}

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
        <button type="button" onClick={handleCancel} disabled={status === 'submitting'} className="inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-sky-300 hover:bg-sky-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:opacity-60 sm:w-auto">
          Cancel
        </button>
        <button type="submit" disabled={status === 'submitting'} className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sky-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:cursor-wait disabled:opacity-70 sm:w-auto">
          {status === 'submitting' ? 'Sending…' : 'Send'}
          {status !== 'submitting' && <Icon name="arrow-right" size={17} />}
        </button>
      </div>
    </form>
  )
}
