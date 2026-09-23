import PageMeta from '../components/PageMeta'
import Container from '../components/Container'
import Projects from '../sections/Projects'

export default function ProjectsPage() {
  return (
    <>
      <PageMeta
        title="Projects — Gilbert Kevin Jimmy Kwizera"
        description="Published projects: education support in Fort Portal and a cancer-care story from Uganda."
      />
      <div data-scene="listing" className="bg-ivory pt-28 md:pt-36">
        <Container>
          <p data-listing-kicker className="text-xs font-medium uppercase tracking-[0.22em] text-muted">
            Projects
          </p>
          <h1 data-listing-title className="display mt-4 max-w-3xl text-5xl text-ink sm:text-7xl">
            Projects That Impact Lives
          </h1>
          <p data-listing-lede className="mt-5 max-w-xl text-base leading-relaxed text-muted">
            The project records published on his site. Nothing here is added beyond that record.
          </p>
        </Container>
      </div>
      <Projects showHeading={false} />
    </>
  )
}
