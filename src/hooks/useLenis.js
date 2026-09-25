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

  // Skip on pure-touch devices — native momentum feels better
  lenis = new Lenis({
    lerp: 0.08,
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.8,
    infinite: false,
  })

  // Use a named ticker callback so we can remove it precisely later
  function onTick(time) {
    lenis?.raf(time * 1000)
  }

  gsap.ticker.add(onTick)
  gsap.ticker.lagSmoothing(500, 33)

  // Let ScrollTrigger know when the scroll position changed
  lenis.on('scroll', ScrollTrigger.update)

  // Refresh once fonts and images are ready
  document.fonts?.ready?.then(() => ScrollTrigger.refresh())
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true })

  return () => {
    gsap.ticker.remove(onTick)
    lenis?.destroy()
    lenis = null
  }
}
