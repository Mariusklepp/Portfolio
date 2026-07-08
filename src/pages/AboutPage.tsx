import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Reveal, Label, PageHeading, SectionHeading } from '../components/shared'
import { Parallax } from '../components/motion'
import { GradeOverlay, MediaFrame, GRAIN_URL } from '../components/media'
import { pursuits } from '../data/pursuits'
import { reading } from '../data/reading'
import Button from '../components/Button'

/**
 * The About page is "the long version": the landing's Get to know me section
 * is the teaser, this is where people actually get to know Marius. The three
 * pursuits are chapters that open into their own deep pages (/about/:slug);
 * concerts and investing stay as plain chapters. All copy follows the voice
 * rule in CLAUDE.md — written like Marius wrote it himself, and only true.
 */

interface Interest {
  title: string
  description: string
  icon: string
  media?: string[]
  badge?: string
  /** Links the chapter to its deep page at /about/:slug. */
  slug?: string
}

// The three pursuits come from the shared data file (same source as the
// landing word stack); concerts and investing live only here on the long
// version. Concerts: Marius is undecided about keeping it — the copy is
// toned down to what's true, and it's one delete away if he drops it.
const interests: Interest[] = [
  ...pursuits.map((p) => ({
    title: p.name,
    description: p.about,
    icon: p.icon,
    media: p.media,
    badge: p.badge,
    slug: p.slug,
  })),
  {
    title: 'Live concerts',
    description: "Not something I chase every month, but a good show with the right artist is hard to beat.",
    icon: 'lucide:disc-3',
    media: ['/images/concert.jpg', '/images/concert-2.jpg'],
  },
  {
    title: 'Investing & finance',
    description: 'I follow the markets and read about value investing. How capital moves around the world is a rabbit hole I keep coming back to.',
    icon: 'lucide:trending-up',
  },
]

// Status, not a project list — the builds themselves live in Home "Currently"
// and the Projects page.
const currently = [
  'Studying software development at NTNU, Trondheim',
  'Building JARVIS and Deep Core',
  'Teaching myself Blender',
  'Open to freelance work',
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
            className="font-condensed"
            style={{
              fontWeight: 800,
              fontSize: 'clamp(1.7rem, 3.5vw, 2.6rem)',
              textTransform: 'uppercase',
              color: 'var(--text)',
              letterSpacing: '0.01em',
              lineHeight: 0.95,
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
          {item.slug && (
            <Link
              to={`/about/${item.slug}`}
              className="font-condensed cursor-pointer"
              style={{
                alignSelf: 'flex-start',
                marginTop: '6px',
                fontSize: '1.15rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
                color: 'var(--accent)',
                textDecoration: 'none',
              }}
            >
              See more →
            </Link>
          )}
        </div>
      </article>
    </Reveal>
  )
}

function BookRow({ title, author, note }: Readonly<{ title: string; author: string; note?: string }>) {
  return (
    <div style={{ padding: '14px 4px', borderTop: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px 14px' }}>
        <span style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text)' }}>{title}</span>
        <span className="font-mono-label" style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.08em' }}>
          {author}
        </span>
      </div>
      {note && <p style={{ marginTop: '6px', fontSize: '13px', lineHeight: 1.6, color: 'var(--muted)' }}>{note}</p>}
    </div>
  )
}

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
  const hasReading = reading.current !== null || reading.read.length > 0 || reading.planned.length > 0

  return (
    <div style={{ minHeight: '100vh', padding: '128px 24px 96px' }}>
      <div style={{ maxWidth: '1024px', margin: '0 auto' }}>
        {/* Opening — the long version of the landing's short version */}
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
            <PageHeading>The long version.</PageHeading>
            <p style={{ color: 'var(--muted)', maxWidth: '520px', lineHeight: 1.8, fontSize: '16px' }}>
              I'm Marius, a software development student at NTNU in Trondheim. I treat code a bit
              like training: show up, do the reps, finish what you start. This page is the rest of
              the picture.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <Parallax amount={26}>
              {/* portrait placeholder — Marius is taking a new photo for this spot */}
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
                    backgroundImage: GRAIN_URL,
                    backgroundSize: '140px 140px',
                  }}
                />
              </div>
            </Parallax>
          </Reveal>
        </div>

        {/* The story */}
        <Reveal>
          <div style={{ maxWidth: '680px', marginBottom: '40px' }}>
            <Label n="02" text="the story" />
            <div style={{ color: 'var(--muted)', lineHeight: 1.85, fontSize: '16px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <p>
                I like building things that are clean, useful and{' '}
                <span style={{ color: 'var(--text)' }}>finished</span>. Not ninety percent done and
                left in a folder somewhere.
              </p>
              <p>
                The way I work comes from the way I train. Small wins that stack up, and showing up
                on the days it's boring. Running the Trondheim Marathon taught me more about that
                than any course has.
              </p>
              <p>A Java system, a web interface or a long run in the rain. The rule is the same.</p>
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

        {/* Right now — plain status rows (replaces the old flip card) */}
        <Reveal>
          <Label n="03" text="right now" />
          <SectionHeading>Currently</SectionHeading>
        </Reveal>
        <div style={{ marginBottom: '96px', borderBottom: '1px solid var(--border)' }}>
          {currently.map((item, i) => (
            <Reveal key={item} delay={i * 60}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '24px',
                  padding: '16px 4px',
                  borderTop: '1px solid var(--border)',
                }}
              >
                <span className="font-mono-label" style={{ fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.1em' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ fontSize: '15px', color: 'var(--text)' }}>{item}</span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* In my free time — the chapters; the three pursuits open into their
            own deep pages */}
        <Reveal>
          <Label n="04" text="free time" />
          <SectionHeading>In my free time</SectionHeading>
          <p style={{ color: 'var(--muted)', maxWidth: '560px', lineHeight: 1.7, marginTop: '-32px', marginBottom: '64px', fontSize: '15px' }}>
            The stuff that fills the hours around the code. The first three have their own pages
            with more detail.
          </p>
        </Reveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '88px', marginBottom: '96px' }}>
          {interests.map((item, i) => (
            <InterestEntry key={item.title} item={item} index={i} />
          ))}
        </div>

        {/* Reading — hidden until src/data/reading.ts has real titles */}
        {hasReading && (
          <>
            <Reveal>
              <Label n="05" text="reading" />
              <SectionHeading>On the bookshelf</SectionHeading>
            </Reveal>
            <div style={{ marginBottom: '96px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
              {reading.current && (
                <Reveal>
                  <div
                    style={{
                      border: '1px solid var(--border)',
                      borderRadius: '14px',
                      padding: '28px',
                      maxWidth: '560px',
                    }}
                  >
                    <span
                      className="font-mono-label"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '11px',
                        color: 'var(--accent)',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        marginBottom: '14px',
                      }}
                    >
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor', animation: 'pulse 2s infinite' }} />
                      Reading now
                    </span>
                    <h3 className="font-display" style={{ fontSize: 'clamp(1.4rem, 2.6vw, 1.9rem)', color: 'var(--text)', lineHeight: 1.2 }}>
                      {reading.current.title}
                    </h3>
                    <p className="font-mono-label" style={{ marginTop: '8px', fontSize: '12px', color: 'var(--muted)', letterSpacing: '0.08em' }}>
                      {reading.current.author}
                    </p>
                    {reading.current.note && (
                      <p style={{ marginTop: '14px', fontSize: '14px', lineHeight: 1.7, color: 'var(--muted)' }}>{reading.current.note}</p>
                    )}
                  </div>
                </Reveal>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '48px' }}>
                {reading.read.length > 0 && (
                  <Reveal>
                    <span className="font-mono-label" style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '10px' }}>
                      Read
                    </span>
                    <div style={{ borderBottom: '1px solid var(--border)' }}>
                      {reading.read.map((book) => (
                        <BookRow key={book.title} {...book} />
                      ))}
                    </div>
                  </Reveal>
                )}
                {reading.planned.length > 0 && (
                  <Reveal delay={60}>
                    <span className="font-mono-label" style={{ display: 'block', fontSize: '11px', color: 'var(--muted)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '10px' }}>
                      Up next
                    </span>
                    <div style={{ borderBottom: '1px solid var(--border)' }}>
                      {reading.planned.map((book) => (
                        <BookRow key={book.title} {...book} />
                      ))}
                    </div>
                  </Reveal>
                )}
              </div>
            </div>
          </>
        )}

        {/* Education */}
        <Reveal>
          <Label n={hasReading ? '06' : '05'} text="education" />
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

        {/* Tech stack */}
        <Reveal>
          <Label n={hasReading ? '07' : '06'} text="tech stack" />
          <SectionHeading>Skills</SectionHeading>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '10px', marginBottom: '120px' }}>
          {skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} delay={i * 55} />
          ))}
        </div>

        {/* CTA — same language as the landing's contact section */}
        <Reveal>
          <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
            <span
              className="font-mono-label"
              style={{ fontSize: '12px', color: 'var(--accent)', letterSpacing: '0.22em', textTransform: 'uppercase' }}
            >
              Let's connect
            </span>
            <h2
              className="font-condensed"
              style={{
                fontSize: 'clamp(2.4rem, 7vw, 4.6rem)',
                fontWeight: 800,
                textTransform: 'uppercase',
                lineHeight: 0.9,
                color: 'var(--text)',
                margin: '18px 0 36px',
              }}
            >
              Want to work
              <br />
              together?
            </h2>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button to="/contact" variant="primary">
                Get in touch
              </Button>
              <Button to="/projects" variant="secondary">
                See my work
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}

export default AboutPage
