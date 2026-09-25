import { sectors } from '../data/content.js'
import { FadeUp } from './motion/MotionPrimitives.jsx'
import RevealWords from './fx/RevealWords.jsx'
import SectorCard from './SectorCard.jsx'

// Compact uniform grid: five small cards in a row on desktop.
const layout = {
  small: true,
  imageClassName: 'aspect-[4/3]',
  sizes: '(min-width: 1024px) 240px, (min-width: 640px) 50vw, 100vw',
}

export default function SectorsSection() {
  return (
    <section id="sectors" className="ambient-bg ambient-bg--duo relative scroll-mt-28 overflow-hidden bg-gradient-to-b from-sky-50 via-sky-50/60 to-white py-12 sm:py-16 lg:py-20" aria-labelledby="sectors-title">
      <div className="fx-grid opacity-60" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
          <p className="eyebrow-line mb-3 text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Industries</p>
          <RevealWords as="h2" id="sectors-title" className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl" text="Our Client Sectors" />
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            PeopleLabs Consulting&apos;s team has proven experience across multiple sectors and industries.
          </p>
        </FadeUp>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5 [perspective:1400px]">
          {sectors.map((sector, index) => (
            <SectorCard
              key={sector.title}
              sector={sector}
              index={index}
              {...layout}
              className={index === 4 ? 'col-span-2 sm:col-span-1' : undefined}
              imageClassName={index === 4 ? 'aspect-[16/9] sm:aspect-[4/3]' : 'aspect-[4/3]'}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
