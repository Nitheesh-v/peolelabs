import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { FadeUp, StaggerGroup, StaggerItem } from '../components/motion/MotionPrimitives.jsx'
import ServicesExplorer from '../components/ServicesExplorer.jsx'
import HeroBackdrop from '../components/fx/HeroBackdrop.jsx'
import TiltCard from '../components/fx/TiltCard.jsx'
import RevealWords from '../components/fx/RevealWords.jsx'
import { useIntroDone } from '../components/fx/intro.js'

const processSteps = [
  { title: 'Assess', description: 'Understand the current environment and requirements.', icon: 'search' },
  { title: 'Plan', description: 'Define the appropriate service or implementation approach.', icon: 'calendar' },
  { title: 'Deliver', description: 'Execute the agreed PeopleSoft service activities.', icon: 'arrow-right' },
  { title: 'Support', description: 'Provide support based on the engagement requirements.', icon: 'life-buoy' },
]

export default function Services() {
  const introDone = useIntroDone()
  return (
    <>
      <section className="ambient-bg ambient-bg--duo relative overflow-hidden border-b border-sky-100 bg-gradient-to-b from-sky-50 to-white py-10 sm:py-12 lg:py-14">
        <HeroBackdrop density={0.55} />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerGroup animateOnMount stagger={0.08} delayChildren={0.02}>
            <StaggerItem as="nav" aria-label="Breadcrumb" className="mb-7">
              <ol className="flex items-center gap-2 text-sm">
                <li>
                  <Link to="/" className="font-medium text-slate-600 transition-colors hover:text-sky-700 focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="text-slate-400"><Icon name="arrow-right" size={14} /></li>
                <li aria-current="page" className="font-medium text-sky-700">Services</li>
              </ol>
            </StaggerItem>
            <StaggerItem as="p" className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Our Services</StaggerItem>
            <RevealWords as="h1" start={introDone} delay={0.15} className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl" segments={[{ text: 'PeopleSoft', wordClassName: 'text-shimmer' }, { text: ' Services' }]} />
            <StaggerItem as="p" className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              PeopleLabs Consulting provides specialized PeopleSoft services designed to help organizations manage, enhance, upgrade, and support their enterprise applications.
            </StaggerItem>
          </StaggerGroup>
        </div>
      </section>

      <ServicesExplorer />

      <section className="ambient-bg bg-white py-14 sm:py-16 lg:py-20" aria-labelledby="service-approach-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp className="mx-auto mb-9 max-w-2xl text-center sm:mb-11">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-sky-700">How we work</p>
            <h2 id="service-approach-heading" className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
              A Practical Approach to PeopleSoft Services
            </h2>
          </FadeUp>
          <StaggerGroup as="ol" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {processSteps.map((step, index) => (
              <StaggerItem as="li" key={step.title} className="h-full">
                <TiltCard max={9} className="group relative h-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-sky-100 hover:shadow-xl hover:shadow-sky-500/10">
                <div className="flex items-center gap-3">
                  <span className="tilt-pop flex h-10 w-10 items-center justify-center rounded-lg bg-sky-100 text-sky-700 transition-colors duration-300 group-hover:bg-sky-500 group-hover:text-white" aria-hidden="true">
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
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="ambient-bg border-y border-sky-100 bg-sky-50 py-12 sm:py-14" aria-labelledby="services-cta-heading">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
          <StaggerGroup className="min-w-0" stagger={0.1}>
            <StaggerItem as="h2" id="services-cta-heading" className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
              Need support for your PeopleSoft environment?
            </StaggerItem>
            <StaggerItem as="p" className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
              Talk with PeopleLabs Consulting about your application, upgrade, cloud, project, training, or support requirements.
            </StaggerItem>
          </StaggerGroup>
          <FadeUp className="shrink-0" delay={0.16}>
            <Link to="/#contact" className="btn-shine inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 motion-reduce:transform-none hover:bg-sky-600 hover:shadow-sm active:scale-[.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">
              Discuss Your Requirements
              <Icon name="arrow-right" size={18} className="cta-arrow" />
            </Link>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
