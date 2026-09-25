import Icon from './Icon.jsx'
import Marquee from './fx/Marquee.jsx'

// Capabilities named in the hero copy, presented as a continuously moving band.
const capabilities = [
  { label: 'PeopleSoft FSCM', icon: 'dollar-sign' },
  { label: 'PeopleSoft HCM', icon: 'users' },
  { label: 'PeopleSoft Campus Solutions', icon: 'graduation-cap' },
  { label: 'Oracle Cloud', icon: 'cloud' },
  { label: 'Managed Services', icon: 'server' },
  { label: 'Training', icon: 'book-open' },
  { label: 'Reporting', icon: 'bar-chart' },
]

export default function CapabilityTicker() {
  return (
    <div className="relative border-y border-sky-100 bg-gradient-to-r from-white via-sky-50/70 to-white py-5">
      <Marquee
        label="Our capabilities"
        items={capabilities}
        speed={36}
        renderItem={(item) => (
          <span className="group inline-flex items-center gap-3 rounded-full border border-sky-100 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-colors duration-300 hover:border-sky-300 hover:text-sky-700 sm:text-base">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-50 text-sky-600 transition-colors duration-300 group-hover:bg-sky-500 group-hover:text-white" aria-hidden="true">
              <Icon name={item.icon} size={16} strokeWidth={2} />
            </span>
            {item.label}
          </span>
        )}
      />
    </div>
  )
}
