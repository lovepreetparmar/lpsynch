import { backgroundBySpecimen, type SpecimenType } from '@/components/technologies/technologyVisuals'

type TechnologyBackgroundProps = {
  specimen: SpecimenType
  active: boolean
}

export function TechnologyBackground({ specimen, active }: TechnologyBackgroundProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${backgroundBySpecimen[specimen]} ${
        active ? 'opacity-100' : 'opacity-40'
      }`}
      aria-hidden
    />
  )
}
