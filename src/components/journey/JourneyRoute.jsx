export default function JourneyRoute({ route }) {
  return (
    <g data-journey-route={route.id} className="pointer-events-auto">
      <path d={route.d} fill="none" stroke="transparent" strokeWidth="14" />
      <path
        data-route-draw
        d={route.d}
        fill="none"
        stroke="#C9A15A"
        strokeWidth="1.35"
        strokeLinecap="round"
        filter="url(#journey-glow)"
      />
      <circle data-route-traveler r="2.4" cx="0" cy="0" fill="#f7f1e4" opacity="0" />
    </g>
  )
}
