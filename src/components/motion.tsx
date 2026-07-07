import { createContext, useContext, useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useVelocity,
  useSpring,
  useMotionValue,
  useReducedMotion,
  useMotionValueEvent,
  type MotionValue,
} from 'motion/react'

type SceneDir = 'up' | 'down' | 'left' | 'right' | 'none'

/** Per-scene "enter" progress (0 → 1), provided by SequencePhase so a scene's
 *  contents can choreograph themselves in as the scene travels into place. */
const SceneEnterContext = createContext<MotionValue<number> | null>(null)

/** A piece of scene content that staggers in from a direction as the scene
 *  enters. Outside a SceneSequence (or under reduced motion) it just shows. */
export function SceneItem({
  children,
  order = 0,
  from = 'up',
  distance = 64,
  style,
}: Readonly<{ children: React.ReactNode; order?: number; from?: SceneDir; distance?: number; style?: React.CSSProperties }>) {
  const ctx = useContext(SceneEnterContext)
  const reduce = useReducedMotion()
  const fallback = useMotionValue(1)
  const enter = ctx ?? fallback
  const start = Math.min(0.1 + order * 0.12, 0.55)
  const end = Math.min(start + 0.45, 1)
  const opacity = useTransform(enter, [start, end], [0, 1], { clamp: true })
  const x = useTransform(enter, [start, end], [from === 'left' ? -distance : from === 'right' ? distance : 0, 0], { clamp: true })
  const y = useTransform(enter, [start, end], [from === 'up' ? distance : from === 'down' ? -distance : 0, 0], { clamp: true })
  if (reduce || !ctx) return <div style={style}>{children}</div>
  return <motion.div style={{ opacity, x, y, ...style }}>{children}</motion.div>
}

/** A background layer that travels further than the foreground as the scene
 *  enters — parallax depth during the transition. */
export function SceneParallax({
  children,
  amount = 90,
  from = 'up',
  style,
}: Readonly<{ children: React.ReactNode; amount?: number; from?: SceneDir; style?: React.CSSProperties }>) {
  const ctx = useContext(SceneEnterContext)
  const reduce = useReducedMotion()
  const fallback = useMotionValue(1)
  const enter = ctx ?? fallback
  const x = useTransform(enter, [0, 1], [from === 'left' ? -amount : from === 'right' ? amount : 0, 0])
  const y = useTransform(enter, [0, 1], [from === 'up' ? amount : from === 'down' ? -amount : 0, 0])
  if (reduce || !ctx) return <div style={style}>{children}</div>
  return <motion.div style={{ x, y, ...style }}>{children}</motion.div>
}

/** A heading that reveals word-by-word (staggered rise + fade) as the scene enters. */
export function RevealWords({
  text,
  baseOrder = 0,
  style,
}: Readonly<{ text: string; baseOrder?: number; style?: React.CSSProperties }>) {
  const ctx = useContext(SceneEnterContext)
  const reduce = useReducedMotion()
  if (reduce || !ctx) return <span style={style}>{text}</span>
  const words = text.split(' ')
  return (
    <span style={style}>
      {words.flatMap((w, i) => {
        const word = <RevealWord key={i} enter={ctx} order={baseOrder + i} word={w} />
        return i < words.length - 1 ? [word, <span key={`sp-${i}`}> </span>] : [word]
      })}
    </span>
  )
}

function RevealWord({ enter, order, word }: Readonly<{ enter: MotionValue<number>; order: number; word: string }>) {
  const start = Math.min(0.1 + order * 0.07, 0.62)
  const end = Math.min(start + 0.4, 1)
  const y = useTransform(enter, [start, end], [34, 0], { clamp: true })
  const opacity = useTransform(enter, [start, end], [0, 1], { clamp: true })
  return <motion.span style={{ display: 'inline-block', y, opacity }}>{word}</motion.span>
}

/**
 * Effects that belong to the TRANSITION itself, not to any single scene: a
 * light band sweeps across the viewport and the seam blooms red as you cross
 * between scenes. Driven by global scroll — peaks halfway between scenes, fades
 * to nothing at each scene's centre.
 */
function SceneTransitions({ count }: Readonly<{ count: number }>) {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  // phase 0..(count-1): integer = a scene centred, half-integer = mid-transition.
  const phase = useTransform(scrollYProgress, (p) => {
    const v = Number.isNaN(p) ? 0 : p
    return Math.min(Math.max(v * count, 0), count - 1)
  })
  const intensity = useTransform(phase, (x) => Math.sin((x - Math.floor(x)) * Math.PI))
  const bloomOpacity = useTransform(intensity, [0, 1], [0, 0.3])

  if (reduce) return null
  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', overflow: 'hidden' }}>
      {/* red seam bloom — a brake-light flare at the swap, fading at scene centres */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: bloomOpacity,
          background: 'radial-gradient(circle at 50% 50%, rgba(229,9,20,0.5), transparent 62%)',
        }}
      />
    </div>
  )
}

/**
 * A fixed backdrop whose ember light drifts as you scroll the whole page.
 * This is what makes the landing feel like one continuous space you travel
 * through, rather than separate sections stacked in a document.
 */
export function TravelingBackdrop() {
  const reduce = useReducedMotion()
  const { scrollY, scrollYProgress } = useScroll()
  // The journey: the light source sinks and dims as you descend, the world
  // darkens, and a faint "core" ember emerges only near the bottom.
  const driftY = useTransform(scrollYProgress, [0, 1], ['-6vh', '16vh'])
  const lightOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.28])
  const deepen = useTransform(scrollYProgress, [0, 1], [0, 0.55])
  const coreGlow = useTransform(scrollYProgress, [0.55, 1], [0, 0.42])
  // Scroll speed gently stretches the light — a sense of travel/momentum.
  const velocity = useVelocity(scrollY)
  const smoothV = useSpring(velocity, { stiffness: 120, damping: 30, mass: 0.4 })
  const speedStretch = useTransform(smoothV, [-4000, 0, 4000], [1.16, 1, 1.16], { clamp: true })

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        background: '#08080A',
        overflow: 'hidden',
      }}
    >
      {/* the light source — sinks, dims, and stretches with scroll speed */}
      <motion.div
        aria-hidden
        style={{ position: 'absolute', inset: 0, y: reduce ? 0 : driftY, opacity: reduce ? 1 : lightOpacity }}
      >
        <motion.div
          style={{
            position: 'absolute',
            top: '-12%',
            left: '50%',
            width: '120vmax',
            height: '95vmax',
            x: '-50%',
            scaleY: reduce ? 1 : speedStretch,
            background:
              'radial-gradient(58% 58% at 50% 28%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.015) 36%, transparent 72%)',
          }}
        />
      </motion.div>
      {/* descent: the further down you go, the darker the world */}
      <motion.div aria-hidden style={{ position: 'absolute', inset: 0, background: '#000', opacity: reduce ? 0 : deepen }} />
      {/* the core — a faint ember that only emerges near the end of the journey */}
      <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          opacity: reduce ? 0 : coreGlow,
          background: 'radial-gradient(80% 50% at 50% 100%, rgba(229,9,20,0.16) 0%, transparent 60%)',
        }}
      />
      {/* vignette to sink the edges */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(120% 100% at 50% 26%, transparent 38%, rgba(0,0,0,0.6) 100%)',
        }}
      />
      {/* fine film grain for texture */}
      <div aria-hidden className="bg-grain" />
    </div>
  )
}

/**
 * A scroll-triggered reveal: slides in from a direction (the editorial
 * choreography — left-side elements from x:-50, right-side from x:50) and fades,
 * once, when it scrolls into view.
 */
export function SlideIn({
  children,
  from = 'up',
  distance = 50,
  delay = 0,
  style,
}: Readonly<{
  children: React.ReactNode
  from?: SceneDir
  distance?: number
  delay?: number
  style?: React.CSSProperties
}>) {
  const reduce = useReducedMotion()
  const x = from === 'left' ? -distance : from === 'right' ? distance : 0
  const y = from === 'up' ? distance : from === 'down' ? -distance : 0
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  )
}

/**
 * Scroll-linked vertical drift — gives a layer its own depth so it moves at a
 * slightly different rate than the rest of the page as you scroll past it.
 */
export function Parallax({
  children,
  amount = 40,
}: Readonly<{ children: React.ReactNode; amount?: number }>) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount])
  return (
    <motion.div ref={ref} style={{ y: reduce ? 0 : y }}>
      {children}
    </motion.div>
  )
}

/**
 * Content that "arrives": rises and fades in when scrolled into view, once.
 */
export function SceneReveal({
  children,
  delay = 0,
  y = 40,
}: Readonly<{ children: React.ReactNode; delay?: number; y?: number }>) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/**
 * A pinned, scroll-scrubbed scene. The viewport holds still ("sticky") while
 * the visitor's scroll drives the content: it flies in, holds, and flies out.
 * This is the core "you're scrubbing a scene, not scrolling a document" feel.
 *
 * `track` is how much scroll distance the scene occupies (taller = more
 * dwell time on the pinned moment).
 */
export function PinnedScene({
  children,
  track = '200vh',
}: Readonly<{ children: React.ReactNode; track?: string }>) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.86, 1, 1, 1.08])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [90, 0, 0, -90])

  // Reduced motion: no pin, no scrub — just a normal, fully visible section.
  if (reduce) {
    return (
      <section style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto' }}>{children}</div>
      </section>
    )
  }

  return (
    <section ref={ref} style={{ height: track, position: 'relative' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <motion.div
          style={{
            opacity,
            scale,
            y,
            width: '100%',
            maxWidth: '1024px',
            margin: '0 auto',
            padding: '0 24px',
          }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}

type VariantVals = { opacity: number; y: number; scale: number; rot: number; blur: number; clip: number }
const FULL_CLIP = 130
const ENTER_VARIANTS: Record<string, VariantVals> = {
  slide: { opacity: 0, y: 170, scale: 0.86, rot: 9, blur: 12, clip: FULL_CLIP },
  bloom: { opacity: 0, y: 0, scale: 0.55, rot: 0, blur: 8, clip: 0 },
}
const EXIT_VARIANTS: Record<string, VariantVals> = {
  slide: { opacity: 0, y: -170, scale: 1.12, rot: -9, blur: 12, clip: FULL_CLIP },
  ignite: { opacity: 0, y: -40, scale: 1.28, rot: 0, blur: 18, clip: FULL_CLIP },
}

/** The morphing connector for Hero → Currently ("Ignition"): the ember collapses
 *  to a bright point, then blooms outward as the next scene emerges from it. */
function SceneSpark() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const sp = useTransform(scrollYProgress, (p) => (Number.isNaN(p) ? 0 : p))
  const opacity = useTransform(sp, [0, 0.12, 0.2, 0.28], [0, 0.9, 0.4, 0])
  const scale = useTransform(sp, [0, 0.12, 0.2, 0.28], [2.2, 0.3, 5, 8])
  if (reduce) return null
  return (
    <motion.div
      aria-hidden
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '34vh',
        height: '34vh',
        x: '-50%',
        y: '-50%',
        scale,
        opacity,
        zIndex: 2,
        pointerEvents: 'none',
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(255,225,215,0.95) 0%, rgba(255,80,70,0.7) 26%, rgba(229,9,20,0.25) 52%, transparent 70%)',
        filter: 'blur(4px)',
      }}
    />
  )
}

function SequencePhase({
  index,
  count,
  progress,
  enterVariant = 'slide',
  exitVariant = 'slide',
  children,
}: Readonly<{
  index: number
  count: number
  progress: MotionValue<number>
  enterVariant?: string
  exitVariant?: string
  children: React.ReactNode
}>) {
  const span = 1 / count
  const start = index * span
  const first = index === 0
  const last = index === count - 1

  // Overlapping in/out windows (kept within [0,1]) so each scene dissolves
  // into the next. The last scene holds visible instead of fading out.
  const fadeIn = start - span * 0.32
  const inDone = start + span * 0.06
  const outStart = start + span * 0.94
  const fadeOut = start + span * 1.32

  // The first scene starts fully visible at the top; the last scene holds
  // visible at the bottom; middle scenes fade both in and out.
  // A compound, scrubbed transition (landonorris-style): a scene doesn't just
  // fade — it slides, scales, tilts in 3D and blurs at once, so its whole shape
  // changes as you travel between scenes. Movement dominates; opacity only
  // cleans up the far edges so panels don't ghost through each other.
  const e = ENTER_VARIANTS[enterVariant] ?? ENTER_VARIANTS.slide
  const x = EXIT_VARIANTS[exitVariant] ?? EXIT_VARIANTS.slide

  let input: number[]
  let opacityOut: number[]
  let yOut: number[]
  let scaleOut: number[]
  let rotateOut: number[]
  let blurOut: number[]
  let clipOut: number[]
  if (first) {
    input = [0, outStart, fadeOut]
    opacityOut = [1, 1, x.opacity]
    yOut = [0, 0, x.y]
    scaleOut = [1, 1, x.scale]
    rotateOut = [0, 0, x.rot]
    blurOut = [0, 0, x.blur]
    clipOut = [FULL_CLIP, FULL_CLIP, x.clip]
  } else if (last) {
    input = [fadeIn, inDone, 1]
    opacityOut = [e.opacity, 1, 1]
    yOut = [e.y, 0, 0]
    scaleOut = [e.scale, 1, 1]
    rotateOut = [e.rot, 0, 0]
    blurOut = [e.blur, 0, 0]
    clipOut = [e.clip, FULL_CLIP, FULL_CLIP]
  } else {
    input = [fadeIn, inDone, outStart, fadeOut]
    opacityOut = [e.opacity, 1, 1, x.opacity]
    yOut = [e.y, 0, 0, x.y]
    scaleOut = [e.scale, 1, 1, x.scale]
    rotateOut = [e.rot, 0, 0, x.rot]
    blurOut = [e.blur, 0, 0, x.blur]
    clipOut = [e.clip, FULL_CLIP, FULL_CLIP, x.clip]
  }

  const opacity = useTransform(progress, input, opacityOut)
  const y = useTransform(progress, input, yOut)
  const scale = useTransform(progress, input, scaleOut)
  const rotateX = useTransform(progress, input, rotateOut)
  const blurAmount = useTransform(progress, input, blurOut)
  const blur = useTransform(blurAmount, (b) => `blur(${b}px)`)
  const clipR = useTransform(progress, input, clipOut)
  const clipPath = useTransform(clipR, (r) => `circle(${r}% at 50% 50%)`)

  // Per-scene "enter" progress (0 as it approaches, 1 once centred) so the scene's
  // contents can choreograph themselves in. The first scene is present from the
  // top, so it stays revealed.
  const enterRaw = useTransform(progress, [start - span * 0.1, start + span * 0.7], [0, 1], { clamp: true })
  const enterFirst = useMotionValue(1)
  const sceneEnter = first ? enterFirst : enterRaw

  // Only the visible scene should capture clicks. Use plain state (not a bound
  // motion value — binding pointer-events as a motion value breaks WAAPI).
  const [interactive, setInteractive] = useState(first)
  useMotionValueEvent(opacity, 'change', (v) => {
    const next = v > 0.6
    setInteractive((prev) => (prev === next ? prev : next))
  })

  return (
    <motion.div
      style={{
        position: 'absolute',
        inset: 0,
        opacity,
        pointerEvents: interactive ? 'auto' : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'min(8vh, 80px) clamp(24px, 5vw, 56px)',
      }}
    >
      <motion.div
        style={{ y, scale, rotateX, filter: blur, clipPath, transformPerspective: 1200, width: '100%', maxWidth: '1100px' }}
      >
        <SceneEnterContext.Provider value={sceneEnter}>{children}</SceneEnterContext.Provider>
      </motion.div>
    </motion.div>
  )
}

/**
 * One pinned stage that holds several scenes and crossfades from one to the
 * next as you scroll — so the whole landing reads as a single continuous film,
 * with the hero as its opening shot rather than a detached top section.
 */
export function SceneSequence({ scenes }: Readonly<{ scenes: React.ReactNode[] }>) {
  const reduce = useReducedMotion()
  // Use the global page scroll (robust under StrictMode) rather than a
  // target-ref measurement. The sequence spans the whole landing, so page
  // progress maps directly onto the scenes.
  const { scrollY, scrollYProgress } = useScroll()
  // Before layout is measured the scrollable distance can be 0, making
  // scrollYProgress NaN (0/0). Feeding NaN through the transforms yields
  // opacity:NaN — invalid CSS that browsers treat as opacity:1, so every
  // scene paints at once and overlaps. Sanitize NaN -> 0 at the source.
  const progress = useTransform(scrollYProgress, (v) => (Number.isNaN(v) ? 0 : v))

  // Speed reaction — the most "F1" touch. Scroll velocity (px/s) gently shears
  // and blurs the whole stage, then springs back to rest the instant you stop.
  // Capped low so it reads as momentum/G-force, never nausea. The fixed ember
  // backdrop sits outside this layer, so the *foreground* reacts to speed while
  // the background stays calm — exactly how depth-of-field reads on track.
  const velocity = useVelocity(scrollY)
  const smoothV = useSpring(velocity, { stiffness: 130, damping: 28, mass: 0.45 })
  const skewY = useTransform(smoothV, [-3500, 0, 3500], [3, 0, -3], { clamp: true })
  const blur = useTransform(smoothV, (v) => `blur(${Math.min(Math.abs(v) / 2200, 2)}px)`)

  // Reduced motion: no pin, no crossfade — plain stacked sections.
  if (reduce) {
    return (
      <>
        {scenes.map((scene, i) => (
          <section
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            style={{
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              padding: '96px 24px',
            }}
          >
            <div style={{ width: '100%', maxWidth: '1024px', margin: '0 auto' }}>{scene}</div>
          </section>
        ))}
      </>
    )
  }

  return (
    <section style={{ height: `${scenes.length * 190}vh`, position: 'relative' }}>
      {/* Sticky stage stays put (transform on a *child*, not here, so sticky
          never breaks). The inner layer carries the speed shear/blur. */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            skewY,
            filter: blur,
            transformOrigin: '50% 50%',
            willChange: 'transform, filter',
          }}
        >
          {scenes.map((scene, i) => (
            <SequencePhase
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              index={i}
              count={scenes.length}
              progress={progress}
              exitVariant={i === 0 ? 'ignite' : 'slide'}
              enterVariant={i === 1 ? 'bloom' : 'slide'}
            >
              {scene}
            </SequencePhase>
          ))}
        </motion.div>
        <SceneSpark />
        <SceneTransitions count={scenes.length} />
      </div>
    </section>
  )
}
