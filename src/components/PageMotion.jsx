import { useLayoutEffect, useRef } from 'react'
import { initDisintegration } from '../animations/disintegration'
import { prefersReducedMotion, ScrollTrigger } from '../animations/gsapConfig'
import { playHero } from '../animations/heroAnimations'
import { initImageMotion } from '../animations/imageAnimations'
import { initInteractions } from '../animations/interactions'
import { initRoadmap } from '../animations/roadmap'
import { initScenes } from '../animations/scenes'
import { initScrollReveals } from '../animations/scrollAnimations'
import { initTextReveals } from '../animations/textAnimations'
import { useGSAP } from '../hooks/useGSAP'

export default function PageMotion() {
  const markerRef = useRef(null)

  useGSAP(() => {
    const scope = markerRef.current?.closest('[data-motion-root]')
    if (!scope) return undefined

    const runMotion = () => {
      playHero(scope)
      initRoadmap(scope)
      initScenes(scope)
      initScrollReveals(scope)
      initTextReveals(scope)
      initImageMotion(scope)
      const releaseChunks = initDisintegration(scope)
      const release = initInteractions(scope)

      const refresh = () => ScrollTrigger.refresh()
      scope.querySelectorAll('img').forEach((img) => {
        if (!img.complete) img.addEventListener('load', refresh, { once: true })
      })
      requestAnimationFrame(refresh)

      return () => {
        releaseChunks?.()
        release?.()
        scope.querySelectorAll('img').forEach((img) => img.removeEventListener('load', refresh))
      }
    }

    if (typeof document !== 'undefined' && document.documentElement.classList.contains('is-intro')) {
      const onIntroDone = () => {
        runMotion()
      }
      window.addEventListener('intro:done', onIntroDone, { once: true })
      return () => window.removeEventListener('intro:done', onIntroDone)
    } else {
      return runMotion()
    }
  }, [])

  useLayoutEffect(() => {
    if (!prefersReducedMotion()) return undefined
    const scope = markerRef.current?.closest('[data-motion-root]')
    if (!scope) return undefined
    return initDisintegration(scope)
  }, [])

  return <span ref={markerRef} className="hidden" />
}
