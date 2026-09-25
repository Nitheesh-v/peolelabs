import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'

// Wraps an illustration in real 3D perspective: a slow idle float plus a
// pointer-driven tilt. Mouse only; reduced motion renders it flat.
export default function Depth3D({ children, className = '', max = 10, float = true }) {
  const reduceMotion = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const spring = { stiffness: 120, damping: 16, mass: 0.6 }
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring)
  const rotateY = useSpring(useTransform(px, [0, 1], [-max * 1.2, max * 1.2]), spring)

  function handlePointerMove(event) {
    if (reduceMotion || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    px.set((event.clientX - bounds.left) / bounds.width)
    py.set((event.clientY - bounds.top) / bounds.height)
  }

  function reset() {
    px.set(0.5)
    py.set(0.5)
  }

  if (reduceMotion) return <div className={className}>{children}</div>

  return (
    <div className={`[perspective:1200px] ${className}`} onPointerMove={handlePointerMove} onPointerLeave={reset}>
      <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>
        <div className={float ? 'float-3d' : undefined}>{children}</div>
      </motion.div>
    </div>
  )
}
