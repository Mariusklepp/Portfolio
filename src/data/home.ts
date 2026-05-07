export const typewriterTexts = [
  'Software Development Student',
  'Java Developer',
  'React Developer',
  'Open to Freelance',
]

export interface SocialLink {
  href: string
  icon: string
  label: string
  download?: boolean
}

export const socialLinks: SocialLink[] = [
  { href: 'https://github.com/Mariusklepp',                         icon: 'devicon:github',     label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/marius-klepp-28494437b/',    icon: 'devicon:linkedin',   label: 'LinkedIn' },
  { href: 'https://instagram.com/mariusklepp',                      icon: 'skill-icons:instagram', label: 'Instagram' },
  { href: 'mailto:marius.s.klepp@gmail.com',                        icon: 'lucide:mail',        label: 'Email' },
  { href: '/cv.pdf',                                                icon: 'lucide:download',    label: 'CV', download: true },
]

export interface WorkingOnItem {
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
    title: 'Millions',
    description: 'A stock market simulator built in Java with JavaFX. Implements design patterns like Observer, Factory, and dependency injection.',
    tags: ['Java', 'JavaFX'],
    status: 'In Development',
    statusColor: 'var(--warm)',
    statusBg: 'var(--accent-dim)',
    icon: 'lucide:trending-up',
    iconColor: 'var(--warm)',
  },
  {
    title: 'Deep Core',
    description: 'A mobile game where you drill toward the earth\'s core, build an underground base, and compete with other players. Atmospheric, social, endless.',
    tags: ['Mobile', 'Game Dev', 'Strategy'],
    status: 'In Development',
    statusColor: 'var(--warm)',
    statusBg: 'var(--accent-dim)',
    icon: 'lucide:gamepad-2',
    iconColor: 'var(--warm)',
  },
  {
    title: 'This Portfolio',
    description: 'Building and refining my personal portfolio website with React and Tailwind CSS.',
    tags: ['React', 'TypeScript', 'Tailwind'],
    status: 'Active',
    statusColor: 'var(--accent)',
    statusBg: 'var(--accent-dim)',
    icon: 'lucide:globe',
    iconColor: 'var(--accent)',
  },
]
