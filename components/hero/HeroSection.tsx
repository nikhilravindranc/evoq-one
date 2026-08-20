"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Topbar } from "./Topbar";
import { ArrowRight } from "./icons";
import { GetStartedModal } from "@/components/shared/GetStartedModal";
import { ProductBadge } from "@/components/shared/ProductBadge";

type HeroTab = "growth" | "operations" | "people";

const HERO_TABS: { key: HeroTab; label: string }[] = [
  { key: "growth", label: "Growth" },
  { key: "operations", label: "Operations" },
  { key: "people", label: "People" },
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
  { src: "/team/growth-center.jpg", pos: "50% 16%" },
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
const PEOPLE_FIGURES = [
  { src: "/team/people-hrms.jpg",       pos: "54% 20%" },
  { src: "/team/people-center.jpg",     pos: "50% 10%" },
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
  src, pos, name, status, delay, style, cursorStyle, appKey, cardRef, imgFilter,
}: {
  src: string; pos: string; name: string; status: string; delay: number;
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
            objectFit: "cover",
            objectPosition: pos,
            display: "block",
            background: "#EEF1F8",
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

/* The action-item card: not a person, so no avatar -- an icon slot
 * instead (a checkmark for Growth, a badge cluster for Operations).
 * Sits below the whole composite in normal flow rather than absolutely
 * positioned inside it, since the frame above is already full (three
 * figures bleeding past its own edges, two callouts) -- there's no
 * clear space left inside the 16:9 box for a third floating card
 * without new collisions, but plenty of room below it. Shared between
 * tabs so both composites get the same sizing/clipping fixes for free. */
function ActionCard({
  icon, title, subtitle, cardRef,
}: {
  icon: React.ReactNode; title: string; subtitle: React.ReactNode;
  cardRef?: React.Ref<HTMLDivElement>;
}) {
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 10, rotate: 9, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
      transition={{ duration: 0.65, delay: 0.95, ease: [0.34, 1.4, 0.64, 1] }}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: "2.8cqw",
        // Fixed px padding/gap here made this card the one element in
        // the composite that didn't scale with it -- fine at hero size,
        // but at a narrower composite width (e.g. a smaller viewport)
        // the same 10-16px eats proportionally more room and the text
        // has nowhere left to fit. cqw here matches the pattern already
        // used for its own font sizes. The card sizes to its own content
        // (no explicit width) with real slack under the 99% cap, so
        // there was room to open the padding back up without bringing
        // back the clipping this was originally tightened to avoid.
        padding: "2.6cqw 3.6cqw 2.6cqw 2.4cqw",
        background: "#fff",
        borderRadius: "14px",
        boxShadow: "0 18px 36px -16px rgba(16,20,50,0.45), 0 0 0 1px rgba(16,20,50,0.05)",
        // A block-level flex container (this is flex, but not
        // inline-flex) defaults to width:auto = fill the parent's
        // width, NOT shrink-to-fit its own content -- the card was
        // still letting the flex algorithm shrink the text span below
        // its natural size even with room to spare. fit-content forces
        // it to size to what the icon+text actually need; maxWidth
        // stays on as a ceiling for genuinely narrow viewports.
        width: "fit-content",
        maxWidth: "99%",
      }}
    >
      {icon}
      {/* width:max-content, not just minWidth:0 on the card -- the card
          itself was already sizing to fit-content, but this inner
          wrapper (holding both text lines) was still being flexed to
          fit-content's *own* content-box estimate rather than its
          widest child line, landing 2-3px short of the longer of the
          two and clipping it by a hair. Forcing this span to its
          widest child directly removes that gap. */}
      <span style={{ minWidth: 0, width: "max-content" }}>
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            fontSize: "clamp(11px, 2.9cqw, 15px)",
            lineHeight: 1.25,
            color: "#1F2430",
            whiteSpace: "nowrap",
            // Same sub-pixel max-content buffer as the subtitle below --
            // whichever of the two lines is wider hits this discrepancy,
            // not just the subtitle, so both carry the same fix.
            paddingRight: 3,
          }}
        >
          {title}
        </span>
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "clamp(10px, 2.4cqw, 13px)",
            lineHeight: 1.3,
            color: "rgba(31,36,48,0.55)",
            marginTop: 3,
            whiteSpace: "nowrap",
            // A few px of intrinsic-sizing slack: the browser's
            // max-content estimate for this line (used to size its
            // parent) lands a couple px short of what the "·" glyph
            // actually renders at, clipping the last letter. Padding
            // is included in max-content's own measurement, so this
            // closes the gap instead of fighting it.
            paddingRight: 4,
          }}
        >
          {subtitle}
        </span>
      </span>
      <Cursor style={{ right: -8, bottom: -8, transform: "rotate(-6deg)" }} />
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

/* Connects Alex's and Priya's cards with the same lit-cable style as
 * the traces above them -- self-measured (its own ResizeObserver),
 * since these two cards are plain siblings in a flex row rather than
 * part of TabComposite's own geometry. Replaces an earlier gradient
 * disc + chevron "button" sitting between the cards, which read as a
 * UI control (a carousel arrow, a "next" button) rather than part of
 * the connection itself -- a plain cable reads as the connection. */
function CardLink({
  fromRef, toRef, wrapRef, delay,
}: {
  fromRef: React.RefObject<HTMLDivElement | null>;
  toRef: React.RefObject<HTMLDivElement | null>;
  wrapRef: React.RefObject<HTMLDivElement | null>;
  delay: number;
}) {
  const gradId = useId();
  const [geom, setGeom] = useState<{ w: number; h: number; d: string } | null>(null);

  useEffect(() => {
    function measure() {
      const wrap = wrapRef.current;
      const from = fromRef.current;
      const to = toRef.current;
      if (!wrap || !from || !to) return;
      const wr = wrap.getBoundingClientRect();
      const fr = from.getBoundingClientRect();
      const tr = to.getBoundingClientRect();
      const start = { x: fr.right - wr.left, y: fr.top + fr.height / 2 - wr.top };
      const end = { x: tr.left - wr.left, y: tr.top + tr.height / 2 - wr.top };
      // The gap between two adjacent cards is short -- a flat chord
      // across it reads as barely-there, not as a connection. Bowing
      // the curve down (past both endpoints' own y) gives it real
      // visible arc even over a small span, the same "cable" read as
      // the taller traces above rather than a hairline.
      const bow = Math.max(10, Math.abs(end.x - start.x) * 0.35);
      setGeom({
        w: wr.width,
        h: wr.height,
        d: `M ${start.x} ${start.y} Q ${(start.x + end.x) / 2} ${Math.max(start.y, end.y) + bow}, ${end.x} ${end.y}`,
      });
    }
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [fromRef, toRef, wrapRef]);

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
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9C8CFF" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.9)" />
        </linearGradient>
      </defs>
      <motion.path
        d={geom.d}
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth={2}
        strokeLinecap="round"
        style={{ filter: "drop-shadow(0 0 5px rgba(151,140,255,0.5))" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

/* Operations' action slot: three more person-cards, in the exact same
 * language as Raj and Mia above -- real photo, name, live status, app
 * badge, cursor accent -- rather than an icon-only card. A row of app
 * logos or a generic "checkmark" card has nothing to recognize and
 * tells no story; a person finishing a concrete task does.
 *
 * This maps the actual hand-off: Alex syncs the job into the ERP and
 * it's auto-tracked as a project (card one -- also the real merge
 * point, where both Raj's and Mia's traces land), then Ravi pulls the
 * parts from stock, then Priya bills it out -- tied back to Raj's own
 * job number so all five cards read as one continuous story. All four
 * remaining products (Sync, Projects, Inventory, Billing) are still
 * represented, through what each person actually does. */
function OperationsAction({ firstRef }: { firstRef: React.Ref<HTMLDivElement> }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const cardWidth = "clamp(134px, 28cqw, 168px)";
  const spacer = <span aria-hidden style={{ width: "4.5cqw", flexShrink: 0 }} />;

  // firstRef comes from TabComposite (it needs card one's node for the
  // main connector's own measurement) and card1Ref is needed locally
  // for CardLink -- one callback ref feeds both without fighting over
  // who owns the DOM node.
  const setCard1 = (node: HTMLDivElement | null) => {
    card1Ref.current = node;
    if (typeof firstRef === "function") firstRef(node);
    else if (firstRef && "current" in firstRef) (firstRef as React.RefObject<HTMLDivElement | null>).current = node;
  };

  return (
    <div ref={wrapRef} style={{ position: "relative", display: "flex", alignItems: "center" }}>
      <CardLink fromRef={card1Ref} toRef={card2Ref} wrapRef={wrapRef} delay={1.36} />
      <CardLink fromRef={card2Ref} toRef={card3Ref} wrapRef={wrapRef} delay={1.52} />
      <PersonCallout
        cardRef={setCard1}
        src="/team/ops-sync.jpg"
        pos="50% 20%"
        name="Alex, Ops"
        status="Synced to ERP"
        delay={0.88}
        style={{ position: "relative", width: cardWidth }}
        cursorStyle={{ right: -8, bottom: -8, transform: "rotate(-6deg)" }}
        appKey="sync"
      />
      {spacer}
      <PersonCallout
        cardRef={card2Ref}
        src="/team/ops-inventory.jpg"
        pos="50% 22%"
        name="Ravi, Stock"
        status="3 parts pulled"
        delay={1.09}
        style={{ position: "relative", width: cardWidth }}
        cursorStyle={{ left: -8, top: -8, transform: "rotate(170deg)" }}
        appKey="inventory"
      />
      {spacer}
      <PersonCallout
        cardRef={card3Ref}
        src="/team/ops-billing.jpg"
        pos="50% 18%"
        name="Priya, Billing"
        status="#482 billed"
        delay={1.3}
        style={{ position: "relative", width: cardWidth }}
        cursorStyle={{ right: -8, bottom: -8, transform: "rotate(-6deg)" }}
        appKey="billing"
      />
    </div>
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
function Connector({ geom }: { geom: ConnectorGeom }) {
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
          transition={{ duration: 0.65, delay: 0.88, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d={geom.b}
          fill="none"
          stroke="url(#connector-grad)"
          strokeWidth={2}
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.65, delay: 1.09, ease: [0.22, 1, 0.36, 1] }}
        />
      </g>
      {/* Matching dots at both ends of each cable -- "node to node"
          rather than a line that just stops. */}
      <motion.circle cx={geom.aDot.x} cy={geom.aDot.y} r={3} fill="#fff" stroke="#9C8CFF" strokeWidth={1.5}
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.35, delay: 0.88 }} />
      <motion.circle cx={geom.bDot.x} cy={geom.bDot.y} r={3} fill="#fff" stroke="#9C8CFF" strokeWidth={1.5}
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.35, delay: 1.09 }} />
      <motion.circle cx={geom.aEnd.x} cy={geom.aEnd.y} r={2.5} fill="#9C8CFF"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.35, delay: 1.36 }} />
      <motion.circle cx={geom.bEnd.x} cy={geom.bEnd.y} r={2.5} fill="#9C8CFF"
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.35, delay: 1.57 }} />
    </svg>
  );
}

type FigureSpec = { src: string; pos: string; filter?: string };
type CalloutSpec = {
  figureIndex: number;
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
  figures, calloutA, calloutB, renderAction,
}: {
  figures: FigureSpec[];
  calloutA: CalloutSpec;
  calloutB: CalloutSpec;
  // Render-prop rather than a fixed icon/title/subtitle shape: Growth's
  // action slot is one card, Operations' is a multi-step journey strip,
  // and the connector only needs a ref to whichever element is the real
  // merge point -- the render-prop is what lets each composite decide
  // that without TabComposite knowing the difference.
  renderAction: (ref: React.Ref<HTMLDivElement>) => React.ReactNode;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const aRef = useRef<HTMLDivElement>(null);
  const bRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);
  const [geom, setGeom] = useState<ConnectorGeom>(null);

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
    <Connector geom={geom} />
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
      {[
        { i: 0, left: "1%",  w: "30%", bottom: "-20%", z: 1, rot: -2.5, fromX: -64, fromY: 16 },
        { i: 1, left: "32%", w: "36%", bottom: "-30%", z: 2, rot: 0, fromX: 0, fromY: 56 },
        { i: 2, left: "69%", w: "30%", bottom: "-20%", z: 1, rot: 2.5, fromX: 64, fromY: 16 },
      ].map(({ i, left, w, bottom, z, rot, fromX, fromY }) => (
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
            aspectRatio: "1 / 1.85",
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
        src={figures[calloutA.figureIndex].src}
        pos={figures[calloutA.figureIndex].pos}
        imgFilter={figures[calloutA.figureIndex].filter}
        name={calloutA.name}
        status={calloutA.status}
        delay={0.48}
        style={calloutA.style}
        cursorStyle={calloutA.cursorStyle}
        appKey={calloutA.appKey}
      />
      <PersonCallout
        cardRef={bRef}
        src={figures[calloutB.figureIndex].src}
        pos={figures[calloutB.figureIndex].pos}
        imgFilter={figures[calloutB.figureIndex].filter}
        name={calloutB.name}
        status={calloutB.status}
        delay={0.72}
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
      <div style={{ marginTop: "24%" }}>
        {renderAction(actionRef)}
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
        status: "312 leads captured",
        appKey: "campaigns",
        style: { right: "-2%", top: "-6%", width: "50%" },
        cursorStyle: { left: -8, bottom: -8, transform: "rotate(8deg)" },
      }}
      calloutB={{
        figureIndex: 0,
        name: "Marcus, Sales Lead",
        status: "3 deals closed today",
        appKey: "crm",
        style: { left: "-2%", bottom: "5%", width: "50%" },
        cursorStyle: { right: -8, top: -8, transform: "rotate(-170deg)" },
      }}
      renderAction={(ref) => (
        <ActionCard cardRef={ref} icon={<CheckIcon />} title="Q3 growth target set" subtitle="$500K pipeline · on track" />
      )}
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
 * the parts and Billing closes it out (card two). See OperationsAction.
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
        status: "Ticket resolved in 6 min",
        appKey: "desk",
        style: { right: "-2%", top: "-6%", width: "50%" },
        cursorStyle: { left: -8, bottom: -8, transform: "rotate(8deg)" },
      }}
      calloutB={{
        figureIndex: 0,
        name: "Raj, Field Tech",
        status: "Job #482 completed",
        appKey: "serviceops",
        style: { left: "-2%", bottom: "5%", width: "50%" },
        cursorStyle: { right: -8, top: -8, transform: "rotate(-170deg)" },
      }}
      renderAction={(ref) => <OperationsAction firstRef={ref} />}
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
        status: "12 learners enrolled",
        appKey: "skillberry",
        style: { right: "-2%", top: "-6%", width: "50%" },
        cursorStyle: { left: -8, bottom: -8, transform: "rotate(8deg)" },
      }}
      calloutB={{
        figureIndex: 0,
        name: "Sam, People Ops",
        status: "Leave request approved",
        appKey: "hrms",
        style: { left: "-2%", bottom: "5%", width: "50%" },
        cursorStyle: { right: -8, top: -8, transform: "rotate(-170deg)" },
      }}
      renderAction={(ref) => (
        <ActionCard cardRef={ref} icon={<CheckIcon />} title="Growing and upskilled" subtitle="3 hires · 2 certifications" />
      )}
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
   radial-gradient(32% 40% at var(--topbar-logo-x, 6%) var(--topbar-logo-y, 8%), rgba(242,242,255,0.32) 0%, rgba(242,242,255,0.14) 40%, rgba(242,242,255,0) 75%),
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
  const AUTO_TAB_MS = 6000;

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
        const x = tRect.left + tRect.width / 2 - frameRect.left;
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
      {/* Full-width hero — no max-width cap, no rounded card */}
      <div className="w-full">
        {/*
         * Hero frame: fixed 840px tall, overflow hidden.
         * Uses flex-column so topbar takes its natural height and stage
         * fills the exact remainder -- no hardcoded topbar constant needed.
         */}
        <div
          ref={frameRef}
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
              backgroundBlendMode: "screen, normal, normal, normal",
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
                  Every part of your business.
                  <br />
                  <span style={{ color: "#BDBDFF" }}>Working together.</span>
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
                  From growth and customer relationships to daily operations
                  and people management, EVOQ gives your business the tools
                  to work better together.
                </p>
              </div>

              <div>
                <div
                  role="tablist"
                  aria-label="Hero product focus"
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                    marginTop: 32,
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
                          padding: "9px 18px",
                          borderRadius: 999,
                          fontFamily: "var(--font-sans)",
                          fontSize: 13.5,
                          fontWeight: 600,
                          cursor: "pointer",
                          transition: "background .18s ease, color .18s ease, border-color .18s ease",
                          border: isActive ? "1px solid rgba(255,255,255,0)" : "1px solid rgba(255,255,255,0.28)",
                          background: isActive ? "#fff" : "transparent",
                          color: isActive ? "#4747E0" : "rgba(255,255,255,0.85)",
                        }}
                      >
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
                    marginTop: 20,
                  }}
                >
                  <button
                    onClick={() => setShowGetStarted(true)}
                    className="hero-cta-btn"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 14px 12px 22px",
                      background: "#4747E0",
                      color: "#fff",
                      borderRadius: 999,
                      fontFamily: "var(--font-sans)",
                      fontSize: 14,
                      fontWeight: 600,
                      border: 0,
                      cursor: "pointer",
                      boxShadow:
                        "0 10px 30px -10px rgba(0,0,153,0.55), inset 0 0 0 1px rgba(255,255,255,0.08)",
                    }}
                  >
                    <span>Get Started</span>
                    <span
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.18)",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ArrowRight color="#fff" />
                    </span>
                  </button>
                </div>
              </div>
            </motion.section>

            {/* Right column: a layered photo composite swaps per selected
                tab (Growth / Operations / People), each its own pair of
                person-cards, connector traces and outcome card. */}
            <motion.section
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
                    : <PeopleComposite />}
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

