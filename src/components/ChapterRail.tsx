import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { scrollToEl } from '../lib/scroll'

const CHAPTERS = ['Intro', 'Currently', 'Work', 'About', 'Contact']

/**
 * A fixed wayfinding rail down the right edge — one dot per stage of the journey,
 * connected by a faint line. The active stage glows and reveals its label;
 * passed stages stay dim-lit. Now interactive: hovering a dot reveals its label,
 * clicking smooth-scrolls to that section. Active state is driven by an
 * IntersectionObserver on the [data-chapter] sections. Hidden on narrow screens
 * and under reduced motion.
 */
export default function ChapterRail() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-chapter]'))
    if (els.length === 0) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number(e.target.getAttribute('data-chapter'))
            setActive((prev) => (prev === idx ? prev : idx))
          }
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  if (reduce) return null

  const go = (i: number) => {
    const el = document.querySelector<HTMLElement>(`[data-chapter="${i}"]`)
    if (!el) return
    // Pinned sections (Work, Get to know me) are tall scroll tracks: landing at
    // their top means arriving zoomed-out and replaying the zoom-in. Jump
    // straight to the settled, fully zoomed-in point instead — the zoom belongs
    // to organic scrolling, not navigation.
    const track = el.offsetHeight - window.innerHeight
    const offset = track > window.innerHeight * 0.5 ? Math.round(track * 0.15) : 0
    scrollToEl(el, offset)
  }

  return (
    <nav className="chapter-rail" aria-label="Page sections">
      {CHAPTERS.map((label, i) => (
        <button
          key={label}
          type="button"
          className="chapter-rail-row"
          data-active={i === active}
          data-passed={i < active}
          onClick={() => go(i)}
          aria-label={label}
          aria-current={i === active ? 'true' : undefined}
        >
          <span className="chapter-rail-label">{label}</span>
          <span className="chapter-rail-dot" />
        </button>
      ))}
    </nav>
  )
}
