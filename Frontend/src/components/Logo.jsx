const logoUrl = '/peoplelabs-logo.svg'

// Brand artwork sits on its light-blue brand background, matching the supplied logo image.
export default function Logo({ size = 'navigation', decorative = false }) {
  const dimensions = size === 'footer'
    ? 'h-16 w-[272px] px-3 py-2 sm:h-[72px] sm:w-[306px]'
    : 'h-12 w-[208px] px-2.5 py-1.5 sm:h-14 sm:w-[252px] sm:px-3'

  return (
    <span className={`inline-flex max-w-full shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#6ec3fa] shadow-sm ring-1 ring-white/40 ${dimensions}`}>
      <img
        src={logoUrl}
        alt={decorative ? '' : 'PeopleLab Consulting Inc.'}
        loading={size === 'footer' ? 'lazy' : 'eager'}
        decoding="async"
        className="h-full w-full object-contain"
      />
    </span>
  )
}
