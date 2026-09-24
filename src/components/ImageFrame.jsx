export default function ImageFrame({
  src,
  alt,
  className = '',
  tone = 'light',
  priority = false,
  parallax = true,
  position = 'center 12%',
  hoverEffect = true,
  shape = 'default',
}) {
  const shapeClass = {
    default: 'rounded-2xl',
    arch: 'rounded-t-[160px] sm:rounded-t-[200px] rounded-b-[24px]',
    beveled: 'rounded-tl-[64px] rounded-br-[64px] rounded-tr-[20px] rounded-bl-[20px]',
    pill: 'rounded-full',
  }[shape] || 'rounded-2xl'

  return (
    <div
      className={`group relative overflow-hidden bg-line ${shapeClass} ${className}`}
      data-image-reveal
      data-parallax-bounds={parallax ? '' : undefined}
    >
      <div data-parallax={parallax ? '' : undefined} className="absolute inset-x-0 -top-[3%] h-[108%]">
        <div data-image-zoom className="h-full w-full origin-center">
          <img
            src={src}
            alt={alt}
            className={`h-full w-full object-cover transition-all duration-700 ease-out will-change-transform ${hoverEffect
                ? 'grayscale-[30%] contrast-[1.02] group-hover:scale-105 group-hover:grayscale-0 group-hover:contrast-105 hover:scale-105 hover:grayscale-0'
                : ''
              }`}
            style={{ objectPosition: position }}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
          />
        </div>
      </div>
      <span
        data-image-mask
        className={`pointer-events-none absolute inset-0 ${tone === 'dark' ? 'bg-ink' : 'bg-paper'}`}
        aria-hidden="true"
      />
    </div>
  )
}
