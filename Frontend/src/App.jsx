import { Suspense, lazy, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import BackToTop from './components/BackToTop.jsx'
import SmoothScroll from './components/fx/SmoothScroll.jsx'
import ScrollProgress from './components/fx/ScrollProgress.jsx'
import IntroSplash from './components/fx/IntroSplash.jsx'
import { IntroContext, shouldPlayIntro } from './components/fx/intro.js'
import Home from './pages/Home.jsx'

// Inner pages load on demand so the homepage ships less JavaScript up front.
const About = lazy(() => import('./pages/About.jsx'))
const Services = lazy(() => import('./pages/Services.jsx'))
const Careers = lazy(() => import('./pages/Careers.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

export default function App() {
  const location = useLocation()
  const reduceMotion = useReducedMotion()
  const [playIntro] = useState(shouldPlayIntro)
  const [introDone, setIntroDone] = useState(() => !playIntro)

  return (
    <IntroContext.Provider value={introDone}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      {playIntro && !introDone && <IntroSplash onDone={() => setIntroDone(true)} />}
      <SmoothScroll />
      <ScrollProgress />
      <ScrollToTop />
      <Navbar />
      <main id="main">
        <AnimatePresence initial={false}>
          <motion.div
            key={location.pathname}
            style={{ transformOrigin: '50% 0%' }}
            initial={reduceMotion ? false : { opacity: 0, y: 40, rotateX: 9, scale: 0.97, transformPerspective: 1600, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1, transformPerspective: 1600, filter: 'blur(0px)', transitionEnd: { filter: 'none', transform: 'none' } }}
            transition={{ duration: reduceMotion ? 0 : 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <Suspense fallback={<div className="min-h-[70vh]" aria-busy="true" />}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <BackToTop />
    </IntroContext.Provider>
  )
}
