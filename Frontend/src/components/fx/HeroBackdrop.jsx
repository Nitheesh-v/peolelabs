import ParticleField from './ParticleField.jsx'
import Hero3D from './Hero3D.jsx'

// Shared animated backdrop for page heroes: aurora glow, fading grid and a live network.
export default function HeroBackdrop({ density = 0.7, scene, start = true }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="aurora">
        <span className="aurora__blob aurora__blob--1" />
        <span className="aurora__blob aurora__blob--2" />
        <span className="aurora__blob aurora__blob--3" />
      </div>
      <div className="fx-grid" />
      <ParticleField className="opacity-70" density={density} />
      {scene && <Hero3D variant={scene} start={start} />}
    </div>
  )
}
