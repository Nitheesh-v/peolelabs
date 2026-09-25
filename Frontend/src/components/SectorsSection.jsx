import { sectors } from '../data/content.js'
import { FadeUp } from './motion/MotionPrimitives.jsx'
import RevealWords from './fx/RevealWords.jsx'
import SectorCard from './SectorCard.jsx'

// Bento layout: two featured sectors on top, three below (desktop).
const layout = [
  { className: 'lg:col-span-3', imageClassName: 'aspect-[16/10] lg:aspect-[16/9]', sizes: '(min-width: 1024px) 600px, (min-width: 640px) 50vw, 100vw' },
  { className: 'lg:col-span-3', imageClassName: 'aspect-[16/10] lg:aspect-[16/9]', sizes: '(min-width: 1024px) 600px, (min-width: 640px) 50vw, 100vw' },
  { className: 'lg:col-span-2', imageClassName: 'aspect-[16/10] lg:aspect-[4/3]' },
  { className: 'lg:col-span-2', imageClassName: 'aspect-[16/10] lg:aspect-[4/3]' },
  { className: 'sm:col-span-2 lg:col-span-2', imageClassName: 'aspect-[16/10] sm:aspect-[21/9] lg:aspect-[4/3]', sizes: '(min-width: 1024px) 400px, 100vw' },
]

export default function SectorsSection() {
  return (
    <section id="sectors" className="ambient-bg ambient-bg--duo relative scroll-mt-28 overflow-hidden bg-gradient-to-b from-sky-50 via-sky-50/60 to-white py-16 sm:py-20 lg:py-24" aria-labelledby="sectors-title">
      <div className="fx-grid opacity-60" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
          <p className="eyebrow-line mb-3 text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Industries</p>
          <RevealWords as="h2" id="sectors-title" className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl" text="Our Client Sectors" />
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            PeopleLabs Consulting&apos;s team has proven experience across multiple sectors and industries.
          </p>
        </FadeUp>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6 lg:gap-6 [perspective:1400px]">
          {sectors.map((sector, index) => (
            <SectorCard key={sector.title} sector={sector} index={index} {...layout[index]} />
          ))}
        </div>
      </div>
    </section>
  )
}
