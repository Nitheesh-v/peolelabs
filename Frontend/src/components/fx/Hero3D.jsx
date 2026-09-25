import { lazy, Suspense, useEffect, useState } from 'react'

const Scene3D = lazy(() => import('./Scene3D.jsx'))

// Loads the three.js scene only after the page is idle, so it never delays
// first paint or navigation. Skipped when the user asks to save data.
export default function Hero3D({ variant, start = true, className = '' }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (navigator.connection?.saveData) return undefined
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(() => setReady(true), { timeout: 900 })
      return () => window.cancelIdleCallback(id)
    }
    const id = window.setTimeout(() => setReady(true), 250)
    return () => window.clearTimeout(id)
  }, [])

  if (!ready) return null
  return (
    <Suspense fallback={null}>
      <Scene3D variant={variant} start={start} className={className} />
    </Suspense>
  )
}
