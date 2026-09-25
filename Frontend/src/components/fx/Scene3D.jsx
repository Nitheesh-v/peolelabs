import { useEffect, useRef } from 'react'
import {
  ACESFilmicToneMapping,
  CapsuleGeometry,
  Color,
  DirectionalLight,
  Group,
  HemisphereLight,
  IcosahedronGeometry,
  MathUtils,
  Mesh,
  MeshPhysicalMaterial,
  OctahedronGeometry,
  PerspectiveCamera,
  PMREMGenerator,
  Scene,
  SphereGeometry,
  SRGBColorSpace,
  TorusGeometry,
  WebGLRenderer,
} from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

// Brand palette
const SKY = '#0ea5e9'
const SKY_LIGHT = '#7dd3fc'
const NAVY = '#0e2656'
const GREEN = '#8fbf45'
const WHITE = '#ffffff'

const geometries = {
  torus: () => new TorusGeometry(0.62, 0.24, 48, 96),
  ring: () => new TorusGeometry(0.7, 0.07, 24, 120),
  cube: () => new RoundedBoxGeometry(1, 1, 1, 6, 0.2),
  slab: () => new RoundedBoxGeometry(2.3, 0.34, 2.3, 6, 0.14),
  sphere: () => new SphereGeometry(0.55, 48, 48),
  ico: () => new IcosahedronGeometry(0.62, 0),
  octa: () => new OctahedronGeometry(0.6, 0),
  capsule: () => new CapsuleGeometry(0.3, 0.7, 12, 32),
}

// sx/sy are fractions of the visible half-width/height; z is depth.
// `m: false` hides a shape on small screens so text stays readable.
const presets = {
  home: [
    { g: 'torus', c: SKY, x: 0.78, y: 0.62, z: -1, s: 0.8, m: false },
    { g: 'cube', c: NAVY, x: 0.12, y: -0.7, z: -1.5, s: 0.7, m: false },
    { g: 'sphere', c: GREEN, x: 0.92, y: -0.55, z: 0, s: 0.45 },
    { g: 'ico', c: WHITE, x: 0.3, y: 0.78, z: -2, s: 0.6, m: false },
    { g: 'capsule', c: SKY_LIGHT, x: -0.95, y: -0.8, z: -2.5, s: 0.7, m: false },
    { g: 'sphere', c: SKY, x: -0.2, y: 0.9, z: -3, s: 0.35, m: false },
  ],
  about: [
    { g: 'ico', c: SKY, x: 0.95, y: 0.7, z: -1, s: 0.75 },
    { g: 'torus', c: NAVY, x: 0.1, y: -0.75, z: -2, s: 0.65, m: false },
    { g: 'sphere', c: GREEN, x: 0.55, y: -0.85, z: 0, s: 0.4, m: false },
    { g: 'cube', c: WHITE, x: -0.25, y: 0.8, z: -2.5, s: 0.55, m: false },
    { g: 'ring', c: SKY_LIGHT, x: -0.9, y: -0.6, z: -2, s: 0.9, m: false },
  ],
  careers: [
    { g: 'capsule', c: SKY, x: 0.95, y: 0.55, z: -1, s: 0.8 },
    { g: 'sphere', c: NAVY, x: 0.15, y: -0.8, z: -2, s: 0.55, m: false },
    { g: 'octa', c: GREEN, x: 0.62, y: -0.82, z: 0, s: 0.5, m: false },
    { g: 'torus', c: WHITE, x: -0.2, y: 0.82, z: -2.5, s: 0.55, m: false },
    { g: 'cube', c: SKY_LIGHT, x: -0.92, y: -0.7, z: -2, s: 0.55, m: false },
  ],
  contact: [
    { g: 'torus', c: SKY, x: 0.8, y: 0.35, z: -0.5, s: 0.85 },
    { g: 'sphere', c: GREEN, x: 0.95, y: -0.55, z: 0, s: 0.4 },
    { g: 'cube', c: NAVY, x: 0.5, y: -0.62, z: -1.5, s: 0.55, m: false },
    { g: 'ico', c: WHITE, x: 0.98, y: 0.85, z: -2, s: 0.5, m: false },
    { g: 'ring', c: SKY_LIGHT, x: 0.42, y: 0.8, z: -3, s: 0.9, m: false },
  ],
  notfound: [
    { g: 'torus', c: SKY, x: -0.7, y: 0.5, z: -1, s: 0.9 },
    { g: 'cube', c: NAVY, x: 0.72, y: -0.45, z: -1, s: 0.75 },
    { g: 'sphere', c: GREEN, x: 0.62, y: 0.7, z: -0.5, s: 0.45 },
    { g: 'ico', c: WHITE, x: -0.62, y: -0.7, z: -1.5, s: 0.6 },
  ],
}

function material(color) {
  const white = color === WHITE
  return new MeshPhysicalMaterial({
    color: new Color(color),
    roughness: white ? 0.12 : 0.22,
    metalness: white ? 0 : 0.08,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    sheen: white ? 0.4 : 0,
    envMapIntensity: 1.15,
  })
}

// Builds the "PeopleSoft platform stack": three floating slabs with an orbit ring.
function buildStack(add) {
  const stack = new Group()
  const layers = [NAVY, SKY, WHITE].map((c, i) => {
    const mesh = add(new Mesh(geometries.slab(), material(c)))
    mesh.userData.baseY = (i - 1) * 0.72
    stack.add(mesh)
    return mesh
  })
  const ring = add(new Mesh(geometries.ring(), material(GREEN)))
  ring.scale.setScalar(2.45)
  ring.rotation.x = Math.PI / 2
  stack.add(ring)
  const orbiters = [SKY_LIGHT, GREEN, NAVY].map((c, i) => {
    const mesh = add(new Mesh(i === 1 ? geometries.sphere() : geometries.cube(), material(c)))
    mesh.scale.setScalar(i === 1 ? 0.32 : 0.28)
    mesh.userData.phase = (i / 3) * Math.PI * 2
    stack.add(mesh)
    return mesh
  })
  stack.rotation.x = 0.5
  return { stack, layers, ring, orbiters }
}

export default function Scene3D({ variant = 'home', start = true, className = '' }) {
  const hostRef = useRef(null)
  const startRef = useRef(start)

  useEffect(() => {
    startRef.current = start
  }, [start])

  useEffect(() => {
    const host = hostRef.current
    if (!host) return undefined
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let renderer
    try {
      renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' })
    } catch {
      return undefined // No WebGL: decorative scene is skipped.
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75))
    renderer.outputColorSpace = SRGBColorSpace
    renderer.toneMapping = ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05
    renderer.domElement.className = 'scene3d-canvas'
    renderer.domElement.setAttribute('aria-hidden', 'true')
    host.appendChild(renderer.domElement)

    const scene = new Scene()
    const pmrem = new PMREMGenerator(renderer)
    const room = new RoomEnvironment()
    const envTexture = pmrem.fromScene(room, 0.04).texture
    scene.environment = envTexture
    scene.add(new HemisphereLight('#e0f2fe', '#0e2656', 0.6))
    const sun = new DirectionalLight('#ffffff', 1.4)
    sun.position.set(4, 6, 5)
    scene.add(sun)

    const camera = new PerspectiveCamera(35, 1, 0.1, 100)
    camera.position.set(0, 0, 10)

    const disposables = []
    const add = (mesh) => {
      disposables.push(mesh.geometry, mesh.material)
      return mesh
    }

    const root = new Group()
    scene.add(root)
    const shapes = []
    let stackParts = null

    if (variant === 'services') {
      stackParts = buildStack(add)
      root.add(stackParts.stack)
    } else {
      for (const [index, spec] of (presets[variant] || presets.home).entries()) {
        const mesh = add(new Mesh(geometries[spec.g](), material(spec.c)))
        mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0)
        mesh.userData = { ...spec, index, phase: Math.random() * Math.PI * 2, spin: 0.15 + Math.random() * 0.25 }
        root.add(mesh)
        shapes.push(mesh)
      }
    }

    let width = 1
    let height = 1
    let mobile = false
    function layout() {
      width = host.clientWidth || 1
      height = host.clientHeight || 1
      mobile = width < 640
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      const halfH = Math.tan(MathUtils.degToRad(camera.fov / 2)) * camera.position.z
      const halfW = halfH * camera.aspect
      for (const mesh of shapes) {
        const { x, y, z, s, m } = mesh.userData
        const depthScale = (camera.position.z - z) / camera.position.z
        mesh.visible = !(mobile && m === false)
        mesh.userData.base = [x * halfW * depthScale, y * halfH * depthScale, z]
        mesh.userData.size = s * (mobile ? 0.75 : 1) * Math.min(1.25, Math.max(0.7, halfW / 6))
      }
      if (stackParts) {
        const fit = Math.min(halfW, halfH) / 2.6
        stackParts.stack.scale.setScalar(Math.min(1.25, fit))
      }
    }
    layout()

    // Pointer parallax (whole window) and scroll-linked rotation.
    const pointer = { x: 0, y: 0 }
    const onPointer = (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') return
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onPointer, { passive: true })

    const easeOutBack = (t) => {
      const c1 = 1.70158
      const c3 = c1 + 1
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
    }

    let frame = 0
    let visible = true
    let appearAt = null
    let last = performance.now()
    let elapsed = 0

    function renderFrame(now) {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      if (!reduced) elapsed += dt
      if (appearAt === null && (startRef.current || reduced)) appearAt = now
      const appear = appearAt === null ? 0 : (now - appearAt) / 1000

      const rect = host.getBoundingClientRect()
      const scroll = reduced ? 0 : MathUtils.clamp(-rect.top / Math.max(1, rect.height), -1, 1.5)

      root.rotation.y += ((reduced ? 0 : pointer.x * 0.28) + scroll * 0.6 - root.rotation.y) * 0.06
      root.rotation.x += ((reduced ? 0 : pointer.y * 0.16) + scroll * 0.25 - root.rotation.x) * 0.06
      root.position.y = scroll * 1.6

      for (const mesh of shapes) {
        if (!mesh.visible) continue
        const { base, size, phase, spin, index } = mesh.userData
        const local = reduced ? 1 : MathUtils.clamp((appear - index * 0.09) / 0.9, 0, 1)
        const scale = size * (reduced ? 1 : easeOutBack(local))
        mesh.scale.setScalar(Math.max(0.0001, scale))
        mesh.position.set(base[0], base[1] + Math.sin(elapsed * 0.9 + phase) * 0.18, base[2])
        mesh.rotation.x += spin * dt
        mesh.rotation.y += spin * 0.8 * dt
      }

      if (stackParts) {
        const { stack, layers, ring, orbiters } = stackParts
        const local = reduced ? 1 : MathUtils.clamp(appear / 1.1, 0, 1)
        const pop = reduced ? 1 : easeOutBack(local)
        const breathe = 1 + Math.sin(elapsed * 1.1) * 0.22
        layers.forEach((layer, i) => {
          const delayed = reduced ? 1 : easeOutBack(MathUtils.clamp((appear - i * 0.12) / 0.9, 0, 1))
          layer.scale.setScalar(Math.max(0.0001, delayed))
          layer.position.y = layer.userData.baseY * breathe * delayed
        })
        stack.rotation.y = elapsed * 0.35
        ring.scale.setScalar(2.45 * Math.max(0.0001, pop))
        ring.rotation.z = elapsed * 0.4
        orbiters.forEach((orb, i) => {
          const angle = elapsed * 0.9 + orb.userData.phase
          orb.position.set(Math.cos(angle) * 1.75, Math.sin(elapsed * 1.4 + i) * 0.5, Math.sin(angle) * 1.75)
          orb.rotation.x += dt
          orb.rotation.y += dt * 0.7
          orb.visible = pop > 0.05
        })
      }

      renderer.render(scene, camera)
      if (!host.dataset.ready) host.dataset.ready = 'true'

      const settling = appearAt === null || appear < 2
      if (visible && !document.hidden && (!reduced || settling)) {
        frame = requestAnimationFrame(renderFrame)
      } else {
        frame = 0
      }
    }

    function ensureRunning() {
      if (!frame && visible && !document.hidden) {
        last = performance.now()
        frame = requestAnimationFrame(renderFrame)
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      layout()
      ensureRunning()
    })
    resizeObserver.observe(host)
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting)
      if (visible) ensureRunning()
    })
    intersectionObserver.observe(host)
    const onVisibility = () => ensureRunning()
    document.addEventListener('visibilitychange', onVisibility)
    ensureRunning()

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      window.removeEventListener('pointermove', onPointer)
      document.removeEventListener('visibilitychange', onVisibility)
      disposables.forEach((item) => item.dispose())
      envTexture.dispose()
      pmrem.dispose()
      room.traverse?.((child) => {
        child.geometry?.dispose?.()
        child.material?.dispose?.()
      })
      renderer.dispose()
      renderer.domElement.remove()
      delete host.dataset.ready
    }
  }, [variant])

  return <div ref={hostRef} className={`scene3d ${className}`} aria-hidden="true" />
}
