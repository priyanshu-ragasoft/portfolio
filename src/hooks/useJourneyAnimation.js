import { gsap } from '../animations/gsapConfig'
import { addCameraTweens } from '../animations/journeyMap'
import { addMarkerTweens } from '../animations/journeyMarkers'
import { addRouteMotion, placeVisiblePopups } from '../animations/journeyRoutes'
import { addTimelineTweens } from '../animations/journeyTimeline'
import { journeyChapters } from '../data/journeyLocations'
import { useGSAP } from './useGSAP'

function addStoryTweens(timeline, root, distance) {
  journeyChapters.forEach((chapter, index) => {
    const panel = root.querySelector(`[data-journey-chapter="${chapter.id}"]`)
    if (!panel) return
    panel.setAttribute('aria-hidden', index === 0 ? 'false' : 'true')
    if (index === 0) gsap.set(panel, { autoAlpha: 1, y: 0 })
    else gsap.set(panel, { autoAlpha: 0, y: distance })

    if (index > 0) {
      const previous = root.querySelector(`[data-journey-chapter="${journeyChapters[index - 1].id}"]`)
      timeline.to(previous, { autoAlpha: 0, y: -distance, duration: 0.12, ease: 'power2.in' }, index)
      timeline.to(panel, { autoAlpha: 1, y: 0, duration: 0.14, ease: 'power2.out' }, index + 0.14)
    }

    const figure = panel.querySelector('[data-journey-figure]')
    const photo = panel.querySelector('[data-journey-photo]')
    const repeat = index > 0 && chapter.image === journeyChapters[index - 1].image
    if (!figure || !photo) return
    if (index === 0 || repeat) {
      gsap.set(figure, { clipPath: 'inset(0% 0% 0% 0%)' })
      gsap.set(photo, { scale: 1 })
      return
    }
    gsap.set(figure, { clipPath: 'inset(100% 0% 0% 0%)' })
    gsap.set(photo, { scale: 1.08 })
    timeline.to(figure, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.45, ease: 'power3.inOut' }, index + 0.14)
    timeline.to(photo, { scale: 1, duration: 0.55, ease: 'power2.out' }, index + 0.14)
  })

  const hint = root.querySelector('[data-journey-hint]')
  if (hint) timeline.to(hint, { autoAlpha: 0, y: -8, duration: 0.35 }, 0.35)
}

function syncChapter(section, progress) {
  const count = journeyChapters.length
  const index = progress >= 0.999 ? count - 1 : Math.min(count - 1, Math.floor(progress * count))
  if (section._journeyIndex === index) return
  section._journeyIndex = index
  const active = journeyChapters[index]

  section.querySelectorAll('[data-journey-chapter]').forEach((node) => {
    node.setAttribute('aria-hidden', node.dataset.journeyChapter === active.id ? 'false' : 'true')
  })
  section.querySelectorAll('[data-journey-marker]').forEach((node) => {
    node.classList.toggle('is-active', node.dataset.journeyMarker === active.pin)
  })
  section.querySelectorAll('[data-journey-year], [data-journey-step], [data-journey-step-loc]').forEach((node) => {
    const id = node.dataset.journeyYear || node.dataset.journeyStep || node.dataset.journeyStepLoc
    const isCur = id === active.id
    node.classList.toggle('is-current', isCur)
    node.closest('li')?.classList.toggle('is-current', isCur)
  })
  section.querySelectorAll('[data-journey-step-item]').forEach((item) => {
    const isCur = item.dataset.journeyStepItem === active.id
    item.classList.toggle('is-active', isCur)
    const glow = item.querySelector('[data-journey-node-glow]')
    const node = item.querySelector('[data-journey-node]')
    const step = item.querySelector('[data-journey-step]')
    const chip = item.querySelector('[data-journey-step-chip]')
    const chipDot = item.querySelector('[data-journey-chip-dot]')
    if (glow) glow.style.opacity = isCur ? '1' : '0'
    if (node) {
      node.style.borderColor = isCur ? '#C9A15A' : 'rgba(255,255,255,0.18)'
      node.style.backgroundColor = isCur ? '#C9A15A' : '#141311'
      node.style.transform = isCur ? 'scale(1.15)' : 'scale(1)'
      node.style.boxShadow = isCur ? '0 0 16px rgba(201,161,90,0.7)' : 'none'
    }
    if (step) {
      step.style.color = isCur ? '#0D0D0C' : '#8a847c'
      step.style.fontWeight = isCur ? '700' : '500'
    }
    if (chip) {
      chip.style.borderColor = 'transparent'
      chip.style.backgroundColor = 'transparent'
    }
    if (chipDot) chipDot.style.opacity = isCur ? '1' : '0'
  })
}

function bindHover(section) {
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  if (!fine) return () => {}

  const onOver = (event) => {
    const marker = event.target.closest?.('[data-journey-marker]')
    if (marker && section.contains(marker) && !marker.contains(event.relatedTarget)) {
      const dot = marker.querySelector('[data-marker-dot]')
      if (dot) gsap.to(dot, { scale: 1.45, duration: 0.3, ease: 'power2.out', transformOrigin: 'center', overwrite: 'auto' })
    }

    const route = event.target.closest?.('[data-journey-route]')
    if (route && section.contains(route) && !route.contains(event.relatedTarget)) {
      const draw = route.querySelector('[data-route-draw]')
      if (draw) gsap.to(draw, { stroke: '#f0d7a2', duration: 0.3, overwrite: 'auto' })
    }

    const card = event.target.closest?.('[data-journey-chapter]')
    if (card && section.contains(card) && !card.contains(event.relatedTarget) && card.getAttribute('aria-hidden') !== 'true') {
      const photo = card.querySelector('[data-journey-photo]')
      if (photo) gsap.to(photo, { scale: 1.06, duration: 0.55, ease: 'power2.out', overwrite: 'auto' })
    }
  }

  const onOut = (event) => {
    const marker = event.target.closest?.('[data-journey-marker]')
    if (marker && section.contains(marker) && !marker.contains(event.relatedTarget)) {
      const dot = marker.querySelector('[data-marker-dot]')
      if (dot) gsap.to(dot, { scale: 1, duration: 0.35, ease: 'power2.out', overwrite: 'auto' })
    }

    const route = event.target.closest?.('[data-journey-route]')
    if (route && section.contains(route) && !route.contains(event.relatedTarget)) {
      const draw = route.querySelector('[data-route-draw]')
      if (draw) gsap.to(draw, { stroke: '#C9A15A', duration: 0.35, overwrite: 'auto' })
    }

    const card = event.target.closest?.('[data-journey-chapter]')
    if (card && section.contains(card) && !card.contains(event.relatedTarget)) {
      const photo = card.querySelector('[data-journey-photo]')
      if (photo) gsap.to(photo, { scale: 1, duration: 0.5, ease: 'power2.out', overwrite: 'auto' })
    }
  }

  const onEnterLink = (event) => {
    const link = event.target.closest?.('[data-journey-cta]')
    if (!link || !section.contains(link)) return
    const arrow = link.querySelector('[data-journey-arrow]')
    if (arrow) gsap.to(arrow, { x: 4, duration: 0.3, ease: 'power2.out', overwrite: 'auto' })
  }

  const onLeaveLink = (event) => {
    const link = event.target.closest?.('[data-journey-cta]')
    if (!link || !section.contains(link) || link.contains(event.relatedTarget)) return
    const arrow = link.querySelector('[data-journey-arrow]')
    if (arrow) gsap.to(arrow, { x: 0, duration: 0.3, ease: 'power2.out', overwrite: 'auto' })
  }

  section.addEventListener('pointerover', onOver)
  section.addEventListener('pointerout', onOut)
  section.addEventListener('pointerover', onEnterLink)
  section.addEventListener('pointerout', onLeaveLink)

  return () => {
    section.removeEventListener('pointerover', onOver)
    section.removeEventListener('pointerout', onOut)
    section.removeEventListener('pointerover', onEnterLink)
    section.removeEventListener('pointerout', onLeaveLink)
  }
}

function setup(section, mode) {
  const distance = mode === 'mobile' ? 16 : 28
  const zoom = mode === 'desktop' ? 1.20 : mode === 'tablet' ? 1.14 : 1.08
  const end = mode === 'mobile' ? '+=2800' : mode === 'tablet' ? '+=3800' : '+=5000'
  section._journeyIndex = -1

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onToggle(self) {
        const camera = section.querySelector('[data-journey-camera]')
        if (camera) gsap.set(camera, { willChange: self.isActive ? 'transform' : 'auto' })
      },
      onUpdate(self) {
        syncChapter(section, self.progress)
        placeVisiblePopups(section)
      },
    },
  })

  addCameraTweens(timeline, section, zoom)
  addRouteMotion(timeline, section)
  addMarkerTweens(timeline, section)
  addTimelineTweens(timeline, section)
  addStoryTweens(timeline, section, distance)
  timeline.to({}, { duration: 0.01 }, journeyChapters.length)
  syncChapter(section, 0)
}

export function useJourneyAnimation(sectionRef) {
  useGSAP(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const media = gsap.matchMedia()
    media.add('(max-width: 767px)', () => setup(section, 'mobile'))
    media.add('(min-width: 768px) and (max-width: 1099px)', () => setup(section, 'tablet'))
    media.add('(min-width: 1100px)', () => setup(section, 'desktop'))

    return bindHover(section)
  }, [])
}
