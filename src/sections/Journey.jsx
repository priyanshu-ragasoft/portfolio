import { useRef } from 'react'
import { ArrowDown } from 'lucide-react'
import JourneyContent, { JourneyChapterList } from '../components/journey/JourneyContent'
import JourneyProgress from '../components/journey/JourneyProgress'
import JourneyTimeline from '../components/journey/JourneyTimeline'
import WorldMap from '../components/journey/WorldMap'
import { prefersReducedMotion } from '../animations/gsapConfig'
import { useJourneyAnimation } from '../hooks/useJourneyAnimation'

function Heading() {
  return (
    <div className="max-w-xl">
      <p className="flex items-center gap-3 font-sans text-[0.68rem] tracking-[0.22em] text-[#C9A15A] uppercase">
        <span className="h-px w-8 bg-[#C9A15A]" aria-hidden="true" />
        Journey
      </p>
      <h2 className="display mt-3 text-[2.6rem] leading-[0.92] text-[#f4f0e8] sm:text-6xl lg:text-[4.4rem]">
        A Journey
        <span className="block italic">Across Borders</span>
      </h2>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-[#b7b0a6] sm:text-base">
        Kampala, the years of study, a life in the Emirates, and the work that kept returning to Uganda.
      </p>
    </div>
  )
}

function JourneyPinned() {
  const sectionRef = useRef(null)
  useJourneyAnimation(sectionRef)

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative h-[100svh] overflow-hidden bg-[#0D0D0C] text-[#f4f0e8]"
    >
      <div className="mx-auto flex h-full max-w-[1240px] flex-col px-5 pt-20 pb-5 sm:px-8 sm:pt-24">
        <div className="grid min-h-0 flex-1 grid-rows-[auto_minmax(180px,1fr)_auto] gap-4 lg:grid-cols-12 lg:grid-rows-[auto_minmax(0,1fr)_auto] lg:gap-x-10">
          <div className="flex items-start justify-between gap-6 lg:col-span-5 lg:row-start-1">
            <Heading />
            <div className="hidden pt-2 lg:block">
              <JourneyProgress />
            </div>
          </div>

          <div className="min-h-[180px] lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
            <WorldMap />
          </div>

          <div className="grid min-h-0 grid-cols-[4.5rem_minmax(0,1fr)] gap-3 lg:col-span-5 lg:row-start-2 lg:grid-cols-1">
            <div className="lg:hidden">
              <JourneyTimeline orientation="vertical" />
            </div>
            <JourneyContent />
          </div>

          <div className="hidden lg:col-span-12 lg:row-start-3 lg:block">
            <JourneyTimeline orientation="horizontal" />
          </div>
        </div>

        <p
          data-journey-hint
          className="pointer-events-none absolute bottom-6 left-8 hidden items-center gap-2 font-sans text-[0.68rem] tracking-[0.18em] text-[#b7b0a6] uppercase lg:flex"
        >
          <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
          Scroll to travel
        </p>
      </div>
    </section>
  )
}

function JourneyStatic() {
  return (
    <section id="journey" className="bg-[#0D0D0C] px-5 py-24 text-[#f4f0e8] sm:px-8">
      <div className="mx-auto max-w-[1240px]">
        <Heading />
        <div className="mt-10 h-[320px] sm:h-[420px]">
          <WorldMap />
        </div>
        <div className="mt-8 max-w-xs">
          <JourneyTimeline orientation="vertical" />
        </div>
        <JourneyChapterList />
      </div>
    </section>
  )
}

export default function Journey() {
  if (prefersReducedMotion()) return <JourneyStatic />
  return <JourneyPinned />
}
