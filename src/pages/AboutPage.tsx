import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Reveal, Label, PageHeading, SectionHeading } from '../components/shared'

interface Interest {
  title: string
  description: string
  icon: string
  media?: string[]
}

const isVideo = (src: string) => /\.(mp4|webm|mov|m4v)$/i.test(src)

const interests: Interest[] = [
  {
    title: 'Skiing & snowboarding',
    description: 'Slalom and snowboarding through the winter — the trade-off between speed and control on a mountain is something I never tire of.',
    icon: 'mdi:ski',
    media: ['/images/skiing.jpg', '/videos/snowboard.mp4'],
  },
  {
    title: 'Live concerts',
    description: 'There\'s nothing quite like the energy of a room when an artist lands on a great song. I try to catch shows whenever I can.',
    icon: 'lucide:disc-3',
    media: ['/images/concert.jpg', '/images/concert-2.jpg'],
  },
  {
    title: 'Strength training',
    description: 'A few hours a week in the gym. The discipline of progressive overload — small consistent wins adding up — is something that has stuck with me.',
    icon: 'lucide:dumbbell',
    media: ['/images/strength.jpg'],
  },
  {
    title: 'Running',
    description: 'Out on Trondheim\'s trails whenever the weather allows. Recently completed the Trondheim Marathon — nothing clears the head quite like a long run.',
    icon: 'lucide:footprints',
    media: ['/images/running.jpg'],
  },
  {
    title: 'Investing & finance',
    description: 'I follow markets and read about value investing — thinking about how capital flows shape the world is endlessly interesting.',
    icon: 'lucide:trending-up',
  },
]

interface EducationItem {
  institution: string
  degree: string
  period: string
  location?: string
  courses?: string[]
  current?: boolean
}

const education: EducationItem[] = [
  {
    institution: 'NTNU',
    degree: 'BSc in Computer Engineering — Systems Development',
    period: 'Aug 2025 — Jun 2028',
    location: 'Trondheim, Norway',
    current: true,
  },
]

interface FlipItem {
  label: string
  sub: string
  icon: string
  color: string
  bg: string
}

const flipItems: FlipItem[] = [
  { label: 'Studying at NTNU',  sub: 'Software Development, Trondheim', icon: 'lucide:graduation-cap', color: 'var(--accent)', bg: 'var(--accent-dim)' },
  { label: 'Building Millions', sub: 'Java + JavaFX stock simulator',   icon: 'lucide:trending-up',    color: 'var(--green)',  bg: 'var(--green-dim)' },
  { label: 'Learning React',    sub: 'Hooks, state, real-world UI',     icon: 'devicon:react',         color: 'var(--amber)',  bg: 'var(--amber-dim)' },
  { label: 'Open to Freelance', sub: 'Available for collaboration',     icon: 'lucide:briefcase',      color: 'var(--warm)',   bg: 'var(--accent-dim)' },
]

function MediaFrame({ src, alt }: Readonly<{ src: string; alt: string }>) {
  const baseStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  }

  if (isVideo(src)) {
    return (
      <video
        key={src}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        aria-label={alt}
        style={baseStyle}
      />
    )
  }

  return <img key={src} src={src} alt={alt} style={baseStyle} />
}

function MediaCarousel({ media, alt }: Readonly<{ media: string[]; alt: string }>) {
  const [index, setIndex] = useState(0)
  const [fading, setFading] = useState(false)

  const navigate = (direction: 1 | -1) => {
    if (fading) return
    setFading(true)
    setTimeout(() => {
      setIndex((index + direction + media.length) % media.length)
      setFading(false)
    }, 200)
  }

  const arrowStyle: React.CSSProperties = {
    width: '32px',
    height: '32px',
    border: 'none',
    background: 'transparent',
    color: 'var(--muted)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'color 0.2s',
    padding: 0,
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div
        style={{
          width: '100%',
          aspectRatio: '4 / 5',
          borderRadius: '8px',
          overflow: 'hidden',
          opacity: fading ? 0 : 1,
          transition: 'opacity 0.2s ease',
        }}
      >
        <MediaFrame src={media[index]} alt={`${alt} ${index + 1} of ${media.length}`} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
        <button
          onClick={() => navigate(-1)}
          aria-label="Previous"
          className="cursor-pointer"
          style={arrowStyle}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
        >
          <Icon icon="lucide:chevron-left" width={22} height={22} strokeWidth={1.5} />
        </button>
        <div style={{ display: 'flex', gap: '6px' }}>
          {media.map((src, i) => (
            <span
              key={src}
              style={{
                width: i === index ? '20px' : '6px',
                height: '6px',
                borderRadius: '999px',
                background: i === index ? 'var(--accent)' : 'var(--border)',
                transition: 'width 0.3s, background 0.3s',
              }}
            />
          ))}
        </div>
        <button
          onClick={() => navigate(1)}
          aria-label="Next"
          className="cursor-pointer"
          style={arrowStyle}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
        >
          <Icon icon="lucide:chevron-right" width={22} height={22} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  )
}

function InterestVisual({ item }: Readonly<{ item: Interest }>) {
  const containerStyle: React.CSSProperties = {
    width: '100%',
    aspectRatio: '4 / 5',
    borderRadius: '8px',
    overflow: 'hidden',
  }

  const media = item.media ?? []

  if (media.length > 1) {
    return <MediaCarousel media={media} alt={item.title} />
  }

  if (media.length === 1) {
    return (
      <div style={containerStyle}>
        <MediaFrame src={media[0]} alt={item.title} />
      </div>
    )
  }

  return (
    <div
      style={{
        ...containerStyle,
        background: 'linear-gradient(135deg, var(--accent-dim) 0%, var(--bg-2) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 30% 30%, var(--accent-dim), transparent 60%)',
          opacity: 0.6,
        }}
      />
      <Icon icon={item.icon} width={64} height={64} color="var(--accent)" style={{ opacity: 0.6, position: 'relative' }} />
    </div>
  )
}

function InterestEntry({ item, index }: Readonly<{ item: Interest; index: number }>) {
  const reversed = index % 2 === 1
  return (
    <Reveal delay={index * 50}>
      <article
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '48px',
          alignItems: 'center',
        }}
      >
        <div style={{ order: reversed ? 2 : 1 }}>
          <InterestVisual item={item} />
        </div>
        <div style={{ order: reversed ? 1 : 2, display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <span
            className="font-mono-label"
            style={{
              fontSize: '11px',
              color: 'var(--accent)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            №&nbsp;{String(index + 1).padStart(2, '0')}
          </span>
          <h3
            className="font-display"
            style={{
              fontWeight: 700,
              fontSize: 'clamp(1.7rem, 3.5vw, 2.4rem)',
              color: 'var(--text)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            {item.title}
          </h3>
          <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.8 }}>
            {item.description}
          </p>
        </div>
      </article>
    </Reveal>
  )
}

function FlipFace({ item, flipped }: { item: FlipItem; flipped?: boolean }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)',
        background: item.bg,
        border: `1.5px solid ${item.color}`,
        borderRadius: '16px',
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        textAlign: 'left',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '10px',
            background: 'var(--surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1px solid ${item.color}`,
          }}
        >
          <Icon icon={item.icon} width={22} height={22} color={item.color} />
        </div>
        <span
          className="font-mono-label"
          style={{
            fontSize: '10px',
            color: item.color,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          currently
        </span>
      </div>
      <div>
        <h3
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 700,
            fontSize: '22px',
            color: 'var(--text)',
            letterSpacing: '-0.01em',
            marginBottom: '6px',
          }}
        >
          {item.label}
        </h3>
        <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.5 }}>{item.sub}</p>
      </div>
    </div>
  )
}

function FlipCard() {
  const [rotation, setRotation] = useState(0)
  const [front, setFront] = useState<FlipItem>(flipItems[0])
  const [back, setBack] = useState<FlipItem>(flipItems[1])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [flipping, setFlipping] = useState(false)

  const navigate = (direction: 1 | -1) => {
    if (flipping) return
    setFlipping(true)
    const newIdx = (currentIdx + direction + flipItems.length) % flipItems.length
    const newRot = rotation + 180 * direction
    setRotation(newRot)
    setTimeout(() => {
      const item = flipItems[newIdx]
      if (((newRot % 360) + 360) % 360 === 0) {
        setBack(item)
      } else {
        setFront(item)
      }
      setCurrentIdx(newIdx)
      setFlipping(false)
    }, 700)
  }

  const arrowStyle: React.CSSProperties = {
    width: '32px',
    height: '32px',
    borderRadius: '0',
    border: 'none',
    background: 'transparent',
    color: 'var(--muted)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'color 0.2s, transform 0.2s',
    flexShrink: 0,
    padding: 0,
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', maxWidth: '460px' }}>
      <button
        onClick={() => navigate(-1)}
        aria-label="Previous"
        className="cursor-pointer"
        style={arrowStyle}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
      >
        <Icon icon="lucide:chevron-left" width={22} height={22} strokeWidth={1.5} />
      </button>

      <div style={{ perspective: '1400px', flex: 1 }}>
        <div
          style={{
            width: '100%',
            aspectRatio: '8 / 5',
            position: 'relative',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.7s cubic-bezier(0.4, 0.05, 0.2, 1)',
            transform: `rotateY(${rotation}deg)`,
          }}
        >
          <FlipFace item={front} />
          <FlipFace item={back} flipped />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '14px' }}>
          {flipItems.map((_, i) => (
            <span
              key={i}
              style={{
                width: i === currentIdx ? '20px' : '6px',
                height: '6px',
                borderRadius: '999px',
                background: i === currentIdx ? 'var(--accent)' : 'var(--border)',
                transition: 'width 0.3s, background 0.3s',
              }}
            />
          ))}
        </div>
      </div>

      <button
        onClick={() => navigate(1)}
        aria-label="Next"
        className="cursor-pointer"
        style={arrowStyle}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
      >
        <Icon icon="lucide:chevron-right" width={22} height={22} strokeWidth={1.5} />
      </button>
    </div>
  )
}

const skills = [
  { name: 'Java',        icon: 'devicon:java' },
  { name: 'JavaScript',  icon: 'devicon:javascript' },
  { name: 'HTML',        icon: 'devicon:html5' },
  { name: 'CSS',         icon: 'devicon:css3' },
  { name: 'React',       icon: 'devicon:react' },
  { name: 'Tailwind',    icon: 'devicon:tailwindcss' },
  { name: 'Git',         icon: 'devicon:git' },
  { name: 'GitHub',      icon: 'devicon:github' },
  { name: 'SQL',         icon: 'devicon:mysql' },
]

function SkillCard({ skill, delay }: { skill: { name: string; icon: string }; delay: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="cursor-default"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '12px 16px',
          borderRadius: '10px',
          border: `1px solid ${hovered ? 'var(--accent)' : 'var(--border)'}`,
          background: hovered ? 'var(--accent-dim)' : 'var(--surface)',
          transition: 'border-color 0.2s, background 0.2s',
        }}
      >
        <Icon icon={skill.icon} width={22} height={22} />
        <span style={{ color: 'var(--text)', fontSize: '14px', fontWeight: 500 }}>{skill.name}</span>
      </div>
    </Reveal>
  )
}

function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', padding: '128px 24px 96px' }}>
      <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
        <Reveal>
          <Label n="01" text="about" />
          <PageHeading>About me</PageHeading>
          <p style={{ color: 'var(--muted)', marginBottom: '64px', maxWidth: '560px', lineHeight: 1.7 }}>
            A software development student building things across the stack.
          </p>
        </Reveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '64px',
            alignItems: 'center',
            marginBottom: '96px',
          }}
        >
          <Reveal delay={100}>
            <div style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p>I'm a software development student at NTNU Trondheim, passionate about building clean and useful software.</p>
              <p>I enjoy working across the stack — from designing systems in Java to building interfaces for the web.</p>
              <p>Outside of coding I'm interested in investing and personal finance.</p>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <FlipCard />
          </Reveal>
        </div>

        {/* Education */}
        <Reveal>
          <Label n="02" text="education" />
          <SectionHeading>Education</SectionHeading>
        </Reveal>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '96px' }}>
          {education.map((item, i) => (
            <Reveal key={item.institution + item.period} delay={i * 80}>
              <div
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '14px',
                  padding: '24px 28px',
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr auto',
                  gap: '24px',
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '10px',
                    background: 'var(--accent-dim)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon icon="lucide:graduation-cap" width={24} height={24} color="var(--accent)" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <h3
                      style={{
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                        fontWeight: 700,
                        fontSize: '17px',
                        color: 'var(--text)',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {item.institution}
                    </h3>
                    {item.current && (
                      <span
                        className="font-mono-label"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          fontSize: '10px',
                          color: 'var(--green)',
                          background: 'var(--green-dim)',
                          padding: '3px 8px',
                          borderRadius: '999px',
                        }}
                      >
                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'currentColor', animation: 'pulse 2s infinite' }} />
                        ongoing
                      </span>
                    )}
                  </div>
                  <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.5 }}>
                    {item.degree}
                    {item.location && <> · {item.location}</>}
                  </p>
                  {item.courses && item.courses.length > 0 && (
                    <ul
                      style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: '8px 0 0 0',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                      }}
                    >
                      {item.courses.map((course) => (
                        <li
                          key={course}
                          className="font-mono-label"
                          style={{
                            fontSize: '12px',
                            color: 'var(--muted)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                          }}
                        >
                          <span style={{ color: 'var(--accent)' }}>›</span>
                          {course}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <span
                  className="font-mono-label"
                  style={{
                    fontSize: '11px',
                    color: 'var(--muted)',
                    letterSpacing: '0.04em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.period}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Tech Stack */}
        <Reveal>
          <Label n="03" text="tech stack" />
          <SectionHeading>Skills</SectionHeading>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '10px', marginBottom: '96px' }}>
          {skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} delay={i * 55} />
          ))}
        </div>

        {/* When I'm not coding */}
        <Reveal>
          <Label n="04" text="off the clock" />
          <SectionHeading>When I'm not coding</SectionHeading>
          <p style={{ color: 'var(--muted)', maxWidth: '560px', lineHeight: 1.7, marginTop: '-32px', marginBottom: '64px', fontSize: '15px' }}>
            A bit about who I am beyond the keyboard.
          </p>
        </Reveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '88px', marginBottom: '96px' }}>
          {interests.map((item, i) => (
            <InterestEntry key={item.title} item={item} index={i} />
          ))}
        </div>

        {/* CTA */}
        <Reveal>
          <div
            style={{
              padding: '32px',
              borderRadius: '14px',
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              textAlign: 'center',
            }}
          >
            <h3
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 700,
                fontSize: '1.4rem',
                color: 'var(--text)',
                marginBottom: '8px',
                letterSpacing: '-0.01em',
              }}
            >
              Want to work together?
            </h3>
            <p style={{ color: 'var(--muted)', marginBottom: '20px', fontSize: '14px' }}>
              I'm open to freelance projects and collaboration.
            </p>
            <Link
              to="/contact"
              className="cursor-pointer"
              style={{
                display: 'inline-block',
                background: 'var(--accent)',
                color: '#fff',
                padding: '12px 24px',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Get in touch
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  )
}

export default AboutPage
