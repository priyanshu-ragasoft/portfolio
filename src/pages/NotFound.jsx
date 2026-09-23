import { Link } from 'react-router-dom'
import Container from '../components/Container'
import PageMeta from '../components/PageMeta'

export default function NotFound() {
  return (
    <>
      <PageMeta title="Page not found — Gilbert Kevin Jimmy Kwizera" />
      <Container data-scene="missing" className="py-40">
        <p data-missing="kicker" className="text-xs uppercase tracking-[0.2em] text-muted">
          404
        </p>
        <h1 data-missing="title" className="display mt-4 text-5xl text-ink sm:text-7xl">
          This page is not on the record.
        </h1>
        <Link data-missing="link" to="/" className="mt-8 inline-block text-sm font-medium hover:text-bronze">
          Return home
        </Link>
      </Container>
    </>
  )
}
