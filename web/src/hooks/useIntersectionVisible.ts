import { useEffect, useState, type RefObject } from 'react'

export function useIntersectionVisible(ref: RefObject<Element | null>, rootMargin = '100px'): boolean {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin, threshold: 0 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, rootMargin])

  return visible
}
