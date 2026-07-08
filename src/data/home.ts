export const typewriterTexts = [
  'Software Development Student',
  'Building JARVIS in Python',
  'Designing Deep Core',
  'Open to Freelance',
]

/**
 * Hero portrait — the focal point of the landing (landonorris-style isolated
 * portrait: face owns the frame, name shrinks to a corner logo).
 *
 * Use a FRONT-FACING, evenly-lit photo. For the cleanest result, remove the
 * background (e.g. remove.bg, or Photos "lift subject") and save a transparent
 * PNG, then keep `heroPortraitIsolated = true`. If instead you point this at a
 * raw photo that has a plain background, set `heroPortraitIsolated = false` and
 * the hero feathers/vignettes the background away so the figure emerges from
 * the dark.
 *
 * If this is `null`, missing, or fails to load, the hero falls back to the
 * kinetic wordmark on its own — so it's always safe to experiment.
 */
export const heroPortrait: string | null = '/images/portrait.png'
/** true = `heroPortrait` is already background-removed (transparent PNG);
 *  false = raw photo, let the hero knock the plain background out via a mask. */
export const heroPortraitIsolated = true

export interface SocialLink {
  href: string
  icon: string
  label: string
  /** Descriptive text shown in the hover tooltip; falls back to `label`. */
  hover?: string
  download?: boolean
}

export const socialLinks: SocialLink[] = [
  { href: 'https://github.com/Mariusklepp',                         icon: 'mdi:github',         label: 'GitHub',    hover: 'View GitHub' },
  { href: 'https://www.linkedin.com/in/marius-klepp-28494437b/',    icon: 'mdi:linkedin',       label: 'LinkedIn',  hover: 'Connect on LinkedIn' },
  { href: 'https://instagram.com/mariusklepp',                      icon: 'mdi:instagram',      label: 'Instagram', hover: 'Follow on Instagram' },
  { href: 'mailto:marius.s.klepp@gmail.com',                        icon: 'lucide:mail',        label: 'Email',     hover: 'Email me' },
  { href: '/cv.pdf',                                                icon: 'lucide:download',    label: 'CV',        hover: 'Download CV', download: true },
]

// The free-time pursuits moved to `src/data/pursuits.ts` — one source of
// truth shared by the landing word stack, the About hub, and the pursuit
// detail pages.

export interface WorkingOnItem {
  /** Matches the project id in projects.ts, so the ticker can link to its page. */
  id: string
  title: string
  description: string
  tags: string[]
  status: string
  statusColor: string
  statusBg: string
  icon: string
  iconColor: string
}

export const currentlyWorking: WorkingOnItem[] = [
  {
    id: 'jarvis',
    title: 'JARVIS',
    description: 'A voice-activated AI desktop assistant inspired by Iron Man. Wakes my PC, controls music and lights, and holds a natural conversation — all from a single wake word.',
    tags: ['Python', 'Claude', 'ElevenLabs'],
    status: 'In Development',
    statusColor: 'var(--warm)',
    statusBg: 'var(--accent-dim)',
    icon: 'lucide:mic',
    iconColor: 'var(--warm)',
  },
  {
    id: 'deep-core',
    title: 'Deep Core',
    description: 'A mobile game where you drill toward the earth\'s core, build an underground base, and compete with other players. Atmospheric, social, endless.',
    tags: ['Mobile', 'Game Dev', 'Strategy'],
    status: 'In Design',
    statusColor: 'var(--warm)',
    statusBg: 'var(--accent-dim)',
    icon: 'lucide:gamepad-2',
    iconColor: 'var(--warm)',
  },
]
