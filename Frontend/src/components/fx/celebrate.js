// Brand-coloured confetti burst for genuine successful submissions only.
// The library is loaded on demand so it never weighs down the initial page load.
export async function celebrate() {
  if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const { default: confetti } = await import('canvas-confetti')
  const colors = ['#0ea5e9', '#38bdf8', '#0e2656', '#3f8f2c', '#8fbf45', '#d42027']
  const defaults = { spread: 70, ticks: 220, gravity: 0.9, scalar: 0.95, colors, disableForReducedMotion: true, zIndex: 80 }
  confetti({ ...defaults, particleCount: 70, origin: { x: 0.2, y: 0.7 }, angle: 60 })
  confetti({ ...defaults, particleCount: 70, origin: { x: 0.8, y: 0.7 }, angle: 120 })
  window.setTimeout(() => confetti({ ...defaults, particleCount: 50, spread: 110, origin: { x: 0.5, y: 0.55 } }), 220)
}
