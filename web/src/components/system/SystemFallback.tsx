import { technologiesContent } from '@/data/technologies'
import {
  getTechnologyState,
  layerDisplay,
  stackLayerOrder,
  type SystemLayer,
} from '@/components/system/systemStates'

type SystemFallbackProps = {
  activeId: string
  inspectMode: boolean
  inspectLayer: SystemLayer | null
  boot: number
}

export function SystemFallback({ activeId, inspectMode, inspectLayer, boot }: SystemFallbackProps) {
  const tech = technologiesContent.nodes.find((n) => n.id === activeId)
  const state = getTechnologyState(activeId)
  const gap = inspectMode ? 'gap-3' : 'gap-0'

  return (
    <div
      className="flex h-full min-h-[300px] flex-col justify-center border border-border bg-surface/90 p-6 md:min-h-[440px] md:p-10"
      style={{ opacity: 0.35 + boot * 0.65 }}
    >
      <p className="font-mono text-[10px] tracking-[0.3em] text-ink-subtle uppercase">LPSynch / System</p>
      <div className={`mt-6 flex flex-col ${gap} transition-all duration-700`}>
        {stackLayerOrder.map((layer) => {
          const active = state.layer === layer || state.modules.includes(layer)
          const inspectActive = inspectLayer === layer
          return (
            <div
              key={layer}
              className={`border px-4 py-3 font-mono text-[10px] tracking-[0.2em] uppercase transition-all ${
                inspectActive
                  ? 'border-accent bg-accent/10 text-accent'
                  : active
                    ? 'border-accent/60 text-ink'
                    : 'border-border/70 text-ink-subtle'
              }`}
            >
              {layerDisplay[layer]}
            </div>
          )
        })}
      </div>
      {tech ? (
        <div className="mt-8 border-t border-border pt-6">
          <p className="text-xl font-semibold uppercase tracking-tight">{tech.label}</p>
          <p className="mt-1 font-mono text-xs text-accent uppercase">{layerDisplay[state.layer]}</p>
          <p className="mt-3 text-sm text-ink-muted">{tech.detail}</p>
        </div>
      ) : null}
      <p className="mt-6 font-mono text-[9px] text-ink-subtle uppercase">Static system diagram</p>
    </div>
  )
}
