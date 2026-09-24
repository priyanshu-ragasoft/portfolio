import { gsap } from './gsapConfig'
import { journeyChapters } from '../data/journeyLocations'

const MUTED = '#8a847c'
const GOLD = '#C9A15A'
const WHITE = '#f4f0e8'

export function addTimelineTweens(timeline, root) {
  const horizontal = root.querySelector('[data-journey-line="x"]')
  if (horizontal) {
    if (typeof horizontal.getTotalLength === 'function') {
      const length = Math.ceil(horizontal.getTotalLength()) || 1000
      gsap.set(horizontal, { strokeDasharray: length, strokeDashoffset: length })
      timeline.to(horizontal, { strokeDashoffset: 0, duration: journeyChapters.length, ease: 'none' }, 0)
    } else {
      gsap.set(horizontal, { scaleX: 0 })
      timeline.to(horizontal, { scaleX: 1, duration: journeyChapters.length, ease: 'none' }, 0)
    }
  }
  const vertical = root.querySelector('[data-journey-line="y"]')
  if (vertical) {
    gsap.set(vertical, { scaleY: 0 })
    timeline.to(vertical, { scaleY: 1, duration: journeyChapters.length, ease: 'none' }, 0)
  }

  journeyChapters.forEach((chapter, index) => {
    const step = root.querySelector(`[data-journey-step="${chapter.id}"]`)
    const year = root.querySelector(`[data-journey-year="${chapter.id}"]`)
    const loc = root.querySelector(`[data-journey-step-loc="${chapter.id}"]`)
    const node = root.querySelector(`[data-journey-node="${chapter.id}"]`)
    const glow = root.querySelector(`[data-journey-node-glow="${chapter.id}"]`)
    const chip = root.querySelector(`[data-journey-step-chip="${chapter.id}"]`)
    const chipDot = root.querySelector(`[data-journey-chip-dot="${chapter.id}"]`)

    const isInitial = index === 0

    if (step) gsap.set(step, { color: isInitial ? '#0D0D0C' : MUTED, fontWeight: isInitial ? '700' : '500' })
    if (year) gsap.set(year, { color: isInitial ? WHITE : MUTED, fontWeight: isInitial ? '600' : '400' })
    if (loc) gsap.set(loc, { color: isInitial ? GOLD : MUTED, fontWeight: isInitial ? '600' : '400' })
    if (node) {
      gsap.set(node, {
        scale: isInitial ? 1.15 : 1,
        borderColor: isInitial ? GOLD : 'rgba(255,255,255,0.18)',
        backgroundColor: isInitial ? GOLD : '#141311',
        boxShadow: isInitial ? '0 0 16px rgba(201,161,90,0.7)' : 'none',
      })
    }
    if (glow) gsap.set(glow, { opacity: isInitial ? 1 : 0, scale: isInitial ? 1.25 : 0.8 })
    if (chipDot) gsap.set(chipDot, { opacity: isInitial ? 1 : 0 })

    if (index > 0) {
      const activate = { duration: 0.28, ease: 'power2.out' }
      if (step) timeline.to(step, { color: '#0D0D0C', fontWeight: '700', ...activate }, index)
      if (year) timeline.to(year, { color: WHITE, fontWeight: '600', ...activate }, index)
      if (loc) timeline.to(loc, { color: GOLD, fontWeight: '600', ...activate }, index)
      if (node) {
        timeline.to(
          node,
          {
            scale: 1.15,
            borderColor: GOLD,
            backgroundColor: GOLD,
            boxShadow: '0 0 16px rgba(201,161,90,0.7)',
            ...activate,
          },
          index,
        )
      }
      if (glow) timeline.to(glow, { opacity: 1, scale: 1.25, ...activate }, index)
      if (chipDot) timeline.to(chipDot, { opacity: 1, ...activate }, index)
    }

    if (index < journeyChapters.length - 1) {
      const deactivate = { duration: 0.22, ease: 'power2.in' }
      if (step) timeline.to(step, { color: GOLD, fontWeight: '500', ...deactivate }, index + 0.88)
      if (year) timeline.to(year, { color: MUTED, fontWeight: '400', ...deactivate }, index + 0.88)
      if (loc) timeline.to(loc, { color: MUTED, fontWeight: '400', ...deactivate }, index + 0.88)
      if (node) {
        timeline.to(
          node,
          {
            scale: 1,
            borderColor: 'rgba(201,161,90,0.45)',
            backgroundColor: '#1a1815',
            boxShadow: 'none',
            ...deactivate,
          },
          index + 0.88,
        )
      }
      if (glow) timeline.to(glow, { opacity: 0, scale: 0.8, ...deactivate }, index + 0.88)
      if (chipDot) timeline.to(chipDot, { opacity: 0, ...deactivate }, index + 0.88)
    }
  })
}

