import { useEffect, useRef, useState } from 'react'
import CareerApplicationForm from '../components/CareerApplicationForm.jsx'
import CareersVisual from '../components/CareersVisual.jsx'
import Icon from '../components/Icon.jsx'
import { careers } from '../data/careers.js'

const pageDescription = 'Explore PeopleSoft career opportunities with PeopleLabs Consulting in Edmonton, Alberta, including business analyst and technical support roles.'

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function JobOpening({ job, expanded, onToggle, onApply }) {
  const detailsId = `job-details-${job.id}`
  const headingId = `job-heading-${job.id}`

  return (
    <article className={`overflow-hidden rounded-xl border bg-white shadow-sm transition-[border-color,box-shadow] duration-200 ${expanded ? 'border-sky-300 shadow-md' : 'border-slate-200 hover:border-sky-200 hover:shadow-md'}`}>
      <button
        id={headingId}
        type="button"
        aria-expanded={expanded}
        aria-controls={detailsId}
        onClick={onToggle}
        className="flex w-full items-start gap-4 p-4 text-left focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-sky-600 sm:p-5"
      >
        <span className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${expanded ? 'bg-sky-100 text-sky-700' : 'bg-slate-100 text-slate-600'}`} aria-hidden="true">
          <Icon name={job.metadata[0].icon} size={20} strokeWidth={1.8} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block pr-1 text-base font-semibold leading-6 text-slate-900 sm:text-lg">{job.title}</span>
          <span className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
            {job.metadata.map((item) => (
              <span key={item.label} className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <Icon name={item.icon} size={14} className="text-sky-600" />
                {item.label}
              </span>
            ))}
          </span>
        </span>
        <span className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${expanded ? 'border-sky-200 bg-sky-50 text-sky-700' : 'border-slate-200 text-slate-500'}`} aria-hidden="true">
          <Icon name="chevron-down" size={18} className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
        </span>
      </button>

      <div
        id={detailsId}
        role="region"
        aria-labelledby={headingId}
        className={`${expanded ? 'block' : 'hidden'} border-t border-slate-100 px-4 pb-5 pt-4 sm:px-5 sm:pb-6`}
      >
        <p className="text-sm leading-6 text-slate-600">{job.summary}</p>
        <h4 className="mb-3 mt-5 text-sm font-semibold text-slate-900">About the Qualifications</h4>
        <ul className="grid gap-2.5">
          {job.qualifications.map((qualification) => (
            <li key={qualification} className="flex items-start gap-2.5 text-sm leading-6 text-slate-600">
              <Icon name="check" size={17} strokeWidth={2.2} className="mt-1 shrink-0 text-sky-600" />
              <span>{qualification}</span>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => onApply(job.title)}
          className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sky-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
        >
          Apply for this position
          <Icon name="arrow-right" size={17} />
        </button>
      </div>
    </article>
  )
}

export default function Careers() {
  const [expandedJob, setExpandedJob] = useState(careers[0].id)
  const [selectedPosition, setSelectedPosition] = useState('')
  const [highlightPosition, setHighlightPosition] = useState(false)
  const formRef = useRef(null)
  const positionRef = useRef(null)
  const highlightTimer = useRef(null)

  useEffect(() => {
    const previousTitle = document.title
    const descriptionMeta = document.querySelector('meta[name="description"]')
    const previousDescription = descriptionMeta?.content
    document.title = 'Careers | PeopleLabs Consulting'
    if (descriptionMeta) descriptionMeta.content = pageDescription

    return () => {
      document.title = previousTitle
      if (descriptionMeta && previousDescription !== undefined) descriptionMeta.content = previousDescription
    }
  }, [])

  useEffect(() => () => window.clearTimeout(highlightTimer.current), [])

  function handleApply(title) {
    setSelectedPosition(title)
    setHighlightPosition(true)
    window.clearTimeout(highlightTimer.current)
    highlightTimer.current = window.setTimeout(() => setHighlightPosition(false), 1400)

    window.requestAnimationFrame(() => {
      if (window.matchMedia('(max-width: 1279px)').matches) {
        formRef.current?.scrollIntoView({ behavior: prefersReducedMotion() ? 'instant' : 'smooth', block: 'start' })
      }
      positionRef.current?.focus({ preventScroll: true })
    })
  }

  function handleApplicationSubmitted() {
    setSelectedPosition('')
    setHighlightPosition(false)
  }

  return (
    <>
      <section className="overflow-hidden border-b border-sky-100 bg-gradient-to-b from-sky-50 to-white">
        <div className="mx-auto grid max-w-7xl items-center gap-7 px-4 py-12 sm:px-6 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-8 lg:py-16">
          <div className="max-w-2xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-100 px-3.5 py-2 text-xs font-bold tracking-[0.1em] text-sky-800">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-sky-500" />
              WE ARE HIRING
            </p>
            <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.4rem]">
              Build Your Career
              <br className="hidden sm:block" /> with{' '}
              <span className="text-sky-600">PeopleSoft Expertise.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Join PeopleLabs Consulting and bring your PeopleSoft expertise to client-focused technology projects. Explore our Edmonton-based remote full-time opportunities.
            </p>
            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <a href="#openings" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">
                View Openings
                <Icon name="chevron-down" size={17} />
              </a>
              <span className="text-sm text-slate-500">Edmonton-based remote opportunities</span>
            </div>
          </div>
          <div className="mx-auto w-full max-w-[560px] lg:justify-self-end">
            <CareersVisual />
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-14 lg:py-16" aria-labelledby="careers-intro-heading">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Careers at PeopleLabs</p>
          <h2 id="careers-intro-heading" className="mx-auto max-w-3xl text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Bring Your PeopleSoft Experience to PeopleLabs
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600">
            PeopleLabs Consulting is growing its PeopleSoft team and is looking for professionals who can contribute to client-focused enterprise technology engagements.
          </p>
        </div>
      </section>

      <section id="openings" className="scroll-mt-28 bg-slate-50/70 py-12 sm:py-16 lg:py-20" aria-labelledby="openings-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:gap-10">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Join our team</p>
              <h2 id="openings-heading" className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Current Openings</h2>
              <p className="mt-3 mb-6 text-sm leading-6 text-slate-600 sm:text-base">
                Explore current opportunities with PeopleLabs Consulting.
              </p>
              <div className="grid gap-4">
                {careers.map((job) => (
                  <JobOpening
                    key={job.id}
                    job={job}
                    expanded={expandedJob === job.id}
                    onToggle={() => setExpandedJob((current) => current === job.id ? null : job.id)}
                    onApply={handleApply}
                  />
                ))}
              </div>
            </div>

            <div className="xl:sticky xl:top-28">
              <CareerApplicationForm
                formRef={formRef}
                positionRef={positionRef}
                selectedPosition={selectedPosition}
                onPositionChange={setSelectedPosition}
                highlightPosition={highlightPosition}
                onApplicationSubmitted={handleApplicationSubmitted}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
