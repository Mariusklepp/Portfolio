export interface TechItem {
  name: string
  icon: string
}

export interface ProjectImage {
  src: string
  alt: string
}

export type ProjectBlock =
  | { type: 'heading'; text: string; eyebrow?: string; subtitle?: string }
  | { type: 'paragraph'; text: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'divider' }
  | { type: 'callout'; icon?: string; tone?: 'accent' | 'neutral'; text: string }
  | { type: 'stats'; items: { value: string; label: string }[] }
  | { type: 'features'; items: { icon: string; title: string; text: string }[] }
  | { type: 'code'; lang?: string; text: string }

export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  tags: string[]
  tech: TechItem[]
  github: string
  accent: string
  category?: string
  status?: string
  date?: string
  metric?: string
  preview?: string
  images?: ProjectImage[]
  content?: ProjectBlock[]
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** 'YYYY-MM' or 'YYYY-MM-DD' → 'Jun 2026'. The optional day only breaks
 *  same-month ties for sorting and is never displayed. */
export function formatMonthYear(date?: string): string {
  if (!date) return ''
  const [y, m] = date.split('-')
  const month = MONTHS[Number(m) - 1]
  return month ? `${month} ${y}` : y
}

export const projects: Project[] = [
  {
    id: 'millions',
    title: 'Millions',
    description: 'A stock-market game where you start with a small amount of cash and try to reach one million kroner by trading shares week by week. Built in Java and JavaFX as a two-person project at NTNU.',
    longDescription: `Millions is a stock-market game built as a portfolio assignment in IDATT2003 Programming 2 at NTNU. You start with a small amount of money and a single goal: reach one million kroner. To get there, you buy and sell shares in a simulated market that moves a little every week, and you have to balance risk against the weekly costs of staying in the game.

Each week the market shifts. Prices move up or down based on the volatility of the chosen difficulty, your pending orders get evaluated, and a fixed hangar cost is pulled from your balance whether you traded or not. You can place ordinary buy and sell orders, but also more advanced ones like limit orders and stop-loss orders that trigger automatically when the price crosses a target. The dashboard shows your progress towards a million, your current investor rank, weekly winners and losers, and any notifications from triggered orders. There is a shop where you can convert money into in-game coins to buy visual themes, a leaderboard that ranks every finished run by score, and a save system with multiple slots so you can keep several games going at the same time.

The main plan going forward is to make the market itself feel alive. Right now prices move according to a volatility profile, but the next big feature is news and events: weekly headlines that shift specific stocks or whole sectors, scheduled events like earnings reports and market crashes, and player-visible reasons behind why a price suddenly jumps or tanks. The notification system is already in place for it — the dashboard has a notifications card and the domain emits typed events — so the next step is wiring a news engine into the weekly advance cycle and giving the player a feed they can react to. Beyond that we want a watchlist, a native installer, and eventually localisation.

The technical side is where most of the engineering effort went. The project started flat — one package per type, everything reachable from everywhere — and by the third iteration we had refactored it into a layered architecture inspired by Clean Architecture and Hexagonal Architecture, with the domain at the center and all dependencies pointing inwards. The application layer is split into commands and queries (CQRS), so each use case declares upfront whether it mutates state or just reads it, and the UI never touches the domain directly. It always goes through use cases against a repository port.

The market is driven by a volatility profile per difficulty level, and the shop has its own coin exchange where prices fluctuate independently of the stock market. Pulling that coin exchange into the aggregate root and persisting it alongside the rest of the game state was one of the more interesting modelling problems — the previous version created a fresh exchange on every purchase, which meant prices visually fluctuated in the UI but every actual transaction silently snapped back to the base price.

Around 450 unit tests cover the business-critical logic, including roundtrip tests that prove a saved game survives serialisation without losing state. Google Java Style is enforced through Checkstyle in the Maven build, every persistence failure flows through a dedicated exception type, and all logging goes through java.util.logging at the architectural boundary instead of being scattered across the codebase.

This is the project where Clean Architecture stopped being a buzzword for me and became something I would actually reach for again. Even on a small Maven project with two developers, having the dependency rule pointed in one direction made every new feature easier to slot in.`,
    tags: ['Java 25', 'JavaFX', 'Clean Architecture', 'CQRS', 'Design Patterns'],
    tech: [
      { name: 'Java 25', icon: 'devicon:java' },
      { name: 'JavaFX', icon: 'devicon:java' },
      { name: 'Maven', icon: 'devicon:maven' },
      { name: 'JUnit', icon: 'devicon:junit' },
      { name: 'Jackson', icon: 'lucide:braces' },
      { name: 'Git', icon: 'devicon:git' },
    ],
    github: 'https://github.com/mappe-2026/Millions',
    accent: 'from-orange-700/30 to-amber-600/25',
    status: 'Shipped',
    category: 'Games',
    date: '2026-01',
    metric: '450 tests',
    preview: '/images/millions/dashboard.png',
    images: [
      { src: '/images/millions/main-menu.png', alt: 'Main menu with continue, new game, load, leaderboard and settings' },
      { src: '/images/millions/dashboard.png', alt: 'Dashboard showing goal progress, investor rank, notifications and weekly movers' },
      { src: '/images/millions/market.png', alt: 'Market view listing all available stocks with prices and weekly changes' },
      { src: '/images/millions/portfolio.png', alt: 'Portfolio with the net worth chart and current holdings' },
      { src: '/images/millions/stock-detail.png', alt: 'Stock detail view with price history and buy or sell actions' },
    ],
    content: [
      // ── Hero ─────────────────────────────────────────────
      {
        type: 'paragraph',
        text: 'Millions is a single-player stock-market game written in Java and JavaFX. It was built as the exam project for IDATT2003 Programming 2 at NTNU — a two-person assignment that grew into a full game with weekly market progression, automatic limit orders, a leaderboard, and a save system with multiple slots. The premise is simple: take a small starting capital and turn it into one million kroner. The texture is what makes it interesting — the market shifts every week, a fixed hangar cost lands on your account whether you traded or not, and three difficulty profiles decide how unforgiving the journey is.',
      },
      {
        type: 'image',
        src: '/images/millions/main-menu.png',
        alt: 'Main menu with continue, new game, load, leaderboard and settings',
        caption: 'You land on the main menu — continue an existing run, start a new one, or peek at the leaderboard to see who has gotten the furthest.',
      },

      // The pitch
      {
        type: 'stats',
        items: [
          { value: '1 000 000 kr', label: 'The goal' },
          { value: 'Weekly cycle', label: 'Market rhythm' },
          { value: '3 difficulties', label: 'Risk profiles' },
          { value: 'Java 25 + JavaFX', label: 'Built with' },
        ],
      },

      // ── Setup ────────────────────────────────────────────
      {
        type: 'heading',
        eyebrow: 'Step one',
        text: 'Setting up a run',
        subtitle: 'Pick a name, a starting capital, a difficulty, and a market to play in.',
      },
      {
        type: 'paragraph',
        text: 'Every run begins with a short onboarding. You give yourself a name, choose how much cash to start with, and pick a difficulty that decides how wild the market will be. Easy gives you generous upswings and small hangar costs. Hard punishes mistakes — bigger losses, smaller wins, and a weekly cost that bites hard if you sit still.',
      },
      {
        type: 'image',
        src: '/images/millions/onboarding-difficulty.png',
        alt: 'Onboarding step where the player picks Easy, Medium or Hard difficulty',
        caption: 'Difficulty is more than a label. Each profile rewires the market — up chance, max gain, max loss, and how aggressively the weekly hangar cost grows.',
      },

      // ── The goal ─────────────────────────────────────────
      {
        type: 'heading',
        eyebrow: 'The objective',
        text: 'A race to a million',
      },
      {
        type: 'paragraph',
        text: 'Once a run starts, everything orbits the same number: one million. The dashboard makes that goal impossible to forget. A progress bar tracks how far you are from the moon. A second bar tracks your investor rank — you start as a Novice, climb to Investor, and eventually Speculator if you keep winning. Notifications and weekly winners and losers sit underneath, so you always know what just happened and what is moving.',
      },
      {
        type: 'image',
        src: '/images/millions/dashboard.png',
        alt: 'Dashboard with goal progress, investor rank, notifications and weekly movers',
        caption: 'The dashboard at a glance: goal progress on top, rank below, notifications on the left, weekly movers on the right.',
      },
      {
        type: 'callout',
        tone: 'accent',
        icon: 'lucide:target',
        text: 'Reach 1 000 000 kr before the weekly costs grind your portfolio down. Fall too far behind and the run ends — sometimes a few well-timed limit orders are all that stand between a win and a wipeout.',
      },

      // ── Trading ──────────────────────────────────────────
      {
        type: 'heading',
        eyebrow: 'Core loop',
        text: 'Trading and the weekly cycle',
      },
      {
        type: 'paragraph',
        text: 'Each week, three things happen. Stock prices move based on the volatility of your chosen difficulty. Any pending orders you placed get evaluated against the new prices. And a fixed hangar cost is taken out of your cash whether you traded or not. The market view is where most of the action happens — every stock, with the latest price and how it moved this week.',
      },
      {
        type: 'image',
        src: '/images/millions/market.png',
        alt: 'Market view listing all available stocks with prices and weekly changes',
        caption: 'The market view. Search by symbol or company, sort by price or change, and click any stock to dig deeper.',
      },
      {
        type: 'paragraph',
        text: 'You are not limited to clicking buy when you happen to be online. The game leans into more thoughtful trading by giving you three kinds of automatic orders. They sit in a queue and trigger themselves when the price hits your target.',
      },
      {
        type: 'features',
        items: [
          {
            icon: 'lucide:trending-down',
            title: 'Limit buy',
            text: 'Snap up a share automatically when the price drops to a level you set. Useful for buying the dip without watching every tick.',
          },
          {
            icon: 'lucide:trending-up',
            title: 'Limit sell',
            text: 'Lock in profits the moment a stock climbs to your target. Set it and forget it — even if you do not log in next week.',
          },
          {
            icon: 'lucide:shield',
            title: 'Stop loss',
            text: 'A safety net. If a stock falls below your threshold, it sells itself before a small loss turns into a disaster.',
          },
        ],
      },
      {
        type: 'image',
        src: '/images/millions/orders.png',
        alt: 'Pending orders view with limit buy, limit sell and stop-loss orders',
        caption: 'All your pending orders in one queue. Cancel one if you change your mind, or let the next week resolve them automatically.',
      },

      // ── Stock detail ─────────────────────────────────────
      {
        type: 'heading',
        eyebrow: 'Decisions',
        text: 'Reading a stock',
      },
      {
        type: 'paragraph',
        text: 'Tap on any stock and you get the whole story — the full price history as a line chart, the latest change in absolute and percentage terms, and the quantity you already hold. Buy and sell live right next to the chart so you can act in the same view you used to make up your mind.',
      },
      {
        type: 'image',
        src: '/images/millions/stock-detail.png',
        alt: 'Stock detail view with price history and buy or sell actions',
        caption: 'Stock detail. Price development on the right, your position on the bottom, buy and sell within reach.',
      },

      // ── Portfolio ────────────────────────────────────────
      {
        type: 'heading',
        eyebrow: 'Your standing',
        text: 'Tracking the portfolio',
      },
      {
        type: 'paragraph',
        text: 'The portfolio page is where the run takes shape. A net worth chart shows every week since you started, with little markers for every buy and sell — so you can trace exactly when you made a good call and when you didn\'t. Below it, a holdings table lists every share you own, what you paid for it, what it is worth now, and the gain or loss in both kroner and percent.',
      },
      {
        type: 'image',
        src: '/images/millions/portfolio.png',
        alt: 'Portfolio with the net worth chart and current holdings',
        caption: 'Your portfolio history at a glance. Every dot on the line is a transaction — green if you bought, red if you sold.',
      },

      // ── Shop ─────────────────────────────────────────────
      {
        type: 'heading',
        eyebrow: 'Side economy',
        text: 'The shop and themes',
      },
      {
        type: 'paragraph',
        text: 'A second economy runs alongside the trading. You can convert kroner into coins through a coin exchange that fluctuates with its own price curve — buy coins low, spend them on visual themes for the interface. The themes are cosmetic, but the price swings are a fun little side bet. Buy a stack when the rate is cheap and you have effectively saved money to spend later.',
      },
      {
        type: 'image',
        src: '/images/millions/shop.png',
        alt: 'Shop with coin exchange and theme purchases',
        caption: 'The shop. Coin exchange rate at the top, available themes below — some locked behind a minimum net worth.',
      },

      // ── Payoff ───────────────────────────────────────────
      {
        type: 'heading',
        eyebrow: 'The payoff',
        text: 'Reaching the moon',
      },
      {
        type: 'paragraph',
        text: 'Cross the million kroner line and the run ends with a flourish: a final tally, your weeks played, your difficulty, and a score that lands you on the leaderboard. Score rewards finishing fast and finishing from less — start with less capital, climb in fewer weeks, and your number gets pushed up the board.',
      },
      {
        type: 'image',
        src: '/images/millions/game-won.png',
        alt: 'Win screen showing "You reached the Moon" with final net worth and leaderboard score',
        caption: 'The win screen. Your final net worth, the leaderboard score, and a clear button to start the next attempt.',
      },

      // ── Run it ───────────────────────────────────────────
      {
        type: 'heading',
        eyebrow: 'Get it running',
        text: 'Play it yourself',
        subtitle: 'The project is open source on GitHub. Right now you need JDK 25 and Maven, but a native installer is coming.',
      },
      {
        type: 'paragraph',
        text: 'Clone the repository and run it through the JavaFX Maven plugin. Maven pulls down JavaFX, JUnit and Jackson automatically, so a working JDK and Maven on your PATH is the only setup required.',
      },
      {
        type: 'code',
        lang: 'bash',
        text: 'git clone https://github.com/mappe-2026/Millions.git\ncd Millions\nmvn javafx:run',
      },
      {
        type: 'callout',
        tone: 'accent',
        icon: 'lucide:package',
        text: 'A native installer is on the roadmap — one click to launch on Windows, macOS and Linux, no JDK or Maven required. For the exam delivery, Maven-based running was enough; for everyone else, the installer is the obvious next step.',
      },

      // ── Roadmap ──────────────────────────────────────────
      {
        type: 'heading',
        eyebrow: 'Roadmap',
        text: "What's coming next",
      },
      {
        type: 'paragraph',
        text: 'Right now the market moves on pure volatility — fair, but a little anonymous. The next big push is to make the market feel alive. Weekly headlines that shift specific stocks or whole sectors. Scheduled events like earnings reports and market crashes. A reason behind every price jump. The notification system is already in place for it — the dashboard has the slot, and the domain emits typed events — so the next step is wiring a news engine into the weekly cycle.',
      },
      {
        type: 'features',
        items: [
          {
            icon: 'lucide:newspaper',
            title: 'News & events',
            text: 'Weekly headlines, earnings reports and market crashes that shift specific stocks or entire sectors.',
          },
          {
            icon: 'lucide:bookmark',
            title: 'Watchlist',
            text: 'Pin the stocks you actually care about so you do not have to scan the whole market every week.',
          },
          {
            icon: 'lucide:sparkles',
            title: 'More in the shop',
            text: 'Spend coins on more than themes — hints about which stocks are about to move, early access to upcoming headlines, and other perks that shape how you play.',
          },
        ],
      },

      { type: 'divider' },

      // ── Tech ─────────────────────────────────────────────
      {
        type: 'heading',
        eyebrow: 'Under the hood',
        text: 'The technical side',
        subtitle: 'How the architecture evolved from a flat prototype into a layered, testable domain.',
      },
      {
        type: 'paragraph',
        text: 'The project started flat — one package per type, everything reachable from everywhere. By the third iteration we had refactored it into a layered architecture inspired by Clean Architecture and Hexagonal Architecture. The domain sits at the center and all dependencies point inwards, so the business logic compiles and tests without ever touching JavaFX or Jackson.',
      },
      {
        type: 'paragraph',
        text: 'The application layer is split into commands and queries (CQRS), so each use case declares upfront whether it mutates state or just reads it. The UI never touches the domain directly. It always goes through use cases against a repository port, which made it trivial to swap in an in-memory repository for the tests.',
      },

      // Bug story
      { type: 'heading', text: 'The coin exchange bug' },
      {
        type: 'paragraph',
        text: 'One of the more interesting modelling problems was the coin exchange. The original version created a fresh Shop with a fresh CoinExchange every time the player bought coins. The fix was architectural: pull the coin exchange into the GameSession aggregate, persist it alongside the rest of the game state, and route all shop use cases through that single source of truth. A regression test now proves the coin price survives a full save/load roundtrip.',
      },
      {
        type: 'callout',
        tone: 'neutral',
        icon: 'lucide:bug',
        text: 'Prices visually fluctuated in the UI, but every actual transaction silently snapped back to the base price. Two CoinExchange instances, one source of truth — and it was not the one the player was looking at.',
      },

      // Quality
      { type: 'heading', text: 'Quality and testing' },
      {
        type: 'paragraph',
        text: 'Around 450 unit tests cover the business-critical logic, including roundtrip tests that prove a saved game survives serialisation without losing state. Google Java Style is enforced through Checkstyle in the Maven build, every persistence failure flows through a dedicated exception type, and all logging goes through java.util.logging at the architectural boundary instead of being scattered across the codebase.',
      },
      {
        type: 'stats',
        items: [
          { value: '450', label: 'Unit tests' },
          { value: '26', label: 'Use cases' },
          { value: 'Google', label: 'Java Style' },
          { value: '0', label: 'Test failures' },
        ],
      },

      // Closing
      { type: 'heading', text: 'Looking back' },
      {
        type: 'paragraph',
        text: 'This is the project where Clean Architecture stopped being a buzzword and became something I would actually reach for again. Even on a small Maven project with two developers, having the dependency rule pointed in one direction made every new feature easier to slot in — and the bugs that did slip through were the kind that taught you something worth keeping.',
      },
    ],
  },
  {
    id: 'jarvis',
    title: 'Jarvis',
    description: 'A voice-activated AI desktop assistant inspired by the AI from the Iron Man films. Listens passively in the background and springs to life on a single wake word — waking the PC, starting music, adjusting lights, and opening my workspace before I sit down.',
    longDescription: `Jarvis is a fully voice-controlled AI desktop assistant I'm building in Python. It listens passively in the background and wakes up the moment I say "Jarvis, start me up" — turning on my PC, starting my music on the JBL WiFi speaker through Chromecast, adjusting the Philips Hue lights, and opening my workspace, all before I've sat down.

In passive mode, only the wake-word engine (Porcupine) is running, so there is virtually no CPU overhead. Once triggered, Jarvis flips into active mode: Whisper transcribes my speech locally, Claude Haiku processes the intent and generates a response, ElevenLabs synthesises the reply in a deep, calm, British voice, and Python executes the right action — call the Spotify API, toggle a Hue scene, launch VS Code, run a Wake-on-LAN packet, anything. After a few seconds of silence it drops back to passive.

The interface is an Iron Man-style HUD overlay built in tkinter that animates when Jarvis is listening or speaking. Mornings start with an automatic briefing — weather, calendar, a short summary — and the rest of the day it sits quietly in the tray until I need it.

This is the project where I'm learning how all the pieces of a modern AI agent fit together: wake-word detection, streaming speech-to-text, LLM tool use, neural TTS, and the boring-but-critical glue that ties APIs, smart home devices, and the OS into one experience. The goal is something that feels less like a voice command line and more like a presence in the room.`,
    tags: ['Python', 'AI', 'Voice', 'Smart Home'],
    tech: [
      { name: 'Python', icon: 'devicon:python' },
      { name: 'Claude Haiku', icon: 'lucide:sparkles' },
      { name: 'Whisper', icon: 'lucide:mic' },
      { name: 'ElevenLabs', icon: 'lucide:audio-lines' },
      { name: 'Porcupine', icon: 'lucide:ear' },
      { name: 'Spotify API', icon: 'mdi:spotify' },
      { name: 'Philips Hue', icon: 'lucide:lightbulb' },
      { name: 'tkinter', icon: 'lucide:layout-dashboard' },
    ],
    github: 'https://github.com/Mariusklepp',
    accent: 'from-amber-600/30 to-yellow-900/40',
    status: 'In design',
    category: 'Apps',
    date: '2026-06-01',
    content: [
      {
        type: 'paragraph',
        text: 'Jarvis is a fully voice-controlled AI desktop assistant inspired by the AI from the Iron Man films. Built entirely in Python, it listens passively in the background and springs to life the moment I say "Jarvis, start me up" — waking my PC, starting my music, adjusting my lights, and opening my workspace, all before I have sat down.',
      },
      {
        type: 'stats',
        items: [
          { value: 'Always-on', label: 'Wake word' },
          { value: 'Local', label: 'Transcription' },
          { value: 'Claude Haiku', label: 'Reasoning' },
          { value: 'Neural TTS', label: 'Voice' },
        ],
      },

      {
        type: 'heading',
        eyebrow: 'Capabilities',
        text: 'What Jarvis can do',
      },
      {
        type: 'features',
        items: [
          { icon: 'lucide:ear', title: 'Wake word', text: 'Always-on passive listening via Porcupine. Zero CPU overhead until triggered.' },
          { icon: 'lucide:message-circle', title: 'Voice dialogue', text: 'Natural conversation powered by Claude Haiku. Context-aware, time-sensitive responses.' },
          { icon: 'lucide:audio-lines', title: 'Lifelike voice', text: 'ElevenLabs neural TTS with a custom Jarvis-style voice — deep, calm, British.' },
          { icon: 'mdi:spotify', title: 'Music control', text: 'Spotify integration via Chromecast. Streams directly to a JBL WiFi speaker on command.' },
          { icon: 'lucide:lightbulb', title: 'Smart lighting', text: 'Philips Hue control. Set scenes, brightness and colour with a single voice command.' },
          { icon: 'lucide:layout-dashboard', title: 'HUD overlay', text: 'An Iron Man-style animated interface that shows when Jarvis is listening or speaking.' },
          { icon: 'lucide:sun', title: 'Daily briefing', text: 'Weather, calendar events and a morning summary — automatically at startup.' },
          { icon: 'lucide:monitor', title: 'PC control', text: 'Volume, shutdown, app launching. Full system control through natural language.' },
        ],
      },

      { type: 'divider' },

      {
        type: 'heading',
        eyebrow: 'Architecture',
        text: 'How it works',
      },
      {
        type: 'paragraph',
        text: 'Jarvis runs two modes: passive and active. In passive mode, only the wake-word engine is running — virtually no CPU usage. Once triggered, it switches to active mode: Whisper transcribes my speech locally, Claude Haiku processes intent and generates a response, ElevenLabs synthesises the reply, and Python executes the relevant action — whether that is calling the Spotify API, toggling a Hue light, or launching VS Code. The system returns to passive mode after a few seconds of silence.',
      },
      {
        type: 'callout',
        tone: 'accent',
        icon: 'lucide:zap',
        text: 'The whole loop — wake word, transcription, reasoning, TTS, action — is designed to feel instant. The trick is keeping the heavy components asleep until the wake word fires.',
      },

      { type: 'divider' },

      {
        type: 'heading',
        eyebrow: 'Stack',
        text: 'Technologies',
      },
      {
        type: 'features',
        items: [
          { icon: 'devicon:python', title: 'Python', text: 'The glue. Orchestrates the wake-word loop, audio pipeline, LLM calls and side effects.' },
          { icon: 'lucide:ear', title: 'Porcupine', text: 'Low-power on-device wake-word detection.' },
          { icon: 'lucide:mic', title: 'OpenAI Whisper', text: 'Local speech-to-text — no audio ever leaves the machine for transcription.' },
          { icon: 'lucide:sparkles', title: 'Claude Haiku', text: 'Fast, cheap reasoning layer that interprets intent and writes the spoken reply.' },
          { icon: 'lucide:audio-lines', title: 'ElevenLabs', text: 'Neural TTS with a custom voice profile.' },
          { icon: 'mdi:spotify', title: 'Spotify + Chromecast', text: 'Music playback piped to a JBL WiFi speaker.' },
          { icon: 'lucide:lightbulb', title: 'Philips Hue API', text: 'Scene and brightness control for the room.' },
          { icon: 'lucide:power', title: 'Wake-on-LAN', text: 'Wakes the desktop from sleep before I reach the chair.' },
        ],
      },

      {
        type: 'callout',
        tone: 'neutral',
        icon: 'lucide:hammer',
        text: 'Status: in development. The wake-word loop, voice dialogue and music control are working end to end — Hue scenes, the HUD overlay and the morning briefing are next.',
      },
    ],
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
    tags: ['Mobile', 'Game Dev', 'Strategy'],
    tech: [
      { name: 'Mobile',     icon: 'lucide:smartphone' },
      { name: 'Game Design', icon: 'lucide:gamepad-2' },
    ],
    github: 'https://github.com/Mariusklepp/DeepCoreGame',
    accent: 'from-amber-700/35 to-stone-900/50',
    status: 'In development',
    category: 'Games',
    date: '2026-04',
  },
  {
    id: 'excel-customer-id-matcher',
    title: 'Excel Customer-ID Matcher',
    description: 'A Windows desktop app that transfers customer IDs from a master list into a target spreadsheet using fuzzy name matching — surviving the whitespace, suffix, ordering, diacritic and typo differences that defeat VLOOKUP and XLOOKUP.',
    longDescription: `Excel Customer-ID Matcher is a Windows desktop application that links the same person or company across two Excel files when the names are spelled inconsistently. In bookkeeping and CRM workflows this is the norm, not the exception — and Excel's lookup functions require character-for-character matches, so reconciling 600+ rows by hand is what people end up doing. The app does the same job in seconds and flags only the rows that genuinely need a human to confirm.

The workflow is short. Pick the two files — the app auto-detects which column holds names and which holds IDs. Run matching: each target name is scored against every source name using a hybrid similarity metric (token-set + sorted-token Levenshtein + normalised Levenshtein), and rows are classified OK / CHECK / MISSING. The user reviews the CHECK and MISSING rows through a two-stage approve flow (lock-in edits, then finalise) with one-click undo. Finally export — either overwrite the original target file or save to a new location. A pre-existing Kundenr column is reused if found; otherwise a new one is appended.

The fuzzy matcher combines three similarity metrics so it tolerates token reordering ("Bjerkem Svenn Are" = "Svenn Are Bjerkem"), comma-separated names ("Kalseth, Ivar" = "Ivar Kalseth"), middle-initial abbreviation ("Karen M. Hjelde" = "Karen Marie Hjelde"), and the standard suffix variations like "AS" vs "ASA". Names with no real overlap score below the 0.70 threshold and are returned as "Ingen match", so weak coincidences never produce an automatic ID assignment.

The controller layer is split into focused, SOLID-conscious classes — MainController for FXML orchestration, EditTableFactory for table cells, UndoHistory for the approve-action stack, ThemeController for stylesheet swap, HelpDialog for the help flow. Pure-logic classes are framework-free and unit-testable in isolation. Matching and Excel writes run on JavaFX Task workers so the UI never freezes on large files.

Distribution is self-contained. A build-installer.bat regenerates the app icon programmatically (PNG via AWT, multi-resolution .ico written by hand from raw bytes), builds a fat jar through Maven Shade, then invokes jpackage to produce a standalone Windows app-image with embedded JRE — no Java required on the end-user's machine. If WiX Toolset is on PATH it additionally builds a real Windows .msi installer. Otherwise the app-image folder can be zipped and shipped — the end-user just unzips and double-clicks. The project is production-ready for end-user delivery and the matching pipeline is tested against realistic fixture data with hand-verified expected matches.`,
    tags: ['Java 21', 'JavaFX', 'Apache POI', 'Desktop App'],
    tech: [
      { name: 'Java 21', icon: 'devicon:java' },
      { name: 'JavaFX 21', icon: 'devicon:java' },
      { name: 'Apache POI', icon: 'lucide:file-spreadsheet' },
      { name: 'Apache Commons Text', icon: 'lucide:type' },
      { name: 'Maven', icon: 'devicon:maven' },
      { name: 'JUnit 5', icon: 'devicon:junit' },
      { name: 'jpackage', icon: 'lucide:package' },
      { name: 'WiX Toolset', icon: 'lucide:box' },
    ],
    github: 'https://github.com/Mariusklepp',
    accent: 'from-emerald-800/30 to-stone-900/40',
    status: 'Shipped',
    category: 'Tools',
    date: '2026-05',
    metric: '600+ rows',
    content: [
      {
        type: 'paragraph',
        text: 'Excel Customer-ID Matcher is a Windows desktop application that transfers customer IDs from a master customer list into a target spreadsheet, using fuzzy name matching that survives the small differences — extra whitespace, "AS" vs "ASA", reversed name order, Norwegian diacritics, typos — that defeat Excel\'s built-in VLOOKUP and XLOOKUP.',
      },
      {
        type: 'stats',
        items: [
          { value: '600+ rows', label: 'In seconds' },
          { value: '0.70', label: 'Match threshold' },
          { value: '20', label: 'Unit tests' },
          { value: 'Java 21 + POI', label: 'Built with' },
        ],
      },

      {
        type: 'heading',
        eyebrow: 'The problem',
        text: 'Why VLOOKUP is not enough',
      },
      {
        type: 'paragraph',
        text: "In bookkeeping and CRM workflows, you often need to link the same person or company across two files where the names are spelled inconsistently. Excel's lookup functions require character-for-character matches, so reconciling hundreds of rows by hand is the norm. This app does it in seconds and flags only the rows that genuinely need a human to confirm.",
      },
      {
        type: 'callout',
        tone: 'accent',
        icon: 'lucide:target',
        text: 'Names below the 0.70 similarity threshold are returned as "Ingen match" so weak coincidences never produce an automatic ID assignment. Humans confirm the borderline rows, the rest are handled automatically.',
      },

      {
        type: 'heading',
        eyebrow: 'Workflow',
        text: 'Four steps from two files to a finished sheet',
      },
      {
        type: 'features',
        items: [
          { icon: 'lucide:folder-open', title: 'Pick the files', text: 'The app auto-detects which column holds names and which holds IDs in both files.' },
          { icon: 'lucide:play', title: 'Run matching', text: 'Each target name is scored against every source name. Rows are classified OK / CHECK / MISSING.' },
          { icon: 'lucide:check-check', title: 'Review the flags', text: 'A two-stage approve flow (lock-in edits, then finalise) with one-click undo on every action.' },
          { icon: 'lucide:download', title: 'Export', text: 'Overwrite the original target file or save to a new location. Existing Kundenr column is reused if present.' },
        ],
      },

      { type: 'divider' },

      {
        type: 'heading',
        eyebrow: 'Under the hood',
        text: 'The matching algorithm',
      },
      {
        type: 'paragraph',
        text: 'The fuzzy matcher combines three similarity metrics — token-set, sorted-token Levenshtein, and normalised Levenshtein — so it tolerates the kinds of inconsistencies real-world data is full of. Token reordering ("Bjerkem Svenn Are" = "Svenn Are Bjerkem"), comma-separated names ("Kalseth, Ivar" = "Ivar Kalseth"), middle-initial abbreviation ("Karen M. Hjelde" = "Karen Marie Hjelde"), and the standard AS/ASA suffix variations all resolve correctly.',
      },

      {
        type: 'heading',
        eyebrow: 'Engineering',
        text: 'Architecture and quality',
      },
      {
        type: 'features',
        items: [
          { icon: 'lucide:layers', title: 'SOLID-conscious split', text: 'MainController for FXML orchestration, EditTableFactory for table cells, UndoHistory for the approve stack, ThemeController for stylesheets, HelpDialog for help. Pure-logic classes are framework-free.' },
          { icon: 'lucide:cpu', title: 'Background-threaded I/O', text: 'Matching and Excel writes run on JavaFX Task workers so the UI never freezes on large files.' },
          { icon: 'lucide:test-tube', title: '20 unit tests', text: 'Cover match-scoring edge cases and Excel header/column detection.' },
          { icon: 'lucide:palette', title: 'Custom theming', text: 'Dark/light modes with a harmonised forest-green palette, swapped through ThemeController.' },
        ],
      },

      { type: 'divider' },

      {
        type: 'heading',
        eyebrow: 'Distribution',
        text: 'Self-contained Windows app',
      },
      {
        type: 'paragraph',
        text: 'A build-installer.bat regenerates the app icon programmatically (PNG via AWT, multi-resolution .ico written by hand from raw bytes), builds the fat jar through Maven Shade, then invokes jpackage to produce a standalone Windows app-image with embedded JRE — so the end-user does not need Java installed. If WiX Toolset is on PATH it additionally builds a real Windows .msi installer. Otherwise the app-image folder can be zipped and shipped.',
      },
      {
        type: 'code',
        lang: 'bash',
        text: 'build-installer.bat\n\n# Produces:\n#   target/app-image/   — standalone Windows app folder\n#   target/*.msi        — optional installer (if WiX is on PATH)',
      },

      {
        type: 'callout',
        tone: 'accent',
        icon: 'lucide:check-circle',
        text: 'Status: production-ready for end-user delivery. The matching pipeline has been tested against realistic fixture data with hand-verified expected matches.',
      },
    ],
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
    status: 'Live',
    category: 'Web',
    date: '2026-05',
  },
  {
    id: 'blackjack-card-counter',
    title: 'Blackjack Card Counter',
    description:
      'An educational blackjack simulator and card-counting trainer — play realistic hands while drilling Hi-Lo counting. A fullstack learning project with a clean-architecture Java + Spring Boot core.',
    longDescription: `Blackjack Card Counter is an educational blackjack simulator and card-counting trainer I'm building as a fullstack learning project. The idea is a realistic training environment where you play real blackjack hands while learning basic strategy and Hi-Lo card counting — running count first, true count later — with feedback after every round.

It starts as a simulator focused on learning, but it's designed to grow into something more game-like: progression levels, streaks, timed counting challenges, difficulty modes, practice drills and long-term learning stats. The goal is to keep the rigour of a trainer while making it engaging enough to feel like a game. It's planned as a web app first, with the door left open to a mobile or progressive web app later. (Not a gambling app — purely an educational trainer and portfolio project.)

It's in early development, and the focus right now is the backend: domain modelling, deck and hand logic, hand-value calculation, and the Hi-Lo counting system. A Java and Spring Boot backend owns the core blackjack rules, structured with a lightweight clean/hexagonal architecture so the domain stays pure — no dependency on Spring, HTTP, the database or the frontend. Use cases sit in an application layer above the domain, while REST controllers and persistence live in adapters at the edge. A React + TypeScript frontend and PostgreSQL persistence come once the domain foundation is solid.

This is the project where I'm carrying the architecture lessons from Millions — keeping the dependency rule pointing inward — onto a fresh fullstack codebase I own end to end.`,
    tags: ['Java', 'Spring Boot', 'Clean Architecture', 'Fullstack'],
    tech: [
      { name: 'Java', icon: 'devicon:java' },
      { name: 'Spring Boot', icon: 'devicon:spring' },
      { name: 'Maven', icon: 'devicon:maven' },
      { name: 'JUnit', icon: 'devicon:junit' },
      { name: 'React', icon: 'devicon:react' },
      { name: 'TypeScript', icon: 'devicon:typescript' },
      { name: 'PostgreSQL', icon: 'devicon:postgresql' },
    ],
    github: 'https://github.com/Mariusklepp/BlackjackCardCounterSimulator',
    accent: 'from-stone-700/35 to-emerald-900/40',
    category: 'Apps',
    status: 'In development',
    date: '2026-06-02',
  },
]
