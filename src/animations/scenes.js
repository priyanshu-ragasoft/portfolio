import { gsap } from './gsapConfig'
import { countUp, enter } from './helpers'
import { imageReveal, initParallax } from './imageAnimations'

function media(section) {
  imageReveal(section.querySelectorAll('[data-image-reveal]'))
  initParallax(section)
}

function drawRule(rule, triggerEl) {
  if (!rule || !triggerEl) return
  gsap.set(rule, { scaleX: 0, transformOrigin: 'left center' })
  gsap.to(rule, {
    scaleX: 1,
    duration: 0.7,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: triggerEl,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
    onStart: () => gsap.set(rule, { willChange: 'transform' }),
    onComplete: () => gsap.set(rule, { willChange: 'auto' }),
  })
}

function headingParts(section) {
  const root = section.querySelector('[data-heading]')
  if (!root) return {}
  return {
    root,
    rule: root.querySelector('[data-eyebrow] span'),
    eyebrow: root.querySelector('[data-eyebrow]'),
    title: root.querySelector('h1, h2'),
    lede: root.querySelector('[data-lede]'),
  }
}

function revealHeading(section, compact, style) {
  const parts = headingParts(section)
  if (!parts.root) return
  drawRule(parts.rule, parts.root)
  enter(parts.eyebrow, { opacity: 0, y: 12 }, { trigger: parts.root, compact, duration: 0.55 })

  if (style === 'clip') {
    enter(parts.title, { opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' }, {
      trigger: parts.root,
      compact,
      duration: 1,
      ease: 'power4.out',
    })
  } else if (style === 'side') {
    enter(parts.title, { opacity: 0, x: -48 }, { trigger: parts.root, compact, duration: 0.9 })
  } else if (style === 'rise') {
    enter(parts.title, { opacity: 0, y: 24, scale: 0.98 }, { trigger: parts.root, compact, duration: 0.95 })
  } else if (style === 'wipe') {
    enter(parts.title, { opacity: 0, clipPath: 'inset(0% 100% 0% 0%)' }, {
      trigger: parts.root,
      compact,
      duration: 1.05,
      ease: 'power4.inOut',
    })
  }

  enter(parts.lede, { opacity: 0, y: 20 }, { trigger: parts.root, compact, delay: 0.12 })
}

function openClip(element, triggerEl, compact, inset) {
  if (!element) return
  gsap.set(element, { clipPath: inset })
  gsap.to(element, {
    clipPath: 'inset(0% 0% 0% 0%)',
    duration: 1.25,
    ease: 'power4.inOut',
    scrollTrigger: {
      trigger: triggerEl || element,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
    onStart: () => gsap.set(element, { willChange: 'clip-path' }),
    onComplete: () => gsap.set(element, { willChange: 'auto' }),
  })
}

function animateIntro(section, compact) {
  const kicker = section.querySelector('[data-intro-kicker]')
  const index = section.querySelector('[data-intro-index]')
  const title = section.querySelector('[data-intro-title]')
  const role = section.querySelector('[data-intro-role]')
  const paragraphs = section.querySelectorAll('[data-intro-copy] p')
  const link = section.querySelector('[data-intro-link]')
  const plate = section.querySelector('[data-intro-plate]')
  const facts = section.querySelectorAll('[data-intro-fact]')
  const pillars = section.querySelectorAll('[data-intro-pillar]')

  drawRule(kicker?.querySelector('span'), section)
  enter(kicker, { opacity: 0, y: 12 }, { trigger: section, start: 'top 92%', compact, duration: 0.5 })
  enter(index, { opacity: 0 }, { trigger: section, start: 'top 92%', compact, duration: 0.5 })
  enter(title, { y: 28 }, { trigger: title || section, start: 'top 92%', compact, duration: 0.95 })
  enter(role, { opacity: 0, y: 16 }, { trigger: role || section, start: 'top 92%', compact, duration: 0.6 })
  enter(paragraphs, { opacity: 0, y: 20 }, {
    trigger: paragraphs[0] || section,
    stagger: 0.1,
    compact,
  })
  enter(link, { opacity: 0, y: 10 }, { trigger: link || section, compact, duration: 0.55 })
  enter(plate, { opacity: 0, y: 32 }, { trigger: plate || section, compact, duration: 1 })
  enter(facts, { opacity: 0, y: 16 }, {
    trigger: facts[0]?.parentElement || section,
    stagger: 0.08,
    compact,
  })
  enter(pillars, { opacity: 0, y: 28 }, {
    trigger: pillars[0]?.parentElement || section,
    stagger: 0.1,
    compact,
  })
}

function animateAbout(section, compact) {
  const visual = section.querySelector('[data-about-visual]')
  const kicker = section.querySelector('[data-about-kicker]')
  const title = section.querySelector('h2')
  const body = section.querySelector('[data-about-body]')
  const roles = section.querySelectorAll('[data-stagger-item]')
  const link = section.querySelector('[data-about-link]')
  media(section)
  enter(visual, { opacity: 0, x: -40 }, { trigger: visual || section, compact, duration: 1 })
  drawRule(kicker?.querySelector('span'), section)
  enter(kicker, { opacity: 0 }, { trigger: kicker || section, compact, duration: 0.5 })
  enter(title, { opacity: 0, x: 36 }, { trigger: title || section, compact, duration: 0.9 })
  enter(body, { opacity: 0, y: 24 }, { trigger: body || section, compact })
  enter(roles, { opacity: 0, x: -28 }, {
    trigger: roles[0]?.parentElement || section,
    stagger: 0.1,
    compact,
  })
  enter(link, { opacity: 0, y: 10 }, { trigger: link || section, compact, duration: 0.55 })
}

function animateValues(section, compact) {
  const grid = section.querySelector('[data-values-grid]')
  const cards = section.querySelectorAll('[data-lift]')
  revealHeading(section, compact, 'clip')
  enter(cards, { opacity: 0, y: 48, clipPath: 'inset(14% 0% 0% 0%)' }, {
    trigger: grid || section,
    stagger: 0.09,
    duration: 0.85,
    compact,
  })
}

function animateImpact(section, compact) {
  const note = section.querySelector('[data-impact-note]')
  const grid = section.querySelector('[data-impact-figures]')
  const figures = section.querySelectorAll('[data-figure-card]')
  const caption = section.querySelector('[data-impact-caption]')
  const quote = section.querySelector('[data-impact-quote]')
  const cards = section.querySelector('[data-impact-grid]')?.querySelectorAll('[data-lift]')
  revealHeading(section, compact, 'side')
  enter(note, { opacity: 0, y: 24 }, { trigger: note || section, compact })
  enter(figures, { opacity: 0, y: 32 }, { trigger: grid || section, stagger: 0.08, compact })
  figures.forEach((card) => countUp(card.querySelector('[data-figure]'), { trigger: grid || card }))
  enter(caption, { opacity: 0 }, { trigger: caption || section, duration: 0.6, compact })
  media(section)
  enter(quote?.children, { opacity: 0, x: 40 }, { trigger: quote || section, stagger: 0.1, compact })
  cards?.forEach((card, index) => {
    enter(card, { opacity: 0, x: index % 2 === 0 ? -36 : 36, y: 16 }, {
      trigger: card,
      compact,
      duration: 0.85,
    })
  })
}

function animateProjects(section, compact) {
  revealHeading(section, compact, 'rise')
  media(section)
  section.querySelectorAll('[data-project]').forEach((article) => {
    const visual = article.querySelector('[data-project-media]')
    const copy = article.querySelectorAll('[data-project-copy] > *')
    const fromRight = visual?.dataset.from === 'right'
    article.dataset.revealed = 'true'
    enter(visual, { opacity: 0, x: fromRight ? 48 : -48 }, { trigger: article, compact, duration: 1 })
    enter(copy, { opacity: 0, x: fromRight ? -32 : 32 }, {
      trigger: article,
      stagger: 0.08,
      compact,
      duration: 0.8,
    })
  })
}

function animateFeature(section, compact) {
  const visual = section.querySelector('[data-feature-visual]')
  const photo = section.querySelector('[data-feature-photo]')
  const overlay = section.querySelector('[data-feature-overlay]')
  const copy = section.querySelector('[data-feature-copy]')
  const aside = section.querySelector('[data-feature-aside]')
  openClip(visual, visual, compact, compact ? 'inset(8% 8% 8% 8%)' : 'inset(14% 12% 14% 12%)')
  if (photo) {
    gsap.set(photo, { scale: compact ? 1.06 : 1.12 })
    gsap.to(photo, {
      scale: 1,
      duration: 1.35,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: visual || photo,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onStart: () => gsap.set(photo, { willChange: 'transform' }),
      onComplete: () => gsap.set(photo, { willChange: 'auto' }),
    })
  }
  initParallax(section)
  enter(overlay?.children, { opacity: 0, x: 52 }, {
    trigger: overlay || section,
    stagger: 0.12,
    compact,
    duration: 0.9,
  })
  enter(copy?.children, { opacity: 0, x: -40 }, {
    trigger: copy || section,
    stagger: 0.1,
    compact,
  })
  enter(aside, { opacity: 0, x: 32 }, { trigger: aside || section, compact })
}

function animateEducation(section, compact) {
  const kicker = section.querySelector('[data-edu-kicker]')
  const title = section.querySelector('h2')
  const paragraphs = section.querySelectorAll('[data-edu-copy] p')
  const link = section.querySelector('[data-edu-link]')
  const visual = section.querySelector('[data-edu-visual]')
  drawRule(kicker?.querySelector('span'), section)
  enter(kicker, { opacity: 0, y: 12 }, { trigger: section, compact, duration: 0.5 })
  enter(title, { opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }, {
    trigger: title || section,
    compact,
    duration: 1,
    ease: 'power4.out',
  })
  enter(paragraphs, { opacity: 0, y: 20 }, { trigger: paragraphs[0] || section, stagger: 0.12, compact })
  enter(link, { opacity: 0, y: 12 }, { trigger: link || section, compact, duration: 0.55 })
  enter(visual, { opacity: 0, x: 48 }, { trigger: visual || section, compact, duration: 1 })
  media(section)
}

function animateInsights(section, compact) {
  const action = section.querySelector('[data-insights-action]')
  const feature = section.querySelector('[data-feature] article')
  const sides = section.querySelectorAll('[data-side] article')
  const note = section.querySelector('[data-insights-note]')
  revealHeading(section, compact, 'wipe')
  enter(action, { opacity: 0, y: 16 }, { trigger: action || section, compact, duration: 0.55 })
  media(section)
  enter(feature, { opacity: 0, y: 42, scale: 0.98 }, { trigger: feature || section, compact, duration: 1 })
  enter(sides, { opacity: 0, x: 36 }, {
    trigger: section.querySelector('[data-side]') || section,
    stagger: 0.12,
    compact,
  })
  enter(note, { opacity: 0, y: 16 }, { trigger: note || section, compact, duration: 0.6 })
}

function animatePhilosophy(section, compact) {
  const plate = section.querySelector('[data-philosophy-plate]')
  const kicker = section.querySelector('[data-philosophy-kicker]')
  const line = section.querySelector('[data-philosophy-line]')
  const note = section.querySelector('[data-philosophy-note]')
  openClip(plate, section, compact, compact ? 'inset(6% 6% 6% 6%)' : 'inset(12% 8% 12% 8%)')
  initParallax(section)
  enter(kicker, { opacity: 0, y: 12 }, { trigger: section, compact, duration: 0.5 })
  enter(line, { yPercent: 115 }, { trigger: line || section, duration: 1.15, ease: 'power4.out', compact })
  enter(note, { opacity: 0, y: 16 }, { trigger: note || section, compact, delay: 0.08 })
}

function animateContact(section, compact) {
  const intro = section.querySelectorAll('[data-contact-intro]')
  const items = section.querySelectorAll('[data-contact-item]')
  const fields = section.querySelectorAll('[data-field]')
  const submit = section.querySelector('[data-submit]')
  enter(intro, { opacity: 0, y: 28 }, { trigger: section, stagger: 0.1, compact })
  enter(items, { opacity: 0, x: -22 }, { trigger: items[0] || section, stagger: 0.08, compact })
  enter(fields, { opacity: 0, y: 18 }, { trigger: fields[0] || section, stagger: 0.1, duration: 0.7, compact })
  enter(submit, { opacity: 0, y: 12 }, { trigger: submit || section, compact, duration: 0.5 })
}

function animateListing(section, compact) {
  const kicker = section.querySelector('[data-listing-kicker]')
  const title = section.querySelector('[data-listing-title]')
  const lede = section.querySelector('[data-listing-lede]')
  enter(kicker, { opacity: 0, y: 12 }, { trigger: section, compact, duration: 0.5 })
  enter(title, { opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' }, {
    trigger: title || section,
    compact,
    duration: 1.05,
    ease: 'power4.out',
  })
  enter(lede, { opacity: 0, y: 18 }, { trigger: lede || section, compact })
}

function animateProfile(section, compact) {
  const kicker = section.querySelector('[data-profile="kicker"]')
  const title = section.querySelector('[data-profile="title"]')
  const portrait = section.querySelector('[data-profile="portrait"] [data-image-reveal]')
  const role = section.querySelector('[data-profile="role"]')
  const bio = section.querySelectorAll('[data-profile="bio"]')
  const roles = section.querySelectorAll('[data-profile="role-card"]')
  const educationTitle = section.querySelector('[data-profile="education-title"]')
  const notes = section.querySelectorAll('[data-profile="education-item"]')
  const milesTitle = section.querySelector('[data-profile="miles-title"]')
  const miles = section.querySelectorAll('[data-profile="mile"]')
  const back = section.querySelector('[data-profile="back"]')

  enter(kicker, { opacity: 0, y: 10 }, { trigger: section, compact, duration: 0.45 })
  enter(title, { opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }, {
    trigger: title || section,
    compact,
    duration: 1.05,
    ease: 'power4.out',
  })
  enter(portrait, { opacity: 0, scale: 0.98 }, { trigger: portrait || section, compact, duration: 1 })
  media(section)
  enter(role, { opacity: 0, y: 12 }, { trigger: role || section, compact, duration: 0.5 })
  bio.forEach((paragraph) => {
    enter(paragraph, { opacity: 0, y: 18 }, { trigger: paragraph, compact, duration: 0.7 })
  })
  enter(roles, { opacity: 0, y: 28 }, { trigger: roles[0] || section, stagger: 0.1, compact })
  enter(educationTitle, { opacity: 0, x: -24 }, { trigger: educationTitle || section, compact })
  notes.forEach((note) => {
    enter(note, { opacity: 0, x: 24 }, { trigger: note, compact, duration: 0.7 })
  })
  enter(milesTitle, { opacity: 0, y: 16 }, { trigger: milesTitle || section, compact })
  miles.forEach((mile) => {
    enter(mile, { opacity: 0, y: 20 }, { trigger: mile, compact, duration: 0.7 })
  })
  enter(back, { opacity: 0 }, { trigger: back || section, compact, duration: 0.5 })
}

function animateDetail(section, compact) {
  const meta = section.querySelector('[data-detail="meta"]')
  const title = section.querySelector('[data-detail="title"]')
  const standfirst = section.querySelectorAll('[data-detail="standfirst"]')
  const body = section.querySelectorAll('[data-detail="body"]')
  const aside = section.querySelectorAll('[data-detail="aside"]')
  const extra = section.querySelector('[data-detail="extra"]')
  const back = section.querySelector('[data-detail="back"]')

  enter(meta, { opacity: 0, y: 12 }, { trigger: meta || section, compact, duration: 0.5 })
  enter(title, { opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' }, {
    trigger: title || section,
    compact,
    duration: 1.05,
    ease: 'power4.out',
  })
  enter(standfirst, { opacity: 0, y: 18 }, {
    trigger: standfirst[0] || section,
    stagger: 0.08,
    compact,
  })
  body.forEach((block) => {
    enter(block, { opacity: 0, y: 22 }, { trigger: block, compact, duration: 0.75 })
  })
  aside.forEach((item) => {
    enter(item, { opacity: 0, x: 24 }, { trigger: item, compact, duration: 0.7 })
  })
  enter(extra, { opacity: 0, y: 12 }, { trigger: extra || section, compact, duration: 0.55 })
  enter(back, { opacity: 0 }, { trigger: back || section, compact, duration: 0.5 })
  media(section)
}

function animateMissing(section, compact) {
  const kicker = section.querySelector('[data-missing="kicker"]')
  const title = section.querySelector('[data-missing="title"]')
  const link = section.querySelector('[data-missing="link"]')
  enter(kicker, { opacity: 0, y: 10 }, { trigger: section, compact, duration: 0.45 })
  enter(title, { opacity: 0, y: 36, scale: 0.98 }, { trigger: title || section, compact, duration: 0.95 })
  enter(link, { opacity: 0, y: 14 }, { trigger: link || section, compact, duration: 0.55, delay: 0.08 })
}

const scenes = {
  intro: animateIntro,
  about: animateAbout,
  values: animateValues,
  impact: animateImpact,
  projects: animateProjects,
  feature: animateFeature,
  education: animateEducation,
  insights: animateInsights,
  philosophy: animatePhilosophy,
  contact: animateContact,
  listing: animateListing,
  profile: animateProfile,
  detail: animateDetail,
  missing: animateMissing,
}

export function initScenes(root) {
  const mm = gsap.matchMedia()
  const setup = (compact) => {
    root.querySelectorAll('[data-scene]').forEach((section) => {
      const run = scenes[section.dataset.scene]
      if (run) run(section, compact)
    })
  }
  mm.add('(max-width: 767px)', () => setup(true))
  mm.add('(min-width: 768px)', () => setup(false))
}
