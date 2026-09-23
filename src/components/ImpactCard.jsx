import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import ImageFrame from './ImageFrame'

export default function ImpactCard({ area, featured = false }) {
  return (
    <article
      data-lift
      className={`group flex h-full flex-col border border-line bg-ivory ${featured ? 'lg:min-h-[34rem]' : ''}`}
    >
      <ImageFrame src={area.image} alt={area.imageAlt} className={featured ? 'aspect-[16/10] lg:aspect-[16/11]' : 'aspect-[16/10]'} />
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="text-xs tracking-[0.18em] text-bronze">{area.number}</p>
        <h3 className="display mt-3 text-3xl text-ink sm:text-4xl">{area.title}</h3>
        <p className="mt-2 text-sm font-medium text-ink">{area.organization}</p>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-muted sm:text-base">{area.summary}</p>
        <Link
          to={`/impact/${area.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors group-hover:text-bronze"
        >
          Explore
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
