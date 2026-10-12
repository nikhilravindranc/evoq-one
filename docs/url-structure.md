# URL structure

| Kind | Route root | Example |
|---|---|---|
| Product pages | `/products/<product>` | `/products/billing`, `/products/billing/features`, `/products/ai` |
| Industry solution pages | `/solutions/<industry>` | `/solutions/healthcare`, `/solutions/manufacturing` |
| Company / general pages | `/<page>` (unchanged) | `/about`, `/contact`, `/why-evoq`, `/implementation`, `/integrations` |

Rules:

1. The route folder lives under `app/products/<product>/` or `app/solutions/<industry>/`. Sub-pages nest inside it
   (`app/products/billing/pricing/page.tsx`, `app/solutions/healthcare/crm/page.tsx`).
2. Folder names are lowercase kebab-case, no `evoq-` prefix: `crm`, `serviceops`, `desk`, `projects`, `inventory`, `sync`,
   `hrms`, `billing`, `ai`.
3. **Static assets stay where they are.** Images in `public/<name>/...` keep their URLs (`/billing/images/logo.png`).
   Only page routes move. Never rewrite `src="/billing/..."`, `img:` or `photo:` paths.
4. Every internal link to a moved page uses the new path (`href`, `Link`, nav arrays, footer, CTAs, `usePathname` checks).
5. Add an exact-path permanent redirect in `next.config.ts` for every old URL (`/billing` → `/products/billing`, etc.).
   Do not use wildcards such as `/billing/:path*`: they would also catch assets in `public/`.
6. Update the Topbar (`components/hero/Topbar.tsx`: `PRODUCTS` / `SOLUTIONS`) and `components/sections/Footer.tsx`.
7. After moving folders, stop the dev server, run `rm -rf .next`, then `npm run build`.

## Prompt for colleagues

Copy everything inside the block into Claude Code (or any coding assistant) in your own project.

```
This is a Next.js App Router project. Our site now uses one URL structure and I need my pages to follow it.

Structure
- Product pages live under /products/<product>  (e.g. /products/billing, /products/billing/features)
- Industry solution pages live under /solutions/<industry>  (e.g. /solutions/healthcare, /solutions/manufacturing)
- Company pages (/about, /contact, /why-evoq, /implementation, /integrations) stay at the root.
- Folder names: lowercase kebab-case, without an "evoq-" prefix (crm, serviceops, desk, projects, inventory, sync, hrms, ai ...).

My pages to migrate: <LIST YOUR TOP-LEVEL ROUTES HERE, e.g. /crm, /desk, /crm/features>

Do this, in order:
1. Inventory: list every page.tsx under app/ that belongs to my product(s)/solution(s) and its current URL.
2. Move each route folder with `git mv` into app/products/<product>/ or app/solutions/<industry>/, keeping sub-pages nested.
   Stop the dev server first (Windows locks the folder otherwise).
3. Update every internal link to the new paths: <a href>, next/link, nav/menu arrays, footer, CTAs, breadcrumbs,
   canonical/metadata URLs, and any usePathname() or startsWith() checks. Search for the old paths across app/, components/,
   lib/ and scripts/.
4. DO NOT change static asset URLs. Files in public/ (images, logos, videos) keep their URLs, so leave src="/crm/...",
   img: "/crm/..." and similar paths untouched. Match only page routes, i.e. a path inside quotes that ends right after
   the route name or continues with a known sub-page, and check every replacement.
5. In next.config.ts add permanent (301) redirects from each OLD URL to its NEW URL. Use exact paths only, with no wildcards
   like /crm/:path*, because public/ assets share those prefixes and a wildcard redirect would break them.
6. Update the header menu (components/hero/Topbar.tsx PRODUCTS / SOLUTIONS) and components/sections/Footer.tsx to point to
   the new URLs.
7. Run `rm -rf .next && npm run build`. Fix every error. Then check in the browser that each old URL redirects to the
   new one, each new URL loads, and images on those pages still load.
8. Report: a table of old URL -> new URL, the files you changed, and anything you were unsure about. Do not commit or
   push until I confirm.
```
