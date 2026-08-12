"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Topbar } from "@/components/hero/Topbar";
import { GetStartedModal } from "@/components/shared/GetStartedModal";
import {
  Check,
  SyncIc,
  ArrowRt,
} from "@/components/sections/shared";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

/* animate-in helper using animate (not whileInView) so hero fires immediately */
const floatIn = (delay = 0, x = 0, y = 0) => ({
  initial: { opacity: 0, x, y },
  animate: { opacity: 1, x: 0, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

/* Glossy, iridescent abstract shape bleeding off a card's corner — used
   by the "What Guides Every Product" value cards. Three genuinely
   different FORMS (not one shape recolored): a twisting ribbon, a
   rounded liquid drop with a satellite droplet, and a faceted low-poly
   crystal — each with a 3-stop iridescent gradient for a glossy,
   holographic material. */
function OriginBlob({
  stops,
  rotate = 0,
  variant,
}: {
  stops: [string, string, string];
  rotate?: number;
  variant: "crystal" | "ribbon" | "drop" | "orbit" | "arc" | "diamond" | "leaf";
}) {
  const gid = `og-${stops.map((s) => s.replace("#", "")).join("-")}-${variant}`;
  const gradientDefs = (
    <defs>
      <linearGradient id={gid} x1="10%" y1="0%" x2="90%" y2="100%">
        <stop offset="0%" stopColor={stops[0]} />
        <stop offset="55%" stopColor={stops[1]} />
        <stop offset="100%" stopColor={stops[2]} />
      </linearGradient>
      <radialGradient id={`${gid}-sheen`} cx="28%" cy="22%" r="55%">
        <stop offset="0%" stopColor="#fff" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#fff" stopOpacity="0" />
      </radialGradient>
    </defs>
  );

  if (variant === "ribbon") {
    // a thick twisting stroke, rounded caps — reads as flow/motion,
    // structurally unlike a filled blob
    return (
      <svg width="160" height="130" viewBox="0 0 160 130" aria-hidden style={{ transform: `rotate(${rotate}deg)` }}>
        {gradientDefs}
        <path
          d="M14 108C34 72 20 44 46 30C72 16 88 44 78 66C68 88 96 92 116 74C132 60 138 38 132 18"
          fill="none"
          stroke={`url(#${gid})`}
          strokeWidth="26"
          strokeLinecap="round"
        />
        <path
          d="M14 108C34 72 20 44 46 30C72 16 88 44 78 66C68 88 96 92 116 74C132 60 138 38 132 18"
          fill="none"
          stroke={`url(#${gid}-sheen)`}
          strokeWidth="26"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
    );
  }

  if (variant === "drop") {
    // a rounded liquid drop, plus a small satellite drop — scattered
    // "multiple places", built from smooth curves only (no hard angles)
    const d = "M78 14C104 14 128 42 124 74C120 108 92 132 62 126C32 120 10 92 16 62C22 32 52 14 78 14Z";
    return (
      <svg width="150" height="150" viewBox="0 0 150 150" aria-hidden style={{ transform: `rotate(${rotate}deg)` }}>
        {gradientDefs}
        <path d={d} fill={`url(#${gid})`} />
        <path d={d} fill={`url(#${gid}-sheen)`} opacity="0.4" />
        <circle cx="30" cy="120" r="16" fill={`url(#${gid})`} opacity="0.9" />
      </svg>
    );
  }

  if (variant === "orbit") {
    // a hollow ring with a small satellite circle riding on it — an open,
    // circular silhouette unlike any filled or stroked-line shape above
    return (
      <svg width="150" height="150" viewBox="0 0 150 150" aria-hidden style={{ transform: `rotate(${rotate}deg)` }}>
        {gradientDefs}
        <circle cx="75" cy="75" r="46" fill="none" stroke={`url(#${gid})`} strokeWidth="16" />
        <circle cx="75" cy="75" r="46" fill="none" stroke={`url(#${gid}-sheen)`} strokeWidth="16" opacity="0.4" />
        <circle cx="121" cy="75" r="15" fill={`url(#${gid})`} />
      </svg>
    );
  }

  if (variant === "arc") {
    // a thick, open three-quarter arc with rounded caps — a partial
    // circle, distinct from orbit's closed ring and ribbon's S-curve
    return (
      <svg width="150" height="150" viewBox="0 0 150 150" aria-hidden style={{ transform: `rotate(${rotate}deg)` }}>
        {gradientDefs}
        <path d="M113 38A50 50 0 1 1 38 113" fill="none" stroke={`url(#${gid})`} strokeWidth="22" strokeLinecap="round" />
        <path d="M113 38A50 50 0 1 1 38 113" fill="none" stroke={`url(#${gid}-sheen)`} strokeWidth="22" strokeLinecap="round" opacity="0.45" />
      </svg>
    );
  }

  if (variant === "diamond") {
    // a faceted 4-point rhombus (hard angles, but a taller, narrower
    // silhouette than the 6-point "crystal" hexagon used elsewhere)
    return (
      <svg width="150" height="150" viewBox="0 0 150 150" aria-hidden style={{ transform: `rotate(${rotate}deg)` }}>
        {gradientDefs}
        <polygon points="75,8 142,75 75,142 8,75" fill={`url(#${gid})`} />
        <polygon points="75,8 142,75 75,75" fill="#fff" opacity="0.2" />
        <polygon points="75,142 8,75 75,75" fill="#000" opacity="0.08" />
        <polygon points="75,8 142,75 75,142 8,75" fill={`url(#${gid}-sheen)`} opacity="0.3" />
      </svg>
    );
  }

  if (variant === "leaf") {
    // a pointed vesica/leaf shape (tapered top and bottom, wide middle)
    // — a fourth silhouette for "What Guides Every Product" so its 7
    // cards don't have to repeat crystal/ribbon/drop as often
    const d = "M75 8C112 40 112 110 75 142C38 110 38 40 75 8Z";
    return (
      <svg width="150" height="150" viewBox="0 0 150 150" aria-hidden style={{ transform: `rotate(${rotate}deg)` }}>
        {gradientDefs}
        <path d={d} fill={`url(#${gid})`} />
        <path d={d} fill={`url(#${gid}-sheen)`} opacity="0.4" />
      </svg>
    );
  }

  // "crystal" — a faceted low-poly polygon (hard straight edges), with
  // internal facet lines catching light differently, unlike the smooth
  // organic curves of the other two variants
  return (
    <svg width="150" height="150" viewBox="0 0 150 150" aria-hidden style={{ transform: `rotate(${rotate}deg)` }}>
      {gradientDefs}
      <polygon points="78,10 132,46 122,112 62,140 16,98 26,42" fill={`url(#${gid})`} />
      <polygon points="78,10 132,46 78,78 26,42" fill="#fff" opacity="0.18" />
      <polygon points="78,78 132,46 122,112 62,140" fill="#000" opacity="0.08" />
      <polygon points="78,10 132,46 122,112 62,140 16,98 26,42" fill={`url(#${gid}-sheen)`} opacity="0.3" />
    </svg>
  );
}


const eyebrowStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "6px 14px",
  borderRadius: 999,
  background: "rgba(71,71,224,0.08)",
  color: "var(--interactive)",
  fontFamily: "var(--font-display)",
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
};

/* A small status-card floating around the hero photo — same visual
   language as the product-activity badges used on the home page's Teams
   section, so the hero reads as "the product, in someone's hands"
   instead of another logo row. */
function HeroStatCard({
  icon,
  iconColor,
  iconBg,
  title,
  status,
  statusColor,
  bar,
  delay,
  style,
}: {
  icon: React.ReactNode;
  iconColor: string;
  iconBg: string;
  title: string;
  status: string;
  statusColor: string;
  bar?: number;
  delay: number;
  style: React.CSSProperties;
}) {
  return (
    <motion.div
      {...floatIn(delay, 0, 14)}
      style={{
        position: "absolute",
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: "14px 18px",
        borderRadius: 18,
        background: "#fff",
        boxShadow: "0 22px 44px -20px rgba(31,36,48,0.26), 0 0 0 1px rgba(31,36,48,0.05)",
        minWidth: 172,
        ...style,
      }}
    >
      <span
        style={{
          width: 38, height: 38, borderRadius: "50%", background: iconBg, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center", color: iconColor,
        }}
      >
        {icon}
      </span>
      <div style={{ flex: 1, minWidth: 0, paddingTop: 1 }}>
        <div style={{ fontSize: 13.5, fontWeight: 700, color: "#1F2430", whiteSpace: "nowrap" }}>{title}</div>
        <div style={{ fontSize: 12, fontWeight: 600, color: statusColor, marginTop: 3, whiteSpace: "nowrap" }}>{status}</div>
        {bar !== undefined && (
          <div style={{ marginTop: 9, height: 5, borderRadius: 999, background: "rgba(31,36,48,0.08)", overflow: "hidden" }}>
            <div style={{ width: `${bar}%`, height: "100%", borderRadius: 999, background: statusColor }} />
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* Hero visual: a real photo in a soft-edged circle, with a few product
   status cards floating around it — the "someone using EVOQ" moment,
   instead of an abstract icon composition. */
function HeroVisual() {
  return (
    <motion.div
      {...floatIn(0.15, 30, 0)}
      style={{ position: "relative", width: "100%", maxWidth: 440, margin: "0 auto" }}
    >
      <div
        style={{
          position: "absolute",
          inset: "4%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(71,71,224,0.24) 0%, rgba(124,111,224,0.1) 55%, transparent 75%)",
          filter: "blur(4px)",
        }}
      />
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "1 / 1",
          borderRadius: "50%",
          overflow: "hidden",
          boxShadow: "0 0 0 10px rgba(255,255,255,0.6), 0 34px 70px -26px rgba(71,71,224,0.42)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/about/hero-portrait.jpg"
          alt="A person using EVOQ on their phone"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <HeroStatCard
        icon={<span style={{ fontSize: 16, fontWeight: 800 }}>$</span>}
        iconColor="#2554EB" iconBg="rgba(37,84,235,0.12)"
        title="Deal Won" status="+$12.4K" statusColor="#0E9F6E" bar={78}
        delay={0.35} style={{ top: "2%", left: "-6%" }}
      />
      <HeroStatCard
        icon={<Check size={16} color="#0E8C82" />}
        iconColor="#0E8C82" iconBg="rgba(14,140,130,0.12)"
        title="Ticket Resolved" status="Closed in 4m" statusColor="#0E8C82"
        delay={0.5} style={{ top: "44%", right: "-6%" }}
      />
      <HeroStatCard
        icon={<SyncIc size={16} color="#1F7A4D" />}
        iconColor="#1F7A4D" iconBg="rgba(31,122,77,0.12)"
        title="All Systems" status="Connected" statusColor="#1F7A4D"
        delay={0.65} style={{ bottom: "0%", left: "0%" }}
      />
    </motion.div>
  );
}

/* ── "What Drives Us" — plain colored cards, still no illustration or
   icon tiles or numerals; just a label, a big statement line, and the
   keyword row as plain text separated by dashes. ── */
function DriveColumn({
  label,
  title,
  points,
  bg,
  delay,
}: {
  label: string;
  title: string;
  points: string[];
  bg: string;
  delay: number;
}) {
  return (
    <motion.div {...fadeUp(delay)} className="s-drive-card" style={{ background: bg }}>
      <div style={{ position: "relative", zIndex: 1 }}>
        <span
          style={{
            fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 700,
            letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(31,36,48,0.6)",
          }}
        >
          {label}
        </span>
        <p
          style={{
            fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700,
            lineHeight: 1.35, letterSpacing: "-0.01em", color: "#1F2430",
            margin: "16px 0 0", maxWidth: 420,
          }}
        >
          {title}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, marginTop: 28 }}>
          {points.map((p, i) => (
            <span key={p} style={{ display: "inline-flex", alignItems: "center" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 13.5, fontWeight: 700, color: "#1F2430" }}>
                {p}
              </span>
              {i < points.length - 1 && (
                <span style={{ margin: "0 10px", color: "rgba(31,36,48,0.28)", fontWeight: 700 }}>—</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* a distinct geometric glyph per value card — deliberately varied in form
   (arcs, stack, facets, bars, shield, burst, links) so no two cards repeat,
   and none re-use the sphere language of the Mission/Vision cards */
/* plain values — no color fills, no glyphs; just a number, a title, and
   one line of body copy on a bordered white card */
const CORE_VALUES = [
  { n: "01", title: "Customer Success", body: "We succeed when our customers do.", stops: ["#A78BFA", "#7C6FE0", "#2554EB"] as [string, string, string], rotate: 0, variant: "crystal" as const },
  { n: "02", title: "Ownership", body: "We take responsibility from idea to outcome.", stops: ["#5CC8F2", "#2554EB", "#0E8C82"] as [string, string, string], rotate: 10, variant: "ribbon" as const },
  { n: "03", title: "Excellence", body: "Quality isn't a milestone. It's the standard.", stops: ["#6EE7C8", "#0E8C82", "#1F7A4D"] as [string, string, string], rotate: 0, variant: "drop" as const },
  { n: "04", title: "Continuous Learning", body: "Every release is an opportunity to improve.", stops: ["#FBBF7A", "#F5A123", "#C2410C"] as [string, string, string], rotate: -8, variant: "leaf" as const },
  { n: "05", title: "Trust & Integrity", body: "Built on transparency, security, and responsible innovation.", stops: ["#60A5FA", "#2554EB", "#000099"] as [string, string, string], rotate: 6, variant: "crystal" as const },
  { n: "06", title: "Purposeful Innovation", body: "New ideas should solve real problems.", stops: ["#F0A8C4", "#E1567C", "#7C2D53"] as [string, string, string], rotate: 0, variant: "drop" as const },
  { n: "07", title: "One Team", body: "Better products come from better collaboration.", stops: ["#67E8F9", "#2F89AE", "#184A63"] as [string, string, string], rotate: 4, variant: "leaf" as const },
];

/* "How We Build" — two tabs (Product Principles / Design Principles),
   each rendered as a hover accordion (reference-style): rows collapse to
   a large title, the hovered/active row expands to reveal its body copy,
   and an art panel on the right crossfades to that row's own blob. Uses
   orbit/arc/diamond shapes — deliberately NOT crystal/ribbon/drop, which
   already belong to "What Guides Every Product" directly above this
   section, so the two don't look like the same component reused. */
const PRODUCT_PRINCIPLES = [
  {
    n: "01", title: "Purpose over excess.",
    body: "Every feature should have a clear reason to exist.",
    stops: ["#A78BFA", "#7C6FE0", "#2554EB"] as [string, string, string], variant: "orbit" as const,
  },
  {
    n: "02", title: "Clarity over complexity.",
    body: "Products should make work easier to understand and accomplish.",
    stops: ["#5CC8F2", "#2554EB", "#0E8C82"] as [string, string, string], variant: "arc" as const,
  },
  {
    n: "03", title: "Useful by default.",
    body: "Focus on what people actually need, rather than adding capability for its own sake.",
    stops: ["#6EE7C8", "#0E8C82", "#1F7A4D"] as [string, string, string], variant: "diamond" as const,
  },
  {
    n: "04", title: "Evolve with the work.",
    body: "Products should improve as the needs of the people using them change.",
    stops: ["#FBBF7A", "#F5A123", "#C2410C"] as [string, string, string], variant: "orbit" as const,
  },
];

const DESIGN_PRINCIPLES = [
  {
    n: "01", title: "Consistency builds confidence.",
    body: "Different products can have their own character while still feeling like they belong together.",
    stops: ["#60A5FA", "#2554EB", "#000099"] as [string, string, string], variant: "arc" as const,
  },
  {
    n: "02", title: "Design should serve the work.",
    body: "Technology should adapt to people, not the other way around.",
    stops: ["#F0A8C4", "#E1567C", "#7C2D53"] as [string, string, string], variant: "diamond" as const,
  },
  {
    n: "03", title: "Make the important things obvious.",
    body: "The interface should guide attention without getting in the way.",
    stops: ["#67E8F9", "#2F89AE", "#184A63"] as [string, string, string], variant: "orbit" as const,
  },
  {
    n: "04", title: "Keep interactions purposeful.",
    body: "Every interaction should feel intentional, predictable and useful.",
    stops: ["#A78BFA", "#6D4FEB", "#2554EB"] as [string, string, string], variant: "arc" as const,
  },
];

type Principle = { n: string; title: string; body: string; stops: [string, string, string]; variant: "orbit" | "arc" | "diamond" };

function PrinciplesAccordion({ items }: { items: Principle[] }) {
  const [active, setActive] = useState(0);
  useEffect(() => { setActive(0); }, [items]);
  const current = items[active];
  return (
    <div className="s-principles-accordion">
      <div>
        {items.map((pr, i) => {
          const isActive = i === active;
          return (
            <div
              key={pr.title}
              className={`s-principle-row-acc${isActive ? " active" : ""}`}
              onMouseEnter={() => setActive(i)}
            >
              <div className="s-principle-row-acc-head">
                <span className="s-principle-num">{pr.n}</span>
                <h4 className="s-principle-title-acc">{pr.title}</h4>
              </div>
              <div className="s-principle-row-acc-body-wrap">
                <div className="s-principle-row-acc-body-inner">
                  <p className="s-principle-body">{pr.body}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="s-principle-art-panel">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{ transform: "scale(1.5)" }}
          >
            <OriginBlob stops={current.stops} rotate={0} variant={current.variant} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

const PRINCIPLE_TABS = [
  { key: "product", label: "Product Principles", items: PRODUCT_PRINCIPLES },
  { key: "design", label: "Design Principles", items: DESIGN_PRINCIPLES },
];

function PrinciplesTabs() {
  const [tab, setTab] = useState(0);
  return (
    <div>
      <div className="s-principles-tabs" role="tablist">
        {PRINCIPLE_TABS.map((t, i) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={tab === i}
            className={`s-principles-tab${tab === i ? " active" : ""}`}
            onClick={() => setTab(i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <PrinciplesAccordion items={PRINCIPLE_TABS[tab].items} />
    </div>
  );
}

/* Real product logos, grouped by category, no names or descriptions —
   the logos themselves carry the section (per explicit instruction: the
   visual should show EVOQ's evolution from a few focused apps into a
   full suite, not repeat the text index already on the page). Full
   wordmark lockups (not the square icon-only crop ProductBadge uses
   elsewhere), each its own card — matches the "full logo" reference. */
const FULL_LOGO_SRC: Record<string, string> = {
  crm: "/logos/crm.png",
  campaigns: "/logos/campaigns.png",
  serviceops: "/logos/ServiceOps.png",
  desk: "/logos/desk.png",
  projects: "/logos/projects.png",
  sync: "/logos/sync.png",
  hrms: "/logos/hrms.png",
  skillberry: "/logos/skillberry.png",
};

// hrms.png / skillberry.png render their wordmark in white — invisible
// on a white card, so those two specifically need a dark backdrop.
const LOGO_CARD_DARK_BG: Record<string, string> = {
  hrms: "#1F2430",
  skillberry: "#1F2430",
};

const PRODUCT_GROUPS = [
  { name: "Growth", color: "#2554EB", products: ["crm", "campaigns"] },
  { name: "Operations", color: "#0E8C82", products: ["serviceops", "desk", "projects", "sync"] },
  { name: "People", color: "#1F7A4D", products: ["hrms", "skillberry"] },
];

/* A timeline row inside the evolution panel: a dot + connecting line on
   the left (a through-line runs top to bottom of the panel, unbroken —
   see .s-evo-line), category label and full-logo cards on the right.
   Reads as one continuous growth path rather than three unrelated
   floating groups. */
function ProductLogoGroup({
  name, color, products, delay, isLast,
}: {
  name: string; color: string; products: string[]; delay: number; isLast: boolean;
}) {
  return (
    <motion.div {...fadeUp(delay)} className="s-evo-row">
      <div className="s-evo-row-marker">
        <span className="s-evo-dot" style={{ background: color, boxShadow: `0 0 0 4px ${color}22` }} />
        {!isLast && <span className="s-evo-line" />}
      </div>
      <div className={`s-evo-row-content${isLast ? " last" : ""}`}>
        <span className="s-evo-row-label">{name}</span>
        <div className="s-evo-row-logos">
          {products.map((key) => (
            <Link
              key={key}
              href="#"
              className="s-evo-logo-card"
              style={LOGO_CARD_DARK_BG[key] ? { background: LOGO_CARD_DARK_BG[key] } : undefined}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={FULL_LOGO_SRC[key]} alt="" style={{ height: 22, width: "auto", display: "block" }} />
              <span className="s-evo-logo-card-arrow">
                <ArrowRt size={11} color={LOGO_CARD_DARK_BG[key] ? "#fff" : "var(--interactive)"} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function AboutPage() {
  const [showGetStarted, setShowGetStarted] = useState(false);

  return (
    <div className="why-evoq-page">
      {/* ── Section 1: Hero ── */}
      <section className="s-why-hero about-hero">
        {/* User-supplied soft gradient wash, replacing the flat radial
            layers used on the other .s-why-hero pages — kept local to
            this page via the about-hero class, not the shared class. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(/about/hero-bg-gradient.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(rgba(71,71,224,0.12) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            pointerEvents: "none",
            zIndex: 0,
            opacity: 0.4,
          }}
        />

        {/* Topbar lives inside the hero (same pattern as the home page's
            HeroSection) so the gradient background runs underneath it
            instead of the header sitting on its own flat-color bar. */}
        <div style={{ position: "relative", zIndex: 3 }}>
          <Topbar darkCTA={false} constrained light />
        </div>

        <div className="about-hero-grid">
          <div className="about-hero-copy">
            <motion.div {...fadeUp(0)} style={{ ...eyebrowStyle, marginBottom: 20 }}>
              About EVOQ
            </motion.div>
            <motion.h1 {...fadeUp(0.07)} className="evoq-h2 why-h1" style={{ marginBottom: 20 }}>
              Building <span className="accent">better ways</span> to work.
            </motion.h1>
            <motion.p {...fadeUp(0.14)} className="evoq-sub">
              Business moves faster when people, processes, and information work
              together. EVOQ helps organizations simplify operations, automate
              everyday work, and stay focused on what matters most.
            </motion.p>
          </div>

          <HeroVisual />
        </div>
      </section>

      {/* ── Section 2: Where it started (origin story) ── */}
      <section className="s-origin">
        <div className="s-origin-inner">
          <motion.h2 {...fadeUp(0.05)} className="evoq-h2" style={{ textAlign: "left", marginTop: 0 }}>
            Where it started<span className="accent">.</span>
          </motion.h2>

          <motion.p
            {...fadeUp(0.1)}
            style={{
              fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 19,
              color: "var(--interactive)", margin: "10px 0 0",
            }}
          >
            We saw an opportunity to do things differently.
          </motion.p>

          <motion.p {...fadeUp(0.16)} className="evoq-sub" style={{ textAlign: "left", margin: "20px 0 0" }}>
            Over time, businesses accumulated apps for every part of their work.
            Each solved a problem, but together they often created new friction:
            different interfaces, different processes and different places to
            find information.
          </motion.p>

          <motion.p
            {...fadeUp(0.24)}
            style={{
              fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17,
              color: "var(--interactive)", margin: "28px 0 0",
            }}
          >
            We believed the experience could be better.
          </motion.p>

          <motion.p {...fadeUp(0.3)} className="evoq-sub" style={{ textAlign: "left", margin: "16px 0 0" }}>
            So we started rethinking how everyday tools should work; simpler to
            use, easier to navigate and designed with greater consistency.
          </motion.p>

          <motion.p
            {...fadeUp(0.38)}
            style={{
              fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17,
              color: "var(--interactive)", margin: "14px 0 0",
            }}
          >
            That became EVOQ.
          </motion.p>
        </div>
      </section>

      {/* ── Section 3: What Drives Us — Mission & Vision ── */}
      <section className="s-why-flexible">
        <div className="s-why-flexible-inner">
          <motion.div {...fadeUp(0)} className="evoq-section-head" style={{ textAlign: "center" }}>
            <h2 className="evoq-h2">What <span className="accent">Drives Us</span></h2>
          </motion.div>

          <div className="s-drives-grid">
            <DriveColumn
              delay={0.06}
              label="Mission"
              title="Simplify operations, automate work, and make better decisions via an intelligent business platform."
              points={["Simplify", "Automate", "Decide"]}
              bg="#eeeafa"
            />
            <DriveColumn
              delay={0.12}
              label="Vision"
              title="Become the most trusted AI platform that powers how modern businesses work."
              points={["Trusted", "Intelligent", "Connected"]}
              bg="#d5ede0"
            />
          </div>
        </div>
      </section>

      {/* ── Section 4: What Guides Every Product — light, airy value grid ── */}
      <section className="s-why-changes">
        <div className="s-why-changes-inner">
          <motion.div {...fadeUp(0)} className="evoq-section-head" style={{ textAlign: "center" }}>
            <h2 className="evoq-h2">What Guides Every <span className="accent">Product</span></h2>
            <p className="evoq-sub" style={{ margin: "16px auto 0", textAlign: "center" }}>
              Our values shape the way we think, build, and grow.
            </p>
          </motion.div>

          <div className="s-values-grid">
            {CORE_VALUES.map((value, i) => (
              <motion.div key={value.title} {...fadeUp(0.05 + i * 0.06)} className="s-value-card">
                <div className={`s-origin-point-art s-origin-point-art-${value.variant}`}>
                  <OriginBlob stops={value.stops} rotate={value.rotate} variant={value.variant} />
                </div>
                <div className="s-value-num">{value.n}</div>
                <h4 className="s-value-title">{value.title}</h4>
                <p className="s-value-body">{value.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5: From an idea to EVOQ ── */}
      <section className="s-why-stands">
        <div className="s-why-stands-inner">
          <div>
            <motion.div {...fadeUp(0)} style={{ ...eyebrowStyle, marginBottom: 20 }}>
              From an idea to EVOQ
            </motion.div>
            <motion.div {...fadeUp(0.06)} className="evoq-h2" style={{ marginBottom: 16 }}>
              Start with the work. <span className="accent">Build from there.</span>
            </motion.div>
            <motion.p {...fadeUp(0.12)} className="evoq-sub" style={{ marginTop: 0 }}>
              EVOQ began with focused apps solving real problems.
            </motion.p>
            <motion.p {...fadeUp(0.16)} className="evoq-sub" style={{ marginTop: 12 }}>
              Each one was built to do a single job well. As those jobs turned
              out to be connected, so were the products — growing into a
              suite instead of a pile of separate tools. There are more ideas
              to explore, more experiences to rethink, and more ways to make
              everyday work feel better — EVOQ will keep evolving.
            </motion.p>
            <motion.p
              {...fadeUp(0.22)}
              style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17, color: "var(--interactive)", margin: "18px 0 0" }}
            >
              Then the ideas grew.
            </motion.p>
          </div>

          <div>
            <motion.div {...fadeUp(0.1)} className="s-evo-panel">
              <div className="s-evo-panel-glow" />
              {PRODUCT_GROUPS.map((g, i) => (
                <ProductLogoGroup
                  key={g.name} name={g.name} color={g.color} products={g.products}
                  delay={0.14 + i * 0.08} isLast={i === PRODUCT_GROUPS.length - 1}
                />
              ))}
            </motion.div>
            <motion.p
              {...fadeUp(0.4)}
              style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "var(--interactive)", marginTop: 22 }}
            >
              And we&apos;re still building.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── Section 6: How we build (principles, then a forward-looking close) ── */}
      <section className="s-principles">
        <div className="s-principles-inner">
          <motion.div {...fadeUp(0)} className="evoq-section-head" style={{ textAlign: "center" }}>
            <div style={{ ...eyebrowStyle, marginBottom: 20, display: "inline-flex" }}>How We Build</div>
            <h2 className="evoq-h2">Designed around the <span className="accent">work.</span></h2>
            <p className="evoq-sub" style={{ margin: "16px auto 0", textAlign: "center", maxWidth: 640 }}>
              People shouldn&apos;t have to learn the tool before they can get the work done.
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.1)}>
            <PrinciplesTabs />
          </motion.div>
        </div>
      </section>

      {/* ── Section 7: Experience EVOQ (closing CTA) ── */}
      <section style={{ padding: "96px 80px", background: "#fff" }} className="about-foundation-outer">
        <motion.div {...fadeUp(0)} className="about-foundation-card">
          <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.14) 0%, transparent 70%)", top: -160, right: -100, pointerEvents: "none" }} />
          <div style={{ position: "absolute", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)", bottom: -140, left: -80, pointerEvents: "none" }} />

          <h2 className="evoq-h2 dark" style={{ position: "relative", zIndex: 1, marginBottom: 16 }}>
            Experience EVOQ
          </h2>
          <p className="evoq-sub dark" style={{ position: "relative", zIndex: 1, margin: "0 auto", maxWidth: 760 }}>
            See what we&apos;re building, a connected platform that brings
            sales, service, operations, and people tools into one system,
            instead of a dozen disconnected ones.
          </p>

          <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginTop: 28 }}>
            <Link
              href="/why-evoq"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10, padding: "13px 28px",
                borderRadius: 999, border: 0,
                background: "#fff", color: "var(--interactive)",
                fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, textDecoration: "none",
                transition: "transform 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Explore EVOQ
            </Link>
            <button
              type="button"
              onClick={() => setShowGetStarted(true)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 10, padding: "13px 28px",
                borderRadius: 999, border: "1px solid rgba(255,255,255,0.4)", cursor: "pointer",
                background: "transparent", color: "#fff",
                fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700,
                transition: "border-color 0.15s, transform 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#fff"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Get Started
            </button>
          </div>
        </motion.div>
      </section>

      <GetStartedModal isOpen={showGetStarted} onClose={() => setShowGetStarted(false)} />
    </div>
  );
}
