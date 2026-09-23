import { useMemo } from 'react'
import { seededRange } from '../utils/seededRandom'

export default function HeroDust({ compact = false }) {
  const count = compact ? 12 : 28

  const particles = useMemo(() => {
    const travel = compact ? 0.55 : 1
    return Array.from({ length: count }, (_, index) => {
      const x = seededRange(index, 40, 34, 78)
      const y = seededRange(index, 41, 12, 62)
      const angle = seededRange(index, 42, 0, Math.PI * 2)
      const dist = seededRange(index, 43, 80, 220) * travel
      return {
        id: index,
        x,
        y,
        size: seededRange(index, 44, 2, compact ? 4 : 5.5),
        delay: seededRange(index, 45, 0, compact ? 0.35 : 0.55),
        tx: Math.cos(angle) * dist,
        ty: Math.sin(angle) * dist,
        opacity: seededRange(index, 46, 0.35, 0.85),
      }
    })
  }, [count, compact])

  return (
    <div data-hero-dust-field className="pointer-events-none absolute inset-0 z-[9]" aria-hidden="true">
      {particles.map((particle) => (
        <span
          key={particle.id}
          data-hero-dust
          data-tx={particle.tx}
          data-ty={particle.ty}
          data-delay={particle.delay}
          data-scale={seededRange(particle.id, 47, 0.5, 1.2)}
          className="absolute rounded-full bg-[#C9A15A] shadow-[0_0_12px_rgb(201_161_90_/_0.45)] will-change-transform"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            opacity: 0,
          }}
        />
      ))}
    </div>
  )
}
