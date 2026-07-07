import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { pursuits } from '../data/home'

/** Extra scroll distance the pin lasts — the "dwell" that drives the words. */
const TRACK_PX = 1500
/** Progress band that steps through the words; before = first word, after = CTA. */
const WORDS_START = 0.12
const WORDS_END = 0.82

const eyebrowStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '12px',
  color: 'var(--accent)',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  marginBottom: '16px',
}
const titleStyle: React.CSSProperties = {
  fontSize: 'clamp(2.4rem, 6vw, 4.6rem)',
  fontWeight: 800,
  textTransform: 'uppercase',
  lineHeight: 0.88,
  letterSpacing: '0.01em',
  color: 'var(--text)',
  margin: 0,
}
const wordStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 'clamp(2rem, 5vw, 3.6rem)',
  fontWeight: 800,
  textTransform: 'uppercase',
  lineHeight: 1.05,
  letterSpacing: '0.01em',
  textAlign: 'left',
}

/**
 * "Get to know me" as the landing's second pinned moment (same skeleton as the
 * horizontal gallery: own <section data-chapter>, sticky stage, zoom in/out at
 * the edges). The pursuits stand as a left-aligned stack of big condensed
 * words, and SCROLL drives which one is live — enter on TRAINING every time
 * (deterministic, no timer), step through the stack as you scroll the pin,
 * and land on the "More about me" line, which ignites as the exit beat. The
 * live word's detail unfolds accordion-style between it and the next word.
 * Hovering a word overrides the scroll pick while the pointer stays.
 */
export default function Pursuits() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const [scrollIdx, setScrollIdx] = useState(0)
  const [ctaHot, setCtaHot] = useState(false)
  const [pinned, setPinned] = useState<number | null>(null)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  // Same zoom language as the gallery, so both pinned moments read as siblings.
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.9, 1, 1, 0.9])
  const opacity = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0.5, 1, 1, 0.5])

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const span = (WORDS_END - WORDS_START) / pursuits.length
    const idx = Math.min(Math.max(Math.floor((p - WORDS_START) / span), 0), pursuits.length - 1)
    setScrollIdx((prev) => (prev === idx ? prev : idx))
    setCtaHot((prev) => {
      const next = p >= WORDS_END
      return prev === next ? prev : next
    })
  })

  const active = pinned ?? scrollIdx

  const heading = (
    <>
      <span className="font-mono-label" style={eyebrowStyle}>
        03 — The short version
      </span>
      <h2 className="font-condensed" style={titleStyle}>
        Get to know me
      </h2>
    </>
  )

  const intro = (
    <p
      className="font-display"
      style={{ fontSize: 'clamp(1.2rem, 2.4vw, 1.7rem)', lineHeight: 1.4, color: 'var(--text)', maxWidth: '680px', margin: 0 }}
    >
      I'm Marius, a software development student at NTNU in Trondheim.
      Most of my free time goes to:
    </p>
  )

  const cta = (
    <Link
      to="/about"
      className="pursuit-word font-condensed cursor-pointer"
      data-active={ctaHot || reduce}
      style={{ ...wordStyle, textDecoration: 'none' }}
    >
      More about me →
    </Link>
  )

  const stack = (expandAll: boolean) => (
    <div
      onMouseLeave={() => setPinned(null)}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', rowGap: '8px' }}
    >
      {pursuits.map((p, i) => (
        <div key={p.name}>
          <button
            type="button"
            className="pursuit-word font-condensed"
            data-active={i === active}
            onMouseEnter={() => setPinned(i)}
            onFocus={() => setPinned(i)}
            onBlur={() => setPinned((prev) => (prev === i ? null : prev))}
            onClick={() => setPinned(i)}
            style={wordStyle}
          >
            {p.name}
          </button>

          {/* The live word's detail unfolds here — between this word and the
              next. height:auto animation + overflow hidden = clean accordion. */}
          <AnimatePresence initial={false}>
            {(expandAll || i === active) && (
              <motion.div
                initial={expandAll ? false : { height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={expandAll ? undefined : { height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: 'hidden' }}
              >
                <div style={{ padding: '10px 0 14px', maxWidth: '480px' }}>
                  <div aria-hidden style={{ width: '56px', height: '2px', background: 'var(--accent)', marginBottom: '10px' }} />
                  <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--muted)', margin: 0 }}>
                    {p.line}
                  </p>
                  {p.fact && (
                    <span
                      className="font-mono-label"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginTop: '10px',
                        fontSize: '11px',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: 'var(--muted)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {p.fact}
                    </span>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
      {cta}
    </div>
  )

  // Reduced motion: no pin, no scrub — a plain section with every detail open.
  if (reduce) {
    return (
      <section
        data-chapter={3}
        style={{ maxWidth: '1180px', margin: '0 auto', padding: 'clamp(72px, 12vh, 150px) clamp(20px, 5vw, 48px)' }}
      >
        <div style={{ marginBottom: '40px' }}>{heading}</div>
        <div style={{ marginBottom: '40px' }}>{intro}</div>
        {stack(true)}
      </section>
    )
  }

  return (
    <section ref={sectionRef} data-chapter={3} style={{ position: 'relative', height: `calc(100vh + ${TRACK_PX}px)` }}>
      <motion.div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          scale,
          opacity,
        }}
      >
        <div style={{ width: '100%', maxWidth: '1180px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 48px)' }}>
          <div style={{ marginBottom: 'clamp(20px, 3.5vh, 36px)' }}>{heading}</div>
          <div style={{ marginBottom: 'clamp(20px, 3.5vh, 36px)' }}>{intro}</div>
          {stack(false)}
        </div>
      </motion.div>
    </section>
  )
}
