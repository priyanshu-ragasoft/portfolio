import { useRef, useState, useEffect } from 'react'
import { ArrowDown } from 'lucide-react'
import HeroDust from '../components/HeroDust'
import FragmentedHeroImage from '../components/FragmentedHeroImage'
import FragmentedText from '../components/FragmentedText'
import Button from '../components/Button'
import { prefersReducedMotion } from '../animations/gsapConfig'
import { profile } from '../data/profile'
import { useHeroScrollAnimation } from '../hooks/useHeroScrollAnimation'

const lines = ['Turning Purpose', 'Into Meaningful', 'Impact.']

export default function Hero() {
  const heroRef = useRef(null)
  const [compact, setCompact] = useState(false)
  const motion = !prefersReducedMotion()

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)')
    const sync = () => setCompact(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  useHeroScrollAnimation(heroRef)

  return (
    <section ref={heroRef} data-hero className="pointer-events-none relative z-20 bg-transparent text-paper">
      <div data-hero-stage className="relative min-h-[100svh] overflow-hidden bg-transparent">
        <div data-hero-frame className="absolute inset-x-0 -top-[2%] h-[106%]">
          <div data-hero-parallax="deep" className="absolute inset-0 h-full w-full will-change-transform">
            <img
              data-hero-image
              src={profile.hero}
              alt="Portrait of Gilbert Kevin Jimmy Kwizera"
              className="relative z-[1] h-full w-full object-cover object-[center_8%] sm:object-[66%_14%]"
              fetchPriority="high"
              decoding="async"
            />
            {motion ? (
              <FragmentedHeroImage
                src={profile.hero}
                cols={compact ? 4 : 7}
                rows={compact ? 4 : 5}
                compact={compact}
                objectPosition={compact ? 'center 8%' : '66% 14%'}
              />
            ) : null}
          </div>
        </div>
        <div data-hero-scrim className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25 sm:bg-gradient-to-r sm:from-ink sm:via-ink/80 sm:to-ink/15" />
        <div data-hero-veil className="pointer-events-none absolute inset-0 bg-ink opacity-0" />
        <div data-hero-overlay className="pointer-events-none absolute inset-0 bg-black/10" aria-hidden="true" />
        <div
          data-hero-bloom
          className="pointer-events-none absolute left-[18%] top-[12%] z-[2] h-[55%] w-[42%] rounded-full bg-[#C9A15A]/25 blur-3xl sm:left-[38%] sm:top-[8%] sm:h-[62%] sm:w-[34%]"
          aria-hidden="true"
        />
        <div
          data-hero-sweep
          className="pointer-events-none absolute inset-y-0 left-0 z-[3] w-[38%] bg-gradient-to-r from-transparent via-[#f4f0e8]/18 to-transparent mix-blend-screen"
          aria-hidden="true"
        />
        {motion ? <HeroDust compact={compact} /> : null}

        <div
          data-hero-parallax="mid"
          className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1180px] flex-col justify-end px-5 pt-24 pb-10 will-change-transform sm:px-8 sm:pt-28 sm:pb-12 lg:pb-14"
        >
          <p
            data-hero-kicker
            className="max-w-[16rem] text-[0.62rem] font-medium tracking-[0.16em] text-paper/85 sm:max-w-none sm:text-xs sm:tracking-[0.24em]"
          >
            HUMANITARIAN • CONSULTANT • SOCIAL IMPACT
          </p>

          <div data-hero-heading className="relative mt-3.5 max-w-4xl sm:mt-5">
            <h1 className="display text-[clamp(2.4rem,6.8vw,5.6rem)] leading-[1.06] text-paper">
              {lines.map((line) => (
                <span key={line} className="block overflow-hidden pb-[0.12em]">
                  <span data-hero-line className="block">
                    {line}
                  </span>
                </span>
              ))}
            </h1>
            {motion ? (
              <div
                data-hero-fragments
                className="pointer-events-none absolute inset-0 z-[11]"
                aria-hidden="true"
              >
                {lines.map((line, index) => (
                  <FragmentedText
                    key={line}
                    text={line}
                    seed={index + 1}
                    compact={compact}
                    cols={compact ? 4 : 8}
                    rows={compact ? 2 : 3}
                    className="display text-[clamp(2.4rem,6.8vw,5.6rem)] text-paper"
                  />
                ))}
              </div>
            ) : null}
          </div>

          <p
            data-hero-parallax="light"
            data-hero-copy
            className="mt-4 max-w-xl text-sm leading-relaxed text-paper/80 will-change-transform sm:mt-5 sm:text-base lg:text-lg"
          >
            Gilbert Kevin Jimmy Kwizera builds practical support for people at their most vulnerable —
            in cancer care, recovery, education, and the quiet work of protecting dignity.
          </p>

          {/* Action Buttons (Always visible and interactive on desktop & mobile) */}
          <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:items-center">
            <span data-hero-action className="pointer-events-auto z-30">
              <Button to="/#journey" variant="light">
                Explore My Journey
              </Button>
            </span>
            <span data-hero-action className="pointer-events-auto z-30">
              <Button to="/contact" variant="ghost" className="text-paper hover:bg-paper hover:text-ink">
                Let&apos;s Connect
              </Button>
            </span>
          </div>

          <div
            data-hero-indicator
            className="mt-8 flex items-center gap-3 text-xs tracking-[0.2em] text-paper/70 sm:mt-10"
          >
            <span className="relative block h-10 w-px bg-paper/25" aria-hidden="true">
              <span
                data-hero-progress
                className="absolute inset-0 origin-top bg-paper/80"
                style={{ transform: 'scaleY(0)' }}
              />
            </span>
            <div>
              <p data-hero-progress-label className="font-sans text-[0.62rem] tracking-[0.18em] uppercase">
                Scroll to explore
              </p>
              <ArrowDown className="mt-1 h-3.5 w-3.5" aria-hidden="true" />
            </div>
            <span className="sr-only">Scroll</span>
          </div>
        </div>
      </div>
    </section>
  )
}
