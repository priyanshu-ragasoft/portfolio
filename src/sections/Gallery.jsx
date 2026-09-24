import { useState, useMemo } from 'react'
import { ArrowUpRight, Maximize2, X, MapPin, Calendar } from 'lucide-react'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import { galleryCategories, galleryItems } from '../data/gallery'

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return galleryItems
    return galleryItems.filter((item) => item.category === activeCategory)
  }, [activeCategory])

  return (
    <section id="gallery" data-scene="gallery" className="bg-ink py-20 text-paper md:py-32">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Archival Visuals"
            title="Moments of Service, Fieldwork & Leadership"
          >
            A complete photographic archive documenting over two decades of direct humanitarian
            fieldwork, cancer care foundations, school initiatives, and international strategic
            leadership.
          </SectionHeading>

          <p className="max-w-xs font-sans text-xs tracking-[0.2em] text-[#C9A15A] uppercase">
            {galleryItems.length} Archived Moments
          </p>
        </div>

        {/* Filter categories */}
        <div className="mt-12 flex flex-wrap gap-2 border-b border-white/10 pb-6">
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2 text-xs font-medium tracking-[0.16em] uppercase transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[#C9A15A] text-[#0D0D0C] shadow-[0_0_20px_rgba(201,161,90,0.35)]'
                  : 'border border-white/15 bg-white/5 text-paper/70 hover:border-[#C9A15A]/60 hover:text-paper'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              data-cursor="view"
              className="group relative cursor-pointer overflow-hidden border border-white/10 bg-[#141311] transition-all duration-500 hover:border-[#C9A15A]/70 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.9)]"
            >
              {/* Image container with Black & White to Full Color hover effect */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0D0D0C]">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover grayscale contrast-[1.05] transition-all duration-700 ease-out group-hover:scale-108 group-hover:grayscale-0 group-hover:contrast-100"
                  style={{ objectPosition: item.position || 'center 10%' }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D0D0C] via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-40" />

                {/* Badge top-left */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-block border border-white/20 bg-[#0D0D0C]/80 px-2.5 py-1 text-[0.6rem] font-medium tracking-[0.18em] text-[#C9A15A] uppercase backdrop-blur-sm">
                    {item.tag}
                  </span>
                </div>

                {/* Zoom icon top-right */}
                <div className="absolute top-3 right-3 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0D0D0C]/80 text-[#C9A15A] backdrop-blur-sm">
                    <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </div>
              </div>

              {/* Card Meta & Caption */}
              <div className="p-5">
                <div className="flex items-center justify-between text-[0.62rem] tracking-[0.16em] text-paper/50 uppercase">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3 w-3 text-[#C9A15A]" aria-hidden="true" />
                    {item.location}
                  </span>
                  <span>{item.year}</span>
                </div>

                <h3 className="font-serif text-lg font-medium text-paper transition-colors duration-300 group-hover:text-[#f0d7a2]">
                  {item.title}
                </h3>

                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-paper/70">
                  {item.caption}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-[0.65rem] font-medium tracking-[0.18em] text-[#C9A15A] uppercase">
                  <span>View Details</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>

      {/* Modal Lightbox for enlarged high-res viewing */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[150] flex items-center justify-center bg-black/92 p-4 backdrop-blur-md sm:p-8"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-h-[92vh] w-full max-w-4xl overflow-hidden border border-[#C9A15A]/40 bg-[#121110] shadow-[0_25px_70px_rgba(0,0,0,0.95)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-paper transition-colors hover:bg-[#C9A15A] hover:text-[#0D0D0C]"
              aria-label="Close image preview"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Image */}
            <div className="relative max-h-[64vh] overflow-hidden bg-black">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="h-full w-full object-contain"
              />
            </div>

            {/* Modal details */}
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium tracking-[0.18em] text-[#C9A15A] uppercase">
                <span className="border border-[#C9A15A]/40 px-2.5 py-0.5">
                  {selectedPhoto.category}
                </span>
                <span className="flex items-center gap-1.5 text-paper/70">
                  <MapPin className="h-3.5 w-3.5 text-[#C9A15A]" />
                  {selectedPhoto.location}
                </span>
                <span className="flex items-center gap-1.5 text-paper/70">
                  <Calendar className="h-3.5 w-3.5 text-[#C9A15A]" />
                  {selectedPhoto.year}
                </span>
              </div>

              <h2 className="display mt-3 text-2xl text-paper sm:text-3xl">
                {selectedPhoto.title}
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-paper/80 sm:text-base">
                {selectedPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
