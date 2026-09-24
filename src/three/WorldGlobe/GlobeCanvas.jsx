/**
 * GlobeCanvas — Three.js Canvas wrapper for the Journey section.
 *
 * Wraps <WorldGlobe> in a React Three Fiber <Canvas>, reads scroll
 * progress from the GSAP Journey ScrollTrigger via a shared ref, and
 * propagates activeChapter + routeProgress down to the globe.
 *
 * This is rendered as a drop-in replacement for the 2D WorldMap inside
 * Journey.jsx when the user has a capable device (non-reduced-motion,
 * WebGL available).
 */
import { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { prefersReducedMotion } from '../../animations/gsapConfig'
import WorldGlobe from './WorldGlobe'

const ROUTE_COUNT = 6

/**
 * GlobeCanvas renders the R3F canvas. It receives:
 * - onScroll: (progress) => void — called by the parent's GSAP ScrollTrigger
 * - activeChapter: number
 */
export default function GlobeCanvas({ activeChapter = 0 }) {
  const reduced  = useMemo(() => prefersReducedMotion(), [])
  const [scrollProgress, setScrollProgress] = useState(0)

  // Listen for the journey scroll progress event dispatched by useJourneyAnimation
  useEffect(() => {
    const handler = (e) => setScrollProgress(e.detail?.progress ?? 0)
    window.addEventListener('journey:scroll', handler, { passive: true })
    return () => window.removeEventListener('journey:scroll', handler)
  }, [])

  // Build per-route draw progress (0..1) based on scroll progress + active chapter
  const routeProgress = useMemo(() => {
    const obj = {}
    for (let i = 0; i < ROUTE_COUNT; i++) {
      // Each route activates when its index chapter is active
      const chapterFrac = activeChapter / Math.max(1, ROUTE_COUNT)
      const routeStart  = i / ROUTE_COUNT
      const routeEnd    = (i + 1) / ROUTE_COUNT
      const local = (chapterFrac - routeStart) / (routeEnd - routeStart)
      obj[i] = Math.max(0, Math.min(1, local))
    }
    return obj
  }, [activeChapter])

  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, reduced ? 1 : 1.5]}
      style={{ width: '100%', height: '100%' }}
      aria-hidden="true"
    >
      <WorldGlobe
        scrollProgress={scrollProgress}
        activeChapter={activeChapter}
        routeProgress={routeProgress}
        reduced={reduced}
      />
    </Canvas>
  )
}
