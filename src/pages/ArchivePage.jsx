import PageMeta from '../components/PageMeta'
import Container from '../components/Container'
import ScrollReveal from '../components/ScrollReveal'
import Gallery from '../sections/Gallery'
import { galleryItems } from '../data/gallery'

export default function ArchivePage() {
  return (
    <>
      <PageMeta
        title="Archive — Gilbert Kevin Jimmy Kwizera"
        description="A complete photographic archive documenting over two decades of direct humanitarian fieldwork, cancer care foundations, school initiatives, and international leadership."
      />
      <div data-scene="listing" className="bg-[#0D0D0C] pt-28 pb-10 text-paper md:pt-36">
        <Container>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-8">
            <div>
              <p data-listing-kicker className="text-xs font-semibold uppercase tracking-[0.24em] text-[#C9A15A]">
                Photographic Archive
              </p>
              <ScrollReveal type="text" as="h1" data-listing-title className="display mt-4 max-w-3xl text-4xl text-paper sm:text-6xl lg:text-7xl">
                Moments of Service &amp; Leadership
              </ScrollReveal>
              <ScrollReveal type="block" data-listing-lede className="mt-4 max-w-2xl">
                <p className="text-sm leading-relaxed text-paper/70 sm:text-base">
                  Documenting over two decades of quiet humanitarian initiatives, cancer recovery facilities,
                  educational development, and international strategic consultations across East Africa and the UAE.
                </p>
              </ScrollReveal>
            </div>
            <div className="shrink-0">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#C9A15A]/40 bg-[#C9A15A]/10 px-4 py-2 text-xs font-medium tracking-[0.16em] text-[#C9A15A] uppercase backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C9A15A] animate-pulse" />
                {galleryItems.length} Archived Records
              </span>
            </div>
          </div>
        </Container>
      </div>
      <Gallery hideTopHeader />
    </>
  )
}
