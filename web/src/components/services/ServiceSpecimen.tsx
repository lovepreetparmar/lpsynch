import type { ComponentType } from 'react'
import { useEffect, useState } from 'react'
import type { ServiceItem } from '@/data/services'
import {
  directionFromIndexChange,
  getServiceVisual,
  type SpecimenDirection,
  type ServiceVisualType,
} from '@/components/services/serviceVisuals'
import type { SpecimenProps } from '@/components/services/specimenShared'
import { ServiceSpecimenMarketing } from '@/components/services/ServiceSpecimenMarketing'
import { ServiceSpecimenWeb } from '@/components/services/ServiceSpecimenWeb'
import { ServiceSpecimenMobile } from '@/components/services/ServiceSpecimenMobile'
import { ServiceSpecimenDesign } from '@/components/services/ServiceSpecimenDesign'
import { ServiceSpecimenAPI } from '@/components/services/ServiceSpecimenAPI'
import { ServiceSpecimenCloud } from '@/components/services/ServiceSpecimenCloud'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const specimens: Record<ServiceVisualType, ComponentType<SpecimenProps>> = {
  marketing: ServiceSpecimenMarketing,
  web: ServiceSpecimenWeb,
  mobile: ServiceSpecimenMobile,
  design: ServiceSpecimenDesign,
  api: ServiceSpecimenAPI,
  cloud: ServiceSpecimenCloud,
}

type ServiceSpecimenPanelProps = {
  service: ServiceItem
  index: number
  total: number
  prevIndex: number
  className?: string
}

export function ServiceSpecimenPanel({ service, index, total, prevIndex, className = '' }: ServiceSpecimenPanelProps) {
  const reduced = useReducedMotion()
  const visual = getServiceVisual(service.slug)
  const Specimen = specimens[visual.type]
  const direction: SpecimenDirection = directionFromIndexChange(prevIndex, index)
  const [mounted, setMounted] = useState(true)

  useEffect(() => {
    setMounted(false)
    const t = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(t)
  }, [service.slug])

  return (
    <div
      className={`relative flex min-h-[18rem] flex-col overflow-hidden border border-border bg-surface/50 md:min-h-[20rem] ${className}`}
      aria-live="polite"
    >
      <div className="relative flex min-h-[10rem] flex-1 items-center justify-center overflow-hidden p-4 md:min-h-[11rem] md:p-6">
        {mounted ? <Specimen direction={direction} reduced={reduced} active /> : null}
      </div>
      <div className="shrink-0 border-t border-border px-5 py-4 md:px-6">
        <p className="font-mono text-[10px] tracking-[0.35em] text-ink-subtle uppercase">
          {service.number} / {String(total).padStart(2, '0')}
        </p>
        <p className="mt-1.5 text-base font-semibold uppercase tracking-tight md:text-lg">{service.title}</p>
        <p className="mt-1 font-mono text-[9px] tracking-widest text-accent uppercase">{visual.label}</p>
        <p className="mt-2 line-clamp-3 max-w-md text-sm leading-relaxed text-ink-muted">{service.description}</p>
      </div>
    </div>
  )
}
