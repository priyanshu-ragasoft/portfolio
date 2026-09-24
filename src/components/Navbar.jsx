import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
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
  const solid = scrolled || pathname !== '/'

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
      // Animate items smoothly; keep background 100% solid and opaque immediately
      gsap.from(items, {
        y: 22,
        opacity: 0,
        duration: 0.45,
        stagger: 0.05,
        ease: 'power3.out',
      })
    })
    return () => context.revert()
  }, [open])

  const light = pathname === '/' && !solid
  const close = () => setMenuPath(null)

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 transition-colors duration-300">
        <div
          ref={bgRef}
          className="absolute inset-0 border-b border-line bg-paper/88 opacity-0 backdrop-blur-md transition-all duration-300"
          aria-hidden="true"
        />
        <div className="relative mx-auto flex h-20 sm:h-24 max-w-[1180px] items-center justify-between px-5 sm:px-8">
          <Link
            to="/"
            data-nav-logo
            aria-label={profile.name}
            className={`relative z-10 inline-flex transition-transform duration-300 origin-left ${scrolled ? 'scale-105' : 'scale-100'}`}
            onClick={close}
          >
            <Logo priority className={`h-16 w-auto sm:h-20 transition-all duration-300 drop-shadow-sm ${!light ? 'brightness-0' : ''}`} />
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
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Full-Screen Portal Mobile Menu Drawer */}
      {open && typeof document !== 'undefined'
        ? createPortal(
            <div
              id="mobile-menu"
              ref={panelRef}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100vw',
                height: '100dvh',
                backgroundColor: '#f3efe8',
                zIndex: 99999,
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch',
              }}
              className="text-ink lg:hidden"
            >
              {/* Top Header inside Mobile Menu */}
              <div className="relative mx-auto flex h-20 sm:h-24 w-full max-w-[1180px] shrink-0 items-center justify-between border-b border-line/70 px-5 sm:px-8">
                <Link
                  to="/"
                  aria-label={profile.name}
                  className="inline-flex"
                  onClick={close}
                >
                  <Logo priority className="h-16 w-auto sm:h-20 brightness-0 drop-shadow-sm" />
                </Link>

                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink hover:text-bronze focus-visible:outline-none"
                  aria-label="Close menu"
                  onClick={close}
                >
                  <X className="h-7 w-7" />
                </button>
              </div>

              {/* Navigation Links and CTA */}
              <nav
                className="mx-auto flex w-full max-w-md flex-1 flex-col justify-between px-6 py-4 sm:py-6"
                aria-label="Mobile Navigation"
              >
                <div className="flex flex-col divide-y divide-line/60">
                  {navLinks.map((link) => {
                    const active = isActive(link.to, pathname, hash)
                    return (
                      <Link
                        key={link.to}
                        to={link.to}
                        data-menu-item
                        onClick={close}
                        aria-current={active ? 'page' : undefined}
                        className={`display py-2.5 sm:py-3 text-[1.65rem] sm:text-3xl transition-colors hover:text-bronze ${
                          active ? 'text-bronze font-semibold' : 'text-ink'
                        }`}
                      >
                        {link.label}
                      </Link>
                    )
                  })}
                </div>

                <div
                  data-menu-item
                  className="pt-5 pb-8 sm:pb-10"
                  style={{ paddingBottom: 'max(2.5rem, calc(env(safe-area-inset-bottom) + 1.5rem))' }}
                >
                  <Button
                    to="/contact"
                    onClick={close}
                    className="w-full justify-center text-center py-3.5 shadow-sm text-base"
                  >
                    Let&apos;s Connect
                  </Button>
                </div>
              </nav>
            </div>,
            document.body
          )
        : null}
    </>
  )
}
