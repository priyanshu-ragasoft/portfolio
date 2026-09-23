import { gsap } from './gsapConfig'
import { MAP_HEIGHT, MAP_WIDTH } from '../assets/maps/land'
import { journeyRoutes } from '../data/journeyLocations'

const HOME = { x: 0, y: 0, scale: 1 }

function framed(start, end, maxZoom) {
  const cx = MAP_WIDTH / 2
  const cy = MAP_HEIGHT / 2
  const midX = (start.x + end.x) / 2
  const midY = (start.y + end.y) / 2
  const spanX = Math.max(70, Math.abs(start.x - end.x) + 110)
  const spanY = Math.max(70, Math.abs(start.y - end.y) + 90)
  const fit = Math.min((MAP_WIDTH * 0.58) / spanX, (MAP_HEIGHT * 0.58) / spanY)
  const scale = Math.min(maxZoom, Math.max(1, fit))
  return {
    x: (cx - midX) * scale,
    y: (cy - midY) * scale,
    scale,
  }
}

export function addCameraTweens(timeline, root, zoom) {
  const camera = root.querySelector('[data-journey-camera]')
  if (!camera || zoom <= 1) return

  const origin = `${MAP_WIDTH / 2} ${MAP_HEIGHT / 2}`
  gsap.set(camera, { ...HOME, svgOrigin: origin })

  journeyRoutes.forEach((route, index) => {
    const path = root.querySelector(`[data-journey-route="${route.id}"] [data-route-draw]`)
    if (!path) return
    const length = path.getTotalLength()
    const pose = framed(path.getPointAtLength(0), path.getPointAtLength(length), zoom)
    const last = index === journeyRoutes.length - 1
    timeline.to(camera, { ...pose, svgOrigin: origin, duration: 0.22, ease: 'power2.inOut' }, route.at)
    if (last) {
      timeline.to(camera, { ...HOME, svgOrigin: origin, duration: 0.28, ease: 'power2.inOut' }, route.at + route.duration)
    }
  })
}
