import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import Icon from './Icon.jsx'
import HeroVisual from './HeroVisual.jsx'
import ParticleField from './fx/ParticleField.jsx'
import RevealWords from './fx/RevealWords.jsx'
import Magnetic from './fx/Magnetic.jsx'
import { useIntroDone } from './fx/intro.js'
import Depth3D from './fx/Depth3D.jsx'

const ease = [0.16, 1, 0.3, 1]
const rise = {
  hidden: { opacity: 0, y: 26, filter: 'blur(6px)' },
  visible: (delay = 0) => ({ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease, delay } }),
}

export default function Hero() {
  const sectionRef = useRef(null)
  const introDone = useIntroDone()
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -70])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.2])
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, 0.94])
  const state = reduceMotion ? 'visible' : introDone ? 'visible' : 'hidden'
  const initial = reduceMotion ? false : 'hidden'

  function handlePointerMove(event) {
    if (event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--sx', `${event.clientX - bounds.left}px`)
    event.currentTarget.style.setProperty('--sy', `${event.clientY - bounds.top}px`)
  }

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      className="relative isolate overflow-hidden bg-white"
      aria-labelledby="home-title"
    >
      <div className="aurora" aria-hidden="true">
        <span className="aurora__blob aurora__blob--1" />
        <span className="aurora__blob aurora__blob--2" />
        <span className="aurora__blob aurora__blob--3" />
      </div>
      <div className="fx-grid" aria-hidden="true" />
      <ParticleField className="z-0 opacity-80" />
      <div className="fx-spotlight" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-8 lg:py-24">
        <motion.div className="max-w-2xl" style={reduceMotion ? undefined : { y: copyY, opacity: copyOpacity }}>
          <motion.p
            variants={rise}
            initial={initial}
            animate={state}
            custom={0}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-sky-200/80 bg-white/70 px-4 py-2 text-sm font-semibold tracking-wide text-sky-700 shadow-sm backdrop-blur"
          >
            <span aria-hidden="true" className="pulse-dot h-2 w-2 rounded-full bg-sky-500" />
            Oracle &amp; PeopleSoft Consulting
          </motion.p>

          <RevealWords
            as="h1"
            id="home-title"
            start={introDone}
            delay={0.12}
            stagger={0.06}
            className="text-4xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
            segments={[
              { text: 'Oracle & PeopleSoft', wordClassName: 'text-shimmer' },
              { text: ' Expertise That Moves Your Business Forward' },
            ]}
          />

          <motion.p variants={rise} initial={initial} animate={state} custom={0.65} className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Founded in 2016, PeopleLabs Consulting provides high-quality IT consulting services to organizations across a range of industries. Our expertise spans PeopleSoft FSCM, PeopleSoft HCM, PeopleSoft Campus Solutions, Oracle Cloud, managed services, training, and reporting.
          </motion.p>

          <motion.div variants={rise} initial={initial} animate={state} custom={0.78} className="mt-7 inline-flex items-center gap-2.5 text-sm font-medium text-slate-700">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 text-sky-700" aria-hidden="true">
              <Icon name="check" size={15} strokeWidth={2.2} />
            </span>
            Delivering Oracle expertise since 2016
          </motion.div>

          <motion.div variants={rise} initial={initial} animate={state} custom={0.9} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Magnetic className="w-full sm:w-auto">
              <a href="#expertise" className="btn-shine inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 to-sky-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-sky-500/30 transition-[box-shadow,transform] duration-200 hover:shadow-xl hover:shadow-sky-500/40 active:scale-[.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 sm:w-auto">
                Explore Our Expertise
                <Icon name="arrow-right" size={19} className="cta-arrow" />
              </a>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <a href="#contact" className="inline-flex min-h-12 w-full items-center justify-center rounded-lg border border-sky-500 bg-white/80 px-6 py-3 text-base font-semibold text-sky-700 backdrop-blur transition-[color,background-color,box-shadow] duration-200 hover:bg-sky-50 hover:shadow-md active:scale-[.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 sm:w-auto">
                Contact Us
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        <motion.div
          className="mx-auto w-full max-w-[560px] lg:justify-self-end"
          style={reduceMotion ? undefined : { y: visualY, scale: visualScale }}
        >
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.9, rotate: -2, filter: 'blur(10px)' }}
            animate={state === 'visible' ? { opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)', transitionEnd: { filter: 'none' } } : undefined}
            transition={{ duration: 1.1, ease, delay: 0.35 }}
          >
            <Depth3D max={8}>
              <HeroVisual start={state === 'visible'} />
            </Depth3D>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#sectors"
        aria-label="Scroll to client sectors"
        className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 lg:inline-flex"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={state === 'visible' ? { opacity: 1 } : undefined}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span className="scroll-cue"><span /></span>
      </motion.a>
    </section>
  )
}
