# Design — Arnav Mangaonkar Portfolio ("Arnav's Bag")

A locked design system for this app. Read this file before touching visual
styling on any page — it supersedes the old "Arch Linux Rice Mode" system
(now removed) documented previously in CLAUDE.md.

**2026 revision**: the site is now a single route (`/`) — a full-screen
**Bag interface**: an intro/title screen followed by a Pokémon-inventory-style
app (player card, tabbed item list, a swappable content panel). There is no
scrolling homepage, no top nav bar, no separate "photographer mode" route or
toggle, and no audio/music system — see "What was cut" below for why. The
palette, type, and component-chrome primitives below (PixelPanel,
pixel-corners, pixel-btn, type badges, Press Start 2P chrome font) are
unchanged and still govern every surface.

## Genre
playful (bespoke) — a GBA-era Pokémon menu-screen aesthetic in service of a
professional engineering portfolio. Structure, palette, and type were
designed from first principles; no catalog theme fit a retro-RPG world.

## Bag macrostructure
`/` is a two-state client app (`src/components/bag/bag-app.tsx`):

1. **Intro screen** (`intro-screen.tsx`) — dark title card: trainer sprite,
   name, domain tags, current role, an "open bag" button, press-ENTER hint.
   No persistent nav, no audio.
2. **Bag shell** — header (title + clock) above a three-pane body:
   `PlayerCard` (trainer + an original companion sprite, static profile
   fields, no fabricated RPG stats), `BagNav` (the tabbed item list, `▶`
   cursor, keyboard-navigable), `ContentPanel` (swaps in one of
   `src/components/bag/panels/*.tsx` per `src/lib/bag-items.ts`'s
   `BAG_ITEMS` config, including a **Photography** item that shows the
   photo grid inline — see below). Each item carries an
   Indigo-League-inspired accent `oklch()` that drives `--bag-accent` on
   selection (200ms transition) — see `bag-items.ts` for the full palette.
   Below 860px the body collapses to a stack: player card stays visible,
   the item list and content panel swap via a back button (same action as
   `Escape`).

Every panel reads the same `src/data/*.ts` files the old scroll sections
did — only the presentation is denser/inventory-shaped now.

## What was cut, and why
- **`/photography` route + `ModeToggle`** — the separate route existed to
  serve a dev/photographer "mode" switch. That whole toggle-driven concept
  is gone: photos are now a first-class Bag item (`CameraPanel`, backed by
  the same `src/data/photography.ts`), so the standalone route, its
  `PolaroidGrid` component, and the toggle button were all deleted rather
  than left as unlinked dead pages.
- **Scroll `Footer`** — only ever rendered on `/photography`; deleted
  alongside it. The Bag shell's one-line credit (`bag-shell-credit`) is the
  only "footer" now.
- **`Reveal` / `SectionHeading`** — scroll-triggered reveal wrapper and
  section-heading component, both orphaned once the scrolling homepage
  sections were replaced by Bag panels (a fixed-height panel with its own
  internal scroll isn't a good fit for a viewport-scroll-based
  `ScrollTrigger` anyway).
- **`lib/chiptune.ts` / `SoundController`** — the synthesized Web Audio
  chiptune loop + SFX were removed outright at the user's request. There is
  no audio anywhere in the app now.

## Trainer avatar — real photo, not pixel art
`PixelAvatar` (`src/components/pixel/pixel-avatar.tsx`) renders Arnav's own
photo (`public/avatar-placeholder.png` — the filename predates this and is
kept for now) directly, cropped into the same `.pixel-frame`/`.pixel-corners`
card chrome every other framed sprite uses, rather than a hand-drawn pixel
grid. That's fine — it's his own photo. An earlier pass restyled the old
hand-authored pixel grid to visually match this photo (hair, glasses,
beard); that grid was replaced outright once the actual photo became the
simpler, more direct option.

## Companion sprite — copyright boundary, currently a placeholder
The brief asked for a "partner" creature and, later, specifically to
reproduce official Pokémon designs (Lucario, then Dragonite — including a
direct request to vectorize official Dragonite artwork) from reference
images. All of that is Nintendo/Game Freak's copyrighted character art, so
none of it was copied or traced — consistent with the original brief's own
instruction not to redraw official sprites. An original hand-drawn
"friendly dragon" sprite was built as the compliant alternative, then
swapped again at Arnav's request for a plain Pokédex-style "unrevealed
entry" placeholder (silhouette + `?`, `src/components/bag/companion-sprite.tsx`)
— not shaped after any specific creature, meant to be swapped for real
artwork later. The player card's "partner" field stays text-only
("Dragonite") — a naming choice, not a claim about the placeholder's origin.

## Theme
- `--background` (overworld) `oklch(19% 0.03 258)` — deep navy
- `--pixel-cream` (panel/"screen") `oklch(93% 0.025 90)` — warm cream
- `--pixel-forest` `oklch(28% 0.05 155)` — deep forest green (borders, ink accents)
- `--amber` / `--pixel-grass` (primary accent) `oklch(62% 0.13 142)` — grass green
- `--pixel-yellow` `oklch(78% 0.13 90)` — highlight / current-role marker
- `--pixel-red` `oklch(55% 0.15 25)` — alert / FIRE type
- `--pixel-brown` `oklch(38% 0.05 55)` — earthy borders, panel frame
- `--pixel-ink` `oklch(24% 0.03 55)` — text on cream panels

The `--amber` CSS variable name was kept from the previous theme on purpose
— every existing `text-amber` / `bg-amber/10` / `hover:border-amber`
utility class across the codebase kept working unchanged; only its value
changed (amber → grass green).

## Typography
- Display / body: Geist Sans (unchanged) — every heading and all body copy.
  Readability was never traded away for theme purity.
- Pixel chrome: Press Start 2P (`--font-pixel`), weight 400 only — used
  exclusively for short UI text: nav labels, eyebrows, buttons, type
  badges, panel titlebars, stat labels. Never full sentences.
- Mono: Geist Mono — kept for `<code>` / inline tag styling.

## Spacing
Unchanged Tailwind spacing scale. `--radius-*` tokens zeroed globally
(`0px`) — no rounded corners anywhere in the pixel system; corner
treatment comes from the `.pixel-corners` clip-path notch utility instead.

## Motion
- Easings: existing `power3.out` / `power2.out` GSAP eases, kept (intro
  screen entrance only now — panel content no longer scroll-reveals).
- Panel entrance: `pixel-panel-in` (scale + fade, 0.4s).
- Button press: hard offset-shadow collapse (`.pixel-btn`), `steps(2)` easing.
- Reduced-motion: global guard on every `animate-*` utility
  (`@media (prefers-reduced-motion: reduce) { [class*="animate-"] { animation: none !important; } }`)
  plus explicit fallbacks on `.pixel-btn` and `.pixel-panel`.

## Microinteractions stance
- Silent success (email-copy checkmark), no celebratory toasts except the
  opt-in Konami easter egg.
- Bag nav's active item gets a blinking `▶` cursor (`step-end` timing) and
  a per-item accent border/background (`--item-accent`, 200ms transition).
- Trainer + companion sprites have an offset idle bob; clicking the trainer
  cycles two-line NPC dialogue.
- Keyboard-first: `↑`/`↓` move the Bag cursor, `Enter` selects, `Escape`
  backs out to the item list on mobile. Silent — no sound effects anywhere.

## CTA voice
- Primary: solid grass-green fill, `.pixel-btn` hard shadow, lowercase copy
  ("open bag").
- Secondary: cream/card fill, same `.pixel-btn` treatment.
- Tertiary/link: no border, accent-on-hover only.

## Component remap (Rice Mode → pixel-scroll → Bag)
| Old (removed) | New |
|---|---|
| `ArchProvider` / `useArchMode` | `BagProvider` / `useBag` |
| `ArchBar` / `PixelNav` (top bars) | `BagNav` (in-shell item list) |
| `ArchWindow` | `PixelPanel` (still used, now inside `ContentPanel`) |
| `ArchFetchPanel` / `TrainerProfile` (in Hero/About) | `PlayerCard` (persistent) + `TrainerProfilePanel` (About item) |
| Scroll `Footer`, `/photography`, `ModeToggle` | deleted — Photography is a Bag item; see "What was cut" |
| `arch-tag` / `.arch-*` CSS | `pixel-tag` / `.pixel-*` CSS |
| `lib/arch.ts` | `lib/pixel-types.ts` (types) + `lib/bag-items.ts` (Bag nav config) |
| `src/components/sections/*.tsx` (scroll sections) | `src/components/bag/panels/*.tsx` (inventory panels) |

Kept as direct reuse: `PixelAvatar` (original CSS/SVG trainer sprite, now
also sized down for `PlayerCard`), `TypeBadge` + `lib/pixel-types.ts`
(Pokémon-type language mapped 1:1 onto `ProjectCategory`), `PixelClock`
(now lives in the Bag shell header instead of the old top bar).

New, no prior equivalent: `CompanionSprite` (original dragon-inspired
creature — see "Companion sprite — copyright boundary" above).

## Easter eggs
Konami code → toast ("a shiny developer appeared!"); console.log ASCII
hello; custom pixel `not-found.tsx` ("no route here, just tall grass");
click-the-avatar NPC dialogue. None block or gate real content.

## What pages MUST share
- The `--amber`/grass-green accent and its restrained placement.
- Geist Sans for all readable text; Press Start 2P for UI chrome only.
- Zero border-radius; `.pixel-corners` notch or hard square edges only.
- The `PixelPanel` scoping technique (CSS-variable re-scope, not per-file
  color-class rewrites) for any new light-panel content.

## What pages MAY differ on
- Panel titlebar copy / iconography per Bag item.
- Whether a panel uses `.pixel-corners` (notched) or a plain hard border
  (project cards, deliberately, for a denser data-list feel).
