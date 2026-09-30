import { layerDisplay, stackLayerOrder, technologiesInLayer, type SystemLayer } from '@/components/system/systemStates'

type TechnologyInspectorProps = {
  inspectMode: boolean
  inspectLayer: SystemLayer | null
  onToggleInspect: () => void
  onSelectLayer: (layer: SystemLayer | null) => void
}

export function TechnologyInspector({
  inspectMode,
  inspectLayer,
  onToggleInspect,
  onSelectLayer,
}: TechnologyInspectorProps) {
  return (
    <div className="mt-4 flex flex-col gap-4 md:mt-0">
      <button
        type="button"
        className={`w-fit border px-4 py-2 font-mono text-[10px] tracking-widest uppercase transition-colors ${
          inspectMode ? 'border-accent text-accent' : 'border-border text-ink-muted hover:text-ink'
        }`}
        aria-pressed={inspectMode}
        onClick={onToggleInspect}
      >
        Inspect system
      </button>
      {inspectMode ? (
        <div className="flex flex-wrap gap-2" role="group" aria-label="System layers">
          <button
            type="button"
            className={`border px-3 py-1.5 font-mono text-[9px] tracking-widest uppercase ${
              inspectLayer === null ? 'border-accent text-accent' : 'border-border text-ink-subtle'
            }`}
            onClick={() => onSelectLayer(null)}
          >
            All
          </button>
          {stackLayerOrder.map((layer) => (
            <button
              key={layer}
              type="button"
              className={`border px-3 py-1.5 font-mono text-[9px] tracking-widest uppercase ${
                inspectLayer === layer ? 'border-accent text-accent' : 'border-border text-ink-subtle'
              }`}
              onClick={() => onSelectLayer(layer)}
            >
              {layerDisplay[layer]}
            </button>
          ))}
        </div>
      ) : null}
      {inspectMode && inspectLayer ? (
        <ul className="space-y-1 border-l border-border pl-4">
          {technologiesInLayer(inspectLayer).map((t) => (
            <li key={t.id} className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
              {t.label}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
