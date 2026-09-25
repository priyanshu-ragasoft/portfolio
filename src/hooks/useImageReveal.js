import { useLayoutEffect } from 'react'
import { gsap, prefersReducedMotion, ScrollTrigger } from '../animations/gsapConfig'

/**
 * Slide distance and easing live here.
 * Desktop left/right travel is 150px. Mobile ignores left/right and rises 48px.
 * Ease is power3.out — smooth, no bounce. Duration is 0.9s.
 */
const SLIDE_X = 150
const SLIDE_Y = 80
const MOBILE_Y = 48

const buckets = {
  left: new Set(),
  right: new Set(),
  up: new Set(),
}
let flushId = 0
let batchContext = null

function rowOf(el) {
  let node = el.parentElement
  while (node && node !== document.body) {
    const columns = getComputedStyle(node).gridTemplateColumns
    const count = columns && columns !== 'none' ? columns.split(' ').filter(Boolean).length : 0
    if (count > 1 || node.clientWidth > el.offsetWidth * 1.35) return node
    node = node.parentElement
  }
  return el.parentElement
}

/**
 * Auto direction: compare the image center to its row.
 * Full-width (or centered) images use "up".
 * Pass direction="left" | "right" | "up" to override a wrong guess.
 */
export function detectImageDirection(el) {
  const row = rowOf(el)
  if (!row) return 'up'
  const elRect = el.getBoundingClientRect()
  const rowRect = row.getBoundingClientRect()
  if (rowRect.width < 1 || elRect.width >= rowRect.width * 0.82) return 'up'
  const mid = elRect.left + elRect.width / 2
  const rowMid = rowRect.left + rowRect.width / 2
  if (Math.abs(mid - rowMid) < 28) return 'up'
  return mid < rowMid ? 'left' : 'right'
}

function fromState(direction, mobile) {
  if (mobile || direction === 'up') return { x: 0, y: mobile ? MOBILE_Y : SLIDE_Y, opacity: 0 }
  return { x: direction === 'left' ? -SLIDE_X : SLIDE_X, y: 0, opacity: 0 }
}

function playIn(batch) {
  gsap.to(batch, {
    x: 0,
    y: 0,
    opacity: 1,
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.06,
    overwrite: 'auto',
    onStart: () => batch.forEach((node) => node.classList.add('will-change-transform')),
    onComplete: () => batch.forEach((node) => node.classList.remove('will-change-transform')),
  })
}

function playOut(batch, direction, mobile) {
  gsap.to(batch, {
    ...fromState(direction, mobile),
    duration: 0.7,
    ease: 'power3.out',
    stagger: 0.04,
    overwrite: 'auto',
    onComplete: () => batch.forEach((node) => node.classList.remove('will-change-transform')),
  })
}

function rebuildBatches(debug) {
  batchContext?.revert()
  batchContext = gsap.context(() => {
    const mm = gsap.matchMedia()
    const mount = (mobile) => {
      const groups = mobile
        ? { up: [...buckets.left, ...buckets.right, ...buckets.up] }
        : { left: [...buckets.left], right: [...buckets.right], up: [...buckets.up] }

      Object.entries(groups).forEach(([direction, nodes]) => {
        if (!nodes.length) return
        gsap.set(nodes, fromState(direction, mobile))
        ScrollTrigger.batch(nodes, {
          start: 'top 85%',
          once: false,
          markers: debug,
          onEnter: (batch) => playIn(batch),
          onLeave: (batch) => playOut(batch, direction, mobile),
          onEnterBack: (batch) => playIn(batch),
          onLeaveBack: (batch) => playOut(batch, direction, mobile),
        })
      })
    }
    mm.add('(max-width: 767px)', () => mount(true))
    mm.add('(min-width: 768px)', () => mount(false))
  })
}

function scheduleBatches(debug) {
  cancelAnimationFrame(flushId)
  flushId = requestAnimationFrame(() => rebuildBatches(debug))
}

/**
 * Directional image reveal.
 * Each image joins a direction group. ScrollTrigger.batch plays that group
 * in, and reverses it (same axis, fade out) when it leaves or you scroll back.
 */
export function useImageReveal(ref, { direction, debug = false } = {}) {
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return undefined

    if (prefersReducedMotion()) {
      gsap.set(el, { clearProps: 'transform,opacity' })
      return undefined
    }

    const resolved = direction || detectImageDirection(el)
    const key = resolved === 'left' || resolved === 'right' ? resolved : 'up'
    buckets[key].add(el)
    scheduleBatches(debug)

    return () => {
      buckets[key].delete(el)
      gsap.set(el, { clearProps: 'transform,opacity' })
      el.classList.remove('will-change-transform')
      scheduleBatches(debug)
    }
  }, [direction, debug])
}
