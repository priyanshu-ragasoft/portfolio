import { gsap } from './gsapConfig'
import { journeyRoutes } from '../data/journeyLocations'

function prepare(path) {
  const length = path.getTotalLength()
  path.dataset.length = String(length)
  gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
  return length
}

export function moveRoutePopup(popup, camera, path, along) {
  const length = Number(path.dataset.length) || path.getTotalLength()
  const point = path.getPointAtLength(length * along)
  const svgPoint = camera.ownerSVGElement.createSVGPoint()
  svgPoint.x = point.x
  svgPoint.y = point.y
  const matrix = camera.getScreenCTM()
  const host = popup.parentElement?.getBoundingClientRect()
  if (!matrix || !host) return
  const screen = svgPoint.matrixTransform(matrix)
  const left = screen.x - host.left
  const top = screen.y - host.top
  gsap.set(popup, {
    left: Math.min(host.width - 12, Math.max(12, left)),
    top: Math.min(host.height - 8, Math.max(28, top)),
    xPercent: -50,
    yPercent: -115,
  })
}

function draw(timeline, path, traveler, popup, camera, at, duration) {
  const length = prepare(path)
  if (popup) gsap.set(popup, { opacity: 0 })
  timeline.to(
    path,
    {
      strokeDashoffset: 0,
      duration,
      ease: 'none',
      onUpdate() {
        const progress = this.progress()
        const along = progress >= 0.995 ? 0.58 : progress
        if (traveler) {
          if (progress <= 0.02 || progress >= 0.995) gsap.set(traveler, { opacity: 0 })
          else {
            const point = path.getPointAtLength(length * progress)
            gsap.set(traveler, { attr: { cx: point.x, cy: point.y }, opacity: 1 })
          }
        }
        if (!popup || !camera) return
        popup.dataset.along = String(along)
        const visible = progress > 0.08
        gsap.set(popup, { opacity: visible ? Math.min(1, (progress - 0.08) / 0.18) : 0, scale: 0.94 + Math.min(progress, 1) * 0.06 })
        if (visible) moveRoutePopup(popup, camera, path, along)
      },
    },
    at,
  )
}

export function placeVisiblePopups(root) {
  const camera = root.querySelector('[data-journey-camera]')
  if (!camera) return
  root.querySelectorAll('[data-route-popup]').forEach((popup) => {
    const along = Number(popup.dataset.along || 0)
    if (!along || Number(gsap.getProperty(popup, 'opacity')) < 0.04) return
    const route = root.querySelector(`[data-journey-route="${popup.dataset.routePopup}"]`)
    const path = route?.querySelector('[data-route-draw]')
    if (path) moveRoutePopup(popup, camera, path, along)
  })
}

export function addRouteMotion(timeline, root) {
  const camera = root.querySelector('[data-journey-camera]')
  journeyRoutes.forEach((route, index) => {
    const group = root.querySelector(`[data-journey-route="${route.id}"]`)
    if (!group) return
    const path = group.querySelector('[data-route-draw]')
    const popup = root.querySelector(`[data-route-popup="${route.id}"]`)
    draw(timeline, path, group.querySelector('[data-route-traveler]'), popup, camera, route.at, route.duration)
    if (index === 0) return
    const previous = root.querySelector(`[data-route-popup="${journeyRoutes[index - 1].id}"]`)
    if (previous) timeline.to(previous, { opacity: 0, duration: 0.16 }, route.at)
  })
  const last = journeyRoutes[journeyRoutes.length - 1]
  const lastPopup = root.querySelector(`[data-route-popup="${last.id}"]`)
  if (lastPopup) timeline.to(lastPopup, { opacity: 0, duration: 0.25 }, last.at + last.duration)
}
