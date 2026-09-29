import type { ReactNode } from 'react'

type ContainerProps = {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'header' | 'footer' | 'main'
}

export function Container({ children, className = '', as = 'div' }: ContainerProps) {
  const Tag = as
  return (
    <Tag className={`mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8 ${className}`}>{children}</Tag>
  )
}
