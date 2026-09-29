import type { SiteState } from '@/systems/site/site.types'

export type FlowNodeState = 'idle' | 'active' | 'connected'

export interface FlowNode {
  id: string
  x: number
  y: number
  baseX: number
  baseY: number
  vx: number
  vy: number
  radius: number
  state: FlowNodeState
}

export interface FlowConnection {
  from: string
  to: string
  strength: number
}

export interface DigitalFlowConfig {
  siteState: SiteState
  width: number
  height: number
  mouseX: number
  mouseY: number
  mouseActive: boolean
  reducedMotion: boolean
  isTouch: boolean
  activeServiceId: string | null
  activePersonId: string | null
  time: number
  pulse: number
}
