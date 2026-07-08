import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react'
import { Label, PageHeading } from '../components/shared'
import { Parallax, SlideIn } from '../components/motion'
import { GradeOverlay, MediaFrame, ZoomFrame, GRAIN_URL } from '../components/media'
import { pursuits } from '../data/pursuits'
import { reading } from '../data/reading'
import Button from '../components/Button'

/**
 * The About page is "the long version" — and it's shot as one continuous
 * camera move, not a document:
 *   01 Hello        — word-rise greeting, portrait, typewriter status lines
 *   →  ZOOM-THROUGH — the greeting scales into the camera and blurs out
 *                     while Background rises from beneath (pinned sequence);
 *                     the portrait "steps aside" on the way
 *   02 Background   — education + skills in one compact scene
 *   03 Free time    — THE DECK: each pursuit is a big card that climbs up
 *                     and covers the previous one (sticky stack)
 *   04 Reading      — hidden until src/data/reading.ts has titles
 *   05 Contact      — focus pull: starts oversized and blurred, settles sharp
 * A gentle velocity skew shears content with scroll speed throughout.
 * Narrow screens and reduced motion get flat sections instead of the pin.
 * All copy follows the voice rule in CLAUDE.md — written like Marius, true only.
 */

interface Interest {
  title: string
  description: string
  icon: string
  media?: string[]
  badge?: string
  /** Links the chapter to its deep page at /about/:slug. */
  slug?: string
}

// The three pursuits come from the shared data file (same source as the
// landing word stack); concerts and investing live only here on the long
// version. Concerts: Marius is undecided about keeping it — the copy is
// toned down to what's true, and it's one delete away if he drops it.
const interests: Interest[] = [
  ...pursuits.map((p) => ({
    title: p.name,
    description: p.about,
    icon: p.icon,
    media: p.media,
    badge: p.badge,
    slug: p.slug,
  })),
  {
    title: 'Live concerts',
    description: "Not something I chase every month, but a good show with the right artist is hard to beat.",
    icon: 'lucide:disc-3',
    media: ['/images/concert.jpg', '/images/concert-2.jpg'],
  },
  {
    title: 'Investing & finance',
    description: 'I follow the markets and read about value investing. How capital moves around the world is a rabbit hole I keep coming back to.',
    icon: 'lucide:trending-up',
  },
]

// Status lines typed out in the Hello scene — part of introducing yourself.
const statusLines = [
  'Studying software development at NTNU, Trondheim',
  'Building JARVIS and Deep Core',
  'Open to freelance work',
]

const education = {
  institution: 'NTNU',
  degree: 'BSc in Computer Engineering — Systems Development',
  period: 'Aug 2025 — Jun 2028',
  location: 'Trondheim, Norway',
}

const skills = [
  { name: 'Java',        icon: 'devicon:java' },
  { name: 'JavaScript',  icon: 'devicon:javascript' },
  { name: 'HTML',        icon: 'devicon:html5' },
  { name: 'CSS',         icon: 'devicon:css3' },
  { name: 'React',       icon: 'devicon:react' },
  { name: 'Tailwind',    icon: 'devicon:tailwindcss' },
  { name: 'Git',         icon: 'devicon:git' },
  { name: 'GitHub',      icon: 'mdi:github' },
  { name: 'SQL',         icon: 'devicon:mysql' },
]

/* ------------------------------------------------------------------ */
/* Hooks + shared mechanics                                            */
/* ------------------------------------------------------------------ */

/** True below the given width — the pinned sequence falls back to flat
 *  sections there (the two layered scenes don't fit small viewports). */
function useNarrow(query = '(max-width: 900px)') {
  const [narrow, setNarrow] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const m = window.matchMedia(query)
    const onChange = () => setNarrow(m.matches)
    m.addEventListener('change', onChange)
    return () => m.removeEventListener('change', onChange)
  }, [query])
  return narrow
}

/** Scroll speed gently shears the content and springs back at rest — the
 *  single biggest "not a document" ingredient. Applied per scene (never
 *  around a sticky ancestor, so pins can't break). */
function VelocitySkew({ children }: Readonly<{ children: React.ReactNode }>) {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smooth = useSpring(velocity, { stiffness: 130, damping: 28, mass: 0.45 })
  const skewY = useTransform(smooth, [-3500, 0, 3500], [1.4, 0, -1.4], { clamp: true })
  if (reduce) return <>{children}</>
  return <motion.div style={{ skewY, transformOrigin: '50% 50%' }}>{children}</motion.div>
}

/** A plain full-width scene (used for the flat fallbacks + Reading). */
function Scene({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <section style={{ position: 'relative', padding: 'clamp(64px, 10vh, 110px) 24px' }}>
      <div style={{ maxWidth: '1024px', margin: '0 auto' }}>{children}</div>
    </section>
  )
}

/** Section heading in the landing's language: ghost parallax number,
 *  mono eyebrow, condensed caps title. */
function AboutHeading({ index, eyebrow, title }: Readonly<{ index: string; eyebrow: string; title: string }>) {
  return (
    <div style={{ position: 'relative', marginBottom: '48px' }}>
      <Parallax amount={40}>
        <span
          aria-hidden
          className="font-condensed"
          style={{
            position: 'absolute',
            top: '-0.55em',
            left: '-0.04em',
            fontSize: 'clamp(5.5rem, 14vw, 12rem)',
            fontWeight: 800,
            lineHeight: 0.8,
            color: 'rgba(245, 243, 240, 0.035)',
            pointerEvents: 'none',
            userSelect: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {index}
        </span>
      </Parallax>
      <SlideIn from="left">
        <span
          className="font-mono-label"
          style={{
            display: 'block',
            fontSize: '12px',
            color: 'var(--accent)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            marginBottom: '14px',
          }}
        >
          {index} — {eyebrow}
        </span>
        <h2
          className="font-condensed"
          style={{
            fontSize: 'clamp(2.2rem, 5.5vw, 3.6rem)',
            fontWeight: 800,
            textTransform: 'uppercase',
            lineHeight: 0.9,
            color: 'var(--text)',
            margin: 0,
          }}
        >
          {title}
        </h2>
      </SlideIn>
    </div>
  )
}

/** Hello mechanic: the headline rises into view word by word. The in-view
 *  trigger sits on the (visible) parent, NOT on the clipped words — a word
 *  translated fully outside its overflow-hidden mask has zero visible area,
 *  so IntersectionObserver never fires on it. Variants propagate down. */
function WordRise({ text }: Readonly<{ text: string }>) {
  const reduce = useReducedMotion()
  const words = text.split(' ')
  return (
    <motion.span initial={reduce ? false : 'hidden'} whileInView="visible" viewport={{ once: true }}>
      {words.map((word, i) => (
        <span key={word + i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            variants={{ hidden: { y: '110%' }, visible: { y: 0 } }}
            transition={{ duration: 0.65, delay: 0.1 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

/** Hello mechanic: the status lines type themselves out, one after another —
 *  the same quiet terminal language as the hero's typewriter. */
function TypeLines({ lines }: Readonly<{ lines: string[] }>) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const total = lines.join('').length
  const [typed, setTyped] = useState(0)

  useEffect(() => {
    if (!inView || reduce) return
    const id = setInterval(() => {
      setTyped((t) => {
        if (t >= total) {
          clearInterval(id)
          return t
        }
        return t + 1
      })
    }, 22)
    return () => clearInterval(id)
  }, [inView, reduce, total])

  const done = reduce ? total : typed
  let consumed = 0

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
      {lines.map((line) => {
        const start = consumed
        consumed += line.length
        const visible = Math.max(0, Math.min(line.length, done - start))
        const active = done > start && done < start + line.length
        return (
          <span
            key={line}
            className="font-mono-label"
            style={{ fontSize: '12px', letterSpacing: '0.06em', color: 'var(--muted)', minHeight: '1.4em' }}
          >
            <span style={{ color: 'var(--accent)', marginRight: '10px' }}>&gt;</span>
            <span style={{ color: 'var(--text)' }}>{line.slice(0, visible)}</span>
            {active && (
              <span
                aria-hidden
                style={{
                  display: 'inline-block',
                  width: '7px',
                  height: '1.1em',
                  marginLeft: '2px',
                  verticalAlign: 'text-bottom',
                  background: 'var(--accent)',
                  animation: 'pulse 1s infinite',
                }}
              />
            )}
          </span>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Scene content (shared between the pinned sequence and flat fallback) */
/* ------------------------------------------------------------------ */

function PortraitFrame() {
  const reduce = useReducedMotion()
  return (
    <div
      style={{
        position: 'relative',
        aspectRatio: '4 / 5',
        maxWidth: '400px',
        marginLeft: 'auto',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1px solid var(--border)',
      }}
    >
      {/* portrait placeholder — Marius is taking a new photo for this spot */}
      <motion.img
        src="/images/strength.jpg"
        alt="Marius Klepp"
        initial={reduce ? false : { scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 20%',
          filter: 'contrast(1.05) brightness(0.85)',
          display: 'block',
        }}
      />
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,11,0.85), transparent 52%)' }} />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.1,
          mixBlendMode: 'overlay',
          backgroundImage: GRAIN_URL,
          backgroundSize: '140px 140px',
        }}
      />
    </div>
  )
}

function HelloText() {
  return (
    <div>
      <Label n="01" text="about" />
      <PageHeading>
        <WordRise text="Hi, I'm Marius." />
      </PageHeading>
      <SlideIn from="up" delay={0.4}>
        <p style={{ color: 'var(--muted)', maxWidth: '520px', lineHeight: 1.8, fontSize: '16px', marginBottom: '28px' }}>
          Software development student at NTNU in Trondheim. I treat code a bit like training:
          show up, do the reps, finish what you start. This page is the rest of the picture.
        </p>
      </SlideIn>
      <TypeLines lines={statusLines} />
    </div>
  )
}

function BackgroundContent() {
  return (
    <div>
      <div style={{ position: 'relative', marginBottom: '40px' }}>
        <span
          aria-hidden
          className="font-condensed"
          style={{
            position: 'absolute',
            top: '-0.55em',
            left: '-0.04em',
            fontSize: 'clamp(5.5rem, 14vw, 12rem)',
            fontWeight: 800,
            lineHeight: 0.8,
            color: 'rgba(245, 243, 240, 0.035)',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          02
        </span>
        <span
          className="font-mono-label"
          style={{ display: 'block', fontSize: '12px', color: 'var(--accent)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '14px' }}
        >
          02 — Background
        </span>
        <h2
          className="font-condensed"
          style={{ fontSize: 'clamp(2.2rem, 5.5vw, 3.6rem)', fontWeight: 800, textTransform: 'uppercase', lineHeight: 0.9, color: 'var(--text)', margin: 0 }}
        >
          Education & skills
        </h2>
      </div>

      <div
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '14px',
          padding: '22px 26px',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          flexWrap: 'wrap',
          marginBottom: '28px',
        }}
      >
        <div
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '10px',
            background: 'var(--accent-dim)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Icon icon="lucide:graduation-cap" width={23} height={23} color="var(--accent)" />
        </div>
        <div style={{ flex: 1, minWidth: '220px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <h3 style={{ fontWeight: 700, fontSize: '16px', color: 'var(--text)' }}>{education.institution}</h3>
            <span
              className="font-mono-label"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '10px',
                color: 'var(--green)',
                background: 'var(--green-dim)',
                padding: '3px 8px',
                borderRadius: '999px',
              }}
            >
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'currentColor', animation: 'pulse 2s infinite' }} />
              ongoing
            </span>
          </div>
          <p style={{ color: 'var(--muted)', fontSize: '13.5px', lineHeight: 1.5, marginTop: '4px' }}>
            {education.degree} · {education.location}
          </p>
        </div>
        <span className="font-mono-label" style={{ fontSize: '11px', color: 'var(--muted)', whiteSpace: 'nowrap' }}>
          {education.period}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px' }}>
        {skills.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} delay={i * 0.04} />
        ))}
      </div>
    </div>
  )
}

function SkillCard({ skill, delay }: { skill: { name: string; icon: string }; delay: number }) {
  const reduce = useReducedMotion()
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.8, y: 14 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay, type: 'spring', stiffness: 280, damping: 20 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="cursor-default"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '11px 15px',
        borderRadius: '10px',
        border: `1px solid ${hovered ? 'var(--accent)' : 'var(--border)'}`,
        background: hovered ? 'var(--accent-dim)' : 'var(--surface)',
        transition: 'border-color 0.2s, background 0.2s',
      }}
    >
      <Icon icon={skill.icon} width={20} height={20} />
      <span style={{ color: 'var(--text)', fontSize: '13.5px', fontWeight: 500 }}>{skill.name}</span>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/* 01+02 — the pinned zoom-through sequence                            */
/* ------------------------------------------------------------------ */

const HB_TRACK = 1500

/** Hello and Background share one pinned stage: as you scroll, the greeting
 *  scales INTO the camera and blurs away (you travel through it, not past
 *  it) while Background rises from beneath at small scale and settles. The
 *  portrait steps aside slightly ahead of the text — its own little exit. */
function HelloBackgroundPinned() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })

  // Hello travels into the lens…
  const helloScale = useTransform(scrollYProgress, [0.3, 0.58], [1, 1.18])
  const helloBlurV = useTransform(scrollYProgress, [0.3, 0.58], [0, 9])
  const helloBlur = useTransform(helloBlurV, (b) => `blur(${b}px)`)
  const helloOpacity = useTransform(scrollYProgress, [0.34, 0.58], [1, 0])
  // …the portrait steps aside a beat earlier…
  const portraitScale = useTransform(scrollYProgress, [0.22, 0.48], [1, 0.6])
  const portraitY = useTransform(scrollYProgress, [0.22, 0.48], [0, -90])
  const portraitOpacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0])
  // …and Background rises from beneath, small to settled.
  const bgScale = useTransform(scrollYProgress, [0.5, 0.78], [0.86, 1])
  const bgY = useTransform(scrollYProgress, [0.5, 0.78], [80, 0])
  const bgBlurV = useTransform(scrollYProgress, [0.5, 0.72], [6, 0])
  const bgBlur = useTransform(bgBlurV, (b) => `blur(${b}px)`)
  const bgOpacity = useTransform(scrollYProgress, [0.5, 0.68], [0, 1])

  // Only the visible layer should catch the pointer (hover, text selection).
  const [bgInteractive, setBgInteractive] = useState(false)
  useMotionValueEvent(bgOpacity, 'change', (v) => {
    const next = v > 0.5
    setBgInteractive((prev) => (prev === next ? prev : next))
  })

  const layerStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    padding: 'clamp(84px, 12vh, 120px) 24px clamp(24px, 4vh, 48px)',
  }

  return (
    <section ref={sectionRef} style={{ position: 'relative', height: `calc(100vh + ${HB_TRACK}px)` }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        {/* 01 — Hello */}
        <motion.div
          style={{
            ...layerStyle,
            scale: helloScale,
            filter: helloBlur,
            opacity: helloOpacity,
            pointerEvents: bgInteractive ? 'none' : 'auto',
          }}
        >
          <VelocitySkew>
            <div
              style={{
                width: '100%',
                maxWidth: '1024px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '48px',
                alignItems: 'center',
              }}
            >
              <HelloText />
              <motion.div style={{ scale: portraitScale, y: portraitY, opacity: portraitOpacity }}>
                <PortraitFrame />
              </motion.div>
            </div>
          </VelocitySkew>
        </motion.div>

        {/* 02 — Background */}
        <motion.div
          style={{
            ...layerStyle,
            scale: bgScale,
            y: bgY,
            filter: bgBlur,
            opacity: bgOpacity,
            pointerEvents: bgInteractive ? 'auto' : 'none',
          }}
        >
          <VelocitySkew>
            <div style={{ width: '100%', maxWidth: '1024px', margin: '0 auto' }}>
              <BackgroundContent />
            </div>
          </VelocitySkew>
        </motion.div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 03 — the deck                                                       */
/* ------------------------------------------------------------------ */

/** Auto-crossfading media inside a deck card (no buttons — the card is the
 *  focus, the photos quietly take turns), zooming softly with scroll. */
function CardMedia({ media, icon, alt }: Readonly<{ media?: string[]; icon: string; alt: string }>) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (!media || media.length < 2) return
    const id = setInterval(() => setIdx((i) => (i + 1) % media.length), 4500)
    return () => clearInterval(id)
  }, [media])

  if (!media || media.length === 0) {
    return (
      <div
        className="deck-media"
        style={{
          position: 'relative',
          borderRadius: '12px',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, var(--accent-dim) 0%, var(--bg) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          aria-hidden
          style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 30%, var(--accent-dim), transparent 60%)', opacity: 0.6 }}
        />
        <Icon icon={icon} width={64} height={64} color="var(--accent)" style={{ opacity: 0.6, position: 'relative' }} />
      </div>
    )
  }

  return (
    <div className="deck-media" style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden' }}>
      <ZoomFrame style={{ position: 'absolute', inset: 0 }}>
        {media.map((src, i) => (
          <div
            key={src}
            style={{ position: 'absolute', inset: 0, opacity: i === idx ? 1 : 0, transition: 'opacity 0.7s ease' }}
          >
            <MediaFrame src={src} alt={`${alt} ${i + 1}`} />
          </div>
        ))}
      </ZoomFrame>
      <GradeOverlay />
    </div>
  )
}

/** One card in the deck. Its wrapper is a full viewport of scroll distance;
 *  the card sticks near the top, and while the NEXT card climbs over it, it
 *  sinks slightly and dims — a stack building up. */
function DeckCard({ item, index, isLast }: Readonly<{ item: Interest; index: number; isLast: boolean }>) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  // Progress of being covered: 0 while on top, 1 once the next card fully
  // overlaps ("end end" → wrapper's end at viewport bottom = next card enters).
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['end end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.93])
  const brightnessV = useTransform(scrollYProgress, [0, 1], [1, 0.55])
  const filter = useTransform(brightnessV, (b) => `brightness(${b})`)

  return (
    <div ref={wrapRef} style={{ height: '100vh' }}>
      <motion.div
        className="deck-card"
        style={reduce || isLast ? undefined : { scale, filter }}
      >
        <CardMedia media={item.media} icon={item.icon} alt={item.title} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', minWidth: 0 }}>
          <span className="font-mono-label" style={{ fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            №&nbsp;{String(index + 1).padStart(2, '0')} / {String(interests.length).padStart(2, '0')}
          </span>
          <h3
            className="font-condensed"
            style={{
              fontWeight: 800,
              fontSize: 'clamp(1.8rem, 3.6vw, 2.8rem)',
              textTransform: 'uppercase',
              color: 'var(--text)',
              letterSpacing: '0.01em',
              lineHeight: 0.95,
            }}
          >
            {item.title}
          </h3>
          {item.badge && (
            <span
              className="font-mono-label"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                alignSelf: 'flex-start',
                fontSize: '11px',
                color: 'var(--accent)',
                background: 'var(--accent-dim)',
                padding: '4px 10px',
                borderRadius: '999px',
                letterSpacing: '0.04em',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor', animation: 'pulse 2s infinite' }} />
              {item.badge}
            </span>
          )}
          <p style={{ color: 'var(--muted)', fontSize: '15.5px', lineHeight: 1.75 }}>{item.description}</p>
          {item.slug && (
            <Link
              to={`/about/${item.slug}`}
              className="font-condensed cursor-pointer"
              style={{
                alignSelf: 'flex-start',
                marginTop: '4px',
                fontSize: '1.15rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
                color: 'var(--accent)',
                textDecoration: 'none',
              }}
            >
              See more →
            </Link>
          )}
        </div>
      </motion.div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* 05 — the focus pull                                                 */
/* ------------------------------------------------------------------ */

/** The ending reverses the zoom: the contact block starts too close to the
 *  lens (oversized, out of focus) and settles sharp as you arrive. */
function FocusContact() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center 0.55'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1.4, 1])
  const blurV = useTransform(scrollYProgress, [0, 1], [9, 0])
  const filter = useTransform(blurV, (b) => `blur(${b}px)`)
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.7, 1])

  return (
    <section style={{ padding: 'clamp(96px, 16vh, 180px) 24px' }}>
      <div ref={ref} style={{ maxWidth: '640px', margin: '0 auto' }}>
        <motion.div style={reduce ? undefined : { scale, filter, opacity }}>
          <div style={{ textAlign: 'center' }}>
            <span
              className="font-mono-label"
              style={{ fontSize: '12px', color: 'var(--accent)', letterSpacing: '0.22em', textTransform: 'uppercase' }}
            >
              Let's connect
            </span>
            <h2
              className="font-condensed"
              style={{
                fontSize: 'clamp(2.4rem, 7vw, 4.6rem)',
                fontWeight: 800,
                textTransform: 'uppercase',
                lineHeight: 0.9,
                color: 'var(--text)',
                margin: '18px 0 36px',
              }}
            >
              Want to work
              <br />
              together?
            </h2>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button to="/contact" variant="primary">
                Get in touch
              </Button>
              <Button to="/projects" variant="secondary">
                See my work
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Reading (hidden until data) + the page                              */
/* ------------------------------------------------------------------ */

function BookRow({ title, author, note }: Readonly<{ title: string; author: string; note?: string }>) {
  return (
    <div style={{ padding: '14px 4px', borderTop: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px 14px' }}>
        <span style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text)' }}>{title}</span>
        <span className="font-mono-label" style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.08em' }}>
          {author}
        </span>
      </div>
      {note && <p style={{ marginTop: '6px', fontSize: '13px', lineHeight: 1.6, color: 'var(--muted)' }}>{note}</p>}
    </div>
  )
}

function ReadingScene() {
  return (
    <Scene>
      <AboutHeading index="04" eyebrow="Reading" title="On the bookshelf" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
        {reading.current && (
          <SlideIn from="right" distance={70}>
            <div style={{ border: '1px solid var(--border)', borderRadius: '14px', padding: '28px', maxWidth: '560px', background: 'var(--bg-2)' }}>
              <span
                className="font-mono-label"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '11px',
                  color: 'var(--accent)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  marginBottom: '14px',
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor', animation: 'pulse 2s infinite' }} />
                Reading now
              </span>
              <h3 className="font-display" style={{ fontSize: 'clamp(1.4rem, 2.6vw, 1.9rem)', color: 'var(--text)', lineHeight: 1.2 }}>
                {reading.current.title}
              </h3>
              <p className="font-mono-label" style={{ marginTop: '8px', fontSize: '12px', color: 'var(--muted)', letterSpacing: '0.08em' }}>
                {reading.current.author}
              </p>
              {reading.current.note && (
                <p style={{ marginTop: '14px', fontSize: '14px', lineHeight: 1.7, color: 'var(--muted)' }}>{reading.current.note}</p>
              )}
            </div>
          </SlideIn>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '48px' }}>
          {reading.read.length > 0 && (
            <SlideIn from="right" distance={50}>
              <span className="font-mono-label" style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '10px' }}>
                Read
              </span>
              <div style={{ borderBottom: '1px solid var(--border)' }}>
                {reading.read.map((book) => (
                  <BookRow key={book.title} {...book} />
                ))}
              </div>
            </SlideIn>
          )}
          {reading.planned.length > 0 && (
            <SlideIn from="right" distance={50} delay={0.08}>
              <span className="font-mono-label" style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '10px' }}>
                Up next
              </span>
              <div style={{ borderBottom: '1px solid var(--border)' }}>
                {reading.planned.map((book) => (
                  <BookRow key={book.title} {...book} />
                ))}
              </div>
            </SlideIn>
          )}
        </div>
      </div>
    </Scene>
  )
}

function AboutPage() {
  const reduce = useReducedMotion()
  const narrow = useNarrow()
  const flat = Boolean(reduce) || narrow
  const hasReading = reading.current !== null || reading.read.length > 0 || reading.planned.length > 0

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '48px' }}>
      {/* 01 + 02 — pinned zoom-through on desktop, flat scenes otherwise */}
      {flat ? (
        <div style={{ paddingTop: '104px' }}>
          <Scene>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '48px',
                alignItems: 'center',
              }}
            >
              <HelloText />
              <PortraitFrame />
            </div>
          </Scene>
          <Scene>
            <BackgroundContent />
          </Scene>
        </div>
      ) : (
        <HelloBackgroundPinned />
      )}

      {/* 03 — free time as the deck */}
      <section style={{ padding: 'clamp(64px, 10vh, 110px) 24px 0' }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
          <AboutHeading index="03" eyebrow="Free time" title="In my free time" />
          <SlideIn from="left">
            <p style={{ color: 'var(--muted)', maxWidth: '560px', lineHeight: 1.7, marginTop: '-16px', fontSize: '15px' }}>
              The stuff that fills the hours around the code. The first three have their own pages
              with more detail.
            </p>
          </SlideIn>
        </div>
      </section>
      <section style={{ padding: '0 24px' }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
          {interests.map((item, i) => (
            <DeckCard key={item.title} item={item} index={i} isLast={i === interests.length - 1} />
          ))}
        </div>
      </section>

      {/* 04 — reading, hidden until src/data/reading.ts has real titles */}
      {hasReading && <ReadingScene />}

      {/* 05 — contact, pulled into focus */}
      <FocusContact />
    </div>
  )
}

export default AboutPage
