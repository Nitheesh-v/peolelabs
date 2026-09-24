import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import Logo from './Logo.jsx'
import Icon from './Icon.jsx'
import { scrollToTop } from './fx/scroll.js'
import Magnetic from './fx/Magnetic.jsx'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services' },
  { to: '/careers', label: 'Careers' },
  { to: '/about', label: 'About Us' },
]

function LoginControl({ mobile = false }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.button
      type="button"
      disabled
      aria-label="Login"
      title="Login is not available yet"
      whileHover={reduceMotion ? undefined : { scale: 1.025 }}
      whileTap={reduceMotion ? undefined : { scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 420, damping: 24 }}
      className={`group inline-flex cursor-default items-center gap-2 rounded-md text-white transition-colors duration-200 hover:bg-white/10 ${mobile ? 'w-full justify-start px-3 py-2 text-base font-semibold sm:w-auto' : 'px-1 py-2 text-sm font-semibold'}`}
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-white transition-[background-color,color] duration-200 group-hover:bg-sky-300/20 group-hover:text-sky-100">
        <Icon name="user" size={20} strokeWidth={1.8} className="transition-transform duration-200 group-hover:scale-110 motion-reduce:transform-none motion-reduce:transition-none" />
      </span>
      <span>Login</span>
    </motion.button>
  )
}

function desktopLinkClass(isActive) {
  return `relative inline-flex whitespace-nowrap rounded-full px-3.5 py-2 text-base font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${isActive ? 'text-white' : 'text-white/90 hover:text-white'}`
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hovered, setHovered] = useState(null)
  const reduceMotion = useReducedMotion()
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
      scrollToTop()
    }
  }

  const barColor = scrolled
    ? 'bg-sky-600 border-sky-700 shadow-sm'
    : 'bg-sky-500/95 border-sky-400/70 backdrop-blur-sm'

  return (
    <header className={`sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300 ${barColor}`}>
      <div className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-[height] duration-300 ease-out sm:px-6 lg:px-8 ${scrolled ? 'h-[72px] lg:h-[88px]' : 'h-[78px] lg:h-24'}`}>
        <Link to="/" onClick={handleHomeClick} aria-label="PeopleLabs Consulting home" className={`shrink-0 rounded-sm transition-transform duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${scrolled ? 'scale-[.96]' : 'scale-100'}`}>
          <Logo decorative />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex xl:gap-2" aria-label="Primary" onPointerLeave={() => setHovered(null)}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={link.to === '/' ? handleHomeClick : undefined}
              onPointerEnter={() => setHovered(link.to)}
              onFocus={() => setHovered(link.to)}
              onBlur={() => setHovered(null)}
              className={({ isActive }) => desktopLinkClass(isActive)}
            >
              {({ isActive }) => (
                <>
                  {hovered === link.to && (
                    <motion.span
                      layoutId="nav-hover-pill"
                      className="absolute inset-0 -z-0 rounded-full bg-white/15 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.25)]"
                      transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }}
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-bar"
                      className="absolute inset-x-3.5 -bottom-0.5 z-10 h-[3px] rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]"
                      transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 30 }}
                      aria-hidden="true"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-4 lg:flex">
          <LoginControl />
          <Magnetic strength={0.3}>
            <a href={contactHref} className={`btn-shine btn-shine--light inline-flex items-center justify-center rounded-lg bg-white font-semibold text-sky-700 shadow-lg shadow-sky-900/10 transition-[background-color,box-shadow,padding] duration-[250ms] hover:bg-sky-50 hover:shadow-xl active:scale-[.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${scrolled ? 'min-h-10 px-4 py-2 text-sm' : 'min-h-11 px-5 py-2.5 text-base'}`}>
              Contact Us
            </a>
          </Magnetic>
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
            <a href={contactHref} onClick={() => setOpen(false)} className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-white px-4 text-sm font-semibold text-sky-700 transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-px motion-reduce:transform-none hover:bg-sky-50 hover:shadow-sm active:scale-[.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto">
              Contact Us
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
