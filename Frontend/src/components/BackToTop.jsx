import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import Icon from './Icon.jsx'
import { scrollToTop } from './fx/scroll.js'

export default function BackToTop() {
  const [visible, setVisible] = useState(() => typeof window !== 'undefined' && window.scrollY > 400)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', updateVisibility, { passive: true })
    return () => window.removeEventListener('scroll', updateVisibility)
  }, [])

  return (
    <motion.button
      type="button"
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      disabled={!visible}
      onClick={() => scrollToTop()}
      initial={false}
      animate={visible ? 'visible' : 'hidden'}
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: reduceMotion ? 1 : 0.7, y: reduceMotion ? 0 : 10 },
      }}
      transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 330, damping: 25 }}
      whileHover={reduceMotion || !visible ? undefined : { scale: 1.08 }}
      whileTap={reduceMotion || !visible ? undefined : { scale: 0.92 }}
      className={`group fixed bottom-4 right-4 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full bg-sky-500 text-white shadow-lg shadow-slate-900/20 transition-colors hover:bg-sky-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 sm:bottom-6 sm:right-6 sm:h-12 sm:w-12 ${visible ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      <Icon name="arrow-up" size={21} strokeWidth={2} className="transition-transform duration-200 group-hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none" />
    </motion.button>
  )
}
