import { enter, isCompact } from './helpers'

function loose(nodes) {
  return [...nodes].filter((node) => !node.closest('[data-scene], [data-hero], [data-roadmap]'))
}

export function textReveal(nodes) {
  const compact = isCompact()
  loose(nodes).forEach((node) => {
    enter(node, { yPercent: 110 }, { trigger: node, duration: 1.05, ease: 'power4.out', compact })
  })
}

export function initTextReveals(root) {
  textReveal(root.querySelectorAll('[data-text-reveal]'))
}
