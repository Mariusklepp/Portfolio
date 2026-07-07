import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Icon } from '@iconify/react'
import { socialLinks, heroPortrait, type SocialLink } from '../data/home'
import Button from './Button'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const LIGHT = '#F5F3F0'

type Tilt = { x: number; y: number }

/* ----------------------------------------------------------------------------
 * The opening shot — editorial and full-viewport. A sharp, off-center portrait
 * bleeds off the right edge; big stacked condensed type ("SOFTWARE / DEVELOPER")
 * commands the left; the name runs vertically down the far-left margin as a
 * graphic. Atmosphere comes from the fixed backdrop behind it, not a coloured
 * glow. Everything animates in on load and the figure tilts toward the pointer.
 * -------------------------------------------------------------------------- */

/** Social icon — monochrome by default (CSS), red on hover. Reveals its label
 *  via a pure-CSS hover tooltip so it can never get stuck open. */
function SocialIcon({ href, icon, label, hover, download }: Readonly<SocialLink>) {
  const text = hover ?? label
  return (
    <a
      className="hero-social cursor-pointer"
      href={href}
      target="_blank"
      rel="noreferrer"
      download={download}
      aria-label={text}
    >
      <Icon icon={icon} width={26} height={26} />
      <span className="hero-social-tip font-mono-label" aria-hidden>
        {text}
      </span>
    </a>
  )
}

/** The social row — reused both centred on the photo (desktop) and in the
 *  bottom bar (narrow screens). */
function Socials() {
  return (
    <>
      {socialLinks.map((s) => (
        <SocialIcon key={s.label} {...s} />
      ))}
    </>
  )
}

/** The big stacked wordmark. SOFTWARE is solid, DEVELOPER is outlined, so the
 *  two read as one composed block — bold, but disciplined. Slides in from left. */
function StackedType({ reduce }: Readonly<{ reduce: boolean }>) {
  const line: React.CSSProperties = {
    display: 'block',
    fontWeight: 800,
    lineHeight: 0.84,
    letterSpacing: '0.005em',
    fontSize: 'clamp(3rem, 10vw, 9rem)',
    textTransform: 'uppercase',
  }
  return (
    <motion.div
      className="font-condensed"
      initial={reduce ? false : { opacity: 0, x: -44 }}
      animate={reduce ? undefined : { opacity: 1, x: 0 }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <span style={{ ...line, color: LIGHT }}>Software</span>
      <span style={{ ...line, color: 'transparent', WebkitTextStroke: `1.5px ${LIGHT}` }}>Developer</span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginTop: '24px' }}>
        <span style={{ width: '42px', height: '2px', background: 'var(--accent)' }} />
        <span
          className="font-mono-label"
          style={{ fontSize: '12px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--muted)' }}
        >
          Trondheim, Norway
        </span>
      </span>
    </motion.div>
  )
}

/** The name set vertically down the far-left margin — a quiet graphic mark. */
function VerticalName({ reduce }: Readonly<{ reduce: boolean }>) {
  return (
    <motion.div
      className="hero-name-vert"
      initial={reduce ? false : { opacity: 0, x: -18 }}
      animate={reduce ? undefined : { opacity: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
    >
      <span
        style={{
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          textTransform: 'uppercase',
          fontSize: 'clamp(1.1rem, 2vw, 1.6rem)',
          letterSpacing: '0.34em',
          color: 'rgba(245,243,240,0.32)',
          userSelect: 'none',
        }}
      >
        Marius
      </span>
    </motion.div>
  )
}

/** The portrait — full-height, bleeding off the right, sharply cropped at the
 *  bottom. Scales in on load and tilts gently toward the pointer. */
function HeroPhoto({ tilt, reduce, onError }: Readonly<{ tilt: Tilt; reduce: boolean; onError: () => void }>) {
  const imgShift = reduce ? undefined : `translate(${-tilt.y * 0.6}px, ${-tilt.x * 0.6}px)`
  return (
    <div className="hero-photo">
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 1.06 }}
        animate={reduce ? undefined : { opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: EASE }}
        style={{ height: '100%' }}
      >
        <div
          style={{
            height: '100%',
            transformStyle: 'preserve-3d',
            transform: reduce ? undefined : `rotateY(${tilt.y * 0.6}deg) rotateX(${tilt.x * 0.6}deg)`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          <img
            className="hero-photo-img"
            src={heroPortrait ?? undefined}
            alt="Marius Klepp"
            onError={onError}
            style={{
              height: '100%',
              width: 'auto',
              transform: imgShift,
              transition: 'transform 0.3s ease-out',
              filter: 'contrast(1.06) brightness(0.98)',
            }}
          />
        </div>
      </motion.div>

      {/* socials, centred on the figure */}
      <motion.div
        className="hero-socials-photo"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
      >
        <Socials />
      </motion.div>
    </div>
  )
}

function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion() ?? false
  const [tilt, setTilt] = useState<Tilt>({ x: 0, y: 0 })
  const [photoOk, setPhotoOk] = useState(Boolean(heroPortrait))
  const showPhoto = Boolean(heroPortrait) && photoOk

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: -ny * 4, y: nx * 5 })
  }
  const handleLeave = () => setTilt({ x: 0, y: 0 })

  return (
    <section
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', perspective: '1200px' }}
    >
      <VerticalName reduce={reduce} />

      <div className="hero-type">
        <StackedType reduce={reduce} />
      </div>

      {showPhoto && <HeroPhoto tilt={tilt} reduce={reduce} onError={() => setPhotoOk(false)} />}

      <div className="hero-bottom">
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -30 }}
          animate={reduce ? undefined : { opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
        >
          <Button to="/projects" variant="primary">
            See my work →
          </Button>
        </motion.div>

        {/* socials sit centred on the photo (desktop); this copy only appears on
            narrow screens, where the photo moves behind the type */}
        <div className="hero-socials-bar">
          <Socials />
        </div>
      </div>
    </section>
  )
}

export default Hero
