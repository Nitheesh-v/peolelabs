import { Link, useLocation } from 'react-router-dom'
import Icon from './Icon.jsx'
import ContactForm from './ContactForm.jsx'
import { company } from '../data/content.js'

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
    <li className="flex items-start gap-3 text-sm leading-6 text-slate-300">
      <span aria-hidden="true" className="mt-0.5 shrink-0 text-sky-400">
        <Icon name={icon} size={19} strokeWidth={1.8} />
      </span>
      <span>{children}</span>
    </li>
  )
}

function FooterColumnTitle({ children, className = '' }) {
  return <h3 className={`mb-5 text-base font-semibold tracking-wide text-white ${className}`.trim()}>{children}</h3>
}

export default function Footer() {
  const year = new Date().getFullYear()
  const { pathname } = useLocation()
  const onHome = pathname === '/'

  function scrollHomeToTop(event) {
    if (pathname !== '/') return
    event.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {onHome && (
        <section id="contact" className="scroll-mt-24 border-t border-sky-100 bg-sky-50 py-16 sm:py-20 lg:py-24" aria-labelledby="contact-title">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Contact</p>
              <h2 id="contact-title" className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Let&apos;s Discuss Your IT Requirements</h2>
              <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
                Connect with PeopleLabs Consulting to discuss your Oracle and PeopleSoft requirements.
              </p>
            </div>
            <div className="mx-auto max-w-3xl">
              <ContactForm />
            </div>
          </div>
        </section>
      )}

      <footer className="bg-[#0B1F4D] text-slate-300">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-[4.5rem]">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.1fr_0.7fr_1.15fr_1.15fr] lg:gap-8 xl:gap-12">
            <div>
              <p className="text-2xl font-bold tracking-tight text-white sm:text-[1.7rem]">
                PeopleLabs <span className="text-sky-400">Consulting</span>
              </p>
              <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">
                Founded in 2016, PeopleLabs Consulting provides high-quality IT consulting services specializing in Oracle and PeopleSoft technologies for organizations across a range of industries.
              </p>
            </div>

            <nav aria-label="Company links">
              <FooterColumnTitle>Company</FooterColumnTitle>
              <ul className="grid gap-3.5">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      onClick={link.to === '/' ? scrollHomeToTop : undefined}
                      className="inline-flex text-sm text-slate-300 transition-colors duration-200 hover:translate-x-0.5 hover:text-sky-400 focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <FooterColumnTitle>Contact Us</FooterColumnTitle>
              <p className="mb-3 text-sm font-semibold text-white">{company.name}</p>
              <ul className="grid gap-3.5">
                <ContactItem icon="map-pin">
                  {company.address.map((line) => <span key={line} className="block">{line}</span>)}
                </ContactItem>
                <ContactItem icon="phone">
                  <span><span className="text-slate-400">Phone: </span><a className="transition-colors hover:text-sky-400 focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400" href={company.phoneHref}>{company.phone}</a></span>
                </ContactItem>
                <ContactItem icon="mail">
                  <span><span className="text-slate-400">Email: </span><a className="break-all transition-colors hover:text-sky-400 focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400" href={company.emailHref}>{company.email}</a></span>
                </ContactItem>
                <ContactItem icon="clock">
                  <span><span className="font-medium text-slate-200">Hours:</span> {company.hours}</span>
                </ContactItem>
              </ul>
            </div>

            <div>
              <FooterColumnTitle className="text-center">Location</FooterColumnTitle>
              <div className="h-[190px] w-full overflow-hidden rounded-lg border border-white/15 bg-slate-800 sm:h-[200px]">
                <iframe
                  src={mapSrc}
                  title="PeopleLabs Consulting location in Edmonton, Alberta"
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-slate-400">
            <p>© {year} PeopleLabs Consulting. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
