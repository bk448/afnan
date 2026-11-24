import { useEffect, useRef, useState } from 'react'

interface UseRevealOptions {
  /** Fraction of the element that must be visible before revealing. */
  threshold?: number
  /** Shrink the viewport so the reveal fires slightly before the edge. */
  rootMargin?: string
  /** Reveal once and stop observing. Premium motion does not replay. */
  once?: boolean
}

/**
 * Scroll-triggered reveal.
 *
 * Returns `true` immediately — never animating — when the visitor has asked
 * for reduced motion, or when IntersectionObserver is unavailable (which
 * includes the prerender pass, so static HTML always ships fully visible).
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.15,
  rootMargin = '0px 0px -10% 0px',
  once = true,
}: UseRevealOptions = {}) {
  const ref = useRef<T | null>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      setRevealed(true)
      return
    }

    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true)
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            setRevealed(false)
          }
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, revealed }
}
