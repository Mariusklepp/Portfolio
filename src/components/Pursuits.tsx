import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { pursuits } from '../data/pursuits'

/** Extra scroll distance the pin lasts — the "dwell" that drives the words. */
const TRACK_PX = 2400
/** Progress band that steps through the words; before = first word, after = CTA.
    WORDS_END sits well before the zoom-out (0.9) on purpose: everything from
    WORDS_END to 0.9 is deliberate dead scroll where nothing changes and the
    finished button is the only thing lit — dwell time, not a bug. */
const WORDS_START = 0.12
const WORDS_END = 0.55

const eyebrowStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '12px',
  color: 'var(--accent)',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  marginBottom: '16px',
}
const titleStyle: React.CSSProperties = {
  fontSize: 'clamp(2.2rem, 5vw, 4rem)',
  fontWeight: 800,
  textTransform: 'uppercase',
  lineHeight: 0.88,
  letterSpacing: '0.01em',
  color: 'var(--text)',
  margin: 0,
}
const wordStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
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
 * words, and SCROLL alone drives which one is live — enter on TRAINING every
 * time (deterministic, no timer, no hover), step through the stack as you
 * scroll the pin, and land on the "More about me" button, which fills accent
 * as the exit beat. The live word's detail unfolds accordion-style between it
 * and the next word.
 */
export default function Pursuits() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  // active = null during the CTA beat: every word goes quiet (no red, details
  // folded) so the finished button is the only thing lit.
  const [active, setActive] = useState<number | null>(0)
  const [ctaHot, setCtaHot] = useState(false)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  // Same zoom language as the gallery, so both pinned moments read as siblings.
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.9, 1, 1, 0.9])
  const opacity = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0.5, 1, 1, 0.5])

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const hot = p >= WORDS_END
    const span = (WORDS_END - WORDS_START) / pursuits.length
    const idx = hot ? null : Math.min(Math.max(Math.floor((p - WORDS_START) / span), 0), pursuits.length - 1)
    setActive((prev) => (prev === idx ? prev : idx))
    setCtaHot((prev) => (prev === hot ? prev : hot))
  })

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

  // The CTA starts as a quiet typographic line; as the scrub's exit beat an
  // accent outline TRACES itself around it (SVG stroke draw), turning the line
  // into an unmistakable button. Scrolling back up un-draws it.
  const cta = (hot: boolean) => (
    <Link
      to="/about"
      className="pursuit-cta cursor-pointer"
      data-active={hot}
      style={{
        position: 'relative',
        display: 'inline-block',
        marginTop: '18px',
        marginLeft: '-18px',
        padding: '10px 18px',
        textDecoration: 'none',
      }}
    >
      <svg
        aria-hidden
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none' }}
      >
        <motion.rect
          x="0.75"
          y="0.75"
          width="100%"
          height="100%"
          rx="12"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          initial={false}
          animate={{ pathLength: hot ? 1 : 0, opacity: hot ? 1 : 0 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
        />
      </svg>
      <span
        className="pursuit-cta-label font-condensed"
        style={{
          fontSize: 'clamp(1.5rem, 2.6vw, 2.2rem)',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.02em',
          lineHeight: 1.05,
          color: 'var(--text)',
        }}
      >
        More about me →
      </span>
    </Link>
  )

  const stack = (expandAll: boolean) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', rowGap: '8px' }}>
      {pursuits.map((p, i) => (
        <div key={p.name}>
          <span className="pursuit-word font-condensed" data-active={i === active || expandAll} style={wordStyle}>
            {p.name}
          </span>

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
        {cta(true)}
      </section>
    )
  }

  return (
    <section ref={sectionRef} data-chapter={3} style={{ position: 'relative', height: `calc(100vh + ${TRACK_PX}px)` }}>
      {/* top padding keeps the fixed navbar clear of the heading */}
      <motion.div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          padding: 'clamp(84px, 12vh, 120px) 0 clamp(32px, 5vh, 56px)',
          scale,
          opacity,
        }}
      >
        {/* two columns on desktop — identity left, word stack right — so the
            pin uses the width instead of cramming everything vertically */}
        <div className="pursuit-stage">
          <div>
            {heading}
            <div style={{ marginTop: 'clamp(18px, 3vh, 30px)' }}>{intro}</div>
          </div>
          <div>
            {stack(false)}
            {cta(ctaHot)}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
