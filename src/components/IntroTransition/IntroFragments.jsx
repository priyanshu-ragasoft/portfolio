import { profile } from '../../data/profile'

const DISPLAY = {
  desktop: 'text-[clamp(2.5rem,6.6vw,6rem)]',
  tablet: 'text-[clamp(2.1rem,5.2vw,4.2rem)]',
  mobile: 'text-[clamp(2rem,11vw,3.1rem)]',
}

function boxStyle(fragment) {
  return {
    left: `${fragment.x}%`,
    top: `${fragment.y}%`,
    width: fragment.wUnit === 'px' ? `${fragment.w}px` : `${fragment.w}%`,
    height: fragment.hUnit === 'px' ? `${fragment.h}px` : `${fragment.h}%`,
    transformStyle: 'preserve-3d',
  }
}

function ImageShard({ fragment, portrait }) {
  const { col, row, cols, rows } = fragment.crop

  return (
    <div className="relative h-full w-full overflow-hidden shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
      <img
        src={profile.hero}
        alt=""
        draggable={false}
        decoding="async"
        className="absolute max-w-none object-cover"
        style={{
          width: `${cols * 100}%`,
          height: `${rows * 100}%`,
          left: `${-col * 100}%`,
          top: `${-row * 100}%`,
          objectPosition: portrait,
        }}
      />
    </div>
  )
}

function FragmentBody({ fragment, portrait, tier }) {
  if (fragment.type === 'image') return <ImageShard fragment={fragment} portrait={portrait} />

  if (fragment.type === 'veil') {
    const background = fragment.veil === 'bottom'
      ? 'linear-gradient(to top, rgba(13,13,12,0.94) 18%, rgba(13,13,12,0.62) 58%, rgba(13,13,12,0) 100%)'
      : 'linear-gradient(to right, rgba(13,13,12,0.94) 6%, rgba(13,13,12,0.72) 42%, rgba(13,13,12,0.18) 74%, rgba(13,13,12,0) 100%)'
    return <div className="h-full w-full" style={{ background }} />
  }

  if (fragment.type === 'bloom') {
    return (
      <div
        className="h-full w-full"
        style={{ background: 'radial-gradient(circle, rgba(201,161,90,0.28), rgba(201,161,90,0) 68%)' }}
      />
    )
  }

  if (fragment.type === 'gold') {
    const vertical = fragment.axis === 'y'
    return (
      <div
        className="h-full w-full"
        style={{
          background: vertical
            ? 'linear-gradient(to bottom, transparent, #C9A15A 18%, #C9A15A 82%, transparent)'
            : 'linear-gradient(to right, #C9A15A, rgba(201,161,90,0.05))',
          boxShadow: '0 0 14px rgba(201,161,90,0.35)',
        }}
      />
    )
  }

  if (fragment.type === 'glass') {
    return (
      <div className="flex h-full flex-col justify-end border border-white/10 bg-[#0D0D0C]/75 px-4 py-3">
        <p className="text-[0.62rem] font-medium tracking-[0.24em] text-[#C9A15A] uppercase">{fragment.eyebrow}</p>
        <p className="display mt-1 text-4xl text-[#F4F0E8]">{fragment.text}</p>
      </div>
    )
  }

  if (fragment.type === 'button') {
    return (
      <div className="flex h-full items-center">
        <span className="inline-flex h-12 items-center bg-[#F4F0E8] px-6 text-[0.72rem] font-medium tracking-[0.18em] text-[#0D0D0C] uppercase">
          {fragment.text}
        </span>
      </div>
    )
  }

  if (fragment.type === 'wordmark') {
    return <p className="display text-[1.7rem] leading-none text-[#F4F0E8]">{fragment.text}</p>
  }

  if (fragment.type === 'nav') {
    return (
      <p className="text-[0.68rem] font-medium tracking-[0.22em] text-[#F4F0E8]/75 uppercase">{fragment.text}</p>
    )
  }

  if (fragment.type === 'kicker') {
    return (
      <p className="text-[0.62rem] font-medium tracking-[0.2em] text-[#C9A15A] uppercase sm:tracking-[0.28em]">
        {fragment.text}
      </p>
    )
  }

  if (fragment.type === 'copy') {
    return <p className="max-w-md text-sm leading-relaxed text-[#D9D3C8] sm:text-base">{fragment.text}</p>
  }

  return (
    <p
      className={`display whitespace-nowrap text-[#F4F0E8] ${DISPLAY[tier] || DISPLAY.desktop}`}
      style={{ textShadow: '0 10px 28px rgba(0,0,0,0.35)' }}
    >
      {fragment.text}
    </p>
  )
}

function FragmentShell({ fragment, children }) {
  return (
    <div
      data-intro-fragment
      data-radius={fragment.radius}
      data-angle={fragment.angle}
      data-lat={fragment.lat}
      data-spin={fragment.spin}
      data-rx={fragment.rx}
      data-ry={fragment.ry}
      data-rz={fragment.rz}
      data-depth={fragment.depth}
      className="absolute will-change-transform"
      style={boxStyle(fragment)}
    >
      {children}
    </div>
  )
}

export default function IntroFragments({ fragments, portrait, tier }) {
  return fragments.map((fragment) => (
    <FragmentShell key={fragment.id} fragment={fragment}>
      <FragmentBody fragment={fragment} portrait={portrait} tier={tier} />
    </FragmentShell>
  ))
}
