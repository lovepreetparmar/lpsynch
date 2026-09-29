import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

type ButtonProps = {
  children: ReactNode
  variant?: ButtonVariant
  className?: string
  to?: string
  href?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: () => void
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-surface font-semibold hover:bg-accent-dim focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
  secondary:
    'border border-border text-ink hover:border-ink-muted hover:bg-surface-muted focus-visible:ring-2 focus-visible:ring-accent',
  ghost: 'text-ink-muted hover:text-ink focus-visible:ring-2 focus-visible:ring-accent',
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none'

export function Button({
  children,
  variant = 'primary',
  className = '',
  to,
  href,
  type = 'button',
  disabled,
  onClick,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}
