import { gsap } from './gsapConfig'

const DURATION = 10

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
  const end = compact ? '+=1200' : tablet ? '+=1500' : '+=1800'

  const stage = section.querySelector('[data-hero-stage]')
  const frame = section.querySelector('[data-hero-frame]')
  const image = section.querySelector('[data-hero-image]')
  const overlay = section.querySelector('[data-hero-overlay]')
  const sweep = section.querySelector('[data-hero-sweep]')
  const bloom = section.querySelector('[data-hero-bloom]')
  const heading = section.querySelector('[data-hero-heading]')
  const lines = collect(section, '[data-hero-line]')
  const fragments = collect(section, '[data-fragment]')
  const imageFragments = collect(section, '[data-image-fragment]')
  const kicker = section.querySelector('[data-hero-kicker]')
  const copy = section.querySelector('[data-hero-copy]')
  const actions = collect(section, '[data-hero-action]')
  const indicator = section.querySelector('[data-hero-indicator]')
  const reveal = section.querySelector('[data-hero-reveal]')
  const dust = collect(section, '[data-hero-dust]')
  const header = document.querySelector('header')

  gsap.set(fragments, { x: 0, y: 0, rotation: 0, scale: 1, opacity: 0, transformOrigin: '50% 50%' })
  gsap.set(imageFragments, { x: 0, y: 0, rotation: 0, scale: 1, opacity: 0, transformOrigin: '50% 50%' })
  gsap.set(dust, { x: 0, y: 0, scale: 0.4, opacity: 0, transformOrigin: '50% 50%' })
  if (reveal) gsap.set(reveal, { autoAlpha: 0, y: compact ? 48 : 100 })
  if (overlay) gsap.set(overlay, { opacity: 0.12 })
  if (sweep) gsap.set(sweep, { xPercent: -120, opacity: 0 })
  if (bloom) gsap.set(bloom, { opacity: 0, scale: 0.92 })

  const timeline = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end,
      pin: true,
      scrub: 1,
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

  // Phase 1 — breathe in (0% → 20%)
  if (image) timeline.to(image, { scale: 1.06, duration: 2 }, 0)
  if (heading) timeline.to(heading, { y: -24, duration: 2 }, 0)
  if (kicker) timeline.to(kicker, { y: -6, opacity: 0.92, duration: 2 }, 0)
  if (overlay) timeline.to(overlay, { opacity: 0.2, duration: 2 }, 0)
  if (sweep) {
    timeline.to(sweep, { opacity: 0.55, duration: 0.35 }, 0.8)
    timeline.to(sweep, { xPercent: 130, duration: 1.6, ease: 'power1.inOut' }, 0.85)
    timeline.to(sweep, { opacity: 0, duration: 0.4 }, 2.1)
  }
  if (bloom) {
    timeline.to(bloom, { opacity: 0.45, scale: 1, duration: 0.8, ease: 'power2.out' }, 1.6)
    timeline.to(bloom, { opacity: 0, scale: 1.08, duration: 0.9 }, 2.6)
  }

  // Phase 2 — portrait + headline break (20% → 50%)
  if (image) timeline.to(image, { autoAlpha: 0, duration: 0.22 }, 1.92)
  if (imageFragments.length) {
    disperseNodes(timeline, imageFragments, {
      start: 1.95,
      duration: compact ? 2.1 : 2.45,
      endOpacity: compact ? 0.22 : 0.1,
      lift: 1.035,
    })
  }

  if (lines.length) timeline.to(lines, { autoAlpha: 0, duration: 0.3 }, 2)
  if (fragments.length) {
    disperseNodes(timeline, fragments, {
      start: 2,
      duration: compact ? 2 : 2.35,
      endOpacity: compact ? 0.28 : 0.12,
      lift: 1.02,
    })
  }

  if (dust.length) {
    disperseNodes(timeline, dust, {
      start: 1.88,
      duration: compact ? 2.2 : 2.6,
      endOpacity: 0,
      lift: 1.2,
      rotate: false,
    })
  }

  if (frame) {
    timeline.to(frame, { x: compact ? 16 : 36, scale: 1.02, duration: 2.6, ease: 'power1.out' }, 2.05)
  }

  if (overlay) timeline.to(overlay, { opacity: 0.48, duration: 2.4 }, 2.8)

  // Phase 3 — content exit (45% → 65%)
  if (kicker) timeline.to(kicker, { x: -80, autoAlpha: 0, duration: 1.5 }, 4.5)
  if (copy) timeline.to(copy, { y: 50, autoAlpha: 0, duration: 1.5 }, 4.65)
  if (actions.length) timeline.to(actions, { y: 80, autoAlpha: 0, duration: 1.5, stagger: 0.08 }, 4.8)
  if (indicator) timeline.to(indicator, { autoAlpha: 0, duration: 1 }, 4.5)
  if (header) timeline.to(header, { opacity: 0.4, duration: 1.2 }, 4.8)

  // Cursor subtly grows during hero scroll — targets [data-cursor-el] if present
  const cursorNode = document.querySelector('[data-cursor-el]')
  if (cursorNode) {
    timeline.to(cursorNode, { scale: 1.35, duration: 1.5 }, 2.2)
    timeline.to(cursorNode, { scale: 1, duration: 1.5 }, 6)
  }

  // Phase 4 — next chapter (60% → 100%)
  if (stage) timeline.to(stage, { scale: 0.96, autoAlpha: 0, duration: 2.5 }, 6)
  if (reveal) timeline.to(reveal, { autoAlpha: 1, y: 0, duration: 2.5 }, 6)
  if (frame) timeline.to(frame, { yPercent: compact ? 2 : 4, duration: 2.5 }, 6)

  timeline.to({}, { duration: 0.01 }, DURATION)
  return timeline
}

export function buildHeroScrollReduced(section) {
  const stage = section.querySelector('[data-hero-stage]')
  const reveal = section.querySelector('[data-hero-reveal]')
  if (reveal) gsap.set(reveal, { autoAlpha: 0, y: 40 })
  gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: '+=900',
      pin: true,
      scrub: 1,
      anticipatePin: 1,
    },
  })
    .to(stage, { autoAlpha: 0, y: -24, duration: 1, ease: 'power1.inOut' }, 0)
    .to(reveal, { autoAlpha: 1, y: 0, duration: 1, ease: 'power1.inOut' }, 0.35)
}
