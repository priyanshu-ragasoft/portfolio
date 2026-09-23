import { lazy, Suspense, useCallback, useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { gsap, prefersReducedMotion, ScrollTrigger } from '../animations/gsapConfig'
import { introShouldPlay } from '../animations/introAnimation'
import Cursor from '../components/Cursor'
import Footer from '../components/Footer'
import IntroTransition from '../components/IntroTransition/IntroTransition'
import Navbar from '../components/Navbar'
import PageMotion from '../components/PageMotion'
import Home from '../pages/Home'

const AboutPage = lazy(() => import('../pages/AboutPage'))
const ProjectsPage = lazy(() => import('../pages/ProjectsPage'))
const ProjectDetail = lazy(() => import('../pages/ProjectDetail'))
const BlogPage = lazy(() => import('../pages/BlogPage'))
const InsightDetail = lazy(() => import('../pages/InsightDetail'))
const ImpactDetail = lazy(() => import('../pages/ImpactDetail'))
const ContactPage = lazy(() => import('../pages/ContactPage'))
const NotFound = lazy(() => import('../pages/NotFound'))

function PageFallback() {
  return <div className="min-h-screen bg-paper" role="status" aria-label="Loading page" />
}

function scrollToTarget(target, offset = 0) {
  if (target === 0) {
    window.scrollTo(0, 0)
    return
  }
  const top = target.getBoundingClientRect().top + window.scrollY + offset
  window.scrollTo(0, top)
}

if (typeof document !== 'undefined' && introShouldPlay()) {
  document.documentElement.classList.add('is-intro')
}

export default function MainLayout() {
  const location = useLocation()
  const mainRef = useRef(null)
  const first = useRef(true)

  const finishIntro = useCallback(() => {
    document.documentElement.classList.remove('is-intro')
    window.dispatchEvent(new Event('intro:done'))
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [])

  useEffect(() => {
    const go = () => {
      if (location.hash) {
        const target = document.querySelector(location.hash)
        if (target) scrollToTarget(target, -8)
      } else if (!first.current) {
        scrollToTarget(0)
      }
      first.current = false
    }
    if (document.documentElement.classList.contains('is-intro')) {
      window.addEventListener('intro:done', go, { once: true })
      return () => window.removeEventListener('intro:done', go)
    }
    go()
    first.current = false
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (prefersReducedMotion() || document.documentElement.classList.contains('is-intro')) return undefined
    const tween = gsap.fromTo(mainRef.current, { autoAlpha: 0.2 }, { autoAlpha: 1, duration: 0.45, ease: 'power2.out' })
    return () => tween.kill()
  }, [location.pathname])

  return (
    <>
      <IntroTransition onComplete={finishIntro} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[130] focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Cursor />
      <Navbar />
      <main id="main" ref={mainRef} tabIndex={-1} className="relative z-[1] outline-none">
        <div data-motion-root>
          <PageMotion key={location.pathname} />
          <Suspense fallback={<PageFallback />}>
            <Routes location={location}>
              <Route index element={<Home />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="projects/:slug" element={<ProjectDetail />} />
              <Route path="insights" element={<BlogPage />} />
              <Route path="insights/:slug" element={<InsightDetail />} />
              <Route path="impact/:slug" element={<ImpactDetail />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  )
}
