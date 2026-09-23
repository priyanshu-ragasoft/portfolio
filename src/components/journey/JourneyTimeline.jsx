import { journeyChapters } from '../../data/journeyLocations'

export default function JourneyTimeline({ orientation = 'horizontal' }) {
  const vertical = orientation === 'vertical'

  return (
    <div className={vertical ? 'relative h-full pl-1' : 'relative'}>
      <div
        className={
          vertical
            ? 'absolute top-2 bottom-2 left-[5px] w-px bg-white/15'
            : 'absolute top-1/2 right-0 left-0 h-px -translate-y-1/2 bg-white/15'
        }
        aria-hidden="true"
      />
      <div
        data-journey-line={vertical ? 'y' : 'x'}
        className={
          vertical
            ? 'absolute top-2 bottom-2 left-[5px] w-px origin-top bg-[#C9A15A]'
            : 'absolute top-1/2 right-0 left-0 h-px origin-left -translate-y-1/2 bg-[#C9A15A]'
        }
        aria-hidden="true"
      />
      <ol className={vertical ? 'relative flex h-full flex-col justify-between py-1' : 'relative flex items-center justify-between gap-3'}>
        {journeyChapters.map((chapter) => (
          <li key={`${orientation}-${chapter.id}`} className="group relative">
            <div className={vertical ? 'flex items-center gap-3' : 'flex flex-col items-center gap-2'}>
              <span className="relative z-10 h-2.5 w-2.5 rounded-full border border-[#C9A15A]/70 bg-[#0D0D0C]" aria-hidden="true" />
              <span
                data-journey-year={chapter.id}
                className="font-sans text-[0.68rem] tracking-[0.14em] text-[#8a847c] uppercase"
              >
                {vertical ? chapter.index : chapter.year}
              </span>
            </div>
            {vertical ? null : (
              <span className="pointer-events-none absolute bottom-[calc(100%+0.45rem)] left-1/2 z-20 hidden -translate-x-1/2 border border-white/10 bg-[#161513] px-2.5 py-1 text-[0.65rem] tracking-wide whitespace-nowrap text-[#f4f0e8] group-hover:block">
                {chapter.title}
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
