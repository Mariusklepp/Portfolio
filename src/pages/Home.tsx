import { projects } from '../data/projects'
import { currentlyWorking } from '../data/home'
import { TravelingBackdrop, SlideIn, Parallax } from '../components/motion'
import Hero from '../components/Hero'
import ChapterRail from '../components/ChapterRail'
import HorizontalGallery from '../components/HorizontalGallery'
import Button from '../components/Button'
import WorkingOnCard from '../components/WorkingOnCard'
import Pursuits from '../components/Pursuits'

// "Things I've built" features finished work; the in-progress builds (Jarvis,
// Deep Core) live in the Currently section, so they're filtered out here. Two
// cards keep the gallery's end frame clean (no half-cut card); the rest live
// behind "See all projects".
const featuredProjects = projects.filter((p) => p.id !== 'jarvis' && p.id !== 'deep-core').slice(0, 2)

/** Eyebrow + big condensed all-caps heading. The heading slides in from the
 *  left; an optional action slides in from the right. */
function SectionHeading({
  index,
  eyebrow,
  title,
  action,
}: Readonly<{ index: string; eyebrow: string; title: string; action?: React.ReactNode }>) {
  return (
    <div style={{ position: 'relative', marginBottom: '56px' }}>
      {/* big ghost chapter number, drifting behind the heading (parallax depth) */}
      <Parallax amount={50}>
        <span
          aria-hidden
          className="font-condensed"
          style={{
            position: 'absolute',
            top: '-0.62em',
            left: '-0.04em',
            fontSize: 'clamp(7rem, 20vw, 18rem)',
            fontWeight: 800,
            lineHeight: 0.8,
            color: 'rgba(245, 243, 240, 0.035)',
            pointerEvents: 'none',
            userSelect: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {index}
        </span>
      </Parallax>
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        <SlideIn from="left">
          <span
            className="font-mono-label"
            style={{
              display: 'block',
              fontSize: '12px',
              color: 'var(--accent)',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            {index} — {eyebrow}
          </span>
          <h2
            className="font-condensed"
            style={{
              fontSize: 'clamp(2.8rem, 8vw, 6rem)',
              fontWeight: 800,
              textTransform: 'uppercase',
              lineHeight: 0.88,
              letterSpacing: '0.01em',
              color: 'var(--text)',
            }}
          >
            {title}
          </h2>
        </SlideIn>
        {action && <SlideIn from="right">{action}</SlideIn>}
      </div>
    </div>
  )
}

function Section({ children, chapter }: Readonly<{ children: React.ReactNode; chapter?: number }>) {
  return (
    <section
      data-chapter={chapter}
      style={{ maxWidth: '1180px', margin: '0 auto', padding: 'clamp(72px, 12vh, 150px) clamp(20px, 5vw, 48px)' }}
    >
      {children}
    </section>
  )
}

function Home() {
  return (
    <div style={{ position: 'relative' }}>
      <TravelingBackdrop />
      <ChapterRail />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div data-chapter="0">
          <Hero />
        </div>

        {/* Currently */}
        <Section chapter={1}>
          <SectionHeading index="01" eyebrow="Right now" title="Currently building" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
            {currentlyWorking.map((item, i) => (
              <SlideIn key={item.title} from={i % 2 === 0 ? 'left' : 'right'} style={{ height: '100%' }}>
                <WorkingOnCard item={item} />
              </SlideIn>
            ))}
          </div>
        </Section>

        {/* Selected work — horizontal scroll gallery */}
        <HorizontalGallery projects={featuredProjects} />

        {/* Get to know me — the short version of about, and the landing's second
            pinned moment (Pursuits.tsx owns the whole section incl. heading and
            data-chapter): scroll steps through the pursuit word stack — always
            starting on the first word — and the "More about me" line ignites as
            the exit beat. Copy rule: only claims that are actually true about
            Marius. */}
        <Pursuits />

        {/* Contact */}
        <Section chapter={4}>
          <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
            <SlideIn from="up">
              <span
                className="font-mono-label"
                style={{ fontSize: '12px', color: 'var(--accent)', letterSpacing: '0.22em', textTransform: 'uppercase' }}
              >
                Let's connect
              </span>
            </SlideIn>
            <SlideIn from="up" delay={0.08}>
              <h2
                className="font-condensed"
                style={{
                  fontSize: 'clamp(2.8rem, 9vw, 6.5rem)',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  lineHeight: 0.9,
                  color: 'var(--text)',
                  margin: '18px 0 40px',
                }}
              >
                Build something
                <br />
                together?
              </h2>
            </SlideIn>
            <SlideIn from="up" delay={0.16}>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button to="/contact" variant="primary">
                  Get in touch
                </Button>
                <Button to="/projects" variant="secondary">
                  See my work
                </Button>
              </div>
            </SlideIn>
          </div>
        </Section>
      </div>
    </div>
  )
}

export default Home
