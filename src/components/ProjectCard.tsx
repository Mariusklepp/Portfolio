import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { type Project } from '../data/projects'
import Tag from './Tag'

interface Props {
  project: Project
  showGithub?: boolean
}

function ProjectCard({ project, showGithub = false }: Readonly<Props>) {
  if (showGithub) {
    return (
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '14px',
          overflow: 'hidden',
          transition: 'border-color 0.2s, transform 0.2s',
          height: '100%',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent)'
          e.currentTarget.style.transform = 'translateY(-3px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border)'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        <Link
          to={`/projects/${project.id}`}
          aria-label={project.title}
          style={{ position: 'absolute', inset: 0, zIndex: 0 }}
        />
        <ProjectAccent title={project.title} accent={project.accent} />
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
          <h3 style={{ fontWeight: 700, fontSize: '18px', color: 'var(--text)', letterSpacing: '-0.01em' }}>
            {project.title}
          </h3>
          <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.7, flex: 1 }}>
            {project.description}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {project.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
          </div>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="font-mono-label cursor-pointer"
            style={{
              position: 'relative',
              zIndex: 10,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              color: 'var(--accent)',
              textDecoration: 'none',
              width: 'fit-content',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.75')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            <Icon icon="lucide:github" width={13} height={13} />
            GitHub →
          </a>
        </div>
      </div>
    )
  }

  return (
    <Link
      to={`/projects/${project.id}`}
      className="cursor-pointer"
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '14px',
        overflow: 'hidden',
        textDecoration: 'none',
        transition: 'border-color 0.2s, transform 0.2s',
        height: '100%',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--accent)'
        e.currentTarget.style.transform = 'translateY(-3px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <ProjectAccent title={project.title} accent={project.accent} />
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
        <h3 style={{ fontWeight: 700, fontSize: '18px', color: 'var(--text)', letterSpacing: '-0.01em' }}>
          {project.title}
        </h3>
        <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.7, flex: 1 }}>
          {project.description}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {project.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
        </div>
      </div>
    </Link>
  )
}

function ProjectAccent({ title, accent }: Readonly<{ title: string; accent: string }>) {
  return (
    <div
      className={`bg-gradient-to-br ${accent}`}
      style={{ height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <span
        className="font-display"
        style={{
          fontSize: '28px',
          fontWeight: 800,
          color: 'var(--on-gradient)',
          userSelect: 'none',
          letterSpacing: '-0.02em',
        }}
      >
        {title}
      </span>
    </div>
  )
}

export default ProjectCard
