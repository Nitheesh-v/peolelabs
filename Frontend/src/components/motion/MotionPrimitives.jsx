import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

// The polymorphic wrappers select only pre-created motion elements from a module-level map.
/* eslint react-hooks/static-components: "off" */

const easeOut = [0.22, 0.61, 0.36, 1]
const motionElements = {
  article: motion.article,
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  li: motion.li,
  nav: motion.nav,
  ol: motion.ol,
  p: motion.p,
  section: motion.section,
  ul: motion.ul,
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.52, ease: easeOut } },
}

function useRevealState(once = true) {
  const ref = useRef(null)
  const [ready, setReady] = useState(false)
  const [visible, setVisible] = useState(true)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion || typeof window === 'undefined' || !('IntersectionObserver' in window) || !ref.current) return undefined

    let hasEntered = false
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return
      if (entry.isIntersecting) {
        hasEntered = true
        setReady(true)
        setVisible(true)
        if (once) observer.unobserve(entry.target)
      } else if (!hasEntered) {
        setReady(true)
        setVisible(false)
      }
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -48px 0px',
    })

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [once, reduceMotion])

  return {
    ref,
    reduceMotion: Boolean(reduceMotion),
    animate: reduceMotion || !ready || visible ? 'visible' : 'hidden',
  }
}

function getMotionComponent(as) {
  return motionElements[as] ?? motion.div
}

export function FadeUp({
  as = 'div',
  children,
  className,
  delay = 0,
  duration = 0.52,
  once = true,
  animateOnMount = false,
  ...props
}) {
  const { ref, reduceMotion, animate } = useRevealState(once)
  const Component = getMotionComponent(as)

  return (
    <Component
      ref={ref}
      className={className}
      variants={fadeUpVariants}
      initial={animateOnMount && !reduceMotion ? 'hidden' : false}
      animate={animate}
      transition={{ duration: reduceMotion ? 0 : duration, delay: reduceMotion ? 0 : delay, ease: easeOut }}
      {...props}
    >
      {children}
    </Component>
  )
}

export function FadeSide({ direction = 'left', ...props }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(query.matches)
    update()
    query.addEventListener?.('change', update)
    return () => query.removeEventListener?.('change', update)
  }, [])

  const { as = 'div', children, className, delay = 0, once = true, animateOnMount = false, ...rest } = props
  const { ref, reduceMotion, animate } = useRevealState(once)
  const Component = getMotionComponent(as)
  const axis = reduceMotion || isMobile ? { x: 0, y: 20 } : { x: direction === 'left' ? -18 : 18, y: 0 }
  const variants = {
    hidden: { opacity: 0, ...axis },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.54, ease: easeOut } },
  }

  return (
    <Component
      ref={ref}
      className={className}
      variants={variants}
      initial={animateOnMount && !reduceMotion ? 'hidden' : false}
      animate={animate}
      transition={{ duration: reduceMotion ? 0 : 0.54, delay: reduceMotion ? 0 : delay, ease: easeOut }}
      {...rest}
    >
      {children}
    </Component>
  )
}

export function StaggerGroup({
  as = 'div',
  children,
  className,
  stagger = 0.08,
  delayChildren = 0.02,
  once = true,
  animateOnMount = false,
  ...props
}) {
  const { ref, reduceMotion, animate } = useRevealState(once)
  const Component = getMotionComponent(as)
  const variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : stagger, delayChildren: reduceMotion ? 0 : delayChildren } },
  }

  return (
    <Component
      ref={ref}
      className={className}
      variants={variants}
      initial={animateOnMount && !reduceMotion ? 'hidden' : false}
      animate={animate}
      {...props}
    >
      {children}
    </Component>
  )
}

export function StaggerItem({ as = 'div', children, className, ...props }) {
  const Component = getMotionComponent(as)
  return (
    <Component
      className={className}
      variants={fadeUpVariants}
      transition={{ duration: 0.52, ease: easeOut }}
      {...props}
    >
      {children}
    </Component>
  )
}

