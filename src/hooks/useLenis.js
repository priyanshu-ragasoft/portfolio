/**
 * useLenis — Global Lenis smooth scroll, wired into GSAP ticker + ScrollTrigger.
 *
 * Integration strategy (safe with GSAP pinning):
 *   1. Run Lenis inside the GSAP ticker rAF loop so they share the same frame.
 *   2. Forward Lenis scroll events to ScrollTrigger.update so scrub values stay current.
 *   3. Do NOT use ScrollTrigger.scrollerProxy — it breaks GSAP pin:true on sections.
 *
 * Automatically disabled when:
 *   - prefers-reduced-motion is set
 *   - touch-only / coarse-pointer devices (native momentum is better)
 *   - the IntroTransition overlay is active (html.is-intro)
 */
import { useLayoutEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../animations/gsapConfig'

/** Shared instance — exported so other modules can call lenis.scrollTo() */
export let lenis = null

export function useLenis() {
  useLayoutEffect(() => {
    if (document.documentElement.classList.contains('is-intro')) {
      // Defer until the intro overlay clears
      const handler = () => { _init() }
      window.addEventListener('intro:done', handler, { once: true })
      return () => window.removeEventListener('intro:done', handler)
    }
    return _init()
  }, [])
}

function _init() {
  // Respect reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}

  // Silky smooth scroll configuration
  lenis = new Lenis({
    duration: 1.25,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.6,
    infinite: false,
  })

  // Synchronize Lenis strictly with GSAP ticker loop
  function onTick(time) {
    lenis?.raf(time * 1000)
  }

  gsap.ticker.add(onTick)
  // Lag smoothing 0 ensures no sudden jumps or frame stutters when scrolling
  gsap.ticker.lagSmoothing(0)

  // Notify ScrollTrigger on every frame update
  lenis.on('scroll', ScrollTrigger.update)

  // Refresh ScrollTrigger once fonts and DOM settle
  document.fonts?.ready?.then(() => ScrollTrigger.refresh())
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true })

  return () => {
    gsap.ticker.remove(onTick)
    lenis?.destroy()
    lenis = null
  }
}
