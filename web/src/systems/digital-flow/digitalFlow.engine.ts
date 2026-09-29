import type { SiteState } from '@/systems/site/site.types'
import type { DigitalFlowConfig, FlowConnection, FlowNode } from '@/systems/digital-flow/digitalFlow.types'
import { dist, lerp } from '@/systems/digital-flow/digitalFlow.math'

const NODE_COUNT = 48

function scatterTargets(w: number, h: number, i: number, n: number) {
  const angle = (i / n) * Math.PI * 2 + 0.3
  const r = 0.22 + (i % 5) * 0.04
  return { x: w * (0.5 + Math.cos(angle) * r), y: h * (0.45 + Math.sin(angle) * r * 0.8) }
}

function gridTargets(w: number, h: number, i: number) {
  const cols = 8
  const row = Math.floor(i / cols)
  const col = i % cols
  return { x: w * (0.15 + (col / (cols - 1)) * 0.7), y: h * (0.2 + (row / 5) * 0.6) }
}

function approachTargets(w: number, h: number, i: number) {
  const lane = i % 3
  const t = Math.floor(i / 3) / 16
  const xBase = 0.2 + lane * 0.28
  return { x: w * xBase, y: h * (0.25 + t * 0.55) }
}

function serviceTargets(w: number, h: number, i: number) {
  const lane = i % 6
  const t = Math.floor(i / 6) / 8
  return { x: w * (0.12 + lane * 0.14), y: h * (0.3 + t * 0.45) }
}

function peopleTargets(w: number, h: number, i: number) {
  const lane = i % 5
  const t = Math.floor(i / 5) / 9
  return { x: w * (0.15 + lane * 0.16), y: h * (0.35 + t * 0.4) }
}

function contactTargets(w: number, h: number, i: number, n: number) {
  const angle = (i / n) * Math.PI * 2
  const r = 0.08 + (i % 3) * 0.02
  return { x: w * (0.5 + Math.cos(angle) * r), y: h * (0.72 + Math.sin(angle) * r * 0.5) }
}

function targetsForState(state: SiteState, w: number, h: number, i: number, n: number) {
  switch (state) {
    case 'home':
      return scatterTargets(w, h, i, n)
    case 'about':
      return gridTargets(w, h, i)
    case 'approach':
      return approachTargets(w, h, i)
    case 'services':
      return serviceTargets(w, h, i)
    case 'people':
      return peopleTargets(w, h, i)
    case 'contact':
      return contactTargets(w, h, i, n)
    default:
      return scatterTargets(w, h, i, n)
  }
}

export function createNodes(width: number, height: number): FlowNode[] {
  return Array.from({ length: NODE_COUNT }, (_, i) => {
    const t = scatterTargets(width, height, i, NODE_COUNT)
    return {
      id: `n-${i}`,
      x: t.x,
      y: t.y,
      baseX: t.x,
      baseY: t.y,
      vx: 0,
      vy: 0,
      radius: 1.5 + (i % 3) * 0.5,
      state: 'idle',
    }
  })
}

export function buildConnections(nodes: FlowNode[], maxDist: number): FlowConnection[] {
  const connections: FlowConnection[] = []
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const d = dist(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y)
      if (d < maxDist) {
        connections.push({
          from: nodes[i].id,
          to: nodes[j].id,
          strength: 1 - d / maxDist,
        })
      }
    }
  }
  return connections
}

export function updateDigitalFlow(nodes: FlowNode[], config: DigitalFlowConfig): FlowConnection[] {
  const { width: w, height: h, siteState, mouseX, mouseY, mouseActive, reducedMotion, isTouch, time } =
    config
  const mx = mouseX * w
  const my = mouseY * h
  const ease = reducedMotion ? 0.08 : 0.04
  const drift = reducedMotion || isTouch ? Math.sin(time * 0.001) * 0.3 : 0

  nodes.forEach((node, i) => {
    const target = targetsForState(siteState, w, h, i, nodes.length)
    node.baseX = target.x
    node.baseY = target.y

    let ax = 0
    let ay = 0

    if (!reducedMotion && mouseActive && !isTouch) {
      const d = dist(node.x, node.y, mx, my)
      const influence = clampInfluence(120 - d, 0, 120)
      if (influence > 0) {
        ax += ((mx - node.x) / Math.max(d, 1)) * influence * 0.002
        ay += ((my - node.y) / Math.max(d, 1)) * influence * 0.002
      }
    }

    if (isTouch || reducedMotion) {
      ax += Math.sin(time * 0.0008 + i) * 0.02
      ay += Math.cos(time * 0.0007 + i * 0.5) * 0.02
    }

    node.vx = lerp(node.vx, ax, 0.1)
    node.vy = lerp(node.vy, ay, 0.1)

    const tx = node.baseX + node.vx * 20 + drift * 8
    const ty = node.baseY + node.vy * 20 + drift * 6

    node.x = lerp(node.x, tx, ease)
    node.y = lerp(node.y, ty, ease)
    node.state = mouseActive && dist(node.x, node.y, mx, my) < 80 ? 'active' : 'idle'
  })

  const maxDist =
    siteState === 'contact' ? w * 0.35 : siteState === 'about' ? w * 0.22 : w * 0.18
  return buildConnections(nodes, maxDist)
}

function clampInfluence(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v))
}

/** Brief letterform snap for easter egg */
export function applyLetterformSnap(nodes: FlowNode[], w: number, h: number, progress: number) {
  const cx = w * 0.5
  const cy = h * 0.45
  nodes.forEach((node, i) => {
    const angle = (i / nodes.length) * Math.PI * 2
    const rx = w * 0.18 * (1 - progress * 0.3)
    const ry = h * 0.12 * (1 - progress * 0.3)
    node.x = lerp(node.x, cx + Math.cos(angle) * rx, 0.12)
    node.y = lerp(node.y, cy + Math.sin(angle) * ry * 0.6, 0.12)
  })
}
