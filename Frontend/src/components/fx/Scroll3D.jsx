import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

// Scroll-linked 3D: the block starts tilted back like a card lying on a table
// and stands upright as it scrolls into view. Pure transform, never hides content.
export default function Scroll3D({ as = 'div', children, className = '', tilt = 20 }) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.5'] })
  const rotateX = useTransform(scrollYProgress, [0, 1], [tilt, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1])
  const y = useTransform(scrollYProgress, [0, 1], [50, 0])
  const Component = as

  if (reduceMotion) {
    return <Component ref={ref} className={className}>{children}</Component>
  }

  return (
    <Component ref={ref} className={`[perspective:1600px] ${className}`}>
      <motion.div style={{ rotateX, scale, y, transformOrigin: '50% 100%' }}>{children}</motion.div>
    </Component>
  )
}
