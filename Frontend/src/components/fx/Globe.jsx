import { useEffect, useRef } from 'react'
import createGlobe from 'cobe'

const EDMONTON = [53.5461, -113.4938]
// Longitude that faces the viewer (cobe's phi convention).
const BASE_PHI = Math.PI - ((EDMONTON[1] * Math.PI) / 180 - Math.PI / 2)
const BASE_THETA = 0.32

// Same projection cobe uses in its marker shader, so the HTML pin tracks the globe.
function project([lat, lng], phi, theta) {
  const r = (lat * Math.PI) / 180
  const a = (lng * Math.PI) / 180 - Math.PI
  const o = Math.cos(r)
  const p = [-o * Math.cos(a), Math.sin(r), o * Math.sin(a)].map((v) => v * 0.8)
  const c = Math.cos(theta)
  const d = Math.sin(theta)
  const e = Math.cos(phi)
  const f = Math.sin(phi)
  return {
    x: e * p[0] + f * p[2],
    y: f * d * p[0] + c * p[1] - e * d * p[2],
    z: -f * c * p[0] + d * p[1] + e * c * p[2],
  }
}

// Interactive WebGL globe centred on the Edmonton head office. Sways gently,
// can be dragged, pauses off-screen, and stays still for reduced motion.
export default function Globe({ className = '', label = 'Edmonton' }) {
  const canvasRef = useRef(null)
  const pinRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ratio = Math.min(window.devicePixelRatio || 1, 2)
    let size = canvas.offsetWidth || 400
    let globe
    try {
      globe = createGlobe(canvas, {
        devicePixelRatio: ratio,
        width: size * ratio,
        height: size * ratio,
        phi: BASE_PHI,
        theta: BASE_THETA,
        dark: 0,
        diffuse: 1.2,
        mapSamples: 20000,
        mapBrightness: 6,
        baseColor: [1, 1, 1],
        markerColor: [1, 1, 1],
        glowColor: [0.85, 0.94, 1],
        markers: [],
        opacity: 1,
      })
    } catch {
      return undefined // WebGL unavailable: the decorative globe is simply omitted.
    }
    canvas.dataset.ready = 'true'

    let frame = 0
    let visible = true
    let dragStart = null
    let dragOffset = 0
    let dragVelocity = 0
    let tiltOffset = 0
    const start = performance.now()

    function render(now) {
      const t = (now - start) / 1000
      if (dragStart === null) {
        dragOffset += dragVelocity
        dragVelocity *= 0.94
        dragOffset *= 0.985 // ease back toward Edmonton
        tiltOffset *= 0.95
      }
      const sway = reduced ? 0 : Math.sin(t * 0.35) * 0.55
      const phi = BASE_PHI + sway + dragOffset
      const theta = BASE_THETA + tiltOffset
      globe.update({ phi, theta })
      const pin = pinRef.current
      if (pin) {
        const point = project(EDMONTON, phi, theta)
        pin.style.transform = `translate3d(${(50 + point.x * 50).toFixed(2)}cqw, ${(50 - point.y * 50).toFixed(2)}cqw, 0)`
        pin.style.opacity = point.z > 0.05 ? '1' : '0'
      }
      if (!reduced || dragStart !== null || Math.abs(dragVelocity) > 0.0005) {
        frame = requestAnimationFrame(render)
      } else {
        frame = 0
      }
    }

    function ensureRunning() {
      if (!frame && visible && !document.hidden) frame = requestAnimationFrame(render)
    }

    function onPointerDown(event) {
      dragStart = { x: event.clientX, y: event.clientY, offset: dragOffset, tilt: tiltOffset }
      canvas.setPointerCapture?.(event.pointerId)
      ensureRunning()
    }
    function onPointerMove(event) {
      if (!dragStart) return
      const nextOffset = dragStart.offset + (event.clientX - dragStart.x) / 160
      dragVelocity = nextOffset - dragOffset
      dragOffset = nextOffset
      tiltOffset = Math.max(-0.3, Math.min(0.3, dragStart.tilt + (event.clientY - dragStart.y) / 400))
    }
    function onPointerUp() {
      dragStart = null
      ensureRunning()
    }

    const resizeObserver = new ResizeObserver(() => {
      size = canvas.offsetWidth || size
      globe.update({ width: size * ratio, height: size * ratio })
      ensureRunning()
    })
    resizeObserver.observe(canvas)

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting)
      if (visible) ensureRunning()
      else {
        cancelAnimationFrame(frame)
        frame = 0
      }
    })
    intersectionObserver.observe(canvas)

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame)
        frame = 0
      } else ensureRunning()
    }

    canvas.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerup', onPointerUp)
    document.addEventListener('visibilitychange', onVisibility)
    ensureRunning()

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      canvas.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      document.removeEventListener('visibilitychange', onVisibility)
      globe.destroy()
    }
  }, [])

  return (
    <div className={`globe-wrap ${className}`}>
      <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
        <filter id="globe-tint" colorInterpolationFilters="sRGB">
          {/* Map cobe's dark land dots to brand sky blue while the sphere stays white. */}
          <feComponentTransfer>
            <feFuncR type="table" tableValues="0.0 0.95" />
            <feFuncG type="table" tableValues="0.52 0.985" />
            <feFuncB type="table" tableValues="0.8 1" />
          </feComponentTransfer>
        </filter>
      </svg>
      <canvas ref={canvasRef} className="globe-canvas touch-pan-y" aria-hidden="true" />
      <div ref={pinRef} className="globe-pin" aria-hidden="true">
        <span className="globe-pin__ring" />
        <span className="globe-pin__dot" />
        <span className="globe-pin__label">{label}</span>
      </div>
    </div>
  )
}
