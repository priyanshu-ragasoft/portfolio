const placements = {
  right: { x: 12, labelY: -1, noteY: 9, anchor: 'start' },
  left: { x: -12, labelY: -1, noteY: 9, anchor: 'end' },
  up: { x: 0, labelY: -9, noteY: -5, anchor: 'middle' },
  down: { x: 0, labelY: 11, noteY: 18, anchor: 'middle' },
}

export default function JourneyMarker({ pin, label, note, align = 'right' }) {
  const isMini = pin.mini
  const place = placements[align] || placements.right

  return (
    <g data-journey-marker={pin.id} transform={`translate(${pin.x} ${pin.y})`} className="pointer-events-auto">
      <title>{label}</title>
      <g data-marker-scale>
        <circle data-marker-pulse cx="0" cy="0" r={isMini ? 4.5 : 7.5} fill="none" stroke="#C9A15A" strokeWidth="0.6" opacity="0" />
        <circle data-marker-ring cx="0" cy="0" r={isMini ? 3 : 5} fill="none" stroke="#C9A15A" strokeWidth="0.5" opacity={isMini ? 0.6 : 0.8} />
        <circle data-marker-dot cx="0" cy="0" r={isMini ? 1.5 : 2.2} fill="#C9A15A" />
      </g>
      {label ? (
        <text
          data-marker-label
          x={place.x}
          y={note ? place.labelY : 3}
          textAnchor={place.anchor}
          fill={isMini ? '#eddcc4' : '#f4f0e8'}
          fontSize={isMini ? '7' : '9.5'}
          fontWeight={isMini ? '600' : '700'}
          letterSpacing={isMini ? '0.5' : '1.4'}
          className="font-sans uppercase select-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]"
        >
          {label}
        </text>
      ) : null}
      {note ? (
        <text
          x={place.x}
          y={place.noteY}
          textAnchor={place.anchor}
          fill="#C9A15A"
          fontSize="7.5"
          letterSpacing="1"
          className="font-sans uppercase select-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]"
        >
          {note}
        </text>
      ) : null}
    </g>
  )
}
