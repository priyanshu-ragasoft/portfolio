import { gsap } from './gsapConfig'

export function isCompact() {
  return window.matchMedia('(max-width: 767px)').matches
}

export function shift(value, compact) {
  if (!compact || typeof value !== 'number') return value
  return Math.sign(value) * Math.min(24, Math.abs(value))
}

export function enter(targets, from, options = {}) {
  const list = gsap.utils.toArray(targets).filter(Boolean)
  if (!list.length) return null

  const compact = Boolean(options.compact)
  const fromVars = { ...from }
  if (typeof fromVars.y === 'number') fromVars.y = shift(fromVars.y, compact)
  if (typeof fromVars.x === 'number') fromVars.x = shift(fromVars.x, compact)

  gsap.set(list, fromVars)
  list.forEach((node) => {
    if (node.hasAttribute?.('data-lift')) node.dataset.revealed = 'false'
  })

  const to = {
    duration: options.duration ?? 0.9,
    ease: options.ease ?? 'power3.out',
    stagger: options.stagger,
    delay: options.delay ?? 0,
    overwrite: 'auto',
    onStart: () => gsap.set(list, { willChange: 'transform, opacity' }),
    onComplete: () => {
      gsap.set(list, { willChange: 'auto' })
      if ('clipPath' in fromVars) gsap.set(list, { clearProps: 'clipPath' })
      list.forEach((node) => {
        if (node.hasAttribute?.('data-lift')) node.dataset.revealed = 'true'
      })
      options.onComplete?.()
    },
  }

  if ('y' in fromVars) to.y = 0
  if ('x' in fromVars) to.x = 0
  if ('yPercent' in fromVars) to.yPercent = 0
  if ('xPercent' in fromVars) to.xPercent = 0
  if ('scale' in fromVars) to.scale = 1
  if ('opacity' in fromVars) to.opacity = 1
  if ('rotate' in fromVars) to.rotate = 0
  if ('clipPath' in fromVars) to.clipPath = 'inset(0% 0% 0% 0%)'

  if (!options.immediate) {
    to.scrollTrigger = {
      trigger: options.trigger || list[0],
      start: options.start || 'top 85%',
      toggleActions: 'play none none none',
    }
  }

  return gsap.to(list, to)
}

export function countUp(node, options = {}) {
  if (!node) return
  const raw = node.dataset.countValue || node.textContent.trim()
  node.dataset.countValue = raw
  const match = raw.match(/-?[\d,]+(?:\.\d+)?/)
  if (!match) return

  const target = Number(match[0].replace(/,/g, ''))
  if (!Number.isFinite(target)) return

  const prefix = raw.slice(0, match.index)
  const suffix = raw.slice(match.index + match[0].length)
  const decimals = (match[0].split('.')[1] || '').length
  const render = (value) => {
    const shown = decimals ? value.toFixed(decimals) : Math.round(value).toLocaleString('en-US')
    node.textContent = `${prefix}${shown}${suffix}`
  }

  render(0)
  const state = { value: 0 }
  gsap.to(state, {
    value: target,
    duration: options.duration ?? 1.4,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: options.trigger || node,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
    onUpdate: () => render(state.value),
    onComplete: () => {
      node.textContent = raw
    },
  })
}
