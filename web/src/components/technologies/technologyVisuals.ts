export type SpecimenType = 'interface' | 'routing' | 'runtime' | 'data' | 'infrastructure' | 'types'

export type EnterDirection = 'up' | 'down' | 'left' | 'right' | 'scale'

export type TechnologyVisual = {
  specimen: SpecimenType
  enterDirection: EnterDirection
  /** Editorial placement within the composition */
  layout: string
}

export const technologyVisuals: Record<string, TechnologyVisual> = {
  react: {
    specimen: 'interface',
    enterDirection: 'up',
    layout: 'top-[6%] left-1/2 -translate-x-1/2 text-center',
  },
  typescript: {
    specimen: 'types',
    enterDirection: 'left',
    layout: 'top-[16%] left-0 md:left-[6%] text-left',
  },
  php: {
    specimen: 'runtime',
    enterDirection: 'right',
    layout: 'top-[20%] right-0 md:right-[8%] text-right',
  },
  dotnet: {
    specimen: 'routing',
    enterDirection: 'left',
    layout: 'top-[38%] left-[2%] md:left-[10%] text-left',
  },
  node: {
    specimen: 'runtime',
    enterDirection: 'down',
    layout: 'bottom-[32%] left-1/2 -translate-x-1/2 text-center',
  },
  mysql: {
    specimen: 'data',
    enterDirection: 'scale',
    layout: 'bottom-[12%] left-0 md:left-[8%] text-left',
  },
  azure: {
    specimen: 'infrastructure',
    enterDirection: 'scale',
    layout: 'bottom-[16%] right-0 md:right-[10%] text-right',
  },
}

export function getTechnologyVisual(id: string): TechnologyVisual {
  return (
    technologyVisuals[id] ?? {
      specimen: 'interface',
      enterDirection: 'up',
      layout: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center',
    }
  )
}

export const backgroundBySpecimen: Record<SpecimenType, string> = {
  interface: 'bg-[linear-gradient(rgba(241,172,47,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(241,172,47,0.04)_1px,transparent_1px)] bg-[size:48px_48px]',
  routing: 'bg-[repeating-linear-gradient(115deg,transparent,transparent_42px,rgba(241,172,47,0.06)_42px,rgba(241,172,47,0.06)_43px)]',
  runtime: 'bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,transparent_40%)]',
  data: 'bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.04)_0px,rgba(255,255,255,0.04)_1px,transparent_1px,transparent_12px)]',
  infrastructure: 'bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(241,172,47,0.08),transparent_70%)]',
  types: 'bg-[linear-gradient(90deg,rgba(241,172,47,0.05)_0%,transparent_50%,rgba(241,172,47,0.05)_100%)]',
}
