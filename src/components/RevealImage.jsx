import { useRef } from 'react'
import { useImageReveal } from '../hooks/useImageReveal'

/**
 * <RevealImage src="..." alt="..." direction="left" className="rounded-xl" />
 * Omit direction to auto-detect left / right / up from the image position.
 * Pass debug to show ScrollTrigger markers.
 */
export default function RevealImage({
  src,
  alt,
  direction,
  className = '',
  debug = false,
  ...rest
}) {
  const ref = useRef(null)
  useImageReveal(ref, { direction, debug })

  return <img ref={ref} src={src} alt={alt} className={className} {...rest} />
}
