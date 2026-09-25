import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'

// 3D tilt + cursor spotlight card. Mouse-only; touch and reduced-motion get a flat card.
const tags = { article: motion.article, div: motion.div, li: motion.li }

export default function TiltCard({ as = 'div', children, className = '', max = 8, glare = true, ...props }) {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const springConfig = { stiffness: 220, damping: 20, mass: 0.4 }
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), springConfig)
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), springConfig)
  const Component = tags[as] ?? motion.div

  function handlePointerMove(event) {
    const element = ref.current
    if (!element) return
    const bounds = element.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height
    element.style.setProperty('--mx', `${x * 100}%`)
    element.style.setProperty('--my', `${y * 100}%`)
    if (reduceMotion || event.pointerType !== 'mouse') return
    px.set(x)
    py.set(y)
  }

  function handlePointerLeave() {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <Component
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      className={`spotlight-card ${glare ? 'spotlight-card--glare' : ''} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
