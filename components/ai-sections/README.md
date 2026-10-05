# EVOQ product microsites: "AI in <product>" section template

One reusable section, one config per product. It shows the same story on every
product page: **EVI answers, an AI agent prepares the work, a person approves.**

## Files

| File | Purpose |
|---|---|
| `ProductAISection.tsx` | The component. Self-contained (React 18+ only; no Tailwind, no animation library, no project CSS). |
| `product-configs.ts` | Ready-made configs: CRM, ServiceOps, Desk, Projects, Billing, Inventory, HRMS. |
| `README.md` | This file. |

Copy the two `.tsx`/`.ts` files into the microsite codebase (any React app; Next.js, Vite, CRA).

## Use it

```tsx
import { ProductAISection } from "./ProductAISection";
import { crmAI } from "./product-configs";

<ProductAISection config={crmAI} />
```

Override anything per page without editing the config file:

```tsx
<ProductAISection config={{ ...crmAI, primaryCta: { label: "Book a Demo", href: "/book-a-demo" } }} />
```

## Assets the component expects

| Default path | Used for | Override |
|---|---|---|
| `/ai/ai-logo-icon.png` | EVI logo in the assistant panel | `config.assets.eviLogo` |
| `window.logo` in each config (e.g. `/evoq-ai/apps/crm.png`) | Product logo in the mock window | `config.window.logo` |

Both are optional: the section renders without them.

## Config reference (`ProductAIConfig`)

| Field | Notes |
|---|---|
| `id` | Anchor id, e.g. `ai-in-crm`. Link a small "AI built in" chip or a sub-nav item to `#ai-in-crm`. |
| `eyebrow` | `AI in EVOQ <Product>` |
| `title` | `<Outcome>, with EVI and AI agents.` Keep it under ~55 characters. |
| `lead` | Three short sentences: *Find… Prepare… Keep…* |
| `body` | Fixed formula: EVI helps find X and prepares the next step; agents handle defined tasks such as Y, then return the result for review. |
| `primaryCta` / `secondaryCta` | Primary = the page's existing demo CTA. Secondary = `/ai`. |
| `visualSide` | `"left"` or `"right"`. **Alternate it between neighbouring sections**, and match it to the page's rhythm. |
| `accent` | Product colour for the mock window's button and avatars. |
| `window` | The mock product screen. `layout: "board"` (columns of cards) or `"list"` (rows). Flag the 2–3 items EVI will talk about with `flag: true`. |
| `scenes` | 2–3 example conversations. The panel steps through them while the section is on screen. |

### Writing a `scene`

```ts
{
  question: "Which invoices are overdue?",          // what the user asks EVI
  answer: "**7 invoices** are overdue, worth **$96,350**.", // **bold** supported
  agent: "Collections agent",
  steps: [                                           // exactly 3 steps
    { text: "7 invoices reviewed", done: true },
    { text: "7 reminders drafted", done: true },
    { text: "2 need your approval", done: false },   // always end on a human approval
  ],
  placeholder: "Ask EVI about an invoice…",
}
```

## Content rules (keep every product page consistent)

1. **Same promise everywhere:** EVI finds and prepares, agents do defined tasks, a person approves.
2. **Always end on approval.** The last step is a pending item that needs the user.
3. **Modest verbs:** reviews, drafts, prepares, matches. Never "automatically decides" or "guarantees".
4. **No professional advice** in the demo text (medical, legal, financial).
5. **Use realistic, internally consistent numbers** between the window, the answer and the agent steps (if the window shows 3 flagged items, the answer should say 3).
6. **All names, amounts and dates in `product-configs.ts` are placeholders.** Replace with product-accurate examples before release.

## Where it goes on a product page

Place it **after the stats/benefits band and before the feature deep-dives** (or directly after the automation/workflow feature). It should be the one section with the soft lavender background, so it stands out from the alternating white/grey feature blocks.

Also add:
- a small **"AI built in"** chip under the hero headline, linking to `#<id>`;
- an **"AI"** item in the product sub-nav.

## Responsive behaviour

- 1024px and up: pipeline/list window plus the docked assistant panel, scaled to fit the column.
- Below 1024px: copy first, then only the assistant panel (full width).

## Accessibility and motion

- The example conversation advances every 6.5 s only while the section is on screen and not hovered.
- `prefers-reduced-motion` disables the fade and pulse animations.
- The mock window is decorative; the real information is in the headline, lead and body.

## Adding a new product

1. Copy one config block in `product-configs.ts`, rename it (e.g. `syncAI`).
2. Pick `board` or `list`, and write 2 scenes using the rules above.
3. Set `visualSide` opposite to the section above it.
4. Render `<ProductAISection config={syncAI} />` in the page.
