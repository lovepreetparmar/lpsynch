import type { SpecimenDirection } from '@/components/services/serviceVisuals'

export type SpecimenProps = {
  direction: SpecimenDirection
  reduced: boolean
  active: boolean
}

export const stroke = 'currentColor'
export const fill = 'rgba(241, 172, 47, 0.1)'
