import { Link, useParams } from 'react-router-dom'
import { Reveal, Label, PageHeading } from '../components/shared'
import { GradeOverlay, MediaFrame } from '../components/media'
import { getPursuit, pursuits } from '../data/pursuits'

/**
 * The deep page for one pursuit (/about/:slug) — where the About hub's
 * chapters open up: the full story, photos/video, and (once the data exists)
 * stats like PRs or a golf handicap, and a "lately" log of rounds and trips.
 * Every section renders only when it has real content, so a thin pursuit
 * still makes a clean page.
 */
function PursuitPage() {
  const { slug } = useParams()
  const pursuit = getPursuit(slug)

  if (!pursuit) {
    return (
      <div style={{ minHeight: '100vh', padding: '160px 24px' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
          <PageHeading>Nothing here</PageHeading>
          <p style={{ color: 'var(--muted)', marginBottom: '32px' }}>That page doesn't exist.</p>
          <Link to="/about" className="font-mono-label cursor-pointer" style={{ color: 'var(--accent)', fontSize: '13px', textDecoration: 'none' }}>
            ← Back to about
          </Link>
        </div>
      </div>
    )
  }

  const others = pursuits.filter((p) => p.slug !== pursuit.slug)

  return (
    <div style={{ minHeight: '100vh', padding: '128px 24px 96px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <Reveal>
          <Link
            to="/about"
            className="font-mono-label cursor-pointer"
            style={{ display: 'inline-block', fontSize: '12px', color: 'var(--muted)', textDecoration: 'none', marginBottom: '48px' }}
          >
            ← About
          </Link>
          <Label n="free time" text={pursuit.name} />
          <PageHeading>{pursuit.name}</PageHeading>
          {pursuit.badge && (
            <span
              className="font-mono-label"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '11px',
                color: 'var(--accent)',
                background: 'var(--accent-dim)',
                padding: '4px 10px',
                borderRadius: '999px',
                letterSpacing: '0.04em',
                marginBottom: '8px',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor', animation: 'pulse 2s infinite' }} />
              {pursuit.badge}
            </span>
          )}
        </Reveal>

        {/* The story */}
        <Reveal delay={60}>
          <div
            style={{
              maxWidth: '640px',
              margin: '32px 0 0',
              color: 'var(--muted)',
              fontSize: '16px',
              lineHeight: 1.85,
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
            }}
          >
            {pursuit.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        {/* Photos / video */}
        {pursuit.media && pursuit.media.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px',
              margin: '64px 0 0',
            }}
          >
            {pursuit.media.map((src, i) => (
              <Reveal key={src} delay={i * 80}>
                <div style={{ position: 'relative', aspectRatio: '4 / 5', borderRadius: '10px', overflow: 'hidden' }}>
                  <MediaFrame src={src} alt={`${pursuit.name} ${i + 1}`} />
                  <GradeOverlay />
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {/* The numbers (PRs, handicap...) — only once real data exists */}
        {pursuit.stats && pursuit.stats.length > 0 && (
          <Reveal>
            <div style={{ margin: '72px 0 0', borderBottom: '1px solid var(--border)' }}>
              {pursuit.stats.map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    flexWrap: 'wrap',
                    gap: '10px 28px',
                    padding: '22px 4px',
                    borderTop: '1px solid var(--border)',
                  }}
                >
                  <span className="font-condensed" style={{ fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 0.9, color: 'var(--text)' }}>
                    {stat.value}
                  </span>
                  <span className="font-mono-label" style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)' }}>
                    {stat.label}
                  </span>
                  {stat.detail && <span style={{ fontSize: '13px', color: 'var(--muted)' }}>{stat.detail}</span>}
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {/* Lately — rounds, trips, race entries... only once real data exists */}
        {pursuit.log && pursuit.log.length > 0 && (
          <Reveal>
            <div style={{ margin: '72px 0 0' }}>
              <span
                className="font-mono-label"
                style={{ display: 'block', fontSize: '12px', color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '20px' }}
              >
                Lately
              </span>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {pursuit.log.map((entry) => (
                  <div
                    key={entry.date + entry.text}
                    style={{ display: 'flex', gap: '24px', padding: '14px 4px', borderTop: '1px solid var(--border)', alignItems: 'baseline' }}
                  >
                    <span className="font-mono-label" style={{ fontSize: '11px', color: 'var(--muted)', whiteSpace: 'nowrap' }}>
                      {entry.date}
                    </span>
                    <span style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text)' }}>{entry.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {/* Onwards — the other pursuits */}
        <Reveal>
          <div style={{ margin: '88px 0 0', display: 'flex', flexWrap: 'wrap', gap: '14px 40px', borderTop: '1px solid var(--border)', paddingTop: '28px' }}>
            {others.map((p) => (
              <Link
                key={p.slug}
                to={`/about/${p.slug}`}
                className="font-condensed cursor-pointer"
                style={{
                  fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  textDecoration: 'none',
                  transition: 'color 0.25s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
              >
                {p.name} →
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  )
}

export default PursuitPage
