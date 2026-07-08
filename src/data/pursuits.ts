/**
 * The free-time pursuits — ONE source of truth shared by the landing word
 * stack (name/line/fact), the About hub chapters (about/badge/icon/media),
 * and the pursuit detail pages at /about/:slug (story/stats/log).
 *
 * Truth rule: every claim here must actually be true about Marius. Stats and
 * logs are OPTIONAL — pages render those sections only when data exists, so
 * it's always safe to leave them empty until there are real numbers (PRs,
 * golf handicap and rounds, Åre trips...). Write all copy in Marius's own
 * voice: a real person, plain words, no AI phrasing.
 */
export interface PursuitStat {
  value: string
  label: string
  detail?: string
}

export interface PursuitLogEntry {
  date: string
  text: string
}

export interface Pursuit {
  slug: string
  name: string
  /** Landing word stack: the one-liner under the live word. */
  line: string
  /** Landing word stack: the small mono fact. */
  fact?: string
  /** About hub: the chapter paragraph. */
  about: string
  /** About hub: optional status badge (rendered with a pulsing dot). */
  badge?: string
  icon: string
  media?: string[]
  /** Detail page paragraphs. */
  story: string[]
  /** Detail page: big numbers (PRs, handicap...). Rendered only if non-empty. */
  stats?: PursuitStat[]
  /** Detail page: "lately" entries (rounds, trips...). Rendered only if non-empty. */
  log?: PursuitLogEntry[]
}

export const pursuits: Pursuit[] = [
  {
    slug: 'training',
    name: 'Training',
    line: "Mostly gym and running. I've run the Trondheim Marathon, and next up is the Copenhagen Marathon in May 2027. I'm also thinking about an Ironman.",
    fact: 'Trondheim done · Copenhagen May 2027',
    about:
      "I ran the Trondheim Marathon, and the Copenhagen Marathon in May 2027 is the next one. An Ironman is on my mind too, but I haven't committed to it yet. Between races it's the gym, a few hours every week. Long efforts are where discipline gets honest. No shortcuts, just the months of work before the start line.",
    badge: 'Next: Copenhagen Marathon · May 2027',
    icon: 'lucide:footprints',
    media: ['/images/running.jpg', '/images/strength.jpg'],
    story: [
      'Most weeks look the same: a few hours in the gym, and runs on top of that. Not very glamorous, but it works.',
      "I ran the Trondheim Marathon, and my next race is the Copenhagen Marathon in May 2027. An Ironman is on my mind too, but that decision isn't made yet.",
      "I'll put my PRs and race times here once I've got them tracked properly.",
    ],
  },
  {
    slug: 'slalom-snowboard',
    name: 'Slalom & snowboard',
    line: 'As many days on the mountain as I can get.',
    fact: 'Every winter',
    about:
      'Slalom and snowboarding all winter. The trade-off between speed and control on a mountain is something I never get tired of.',
    icon: 'mdi:ski',
    media: ['/images/skiing.jpg', '/videos/snowboard.mp4'],
    story: [
      'Winter is the season I look forward to the most. Slalom and snowboarding, as many days as the season allows.',
      'The Åre trips are the highlight of the year. Pictures from them will end up here.',
    ],
  },
  {
    slug: 'golf',
    name: 'Golf',
    line: "The newest one. I recently started playing and I'm still learning the game.",
    fact: 'Just started',
    about: "The newest one. I started playing recently and I'm still learning the game.",
    badge: 'Just started',
    icon: 'mdi:golf',
    story: [
      "This is the newest one. I started playing recently and I'm still learning the game.",
      "Once I've got a handicap worth sharing, it'll show up here, along with how the rounds are actually going.",
    ],
  },
]

export function getPursuit(slug: string | undefined) {
  return pursuits.find((p) => p.slug === slug)
}
