/** Visual presets for the shared Craft object — morph via lerp, not mesh morphing */

export type CraftVisualState = {
  groupRotation: [number, number, number]
  groupScale: number
  shellScale: number
  coreScale: number
  ringScale: number
  layerSpread: number
  glassOpacity: number
  metalness: number
  roughness: number
  emissiveIntensity: number
}

export const craftDefaultState: CraftVisualState = {
  groupRotation: [0.15, 0, 0.08],
  groupScale: 1,
  shellScale: 1.05,
  coreScale: 1,
  ringScale: 1,
  layerSpread: 0,
  glassOpacity: 0.35,
  metalness: 0.85,
  roughness: 0.22,
  emissiveIntensity: 0.15,
}

/** Hero scroll chapters — closed → layers → structure → open */
export const heroChapterStates: CraftVisualState[] = [
  {
    ...craftDefaultState,
    layerSpread: 0,
    shellScale: 1,
    groupRotation: [0.1, 0, 0],
  },
  {
    ...craftDefaultState,
    layerSpread: 0.35,
    shellScale: 1.08,
    groupRotation: [0.2, 0.4, 0.05],
  },
  {
    ...craftDefaultState,
    layerSpread: 0.65,
    shellScale: 1.12,
    coreScale: 0.85,
    groupRotation: [0.35, 0.8, 0.1],
  },
  {
    ...craftDefaultState,
    layerSpread: 0.95,
    shellScale: 1.18,
    coreScale: 0.7,
    ringScale: 1.15,
    groupRotation: [0.45, 1.2, 0.12],
    emissiveIntensity: 0.28,
  },
]

const base = craftDefaultState

/** One object, many states — keyed by verified service slug */
export const serviceVisualStates: Record<string, CraftVisualState> = {
  'digital-marketing': {
    ...base,
    groupScale: 0.95,
    groupRotation: [0, 0.2, 0],
    roughness: 0.35,
    emissiveIntensity: 0.22,
  },
  'website-development': {
    ...base,
    layerSpread: 0.5,
    groupRotation: [0.25, 0.5, 0],
    shellScale: 1.1,
  },
  'application-development': {
    ...base,
    groupScale: 1.05,
    groupRotation: [0.5, 0.3, 0.15],
    layerSpread: 0.4,
  },
  'custom-software-development': {
    ...base,
    layerSpread: 0.75,
    ringScale: 1.2,
    groupRotation: [0.3, 1, 0.08],
  },
  'brand-identity': {
    ...base,
    metalness: 0.95,
    roughness: 0.12,
    emissiveIntensity: 0.35,
    glassOpacity: 0.5,
  },
  'domain-and-hosting-management': {
    ...base,
    layerSpread: 0.55,
    ringScale: 1.35,
    groupRotation: [0.15, 1.6, 0.05],
    groupScale: 0.9,
  },
}

export const processVisualStates: CraftVisualState[] = [
  { ...base, layerSpread: 0.9, groupScale: 0.85, coreScale: 0.6, groupRotation: [0.6, 0.2, 0.2] },
  { ...base, layerSpread: 0.45, shellScale: 1.08, groupRotation: [0.25, 0.6, 0.05] },
  { ...base, layerSpread: 0.15, groupScale: 1.05, groupRotation: [0.15, 0.9, 0] },
  { ...base, layerSpread: 0, metalness: 0.92, roughness: 0.08, emissiveIntensity: 0.3 },
]

export function resolveCraftState(
  mode: 'hero' | 'service' | 'process' | 'idle',
  index: number,
  serviceSlug?: string,
): CraftVisualState {
  if (mode === 'hero') return heroChapterStates[Math.min(heroChapterStates.length - 1, Math.max(0, index))] ?? base
  if (mode === 'service' && serviceSlug) return serviceVisualStates[serviceSlug] ?? base
  if (mode === 'process') return processVisualStates[Math.min(processVisualStates.length - 1, Math.max(0, index))] ?? base
  return base
}

export function lerpCraftState(a: CraftVisualState, b: CraftVisualState, t: number): CraftVisualState {
  const l = (x: number, y: number) => x + (y - x) * t
  return {
    groupRotation: [
      l(a.groupRotation[0], b.groupRotation[0]),
      l(a.groupRotation[1], b.groupRotation[1]),
      l(a.groupRotation[2], b.groupRotation[2]),
    ],
    groupScale: l(a.groupScale, b.groupScale),
    shellScale: l(a.shellScale, b.shellScale),
    coreScale: l(a.coreScale, b.coreScale),
    ringScale: l(a.ringScale, b.ringScale),
    layerSpread: l(a.layerSpread, b.layerSpread),
    glassOpacity: l(a.glassOpacity, b.glassOpacity),
    metalness: l(a.metalness, b.metalness),
    roughness: l(a.roughness, b.roughness),
    emissiveIntensity: l(a.emissiveIntensity, b.emissiveIntensity),
  }
}
