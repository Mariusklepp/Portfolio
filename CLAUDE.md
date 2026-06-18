# Marius Klepp — Portfolio

Personal portfolio site. **Read this before changing UI, copy, or structure** — it
is the design direction every update should follow.

## Stack
React 19 + Vite + TypeScript + Tailwind v4. Animation via the `motion` package
(Framer Motion). Dark/light handled with a `.dark` class on `<html>` + CSS custom
properties. Routing via `react-router-dom`.

## Goal
A site that blends **"Instagram"** (a disciplined guy who hits his goals — training,
marathon → Ironman, rap concerts) with **"GitHub"** (a serious project portfolio).
Personality is the wrapper, the projects are the proof. The emotional weight shifts
from **"wow"** at the top to **"respect"** at the bottom.

## Red thread
**Controlled intensity / self-challenge.** Bold but disciplined — "F1-team energy,
not chaos." When in doubt, choose the deliberate, composed option over the loud one.

## Visual direction
Cinematic, scroll-driven scenes (spirit of landonorris.com / F1 team sites /
Igloo Inc), but kept realistic to build: standard web + Framer Motion, **not heavy
WebGL**. **Dark-first** — build and polish one color mode first; a refined light mode
is decided later.

Design with evocative direction (mood, cultural references) over pixel-level specs,
to avoid generic "AI-slop" UI.

## Accent color
Trialing Netflix red `#E50914` as `--accent` (dark mode). It is a single CSS var,
so it's swappable in seconds — try-and-see is fine. Known note: full-strength red
reads too hot **inside cards**; prefer a *dimmer* red on card surfaces/borders rather
than full strength (currently deprioritized). Olive green is an alternative Marius
likes if red is ever dropped.

## Hero
`src/components/Hero.tsx` — kinetic wordmark "Marius Klepp" (Bricolage Grotesque,
uppercase) with a red ember glow, scroll-driven scale/parallax/fade + mouse 3D tilt.
A portrait photo is a planned **optional** layer to add later (progressive
enhancement / graceful fallback) — no good photo exists yet, so the wordmark stands
alone for now. Tagline copy is placeholder.

## Landing structure (7 scenes)
The landing is one continuous "film" (see `src/components/motion.tsx` `SceneSequence`):

1. **Hero**
2. **Manifest** — one-line positioning
3. **Currently** — what's being built right now (e.g. JARVIS, Deep Core)
4. **Work** — featured projects → link into deep project pages
5. **Beyond the code** — training / concerts
6. **By the numbers** — *person* stats only (marathon, Ironman, concerts).
   **No code stats here** — those belong in Work / project detail pages.
7. **Contact**

Keep the deep pages (project detail + expanded About) and the standalone Contact
route.

## Working notes
- Address the repo owner as **Marius**.
- Prefer evocative, mood-driven design changes over rigid spec-following.
