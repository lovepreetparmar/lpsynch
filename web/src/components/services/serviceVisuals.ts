import type { ServiceItem } from '@/data/services'

export type ServiceVisualType = 'marketing' | 'web' | 'mobile' | 'design' | 'api' | 'cloud'

export type ServiceVisualMeta = {
  type: ServiceVisualType
  label: string
}

/** Maps verified service slugs to specimen treatments — not client claims */
export const serviceVisualBySlug: Record<ServiceItem['slug'], ServiceVisualMeta> = {
  'digital-marketing': { type: 'marketing', label: 'Reach composition' },
  'website-development': { type: 'web', label: 'Interface assembly' },
  'application-development': { type: 'mobile', label: 'Screen composition' },
  'custom-software-development': { type: 'api', label: 'System communication' },
  'brand-identity': { type: 'design', label: 'Design system' },
  'domain-and-hosting-management': { type: 'cloud', label: 'Deployment path' },
}

export function getServiceVisual(slug: ServiceItem['slug']): ServiceVisualMeta {
  return serviceVisualBySlug[slug] ?? { type: 'web', label: 'Specimen' }
}

export type SpecimenDirection = 'forward' | 'backward' | 'none'

export function directionFromIndexChange(prev: number, next: number): SpecimenDirection {
  if (next > prev) return 'forward'
  if (next < prev) return 'backward'
  return 'none'
}

export const transitionOffset = {
  forward: { x: 48, y: 0 },
  backward: { x: -48, y: 0 },
  none: { x: 0, y: 12 },
} as const
