import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo.jsx'
import Icon from './Icon.jsx'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services' },
  { to: '/careers', label: 'Careers' },
  { to: '/about', label: 'About Us' },
]

function LoginControl({ mobile = false }) {
  return (
    <button
      type="button"
      disabled
      aria-label="Login"
      title="Login is not available yet"
      className={`inline-flex cursor-default items-center gap-2 rounded-md text-white transition-[background-color,transform] duration-200 hover:scale-105 hover:bg-white/10 active:scale-95 ${mobile ? 'w-full px-3 py-3 text-base font-semibold sm:w-auto' : 'px-1 py-2 text-sm font-semibold'}`}
    >
      <Icon name="user" size={20} strokeWidth={1.8} />
      <span>Login</span>
    </button>
  )
}

function desktopLinkClass(isActive) {
  return `relative inline-flex whitespace-nowrap py-2 text-base font-semibold transition-colors duration-200 after:absolute after:bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-[width] after:duration-300 after:content-[''] hover:text-sky-50 hover:after:w-full focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${isActive ? 'text-white after:w-full' : 'text-white/90'}`
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggleRef = useRef(null)
  const location = useLocation()
  const contactHref = location.pathname === '/' ? '#contact' : '/#contact'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  function handleHomeClick(event) {
    setOpen(false)
    if (location.pathname === '/') {
      event.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const barColor = scrolled
    ? 'bg-sky-600 border-sky-700 shadow-sm'
    : 'bg-sky-500 border-sky-400/70'

  return (
    <header className={`sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300 ${barColor}`}>
      <div className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-[height] duration-300 ease-out sm:px-6 lg:px-8 ${scrolled ? 'h-[72px] lg:h-[88px]' : 'h-[78px] lg:h-24'}`}>
        <Link to="/" onClick={handleHomeClick} aria-label="PeopleLabs Consulting home" className="shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
          <Logo decorative />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8" aria-label="Primary">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={link.to === '/' ? handleHomeClick : undefined}
              className={({ isActive }) => desktopLinkClass(isActive)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-4 lg:flex">
          <LoginControl />
          <a href={contactHref} className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-5 py-2.5 text-base font-semibold text-sky-700 transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-px hover:bg-sky-50 hover:shadow-sm active:scale-[.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            Contact Us
          </a>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/50 text-white transition-colors hover:bg-sky-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:hidden"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <Icon name={open ? 'close' : 'menu'} size={23} />
        </button>
      </div>

      <div id="mobile-navigation" className={`${open ? 'block' : 'hidden'} border-t border-white/20 bg-sky-600 px-4 pb-5 pt-2 shadow-sm lg:hidden`}>
        <nav aria-label="Mobile primary" className="mx-auto flex max-w-7xl flex-col">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={link.to === '/' ? handleHomeClick : () => setOpen(false)}
              className={({ isActive }) => `rounded-md border-l-2 px-3 py-3 text-base font-semibold focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-white ${isActive ? 'border-white text-white' : 'border-transparent text-white/90 hover:border-white/60 hover:text-white'}`}
            >
              {link.label}
            </NavLink>
          ))}
          <div className="mt-2 flex flex-col gap-2 border-t border-white/20 pt-3 sm:flex-row sm:items-center sm:justify-between">
            <LoginControl mobile />
            <a href={contactHref} onClick={() => setOpen(false)} className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-white px-4 text-sm font-semibold text-sky-700 transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-px hover:bg-sky-50 hover:shadow-sm active:scale-[.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto">
              Contact Us
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
