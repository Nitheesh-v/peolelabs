import { StaggerGroup, StaggerItem } from './motion/MotionPrimitives.jsx'
import Hero3D from './fx/Hero3D.jsx'

// Compact header band used at the top of inner pages.
export default function PageHero({ eyebrow, title, children, scene }) {
  return (
    <section className="page-hero ambient-bg ambient-bg--duo relative overflow-hidden">
      {scene && <Hero3D variant={scene} />}
      <StaggerGroup as="div" className="container page-hero__inner relative z-10" animateOnMount stagger={0.08}>
        {eyebrow && <StaggerItem as="span" className="eyebrow">{eyebrow}</StaggerItem>}
        <StaggerItem as="h1">{title}</StaggerItem>
        {children && <StaggerItem as="p">{children}</StaggerItem>}
      </StaggerGroup>
    </section>
  )
}
