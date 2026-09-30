import type { TechnologyNode } from '@/data/technologies'
import { getTechnologyVisualState } from '@/components/technologies/technologyStates'

type TechnologyPreviewProps = {
  technology: TechnologyNode | null
  direction: 'left' | 'right' | 'top' | 'bottom' | null
}

export function TechnologyPreview({ technology, direction }: TechnologyPreviewProps) {
  if (!technology || !direction) return null

  const visual = getTechnologyVisualState(technology.id)
  const origin =
    direction === 'left'
      ? 'origin-left -translate-x-2'
      : direction === 'right'
        ? 'origin-right translate-x-2'
        : direction === 'top'
          ? 'origin-top -translate-y-2'
          : 'origin-bottom translate-y-2'

  return (
    <div
      className={`pointer-events-none absolute z-20 hidden w-44 border border-border bg-surface/95 p-3 backdrop-blur-md transition-transform duration-300 md:block ${origin} left-full top-1/2 ml-4 -translate-y-1/2`}
      aria-hidden
    >
      <p className="font-mono text-[9px] tracking-widest text-accent uppercase">{technology.label}</p>
      <p className="mt-1 font-mono text-[9px] text-ink-subtle uppercase">{technology.category}</p>
      <div className="mt-3 space-y-1">
        {visual.emphasis.slice(0, 3).map((e) => (
          <div key={e} className="h-1 bg-accent/30" style={{ width: `${40 + e.length * 4}%` }} />
        ))}
      </div>
    </div>
  )
}
