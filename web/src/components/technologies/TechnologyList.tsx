import { useRef } from 'react'
import { technologiesContent, type TechnologyNode } from '@/data/technologies'
import { TechnologyItem, type HoverDirection } from '@/components/technologies/TechnologyItem'
import { getTechnologyVisual } from '@/components/technologies/technologyVisuals'

type TechnologyListProps = {
  activeId: string
  lockedId: string | null
  onLock: (id: string) => void
  onPreview: (id: string | null, dir: HoverDirection) => void
}

export function TechnologyList({ activeId, lockedId, onLock, onPreview }: TechnologyListProps) {
  const listRef = useRef<HTMLDivElement>(null)

  const nav = (id: string, direction: 'prev' | 'next') => {
    const idx = technologiesContent.nodes.findIndex((n) => n.id === id)
    const nextIdx = direction === 'next' ? Math.min(technologiesContent.nodes.length - 1, idx + 1) : Math.max(0, idx - 1)
    const next = technologiesContent.nodes[nextIdx]
    if (next) onLock(next.id)
  }

  return (
    <>
      <div ref={listRef} className="relative hidden min-h-[520px] md:block md:min-h-[580px]" role="presentation">
        {technologiesContent.nodes.map((tech, index) => (
          <TechnologyListItem
            key={tech.id}
            tech={tech}
            index={index}
            activeId={activeId}
            lockedId={lockedId}
            onLock={onLock}
            onPreview={onPreview}
            onArrowNav={(dir) => nav(tech.id, dir)}
          />
        ))}
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-2 md:hidden" role="listbox" aria-label="Technologies">
        {technologiesContent.nodes.map((tech) => {
          const active = tech.id === activeId
          return (
            <button
              key={tech.id}
              type="button"
              role="option"
              aria-selected={active}
              data-cursor-view
              className={`shrink-0 border px-3 py-2 font-mono text-[10px] tracking-widest uppercase transition-colors ${
                active ? 'border-accent text-accent' : 'border-border text-ink-muted'
              }`}
              onClick={() => onLock(tech.id)}
            >
              {tech.label}
            </button>
          )
        })}
      </div>
    </>
  )
}

function TechnologyListItem({
  tech,
  index,
  activeId,
  lockedId,
  onLock,
  onPreview,
  onArrowNav,
}: {
  tech: TechnologyNode
  index: number
  activeId: string
  lockedId: string | null
  onLock: (id: string) => void
  onPreview: (id: string | null, dir: HoverDirection) => void
  onArrowNav: (dir: 'prev' | 'next') => void
}) {
  const visual = getTechnologyVisual(tech.id)
  const dominant = tech.id === activeId
  const recess = !dominant

  return (
    <TechnologyItem
      technology={tech}
      index={index}
      dominant={dominant}
      recess={recess}
      locked={lockedId === tech.id}
      layout={visual.layout}
      onSelect={() => onLock(tech.id)}
      onPreview={(dir) => onPreview(tech.id, dir)}
      onClearPreview={() => onPreview(null, null)}
      onArrowNav={onArrowNav}
    />
  )
}
