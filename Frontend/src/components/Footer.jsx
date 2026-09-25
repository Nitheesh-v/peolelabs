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

function WhatsAppIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className} focusable="false">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
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

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/25 pt-6 text-center text-sm text-sky-50 sm:flex-row sm:text-left">
            <p>© {year} PeopleLabs Consulting. All rights reserved.</p>
            <a
              href={company.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Message PeopleLabs Consulting on WhatsApp at ${company.whatsapp}`}
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#25D366] py-2.5 pl-4 pr-5 font-semibold text-[#083b26] shadow-lg shadow-emerald-950/30 transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-[#40e07b] hover:shadow-xl hover:shadow-emerald-950/40 motion-reduce:transform-none motion-reduce:transition-none"
            >
              <WhatsAppIcon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110 motion-reduce:transform-none" />
              <span className="tracking-wide">{company.whatsapp}</span>
              <span className="rounded-full bg-[#083b26]/10 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider">Chat</span>
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
