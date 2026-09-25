import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import ImageFrame from './ImageFrame'
import ScrollReveal from './ScrollReveal'

export default function ProjectCard({ project, reverse = false }) {
  return (
    <article data-project data-lift className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
      <div
        data-project-media
        data-from={reverse ? 'right' : 'left'}
        className={`lg:col-span-7 ${reverse ? 'lg:order-2' : ''}`}
      >
        <ImageFrame
          src={project.image}
          alt={project.imageAlt}
          fit={project.imageFit || 'cover'}
          parallax={project.imageFit !== 'contain'}
          position={project.imageFit === 'contain' ? 'center' : undefined}
          className={project.imageFit === 'contain' ? 'aspect-[3/2]' : 'aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/3]'}
        />
      </div>
      <div data-project-copy className={`lg:col-span-5 ${reverse ? 'lg:order-1' : ''}`}>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
          {project.category}
          <span className="mx-2 text-bronze">/</span>
          {project.date}
        </p>
        <ScrollReveal
          type="text"
          as="h3"
          className="display mt-4 text-4xl text-ink sm:text-5xl"
        >
          {project.title}
        </ScrollReveal>
        <ScrollReveal
          type="text"
          as="p"
          className="mt-5 text-base leading-relaxed text-muted sm:text-lg"
        >
          {project.summary}
        </ScrollReveal>
        <Link
          to={`/projects/${project.slug}`}
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium tracking-wide text-ink transition-colors hover:text-bronze"
        >
          View project
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
