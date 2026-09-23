import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Container from '../components/Container'
import ImageFrame from '../components/ImageFrame'
import { profile } from '../data/profile'

export default function Education() {
  return (
    <section data-scene="education" className="bg-paper py-20 md:py-32">
      <Container className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p data-edu-kicker className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-muted">
            <span className="h-px w-8 bg-bronze" aria-hidden="true" />
            Knowledge
          </p>
          <h2 className="display mt-4 text-4xl text-ink sm:text-6xl">Education as a Tool for Service</h2>
          <div data-edu-copy className="mt-6 space-y-4 text-base leading-relaxed text-muted">
            <p>
              In his published writing, learning was never framed as a private advantage. Business,
              information technology, and finance were how he learned to see institutions: where
              resources go, and how a system can help a person or harm them.
            </p>
            <p>
              That is the bridge into the humanitarian work. Compassion still needs a structure that
              is transparent and able to last. ISBET Brainery Academy is the education platform in
              this body of work — practical technology training, guided lessons, and career skills.
            </p>
            <p>
              The same conviction shows up in direct gifts: books and tools in a classroom, so a
              child’s day is not stopped by the absence of something basic.
            </p>
          </div>
          <Link
            to="/impact/isbet-brainery"
            data-edu-link
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-bronze"
          >
            Explore ISBET Brainery
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div data-edu-visual className="lg:col-span-6 lg:col-start-7">
          <ImageFrame
            src={profile.educationImage}
            alt="Pupils holding new exercise books after a donation of scholastic materials"
            className="aspect-[4/5] sm:aspect-[5/4]"
          />
        </div>
      </Container>
    </section>
  )
}
