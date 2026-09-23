import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { journeyChapters } from '../../data/journeyLocations'

function ChapterCard({ chapter }) {
  return (
    <article data-journey-chapter={chapter.id} className="absolute inset-0 grid gap-4 sm:grid-cols-[minmax(0,1fr)_9.5rem]">
      <div className="min-w-0">
        <p className="font-sans text-xs tracking-[0.2em] text-[#C9A15A]">{chapter.index}</p>
        <p className="mt-2 font-sans text-[0.68rem] tracking-[0.16em] text-[#b7b0a6] uppercase">{chapter.date}</p>
        <h3 className="display mt-2 text-3xl text-[#f4f0e8] sm:text-4xl">{chapter.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-[#b7b0a6]">{chapter.description}</p>
        <Link
          data-journey-cta
          to={chapter.href}
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#f4f0e8]"
        >
          {chapter.cta}
          <ArrowUpRight data-journey-arrow className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
      <div data-journey-figure={chapter.id} className="relative h-28 overflow-hidden sm:h-full sm:min-h-[9.5rem]">
        <img
          src={chapter.image}
          alt={chapter.imageAlt}
          className="h-full w-full object-cover"
          data-journey-photo
        />
      </div>
    </article>
  )
}

export default function JourneyContent() {
  return (
    <div className="relative min-h-[20rem] sm:min-h-[16.5rem]" aria-live="polite">
      {journeyChapters.map((chapter) => (
        <ChapterCard key={chapter.id} chapter={chapter} />
      ))}
    </div>
  )
}

export function JourneyChapterList() {
  return (
    <div className="mt-10 space-y-8">
      {journeyChapters.map((chapter) => (
        <article key={chapter.id} className="grid gap-5 border-t border-white/10 pt-6 sm:grid-cols-[minmax(0,1fr)_12rem]">
          <div>
            <p className="font-sans text-xs tracking-[0.2em] text-[#C9A15A]">
              {chapter.index}
              <span className="mx-2 text-[#8a847c]">/</span>
              {chapter.date}
            </p>
            <h3 className="display mt-2 text-4xl text-[#f4f0e8]">{chapter.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#b7b0a6]">{chapter.description}</p>
            <Link to={chapter.href} className="mt-4 inline-flex items-center gap-2 text-sm text-[#f4f0e8]">
              {chapter.cta}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <img src={chapter.image} alt={chapter.imageAlt} className="h-40 w-full object-cover sm:h-full" />
        </article>
      ))}
    </div>
  )
}
