import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { type Project } from '../data/projects'
import ProjectCard from './ProjectCard'

const eyebrowStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '12px',
  color: 'var(--accent)',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  marginBottom: '16px',
}
const titleStyle: React.CSSProperties = {
  fontSize: 'clamp(2.4rem, 6vw, 4.6rem)',
  fontWeight: 800,
  textTransform: 'uppercase',
  lineHeight: 0.88,
  letterSpacing: '0.01em',
  color: 'var(--text)',
  margin: 0,
}

/**
 * "Things I've built" as a horizontal gallery: the section pins for a beat and
 * the heading + project cards travel sideways, driven 1:1 by the vertical scroll
 * (the section is exactly as tall as the horizontal distance, so the pin lasts
 * precisely the slide). Under reduced motion it degrades to a normal grid.
 */
export default function HorizontalGallery({ projects }: Readonly<{ projects: Project[] }>) {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [distance, setDistance] = useState(0)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  // Horizontal travel happens only in the middle of the pin, so there's a beat of
  // "dwell" while fully zoomed in — after the zoom-in finishes and before the
  // zoom-out starts — and the cards move slower (you scroll a little longer).
  const x = useTransform(scrollYProgress, [0.18, 0.82], [0, -distance], { clamp: true })
  // Zoom the whole stage in as you enter the horizontal scene and back out as
  // you leave, so the switch from vertical to horizontal scrolling reads clearly.
  const scale = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0.88, 1, 1, 0.88])
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.5, 1, 1, 0.5])

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current
      if (!track) return
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [reduce])

  const heading = (
    <>
      <span className="font-mono-label" style={eyebrowStyle}>
        02 — Selected work
      </span>
      <h2 className="font-condensed" style={titleStyle}>
        Things I've built
      </h2>
    </>
  )

  if (reduce) {
    return (
      <section data-chapter={2} style={{ maxWidth: '1180px', margin: '0 auto', padding: 'clamp(72px, 12vh, 150px) clamp(20px, 5vw, 48px)' }}>
        <div style={{ marginBottom: '48px' }}>{heading}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} data-chapter={2} style={{ position: 'relative', height: `calc(100vh + ${Math.max(distance, 250) + 600}px)` }}>
      <motion.div
        style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', scale, opacity }}
      >
        <motion.div
          ref={trackRef}
          style={{ x, display: 'flex', alignItems: 'center', gap: '32px', padding: '0 clamp(20px, 5vw, 64px)', willChange: 'transform' }}
        >
          <div style={{ flexShrink: 0, width: 'min(78vw, 440px)' }}>{heading}</div>
          {projects.map((p) => (
            <div key={p.id} style={{ flexShrink: 0, width: 'min(76vw, 350px)', height: 'min(54vh, 420px)' }}>
              <ProjectCard project={p} />
            </div>
          ))}
          <div style={{ flexShrink: 0, width: 'min(56vw, 280px)', display: 'flex', alignItems: 'center' }}>
            <Link
              to="/projects"
              className="font-condensed cursor-pointer"
              style={{
                fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                fontWeight: 700,
                textTransform: 'uppercase',
                color: 'var(--accent)',
                textDecoration: 'none',
                lineHeight: 1.05,
              }}
            >
              See all
              <br />
              projects →
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
