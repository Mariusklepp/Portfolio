import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { projects, formatMonthYear, type Project } from '../data/projects'
import { Reveal, Label, PageHeading } from '../components/shared'
import ProjectTimeline from '../components/ProjectTimeline'

type FilterDef = { label: string; match: (p: Project) => boolean }

// Status strings in the data are varied; bucket them into two stages.
const COMPLETED_STATUS = new Set(['shipped', 'live', 'completed', 'done', 'released'])
const IN_DEV_STATUS = new Set(['in development', 'in design', 'in progress', 'wip', 'building', 'planned'])
const statusOf = (p: Project) => (p.status ?? '').toLowerCase()

/** Filter pills: All, each category (first-appearance order), then status stage. */
const FILTERS: FilterDef[] = [
  { label: 'All', match: () => true },
  ...[...new Set(projects.map((p) => p.category).filter((c): c is string => Boolean(c)))].map(
    (cat): FilterDef => ({ label: cat, match: (p) => p.category === cat }),
  ),
  { label: 'Completed', match: (p) => COMPLETED_STATUS.has(statusOf(p)) },
  { label: 'In Development', match: (p) => IN_DEV_STATUS.has(statusOf(p)) },
]

/** The mono detail line revealed on hover: year · stack · headline metric. */
function specParts(p: Project): string[] {
  const stack = p.tech.slice(0, 2).map((t) => t.name).join(' + ')
  return [formatMonthYear(p.date), stack, p.metric].filter(Boolean) as string[]
}

/** A slim index row that expands on hover to reveal the pitch + spec. */
function ProjectRow({ project, index }: Readonly<{ project: Project; index: number }>) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      to={`/projects/${project.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="cursor-pointer"
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        gap: 'clamp(14px, 3vw, 36px)',
        alignItems: 'center',
        paddingTop: '16px',
        paddingBottom: '16px',
        paddingRight: '10px',
        paddingLeft: hovered ? '20px' : '10px',
        borderBottom: '1px solid var(--border)',
        textDecoration: 'none',
        transition: 'background 0.3s ease, padding-left 0.3s ease',
        background: hovered ? 'linear-gradient(90deg, var(--accent-dim), transparent 60%)' : 'transparent',
      }}
    >
      <span
        className="font-mono-label"
        style={{ fontSize: '13px', color: hovered ? 'var(--accent)' : 'var(--muted)', transition: 'color 0.3s' }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <div style={{ minWidth: 0 }}>
        <h2
          className="font-display"
          style={{
            fontWeight: 800,
            fontSize: 'clamp(1.5rem, 4vw, 2.4rem)',
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: hovered ? 'var(--accent)' : 'var(--text)',
            transition: 'color 0.3s',
            margin: 0,
          }}
        >
          {project.title}
        </h2>

        {/* Expands on hover */}
        <div
          style={{
            display: 'grid',
            gridTemplateRows: hovered ? '1fr' : '0fr',
            transition: 'grid-template-rows 0.35s ease',
          }}
        >
          <div style={{ overflow: 'hidden' }}>
            <p
              style={{
                color: 'var(--muted)',
                fontSize: '14px',
                lineHeight: 1.6,
                maxWidth: '560px',
                margin: '12px 0 0',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {project.description}
            </p>
            <div className="font-mono-label" style={{ fontSize: '11px', letterSpacing: '0.04em', marginTop: '12px' }}>
              {specParts(project).map((part, idx) => (
                <span key={part}>
                  {idx > 0 && <span style={{ margin: '0 9px', color: 'var(--border)' }}>·</span>}
                  <span style={{ color: 'var(--muted)' }}>{part}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {project.status && (
          <span
            className="font-mono-label"
            style={{
              fontSize: '10px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              background: 'var(--accent-dim)',
              padding: '4px 10px',
              borderRadius: '999px',
              whiteSpace: 'nowrap',
            }}
          >
            {project.status}
          </span>
        )}
        <Icon
          icon="lucide:arrow-up-right"
          width={24}
          height={24}
          color={hovered ? 'var(--accent)' : 'var(--muted)'}
          style={{ transition: 'color 0.3s, transform 0.3s', transform: hovered ? 'translate(3px, -3px)' : 'none', flexShrink: 0 }}
        />
      </div>
    </Link>
  )
}

function FilterPill({
  label,
  count,
  active,
  onClick,
}: Readonly<{ label: string; count: number; active: boolean; onClick: () => void }>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="font-mono-label cursor-pointer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '7px',
        fontSize: '12px',
        padding: '7px 14px',
        borderRadius: '999px',
        border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
        background: active ? 'var(--accent-dim)' : 'transparent',
        color: active ? 'var(--accent)' : 'var(--muted)',
        letterSpacing: '0.04em',
        transition: 'color 0.2s, border-color 0.2s, background 0.2s',
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.borderColor = 'var(--accent)'
          e.currentTarget.style.color = 'var(--text)'
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.borderColor = 'var(--border)'
          e.currentTarget.style.color = 'var(--muted)'
        }
      }}
    >
      {label}
      <span style={{ fontSize: '10px', opacity: 0.6 }}>{count}</span>
    </button>
  )
}

function ProjectsPage() {
  const reduce = useReducedMotion()
  const [view, setView] = useState<'list' | 'timeline'>('list')
  const [filter, setFilter] = useState('All')
  const active = FILTERS.find((f) => f.label === filter) ?? FILTERS[0]
  const filtered = projects.filter(active.match)

  return (
    <div style={{ minHeight: '100vh', padding: '128px 24px 96px' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        <Link
          to="/"
          className="font-mono-label cursor-pointer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            color: 'var(--muted)',
            textDecoration: 'none',
            marginBottom: '48px',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
        >
          <Icon icon="lucide:arrow-left" width={14} height={14} />
          back to home
        </Link>

        <Reveal>
          <Label n="·" text="projects" />
          <PageHeading>The work</PageHeading>
          <p style={{ color: 'var(--muted)', marginBottom: '32px', maxWidth: '520px', lineHeight: 1.7 }}>
            Things I've built — hover a row to expand it, click to open. More on the way.
          </p>
        </Reveal>

        {/* View toggle: List | Timeline */}
        <Reveal delay={60}>
          <div
            style={{
              display: 'inline-flex',
              gap: '4px',
              padding: '4px',
              border: '1px solid var(--border)',
              borderRadius: '999px',
              marginBottom: '28px',
            }}
          >
            {(['list', 'timeline'] as const).map((v) => {
              const isActive = view === v
              return (
                <button
                  key={v}
                  type="button"
                  onClick={() => setView(v)}
                  className="font-mono-label cursor-pointer"
                  style={{
                    fontSize: '12px',
                    padding: '7px 16px',
                    borderRadius: '999px',
                    border: 'none',
                    background: isActive ? 'var(--accent)' : 'transparent',
                    color: isActive ? '#fff' : 'var(--muted)',
                    letterSpacing: '0.04em',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                >
                  {v === 'list' ? 'List' : 'Timeline'}
                </button>
              )
            })}
          </div>
        </Reveal>

        {view === 'list' ? (
          <>
            {/* Filter pills */}
            <Reveal delay={80}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
                {FILTERS.map((f) => (
                  <FilterPill
                    key={f.label}
                    label={f.label}
                    count={projects.filter(f.match).length}
                    active={filter === f.label}
                    onClick={() => setFilter(f.label)}
                  />
                ))}
              </div>
            </Reveal>

            {/* Index — rows reflow with a layout animation when the filter changes */}
            <div style={{ borderTop: '1px solid var(--border)' }}>
              <AnimatePresence mode="popLayout">
                {filtered.map((p, i) => (
                  <motion.div
                    key={p.id}
                    layout={reduce ? false : 'position'}
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                    transition={{ duration: reduce ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ProjectRow project={p} index={i} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        ) : (
          <ProjectTimeline />
        )}
      </div>
    </div>
  )
}

export default ProjectsPage
