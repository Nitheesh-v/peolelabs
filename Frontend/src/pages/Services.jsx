import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import ServicesExplorer from '../components/ServicesExplorer.jsx'

const processSteps = [
  { title: 'Assess', description: 'Understand the current environment and requirements.', icon: 'search' },
  { title: 'Plan', description: 'Define the appropriate service or implementation approach.', icon: 'calendar' },
  { title: 'Deliver', description: 'Execute the agreed PeopleSoft service activities.', icon: 'arrow-right' },
  { title: 'Support', description: 'Provide support based on the engagement requirements.', icon: 'life-buoy' },
]

export default function Services() {
  return (
    <>
      <section className="border-b border-sky-100 bg-gradient-to-b from-sky-50 to-white py-10 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link to="/" className="font-medium text-slate-600 transition-colors hover:text-sky-700 focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-slate-400"><Icon name="arrow-right" size={14} /></li>
              <li aria-current="page" className="font-medium text-sky-700">Services</li>
            </ol>
          </nav>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Our Services</p>
          <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-[2.75rem]">
            PeopleSoft Services
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            PeopleLabs Consulting provides specialized PeopleSoft services designed to help organizations manage, enhance, upgrade, and support their enterprise applications.
          </p>
        </div>
      </section>

      <ServicesExplorer />

      <section className="bg-white py-14 sm:py-16 lg:py-20" aria-labelledby="service-approach-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-9 max-w-2xl text-center sm:mb-11">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-sky-700">How we work</p>
            <h2 id="service-approach-heading" className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              A Practical Approach to PeopleSoft Services
            </h2>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <li key={step.title} className="relative rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-100 text-sky-700" aria-hidden="true">
                    <Icon name={step.icon} size={21} strokeWidth={1.8} />
                  </span>
                  <h3 className="text-base font-semibold text-slate-900">{step.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600">{step.description}</p>
                {index < processSteps.length - 1 && (
                  <span aria-hidden="true" className="absolute -right-3 top-9 z-10 hidden h-5 w-5 items-center justify-center rounded-full bg-white text-sky-500 lg:flex">
                    <Icon name="arrow-right" size={16} />
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-sky-100 bg-sky-50 py-12 sm:py-14" aria-labelledby="services-cta-heading">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <h2 id="services-cta-heading" className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Need support for your PeopleSoft environment?
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
              Talk with PeopleLabs Consulting about your application, upgrade, cloud, project, training, or support requirements.
            </p>
          </div>
          <Link to="/#contact" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">
            Discuss Your Requirements
            <Icon name="arrow-right" size={18} />
          </Link>
        </div>
      </section>
    </>
  )
}
