import { Link } from 'react-router-dom'
import Button from '../components/Button'
import { projects } from '../data/projects'

export default function FeaturedStory() {
  const story = projects.find((project) => project.slug === 'he-battled-cancer-for-24-years')

  return (
    <section data-scene="feature" className="bg-ink text-paper">
      <div className="relative min-h-[78svh] overflow-hidden" data-parallax-bounds>
        <div data-feature-visual className="absolute inset-0">
          <div data-parallax className="absolute inset-x-0 -top-[8%] h-[116%]">
            <img
              data-feature-photo
              src={story.image}
              alt={story.imageAlt}
              className="h-full w-full object-cover object-[center_20%]"
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/20" />
        <div
          data-feature-overlay
          className="relative z-10 mx-auto flex min-h-[78svh] max-w-[1180px] flex-col justify-end px-5 pt-28 pb-16 sm:px-8"
        >
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-paper/75">
            Featured story · Cancer care
          </p>
          <h2 className="display mt-4 max-w-3xl text-5xl sm:text-7xl">{story.title}</h2>
        </div>
      </div>
      <div className="mx-auto grid max-w-[1180px] gap-8 px-5 py-16 sm:px-8 md:grid-cols-12 md:py-20">
        <div data-feature-copy className="md:col-span-7">
          <p className="text-lg leading-relaxed text-paper/85">
            Salim Bwagu was a child when Hodgkin’s lymphoma entered his life. Nearly twenty years
            later, in 2006, support from Gilbert’s charity made it possible to finish treatment. In
            2007 he was cleared. He went on to help other patients face the same two barriers: cost,
            and a lack of clear information.
          </p>
          <p className="mt-5 text-base leading-relaxed text-mist">
            The account is published in full on this site without added drama. What it insists on is
            ordinary and serious: stay with the treatment, and do not leave people to carry it alone.
          </p>
          <Button to={`/projects/${story.slug}`} variant="light" className="mt-8">
            Read the Story
          </Button>
        </div>
        <p data-feature-aside className="text-sm leading-relaxed text-mist md:col-span-4 md:col-start-9">
          Told with Salim’s name, his family’s, and the dates in the original record — from Mulago
          in 1987 to the National Cancer Institute in 2007.{' '}
          <Link to={`/projects/${story.slug}`} className="text-paper underline decoration-white/30 underline-offset-4">
            The full story
          </Link>
        </p>
      </div>
    </section>
  )
}
