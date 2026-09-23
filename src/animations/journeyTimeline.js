import { gsap } from './gsapConfig'
import { journeyChapters } from '../data/journeyLocations'

const MUTED = '#8a847c'
const GOLD = '#C9A15A'

export function addTimelineTweens(timeline, root) {
  const horizontal = root.querySelector('[data-journey-line="x"]')
  const vertical = root.querySelector('[data-journey-line="y"]')
  if (horizontal) {
    gsap.set(horizontal, { scaleX: 0 })
    timeline.to(horizontal, { scaleX: 1, duration: journeyChapters.length, ease: 'none' }, 0)
  }
  if (vertical) {
    gsap.set(vertical, { scaleY: 0 })
    timeline.to(vertical, { scaleY: 1, duration: journeyChapters.length, ease: 'none' }, 0)
  }

  journeyChapters.forEach((chapter, index) => {
    const nodes = [
      ...root.querySelectorAll(`[data-journey-year="${chapter.id}"]`),
      ...root.querySelectorAll(`[data-journey-step="${chapter.id}"]`),
    ]
    if (!nodes.length) return
    gsap.set(nodes, { color: index === 0 ? GOLD : MUTED })
    if (index > 0) timeline.to(nodes, { color: GOLD, duration: 0.22 }, index)
    if (index < journeyChapters.length - 1) {
      timeline.to(nodes, { color: MUTED, duration: 0.22 }, index + 1)
    }
  })
}
