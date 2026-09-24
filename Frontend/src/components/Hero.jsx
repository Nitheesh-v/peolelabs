import Icon from './Icon.jsx'
import HeroVisual from './HeroVisual.jsx'
import { FadeUp, StaggerGroup, StaggerItem } from './motion/MotionPrimitives.jsx'

export default function Hero() {
  return (
    <section className="ambient-bg ambient-bg--duo relative overflow-hidden bg-white" aria-labelledby="home-title">
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-8 lg:py-24">
        <StaggerGroup className="max-w-2xl" animateOnMount stagger={0.1} delayChildren={0.04}>
          <StaggerItem as="p" className="mb-6 inline-flex items-center gap-2 rounded-md border border-sky-100 bg-sky-50 px-3.5 py-2 text-sm font-semibold tracking-wide text-sky-700">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-sky-500" />
            Oracle &amp; PeopleSoft Consulting
          </StaggerItem>
          <StaggerItem as="h1" id="home-title" className="text-4xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            <span className="text-sky-500">Oracle &amp; PeopleSoft</span>{' '}
            Expertise That Moves Your Business Forward
          </StaggerItem>
          <StaggerItem as="p" className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Founded in 2016, PeopleLabs Consulting provides high-quality IT consulting services to organizations across a range of industries. Our expertise spans PeopleSoft FSCM, PeopleSoft HCM, PeopleSoft Campus Solutions, Oracle Cloud, managed services, training, and reporting.
          </StaggerItem>
          <StaggerItem as="div" className="mt-7 inline-flex items-center gap-2.5 text-sm font-medium text-slate-700">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 text-sky-700" aria-hidden="true">
              <Icon name="check" size={15} strokeWidth={2.2} />
            </span>
            Delivering Oracle expertise since 2016
          </StaggerItem>
          <StaggerItem as="div" className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#expertise" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-sky-500 px-5 py-3 text-base font-semibold text-white shadow-sm transition-[color,background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-sky-600 hover:shadow-md active:scale-[.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">
              Explore Our Expertise
              <Icon name="arrow-right" size={19} />
            </a>
            <a href="#contact" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-sky-500 bg-white px-5 py-3 text-base font-semibold text-sky-700 transition-[color,background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-sky-50 hover:shadow-sm active:scale-[.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">
              Contact Us
            </a>
          </StaggerItem>
        </StaggerGroup>
        <FadeUp className="mx-auto w-full max-w-[560px] lg:justify-self-end" delay={0.5} animateOnMount>
          <HeroVisual />
        </FadeUp>
      </div>
    </section>
  )
}
