export default function ImageFrame({
  src,
  alt,
  className = '',
  tone = 'light',
  priority = false,
  parallax = true,
  position = 'center',
}) {
  return (
    <div
      className={`relative overflow-hidden bg-line ${className}`}
      data-image-reveal
      data-parallax-bounds={parallax ? '' : undefined}
    >
      <div data-parallax={parallax ? '' : undefined} className="absolute inset-x-0 -top-[8%] h-[116%]">
        <div data-image-zoom className="h-full w-full origin-center">
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
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
