import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { setLenis } from './scroll.js'

// Eased wheel scrolling for desktop pointers. Touch devices keep native scrolling,
// and Lenis disables itself when the visitor prefers reduced motion.
export default function SmoothScroll() {
  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reduced) return undefined

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
      anchors: true,
      autoRaf: true,
      stopInertiaOnNavigate: true,
    })
    setLenis(lenis)

    return () => {
      setLenis(null)
      lenis.destroy()
    }
  }, [])

  return null
}
