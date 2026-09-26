import { gsap } from './gsapConfig'
import { MAP_HEIGHT, MAP_WIDTH } from '../assets/maps/land'
import { journeyChapters } from '../data/journeyLocations'

export function getCameraPose(targetPoint, scale = 1.18) {
  const cx = MAP_WIDTH / 2
  const cy = MAP_HEIGHT / 2

  let tx = cx - scale * targetPoint.x
  let ty = cy - scale * targetPoint.y

  // Bounding clamps to ensure the map always frames Africa, Middle East, India, and Russia comfortably
  const minX = MAP_WIDTH * (1 - scale) - 50
  const maxX = 50
  const minY = MAP_HEIGHT * (1 - scale) - 40
  const maxY = 40

  tx = Math.max(minX, Math.min(maxX, tx))
  ty = Math.max(minY, Math.min(maxY, ty))

  return {
    x: tx,
    y: ty,
    scale,
    transformOrigin: '0 0',
  }
}

export function addCameraTweens(timeline, root, baseZoom = 1.18) {
  const camera = root.querySelector('[data-journey-camera]')
  if (!camera) return

  const zoom = baseZoom || 1.18

  // Chapter 0 initial pose: centered on Uganda (Born in Uganda)
  const initialPose = getCameraPose(journeyChapters[0].camera, zoom)
  gsap.set(camera, initialPose)

  journeyChapters.forEach((chapter, index) => {
    if (index === 0) return

    let targetZoom = zoom
    if (chapter.id === 'global-blockchain') targetZoom = zoom * 0.95
    else if (chapter.id === 'studies-india') targetZoom = zoom * 1.05

    const pose = getCameraPose(chapter.camera, targetZoom)

    // Smooth continuous glide from index - 1 to index
    timeline.to(
      camera,
      {
        ...pose,
        duration: 0.92,
        ease: 'power1.inOut',
      },
      index - 0.94,
    )
  })
}

