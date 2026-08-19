# Arnav Mangaonkar — Portfolio

A production portfolio for Arnav Mangaonkar — AI / Robotics / Embedded Systems engineer — built with
Next.js 15, TypeScript, Tailwind CSS v4, GSAP, and shadcn/ui. The visual theme throughout is an
**Arch Linux Rice Mode** aesthetic: a Waybar-style status bar, Hyprland-inspired window animation, and
a neofetch-style identity panel in the hero.

The site has two modes, switched via the big toggle fixed to the right edge of the screen:

- **Developer mode** (`/`) — the portfolio: hero, about, experience, projects, skills, contact.
- **Photographer mode** (`/photography`) — a polaroid-style album of Arnav's photography, linking
  out to Instagram.

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
- **Animation**: GSAP (`@gsap/react`, ScrollTrigger)
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
    layout.tsx          Root layout: fonts, metadata, JSON-LD, ArchBar + ModeToggle + Footer
    page.tsx             Section order for the developer-mode page (/)
    photography/
      page.tsx             Photographer-mode page (/photography) — polaroid album
    globals.css           Design tokens and all Rice Mode CSS
    sitemap.ts / robots.ts
    opengraph-image.tsx / twitter-image.tsx   Dynamically generated OG/Twitter images (next/og)
  components/
    sections/            Hero, About, Experience, Projects, Skills, Certifications, Contact
    shared/               Footer, Reveal (GSAP ScrollTrigger wrapper), ModeToggle, SectionHeading, brand icons
    photography/           PolaroidGrid — the /photography page's photo grid
    arch/                 Everything Rice-Mode specific (see below)
    ui/                    shadcn/ui primitives
  data/                   Typed content model — profile, experience, projects, skills, certifications, photography
  lib/
    arch.ts                Rice Mode logic: workspaces, memory reading, visitor counter
    base-path.ts            withBasePath() — needed for GitHub Pages' URL prefix, see Deployment
    gsap.ts                 GSAP + ScrollTrigger registration, imported wherever animation is needed
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

### Photographer mode (`/photography`)

The polaroid album is entirely data-driven from [`src/data/photography.ts`](src/data/photography.ts):

```ts
{ src: "/photography/photo-1.svg", alt: "...", caption: "mumbai" }
```

**To add or swap a photo**: drop the image file in `public/photography/` and add (or edit) one
entry in that array — `caption` is optional and renders handwritten-style on the card. Rotation,
grid position, and the hover/reveal animation are all automatic; there's nothing else to touch,
and the array isn't capped at four, add as many as you want. As before — make sure the file
extension matches the actual image format (Next's static file server sets `Content-Type` from the
extension, so a PNG saved as `.svg` renders broken).

Every polaroid links to the Instagram profile (`profile.links.instagram`) rather than an
individual post — same reasoning as the avatar note above, plus it means the link never goes
stale as new posts get added.

### The mode toggle

`components/shared/mode-toggle.tsx` is rendered once in the root layout, so it's present on every
route. It's a plain `<button role="switch">` — no persisted state, it just reflects and navigates
based on the current pathname (`usePathname()`), and `components/arch/arch-bar.tsx` self-hides via
the same check on `/photography` (its workspace links are dev-page-specific). If you add more
modes later, this is the pattern to follow: pathname-driven, not client state.

## Known limitations / things to revisit

- **`npm audit` reports 3 high-severity advisories** in `postcss` and `sharp`, both transitive
  dependencies bundled inside `next@15.5.23`. They're fixed upstream only in the Next.js 16 line; since
  the brief specifically calls for Next.js 15, this repo stays pinned to the latest **15.x** release
  rather than jumping majors.
- **Certifications are empty** — see "Content sourcing" above.
- **OG/Twitter images** are generated via `next/og` and prerendered once at build time (`export const
  dynamic = "force-static"`) — there's no `public/og-image.png` to keep in sync, and no per-request
  cost either way.

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

### GitHub Pages

GitHub Pages only serves static files — no server, so no Next.js Image Optimization API and no
dynamic route handlers. This repo already accounts for that: `next.config.ts` switches to
`output: "export"` (plus unoptimized images) when `STATIC_EXPORT=true` is set, which is exactly
what the `npm run build:pages` script and the included GitHub Actions workflow
(`.github/workflows/deploy-pages.yml`) do. The default `npm run build` (Vercel, or any Node host)
is untouched by any of this.

The repo is named `arnavdotexe.github.io` — GitHub's special "user site" naming, which serves at
the account root (`https://arnavdotexe.github.io`) with no path prefix, rather than the usual
project-site pattern (`https://<user>.github.io/<repo>/`). That's why `NEXT_PUBLIC_BASE_PATH`
isn't set anywhere here; see `next.config.ts`'s comment if renaming away from that convention later.

**One-time setup** (already scaffolded — you just need to flip the switch in GitHub's UI):

1. Push this repo to GitHub (already done if you're reading this from the repo).
2. On GitHub: **Settings → Pages → Source → GitHub Actions**. That's the only manual step —
   everything else happens in the workflow.
3. Push to `master` (or run the workflow manually from the **Actions** tab → "Deploy to GitHub
   Pages" → **Run workflow**). The first run creates the `github-pages` environment automatically.
4. Once it finishes, the site is live at `https://arnavdotexe.github.io` — check the **Actions**
   tab for the exact URL and any errors.

**To test the static export locally before pushing:**

```bash
npm run build:pages
npx serve out
```

No path-prefix gotcha to work around here since the site serves from the root either way.

**Switching to a custom domain later**: point its DNS at GitHub Pages, add a `public/CNAME` file
containing just the domain, and set that domain in the same **Settings → Pages** screen —
`NEXT_PUBLIC_BASE_PATH` stays unset either way, since a custom domain also serves from its root.
