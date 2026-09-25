import { Link } from 'react-router-dom'
import Hero3D from '../components/fx/Hero3D.jsx'

export default function NotFound() {
  return (
    <section className="section section--white relative overflow-hidden">
      <Hero3D variant="notfound" />
      <div className="container container--narrow notfound relative z-10">
        <div className="notfound__code">404</div>
        <h1>Page not found</h1>
        <p className="mt-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <Link to="/" className="btn btn--primary btn--lg">
          Back to home
        </Link>
      </div>
    </section>
  )
}
