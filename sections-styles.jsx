/* global */

/* =====================================================================
   EVOQ — page section styles
   Brand-only colors: Deep / Mid / Interactive / Primary / Bright / Tint / Soft
   Neutrals: Charcoal / Muted / Body Text / Subtle / Border / Background / White
   ===================================================================== */

window.evoqSectionStyles = `
.evoq-page { font-family: var(--sans); color: var(--charcoal); background: #FFFFFF; }

/* Shared eyebrow pill */
.evoq-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 14px 6px 11px;
  background: var(--soft);
  border-radius: 999px;
  font-family: var(--sans);
  font-size: 12px; font-weight: 600; letter-spacing: .04em;
  color: var(--primary);
  text-transform: uppercase;
}
.evoq-eyebrow .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--primary); }
.evoq-eyebrow.dark {
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.22);
  backdrop-filter: blur(10px);
  color: var(--soft);
}
.evoq-eyebrow.dark .dot { background: var(--tint); }

.evoq-h2 {
  font-family: var(--display); font-weight: 700;
  font-size: 48px; line-height: 1.06; letter-spacing: -0.03em;
  color: var(--charcoal); margin: 0;
}
.evoq-h2.dark { color: #FFFFFF; }
.evoq-h2 .accent { color: var(--primary); }
.evoq-h2.dark .accent { color: var(--tint); }
.evoq-sub {
  font-family: var(--sans);
  font-size: 16px; line-height: 1.6;
  color: var(--body-text); margin: 16px 0 0;
  max-width: 56ch;
}
.evoq-sub.dark { color: rgba(255,255,255,0.78); }

.evoq-section-head { margin-bottom: 64px; }
.evoq-section-head .evoq-eyebrow { margin-bottom: 20px; }

/* ============================================================
   SECTION 1 — One Unified Platform
   ============================================================ */
.s-platform {
  background: #FFFFFF;
  padding: 120px 80px;
}
.s-platform-inner { width: 1168px; margin: 0 auto; }
.platform-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

/* ---- Product cards: subtle color blob + minimal decorative motif ----
   - Title area stays on the neutral Background.
   - One large soft circle of the product surface color sits in a bottom corner.
   - A small geometric mark adds visual character per product.
*/
.product-card {
  background: var(--background);
  border-radius: 22px;
  padding: 24px;
  display: flex; flex-direction: column; gap: 20px;
  border: 1px solid var(--border);
  min-height: 460px;
  overflow: hidden;
  position: relative;
  transition: border-color .2s ease, transform .2s ease;
}
/* Layer 1 — soft colored blob (solid color, low opacity, no gradient) */
.product-card::before {
  content: "";
  position: absolute;
  width: 360px; height: 360px;
  border-radius: 50%;
  background: var(--blob-color, var(--soft));
  opacity: var(--blob-opacity, 0.55);
  top: var(--blob-top, auto);
  right: var(--blob-right, auto);
  bottom: var(--blob-bottom, -120px);
  left: var(--blob-left, -120px);
  filter: blur(8px);
  pointer-events: none;
}
.product-card > * { position: relative; z-index: 2; }

/* --- CRM — blue blob, bottom-right --- */
.product-card.v-crm {
  --blob-color: #C9DAF5;
  --blob-opacity: 0.85;
  --blob-bottom: -120px;
  --blob-right: -120px;
  --blob-top: auto; --blob-left: auto;
}

/* --- SYNC — mint blob, bottom-left --- */
.product-card.v-sync {
  --blob-color: #C2EAE3;
  --blob-opacity: 0.85;
  --blob-bottom: -120px;
  --blob-left: -120px;
  --blob-top: auto; --blob-right: auto;
}

/* --- PROJECTS — lavender blob, bottom-right --- */
.product-card.v-projects {
  --blob-color: #DFD8F4;
  --blob-opacity: 0.9;
  --blob-bottom: -120px;
  --blob-right: -120px;
  --blob-top: auto; --blob-left: auto;
}

/* --- SERVICEOPS — warm cream blob, bottom-left --- */
.product-card.v-serviceops {
  --blob-color: #F3E6BB;
  --blob-opacity: 0.85;
  --blob-bottom: -120px;
  --blob-left: -120px;
  --blob-top: auto; --blob-right: auto;
}
.product-card:hover {
  border-color: var(--tint);
  transform: translateY(-2px);
}
.product-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 5px 11px 5px 8px;
  background: var(--soft);
  border-radius: 999px;
  font-family: var(--sans); font-size: 11px; font-weight: 700;
  letter-spacing: .12em; text-transform: uppercase;
  color: var(--primary);
  width: max-content;
}
.product-eyebrow .swatch {
  width: 14px; height: 14px; border-radius: 5px;
  background: var(--primary);
  display: inline-flex; align-items: center; justify-content: center;
}
.product-title {
  font-family: var(--display); font-weight: 700;
  font-size: 22px; line-height: 1.18; letter-spacing: -0.018em;
  color: var(--charcoal);
  margin: 0;
}

.pc-mock {
  background: #FFFFFF;
  border-radius: 14px;
  border: 1px solid var(--border);
  padding: 14px;
  flex: 1;
  display: flex; flex-direction: column; gap: 6px;
  font-size: 12px;
}
.pc-mock-hd {
  display: flex; justify-content: space-between;
  font-size: 10px; font-weight: 700; letter-spacing: .12em;
  text-transform: uppercase; color: var(--muted);
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 2px;
}
.pc-row {
  display: flex; align-items: center; justify-content: space-between;
  gap: 8px;
  padding: 7px 0;
}
.pc-row + .pc-row { border-top: 1px solid var(--border); }
.pc-row .name { font-weight: 600; color: var(--charcoal); font-size: 12px; }
.pc-row .sub  { font-size: 10.5px; color: var(--muted); margin-top: 1px; }
.pc-row .lead { display: flex; flex-direction: column; }
.pc-row .dot-l { width: 6px; height: 6px; border-radius: 50%; background: var(--primary); flex-shrink: 0; margin-right: 2px; }

/* Brand-only pills — solid, outline, ghost; no off-system colors */
.pill {
  display: inline-flex; align-items: center;
  padding: 3px 9px; border-radius: 999px;
  font-size: 10.5px; font-weight: 700;
  letter-spacing: .02em;
}
.pill.solid    { background: var(--primary); color: #FFFFFF; }
.pill.tint     { background: var(--soft); color: var(--primary); }
.pill.outline  { background: transparent; color: var(--primary); box-shadow: inset 0 0 0 1px var(--tint); }
.pill.ghost    { background: var(--background); color: var(--muted); box-shadow: inset 0 0 0 1px var(--border); }
.pill.charcoal { background: var(--charcoal); color: #FFFFFF; }

/* SYNC connector mock */
.sync-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 6px 4px;
  font-size: 12px;
}
.sync-row .label { display: flex; align-items: center; gap: 8px; font-weight: 600; color: var(--charcoal); }
.sync-row .label .swatch { width: 8px; height: 8px; border-radius: 50%; }
.sync-link {
  align-self: center;
  font-size: 10px; font-weight: 700; letter-spacing: .08em;
  text-transform: uppercase;
  color: var(--primary);
  background: var(--soft);
  border-radius: 999px;
  padding: 3px 10px;
  display: inline-flex; gap: 6px; align-items: center;
  margin: 2px auto;
}

/* Projects checklist */
.proj-hd {
  display: flex; justify-content: space-between;
  font-size: 10px; font-weight: 700; letter-spacing: .12em;
  text-transform: uppercase;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 2px;
}
.proj-hd .left { color: var(--muted); }
.proj-hd .right { color: var(--primary); }
.proj-row {
  display: flex; align-items: center; gap: 10px;
  padding: 7px 0;
  font-size: 12px;
}
.proj-row + .proj-row { border-top: 1px solid var(--border); }
.proj-row .task { flex: 1; color: var(--charcoal); font-weight: 500; }
.proj-row .task.done { text-decoration: line-through; color: var(--subtle); }
.proj-row .status { font-size: 10.5px; font-weight: 600; color: var(--muted); }

/* ServiceOps tickets */
.ticket { padding: 8px 0; border-top: 1px solid var(--border); }
.ticket:first-child { border-top: 0; }
.ticket-hd {
  display: flex; justify-content: space-between; align-items: center;
  font-size: 10px; color: var(--muted); font-weight: 700;
  letter-spacing: .08em; text-transform: uppercase;
}
.ticket-title { font-size: 12px; font-weight: 600; color: var(--charcoal); margin-top: 3px; }
.ticket-sub   { font-size: 10.5px; color: var(--muted); margin-top: 1px; }

/* ============================================================
   SECTION 2 — AI Assist (DARK MOMENT)
   ============================================================ */
.s-ai {
  position: relative;
  background:
    radial-gradient(120% 80% at 30% 0%,   #8484FF 0%,  #5C5CFF 30%, #3333CC 65%, #000099 100%),
    radial-gradient(60%  50% at 80% 70%,  rgba(189,189,255,0.35) 0%, rgba(189,189,255,0) 60%);
  background-blend-mode: screen, normal;
  padding: 120px 80px;
  overflow: hidden;
  isolation: isolate;
  color: #fff;
}
.s-ai .grain {
  position: absolute; inset: 0;
  pointer-events: none;
  mix-blend-mode: overlay;
  opacity: .35;
  ${window.grainCss}
}
.s-ai .vignette {
  position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(120% 80% at 50% 110%, rgba(0,0,153,0.75) 0%, rgba(0,0,153,0) 55%);
}
.s-ai-inner {
  position: relative; z-index: 2;
  width: 1168px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 80px; align-items: center;
}
.ai-copy .evoq-h2 { margin-top: 20px; }
.ai-copy .lead {
  font-family: var(--sans); font-size: 17px; font-weight: 500;
  line-height: 1.55; color: rgba(255,255,255,0.92);
  margin: 24px 0 0; max-width: 44ch;
}
.ai-copy p.body {
  font-family: var(--sans); font-size: 14.5px; line-height: 1.7;
  color: rgba(255,255,255,0.7);
  margin: 18px 0 0; max-width: 44ch;
}

.ai-card {
  background: #FFFFFF;
  border-radius: 24px;
  padding: 18px;
  box-shadow:
    0 40px 70px -30px rgba(0, 0, 153, 0.5),
    inset 0 0 0 1px rgba(255,255,255,0.4);
  display: flex; flex-direction: column; gap: 10px;
}
.ai-input {
  background: var(--soft);
  border-radius: 16px;
  padding: 14px 14px 14px 16px;
  display: flex; align-items: flex-start; justify-content: space-between;
  gap: 10px;
  min-height: 92px;
}
.ai-input .placeholder { color: var(--subtle); font-size: 14px; flex: 1; }
.ai-input .micro {
  margin-top: 14px;
  display: inline-flex; gap: 14px;
  font-size: 13px; color: var(--muted);
}
.ai-send {
  width: 34px; height: 34px; border-radius: 50%;
  background: var(--interactive); color: #fff;
  border: 0; cursor: pointer; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 6px 16px -6px rgba(0,0,153,0.5);
}
.ai-suggestion {
  padding: 12px 16px;
  border-radius: 12px;
  background: #FFFFFF;
  border: 1px solid var(--border);
  font-size: 13.5px; color: var(--body-text);
  cursor: pointer;
  display: flex; align-items: center; gap: 10px;
  transition: background .15s ease, border-color .15s ease, color .15s ease;
}
.ai-suggestion:hover { background: var(--soft); border-color: var(--tint); color: var(--charcoal); }
.ai-suggestion .arr { color: var(--subtle); margin-left: auto; }
.ai-cta-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 6px 4px 0;
}
.ai-cta-row .agent {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 11.5px; color: var(--muted); font-weight: 500;
}
.ai-cta-row .agent .av {
  width: 24px; height: 24px; border-radius: 50%;
  background: linear-gradient(135deg, var(--bright), var(--primary));
}
.ai-cta-plan {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 8px 8px 8px 16px;
  background: var(--charcoal); color: #fff;
  border-radius: 999px;
  font-family: var(--sans); font-size: 12.5px; font-weight: 600;
  border: 0; cursor: pointer;
}
.ai-cta-plan .ic {
  width: 22px; height: 22px; border-radius: 50%;
  background: rgba(255,255,255,0.16);
  display: inline-flex; align-items: center; justify-content: center;
}

/* ============================================================
   SECTION 3 — Engineered for Modern Teams
   ============================================================ */
.s-teams { background: #FFFFFF; padding: 120px 80px; }
.s-teams-inner { width: 1168px; margin: 0 auto; }
.s-teams .evoq-section-head { text-align: center; max-width: 720px; margin-left: auto; margin-right: auto; }
.s-teams .evoq-section-head .evoq-eyebrow { margin: 0 auto 20px; display: inline-flex; }
.s-teams .evoq-section-head .evoq-sub { margin: 16px auto 0; }

.teams-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 16px;
}
.team-card {
  background: #FFFFFF;
  border: 1px solid var(--border);
  border-radius: 22px;
  padding: 28px;
  display: flex; flex-direction: column; gap: 16px;
  position: relative;
  overflow: hidden;
  transition: border-color .2s ease, transform .2s ease;
}
/* Pattern layer — varied per card, masked to corner */
.team-card::before {
  content: "";
  position: absolute; inset: 0;
  pointer-events: none;
  background-image: var(--pattern);
  background-size: var(--pattern-size, 8px 8px);
  background-repeat: repeat;
  background-position: var(--pattern-pos, 0 0);
  mask-image: radial-gradient(var(--mask-size, 55% 55%) at var(--mask-pos, 100% 0%), #000 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.1) 80%, rgba(0,0,0,0) 100%);
  -webkit-mask-image: radial-gradient(var(--mask-size, 55% 55%) at var(--mask-pos, 100% 0%), #000 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.1) 80%, rgba(0,0,0,0) 100%);
  z-index: 1;
}
/* Color blob — subtle product-surface color in the same corner as the rings */
.team-card::after {
  content: "";
  position: absolute;
  width: 240px; height: 240px;
  border-radius: 50%;
  background: var(--blob-color, transparent);
  opacity: var(--blob-opacity, 0.55);
  top: var(--blob-top, auto);
  right: var(--blob-right, auto);
  bottom: var(--blob-bottom, auto);
  left: var(--blob-left, auto);
  filter: blur(10px);
  pointer-events: none;
  z-index: 0;
}
.team-card > * { position: relative; z-index: 2; }
.team-card:hover { border-color: var(--tint); transform: translateY(-2px); }

/* Pattern 1 — concentric rings from top-left corner (CRM blue) */
.team-card.p-rings-tl {
  --pattern: repeating-radial-gradient(circle at 0% 0%, var(--p-color) 0 1px, transparent 1px 22px);
  --pattern-size: auto;
  --mask-pos: 0% 0%;
  --mask-size: 50% 55%;
  --p-color: rgba(99, 142, 230, 0.32);
  --blob-color: #C9DAF5;
  --blob-opacity: 0.55;
  --blob-top: -130px; --blob-left: -130px;
}

/* Pattern 2 — concentric rings from top-right corner (Sync mint) */
.team-card.p-rings-tr {
  --pattern: repeating-radial-gradient(circle at 100% 0%, var(--p-color) 0 1px, transparent 1px 20px);
  --pattern-size: auto;
  --mask-pos: 100% 0%;
  --mask-size: 50% 55%;
  --p-color: rgba(76, 184, 168, 0.34);
  --blob-color: #C2EAE3;
  --blob-opacity: 0.55;
  --blob-top: -130px; --blob-right: -130px;
}

/* Pattern 3 — concentric rings from bottom-right corner (Projects lavender) */
.team-card.p-rings-br {
  --pattern: repeating-radial-gradient(circle at 100% 100%, var(--p-color) 0 1px, transparent 1px 20px);
  --pattern-size: auto;
  --mask-pos: 100% 100%;
  --mask-size: 50% 55%;
  --p-color: rgba(132, 132, 255, 0.30);
  --blob-color: #DFD8F4;
  --blob-opacity: 0.6;
  --blob-bottom: -130px; --blob-right: -130px;
}

/* Pattern 4 — concentric rings from bottom-left corner (ServiceOps warm) */
.team-card.p-rings-bl {
  --pattern: repeating-radial-gradient(circle at 0% 100%, var(--p-color) 0 1px, transparent 1px 19px);
  --pattern-size: auto;
  --mask-pos: 0% 100%;
  --mask-size: 50% 55%;
  --p-color: rgba(192, 150, 38, 0.34);
  --blob-color: #F3E6BB;
  --blob-opacity: 0.55;
  --blob-bottom: -130px; --blob-left: -130px;
}

/* Pattern 5 — rings from right-center (wide card; soft pink) */
.team-card.p-rings-rc {
  --pattern: repeating-radial-gradient(circle at 100% 50%, var(--p-color) 0 1px, transparent 1px 24px);
  --pattern-size: auto;
  --mask-pos: 100% 50%;
  --mask-size: 35% 80%;
  --p-color: rgba(217, 122, 138, 0.30);
  --blob-color: #FFEAEE;
  --blob-opacity: 0.7;
  --blob-top: 50%; --blob-right: -160px;
}

/* Featured tile keeps the Soft → White diagonal underlay; pattern sits on top */
.team-card.featured {
  background: linear-gradient(135deg, var(--soft) 0%, #FFFFFF 70%);
}
.team-card h3 {
  font-family: var(--display); font-weight: 700;
  font-size: 22px; line-height: 1.18; letter-spacing: -0.018em;
  color: var(--charcoal); margin: 0;
}
.team-card p {
  font-family: var(--sans); font-size: 14px; line-height: 1.55;
  color: var(--body-text); margin: 0;
}
.team-mock { margin-top: auto; }

/* Mock: Unified Activity */
.act-card {
  background: #FFFFFF; border-radius: 14px;
  border: 1px solid var(--border);
  padding: 14px;
  font-size: 12px;
}
.act-hd {
  display: flex; justify-content: space-between; align-items: center;
  padding-bottom: 10px; border-bottom: 1px solid var(--border);
  font-size: 10px; font-weight: 700; letter-spacing: .14em;
  color: var(--muted); text-transform: uppercase;
}
.act-hd .live { display: inline-flex; align-items: center; gap: 6px; color: var(--primary); }
.act-hd .live::before { content: ""; width: 6px; height: 6px; background: var(--primary); border-radius: 50%; }
.act-row { display: flex; align-items: center; gap: 10px; padding: 10px 0; }
.act-row + .act-row { border-top: 1px solid var(--border); }
.act-row .badge { width: 7px; height: 7px; border-radius: 50%; background: var(--primary); flex-shrink: 0; }
.act-row .badge.bright { background: var(--bright); }
.act-row .col { flex: 1; }
.act-row .col .l { font-size: 10px; font-weight: 700; letter-spacing: .1em; color: var(--muted); text-transform: uppercase; }
.act-row .col .v { font-size: 12.5px; color: var(--charcoal); font-weight: 600; margin-top: 2px; }
.act-row .state {
  font-size: 10px; font-weight: 700; letter-spacing: .06em;
  text-transform: uppercase; color: var(--primary);
}

/* Mock: Live Overview */
.overview-card {
  background: #FFFFFF; border-radius: 14px;
  border: 1px solid var(--border);
  padding: 14px;
}
.ov-hd { display: flex; justify-content: space-between; align-items: center; padding-bottom: 10px; }
.ov-hd .title { font-size: 12px; font-weight: 700; color: var(--charcoal); }
.ov-hd .badge {
  font-size: 10px; font-weight: 700; color: var(--primary);
  letter-spacing: .08em; text-transform: uppercase;
  display: inline-flex; align-items: center; gap: 6px;
}
.ov-hd .badge::before { content: ""; width: 6px; height: 6px; background: var(--primary); border-radius: 50%; }
.ov-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; padding: 4px 0 10px; }
.ov-stat .v { font-family: var(--display); font-weight: 800; color: var(--charcoal); font-size: 20px; letter-spacing: -0.02em; }
.ov-stat .l { font-size: 9.5px; letter-spacing: .14em; color: var(--muted); text-transform: uppercase; margin-top: 2px; font-weight: 700; }
.ov-stat .d { font-size: 9.5px; font-weight: 700; color: var(--primary); margin-top: 2px; }
.ov-stat .d.down { color: var(--muted); }
.ov-bars { display: flex; align-items: flex-end; gap: 6px; height: 42px; margin-top: 8px; padding-top: 8px; border-top: 1px solid var(--border); }
.ov-bar {
  flex: 1; border-radius: 4px;
  background: linear-gradient(180deg, var(--bright), var(--primary));
}

/* Mock: Workflow */
.wf-card { background: #FFFFFF; border-radius: 14px; border: 1px solid var(--border); padding: 14px; font-size: 11px; }
.wf-hd {
  display: flex; justify-content: space-between; align-items: center;
  padding-bottom: 8px; gap: 8px;
}
.wf-hd .ttl { font-weight: 700; color: var(--charcoal); font-size: 12px; }
.wf-hd .live { font-size: 10px; font-weight: 700; color: var(--primary); letter-spacing: .08em; display: inline-flex; align-items: center; gap: 4px; text-transform: uppercase; }
.wf-hd .live::before { content: ""; width: 6px; height: 6px; background: var(--primary); border-radius: 50%; }
.wf-hd .runs { font-size: 10px; color: var(--muted); }
.wf-step {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 10px; border-radius: 10px;
  background: var(--background); border: 1px solid var(--border);
  margin-top: 6px;
}
.wf-step .icon {
  width: 22px; height: 22px; border-radius: 7px;
  background: #FFFFFF; border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center;
}
.wf-step .col { flex: 1; }
.wf-step .col .l { font-size: 9px; letter-spacing: .14em; color: var(--muted); text-transform: uppercase; font-weight: 700; }
.wf-step .col .v { font-size: 12px; color: var(--charcoal); font-weight: 600; margin-top: 1px; }
.wf-step.ghost { background: transparent; border-style: dashed; border-color: var(--tint); }
.wf-step.ghost .col .l, .wf-step.ghost .col .v { color: var(--subtle); }
.wf-foot {
  display: flex; gap: 12px; padding-top: 12px; margin-top: 10px;
  border-top: 1px solid var(--border);
}
.wf-foot .col { flex: 1; text-align: center; }
.wf-foot .col .v { font-family: var(--display); font-weight: 800; font-size: 20px; color: var(--charcoal); letter-spacing: -0.02em; }
.wf-foot .col .l { font-size: 9px; letter-spacing: .14em; color: var(--muted); text-transform: uppercase; font-weight: 700; margin-top: 2px; }

/* Mock: Flexible apps */
.apps-card { background: #FFFFFF; border-radius: 14px; border: 1px solid var(--border); padding: 14px; position: relative; }
.apps-hd { display: flex; justify-content: space-between; align-items: center; padding-bottom: 10px; font-size: 12px; font-weight: 700; color: var(--charcoal); }
.apps-hd .count { background: var(--soft); color: var(--primary); padding: 2px 9px; border-radius: 999px; font-size: 11px; font-weight: 700; }
.apps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.app-tile {
  border-radius: 10px;
  background: var(--background); border: 1px solid var(--border);
  padding: 10px 8px;
  text-align: center;
}
.app-tile .ic {
  width: 22px; height: 22px; border-radius: 7px; margin: 0 auto 6px;
  background: var(--primary); color: #fff; font-weight: 800; font-size: 10px;
  display: flex; align-items: center; justify-content: center;
}
.app-tile .ic.bright { background: var(--bright); }
.app-tile .ic.mid    { background: var(--mid); }
.app-tile .ic.deep   { background: var(--deep); }
.app-tile .ic.charcoal { background: var(--charcoal); }
.app-tile .nm { font-weight: 700; color: var(--charcoal); font-size: 11px; }
.app-tile .st { font-size: 9px; color: var(--muted); margin-top: 2px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
.app-tile.ghost {
  border-style: dashed; color: var(--subtle);
  display: flex; align-items: center; justify-content: center;
  min-height: 64px; font-size: 14px; font-weight: 600;
}
.users-pill {
  position: absolute; left: -8px; bottom: 32px;
  background: var(--charcoal); color: #fff;
  border-radius: 12px;
  padding: 8px 12px;
  box-shadow: 0 12px 22px -8px rgba(31,36,48,0.4);
}
.users-pill .l { font-size: 8.5px; letter-spacing: .14em; font-weight: 700; opacity: .7; text-transform: uppercase; }
.users-pill .v { font-family: var(--display); font-weight: 800; font-size: 20px; line-height: 1; margin-top: 3px; letter-spacing: -0.02em; }
.users-pill .v em { color: var(--tint); font-style: normal; }
.users-pill .sub { font-size: 8.5px; font-weight: 500; opacity: .7; margin-top: 2px; }

/* Mock: Workflows stacked checklist */
.flow-card {
  background: var(--soft);
  border-radius: 14px;
  border: 1px solid var(--tint);
  padding: 14px;
}
.flow-row {
  display: flex; align-items: center; gap: 10px;
  padding: 9px 12px;
  background: #FFFFFF;
  border-radius: 10px;
  font-size: 12px; font-weight: 600; color: var(--charcoal);
  margin-bottom: 6px;
  border: 1px solid var(--border);
}
.flow-row:last-child { margin-bottom: 0; }
.flow-row.ghost { background: transparent; color: var(--muted); border-style: dashed; }
.flow-row.ghost .chk { background: transparent; border: 1.5px dashed var(--subtle); }
.flow-row .chk {
  width: 16px; height: 16px; border-radius: 5px;
  background: var(--primary); color: #fff;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}

/* (Legacy team-card variant classes — kept harmless if used) */
.team-card.t-tint, .team-card.t-bright, .team-card.t-mid,
.team-card.t-soft, .team-card.t-warm { /* no-op */ }

/* ============================================================
   SECTION 4 — Real Business Impact
   ============================================================ */
.s-impact {
  background: var(--background);
  padding: 80px 80px;
  position: relative;
  overflow: hidden;
}
.s-impact-inner {
  position: relative; z-index: 2;
  width: 1168px; margin: 0 auto;
}
.s-impact .evoq-section-head { text-align: center; max-width: 720px; margin: 0 auto 0; }
.s-impact .evoq-section-head .evoq-eyebrow { display: inline-flex; margin: 0 auto 20px; }
.s-impact .evoq-section-head .evoq-sub { margin: 16px auto 0; }

/* dashed connection echo from hero */
.impact-connectors {
  position: absolute; inset: auto 0 220px 0; height: 1px;
  pointer-events: none;
}
.impact-connectors svg { display: block; margin: 0 auto; }

.impact-stats {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 24px; margin-top: 48px;
  position: relative;
}
.stat {
  text-align: center;
  position: relative;
  padding: 24px 16px;
  border-radius: 18px;
  cursor: default;
  transition: background .25s ease, transform .25s ease;
}
.stat::before {
  content: "";
  position: absolute; inset: 0;
  border-radius: inherit;
  background: radial-gradient(120% 80% at 50% 0%, rgba(189,189,255,0.35) 0%, rgba(189,189,255,0) 60%);
  opacity: 0;
  transition: opacity .25s ease;
  pointer-events: none;
}
.stat > * { position: relative; z-index: 1; }
.stat:hover { background: #FFFFFF; transform: translateY(-3px); box-shadow: 0 20px 40px -20px rgba(0,0,153,0.18); }
.stat:hover::before { opacity: 1; }
.stat:hover .v { color: var(--mid); transform: scale(1.04); }
.stat .v {
  font-family: var(--display); font-weight: 800;
  font-size: 56px; line-height: 1; letter-spacing: -0.04em;
  color: var(--primary);
  transition: color .25s ease, transform .25s ease;
  transform-origin: center bottom;
}
.stat .l {
  font-family: var(--sans); font-size: 13.5px; line-height: 1.5;
  color: var(--body-text); margin: 12px auto 0;
  max-width: 24ch;
}

/* ============================================================
   SECTION 5 — Start with one. Scale with all.
   ============================================================ */
.s-cta {
  background: var(--soft);
  padding: 120px 80px;
}
.s-cta-inner {
  width: 1168px; margin: 0 auto;
  background: #FFFFFF;
  border-radius: 28px;
  padding: 64px;
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 64px;
  border: 1px solid var(--border);
  box-shadow: 0 30px 70px -30px rgba(0, 0, 153, .2);
}
.cta-left { display: flex; flex-direction: column; justify-content: center; padding-top: 24px; }
.cta-left .evoq-eyebrow { margin-bottom: 20px; }
.cta-left .evoq-h2 { font-size: 44px; line-height: 1.06; }
.cta-left p { margin-top: 24px; font-size: 15px; line-height: 1.7; color: var(--body-text); max-width: 38ch; }
.cta-talk {
  display: inline-flex; align-items: center; gap: 12px;
  padding: 12px 14px 12px 22px;
  background: var(--interactive); color: #FFFFFF;
  border-radius: 999px;
  font-family: var(--sans); font-size: 14px; font-weight: 600;
  border: 0; cursor: pointer; margin-top: 36px;
  box-shadow: 0 10px 28px -10px rgba(0,0,153,0.5);
  transition: background .15s ease, transform .15s ease;
}
.cta-talk:hover { background: var(--mid); transform: translateY(-1px); }
.cta-talk .ic {
  width: 28px; height: 28px; border-radius: 50%;
  background: rgba(255,255,255,0.18);
  display: inline-flex; align-items: center; justify-content: center;
}

.steps {
  background: var(--background);
  border-radius: 22px;
  padding: 28px 32px;
  display: flex; flex-direction: column;
  border: 1px solid var(--border);
}
.step { padding: 22px 0; display: flex; gap: 18px; align-items: flex-start; }
.step + .step { border-top: 1px solid var(--border); }
.step .num {
  width: 32px; height: 32px; border-radius: 50%;
  background: var(--soft); color: var(--primary);
  font-family: var(--display); font-weight: 700; font-size: 13px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.step .text { flex: 1; }
.step h4 {
  font-family: var(--display); font-weight: 700;
  font-size: 17px; line-height: 1.3; letter-spacing: -0.01em;
  color: var(--charcoal); margin: 4px 0 6px;
}
.step p {
  font-family: var(--sans); font-size: 13.5px; line-height: 1.6;
  color: var(--body-text); margin: 0;
}

/* ============================================================
   FOOTER — DARK
   ============================================================ */
.evoq-footer {
  position: relative;
  background: var(--charcoal);
  color: #FFFFFF;
  padding: 80px 80px 32px;
  overflow: hidden;
  isolation: isolate;
}
.evoq-footer::before {
  content: "";
  position: absolute; left: 0; right: 0; top: 0; height: 1px;
  background-image: linear-gradient(to right, transparent 0, var(--tint) 30%, var(--primary) 50%, var(--tint) 70%, transparent 100%);
}
.evoq-footer .grain {
  position: absolute; inset: 0;
  pointer-events: none;
  mix-blend-mode: overlay;
  opacity: .18;
  ${window.grainCss}
}
.footer-grid {
  position: relative; z-index: 2;
  width: 1168px; margin: 0 auto;
  display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr;
  gap: 48px;
}
.footer-brand .wordmark { display: inline-flex; align-items: center; }
.footer-brand .tagline {
  font-family: var(--display); font-weight: 500;
  font-size: 18px; line-height: 1.3; color: #FFFFFF;
  margin: 20px 0 0;
}
.footer-brand .tagline em { color: var(--tint); font-style: normal; font-weight: 500; }
.footer-brand .subline {
  margin: 16px 0 0;
  font-size: 13px; line-height: 1.55; color: rgba(255,255,255,0.55);
  max-width: 26ch;
}

.footer-col h6 {
  font-family: var(--sans); font-weight: 700; font-size: 11px;
  letter-spacing: .16em; text-transform: uppercase;
  color: rgba(255,255,255,0.55);
  margin: 6px 0 18px;
}
.footer-col ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
.footer-col a {
  font-family: var(--sans); font-size: 14px;
  color: rgba(255,255,255,0.88);
  text-decoration: none;
  transition: color .15s ease;
}
.footer-col a:hover { color: var(--tint); }

.footer-bottom {
  position: relative; z-index: 2;
  width: 1168px; margin: 56px auto 0;
  padding-top: 28px;
  border-top: 1px solid rgba(255,255,255,0.1);
  display: flex; align-items: center; justify-content: space-between;
  font-size: 13px; color: rgba(255,255,255,0.55);
}
.socials { display: inline-flex; gap: 10px; }
.socials a {
  width: 32px; height: 32px; border-radius: 9px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.85);
  display: flex; align-items: center; justify-content: center;
  transition: background .15s ease, color .15s ease, border-color .15s ease;
}
.socials a:hover { background: var(--interactive); border-color: var(--interactive); color: #fff; }
`;
