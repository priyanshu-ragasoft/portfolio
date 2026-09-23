import { useMemo, useRef } from 'react'
import { prefersReducedMotion } from '../../animations/gsapConfig'
import { createIntroScene } from '../../animations/introAnimation'
import { useIntroAnimation } from '../../hooks/useIntroAnimation'
import Logo from '../Logo'
import IntroFragments from './IntroFragments'
import IntroOrb from './IntroOrb'
import IntroParticles from './IntroParticles'

export default function IntroTransition({ onComplete }) {
  const rootRef = useRef(null)
  const active = useIntroAnimation(rootRef, onComplete)
  const reduced = useMemo(() => prefersReducedMotion(), [])
  const scene = useMemo(() => (active && !reduced ? createIntroScene() : null), [active, reduced])

  if (!active) return null

  if (reduced || !scene) {
    return (
      <div
        ref={rootRef}
        className="fixed inset-0 z-[120] bg-[#0D0D0C]"
        role="status"
        aria-live="polite"
        aria-label="Loading experience"
      />
    )
  }

  return (
    <div
      ref={rootRef}
      data-intro-tier={scene.tier}
      className="fixed inset-0 z-[120] bg-[#0D0D0C] text-[#F4F0E8]"
      role="status"
      aria-live="polite"
      aria-label="Loading experience"
    >
      <div aria-hidden="true" className="absolute inset-0" style={{ perspective: '1200px' }}>
        <div data-intro-world className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
          <IntroFragments fragments={scene.fragments} portrait={scene.portrait} tier={scene.tier} />
          <IntroParticles particles={scene.particles} />
          <IntroOrb />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 58%, rgba(13,13,12,0.55) 100%)' }}
      />

      <div
        data-intro-copy
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center px-6"
        style={{ opacity: 0 }}
      >
        <div className="text-center">
          <Logo className="mx-auto mb-6 h-28 w-auto sm:h-36" />
          <p
            className="font-serif text-[clamp(1.65rem,4.4vw,3.35rem)] leading-[0.92] font-medium text-[#F4F0E8] uppercase"
            style={{ letterSpacing: '0.14em' }}
          >
            Gilbert Kevin
          </p>
          <p
            className="mt-1 font-serif text-[clamp(1.65rem,4.4vw,3.35rem)] leading-[0.92] font-medium text-[#F4F0E8] uppercase"
            style={{ letterSpacing: '0.18em' }}
          >
            Kwizera
          </p>
          <span className="mx-auto mt-5 block h-px w-8 bg-[#C9A15A]/80" />
          <p className="mt-4 text-[0.62rem] font-medium tracking-[0.34em] text-[#C9A15A]">LOADING EXPERIENCE</p>
          <p
            data-intro-progress
            className="mt-3 font-sans text-xs tracking-[0.28em] text-[#F4F0E8]/70"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            00%
          </p>
        </div>
      </div>
    </div>
  )
}
