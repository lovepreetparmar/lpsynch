type GlyphId =
  | 'digital-marketing'
  | 'website-development'
  | 'application-development'
  | 'custom-software-development'
  | 'brand-identity'
  | 'domain-and-hosting-management'

export function ServiceGlyph({ slug, active }: { slug: string; active?: boolean }) {
  const stroke = active ? 'var(--color-accent)' : 'currentColor'
  const common = 'h-10 w-10 text-ink-muted'

  switch (slug as GlyphId) {
    case 'digital-marketing':
      return (
        <svg className={common} viewBox="0 0 40 40" aria-hidden>
          <circle cx="20" cy="20" r="6" fill="none" stroke={stroke} strokeWidth="1" />
          <circle cx="20" cy="20" r="12" fill="none" stroke={stroke} strokeWidth="0.5" opacity="0.6" />
          <circle cx="20" cy="20" r="18" fill="none" stroke={stroke} strokeWidth="0.5" opacity="0.3" />
        </svg>
      )
    case 'website-development':
      return (
        <svg className={common} viewBox="0 0 40 40" aria-hidden>
          <rect x="8" y="10" width="24" height="20" fill="none" stroke={stroke} strokeWidth="1" />
          <line x1="8" y1="16" x2="32" y2="16" stroke={stroke} strokeWidth="0.5" />
        </svg>
      )
    case 'application-development':
      return (
        <svg className={common} viewBox="0 0 40 40" aria-hidden>
          <rect x="12" y="8" width="16" height="24" rx="2" fill="none" stroke={stroke} strokeWidth="1" />
          <rect x="14" y="12" width="12" height="3" fill={stroke} opacity="0.5" />
          <rect x="14" y="18" width="12" height="3" fill={stroke} opacity="0.35" />
        </svg>
      )
    case 'custom-software-development':
      return (
        <svg className={common} viewBox="0 0 40 40" aria-hidden>
          <text x="10" y="26" fontSize="16" fill={stroke} fontFamily="monospace">{'{'}</text>
          <text x="26" y="26" fontSize="16" fill={stroke} fontFamily="monospace">{'}'}</text>
        </svg>
      )
    case 'brand-identity':
      return (
        <svg className={common} viewBox="0 0 40 40" aria-hidden>
          <polygon points="20,8 32,32 8,32" fill="none" stroke={stroke} strokeWidth="1" />
        </svg>
      )
    default:
      return (
        <svg className={common} viewBox="0 0 40 40" aria-hidden>
          <circle cx="12" cy="20" r="4" fill={stroke} />
          <circle cx="28" cy="20" r="4" fill="none" stroke={stroke} strokeWidth="1" />
          <line x1="16" y1="20" x2="24" y2="20" stroke={stroke} strokeWidth="1" />
        </svg>
      )
  }
}
