# Agent and EVI characters update, 2026-11-13

The agents and EVI now use the new character sheets. Images were replaced in place, under the same file names, so
no component needed to change for this step. To bring the live site (evoq.one) in line, copy the image files below
and check the pages and sections listed.

## Which character is which

| Where it is used | Name on the site | New character (from the sheets) | File |
|---|---|---|---|
| Growth, follow up agent | Ava | woman with a brown bun and gold hoops | `public/characters/ava.webp` |
| Operations, dispatch agent | Kai | man in a purple cap with a backpack | `public/characters/kai.webp` |
| People, onboarding agent | Sana | woman with long wavy hair and a headset | `public/characters/sana.webp` |
| Finance, collections agent | Rohan | grey haired man with glasses and a beard | `public/characters/rohan.webp` |
| Platform, sync agent | Leo | young man with curly hair, hand on chin | `public/characters/leo.webp` |
| EVI, the assistant | EVI | brunette with a bun, freckles and gold hoops | see below |

Names and copy are unchanged. Only the pictures changed.

## Files replaced

All new files are 480 x 480 tiles with a soft background unless noted.

- `public/characters/ava.webp`, `kai.webp`, `sana.webp`, `rohan.webp`, `leo.webp`
- EVI tiles: `public/characters/evi.webp`, `evi-mirror.webp`, `evi-working.webp`, `evi-done.webp` (one character, four crops)
- EVI faces, transparent 256 x 256: `public/characters/evi-face-idle.png`, `evi-face-mirror.png`, `evi-face-tablet.png`, `evi-face-done.png`
- EVI cut outs, transparent 530 x 436: `public/characters/evi-cut-idle.png`, `evi-cut-mirror.png`, `evi-cut-tablet.png`, `evi-cut-done.png`
- Kai for the Bookings pages: `public/characters/kai-face.png` (256 x 256), `public/characters/kai-cut.png` (426 x 475)
- EVI avatar used by several pages: `public/evoq-ai/evi-avatar.webp`
- EVI in the ServiceOps ecosystem: `public/serviceops/agents/evi-ai-assistant.jpg` (360 x 360)
- Sync v1 microsite, EVI only: `public/sync-v1/characters/evi-a.webp`, `evi-b.webp`, `evi-c.webp`, `evi-d.webp`, `evi-head.webp`, `evi-tile.webp`, `evi-tile-b.webp`
- Already added earlier and used by the AI agent context section: `public/characters/evi-new.webp` (transparent, 692 x 1000)

The EVI crops all come from one character image, so the poses (working, done, mirror) are different framings of the
same picture, not different gestures. The old working pose had a tablet.

## Pages and sections

| Page | Section | What changed |
|---|---|---|
| `/` (home) | Hero, overview | Agent cards and the board's agent chips (Ava, Kai, Sana, Rohan) |
| `/` | Hero, Growth tab | EVI and Ava |
| `/` | Hero, Operations tab | EVI and Kai |
| `/` | Hero, People tab | EVI and Sana |
| `/` | Hero, Finance tab | EVI and Rohan |
| `/` | Hero, Platform tab | EVI and Leo |
| `/` | Hero, AI tab | EVI, and the EVI avatar chip in the tab row |
| `/` | AI agent context section | EVI (already the new character) |
| `/` | Solutions section, EVI panel in each tab | EVI |
| `/` | Platform and AI sequence sections | EVI avatar and Ava |
| `/products` | AI modes section, platform section | EVI tile and avatar |
| `/products/ai` | Hero chat mock, "EVI guides the work" section, agent examples | EVI and Rohan |
| `/products/bookings/appointments` | Home, AI part | EVI face |
| `/products/bookings/spaces` | AI assistants part | EVI face and Kai face |
| `/products/bookings/spaces/features` | AI assistants and agents | EVI and Kai faces on the cards and the assistant list |
| `/products/serviceops-v1` | "Optimize the day" button and the agents ecosystem | EVI |
| `/products/sync-v1` and `/features`, `/pricing` | "AI companion and Sync agent" section, hero ask bar, workflow steps | EVI poses, head and tiles |
| `/solutions/healthcare/patient-relationships` and `/practice-management` | AI sections | EVI avatar |
| `/hero-versions` (internal, noindex) | All earlier hero versions | They now show the new characters too |

Checked in the browser: home (every hero tab), `/products/ai`, `/products/bookings/spaces/features`,
`/products/serviceops-v1`, `/products/sync-v1`. Not looked at one by one: `/products`,
`/products/bookings/appointments`, `/products/bookings/spaces`, and the two healthcare AI sections. They use the same
files, so they should match.

## Not changed on purpose

- People shown as customers or colleagues (Dana, Marcus, Mia, Sam): `dana.webp`, `marcus.webp`, `mia.webp`, `sam.webp`
  and the stock photo for the hero manager.
- The ServiceOps role agents in `public/serviceops/agents/` (dispatch, collections, field, intake and so on). They are
  already the same cast as the new sheets, only EVI's picture was replaced.
- The Sync agent (`public/sync-v1/characters/sync-*.webp`). The new sheets have no matching character.
- Old static copies under `public/site/` and marketing images under `public/team/`.

## Applying it to evoq.one

1. Copy the files listed under "Files replaced" over the ones on the live site, keeping the same paths and names.
2. If the live site caches images, clear the cache or bump the image URLs, because the names did not change.
3. Open the pages in the table and check the faces in each section, mainly the small round avatars.
4. The home hero, solutions and AI agent context sections also changed in code earlier today. Those commits are
   `f491a6b`, `c8794e7` and `63091ee` in this repo.
