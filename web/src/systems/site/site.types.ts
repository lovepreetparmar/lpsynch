export type SiteState = 'home' | 'about' | 'approach' | 'services' | 'people' | 'contact'

export const siteStateOrder: SiteState[] = [
  'home',
  'about',
  'approach',
  'services',
  'people',
  'contact',
]

export function siteStateIndex(state: SiteState): number {
  return siteStateOrder.indexOf(state)
}
