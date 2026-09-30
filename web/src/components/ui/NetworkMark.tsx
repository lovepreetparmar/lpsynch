type NetworkMarkProps = {
  className?: string
  animate?: boolean
}

/** Decorative SVG — not informational; labels live in HTML elsewhere */
export function NetworkMark({ className = '', animate = true }: NetworkMarkProps) {
  return (
    <svg
      viewBox="0 0 120 80"
      className={`text-accent ${animate ? 'opacity-80' : 'opacity-50'} ${className}`}
      aria-hidden
    >
      <circle cx="60" cy="40" r="6" fill="currentColor" opacity="0.9" />
      <circle cx="60" cy="40" r="14" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
      {[
        [60, 12],
        [96, 28],
        [96, 52],
        [60, 68],
        [24, 52],
        [24, 28],
      ].map(([x, y], i) => (
        <g key={i}>
          <line x1="60" y1="40" x2={x} y2={y} stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
          <circle cx={x} cy={y} r="3" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
        </g>
      ))}
    </svg>
  )
}
