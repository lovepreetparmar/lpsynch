import { SplitText } from '@/components/motion/SplitText'

type EditorialPageHeroProps = {
  label: string
  title: string
  supporting?: string
}

export function EditorialPageHero({ label, title, supporting }: EditorialPageHeroProps) {
  return (
    <header className="border-b border-border-subtle pb-12 pt-28 md:pb-16 md:pt-36">
      <p className="font-mono text-xs tracking-[0.35em] text-accent uppercase">{label}</p>
      <h1 className="mt-6 max-w-4xl text-4xl font-semibold uppercase leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
        <SplitText as="span" className="block bg-surface/80" mode="words">
          {title}
        </SplitText>
      </h1>
      {supporting ? (
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted">{supporting}</p>
      ) : null}
    </header>
  )
}
