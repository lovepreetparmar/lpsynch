import type { TechnologyNode } from '@/data/technologies'

import { useReducedMotion } from '@/hooks/useReducedMotion'

export type HoverDirection = 'left' | 'right' | 'top' | 'bottom' | null

type TechnologyItemProps = {
  technology: TechnologyNode
  index: number
  dominant: boolean
  recess: boolean
  locked: boolean
  layout: string
  onSelect: () => void
  onPreview: (dir: HoverDirection) => void
  onClearPreview: () => void
  onArrowNav?: (dir: 'prev' | 'next') => void
}

function directionFromEvent(e: React.MouseEvent<HTMLButtonElement>): HoverDirection {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  if (x < rect.width * 0.28) return 'left'
  if (x > rect.width * 0.72) return 'right'
  if (y < rect.height * 0.4) return 'top'
  return 'bottom'
}

export function TechnologyItem({
  technology,
  index,
  dominant,
  recess,
  locked,
  layout,
  onSelect,
  onPreview,
  onClearPreview,
  onArrowNav,
}: TechnologyItemProps) {
  const reduced = useReducedMotion()
  const num = String(index + 1).padStart(2, '0')
  const categoryShort = technology.category.split('/')[0]?.trim() ?? technology.category

  return (
    <div className={`absolute z-10 max-w-[min(90vw,420px)] ${layout}`}>
      <button
        type="button"
        data-cursor-view
        aria-pressed={locked}
        className={`group block text-left outline-none transition-[transform,opacity,filter] duration-500 ease-out focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-surface-muted ${
          recess ? `opacity-[0.38] ${reduced ? '' : 'blur-[0.4px] md:blur-[0.6px]'}` : 'opacity-100'
        } ${dominant ? 'z-20' : 'z-10'}`}
        onClick={onSelect}
        onMouseEnter={(e) => onPreview(directionFromEvent(e))}
        onMouseLeave={onClearPreview}
        onFocus={() => onPreview(null)}
        onBlur={onClearPreview}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault()
            onArrowNav?.('next')
          }
          if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault()
            onArrowNav?.('prev')
          }
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onSelect()
          }
        }}
      >
        <span
          className={`block font-semibold uppercase leading-[0.9] tracking-tight transition-all duration-500 ${
            dominant
              ? 'text-[clamp(2.75rem,11vw,7.5rem)] text-ink'
              : 'text-[clamp(1.35rem,4.5vw,2.75rem)] text-ink-muted group-hover:text-ink group-hover:opacity-100'
          }`}
        >
          {technology.label}
        </span>
        {dominant ? (
          <span className="mt-2 block font-mono text-[10px] tracking-[0.35em] text-accent uppercase md:text-xs">
            {num} / {categoryShort}
          </span>
        ) : null}
      </button>
    </div>
  )
}
