import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useReducedMotion } from 'motion/react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { setLenis } from '../lib/scroll'

/**
 * Smooth inertia scroll — the weighty "glide" that turns the landing from a
 * document that jumps line-by-line into one continuous drive. Lenis drives the
 * real window scroll, so motion's `useScroll` / `useVelocity` read it for free
 * (no manual sync). Renders nothing; mount once at the app root.
 */
export default function SmoothScroll() {
  const reduce = useReducedMotion()
  const { pathname } = useLocation()
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Honor reduced motion: fall back to native scroll, no smoothing at all.
    if (reduce) return

    const lenis = new Lenis({
      lerp: 0.09, // weighty glide (lower = heavier). 0.08–0.1 reads as F1-calm.
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    })
    lenisRef.current = lenis
    setLenis(lenis)

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      lenisRef.current = null
      setLenis(null)
    }
  }, [reduce])

  // A new route should open at the top — Lenis won't reset scroll on its own.
  useEffect(() => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname])

  return null
}
