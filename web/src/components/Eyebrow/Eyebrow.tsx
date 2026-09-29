type EyebrowProps = {
  children: string
  className?: string
}

export function Eyebrow({ children, className = '' }: EyebrowProps) {
  return (
    <p
      className={`font-mono text-xs font-medium tracking-[0.2em] text-accent uppercase ${className}`}
    >
      {children}
    </p>
  )
}
