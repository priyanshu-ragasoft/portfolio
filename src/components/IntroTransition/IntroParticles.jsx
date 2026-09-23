export default function IntroParticles({ particles }) {
  return particles.map((particle) => (
    <span
      key={particle.id}
      data-intro-particle
      data-angle={particle.angle}
      data-lat={particle.lat}
      data-radius={particle.radius}
      data-spin={particle.spin}
      data-alpha={particle.alpha}
      aria-hidden="true"
      className="absolute top-1/2 left-1/2 block rounded-full will-change-transform"
      style={{
        width: particle.size,
        height: particle.size,
        background: particle.color,
        opacity: 0,
      }}
    />
  ))
}
