import { BRAND } from '@/components/brand/brandColors'

export type LPSynchLogoProps = {
  variant?: 'full' | 'monogram'
  theme?: 'dark' | 'light'
  size?: 'sm' | 'md' | 'lg'
  showTagline?: boolean
  className?: string
  title?: string
}

const sizeClass = {
  sm: { mono: 'h-7', full: 'h-7 max-h-7' },
  md: { mono: 'h-8', full: 'h-9 max-h-9' },
  lg: { mono: 'h-10', full: 'h-11 max-h-11' },
} as const

/** Approved raster logos — web/public/brand/ (from hostinger-deploy/logos) */
function logoSrc(variant: 'full' | 'monogram', theme: 'dark' | 'light', _showTagline: boolean): string {
  if (variant === 'monogram') {
    return theme === 'dark' ? '/brand/lpsynch-monogram-dark.png' : '/brand/lpsynch-monogram-light.png'
  }
  if (theme === 'dark') {
    return '/brand/lpsynch-full-dark.png'
  }
  return '/brand/lpsynch-full-light.png'
}

export function LPSynchLogo({
  variant = 'full',
  theme = 'dark',
  size = 'md',
  showTagline = false,
  className = '',
  title = 'LPSynch',
}: LPSynchLogoProps) {
  const dim = sizeClass[size]
  const src = logoSrc(variant, theme, showTagline)
  const heightClass = variant === 'monogram' ? dim.mono : dim.full

  return (
    <img
      src={src}
      alt={title}
      className={`block w-auto shrink-0 object-contain object-left transition-opacity duration-300 hover:opacity-90 ${heightClass} ${className}`}
      decoding="async"
    />
  )
}

export { BRAND }
