import Container from '../components/Container'
import ImageFrame from '../components/ImageFrame'
import ImpactCard from '../components/ImpactCard'
import SectionHeading from '../components/SectionHeading'
import { figures, profile } from '../data/profile'
import { impactAreas } from '../data/impact'

export default function Impact() {
  return (
    <section id="impact" data-scene="impact" className="bg-paper py-20 md:py-32">
      <Container>
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Impact" title="Turning Awareness Into Action">
              Most people feel concern when they see suffering. Fewer turn that concern into
              something that still works later. The published account of this life is about that
              move: from sympathy to structures that help in the background.
            </SectionHeading>
          </div>
          <p data-impact-note className="text-base leading-relaxed text-muted lg:col-span-4 lg:col-start-9">
            Where sickness, poverty, and displacement meet, small failures become overwhelming. The
            response described here is patience and organisation — showing up, spending resources
            carefully, and refusing choices that cost a person their dignity.
          </p>
        </div>

        <div data-impact-figures className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {figures.map((figure) => (
            <div key={figure.label} data-figure-card className="border-t border-line pt-5">
              <p data-figure className="display text-4xl text-ink sm:text-5xl">{figure.value}</p>
              <p className="mt-2 text-sm text-muted">{figure.label}</p>
            </div>
          ))}
        </div>
        <p data-impact-caption className="mt-4 text-xs tracking-wide text-muted">
          Figures as published alongside his foundations&apos; work.
        </p>

        <div className="mt-16 grid items-center gap-8 lg:grid-cols-12" data-parallax-bounds>
          <div data-impact-still className="lg:col-span-7">
            <ImageFrame
              src={profile.storyImage}
              alt="Uganda Cancer Institute, a centre of specialised cancer treatment in Kampala"
              className="aspect-[16/10]"
            />
          </div>
          <div data-impact-quote className="lg:col-span-5">
            <p className="display text-3xl text-ink sm:text-4xl">
              Consistency, not the dramatic moment, is what the work asks for.
            </p>
            <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">
              In the writing published with his name, inspiration is not a single gesture. It is
              the decision to build support that operates when no one is watching, for people at
              their most vulnerable.
            </p>
          </div>
        </div>

        <div data-impact-grid className="mt-20 grid gap-5 lg:grid-cols-2">
          {impactAreas.map((area, index) => (
            <ImpactCard key={area.slug} area={area} featured={index === 0} />
          ))}
        </div>
      </Container>
    </section>
  )
}
