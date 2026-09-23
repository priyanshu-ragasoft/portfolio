import { useMemo } from 'react'
import { seededRange } from '../utils/seededRandom'

export default function FragmentedHeroImage({
  src,
  cols = 7,
  rows = 5,
  seed = 20,
  compact = false,
  objectPosition = 'center 22%',
}) {
  const tiles = useMemo(() => {
    const travel = compact ? 0.55 : 1
    const centerX = (cols - 1) / 2
    const centerY = (rows - 1) / 2
    const maxDist = Math.hypot(centerX, centerY) || 1
    const list = []

    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const index = row * cols + col
        const dist = Math.hypot(col - centerX, row - centerY)
        const norm = dist / maxDist
        list.push({
          id: index,
          col,
          row,
          delay: norm * (compact ? 0.32 : 0.52),
          depth: 0.94 + norm * 0.12,
          tx: seededRange(index, seed, 70, 360) * travel,
          ty: seededRange(index, seed + 1, -100, 120) * travel,
          rot: seededRange(index, seed + 2, -26, 36) * travel,
          scale: seededRange(index, seed + 3, 0.86, 1.16),
        })
      }
    }
    return list
  }, [cols, rows, seed, compact])

  return (
    <div
      data-hero-image-grid
      className="pointer-events-none absolute inset-0 z-[2] grid h-full w-full gap-px"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` }}
      aria-hidden="true"
    >
      {tiles.map((tile) => (
        <div
          key={tile.id}
          data-image-fragment
          data-tx={tile.tx}
          data-ty={tile.ty}
          data-rot={tile.rot}
          data-scale={tile.scale}
          data-delay={tile.delay}
          data-depth={tile.depth}
          className="hero-image-tile relative overflow-hidden will-change-transform"
          style={{ opacity: 0 }}
        >
          <img
            src={src}
            alt=""
            draggable={false}
            className="absolute max-w-none object-cover"
            style={{
              width: `${cols * 100}%`,
              height: `${rows * 100}%`,
              left: `${-tile.col * 100}%`,
              top: `${-tile.row * 100}%`,
              objectPosition,
            }}
          />
        </div>
      ))}
    </div>
  )
}
