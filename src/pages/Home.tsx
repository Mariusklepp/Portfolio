import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import { typewriterTexts, socialLinks, currentlyWorking } from '../data/home'
import { useTypewriter } from '../hooks/useTypewriter'
import { Reveal, Label, SectionHeading } from '../components/shared'
import Button from '../components/Button'
import WorkingOnCard from '../components/WorkingOnCard'
import ProjectCard from '../components/ProjectCard'

function HeroSection() {
  const subtitle = useTypewriter(typewriterTexts)

  return (
    <section
      className="animate-hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 24px',
      }}
    >
      <span
        className="font-mono-label"
        style={{ fontSize: '12px', color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}
      >
        Portfolio · 2025
      </span>

      <h1
        className="font-display"
        style={{
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          fontWeight: 800,
          color: 'var(--text)',
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          marginBottom: '20px',
        }}
      >
        Hi, I'm Marius
      </h1>

      <p
        className="font-mono-label"
        style={{
          fontSize: 'clamp(13px, 2vw, 16px)',
          color: 'var(--accent)',
          height: '24px',
          marginBottom: '16px',
        }}
      >
        {subtitle}<span style={{ animation: 'pulse 1s infinite', opacity: 0.7 }}>_</span>
      </p>

      <p style={{ color: 'var(--muted)', maxWidth: '400px', lineHeight: 1.7, marginBottom: '36px', fontSize: '15px' }}>
        I build clean and useful software. Passionate about web development and Java.
      </p>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '36px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button to="/projects" variant="primary">See my work</Button>
        <Button to="/contact" variant="secondary">Contact me</Button>
      </div>

      <SocialLinks />
    </section>
  )
}

function SocialLinks() {
  return (
    <div style={{ display: 'flex', gap: '24px' }}>
      {socialLinks.map(({ href, icon, label, download }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          download={download}
          className="cursor-pointer"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            color: 'var(--muted)',
            textDecoration: 'none',
            transition: 'color 0.2s',
            fontSize: '11px',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
        >
          <Icon icon={icon} width={22} height={22} />
          <span className="font-mono-label">{label}</span>
        </a>
      ))}
    </div>
  )
}

function CtaSection() {
  return (
    <section style={{ padding: '128px 24px', textAlign: 'center' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Reveal>
          <p
            className="font-mono-label"
            style={{ fontSize: '12px', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}
          >
            · let's connect
          </p>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              fontWeight: 800,
              color: 'var(--text)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              marginBottom: '20px',
            }}
          >
            Want to build something together?
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.7, marginBottom: '36px' }}>
            I'm open to freelance projects, collaborations, and good conversations about code.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button to="/contact" variant="primary">Get in touch</Button>
            <Button to="/projects" variant="secondary">See my work</Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function CurrentlyWorkingSection() {
  return (
    <section style={{ background: 'var(--bg-2)', padding: '96px 24px' }}>
      <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
        <Reveal>
          <Label n="01" text="currently working on" />
          <SectionHeading>Currently Working On</SectionHeading>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {currentlyWorking.map((item, i) => (
            <Reveal key={item.title} delay={i * 90}>
              <WorkingOnCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedProjectsSection() {
  return (
    <section style={{ maxWidth: '1024px', margin: '0 auto', padding: '96px 24px' }}>
      <Reveal>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '48px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <Label n="02" text="featured" />
            <SectionHeading>Featured Projects</SectionHeading>
          </div>
          <Link
            to="/projects"
            className="font-mono-label cursor-pointer"
            style={{ fontSize: '12px', color: 'var(--accent)', textDecoration: 'none' }}
          >
            View all →
          </Link>
        </div>
      </Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {projects.slice(0, 2).map((project, i) => (
          <Reveal key={project.id} delay={i * 110}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Home() {
  return (
    <>
      <HeroSection />
      <CurrentlyWorkingSection />
      <FeaturedProjectsSection />
      <CtaSection />
    </>
  )
}

export default Home
