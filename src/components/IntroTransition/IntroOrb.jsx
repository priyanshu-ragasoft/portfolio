export default function IntroOrb() {
  return (
    <div
      data-intro-orb
      className="pointer-events-none absolute top-1/2 left-1/2 aspect-square w-[96vmin]"
      style={{ transformStyle: 'preserve-3d', opacity: 0 }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible">
        <circle
          cx="100"
          cy="100"
          r="97"
          fill="none"
          stroke="rgb(201 161 90 / 0.16)"
          strokeWidth="2.4"
        />
        <circle
          cx="100"
          cy="100"
          r="96"
          fill="none"
          stroke="rgb(201 161 90 / 0.45)"
          strokeWidth="0.45"
        />
        <circle
          cx="100"
          cy="100"
          r="86"
          fill="none"
          stroke="rgb(201 161 90 / 0.24)"
          strokeWidth="0.35"
          strokeDasharray="1.1 3.4"
        />
      </svg>
    </div>
  )
}
