import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { FadeSide, FadeUp, StaggerGroup, StaggerItem } from '../components/motion/MotionPrimitives.jsx'
import HeroBackdrop from '../components/fx/HeroBackdrop.jsx'
import RevealWords from '../components/fx/RevealWords.jsx'
import { useIntroDone } from '../components/fx/intro.js'
import Depth3D from '../components/fx/Depth3D.jsx'
import SectorCard from '../components/SectorCard.jsx'
import TiltCard from '../components/fx/TiltCard.jsx'
import { sectors } from '../data/content.js'

const expertise = [
  {
    title: 'PeopleSoft FSCM',
    description: 'Support for financial and supply chain processes across PeopleSoft applications.',
    icon: 'bank',
  },
  {
    title: 'PeopleSoft HCM',
    description: 'PeopleSoft capabilities supporting human capital management and workforce processes.',
    icon: 'users',
  },
  {
    title: 'PeopleSoft Campus Solutions',
    description: 'PeopleSoft expertise supporting higher education administration and student-focused processes.',
    icon: 'graduation-cap',
  },
  {
    title: 'Oracle Cloud',
    description: 'Oracle Cloud expertise supporting evolving enterprise technology requirements.',
    icon: 'cloud',
  },
]


function AboutMetadata() {
  useEffect(() => {
    const description = 'Learn about PeopleLabs Consulting, an Edmonton-based IT consulting company specializing in PeopleSoft FSCM, HCM, Campus Solutions, Oracle Cloud, managed services, and training.'
    const previousTitle = document.title
    const metadata = [
      ['meta[name="description"]', description],
      ['meta[property="og:title"]', 'About Us | PeopleLabs Consulting'],
      ['meta[property="og:description"]', description],
    ].map(([selector, value]) => {
      const element = document.querySelector(selector)
      const previousValue = element?.getAttribute('content')
      if (element) element.setAttribute('content', value)
      return { element, previousValue }
    })

    document.title = 'About Us | PeopleLabs Consulting'

    return () => {
      document.title = previousTitle
      metadata.forEach(({ element, previousValue }) => {
        if (element && previousValue !== null) element.setAttribute('content', previousValue)
      })
    }
  }, [])

  return null
}

function EnterpriseVisual() {
  const modules = [
    { label: 'FSCM', icon: 'bank', position: 'left-[1%] top-[12%]' },
    { label: 'HCM', icon: 'users', position: 'right-[1%] top-[12%]' },
    { label: 'Campus', icon: 'graduation-cap', position: 'left-[1%] bottom-[11%]' },
    { label: 'Cloud', icon: 'cloud', position: 'right-[1%] bottom-[11%]' },
  ]

  return (
    <div
      role="img"
      aria-label="Abstract illustration of connected PeopleSoft applications and Oracle Cloud"
      className="relative mx-auto aspect-[5/4] min-h-[320px] w-full max-w-[540px] overflow-hidden rounded-[2rem] bg-gradient-to-br from-sky-50 via-white to-sky-100/80 sm:min-h-0"
    >
      <div aria-hidden="true" className="about-visual__ring--outer absolute inset-[9%] rounded-full border border-sky-100" />
      <div aria-hidden="true" className="about-visual__ring--inner absolute inset-[16%] rounded-full border border-dashed border-sky-200" />
      <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70" />
      <svg aria-hidden="true" viewBox="0 0 500 400" className="absolute inset-0 h-full w-full">
        <g className="about-visual__connector" fill="none" stroke="#7DD3FC" strokeWidth="2" strokeDasharray="5 7">
          <path d="M125 93 198 157M375 93l-73 64M125 307l73-64M375 307l-73-64" />
        </g>
        <g fill="#0EA5E9">
          <circle cx="125" cy="93" r="4" /><circle cx="375" cy="93" r="4" />
          <circle cx="125" cy="307" r="4" /><circle cx="375" cy="307" r="4" />
        </g>
      </svg>

      {modules.map((item, index) => (
        <div
          key={item.label}
          className={`about-visual__module absolute ${item.position} z-10 flex w-[39%] max-w-[170px] items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3 py-3 shadow-sm sm:gap-3 sm:px-4 sm:py-3.5`}
          style={{ animationDelay: `${index * 0.6}s` }}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-700 sm:h-10 sm:w-10">
            <Icon name={item.icon} size={20} />
          </span>
          <span className="text-sm font-semibold text-slate-800 sm:text-base">{item.label}</span>
        </div>
      ))}

      <div className="about-visual__hub absolute left-1/2 top-1/2 z-20 flex w-[48%] max-w-[220px] -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-2xl border border-sky-100 bg-white px-4 py-5 text-center shadow-lg shadow-sky-900/5 sm:px-6 sm:py-6">
        <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500 text-white shadow-sm shadow-sky-500/20">
          <Icon name="layers" size={25} strokeWidth={1.7} />
        </span>
        <span className="text-sm font-bold tracking-tight text-slate-900 sm:text-base">Enterprise systems</span>
        <span className="mt-1 text-xs text-slate-500 sm:text-sm">Connected applications</span>
      </div>
    </div>
  )
}

function CompanyVisual() {
  const items = [
    { label: 'Applications', icon: 'layers' },
    { label: 'Technology', icon: 'server' },
    { label: 'Managed services', icon: 'settings' },
    { label: 'Training', icon: 'book-open' },
  ]

  return (
    <div aria-hidden="true" className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-3xl border border-sky-100 bg-sky-50 p-6 sm:min-h-[390px] sm:p-8">
      <div className="about-visual__orb absolute -left-12 -top-12 h-48 w-48 rounded-full bg-sky-100/80" />
      <div className="about-visual__orb absolute -bottom-16 -right-8 h-56 w-56 rounded-full border-[24px] border-white/80" style={{ animationDelay: '-8s' }} />
      <div className="relative w-full max-w-md">
        <div className="mb-4 rounded-2xl border border-sky-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500 text-white">
              <Icon name="layers" size={23} />
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-900 sm:text-base">PeopleLabs Consulting</p>
              <p className="mt-0.5 text-xs text-slate-500">Oracle and PeopleSoft services</p>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2.5 sm:gap-3">
            {items.map((item) => (
              <div key={item.label} className="flex min-h-16 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 sm:gap-2.5">
                <span className="shrink-0 text-sky-600"><Icon name={item.icon} size={19} /></span>
                <span className="text-xs font-medium leading-5 text-slate-700 sm:text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function About() {
  const introDone = useIntroDone()
  return (
    <>
      <AboutMetadata />

      <section aria-labelledby="about-hero-title" className="ambient-bg ambient-bg--duo relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-white">
        <HeroBackdrop density={0.6} />
        <div className="mx-auto grid min-h-[420px] max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 sm:py-14 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-16">
          <StaggerGroup className="max-w-2xl" animateOnMount stagger={0.1} delayChildren={0.04}>
            <StaggerItem as="p" className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-sky-700">About PeopleLabs</StaggerItem>
            <RevealWords
              as="h1"
              id="about-hero-title"
              start={introDone}
              delay={0.15}
              className="text-4xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
              segments={[
                { text: 'Oracle Expertise. ' },
                { text: 'Built Around Your Business.', className: 'block', wordClassName: 'text-shimmer' },
              ]}
            />
            <StaggerItem as="p" className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Founded in 2016, PeopleLabs Consulting provides Oracle and PeopleSoft consulting services designed around the unique technology requirements of each organization.
            </StaggerItem>
            <StaggerItem as="div" className="mt-7 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6">
              <Link to="/services" className="btn-shine inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 motion-reduce:transform-none hover:bg-sky-600 hover:shadow-sm active:scale-[.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">
                Explore Our Expertise
                <Icon name="arrow-right" size={18} className="cta-arrow" />
              </Link>
              <p className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-sky-500" />
                Serving organizations across multiple industries
              </p>
            </StaggerItem>
          </StaggerGroup>
          <FadeUp className="w-full" delay={0.45} animateOnMount>
            <Depth3D><EnterpriseVisual /></Depth3D>
          </FadeUp>
        </div>
      </section>

      <section aria-labelledby="get-to-know-title" className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-9 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14 lg:px-8">
          <FadeSide as="div" direction="left">
            <Depth3D max={8}><CompanyVisual /></Depth3D>
          </FadeSide>
          <FadeSide as="div" direction="right" className="max-w-2xl lg:py-4" delay={0.08}>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Get to Know Us</p>
            <h2 id="get-to-know-title" className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
              Get to Know PeopleLabs Consulting
            </h2>
            <div className="mt-6 space-y-4 border-l-2 border-sky-400 pl-5 text-base leading-7 text-slate-600 sm:pl-6">
              <p>
                Founded in 2016, PeopleLabs Consulting provides high-quality IT services to organizations across a range of industries. Our team brings experience across Oracle technologies, including PeopleSoft FSCM, PeopleSoft HCM, PeopleSoft Campus Solutions, and Oracle Cloud.
              </p>
              <p>
                We understand that every organization has unique IT requirements. That is why we work closely with our clients to develop solutions aligned with their specific business and technology needs.
              </p>
              <p>
                With knowledge spanning Oracle applications, technology, managed services, and training, PeopleLabs Consulting focuses on delivering consistent service and meaningful business value.
              </p>
            </div>
            <p className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Icon name="map-pin" size={19} className="text-sky-600" />
              Edmonton, Alberta, Canada
            </p>
          </FadeSide>
        </div>
      </section>

      <section aria-labelledby="expertise-title" className="ambient-bg border-y border-sky-100 bg-sky-50 py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp className="mx-auto mb-9 max-w-3xl text-center sm:mb-11">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Our Expertise</p>
            <h2 id="expertise-title" className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
              Technology Expertise That Supports Your Business
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Our experience spans key Oracle and PeopleSoft technologies, managed services, and training.
            </p>
          </FadeUp>
          <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.09}>
            {expertise.map((item) => (
              <StaggerItem as="div" key={item.title} className="h-full">
                <TiltCard as="article" max={9} className="group h-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-sky-100 hover:shadow-xl hover:shadow-sky-500/10 sm:p-6">
                <span className="tilt-pop mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-sky-700 transition-colors group-hover:bg-sky-500 group-hover:text-white motion-reduce:transition-none" aria-hidden="true">
                  <Icon name={item.icon} size={22} strokeWidth={1.8} />
                </span>
                <h3 className="text-lg font-semibold tracking-tight text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <div className="mt-7 text-center">
            <Link to="/services" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-3 text-sm font-semibold text-sky-700 underline decoration-sky-300 underline-offset-4 transition-colors hover:text-sky-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600">
              View All Services
              <Icon name="arrow-right" size={17} className="cta-arrow" />
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="industries-title" className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Industry Experience</p>
            <h2 id="industries-title" className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
              Experience Across Diverse Sectors
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              PeopleLabs Consulting&apos;s team has experience working across multiple sectors and industries.
            </p>
          </FadeUp>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5 [perspective:1400px]">
            {sectors.map((sector, index) => (
              <li key={sector.title} className={index === 4 ? 'col-span-2 sm:col-span-1' : undefined}>
                <SectorCard
                  sector={sector}
                  index={index}
                  compact
                  imageClassName={index === 4 ? 'aspect-[16/9] sm:aspect-[4/3]' : 'aspect-[4/3]'}
                  sizes="(min-width: 1024px) 240px, (min-width: 640px) 33vw, 50vw"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="about-cta-title" className="ambient-bg border-y border-slate-200 bg-white px-4 py-12 text-slate-900 sm:px-6 sm:py-14 lg:py-16">
        <StaggerGroup className="mx-auto max-w-7xl text-center" stagger={0.1}>
          <StaggerItem as="h2" id="about-cta-title" className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
            Let&apos;s Talk About Your Technology Needs
          </StaggerItem>
          <StaggerItem as="p" className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Connect with PeopleLabs Consulting to discuss your Oracle, PeopleSoft, managed services, or training requirements.
          </StaggerItem>
          <StaggerItem as="div" className="mt-7">
            <Link to="/#contact" className="btn-shine inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-sky-700 px-5 py-3 text-sm font-semibold text-white transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 motion-reduce:transform-none hover:bg-sky-800 hover:shadow-sm active:scale-[.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700">
              Contact PeopleLabs
              <Icon name="arrow-right" size={18} className="cta-arrow" />
            </Link>
          </StaggerItem>
        </StaggerGroup>
      </section>
    </>
  )
}
