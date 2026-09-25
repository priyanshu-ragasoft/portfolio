import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { gsap } from '../animations/gsapConfig'
import loderImg from '../assets/loder/loder.png'

export default function Preloader3D({ onComplete }) {
  const overlayRef = useRef(null)
  const canvasRef = useRef(null)
  const hudRef = useRef(null)
  const circleProgressRef = useRef(null)
  const percentageRef = useRef(null)
  const statusTextRef = useRef(null)
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

    // 3. Ultra-Vibrant Studio & Cinematic Rim Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1)
    scene.add(ambientLight)

    // Key Golden Spotlight (Upper Right)
    const keyLight = new THREE.SpotLight(0xfff1c2, 8.0, 20, Math.PI / 4, 0.4)
    keyLight.position.set(5, 6, 6)
    scene.add(keyLight)

    // Warm Amber Fill Light (Lower Left)
    const amberLight = new THREE.PointLight(0xff9900, 5.5, 14)
    amberLight.position.set(-4, -2, 3)
    scene.add(amberLight)

    // Electric Cyan Cyber Rim Light (Back Rim Glow)
    const cyanLight = new THREE.PointLight(0x00f2fe, 6.0, 12)
    cyanLight.position.set(3, -4, -2)
    scene.add(cyanLight)

    // Magenta Specular Accent Light
    const magentaLight = new THREE.PointLight(0xf43f5e, 3.5, 10)
    magentaLight.position.set(-3, 4, -2)
    scene.add(magentaLight)

    // 4. Master Coin Hierarchy
    const masterGroup = new THREE.Group()
    const coinGroup = new THREE.Group()
    masterGroup.add(coinGroup)
    scene.add(masterGroup)

    // 5. Dual Gyroscopic Orbital Energy Rings
    // Ring 1 (Gold Celestial Outer Ring)
    const ringGeo1 = new THREE.TorusGeometry(1.65, 0.022, 16, 100)
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      emissive: 0xc9a15a,
      emissiveIntensity: 1.5,
      metalness: 0.95,
      roughness: 0.1,
    })
    const orbitRing1 = new THREE.Mesh(ringGeo1, ringMat1)
    masterGroup.add(orbitRing1)

    // Orbiting Satellite Beads on Ring 1
    const beadGeo = new THREE.SphereGeometry(0.065, 16, 16)
    const beadMat = new THREE.MeshBasicMaterial({ color: 0xffffff })
    const bead1 = new THREE.Mesh(beadGeo, beadMat)
    bead1.position.set(1.65, 0, 0)
    orbitRing1.add(bead1)

    const bead2 = new THREE.Mesh(beadGeo, beadMat)
    bead2.position.set(-1.65, 0, 0)
    orbitRing1.add(bead2)

    // Ring 2 (Electric Cyan Inner Counter-Ring)
    const ringGeo2 = new THREE.TorusGeometry(1.42, 0.016, 16, 100)
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      emissive: 0x00f2fe,
      emissiveIntensity: 2.2,
      metalness: 0.9,
      roughness: 0.15,
    })
    const orbitRing2 = new THREE.Mesh(ringGeo2, ringMat2)
    masterGroup.add(orbitRing2)

    // Orbiting Satellite Bead on Ring 2
    const beadMatCyan = new THREE.MeshBasicMaterial({ color: 0x00f2fe })
    const bead3 = new THREE.Mesh(beadGeo, beadMatCyan)
    bead3.position.set(0, 1.42, 0)
    orbitRing2.add(bead3)

    // Ring 3 (Segmented Glowing Dashed Ring)
    const ringGeo3 = new THREE.TorusGeometry(1.88, 0.012, 16, 6)
    const ringMat3 = new THREE.MeshBasicMaterial({
      color: 0xc9a15a,
      transparent: true,
      opacity: 0.45,
      wireframe: true,
    })
    const orbitRing3 = new THREE.Mesh(ringGeo3, ringMat3)
    masterGroup.add(orbitRing3)

    // 6. 3D Sparkling Galaxy / Particle Vortex
    const particleCount = 280
    const particleGeo = new THREE.BufferGeometry()
    const particlePos = new Float32Array(particleCount * 3)
    const particleColors = new Float32Array(particleCount * 3)

    const goldColor = new THREE.Color(0xffd700)
    const cyanColor = new THREE.Color(0x00f2fe)
    const whiteColor = new THREE.Color(0xffffff)

    for (let i = 0; i < particleCount; i++) {
      // Golden Spiral / Galaxy distribution
      const radius = 1.0 + Math.random() * 4.5
      const theta = Math.random() * Math.PI * 2
      const phi = (Math.random() - 0.5) * Math.PI * 0.85

      particlePos[i * 3] = radius * Math.cos(theta) * Math.cos(phi)
      particlePos[i * 3 + 1] = radius * Math.sin(phi) * 0.9
      particlePos[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi)

      // Mix Gold, Cyan and Diamond White particles
      const rand = Math.random()
      const chosenColor = rand < 0.55 ? goldColor : rand < 0.85 ? cyanColor : whiteColor
      particleColors[i * 3] = chosenColor.r
      particleColors[i * 3 + 1] = chosenColor.g
      particleColors[i * 3 + 2] = chosenColor.b
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3))
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3))

    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const particleCloud = new THREE.Points(particleGeo, particleMat)
    scene.add(particleCloud)

    // 7. Coin Construction with Texture
    let coinMesh = null
    const clock = new THREE.Clock()
    const manager = new THREE.LoadingManager()

    // Smooth Continuous Progress State
    const progressState = { value: 0 }
    const circumference = 2 * Math.PI * 52

    const updateProgressUI = (targetProgress, duration = 0.45) => {
      const targetPercent = Math.round(targetProgress * 100)

      gsap.to(progressState, {
        value: targetPercent,
        duration,
        ease: 'power1.out',
        overwrite: 'auto',
        onUpdate: () => {
          const current = Math.round(progressState.value)

          // Smooth SVG circle fill
          if (circleProgressRef.current) {
            const offset = circumference - (current / 100) * circumference
            circleProgressRef.current.style.strokeDashoffset = offset
          }

          // Smooth text counter
          if (percentageRef.current) {
            percentageRef.current.textContent = current.toString().padStart(2, '0')
          }

          // Status label
          if (statusTextRef.current) {
            if (current < 45) statusTextRef.current.textContent = 'CALIBRATING CORE MATRIX'
            else if (current < 85) statusTextRef.current.textContent = 'SYNCHRONIZING 3D ASSETS'
            else statusTextRef.current.textContent = 'EXPERIENCE READY'
          }
        },
      })
    }

    manager.onProgress = (url, itemsLoaded, itemsTotal) => {
      updateProgressUI(itemsLoaded / itemsTotal, 0.4)
    }

    manager.onLoad = () => {
      isFinished = true
      updateProgressUI(1.0, 0.25)
      setTimeout(() => triggerExitTransition(), 180)
    }

    // Load Texture: assets/loder/loder.png
    const textureLoader = new THREE.TextureLoader(manager)
    textureLoader.load(
      loderImg,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace
        texture.generateMipmaps = true
        texture.minFilter = THREE.LinearMipmapLinearFilter

        // Align texture straight up (12 o'clock)
        texture.center.set(0.5, 0.5)
        texture.rotation = Math.PI / 2

        const backTexture = texture.clone()
        backTexture.center.set(0.5, 0.5)
        backTexture.rotation = Math.PI / 2
        backTexture.needsUpdate = true

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

        // Luxury Outer Bevel Ring
        const bevelTorusGeo = new THREE.TorusGeometry(1.23, 0.045, 16, 64)
        const bevelMat = new THREE.MeshStandardMaterial({
          color: 0xfff1c2,
          metalness: 0.95,
          roughness: 0.1,
          emissive: 0xffb833,
          emissiveIntensity: 0.5,
        })
        const bevelRing = new THREE.Mesh(bevelTorusGeo, bevelMat)
        coinGroup.add(bevelRing)

        // Initial Intro Cinematic Pose
        masterGroup.scale.set(0.001, 0.001, 0.001)
        masterGroup.position.set(0, 0.35, -3)
        coinGroup.rotation.set(0.2, -Math.PI * 3, 0)

        // Silky Smooth Intro Timeline
        const introTl = gsap.timeline()
        introTl.to(masterGroup.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 1.1,
          ease: 'power3.out',
        }, 0)

        introTl.to(masterGroup.position, {
          y: 0.35,
          z: 0,
          duration: 1.0,
          ease: 'power3.out',
        }, 0)

        introTl.to(coinGroup.rotation, {
          x: 0.08,
          y: 0,
          z: 0,
          duration: 1.1,
          ease: 'power3.out',
        }, 0)

        if (hudRef.current) {
          introTl.to(hudRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          }, '-=0.5')
        }
      },
      undefined,
      (err) => {
        console.warn('Fallback loading', err)
        isFinished = true
        triggerExitTransition()
      }
    )

    // Smooth asset simulation
    for (let i = 0; i < 3; i++) {
      manager.itemStart(`core_module_${i}`)
      setTimeout(() => manager.itemEnd(`core_module_${i}`), 120 + i * 160)
    }

    // 8. Silky-Smooth Exit Transition
    const triggerExitTransition = () => {
      const exitTl = gsap.timeline({
        onComplete: () => {
          document.documentElement.classList.remove('is-intro')
          document.body.style.overflow = ''
          window.dispatchEvent(new Event('intro:done'))
          setActive(false)
          if (onComplete) onComplete()
        },
      })

      // 1. Softly fade HUD
      if (hudRef.current) {
        exitTl.to(hudRef.current, {
          opacity: 0,
          y: 10,
          duration: 0.3,
          ease: 'power2.in',
        }, 0)
      }

      // 2. Smoothly center position and settle all tilt angles
      exitTl.to(masterGroup.position, {
        x: 0,
        y: 0,
        duration: 0.55,
        ease: 'power2.out',
      }, 0)

      exitTl.to(coinGroup.position, {
        x: 0,
        y: 0,
        duration: 0.55,
        ease: 'power2.out',
      }, 0)

      // 3. Smooth continuous deceleration to exact straight 360° turn
      if (coinGroup) {
        const curY = coinGroup.rotation.y
        const targetY = Math.ceil(curY / (Math.PI * 2)) * (Math.PI * 2) + Math.PI * 2

        exitTl.to(coinGroup.rotation, {
          x: 0,
          y: targetY,
          z: 0,
          duration: 0.55,
          ease: 'power3.out',
        }, 0)

        exitTl.to(masterGroup.scale, {
          x: 1.35,
          y: 1.35,
          z: 1.35,
          duration: 0.55,
          ease: 'power2.out',
        }, 0)
      }

      // 4. Softly dissolve rings & particles
      exitTl.to([ringMat1, ringMat2, ringMat3, particleMat], {
        opacity: 0,
        duration: 0.45,
        ease: 'power2.out',
      }, 0.05)

      // 5. Soft subtle flash glow
      if (flashRef.current) {
        exitTl.to(flashRef.current, {
          opacity: 0.5,
          duration: 0.2,
          ease: 'power2.in',
        }, 0.1)
        exitTl.to(flashRef.current, {
          opacity: 0,
          duration: 0.35,
          ease: 'power2.out',
        })
      }

      // 6. Smooth full overlay fade-out
      if (overlayRef.current) {
        exitTl.to(overlayRef.current, {
          opacity: 0,
          duration: 0.45,
          ease: 'power2.inOut',
        }, '-=0.25')
      }
    }

    // 9. Interactive Mouse Parallax
    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 0.6
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 0.6
    }

    const handleResize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    // 10. Continuous 60FPS Fluid Render Loop
    let spinAngle = 0
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      const delta = clock.getDelta()
      const elapsed = clock.getElapsedTime()

      // Silky mouse lerping
      mouse.x += (mouse.targetX - mouse.x) * 0.04
      mouse.y += (mouse.targetY - mouse.y) * 0.04

      masterGroup.rotation.x = mouse.y * 0.3
      masterGroup.rotation.y = mouse.x * 0.3

      if (coinGroup && !isFinished) {
        spinAngle += delta * 2.2
        coinGroup.rotation.y = spinAngle
        coinGroup.position.y = Math.sin(elapsed * 2.0) * 0.09
        coinGroup.rotation.z = Math.cos(elapsed * 1.2) * 0.04
      }

      // Smooth Gyroscopic Rings
      orbitRing1.rotation.x = Math.PI / 3 + Math.sin(elapsed * 0.7) * 0.15
      orbitRing1.rotation.y = elapsed * 1.0

      orbitRing2.rotation.y = -elapsed * 1.2
      orbitRing2.rotation.z = Math.PI / 4 + Math.cos(elapsed * 0.8) * 0.15

      orbitRing3.rotation.z = elapsed * 0.5
      orbitRing3.rotation.x = -elapsed * 0.3

      // Drifting particles
      if (particleCloud) {
        particleCloud.rotation.y = elapsed * 0.06
        particleCloud.rotation.z = Math.sin(elapsed * 0.4) * 0.04
      }

      // Smooth pulsing lights
      cyanLight.intensity = 5.0 + Math.sin(elapsed * 2.5) * 1.2
      amberLight.intensity = 4.5 + Math.cos(elapsed * 2.0) * 1.0

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
      ringGeo1.dispose()
      ringMat1.dispose()
      ringGeo2.dispose()
      ringMat2.dispose()
      ringGeo3.dispose()
      ringMat3.dispose()
      particleGeo.dispose()
      particleMat.dispose()
      renderer.dispose()
    }
  }, [onComplete])

  if (!active) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050508] overflow-hidden select-none"
      role="status"
      aria-label="Loading experience"
    >
      {/* Background Cyber Grid & Nebula Atmosphere */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, rgba(201, 161, 90, 0.22) 0%, rgba(0, 242, 254, 0.08) 35%, rgba(5, 5, 8, 0.85) 70%, #050508 100%),
            radial-gradient(circle at 80% 20%, rgba(244, 63, 94, 0.12) 0%, transparent 50%)
          `,
        }}
      />

      {/* Cybernetic Grid Matrix Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201, 161, 90, 0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201, 161, 90, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(circle at 50% 50%, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 40%, transparent 80%)',
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

      {/* Futuristic Circular HUD & Progress Status */}
      <div
        ref={hudRef}
        className="pointer-events-none absolute bottom-[6%] left-1/2 z-[3] flex -translate-x-1/2 flex-col items-center gap-4 text-center"
        style={{ opacity: 0, transform: 'translate(-50%, 25px)' }}
      >
        {/* Holographic Circular HUD with Progress Gauge */}
        <div className="relative flex h-28 w-28 items-center justify-center">
          <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 120 120">
            {/* Background Track Circle */}
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="transparent"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="3"
            />
            {/* Outer Accent Tick Ring */}
            <circle
              cx="60"
              cy="60"
              r="56"
              fill="transparent"
              stroke="rgba(201, 161, 90, 0.25)"
              strokeWidth="1"
              strokeDasharray="4 6"
            />
            {/* Animated Active Glowing Progress Circle */}
            <circle
              ref={circleProgressRef}
              cx="60"
              cy="60"
              r="52"
              fill="transparent"
              stroke="url(#goldCyanGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 52}
              strokeDashoffset={2 * Math.PI * 52}
              style={{ filter: 'drop-shadow(0 0 8px #C9A15A)' }}
            />
            <defs>
              <linearGradient id="goldCyanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00F2FE" />
                <stop offset="50%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#FFAE00" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Digital Percentage Counter */}
          <div className="absolute flex flex-col items-center">
            <div className="flex items-baseline">
              <span
                ref={percentageRef}
                className="font-mono text-2xl font-black tracking-tight text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]"
              >
                00
              </span>
              <span className="ml-0.5 font-mono text-xs font-semibold text-[#00F2FE]">%</span>
            </div>
          </div>
        </div>

        {/* Dynamic Status Text & Telemetry Badges */}
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-2 rounded-full border border-[#C9A15A]/30 bg-black/60 px-3 py-0.5 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00F2FE] animate-ping" />
            <span
              ref={statusTextRef}
              className="font-mono text-[0.68rem] tracking-[0.22em] text-[#F5D77F] uppercase font-medium"
            >
              INITIALIZING EXPERIENCE
            </span>
          </div>
          <span className="font-mono text-[0.6rem] tracking-[0.35em] text-white/40 uppercase">
            3D HOLOGRAPHIC ENVIRONMENT
          </span>
        </div>
      </div>
    </div>
  )
}
