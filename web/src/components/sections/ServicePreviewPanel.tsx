import { ServiceGlyph } from '@/components/ServiceGlyph/ServiceGlyph'
import { NetworkMark } from '@/components/ui/NetworkMark'
import type { ServiceItem } from '@/data/services'

type ServicePreviewPanelProps = {
  service: ServiceItem
}

export function ServicePreviewPanel({ service }: ServicePreviewPanelProps) {
  return (
    <div className="relative flex h-full min-h-[20rem] w-full flex-col items-center justify-center border border-border bg-surface/90 p-8 backdrop-blur-sm">
      <NetworkMark className="absolute right-6 top-6 h-16 w-24 opacity-40" />
      <div className="flex flex-1 items-center justify-center transition-transform duration-500">
        <ServiceGlyph slug={service.slug} active />
      </div>
      <div className="w-full border-t border-border pt-6">
        <p className="font-mono text-[10px] tracking-widest text-ink-subtle uppercase">Capabilities</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {service.technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-border px-3 py-1 font-mono text-[10px] tracking-wide text-ink-muted uppercase"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
