import Icon from './Icon.jsx'
import { sectors } from '../data/content.js'
import { FadeUp, StaggerGroup, StaggerItem } from './motion/MotionPrimitives.jsx'
import RevealWords from './fx/RevealWords.jsx'
import TiltCard from './fx/TiltCard.jsx'

export default function SectorsSection() {
  return (
    <section id="sectors" className="ambient-bg scroll-mt-28 bg-sky-50 py-16 sm:py-20 lg:py-24" aria-labelledby="sectors-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <p className="eyebrow-line mb-3 text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Industries</p>
          <RevealWords as="h2" id="sectors-title" className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl" text="Our Client Sectors" />
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            PeopleLabs Consulting&apos;s team has proven experience across multiple sectors and industries.
          </p>
        </FadeUp>
        <StaggerGroup className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-5" stagger={0.085}>
          {sectors.map((sector) => (
            <StaggerItem as="div" key={sector.title} className="h-full">
              <TiltCard as="article" max={12} className="group flex h-full min-h-36 flex-col items-center justify-center gap-4 rounded-xl border border-slate-200 bg-white/90 px-4 py-6 text-center shadow-sm backdrop-blur transition-[border-color,box-shadow] duration-300 ease-out hover:border-sky-100 hover:shadow-xl hover:shadow-sky-500/10">
                <span className="tilt-pop flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sky-50 to-sky-100 text-sky-600 transition-[background-color,box-shadow,color] duration-300 group-hover:from-sky-500 group-hover:to-sky-600 group-hover:text-white group-hover:shadow-[0_10px_24px_-6px_rgba(14,165,233,0.6)]" aria-hidden="true">
                  <Icon name={sector.icon} size={25} strokeWidth={1.8} />
                </span>
                <h3 className="tilt-pop text-base font-semibold text-slate-900 sm:text-lg">{sector.title}</h3>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
