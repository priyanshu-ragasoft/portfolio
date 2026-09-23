import { gsap } from './gsapConfig'
import { journeyRoutes } from '../data/journeyLocations'

function marker(root, id) {
  return root.querySelector(`[data-journey-marker="${id}"]`)
}

function scaleOf(node) {
  return node?.querySelector('[data-marker-scale]')
}

function pulse(timeline, node, at) {
  const target = scaleOf(node)
  if (!target) return
  timeline.to(target, { scale: 1.45, duration: 0.16, ease: 'power2.out' }, at)
  timeline.to(target, { scale: 1, duration: 0.22, ease: 'power2.inOut' }, at + 0.16)
}

export function addMarkerTweens(timeline, root) {
  root.querySelectorAll('[data-journey-marker]').forEach((node) => {
    gsap.set(node, { opacity: 1 })
    gsap.set(scaleOf(node), { scale: 1 })
  })

  journeyRoutes.forEach((route, index) => {
    if (index === 0) pulse(timeline, marker(root, route.fromId), route.at)
    pulse(timeline, marker(root, route.toId), route.at + route.duration - 0.08)
  })
}
