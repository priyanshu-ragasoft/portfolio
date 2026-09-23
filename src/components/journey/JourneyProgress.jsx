import { journeyChapters } from '../../data/journeyLocations'

export default function JourneyProgress() {
  return (
    <ol className="flex flex-col gap-3" aria-label="Journey progress">
      {journeyChapters.map((chapter) => (
        <li key={chapter.id} className="flex items-baseline gap-3">
          <span data-journey-step={chapter.id} className="font-sans text-xs tracking-[0.18em] text-[#8a847c]">
            {chapter.index}
          </span>
          <span className="hidden text-[0.68rem] tracking-wide text-[#8a847c] xl:inline">{chapter.shortLocation}</span>
        </li>
      ))}
    </ol>
  )
}
