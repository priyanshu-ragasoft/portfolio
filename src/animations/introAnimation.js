import { gsap, prefersReducedMotion } from './gsapConfig'
import { seededRange } from '../utils/seededRandom'

export const ENABLE_INTRO = true
export const INTRO_DURATION = 2.2

const INTRO_KEY = 'portfolio-intro'
const BASE_DURATION = 2.2
const IMAGE_GRID = { desktop: [5, 4], tablet: [4, 3], mobile: [3, 3] }
const PARTICLE_COUNT = { desktop: 46, tablet: 28, mobile: 14 }
const DEPTH_SCALE = { desktop: 1, tablet: 0.72, mobile: 0.42 }
const PORTRAIT = { desktop: '66% 14%', tablet: '65% 14%', mobile: 'center 8%' }

let gateReady = false
let allowIntro = false

function readFlag() {
  try { return sessionStorage.getItem(INTRO_KEY) } catch { return null }
}
function writeFlag() {
  try { sessionStorage.setItem(INTRO_KEY, '1') } catch { /* private mode */ }
}
function clearFlag() {
  try { sessionStorage.removeItem(INTRO_KEY) } catch { /* private mode */ }
}
function isReload() {
  const entry = performance.getEntriesByType('navigation')[0]
  if (entry?.type) return entry.type === 'reload'
  return performance.navigation?.type === 1
}

export function shouldRunIntro() {
  if (!ENABLE_INTRO) return false
  if (!gateReady) {
    gateReady = true
    if (isReload()) clearFlag()
    allowIntro = readFlag() !== '1'
  }
  return allowIntro && readFlag() !== '1'
}

export function introShouldPlay() {
  return shouldRunIntro()
}

export function markIntroPlayed() {
  allowIntro = false
  writeFlag()
}

export function getIntroTier(width = window.innerWidth) {
  if (width < 768) return 'mobile'
  if (width < 1100) return 'tablet'
  return 'desktop'
}

function motionFor(index) {
  return {
    radius: seededRange(index, 4, 0, 1),
    angle: seededRange(index, 5, 0, Math.PI * 2),
    lat: seededRange(index, 6, -1.02, 1.02),
    spin: seededRange(index, 7, 0.84, 1.16),
    rx: seededRange(index, 8, -32, 32),
    ry: seededRange(index, 9, -46, 46),
    rz: seededRange(index, 10, -16, 16),
    depth: seededRange(index, 11, 0.28, 1),
  }
}

function imageGrid(cols, rows) {
  const gridTop = -8
  const gridHeight = 116
  const gap = 0.12
  const tileW = (100 - gap * (cols - 1)) / cols
  const tileH = (gridHeight - gap * (rows - 1)) / rows
  const tiles = []
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      tiles.push({
        type: 'image',
        x: col * (tileW + gap),
        y: gridTop + row * (tileH + gap),
        w: tileW,
        h: tileH,
        crop: { col, row, cols, rows },
      })
    }
  }
  return tiles
}

function chromeFor(tier) {
  if (tier === 'mobile') {
    return [
      { type: 'veil', x: 0, y: 46, w: 100, h: 54, veil: 'bottom' },
      { type: 'gold', x: 8, y: 58, w: 14, h: 1, hUnit: 'px', axis: 'x' },
      { type: 'kicker', x: 7, y: 62, w: 86, h: 5, text: 'Humanitarian  ·  Consultant' },
      { type: 'display', x: 6, y: 68, w: 88, h: 11, text: 'Turning Purpose' },
      { type: 'display', x: 6, y: 80, w: 78, h: 12, text: 'Impact.' },
    ]
  }
  if (tier === 'tablet') {
    return [
      { type: 'bloom', x: 36, y: 4, w: 54, h: 58 },
      { type: 'veil', x: 0, y: 0, w: 58, h: 52, veil: 'left' },
      { type: 'veil', x: 0, y: 46, w: 62, h: 54, veil: 'left' },
      { type: 'gold', x: 6.2, y: 28, w: 11, h: 1, hUnit: 'px', axis: 'x' },
      { type: 'wordmark', x: 6, y: 4.6, w: 24, h: 7, text: 'Kwizera' },
      { type: 'kicker', x: 6, y: 34, w: 52, h: 5, text: 'Humanitarian  ·  Consultant' },
      { type: 'display', x: 5.4, y: 40, w: 62, h: 12, text: 'Turning Purpose' },
      { type: 'display', x: 5.4, y: 52, w: 66, h: 12, text: 'Into Meaningful' },
      { type: 'display', x: 5.4, y: 64, w: 46, h: 12, text: 'Impact.' },
      { type: 'copy', x: 6, y: 78, w: 42, h: 8, text: 'Dignity-based care, offered with quiet consistency.' },
    ]
  }
  return [
    { type: 'bloom', x: 42, y: 2, w: 48, h: 62 },
    { type: 'veil', x: 0, y: 0, w: 52, h: 38, veil: 'left' },
    { type: 'veil', x: 0, y: 32, w: 48, h: 40, veil: 'left' },
    { type: 'veil', x: 0, y: 64, w: 54, h: 36, veil: 'left' },
    { type: 'gold', x: 8, y: 24, w: 8, h: 1, hUnit: 'px', axis: 'x' },
    { type: 'gold', x: 8, y: 78, w: 1, h: 8, wUnit: 'px', axis: 'y' },
    { type: 'wordmark', x: 6, y: 4.5, w: 18, h: 7, text: 'Kwizera' },
    { type: 'nav', x: 58, y: 5.2, w: 34, h: 4, text: 'About    Journey    Impact' },
    { type: 'kicker', x: 6, y: 30, w: 44, h: 5, text: 'Humanitarian  ·  Consultant  ·  Social Impact' },
    { type: 'display', x: 5.5, y: 36, w: 54, h: 13, text: 'Turning Purpose' },
    { type: 'display', x: 5.5, y: 49, w: 58, h: 13, text: 'Into Meaningful' },
    { type: 'display', x: 5.5, y: 62, w: 42, h: 14, text: 'Impact.' },
    { type: 'copy', x: 6, y: 78, w: 36, h: 7, text: 'Dignity-based care, offered with quiet consistency.' },
    { type: 'button', x: 6, y: 86, w: 20, h: 6.5, text: 'Explore My Journey' },
    { type: 'glass', x: 76, y: 72, w: 16, h: 18, eyebrow: 'Kampala', text: '1971' },
  ]
}

function createParticles(tier) {
  const count = PARTICLE_COUNT[tier]
  return Array.from({ length: count }, (_, index) => ({
    id: `particle-${index}`,
    angle: seededRange(index, 21, 0, Math.PI * 2),
    lat: seededRange(index, 22, -1.1, 1.1),
    radius: seededRange(index, 23, 0, 1),
    spin: seededRange(index, 24, 0.75, 1.2),
    alpha: seededRange(index, 25, 0.16, 0.5),
    size: seededRange(index, 26, 1.4, 3) * (tier === 'mobile' ? 0.85 : 1),
    color: index % 3 === 0 ? '#F4F0E8' : '#C9A15A',
  }))
}

export function createIntroScene() {
  const tier = getIntroTier()
  const [cols, rows] = IMAGE_GRID[tier]
  const fragments = []
  const add = (partial) => {
    const index = fragments.length
    fragments.push({
      hUnit: '%',
      wUnit: '%',
      ...partial,
      id: `${partial.type}-${index}`,
      ...motionFor(index),
    })
  }
  imageGrid(cols, rows).forEach(add)
  chromeFor(tier).forEach(add)
  return { tier, portrait: PORTRAIT[tier], fragments, particles: createParticles(tier) }
}

function smoothstep(value) {
  const t = Math.min(1, Math.max(0, value))
  return t * t * (3 - 2 * t)
}
function orbitProgress(value) {
  const t = Math.min(1, Math.max(0, value))
  return t < 0.5 ? 2 * t * t : 1 - ((-2 * t + 2) ** 2) / 2
}
function lerp(a, b, t) { return a + (b - a) * t }
function blendPose(from, to, t) {
  return {
    x: lerp(from.x, to.x, t),
    y: lerp(from.y, to.y, t),
    z: lerp(from.z, to.z, t),
    rotationX: lerp(from.rotationX, to.rotationX, t),
    rotationY: lerp(from.rotationY, to.rotationY, t),
    rotationZ: lerp(from.rotationZ, to.rotationZ, t),
    scale: lerp(from.scale, to.scale, t),
  }
}
const REST_POSE = { x: 0, y: 0, z: 0, rotationX: 0, rotationY: 0, rotationZ: 0, scale: 1 }

function scatterPose(record, depthScale) {
  const dx = record.cx - record.viewW / 2
  const dy = record.cy - record.viewH / 2
  const len = Math.hypot(dx, dy) || 1
  const dist = (depthScale < 0.6 ? 14 : 26) + record.depth * (depthScale < 0.6 ? 16 : 32)
  return {
    x: (dx / len) * dist,
    y: (dy / len) * dist,
    z: (18 + record.depth * 22) * depthScale,
    rotationX: record.rx * 0.3 * depthScale,
    rotationY: record.ry * 0.3 * depthScale,
    rotationZ: record.rz * 0.38 * depthScale,
    scale: 1,
  }
}

function orbitPose(record, angle, depthScale) {
  const radius = record.span * (0.26 + record.radius * 0.2)
  const cosLat = Math.cos(record.lat)
  const ox = Math.cos(angle) * cosLat * radius
  const oy = Math.sin(record.lat) * radius * 0.8
  const oz = Math.sin(angle) * cosLat * (64 + record.depth * 150) * depthScale
  return {
    x: record.viewW / 2 + ox - record.cx,
    y: record.viewH / 2 + oy - record.cy,
    z: oz,
    rotationX: record.rx * depthScale * Math.sin(angle),
    rotationY: record.ry * depthScale * Math.cos(angle * 0.85),
    rotationZ: record.rz * depthScale * Math.sin(angle * 0.65),
    scale: 1 + oz / 2200,
  }
}

function particlePose(record, progress, depthScale) {
  const appear = smoothstep(progress / 0.18) * (1 - smoothstep((progress - 0.74) / 0.26))
  const travel = record.angle + orbitProgress(progress) * Math.PI * 1.45 * record.spin
  const radius = record.span * (0.16 + record.radius * 0.32)
  const cosLat = Math.cos(record.lat)
  return {
    x: Math.cos(travel) * cosLat * radius,
    y: Math.sin(record.lat) * radius * 0.78,
    z: Math.sin(travel) * cosLat * 110 * depthScale,
    opacity: record.alpha * appear,
  }
}

function ringOpacity(progress) {
  return smoothstep(progress / 0.16) * (1 - smoothstep((progress - 0.7) / 0.3))
}

function formatProgress(value) {
  const rounded = Math.min(100, Math.max(0, Math.round(value)))
  if (rounded >= 100) return '100%'
  return `${String(rounded).padStart(2, '0')}%`
}

function measure(root) {
  const bounds = root.getBoundingClientRect()
  const span = Math.min(bounds.width, bounds.height)
  const fragments = [...root.querySelectorAll('[data-intro-fragment]')].map((el) => {
    const rect = el.getBoundingClientRect()
    return {
      el,
      cx: rect.left - bounds.left + rect.width / 2,
      cy: rect.top - bounds.top + rect.height / 2,
      viewW: bounds.width,
      viewH: bounds.height,
      span,
      radius: Number(el.dataset.radius),
      angle: Number(el.dataset.angle),
      lat: Number(el.dataset.lat),
      spin: Number(el.dataset.spin),
      rx: Number(el.dataset.rx),
      ry: Number(el.dataset.ry),
      rz: Number(el.dataset.rz),
      depth: Number(el.dataset.depth),
    }
  })
  const particles = [...root.querySelectorAll('[data-intro-particle]')].map((el) => ({
    el,
    span,
    angle: Number(el.dataset.angle),
    lat: Number(el.dataset.lat),
    radius: Number(el.dataset.radius),
    spin: Number(el.dataset.spin),
    alpha: Number(el.dataset.alpha),
  }))
  return { fragments, particles }
}

function lockPage() {
  const nodes = [...document.querySelectorAll('a[href="#main"], header, main, footer')]
  const hadInert = nodes.map((node) => node.hasAttribute('inert'))
  nodes.forEach((node) => node.setAttribute('inert', ''))
  const lockedX = window.scrollX
  const lockedY = window.scrollY
  const keys = new Set(['Tab', ' ', 'PageDown', 'PageUp', 'ArrowDown', 'ArrowUp', 'Home', 'End'])
  const block = (event) => {
    if (event.type === 'keydown' && !keys.has(event.key)) return
    event.preventDefault()
  }
  const freeze = () => {
    if (window.scrollX !== lockedX || window.scrollY !== lockedY) window.scrollTo(lockedX, lockedY)
  }
  document.addEventListener('keydown', block, true)
  document.addEventListener('wheel', block, { capture: true, passive: false })
  document.addEventListener('touchmove', block, { capture: true, passive: false })
  window.addEventListener('scroll', freeze, { passive: true })
  let released = false
  return () => {
    if (released) return
    released = true
    document.removeEventListener('keydown', block, true)
    document.removeEventListener('wheel', block, { capture: true })
    document.removeEventListener('touchmove', block, { capture: true })
    window.removeEventListener('scroll', freeze)
    nodes.forEach((node, index) => {
      if (!hadInert[index]) node.removeAttribute('inert')
    })
  }
}

function playReduced(root, finish) {
  return gsap.timeline({ onComplete: finish })
    .set(root, { pointerEvents: 'none' })
    .to(root, { opacity: 0, duration: 0.4, ease: 'power1.out' })
}

function playFull(root, finish) {
  const depthScale = DEPTH_SCALE[root.dataset.introTier || 'desktop'] ?? 1
  const measured = measure(root)
  const world = root.querySelector('[data-intro-world]')
  const orb = root.querySelector('[data-intro-orb]')
  const copy = root.querySelector('[data-intro-copy]')
  const progressEl = root.querySelector('[data-intro-progress]')
  const span = Math.min(Math.max(INTRO_DURATION, 0.8), 3)
  const at = (time) => (time / BASE_DURATION) * span
  const clock = { p: 0 }
  const progress = { value: 0 }

  const apply = (p) => {
    measured.fragments.forEach((record) => {
      const breakT = smoothstep(p / 0.18)
      const enterT = smoothstep(Math.max(0, p - 0.14) / 0.18)
      const travel = record.angle + orbitProgress(Math.max(0, (p - 0.1) / 0.9)) * Math.PI * 1.22 * record.spin
      gsap.set(record.el, blendPose(
        blendPose(REST_POSE, scatterPose(record, depthScale), breakT),
        orbitPose(record, travel, depthScale),
        enterT,
      ))
    })
    measured.particles.forEach((record) => gsap.set(record.el, particlePose(record, p, depthScale)))
    if (world) {
      const tilt = smoothstep(p / 0.42)
      gsap.set(world, {
        rotationX: 13 * depthScale * tilt,
        rotationY: 36 * depthScale * tilt,
        scale: 1 - 0.045 * depthScale * tilt,
      })
    }
    if (orb) gsap.set(orb, { opacity: ringOpacity(p), rotationZ: p * 168 })
  }

  const timeline = gsap.timeline({
    onComplete: () => {
      gsap.set(measured.fragments.map((record) => record.el), { willChange: 'auto' })
      finish()
    },
  })

  if (world) timeline.set(world, { transformOrigin: '50% 50%', force3D: true }, 0)
  if (orb) {
    timeline.set(orb, {
      xPercent: -50, yPercent: -50, rotationX: 66, rotationZ: 0, opacity: 0,
      transformOrigin: '50% 50%', force3D: true,
    }, 0)
  }
  if (measured.particles.length) {
    timeline.set(measured.particles.map((record) => record.el), {
      xPercent: -50, yPercent: -50, opacity: 0, force3D: true,
    }, 0)
  }
  if (copy) timeline.set(copy, { opacity: 0, y: 12 }, 0)

  timeline.to(clock, {
    p: 1,
    duration: at(1.28),
    ease: 'none',
    onStart: () => {
      gsap.set(measured.fragments.map((record) => record.el), {
        willChange: 'transform', force3D: true, transformOrigin: '50% 50%',
      })
    },
    onUpdate: () => apply(clock.p),
  }, at(0.2))

  timeline.to(measured.fragments.map((record) => record.el), {
    x: 0, y: 0, z: 0, rotationX: 0, rotationY: 0, rotationZ: 0, scale: 1,
    duration: at(0.5), ease: 'expo.inOut', overwrite: 'auto',
  }, at(1.5))

  if (world) {
    timeline.to(world, {
      rotationX: 0, rotationY: 0, scale: 1,
      duration: at(0.5), ease: 'expo.inOut', overwrite: 'auto',
    }, at(1.5))
  }
  if (copy) {
    timeline.to(copy, { opacity: 1, y: 0, duration: at(0.28), ease: 'power2.out' }, at(0.34))
    timeline.to(copy, { opacity: 0, y: -8, duration: at(0.22), ease: 'power2.in' }, at(1.38))
  }
  if (progressEl) {
    timeline.to(progress, {
      value: 100,
      duration: at(1.15),
      ease: 'none',
      onUpdate: () => { progressEl.textContent = formatProgress(progress.value) },
    }, at(0.22))
  }
  timeline.to(root, {
    opacity: 0,
    duration: at(0.2),
    ease: 'power2.inOut',
    onStart: () => { root.style.pointerEvents = 'none' },
  }, at(2))
  return timeline
}

export function playIntroAnimation(root, { onComplete } = {}) {
  const release = lockPage()
  const finish = () => {
    release()
    markIntroPlayed()
    queueMicrotask(() => onComplete?.())
  }
  try {
    if (prefersReducedMotion()) playReduced(root, finish)
    else playFull(root, finish)
  } catch (error) {
    console.error(error)
    finish()
  }
  return release
}
