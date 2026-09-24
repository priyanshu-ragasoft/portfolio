const placements = {
  right: { x: 26, labelY: 0, noteY: 13, anchor: 'start' },
  left: { x: -26, labelY: 0, noteY: 13, anchor: 'end' },
  up: { x: 0, labelY: -22, noteY: -10, anchor: 'middle' },
  down: { x: 0, labelY: 20, noteY: 32, anchor: 'middle' },
}

export default function JourneyMarker({ pin, label, note, align = 'right' }) {
  const place = placements[align] || placements.right
  return (
    <g data-journey-marker={pin.id} transform={`translate(${pin.x} ${pin.y})`} className="pointer-events-auto">
      <g data-marker-scale>
        <circle data-marker-pulse cx="0" cy="0" r="8" fill="none" stroke="#C9A15A" strokeWidth="0.7" opacity="0" />
        <circle data-marker-ring cx="0" cy="0" r="5.5" fill="none" stroke="#C9A15A" strokeWidth="0.6" opacity="0.7" />
        <circle data-marker-dot cx="0" cy="0" r="2.4" fill="#C9A15A" />
      </g>
      <text
        data-marker-label
        x={place.x}
        y={note ? place.labelY : 4}
        textAnchor={place.anchor}
        fill="#f4f0e8"
        fontSize="11"
        letterSpacing="1.8"
        className="font-sans uppercase"
      >
        {label}
      </text>
      {note ? (
        <text
          x={place.x}
          y={place.noteY}
          textAnchor={place.anchor}
          fill="#C9A15A"
          fontSize="8.5"
          letterSpacing="1.2"
          className="font-sans uppercase"
        >
          {note}
        </text>
      ) : null}
    </g>
  )
}
