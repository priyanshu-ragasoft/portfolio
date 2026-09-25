import { gsap } from './gsapConfig'

const DURATION = 2.2

function collect(section, selector) {
  return gsap.utils.toArray(selector, section)
}

function progressUpdate(section, progress) {
  const bar = section.querySelector('[data-hero-progress]')
  const label = section.querySelector('[data-hero-progress-label]')
  if (bar) gsap.set(bar, { scaleY: progress })
  if (label) gsap.set(label, { opacity: progress > 0.92 ? 0.35 : 0.85 })
}

function disperseNodes(timeline, nodes, { start, duration, endOpacity, lift = 1.03, rotate = true }) {
  nodes.forEach((node) => {
    const delay = Number(node.dataset.delay || 0)
    const depth = Number(node.dataset.depth || 1)
    const enter = start + delay
    const scaleEnd = Number(node.dataset.scale || 1) * depth
    timeline.to(node, { opacity: 1, scale: lift * depth, duration: 0.14 }, enter)
    timeline.to(
      node,
      {
        x: Number(node.dataset.tx),
        y: Number(node.dataset.ty),
        rotation: rotate ? Number(node.dataset.rot || 0) : 0,
        scale: scaleEnd,
        opacity: endOpacity,
        duration,
        ease: 'power2.inOut',
      },
      enter + 0.08,
    )
  })
}

export function buildHeroScrollTimeline(section, mode) {
  const compact = mode === 'mobile'
  const tablet = mode === 'tablet'
  const end = compact ? '+=620' : tablet ? '+=720' : '+=820'

  const stage = section.querySelector('[data-hero-stage]')
  const image = section.querySelector('[data-hero-image]')
  const overlay = section.querySelector('[data-hero-overlay]')
  const scrim = section.querySelector('[data-hero-scrim]')
  const veil = section.querySelector('[data-hero-veil]')
  const sweep = section.querySelector('[data-hero-sweep]')
  const bloom = section.querySelector('[data-hero-bloom]')
  const lines = collect(section, '[data-hero-line]')
  const fragments = collect(section, '[data-fragment]')
  const imageFragments = collect(section, '[data-image-fragment]')
  const kicker = section.querySelector('[data-hero-kicker]')
  const copy = section.querySelector('[data-hero-copy]')
  const actions = collect(section, '[data-hero-action]')
  const indicator = section.querySelector('[data-hero-indicator]')
  const dust = collect(section, '[data-hero-dust]')

  gsap.set(fragments, { x: 0, y: 0, rotation: 0, scale: 1, opacity: 0, transformOrigin: '50% 50%' })
  gsap.set(imageFragments, { x: 0, y: 0, rotation: 0, scale: 1, opacity: 0, transformOrigin: '50% 50%' })
  gsap.set(dust, { x: 0, y: 0, scale: 0.4, opacity: 0, transformOrigin: '50% 50%' })
  if (veil) gsap.set(veil, { autoAlpha: 0 })
  if (overlay) gsap.set(overlay, { opacity: 0.1 })
  if (scrim) gsap.set(scrim, { opacity: 1 })
  if (sweep) gsap.set(sweep, { xPercent: -120, opacity: 0 })
  if (bloom) gsap.set(bloom, { opacity: 0, scale: 0.92 })
  if (stage) gsap.set(stage, { backgroundColor: 'transparent' })

  const timeline = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end,
      pin: true,
      pinSpacing: false,
      scrub: 0.6,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onToggle(self) {
        const active = self.isActive
        gsap.set([image, ...fragments, ...imageFragments], {
          willChange: active ? 'transform, opacity, filter' : 'auto',
        })
      },
      onUpdate(self) {
        section.dataset.heroProgress = String(self.progress)
        progressUpdate(section, self.progress)
      },
    },
  })

  progressUpdate(section, 0)

  const scatter = compact ? 1.7 : 2.15

  if (scrim) timeline.to(scrim, { opacity: 0, duration: 0.45 }, 0.05)
  if (overlay) timeline.to(overlay, { opacity: 0, duration: 0.35 }, 0.05)
  if (veil) timeline.set(veil, { autoAlpha: 0 }, 0)

  if (image) timeline.to(image, { autoAlpha: 0, duration: 0.28 }, 0.08)
  if (imageFragments.length) {
    disperseNodes(timeline, imageFragments, {
      start: 0.1,
      duration: scatter,
      endOpacity: compact ? 0.2 : 0.08,
      lift: 1,
    })
  }

  if (lines.length) timeline.to(lines, { autoAlpha: 0, duration: 0.28 }, 0.12)
  if (fragments.length) {
    disperseNodes(timeline, fragments, {
      start: 0.14,
      duration: scatter,
      endOpacity: compact ? 0.24 : 0.1,
      lift: 1,
    })
  }

  if (dust.length) {
    disperseNodes(timeline, dust, {
      start: 0.12,
      duration: scatter,
      endOpacity: 0,
      lift: 1,
      rotate: false,
    })
  }

  if (kicker) timeline.fromTo(kicker, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.4 }, 0.2)
  if (copy) timeline.fromTo(copy, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.4 }, 0.24)
  if (actions.length) timeline.fromTo(actions, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.4, stagger: 0.04 }, 0.28)
  if (indicator) timeline.fromTo(indicator, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.3 }, 0.2)
  if (sweep) timeline.set(sweep, { opacity: 0 }, 0)
  if (bloom) timeline.set(bloom, { opacity: 0 }, 0)

  timeline.to({}, { duration: 0.01 }, DURATION)
  return timeline
}

export function buildHeroScrollReduced(section) {
  const stage = section.querySelector('[data-hero-stage]')
  if (stage) gsap.set(stage, { autoAlpha: 1, backgroundColor: 'transparent' })
  const actions = collect(section, '[data-hero-action]')
  if (actions.length) gsap.set(actions, { autoAlpha: 1, opacity: 1, y: 0 })
}
