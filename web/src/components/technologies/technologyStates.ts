export type TechnologyVisualState = {
  accent: string
  emphasis: string[]
  layers: string[]
  layerSpread: number
  plateScale: number
  coreScale: number
  frameTilt: number
  emissive: number
}

const base: Omit<TechnologyVisualState, 'emphasis' | 'layers'> = {
  accent: '#f1ac2f',
  layerSpread: 0.22,
  plateScale: 1,
  coreScale: 1,
  frameTilt: 0.12,
  emissive: 0.18,
}

export const technologyVisualStates: Record<string, TechnologyVisualState> = {
  react: {
    ...base,
    emphasis: ['INTERFACE', 'COMPONENTS', 'UI'],
    layers: ['INTERFACE', 'COMPONENTS', 'UI'],
    layerSpread: 0.28,
    plateScale: 1.08,
    frameTilt: 0.08,
    emissive: 0.24,
  },
  typescript: {
    ...base,
    emphasis: ['TYPES', 'INTERFACE', 'RUNTIME'],
    layers: ['INTERFACE', 'TYPES', 'RUNTIME'],
    layerSpread: 0.24,
    plateScale: 1.02,
    emissive: 0.2,
  },
  php: {
    ...base,
    emphasis: ['RUNTIME', 'SERVER', 'APPLICATION'],
    layers: ['APPLICATION', 'RUNTIME', 'SERVER'],
    layerSpread: 0.26,
    coreScale: 0.95,
    frameTilt: 0.18,
  },
  dotnet: {
    ...base,
    emphasis: ['APPLICATION', 'RUNTIME', 'SERVICES'],
    layers: ['APPLICATION', 'RUNTIME', 'SERVICES'],
    layerSpread: 0.3,
    plateScale: 1.12,
    coreScale: 1.05,
  },
  node: {
    ...base,
    emphasis: ['RUNTIME', 'API', 'SERVER'],
    layers: ['API', 'RUNTIME', 'SERVER'],
    layerSpread: 0.27,
    frameTilt: 0.14,
    emissive: 0.22,
  },
  mysql: {
    ...base,
    emphasis: ['DATA', 'RELATIONAL', 'STORAGE'],
    layers: ['DATA', 'RELATIONAL', 'STORAGE'],
    layerSpread: 0.2,
    plateScale: 0.98,
    coreScale: 0.9,
    frameTilt: 0.05,
  },
  azure: {
    ...base,
    emphasis: ['INFRA', 'DEPLOY', 'CLOUD'],
    layers: ['INFRA', 'DEPLOY', 'CLOUD'],
    layerSpread: 0.34,
    plateScale: 1.15,
    coreScale: 1.08,
    emissive: 0.26,
  },
}

export function getTechnologyVisualState(id: string): TechnologyVisualState {
  return technologyVisualStates[id] ?? {
    ...base,
    emphasis: ['MODULE'],
    layers: ['INTERFACE', 'RUNTIME', 'DATA'],
  }
}

export function lerpVisualState(
  a: TechnologyVisualState,
  b: TechnologyVisualState,
  t: number,
): TechnologyVisualState {
  const l = (x: number, y: number) => x + (y - x) * t
  return {
    accent: b.accent,
    emphasis: b.emphasis,
    layers: b.layers,
    layerSpread: l(a.layerSpread, b.layerSpread),
    plateScale: l(a.plateScale, b.plateScale),
    coreScale: l(a.coreScale, b.coreScale),
    frameTilt: l(a.frameTilt, b.frameTilt),
    emissive: l(a.emissive, b.emissive),
  }
}
