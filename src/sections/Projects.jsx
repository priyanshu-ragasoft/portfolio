import Container from '../components/Container'
import ProjectCard from '../components/ProjectCard'
import SectionHeading from '../components/SectionHeading'
import { projects } from '../data/projects'

export default function Projects({ showHeading = true }) {
  return (
    <section
      id="projects"
      data-scene="projects"
      className={`bg-ivory ${showHeading ? 'py-20 md:py-32' : 'pt-12 pb-20 md:pb-32'}`}
    >
      <Container>
        {showHeading ? (
          <SectionHeading eyebrow="Selected work" title="Projects That Impact Lives">
            Two published records of the work: practical support for a school in Fort Portal, and
            the long cancer journey of Salim Bwagu.
          </SectionHeading>
        ) : null}
        <div className={`space-y-20 md:space-y-28 ${showHeading ? 'mt-16' : ''}`}>
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} reverse={index % 2 === 1} />
          ))}
        </div>
      </Container>
    </section>
  )
}
