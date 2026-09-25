import { gsap } from './gsapConfig'
import { isCompact } from './helpers'

const MAX_TILT = 5  // degrees — subtle, card-floating feel

export function initInteractions(root) {
  if (!root) return () => {}

  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const lift = isCompact() ? -4 : -8
  const magnets = new Map()

  const magnetFor = (button) => {
    if (!magnets.has(button)) {
      magnets.set(button, gsap.quickTo(button, 'x', { duration: 0.35, ease: 'power3.out' }))
    }
    return magnets.get(button)
  }

  const onOver = (event) => {
    if (!fine) return

    const card = event.target.closest?.('[data-lift]')
    if (card && !card.hasAttribute('data-card-3d') && root.contains(card) && !card.contains(event.relatedTarget) && card.dataset.revealed !== 'false') {
      gsap.to(card, { y: lift, duration: 0.35, ease: 'power2.out', overwrite: 'auto' })
    }

    const frame = event.target.closest?.('[data-image-reveal]')
    if (!frame || !root.contains(frame) || frame.contains(event.relatedTarget)) return
    const zoom = frame.querySelector('[data-image-zoom]')
    if (!zoom) return
    gsap.to(zoom, { scale: 1.08, duration: 0.9, ease: 'power3.out', overwrite: 'auto' })
  }

  const onOut = (event) => {
    const card = event.target.closest?.('[data-lift]')
    if (card && !card.hasAttribute('data-card-3d') && root.contains(card) && !card.contains(event.relatedTarget)) {
      if (card.dataset.revealed !== 'false') {
        gsap.to(card, { y: 0, duration: 0.45, ease: 'power2.out', overwrite: 'auto' })
      }
    }

    // Reset 3D tilt
    const tiltCard = event.target.closest?.('[data-tilt]')
    if (tiltCard && root.contains(tiltCard) && !tiltCard.contains(event.relatedTarget)) {
      gsap.to(tiltCard, { rotateX: 0, rotateY: 0, duration: 0.55, ease: 'power2.out', overwrite: 'auto' })
    }

    const frame = event.target.closest?.('[data-image-reveal]')
    if (frame && root.contains(frame) && !frame.contains(event.relatedTarget)) {
      const zoom = frame.querySelector('[data-image-zoom]')
      if (zoom) gsap.to(zoom, { scale: 1, duration: 1, ease: 'power3.out', overwrite: 'auto' })
    }

    const button = event.target.closest?.('[data-button]')
    if (!button || !root.contains(button) || button.contains(event.relatedTarget)) return
    if (fine) magnetFor(button)(0)
    gsap.to(button, { scale: 1, duration: 0.2, ease: 'power2.out', overwrite: 'auto' })
  }

  const onMove = (event) => {
    if (!fine) return

    // Magnetic button
    const button = event.target.closest?.('[data-button]')
    if (button && root.contains(button)) {
      const rect = button.getBoundingClientRect()
      const relX = event.clientX - (rect.left + rect.width / 2)
      magnetFor(button)(gsap.utils.clamp(-6, 6, relX * 0.22))
    }

    // 3D tilt for [data-tilt] cards — independent of button check
    const tiltCard = event.target.closest?.('[data-tilt]')
    if (tiltCard && root.contains(tiltCard)) {
      const r  = tiltCard.getBoundingClientRect()
      const rx = ((event.clientY - (r.top  + r.height / 2)) / r.height) * -MAX_TILT
      const ry = ((event.clientX - (r.left + r.width  / 2)) / r.width)  *  MAX_TILT
      gsap.to(tiltCard, { rotateX: rx, rotateY: ry, duration: 0.4, ease: 'power2.out', overwrite: 'auto', transformPerspective: 900 })
    }
  }

  const onDown = (event) => {
    const button = event.target.closest?.('[data-button]')
    if (!button || !root.contains(button)) return
    gsap.to(button, { scale: 0.96, duration: 0.12, ease: 'power2.out', overwrite: 'auto' })
  }

  const onUp = (event) => {
    const button = event.target.closest?.('[data-button]')
    if (!button || !root.contains(button)) return
    gsap.to(button, { scale: 1, duration: 0.18, ease: 'power2.out', overwrite: 'auto' })
  }

  root.addEventListener('pointerover', onOver)
  root.addEventListener('pointerout', onOut)
  root.addEventListener('pointermove', onMove)
  root.addEventListener('pointerdown', onDown)
  root.addEventListener('pointerup', onUp)

  return () => {
    root.removeEventListener('pointerover', onOver)
    root.removeEventListener('pointerout', onOut)
    root.removeEventListener('pointermove', onMove)
    root.removeEventListener('pointerdown', onDown)
    root.removeEventListener('pointerup', onUp)
    magnets.clear()
  }
}
