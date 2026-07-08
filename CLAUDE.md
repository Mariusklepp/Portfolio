# Marius Klepp — Portfolio

Personal portfolio site. **Read this before changing UI, copy, or structure** — it
is the design direction every update should follow.

## Stack
React 19 + Vite + TypeScript + Tailwind v4. Animation via the `motion` package
(Framer Motion); smooth/inertia scroll via Lenis (`src/components/SmoothScroll.tsx`,
instance shared through `src/lib/scroll.ts`). Routing via `react-router-dom`.
**Dark-only** — the light/dark toggle was removed and `App.tsx` force-locks the
`.dark` class on `<html>`. The light-mode CSS vars in `index.css` are currently
unused (kept in case a light mode is wanted later).

## Goal
A site that blends **"Instagram"** (a disciplined guy who hits his goals — training,
a finished marathon, mountains) with **"GitHub"** (a serious project portfolio).
Personality is the wrapper, the projects are the proof. The emotional weight shifts
from **"wow"** at the top to **"respect"** at the bottom.

## Red thread
**Controlled intensity / self-challenge.** Bold but disciplined — "F1-team energy,
not chaos." When in doubt, choose the deliberate, composed option over the loud one.

## Visual direction
Bold, **editorial**, dark and atmospheric — big condensed all-caps type as a design
element, generous negative space (spirit of landonorris.com / F1 team sites). Kept
realistic to build: standard web + Framer Motion, **not heavy WebGL**. Design with
evocative direction (mood, cultural references) over pixel-level specs, to avoid
generic "AI-slop" UI.

The landing is a normal (smooth) **scroll made to feel like a journey/descent**, not
a pinned "film": the background darkens and a faint red "core" ember emerges as you
go down, a fixed **chapter rail** (right edge) tracks the stages and is clickable,
big ghost numbers parallax behind the headings, and `whileInView` reveals slide in
(left elements from `x:-50`, right from `x:+50`). There are two deliberate pinned
moments, sharing the same zoom-in/out edge language: the **horizontal gallery** in
Selected work, and the **Get to know me word scrub**. Rail clicks land pinned
sections at their settled, zoomed-in point (offset past the zoom-in phase) — the
zoom belongs to organic scrolling, not navigation.

## Typography
- **Barlow Condensed** (`.font-condensed`) — big all-caps editorial headings, the
  hero wordmark, and stat numbers.
- **Bricolage Grotesque** — body / UI default.
- **Fraunces** (`.font-display`, italic) — elegant counter-voice (taglines, pull-quotes).
- **JetBrains Mono** (`.font-mono-label`) — eyebrows, labels, mono detail lines.

## Accent color
Netflix red `#E50914` as `--accent` (dark). Single CSS var, swappable in seconds.
Note: full-strength red reads hot **inside cards** — prefer a dimmer red on card
surfaces/borders. Olive green is an alternative Marius likes if red is ever dropped.

## Hero
`src/components/Hero.tsx` — full-viewport and editorial. A sharp, off-center
**portrait** (`public/images/portrait.png`) bleeds off the right edge; big stacked
**SOFTWARE / DEVELOPER** condensed caps own the left (SOFTWARE solid, DEVELOPER
outlined); the name **"MARIUS"** runs vertically down the far-left margin as a
graphic — there is no big-name headline (the nav carries the name). Socials sit
centered on the photo; one "See my work" CTA bottom-left. Atmosphere comes from the
fixed backdrop, not a colored glow. Graceful text fallback if the photo fails.

## Landing structure
Editorial scroll in `src/pages/Home.tsx`; stages tracked by the chapter rail:
1. **Hero**
2. **Currently** — what's being built now (JARVIS, Deep Core) as cards.
3. **Selected work** — finished projects as a **horizontal scroll gallery**
   (`HorizontalGallery.tsx`): pins, zooms in/out on enter/exit, shows 2 featured
   cards + a "See all projects" panel.
4. **Get to know me** — the **short version of About** (title kept
   plain/professional by request — no clever naming, and not "About me" either,
   so it doesn't compete with the About page): one honest identity line ("I'm
   Marius — a software development student at NTNU in Trondheim…"), then a
   **word stack** of what the free time goes to (`pursuits` in
   `src/data/home.ts`, rendered by `src/components/Pursuits.tsx`): the pursuits
   as a left-aligned vertical stack of big condensed words (TRAINING / SLALOM &
   SNOWBOARD / GOLF — golf is new, recently picked up), no bullets or dots. This
   is the landing's second pinned moment: **scroll alone drives the live
   word** — the pin always enters on the first word (deterministic; no timer,
   no hover — the words are plain text, not controls). The live word takes the
   accent while the rest stay dim, and its detail (short accent rule + plain
   sentence, no em-dash "AI voice", + small mono fact) unfolds accordion-style
   BETWEEN it and the next word.
   Deliberately a glimpse, not a photo section — imagery/depth belong to the
   About page, and the stack scales if more pursuits are added. Under the
   stack sits "More about me →" as a quiet typographic line; at the scrub's
   exit beat an accent outline TRACES itself around it (SVG stroke draw),
   turning it into an unmistakable button → About. Deliberately NOT included:
   concerts/live
   music (the old "25+ concerts" stat was untrue), Blender, and investing —
   Marius trimmed the list to what he actually rates. Running facts: the
   **Copenhagen Marathon (May 2027) is a decided race**; an **Ironman
   (possibly 2027) is under consideration only** — present it as "considering",
   never as a set plan or target. No code stats here — those live in Work /
   project detail pages.
5. **Contact**

Deep pages (project detail + expanded About) and the standalone Contact route are kept.

## Inner pages (About / Projects / Project detail / Contact)
Still being brought in line with the homepage's editorial language. Shared primitives
live in `src/components/shared.tsx` (`PageHeading` / `SectionHeading` now render as
condensed caps). The dark base is unified via `--bg` = `#08080A`.

## Working notes
- Address the repo owner as **Marius**.
- Prefer evocative, mood-driven design changes over rigid spec-following.
- **Copy about Marius must be true.** Never invent stats or biography (a
  "25+ concerts" stat shipped before being caught as untrue). When a fact is
  needed and unknown, ask — or leave it out.
- `cv.pdf` lives in `public/` and is linked by the Download-CV buttons.
