import { gsap } from './gsapConfig'
import { isCompact } from './helpers'

function distance(value, compact) {
  if (!compact) return value
  return Math.sign(value) * Math.min(24, Math.abs(value))
}

function buildHero(section, compact) {
  const image = section.querySelector('[data-hero-image]')
  const veil = section.querySelector('[data-hero-veil]')
  const kicker = section.querySelector('[data-hero-kicker]')
  const lines = section.querySelectorAll('[data-hero-line]')
  const copy = section.querySelector('[data-hero-copy]')
  const actions = section.querySelectorAll('[data-hero-action]')
  const indicator = section.querySelector('[data-hero-indicator]')
  const frame = section.querySelector('[data-hero-frame]')
  const bar = indicator?.querySelector('span')

  if (lines.length) gsap.set(lines, { yPercent: 110 })
  if (kicker) gsap.set(kicker, { opacity: 0, y: distance(18, compact) })
  if (copy) gsap.set(copy, { opacity: 0, y: distance(24, compact) })
  if (actions.length) gsap.set(actions, { opacity: 0, autoAlpha: 0, y: distance(16, compact) })
  if (indicator) gsap.set(indicator, { opacity: 0, autoAlpha: 0, y: distance(10, compact) })
  if (image) gsap.set(image, { scale: compact ? 1.08 : 1.14, willChange: 'transform' })
  if (veil) gsap.set(veil, { opacity: 0 })

  const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

  if (image) {
    timeline.to(
      image,
      {
        scale: 1,
        duration: 1.7,
        ease: 'power2.out',
        onComplete: () => gsap.set(image, { willChange: 'auto' }),
      },
      0,
    )
  }

  if (kicker) {
    timeline.to(kicker, { y: 0, opacity: 1, autoAlpha: 1, duration: 0.7 }, 0.35)
  }

  if (lines.length) {
    timeline.to(lines, { yPercent: 0, autoAlpha: 1, duration: 1.05, stagger: 0.12, ease: 'power4.out' }, 0.5)
  }

  if (copy) {
    timeline.to(copy, { y: 0, opacity: 1, autoAlpha: 1, duration: 0.8 }, 0.95)
  }

  if (actions.length) {
    timeline.to(actions, { y: 0, opacity: 1, autoAlpha: 1, duration: 0.6, stagger: 0.1 }, 1.15)
  }

  if (indicator) {
    timeline.to(indicator, { opacity: 1, autoAlpha: 1, y: 0, duration: 0.6 }, 1.35)
  }

  if (bar) {
    timeline.call(() => {
      gsap.fromTo(
        bar,
        { scaleY: 0.25 },
        {
          scaleY: 1,
          duration: 1.15,
          ease: 'power1.inOut',
          repeat: -1,
          yoyo: true,
          transformOrigin: 'top center',
        },
      )
    }, null, 1.5)
  }
}

export function playHero(root) {
  const section = root.querySelector('[data-hero]')
  if (!section) return
  buildHero(section, isCompact())
}
