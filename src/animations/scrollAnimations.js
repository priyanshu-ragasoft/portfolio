import { gsap } from './gsapConfig'
import { enter, isCompact } from './helpers'

function loose(nodes) {
  return gsap.utils.toArray(nodes).filter((node) => !node.closest('[data-scene], [data-hero], [data-roadmap]'))
}

export function fadeUp(nodes) {
  const compact = isCompact()
  loose(nodes).forEach((node) => {
    enter(node, { y: 40, opacity: 0 }, { trigger: node, compact, delay: Number(node.dataset.delay || 0) })
  })
}

export function fadeIn(nodes) {
  const compact = isCompact()
  loose(nodes).forEach((node) => {
    enter(node, { opacity: 0 }, { trigger: node, compact, duration: 0.9, ease: 'power2.out' })
  })
}

export function slideIn(nodes) {
  const compact = isCompact()
  loose(nodes).forEach((node) => {
    const fromLeft = node.dataset.slide === 'left'
    enter(node, { y: 28, x: fromLeft ? -28 : 28, opacity: 0 }, { trigger: node, compact })
  })
}

export function staggerReveal(groups) {
  const compact = isCompact()
  loose(groups).forEach((group) => {
    const items = group.querySelectorAll('[data-stagger-item]')
    enter(items, { y: 36, opacity: 0 }, { trigger: group, stagger: 0.1, compact })
  })
}

export function scaleIn(nodes) {
  const compact = isCompact()
  loose(nodes).forEach((node) => {
    enter(node, { scale: 0.96, opacity: 0 }, { trigger: node, compact })
  })
}

export function drawTimelines(root) {
  loose(root.querySelectorAll('[data-timeline]')).forEach((timeline) => {
    const line = timeline.querySelector('[data-timeline-line]')
    if (!line) return
    gsap.fromTo(
      line,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        transformOrigin: 'top center',
        scrollTrigger: {
          trigger: timeline,
          start: 'top 70%',
          end: 'bottom 65%',
          scrub: true,
        },
      },
    )
  })
}

export function initScrollReveals(root) {
  fadeUp(root.querySelectorAll('[data-fade-up]'))
  fadeIn(root.querySelectorAll('[data-fade-in]'))
  slideIn(root.querySelectorAll('[data-slide]'))
  staggerReveal(root.querySelectorAll('[data-stagger]'))
  scaleIn(root.querySelectorAll('[data-scale]'))
  drawTimelines(root)
}
