const logos = {
  dark: '/peoplelabs-logo.svg',
  light: '/peoplelabs-logo-light.svg',
}

// Brand artwork is transparent; it sits directly on the page surface.
export default function Logo({ size = 'navigation', decorative = false, tone = 'dark' }) {
  const dimensions = size === 'footer'
    ? 'h-16 w-[260px] sm:h-[72px] sm:w-[293px]'
    : 'h-12 w-[196px] sm:h-14 sm:w-[228px]'

  return (
    <span className={`inline-flex max-w-full shrink-0 items-center justify-center ${dimensions}`}>
      <img
        src={logos[tone] || logos.dark}
        alt={decorative ? '' : 'PeopleLab Consulting Inc.'}
        loading={size === 'footer' ? 'lazy' : 'eager'}
        decoding="async"
        className="h-full w-full object-contain"
      />
    </span>
  )
}
