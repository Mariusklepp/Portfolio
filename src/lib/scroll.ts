import type Lenis from 'lenis'

let lenis: Lenis | null = null

/** Registered by SmoothScroll so other components can drive the same inertia. */
export function setLenis(instance: Lenis | null) {
  lenis = instance
}

/**
 * Smooth-scroll to an element using Lenis if it's mounted (so it matches the
 * site's inertia), otherwise falling back to the browser's native smooth scroll.
 * `offset` (px) lands past the element's top — used to skip a pinned section's
 * zoom-in phase and arrive at its settled state.
 */
export function scrollToEl(el: Element, offset = 0) {
  if (lenis) {
    lenis.scrollTo(el as HTMLElement, { duration: 1.2, offset })
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}
