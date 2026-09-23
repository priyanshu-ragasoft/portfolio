import lockup from '../assets/images/kwizera-logo.png'
import mark from '../assets/images/kwizera-mark.png'

const sources = {
  mark,
  lockup,
}

export default function Logo({ variant = 'lockup', className = '', priority = false }) {
  const source = sources[variant] ?? lockup

  return (
    <img
      src={source}
      alt=""
      width={variant === 'mark' ? 479 : 633}
      height={variant === 'mark' ? 427 : 654}
      decoding="async"
      draggable="false"
      fetchPriority={priority ? 'high' : 'auto'}
      className={className}
    />
  )
}
