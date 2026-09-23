import PageMeta from '../components/PageMeta'
import About from '../sections/About'
import Blog from '../sections/Blog'
import Contact from '../sections/Contact'
import Education from '../sections/Education'
import FeaturedStory from '../sections/FeaturedStory'
import Hero from '../sections/Hero'
import Impact from '../sections/Impact'
import Introduction from '../sections/Introduction'
import Journey from '../sections/Journey'
import Philosophy from '../sections/Philosophy'
import Projects from '../sections/Projects'
import Values from '../sections/Values'

export default function Home() {
  return (
    <>
      <PageMeta
        title="Gilbert Kevin Jimmy Kwizera"
        description="Humanitarian leader, international consultant, and volunteer. A portfolio of dignity-based care, education, and social impact."
      />
      <Hero />
      <Introduction />
      <About />
      <Journey />
      <Values />
      <Impact />
      <Projects />
      <FeaturedStory />
      <Education />
      <Blog limit={3} />
      <Philosophy />
      <Contact />
    </>
  )
}
