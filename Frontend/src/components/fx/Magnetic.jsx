import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'

// Pulls its child gently toward the mouse pointer, then springs back.
export default function Magnetic({ children, className = '', strength = 0.28 }) {
  const reduceMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.35 })
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.35 })

  function handlePointerMove(event) {
    if (reduceMotion || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    x.set((event.clientX - bounds.left - bounds.width / 2) * strength)
    y.set((event.clientY - bounds.top - bounds.height / 2) * strength)
  }

  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      className={`inline-flex ${className}`}
      style={{ x: springX, y: springY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.span>
  )
}
