import { technologiesContent } from '@/data/technologies'
type TechnologyFallbackProps = {
  technologyId: string
  inspectMode: boolean
  emphasis: string[]
  layers: string[]
}

export function TechnologyFallback({ technologyId, inspectMode, emphasis, layers }: TechnologyFallbackProps) {
  const tech = technologiesContent.nodes.find((n) => n.id === technologyId)

  return (
    <div className="flex h-full min-h-[280px] flex-col items-center justify-center border border-border bg-surface/80 p-8 text-center md:min-h-[420px]">
      <p className="font-mono text-[10px] tracking-widest text-ink-subtle uppercase">Module preview</p>
      <p className="mt-4 text-2xl font-semibold uppercase tracking-tight text-ink md:text-3xl">{tech?.label ?? 'Technology'}</p>
      <p className="mt-2 font-mono text-xs tracking-widest text-accent uppercase">{tech?.category}</p>
      <div className="mt-8 flex flex-col gap-2">
        {(inspectMode ? layers : emphasis).map((line) => (
          <span
            key={line}
            className="mx-auto block w-full max-w-xs border border-border/80 bg-surface-muted/50 px-4 py-2 font-mono text-[10px] tracking-[0.2em] text-ink-muted uppercase"
          >
            {line}
          </span>
        ))}
      </div>
      {tech ? <p className="mt-6 max-w-sm text-sm text-ink-muted">{tech.detail}</p> : null}
      <p className="mt-4 font-mono text-[9px] text-ink-subtle uppercase">WebGL unavailable — static preview</p>
    </div>
  )
}
