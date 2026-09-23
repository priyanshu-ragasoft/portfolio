import { profile, philosophy } from '../data/profile'

export default function Philosophy() {
  return (
    <section
      data-scene="philosophy"
      className="relative min-h-[88svh] overflow-hidden bg-ink text-paper"
      data-parallax-bounds
    >
      <div data-philosophy-plate className="absolute inset-0">
        <div data-parallax className="absolute inset-x-0 -top-[10%] h-[120%]">
          <img
            src={profile.portrait}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-center opacity-35"
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-ink/72" />
      <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-[1180px] flex-col justify-end px-5 py-20 sm:px-8 md:py-28">
        <p data-philosophy-kicker className="text-xs font-medium uppercase tracking-[0.22em] text-mist">
          A thematic statement
        </p>
        <p className="display mt-6 max-w-4xl text-4xl sm:text-6xl md:text-7xl">
          <span className="block overflow-hidden pb-2">
            <span data-philosophy-line className="block">
              {philosophy.statement}
            </span>
          </span>
        </p>
        <p data-philosophy-note className="mt-6 max-w-lg text-sm leading-relaxed text-mist">
          {philosophy.note}
        </p>
      </div>
    </section>
  )
}
