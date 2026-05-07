import { useParams, Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { projects } from '../data/projects'

function ProjectPage() {
  const { id } = useParams<{ id: string }>()
  const index = projects.findIndex((p) => p.id === id)
  const project = index === -1 ? undefined : projects[index]
  const prev = index > 0 ? projects[index - 1] : null
  const next = index < projects.length - 1 ? projects[index + 1] : null

  if (!project) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              fontSize: '2rem',
              color: 'var(--text)',
              marginBottom: '16px',
              letterSpacing: '-0.02em',
            }}
          >
            Project not found
          </h1>
          <Link
            to="/projects"
            className="font-mono-label cursor-pointer"
            style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: '13px' }}
          >
            ← Back to projects
          </Link>
        </div>
      </div>
    )
  }

  const tagStyle = {
    fontSize: '11px',
    color: 'var(--muted)',
    background: 'var(--bg-2)',
    border: '1px solid var(--border)',
    padding: '3px 10px',
    borderRadius: '6px',
  }

  return (
    <div style={{ minHeight: '100vh', padding: '128px 24px 96px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        {/* Back */}
        <Link
          to="/projects"
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
          all projects
        </Link>

        {/* Header */}
        <div
          className={`bg-gradient-to-br ${project.accent}`}
          style={{
            height: '200px',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '40px',
          }}
        >
          <span
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 800,
              color: 'var(--on-gradient)',
              userSelect: 'none',
              letterSpacing: '-0.02em',
            }}
          >
            {project.title}
          </span>
        </div>

        {/* Title row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <h1
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(2rem, 5vw, 2.6rem)',
              color: 'var(--text)',
              letterSpacing: '-0.02em',
            }}
          >
            {project.title}
          </h1>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="font-mono-label cursor-pointer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              color: 'var(--text)',
              padding: '8px 14px',
              borderRadius: '10px',
              fontSize: '12px',
              textDecoration: 'none',
              marginTop: '4px',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent)'
              e.currentTarget.style.color = 'var(--accent)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text)'
            }}
          >
            <Icon icon="lucide:github" width={14} height={14} />
            GitHub
          </a>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '40px' }}>
          {project.tags.map((tag) => (
            <span key={tag} className="font-mono-label" style={tagStyle}>
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p
          style={{
            color: 'var(--muted)',
            lineHeight: 1.85,
            whiteSpace: 'pre-line',
            fontSize: '16px',
          }}
        >
          {project.longDescription}
        </p>

        {/* Prev / Next */}
        {(prev || next) && (
          <div
            style={{
              marginTop: '80px',
              paddingTop: '32px',
              borderTop: '1px solid var(--border)',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
            }}
          >
            <div>
              {prev && (
                <Link
                  to={`/projects/${prev.id}`}
                  className="cursor-pointer"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    padding: '16px',
                    borderRadius: '10px',
                    border: '1px solid var(--border)',
                    background: 'var(--surface)',
                    textDecoration: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                >
                  <span
                    className="font-mono-label"
                    style={{ fontSize: '11px', color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Icon icon="lucide:arrow-left" width={12} height={12} />
                    previous
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>
                    {prev.title}
                  </span>
                </Link>
              )}
            </div>
            <div>
              {next && (
                <Link
                  to={`/projects/${next.id}`}
                  className="cursor-pointer"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    padding: '16px',
                    borderRadius: '10px',
                    border: '1px solid var(--border)',
                    background: 'var(--surface)',
                    textDecoration: 'none',
                    textAlign: 'right',
                    marginLeft: 'auto',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
                >
                  <span
                    className="font-mono-label"
                    style={{ fontSize: '11px', color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}
                  >
                    next
                    <Icon icon="lucide:arrow-right" width={12} height={12} />
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>
                    {next.title}
                  </span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectPage
