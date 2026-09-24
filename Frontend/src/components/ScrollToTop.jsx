import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToElement, scrollToTop } from './fx/scroll.js'

// Keep direct route changes at the top, while allowing homepage hash links to
// land below the sticky navbar after their target has been rendered.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const targetId = decodeURIComponent(hash.slice(1))
      const frame = window.requestAnimationFrame(() => {
        scrollToElement(document.getElementById(targetId))
      })
      return () => window.cancelAnimationFrame(frame)
    }

    scrollToTop({ immediate: true })
    return undefined
  }, [pathname, hash])

  return null
}
