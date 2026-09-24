import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Container from '../components/Container'
import {
  introduction,
  introductionFacts,
  introductionPillars,
  profile,
} from '../data/profile'

export default function Introduction() {
  return (
    <section id="intro" data-scene="intro" data-hero-next className="bg-paper py-20 md:py-32">
      <Container>
        <div className="flex items-end justify-between border-b border-line pb-5">
          <p
            data-intro-kicker
            className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-muted"
          >
            <span className="h-px w-8 bg-bronze" aria-hidden="true" />
            Introduction
          </p>
          <p data-intro-index className="text-xs font-medium tracking-[0.2em] text-bronze">
            01
          </p>
        </div>

        <div className="mt-10 grid items-end gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <h2
              data-intro-title
              className="display text-[2.6rem] leading-[0.92] text-ink sm:text-6xl lg:text-[4.6rem]"
            >
              A Life Dedicated to
              <span className="mt-2 block italic">Service, Dignity, and Hope.</span>
            </h2>
          </div>
          <p data-intro-role className="max-w-sm text-sm leading-relaxed text-muted lg:col-span-4">
            {profile.title}
          </p>
        </div>

        <div className="mt-14 grid items-start gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-16">
          <div data-intro-copy className="space-y-5 lg:col-span-6">
            {introduction.map((paragraph, index) => (
              <p
                key={paragraph}
                className={
                  index === 0
                    ? 'text-lg leading-relaxed text-ink'
                    : 'text-base leading-relaxed text-muted'
                }
              >
                {paragraph}
              </p>
            ))}
            <Link
              to="/about"
              data-intro-link
              className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-bronze"
            >
              Read the full profile
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <aside className="lg:col-span-5 lg:col-start-8">
            <div className="relative mx-auto w-full max-w-[380px]">
              <div
                className="pointer-events-none absolute -inset-2 rounded-[2rem] border border-[#C9A15A]/40"
                aria-hidden="true"
              />
          <div
            data-intro-plate
            className="group relative aspect-[4/5] cursor-pointer select-none overflow-hidden rounded-[1.65rem] border border-white/10 bg-ink text-paper shadow-[0_24px_50px_-28px_rgba(20,19,17,0.55)] transition-shadow duration-500 hover:shadow-[0_28px_60px_-24px_rgba(20,19,17,0.7)]"
          >
            {/* Full-color portrait revealed on hover */}
            <img
              src={profile.office}
              alt={profile.name}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[center_18%] opacity-30 grayscale-[45%] transition-all duration-700 ease-[cubic-bezier(0.2,1,0.3,1)] group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105"
            />

            {/* Base ambient dark gradient that fades on hover */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/65 transition-opacity duration-600 ease-out group-hover:opacity-0" />

            {/* Shutter Blade Mechanism: Upper and Lower panels split open on hover */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-ink/80 backdrop-blur-[2px] transition-transform duration-700 ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:-translate-y-full border-b border-[#C9A15A]/25"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-ink/80 backdrop-blur-[2px] transition-transform duration-700 ease-[cubic-bezier(0.7,0,0.2,1)] group-hover:translate-y-full border-t border-[#C9A15A]/25"
              aria-hidden="true"
            />

            {/* Top-Right "Hover to reveal" hint badge (hides on hover) */}
            <div className="absolute top-5 right-5 z-20 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-[10px] tracking-wider text-mist/80 uppercase backdrop-blur-md transition-all duration-400 group-hover:opacity-0 group-hover:scale-90 pointer-events-none">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C9A15A] animate-pulse" />
              <span>Hover to reveal</span>
            </div>

            {/* Editorial Text Content (Smoothly wipes / fades out like a shutter on hover) */}
            <div className="absolute inset-x-0 bottom-0 z-10 px-6 pt-16 pb-6 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:pointer-events-none group-hover:translate-y-3 group-hover:opacity-0 sm:px-7 sm:pb-7">
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-[#C9A15A]">
                A working standard
              </p>
              <p className="display mt-5 text-3xl leading-[1.05] sm:text-4xl">
                Charity is treated as a duty, not a performance.
              </p>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/75">
                Show up, use resources carefully, and leave a person&apos;s dignity intact. The
                work is meant to continue when no one is watching.
              </p>
              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/15 pt-6">
                <div>
                  <dt className="text-[0.62rem] uppercase tracking-[0.18em] text-paper/50">Origin</dt>
                  <dd className="mt-1 text-sm text-paper">Kampala, Uganda</dd>
                </div>
                <div>
                  <dt className="text-[0.62rem] uppercase tracking-[0.18em] text-paper/50">Now</dt>
                  <dd className="mt-1 text-sm text-paper">Jumeirah, Dubai</dd>
                </div>
              </dl>
            </div>
          </div>
            </div>
          </aside>
        </div>

        <dl
          data-intro-facts
          className="mt-16 grid gap-6 border-y border-line py-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {introductionFacts.map((fact) => (
            <div key={fact.label} data-intro-fact>
              <dt className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-bronze">
                {fact.label}
              </dt>
              <dd className="mt-2 text-base text-ink sm:text-lg">{fact.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-16 grid gap-px border border-line bg-line md:grid-cols-3" data-intro-pillars>
          {introductionPillars.map((pillar) => (
            <article
              key={pillar.number}
              data-intro-pillar
              className="group bg-paper p-6 transition-colors duration-300 hover:bg-ivory sm:p-8"
            >
              <p className="text-[0.65rem] tracking-[0.18em] text-bronze">{pillar.number}</p>
              <h3 className="display mt-4 text-3xl text-ink sm:text-4xl">{pillar.title}</h3>
              <p className="mt-2 text-sm font-medium text-ink">{pillar.organization}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{pillar.text}</p>
              <Link
                to={pillar.to}
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors group-hover:text-bronze"
              >
                Explore
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
