"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { GetStartedModal } from "@/components/shared/GetStartedModal";
import { ProductBadge } from "@/components/shared/ProductBadge";
import {
  Person,
  Check,
  Spark,
  Bolt,
  ArrowRt,
  SyncIc,
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

/* small line-icon set matching the reference hero row — not part of the
   shared icon library since these are decorative/generic (chart, people,
   cube, package, cart), not product icons */
const BarChartIcon = ({ size = 20, color = "#fff" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3.5" y="12" width="4" height="8.5" rx="1" fill={color} />
    <rect x="10" y="6.5" width="4" height="14" rx="1" fill={color} />
    <rect x="16.5" y="3" width="4" height="17.5" rx="1" fill={color} />
  </svg>
);
const CubeIcon = ({ size = 20, color = "#fff" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
    <path d="M12 2.5 L20.5 7.25 L20.5 16.75 L12 21.5 L3.5 16.75 L3.5 7.25 Z" />
    <path d="M3.5 7.25 L12 12 L20.5 7.25" />
    <path d="M12 12 L12 21.5" />
  </svg>
);
const PackageIcon = ({ size = 20, color = "#fff" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
    <rect x="3.5" y="7.5" width="17" height="13" rx="1.5" />
    <path d="M3.5 12 H20.5" />
    <path d="M12 7.5 V20.5" />
    <path d="M8 3.5 H16 L18 7.5 H6 Z" />
  </svg>
);
const CartIcon = ({ size = 20, color = "#fff" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9.5" cy="20" r="1.3" fill={color} stroke="none" />
    <circle cx="18" cy="20" r="1.3" fill={color} stroke="none" />
    <path d="M2.5 3h2.2l2.35 12.1a2 2 0 0 0 2 1.65h8.1a2 2 0 0 0 1.97-1.65L20.8 7H6" />
  </svg>
);

/* one small colored tile on the hero icon row */
function OrbitTile({ icon, bg }: { icon: React.ReactNode; bg: string }) {
  return (
    <div
      style={{
        width: 54,
        height: 54,
        borderRadius: 16,
        background: bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 16px 30px -16px rgba(31,36,48,0.4)",
        flexShrink: 0,
      }}
    >
      {icon}
    </div>
  );
}

/* horizontal product icon row — central EVOQ node flanked by flat, evenly
   spaced icon tiles resting on a soft elliptical shadow, matching the
   reference hero exactly */
function OrbitStrip() {
  const left = [
    { icon: <BarChartIcon size={20} />, bg: "#1F2A4A" },
    { icon: <Person size={20} color="#fff" />, bg: "#2F6FE0" },
    { icon: <CubeIcon size={20} />, bg: "#7C6FE0" },
  ];
  const right = [
    { icon: <PackageIcon size={20} />, bg: "#E28A2B" },
    { icon: <SyncIc size={20} color="#fff" />, bg: "#2FA793" },
    { icon: <CartIcon size={20} />, bg: "#1F2A4A" },
  ];
  return (
    <motion.div {...fadeUp(0.26)} style={{ position: "relative", maxWidth: 640, margin: "56px auto 0" }}>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "94%",
          height: 50,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(71,71,224,0.14) 0%, rgba(71,71,224,0) 75%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {left.map((n, i) => <OrbitTile key={`l${i}`} {...n} />)}
        <div
          style={{
            width: 92, height: 92, borderRadius: "50%", background: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 24px 44px -18px rgba(71,71,224,0.45), 0 0 0 6px rgba(255,255,255,0.5)",
            flexShrink: 0,
            padding: 22,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/symbol-color.png" alt="EVOQ" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
        {right.map((n, i) => <OrbitTile key={`r${i}`} {...n} />)}
      </div>
    </motion.div>
  );
}

/* ── "What Drives Us" card — muted fill, labelled icon tiles, and a large
   illustration bleeding off the right edge (reference-style) ── */
function DriveCard({
  bg,
  dark,
  label,
  title,
  chips,
  illustration,
  delay,
}: {
  bg: string;
  dark: boolean;
  label: string;
  title: string;
  chips: { icon: React.ReactNode; label: string; tint: string }[];
  illustration: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      {...fadeUp(delay)}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 30,
        background: bg,
        padding: "34px 32px",
        minHeight: 340,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {illustration}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "58%" }}>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: dark ? "rgba(255,255,255,0.55)" : "var(--muted)",
            marginBottom: 14,
          }}
        >
          {label}
        </div>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 20,
            fontWeight: 700,
            lineHeight: 1.35,
            letterSpacing: "-0.01em",
            color: dark ? "#fff" : "#1F2430",
            margin: 0,
          }}
        >
          {title}
        </p>
      </div>

      <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 14, marginTop: "auto", paddingTop: 32 }}>
        {chips.map((c) => (
          <div key={c.label} style={{ textAlign: "center" }}>
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: 15,
                background: c.tint,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 9,
              }}
            >
              {c.icon}
            </div>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 11,
                fontWeight: 500,
                color: dark ? "rgba(255,255,255,0.6)" : "var(--body-text)",
              }}
            >
              {c.label}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* editorial "stamp" mark — nested rotated rounded squares bleeding off the
   card's top-right corner, with a simple line-art glyph inside. Flat and
   geometric rather than a glowing 3D sphere, so it reads as a considered
   brand mark instead of generic AI-generated art. */
function DriveMark({ icon }: { icon: React.ReactNode }) {
  return (
    <div
      style={{
        position: "absolute",
        top: -36,
        right: -36,
        width: 172,
        height: 172,
        borderRadius: 44,
        background: "rgba(255,255,255,0.05)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: "rotate(12deg)",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: 92,
          height: 92,
          borderRadius: 26,
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: "rotate(-12deg)",
        }}
      >
        {icon}
      </div>
    </div>
  );
}

const CompassGlyph = ({ size = 38 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 38 38" fill="none">
    <circle cx="19" cy="19" r="14.5" stroke="rgba(255,255,255,0.85)" strokeWidth="2" />
    <path d="M24.5 13.5 20.5 20.5 13.5 24.5 17.5 17.5 Z" fill="rgba(255,255,255,0.9)" />
    <circle cx="19" cy="19" r="1.8" fill="#232845" />
  </svg>
);

const FlagGlyph = ({ size = 38 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 38 38" fill="none">
    <path d="M11 6.5V31.5" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" />
    <path d="M11 8 27 12.5 11 19Z" fill="rgba(255,255,255,0.16)" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

/* a distinct geometric glyph per value card — deliberately varied in form
   (arcs, stack, facets, bars, shield, burst, links) so no two cards repeat,
   and none re-use the sphere language of the Mission/Vision cards */
function ValueGlyph({ shape }: { shape: string }) {
  const w = "rgba(255,255,255,0.95)";
  const m = "rgba(255,255,255,0.5)";
  const f = "rgba(255,255,255,0.2)";
  const box = { width: 76, height: 76, viewBox: "0 0 76 76", fill: "none" } as const;

  switch (shape) {
    case "arcs":
      return (
        <svg {...box}>
          <path d="M10 56a28 28 0 0 1 56 0" stroke={f} strokeWidth="5" strokeLinecap="round" />
          <path d="M22 56a16 16 0 0 1 32 0" stroke={m} strokeWidth="5" strokeLinecap="round" />
          <circle cx="38" cy="56" r="5.5" fill={w} />
        </svg>
      );
    case "stack":
      return (
        <svg {...box}>
          <rect x="13" y="46" width="50" height="13" rx="6.5" fill={f} />
          <rect x="17" y="31" width="42" height="13" rx="6.5" fill={m} />
          <rect x="21" y="16" width="34" height="13" rx="6.5" fill={w} />
        </svg>
      );
    case "facets":
      return (
        <svg {...box}>
          <path d="M38 10 64 38 38 66 12 38Z" fill={f} />
          <path d="M38 10 64 38 38 38Z" fill={m} />
          <path d="M38 10 38 38 12 38Z" fill={w} />
        </svg>
      );
    case "bars":
      return (
        <svg {...box}>
          <rect x="11" y="45" width="13" height="20" rx="6" fill={f} />
          <rect x="31" y="32" width="13" height="33" rx="6" fill={m} />
          <rect x="51" y="15" width="13" height="50" rx="6" fill={w} />
        </svg>
      );
    case "shield":
      return (
        <svg {...box}>
          <path d="M38 10 62 19v19c0 15-11 24-24 28-13-4-24-13-24-28V19Z" fill={f} stroke={m} strokeWidth="3" />
          <path d="M27 38.5 35 47l15-16" stroke={w} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "burst":
      return (
        <svg {...box}>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <rect key={a} x="35.5" y="4" width="5" height="14" rx="2.5" fill={a % 90 === 0 ? w : f} transform={`rotate(${a} 38 38)`} />
          ))}
          <circle cx="38" cy="38" r="14" fill={m} />
          <circle cx="33" cy="33" r="5" fill={w} />
        </svg>
      );
    case "links":
    default:
      return (
        <svg {...box}>
          <circle cx="28" cy="38" r="16" stroke={w} strokeWidth="5.5" />
          <circle cx="48" cy="38" r="16" stroke={m} strokeWidth="5.5" />
        </svg>
      );
  }
}

/* centered icon-illustration card used in "The Way We Build" */
function BuildCard({ illustration, title, body, delay }: { illustration: React.ReactNode; title: string; body: string; delay: number }) {
  return (
    <motion.div
      {...fadeUp(delay)}
      style={{
        background: "var(--soft)",
        borderRadius: 22,
        padding: "40px 28px",
        textAlign: "center",
      }}
    >
      {illustration}
      <h4 className="why-h3" style={{ fontSize: 18, marginBottom: 10 }}>{title}</h4>
      <p className="why-body" style={{ fontSize: 14 }}>{body}</p>
    </motion.div>
  );
}

/* rich gradient value cards — each gets its own hue and its own glyph form */
const CORE_VALUES = [
  {
    n: "01",
    title: "Customer Success",
    body: "We succeed when our customers do.",
    shape: "arcs",
    bg: "linear-gradient(158deg, #4C51AE 0%, #262B58 100%)",
  },
  {
    n: "02",
    title: "Ownership",
    body: "We take responsibility from idea to outcome.",
    shape: "stack",
    bg: "linear-gradient(158deg, #2F7F6F 0%, #1A4A45 100%)",
  },
  {
    n: "03",
    title: "Excellence",
    body: "Quality isn't a milestone. It's the standard.",
    shape: "facets",
    bg: "linear-gradient(158deg, #6E51AE 0%, #372A63 100%)",
  },
  {
    n: "04",
    title: "Continuous Learning",
    body: "Every release is an opportunity to improve.",
    shape: "bars",
    bg: "linear-gradient(158deg, #A87833 0%, #5C401B 100%)",
  },
  {
    n: "05",
    title: "Trust & Integrity",
    body: "Built on transparency, security, and responsible innovation.",
    shape: "shield",
    bg: "linear-gradient(158deg, #3062AE 0%, #1B3465 100%)",
  },
  {
    n: "06",
    title: "Purposeful Innovation",
    body: "New ideas should solve real problems.",
    shape: "burst",
    bg: "linear-gradient(158deg, #AB5280 0%, #5C2945 100%)",
  },
  {
    n: "07",
    title: "One Team",
    body: "Better products come from better collaboration.",
    shape: "links",
    bg: "linear-gradient(158deg, #2F89AE 0%, #184A63 100%)",
  },
];

/* the full EVOQ suite as a grid of white product cards, using the real
   product logos (see public/logos/*-icon.png) — each tile links out to the
   platform overview where every product is introduced in full. */
const SUITE_PRODUCTS = [
  { key: "crm", name: "CRM", cat: "Growth" },
  { key: "campaigns", name: "Campaigns", cat: "Growth" },
  { key: "serviceops", name: "ServiceOps", cat: "Operations" },
  { key: "desk", name: "Desk", cat: "Operations" },
  { key: "projects", name: "Projects", cat: "Operations" },
  { key: "sync", name: "Sync", cat: "Operations" },
  { key: "hrms", name: "HRMS", cat: "People" },
  { key: "skillberry", name: "Skillberry", cat: "People" },
];

function SuiteGrid() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      {SUITE_PRODUCTS.map((p, i) => (
        <motion.div key={p.key} {...fadeUp(0.04 + i * 0.045)}>
          <Link
            href="/why-evoq"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "#fff",
              borderRadius: 15,
              padding: "14px 16px",
              boxShadow: "0 10px 24px -16px rgba(31,36,48,0.3), 0 0 0 1px rgba(31,36,48,0.05)",
              transition: "transform 0.18s ease, box-shadow 0.18s ease",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 18px 32px -18px rgba(31,36,48,0.4), 0 0 0 1px rgba(31,36,48,0.07)";
              const arrow = e.currentTarget.querySelector<HTMLElement>(".suite-tile-arrow");
              if (arrow) { arrow.style.opacity = "1"; arrow.style.transform = "translateX(0)"; }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 10px 24px -16px rgba(31,36,48,0.3), 0 0 0 1px rgba(31,36,48,0.05)";
              const arrow = e.currentTarget.querySelector<HTMLElement>(".suite-tile-arrow");
              if (arrow) { arrow.style.opacity = "0"; arrow.style.transform = "translateX(-4px)"; }
            }}
          >
            <ProductBadge productKey={p.key} size={36} />
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 13.5, fontWeight: 700, color: "#1F2430", lineHeight: 1.25 }}>
                {p.name}
              </div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "var(--body-text)" }}>{p.cat}</div>
            </div>
            <span
              className="suite-tile-arrow"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: "var(--soft)",
                flexShrink: 0,
                opacity: 0,
                transform: "translateX(-4px)",
                transition: "opacity 0.18s ease, transform 0.18s ease",
              }}
            >
              <ArrowRt size={11} color="var(--interactive)" />
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

export function AboutPage() {
  const [showGetStarted, setShowGetStarted] = useState(false);

  return (
    <div className="why-evoq-page">
      {/* ── Section 1: Hero ── */}
      <section className="s-why-hero">
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(rgba(71,71,224,0.12) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            pointerEvents: "none",
            zIndex: 0,
            opacity: 0.6,
          }}
        />

        <div className="s-why-hero-center" style={{ maxWidth: 1100 }}>
          <motion.div {...fadeUp(0)} style={{ ...eyebrowStyle, marginBottom: 20 }}>
            About EVOQ
          </motion.div>
          <motion.h1 {...fadeUp(0.07)} className="evoq-h2 why-h1" style={{ marginBottom: 20 }}>
            Building <span className="accent">better ways</span> to work.
          </motion.h1>
          <motion.p
            {...fadeUp(0.14)}
            className="evoq-sub"
            style={{ margin: "0 auto", maxWidth: 640 }}
          >
            Business moves faster when people, processes, and information work
            together. EVOQ helps organizations simplify operations, automate
            everyday work, and stay focused on what matters most.
          </motion.p>
          <motion.div
            {...fadeUp(0.2)}
            style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 32, flexWrap: "wrap" }}
          >
            <button
              type="button"
              onClick={() => setShowGetStarted(true)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 10, padding: "13px 28px",
                borderRadius: 999, border: 0, cursor: "pointer",
                background: "var(--interactive)", color: "#fff",
                fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700,
                boxShadow: "0 8px 28px -8px rgba(71,71,224,0.45)",
                transition: "transform 0.15s, background 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.background = "var(--mid)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "var(--interactive)"; }}
            >
              Get Started
            </button>
            <Link
              href="/"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10, padding: "13px 28px",
                borderRadius: 999, border: "1px solid var(--border)",
                background: "#fff", color: "#1F2430",
                fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700,
                textDecoration: "none", transition: "border-color 0.15s, transform 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--tint)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Explore Products
            </Link>
          </motion.div>

          <OrbitStrip />
        </div>
      </section>

      {/* ── Section 2: The Way We Build ── */}
      <section className="s-platform">
        <div className="s-platform-inner">
          <motion.div {...fadeUp(0)} className="evoq-section-head" style={{ textAlign: "center" }}>
            <h2 className="evoq-h2">The Way We <span className="accent">Build</span></h2>
            <p className="evoq-sub" style={{ margin: "16px auto 0", textAlign: "center" }}>
              Every EVOQ product is built around a simple belief — technology should make work easier.
            </p>
          </motion.div>

          <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
            <BuildCard
              delay={0.06}
              title="Simplicity comes first."
              body="Every product is designed to reduce complexity, so teams spend less time learning systems and more time getting work done."
              illustration={
                <div style={{ position: "relative", width: 64, height: 64, margin: "0 auto 24px" }}>
                  <div style={{ position: "absolute", inset: 0, borderRadius: 18, background: "linear-gradient(135deg, var(--tint), var(--interactive))", transform: "rotate(-10deg)", opacity: 0.55 }} />
                  <div style={{ position: "absolute", inset: 0, borderRadius: 18, background: "linear-gradient(135deg, var(--interactive), var(--deep))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Check size={26} color="#fff" />
                  </div>
                </div>
              }
            />
            <BuildCard
              delay={0.14}
              title="Automation should feel natural."
              body="Technology should remove repetitive work without changing how people already work."
              illustration={
                <div style={{ position: "relative", width: 150, height: 56, margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
                  <svg width="150" height="30" viewBox="0 0 150 30" style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                    <path d="M20,15 H130" fill="none" stroke="var(--tint)" strokeWidth="2" strokeDasharray="2 6" strokeLinecap="round" />
                  </svg>
                  <div style={{ position: "relative", width: 34, height: 34, borderRadius: 10, background: "#F2EEFC", display: "flex", alignItems: "center", justifyContent: "center" }}><SyncIc size={16} color="#7C6FE0" /></div>
                  <div style={{ position: "relative", width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg, var(--interactive), var(--deep))", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 20px -10px rgba(71,71,224,0.5)" }}><Bolt size={18} color="#fff" /></div>
                  <div style={{ position: "relative", width: 34, height: 34, borderRadius: 10, background: "#FEF3E2", display: "flex", alignItems: "center", justifyContent: "center" }}><Spark size={16} color="#D97706" /></div>
                </div>
              }
            />
            <BuildCard
              delay={0.22}
              title="Intelligence should be practical."
              body="AI should provide helpful insights, speed up decisions, and solve everyday challenges, not create new ones."
              illustration={
                <div style={{ position: "relative", width: 120, height: 56, margin: "0 auto 24px", display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 7 }}>
                  {[26, 40, 32, 52, 38].map((h, i) => (
                    <div key={i} style={{ width: 13, height: h, borderRadius: 4, background: "linear-gradient(180deg, var(--bright), var(--interactive))" }} />
                  ))}
                  <div style={{ position: "absolute", top: -6, right: -10, padding: "3px 9px", borderRadius: 999, background: "#fff", boxShadow: "0 8px 16px -8px rgba(31,36,48,0.35)", fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, color: "#059669" }}>
                    Growth ↑
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* ── Section 3: What Drives Us — Mission & Vision ── */}
      <section className="s-why-flexible">
        <div className="s-why-flexible-inner">
          <motion.div {...fadeUp(0)} className="evoq-section-head" style={{ textAlign: "center" }}>
            <h2 className="evoq-h2">What <span className="accent">Drives Us</span></h2>
          </motion.div>

          <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
            <DriveCard
              delay={0.06}
              bg="#232845"
              dark
              label="Mission"
              title="Help businesses simplify operations, automate work, and make better decisions through intelligent business platforms."
              chips={[
                { icon: <Check size={20} color="#A9B4E8" />, label: "Simplify", tint: "rgba(255,255,255,0.09)" },
                { icon: <Bolt size={20} color="#A9B4E8" />, label: "Automate", tint: "rgba(255,255,255,0.09)" },
                { icon: <Spark size={20} color="#A9B4E8" />, label: "Decide", tint: "rgba(255,255,255,0.09)" },
              ]}
              illustration={<DriveMark icon={<CompassGlyph />} />}
            />
            <DriveCard
              delay={0.12}
              bg="#232845"
              dark
              label="Vision"
              title="Become the most trusted AI platform that powers how modern businesses work."
              chips={[
                { icon: <Check size={20} color="#A9B4E8" />, label: "Trusted", tint: "rgba(255,255,255,0.09)" },
                { icon: <Spark size={20} color="#A9B4E8" />, label: "Intelligent", tint: "rgba(255,255,255,0.09)" },
                { icon: <SyncIc size={20} color="#A9B4E8" />, label: "Connected", tint: "rgba(255,255,255,0.09)" },
              ]}
              illustration={<DriveMark icon={<FlagGlyph />} />}
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

          <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 20 }}>
            {CORE_VALUES.map((value, i) => (
              <motion.div
                key={value.title}
                {...fadeUp(0.05 + i * 0.06)}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  flex: "0 0 calc((100% - 60px) / 4)",
                  background: value.bg,
                  borderRadius: 26,
                  padding: "26px 22px",
                  minHeight: 330,
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 22px 44px -26px rgba(20,23,42,0.6)",
                  transition: "transform 0.22s ease, box-shadow 0.22s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 34px 60px -26px rgba(20,23,42,0.7)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 22px 44px -26px rgba(20,23,42,0.6)"; }}
              >
                {/* top-right light bloom for depth */}
                <div
                  style={{
                    position: "absolute",
                    top: -70,
                    right: -50,
                    width: 190,
                    height: 190,
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 70%)",
                    pointerEvents: "none",
                  }}
                />

                <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: 10.5,
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.5)",
                      marginBottom: 10,
                    }}
                  >
                    {value.n} — Value
                  </div>

                  <h4
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 18,
                      fontWeight: 700,
                      lineHeight: 1.28,
                      color: "#fff",
                      margin: 0,
                    }}
                  >
                    {value.title}
                  </h4>

                  <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 0" }}>
                    <ValueGlyph shape={value.shape} />
                  </div>

                  <div
                    style={{
                      background: "rgba(255,255,255,0.13)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      borderRadius: 16,
                      padding: "13px 15px",
                      fontFamily: "var(--font-sans)",
                      fontSize: 12.5,
                      lineHeight: 1.5,
                      color: "rgba(255,255,255,0.88)",
                    }}
                  >
                    {value.body}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5: Built for Growing Businesses ── */}
      <section className="s-why-stands">
        <div className="s-why-stands-inner">
          <div>
            <motion.div {...fadeUp(0)} className="evoq-h2" style={{ marginBottom: 16 }}>
              One suite. Every way your <span className="accent">business grows.</span>
            </motion.div>
            <motion.p {...fadeUp(0.06)} className="evoq-sub" style={{ marginTop: 0 }}>
              Whether you&apos;re managing customers, projects, service teams,
              people, or operations, every EVOQ product is designed to work
              together, helping your business stay organized, move faster,
              and adapt as it grows.
            </motion.p>
          </div>

          <SuiteGrid />
        </div>
      </section>

      <GetStartedModal isOpen={showGetStarted} onClose={() => setShowGetStarted(false)} />
    </div>
  );
}
