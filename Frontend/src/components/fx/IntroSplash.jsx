import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { markIntroSeen } from './intro.js'

const ease = [0.76, 0, 0.24, 1]

// Once-per-session brand reveal (~2s). Click, tap or any key skips it immediately.
export default function IntroSplash({ onDone }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    markIntroSeen()
    const timer = window.setTimeout(() => setVisible(false), 1650)
    const skip = () => setVisible(false)
    window.addEventListener('keydown', skip)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('keydown', skip)
    }
  }, [])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="intro"
          className="intro-splash"
          role="presentation"
          onClick={() => setVisible(false)}
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 0.75, ease } }}
        >
          <div className="intro-splash__glow" aria-hidden="true" />
          <motion.div
            className="intro-splash__logo"
            initial={{ clipPath: 'inset(0% 100% 0% 0%)', scale: 0.94, opacity: 0.4 }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)', scale: 1, opacity: 1 }}
            exit={{ y: -40, opacity: 0, transition: { duration: 0.45, ease } }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <img src="/peoplelabs-logo.svg" alt="PeopleLab Consulting Inc." width="560" height="120" />
          </motion.div>
          <div className="intro-splash__bar" aria-hidden="true">
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.3, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
            />
          </div>
          <motion.p
            className="intro-splash__tag"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            Oracle &amp; PeopleSoft Consulting · Edmonton, Canada
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
