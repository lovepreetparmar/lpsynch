export const motion = {
  duration: {
    fast: 0.35,
    normal: 0.6,
    slow: 1,
    cinematic: 1.4,
    intro: 0.9,
  },
  ease: {
    smooth: 'power3.out',
    cinematic: 'power4.out',
    inOut: 'power3.inOut',
  },
  stagger: {
    small: 0.04,
    normal: 0.08,
    large: 0.12,
  },
} as const
