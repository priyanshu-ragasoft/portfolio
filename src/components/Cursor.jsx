import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../animations/gsapConfig'

export default function Cursor() {
  const cursorRef = useRef(null)
  const enabled =
    window.matchMedia('(hover: hover) and (pointer: fine)').matches && !prefersReducedMotion()

  useEffect(() => {
    if (!enabled || !cursorRef.current) return undefined

    const cursor = cursorRef.current
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.45, ease: 'power3.out' })
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.45, ease: 'power3.out' })

    const move = (event) => {
      xTo(event.clientX)
      yTo(event.clientY)
    }

    const over = (event) => {
      const target = event.target.closest('a, button, [data-cursor]')
      gsap.to(cursor, {
        scale: target ? 2.1 : 1,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    window.addEventListener('pointermove', move)
    document.addEventListener('pointerover', over)

    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[80] hidden h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-bronze lg:block"
    />
  )
}
