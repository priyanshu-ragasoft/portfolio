import { Link, useParams } from 'react-router-dom'
import Container from '../components/Container'
import ImageFrame from '../components/ImageFrame'
import PageMeta from '../components/PageMeta'
import { posts } from '../data/blog'

export default function InsightDetail() {
  const { slug } = useParams()
  const post = posts.find((item) => item.slug === slug)

  if (!post) {
    return (
      <Container data-scene="missing" className="py-40">
        <h1 data-missing="title" className="display text-5xl">
          Insight not found
        </h1>
        <Link data-missing="link" to="/insights" className="mt-6 inline-block text-sm hover:text-bronze">
          Back to insights
        </Link>
      </Container>
    )
  }

  return (
    <>
      <PageMeta title={`${post.title} — Gilbert Kevin Jimmy Kwizera`} description={post.excerpt} />
      <article data-scene="detail" className="bg-paper pt-28 pb-20 md:pt-36">
        <Container className="max-w-3xl">
          <p data-detail="meta" className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
            {post.date}
            <span className="mx-2 text-bronze">/</span>
            {post.category}
          </p>
          <h1 data-detail="title" className="display mt-4 text-4xl text-ink sm:text-6xl">
            {post.title}
          </h1>
          <div className="mt-8">
            <ImageFrame src={post.image} alt={post.imageAlt} className="aspect-[16/10]" priority />
          </div>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            {post.paragraphs.map((paragraph) => (
              <p data-detail="body" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
          {post.video ? (
            <p data-detail="extra" className="mt-8">
              <a
                href={post.video}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-ink underline decoration-line underline-offset-4 hover:text-bronze"
              >
                Watch the film
              </a>
            </p>
          ) : null}
          <Link data-detail="back" to="/insights" className="mt-12 inline-block text-sm font-medium hover:text-bronze">
            All insights
          </Link>
        </Container>
      </article>
    </>
  )
}
