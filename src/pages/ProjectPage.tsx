import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { projects, type ProjectImage } from '../data/projects'

function CodeBlock({ text, lang }: Readonly<{ text: string; lang?: string }>) {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      // clipboard may be unavailable; ignore silently
    }
  }

  return (
    <div
      style={{
        position: 'relative',
        margin: '20px 0 32px',
        borderRadius: '12px',
        border: '1px solid var(--border)',
        background: '#0d0f12',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 14px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          background: 'rgba(255, 255, 255, 0.02)',
        }}
      >
        <span
          className="font-mono-label"
          style={{
            fontSize: '11px',
            color: 'rgba(255, 255, 255, 0.55)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          {lang ?? 'shell'}
        </span>
        <button
          type="button"
          onClick={onCopy}
          aria-label="Copy code"
          className="cursor-pointer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'transparent',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            color: copied ? 'var(--green, #4ade80)' : 'rgba(255, 255, 255, 0.7)',
            borderRadius: '8px',
            padding: '4px 10px',
            fontSize: '11px',
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={(e) => {
            if (!copied) e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
          }}
          onMouseLeave={(e) => {
            if (!copied) e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'
          }}
        >
          <Icon
            icon={copied ? 'lucide:check' : 'lucide:copy'}
            width={12}
            height={12}
          />
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre
        style={{
          margin: 0,
          padding: '16px 18px',
          color: '#e6e8eb',
          fontSize: '13px',
          lineHeight: 1.6,
          fontFamily:
            "'JetBrains Mono', 'Fira Code', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
          overflowX: 'auto',
          whiteSpace: 'pre',
        }}
      >
        <code>{text}</code>
      </pre>
    </div>
  )
}

function ProjectPage() {
  const { id } = useParams<{ id: string }>()
  const index = projects.findIndex((p) => p.id === id)
  const project = index === -1 ? undefined : projects[index]
  const prev = index > 0 ? projects[index - 1] : null
  const next = index < projects.length - 1 ? projects[index + 1] : null

  const [lightboxImage, setLightboxImage] = useState<ProjectImage | null>(null)

  useEffect(() => {
    if (!lightboxImage) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxImage(null)
    }
    window.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [lightboxImage])

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

        {/* Body */}
        {project.content && project.content.length > 0 ? (
          <div>
            {project.content.map((block, i) => {
              if (block.type === 'heading') {
                return (
                  <div key={i} style={{ marginTop: '64px', marginBottom: '20px' }}>
                    {block.eyebrow && (
                      <div
                        className="font-mono-label"
                        style={{
                          fontSize: '11px',
                          color: 'var(--accent)',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          marginBottom: '8px',
                        }}
                      >
                        {block.eyebrow}
                      </div>
                    )}
                    <h2
                      style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontWeight: 700,
                        fontSize: '1.7rem',
                        color: 'var(--text)',
                        letterSpacing: '-0.01em',
                        marginBottom: block.subtitle ? '8px' : 0,
                      }}
                    >
                      {block.text}
                    </h2>
                    {block.subtitle && (
                      <p
                        style={{
                          color: 'var(--muted)',
                          fontSize: '15px',
                          lineHeight: 1.6,
                          margin: 0,
                        }}
                      >
                        {block.subtitle}
                      </p>
                    )}
                  </div>
                )
              }
              if (block.type === 'paragraph') {
                return (
                  <p
                    key={i}
                    style={{
                      color: 'var(--muted)',
                      lineHeight: 1.85,
                      fontSize: '16px',
                      marginBottom: '20px',
                    }}
                  >
                    {block.text}
                  </p>
                )
              }
              if (block.type === 'image') {
                return (
                  <figure
                    key={i}
                    onClick={() => setLightboxImage({ src: block.src, alt: block.alt })}
                    className="cursor-pointer"
                    style={{
                      margin: '32px 0 40px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: '1px solid var(--border)',
                      background: 'var(--surface)',
                      transition: 'border-color 0.2s, transform 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <img
                      src={block.src}
                      alt={block.alt}
                      loading="lazy"
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                    {block.caption && (
                      <figcaption
                        style={{
                          fontSize: '13px',
                          fontStyle: 'italic',
                          color: 'var(--muted)',
                          padding: '12px 16px',
                          borderTop: '1px solid var(--border)',
                          lineHeight: 1.55,
                        }}
                      >
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                )
              }
              if (block.type === 'divider') {
                return (
                  <hr
                    key={i}
                    style={{
                      border: 0,
                      borderTop: '1px solid var(--border)',
                      margin: '56px 0 8px',
                    }}
                  />
                )
              }
              if (block.type === 'callout') {
                const accent = block.tone !== 'neutral'
                // An editorial pull-quote rather than an admonition "box" — a
                // thin accent rule and larger italic type, no card/background.
                return (
                  <blockquote
                    key={i}
                    style={{
                      margin: '28px 0 36px',
                      paddingLeft: 'clamp(20px, 3vw, 32px)',
                      borderLeft: `2px solid ${accent ? 'var(--accent)' : 'var(--border)'}`,
                    }}
                  >
                    <p
                      className="font-display"
                      style={{
                        color: 'var(--text)',
                        fontSize: 'clamp(1.15rem, 2.2vw, 1.55rem)',
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      {block.text}
                    </p>
                  </blockquote>
                )
              }
              if (block.type === 'stats') {
                return (
                  <div
                    key={i}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: `repeat(auto-fit, minmax(140px, 1fr))`,
                      gap: '12px',
                      margin: '24px 0 32px',
                    }}
                  >
                    {block.items.map((item) => (
                      <div
                        key={item.label}
                        style={{
                          padding: '16px 18px',
                          borderRadius: '12px',
                          border: '1px solid var(--border)',
                          background: 'var(--surface)',
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "'Bricolage Grotesque', sans-serif",
                            fontWeight: 700,
                            fontSize: '1.35rem',
                            color: 'var(--accent)',
                            letterSpacing: '-0.01em',
                            lineHeight: 1.15,
                          }}
                        >
                          {item.value}
                        </div>
                        <div
                          className="font-mono-label"
                          style={{
                            fontSize: '11px',
                            color: 'var(--muted)',
                            marginTop: '6px',
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )
              }
              if (block.type === 'code') {
                return (
                  <CodeBlock
                    key={i}
                    text={block.text}
                    lang={block.lang}
                  />
                )
              }
              if (block.type === 'features') {
                return (
                  <div
                    key={i}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                      gap: '14px',
                      margin: '24px 0 36px',
                    }}
                  >
                    {block.items.map((item) => (
                      <div
                        key={item.title}
                        style={{
                          padding: '20px',
                          borderRadius: '12px',
                          border: '1px solid var(--border)',
                          background: 'var(--surface)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px',
                          transition: 'border-color 0.2s, transform 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'var(--accent)'
                          e.currentTarget.style.transform = 'translateY(-2px)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'var(--border)'
                          e.currentTarget.style.transform = 'translateY(0)'
                        }}
                      >
                        <div style={{ color: 'var(--accent)' }}>
                          <Icon icon={item.icon} width={22} height={22} />
                        </div>
                        <div
                          style={{
                            fontFamily: "'Bricolage Grotesque', sans-serif",
                            fontWeight: 700,
                            fontSize: '1rem',
                            color: 'var(--text)',
                          }}
                        >
                          {item.title}
                        </div>
                        <div
                          style={{
                            color: 'var(--muted)',
                            fontSize: '14px',
                            lineHeight: 1.6,
                          }}
                        >
                          {item.text}
                        </div>
                      </div>
                    ))}
                  </div>
                )
              }
              return null
            })}
          </div>
        ) : (
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
        )}

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

      {/* Lightbox */}
      {lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxImage.alt}
          onClick={() => setLightboxImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.88)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px',
            zIndex: 100,
            cursor: 'zoom-out',
          }}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setLightboxImage(null)}
            className="cursor-pointer"
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: '#fff',
              borderRadius: '999px',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#fff')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)')}
          >
            <Icon icon="lucide:x" width={18} height={18} />
          </button>
          <img
            src={lightboxImage.src}
            alt={lightboxImage.alt}
            onClick={(event) => event.stopPropagation()}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              borderRadius: '12px',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.6)',
              cursor: 'default',
            }}
          />
        </div>
      )}
    </div>
  )
}

export default ProjectPage
