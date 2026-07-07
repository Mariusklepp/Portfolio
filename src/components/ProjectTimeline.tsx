import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useVelocity,
  useSpring,
  useReducedMotion,
} from 'motion/react'
import { projects, formatMonthYear, type Project } from '../data/projects'
import ProjectCard from './ProjectCard'

/** Projects sorted by year. "newest" = newest at the top; "oldest" = oldest at
 *  the top. Either way you scroll DOWN — the toggle just reverses the order. */
function ordered(order: 'newest' | 'oldest'): Project[] {
  const sorted = [...projects].sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
  return order === 'newest' ? sorted : sorted.reverse()
}

// A gentle snaking line in a 0–60 × 0–1000 space (stretched to the real height).
const WAVE_PATH =
  'M30,0 C 50,70 50,140 30,210 C 10,280 10,350 30,420 C 50,490 50,560 30,630 C 10,700 10,770 30,840 C 46,905 38,955 30,1000'

export default function ProjectTimeline() {
  const reduce = useReducedMotion()
  const [order, setOrder] = useState<'newest' | 'oldest'>('newest')
  const [narrow, setNarrow] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    const update = () => setNarrow(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // The line draws as the section scrolls through the viewport.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end center'] })
  const drawn = useTransform(scrollYProgress, [0, 1], [0, 1])

  // ...and sways a touch with scroll velocity, to feel alive.
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const swaySpring = useSpring(velocity, { stiffness: 120, damping: 30, mass: 0.4 })
  const swayX = useTransform(swaySpring, [-3000, 0, 3000], [7, 0, -7], { clamp: true })

  const list = ordered(order)
  const lineLeft = narrow ? '22px' : '50%'

  return (
    <div>
      {/* Sort toggle — both directions still scroll downward */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '44px' }}>
        {(['newest', 'oldest'] as const).map((o) => {
          const isActive = order === o
          return (
            <button
              key={o}
              type="button"
              onClick={() => setOrder(o)}
              className="font-mono-label cursor-pointer"
              style={{
                fontSize: '12px',
                padding: '7px 14px',
                borderRadius: '999px',
                border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
                background: isActive ? 'var(--accent-dim)' : 'transparent',
                color: isActive ? 'var(--accent)' : 'var(--muted)',
                letterSpacing: '0.04em',
                transition: 'color 0.2s, border-color 0.2s, background 0.2s',
              }}
            >
              {o === 'newest' ? 'Newest first' : 'Oldest first'}
            </button>
          )
        })}
      </div>

      <div ref={ref} style={{ position: 'relative' }}>
        {/* The living line */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 0,
            left: lineLeft,
            width: '60px',
            height: '100%',
            transform: 'translateX(-50%)',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        >
          <motion.svg
            viewBox="0 0 60 1000"
            preserveAspectRatio="none"
            style={{ width: '100%', height: '100%', overflow: 'visible', x: reduce ? 0 : swayX }}
          >
            {/* faint full track */}
            <path d={WAVE_PATH} fill="none" stroke="var(--border)" strokeWidth={2} strokeLinecap="round" />
            {/* drawn-on-scroll accent line */}
            <motion.path
              d={WAVE_PATH}
              fill="none"
              stroke="var(--accent)"
              strokeWidth={2}
              strokeLinecap="round"
              style={{ pathLength: reduce ? 1 : drawn, filter: 'drop-shadow(0 0 6px var(--accent))' }}
            />
          </motion.svg>
        </div>

        {list.map((p, i) => {
          const isLeft = !narrow && i % 2 === 0
          const node = (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                width: narrow ? '44px' : '60px',
                zIndex: 1,
              }}
            >
              <span className="font-mono-label" style={{ fontSize: '12px', color: 'var(--accent)', whiteSpace: 'nowrap' }}>
                {formatMonthYear(p.date)}
              </span>
              <span
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: 'var(--bg)',
                  border: '2px solid var(--accent)',
                  boxShadow: '0 0 12px var(--accent)',
                  flexShrink: 0,
                }}
              />
            </div>
          )
          const card = (
            <div style={{ width: '100%', maxWidth: '380px' }}>
              <ProjectCard project={p} />
            </div>
          )

          return (
            <motion.div
              key={p.id}
              initial={reduce ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: narrow ? '44px 1fr' : '1fr 60px 1fr',
                columnGap: narrow ? '18px' : '32px',
                alignItems: 'center',
                marginBottom: '56px',
              }}
            >
              {narrow ? (
                <>
                  {node}
                  {card}
                </>
              ) : (
                <>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>{isLeft ? card : null}</div>
                  {node}
                  <div style={{ display: 'flex', justifyContent: 'flex-start' }}>{!isLeft ? card : null}</div>
                </>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
