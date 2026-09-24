const logoUrl = 'https://img1.wsimg.com/isteam/ip/281a6117-1d6b-448b-9c27-d6e0e84c5262/blob-59b6b97.png/:/rs=h:200,cg:true,m/qt=q:95'

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
