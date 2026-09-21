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
- `components/healthcare/HealthcareOperations.tsx` — "Everything behind better
  healthcare operations." section: left copy + 2×2 feature grid + CTAs, right
  EVOQ dashboard mock (sidebar, stat cards, appointments table) over
  `public/healthcare/operations-bg.jpg` (clinic photo, white gradient fade).
- `components/healthcare/HealthcareCareSettings.tsx` — "Designed around the way
  healthcare works." section: 3×2 card grid (clinics, dental, aesthetics,
  hospitals, diagnostics, multi-location) with photos from
  `public/healthcare/cards/*.jpg` (sourced from Unsplash), icon tiles, and a
  footer row ("Healthcare for what's next" / "Explore all solutions").
- `components/healthcare/HealthcareJourney.tsx` — white section (soft cyan/mint
  gradient blobs) "From first enquiry to ongoing care.": 6-step journey row
  (Capture → Re-engage) on a light-cyan dashed connector with alternating
  cyan→mint / blue→cyan gradient icon badges, CTAs, and a photo card
  (`public/healthcare/journey-consult.jpg`) with floating "Next Follow-up" /
  "Appointment Confirmed" cards (hidden below lg).
- `components/healthcare/HealthcareJourneyTogether.tsx` — white section "Bring
  every part of the healthcare journey together.": 3 cards (Healthcare CRM,
  Practice Management, Patient Engagement) each containing a mini app-window
  mockup (Patients list / Appointments day schedule / Create Campaign form +
  phone preview) clipped at the card bottom, linking to the in-page anchors,
  with an lg-only header-right photo + floating card, connector flourish down
  to an EVOQ-logo pill, and a 3-item benefits row.
- `components/healthcare/HealthcareEnvironment.tsx` — cool-mist `#F1F5F7` section
  "One healthcare environment. Different applications.": three white blocks
  (Patient relationships, Practice operations, Patient journey with a 5-app
  list) around a central circular "Healthcare" hub (cyan→mint gradient ring),
  dotted connectors (lg-only), plus a 3-item stats row.
- `components/healthcare/HealthcareModular.tsx` — light section "Start with
  what you need. Add as you grow." over the diluted signature-gradient
  environment: copy + "Explore EVOQ products" CTA, right side floating product
  tiles (Practice Management, Healthcare CRM, Billing, Booking Engine,
  Campaigns, Surveys, Loyalty, "Add more as you grow") over dotted connectors
  with a "Healthcare" base bar; absolute positioning on lg, wrapping flex grid
  below.
- `components/healthcare/HealthcareCTA.tsx` — final CTA banner (clean white,
  soft gradient blobs only): "Bring healthcare operations and patient
  relationships together." with "Get a demo" / "Talk to an expert" CTAs.
- `components/healthcare/HealthcareLogo.tsx` — mint icon-bg tile + cyan
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

Containers must match the live evoq.one grid: **outer div carries horizontal
padding (`px-5 sm:px-6 lg:px-6`), inner div carries `max-w-[1300px] mx-auto`**.
Never put the padding inside the max-width box — that shifts content
on ≥lg screens (this bug was fixed once already). Note: `Topbar` also has a
`constrained` variant (`px-5 sm:px-[40px] lg:px-[60px]`, `max-w-[1200px]`) used
by about/contact/implementation/integrations/why-evoq — leave that one as-is.

## Pending work / roadmap

- Body sections for the menu anchors: Healthcare CRM, Healthcare Practice
  Management, Patient Engagement (menu currently links to in-page anchors)
- Footer still lists legacy Resources/Customers links (awaiting decision)
- Git: work is committed locally on `master`; not yet pushed to a
  healthcare-specific branch/repo
