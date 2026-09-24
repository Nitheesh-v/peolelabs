import { StaggerGroup, StaggerItem } from './motion/MotionPrimitives.jsx'

// Compact header band used at the top of inner pages.
export default function PageHero({ eyebrow, title, children }) {
  return (
    <section className="page-hero ambient-bg ambient-bg--duo">
      <StaggerGroup as="div" className="container page-hero__inner" animateOnMount stagger={0.08}>
        {eyebrow && <StaggerItem as="span" className="eyebrow">{eyebrow}</StaggerItem>}
        <StaggerItem as="h1">{title}</StaggerItem>
        {children && <StaggerItem as="p">{children}</StaggerItem>}
      </StaggerGroup>
    </section>
  )
}
