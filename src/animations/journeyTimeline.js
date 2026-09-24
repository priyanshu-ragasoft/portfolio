import { gsap } from './gsapConfig'
import { journeyChapters } from '../data/journeyLocations'

const MUTED = '#8a847c'
const GOLD = '#C9A15A'
const WHITE = '#f4f0e8'
const COUNT = journeyChapters.length // 7

export function updateTimelineProgress(root, progress) {
  if (!root) return

  // progress is 0.0 to 1.0 across the pinned journey section
  const clampedProgress = Math.min(1, Math.max(0, progress))
  const rawIndex = clampedProgress * COUNT
  const curIndex = Math.min(COUNT - 1, Math.floor(rawIndex))

  // Wave line progress: smoothly flows from node 0 (0%) to node 6 (100%)
  // Since there are (COUNT - 1) segments between milestones:
  const lineProgress = Math.min(1, Math.max(0, (clampedProgress * COUNT) / (COUNT - 1)))

  // Gold wave length is driven by the scroll timeline in addTimelineTweens.

  // 2. Vertical Line (Mobile/Tablet view)
  const vertical = root.querySelector('[data-journey-line="y"]')
  if (vertical) {
    vertical.style.transform = `scaleY(${lineProgress})`
  }

  // 3. Update Milestones & Micro Tags
  journeyChapters.forEach((chapter, index) => {
    const isCurrent = index === curIndex
    const isCompleted = index < curIndex

    const item = root.querySelector(`[data-journey-step-item="${chapter.id}"]`)
    const step = root.querySelector(`[data-journey-step="${chapter.id}"]`)
    const year = root.querySelector(`[data-journey-year="${chapter.id}"]`)
    const loc = root.querySelector(`[data-journey-step-loc="${chapter.id}"]`)
    const node = root.querySelector(`[data-journey-node="${chapter.id}"]`)
    const glow = root.querySelector(`[data-journey-node-glow="${chapter.id}"]`)
    const chipDot = root.querySelector(`[data-journey-chip-dot="${chapter.id}"]`)

    if (item) {
      item.classList.toggle('is-current', isCurrent)
      item.classList.toggle('is-active', isCurrent)
      item.classList.toggle('is-completed', isCompleted)
    }

    if (glow) {
      glow.style.opacity = isCurrent ? '1' : '0'
      glow.style.transform = isCurrent ? 'scale(1.25)' : 'scale(0.85)'
    }

    if (node) {
      if (isCurrent) {
        node.style.borderColor = GOLD
        node.style.backgroundColor = GOLD
        node.style.transform = 'scale(1.18)'
        node.style.boxShadow = '0 0 20px rgba(201,161,90,0.85)'
      } else if (isCompleted) {
        node.style.borderColor = GOLD
        node.style.backgroundColor = '#1f1c16'
        node.style.transform = 'scale(1)'
        node.style.boxShadow = '0 0 10px rgba(201,161,90,0.3)'
      } else {
        node.style.borderColor = 'rgba(255,255,255,0.18)'
        node.style.backgroundColor = '#141311'
        node.style.transform = 'scale(1)'
        node.style.boxShadow = 'none'
      }
    }

    if (step) {
      if (isCurrent) {
        step.style.color = '#0D0D0C'
        step.style.fontWeight = '700'
      } else if (isCompleted) {
        step.style.color = GOLD
        step.style.fontWeight = '600'
      } else {
        step.style.color = MUTED
        step.style.fontWeight = '500'
      }
    }

    if (year) {
      if (isCurrent) {
        year.style.color = WHITE
        year.style.fontWeight = '600'
      } else if (isCompleted) {
        year.style.color = '#c5bfb4'
        year.style.fontWeight = '500'
      } else {
        year.style.color = MUTED
        year.style.fontWeight = '400'
      }
    }

    if (loc) {
      if (isCurrent) {
        loc.style.color = GOLD
        loc.style.fontWeight = '600'
      } else if (isCompleted) {
        loc.style.color = '#dfcaa0'
        loc.style.fontWeight = '500'
      } else {
        loc.style.color = MUTED
        loc.style.fontWeight = '400'
      }
    }

    if (chipDot) {
      chipDot.style.opacity = isCurrent ? '1' : '0'
    }
  })
}

export function initTimeline(root) {
  updateTimelineProgress(root, 0)
}

export function addTimelineTweens(timeline, root) {
  const horizontal = root.querySelector('[data-journey-line="x"]')
  if (horizontal) {
    const length = horizontal.getTotalLength() || 1
    gsap.set(horizontal, { strokeDasharray: length, strokeDashoffset: length })
    timeline.to(
      horizontal,
      { strokeDashoffset: 0, duration: COUNT, ease: 'none' },
      0,
    )
  }

  const vertical = root.querySelector('[data-journey-line="y"]')
  if (vertical) {
    gsap.set(vertical, { scaleY: 0, transformOrigin: 'top center' })
    timeline.to(vertical, { scaleY: 1, duration: COUNT, ease: 'none' }, 0)
  }

  initTimeline(root)
}

