import { useRef } from 'react'
import { ArrowDown } from 'lucide-react'
import JourneyContent, { JourneyChapterList } from '../components/journey/JourneyContent'
import JourneyTimeline from '../components/journey/JourneyTimeline'
import WorldMap from '../components/journey/WorldMap'
import { prefersReducedMotion } from '../animations/gsapConfig'
import { useJourneyAnimation } from '../hooks/useJourneyAnimation'

function Heading() {
  return (
    <div className="max-w-xl">
      <p className="flex items-center gap-2.5 font-sans text-[0.62rem] sm:text-[0.68rem] tracking-[0.22em] text-[#C9A15A] uppercase">
        <span className="h-px w-6 sm:w-8 bg-[#C9A15A]" aria-hidden="true" />
        Journey
      </p>
      <h2 className="display mt-1 text-2xl leading-[0.96] text-[#f4f0e8] sm:text-4xl lg:text-[3.2rem] xl:text-[3.6rem]">
        A Journey
        <span className="block italic">Across Borders</span>
      </h2>
      <p className="mt-1.5 max-w-md text-[0.72rem] sm:text-xs leading-relaxed text-[#b7b0a6] line-clamp-2 sm:line-clamp-none">
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
      className="relative h-[100svh] min-h-[580px] overflow-hidden bg-[#0D0D0C] text-[#f4f0e8]"
    >
      <div className="mx-auto flex h-full max-w-[1400px] flex-col justify-between px-4 pt-20 pb-3 xs:px-5 xs:pt-22 sm:px-8 sm:pt-24 sm:pb-5 lg:px-12">
        <div className="grid min-h-0 flex-1 grid-cols-1 items-center gap-3 sm:gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Heading + Chapter Cards */}
          <div className="flex flex-col justify-center lg:col-span-6 xl:col-span-5 z-10">
            <Heading />
            <div className="mt-3 sm:mt-6">
              <JourneyContent />
            </div>
          </div>

          {/* Right Column: World Map + Horizontal Timeline underneath */}
          <div className="flex h-full flex-col justify-end pb-1 gap-1.5 sm:gap-2 lg:col-span-6 xl:col-span-7">
            {/* World Map */}
            <div className="relative w-full h-[200px] xs:h-[230px] sm:h-[380px] lg:h-[430px] xl:h-[460px]">
              <WorldMap />
            </div>

            {/* Horizontal Timeline right beneath the map */}
            <div className="w-full pt-0.5 sm:pt-1">
              <JourneyTimeline orientation="horizontal" />
            </div>
          </div>
        </div>

        {/* Bottom Bar: Scroll Hint */}
        <div className="flex items-center justify-between pt-1 sm:pt-2">
          <p
            data-journey-hint
            className="pointer-events-none flex items-center gap-1.5 sm:gap-2 font-sans text-[0.62rem] sm:text-[0.68rem] tracking-[0.18em] text-[#b7b0a6] uppercase"
          >
            <ArrowDown className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#C9A15A]" aria-hidden="true" />
            Scroll to travel
          </p>
        </div>
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
        <div className="mt-8 max-w-sm">
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

