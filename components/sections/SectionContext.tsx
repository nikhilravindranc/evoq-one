"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence, motion, useScroll, useTransform, useMotionValue,
  useMotionValueEvent, useReducedMotion, type MotionValue,
} from "framer-motion";
import { Eyebrow } from "./shared";

/* "One workspace" -- scroll-driven, one swap at a time.
   Left: the scattered tools a business runs on today. Centre: a narrator
   character that reads the problem aloud. Right: the EVOQ replacement,
   which the narrator "produces". A tall wrapper holds a sticky stage; one
   scroll progress value (0 -> 1) is split into six equal steps, and every
   card's motion is a function of its own step.

   Opacity and position are driven with function-form transforms on purpose:
   the array form can be handed to a native scroll timeline whose range
   drifts from ours on a sticky stage. */

type Row = { k: string; v: string };
type Step = {
  key: string;
  tag: string; oldTitle: string; oldLine: string;
  rows: Row[];                      // the same data, sorted: the "after"
  problem: string; fix: string;
};

const STEPS: Step[] = [
  { key: "leads", tag: "XLS", oldTitle: "Leads.xlsx", oldLine: "Duplicates, #REF! errors",
    rows: [{ k: "Customer", v: "Nova Retail · $120K · Quote sent" }],
    problem: "Leads and quotes sit in a spreadsheet: duplicates, errors, no history.",
    fix: "Each customer becomes one clean record, with the quote and every conversation attached." },
  { key: "inbox", tag: "MAIL", oldTitle: "Inbox + sticky notes", oldLine: "Nobody owns the work",
    rows: [{ k: "Ticket", v: "#4821 · High priority · Aisha" }, { k: "Task", v: "Call supplier · Rahul · Done" }],
    problem: "Requests pile up in a shared inbox and tasks live on sticky notes.",
    fix: "Every request becomes a ticket, and every task has an owner." },
  { key: "people", tag: "CHAT", oldTitle: "Chats + training docs", oldLine: "“Who approved the leave?”",
    rows: [{ k: "Leave", v: "Approved · Priya · 2 days" }, { k: "Training", v: "Sales coaching · 86% complete" }],
    problem: "Leave and training are tracked in chats and documents, with no record.",
    fix: "Leave approvals and training progress are recorded in one place." },
  { key: "money", tag: "PDF", oldTitle: "Invoice_v3.pdf + stock sheet", oldLine: "Which version is right?",
    rows: [{ k: "Invoice", v: "#2481 · $2,750 · Paid" }, { k: "Stock", v: "1,204 units · reorder flagged" }],
    problem: "Invoices are PDFs and stock lives in a sheet, so nothing reconciles.",
    fix: "Invoices and stock levels reconcile on their own." },
  { key: "systems", tag: "CSV", oldTitle: "Exports between systems", oldLine: "Copy, paste, repeat",
    rows: [{ k: "Systems", v: "ERP · Store · CRM · all in sync" }],
    problem: "Your systems don't talk to each other, so people copy data by hand.",
    fix: "Your systems stay in sync, with no copy and paste." },
];

/* The narrator: four poses crossfaded by phase. Until the character art in
   docs/narrator-character-brief.md exists, every pose uses the agent robot;
   change a path here (e.g. "/team/narrator-happy.png") to swap one in. */
type Pose = "idle" | "reading" | "thinking" | "happy";
const POSES: Record<Pose, string> = {
  idle: "/team/agent-hero.png",
  reading: "/team/agent-hero.png",
  thinking: "/team/agent-hero.png",
  happy: "/team/agent-hero.png",
};


const N = STEPS.length;
const PITCH = 96;      // vertical distance between rows, px
const TRAVEL = 35;     // horizontal distance column -> centre, cqw
const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
const seg = (v: number, a: number, b: number) => clamp01((v - a) / (b - a));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const local = (v: number, i: number) => clamp01(v * N - i);

/* Where each row sits relative to the vertical centre of the board. */
const rowY = (i: number) => (i - (N - 1) / 2) * PITCH;

function OldTile({ s, i, p, mobile }: { s: Step; i: number; p: MotionValue<number>; mobile: boolean }) {
  // 0-.2 lift out, .22-.55 fly to the narrator, then gone.
  const x = useTransform(p, (v) => `${easeOut(seg(local(v, i), 0.22, 0.55)) * TRAVEL}cqw`);
  const y = useTransform(p, (v) => easeOut(seg(local(v, i), 0.22, 0.55)) * -rowY(i));
  const scale = useTransform(p, (v) => {
    const l = local(v, i);
    return 1 + 0.1 * seg(l, 0, 0.18) - 0.6 * easeOut(seg(l, 0.3, 0.55));
  });
  const opacity = useTransform(p, (v) => {
    const l = local(v, i);
    if (v * N < i) return 0.55; // not its turn yet
    return (0.55 + 0.45 * seg(l, 0, 0.12)) * (1 - seg(l, 0.48, 0.58));
  });
  const ring = useTransform(p, (v) => (v * N >= i && local(v, i) < 0.55 ? 1 : 0));
  if (mobile) return null;
  return (
    <motion.div className="ctx-old" style={{ x, y, scale, opacity, top: i * PITCH }}>
      <motion.span className="ctx-old-ring" style={{ opacity: ring }} />
      <span className="ctx-old-tag">{s.tag}</span>
      <div className="ctx-old-txt">
        <b>{s.oldTitle}</b>
        <em>{s.oldLine}</em>
      </div>
      <span className="ctx-dot" />
    </motion.div>
  );
}

function NewTile({ s, i, p, mobile }: { s: Step; i: number; p: MotionValue<number>; mobile: boolean }) {
  // .55-.95 emerges from the narrator and settles into its slot.
  const t = (v: number) => easeOut(seg(local(v, i), 0.55, 0.95));
  const x = useTransform(p, (v) => (mobile ? "0cqw" : `${-TRAVEL * (1 - t(v))}cqw`));
  const y = useTransform(p, (v) => (mobile ? (1 - t(v)) * -40 : (1 - t(v)) * -rowY(i)));
  const scale = useTransform(p, (v) => 0.5 + 0.5 * t(v));
  const opacity = useTransform(p, (v) => (v * N < i ? 0 : seg(local(v, i), 0.55, 0.7)));
  // a brief indigo glow as the card lands, fading once it has settled
  const land = useTransform(p, (v) => {
    const l = local(v, i);
    return v * N < i ? 0 : seg(l, 0.8, 0.9) * (1 - seg(l, 0.96, 1));
  });
  return (
    <div className="ctx-slot" style={mobile ? undefined : { top: i * PITCH }}>
      <motion.div className="ctx-new" style={{ x, y, scale, opacity }}>
        {!mobile && <motion.span className="ctx-land" style={{ opacity: land }} aria-hidden />}
        {s.rows.map((r) => (
          <div className="ctx-new-row" key={r.k}>
            <svg className="ctx-tick" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#4747E0" /><path d="M4.6 8.2l2.3 2.3 4.5-4.8" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <div className="ctx-new-txt"><b>{r.k}</b><em>{r.v}</em></div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* Board geometry for the packet: the narrator sits at the centre column,
   slots in the right column (starting ~71cqw). Rows begin 26px below the
   column top; the narrator's figure centre is ~294px down. */
const NARR_Y = 294;
const slotY = (i: number) => 26 + i * PITCH + 44;

function Packet({ i, p, mobile }: { i: number; p: MotionValue<number> ; mobile: boolean }) {
  // .5-.82: leaves the narrator ahead of the card and lands in the slot.
  const t = (v: number) => easeOut(seg(local(v, i), 0.5, 0.82));
  const x = useTransform(p, (v) => `${50 + 24 * t(v)}cqw`);
  const y = useTransform(p, (v) => {
    const k = t(v);
    return NARR_Y + (slotY(i) - NARR_Y) * k - Math.sin(k * Math.PI) * 40;
  });
  const opacity = useTransform(p, (v) => {
    if (v * N < i) return 0;
    const l = local(v, i);
    return seg(l, 0.5, 0.55) * (1 - seg(l, 0.8, 0.86));
  });
  if (mobile) return null;
  return <motion.span className="ctx-packet" style={{ x, y, opacity }} aria-hidden />;
}

type Nar = { step: number; phase: "intro" | "problem" | "think" | "fix"; done: number };

export function SectionContext() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const still = useMotionValue(1);
  const p = reduce ? still : scrollYProgress;

  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 860px)");
    const on = () => setMobile(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  // Discrete narration state, updated only when it actually changes.
  const [nar, setNar] = useState<Nar>({ step: 0, phase: "intro", done: 0 });
  const sync = (v: number) => {
    const step = Math.min(N - 1, Math.floor(v * N));
    const l = local(v, step);
    const finished = v >= 0.995;
    const phase: Nar["phase"] = v < 0.015 ? "intro" : finished ? "fix" : l < 0.3 ? "problem" : l < 0.58 ? "think" : "fix";
    const done = finished ? N : Math.max(0, Math.min(N, step + (l >= 0.95 ? 1 : 0)));
    setNar((o) => (o.step === step && o.phase === phase && o.done === done ? o : { step, phase, done }));
  };
  useMotionValueEvent(p, "change", sync);
  useEffect(() => { sync(p.get()); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const s = STEPS[nar.step];
  const finished = nar.done === N;
  const pose: Pose = finished ? "happy" : nar.phase === "intro" ? "idle" : nar.phase === "problem" ? "reading" : nar.phase === "think" ? "thinking" : "happy";
  const line = finished
    ? "Across every EVOQ product, nothing is left behind."
    : nar.phase === "intro"
      ? "Let me show you how your tools become one workspace."
      : nar.phase === "fix" ? s.fix : s.problem;

  const bob = useTransform(p, (v) => Math.sin(v * N * Math.PI * 2) * 5);
  const glow = useTransform(p, (v) => 0.25 + 0.75 * clamp01(v * 1.05));

  return (
    <section className="s-ctx" ref={ref}>
      <div className="ctx-stage">
        <div className="ctx-head">
          <Eyebrow>One workspace</Eyebrow>
          <h2 className="evoq-h2">
            Stop running your business across <span className="accent">ten tools.</span>
          </h2>
        </div>

        <div className="ctx-board" style={{ "--n": N } as React.CSSProperties}>
          <div className="ctx-col ctx-left">
            <span className="ctx-label bad">Today · scattered</span>
            <div className="ctx-rows">{STEPS.map((st, i) => <OldTile key={st.key} s={st} i={i} p={p} mobile={mobile} />)}</div>
          </div>

          <div className="ctx-mid">
            <div className="ctx-bubble" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={`${nar.step}-${nar.phase}-${finished}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22 }}
                >
                  {line}
                </motion.p>
              </AnimatePresence>
            </div>
            <motion.div className="ctx-char" style={{ y: bob }}>
              <motion.span className="ctx-glow" style={{ opacity: glow }} aria-hidden />
              {(Object.keys(POSES) as Pose[]).map((k) => (
                <img
                  key={k}
                  src={POSES[k]}
                  alt=""
                  aria-hidden
                  className="ctx-pose"
                  style={{ opacity: pose === k ? 1 : 0 }}
                />
              ))}
            </motion.div>
            <div className={`ctx-count${finished ? " all" : ""}`}>
              <b>{nar.done}</b> of {N} connected
            </div>
          </div>

          {!reduce && STEPS.map((st, i) => <Packet key={st.key} i={i} p={p} mobile={mobile} />)}

          <div className="ctx-col ctx-right">
            <span className="ctx-label good">With EVOQ · connected</span>
            <div className="ctx-rows">{STEPS.map((st, i) => <NewTile key={st.key} s={st} i={i} p={p} mobile={mobile} />)}</div>
          </div>
        </div>

      </div>
    </section>
  );
}
