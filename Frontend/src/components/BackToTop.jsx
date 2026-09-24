import { useEffect, useState } from 'react'
import Icon from './Icon.jsx'

export default function BackToTop() {
  const [visible, setVisible] = useState(() => typeof window !== 'undefined' && window.scrollY > 400)

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', updateVisibility, { passive: true })
    return () => window.removeEventListener('scroll', updateVisibility)
  }, [])

  if (!visible) return null

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({
        top: 0,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      })}
      className="fixed bottom-6 right-6 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-sky-500 text-white shadow-lg shadow-slate-900/20 transition-colors hover:bg-sky-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
    >
      <Icon name="arrow-up" size={21} strokeWidth={2} />
    </button>
  )
}
