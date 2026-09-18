<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# EVOQ Healthcare — Project Handover

## What this is

A Next.js microsite for **EVOQ Healthcare**, built on top of the EVOQ main-site
codebase (imported from `github.com/nikhilravindranc/evoq-one`). The main EVOQ
site (home, why-evoq, about, implementation, integrations, contact) is intact;
the healthcare microsite lives at the `/healthcare` route.

- Stack: Next.js 16 (App Router), React 19, Tailwind CSS 4, TypeScript
- Fonts: Figtree (`--font-display`), DM Sans (`--font-sans`) via next/font

## Commands

- `npm run dev` — dev server. Uses `scripts/dev.js`, a wrapper that resolves the
  port from `--port`/`-p` CLI args, then the `PORT` env var, then 3000, and
  forwards it to `next dev`. Keep this wrapper; the Kimi Work preview launcher
  depends on it.
- `npm run build` / `npm start` / `npm run lint` — standard Next.js scripts.

## Healthcare microsite structure

- `app/healthcare/page.tsx` — route, metadata, renders `HealthcarePage`
- `components/healthcare/HealthcarePage.tsx` — Topbar (light, non-constrained)
  + `HealthcareNav` + `HealthcareHero` + shared `Footer`
- `components/healthcare/HealthcareNav.tsx` — microsite sub-navigation bar:
  `HealthcareLogo`, menu (Overview [active], Healthcare CRM, Healthcare
  Practice Management, Patient Engagement), "Talk to an expert" button.
  Menu hrefs are anchors (`#overview`, `#healthcare-crm`,
  `#practice-management`, `#patient-engagement`) — body sections not built yet.
- `components/healthcare/HealthcareHero.tsx` — hero: eyebrow, H1, subcopy,
  "Get a demo" / "Talk to an expert" CTAs, 6 floating capability cards
  (`.hc-card`, `hcFloat` keyframes), 4-segment strip, tagline.
- `components/healthcare/HealthcareLogo.tsx` — mint rounded square + teal
  heart-pulse mark + "Healthcare" wordmark.
- `public/healthcare/hero-bg.jpg` — hero background photo (optimized from the
  original PNG).
- `references/` — design mockup (`healthcare-mockup.png`) and original
  background photo. Consult the mockup before changing healthcare visuals.

## Header (main site)

`components/hero/Topbar.tsx` — nav: Products dropdown, Why EVOQ?, **Solutions
dropdown** (contains Healthcare → `/healthcare`; `SOLUTIONS` array). The old
Implementation / Customers / Resources header links were removed per request
(they still exist in `Footer`).

## Healthcare palette

| Token | Hex |
|---|---|
| Deep navy (headlines) | `#102A43` |
| Deep teal | `#123B3A` |
| Healthcare teal (accents, active states) | `#0F766E` |
| EVOQ blue (primary CTA) | `#1777F0` |
| Aqua | `#2CB6A5` |
| Mint (icon tiles) | `#DDF5F0` |
| Blue mist | `#EEF6FF` |
| Healthcare pale (hero bg) | `#F4FBFA` |

Recommended hero gradient direction: deep navy → healthcare teal → EVOQ blue.

## Layout convention (important)

Containers must match the main site grid: **outer div carries horizontal
padding (`px-5 sm:px-8 lg:px-20`), inner div carries `max-w-[1168px] mx-auto`**.
Never put the 80px padding inside the max-width box — that shifts content 80px
on ≥lg screens (this bug was fixed once already).

## Pending work / roadmap

- Body sections for the menu anchors: Healthcare CRM, Healthcare Practice
  Management, Patient Engagement (menu currently links to in-page anchors)
- Footer still lists legacy Resources/Customers links (awaiting decision)
- Git: work is committed locally on `master`; not yet pushed to a
  healthcare-specific branch/repo
