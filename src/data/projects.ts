export interface TechItem {
  name: string
  icon: string
}

export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  tags: string[]
  tech: TechItem[]
  github: string
  accent: string
}

export const projects: Project[] = [
  {
    id: 'millions',
    title: 'Millions',
    description: 'A stock market simulator built in Java with JavaFX. Implements design patterns like Observer, Factory, and dependency injection.',
    longDescription: `Millions is a stock market simulator developed as a group project at NTNU in the course TDT4100 — Object-Oriented Programming. The goal was to build a realistic application where users can buy and sell stocks, track their portfolio value over time, and simulate how markets move.

The project was a deep dive into object-oriented design. We structured the entire application around well-defined responsibilities: each class had one job, and communication between components happened through clear interfaces. This made it straightforward to test individual parts and swap out implementations without breaking anything else.

We used the Observer pattern to keep the UI in sync with the underlying data model. Whenever a stock price changed or a transaction was made, all registered observers were notified automatically — no manual polling. The Factory pattern handled the creation of different transaction types, keeping that logic centralized and easy to extend.

Dependency injection was something I initially found abstract, but working with it on a real project made it click. By injecting dependencies rather than hard-coding them, we could write proper unit tests and isolate components completely.

One of the bigger challenges was modeling the market itself — balancing randomness with realistic behavior so the simulator felt credible without being chaotic. We ended up basing price fluctuations on simple statistical models, which worked well enough for the scope of the project.

Overall, Millions was the project that made OOP concepts genuinely make sense to me, beyond just passing an exam.`,
    tags: ['Java', 'JavaFX', 'OOP', 'Design Patterns'],
    tech: [
      { name: 'Java', icon: 'devicon:java' },
      { name: 'JavaFX', icon: 'devicon:java' },
      { name: 'Maven', icon: 'devicon:maven' },
      { name: 'Git', icon: 'devicon:git' },
    ],
    github: 'https://github.com/mappe-2026/Millions',
    accent: 'from-orange-700/30 to-amber-600/25',
  },
  {
    id: 'deep-core',
    title: 'Deep Core',
    description: 'A mobile game where you start at the surface with a single drill and dig down toward the earth\'s core — combining base-building, strategy, and a strong social loop.',
    longDescription: `Deep Core is a mobile game I'm currently designing and building. You start on the surface with one simple drilling machine and dig your way down toward the planet's core. Layer by layer, you expand an underground base, unlock new resources and technology, and compete with other players to reach the deepest point.

The game blends base-building and strategy with a strong social layer — you can raid other players' bases, team up with friends in guilds, and watch the leaderboard for who's pushing the deepest. The competitive and cooperative loops are designed to feed into each other: progression is faster when you play with others, but every reward also makes you a more attractive target.

The visual direction is dark and atmospheric. The world is mostly stone and shadow, with warm amber light from smelters and forges illuminating the rock around your base. The contrast between the cold deep and the warm light from your own infrastructure is central to the mood I'm going for.

There's no end state — the world always extends deeper. Progression is meant to feel like an open horizon rather than a finish line, with new biomes, threats, and tech unlocking the further down you go.

This is the project where I've spent the most time thinking about design decisions outside of pure code: the economy, the pacing of unlocks, the balance between solo and social play, and how the visual atmosphere reinforces the loop. It's been a great way to learn that game development is as much about systems thinking as it is about engineering.`,
    tags: ['Mobile', 'Game Dev', 'Strategy', 'In Development'],
    tech: [
      { name: 'Mobile',     icon: 'lucide:smartphone' },
      { name: 'Game Design', icon: 'lucide:gamepad-2' },
    ],
    github: 'https://github.com/Mariusklepp/DeepCoreGame',
    accent: 'from-amber-700/35 to-stone-900/50',
  },
  {
    id: 'portfolio',
    title: 'Portfolio',
    description: 'Personal portfolio website built with React and Tailwind CSS. Features dark/light mode and responsive design.',
    longDescription: `This portfolio is the project I've learned the most from in terms of modern web development. I built it from scratch to have somewhere to show my work, but it ended up being just as much about the process as the result.

I chose React with TypeScript because I wanted to get serious about type safety — and it paid off immediately. Catching errors at compile time rather than at runtime is something I now can't imagine working without. Tailwind CSS was new to me when I started, and at first the utility-class approach felt strange, but it quickly became the fastest way I've ever styled anything.

The dark/light mode system was one of the more interesting technical decisions. Rather than using a CSS variable approach, I went with Tailwind's dark: variant driven by a class on the root element, with the preference persisted in localStorage. Simple, but it works perfectly and is easy to reason about.

Routing is handled by React Router, with a dedicated page per project so each one can have its own detailed write-up — which is exactly what you're reading now.

The biggest takeaway from this project was learning to make deliberate design decisions rather than just defaulting to whatever looked "fine". Things like spacing, typography scale, and color contrast actually matter, and getting them right takes more thought than I expected.`,
    tags: ['React', 'Tailwind CSS', 'TypeScript'],
    tech: [
      { name: 'React', icon: 'devicon:react' },
      { name: 'TypeScript', icon: 'devicon:typescript' },
      { name: 'Tailwind CSS', icon: 'devicon:tailwindcss' },
      { name: 'Vite', icon: 'devicon:vitejs' },
    ],
    github: 'https://github.com/Mariusklepp/portfolio',
    accent: 'from-stone-600/30 to-orange-800/25',
  },
]
