import { technologiesContent } from '@/data/technologies'

export type SystemLayer = 'interface' | 'application' | 'runtime' | 'data' | 'infrastructure'

export interface TechnologyVisualState {
  layer: SystemLayer
  emphasis: string[]
  modules: string[]
  /** Which conceptual stack layer dominates visually (0–3 index into stack) */
  focusStack: number
  spread: number
  outerExpand: number
  emissive: number
}

const defaults: TechnologyVisualState = {
  layer: 'application',
  emphasis: ['MODULE'],
  modules: ['application'],
  focusStack: 1,
  spread: 0.22,
  outerExpand: 1,
  emissive: 0.18,
}

export const layerDisplay: Record<SystemLayer, string> = {
  interface: 'Interface',
  application: 'Application',
  runtime: 'Runtime',
  data: 'Data',
  infrastructure: 'Infrastructure',
}

export const stackLayerOrder: SystemLayer[] = ['interface', 'application', 'data', 'infrastructure']

export const technologyStates: Record<string, TechnologyVisualState> = {
  react: {
    layer: 'interface',
    emphasis: ['UI', 'COMPONENTS', 'INTERACTION'],
    modules: ['interface'],
    focusStack: 0,
    spread: 0.2,
    outerExpand: 1,
    emissive: 0.28,
  },
  typescript: {
    layer: 'interface',
    emphasis: ['TYPES', 'INTERFACE', 'CONTRACTS'],
    modules: ['interface'],
    focusStack: 0,
    spread: 0.18,
    outerExpand: 1,
    emissive: 0.22,
  },
  php: {
    layer: 'runtime',
    emphasis: ['SERVER', 'APPLICATION', 'RUNTIME'],
    modules: ['application', 'runtime'],
    focusStack: 1,
    spread: 0.24,
    outerExpand: 1,
    emissive: 0.2,
  },
  dotnet: {
    layer: 'application',
    emphasis: ['APPLICATION', 'SERVICES', 'RUNTIME'],
    modules: ['application'],
    focusStack: 1,
    spread: 0.26,
    outerExpand: 1.02,
    emissive: 0.21,
  },
  node: {
    layer: 'runtime',
    emphasis: ['API', 'SERVER', 'RUNTIME'],
    modules: ['runtime', 'application'],
    focusStack: 1,
    spread: 0.25,
    outerExpand: 1,
    emissive: 0.24,
  },
  mysql: {
    layer: 'data',
    emphasis: ['DATA', 'RELATIONAL', 'STORAGE'],
    modules: ['data'],
    focusStack: 2,
    spread: 0.16,
    outerExpand: 0.98,
    emissive: 0.19,
  },
  azure: {
    layer: 'infrastructure',
    emphasis: ['CLOUD', 'DEPLOYMENT', 'DELIVERY'],
    modules: ['infrastructure'],
    focusStack: 3,
    spread: 0.3,
    outerExpand: 1.22,
    emissive: 0.26,
  },
}

export function getTechnologyState(id: string): TechnologyVisualState {
  return technologyStates[id] ?? defaults
}

export type SystemLayerOffsets = {
  interface: number
  application: number
  runtime: number
  data: number
  infrastructure: number
  outerScale: number
  emissive: number
}

export function resolveLayerOffsets(activeId: string, inspectMode: boolean, inspectLayer: SystemLayer | null): SystemLayerOffsets {
  const state = getTechnologyState(activeId)
  const inspectSpread = inspectMode ? 0.38 : 0
  const base = {
    interface: 0.32,
    application: 0.08,
    runtime: -0.06,
    data: -0.28,
    infrastructure: -0.48,
    outerScale: state.outerExpand,
    emissive: state.emissive,
  }

  const focus = state.focusStack
  const forward = 0.42
  const back = -0.12

  if (focus === 0) {
    base.interface += forward
    base.application += back
    base.data += back * 1.2
  } else if (focus === 1) {
    base.application += forward
    base.runtime += forward * 0.6
    base.interface += back
    base.data += back
  } else if (focus === 2) {
    base.data += forward
    base.application += back
    base.interface += back * 1.3
  } else {
    base.infrastructure += forward * 0.85
    base.outerScale = state.outerExpand
    base.interface += back * 0.5
    base.data += back * 0.5
  }

  if (inspectMode) {
    const layerBoost = (layer: SystemLayer) => (inspectLayer === layer ? 0.12 : 0)
    base.interface += inspectSpread + layerBoost('interface')
    base.application += inspectSpread * 0.65 + layerBoost('application')
    base.runtime += inspectSpread * 0.45 + layerBoost('runtime')
    base.data += inspectSpread * 0.35 + layerBoost('data')
    base.infrastructure += inspectSpread * 0.2 + layerBoost('infrastructure')
  }

  return base
}

export function lerpOffsets(a: SystemLayerOffsets, b: SystemLayerOffsets, t: number): SystemLayerOffsets {
  const l = (x: number, y: number) => x + (y - x) * t
  return {
    interface: l(a.interface, b.interface),
    application: l(a.application, b.application),
    runtime: l(a.runtime, b.runtime),
    data: l(a.data, b.data),
    infrastructure: l(a.infrastructure, b.infrastructure),
    outerScale: l(a.outerScale, b.outerScale),
    emissive: l(a.emissive, b.emissive),
  }
}

export function technologiesInLayer(layer: SystemLayer): typeof technologiesContent.nodes {
  return technologiesContent.nodes.filter((n) => getTechnologyState(n.id).layer === layer)
}

export const bootMessages = [
  'System offline',
  'System initializing',
  'Loading interface',
  'Connecting runtime',
  'Connecting data',
  'Connecting infrastructure',
  'System online',
] as const
