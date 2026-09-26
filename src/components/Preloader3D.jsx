import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { gsap } from '../animations/gsapConfig'
import loderImg from '../assets/loder/loder.png'

export default function Preloader3D({ onComplete }) {
  const overlayRef = useRef(null)
  const canvasRef = useRef(null)
  const flashRef = useRef(null)

  const [active, setActive] = useState(true)

  useEffect(() => {
    // Lock scroll during intro
    document.documentElement.classList.add('is-intro')
    document.body.style.overflow = 'hidden'

    const canvas = canvasRef.current
    const overlay = overlayRef.current
    if (!canvas || !overlay) return

    let animationFrameId
    let isFinished = false
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }

    // 1. Three.js Scene & Perspective Camera
    const scene = new THREE.Scene()
    const aspect = window.innerWidth / window.innerHeight
    const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100)
    camera.position.set(0, 0, 6.6)

    // 2. WebGL Renderer with High-Precision Alpha & Tone Mapping
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.35

    // 3. Ultra-Vibrant Studio & Cinematic Gold Lighting
    const ambientLight = new THREE.AmbientLight(0xfff8e7, 1.5)
    scene.add(ambientLight)

    // Key Golden Spotlight (Upper Right)
    const keyLight = new THREE.SpotLight(0xfff4d6, 9.5, 22, Math.PI / 3.5, 0.35)
    keyLight.position.set(5, 6, 6)
    scene.add(keyLight)

    // Warm 24K Gold Fill Light (Lower Left)
    const goldFillLight = new THREE.PointLight(0xd4af37, 6.5, 16)
    goldFillLight.position.set(-4, -2, 3)
    scene.add(goldFillLight)

    // Luminous Specular Rim Light (Back Rim Glow)
    const rimLight = new THREE.PointLight(0xffe8a3, 7.0, 14)
    rimLight.position.set(3, -4, -2)
    scene.add(rimLight)

    // Subtle Champagne Accent Light
    const accentLight = new THREE.PointLight(0xf7dfa5, 4.5, 12)
    accentLight.position.set(-3, 4, -2)
    scene.add(accentLight)

    // Dynamic Sweeping Specular Glint Light
    const sweepLight = new THREE.PointLight(0xfffadc, 8.5, 9, 2)
    sweepLight.position.set(0, 0, 3)
    scene.add(sweepLight)

    // 4. Master Coin Hierarchy
    const masterGroup = new THREE.Group()
    const coinGroup = new THREE.Group()
    masterGroup.add(coinGroup)
    scene.add(masterGroup)

    // 6. Floating Mini 3D "P" Gold Coins Data
    const miniCoinCount = 70
    const miniCoinGeo = new THREE.CylinderGeometry(0.20, 0.20, 0.032, 32)
    miniCoinGeo.rotateX(Math.PI / 2)

    let instancedCoins = null
    let miniMaterials = []

    const dummy = new THREE.Object3D()
    const miniCoinsData = []

    for (let i = 0; i < miniCoinCount; i++) {
      const radius = 1.3 + Math.random() * 5.0
      const theta = Math.random() * Math.PI * 2
      const phi = (Math.random() - 0.5) * Math.PI * 0.9

      const x = radius * Math.cos(theta) * Math.cos(phi)
      const y = radius * Math.sin(phi) * 0.95
      const z = (Math.random() - 0.5) * 8.0

      const rotX = Math.random() * Math.PI * 2
      const rotY = Math.random() * Math.PI * 2
      const rotZ = Math.random() * Math.PI * 2

      const spinX = (Math.random() - 0.5) * 1.8
      const spinY = (Math.random() - 0.5) * 2.2
      const spinZ = (Math.random() - 0.5) * 1.5

      const scale = 0.5 + Math.random() * 0.65

      miniCoinsData.push({
        origX: x,
        origY: y,
        origZ: z,
        x,
        y,
        z,
        rotX,
        rotY,
        rotZ,
        spinX,
        spinY,
        spinZ,
        scale,
      })
    }

    // 7. Coin Construction with Texture
    let coinMesh = null
    const clock = new THREE.Clock()
    const manager = new THREE.LoadingManager()

    manager.onLoad = () => {
      // Give enough time for the intro flight to complete before smoothly transitioning out
      setTimeout(() => triggerExitTransition(), 950)
    }

    // Load Texture: assets/loder/loder.png
    const textureLoader = new THREE.TextureLoader(manager)
    textureLoader.load(
      loderImg,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace
        texture.generateMipmaps = true
        texture.minFilter = THREE.LinearMipmapLinearFilter
        if (renderer.capabilities?.getMaxAnisotropy) {
          texture.anisotropy = renderer.capabilities.getMaxAnisotropy()
        }

        // Align texture straight up (12 o'clock)
        texture.center.set(0.5, 0.5)
        texture.rotation = Math.PI / 2

        const backTexture = texture.clone()
        backTexture.center.set(0.5, 0.5)
        backTexture.rotation = Math.PI / 2
        backTexture.needsUpdate = true

        // Mini Floating "P" Coins with Authentic Texture
        const miniEdgeMat = new THREE.MeshStandardMaterial({
          color: 0xffd700,
          metalness: 0.98,
          roughness: 0.15,
          emissive: 0x553805,
          emissiveIntensity: 0.45,
          transparent: true,
          opacity: 0.95,
        })
        const miniFrontMat = new THREE.MeshStandardMaterial({
          map: texture,
          transparent: true,
          metalness: 0.85,
          roughness: 0.2,
          emissive: 0x332205,
          emissiveIntensity: 0.25,
          opacity: 0.95,
        })
        const miniBackMat = new THREE.MeshStandardMaterial({
          map: backTexture,
          transparent: true,
          metalness: 0.85,
          roughness: 0.2,
          emissive: 0x332205,
          emissiveIntensity: 0.25,
          opacity: 0.95,
        })
        miniMaterials = [miniEdgeMat, miniFrontMat, miniBackMat]

        instancedCoins = new THREE.InstancedMesh(miniCoinGeo, miniMaterials, miniCoinCount)
        scene.add(instancedCoins)

        // Coin Solid Body (Beveled Cylinder)
        const coinGeometry = new THREE.CylinderGeometry(1.22, 1.22, 0.16, 64, 1, false)
        coinGeometry.rotateX(Math.PI / 2)

        // Material 0: High-Polished 24K Gold Rim
        const edgeMaterial = new THREE.MeshStandardMaterial({
          color: 0xffd700,
          metalness: 0.98,
          roughness: 0.15,
          emissive: 0x553805,
          emissiveIntensity: 0.45,
        })

        // Material 1: Front Face with Coin Artwork (Upright P logo)
        const frontMaterial = new THREE.MeshStandardMaterial({
          map: texture,
          transparent: true,
          metalness: 0.85,
          roughness: 0.2,
          emissive: 0x332205,
          emissiveIntensity: 0.25,
        })

        // Material 2: Back Face
        const backMaterial = new THREE.MeshStandardMaterial({
          map: backTexture,
          transparent: true,
          metalness: 0.85,
          roughness: 0.2,
          emissive: 0x332205,
          emissiveIntensity: 0.25,
        })

        coinMesh = new THREE.Mesh(coinGeometry, [edgeMaterial, frontMaterial, backMaterial])
        coinGroup.add(coinMesh)

        // Initial Intro Cinematic Pose
        masterGroup.scale.set(0.001, 0.001, 0.001)
        masterGroup.position.set(0, 0.15, -3.5)
        coinGroup.rotation.set(0.15, -Math.PI * 2.5, 0)

        // Silky Smooth Intro Timeline
        const introTl = gsap.timeline()
        introTl.to(masterGroup.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 1.25,
          ease: 'power3.out',
        }, 0)

        introTl.to(masterGroup.position, {
          y: 0,
          z: 0,
          duration: 1.25,
          ease: 'power3.out',
        }, 0)

        introTl.to(coinGroup.rotation, {
          x: 0,
          y: 0,
          z: 0,
          duration: 1.25,
          ease: 'power3.out',
        }, 0)
      },
      undefined,
      (err) => {
        console.warn('Fallback loading', err)
        triggerExitTransition()
      }
    )

    // Smooth asset simulation
    for (let i = 0; i < 3; i++) {
      manager.itemStart(`core_module_${i}`)
      setTimeout(() => manager.itemEnd(`core_module_${i}`), 350 + i * 200)
    }

    // 8. Silky-Smooth Exit Transition with Hyperspace Warp Burst
    let isWarping = false
    const warpState = { speed: 1.0, scaleZ: 1.0 }

    const triggerExitTransition = () => {
      if (isFinished) return
      isFinished = true
      isWarping = true

      const exitTl = gsap.timeline({
        onComplete: () => {
          document.documentElement.classList.remove('is-intro')
          document.body.style.overflow = ''
          window.dispatchEvent(new Event('intro:done'))
          setActive(false)
          if (onComplete) onComplete()
        },
      })

      // 1. Warp Speed Mini Coins Acceleration (Streaking past camera)
      exitTl.to(warpState, {
        speed: 18.0,
        scaleZ: 4.5,
        duration: 0.9,
        ease: 'power3.in',
      }, 0)

      if (miniMaterials.length > 0) {
        exitTl.to(miniMaterials, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
        }, 0.2)
      }

      // 2. Smoothly center position and settle all tilt angles
      exitTl.to(masterGroup.position, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      }, 0)

      exitTl.to(coinGroup.position, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      }, 0)

      // 3. Smooth continuous deceleration to exact straight 360° turn & forward flythrough
      if (coinGroup) {
        const curY = coinGroup.rotation.y
        const targetY = Math.ceil(curY / (Math.PI * 2)) * (Math.PI * 2) + Math.PI * 2

        exitTl.to(coinGroup.rotation, {
          x: 0,
          y: targetY,
          z: 0,
          duration: 0.95,
          ease: 'power3.out',
        }, 0)

        exitTl.to(masterGroup.scale, {
          x: 1.28,
          y: 1.28,
          z: 1.28,
          duration: 0.95,
          ease: 'power2.out',
        }, 0)
      }

      // 5. Soft subtle flash glow flare
      if (flashRef.current) {
        exitTl.to(flashRef.current, {
          opacity: 0.35,
          duration: 0.3,
          ease: 'power2.in',
        }, 0.35)
        exitTl.to(flashRef.current, {
          opacity: 0,
          duration: 0.45,
          ease: 'power2.out',
        })
      }

      // 6. Smooth full overlay fade-out
      if (overlayRef.current) {
        exitTl.to(overlayRef.current, {
          opacity: 0,
          duration: 0.75,
          ease: 'power2.inOut',
        }, '-=0.45')
      }
    }

    // 9. Interactive Mouse Parallax with Damped Spring Tracking
    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 0.5
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 0.5
    }

    const handleResize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('resize', handleResize)

    // 10. Continuous 60–120FPS Fluid Render Loop
    let spinAngle = 0
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const rawDelta = clock.getDelta()
      const delta = Math.min(rawDelta, 0.05) // Ultra-tight delta clamp for zero micro-stutter
      const elapsed = clock.getElapsedTime()

      // High-precision exponential dampening for mouse parallax
      const damp = 1.0 - Math.exp(-4.5 * delta)
      mouse.x += (mouse.targetX - mouse.x) * damp
      mouse.y += (mouse.targetY - mouse.y) * damp

      masterGroup.rotation.x = mouse.y * 0.24
      masterGroup.rotation.y = mouse.x * 0.24

      // Silky Continuous Coin Spin & Floating Levitation
      if (coinGroup && !isFinished) {
        spinAngle += delta * 1.75
        coinGroup.rotation.y = spinAngle
        coinGroup.position.y = Math.sin(elapsed * 1.4) * 0.055
        coinGroup.rotation.z = Math.sin(elapsed * 0.9) * 0.02
      }

      // Specular sweeping light glint across the coin
      sweepLight.position.x = Math.sin(elapsed * 1.4) * 2.6
      sweepLight.position.y = Math.cos(elapsed * 1.2) * 2.0 + 0.4
      sweepLight.intensity = 6.5 + Math.sin(elapsed * 2.5) * 2.5

      // Drifting and Tumbling Mini 3D Coins in Space with Harmonic Sway
      if (instancedCoins) {
        const coinSpeed = isWarping ? warpState.speed : 1.0

        for (let i = 0; i < miniCoinCount; i++) {
          const coin = miniCoinsData[i]
          coin.z += delta * 1.15 * coinSpeed

          // Wrap mini coins when they pass the camera
          if (coin.z > 7.0) {
            coin.z = -5.0
            coin.x = coin.origX
            coin.y = coin.origY
          }

          // Dynamic 3D tumbling rotation
          coin.rotX += coin.spinX * delta
          coin.rotY += coin.spinY * delta
          coin.rotZ += coin.spinZ * delta

          // Gentle harmonic wave displacement for natural floating
          const swayX = Math.sin(elapsed * 0.7 + i * 0.5) * 0.08
          const swayY = Math.cos(elapsed * 0.6 + i * 0.4) * 0.08

          dummy.position.set(coin.x + swayX, coin.y + swayY, coin.z)
          dummy.rotation.set(coin.rotX, coin.rotY, coin.rotZ)
          dummy.scale.setScalar(coin.scale * (isWarping ? warpState.scaleZ * 0.32 : 1))
          dummy.updateMatrix()

          instancedCoins.setMatrixAt(i, dummy.matrix)
        }
        instancedCoins.instanceMatrix.needsUpdate = true
        instancedCoins.rotation.y = elapsed * 0.03
        instancedCoins.rotation.z = Math.sin(elapsed * 0.25) * 0.015
      }

      // Smooth pulsing lights
      goldFillLight.intensity = 5.5 + Math.sin(elapsed * 2.2) * 1.0
      rimLight.intensity = 6.0 + Math.cos(elapsed * 1.8) * 1.0

      renderer.render(scene, camera)
    }
    animate()

    // 11. Complete Clean Cleanup
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)

      document.documentElement.classList.remove('is-intro')
      document.body.style.overflow = ''

      if (coinMesh) {
        coinMesh.geometry.dispose()
        if (Array.isArray(coinMesh.material)) {
          coinMesh.material.forEach((m) => {
            if (m.map) m.map.dispose()
            m.dispose()
          })
        }
      }
      miniCoinGeo.dispose()
      miniMaterials.forEach((m) => {
        if (m.map) m.map.dispose()
        m.dispose()
      })
      renderer.dispose()
    }
  }, [onComplete])

  if (!active) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#070605] overflow-hidden select-none"
      role="status"
      aria-label="Loading experience"
    >
      {/* Luxurious Deep Gold & Obsidian Nebula Atmosphere */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, rgba(201, 161, 90, 0.28) 0%, rgba(138, 92, 26, 0.14) 32%, rgba(18, 14, 10, 0.85) 65%, #070605 100%),
            radial-gradient(circle at 18% 22%, rgba(201, 161, 90, 0.12) 0%, transparent 45%),
            radial-gradient(circle at 82% 78%, rgba(212, 175, 55, 0.10) 0%, transparent 50%)
          `,
        }}
      />

      {/* Luminous Ambient Core Glow Aura behind Central Coin */}
      <div
        className="pointer-events-none absolute h-[480px] w-[480px] rounded-full z-[1] blur-[80px] opacity-45"
        style={{
          background: 'radial-gradient(circle, rgba(201,161,90,0.85) 0%, rgba(184,134,11,0.35) 45%, transparent 70%)',
        }}
      />

      {/* Subtle Luminous Radial Grain Vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-35"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(5,4,3,0.92) 100%)',
        }}
      />

      {/* Hyper-Space Flash Flare */}
      <div
        ref={flashRef}
        className="pointer-events-none absolute inset-0 z-[6] bg-[#fffbf0] opacity-0"
      />

      {/* Three.js 3D WebGL Canvas */}
      <div className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center">
        <canvas ref={canvasRef} className="h-full w-full block" />
      </div>
    </div>
  )
}
