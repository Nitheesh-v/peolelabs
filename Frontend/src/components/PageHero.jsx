// Compact header band used at the top of inner pages.
export default function PageHero({ eyebrow, title, children }) {
  return (
    <section className="page-hero">
      <div className="container page-hero__inner">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {children && <p>{children}</p>}
      </div>
    </section>
  )
}
