import { useMemo } from 'react'
import { seededRange } from '../utils/seededRandom'

export default function FragmentedText({ text, className = '', cols = 8, rows = 3, seed = 1, compact = false }) {
  const fragments = useMemo(() => {
    const travel = compact ? 0.45 : 1
    const list = []
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const index = row * cols + col
        const top = (row / rows) * 100
        const bottom = ((rows - row - 1) / rows) * 100
        const left = (col / cols) * 100
        const right = ((cols - col - 1) / cols) * 100
        const wave = (col / Math.max(cols - 1, 1)) * (compact ? 0.22 : 0.38)
        list.push({
          id: `${seed}-${index}`,
          clip: `inset(${top}% ${right}% ${bottom}% ${left}%)`,
          delay: wave + row * 0.04,
          depth: 0.96 + row * 0.02,
          tx: seededRange(index, seed, -90, 240) * travel,
          ty: seededRange(index, seed + 1, -120, 130) * travel,
          rot: seededRange(index, seed + 2, -28, 58) * travel,
          scale: seededRange(index, seed + 3, 0.8, 1.2),
        })
      }
    }
    return list
  }, [cols, rows, seed, compact])

  return (
    <div data-fragment-line className={`relative block pb-1 ${className}`}>
      {fragments.map((fragment) => (
        <span
          key={fragment.id}
          data-fragment
          data-tx={fragment.tx}
          data-ty={fragment.ty}
          data-rot={fragment.rot}
          data-scale={fragment.scale}
          data-delay={fragment.delay}
          data-depth={fragment.depth}
          className="absolute inset-0 block origin-center will-change-transform"
          style={{ clipPath: fragment.clip, WebkitClipPath: fragment.clip, opacity: 0 }}
        >
          {text}
        </span>
      ))}
    </div>
  )
}
