/** Decorative workbench readouts — DOM-only modules beside the canvas */
export function SystemModuleStrip() {
  return (
    <div className="pointer-events-none hidden font-mono text-[9px] tracking-widest text-ink-subtle uppercase lg:block">
      <div className="space-y-3 border-l border-border/50 pl-4">
        <div>
          <p>Build</p>
          <p className="mt-1 text-accent">Ready</p>
        </div>
        <div>
          <p>Runtime</p>
          <p className="mt-1 text-ink-muted">Active</p>
        </div>
        <div>
          <p>Data</p>
          <p className="mt-1 text-ink-muted">Connected</p>
        </div>
      </div>
    </div>
  )
}
