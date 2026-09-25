import { useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

/**
 * Wrap any heading, paragraph, or grid. The hook splits text into word/line
 * chunks or treats direct children as blocks, then plays a scroll-triggered
 * rise (y: 60 → 0, opacity 0 → 1) that reverses on the way back up.
 *
 *   <ScrollReveal type="text"><h2>My Heading</h2></ScrollReveal>
 *   <ScrollReveal type="block" stagger={0.08}>
 *     <div className="grid gap-4 sm:grid-cols-2">...</div>
 *   </ScrollReveal>
 *
 * FOUC: `opacity-0` until `data-reveal-ready` is set (after gsap.set).
 * `motion-reduce:opacity-100` keeps content visible when OS motion is reduced.
 * Pass `debug` to draw ScrollTrigger markers locally.
 */
export default function ScrollReveal({
  children,
  type = 'text',
  stagger,
  className = '',
  debug = false,
  as: Tag = 'div',
  y,
  duration,
  ease,
  start,
  batch,
  chunk,
  clump,
  ...rest
}) {
  const ref = useRef(null)

  useScrollReveal(ref, {
    type,
    stagger,
    debug,
    y,
    duration,
    ease,
    start,
    batch,
    chunk,
    clump,
  })

  return (
    <Tag
      ref={ref}
      data-scroll-reveal={type}
      className={`opacity-0 data-[reveal-ready]:opacity-100 motion-reduce:opacity-100 ${className}`.trim()}
      {...rest}
    >
      {children}
    </Tag>
  )
}
