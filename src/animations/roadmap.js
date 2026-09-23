import { gsap, ScrollTrigger } from './gsapConfig'
import { enter } from './helpers'

function pointsFromNodes(track, nodes) {
  const trackRect = track.getBoundingClientRect()
  return [...nodes].map((node) => {
    const rect = node.getBoundingClientRect()
    return {
      x: rect.left - trackRect.left + rect.width / 2,
      y: rect.top - trackRect.top + rect.height / 2,
    }
  })
}

function roadPath(points) {
  if (!points.length) return ''
  let d = `M ${points[0].x} ${points[0].y}`
  for (let index = 0; index < points.length - 1; index += 1) {
    const start = points[index]
    const end = points[index + 1]
    const mid = (start.x + end.x) / 2
    const y = (start.y + end.y) / 2
    d += ` C ${mid} ${y}, ${mid} ${y}, ${end.x} ${end.y}`
  }
  return d
}

function setCurrentStop(section, index) {
  const stops = [...section.querySelectorAll('[data-stop]')]
  const safeIndex = Math.max(0, Math.min(stops.length - 1, index))
  stops.forEach((stop, stopIndex) => {
    stop.classList.toggle('is-active', stopIndex === safeIndex)
  })
  const indexNode = section.querySelector('[data-roadmap-index]')
  const placeNode = section.querySelector('[data-roadmap-place]')
  const current = stops[safeIndex]
  if (indexNode) indexNode.textContent = String(safeIndex + 1).padStart(2, '0')
  if (placeNode && current) placeNode.textContent = current.dataset.place || ''
}

function revealCards(section, progress, compact) {
  const stops = [...section.querySelectorAll('[data-stop]')]
  const count = stops.length || 1
  const travel = compact ? 16 : 30
  stops.forEach((stop, index) => {
    const card = stop.querySelector('[data-stop-card]')
    const mile = stop.querySelector('[data-stop-mile]')
    const span = 1 / Math.max(count - 1, 1)
    const start = index * span - 0.28
    const local = gsap.utils.clamp(0, 1, (progress - start) / 0.28)
    if (card) {
      gsap.set(card, { opacity: local, y: (1 - local) * travel })
      if (local > 0.98) card.dataset.revealed = 'true'
    }
    if (mile) gsap.set(mile, { opacity: local })
  })
}

function releaseCards(section) {
  gsap.set(section.querySelectorAll('[data-stop-card], [data-stop-mile]'), {
    clearProps: 'opacity,transform,willChange',
  })
}

function initHead(section) {
  const compact = window.matchMedia('(max-width: 767px)').matches
  const kicker = section.querySelector('[data-roadmap-kicker]')
  const rule = kicker?.querySelector('span')
  const title = section.querySelector('[data-roadmap-title]')
  const note = section.querySelector('[data-roadmap-note]')
  const status = section.querySelector('[data-roadmap-status]')

  if (rule) {
    gsap.set(rule, { scaleX: 0, transformOrigin: 'left center' })
    gsap.to(rule, {
      scaleX: 1,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })
  }

  enter([kicker, title, note, status], { opacity: 0, y: compact ? 24 : 32 }, {
    trigger: section,
    stagger: 0.08,
    duration: 0.8,
    compact,
  })
}

function initHorizontalRoad(section) {
  const pin = section.querySelector('[data-roadmap-pin]')
  const track = section.querySelector('[data-roadmap-track]')
  const svg = section.querySelector('[data-roadmap-svg]')
  const base = section.querySelector('[data-roadmap-base]')
  const draw = section.querySelector('[data-roadmap-path]')
  const marker = section.querySelector('[data-roadmap-marker]')
  const nodes = section.querySelectorAll('[data-stop-node]')
  if (!pin || !track || !svg || !base || !draw || !marker || !nodes.length) return

  section.classList.add('is-horizontal')
  gsap.set(section.querySelectorAll('[data-stop-card]'), { willChange: 'transform, opacity' })

  const layout = () => {
    const width = track.scrollWidth
    const height = track.offsetHeight
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
    const path = roadPath(pointsFromNodes(track, nodes))
    base.setAttribute('d', path)
    draw.setAttribute('d', path)
    const length = draw.getTotalLength()
    draw.style.strokeDasharray = `${length}`
    draw.style.strokeDashoffset = `${length}`
    return length
  }

  layout()

  const placeMarker = (progress) => {
    const length = draw.getTotalLength()
    if (!length) return
    const point = draw.getPointAtLength(Math.max(0, Math.min(length, length * progress)))
    gsap.set(marker, { x: point.x, y: point.y })
    draw.style.strokeDashoffset = `${length * (1 - progress)}`
    setCurrentStop(section, Math.round(progress * (nodes.length - 1)))
  }

  const sync = (progress) => {
    placeMarker(progress)
    revealCards(section, progress, false)
  }

  sync(0)

  gsap.to(track, {
    x: () => -(track.scrollWidth - window.innerWidth),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${Math.max(track.scrollWidth - window.innerWidth, window.innerHeight)}`,
      pin,
      scrub: 0.7,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onRefresh: (self) => {
        layout()
        sync(self.progress)
      },
      onUpdate: (self) => sync(self.progress),
      onKill: () => {
        section.classList.remove('is-horizontal')
        releaseCards(section)
      },
    },
  })
}

function initVerticalRoad(section) {
  const track = section.querySelector('[data-roadmap-track]')
  const list = section.querySelector('[data-roadmap-list]')
  const marker = section.querySelector('[data-roadmap-marker]')
  const stops = [...section.querySelectorAll('[data-stop]')]
  if (!track || !list || !marker || !stops.length) return

  const compact = window.matchMedia('(max-width: 767px)').matches
  gsap.set(section.querySelectorAll('[data-stop-card]'), { willChange: 'transform, opacity' })

  const placeMarker = (progress) => {
    const trackRect = track.getBoundingClientRect()
    const listRect = list.getBoundingClientRect()
    gsap.set(marker, {
      x: listRect.left - trackRect.left,
      y: listRect.top - trackRect.top + progress * list.offsetHeight,
    })
    setCurrentStop(section, Math.min(stops.length - 1, Math.floor(progress * stops.length)))
  }

  const sync = (progress) => {
    placeMarker(progress)
    revealCards(section, progress, compact)
  }

  sync(0)

  ScrollTrigger.create({
    trigger: list,
    start: 'top 65%',
    end: 'bottom 55%',
    scrub: 0.45,
    onUpdate: (self) => sync(self.progress),
    onRefresh: (self) => sync(self.progress),
    onKill: () => releaseCards(section),
  })
}

export function initRoadmap(root) {
  const section = root.querySelector('[data-roadmap]')
  if (!section) return

  initHead(section)

  const pulse = section.querySelector('[data-roadmap-pulse]')
  if (pulse) {
    gsap.to(pulse, {
      scale: 2.4,
      opacity: 0,
      duration: 1.5,
      repeat: -1,
      ease: 'power1.out',
    })
  }

  const mm = gsap.matchMedia()
  mm.add('(min-width: 1024px)', () => {
    initHorizontalRoad(section)
    return () => {
      section.classList.remove('is-horizontal')
      releaseCards(section)
    }
  })
  mm.add('(max-width: 1023px)', () => {
    initVerticalRoad(section)
    return () => releaseCards(section)
  })
}
