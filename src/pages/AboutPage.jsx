import { Link } from 'react-router-dom'
import Container from '../components/Container'
import ImageFrame from '../components/ImageFrame'
import PageMeta from '../components/PageMeta'
import { biography, educationNotes, journey, profile, roles } from '../data/profile'

export default function AboutPage() {
  return (
    <>
      <PageMeta
        title="About — Gilbert Kevin Jimmy Kwizera"
        description="Biography of Gilbert Kevin Jimmy Kwizera, humanitarian leader, international consultant, and volunteer."
      />
      <article data-scene="profile" className="bg-paper pt-28 pb-20 md:pt-36 md:pb-28">
        <Container>
          <p data-profile="kicker" className="text-xs font-medium uppercase tracking-[0.22em] text-muted">
            About
          </p>
          <h1 data-profile="title" className="display mt-4 max-w-4xl text-5xl text-ink sm:text-7xl">
            Who is Gilbert Kevin Jimmy Kwizera?
          </h1>
          <div className="mt-12 grid items-start gap-12 lg:grid-cols-12">
            <div data-profile="portrait" className="lg:sticky lg:top-28 lg:col-span-5">
              <ImageFrame
                src={profile.portrait}
                alt="Portrait of Gilbert Kevin Jimmy Kwizera"
                className="aspect-[4/5]"
                position="center 62%"
              />
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p data-profile="role" className="text-sm font-medium text-bronze">
                {profile.title}
              </p>
              <div className="mt-6 space-y-5 text-base leading-relaxed text-muted sm:text-lg">
                {biography.map((paragraph) => (
                  <p data-profile="bio" key={paragraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-20 grid gap-10 border-t border-line pt-12 md:grid-cols-3">
            {roles.map((role) => (
              <div key={role.title} data-profile="role-card">
                <h2 className="display text-3xl text-ink">{role.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{role.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 grid gap-10 lg:grid-cols-12">
            <h2 data-profile="education-title" className="display text-4xl text-ink lg:col-span-4">
              Education
            </h2>
            <ul className="space-y-5 lg:col-span-7 lg:col-start-6">
              {educationNotes.map((note) => (
                <li
                  key={note}
                  data-profile="education-item"
                  className="border-t border-line pt-5 text-base leading-relaxed text-muted"
                >
                  {note}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-20">
            <h2 data-profile="miles-title" className="display text-4xl text-ink">
              Milestones
            </h2>
            <ol className="mt-8 divide-y divide-line border-y border-line">
              {journey.map((item) => (
                <li key={item.title} data-profile="mile" className="grid gap-3 py-6 md:grid-cols-[180px_1fr]">
                  <p className="text-sm font-medium text-bronze">{item.date}</p>
                  <div>
                    <h3 className="text-lg text-ink">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link
              to="/#journey"
              data-profile="back"
              className="mt-8 inline-block text-sm font-medium text-ink hover:text-bronze"
            >
              See the journey on the home page
            </Link>
          </div>
        </Container>
      </article>
    </>
  )
}
