/**
 * ParticlesCanvas — Subtle floating Three.js particle field.
 *
 * Used as a depth/atmosphere layer in the Contact and Hero sections.
 * Particles:
 * - Float slowly (procedural drift, no physics)
 * - React slightly to mouse position
 * - React slightly to scroll position
 * - Fewer particles on mobile / reduced-motion
 *
 * Performance: all positions updated in useFrame via direct buffer
 * attribute mutation (no React state, no re-renders).
 */
import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Floaters({ count, scrollY, mouse, reduced }) {
  const meshRef = useRef(null)
  const posRef  = useRef(null)
  const velRef  = useRef(null)
  const time    = useRef(0)

  const { positions, velocities } = useMemo(() => {
    const n = reduced ? Math.floor(count * 0.3) : count
    const pos = new Float32Array(n * 3)
    const vel = new Float32Array(n * 3)
    for (let i = 0; i < n; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 14
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6
      vel[i * 3]     = (Math.random() - 0.5) * 0.003
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.004 - 0.001  // slight upward drift
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002
    }
    return { positions: pos, velocities: vel }
  }, [count, reduced])

  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3))
    return g
  }, [positions])

  useEffect(() => {
    posRef.current = positions.slice()
    velRef.current = velocities.slice()
    return () => geom.dispose()
  }, [geom, positions, velocities])

  useFrame((_, delta) => {
    if (!meshRef.current || !posRef.current || reduced) return
    time.current += delta

    const pos = posRef.current
    const vel = velRef.current
    const mouseX = mouse.current.x * 0.8
    const mouseY = mouse.current.y * 0.5
    const n = pos.length / 3

    for (let i = 0; i < n; i++) {
      pos[i * 3]     += vel[i * 3]     + mouseX * 0.0008
      pos[i * 3 + 1] += vel[i * 3 + 1] + mouseY * 0.0008
      pos[i * 3 + 2] += vel[i * 3 + 2]

      // Wrap particles within bounds
      if (pos[i * 3]     >  7) pos[i * 3]     = -7
      if (pos[i * 3]     < -7) pos[i * 3]     =  7
      if (pos[i * 3 + 1] >  5) pos[i * 3 + 1] = -5
      if (pos[i * 3 + 1] < -5) pos[i * 3 + 1] =  5
    }

    const attr = meshRef.current.geometry.getAttribute('position')
    attr.array.set(pos)
    attr.needsUpdate = true
  })

  return (
    <points ref={meshRef} geometry={geom}>
      <pointsMaterial
        color="#C9A15A"
        size={0.05}
        opacity={0.45}
        transparent
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function Scene({ count, reduced }) {
  const mouse  = useRef({ x: 0, y: 0 })
  const scrollY = useRef(0)

  useEffect(() => {
    if (reduced) return undefined
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    const onScroll = () => { scrollY.current = window.scrollY }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [reduced])

  return (
    <>
      <Floaters count={count} scrollY={scrollY} mouse={mouse} reduced={reduced} />
      <ambientLight intensity={0.2} />
    </>
  )
}

export default function ParticlesCanvas({ count = 100, reduced = false, className = '' }) {
  const n = (typeof window !== 'undefined' && window.innerWidth < 768)
    ? Math.floor(count * 0.4)
    : count

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      gl={{ antialias: false, alpha: true }}
      dpr={[1, 1]}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      className={className}
      aria-hidden="true"
    >
      <Scene count={n} reduced={reduced} />
    </Canvas>
  )
}
