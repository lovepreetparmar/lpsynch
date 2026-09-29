import type { ReactNode } from 'react'
import { Container } from '@/components/Container/Container'
import type { SiteState } from '@/systems/site/site.types'

type SectionProps = {
  children: ReactNode
  id?: string
  flowSection?: SiteState
  className?: string
  containerClassName?: string
  variant?: 'dark' | 'light' | 'muted'
}

const variantClasses = {
  dark: 'bg-surface text-ink',
  light: 'bg-paper text-paper-ink',
  muted: 'bg-surface-elevated text-ink border-y border-border-subtle',
}

export function Section({
  children,
  id,
  flowSection,
  className = '',
  containerClassName = '',
  variant = 'dark',
}: SectionProps) {
  return (
    <section
      id={id}
      data-flow-section={flowSection}
      className={`py-20 md:py-28 lg:py-32 ${variantClasses[variant]} ${className}`}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}
