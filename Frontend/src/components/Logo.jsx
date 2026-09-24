const logoUrl = '/peoplelabs-logo.svg'

export default function Logo({ size = 'navigation', decorative = false }) {
  const dimensions = size === 'footer'
    ? 'h-12 w-[220px] sm:w-[240px]'
    : 'h-10 w-[190px] sm:h-11 sm:w-[210px]'

  return (
    <span className={`inline-flex max-w-full shrink-0 overflow-hidden rounded bg-white ${dimensions}`}>
      <img
        src={logoUrl}
        alt={decorative ? '' : 'PeopleLabs Consulting Inc.'}
        loading={size === 'footer' ? 'lazy' : 'eager'}
        decoding="async"
        className="h-full w-full object-contain p-0.5"
      />
    </span>
  )
}
