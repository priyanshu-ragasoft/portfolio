import { gsap } from './gsapConfig'

export function bindHeroParallax(section, getProgress) {
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  if (!fine || !section) return () => {}

  const layers = [
    { el: section.querySelector('[data-hero-parallax="deep"]'), x: 32, y: 22 },
    { el: section.querySelector('[data-hero-parallax="mid"]'), x: 14, y: 10 },
    { el: section.querySelector('[data-hero-parallax="light"]'), x: 8, y: 5 },
  ].filter((layer) => layer.el)

  if (!layers.length) return () => {}

  const movers = layers.map((layer) => ({
    xTo: gsap.quickTo(layer.el, 'x', { duration: 0.85, ease: 'power3.out' }),
    yTo: gsap.quickTo(layer.el, 'y', { duration: 0.85, ease: 'power3.out' }),
    ...layer,
  }))

  const reset = () => {
    movers.forEach((layer) => {
      layer.xTo(0)
      layer.yTo(0)
    })
  }

  const move = (event) => {
    const strength = Math.max(0, 1 - getProgress() / 0.3)
    if (!strength) {
      reset()
      return
    }
    const rect = section.getBoundingClientRect()
    const nx = (event.clientX - rect.left) / rect.width - 0.5
    const ny = (event.clientY - rect.top) / rect.height - 0.5
    movers.forEach((layer) => {
      layer.xTo(nx * layer.x * strength)
      layer.yTo(ny * layer.y * strength)
    })
  }

  const leave = () => reset()

  section.addEventListener('pointermove', move)
  section.addEventListener('pointerleave', leave)

  return () => {
    section.removeEventListener('pointermove', move)
    section.removeEventListener('pointerleave', leave)
    reset()
  }
}
