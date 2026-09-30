import { technologiesContent } from '@/data/technologies'
import { getTechnologyState } from '@/components/system/systemStates'

type SystemStatusProps = {
  boot: number
  bootLabel: string
  activeId: string
  inspectMode: boolean
}

export function SystemStatus({ boot, bootLabel, activeId, inspectMode }: SystemStatusProps) {
  const online = boot >= 0.95
  const state = getTechnologyState(activeId)
  const moduleCount = technologiesContent.nodes.length

  return (
    <aside className="border border-border/80 bg-surface/60 p-4 font-mono text-[10px] tracking-widest uppercase backdrop-blur-sm">
      <p className="text-ink-subtle">LPSynch / System</p>
      <div className="mt-3 space-y-2 text-ink-muted">
        <p>
          Status <span className={online ? 'text-accent' : 'text-ink-subtle'}>{bootLabel}</span>
        </p>
        <p>
          Modules <span className="text-ink">{String(moduleCount).padStart(2, '0')} active</span>
          <span className="ml-1 text-[9px] normal-case text-ink-subtle">(visual)</span>
        </p>
        <p>
          Mode <span className="text-ink">{inspectMode ? 'Inspect' : online ? 'Interactive' : 'Boot'}</span>
        </p>
        <p className="text-[9px] normal-case text-ink-subtle">Layer focus · {state.layer}</p>
      </div>
      <div className="mt-4 space-y-1 border-t border-border/60 pt-3 text-[9px] text-ink-subtle normal-case">
        <p>$ system.status</p>
        <p className="text-accent">&gt; {online ? 'online' : 'initializing…'}</p>
      </div>
    </aside>
  )
}
