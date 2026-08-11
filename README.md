# Arnav Mangaonkar — Portfolio

A production portfolio for Arnav Mangaonkar — AI / Robotics / Embedded Systems engineer — built with
Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion, and shadcn/ui. The site's only theme is an
**Arch Linux Rice Mode** aesthetic: a Waybar-style status bar, Hyprland-inspired window animation, and
a neofetch-style identity panel in the hero.

## Content sourcing

Per the brief, content is meant to come from GitHub and LinkedIn as primary sources of truth.
In practice:

- **GitHub** (`github.com/ArnavDotExe`) was read via the public GitHub REST API
  (`api.github.com/users/ArnavDotExe/repos`) — every project in
  [`src/data/projects.ts`](src/data/projects.ts) is a real, verified public repository, cross-checked
  against Arnav's resume for accurate descriptions and dates.
- **LinkedIn** (`linkedin.com/in/arnavmangaonkar`) could **not** be read. Every automated fetch —
  a direct HTTP fetch and a full browser navigation — was redirected to LinkedIn's authentication /
  sign-up wall. Experience, education, and skills instead come from Arnav's resume and details
  provided directly in the build brief.
- **Certifications**: [`src/data/certifications.ts`](src/data/certifications.ts) is intentionally an
  empty array — no certification data could be verified from any accessible source. The
  `Certifications` section (`src/components/sections/certifications.tsx`) renders nothing while the
  array is empty, and appears automatically the moment real entries are added.

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
(`src/app/page.tsx`) composed of the sections below, all wrapped in the Rice Mode chrome.

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
    layout.tsx          Root layout: fonts, metadata, JSON-LD, providers
    page.tsx             Section order for the single-page site
    globals.css           Design tokens and all Rice Mode CSS
    sitemap.ts / robots.ts
    opengraph-image.tsx / twitter-image.tsx   Dynamically generated OG/Twitter images (next/og)
  components/
    sections/            Hero, About, Experience, Projects, Skills, Certifications, Contact
    shared/               Footer, Reveal (Framer Motion wrapper), SectionHeading, brand icons
    arch/                 Everything Rice-Mode specific (see below)
    ui/                    shadcn/ui primitives
  data/                   Typed content model — profile, experience, projects, skills, certifications
  lib/
    arch.ts                Rice Mode logic: workspaces, memory reading, visitor counter
    utils.ts                shadcn's `cn()` helper
    og-image.tsx            Shared JSX for the OG/Twitter image generators
public/
  avatar-placeholder.png    Photo shown in the neofetch panel (see "Profile photo" below).
  placeholder.svg           Original bordered/silhouette placeholder graphic, kept as a fallback —
                             not referenced by any component.
```

## Arch Linux Rice Mode

Rice Mode is the site's only theme — `<body>` carries the `theme-arch` class permanently
(`src/app/layout.tsx`), and every Rice Mode style in `globals.css` is scoped under
`body.theme-arch ...`. There's no toggle or persisted preference; it just always renders this way.

| Element / function        | Where                                             |
| ---------------------------| --------------------------------------------------- |
| `#arch-bar`                  | `components/arch/arch-bar.tsx` — the top status bar / primary site nav |
| `#arch-ws`                    | `components/arch/arch-bar.tsx` — workspace nav, one per section        |
| `#arch-window-title`           | `components/arch/arch-bar.tsx`                              |
| `#arch-read`                     | `components/arch/arch-provider.tsx` — scroll-linked reading progress |
| `#arch-mem` / `#arch-mem-mod`     | `components/arch/arch-bar.tsx`                                |
| `#arch-vis` / `#arch-vis-mod`      | `components/arch/arch-bar.tsx`                                  |
| `#arch-clock`                        | `components/arch/arch-clock.tsx`                                  |
| `#arch-fetch`                          | `components/arch/arch-fetch-panel.tsx` — neofetch identity panel, hero |
| `loadArchVisitors()`                     | `lib/arch.ts` — hits a free anonymous hit-counter API (CountAPI); any failure (offline, blocked, rate-limited) is swallowed and simply renders `—` |

**Design decisions worth knowing:**

- **Windowed reading layout**: every section is wrapped once in `<ArchWindow>`, which renders a
  terminal-style titlebar and border — all styled under `body.theme-arch .arch-window` in
  `globals.css`.
- **Reading progress** is driven by a `requestAnimationFrame`-throttled `scroll` listener that writes
  directly to the `#arch-read` DOM node via a ref, bypassing React state on every frame for
  performance.
- **Memory module** reads the non-standard `performance.memory` API (Chromium only). On Firefox/Safari
  it falls back to `N/A` rather than erroring — see `readMemoryUsage()` in `lib/arch.ts`.
- **Workspaces** (`WORKSPACES` in `lib/arch.ts`) map 1:1 to the portfolio's sections. The same
  `activeSection` state (tracked with a single `IntersectionObserver`) drives both the workspace
  highlight and the window title.
- **The bar is the only nav** — GitHub, LinkedIn, email, and résumé download live in `#arch-bar` as
  compact icon links. On narrow viewports the window title and workspace text labels hide first
  (`≤720px`), then the memory/visitor/brand modules (`≤480px`); if it's still tight, the bar scrolls
  horizontally rather than breaking the page layout.

### Profile photo

`public/avatar-placeholder.png` is shown in the hero's neofetch panel
(`components/arch/arch-fetch-panel.tsx`). To swap it for a different photo, replace the file in
`public/` (a square image works best) — keep the filename, or update the `<Image src="...">` in
that component if you rename it. Next's static file server sets `Content-Type` from the file
extension, so make sure the extension matches the actual image format (a PNG saved as `.svg`
will render as a broken image).

## Known limitations / things to revisit

- **`npm audit` reports 3 high-severity advisories** in `postcss` and `sharp`, both transitive
  dependencies bundled inside `next@15.5.23`. They're fixed upstream only in the Next.js 16 line; since
  the brief specifically calls for Next.js 15, this repo stays pinned to the latest **15.x** release
  rather than jumping majors.
- **Certifications are empty** — see "Content sourcing" above.
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
