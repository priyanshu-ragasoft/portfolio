/**
 * WorldGlobe — React Three Fiber 3D globe for the Journey section.
 *
 * Features:
 * - Slowly auto-rotating sphere with dot-matrix land texture
 * - Glowing gold markers for each journey location (lat/lon from real data)
 * - Curved 3D routes drawn progressively between locations
 * - Mouse-parallax tilt responding to pointer movement
 * - Scroll-driven rotation via the `scrollProgress` prop
 * - Active location highlighted with a gold glow pulse
 * - Reduced-motion: only auto-rotation, no curves or particles
 *
 * Usage (inside a <Canvas>):
 *   <WorldGlobe scrollProgress={0..1} activeIndex={0..N} />
 */
import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/* ─── Real geographic coordinates from journeyLocations.js ──────────── */
const LOCATIONS = [
  { id: 'kampala',     label: 'Kampala, Uganda',      lon:  32.5825, lat:  0.3476 },
  { id: 'bangalore',   label: 'Bangalore, India',      lon:  77.5946, lat: 12.9716 },
  { id: 'ethiopia',    label: 'Addis Ababa, Ethiopia', lon:  40.5,    lat:  9.15   },
  { id: 'dubai',       label: 'Dubai, UAE',            lon:  55.2708, lat: 25.2048 },
  { id: 'southafrica', label: 'South Africa',          lon:  26.2,    lat: -29.0   },
  { id: 'russia',      label: 'Moscow, Russia',        lon:  37.6,    lat: 55.75   },
]

/* Journey route pairs — match journeyLocations.js legs */
const ROUTES = [
  [0, 1], // Kampala → Bangalore
  [1, 0], // Bangalore → Kampala
  [0, 2], // Kampala → Ethiopia
  [2, 3], // Ethiopia → Dubai
  [3, 4], // Dubai → South Africa
  [4, 5], // South Africa → Russia
]

/* Chapter index → location index mapping (matches handwritten sequence: 0:Uganda, 1:Bangalore, 2:Uganda Mine, 3:Ethiopia, 4:Dubai, 5:South Africa, 6:Russia) */
const CHAPTER_TO_LOC = [0, 1, 0, 2, 3, 4, 5]

const GLOBE_RADIUS = 1.6
const DEG = Math.PI / 180

function lonLatToVec3(lon, lat, r = GLOBE_RADIUS) {
  const phi   = (90 - lat) * DEG
  const theta = (lon + 180) * DEG
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta),
  )
}

/* ─── Dot-grid land texture ───────────────────────────────────────────── */
function useLandTexture() {
  return useMemo(() => {
    const W = 2048, H = 1024
    const canvas = document.createElement('canvas')
    canvas.width = W
    canvas.height = H
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#0D0D0C'
    ctx.fillRect(0, 0, W, H)

    const dotSpacing = 6
    const dotRadius  = 1.1

    for (let px = 0; px < W; px += dotSpacing) {
      for (let py = 0; py < H; py += dotSpacing) {
        const lon = (px / W) * 360 - 180
        const lat = 90 - (py / H) * 180

        if (isLand(lon, lat)) {
          ctx.beginPath()
          ctx.arc(px + dotRadius, py + dotRadius, dotRadius, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(201, 161, 90, 0.55)'
          ctx.fill()
        }
      }
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }, [])
}

/* Simplified land detection zones */
function isLand(lon, lat) {
  // Africa
  if (lon >= -20 && lon <= 52 && lat >= -35 && lat <= 38) return true
  // Eurasia
  if (lon >= -10 && lon <= 180 && lat >= 35 && lat <= 72) return true
  // Middle East / South Asia
  if (lon >= -10 && lon <= 60  && lat >= 15 && lat <= 35) return true
  if (lon >= 60  && lon <= 100 && lat >= 5  && lat <= 35) return true
  // SE Asia + Japan
  if (lon >= 100 && lon <= 145 && lat >= -10 && lat <= 46) return true
  // N. America
  if (lon >= -170 && lon <= -60 && lat >= 15 && lat <= 72) return true
  // S. America
  if (lon >= -82  && lon <= -35 && lat >= -56 && lat <= 12) return true
  // Australia
  if (lon >= 113 && lon <= 154 && lat >= -44 && lat <= -10) return true
  return false
}

/* ─── Single location marker ─────────────────────────────────────────── */
function Marker({ location, active, reduced }) {
  const outerRef = useRef(null)
  const vec3     = useMemo(() => lonLatToVec3(location.lon, location.lat), [location])
  const normal   = useMemo(() => vec3.clone().normalize(), [vec3])

  useFrame(() => {
    if (!outerRef.current || reduced || !active) return
    const scale = 1 + 0.4 * Math.sin(Date.now() * 0.003)
    outerRef.current.scale.setScalar(scale)
  })

  const offset = normal.clone().multiplyScalar(0.025)
  const pos    = vec3.clone().add(offset)

  return (
    <group position={[pos.x, pos.y, pos.z]}>
      <mesh ref={outerRef}>
        <sphereGeometry args={[active ? 0.045 : 0.025, 8, 8]} />
        <meshBasicMaterial
          color={active ? '#f0d7a2' : '#C9A15A'}
          opacity={active ? 0.35 : 0.15}
          transparent
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[active ? 0.022 : 0.012, 8, 8]} />
        <meshBasicMaterial color={active ? '#ffe8a0' : '#C9A15A'} />
      </mesh>
    </group>
  )
}

/* ─── Curved route arc ───────────────────────────────────────────────── */
function RouteArc({ from, to, progress, active, dim }) {
  const geomRef = useRef(null)

  const { points, color, opacity } = useMemo(() => {
    const start  = lonLatToVec3(from.lon, from.lat)
    const end    = lonLatToVec3(to.lon, to.lat)
    const mid    = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5)
    mid.normalize().multiplyScalar(GLOBE_RADIUS * 1.35)
    const curve  = new THREE.QuadraticBezierCurve3(start, mid, end)
    return {
      points: curve.getPoints(64),
      color:   active ? '#f0d7a2' : dim ? '#3a3227' : '#C9A15A',
      opacity: active ? 1 : dim ? 0.2 : 0.6,
    }
  }, [from, to, active, dim])

  // Update geometry as progress changes
  const geom = useMemo(() => {
    const drawn = Math.max(2, Math.floor(points.length * Math.min(1, progress)))
    const g = new THREE.BufferGeometry().setFromPoints(points.slice(0, drawn))
    return g
  }, [points, progress])

  useEffect(() => {
    const prev = geomRef.current
    geomRef.current = geom
    return () => { prev?.dispose() }
  }, [geom])

  return (
    <line geometry={geom}>
      <lineBasicMaterial color={color} opacity={opacity} transparent />
    </line>
  )
}

/* ─── Ambient background particles ──────────────────────────────────── */
function Particles({ count, reduced }) {
  const geom = useMemo(() => {
    const n   = reduced ? 20 : count
    const pos = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      const r     = GLOBE_RADIUS * (1.5 + Math.random() * 1.2)
      const phi   = Math.acos(2 * Math.random() - 1)
      const theta = Math.random() * Math.PI * 2
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.cos(phi)
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  }, [count, reduced])

  useEffect(() => () => geom.dispose(), [geom])

  return (
    <points geometry={geom}>
      <pointsMaterial color="#C9A15A" size={0.012} opacity={0.35} transparent sizeAttenuation />
    </points>
  )
}

/* ─── Main globe component ───────────────────────────────────────────── */
export default function WorldGlobe({
  scrollProgress = 0,
  activeChapter  = 0,
  routeProgress  = {},
  reduced        = false,
}) {
  const groupRef = useRef(null)
  const { size } = useThree()
  const isCompact = size.width < 768
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (reduced) return undefined
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduced])

  const landTexture = useLandTexture()

  // Dispose texture on unmount
  useEffect(() => () => landTexture.dispose(), [landTexture])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += delta * 0.04
    const targetX = scrollProgress * 0.4 + mouse.current.y * (reduced ? 0 : 0.12)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05)
    if (!reduced) {
      groupRef.current.rotation.y += mouse.current.x * 0.002
    }
  })

  const activeLocIndex = CHAPTER_TO_LOC[Math.min(activeChapter, CHAPTER_TO_LOC.length - 1)] ?? 0

  return (
    <group ref={groupRef}>
      {/* Globe sphere */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        <meshStandardMaterial color="#111009" roughness={0.85} metalness={0.08} map={landTexture} />
      </mesh>

      {/* Atmospheric glow ring */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS * 1.022, 32, 32]} />
        <meshBasicMaterial color="#C9A15A" opacity={0.03} transparent side={THREE.BackSide} />
      </mesh>

      {/* Location markers */}
      {LOCATIONS.map((loc, i) => (
        <Marker key={loc.id} location={loc} active={i === activeLocIndex} reduced={reduced} />
      ))}

      {/* Curved routes (not rendered when reduced motion) */}
      {!reduced && ROUTES.map(([fromIdx, toIdx], routeIndex) => (
        <RouteArc
          key={`route-${routeIndex}`}
          from={LOCATIONS[fromIdx]}
          to={LOCATIONS[toIdx]}
          progress={routeProgress[routeIndex] ?? 0}
          active={routeIndex === activeChapter - 1}
          dim={routeIndex < activeChapter - 2}
        />
      ))}

      {/* Ambient particles */}
      <Particles count={isCompact ? 40 : 80} reduced={reduced} />

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={1.2} color="#f4f0e8" />
      <pointLight position={[-3, -2, -2]} intensity={0.3} color="#C9A15A" />
    </group>
  )
}
