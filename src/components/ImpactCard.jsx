import { useRef, useState } from 'react'
import { ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import ImageFrame from './ImageFrame'

export default function ImpactCard({ area, featured = false }) {
  const cardRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePos({ x, y })

    // 3D Tilt calculation
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine) return

    const px = (x / rect.width - 0.5) * 2
    const py = (y / rect.height - 0.5) * 2
    card.style.transform = `perspective(1000px) rotateY(${px * 5}deg) rotateX(${-py * 4.5}deg) translateY(-8px)`
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    const card = cardRef.current
    if (card) {
      card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0px)'
    }
  }

  return (
    <article
      ref={cardRef}
      data-lift
      data-cursor="view"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-[#e3dbd1] bg-gradient-to-b from-[#faf8f4] to-[#f4efe8] p-2.5 sm:p-3.5 transition-all duration-500 ease-out hover:border-[#C9A15A]/80 hover:shadow-[0_24px_60px_-12px_rgba(141,112,67,0.22),0_12px_24px_-8px_rgba(20,19,17,0.12)] ${
        featured ? 'lg:min-h-[36rem]' : ''
      }`}
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.25s ease-out, border-color 0.4s ease, box-shadow 0.4s ease',
      }}
    >
      {/* 1. Dynamic Cursor Spotlight (Gold ambient light tracking mouse) */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(201, 161, 90, 0.14), transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* 2. Top Animated Luminous Gold Laser Beam */}
      <div
        className="pointer-events-none absolute top-0 inset-x-8 h-[2px] scale-x-0 bg-gradient-to-r from-transparent via-[#C9A15A] to-transparent transition-transform duration-700 ease-out group-hover:scale-x-100"
        aria-hidden="true"
      />

      {/* 3. Media Header with Interactive Overlays */}
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
        <ImageFrame
          src={area.image}
          alt={area.imageAlt}
          className={`${featured ? 'aspect-[16/10] lg:aspect-[16/11]' : 'aspect-[16/10]'} w-full object-cover transition-transform duration-700 group-hover:scale-105`}
        />

        {/* Diagonal Light Sweep Effect on Hover */}
        <div
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transition-transform duration-1000 ease-in-out group-hover:translate-x-[200%]"
          aria-hidden="true"
        />

        {/* Dark Vignette Overlay for Crisp Contrast */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/35"
          aria-hidden="true"
        />

        {/* Top-Left: Floating Glass Status Badge */}
        <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 z-10 flex items-center gap-1.5 rounded-full border border-white/25 bg-black/60 px-2.5 py-1 sm:px-3 sm:py-1 backdrop-blur-md shadow-md transition-transform duration-300 group-hover:scale-105">
          <span className="relative flex h-2 w-2 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C9A15A] opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#C9A15A]" />
          </span>
          <span className="font-sans text-[0.58rem] sm:text-[0.66rem] font-semibold tracking-wider text-[#fae8be] uppercase">
            {area.organization}
          </span>
        </div>

        {/* Top-Right: Luxury Floating Number Medallion */}
        <div className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-10 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/30 bg-black/60 backdrop-blur-md shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:border-[#C9A15A] group-hover:bg-[#141311]">
          <span className="font-serif text-xs sm:text-sm font-semibold tracking-wider text-[#fae8be] group-hover:text-[#C9A15A] transition-colors">
            {area.number}
          </span>
        </div>

        {/* Bottom Banner Tag on Image */}
        <div className="absolute bottom-2.5 inset-x-2.5 sm:bottom-3 sm:inset-x-3 z-10 flex items-center justify-between rounded-lg border border-white/15 bg-black/45 px-3 py-1.5 backdrop-blur-md">
          <span className="font-sans text-[0.62rem] sm:text-[0.7rem] font-medium tracking-wide text-white/90 truncate">
            {area.title}
          </span>
          <span className="flex items-center gap-1 text-[0.58rem] sm:text-[0.65rem] font-semibold tracking-widest text-[#C9A15A] uppercase shrink-0">
            <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
            Impact
          </span>
        </div>
      </div>

      {/* 4. Card Content Body */}
      <div className="flex flex-1 flex-col p-4 sm:p-6 lg:p-7">
        {/* Eyebrow Label */}
        <div className="flex items-center gap-2">
          <span className="h-px w-4 bg-[#8d7043] transition-all duration-300 group-hover:w-7 group-hover:bg-[#C9A15A]" />
          <span className="font-sans text-[0.64rem] sm:text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#8d7043] transition-colors group-hover:text-[#C9A15A]">
            Humanitarian Pillar
          </span>
        </div>

        {/* Title */}
        <h3 className="display mt-2 text-2xl font-normal text-ink transition-colors duration-300 sm:text-3xl lg:text-[2.2rem] group-hover:text-[#8d7043]">
          {area.title}
        </h3>

        {/* Organization Tag */}
        <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-[#8d7043]/20 bg-[#8d7043]/10 px-3 py-1 text-xs font-medium text-[#655f57] w-fit">
          <CheckCircle2 className="h-3 w-3 text-[#8d7043]" />
          <span>{area.organization}</span>
        </div>

        {/* Summary Description */}
        <p className="mt-3.5 flex-1 text-sm leading-relaxed text-muted sm:text-base">
          {area.summary}
        </p>

        {/* Key Highlights / Pillars from Data */}
        {area.points && area.points.length > 0 && (
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-line/60 pt-4">
            {area.points.slice(0, 2).map((point) => (
              <div
                key={point.title}
                className="flex items-center gap-2 rounded-lg bg-white/40 px-2.5 py-1.5 border border-line/40 transition-colors group-hover:bg-white/70"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#C9A15A] shrink-0" />
                <span className="text-xs font-medium text-ink truncate">{point.title}</span>
              </div>
            ))}
          </div>
        )}

        {/* 5. Interactive Action Pill Button */}
        <div className="mt-6 pt-2">
          <Link
            to={`/impact/${area.slug}`}
            className="group/btn relative inline-flex w-full items-center justify-between rounded-full border border-ink/20 bg-ink px-5 py-3 text-xs sm:text-sm font-semibold tracking-wider text-paper uppercase transition-all duration-300 hover:border-[#8d7043] hover:bg-[#8d7043] hover:shadow-[0_8px_24px_rgba(141,112,67,0.35)]"
          >
            <span className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1">
              Explore Initiative
            </span>
            <div className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white transition-all duration-300 group-hover/btn:bg-white group-hover/btn:text-ink group-hover/btn:rotate-45">
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" aria-hidden="true" />
            </div>
          </Link>
        </div>
      </div>
    </article>
  )
}
