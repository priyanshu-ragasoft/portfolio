import { gsap, ScrollTrigger } from './gsapConfig'

export function imageReveal(frames) {
  gsap.utils.toArray(frames).forEach((frame) => {
    const mask = frame.querySelector('[data-image-mask]')
    const image = frame.querySelector('img')

    const timeline = gsap.timeline({
      paused: true,
      onStart: () => gsap.set([mask, image].filter(Boolean), { willChange: 'transform' }),
      onComplete: () => {
        if (mask) gsap.set(mask, { autoAlpha: 0 })
        gsap.set([mask, image].filter(Boolean), { willChange: 'auto' })
      },
    })

    if (mask) {
      timeline.fromTo(
        mask,
        { yPercent: 0, autoAlpha: 1 },
        { yPercent: -100, duration: 1.05, ease: 'power4.inOut', immediateRender: false },
        0,
      )
    }

    if (image) {
      timeline.fromTo(
        image,
        { scale: 1.12 },
        { scale: 1, duration: 1.25, ease: 'power3.out', immediateRender: false },
        0,
      )
    }

    ScrollTrigger.create({
      trigger: frame,
      start: 'top 88%',
      once: true,
      onEnter: () => timeline.play(),
    })
  })
}

export function initParallax(root, { skipScenes = false } = {}) {
  if (window.matchMedia('(max-width: 767px)').matches) return

  let nodes = gsap.utils.toArray(root.querySelectorAll('[data-parallax]'))
  if (skipScenes) nodes = nodes.filter((node) => !node.closest('[data-scene]'))

  nodes.forEach((element) => {
    gsap.fromTo(
      element,
      { yPercent: -6 },
      {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: {
          trigger: element.closest('[data-parallax-bounds]') || element.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    )
  })
}

export function initImageMotion(root) {
  const frames = gsap.utils
    .toArray(root.querySelectorAll('[data-image-reveal]'))
    .filter((node) => !node.closest('[data-scene]'))
  imageReveal(frames)
  initParallax(root, { skipScenes: true })
}
