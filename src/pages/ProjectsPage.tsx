import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { projects } from '../data/projects'
import ProjectCard from '../components/ProjectCard'
import { Reveal, Label, PageHeading } from '../components/shared'

function ProjectsPage() {
  return (
    <div style={{ minHeight: '100vh', padding: '128px 24px 96px' }}>
      <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
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
          <PageHeading>All Projects</PageHeading>
          <p style={{ color: 'var(--muted)', marginBottom: '64px', maxWidth: '520px', lineHeight: 1.7 }}>
            A collection of things I've built. More on the way.
          </p>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 100}>
              <ProjectCard project={project} showGithub />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectsPage
