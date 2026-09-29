import { Reveal } from '@/components/Reveal/Reveal'

type PageHeaderProps = {
  title: string
  subtitle?: string
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className="border-b border-border-subtle pt-28 pb-16 md:pt-36 md:pb-20">
      <Reveal>
        <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">LPSynch</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-balance md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle ? <p className="mt-6 max-w-2xl text-lg text-ink-muted text-pretty">{subtitle}</p> : null}
      </Reveal>
    </header>
  )
}
