import Icon from './Icon.jsx'
import { sectors } from '../data/content.js'
import { FadeUp, StaggerGroup, StaggerItem } from './motion/MotionPrimitives.jsx'

export default function SectorsSection() {
  return (
    <section id="sectors" className="ambient-bg scroll-mt-28 bg-sky-50 py-16 sm:py-20 lg:py-24" aria-labelledby="sectors-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-sky-700">Industries</p>
          <h2 id="sectors-title" className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">Our Client Sectors</h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            PeopleLabs Consulting&apos;s team has proven experience across multiple sectors and industries.
          </p>
        </FadeUp>
        <StaggerGroup className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-5" stagger={0.085}>
          {sectors.map((sector) => (
            <StaggerItem as="article" key={sector.title} className="group flex min-h-36 flex-col items-center justify-center gap-4 rounded-xl border border-slate-200 bg-white px-4 py-6 text-center shadow-sm transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-1.5 hover:border-sky-300 hover:shadow-md focus-within:border-sky-300 motion-reduce:transform-none motion-reduce:transition-none">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-50 text-sky-600 transition-[background-color,transform,box-shadow] duration-200 group-hover:-translate-y-0.5 group-hover:scale-105 group-hover:bg-sky-100 group-hover:shadow-[0_0_16px_rgba(14,165,233,0.18)] motion-reduce:transform-none motion-reduce:transition-none" aria-hidden="true">
                <Icon name={sector.icon} size={25} strokeWidth={1.8} />
              </span>
              <h3 className="text-base font-semibold text-slate-900 sm:text-lg">{sector.title}</h3>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
