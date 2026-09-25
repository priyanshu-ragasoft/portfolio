import ScrollReveal from './ScrollReveal'

export default function SectionHeading({
  eyebrow,
  title,
  children,
  invert = false,
  className = '',
  as: Title = 'h2',
}) {
  return (
    <div className={`max-w-3xl ${className}`} data-heading>
      {eyebrow ? (
        <p
          data-eyebrow
          className={`flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] ${invert ? 'text-mist' : 'text-muted'}`}
        >
          <span className="h-px w-8 bg-bronze" aria-hidden="true" />
          {eyebrow}
        </p>
      ) : null}
      <ScrollReveal
        type="text"
        as={Title}
        className={`display mt-4 text-4xl sm:text-5xl md:text-6xl ${invert ? 'text-paper' : 'text-ink'}`}
      >
        {title}
      </ScrollReveal>
      {children ? (
        <ScrollReveal
          type="text"
          stagger={0.03}
          as="p"
          data-lede
          className={`mt-5 max-w-xl text-base leading-relaxed sm:text-lg ${invert ? 'text-mist' : 'text-muted'}`}
        >
          {children}
        </ScrollReveal>
      ) : null}
    </div>
  )
}
