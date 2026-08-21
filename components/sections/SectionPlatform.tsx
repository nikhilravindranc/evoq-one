"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, type Easing } from "framer-motion";
import { Eyebrow } from "./shared";
import { hexToRgba, ProductBadge } from "@/components/shared/ProductBadge";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as Easing },
});

/* ---------------------------------------------------------------
 * A carousel replaces the old "one card per category" grid because
 * it scales by adding a card, not by re-balancing three card heights
 * against each other. Category no longer lives on the card itself
 * (a tag pill) -- it's a filter row below the carousel instead, so
 * switching category doesn't cost card real estate and the filter is
 * a real control rather than decoration.
 * ------------------------------------------------------------- */

type Category = "growth" | "operations" | "people";
type CategoryFilter = "all" | Category;

const CATEGORY_META: Record<Category, { label: string; ink: string }> = {
  growth:     { label: "Growth",     ink: "#4F3FAE" },
  operations: { label: "Operations", ink: "#2C63B0" },
  people:     { label: "People",     ink: "#21815A" },
};

const FILTERS: { key: CategoryFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "growth", label: "Growth" },
  { key: "operations", label: "Operations" },
  { key: "people", label: "People" },
];

/* =================================================================
 * PALETTES
 * =================================================================
 * Each product's official brand ramp, used verbatim rather than
 * approximated: `surface` is the card's base wash, `tint`/`soft` are
 * the blurred vector shapes over it, `primary` carries numbers and
 * accents, and `depth` is the base for the three dark cards.
 *
 * Two collisions worth knowing about, both deliberate rather than
 * mistakes: Campaigns and Projects share primary #7C3AED, separated
 * here by their different depth/soft ramps (Campaigns leans plum via
 * #3D1E5C, Projects blue-violet via #C4B5FD) and by sitting three
 * cards apart with completely different compositions. Desk, Sync and
 * HRMS are all greens -- Desk and Sync are dark cards and HRMS is
 * light, so they never read as the same card.
 *
 * Billing has no official ramp yet; it's built here as deep money
 * green with a gold accent, which keeps it clear of Sync's brighter
 * emerald on the one axis (hue) where they'd otherwise compete.
 * ------------------------------------------------------------- */
type Palette = {
  depth: string;
  primary: string;
  soft: string;
  tint: string;
  surface: string;
};

const PALETTE: Record<string, Palette> = {
  crm:        { depth: "#0C2472", primary: "#1D4ED8", soft: "#93C5FD", tint: "#E3ECFC", surface: "#EFF6FF" },
  campaigns:  { depth: "#3D1E5C", primary: "#7C3AED", soft: "#DDD6FE", tint: "#F3E8FF", surface: "#FAF5FF" },
  serviceops: { depth: "#78350F", primary: "#F59E0B", soft: "#FDE68A", tint: "#FAF2DB", surface: "#FFFBEB" },
  desk:       { depth: "#0F2F3F", primary: "#0D9488", soft: "#99F6E4", tint: "#F0FDFA", surface: "#F8FFFE" },
  projects:   { depth: "#5D1E99", primary: "#7C3AED", soft: "#C4B5FD", tint: "#DDD6FE", surface: "#F5F3FF" },
  sync:       { depth: "#064E3B", primary: "#059669", soft: "#6EE7B7", tint: "#A7F3D0", surface: "#ECFDF5" },
  inventory:  { depth: "#242424", primary: "#C91F6D", soft: "#F8C8B8", tint: "#F6DCE5", surface: "#FFF8F5" },
  /* PayU-inspired rather than the site's own brand ramp (Billing has
     none yet): sampled directly off payu.in -- CTA teal #00AB88, body
     wash #EEF1EF, headline ink #141416. A light, fintech-clean card
     instead of the dark-money-and-gold treatment this used to have. */
  billing:    { depth: "#141416", primary: "#00AB88", soft: "#A9DED0", tint: "#E3F5F0", surface: "#EEF1EF" },
  /* Hover shade (#0F7C63), not the muted brand Primary (#0B5B47) --
     the base primary reads too close to Depth once the card goes
     dark, so the brighter ramp step carries the accent instead. */
  hrms:       { depth: "#003D2E", primary: "#0F7C63", soft: "#A8E6C9", tint: "#D4F4EA", surface: "#F0FBF7" },
  /* Depth IS the brand primary here, not a darker step below it --
     evoq.one/skillberry's hero runs on this exact pink (#E94E77), not
     a navy "dark mode" of it. Sampled off the real hero, not guessed:
     confirmed via getComputedStyle on the hero section, rgb(233,78,119). */
  skillberry: { depth: "#E94E77", primary: "#E94E77", soft: "#FCDDE5", tint: "#FDA4AF", surface: "#FAFBFC" },
};

/* =================================================================
 * CARD ART
 * =================================================================
 * Ten products, ten hand-composed illustrations -- not two templates
 * recoloured ten times, which is what this section used to do.
 *
 * Each composition shows what its product DOES -- a pipeline, a
 * dispatch route, an invoice, a leave calendar. The products aren't
 * recognisable yet, so the art carries the explanation rather than
 * the branding.
 *
 * One rule holds all ten together: each card leads with EXACTLY one
 * thing -- a graphic, a display line, a floating panel, or a photo --
 * plus at most three chips. Never all three.
 *
 * Tone: light/light/light/light/DARK/light/light/light/DARK/DARK
 * (Projects, HRMS, Skillberry dark). Five cards now carry a real photo
 * -- CRM, ServiceOps, Desk, Projects and Sync -- each matched to what
 * that product's own marketing site actually shows rather than an
 * illustrated stand-in: ServiceOps and Desk both tried a drawn concept
 * first (a route diagram, a ticket thread) that explained the IDEA but
 * never looked like a screenshot of anything. HRMS and Skillberry stay
 * graphic-led (a roster, a progress ring) -- both tried a stock photo
 * earlier in this file's history and got rejected (an obscured face,
 * then a "bossy" executive pose), so a fourth photo from the same pool
 * wasn't worth gambling on again. Skillberry's card now runs dark to
 * match evoq.one/skillberry's own near-black hero, landing it next to
 * HRMS (also dark) at the end of the row -- breaks the "no two darks
 * adjacent" rule the other eight cards hold to, but matching each
 * product's real site took priority here over the row's own rhythm. */

/* -- the abstract vector field --------------------------------------
 * The soft organic wash behind the light cards, matching the
 * Literature Insights / Hypothesis Generation / Computational
 * Discovery cards in the reference: a few large shapes in the
 * product's own tint and soft tones, pushed through one heavy
 * Gaussian blur so their edges dissolve into each other.
 *
 * Blurring vector shapes rather than stacking radial-gradients is
 * what produces the flowing, hand-drawn quality -- a gradient's
 * falloff is always radially symmetric, so it can only ever make
 * circles, however soft. These read as ribbons and pooled colour.
 *
 * Four variants, assigned so no two adjacent cards share one. The
 * filter id is namespaced per product because SVG filter ids are
 * document-global and ten cards share one page. */
function VectorField({ id, palette, variant }: { id: string; palette: Palette; variant: 0 | 1 | 2 | 3 }) {
  const fid = `pf-vec-${id}`;
  const a = palette.tint, b = palette.soft, c = hexToRgba(palette.primary, 0.22);

  const shapes = [
    // 0 -- a broad band sweeping down-right, pooling bottom-left
    <g key="0">
      <path d="M-60 40 C 60 -10, 150 110, 250 50 S 380 30, 400 130 L400 -60 L-60 -60 Z" fill={a} />
      <ellipse cx="46" cy="248" rx="150" ry="104" fill={b} />
      <path d="M180 312 C 230 240, 320 250, 372 196 L372 340 L160 340 Z" fill={c} />
    </g>,
    // 1 -- diagonal ribbon corner to corner
    <g key="1">
      <path d="M-60 250 C 70 210, 120 90, 260 40 L360 -40 L400 60 C 300 120, 240 200, 120 300 Z" fill={a} />
      <ellipse cx="272" cy="72" rx="118" ry="96" fill={b} />
      <ellipse cx="70" cy="300" rx="128" ry="86" fill={c} />
    </g>,
    // 2 -- pooled top-right, arc across the base
    <g key="2">
      <ellipse cx="252" cy="42" rx="164" ry="124" fill={a} />
      <path d="M-60 300 C 60 214, 190 292, 400 210 L400 380 L-60 380 Z" fill={b} />
      <ellipse cx="40" cy="120" rx="96" ry="120" fill={c} />
    </g>,
    // 3 -- vertical drape, weight down the left
    <g key="3">
      <path d="M-60 -40 C 90 60, 40 190, 130 312 L-60 312 Z" fill={a} />
      <ellipse cx="240" cy="230" rx="140" ry="118" fill={b} />
      <ellipse cx="230" cy="30" rx="130" ry="80" fill={c} />
    </g>,
  ];

  return (
    <svg className="pf-vec" viewBox="0 0 312 312" preserveAspectRatio="xMidYMid slice" aria-hidden focusable="false">
      <defs>
        <filter id={fid} x="-40%" y="-40%" width="180%" height="180%" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="34" />
        </filter>
      </defs>
      <g filter={`url(#${fid})`}>{shapes[variant]}</g>
    </svg>
  );
}

function ArtFrame({
  pk, dark, variant = 0, photo, children,
}: {
  pk: string;
  dark?: boolean;
  variant?: 0 | 1 | 2 | 3;
  /* A real photograph instead of the vector field. The scrim keeps
     overlaid chips legible over whatever the image happens to be
     doing underneath -- portraits vary far more than a gradient.
     `filter` exists for photos reused from a solid-colour-backdrop
     studio set (see ServiceOps): a saturate+brightness pull-down so a
     punchy backdrop reads as the same muted editorial tone as every
     other card's photo instead of clashing with it. */
  photo?: { src: string; position?: string; filter?: string };
  children: React.ReactNode;
}) {
  const p = PALETTE[pk];
  const style = {
    background: dark
      ? `radial-gradient(76% 64% at 12% 104%, ${hexToRgba(p.primary, 0.5)} 0%, ${hexToRgba(p.primary, 0)} 66%),
         radial-gradient(58% 52% at 94% 2%, ${hexToRgba(p.soft, 0.22)} 0%, ${hexToRgba(p.soft, 0)} 62%),
         ${p.depth}`
      : p.surface,
    ["--art-ink" as string]: p.primary,
    ["--art-tint" as string]: hexToRgba(p.primary, 0.16),
  } as React.CSSProperties;

  return (
    <div className={`pf-art${dark ? " dark" : ""}`} style={style} aria-hidden>
      {photo ? (
        <>
          <img
            className="pf-photo"
            src={photo.src}
            alt=""
            loading="lazy"
            decoding="async"
            style={{ objectPosition: photo.position ?? "center", filter: photo.filter }}
          />
          <span
            className="pf-photo-scrim"
            style={{
              background: `linear-gradient(188deg,
                ${hexToRgba(p.primary, 0.14)} 0%,
                ${hexToRgba(p.depth, 0.44)} 52%,
                ${hexToRgba(p.depth, 0.88)} 100%)`,
            }}
          />
        </>
      ) : !dark ? (
        <VectorField id={pk} palette={p} variant={variant} />
      ) : null}
      {/* Everything inside is authored against a fixed 312x312 design
          size and scaled as one unit (see .pf-art-stage), so a
          narrower card shrinks the composition instead of reflowing
          it -- reflow is what makes 9px labels wrap or collide with a
          chip pinned at a fixed offset. */}
      <div className="pf-art-stage">{children}</div>
    </div>
  );
}

function Chip({ label, style }: { label: string; style: React.CSSProperties }) {
  return (
    <span className="pf-art-chip" style={style}>
      <span className="ic" />
      {label}
    </span>
  );
}

/* Used only by the cards depicting a live interaction. */
function Cursor({ style }: { style: React.CSSProperties }) {
  return (
    <svg className="pf-cursor" style={style} width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3 2.5 15.5 8.8 9.8 10.3 8 16.2 3 2.5Z" fill="#1F2430" stroke="#fff" strokeWidth="1.1" strokeLinejoin="round" />
    </svg>
  );
}

const Check = ({ color = "#4ADE80", size = 12 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M3 8.5 6.5 12 13 4.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---- 1. CRM -- photo, with the deal that closed floating on it ---- */
function ArtCrm() {
  const p = PALETTE.crm;
  return (
    <ArtFrame pk="crm" photo={{ src: "/team/card-crm-v3.jpg", position: "center 22%" }}>
      <div className="pf-float" style={{ left: 22, bottom: 74 }}>
        <div className="pf-float-hd">
          <span className="pf-float-dot" style={{ background: "#0E9F6E" }} />
          Deal won
        </div>
        <div className="pf-float-nm">Nova Retail</div>
        <div className="pf-float-amt" style={{ color: p.primary }}>$120K</div>
      </div>
      <span className="pf-art-caption" style={{ left: 22, bottom: 24 }}>
        Relationships, not records
      </span>
    </ArtFrame>
  );
}

/* ---- 2. Campaigns -- type-led, with the open/click result ---- */
function ArtCampaigns() {
  const p = PALETTE.campaigns;
  return (
    <ArtFrame pk="campaigns" variant={1}>
      <p className="pf-art-head" style={{ left: 24, top: 34, fontSize: 30 }}>
        Send.<br />Open.<br />Convert.
      </p>
      <svg className="pf-spark" viewBox="0 0 312 150" preserveAspectRatio="none">
        <defs>
          <linearGradient id="pf-spark-g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={hexToRgba(p.primary, 0.28)} />
            <stop offset="100%" stopColor={hexToRgba(p.primary, 0)} />
          </linearGradient>
        </defs>
        <path d="M20 78 C 74 74, 96 58, 134 50 S 214 40, 288 14 L288 150 L20 150 Z" fill="url(#pf-spark-g)" />
        <path d="M20 78 C 74 74, 96 58, 134 50 S 214 40, 288 14" fill="none" stroke={p.primary} strokeWidth="2.6" strokeLinecap="round" />
        <circle cx="134" cy="50" r="4.5" fill="#fff" stroke={p.primary} strokeWidth="2.4" />
        <circle cx="288" cy="14" r="5" fill={p.primary} />
      </svg>
      <div className="pf-camp-metrics">
        <div className="pf-camp-metric">
          <div className="v" style={{ color: p.primary }}>312</div>
          <div className="l">opened</div>
        </div>
        <div className="pf-camp-metric">
          <div className="v" style={{ color: p.primary }}>48</div>
          <div className="l">clicked</div>
        </div>
      </div>
    </ArtFrame>
  );
}

/* ---- 3. ServiceOps -- a technician in the field, job in hand ----
   The drawn 1-2-3 route diagram explained a CONCEPT (stops on a map)
   but never showed the app itself, or anyone using it -- it read as a
   generic "logistics" icon, not a specific product. A real field
   technician with a job assigned on the spot, same photo+float
   language CRM already uses, makes it unmistakably an app for service
   operations.
   The first photo here was cropped tight enough to read as an angry
   close-up (a furrowed brow filling the frame) and cropped OUT the one
   detail that actually sells the product -- the tablet in his hands.
   This one, from the same studio shoot, pulls back to a waist-up frame
   so the tablet is clearly in view, and catches him mid-check rather
   than mid-glare. */
function ArtServiceOps() {
  const p = PALETTE.serviceops;
  return (
    <ArtFrame
      pk="serviceops"
      photo={{ src: "/team/card-serviceops-v2.jpg", position: "center", filter: "saturate(0.55) brightness(0.98)" }}
    >
      <div className="pf-float" style={{ left: 22, top: 22 }}>
        <div className="pf-float-hd">
          <span className="pf-float-dot" style={{ background: p.primary }} />
          Job assigned
        </div>
        <div className="pf-float-nm">#SR-482 · HVAC repair</div>
      </div>
      <Chip label="ETA 11:20 · 2 stops left" style={{ left: 22, bottom: 26 }} />
    </ArtFrame>
  );
}

/* ---- 4. Desk -- a real support floor, ticket auto-assigned live ----
   Back to a pattern card, same abstract-mesh language as Sync and
   Inventory, rather than the office photo this briefly used -- three
   photo cards in a row (CRM, ServiceOps, Desk) was too many of the same
   device this early in the row, and the mesh puts the focus back on
   the actual app chrome (the ticket, the auto-assign, the pickup-time
   stat) instead of the room it's sitting in. Content is unchanged: a
   "new ticket" chip landing top-left, the auto-assign panel picking it
   up bottom-right, the pickup-time stat as its own bold pill
   bottom-left -- the drawn dark ticket-thread panel this replaced
   explained the CHAT but never showed the app finding an agent, which
   is the actual "auto" in Desk. */
function ArtDesk() {
  const p = PALETTE.desk;
  return (
    <ArtFrame pk="desk" variant={3}>
      <div className="pf-float" style={{ left: 22, top: 22 }}>
        <div className="pf-float-hd">
          <span className="pf-float-dot" style={{ background: p.primary }} />
          New ticket
        </div>
        <div className="pf-float-nm">#TK-4821 · Billing</div>
      </div>

      <div className="pf-art-panel pf-assign" style={{ right: 22, top: 92, width: 172 }}>
        <div className="pf-assign-hd">
          <span className="pf-assign-lb">Auto-assign</span>
          <span className="pf-assign-live">Live</span>
        </div>
        <div className="pf-assign-agent">
          <img className="pf-assign-av" src="/team/ops-sync.jpg" alt="" />
          <span>
            <div className="pf-assign-nm">David Kim</div>
            <div className="pf-assign-role">Support Agent</div>
          </span>
        </div>
        <div className="pf-assign-meta">
          <span style={{ color: "#F59E0B" }}>★</span>
          <span>4.9 · 312 tickets</span>
        </div>
        <div className="pf-assign-ok"><Check color="#0D9488" size={11} />Assigned in 8s</div>
      </div>

      <div className="pf-stat-pill light" style={{ left: 22, bottom: 26 }}>
        <span className="pf-stat-pill-v" style={{ color: p.primary }}>8s</span>
        <span className="pf-stat-pill-l" style={{ color: "rgba(31,36,48,0.55)" }}>Average pickup time</span>
      </div>
    </ArtFrame>
  );
}

/* ---- 5. Projects -- the actual product thumbnail, recomposed ----
   evoq.one/projects leads its own hero with a photo of someone coding
   and a floating "Sprint Progress" ring card -- this reproduces that
   composition in the carousel's own card language (photo+float, same
   as CRM/ServiceOps) instead of an illustrated Gantt chart nobody
   would recognise as a screenshot of anything. Swapped to a team
   actually sketching a sprint out on a whiteboard -- wireframes, a
   laptop, sticky notes -- a more literal match for "plan the work"
   than one person alone at a terminal. */
function ArtProjects() {
  const p = PALETTE.projects;
  const R = 20, C = 2 * Math.PI * R, pct = 0.72;
  return (
    <ArtFrame pk="projects" dark photo={{ src: "/team/card-projects-v3.jpg", position: "center" }}>
      <div className="pf-art-panel ink pf-sprint" style={{ left: 22, right: 22, bottom: 26 }}>
        <svg className="pf-sprint-ring" width="46" height="46" viewBox="0 0 46 46" fill="none">
          <circle cx="23" cy="23" r={R} stroke="rgba(255,255,255,0.16)" strokeWidth="5" />
          <circle
            cx="23" cy="23" r={R}
            stroke={p.primary} strokeWidth="5" strokeLinecap="round"
            strokeDasharray={`${C * pct} ${C}`}
            transform="rotate(-90 23 23)"
          />
        </svg>
        <div className="pf-sprint-copy">
          <span className="pf-sprint-lb">Sprint progress</span>
          <span className="pf-sprint-v">72%</span>
          <span className="pf-sprint-sub">26 / 36 completed</span>
        </div>
      </div>
    </ArtFrame>
  );
}

/* ---- 6. Sync -- the hub, straight off the microsite's own hero ----
   evoq.one/sync's hero isn't a photo at all -- it's Sync's own node
   mark in the centre with dashed lines running out to FOUR labelled
   system categories in a 2x2 grid (CRM Systems, ERP Systems, Ecommerce
   Platforms, Business Applications). An earlier pass here only showed
   two of the four (CRM, ERP) -- accurate as far as it went, but Sync
   connects ecommerce and general business apps too, and showing only
   half the categories undersold what it actually does. All four now
   reproduce the real hero's own quadrant layout at card scale. */
function ArtSync() {
  const p = PALETTE.sync;
  const endpoints: { key: string; label: string; left?: number; right?: number; top: number; icon: React.ReactNode }[] = [
    {
      key: "crm", label: "CRM", left: 18, top: 30,
      icon: <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="6" r="2.6" stroke={p.depth} strokeWidth="1.4" /><path d="M3.5 13c0-2.4 2-4 4.5-4s4.5 1.6 4.5 4" stroke={p.depth} strokeWidth="1.4" strokeLinecap="round" /></svg>,
    },
    {
      key: "erp", label: "ERP", right: 18, top: 30,
      icon: <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><ellipse cx="8" cy="4" rx="5" ry="2" stroke={p.depth} strokeWidth="1.4" /><path d="M3 4v3.5c0 1.1 2.2 2 5 2s5-.9 5-2V4" stroke={p.depth} strokeWidth="1.4" /><path d="M3 7.5V11c0 1.1 2.2 2 5 2s5-.9 5-2V7.5" stroke={p.depth} strokeWidth="1.4" /></svg>,
    },
    {
      key: "ecom", label: "Ecom", left: 18, top: 218,
      icon: <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M4 6h8l-.7 7a1.5 1.5 0 0 1-1.5 1.3H6.2A1.5 1.5 0 0 1 4.7 13L4 6Z" stroke={p.depth} strokeWidth="1.4" strokeLinejoin="round" /><path d="M6 6V4.5a2 2 0 0 1 4 0V6" stroke={p.depth} strokeWidth="1.4" strokeLinecap="round" /></svg>,
    },
    {
      key: "apps", label: "Apps", right: 18, top: 218,
      icon: <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><rect x="2.5" y="2.5" width="4.5" height="4.5" rx="1.2" stroke={p.depth} strokeWidth="1.4" /><rect x="9" y="2.5" width="4.5" height="4.5" rx="1.2" stroke={p.depth} strokeWidth="1.4" /><rect x="2.5" y="9" width="4.5" height="4.5" rx="1.2" stroke={p.depth} strokeWidth="1.4" /><rect x="9" y="9" width="4.5" height="4.5" rx="1.2" stroke={p.depth} strokeWidth="1.4" /></svg>,
    },
  ];
  return (
    <ArtFrame pk="sync" variant={2}>
      <svg className="pf-orbit" viewBox="0 0 312 312" fill="none">
        <path d="M136 136 L 92 78" stroke={hexToRgba(p.primary, 0.5)} strokeWidth="2" strokeDasharray="1 6" strokeLinecap="round" />
        <path d="M176 136 L 220 78" stroke={hexToRgba(p.primary, 0.5)} strokeWidth="2" strokeDasharray="1 6" strokeLinecap="round" />
        <path d="M136 176 L 92 234" stroke={hexToRgba(p.primary, 0.5)} strokeWidth="2" strokeDasharray="1 6" strokeLinecap="round" />
        <path d="M176 176 L 220 234" stroke={hexToRgba(p.primary, 0.5)} strokeWidth="2" strokeDasharray="1 6" strokeLinecap="round" />
      </svg>

      {/* The product's own node mark, not a generic glyph -- same
          asset ProductBadge uses elsewhere on the site. */}
      <div className="pf-sync-hub" style={{ left: 130, top: 130 }}>
        <span style={{ width: 30, height: 30, position: "relative", display: "block" }}>
          <ProductBadge productKey="sync" size={30} />
        </span>
      </div>

      {endpoints.map((e) => (
        <div key={e.key} className="pf-sync-endpoint" style={{ left: e.left, right: e.right, top: e.top }}>
          <span className="ic">{e.icon}</span>
          <span className="lb">{e.label}</span>
        </div>
      ))}
    </ArtFrame>
  );
}

/* ---- 7. Inventory -- type-led count over the stock trend ---- */
function ArtInventory() {
  const p = PALETTE.inventory;
  const bars = [54, 72, 61, 88, 70, 96, 44, 66];
  return (
    <ArtFrame pk="inventory" variant={0}>
      <div className="pf-stock-v" style={{ color: p.depth }}>1,204</div>
      <div className="pf-stock-l">units in stock · 6 locations</div>
      <div className="pf-stock-chart">
        <div className="pf-stock-bars">
          {bars.map((h, i) => (
            <span
              key={i}
              className="pf-stock-bar"
              style={{
                height: `${h}%`,
                background: h < 50 ? "#F15B5A" : p.primary,
                opacity: h < 50 ? 1 : 0.3 + (i / bars.length) * 0.32,
              }}
            />
          ))}
        </div>
        <div className="pf-stock-line" style={{ bottom: "50%" }}>
          <span>Reorder</span>
        </div>
      </div>
      <Chip label="2 SKUs below reorder" style={{ right: 24, top: 30 }} />
    </ArtFrame>
  );
}

/* ---- 8. Billing -- a light invoice, PayU's own teal-on-off-white ----
   Rebuilt against payu.in directly (sampled, not guessed): CTA teal
   #00AB88, body wash #EEF1EF, near-black headline ink #141416. This
   replaces an invented dark-green-and-gold "money" scheme with the
   actual colours the Billing app will ship in. */
function ArtBilling() {
  const p = PALETTE.billing;
  return (
    <ArtFrame pk="billing" variant={2}>
      <div className="pf-art-panel" style={{ left: 30, right: 30, top: 46, height: 186 }}>
        <div className="pf-inv">
          <div className="pf-inv-hd">
            <span className="pf-inv-t">Invoice</span>
            <span className="pf-inv-n">#2481 · Paid</span>
          </div>
          <div className="pf-inv-row"><span>Platform licence</span><b>$1,800</b></div>
          <div className="pf-inv-row"><span>Onboarding</span><b>$640</b></div>
          <div className="pf-inv-row"><span>Support plan</span><b>$310</b></div>
          <div className="pf-inv-total">
            <span className="l">Total</span>
            <span className="v" style={{ color: p.primary }}>$2,750</span>
          </div>
          <span className="pf-inv-stamp" style={{ color: p.primary, borderColor: p.primary }}>PAID</span>
        </div>
      </div>
      <Chip label="$24.8K collected this month" style={{ left: 30, bottom: 28 }} />
    </ArtFrame>
  );
}

/* ---- 9. HRMS -- who's in, and who's off ---- */
function ArtHrms() {
  const p = PALETTE.hrms;
  const people: { initials: string; name: string; status: string; on: boolean; av: string }[] = [
    { initials: "PS", name: "Priya S.",  status: "On leave", on: false, av: "#F59E0B" },
    { initials: "DK", name: "Daniel K.", status: "Active",   on: true,  av: "#1D4ED8" },
    { initials: "MG", name: "Maria G.",  status: "Active",   on: true,  av: "#7C3AED" },
  ];
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <ArtFrame pk="hrms" dark>
      <span className="pf-art-eyebrow" style={{ left: 24, top: 28 }}>This week</span>
      <div className="pf-roster">
        {people.map((person) => (
          <div className="pf-roster-row" key={person.name}>
            <span className="pf-av" style={{ background: person.av }}>{person.initials}</span>
            <span className="pf-roster-nm">{person.name}</span>
            <span
              className="pf-roster-pill"
              style={person.on
                ? { color: p.primary, background: hexToRgba(p.primary, 0.14) }
                : { color: "#B45309", background: "rgba(180,83,9,0.13)" }}
            >
              {person.status}
            </span>
          </div>
        ))}
      </div>
      <div className="pf-days">
        {days.map((d, i) => (
          <span key={i} className={`pf-day${i === 1 || i === 2 ? " off" : ""}`}>{d}</span>
        ))}
      </div>
    </ArtFrame>
  );
}

/* ---- 10. Skillberry -- an upcoming live session, not a static % ----
   A completion ring is passive -- it tells you where ONE learner is on
   ONE course, nothing an educator or coach running the platform would
   actually check. Skillberry's own pitch is coaching, training and
   workshops, which are scheduled and social, not solo progress bars --
   this panel leads with the thing that's actually distinctive: a live
   session on the calendar, who else is already in it, and how soon it
   starts. Reuses the same photo-free card language as the Auto-assign
   panel on Desk (a white .pf-art-panel plus a live badge) rather than
   inventing a third visual system.
   Card stays on evoq.one/skillberry's own pink (#E94E77, PALETTE.
   skillberry.depth); white is what's actually on that hero, not the
   navy an earlier pass here mistakenly sampled off one unrelated dark
   CTA link on the page.
   The completion ring the panel replaced still earns its place as a
   small corner KPI once it's not the card's whole story -- shrunk to
   a 64px badge bottom-right, clear of both the workshop panel above
   and the certificate chip at bottom-left. */
function ArtSkillberry() {
  const R = 26, C = 2 * Math.PI * R, pct = 0.86;
  return (
    <ArtFrame pk="skillberry" dark>
      <span className="pf-art-eyebrow" style={{ left: 24, top: 28 }}>Upcoming workshop</span>
      <div className="pf-art-panel pf-workshop" style={{ left: 24, right: 24, top: 64 }}>
        <span className="pf-assign-live">Live in 2h</span>
        <div className="pf-workshop-title">Advanced Sales Coaching</div>
        <div className="pf-workshop-sub">Tomorrow · 10:00 AM · 60 min</div>
        <div className="pf-workshop-avatars">
          <span className="pf-av" style={{ background: "#F59E0B" }}>PS</span>
          <span className="pf-av" style={{ background: "#1D4ED8" }}>DK</span>
          <span className="pf-av" style={{ background: "#7C3AED" }}>MG</span>
          <span className="pf-workshop-count">+21 enrolled</span>
        </div>
      </div>
      <Chip label="Certificate included" style={{ left: 24, bottom: 24 }} />
      <svg className="pf-ring-mini" viewBox="0 0 64 64" fill="none" style={{ right: 24, bottom: 20 }}>
        <circle cx="32" cy="32" r={R} stroke="rgba(255,255,255,0.22)" strokeWidth="6" />
        <circle
          cx="32" cy="32" r={R}
          stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round"
          strokeDasharray={`${C * pct} ${C}`}
          transform="rotate(-90 32 32)"
        />
        <text x="32" y="30" textAnchor="middle" fontSize="14" fontWeight="700" fill="#FFFFFF" fontFamily="var(--font-display)" letterSpacing="-0.5">86%</text>
        <text x="32" y="41" textAnchor="middle" fontSize="6" fontWeight="600" fill="rgba(255,255,255,0.7)" fontFamily="var(--font-sans)">course</text>
      </svg>
    </ArtFrame>
  );
}

const ART: Record<string, () => React.ReactElement> = {
  crm: ArtCrm,
  campaigns: ArtCampaigns,
  serviceops: ArtServiceOps,
  desk: ArtDesk,
  projects: ArtProjects,
  sync: ArtSync,
  inventory: ArtInventory,
  billing: ArtBilling,
  hrms: ArtHrms,
  skillberry: ArtSkillberry,
};

/* -- products ------------------------------------------------------ */

type Product = {
  key: keyof typeof ART & string;
  name: string;
  category: Category;
  desc: string;
  /* Every product points at /videos/products/{key}.mp4 whether or not
     the file exists yet -- HEAD-checked on mount (same pattern as the
     hero video swap) so a card silently upgrades from its art to a
     real clip the moment the file lands, no code change required.
     Clips should be authored square, to match the art slot. */
  video: string;
};

const PRODUCTS: Product[] = ([
  { key: "crm", name: "CRM", category: "growth",
    desc: "Manage leads, contacts and deals from first touch to closed-won." },
  { key: "campaigns", name: "Campaigns", category: "growth",
    desc: "Turn customer data into campaigns that actually convert." },
  { key: "serviceops", name: "ServiceOps", category: "operations",
    desc: "Plan, schedule and dispatch field service work with less back-and-forth." },
  { key: "desk", name: "Desk", category: "operations",
    desc: "The support essentials your team already reaches for, every day." },
  { key: "projects", name: "Projects", category: "operations",
    desc: "Plan the work, track progress, and ship with confidence." },
  { key: "sync", name: "Sync", category: "operations",
    desc: "Move data seamlessly across your CRM, ERP, eCommerce and other systems." },
  { key: "inventory", name: "Inventory", category: "operations",
    desc: "Track stock, movements and reorder points across every location." },
  { key: "billing", name: "Billing", category: "operations",
    desc: "Raise invoices, collect payments and reconcile accounts automatically." },
  { key: "hrms", name: "HRMS", category: "people",
    desc: "Employee records, time and leave, handled without the spreadsheets." },
  { key: "skillberry", name: "Skillberry", category: "people",
    desc: "Help your people learn, grow and build the skills your business needs next." },
] as Omit<Product, "video">[]).map((p) => ({ ...p, video: `/videos/products/${p.key}.mp4` }));

/* -- card + carousel ------------------------------------------------ */

function ProductCard({
  product, index, videoOk, clone,
}: { product: Product; index: number; videoOk: boolean; clone?: "before" | "after" | "clone" }) {
  // Was CATEGORY_META[category].ink -- only three colours shared across
  // ten products, so Billing's Explore link was the same blue as CRM's
  // and Sync's, nothing to do with either product's own identity. Each
  // product already has its own primary in PALETTE; use that instead.
  const ink = PALETTE[product.key].primary;
  const Art = ART[product.key];

  return (
    // rotate/lift are NOT set here -- they're written directly onto this
    // node's style by the scroll-driven arc effect in SectionPlatform
    // (see updateArc), recomputed every scroll frame from the card's
    // actual position, not a fixed per-index value.
    //
    // The transform still lives on this plain <a>, not on the motion
    // element below -- Framer writes its own inline `transform` once
    // the fade-in settles, silently overwriting a CSS transform on the
    // same node. Splitting static positioning (this <a>) from animation
    // (the motion.div, opacity/y only) avoids that fight.
    <a
      href="#"
      className="pf-card"
      aria-label={`Explore ${product.name}`}
      // Loop clones (a duplicate of the last card before the real run
      // and a duplicate of the first after it -- see SectionPlatform)
      // exist purely so the scroll can keep moving in one direction
      // instead of snapping backward through the whole row. They're
      // real DOM nodes so the browser has something to scroll onto,
      // but they're not a second "Explore CRM" link for a screen
      // reader or the tab order to land on.
      {...(clone ? { "data-pf-clone": clone, "aria-hidden": true, tabIndex: -1 } : {})}
    >
      <motion.div
        className="pf-card-inner"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: 0.04 * index, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Inset by --pf-mat rather than full-bleed: the artwork is
            matted inside the card the way a photo sits inside a print
            border, which is what the reference carousel does and what
            stops the art from colliding with the card's own edge. */}
        <div className="pf-visual">
          {videoOk ? (
            <video
              className="pf-visual-video"
              src={product.video}
              autoPlay muted loop playsInline
            />
          ) : (
            <Art />
          )}
        </div>
        <div className="pf-body">
          <div className="pf-name">{product.name}</div>
          <p className="pf-desc">{product.desc}</p>
          <span className="pf-link" style={{ color: ink }}>
            Explore
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M4 12 12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
        </div>
      </motion.div>
    </a>
  );
}

export function SectionPlatform() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<CategoryFilter>("all");
  // 'checking' -> 'ok' | 'missing', resolved via a HEAD request rather
  // than each <video>'s own error event -- same reasoning as the hero
  // video swap: a fast local 404 can race React attaching its listener.
  const [videoStatus, setVideoStatus] = useState<Record<string, "checking" | "ok" | "missing">>(
    () => Object.fromEntries(PRODUCTS.map((p) => [p.key, "checking"]))
  );

  useEffect(() => {
    let cancelled = false;
    PRODUCTS.forEach((p) => {
      fetch(p.video, { method: "HEAD" })
        .then((res) => {
          if (!cancelled) setVideoStatus((prev) => ({ ...prev, [p.key]: res.ok ? "ok" : "missing" }));
        })
        .catch(() => {
          if (!cancelled) setVideoStatus((prev) => ({ ...prev, [p.key]: "missing" }));
        });
    });
    return () => { cancelled = true; };
  }, []);

  const products = filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".pf-card");
    // Read the real column-gap rather than assuming one -- it differs
    // by breakpoint (40px desktop, 24px mobile; see .pf-track), and a
    // stale hardcoded value here would make each click under- or
    // over-shoot the next card.
    const gap = parseFloat(getComputedStyle(track).columnGap) || 24;
    const step = card ? card.getBoundingClientRect().width + gap : 340;
    // No edge-detection here anymore -- always just moves one card in
    // the given direction. Looping past either end (instead of
    // dead-ending, and instead of the old jump-to-position-0 that
    // played the whole row backward) is handled by the clone cards
    // and the settle effect below.
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const setFilterAndReset = (key: CategoryFilter) => setFilter(key);

  // Runs after the DOM has actually committed the new filter's cards
  // (and clones), unlike an imperative scrollTo inside the click
  // handler above, which would still be reading the *previous*
  // filter's card positions since React hasn't re-rendered yet.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const firstReal = track.querySelector<HTMLElement>(".pf-card:not([data-pf-clone])");
    track.scrollTo({ left: firstReal?.offsetLeft ?? 0, behavior: "smooth" });
  }, [filter]);

  // Loop clones (see the .pf-card render below) only earn their keep
  // once the real cards actually overflow the track -- with few enough
  // cards left after a filter to fit the viewport there's nothing to
  // scroll, so cloning would just force false overflow and fight the
  // "few cards center themselves" behavior below. Written from a ref
  // (not state) inside the arc effect's per-frame measurement and only
  // promoted to state on an actual change, so this doesn't add a
  // render every scroll tick.
  const [loopEnabled, setLoopEnabled] = useState(true);
  const loopEnabledRef = useRef(true);

  /* -- the arc: card lift/rotate as a function of scroll position -----
   * Recomputed imperatively on every scroll frame (rAF-throttled)
   * rather than through React state -- a state update per scroll tick
   * would re-render all ten cards 60x/sec. Distance of each card's
   * center from the *track's* center (not the window's -- the track
   * can sit anywhere on the page) is normalized to [-1, 1], then run
   * through a cosine falloff: centered cards lift near their max, cards
   * at the visible edges settle back toward the baseline, and rotation
   * leans outward proportionally. */
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;

    const update = () => {
      // Chrome (and other browsers) report a momentary near-zero
      // clientWidth while a window is animating into/out of the
      // taskbar on minimize/restore. Without this guard, `half` falls
      // back to a tiny divisor, every card's t collapses to the same
      // +/-1 extreme at once, and as the width flickers through the
      // animation the whole row snaps between extremes -- visible as
      // violent shaking. A real layout never gets this narrow (cards
      // have a fixed ~250px+ width), so bailing out here just holds
      // the last good transform until the width recovers.
      if (track.clientWidth < 50) return;

      // A filtered category can leave as few as two cards, which no
      // longer fill the track -- center them instead of leaving them
      // stranded against the left edge (the flex default). Checked on
      // every scroll/resize tick alongside the arc math below, since
      // "fits" depends on viewport width AND on how many cards the
      // active filter left, not on either alone.
      //
      // Measured off the real cards only (excludes the loop clones,
      // which always add width of their own) -- otherwise a genuinely
      // short filtered row would still measure as "overflowing" once
      // clones were attached to it, and would never get to center.
      const realCards = track.querySelectorAll<HTMLElement>(".pf-card:not([data-pf-clone])");
      let overflow = false;
      if (realCards.length) {
        const firstReal = realCards[0];
        const lastReal = realCards[realCards.length - 1];
        const realWidth = lastReal.offsetLeft + lastReal.offsetWidth - firstReal.offsetLeft;
        overflow = realWidth > track.clientWidth + 1;
      }
      track.classList.toggle("pf-track-fit", !overflow);
      if (overflow !== loopEnabledRef.current) {
        loopEnabledRef.current = overflow;
        setLoopEnabled(overflow);
      }

      // Measured in the track's own scroll-local space via offsetLeft/
      // offsetWidth, NOT getBoundingClientRect() -- a card's rect already
      // reflects the transform this loop is about to overwrite (rotate +
      // translateY), so reading it back would feed each tick's output
      // into the next tick's input. That round-trip is small enough to
      // hide during a slow scroll, but a window resize fires dozens of
      // events while the user drags, and it compounds into visible
      // shaking -- worst right at the 1024px/640px breakpoints where the
      // card width itself jumps.
      const centerX = track.scrollLeft + track.clientWidth / 2;
      const half = track.clientWidth / 2 || 1;
      track.querySelectorAll<HTMLElement>(".pf-card").forEach((card) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const t = Math.max(-1, Math.min(1, (cardCenter - centerX) / half));
        const lift = 30 * Math.cos((t * Math.PI) / 2); // 30px at center, 0 at edges
        const rotate = t * 7; // leans outward toward the edges
        card.style.setProperty("--pf-rotate", `${rotate.toFixed(2)}deg`);
        card.style.setProperty("--pf-lift", `${(-lift).toFixed(2)}px`);
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [products]);

  /* -- seamless loop: full clone laps + shift-by-one-lap -----------------
   * Native scroll-snap can't loop by itself -- there's nothing past the
   * last real card to scroll onto. The old fix scrollTo'd straight back
   * to position 0 when Next was clicked at the end, which visibly played
   * the whole row backward instead of continuing forward.
   *
   * An earlier version of this fix cloned a single card at each end plus
   * an empty invisible buffer to give it room to scroll into. That still
   * broke under manual scrolling (trackpad/scrollbar drag, not just the
   * arrow buttons): dragging past the single clone landed in the empty
   * buffer, which is exactly blank space, visible for as long as the
   * user kept dragging before the debounced correction could fire.
   *
   * This version clones the ENTIRE product list before and after the
   * real (middle) copy, so there is no position the user can scroll to
   * that isn't real card content -- overscrolling into a clone lap just
   * shows more (identical) cards, never blank space. Correcting is then
   * a single subtraction/addition of one full lap's pixel width, which
   * works from ANY scroll position (not just a snapped card boundary),
   * so it's exact even if the user stops mid-card. */
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !loopEnabled) return;

    const getRealCards = () =>
      Array.from(track.querySelectorAll<HTMLElement>(".pf-card:not([data-pf-clone])"));

    const real = getRealCards();
    if (real.length < 2) return;

    // Start in the real (middle) copy, not the "before" clone lap.
    track.scrollLeft = real[0].offsetLeft;

    let settleTimer: ReturnType<typeof setTimeout>;

    const settle = () => {
      const cards = getRealCards();
      if (cards.length < 2) return;
      const realStart = cards[0].offsetLeft;
      const cloneAfterFirst = track.querySelector<HTMLElement>('[data-pf-clone="after"]');
      if (!cloneAfterFirst) return;
      const lapWidth = cloneAfterFirst.offsetLeft - realStart;
      if (lapWidth <= 0) return;
      if (track.scrollLeft >= realStart + lapWidth) {
        track.scrollLeft -= lapWidth;
      } else if (track.scrollLeft < realStart) {
        track.scrollLeft += lapWidth;
      }
    };

    const onScroll = () => {
      clearTimeout(settleTimer);
      // Fires once scrolling has actually stopped rather than on every
      // frame -- teleporting mid-scroll would cut a smooth animation
      // short and be visible as a stutter instead of a clean loop.
      settleTimer = setTimeout(settle, 80);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      clearTimeout(settleTimer);
    };
  }, [products, loopEnabled]);

  return (
    <section className="s-platform">
      <div className="pf-blob pf-blob-a" aria-hidden />
      <div className="pf-blob pf-blob-b" aria-hidden />

      <div className="s-platform-inner">
        <motion.div className="evoq-section-head pf-head" {...fadeUp(0)}>
          <Eyebrow>One Unified Platform</Eyebrow>
          <h2 className="evoq-h2">
            {/* nbsp keeps "one suite." together so it never orphans onto
                its own line with just "suite." trailing below it */}
            Every product, <span className="accent">one&nbsp;suite.</span>
          </h2>
          <p className="evoq-sub">
            Explore products for growth, operations, and people. Start with what you need
            and add more as your business grows.
          </p>
        </motion.div>
      </div>

      <div className="pf-track" ref={trackRef}>
        <div className="pf-track-pad" aria-hidden />
        {/* Full clone laps (not a single card + empty spacer) -- see the
            loop effect above for why: any position the user scrolls to,
            including mid-drag, lands on real card content instead of
            blank space. */}
        {loopEnabled && products.length > 1 && products.map((p, i) => (
          <ProductCard
            key={`clone-before-${p.key}`}
            product={p}
            index={i - products.length}
            videoOk={videoStatus[p.key] === "ok"}
            clone="before"
          />
        ))}
        {products.map((p, i) => (
          <ProductCard key={p.key} product={p} index={i} videoOk={videoStatus[p.key] === "ok"} />
        ))}
        {loopEnabled && products.length > 1 && products.map((p, i) => (
          <ProductCard
            key={`clone-after-${p.key}`}
            product={p}
            index={products.length + i}
            videoOk={videoStatus[p.key] === "ok"}
            // Only the first card of this lap needs the distinct "after"
            // marker -- it's the one the loop effect looks up to measure
            // one full lap's width. The rest just need SOME data-pf-clone
            // value so they're excluded from the ":not([data-pf-clone])"
            // real-card selector, same as the "before" lap.
            clone={i === 0 ? "after" : "clone"}
          />
        ))}
        <div className="pf-track-pad" aria-hidden />
      </div>

      <div className="pf-nav">
        <button className="pf-nav-btn" onClick={() => scrollByCard(-1)} aria-label="Previous products">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button className="pf-nav-btn" onClick={() => scrollByCard(1)} aria-label="Next products">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3 11 8l-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      {/* Category now lives here as a real filter, not a per-card tag --
          switching it re-renders the track with only matching products,
          so it costs a click instead of a corner of every card. */}
      <div className="pf-filters" role="tablist" aria-label="Filter products by category">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            role="tab"
            aria-selected={filter === f.key}
            className={`pf-filter${filter === f.key ? " active" : ""}`}
            onClick={() => setFilterAndReset(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>
    </section>
  );
}
