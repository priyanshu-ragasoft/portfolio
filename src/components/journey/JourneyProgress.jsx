import { journeyChapters } from '../../data/journeyLocations'

export default function JourneyProgress() {
  return (
    <ol className="flex flex-col gap-3.5" aria-label="Journey progress">
      {journeyChapters.map((chapter) => (
        <li key={chapter.id} className="group flex items-baseline gap-3.5">
          <span
            data-journey-step={chapter.id}
            className="font-sans text-xs tracking-[0.18em] text-[#8a847c] transition-colors duration-300"
          >
            {chapter.index}
          </span>
          <span
            data-journey-step-loc={chapter.id}
            className="hidden whitespace-nowrap font-sans text-[0.72rem] tracking-[0.12em] text-[#8a847c] uppercase transition-colors duration-300 xl:inline"
          >
            {chapter.shortLocation}
          </span>
        </li>
      ))}
    </ol>
  )
}
