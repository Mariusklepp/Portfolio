import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Reveal, Label, PageHeading, SectionHeading } from '../components/shared'
import { Parallax } from '../components/motion'

interface Interest {
  title: string
  description: string
  icon: string
  media?: string[]
  badge?: string
}

const isVideo = (src: string) => /\.(mp4|webm|mov|m4v)$/i.test(src)

const interests: Interest[] = [
  {
    title: 'The long game',
    description: "I ran the Trondheim Marathon, and the Copenhagen Marathon in May 2027 is next. Long efforts are where discipline gets honest: no shortcuts, just the work you put in for months before the start line. I'm also considering an Ironman in 2027, but that decision is still open.",
    icon: 'lucide:footprints',
    media: ['/images/running.jpg'],
    badge: 'Next: Copenhagen Marathon · May 2027',
  },
  {
    title: 'Strength training',
    description: 'A few hours a week in the gym. The discipline of progressive overload — small consistent wins adding up — is something that has stuck with me.',
    icon: 'lucide:dumbbell',
    media: ['/images/strength.jpg'],
  },
  {
    title: 'Skiing & snowboarding',
    description: 'Slalom and snowboarding through the winter — the trade-off between speed and control on a mountain is something I never tire of.',
    icon: 'mdi:ski',
    media: ['/images/skiing.jpg', '/videos/snowboard.mp4'],
  },
  {
    title: 'Golf',
    description: "The newest one. I started playing recently and I'm still learning the game.",
    icon: 'mdi:golf',
    badge: 'Just started',
  },
  {
    title: 'Live concerts',
    description: 'There\'s nothing quite like the energy of a room when an artist lands on a great song. I try to catch shows whenever I can.',
    icon: 'lucide:disc-3',
    media: ['/images/concert.jpg', '/images/concert-2.jpg'],
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

// Status / context only — NOT a project list. The actual builds (JARVIS,
// Deep Core, Millions) are owned by Home "Currently" + the Projects page, so
// they don't get re-listed here. This card is "what phase of life I'm in".
const flipItems: FlipItem[] = [
  { label: 'Studying at NTNU',     sub: 'Software Development, Trondheim', icon: 'lucide:graduation-cap', color: 'var(--accent)', bg: 'var(--accent-dim)' },
  { label: 'Training',             sub: 'Gym, running, and recently golf', icon: 'lucide:activity',       color: 'var(--warm)',   bg: 'var(--accent-dim)' },
  { label: 'Learning Blender',     sub: '3D modelling & game assets',      icon: 'logos:blender',         color: 'var(--amber)',  bg: 'var(--amber-dim)' },
  { label: 'Open to Freelance',    sub: 'Available for collaboration',     icon: 'lucide:briefcase',      color: 'var(--warm)',   bg: 'var(--accent-dim)' },
]

const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

/** Cohesive filmic finish over a photo/video: faint red wash + bottom sink + grain. */
function GradeOverlay() {
  return (
    <>
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'var(--accent)', mixBlendMode: 'color', opacity: 0.1, pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,11,0.5), transparent 45%)', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', inset: 0, opacity: 0.08, mixBlendMode: 'overlay', backgroundImage: GRAIN_URL, backgroundSize: '140px 140px', pointerEvents: 'none' }} />
    </>
  )
}

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
          position: 'relative',
          width: '100%',
          aspectRatio: '4 / 5',
          borderRadius: '8px',
          overflow: 'hidden',
          opacity: fading ? 0 : 1,
          transition: 'opacity 0.2s ease',
        }}
      >
        <MediaFrame src={media[index]} alt={`${alt} ${index + 1} of ${media.length}`} />
        <GradeOverlay />
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
    position: 'relative',
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
        <GradeOverlay />
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
          {item.badge && (
            <span
              className="font-mono-label"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                alignSelf: 'flex-start',
                fontSize: '11px',
                color: 'var(--accent)',
                background: 'var(--accent-dim)',
                padding: '4px 10px',
                borderRadius: '999px',
                letterSpacing: '0.04em',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor', animation: 'pulse 2s infinite' }} />
              {item.badge}
            </span>
          )}
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
  { name: 'GitHub',      icon: 'mdi:github' },
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
        {/* Beat 1 — opening: identity + stance + a graded portrait */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '48px',
            alignItems: 'center',
            marginBottom: '96px',
          }}
        >
          <Reveal>
            <Label n="01" text="about" />
            <PageHeading>I don't do anything halfway.</PageHeading>
            <p style={{ color: 'var(--muted)', maxWidth: '520px', lineHeight: 1.8, fontSize: '16px' }}>
              I'm Marius — a software development student at NTNU Trondheim who treats code like
              training: reps, discipline, no shortcuts. I build things to finish them.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <Parallax amount={26}>
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '4 / 5',
                  maxWidth: '420px',
                  marginLeft: 'auto',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid var(--border)',
                }}
              >
                <img
                  src="/images/strength.jpg"
                  alt="Marius Klepp"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 20%',
                    filter: 'grayscale(0.35) contrast(1.07) brightness(0.7)',
                    display: 'block',
                  }}
                />
                <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'var(--accent)', mixBlendMode: 'color', opacity: 0.16 }} />
                <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,11,0.85), transparent 52%)' }} />
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.1,
                    mixBlendMode: 'overlay',
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                    backgroundSize: '140px 140px',
                  }}
                />
              </div>
            </Parallax>
          </Reveal>
        </div>

        {/* Beat 2 — the story / ethos */}
        <Reveal>
          <div style={{ maxWidth: '680px', marginBottom: '40px' }}>
            <Label n="02" text="the story" />
            <div style={{ color: 'var(--muted)', lineHeight: 1.85, fontSize: '16px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <p>
                I like building things that are clean, useful, and{' '}
                <span style={{ color: 'var(--text)' }}>finished</span> — not ninety percent done and
                left in a folder somewhere.
              </p>
              <p>
                The way I work comes from the way I train. Progressive overload, small consistent wins,
                showing up when it's boring — the Trondheim Marathon taught me that.
              </p>
              <p>A Java system, a web interface, or a long run in the rain — the rule doesn't change.</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <p
            className="font-display"
            style={{
              fontSize: 'clamp(1.5rem, 3.2vw, 2.2rem)',
              color: 'var(--text)',
              lineHeight: 1.3,
              maxWidth: '760px',
              borderLeft: '2px solid var(--accent)',
              paddingLeft: '24px',
              marginBottom: '96px',
            }}
          >
            The discipline that finishes a marathon is the discipline that ships the code.
          </p>
        </Reveal>

        {/* Currently — status (flip card; folds into the builder beat later) */}
        <Reveal>
          <div style={{ maxWidth: '460px', margin: '0 auto', marginBottom: '96px' }}>
            <FlipCard />
          </div>
        </Reveal>

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

        {/* In my free time */}
        <Reveal>
          <Label n="04" text="free time" />
          <SectionHeading>In my free time</SectionHeading>
          <p style={{ color: 'var(--muted)', maxWidth: '560px', lineHeight: 1.7, marginTop: '-32px', marginBottom: '64px', fontSize: '15px' }}>
            A bit about who I am outside of studies and code.
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
