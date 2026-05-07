import { useState, useEffect, useRef } from 'react'

export function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.08 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return { ref, visible }
}

export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(22px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
        height: '100%',
      }}
    >
      {children}
    </div>
  )
}

export function Label({ n, text }: { n: string; text: string }) {
  return (
    <div style={{ marginBottom: '12px' }}>
      <span
        className="font-mono-label"
        style={{ fontSize: '12px', color: 'var(--accent)', letterSpacing: '0.05em' }}
      >
        {n} · {text}
      </span>
    </div>
  )
}

export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontWeight: 800,
        fontSize: 'clamp(1.6rem, 3vw, 2.1rem)',
        color: 'var(--text)',
        marginBottom: '3rem',
        letterSpacing: '-0.02em',
      }}
    >
      {children}
    </h2>
  )
}

export function PageHeading({ children }: { children: React.ReactNode }) {
  return (
    <h1
      style={{
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontWeight: 800,
        fontSize: 'clamp(2rem, 5vw, 3rem)',
        color: 'var(--text)',
        letterSpacing: '-0.02em',
        marginBottom: '16px',
      }}
    >
      {children}
    </h1>
  )
}

export function BackLink({ to, label }: { to: string; label: string }) {
  return (
    <a
      href={to}
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
      ← {label}
    </a>
  )
}
