import { Link } from 'react-router-dom'

const variants = {
  solid: 'bg-ink text-paper hover:bg-bronze',
  light: 'bg-paper text-ink hover:bg-ivory',
  ghost: 'bg-transparent ring-1 ring-inset ring-current/40 hover:bg-white/10',
  text: 'bg-transparent px-0 text-current hover:text-bronze',
}

export default function Button({
  to,
  href,
  children,
  variant = 'solid',
  className = '',
  ...props
}) {
  const classes = `inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-300 ${variants[variant]} ${className}`
  const shared = { ...props, className: classes, 'data-button': '' }

  if (to) {
    return (
      <Link to={to} {...shared}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} {...shared}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" {...shared}>
      {children}
    </button>
  )
}
