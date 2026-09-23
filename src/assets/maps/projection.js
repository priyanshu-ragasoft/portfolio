import { MAP_HEIGHT, MAP_WIDTH } from './land'

const LAT_MIN = -56
const LAT_MAX = 78

function mercator(lat) {
  return Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360))
}

const Y_MAX = mercator(LAT_MAX)
const Y_MIN = mercator(LAT_MIN)

export function project(lon, lat) {
  const x = ((lon + 180) / 360) * MAP_WIDTH
  const clamped = Math.max(LAT_MIN, Math.min(LAT_MAX, lat))
  const y = ((Y_MAX - mercator(clamped)) / (Y_MAX - Y_MIN)) * MAP_HEIGHT
  return { x, y }
}

export function arc(from, to, lift = 56, side = 0) {
  const c1x = from.x + (to.x - from.x) * 0.35 + side
  const c2x = from.x + (to.x - from.x) * 0.72 + side * 0.45
  const peak = Math.min(from.y, to.y) - lift
  const c2y = Math.min(from.y, to.y) - lift * 0.35
  return `M ${from.x.toFixed(1)} ${from.y.toFixed(1)} C ${c1x.toFixed(1)} ${peak.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${to.x.toFixed(1)} ${to.y.toFixed(1)}`
}

export { MAP_HEIGHT, MAP_WIDTH }
