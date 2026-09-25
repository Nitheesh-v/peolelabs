import { Link, useLocation } from 'react-router-dom'
import Icon from './Icon.jsx'
import Logo from './Logo.jsx'
import ContactForm from './ContactForm.jsx'
import { FadeUp, StaggerGroup, StaggerItem } from './motion/MotionPrimitives.jsx'
import { company } from '../data/content.js'
import { scrollToTop } from './fx/scroll.js'
import RevealWords from './fx/RevealWords.jsx'
import ParticleField from './fx/ParticleField.jsx'
import Globe from './fx/Globe.jsx'
import Scroll3D from './fx/Scroll3D.jsx'

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/careers', label: 'Careers' },
  { to: '/about', label: 'About Us' },
]

const mapAddress = '3269 Cherry Crescent SW, Edmonton, Alberta T6X 1Y5, Canada'
const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(mapAddress)}&output=embed`

function ContactItem({ icon, children }) {
  return (
    <li className="group flex items-start gap-3 text-sm leading-6 text-sky-50">
      <span aria-hidden="true" className="mt-0.5 shrink-0 text-white transition-transform duration-200 group-hover:scale-110 motion-reduce:transform-none motion-reduce:transition-none">
        <Icon name={icon} size={19} strokeWidth={1.8} />
      </span>
      <span>{children}</span>
    </li>
  )
}

function FooterColumnTitle({ children, className = '' }) {
  return (
    <h3 className={`mb-5 text-base font-semibold tracking-wide text-white ${className}`.trim()}>
      {children}
    </h3>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()
  const { pathname } = useLocation()
  const onHome = pathname === '/'

  function scrollHomeToTop(event) {
    if (pathname !== '/') return
    event.preventDefault()
    scrollToTop()
  }

  return (
    <>
      {onHome && (
        <section
          id="contact"
          className="ambient-bg scroll-mt-24 border-t border-sky-100 bg-sky-50 py-16 sm:py-20 lg:py-24"
          aria-labelledby="contact-title"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <StaggerGroup className="mx-auto mb-8 max-w-3xl text-center sm:mb-10" stagger={0.1}>
              <p className="eyebrow-line mb-3 text-xs font-bold uppercase tracking-[0.16em] text-sky-700">
                Contact
              </p>
              <RevealWords as="h2" id="contact-title" className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl" text="Let’s Discuss Your IT Requirements" />
              <StaggerItem as="p" className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
                Connect with PeopleLabs Consulting to discuss your Oracle and PeopleSoft requirements.
              </StaggerItem>
            </StaggerGroup>
            <Scroll3D tilt={12}><div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
              <FadeUp className="relative mx-auto w-full max-w-[300px] sm:max-w-[380px] lg:max-w-none" delay={0.1}>
                <Globe />
                <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white bg-white/85 px-4 py-2 text-sm font-semibold text-slate-800 shadow-lg shadow-sky-900/10 backdrop-blur">
                    <span className="pulse-dot h-2 w-2 rounded-full bg-lime-600" aria-hidden="true" />
                    <Icon name="map-pin" size={16} className="text-sky-600" />
                    Edmonton, Alberta, Canada
                  </span>
                </div>
              </FadeUp>
              <FadeUp className="w-full" delay={0.2}>
                <ContactForm />
              </FadeUp>
            </div></Scroll3D>
          </div>
        </section>
      )}

      <footer className="ambient-bg ambient-bg--duo ambient-bg--footer relative overflow-hidden border-t border-sky-700 bg-gradient-to-br from-sky-600 via-sky-600 to-sky-700 text-white">
        <div className="fx-shimmer-line absolute inset-x-0 top-0" aria-hidden="true" />
        <ParticleField className="opacity-40" density={0.5} color="224, 242, 254" accent="190, 242, 100" />
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-[4.5rem]">
          <StaggerGroup className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.1fr_0.7fr_1.15fr_1.15fr] lg:gap-8 xl:gap-12" stagger={0.07}>
            <StaggerItem as="div">
              <div>
                <Logo size="footer" />
              </div>
              <p className="mt-5 max-w-sm text-sm leading-7 text-sky-50">
                Founded in 2016, PeopleLabs Consulting provides high-quality IT consulting services specializing in Oracle and PeopleSoft technologies for organizations across a range of industries.
              </p>
            </StaggerItem>

            <StaggerItem as="nav" aria-label="Company links">
              <FooterColumnTitle>Company</FooterColumnTitle>
              <ul className="grid gap-3.5">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      onClick={link.to === '/' ? scrollHomeToTop : undefined}
                      className="group inline-flex items-center gap-2 text-sm text-sky-50 transition-[color,transform] duration-200 hover:translate-x-1 motion-reduce:transform-none hover:text-white focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                    >
                      <span>{link.label}</span>
                      <Icon name="arrow-right" size={14} className="-translate-x-1 opacity-0 transition-[opacity,transform] duration-200 group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:transform-none motion-reduce:transition-none" />
                    </Link>
                  </li>
                ))}
              </ul>
            </StaggerItem>

            <StaggerItem as="div">
              <FooterColumnTitle>Contact Us</FooterColumnTitle>
              <p className="mb-3 text-sm font-semibold text-white">{company.name}</p>
              <ul className="grid gap-3.5">
                <ContactItem icon="map-pin">
                  {company.address.map((line) => (
                    <span key={line} className="block">{line}</span>
                  ))}
                </ContactItem>
                <ContactItem icon="phone">
                  <span>
                    <span className="text-sky-100">Phone: </span>
                    <a
                      className="text-white transition-colors hover:text-sky-100 focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      href={company.phoneHref}
                    >
                      {company.phone}
                    </a>
                  </span>
                </ContactItem>
                <ContactItem icon="mail">
                  <span>
                    <span className="text-sky-100">Email: </span>
                    <a
                      className="break-all text-white transition-colors hover:text-sky-100 focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      href={company.emailHref}
                    >
                      {company.email}
                    </a>
                  </span>
                </ContactItem>
                <ContactItem icon="clock">
                  <span><span className="font-medium text-white">Hours:</span> {company.hours}</span>
                </ContactItem>
              </ul>
            </StaggerItem>

            <StaggerItem as="div">
              <FooterColumnTitle className="text-center">Location</FooterColumnTitle>
              <div className="h-[190px] w-full overflow-hidden rounded-lg border border-white/30 bg-sky-700 transition-[border-color,box-shadow] duration-200 hover:border-white/70 hover:shadow-lg sm:h-[200px]">
                <iframe
                  src={mapSrc}
                  title="PeopleLabs Consulting location in Edmonton, Alberta"
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </StaggerItem>
          </StaggerGroup>

          <div className="mt-12 border-t border-white/25 pt-6 text-center text-sm text-sky-50">
            <p>© {year} PeopleLabs Consulting. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
