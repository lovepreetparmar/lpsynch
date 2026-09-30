import { technologiesContent } from '@/data/technologies'
import { getTechnologyVisualState } from '@/components/technologies/technologyStates'

type TechnologyDetailsProps = {
  technologyId: string
  inspectMode: boolean
}

export function TechnologyDetails({ technologyId, inspectMode }: TechnologyDetailsProps) {
  const tech = technologiesContent.nodes.find((n) => n.id === technologyId)
  const visual = getTechnologyVisualState(technologyId)
  const related = tech?.connections
    .map((id) => technologiesContent.nodes.find((n) => n.id === id))
    .filter(Boolean)

  if (!tech) return null

  return (
    <div className="mt-6 border-t border-border pt-6 md:mt-0 md:border-t-0 md:pt-0">
      <p className="font-mono text-[10px] tracking-widest text-ink-subtle uppercase">Selected</p>
      <p className="mt-2 text-2xl font-semibold uppercase tracking-tight">{tech.label}</p>
      <p className="mt-1 font-mono text-xs tracking-widest text-accent uppercase">{tech.category}</p>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-muted">{tech.detail}</p>

      {inspectMode ? (
        <div className="mt-6 space-y-2">
          <p className="font-mono text-[10px] tracking-widest text-ink-subtle uppercase">Layers (conceptual)</p>
          {visual.layers.map((layer, i) => (
            <div key={layer} className="flex items-center gap-3 font-mono text-[10px] tracking-widest text-ink-muted uppercase">
              <span className="text-accent">{String(i + 1).padStart(2, '0')}</span>
              {layer}
            </div>
          ))}
          <p className="text-[10px] text-ink-subtle">Illustration only — not a project architecture claim.</p>
        </div>
      ) : null}

      {related && related.length > 0 ? (
        <div className="mt-6">
          <p className="font-mono text-[10px] tracking-widest text-ink-subtle uppercase">Related</p>
          <ul className="mt-2 space-y-1">
            {related.map((r) =>
              r ? (
                <li key={r.id} className="text-sm text-ink-muted">
                  {r.label}
                </li>
              ) : null,
            )}
          </ul>
        </div>
      ) : null}
    </div>
  )
}
