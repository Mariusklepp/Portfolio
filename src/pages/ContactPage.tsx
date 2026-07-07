import { useState } from 'react'
import { Icon } from '@iconify/react'
import { Reveal, Label, PageHeading } from '../components/shared'

function ContactForm() {
  const [form, setForm] = useState({ name: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const subject = `Portfolio contact from ${form.name}`
    const body = encodeURIComponent(form.message)
    window.location.href = `mailto:marius.s.klepp@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`
    setSent(true)
  }

  const inputStyle = {
    width: '100%',
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '10px',
    padding: '12px 16px',
    color: 'var(--text)',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: 'inherit',
  }

  if (sent) {
    return (
      <p style={{ color: 'var(--green)', fontSize: '14px', fontFamily: "'JetBrains Mono', monospace" }}>
        Opening your mail client...
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left', height: '100%' }}>
      <p
        className="font-mono-label"
        style={{ fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}
      >
        Send a message
      </p>
      <input
        id="name"
        type="text"
        required
        aria-label="Your name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Your name"
        style={inputStyle}
        onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
        onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
      />
      <textarea
        id="message"
        required
        rows={5}
        aria-label="Your message"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        placeholder="What's on your mind?"
        style={{ ...inputStyle, resize: 'none', flex: 1 }}
        onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
        onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
      />
      <button
        type="submit"
        className="cursor-pointer"
        style={{
          background: 'var(--accent)',
          color: '#fff',
          border: 'none',
          borderRadius: '10px',
          padding: '13px 24px',
          fontSize: '14px',
          fontWeight: 600,
          fontFamily: 'inherit',
          transition: 'opacity 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
      >
        Send message
      </button>
    </form>
  )
}

function ContactPage() {
  const channels = [
    { icon: 'lucide:mail',     label: 'Email',     value: 'marius.s.klepp@gmail.com', href: 'mailto:marius.s.klepp@gmail.com' },
    { icon: 'mdi:github',      label: 'GitHub',    value: 'Mariusklepp',              href: 'https://github.com/Mariusklepp' },
    { icon: 'mdi:linkedin',     label: 'LinkedIn', value: 'Marius Klepp',             href: 'https://www.linkedin.com/in/marius-klepp-28494437b/' },
  ]

  return (
    <div style={{ minHeight: '100vh', padding: '128px 24px 96px' }}>
      <div style={{ maxWidth: '880px', margin: '0 auto' }}>
        <Reveal>
          <Label n="·" text="contact" />
          <PageHeading>Get in touch</PageHeading>
          <p style={{ color: 'var(--muted)', marginBottom: '64px', maxWidth: '520px', lineHeight: 1.7 }}>
            Have a project in mind, want to collaborate, or just say hi? My inbox is always open.
          </p>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px' }}>
          {/* Form */}
          <Reveal delay={100}>
            <ContactForm />
          </Reveal>

          {/* Channels */}
          <Reveal delay={180}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%' }}>
              <p
                className="font-mono-label"
                style={{ fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}
              >
                Or reach me directly
              </p>
              {channels.map(({ icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="cursor-pointer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '14px 16px',
                    borderRadius: '10px',
                    border: '1px solid var(--border)',
                    background: 'var(--surface)',
                    textDecoration: 'none',
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
                  <Icon icon={icon} width={22} height={22} />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span
                      className="font-mono-label"
                      style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.05em' }}
                    >
                      {label}
                    </span>
                    <span style={{ fontSize: '14px', color: 'var(--text)', fontWeight: 500 }}>{value}</span>
                  </div>
                </a>
              ))}

              <a
                href="/cv.pdf"
                download
                className="cursor-pointer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 16px',
                  borderRadius: '10px',
                  border: '1px dashed var(--border)',
                  background: 'transparent',
                  color: 'var(--muted)',
                  textDecoration: 'none',
                  fontSize: '13px',
                  marginTop: 'auto',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--accent)'
                  e.currentTarget.style.borderColor = 'var(--accent)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--muted)'
                  e.currentTarget.style.borderColor = 'var(--border)'
                }}
              >
                <Icon icon="lucide:download" width={16} height={16} />
                <span className="font-mono-label">Download CV</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
