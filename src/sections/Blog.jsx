import { Link } from 'react-router-dom'
import BlogCard from '../components/BlogCard'
import Button from '../components/Button'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import { posts } from '../data/blog'

export default function Blog({ limit, page = false }) {
  const visible = typeof limit === 'number' ? posts.slice(0, limit) : posts
  const [featured, ...rest] = visible

  return (
    <section
      id="insights"
      data-scene="insights"
      className={`bg-ivory ${page ? 'pt-32 pb-20 md:pt-40 md:pb-32' : 'py-20 md:py-32'}`}
    >
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading as={page ? 'h1' : 'h2'} eyebrow="Insights" title="Notes from the work">
            Essays and short films published on his site, kept in his own record rather than retold
            as something else.
          </SectionHeading>
          {limit ? (
            <Button to="/insights" data-insights-action variant="ghost" className="shrink-0 text-ink">
              View All Insights
            </Button>
          ) : null}
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <div data-feature className="lg:col-span-7">
            <BlogCard post={featured} layout="feature" />
          </div>
          <div data-side className="space-y-8 lg:col-span-5">
            {rest.map((post) => (
              <div key={post.slug}>
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        </div>

        {!limit ? (
          <p data-insights-note className="mt-16 text-sm text-muted">
            Looking for the project records? They live on the{' '}
            <Link to="/projects" className="text-ink underline decoration-line underline-offset-4">
              projects
            </Link>{' '}
            page.
          </p>
        ) : null}
      </Container>
    </section>
  )
}
