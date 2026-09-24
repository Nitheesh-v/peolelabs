import { useState } from 'react'
import Icon from './Icon.jsx'
import { services, company } from '../data/content.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const initialValues = {
  name: '',
  email: '',
  company: '',
  service: '',
  message: '',
}

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  else if (values.name.trim().length < 2) errors.name = 'Name looks too short.'

  if (!values.email.trim()) errors.email = 'Please enter your email address.'
  else if (!EMAIL_RE.test(values.email.trim()))
    errors.email = 'Please enter a valid email address.'

  if (!values.message.trim()) errors.message = 'Please enter a message.'
  else if (values.message.trim().length < 10)
    errors.message = 'Please add a little more detail (at least 10 characters).'

  return errors
}

export default function ContactForm() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    setErrors((prev) => {
      if (!prev[name]) return prev
      const next = { ...prev }
      delete next[name]
      return next
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      const first = Object.keys(nextErrors)[0]
      document.getElementById(`field-${first}`)?.focus()
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
      setValues(initialValues)
    } catch {
      setStatus('error')
    }
  }

  const err = (field) =>
    errors[field] ? (
      <p className="field-error" id={`error-${field}`} role="alert">
        <Icon name="alert-circle" size={15} />
        {errors[field]}
      </p>
    ) : null

  const describedBy = (field) => (errors[field] ? `error-${field}` : undefined)

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      {status === 'success' && (
        <div className="form-status form-status--success" role="status">
          <Icon name="check-circle" size={20} />
          <span>
            Thanks — your message has been received. We&apos;ll be in touch
            shortly.
          </span>
        </div>
      )}
      {status === 'error' && (
        <div className="form-status form-status--error" role="alert">
          <Icon name="alert-circle" size={20} />
          <span>
            Something went wrong sending your message. Please try again, or email
            us directly at{' '}
            <a href={company.emailHref}>{company.email}</a>.
          </span>
        </div>
      )}

      <div className="field-row">
        <div className="field">
          <label className="label" htmlFor="field-name">
            Name <span className="req">*</span>
          </label>
          <input
            id="field-name"
            name="name"
            type="text"
            className="input"
            placeholder="Your full name"
            value={values.name}
            onChange={handleChange}
            aria-invalid={errors.name ? 'true' : undefined}
            aria-describedby={describedBy('name')}
          />
          {err('name')}
        </div>
        <div className="field">
          <label className="label" htmlFor="field-email">
            Email <span className="req">*</span>
          </label>
          <input
            id="field-email"
            name="email"
            type="email"
            className="input"
            placeholder="you@company.com"
            value={values.email}
            onChange={handleChange}
            aria-invalid={errors.email ? 'true' : undefined}
            aria-describedby={describedBy('email')}
          />
          {err('email')}
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label className="label" htmlFor="field-company">
            Company
          </label>
          <input
            id="field-company"
            name="company"
            type="text"
            className="input"
            placeholder="Organization (optional)"
            value={values.company}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label className="label" htmlFor="field-service">
            Area of interest
          </label>
          <select
            id="field-service"
            name="service"
            className="select"
            value={values.service}
            onChange={handleChange}
          >
            <option value="">Select a service (optional)</option>
            {services.map((s) => (
              <option key={s.id} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="field-message">
          Message <span className="req">*</span>
        </label>
        <textarea
          id="field-message"
          name="message"
          className="textarea"
          placeholder="How can we help?"
          value={values.message}
          onChange={handleChange}
          aria-invalid={errors.message ? 'true' : undefined}
          aria-describedby={describedBy('message')}
        />
        {err('message')}
      </div>

      <button
        type="submit"
        className="btn btn--primary btn--lg btn--block"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
        {status !== 'submitting' && (
          <Icon name="arrow-right" size={18} className="icon--arrow" />
        )}
      </button>
      <p className="form-note">
        We respect your privacy. Your details are used only to respond to your
        enquiry.
      </p>
    </form>
  )
}
