import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import { values } from '../data/profile'

export default function Values() {
  return (
    <section data-scene="values" className="bg-ivory py-20 md:py-32">
      <Container>
        <SectionHeading eyebrow="Principles" title="Values That Guide The Work" />
        <div data-values-grid className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <article
              key={value.number}
              data-lift
              data-cursor
              className="group min-h-56 border border-line bg-paper p-6 transition-[border-color,box-shadow] duration-500 hover:border-bronze/50 hover:shadow-[0_24px_50px_-36px_rgba(20,19,17,0.45)] sm:p-8"
            >
              <p className="text-sm tracking-[0.16em] text-bronze transition-colors group-hover:text-ink">
                {value.number}
              </p>
              <h3 className="display mt-6 text-4xl text-ink">{value.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">{value.text}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
