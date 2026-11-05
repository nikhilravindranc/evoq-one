# EVOQ Bookings microsites: handoff note (2026-11-05)

Paste this (or point Claude at this file) at the start of a new chat on another account. Also read `AGENTS.md` and `docs/handoff-2026-10-16.md` (older, general site context) and `docs/url-structure.md`.

## Project
- Path: `D:\EVOQ\EV-Home-Page-New\evoq-home` (this folder has its own git repo; the parent `D:\EVOQ\EV-Home-Page-New` is a different repo whose index looks odd, leave it alone unless asked).
- Repo: `github.com/nikhilravindranc/evoq-one`, branch **master**. Last pushed commit: `a7e5133`. At the time of writing nothing else is uncommitted except this note.
- Stack: Next.js 16 (App Router, Turbopack), React 19, Tailwind 4, TypeScript, framer-motion. **This Next.js has breaking changes**: read `node_modules/next/dist/docs/` before using unfamiliar APIs.
- Checks to run after every change: `npx tsc --noEmit` and `npx eslint components/bookings app lib` (both must be silent).
- Dev server: preview config "Next.js Dev" in `D:\EVOQ\EV-Home-Page-New\.claude\launch.json` (cwd `evoq-home`, port 3000).

## Working rules from the user
- **Commit and push only when the user says "Commit and push".** Commit trailer: `Co-Authored-By: Claude <model> <noreply@anthropic.com>` using the attribution line the harness gives. Run git inside `evoq-home`.
- Verify UI changes in the browser pane (desktop about 1006px pane width; emulate 1440, 1920 and 375 with `resize_window`, then reset with preset `desktop`). Check text wrapping at wide and narrow widths every time without being asked; the user calls awkward mid-phrase wraps "basic".
- Do not rebuild a page the user said to only "optimize". Keep their content text unchanged when asked to "recreate without changing content". They paste exact content briefs; use them verbatim.
- Copy voice (user rules): no exaggeration or invented proof or metrics; no AI-ish stock phrases ("Unlock the power", "Transform the way you work", "Supercharge", "next level", "The future of", "Revolutionize"); no em or en dashes or spaced hyphens in copy; avoid the words "one" and "juggle" as stock refrains; competitor test (a line that works for any SaaS brand must be rewritten); never add "Illustrative example" captions to visuals.
- Positioning facts: buyer is any company decision maker; conversion is a demo on request (no free trial, no customers or numbers to cite); EVOQ CTRL is the single login; AI approval modes are configurable (auto, ask, manual, plan, accept edits) so never say "nothing happens without approval" as an absolute; industries keep the user's order (Healthcare first).
- Never claim unconfirmed product capabilities. The October note also says **"No placeholder pages"** (see Open decisions: a Pricing placeholder exists).
- Sample data inside product visuals is illustrative; keep it plausible and modest.

## Routes
| URL | Source | Notes |
|---|---|---|
| `/products/bookings` | `components/bookings/BookingsPage.tsx` | main page |
| `/products/bookings/spaces` (+ `/features`, `/pricing`) | `components/bookings/space/*` | clay palette, dark photo hero |
| `/products/bookings/appointments` | `components/bookings/appointments/ApptHome.tsx` | moss palette |
| `/products/bookings/appointments/features` | `ApptFeatures.tsx` | 11 sections from the user's brief |
| `/products/bookings/appointments/pricing` | `ApptPricing.tsx` | **placeholder** |
Old URLs `/products/bookings/space-and-room-reservations*`, `/appointment-scheduling` and `/space-booking*` 301 to the new ones (`next.config.ts`). Titles and descriptions live in `lib/seo.tsx` (`PAGES`); sitemap in `app/sitemap.ts` (pricing is deliberately not listed).

## How the pages are built
- **Shared bar** `components/bookings/BookingsNav.tsx` (Healthcare style): on the main page it shows EVOQ Bookings plus Overview, Spaces, Appointments, Hospitality and Facilities (the last two "Soon", not clickable). On Spaces and Appointments it shows that product's mark, Overview, Features, Pricing and a "Bookings" switcher dropdown on the right. `tone="dark"` is used on the Spaces photo header. There is no second sub-bar any more. Props: `product` (`overview|spaces|appointments`), `page` (`home|features|pricing`).
- **Main page** sections: hero with 4 showcase tiles, intro, `BookingCategories` (4 always-visible cards, one CTA each; `LIVE_PAGES` maps live pages, the others open the enquiry modal), `BookingSteps` ("How booking works", Calendly pattern: inset panel with 4 booking-type cards, the active one expands and shows 3 steps plus a mock on a gradient; pinned scroll through `useScrollSteps` from `theme.tsx` on screens above 980px, tap on smaller; panel grows on screens above 1600px), For organizations, Who is it for, platform suite, enquiry band.
- **Spaces** (`SpaceShell`, `SpaceHome`, `SpaceFeatures`, `SpacePricing`): clay `#B4583A`, deep `#2B1912`, sand `#D9B98C`, paper `#FAF6F0`; "Request a demo" modal; assistants EVI and Kai are circular avatars (no lavender background).
- **Appointments** (`ApptShell` + `ApptHome`): moss `#4E6F58`, hover `#3E5C47`, deep `#1E2D22`, paper bands `#F6F5EF`, tint `#EDF2EA` (`palette.ts`: `BAND`, `VIS`). Get started form modal (`StartButton`), sticky bar after scrolling (Overview, Features, Pricing), closing band is an inset gradient panel like the Bookings enquiry band.
  - Home sections: hero (photo mosaic with a phone mock in the corner), booking walkthrough (interactive booking page, one handwritten Caveat tip at a time with measured arrows, autoplays once when in view, any click or key takes over, mobile shows a sticky bar instead of side tips), management (schedule card on a green shape), availability (rules card on a sand shape), lifecycle (3 + 2 grid), industries (photos with captions), EVI (no character, chat card on a sand shape), integrations (EVOQ app logos via `ProductBadge`), why (photo plus plain list), get started (no CTA), closing.
  - Style language the user prefers here: plain lists with hairlines instead of feature boxes, real photography, soft colored shapes behind composed visuals (their reference images), green only as an accent, no dark section backgrounds.
- Reveal animation uses `HsMotion` (`data-rv`, `.hs-rv`). Tracking via `lib/track` (`track`, `trackCta`).

## Images
Use only high resolution local photos: `public/healthcare/pm/*` (doctor, nurse, stock-*), `public/healthcare/stock/*`, `public/industries/v2/*`. Do **not** use `public/healthcare/pm/practice-*.jpg` (about 390px wide, looks blurred). Unsplash search is blocked from curl; reuse known IDs through `U()` in `components/bookings/theme.tsx`. Characters (EVI, Kai, etc.) are in `public/characters` (cutouts `*-cut-*.png`, circular faces `*-face-*.png`).

## Technical gotchas learned
- **Renaming or adding route folders on Windows while the dev server runs** causes `git mv` "Permission denied" and, afterwards, stale 404s. Stop the dev server, rename, restart. If routes 404 though the files exist, restart the server (fixed the last 404 report).
- Screenshots in the browser pane often lag by one frame: take a second one. The injected style `.hs-rv{transition:none!important;opacity:1!important;transform:none!important}` forces reveals visible for checks. Emulating 1440 or 1920 can drop to 1 frame per second; reset to `desktop` to compare.
- ESLint react-hooks rules in this repo flag refs read during render and setState directly in effects: use `data-*` lookups inside effects and `requestAnimationFrame` callbacks.
- When regex-editing CSS inside template strings, `${PRIMARY}` contains braces and breaks `[^}]*` patterns (this once left a stray `;white-space:nowrap}` that silently dropped following rules). Prefer exact string replacements.
- Hydration warning in dev for `SpaceTryIt` (a `<style>` with `PM_CSS` from `PlanMap.tsx`); React recovers, not yet investigated.

## Open decisions and next steps
1. **Appointments Pricing**: the user will share the content. Until then `/appointments/pricing` is a placeholder page I wrote (its sentence "Pricing details are being prepared" is not user copy). The October rule says no placeholder pages; ask whether to keep it, hide the menu item, or remove the page.
2. **Hospitality and Activities & Facility microsites** are not built. Plan: same shell, bar, hero, walkthrough and Features/Pricing pattern as Appointments; planned colors honey `#9A6B1F` and slate `#4A5E73` (not confirmed by the user). To add a page: route folders, `LIVE_PAGES` in `BookingCategories.tsx`, `MENU` in `BookingsNav.tsx` and `FAMILY`/`PRODUCTS`, `lib/seo.tsx`, `app/sitemap.ts`, and the Soon items become links.
3. Unconfirmed product claims to verify with the user: floor plan view, multi-location, check-in grace period, reminders and reschedule links in confirmations, deposits, waitlist "where implemented", group and recurring appointments, reports. Most are phrased "where supported" from the user's own briefs.
4. Integrations show EVOQ app logos only; third-party logos (calendars, email, payments) were not added because supported services are unconfirmed.
5. "How booking works" step wording and sample cards for Stays and Facilities are my wording, for the user to review.
6. The pinned "How booking works" section scrolls about 2.5 screens; the user may ask to shorten it.
7. Appointments Features page is text-led; the user may want more visuals later.

## Suggested first message for the new account
"Read `docs/handoff-2026-11-05-bookings.md`, `AGENTS.md` and `docs/handoff-2026-10-16.md` in `D:\EVOQ\EV-Home-Page-New\evoq-home`. Then run `git log -5` and `git status`, start the 'Next.js Dev' preview, and wait for my next instruction. Do not commit until I say 'Commit and push'."
