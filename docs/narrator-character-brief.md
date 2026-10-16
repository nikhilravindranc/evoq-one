# Narrator character brief (home page "One workspace" section)

One character, four poses. It sits in the centre of the scroll section and reacts
as old tools are replaced by EVOQ. Give this whole brief to ChatGPT / Midjourney.

## Look
- Soft 3D render (clay / Pixar-like), glossy, friendly, expressive. Same family as
  the EVOQ agent robots (white body, glossy blue visor, soft studio lighting).
- An EVOQ agent, not EVI. Rounded, approachable, no weapons or human skin.
- Accent colours: EVOQ indigo (about #4747E0) and a soft mint. Everything else
  white / light grey.
- Soft, even lighting. No hard shadows, no ground shadow, no background.

## Four poses (same character, same size, same framing)
1. **idle** - facing the camera, relaxed, small smile, hands low.
2. **reading** - leaning slightly toward the left, one hand up as if examining
   something, eyes narrowed (curious / slightly concerned).
3. **thinking** - hand near the chin or a small floating spinner/dots above the
   head, eyes looking up.
4. **happy** - arms open or a thumbs-up, big smile, a small sparkle is fine.

## Technical
- Upper body, centred, same position and scale in all four so they crossfade
  cleanly. Leave 8-10% empty margin on every side.
- Transparent background, PNG or WebP, 1600 x 1600 px, no text, no baked shadow.
- File names (drop into `public/team/`):
  `narrator-idle.png`, `narrator-reading.png`, `narrator-thinking.png`,
  `narrator-happy.png`

## Prompt starter
"A friendly white 3D robot assistant character, soft clay render, glossy blue
visor face, indigo and mint accents, upper body, centred, transparent
background, soft studio lighting, no shadow. Pose: <idle | reading |
thinking | happy>. Keep the identical character, proportions and camera
framing across all four poses."

Generate pose 1 first, then ask for the other three "of the same character,
same framing" so they stay consistent.
