import { lazy, Suspense, useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { gsap } from '../animations/gsapConfig'
import Cursor from '../components/Cursor'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import PageMotion from '../components/PageMotion'
import Preloader3D from '../components/Preloader3D'
import FloatingChatbot from '../components/Chatbot/FloatingChatbot'
import { lenis, useLenis } from '../hooks/useLenis'
import Home from '../pages/Home'

const AboutPage = lazy(() => import('../pages/AboutPage'))
const ProjectsPage = lazy(() => import('../pages/ProjectsPage'))
const ProjectDetail = lazy(() => import('../pages/ProjectDetail'))
const BlogPage = lazy(() => import('../pages/BlogPage'))
const InsightDetail = lazy(() => import('../pages/InsightDetail'))
const ImpactDetail = lazy(() => import('../pages/ImpactDetail'))
const ContactPage = lazy(() => import('../pages/ContactPage'))
const ArchivePage = lazy(() => import('../pages/ArchivePage'))
const PrivacyPolicy = lazy(() => import('../pages/PrivacyPolicy'))
const TermsConditions = lazy(() => import('../pages/TermsConditions'))
const NotFound = lazy(() => import('../pages/NotFound'))

function PageFallback() {
  return <div className="min-h-screen bg-paper" role="status" aria-label="Loading page" />
}

function scrollToTarget(target, offset = -80) {
  if (!target) return
  const smoothEase = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
  if (target === 0) {
    if (lenis) {
      lenis.scrollTo(0, { immediate: false, duration: 1.2, easing: smoothEase })
      return
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  const top = target.getBoundingClientRect().top + window.scrollY + offset
  if (lenis) {
    lenis.scrollTo(top, { immediate: false, duration: 1.25, easing: smoothEase })
    return
  }
  window.scrollTo({ top, behavior: 'smooth' })
}

export default function MainLayout() {
  const location = useLocation()
  const mainRef = useRef(null)
  const first = useRef(true)
  useLenis()

  useEffect(() => {
    if (location.hash) {
      let attempts = 0
      const tryScroll = () => {
        const target = document.querySelector(location.hash)
        if (target) {
          scrollToTarget(target, -80)
        } else if (attempts < 5) {
          attempts += 1
          setTimeout(tryScroll, 100)
        }
      }

      if (document.documentElement.classList.contains('is-intro')) {
        window.addEventListener('intro:done', tryScroll, { once: true })
        return () => window.removeEventListener('intro:done', tryScroll)
      }

      const timer = setTimeout(tryScroll, 60)
      return () => clearTimeout(timer)
    } else {
      // When navigating to a new page without hash, always reset scroll immediately to top
      if (lenis) {
        lenis.scrollTo(0, { immediate: true })
      }
      window.scrollTo(0, 0)
    }
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (mainRef.current) gsap.set(mainRef.current, { autoAlpha: 1 })
  }, [location.pathname])

  return (
    <>
      <Preloader3D />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[130] focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Cursor />
      <div className="flex min-h-svh flex-col">
      <Navbar />
      <main id="main" ref={mainRef} tabIndex={-1} className="relative z-[1] flex-1 outline-none">
        <div data-motion-root>
          <PageMotion key={location.pathname} />
          <Suspense fallback={<PageFallback />}>
            <Routes location={location}>
              <Route index element={<Home />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="projects/:slug" element={<ProjectDetail />} />
              <Route path="archive" element={<ArchivePage />} />
              <Route path="insights" element={<BlogPage />} />
              <Route path="insights/:slug" element={<InsightDetail />} />
              <Route path="impact/:slug" element={<ImpactDetail />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="privacy" element={<PrivacyPolicy />} />
              <Route path="terms" element={<TermsConditions />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
      </main>
      <Footer />
      </div>
      <FloatingChatbot />
    </>
  )
}
