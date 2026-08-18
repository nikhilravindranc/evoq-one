"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, type Easing } from "framer-motion";
import { Eyebrow } from "./shared";

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

/* Two card styles, deliberately alternated one-for-one down the list
 * (see PRODUCTS order) rather than randomised or clustered:
 *  - "window": an app screenshot in browser chrome -- for products
 *    that are fundamentally "a tool you log into and work a list/board
 *    in" (CRM, ServiceOps, Projects, Inventory, HRMS).
 *  - "editorial": full-bleed gradient + a pattern that echoes what the
 *    product actually does (Sync's is literally its own connection
 *    diagram, scaled up) + one big icon + a floating stat chip -- our
 *    stand-in for "a real photo with a small UI card on top" since
 *    there's no product photography to use (no image-gen tool
 *    available here either -- see prior conversation).
 * A strict W/E/W/E alternation is what keeps the scroll from reading
 * as one template repeated ten times.
 */
type Visual =
  | { kind: "list"; rows: { label: string; tag: string }[] }
  | { kind: "kanban"; cols: { label: string; count: number; color: string }[] }
  | { kind: "stat"; value: string; label: string; bars: number[] };

type Editorial = {
  gradient: [string, string];
  pattern: "orbit" | "dots" | "grid" | "rings";
  icon: (props: { size: number }) => React.ReactElement;
  chip: string;
  orbitNodes?: string[];
};

type Product = {
  key: string;
  name: string;
  category: Category;
  desc: string;
  style: "window" | "editorial";
  visual?: Visual;
  editorial?: Editorial;
  /* Every product points at /videos/products/{key}.mp4 whether or not
     the file exists yet -- HEAD-checked on mount (same pattern as the
     hero video swap) so a card silently upgrades from its mockup to a
     real clip the moment the file lands, no code change required. */
  video: string;
};

/* -- small icon set for editorial cards -- */
const IcMegaphone = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M3 10v4a1 1 0 0 0 1 1h2l1 5h2l-1-5h1l9 4V6l-9 4H4a1 1 0 0 0-1 1Z" fill="#fff" fillOpacity="0.92"/><path d="M19 8.5a4 4 0 0 1 0 7" stroke="#fff" strokeOpacity="0.7" strokeWidth="1.8" strokeLinecap="round"/></svg>
);
const IcHeadset = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M4 13v-1a8 8 0 0 1 16 0v1" stroke="#fff" strokeOpacity="0.92" strokeWidth="1.9" strokeLinecap="round"/><rect x="3" y="13" width="4.5" height="6.5" rx="1.8" fill="#fff" fillOpacity="0.92"/><rect x="16.5" y="13" width="4.5" height="6.5" rx="1.8" fill="#fff" fillOpacity="0.92"/><path d="M19.5 19.5v1a3 3 0 0 1-3 3h-2.5" stroke="#fff" strokeOpacity="0.7" strokeWidth="1.8" strokeLinecap="round"/></svg>
);
const IcInvoice = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><rect x="5" y="2.5" width="14" height="19" rx="2" fill="#fff" fillOpacity="0.92"/><path d="M8.5 8h7M8.5 12h7M8.5 16h4.5" stroke="#4B32B8" strokeWidth="1.6" strokeLinecap="round"/></svg>
);
const IcTrophy = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M7 4h10v6a5 5 0 0 1-10 0V4Z" fill="#fff" fillOpacity="0.92"/><path d="M7 5H4v2a4 4 0 0 0 3.4 4M17 5h3v2a4 4 0 0 1-3.4 4" stroke="#fff" strokeOpacity="0.75" strokeWidth="1.7" strokeLinecap="round"/><path d="M12 15v3M9 21h6M9.5 21c0-1.7.9-2.7 2.5-3 1.6.3 2.5 1.3 2.5 3" stroke="#fff" strokeOpacity="0.92" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
);
const IcSync = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M4 12a8 8 0 0 1 13.6-5.7M20 12a8 8 0 0 1-13.6 5.7" stroke="#fff" strokeOpacity="0.92" strokeWidth="1.9" strokeLinecap="round"/><path d="M17.6 3.8v3h-3M6.4 20.2v-3h3" stroke="#fff" strokeOpacity="0.92" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

const PRODUCTS: Product[] = ([
  {
    key: "crm", name: "CRM", category: "growth", style: "window",
    desc: "Manage leads, contacts and deals from first touch to closed-won.",
    visual: { kind: "list", rows: [
      { label: "Acme Corp", tag: "Won" },
      { label: "Nova Retail", tag: "Negotiation" },
      { label: "BrightPath", tag: "Proposal" },
    ] },
  },
  {
    key: "campaigns", name: "Campaigns", category: "growth", style: "editorial",
    desc: "Turn customer data into campaigns that actually convert.",
    editorial: { gradient: ["#8B7CF6", "#4F3FAE"], pattern: "rings", icon: IcMegaphone, chip: "312 opened · 48 clicked" },
  },
  {
    key: "serviceops", name: "ServiceOps", category: "operations", style: "window",
    desc: "Plan, schedule and dispatch field service work with less back-and-forth.",
    visual: { kind: "kanban", cols: [
      { label: "Queued", count: 4, color: "#94A3B8" },
      { label: "En Route", count: 2, color: "#F5A123" },
      { label: "Done", count: 9, color: "#0E9F6E" },
    ] },
  },
  {
    key: "desk", name: "Desk", category: "operations", style: "editorial",
    desc: "The support essentials your team already reaches for, every day.",
    editorial: { gradient: ["#5EA6F0", "#2C63B0"], pattern: "dots", icon: IcHeadset, chip: "24 tickets resolved today" },
  },
  {
    key: "projects", name: "Projects", category: "operations", style: "window",
    desc: "Plan the work, track progress, and ship with confidence.",
    visual: { kind: "kanban", cols: [
      { label: "To Do", count: 5, color: "#94A3B8" },
      { label: "Doing", count: 3, color: "#2554EB" },
      { label: "Shipped", count: 11, color: "#0E9F6E" },
    ] },
  },
  {
    key: "sync", name: "Sync", category: "operations", style: "editorial",
    desc: "Keep data moving between EVOQ and the tools you already use.",
    editorial: { gradient: ["#34D1A6", "#0E9F6E"], pattern: "orbit", icon: IcSync, chip: "4 apps connected", orbitNodes: ["CRM", "Sheets", "Slack", "ERP"] },
  },
  {
    key: "inventory", name: "Inventory", category: "operations", style: "window",
    desc: "Track stock, movements and reorder points across every location.",
    visual: { kind: "stat", value: "1,204", label: "units in stock", bars: [40, 65, 50, 80, 60, 90] },
  },
  {
    key: "billing", name: "Billing", category: "operations", style: "editorial",
    desc: "Raise invoices, collect payments and reconcile accounts automatically.",
    editorial: { gradient: ["#6D4FEB", "#4B32B8"], pattern: "grid", icon: IcInvoice, chip: "$24.8K collected this month" },
  },
  {
    key: "hrms", name: "HRMS", category: "people", style: "window",
    desc: "Employee records, time and leave, handled without the spreadsheets.",
    visual: { kind: "list", rows: [
      { label: "Priya S.", tag: "On leave" },
      { label: "Daniel K.", tag: "Active" },
      { label: "Maria G.", tag: "Active" },
    ] },
  },
  {
    key: "skillberry", name: "Skillberry", category: "people", style: "editorial",
    desc: "Help your people learn, grow and build the skills your business needs next.",
    editorial: { gradient: ["#3BAE82", "#21815A"], pattern: "dots", icon: IcTrophy, chip: "86% course completion" },
  },
] as Omit<Product, "video">[]).map((p) => ({ ...p, video: `/videos/products/${p.key}.mp4` }));

/* -- window-style mini illustrations -------------------------------- */

function VisualList({ rows, ink }: { rows: { label: string; tag: string }[]; ink: string }) {
  return (
    <div className="pf-mock pf-mock-list">
      {rows.map((r) => (
        <div className="pf-mock-row" key={r.label}>
          <span className="pf-mock-dot" style={{ background: ink }} />
          <span className="pf-mock-row-label">{r.label}</span>
          <span className="pf-mock-pill" style={{ color: ink, background: `${ink}1A` }}>{r.tag}</span>
        </div>
      ))}
    </div>
  );
}

function VisualKanban({ cols }: { cols: { label: string; count: number; color: string }[] }) {
  return (
    <div className="pf-mock pf-mock-kanban">
      {cols.map((c) => (
        <div className="pf-kanban-col" key={c.label}>
          <span className="pf-kanban-bar" style={{ background: c.color }} />
          <span className="pf-kanban-count">{c.count}</span>
          <span className="pf-kanban-label">{c.label}</span>
        </div>
      ))}
    </div>
  );
}

function VisualStat({ value, label, bars, ink }: { value: string; label: string; bars: number[]; ink: string }) {
  return (
    <div className="pf-mock pf-mock-stat">
      <div className="pf-stat-value">{value}</div>
      <div className="pf-stat-label">{label}</div>
      <div className="pf-stat-bars">
        {bars.map((h, i) => (
          <span key={i} className="pf-stat-bar" style={{ height: `${h}%`, background: ink, opacity: 0.35 + (i / bars.length) * 0.65 }} />
        ))}
      </div>
    </div>
  );
}

function WindowVisual({ visual, ink }: { visual: Visual; ink: string }) {
  switch (visual.kind) {
    case "list": return <VisualList rows={visual.rows} ink={ink} />;
    case "kanban": return <VisualKanban cols={visual.cols} />;
    case "stat": return <VisualStat value={visual.value} label={visual.label} bars={visual.bars} ink={ink} />;
  }
}

/* A filled cursor arrow with its own tiny drop shadow -- window cards
   only, implying someone's actively in that app. Editorial cards are
   brand/outcome illustrations, not simulated UI, so they skip it. */
function Cursor({ position }: { position: string }) {
  return (
    <svg className={`pf-cursor pf-cursor-${position}`} width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3 2.5 15.5 8.8 9.8 10.3 8 16.2 3 2.5Z" fill="#1F2430" stroke="#fff" strokeWidth="1.1" strokeLinejoin="round" />
    </svg>
  );
}

/* -- editorial-style background patterns ----------------------------- */

function EditorialPattern({ pattern, nodes }: { pattern: Editorial["pattern"]; nodes?: string[] }) {
  if (pattern === "orbit" && nodes) {
    // The one card whose "pattern" is literally its own product diagram,
    // scaled up to fill the card -- Sync's job is connecting systems, so
    // the background *is* a connection diagram rather than a metaphor.
    const r = 92;
    return (
      <svg className="pf-editorial-orbit" viewBox="-120 -120 240 240" aria-hidden focusable="false">
        {nodes.map((_, i) => {
          const a = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
          return <line key={i} x1={0} y1={0} x2={r * Math.cos(a)} y2={r * Math.sin(a)} stroke="#fff" strokeOpacity="0.3" strokeWidth="1.4" />;
        })}
        {nodes.map((n, i) => {
          const a = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
          const x = r * Math.cos(a), y = r * Math.sin(a);
          return (
            <g key={n} transform={`translate(${x} ${y})`}>
              <circle r="22" fill="rgba(255,255,255,0.14)" stroke="#fff" strokeOpacity="0.4" strokeWidth="1.2" />
              <text textAnchor="middle" dy="4" fontSize="10" fontWeight="700" fill="#fff" fillOpacity="0.85">{n.slice(0, 4)}</text>
            </g>
          );
        })}
      </svg>
    );
  }
  if (pattern === "dots") {
    return <div className="pf-editorial-pattern pf-editorial-dots" aria-hidden />;
  }
  if (pattern === "grid") {
    return <div className="pf-editorial-pattern pf-editorial-grid" aria-hidden />;
  }
  return <div className="pf-editorial-pattern pf-editorial-rings" aria-hidden />;
}

function EditorialCard({ editorial }: { editorial: Editorial }) {
  const Icon = editorial.icon;
  return (
    <div
      className="pf-editorial"
      style={{ background: `linear-gradient(150deg, ${editorial.gradient[0]} 0%, ${editorial.gradient[1]} 100%)` }}
    >
      <EditorialPattern pattern={editorial.pattern} nodes={editorial.orbitNodes} />
      {editorial.pattern !== "orbit" && (
        <span className="pf-editorial-icon">
          <Icon size={30} />
        </span>
      )}
      <span className="pf-editorial-chip">{editorial.chip}</span>
    </div>
  );
}

/* -- card + carousel ------------------------------------------------ */

const CURSOR_POS = ["top-right", "bottom-left", "top-left", "bottom-right"] as const;

function ProductCard({
  product, index, videoOk,
}: { product: Product; index: number; videoOk: boolean }) {
  const meta = CATEGORY_META[product.category];
  const cursorPos = CURSOR_POS[index % CURSOR_POS.length];

  return (
    // rotate/lift are NOT set here -- they're written directly onto this
    // node's style by the scroll-driven arc effect in SectionPlatform
    // (see updateArc), recomputed every scroll frame from the card's
    // actual position, not a fixed per-index value. That's what makes
    // cards near the middle of the viewport ride high and cards near
    // the edges droop, tracking the scroll instead of staying fixed to
    // whichever card happened to be 3rd in the list.
    //
    // The transform still lives on this plain <a>, not on the motion
    // element below -- Framer writes its own inline `transform` once
    // the fade-in settles, silently overwriting a CSS transform on the
    // same node. Splitting static positioning (this <a>) from animation
    // (the motion.div, opacity/y only) avoids that fight.
    <a href="#" className="pf-card" aria-label={`Explore ${product.name}`}>
      <motion.div
        className="pf-card-inner"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: 0.04 * index, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={`pf-visual${product.style === "window" && !videoOk ? " mat" : ""}`}>
          {videoOk ? (
            <video
              className="pf-visual-video"
              src={product.video}
              autoPlay muted loop playsInline
            />
          ) : product.style === "editorial" && product.editorial ? (
            <EditorialCard editorial={product.editorial} />
          ) : (
            <>
              <div className="pf-window">
                <div className="pf-window-bar">
                  <span className="pf-window-dot" style={{ background: "#F04C4C" }} />
                  <span className="pf-window-dot" style={{ background: "#F5B93F" }} />
                  <span className="pf-window-dot" style={{ background: "#3BAE82" }} />
                  <span className="pf-window-tab">{product.name.toLowerCase()}.evoq.app</span>
                </div>
                <div className="pf-window-body">
                  {product.visual && <WindowVisual visual={product.visual} ink={meta.ink} />}
                </div>
              </div>
              <Cursor position={cursorPos} />
            </>
          )}
        </div>
        <div className="pf-body">
          <div className="pf-name">{product.name}</div>
          <p className="pf-desc">{product.desc}</p>
          <span className="pf-link" style={{ color: meta.ink }}>
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
    const step = card ? card.getBoundingClientRect().width + 24 : 340;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const setFilterAndReset = (key: CategoryFilter) => {
    setFilter(key);
    trackRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  };

  /* -- the arc: card lift/rotate as a function of scroll position -----
   * Recomputed imperatively on every scroll frame (rAF-throttled)
   * rather than through React state -- a state update per scroll tick
   * would re-render all ten cards 60x/sec. Distance of each card's
   * center from the *track's* center (not the window's -- the track
   * can sit anywhere on the page) is normalized to [-1, 1], then run
   * through a cosine falloff: centered cards lift near their max, cards
   * at the visible edges settle back toward the baseline, and rotation
   * leans outward proportionally -- the fanned-hand-of-cards read from
   * the reference, tied to scroll instead of a fixed per-card value. */
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;

    const update = () => {
      const trackRect = track.getBoundingClientRect();
      const centerX = trackRect.left + trackRect.width / 2;
      const half = trackRect.width / 2 || 1;
      track.querySelectorAll<HTMLElement>(".pf-card").forEach((card) => {
        const r = card.getBoundingClientRect();
        const cardCenter = r.left + r.width / 2;
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
        {products.map((p, i) => (
          <ProductCard key={p.key} product={p} index={i} videoOk={videoStatus[p.key] === "ok"} />
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
