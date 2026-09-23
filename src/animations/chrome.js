import { enter, isCompact } from './helpers'

export function initChrome(doc = document) {
  const compact = isCompact()
  const header = doc.querySelector('header')
  const logo = header?.querySelector('[data-nav-logo]')
  const links = header?.querySelectorAll('[data-nav-link]')

  enter(logo, { opacity: 0, y: -8 }, { immediate: true, duration: 0.45, delay: 0.05, compact })
  enter(links, { opacity: 0, y: -12 }, { immediate: true, duration: 0.5, stagger: 0.045, delay: 0.12, compact })

  const footer = doc.querySelector('footer')
  const columns = footer?.querySelectorAll('[data-footer-col]')
  const base = footer?.querySelector('[data-footer-base]')
  enter(columns, { opacity: 0, y: 20 }, { trigger: footer, stagger: 0.1, duration: 0.7, compact })
  enter(base, { opacity: 0, y: 12 }, { trigger: base || footer, duration: 0.55, compact })
}
