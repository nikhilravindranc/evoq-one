"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Topbar } from "./Topbar";
import { ArrowRight } from "./icons";
import { GetStartedModal } from "@/components/shared/GetStartedModal";
import { ProductBadge } from "@/components/shared/ProductBadge";

type HeroTab = "growth" | "operations" | "people" | "finance" | "platform" | "ai";

const HERO_TABS: { key: HeroTab; label: string }[] = [
  { key: "growth", label: "Growth" },
  { key: "operations", label: "Operations" },
  { key: "people", label: "People" },
  { key: "finance", label: "Finance" },
  { key: "platform", label: "Platform" },
  { key: "ai", label: "AI" },
];

/* Growth's tab renders a layered composite instead of a clip --
 * matching monday.com, which uses a real <video> for exactly one tab
 * (Marketing) and hand-composed layered stills for the rest.
 *
 * Their non-video tabs are NOT gifs. Pulling the actual assets down and
 * measuring them shows the real recipe: three cut-out figures side by
 * side (450x538, 562x672, 450x538 -- the centre one largest and
 * deliberately overflowing the frame), plus TWO wide 2.9:1 callout
 * cards laid diagonally across them (one upper-right, one lower-left).
 * Each callout is [avatar thumbnail] + bold "Name, Role" + a grey
 * status line + a cursor arrow -- a person-and-role callout, not a
 * metric chip.
 *
 * The three portraits originally here were leftover repo placeholders
 * shot in three unrelated settings (a wood-panelled office, a bare
 * product-photo white background, a plant-filled desk) -- mismatched
 * enough to read as a random grab-bag rather than one team. Replaced
 * with a matched trio, same photographer/warm-office grade across all
 * three (Vitaly Gariev, Unsplash License), so they read as one shoot.
 * The avatars are the SAME photos re-cropped to the face, so each card
 * visibly belongs to one of the figures, exactly as monday's do.
 *
 * Each figure gets its own rounded photo-card (monday bakes a light
 * rounded backdrop into their centre figure for the same reason):
 * these are studio shots on near-white, and a bare cut-out dropped
 * straight onto the purple hero wash is the "pasted patch" failure the
 * hero video already had.
 */
const GROWTH_FIGURES = [
  { src: "/team/growth-left.jpg",   pos: "50% 20%" },
  { src: "/team/growth-center2.jpg", pos: "35% 40%" },
  { src: "/team/growth-right.jpg",  pos: "50% 18%" },
];

/* Operations' trio: a field technician (ServiceOps) and a support agent
 * (Desk) on the flanks, a project board in progress as the large centre
 * anchor -- same "largest figure overflows lowest" hierarchy as Growth,
 * and the centre photo now carries its own product story (Projects)
 * instead of being a purely decorative third body. The ServiceOps photo
 * came from a solid-colour-backdrop studio set (bright red) rather than
 * a natural-light shoot; the saturate+brightness filter mutes that punch
 * down toward the same editorial tone as the other two so all three
 * still read as one shoot instead of unrelated stock sources. */
const OPERATIONS_FIGURES = [
  { src: "/team/ops-left.jpg",   pos: "42% 16%", filter: "saturate(0.4) brightness(0.94)" },
  { src: "/team/ops-center.jpg", pos: "24% 14%" },
  { src: "/team/ops-right.jpg",  pos: "56% 14%" },
];

/* People's trio: an HR lead (HRMS) and a workshop facilitator
 * (Skillberry) on the flanks, a confident, arms-crossed portrait as the
 * large centre anchor -- same hierarchy as Growth and Operations. All
 * three are natural-light, near-neutral-background shots (no solid
 * studio backdrop this time), so no colour-correction filter is needed
 * for them to read as one shoot. */
const FINANCE_FIGURES = [
  { src: "/team/fin-left.jpg",   pos: "40% 85%" },
  { src: "/team/fin-center.jpg", pos: "50% 45%" },
  { src: "/team/fin-right.jpg",  pos: "50% 50%" },
];

/* Platform: eCommerce, ERP, accounting -- three of the systems Sync
   connects, each its own photo. */
const PLATFORM_FIGURES = [
  { src: "/team/plat-left.jpg",       pos: "50% 88%" },
  { src: "/team/card-sync-photo.jpg", pos: "50% 40%" },
  { src: "/team/plat-right.jpg",      pos: "50% 50%" },
];

/* AI is EVOQ AI (EVI plus agents): one wide photo card, with EVI and an
   agent character as the callout avatars instead of the photo. */
const AI_FIGURES = [
  { src: "/team/ai-wide.jpg", pos: "50% 30%" },
];

const PEOPLE_FIGURES = [
  { src: "/team/people-hrms.jpg",       pos: "54% 20%" },
  { src: "/team/people-center2.jpg",     pos: "50% 30%" },
  { src: "/team/people-skillberry.jpg", pos: "48% 22%" },
];

/* The cursor-arrow accent monday pins to each callout card -- a literal
 * mouse pointer, implying someone is actively clicking here right now.
 * Reuses the exact glyph already used for this same purpose on the
 * product carousel (.pf-cursor in SectionPlatform.tsx) rather than
 * copying monday's own icon, so the "someone's live in this app" cue
 * stays visually consistent across the site. Tinted in the hero's own
 * interactive purple instead of monday's blue for the same reason. */
function Cursor({ style }: { style: React.CSSProperties }) {
  return (
    <svg
      aria-hidden
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      style={{ position: "absolute", zIndex: 4, filter: "drop-shadow(0 2px 4px rgba(16,20,50,0.35))", ...style }}
    >
      <path d="M3 2.5 15.5 8.8 9.8 10.3 8 16.2 3 2.5Z" fill="#4747E0" stroke="#fff" strokeWidth="1.1" strokeLinejoin="round" />
    </svg>
  );
}

function PersonCallout({
  src, pos, name, status, delay, style, cursorStyle, appKey, cardRef, imgFilter, contain,
}: {
  src: string; pos: string; name: string; status: string; delay: number; contain?: boolean;
  style: React.CSSProperties; cursorStyle: React.CSSProperties; appKey: string;
  cardRef?: React.Ref<HTMLDivElement>; imgFilter?: string;
}) {
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 10, rotate: -9, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
      transition={{ duration: 0.65, delay, ease: [0.34, 1.4, 0.64, 1] }}
      style={{
        position: "absolute",
        display: "flex",
        alignItems: "center",
        gap: "6%",
        padding: "2.4% 4% 2.4% 2.4%",
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 18px 36px -16px rgba(16,20,50,0.45), 0 0 0 1px rgba(16,20,50,0.05)",
        zIndex: 3,
        ...style,
      }}
    >
      {/* Relative wrapper just for the badge -- the avatar photo says
          "here's a person", the badge pinned to its corner says which
          EVOQ app they're living in, so "Sara, Campaigns" reads as the
          Campaigns app rather than just a job title. */}
      <span style={{ position: "relative", flexShrink: 0, width: "22%" }}>
        <img
          src={src}
          alt=""
          aria-hidden
          style={{
            width: "100%",
            aspectRatio: "1 / 1",
            borderRadius: "12px",
            objectFit: contain ? "contain" : "cover",
            objectPosition: pos,
            display: "block",
            background: contain ? "#F1F2FF" : "#EEF1F8",
            filter: imgFilter,
          }}
        />
        <span
          style={{
            position: "absolute",
            bottom: "-14%",
            right: "-14%",
            width: "52%",
            aspectRatio: "1 / 1",
            borderRadius: "7px",
            overflow: "hidden",
            background: "#fff",
            padding: "8%",
            boxShadow: "0 2px 6px rgba(16,20,50,0.3), 0 0 0 2px #fff",
          }}
        >
          <ProductBadge productKey={appKey} size={20} />
        </span>
      </span>
      {/* width:max-content plus a few px of paddingRight on each line --
          same fix as ActionCard's text wrapper below. Without an
          explicit width this wrapper's shrink-to-fit size comes from
          the browser's own max-content estimate, which at certain
          fractional font sizes (this text scales via cqw, so the
          rendered size is rarely a round pixel value) lands 2-3px
          short of the glyphs' actual advance width and clips the last
          character. Padding is included in that estimate, so it closes
          the gap; width:max-content stops the wrapper from being
          flexed narrower than its own widest line in the first place --
          though width alone isn't enough inside a fixed-width flex card
          (the default flex-shrink:1 still compresses a max-content item
          when its siblings' total exceeds the card's own width), so
          flexShrink:0 is what actually makes the width stick. */}
      <span style={{ minWidth: 0, width: "max-content", flexShrink: 0 }}>
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            fontSize: "clamp(9px, 2.9cqw, 15px)",
            lineHeight: 1.2,
            color: "#1F2430",
            whiteSpace: "nowrap",
            paddingRight: 3,
          }}
        >
          {name}
        </span>
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(8px, 2.4cqw, 13px)",
            lineHeight: 1.3,
            color: "rgba(31,36,48,0.55)",
            marginTop: "2%",
            whiteSpace: "nowrap",
            paddingRight: 3,
          }}
        >
          {status}
        </span>
      </span>
      <Cursor style={cursorStyle} />
    </motion.div>
  );
}

/* Growth's own icon slot: a checkmark, as if the cursor just clicked
 * it -- kept as a small wrapper so the call site reads the same way
 * the old hardcoded card did. */
function CheckIcon() {
  return (
    <span
      aria-hidden
      style={{
        width: "clamp(22px, 6.4cqw, 30px)",
        height: "clamp(22px, 6.4cqw, 30px)",
        borderRadius: "50%",
        background: "#22C55E",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <path d="M3 8.5 6.5 12 13 4.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/* ---------------------------------------------------------------------
 * Cross-app relay. Each tab plays one short story over its photo
 * composite: a person starts something in one app (callout B), an EVI
 * agent carries it along the connector into the relay card, three EVOQ
 * apps light up one after another, and the result lands with a second
 * person (callout A). The point is the suite handing work along -- not a
 * single board filling in -- so the motion runs between apps.
 * ------------------------------------------------------------------- */
type RelayStep = { app: string; name: string; status: string };
type Relay = {
  agent: { src: string; label: string };
  steps: [RelayStep, RelayStep, RelayStep];
  outcome: { title: string; sub: string };
};

type Timeline = {
  bIn: number; bLine: number; ride: number; rideDur: number; card: number;
  steps: [number, number, number]; outcome: number; aLine: number; back: number; backDur: number; aIn: number;
};
const TIMELINE: Timeline = {
  bIn: 0.45, bLine: 0.95, ride: 1.2, rideDur: 1.25, card: 0.9,
  steps: [2.35, 3.05, 3.75], outcome: 4.3, aLine: 4.45, back: 4.55, backDur: 1.0, aIn: 5.35,
};
const STILL: Timeline = {
  bIn: 0, bLine: 0, ride: 0, rideDur: 0, card: 0, steps: [0, 0, 0], outcome: 0, aLine: 0, back: 0, backDur: 0, aIn: 0,
};

function RelayCard({ relay, T, cardRef }: { relay: Relay; T: Timeline; cardRef: React.Ref<HTMLDivElement> }) {
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: T.card, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "relative",
        background: "#fff",
        borderRadius: 14,
        padding: "2.4cqw 3cqw 2.2cqw",
        boxShadow: "0 18px 36px -16px rgba(16,20,50,0.45), 0 0 0 1px rgba(16,20,50,0.05)",
        width: "fit-content",
        maxWidth: "99%",
        fontFamily: "var(--font-sans)",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        {relay.steps.map((s, i) => (
          <div key={s.app + i} style={{ display: "flex", alignItems: "flex-start" }}>
            {i > 0 && (
              <span style={{ position: "relative", width: "5cqw", height: 2, marginTop: "calc(clamp(22px, 6cqw, 30px) / 2)", background: "#E7E8F0", borderRadius: 2, overflow: "hidden" }}>
                <motion.i
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.45, delay: Math.max(0, T.steps[i] - 0.45), ease: "easeOut" }}
                  style={{ position: "absolute", inset: 0, background: "#4747E0", transformOrigin: "left center", display: "block" }}
                />
              </span>
            )}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "19cqw", textAlign: "center" }}>
              <span style={{ position: "relative", width: "clamp(22px, 6cqw, 30px)", height: "clamp(22px, 6cqw, 30px)" }}>
                <motion.span
                  initial={{ opacity: 0.35, filter: "grayscale(1)" }}
                  animate={{ opacity: 1, filter: "grayscale(0)" }}
                  transition={{ duration: 0.35, delay: T.steps[i] }}
                  style={{ display: "block", width: "100%", height: "100%" }}
                >
                  <ProductBadge productKey={s.app} size={30} />
                </motion.span>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.35, delay: T.steps[i] + 0.1, ease: [0.34, 1.6, 0.64, 1] }}
                  style={{ position: "absolute", right: -5, bottom: -5, width: 14, height: 14, borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 0 2px #fff", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <svg width="8" height="8" viewBox="0 0 16 16" fill="none"><path d="M3 8.5 6.5 12 13 4.5" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </motion.span>
              </span>
              <motion.span
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, delay: T.steps[i] }}
                style={{ display: "block", marginTop: "1.4cqw" }}
              >
                <span style={{ display: "block", fontSize: "clamp(9px, 2.3cqw, 12px)", fontWeight: 700, color: "#1F2430", whiteSpace: "nowrap" }}>{s.name}</span>
                <span style={{ display: "block", marginTop: 1, fontSize: "clamp(8px, 2cqw, 11px)", color: "rgba(31,36,48,0.55)", whiteSpace: "nowrap" }}>{s.status}</span>
              </motion.span>
            </div>
          </div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: T.outcome, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.6cqw", marginTop: "2cqw", paddingTop: "1.8cqw", borderTop: "1px solid #EEF0F4" }}
      >
        <CheckIcon />
        <span style={{ fontSize: "clamp(10px, 2.7cqw, 14px)", fontWeight: 700, color: "#1F2430", whiteSpace: "nowrap" }}>{relay.outcome.title}</span>
        <span style={{ fontSize: "clamp(9px, 2.3cqw, 12px)", color: "rgba(31,36,48,0.55)", whiteSpace: "nowrap" }}>{relay.outcome.sub}</span>
      </motion.div>
    </motion.div>
  );
}

/* The EVI agent riding the connector from the first person into the
   relay card, then a single glowing packet carrying the result back out
   to the second person. Rides the measured cable paths via CSS
   offset-path, so it follows the exact curve the connector draws. */
function RelayRiders({ geom, relay, T }: { geom: ConnectorGeom; relay: Relay; T: Timeline }) {
  if (!geom || T.rideDur === 0) return null;
  return (
    <>
      <span
        className="relay-chip"
        style={{ offsetPath: `path('${geom.b}')`, animationDelay: `${T.ride}s`, animationDuration: `${T.rideDur}s` } as React.CSSProperties}
      >
        <img src={relay.agent.src} alt="" aria-hidden />
        {relay.agent.label}
        <span className="relay-dots"><i /><i /><i /></span>
      </span>
      <span
        className="relay-packet"
        style={{ offsetPath: `path('${geom.a}')`, animationDelay: `${T.back}s`, animationDuration: `${T.backDur}s` } as React.CSSProperties}
      />
    </>
  );
}

/* A smooth S-curve between two points, tangent-straight at both ends
 * (each control point sits directly below the start / above the end)
 * so the curve leaves each card moving straight down and arrives
 * moving straight down too -- the "flowing cable" look, not a rigid
 * elbow. Replaces an earlier rounded-right-angle version that read as
 * flowchart/org-chart "branches" rather than something that belongs on
 * a marketing hero. */
function smoothPath(from: { x: number; y: number }, to: { x: number; y: number }): string {
  const dy = (to.y - from.y) * 0.55;
  return `M ${from.x} ${from.y} C ${from.x} ${from.y + dy}, ${to.x} ${to.y - dy}, ${to.x} ${to.y}`;
}

type ConnectorGeom = {
  w: number;
  h: number;
  a: string;
  b: string;
  aDot: { x: number; y: number };
  bDot: { x: number; y: number };
  aEnd: { x: number; y: number };
  bEnd: { x: number; y: number };
} | null;

/* Ties all three cards into one reporting line -- the two person-cards
 * both feed the action card underneath them. Routed as real
 * getBoundingClientRect measurements of the three cards (not eyeballed
 * percentages) rather than a curve drawn straight across the composite:
 * a free bezier through the middle crossed directly over the centre
 * figure's face, which read as amateurish. Each cable instead leaves
 * its card's own bottom corner -- already clear of every photo, since
 * both people-cards sit partly outside the figure row -- and sweeps
 * down into the action card below the figures' lowest point. Nothing
 * ever crosses a photo. Shared between Growth and Operations.
 *
 * Visual style: a soft white-to-violet gradient with a glow, drawn as
 * one continuous cable rather than a right-angled trace, so it reads as
 * a live connection instead of a flowchart diagram. */
function Connector({ geom, T }: { geom: ConnectorGeom; T: Timeline }) {
  if (!geom) return null;
  return (
    <svg
      aria-hidden
      width={geom.w}
      height={geom.h}
      viewBox={`0 0 ${geom.w} ${geom.h}`}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1, overflow: "visible", pointerEvents: "none" }}
    >
      <defs>
        <linearGradient id="connector-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
          <stop offset="100%" stopColor="#9C8CFF" />
        </linearGradient>
      </defs>
      {/* A plain opacity fade rather than Motion's pathLength "draw-in":
          pathLength needs the path's real total length via
          getTotalLength(), and since this 'd' is recomputed after mount
          (ResizeObserver) rather than fixed at first render, Motion was
          caching a stale length and rendering the stroke as a near-
          invisible "1px dash, 1px gap" pattern instead of a solid line. */}
      <g style={{ filter: "drop-shadow(0 0 5px rgba(151,140,255,0.55))" }}>
        <motion.path
          d={geom.a}
          fill="none"
          stroke="url(#connector-grad)"
          strokeWidth={2}
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.65, delay: T.aLine, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d={geom.b}
          fill="none"
          stroke="url(#connector-grad)"
          strokeWidth={2}
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.65, delay: T.bLine, ease: [0.22, 1, 0.36, 1] }}
        />
      </g>
      {/* Matching dots at both ends of each cable -- "node to node"
          rather than a line that just stops. */}
      <motion.circle cx={geom.aDot.x} cy={geom.aDot.y} r={3} fill="#fff" stroke="#9C8CFF" strokeWidth={1.5}
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.35, delay: T.aLine }} />
      <motion.circle cx={geom.bDot.x} cy={geom.bDot.y} r={3} fill="#fff" stroke="#9C8CFF" strokeWidth={1.5}
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.35, delay: T.bLine }} />
      <motion.circle cx={geom.aEnd.x} cy={geom.aEnd.y} r={2.5} fill="#9C8CFF"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.35, delay: T.aLine + 0.3 }} />
      <motion.circle cx={geom.bEnd.x} cy={geom.bEnd.y} r={2.5} fill="#9C8CFF"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.35, delay: T.bLine + 0.3 }} />
    </svg>
  );
}

type FigureSpec = { src: string; pos: string; filter?: string };
type CalloutSpec = {
  figureIndex: number;
  // A different thumbnail from the figure behind it (e.g. a character).
  avatar?: { src: string; pos?: string; contain?: boolean };
  name: string;
  status: string;
  appKey: string;
  style: React.CSSProperties;
  cursorStyle: React.CSSProperties;
};

/* The three-figure-plus-connected-cards skeleton, shared by every tab
 * composite -- Growth and Operations differ only in which photos, app
 * badges, names/status lines and action-card content they plug in, not
 * in layout, measurement or connector logic. Keeping one skeleton means
 * a fix to the sizing/clipping/connector-routing math (all hard-won
 * above) applies to every tab automatically instead of drifting between
 * copies. */
function TabComposite({
  figures, calloutA, calloutB, relay, wide,
}: {
  figures: FigureSpec[];
  // One full-width photo card instead of the three-portrait trio.
  wide?: boolean;
  calloutA: CalloutSpec;
  calloutB: CalloutSpec;
  relay: Relay;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const aRef = useRef<HTMLDivElement>(null);
  const bRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);
  const [geom, setGeom] = useState<ConnectorGeom>(null);
  const rm = useReducedMotion();
  const T = rm ? STILL : TIMELINE;

  // Real measurement instead of guessed percentages -- the connector has
  // to land exactly on each card's own corner and dip through a gap that
  // is only empty because of the composite's own tuned spacing, so it's
  // measured off the live boxes (and re-measured on resize) rather than
  // hardcoded.
  useEffect(() => {
    function measure() {
      const wrap = wrapRef.current;
      const m = aRef.current;
      const s = bRef.current;
      const a = actionRef.current;
      if (!wrap || !m || !s || !a) return;
      const wr = wrap.getBoundingClientRect();
      const rel = (r: DOMRect) => ({ left: r.left - wr.left, right: r.right - wr.left, top: r.top - wr.top, bottom: r.bottom - wr.top });
      const mm = rel(m.getBoundingClientRect());
      const ss = rel(s.getBoundingClientRect());
      const aa = rel(a.getBoundingClientRect());

      const aStart = { x: mm.left, y: mm.bottom };
      const bStart = { x: ss.right, y: ss.bottom };
      const leftEntry = { x: aa.left + 18, y: aa.top };
      const rightEntry = { x: aa.right - 18, y: aa.top };

      setGeom({
        w: wr.width,
        h: wr.height,
        a: smoothPath(aStart, leftEntry),
        b: smoothPath(bStart, rightEntry),
        aDot: aStart,
        bDot: bStart,
        aEnd: leftEntry,
        bEnd: rightEntry,
      });
    }
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrapRef.current!);
    return () => ro.disconnect();
  }, []);

  // containerType lives on this outer wrapper, not the inner 16:9 box --
  // the action card's cqw font sizing needs a query container too, and
  // it sits below that box in normal flow, not inside it. One shared
  // context keeps both the callouts and the action card scaling off
  // the same width. position:relative anchors the connector overlay,
  // which spans this whole wrapper (figures box + gap + action card),
  // not just the inner box.
  return (
    <div ref={wrapRef} style={{ width: "100%", position: "relative", containerType: "inline-size" }}>
    <Connector geom={geom} T={T} />
    <RelayRiders geom={geom} relay={relay} T={T} />
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16 / 9",
      }}
    >
      {/* Figures: centre one is largest and drops lowest, the two
          flanks sit smaller and further back -- monday's exact
          hierarchy (562x672 centre against 450x538 sides). Bottoms are
          pushed past the frame so the row reads as cropped rather than
          as three portraits politely floating inside a box. */}
      {/* Tectonic, not tumble: the three figures read as slabs drifting
          together and settling into place, not rotating cards -- the
          flanks slide in horizontally from off-frame (away from the
          centre, like plates converging), the centre rises from below.
          No rotate animation here, just each figure's own fixed resting
          tilt (rot) held constant throughout -- an expo-out ease gives
          the strong initial drift and firm, no-bounce landing that
          "settling" calls for, versus tumble's springy overshoot. */}
      {(wide
        ? [{ i: 0, left: "4%", w: "92%", bottom: "0%", z: 1, rot: 0, fromX: 0, fromY: 40 }]
        : [
            { i: 0, left: "1%",  w: "30%", bottom: "-20%", z: 1, rot: -2.5, fromX: -64, fromY: 16 },
            { i: 1, left: "32%", w: "36%", bottom: "-30%", z: 2, rot: 0, fromX: 0, fromY: 56 },
            { i: 2, left: "69%", w: "30%", bottom: "-20%", z: 1, rot: 2.5, fromX: 64, fromY: 16 },
          ]
      ).map(({ i, left, w, bottom, z, rot, fromX, fromY }) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: fromX, y: fromY, rotate: rot, scale: 0.92 }}
          animate={{ opacity: 1, x: 0, y: 0, rotate: rot, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.09 * i, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute",
            left,
            bottom,
            width: w,
            aspectRatio: wide ? "16 / 9" : "1 / 1.85",
            zIndex: z,
            borderRadius: "18px",
            overflow: "hidden",
            background: "linear-gradient(180deg, #F4F5FB 0%, #E8ECF7 100%)",
            boxShadow: "0 24px 48px -20px rgba(10,10,60,0.5)",
          }}
        >
          <img
            src={figures[i].src}
            alt=""
            aria-hidden
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: figures[i].pos,
              filter: figures[i].filter,
            }}
          />
        </motion.div>
      ))}

      <PersonCallout
        cardRef={aRef}
        src={calloutA.avatar?.src ?? figures[calloutA.figureIndex].src}
        pos={calloutA.avatar?.pos ?? figures[calloutA.figureIndex].pos}
        contain={calloutA.avatar?.contain}
        imgFilter={calloutA.avatar ? undefined : figures[calloutA.figureIndex].filter}
        name={calloutA.name}
        status={calloutA.status}
        delay={T.aIn}
        style={calloutA.style}
        cursorStyle={calloutA.cursorStyle}
        appKey={calloutA.appKey}
      />
      <PersonCallout
        cardRef={bRef}
        src={calloutB.avatar?.src ?? figures[calloutB.figureIndex].src}
        pos={calloutB.avatar?.pos ?? figures[calloutB.figureIndex].pos}
        contain={calloutB.avatar?.contain}
        imgFilter={calloutB.avatar ? undefined : figures[calloutB.figureIndex].filter}
        name={calloutB.name}
        status={calloutB.status}
        delay={T.bIn}
        style={calloutB.style}
        cursorStyle={calloutB.cursorStyle}
        appKey={calloutB.appKey}
      />
    </div>

    {/* Clearance below the box, not just a margin on the card itself --
        the centre figure's own bottom offset (-30%, relative to the
        box's height) already puts its feet about 17% of the composite's
        width below the box's nominal edge. Less than that and this card
        lands on top of them instead of under them. This same clear band
        is also where the connector's horizontal leg runs. */}
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ marginTop: wide ? "8%" : "24%" }}>
        <RelayCard relay={relay} T={T} cardRef={actionRef} />
      </div>
    </div>
    </div>
  );
}

/* The three portraits originally here were leftover repo placeholders
 * shot in three unrelated settings (a wood-panelled office, a bare
 * product-photo white background, a plant-filled desk) -- mismatched
 * enough to read as a random grab-bag rather than one team. Replaced
 * with a matched trio, same photographer/warm-office grade across all
 * three (Vitaly Gariev, Unsplash License), so they read as one shoot. */
function GrowthComposite() {
  return (
    <TabComposite
      figures={GROWTH_FIGURES}
      calloutA={{
        figureIndex: 2,
        name: "Sara, Campaigns",
        status: "Added to onboarding journey",
        appKey: "campaigns",
        style: { right: "-2%", top: "-6%", width: "50%" },
        cursorStyle: { left: -8, bottom: -8, transform: "rotate(8deg)" },
      }}
      calloutB={{
        figureIndex: 0,
        name: "Marcus, Sales Lead",
        status: "Deal won · Nova Retail",
        appKey: "crm",
        style: { left: "-2%", bottom: "5%", width: "50%" },
        cursorStyle: { right: -8, top: -8, transform: "rotate(-170deg)" },
      }}
      relay={{
        agent: { src: "/team/agent-tasks.png", label: "Creating invoice" },
        steps: [
          { app: "crm", name: "CRM", status: "Deal won" },
          { app: "billing", name: "Billing", status: "Invoice #2481 sent" },
          { app: "inventory", name: "Inventory", status: "Stock reserved" },
        ],
        outcome: { title: "Deal to delivery", sub: "3 apps · 0 handoffs" },
      }}
    />
  );
}

/* Operations covers six products, not two -- ServiceOps (a field tech
 * closing a job) and Desk (a support agent resolving a ticket) are the
 * two with a natural human persona, so they get the person-cards, same
 * as CRM/Campaigns did for Growth. The centre figure is Projects itself
 * (someone actively working a project board), so that's three of six
 * products shown as photos. The remaining three -- Sync, Inventory,
 * Billing -- don't have a "person doing the job" the way dispatch and
 * support do, so rather than name them as a row of logo chips (no story,
 * nothing to recognize), the action slot maps the actual hand-off in the
 * same card language as the callouts above: Sync pulls the ticket/job
 * into the ERP and Projects tracks it (card one), then Inventory covers
 * the parts and Billing closes it out (card two).
 *
 * Photos: the ServiceOps solid-colour-backdrop studio shot gets a
 * saturate+brightness filter (see OPERATIONS_FIGURES) to pull its punchy
 * red toward the same muted, editorial tone as the other two natural-
 * light photos -- the same "read as one shoot" fix Growth needed. */
function OperationsComposite() {
  return (
    <TabComposite
      figures={OPERATIONS_FIGURES}
      calloutA={{
        figureIndex: 2,
        name: "Mia, Support Lead",
        status: "Ticket #4821 · AC failure",
        appKey: "desk",
        style: { right: "-2%", top: "-6%", width: "50%" },
        cursorStyle: { left: -8, bottom: -8, transform: "rotate(8deg)" },
      }}
      calloutB={{
        figureIndex: 0,
        name: "Raj, Field Tech",
        status: "Job #482 completed on site",
        appKey: "serviceops",
        style: { left: "-2%", bottom: "5%", width: "50%" },
        cursorStyle: { right: -8, top: -8, transform: "rotate(-170deg)" },
      }}
      relay={{
        agent: { src: "/team/agent-calendar.png", label: "Dispatching job" },
        steps: [
          { app: "desk", name: "Desk", status: "Ticket triaged" },
          { app: "serviceops", name: "ServiceOps", status: "Job #482 scheduled" },
          { app: "billing", name: "Billing", status: "Invoice raised" },
        ],
        outcome: { title: "Ticket to invoice", sub: "3 apps · 0 handoffs" },
      }}
    />
  );
}

/* People covers two products, same shape as Growth -- HRMS (a People
 * Ops lead approving everyday requests) and Skillberry (a facilitator
 * running a workshop) both have an obvious human persona, so both get
 * a full person-card the same way CRM/Campaigns did. No need for
 * Operations' multi-card hand-off here: two products, two cards, one
 * outcome card underneath tying them together -- back to Growth's
 * simpler skeleton. */
function PeopleComposite() {
  return (
    <TabComposite
      figures={PEOPLE_FIGURES}
      calloutA={{
        figureIndex: 2,
        name: "Dana, Skillberry",
        status: "Priya enrolled in 3 courses",
        appKey: "skillberry",
        style: { right: "-2%", top: "-6%", width: "50%" },
        cursorStyle: { left: -8, bottom: -8, transform: "rotate(8deg)" },
      }}
      calloutB={{
        figureIndex: 0,
        name: "Sam, People Ops",
        status: "New hire · Priya joins Monday",
        appKey: "hrms",
        style: { left: "-2%", bottom: "5%", width: "50%" },
        cursorStyle: { right: -8, top: -8, transform: "rotate(-170deg)" },
      }}
      relay={{
        agent: { src: "/team/agent-docs.png", label: "Setting up onboarding" },
        steps: [
          { app: "hrms", name: "HRMS", status: "Profile created" },
          { app: "skillberry", name: "Skillberry", status: "Training assigned" },
          { app: "projects", name: "Projects", status: "Added to team board" },
        ],
        outcome: { title: "Hire to first day", sub: "3 apps · 0 handoffs" },
      }}
    />
  );
}

/* Finance covers Billing and Inventory -- two person-cards, the same
 * skeleton as Growth, with a matched centre portrait and no callout. */
function FinanceComposite() {
  return (
    <TabComposite
      figures={FINANCE_FIGURES}
      calloutA={{
        figureIndex: 2,
        name: "Payments, Billing",
        status: "Supplier paid on time",
        appKey: "billing",
        style: { right: "-2%", top: "-6%", width: "50%" },
        cursorStyle: { left: -8, bottom: -8, transform: "rotate(8deg)" },
      }}
      calloutB={{
        figureIndex: 0,
        name: "Stock, Inventory",
        status: "Reorder point reached",
        appKey: "inventory",
        style: { left: "-2%", bottom: "5%", width: "50%" },
        cursorStyle: { right: -8, top: -8, transform: "rotate(-170deg)" },
      }}
      relay={{
        agent: { src: "/team/agent-alert.png", label: "Raising reorder" },
        steps: [
          { app: "inventory", name: "Inventory", status: "Low stock flagged" },
          { app: "billing", name: "Billing", status: "Supplier bill recorded" },
          { app: "sync", name: "Accounting", status: "Posted to ledger" },
        ],
        outcome: { title: "Stock to books", sub: "3 apps · 0 handoffs" },
      }}
    />
  );
}

/* Platform is Sync: an integration layer between CRM, ERP, eCommerce and
 * accounting. Three photos for three of those systems, two callouts, and
 * two outcome cards for what Sync does (two-way sync, and agents retrying
 * failed records -- both straight from the Sync page). */
function PlatformComposite() {
  return (
    <TabComposite
      figures={PLATFORM_FIGURES}
      calloutA={{
        figureIndex: 2,
        name: "Invoices, Accounting",
        status: "Invoice matched in ERP",
        appKey: "sync",
        style: { right: "-2%", top: "-6%", width: "50%" },
        cursorStyle: { left: -8, bottom: -8, transform: "rotate(8deg)" },
      }}
      calloutB={{
        figureIndex: 0,
        name: "Orders, eCommerce",
        status: "Order #1093 placed",
        appKey: "sync",
        style: { left: "-2%", bottom: "5%", width: "50%" },
        cursorStyle: { right: -8, top: -8, transform: "rotate(-170deg)" },
      }}
      relay={{
        agent: { src: "/team/agent-sync.png", label: "Syncing order" },
        steps: [
          { app: "sync", name: "eCommerce", status: "Order received" },
          { app: "sync", name: "ERP", status: "Sales order created" },
          { app: "crm", name: "CRM", status: "Customer updated" },
        ],
        outcome: { title: "Order to ledger", sub: "1,248 records in sync" },
      }}
    />
  );
}

function AiComposite() {
  return (
    <TabComposite
      wide
      figures={AI_FIGURES}
      calloutA={{
        figureIndex: 0,
        avatar: { src: "/evoq-ai/evi-avatar.webp", pos: "50% 40%", contain: true },
        name: "EVI, Assistant",
        status: "Follow-ups ready for review",
        appKey: "ai",
        style: { right: "-2%", top: "-6%", width: "50%" },
        cursorStyle: { left: -8, bottom: -8, transform: "rotate(8deg)" },
      }}
      calloutB={{
        figureIndex: 0,
        name: "Alex, Sales Lead",
        status: "Asked EVI: which deals are at risk?",
        appKey: "ai",
        style: { left: "-2%", bottom: "5%", width: "50%" },
        cursorStyle: { right: -8, top: -8, transform: "rotate(-170deg)" },
      }}
      relay={{
        agent: { src: "/team/agent-report.png", label: "Drafting follow-ups" },
        steps: [
          { app: "crm", name: "CRM", status: "3 deals flagged" },
          { app: "campaigns", name: "Campaigns", status: "Follow-ups drafted" },
          { app: "projects", name: "Projects", status: "Tasks assigned" },
        ],
        outcome: { title: "Question to action", sub: "3 apps · 0 handoffs" },
      }}
    />
  );
}

/* The "logo halo" layer (3rd in the stack) is positioned via --logo-x/--logo-y,
 * CSS custom properties kept in sync with the logo tile's actual on-screen
 * position (see the resize/observer effect below). The layout that places the
 * logo tile is width-capped (max-width: 1168) and centered, while this
 * gradient paints across the full-bleed hero -- so the logo's position as a
 * fraction of hero width is NOT constant across viewport widths. Percentages
 * alone drift out of alignment on large screens; measuring the real DOM
 * position is the only way to keep the halo locked to the logo at every size.
 */
const GRADIENT =
  `radial-gradient(90% 75% at 100% 15%, #9333EA 0%, rgba(147,51,234,0.7) 40%, rgba(147,51,234,0) 72%),
   radial-gradient(46% 42% at var(--logo-x, 69%) var(--logo-y, 51%), rgba(242,242,255,0.55) 0%, rgba(242,242,255,0) 62%),
   radial-gradient(120% 30% at 100% 0%, rgba(255,255,255,0.34) 0%, rgba(226,220,255,0.2) 35%, rgba(255,255,255,0.07) 62%, rgba(255,255,255,0) 88%),
   radial-gradient(70% 55% at 0% 0%, rgba(255,255,255,0.4) 0%, rgba(226,220,255,0.22) 40%, rgba(255,255,255,0.08) 65%, rgba(255,255,255,0) 88%),
   radial-gradient(38% 20% at var(--topbar-logo-x, 6%) var(--topbar-logo-y, 8%), rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.05) 55%, rgba(255,255,255,0) 90%),
   linear-gradient(96deg, #6366F6 0%, #6658F2 32%, #6D4AE8 58%, #7C3AED 78%, #9333EA 100%)`;

const GRAIN_SVG = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.7 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;

export function HeroSection() {
  const [showGetStarted, setShowGetStarted] = useState(false);
  const [activeTab, setActiveTab] = useState<HeroTab>("growth");
  const frameRef = useRef<HTMLDivElement>(null);
  const [logoPos, setLogoPos] = useState<{ x: string; y: string }>({ x: "69%", y: "51%" });
  const [topbarLogoPos, setTopbarLogoPos] = useState<{ x: string; y: string }>({ x: "6%", y: "8%" });

  // Auto-advance growth -> operations -> people -> growth, looping.
  // Restarted (not just cleared) on every manual tab click below so a
  // click doesn't get overridden a moment later by a timer that was
  // already mid-flight -- the visitor's own choice gets a full fresh
  // interval before the loop resumes.
  const tabTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const AUTO_TAB_MS = 8000;

  const startTabTimer = () => {
    if (tabTimerRef.current) clearInterval(tabTimerRef.current);
    tabTimerRef.current = setInterval(() => {
      setActiveTab((prev) => {
        const i = HERO_TABS.findIndex((t) => t.key === prev);
        return HERO_TABS[(i + 1) % HERO_TABS.length].key;
      });
    }, AUTO_TAB_MS);
  };

  useEffect(() => {
    startTabTimer();
    return () => {
      if (tabTimerRef.current) clearInterval(tabTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const measure = () => {
      const frameRect = frame.getBoundingClientRect();

      const logo = document.getElementById("hero-logo-anchor");
      if (logo) {
        const logoRect = logo.getBoundingClientRect();
        const x = logoRect.left + logoRect.width / 2 - frameRect.left;
        const y = logoRect.top + logoRect.height / 2 - frameRect.top;
        setLogoPos({ x: `${x}px`, y: `${y}px` });
      }

      const topbarLogo = document.getElementById("hero-topbar-logo");
      if (topbarLogo) {
        const tRect = topbarLogo.getBoundingClientRect();
        // Anchor on the icon's own center, not the whole logo tile's
        // (icon + wordmark) center -- the icon is a square exactly as
        // wide as the logo is tall, flush at the left edge (see
        // white-logo.png), so the glow's brightest point lands on the
        // icon itself instead of the gap between it and "EVOQ".
        const iconWidth = tRect.height;
        const x = tRect.left + iconWidth / 2 - frameRect.left;
        const y = tRect.top + tRect.height / 2 - frameRect.top;
        setTopbarLogoPos({ x: `${x}px`, y: `${y}px` });
      }
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(frame);
    // logo tile fades/scales in via framer-motion, so re-measure once that settles too
    const t = setTimeout(measure, 550);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  return (
    <div className="w-full">
      {/* Preload every figure photo across all three tabs, not just the
          visible ones -- without this the browser only discovers each
          <img> (below) once React mounts it, so the composite's card
          shows its plain gradient backdrop first and the photo pops in
          a moment later once the fetch finishes. React 19 hoists <link>
          tags rendered anywhere in the tree to <head>, so these don't
          need to live in a Server Component or use next/head.
          fetchPriority is "high" only for Growth (the tab visible at
          first paint, competing for the same bandwidth as everything
          else LCP-critical); Operations/People just need to be well
          ahead of the 6s auto-advance timer, not neck-and-neck with it. */}
      {GROWTH_FIGURES.map((f) => (
        <link key={f.src} rel="preload" as="image" href={f.src} fetchPriority="high" />
      ))}
      {[...OPERATIONS_FIGURES, ...PEOPLE_FIGURES, ...FINANCE_FIGURES, ...PLATFORM_FIGURES, ...AI_FIGURES].map((f) => (
        <link key={f.src} rel="preload" as="image" href={f.src} />
      ))}
      {/* Full-width hero — no max-width cap, no rounded card */}
      <div className="w-full">
        {/*
         * Hero frame: fixed 840px tall, overflow hidden.
         * Uses flex-column so topbar takes its natural height and stage
         * fills the exact remainder -- no hardcoded topbar constant needed.
         */}
        <div
          ref={frameRef}
          className="hero-lit"
          style={{
            position: "relative",
            width: "100%",
            height: 840,
            overflow: "hidden",
            isolation: "isolate",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Gradient background */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: GRADIENT,
              backgroundBlendMode: "screen, normal, normal, normal, normal",
              // @ts-expect-error -- CSS custom properties aren't in CSSProperties
              "--logo-x": logoPos.x,
              "--logo-y": logoPos.y,
              "--topbar-logo-x": topbarLogoPos.x,
              "--topbar-logo-y": topbarLogoPos.y,
            }}
          />
          {/* Film grain */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: GRAIN_SVG,
              mixBlendMode: "overlay",
              opacity: 0.35,
              pointerEvents: "none",
            }}
          />
          {/* Vignette */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(120% 80% at 50% 110%, rgba(0,0,153,0.75) 0%, rgba(0,0,153,0) 55%)",
              pointerEvents: "none",
            }}
          />

          {/* Bottom fade into the lavender the next section starts on, so the
              page flows on instead of cutting from navy to white. */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 200,
              background: "linear-gradient(180deg, rgba(246,245,255,0) 0%, rgba(246,245,255,0.5) 55%, #F6F5FF 100%)",
              pointerEvents: "none",
            }}
          />

          {/* Topbar -- shrinks to its natural height */}
          <div style={{ position: "relative", zIndex: 3, flexShrink: 0 }}>
            <Topbar darkCTA />
          </div>

          {/* Stage -- grows to fill all remaining height exactly */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              flex: "1 1 0",
              display: "flex",
              justifyContent: "center",
              padding: "0 80px 48px",
              minHeight: 0, // needed for flex children with overflow
            }}
          >
          {/* Inner container -- capped to match the width used by sections below the hero */}
          <div
            style={{
              width: "100%",
              maxWidth: 1168,
              display: "grid",
              gridTemplateColumns: "1.05fr 1fr",
              alignItems: "stretch",
              gap: 32,
            }}
          >
            {/* Left column */}
            <motion.section
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "0 24px 0 0",
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div>
                <h1
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 48,
                    lineHeight: 1.08,
                    letterSpacing: "-0.03em",
                    color: "#fff",
                    margin: 0,
                  }}
                >
                  Human intelligence. Agentic action.
                  <br />
                  <span style={{ color: "#BDBDFF" }}>Connected platforms.</span>
                </h1>

                <p
                  style={{
                    marginTop: 20,
                    maxWidth: "52ch",
                    fontFamily: "var(--font-sans)",
                    fontSize: 15.5,
                    lineHeight: 1.55,
                    color: "rgba(255,255,255,0.75)",
                  }}
                >
                  Turning intelligence into coordinated action across the
                  organization.
                </p>
              </div>

              <div>
                <div
                  role="tablist"
                  aria-label="Hero product focus"
                  style={{
                    maxWidth: 330,
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    marginTop: 28,
                    flexWrap: "wrap",
                  }}
                >
                  {HERO_TABS.map((tab) => {
                    const isActive = tab.key === activeTab;
                    return (
                      <button
                        key={tab.key}
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => {
                          setActiveTab(tab.key);
                          startTabTimer();
                        }}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                          padding: isActive ? "5px 11px 5px 8px" : "5px 11px",
                          borderRadius: 8,
                          fontFamily: "var(--font-sans)",
                          fontSize: 13,
                          fontWeight: 500,
                          lineHeight: 1.4,
                          cursor: "pointer",
                          transition: "background .18s ease, color .18s ease",
                          border: 0,
                          background: isActive ? "#fff" : "rgba(255,255,255,0.14)",
                          color: isActive ? "#4747E0" : "rgba(255,255,255,0.9)",
                        }}
                      >
                        {isActive && (
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <circle cx="8" cy="8" r="7" fill="#4747E0" />
                            <path d="M5 8.2l2 2 4-4.3" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: 14,
                    alignItems: "center",
                    marginTop: 28,
                  }}
                >
                  <button
                    onClick={() => setShowGetStarted(true)}
                    className="hero-cta-btn"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "14px 26px",
                      background: "#fff",
                      color: "#3A3AC9",
                      borderRadius: 999,
                      fontFamily: "var(--font-sans)",
                      fontSize: 15,
                      fontWeight: 600,
                      border: 0,
                      cursor: "pointer",
                      boxShadow: "0 12px 30px -12px rgba(10,10,80,0.55)",
                    }}
                  >
                    Get Started
                    <ArrowRight color="#3A3AC9" />
                  </button>
                </div>

              </div>
            </motion.section>

            {/* Right column: a layered photo composite swaps per selected
                tab (Growth / Operations / People), each its own pair of
                person-cards, connector traces and outcome card. */}
            <motion.section
              className="hero-showcase"
              style={{
                position: "relative",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "visible",
                marginTop: "40px",
              }}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              aria-label="Product showcase"
            >
              {/* Decorative backdrop -- soft glow + thin geometric accents,
                  echoing the halo/gradient language used elsewhere in the
                  hero so the frame reads as "premium" rather than bare. */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: "-14% -10%",
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-6%",
                    right: "4%",
                    width: "58%",
                    height: "58%",
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(189,189,255,0.22) 45%, rgba(189,189,255,0) 75%)",
                    filter: "blur(6px)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "-4%",
                    left: "2%",
                    width: "42%",
                    height: "42%",
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle, rgba(147,51,234,0.45) 0%, rgba(147,51,234,0) 70%)",
                    filter: "blur(4px)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "6%",
                    left: "-2%",
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.22)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "10%",
                    left: "-4%",
                    width: 64,
                    height: 64,
                    borderRadius: 16,
                    border: "1px solid rgba(255,255,255,0.16)",
                    transform: "rotate(18deg)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "8%",
                    right: "-2%",
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 5px)",
                    gap: 6,
                    opacity: 0.35,
                  }}
                >
                  {Array.from({ length: 16 }).map((_, i) => (
                    <span
                      key={i}
                      style={{
                        width: 3,
                        height: 3,
                        borderRadius: "50%",
                        background: "#fff",
                      }}
                    />
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {/* Every tab is now a layered composite -- Growth,
                    Operations and People each get their own two person-
                    cards, connected traces and outcome card, no <video>
                    involved anywhere in the hero. */}
                <motion.div
                  key={`${activeTab}-composite`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  style={{ width: "100%" }}
                >
                  {activeTab === "growth" ? <GrowthComposite />
                    : activeTab === "operations" ? <OperationsComposite />
                    : activeTab === "people" ? <PeopleComposite />
                    : activeTab === "finance" ? <FinanceComposite />
                    : activeTab === "platform" ? <PlatformComposite />
                    : <AiComposite />}
                </motion.div>
              </AnimatePresence>
            </motion.section>
          </div>
          </div>
        </div>
      </div>
      <GetStartedModal isOpen={showGetStarted} onClose={() => setShowGetStarted(false)} />
    </div>
  );
}

