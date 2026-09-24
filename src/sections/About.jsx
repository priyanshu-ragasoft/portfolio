import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Container from '../components/Container'
import AboutPortrait3D from '../components/AboutPortrait3D'
import { profile, roles } from '../data/profile'

export default function About() {
  return (
    <section id="about" data-scene="about" className="bg-ivory py-20 md:py-32">
      <Container className="grid items-center gap-12 lg:grid-cols-12">
        <div data-about-visual className="lg:col-span-5">
          <AboutPortrait3D />
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <p data-about-kicker className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-muted">
            <span className="h-px w-8 bg-bronze" aria-hidden="true" />
            About
          </p>
          <h2 className="display mt-4 text-4xl text-ink sm:text-5xl md:text-6xl">
            Who is Gilbert Kevin Jimmy Kwizera?
          </h2>
          <p data-about-body className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
            A humanitarian leader, international consultant, and volunteer. Born in Kampala on 30
            November 1971, trained in information systems and finance, and now based in the United
            Arab Emirates. The public measure of the work is simple: whether it protects dignity
            and can be sustained.
          </p>
          <ul className="mt-8 divide-y divide-line border-y border-line" data-stagger>
            {roles.map((role) => (
              <li key={role.title} data-stagger-item className="grid gap-2 py-4 sm:grid-cols-[180px_1fr] sm:gap-6">
                <p className="text-sm font-medium text-ink">{role.title}</p>
                <p className="text-sm leading-relaxed text-muted">{role.text}</p>
              </li>
            ))}
          </ul>
          <Link
            to="/about"
            data-about-link
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-bronze"
          >
            Read the full profile
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  )
}
