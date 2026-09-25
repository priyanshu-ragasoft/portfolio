import { ArrowUpRight, Sparkles, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import ImageFrame from './ImageFrame'

export default function BlogCard({ post, layout = 'row' }) {
  const featured = layout === 'feature'

  if (featured) {
    return (
      <article
        data-lift
        data-cursor="view"
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#e3dbd1] bg-gradient-to-b from-[#faf8f4] to-[#f4efe8] shadow-[0_4px_24px_-6px_rgba(20,19,17,0.06)] transition-all duration-500 hover:border-[#C9A15A]/80 hover:shadow-[0_24px_56px_-12px_rgba(141,112,67,0.22)] hover:-translate-y-1.5 sm:rounded-3xl"
      >
        {/* Top Gold Laser Accent Line */}
        <div
          className="pointer-events-none absolute top-0 inset-x-8 h-[2px] scale-x-0 bg-gradient-to-r from-transparent via-[#C9A15A] to-transparent transition-transform duration-700 ease-out group-hover:scale-x-100"
          aria-hidden="true"
        />

        {/* Clean, natural image frame without dark overlays or shimmer filters */}
        <div className="relative overflow-hidden">
          <ImageFrame
            src={post.image}
            alt={post.imageAlt}
            shape="flush"
            hoverEffect={false}
            className="aspect-[16/10] w-full object-cover"
          />
        </div>

        {/* Content Body */}
        <div className="flex flex-1 flex-col p-4 sm:p-6">
          <div className="flex items-center gap-2">
            <span className="h-px w-5 bg-[#C9A15A] transition-all duration-300 group-hover:w-8" />
            <span className="font-sans text-[0.65rem] font-semibold tracking-[0.2em] text-[#8d7043] uppercase">
              {post.category}
            </span>
          </div>

          <h3 className="display mt-2.5 text-2xl font-normal leading-tight text-ink transition-colors duration-300 sm:text-3xl lg:text-[2.2rem] group-hover:text-[#8d7043]">
            <Link to={`/insights/${post.slug}`}>
              {post.title}
            </Link>
          </h3>

          <p className="mt-3.5 flex-1 text-sm leading-relaxed text-muted sm:text-base">
            {post.excerpt}
          </p>

          <div className="mt-6 pt-2">
            <Link
              to={`/insights/${post.slug}`}
              className="group/btn relative inline-flex items-center gap-3 rounded-full border border-ink/20 bg-ink px-5 py-2.5 text-xs sm:text-sm font-semibold tracking-wider text-paper uppercase transition-all duration-300 hover:border-[#8d7043] hover:bg-[#8d7043] hover:shadow-[0_8px_20px_-4px_rgba(141,112,67,0.35)]"
            >
              <span className="relative z-10">{post.videoFile ? 'Watch Film' : 'Read Article'}</span>
              <div className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-white transition-all duration-300 group-hover/btn:bg-white group-hover/btn:text-ink group-hover/btn:rotate-45">
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </div>
            </Link>
          </div>
        </div>
      </article>
    )
  }

  // Row / Side Layout
  return (
    <article
      data-lift
      data-cursor="view"
      className="group relative flex flex-col sm:flex-row gap-4 sm:gap-5 overflow-hidden rounded-2xl border border-[#e3dbd1]/80 bg-gradient-to-b from-[#faf8f4] to-[#f4efe8] p-3 sm:p-3.5 transition-all duration-300 hover:border-[#C9A15A]/70 hover:shadow-[0_16px_36px_-8px_rgba(141,112,67,0.16)] hover:-translate-y-1"
    >
      {/* Side Image Frame - Clean and Natural */}
      <div className="relative w-full sm:w-[170px] lg:w-[200px] shrink-0 overflow-hidden rounded-xl aspect-[16/10] sm:aspect-[4/3]">
        <ImageFrame
          src={post.image}
          alt={post.imageAlt}
          hoverEffect={false}
          className="h-full w-full object-cover"
        />
        <span className="absolute bottom-2 left-2 z-10 rounded bg-black/70 px-2 py-0.5 text-[0.56rem] font-semibold tracking-wider text-[#fae8be] uppercase backdrop-blur-sm flex items-center gap-1">
          {post.videoFile ? (
            <>
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              Video
            </>
          ) : (
            post.category
          )}
        </span>
      </div>

      {/* Side Content */}
      <div className="flex flex-1 flex-col justify-between py-1">
        <div>
          <div className="flex items-center gap-2 text-[0.62rem] font-medium uppercase tracking-[0.16em] text-muted">
            <span className="text-[#8d7043]">{post.category}</span>
            <span>•</span>
            <span>{post.date}</span>
          </div>

          <h4 className="display mt-1.5 text-lg font-normal leading-snug text-ink transition-colors duration-200 sm:text-xl lg:text-[1.25rem] group-hover:text-[#8d7043]">
            <Link to={`/insights/${post.slug}`} className="transition-colors hover:text-[#8d7043]">
              {post.title}
            </Link>
          </h4>

          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted line-clamp-2">
            {post.excerpt}
          </p>
        </div>

        <Link
          to={`/insights/${post.slug}`}
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-ink uppercase transition-colors group-hover:text-[#8d7043]"
        >
          <span>{post.videoFile ? 'Watch film' : 'Read more'}</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
