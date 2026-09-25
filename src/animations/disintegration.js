import { gsap, prefersReducedMotion, ScrollTrigger } from './gsapConfig'

const SHIFTS = [
  [-120, -80, -100, -6],
  [100, -60, 150, 4],
  [160, 80, -50, 5],
  [-90, 70, 80, -4],
  [40, -110, -140, 3],
  [-150, 30, 60, -5],
  [70, 100, -90, 6],
  [-40, -40, 120, -3],
  [130, 20, -30, 4],
  [-110, 110, 40, -6],
  [20, -90, 90, 2],
  [90, 60, -160, -2],
  [-70, -20, 70, 5],
  [50, 90, -80, -4],
  [-30, 50, 110, 3],
  [140, -30, -60, -5],
]

const LEVEL = {
  strong: { gain: 1, cols: 4, rows: 3, z: 1 },
  medium: { gain: 0.52, cols: 3, rows: 2, z: 0.62 },
  light: { gain: 0.3, cols: 2, rows: 2, z: 0.28 },
  subtle: { gain: 0.14, cols: 2, rows: 1, z: 0 },
}

const PLAN = [
  { selector: '[data-scene="intro"]', level: 'medium' },
  { selector: '[data-scene="about"]', level: 'medium' },
  { selector: '[data-scene="values"]', level: 'light' },
  { selector: '[data-scene="impact"]', level: 'medium', cards: true },
  { selector: '[data-scene="projects"]', level: 'strong' },
  { selector: '[data-scene="feature"]', level: 'light' },
  { selector: '[data-scene="gallery"]', level: 'light' },
  { selector: '[data-scene="education"]', level: 'light' },
  { selector: '[data-scene="insights"]', level: 'light' },
  { selector: '[data-scene="philosophy"]', level: 'light' },
  { selector: '[data-scene="contact"]', level: 'light', decorOnly: true },
  { selector: 'footer', level: 'subtle', footer: true },
]

function tier(mode) {
  if (mode === 'mobile') return { gain: 0.22, z: 0, cap: 4 }
  if (mode === 'tablet') return { gain: 0.62, z: 0.45, cap: 8 }
  return { gain: 1, z: 1, cap: 16 }
}

function shiftFor(index, gain, zGain) {
  const [x, y, z, rot] = SHIFTS[index % SHIFTS.length]
  return { x: x * gain, y: y * gain, z: z * zGain, rot: rot * Math.min(gain, 1) }
}

function ensureRelative(node) {
  if (getComputedStyle(node).position === 'static') node.style.position = 'relative'
}

function chunkHeading(heading, created) {
  const text = heading.textContent?.replace(/\s+/g, ' ').trim()
  if (!text) return null
  ensureRelative(heading)
  const words = text.split(' ').slice(0, 6)
  const host = document.createElement('div')
  host.setAttribute('data-chunk-host', '')
  host.setAttribute('aria-hidden', 'true')
  host.style.position = 'absolute'
  host.style.inset = '0'
  host.style.pointerEvents = 'none'
  host.style.zIndex = '4'
  host.style.perspective = '1200px'
  host.style.display = 'flex'
  host.style.flexWrap = 'wrap'
  host.style.alignItems = 'flex-end'
  host.style.gap = '0.28em'
  host.style.color = getComputedStyle(heading).color
  host.style.font = getComputedStyle(heading).font
  host.style.letterSpacing = getComputedStyle(heading).letterSpacing
  host.style.lineHeight = getComputedStyle(heading).lineHeight
  heading.appendChild(host)
  created.push(host)

  const pieces = words.map((word) => {
    const span = document.createElement('span')
    span.textContent = word
    span.style.display = 'inline-block'
    span.style.opacity = '0'
    span.style.willChange = 'transform, opacity'
    host.appendChild(span)
    return span
  })
  return { pieces }
}

function gridFor(level, mode) {
  const base = LEVEL[level]
  const view = tier(mode)
  let cols = base.cols
  let rows = base.rows
  if (mode === 'mobile') {
    cols = Math.min(cols, 2)
    rows = Math.min(rows, 2)
  } else if (mode === 'tablet') {
    cols = Math.min(cols, 3)
    rows = Math.min(rows, 2)
  }
  while (cols * rows > view.cap && rows > 1) rows -= 1
  while (cols * rows > view.cap && cols > 1) cols -= 1
  return {
    cols,
    rows,
    gain: base.gain * view.gain,
    z: base.z * view.z,
  }
}

function playPieces(timeline, pieces, spec, at = 0) {
  pieces.forEach((piece, index) => {
    const dest = shiftFor(index, spec.gain, spec.z)
    gsap.set(piece, { x: 0, y: 0, z: 0, rotation: 0, scale: 1, opacity: 0, force3D: true })
    timeline.to(piece, {
      x: dest.x * 0.14,
      y: dest.y * 0.14,
      z: dest.z * 0.1,
      opacity: 0.4,
      duration: 0.25,
      ease: 'none',
    }, at)
    timeline.to(piece, {
      x: dest.x * 0.48,
      y: dest.y * 0.48,
      z: dest.z * 0.42,
      rotation: dest.rot * 0.45,
      opacity: 0.95,
      duration: 0.25,
      ease: 'none',
    }, at + 0.25)
    timeline.to(piece, {
      x: dest.x,
      y: dest.y,
      z: dest.z,
      rotation: dest.rot,
      scale: 0.94,
      opacity: 0.12,
      duration: 0.5,
      ease: 'none',
    }, at + 0.5)
  })
}

function triggerWindow(section, { exit = false, footer = false } = {}) {
  if (footer) return { start: 'top 92%', end: 'top 42%' }
  if (exit) return { start: 'bottom 70%', end: 'bottom top' }
  return { start: 'top 22%', end: 'bottom top' }
}

function headingIn(section, footer) {
  if (footer) return section.querySelector('p.font-serif')
  return section.querySelector('h1, h2')
}

function scrubTimeline(trigger, plan) {
  const window = triggerWindow(trigger, plan)
  return gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger,
      start: window.start,
      end: window.end,
      scrub: 0.7,
      invalidateOnRefresh: true,
    },
  })
}

function setupSection(section, plan, mode, created) {
  const spec = gridFor(plan.level, mode)
  const heading = headingIn(section, plan.footer)
  if (!heading || heading.closest('[data-chunk-host], [data-scroll-reveal]')) return
  if (heading.hasAttribute('data-scroll-reveal')) return

  const built = chunkHeading(heading, created)
  if (!built) return

  const timeline = scrubTimeline(plan.footer || plan.exit ? section : heading, plan)
  playPieces(timeline, built.pieces, {
    gain: spec.gain * (plan.footer ? 0.45 : 0.7),
    z: plan.footer ? 0 : spec.z * 0.7,
  })
}

function setupReduced(root) {
  const nodes = [
    ...root.querySelectorAll('section'),
    ...document.querySelectorAll('footer'),
  ]
  nodes.forEach((section) => {
    if (section.hasAttribute('data-hero') || section.id === 'journey') return
    gsap.fromTo(
      section,
      { y: 0, autoAlpha: 1 },
      {
        y: -28,
        autoAlpha: 0.72,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'bottom 80%',
          end: 'bottom top',
          scrub: true,
        },
      },
    )
  })
}

export function initDisintegration(root) {
  if (!root) return () => {}
  if (prefersReducedMotion()) {
    const context = gsap.context(() => setupReduced(root))
    return () => context.revert()
  }

  const created = []
  const clear = () => {
    created.forEach((node) => {
      if (node?.remove) node.remove()
    })
    created.length = 0
  }

  const mm = gsap.matchMedia()
  const run = (mode) => {
    clear()
    PLAN.forEach((plan) => {
      const section = plan.selector === 'footer'
        ? document.querySelector('footer')
        : root.querySelector(plan.selector)
      if (!section || section.hasAttribute('data-hero')) return
      setupSection(section, plan, mode, created)
    })
    return clear
  }

  mm.add('(max-width: 767px)', () => run('mobile'))
  mm.add('(min-width: 768px) and (max-width: 1099px)', () => run('tablet'))
  mm.add('(min-width: 1100px)', () => run('desktop'))

  return () => {
    clear()
    mm.revert()
  }
}
