import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { gsap, prefersReducedMotion } from '../animations/gsapConfig'
import { navLinks, profile } from '../data/profile'
import Button from './Button'
import Logo from './Logo'

function isActive(to, pathname, hash) {
  if (to.startsWith('/#')) return pathname === '/' && hash === to.slice(1)
  return pathname === to
}

export default function Navbar() {
  const { pathname, hash } = useLocation()
  const [menuPath, setMenuPath] = useState(null)
  const [scrolled, setScrolled] = useState(() => window.scrollY > 24)
  const bgRef = useRef(null)
  const panelRef = useRef(null)
  const open = menuPath === pathname
  const solid = scrolled || pathname !== '/' || open

  useEffect(() => {
    const background = bgRef.current
    const paint = (next) => {
      if (!background) return
      if (prefersReducedMotion()) {
        gsap.set(background, { opacity: next ? 1 : 0 })
        return
      }
      gsap.to(background, {
        opacity: next ? 1 : 0,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: true,
      })
    }

    paint(solid)
  }, [solid])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (event) => {
      if (event.key === 'Escape') setMenuPath(null)
    }

    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => {
    if (!open || !panelRef.current || prefersReducedMotion()) return undefined
    const items = panelRef.current.querySelectorAll('[data-menu-item]')
    const context = gsap.context(() => {
      gsap.fromTo(panelRef.current, { opacity: 0 }, { opacity: 1, duration: 0.28, ease: 'power2.out' })
      gsap.from(items, {
        y: 28,
        opacity: 0,
        duration: 0.55,
        stagger: 0.06,
        ease: 'power3.out',
        delay: 0.08,
      })
    })
    return () => context.revert()
  }, [open])

  const light = pathname === '/' && !solid && !open
  const close = () => setMenuPath(null)

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        ref={bgRef}
        className="absolute inset-0 border-b border-line bg-paper/88 opacity-0 backdrop-blur-md"
        aria-hidden="true"
      />
      <div className="relative mx-auto flex h-20 max-w-[1180px] items-center justify-between px-5 sm:px-8">
        <Link
          to="/"
          data-nav-logo
          aria-label={profile.name}
          className="relative z-10 inline-flex rounded-xl bg-[#070b16] p-1.5"
          onClick={close}
        >
          <Logo priority className="h-14 w-auto" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const active = isActive(link.to, pathname, hash)
            return (
              <Link
                key={link.to}
                to={link.to}
                data-nav-link
                aria-current={active ? 'page' : undefined}
                className={`text-sm tracking-wide transition-colors ${
                  light ? 'text-paper/80 hover:text-paper' : 'text-muted hover:text-ink'
                } ${active ? (light ? 'text-paper' : 'text-ink') : ''}`}
              >
                {link.label}
              </Link>
            )
          })}
          <Button to="/contact" data-nav-link variant={light ? 'light' : 'solid'} className="ml-2 px-5">
            Let&apos;s Connect
          </Button>
        </nav>

        <button
          type="button"
          className={`relative z-10 inline-flex h-11 w-11 items-center justify-center lg:hidden ${light ? 'text-paper' : 'text-ink'}`}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuPath(open ? null : pathname)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          ref={panelRef}
          className="fixed inset-0 top-20 z-40 bg-paper lg:hidden"
        >
          <nav className="flex h-full flex-col px-6 py-8" aria-label="Mobile">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-menu-item
                onClick={close}
                className="display border-b border-line py-4 text-4xl text-ink"
              >
                {link.label}
              </Link>
            ))}
            <div data-menu-item className="pt-8">
              <Button to="/contact" onClick={close}>
                Let&apos;s Connect
              </Button>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
