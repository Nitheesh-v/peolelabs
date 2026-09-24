import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Keep direct route changes at the top, while allowing homepage hash links to
// land below the sticky navbar after their target has been rendered.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const targetId = decodeURIComponent(hash.slice(1))
      const frame = window.requestAnimationFrame(() => {
        document.getElementById(targetId)?.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
          block: 'start',
        })
      })
      return () => window.cancelAnimationFrame(frame)
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    return undefined
  }, [pathname, hash])

  return null
}
