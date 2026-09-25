import { useRef } from 'react'
import { useImageReveal } from '../hooks/useImageReveal'

/**
 * Same reveal as RevealImage, for a div with a CSS background image.
 * <RevealImageDiv src="..." direction="up" className="h-64 rounded-xl" />
 */
export default function RevealImageDiv({
  src,
  direction,
  className = '',
  debug = false,
  children,
  ...rest
}) {
  const ref = useRef(null)
  useImageReveal(ref, { direction, debug })

  return (
    <div
      ref={ref}
      className={className}
      style={{ backgroundImage: src ? `url(${src})` : undefined }}
      {...rest}
    >
      {children}
    </div>
  )
}
