import { useEffect, useRef, type ImgHTMLAttributes } from 'react'
import { ensureGsapPlugins, gsap } from '@/lib/animations/gsap'
import { motion } from '@/lib/animations/tokens'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type ImageRevealProps = ImgHTMLAttributes<HTMLImageElement> & {
  variant?: 'clip' | 'scale' | 'wipe'
}

export function ImageReveal({ className = '', variant = 'clip', alt = '', ...props }: ImageRevealProps) {
  const reduced = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (reduced || !wrapRef.current || !imgRef.current) return
    ensureGsapPlugins()
    const img = imgRef.current
    const wrap = wrapRef.current
    const ctx = gsap.context(() => {
      if (variant === 'scale') {
        gsap.from(img, {
          scale: 1.12,
          duration: motion.duration.cinematic,
          ease: motion.ease.cinematic,
          scrollTrigger: { trigger: wrap, start: 'top 80%', once: true },
        })
      } else if (variant === 'wipe') {
        gsap.fromTo(
          wrap,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: motion.duration.slow,
            ease: motion.ease.inOut,
            scrollTrigger: { trigger: wrap, start: 'top 75%', once: true },
          },
        )
      } else {
        gsap.fromTo(
          wrap,
          { clipPath: 'inset(100% 0 0 0)' },
          {
            clipPath: 'inset(0% 0 0 0)',
            duration: motion.duration.slow,
            ease: motion.ease.cinematic,
            scrollTrigger: { trigger: wrap, start: 'top 80%', once: true },
          },
        )
        gsap.from(img, {
          scale: 1.08,
          duration: motion.duration.cinematic,
          ease: motion.ease.cinematic,
          scrollTrigger: { trigger: wrap, start: 'top 80%', once: true },
        })
      }
    }, wrapRef)
    return () => ctx.revert()
  }, [reduced, variant])

  return (
    <div ref={wrapRef} className={`overflow-hidden ${className}`}>
      <img ref={imgRef} alt={alt} className="h-full w-full object-cover" {...props} />
    </div>
  )
}
