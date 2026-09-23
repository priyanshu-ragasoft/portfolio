import { useLayoutEffect } from 'react'
import { gsap, prefersReducedMotion, ScrollTrigger } from '../animations/gsapConfig'

export function useGSAP(animation, deps = []) {
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined

    let active = true
    const context = gsap.context(() => animation())

    document.fonts?.ready?.then(() => {
      if (active) ScrollTrigger.refresh()
    })

    return () => {
      active = false
      context.revert()
    }
    // The caller owns the dependency list. `animation` is read from that render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
