"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Eyebrow } from "./shared";
import { AppIcon } from "./SolutionApps";
import type { AppKey } from "./solutionsData";

/* "AI agent context". EVI stands in the middle in full colour and the kinds of context sit around her, dimmed.
   When the section comes into view she reads them one by one: a thread draws from her to the card, a ripple leaves
   her, and the card wakes up with a tick. Once all six are read the proposed next step comes up in front of her
   and the status moves to "Ready for review". It plays once, with a Replay link, and does not pin or scroll-drive.
   Every card follows the same sample job (ticket 4821, a unit not cooling) so the context reads as one case.
   Below 861px, and with reduced motion, the section shows the finished state. */

const W = 1200;
const H = 560;
const EVI = { x: 423, y: 36, w: 354, h: 520 };
const CHAR = "/characters";
const EVI_IMG = `${CHAR}/evi-new.webp`;

type Ctx = {
  key: string; label: string; apps: (AppKey | "ctrl")[];
  x: number; y: number; w: number; // the card
  side: "L" | "R"; ax: number; ay: number; // where its thread meets EVI
  order: number; // the turn in which EVI reads it
  body: ReactNode;
};

const Av = ({ who }: { who: string }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img className="wc2-av" src={`${CHAR}/${who}.webp`} alt="" />
);
const Doc = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 1.8h5l3 3v9.4H4zM9 1.8v3h3" /></svg>
);
const Row = ({ lead, t, s, end }: { lead?: ReactNode; t: string; s?: string; end?: ReactNode }) => (
  <div className="wc2-row">
    {lead}
    <span className="wc2-row-t"><b>{t}</b>{s && <em>{s}</em>}</span>
    {end}
  </div>
);
const Dot = ({ c }: { c: string }) => <i className="wc2-dot" style={{ background: c }} />;

const CTX: Ctx[] = [
  { key: "task", label: "Task details", apps: ["desk"], x: 20, y: 8, w: 270, side: "L", ax: 545, ay: 215, order: 0, body: (
    <>
      <Row t="Ticket 4821" s="Unit not cooling at Unit 4B" />
      <div className="wc2-chips"><span className="warn">High priority</span><span>Opened today</span></div>
    </>
  ) },
  { key: "records", label: "Relevant records", apps: ["crm"], x: 0, y: 200, w: 290, side: "L", ax: 525, ay: 335, order: 2, body: (
    <>
      <Row lead={<span className="wc2-ini">N</span>} t="Northgate Holdings" s="Customer since 2021" />
      <Row lead={<span className="wc2-ini">S</span>} t="Service contract" s="Gold, 4 hour response" />
    </>
  ) },
  { key: "activity", label: "Activity and history", apps: ["crm", "desk"], x: 20, y: 392, w: 270, side: "L", ax: 545, ay: 455, order: 4, body: (
    <>
      <Row lead={<Av who="mia" />} t="Customer called twice" s="Today, 9:40" />
      <Row lead={<Av who="sam" />} t="Filter replaced" s="Last visit, Oct 2" />
    </>
  ) },
  { key: "documents", label: "Documents and instructions", apps: [], x: 910, y: 8, w: 270, side: "R", ax: 655, ay: 215, order: 1, body: (
    <>
      <Row lead={<span className="wc2-doc"><Doc /></span>} t="Cooling repair procedure" />
      <Row lead={<span className="wc2-doc"><Doc /></span>} t="Warranty terms" />
      <Row lead={<span className="wc2-doc"><Doc /></span>} t="Site access notes" />
    </>
  ) },
  { key: "operations", label: "Operational requirements", apps: ["serviceops", "inventory"], x: 890, y: 200, w: 310, side: "R", ax: 675, ay: 335, order: 3, body: (
    <>
      <Row lead={<Av who="sam" />} t="Sam is free" s="Friday, 10:00" end={<Dot c="#1FA971" />} />
      <Row lead={<span className="wc2-ini">V</span>} t="Compressor valve" s="3 in stock" end={<Dot c="#1FA971" />} />
    </>
  ) },
  { key: "rules", label: "Rules and approvals", apps: ["ctrl"], x: 910, y: 392, w: 270, side: "R", ax: 655, ay: 455, order: 5, body: (
    <>
      <Row t="Approval mode" end={<span className="wc2-mode">Ask first</span>} />
      <Row t="Can book jobs" end={<span className="wc2-ok">Allowed</span>} />
    </>
  ) },
];

/* Seconds from the moment the section comes into view. */
const FIRST = 1.5; // the first card is read
const GAP = 0.95; // between one card and the next
const THREAD = 0.7; // a thread takes this long to draw before its card wakes
const readAt = (c: Ctx) => FIRST + c.order * GAP;
const OUT_AT = FIRST + 5 * GAP + 1.1;
const STATUS = ["Reviewing the task", "Bringing context together", "Preparing a recommendation", "Ready for review"];
const BEATS = [0.8, OUT_AT - 0.5, OUT_AT + 1.1]; // seconds at which the status moves to 1, 2 and 3

const ease = [0.22, 1, 0.36, 1] as const;
const dim = { opacity: 0.42, scale: 0.985, filter: "grayscale(0.7)", boxShadow: "0 0 0 0 rgba(143,123,255,0), 0 10px 24px -20px rgba(20,24,60,.3)" };
const awake = { opacity: 1, scale: 1, filter: "grayscale(0)", boxShadow: "0 0 0 2px #8F7BFF, 0 22px 38px -18px rgba(60,50,200,.5)" };

function AppTag({ a }: { a: AppKey | "ctrl" }) {
  if (a === "ctrl") {
    return (
      <span className="wc2-app">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/symbol-color.png" alt="" width={14} height={14} />EVOQ CTRL
      </span>
    );
  }
  const name = { crm: "CRM", desk: "Desk", serviceops: "ServiceOps", inventory: "Inventory" }[a as string] ?? a;
  return <span className="wc2-app"><AppIcon app={a} size={14} />{name}</span>;
}

function CtxCard({ c }: { c: Ctx }) {
  return (
    <div className="wc2-card">
      <div className="wc2-card-h">
        <b>{c.label}</b>
        {c.apps.map((a) => <AppTag key={a} a={a} />)}
      </div>
      <div className="wc2-prev">{c.body}</div>
    </div>
  );
}

/* A thread from the card to EVI, drawn when she reads it. */
function threadPath(c: Ctx) {
  const my = c.y + 66;
  if (c.side === "L") {
    const sx = c.x + c.w;
    return `M${sx} ${my} C ${sx + 130} ${my}, ${c.ax - 150} ${c.ay}, ${c.ax} ${c.ay}`;
  }
  return `M${c.x} ${my} C ${c.x - 130} ${my}, ${c.ax + 150} ${c.ay}, ${c.ax} ${c.ay}`;
}

const Outcome = () => (
  <div className="wc-card out">
    <div className="wc-card-h">
      <span className="wc-ic out">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M8 1.8l1.8 3.7 4 .6-2.9 2.8.7 4L8 11l-3.6 1.9.7-4L2.2 6.1l4-.6z" /></svg>
      </span>
      <span className="wc-k">Proposed next step</span>
      <span className="wc-pill ready">Ready for review</span>
    </div>
    <p className="wc-desc">Book Sam for Friday at 10:00, reserve a compressor valve and send Northgate the visit time.</p>
    <ul className="wc-checks">
      <li>Ticket, records and history read</li>
      <li>Procedure and warranty checked</li>
      <li>Approval mode applied: ask first</li>
    </ul>
    <div className="wc-actions"><span className="ghost">Review</span><span className="primary">Approve</span></div>
  </div>
);

export function SectionWorkContextWake() {
  const ref = useRef<HTMLElement>(null);
  const holder = useRef<HTMLDivElement>(null);
  const reduce = !!useReducedMotion();
  const seen = useInView(ref, { once: true, amount: 0.4 });

  const [flat, setFlat] = useState(false);
  const [scale, setScale] = useState(1);
  const [step, setStep] = useState(0);
  const beat = reduce ? 3 : step;
  const [run, setRun] = useState(0); // Replay restarts the sequence

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 860px)");
    const fit = () => {
      setFlat(mq.matches);
      const w = (holder.current?.clientWidth ?? W + 80) - 80;
      setScale(Math.max(0.5, Math.min(1, w / W)));
    };
    fit();
    mq.addEventListener("change", fit);
    window.addEventListener("resize", fit);
    return () => { mq.removeEventListener("change", fit); window.removeEventListener("resize", fit); };
  }, []);

  // The status line follows the sequence.
  useEffect(() => {
    if (reduce || !seen) return;
    const ids = BEATS.map((s, i) => setTimeout(() => setStep(i + 1), s * 1000));
    return () => ids.forEach(clearTimeout);
  }, [seen, run, reduce]);

  const go = seen || reduce;

  const head = (
    <div className="wc-head">
      <div>
        <Eyebrow>AI agent context</Eyebrow>
        <h2 className="evoq-h2 wc-h2">EVI gathers the context. <span className="accent">The agent prepares the work.</span></h2>
      </div>
      <div className="wc-lead">
        <p>Before an agent prepares anything, EVI brings together the records, documents, recent activity and instructions that apply to the task, within what that agent is permitted to access. You decide how much the agent does without asking.</p>
        <a href="/products/ai" className="wc-btn">Explore EVI and agents <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></a>
      </div>
    </div>
  );

  if (flat) {
    const reveal = { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-40px" }, transition: { duration: 0.4 } };
    return (
      <section className="s-wc s-wc-flat" ref={ref}>
        <div className="wc-inner">
          {head}
          <div className="wc2-flat-char">
            <span className="wc2-glow" style={{ opacity: 1 }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={EVI_IMG} alt="EVI" />
            <span className="wc-state b3">{STATUS[3]}</span>
          </div>
          <div className="wc2-flat-grid">
            {CTX.map((c) => <motion.div key={c.key} {...reveal}><CtxCard c={c} /></motion.div>)}
          </div>
          <motion.div className="wc2-flat-out" {...reveal}><Outcome /></motion.div>
        </div>
      </section>
    );
  }

  const t = (delay: number, duration = 0.55) => (reduce ? { duration: 0 } : { duration, delay, ease });

  return (
    <section className="s-wc s-wc3" ref={ref}>
      <div className="wc-stage">
        <div className="wc-inner" ref={holder}>
          {head}
          <div className="wc-canvas-wrap" style={{ width: W * scale, height: H * scale }}>
            <div className="wc-canvas" style={{ width: W, height: H, transform: `scale(${scale})` }} key={run}>
              {/* threads, drawn from EVI to each card as she reads it */}
              <svg className="wc3-threads" viewBox={`0 0 ${W} ${H}`} fill="none" aria-hidden="true">
                <defs>
                  <linearGradient id="wc3-grad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#8F7BFF" />
                    <stop offset="1" stopColor="#4747E0" />
                  </linearGradient>
                </defs>
                {CTX.map((c) => (
                  <g key={c.key}>
                    <path d={threadPath(c)} stroke="#CFC8FF" strokeWidth="1.5" strokeDasharray="2 6" strokeLinecap="round" />
                    <motion.path
                      d={threadPath(c)}
                      stroke="url(#wc3-grad)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      initial={{ pathLength: reduce ? 1 : 0, opacity: reduce ? 0.6 : 1 }}
                      animate={go ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 1 }}
                      transition={reduce ? { duration: 0 } : { pathLength: { duration: THREAD, delay: readAt(c) - THREAD, ease }, opacity: { duration: 0.6, delay: readAt(c) + 0.2 } }}
                    />
                  </g>
                ))}
              </svg>

              {/* a glow behind EVI and a ripple for each card she reads */}
              <span className="wc3-halo" />
              {!reduce && CTX.map((c) => (
                <motion.span
                  key={c.key}
                  className="wc3-ripple"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={go ? { opacity: [0, 0.55, 0], scale: [0.8, 1.35] } : { opacity: 0 }}
                  transition={{ duration: 1.3, delay: readAt(c) - THREAD, ease: "easeOut", times: [0, 0.2, 1] }}
                />
              ))}

              <div className="wc2-char" style={{ left: EVI.x, top: EVI.y, width: EVI.w, height: EVI.h }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="wc2-img" src={EVI_IMG} alt="EVI" />
              </div>
              <span className={`wc-state wc2-state b${beat}`} style={{ top: 2 }} aria-live="polite">
                {beat < 3 && <i className="wc-state-dot" />}
                {STATUS[beat]}
              </span>

              {CTX.map((c) => (
                <motion.div
                  key={c.key}
                  className="wc3-card"
                  style={{ left: c.x, top: c.y, width: c.w }}
                  initial={reduce ? awake : dim}
                  animate={go ? awake : dim}
                  transition={t(readAt(c), 0.6)}
                >
                  <CtxCard c={c} />
                  <motion.span
                    className="wc3-read"
                    initial={{ scale: reduce ? 1 : 0 }}
                    animate={{ scale: go ? 1 : 0 }}
                    transition={reduce ? { duration: 0 } : { duration: 0.35, delay: readAt(c) + 0.15, ease: [0.34, 1.56, 0.64, 1] }}
                    aria-hidden="true"
                  >
                    <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M3 8.5 6.5 12 13 4.5" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </motion.span>
                </motion.div>
              ))}

              <motion.div
                className="wc3-out"
                initial={reduce ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 26, scale: 0.95 }}
                animate={go ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 26, scale: 0.95 }}
                transition={t(OUT_AT, 0.65)}
              >
                <Outcome />
              </motion.div>
            </div>
          </div>
          {!reduce && (
            <button type="button" className="wc3-replay" onClick={() => { setStep(0); setRun((r) => r + 1); }} aria-label="Replay the animation">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M13.5 8a5.5 5.5 0 1 1-1.8-4.1M13.5 2.5v3h-3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Replay
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

