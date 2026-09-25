import { Link } from 'react-router-dom'
import Container from './Container'
import PageMeta from './PageMeta'

export default function LegalPage({ title, description, children }) {
  return (
    <>
      <PageMeta title={`${title} — Gilbert Kevin Jimmy Kwizera`} description={description} />
      <div className="min-h-[70vh] bg-ivory">
      <Container className="py-24 md:py-32">
        <article className="mx-auto max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-bronze">Legal</p>
          <h1 className="mt-3 text-3xl font-medium tracking-tight text-ink sm:text-4xl">{title}</h1>
          <p className="mt-3 border-b border-line pb-6 text-sm text-muted">Last updated 24 September 2026</p>
          <div className="mt-8 space-y-8 text-[15px] leading-7 text-muted">{children}</div>
          <p className="mt-12 text-sm">
            <Link to="/" className="font-medium text-ink hover:text-bronze">
              Back to home
            </Link>
          </p>
        </article>
      </Container>
      </div>
    </>
  )
}
