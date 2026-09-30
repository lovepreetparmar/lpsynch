type PerspectiveGridProps = {
  className?: string
  parallax?: number
}

export function PerspectiveGrid({ className = '', parallax = 0 }: PerspectiveGridProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden opacity-[0.14] ${className}`}
      aria-hidden
      style={{
        transform: `perspective(900px) rotateX(62deg) translateY(${parallax}px)`,
        transformOrigin: '50% 0%',
      }}
    >
      <div
        className="absolute inset-[-50%] h-[200%] w-[200%]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(255 255 255 / 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(255 255 255 / 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />
    </div>
  )
}
