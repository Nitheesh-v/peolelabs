import { useEffect, useRef } from 'react'

// Interactive "connected network" canvas: drifting nodes link up when close and
// reach toward the pointer. Pauses off-screen / in hidden tabs; static when motion is reduced.
export default function ParticleField({ className = '', density = 1, color = '14, 165, 233', accent = '63, 143, 44' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const context = canvas.getContext('2d')
    if (!context) return undefined

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pointer = { x: -9999, y: -9999, active: false }
    let particles = []
    let width = 0
    let height = 0
    let frame = 0
    let running = false
    let visible = true

    function build() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      const bounds = canvas.getBoundingClientRect()
      width = bounds.width
      height = bounds.height
      canvas.width = Math.max(1, Math.round(width * ratio))
      canvas.height = Math.max(1, Math.round(height * ratio))
      context.setTransform(ratio, 0, 0, ratio, 0, 0)

      const count = Math.round(Math.min(90, Math.max(22, (width * height) / 16000)) * density)
      particles = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        r: Math.random() * 1.6 + 1,
        green: index % 9 === 0,
      }))
    }

    function draw() {
      context.clearRect(0, 0, width, height)
      const linkDistance = Math.min(150, Math.max(95, width / 11))

      for (const particle of particles) {
        if (!reduced) {
          particle.x += particle.vx
          particle.y += particle.vy
          if (particle.x < -10) particle.x = width + 10
          if (particle.x > width + 10) particle.x = -10
          if (particle.y < -10) particle.y = height + 10
          if (particle.y > height + 10) particle.y = -10

          if (pointer.active) {
            const dx = pointer.x - particle.x
            const dy = pointer.y - particle.y
            const distance = Math.hypot(dx, dy)
            if (distance < 180 && distance > 0.1) {
              particle.x += (dx / distance) * 0.35
              particle.y += (dy / distance) * 0.35
            }
          }
        }
      }

      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j]
          const distance = Math.hypot(a.x - b.x, a.y - b.y)
          if (distance < linkDistance) {
            context.strokeStyle = `rgba(${color}, ${(1 - distance / linkDistance) * 0.28})`
            context.lineWidth = 1
            context.beginPath()
            context.moveTo(a.x, a.y)
            context.lineTo(b.x, b.y)
            context.stroke()
          }
        }
        if (pointer.active) {
          const distance = Math.hypot(a.x - pointer.x, a.y - pointer.y)
          if (distance < 190) {
            context.strokeStyle = `rgba(${color}, ${(1 - distance / 190) * 0.55})`
            context.lineWidth = 1.2
            context.beginPath()
            context.moveTo(a.x, a.y)
            context.lineTo(pointer.x, pointer.y)
            context.stroke()
          }
        }
      }

      for (const particle of particles) {
        context.fillStyle = particle.green ? `rgba(${accent}, 0.75)` : `rgba(${color}, 0.7)`
        context.beginPath()
        context.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2)
        context.fill()
      }
    }

    function loop() {
      draw()
      frame = window.requestAnimationFrame(loop)
    }

    function start() {
      if (running || reduced || !visible || document.hidden) return
      running = true
      frame = window.requestAnimationFrame(loop)
    }

    function stop() {
      running = false
      window.cancelAnimationFrame(frame)
    }

    function handlePointerMove(event) {
      if (event.pointerType !== 'mouse') return
      const bounds = canvas.getBoundingClientRect()
      pointer.x = event.clientX - bounds.left
      pointer.y = event.clientY - bounds.top
      pointer.active = pointer.x >= 0 && pointer.y >= 0 && pointer.x <= bounds.width && pointer.y <= bounds.height
    }

    function handleVisibility() {
      if (document.hidden) stop()
      else start()
    }

    build()
    draw()

    const resizeObserver = new ResizeObserver(() => {
      build()
      if (!running) draw()
    })
    resizeObserver.observe(canvas)

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting)
      if (visible) start()
      else stop()
    })
    intersectionObserver.observe(canvas)

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    document.addEventListener('visibilitychange', handleVisibility)
    start()

    return () => {
      stop()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      window.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [accent, color, density])

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />
}
