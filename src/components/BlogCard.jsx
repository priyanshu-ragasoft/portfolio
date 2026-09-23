import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import ImageFrame from './ImageFrame'

export default function BlogCard({ post, layout = 'row' }) {
  const featured = layout === 'feature'

  return (
    <article
      data-lift
      className={`group ${featured ? '' : 'grid gap-5 sm:grid-cols-[180px_1fr] sm:items-center lg:grid-cols-[240px_1fr]'}`}
    >
      <ImageFrame
        src={post.image}
        alt={post.imageAlt}
        className={featured ? 'aspect-[16/10]' : 'aspect-[4/3] sm:aspect-[5/4]'}
      />
      <div className={featured ? 'mt-5' : ''}>
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
          {post.date}
          <span className="mx-2 text-bronze">/</span>
          {post.category}
        </p>
        <h3 className={`display mt-3 text-ink ${featured ? 'text-4xl sm:text-5xl' : 'text-2xl sm:text-3xl'}`}>
          <Link to={`/insights/${post.slug}`} className="transition-colors hover:text-bronze">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{post.excerpt}</p>
        <Link
          to={`/insights/${post.slug}`}
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-bronze"
        >
          Read more
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
