# Arnav Mangaonkar — Portfolio

A production portfolio for Arnav Mangaonkar — AI / Robotics / Embedded Systems engineer — built with
Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion, and shadcn/ui. Ships with two full themes:
a **Professional Portfolio Mode** (matte black / charcoal / amber) and a **Arch Linux Rice Mode**
(Waybar-style status bar, Hyprland-inspired window animation, neofetch identity panel).

## Content sourcing

Per the brief, content is meant to come from GitHub and LinkedIn as primary sources of truth.
In practice:

- **GitHub** (`github.com/ArnavDotExe`) was read via the public GitHub REST API
  (`api.github.com/users/ArnavDotExe/repos`) — every project in
  [`src/data/projects.ts`](src/data/projects.ts) is a real, verified public repository, cross-checked
  against Arnav's resume for accurate descriptions and dates.
- **LinkedIn** (`linkedin.com/in/arnavmangaonkar`) could **not** be read. Every automated fetch —
  a direct HTTP fetch and a full browser navigation — was redirected to LinkedIn's authentication /
  sign-up wall. LinkedIn requires a logged-in session to view profile data, which isn't something an
  automated agent can (or should) bypass. Experience, education, and skills instead come from Arnav's
  resume and details provided directly in the build brief.
- **Certifications**: [`src/data/certifications.ts`](src/data/certifications.ts) is intentionally an
  empty array — no certification data could be verified from any accessible source. The
  `Certifications` section (`src/components/sections/certifications.tsx`) renders nothing while the
  array is empty, and appears automatically the moment real entries are added. **Add verified
  certifications there to turn the section on.**

If Arnav wants LinkedIn-sourced details (certifications, endorsements, exact employment dates) added,
the fastest path is exporting the LinkedIn profile data (Settings → "Get a copy of your data") or
pasting the relevant sections in, rather than re-attempting automated scraping.

## Tech stack

- **Framework**: Next.js 15.5 (App Router, React 19)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v4 (CSS-first `@theme`, no `tailwind.config.js`)
- **Components**: shadcn/ui (`components.json`, style `base-nova`, built on `@base-ui/react`)
- **Animation**: Framer Motion
- **Icons**: lucide-react (+ two hand-rolled brand marks — GitHub/LinkedIn aren't in lucide's core set)
- **Fonts**: Geist Sans / Geist Mono via `next/font/google` (self-hosted at build time, no runtime
  Google Fonts request)

## Getting started

Requires **Node.js 20+**.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The homepage is a single scrolling page
(`src/app/page.tsx`) composed of the sections below; Rice Mode is a full theme swap on top of the same
content, not a separate route.

### Scripts

| Command         | Description                                    |
| ---------------- | ----------------------------------------------- |
| `npm run dev`     | Start the dev server (Turbopack)                 |
| `npm run build`   | Production build + type-check + lint             |
| `npm run start`   | Serve the production build                       |
| `npm run lint`    | ESLint (flat config, `next/core-web-vitals` + `next/typescript`) |

### Environment variables

| Variable                | Default                          | Purpose                                      |
| ------------------------ | --------------------------------- | --------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`   | `https://arnavmangaonkar.dev`     | Canonical URL used in metadata, OG tags, JSON-LD, sitemap, and robots.txt. **Set this to the real deployed domain before going live.** |

## Project structure

```
src/
  app/
    layout.tsx          Root layout: fonts, metadata, JSON-LD, pre-paint theme script, providers
    page.tsx             Section order for the single-page site
    globals.css           Design tokens (Professional + Arch) and all Rice Mode CSS
    sitemap.ts / robots.ts
    opengraph-image.tsx / twitter-image.tsx   Dynamically generated OG/Twitter images (next/og)
  components/
    sections/            Hero, About, Experience, Projects, Skills, Certifications, Contact
    shared/               Navbar, Footer, Reveal (Framer Motion wrapper), SectionHeading, brand icons
    arch/                 Everything Rice-Mode specific (see below)
    ui/                    shadcn/ui primitives
  data/                   Typed content model — profile, experience, projects, skills, certifications
  lib/
    arch.ts                Core Rice Mode logic — framework-agnostic on purpose (see below)
    utils.ts                shadcn's `cn()` helper
    og-image.tsx            Shared JSX for the OG/Twitter image generators
```

## Arch Linux Rice Mode

Implemented exactly to the supplied element-ID / function-name spec, so it's easy to audit:

| Spec ID / function     | Where                                             |
| ------------------------ | --------------------------------------------------- |
| `#arch-toggle`            | `components/arch/arch-toggle-button.tsx` (in the navbar) |
| `#arch-power`              | `components/arch/arch-bar.tsx`                        |
| `body.theme-arch`          | Applied by `lib/arch.ts#setArch`, scoped in `globals.css` |
| `#arch-bar`                  | `components/arch/arch-bar.tsx`                          |
| `#arch-ws`                    | `components/arch/arch-bar.tsx` (workspace nav)             |
| `#arch-window-title`           | `components/arch/arch-bar.tsx`                              |
| `#arch-read`                     | `components/arch/arch-provider.tsx`                          |
| `#arch-mem` / `#arch-mem-mod`     | `components/arch/arch-bar.tsx`                                |
| `#arch-vis` / `#arch-vis-mod`      | `components/arch/arch-bar.tsx`                                  |
| `#arch-clock`                        | `components/arch/arch-clock.tsx`                                  |
| `#arch-fetch`                          | `components/arch/arch-fetch-panel.tsx`                              |
| `enableArchToggle()`                     | `lib/arch.ts` — wires up every `[data-arch-toggle]`/`[data-arch-power]` element via event delegation, plus a `Ctrl+Alt+R` keybind |
| `setArch(on)`                              | `lib/arch.ts` — single source of truth: toggles the class, writes `localStorage`, dispatches `archchange` |
| `loadArchVisitors()`                         | `lib/arch.ts` — hits a free anonymous hit-counter API (CountAPI); any failure (offline, blocked, rate-limited) is swallowed and simply renders `—` |

**Design decisions worth knowing:**

- `lib/arch.ts` has **no React or DOM-framework dependency** — it's plain, testable functions that
  read/write `document`/`window`/`localStorage` directly, per the spec's "Required JS functions" list.
  `ArchProvider` (a React context) is a thin consumer of it, not a reimplementation.
- **No flash on reload**: an inline script is the very first thing in `<body>` (see `PRE_PAINT_SCRIPT`
  in `layout.tsx`) and synchronously applies `body.theme-arch` from `localStorage` before React
  hydrates or the browser paints. `<body>` carries `suppressHydrationWarning` because this is an
  intentional, expected client/server markup difference — the same pattern used by libraries like
  `next-themes`.
- **Windowed reading layout**: rather than conditionally rendering different markup per theme (which
  risks hydration bugs), every section is wrapped once in `<ArchWindow>`. Outside Rice Mode it's a
  no-op `<div>` — all of its visual styling lives under `body.theme-arch .arch-window` in
  `globals.css`, so the exact same DOM renders two different ways depending purely on CSS.
- **Reading progress** is driven by a `requestAnimationFrame`-throttled `scroll` listener that writes
  directly to the `#arch-read` DOM node via a ref, bypassing React state on every frame for
  performance.
- **Memory module** reads the non-standard `performance.memory` API (Chromium only). On Firefox/Safari
  it falls back to `N/A` rather than erroring — see `readMemoryUsage()` in `lib/arch.ts`.
- **Workspaces** (`WORKSPACES` in `lib/arch.ts`) map 1:1 to the portfolio's sections. The same
  `activeSection` state (tracked with a single `IntersectionObserver`) drives both the Rice Mode
  workspace bar and the professional navbar's active-link highlight — one source of truth, two
  renderings.
- Toggle it yourself: the amber "rice mode" button in the navbar, the footer's "psst — try rice mode"
  link, or `Ctrl+Alt+R` anywhere on the page.

## Known limitations / things to revisit

- **`npm audit` reports 3 high-severity advisories** in `postcss` and `sharp`, both transitive
  dependencies bundled inside `next@15.5.23`. They're fixed upstream only in the Next.js 16 line; since
  the brief specifically calls for Next.js 15, this repo stays pinned to the latest **15.x** release
  rather than jumping majors. Re-run `npm audit` after upgrading to Next 16 if that tradeoff changes.
- **Certifications are empty** — see "Content sourcing" above.
- **Employment status**: the resume lists the current role (Embedded Developer Consultant, Vektor3d
  Systems LLP) as ending Jan 2026; it's presented here as ongoing ("Present") based on Arnav's direct
  statement that this is his current role. Update `src/data/experience.ts` if that's changed.
- **OG/Twitter images** are generated dynamically at request time via `next/og` (edge runtime), not
  static files — there's no `public/og-image.png` to keep in sync.

## Deployment

### Vercel (recommended)

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Set the `NEXT_PUBLIC_SITE_URL` environment variable to the production domain.
4. Deploy — zero additional config needed (Next.js is auto-detected).

### Any Node host

```bash
npm install
npm run build
npm run start   # serves on port 3000 by default
```

The app is fully server-renderable and has no database or other external service dependency (the
visitor counter degrades gracefully if its endpoint is unreachable).
