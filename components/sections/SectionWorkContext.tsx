"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, useMotionValue, useReducedMotion, type MotionValue } from "framer-motion";
import { Eyebrow } from "./shared";
import { EviTile } from "@/components/shared/EviTile";

/* "AI agent context" -- the kinds of context EVI can bring together for an agent.
   A tall wrapper holds a sticky stage; one scroll value (0 -> 1) plays the story:
   three main context types arrive, smaller ones gather around EVI, EVI considers
   them together while , and a proposed next step comes out
   with its approval state. Below 861px the stage is not pinned and the cards stack.

   The cards are TYPES of context, not a claim that every agent reads every type:
   what an agent actually uses depends on how it is configured and permitted. */

const W = 1200;       // canvas size the layout is drawn in; scaled to fit
const H = 480;
const CX = 600;       // character centre
const CY = 250;

type Card = {
  key: string; x: number; y: number; w: number; h: number;
  /** scroll progress at which the card starts to appear */
  at: number;
  /** "in": context EVI considers; "out": the step the agent proposes */
  dir: "in" | "out";
  size: "main" | "mini" | "out";
  body: ReactNode;
};

const Glyph = ({ d }: { d: string }) => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);
const ICON: Record<string, string> = {
  task: "M5 2.5h6v2H5zM4 3.5H3v10h10v-10h-1M5.5 8.5l1.7 1.7L10.8 6.6",
  records: "M2 3.5h12v9H2zM2 7h12M6.5 3.5v9",
  documents: "M4 1.8h5l3 3v9.4H4zM9 1.8v3h3M6 8h4M6 10.5h4",
  activity: "M1.8 8h3l2-4.5 3 9 2-4.5h2.4",
  operations: "M2.5 4h11v9.5h-11zM2.5 7h11M5.5 2.5v3M10.5 2.5v3",
  rules: "M4.5 7V5a3.5 3.5 0 017 0v2M3.5 7h9v6.5h-9z",
  outcome: "M8 1.8l1.8 3.7 4 .6-2.9 2.8.7 4L8 11l-3.6 1.9.7-4L2.2 6.1l4-.6z",
};

function Main({ k, label, title, text, chips }: { k: string; label: string; title: string; text: string; chips: [string, string?][] }) {
  return (
    <>
      <div className="wc-card-h"><span className="wc-ic"><Glyph d={ICON[k]} /></span><span className="wc-k">{label}</span></div>
      <p className="wc-title">{title}</p>
      <p className="wc-desc">{text}</p>
      <div className="wc-chiprow">{chips.map(([c, tone]) => <span key={c} className={tone ? `wc-chip ${tone}` : "wc-chip"}>{c}</span>)}</div>
    </>
  );
}

function Mini({ k, label, text }: { k: string; label: string; text: string }) {
  return (
    <div className="wc-mini-in">
      <span className="wc-ic"><Glyph d={ICON[k]} /></span>
      <span className="wc-t"><b>{label}</b><em>{text}</em></span>
    </div>
  );
}

const CARDS: Card[] = [
  { key: "task", x: 30, y: 10, w: 300, h: 168, at: 0.02, dir: "in", size: "main", body: (
    <Main k="task" label="Task details" title="Prepare the next step"
      text="Review the request, the expected outcome and what needs to happen next."
      chips={[["Priority: High", "warn"], ["Action required"]]} />
  ) },
  { key: "records", x: 0, y: 250, w: 300, h: 168, at: 0.12, dir: "in", size: "main", body: (
    <Main k="records" label="Relevant records" title="Understand the full picture"
      text="Related people, accounts, records and current statuses that affect the task."
      chips={[["Current details"], ["Related records"]]} />
  ) },
  { key: "documents", x: 870, y: 10, w: 300, h: 168, at: 0.2, dir: "in", size: "main", body: (
    <Main k="documents" label="Documents and instructions" title="Follow the right guidance"
      text="Relevant documents, internal procedures, policies and instructions."
      chips={[["Reference material"], ["Guidelines"]]} />
  ) },
  { key: "activity", x: 326, y: 26, w: 236, h: 76, at: 0.3, dir: "in", size: "mini", body: (
    <Mini k="activity" label="Activity and history" text="Recent updates, notes and previous actions" />
  ) },
  { key: "operations", x: 630, y: 26, w: 234, h: 76, at: 0.36, dir: "in", size: "mini", body: (
    <Mini k="operations" label="Operational requirements" text="Dates, availability, quantities and dependencies" />
  ) },
  { key: "rules", x: 310, y: 396, w: 236, h: 76, at: 0.42, dir: "in", size: "mini", body: (
    <Mini k="rules" label="Rules and approvals" text="Permissions and actions that need approval" />
  ) },
  { key: "outcome", x: 870, y: 232, w: 300, h: 214, at: 0.66, dir: "out", size: "out", body: (
    <>
      <div className="wc-card-h">
        <span className="wc-ic out"><Glyph d={ICON.outcome} /></span>
        <span className="wc-k">Proposed next step</span>
        <span className="wc-pill await">Approval required</span>
      </div>
      <p className="wc-desc">Prepared from the context available to this agent, within its configured permissions.</p>
      <ul className="wc-checks">
        <li>Task and expected outcome understood</li>
        <li>Records, guidance and activity considered</li>
        <li>Rules applied, approval requested</li>
      </ul>
      <div className="wc-actions"><span className="ghost">Review</span><span className="primary">Approve</span></div>
    </>
  ) },
];

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
const seg = (v: number, a: number, b: number) => clamp01((v - a) / (b - a));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const tOf = (v: number, c: Card) => easeOut(seg(v, c.at, c.at + (c.size === "mini" ? 0.16 : 0.24)));
// EVI considers the gathered context together, before the proposal appears
const THINK = [0.5, 0.64] as const;

function BurstCard({ c, p }: { c: Card; p: MotionValue<number> }) {
  const dx = CX - (c.x + c.w / 2);
  const dy = CY - (c.y + c.h / 2);
  const x = useTransform(p, (v) => dx * (1 - tOf(v, c)));
  const y = useTransform(p, (v) => dy * (1 - tOf(v, c)));
  const scale = useTransform(p, (v) => 0.1 + 0.9 * tOf(v, c));
  const opacity = useTransform(p, (v) => seg(v, c.at, c.at + 0.1));
  return (
    <motion.div className="wc-pos" style={{ left: c.x, top: c.y, width: c.w, height: c.h, x, y, scale, opacity }}>
      <div className={`wc-card ${c.size}`}>{c.body}</div>
    </motion.div>
  );
}

const STATUS = ["Reviewing the task", "Bringing context together", "Preparing a recommendation", "Ready for review"];

export function SectionWorkContext() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const still = useMotionValue(1);
  const p = reduce ? still : scrollYProgress;

  const [mobile, setMobile] = useState(false);
  const [scale, setScale] = useState(1);
  const [beat, setBeat] = useState(reduce ? 3 : 0);
  const holder = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 860px)");
    const fit = () => {
      setMobile(mq.matches);
      const w = (holder.current?.clientWidth ?? W + 80) - 80;
      const hAvail = window.innerHeight - 290;
      setScale(Math.max(0.5, Math.min(1, w / W, hAvail / H)));
    };
    fit();
    mq.addEventListener("change", fit);
    window.addEventListener("resize", fit);
    return () => { mq.removeEventListener("change", fit); window.removeEventListener("resize", fit); };
  }, []);

  // EVI responds while it considers the gathered context
  const charScale = useTransform(p, (v) => 1 + 0.06 * seg(v, THINK[0], THINK[0] + 0.05) * (1 - seg(v, THINK[1], THINK[1] + 0.05)));
  const onScroll = (v: number) => {
    const b = v < 0.12 ? 0 : v < THINK[0] ? 1 : v < THINK[1] + 0.04 ? 2 : 3;
    setBeat((o) => (o === b ? o : b));
  };
  useEffect(() => p.on("change", onScroll), [p]);

  const head = (
    <div className="wc-head">
      <div>
        <Eyebrow>AI agent context</Eyebrow>
        <h2 className="evoq-h2 wc-h2">AI agents need context to <span className="accent">act with confidence.</span></h2>
      </div>
      <div className="wc-lead">
        <p>Relevant records, documents, activity and instructions help AI agents understand the task at hand. EVI brings the available context together so agents can prepare informed actions within their configured permissions.</p>
        <a href="/products/ai" className="wc-btn">Explore EVI and agents <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></a>
      </div>
    </div>
  );
  const note = <p className="wc-note">The context each agent uses depends on how it is configured and what it is permitted to access.</p>;

  if (mobile) {
    const mains = CARDS.filter((c) => c.size === "main");
    const minis = CARDS.filter((c) => c.size === "mini");
    const out = CARDS.find((c) => c.dir === "out")!;
    const reveal = { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-40px" }, transition: { duration: 0.4 } };
    return (
      <section className="s-wc s-wc-flat" ref={ref}>
        <div className="wc-inner">
          {head}
          <div className="wc-flat-grid">
            {mains.map((c) => <motion.div key={c.key} className="wc-card main" {...reveal}>{c.body}</motion.div>)}
          </div>
          <div className="wc-flat-minis">
            {minis.map((c) => <motion.div key={c.key} className="wc-card mini" {...reveal}>{c.body}</motion.div>)}
          </div>
          <div className="wc-flat-char">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <EviTile pose="idle" style={{ width: 96 }} />
          </div>
          <motion.div className="wc-card out" {...reveal}>{out.body}</motion.div>
          {note}
        </div>
      </section>
    );
  }

  return (
    <section className="s-wc" ref={ref}>
      <div className="wc-stage">
        <div className="wc-inner" ref={holder}>
          {head}
          <div className="wc-canvas-wrap" style={{ width: W * scale, height: H * scale }}>
            <div className="wc-canvas" style={{ width: W, height: H, transform: `scale(${scale})` }}>
              <motion.div className="wc-char" style={{ left: CX - 110, top: CY - 120, scale: charScale }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <EviTile pose="idle" className="evi-tile" style={{ width: 200, marginTop: 10 }} />
                <span className={`wc-state b${beat}`} aria-live="polite">
                  {beat < 3 && <i className="wc-state-dot" />}
                  {STATUS[beat]}
                </span>
              </motion.div>

              {CARDS.map((c) => <BurstCard key={c.key} c={c} p={p} />)}
            </div>
          </div>
          {note}
        </div>
      </div>
    </section>
  );
}
