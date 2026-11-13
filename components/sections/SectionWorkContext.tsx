"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Eyebrow } from "./shared";
import { AppIcon } from "./SolutionApps";
import type { AppKey } from "./solutionsData";

/* "AI agent context", after Monday's "Work in context". A tall wrapper holds a sticky stage, and one scroll value
   (0 to 1) plays the story: EVI starts as a line drawing with the kinds of context spread around her; as you scroll
   the cards move in behind her shoulders and she fills with colour; then the step the agent proposes comes out.
   Every card follows the same sample job (ticket 4821, a unit not cooling) so the context reads as one case.
   Below 861px, and with reduced motion, the section shows the finished state without pinning. */

const W = 1200;
const H = 560;
const EVI = { x: 423, y: 36, w: 354, h: 520 }; // the half body, cut off by the bottom of the stage

type Ctx = {
  key: string; label: string; apps: (AppKey | "ctrl")[];
  x: number; y: number; w: number; // where the card starts, spread around EVI
  ex: number; ey: number; // the centre it ends at, behind EVI
  body: ReactNode;
};

const CHAR = "/characters";
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
  { key: "task", label: "Task details", apps: ["desk"], x: 50, y: 0, w: 250, ex: 418, ey: 120, body: (
    <>
      <Row t="Ticket 4821" s="Unit not cooling at Unit 4B" />
      <div className="wc2-chips"><span className="warn">High priority</span><span>Opened today</span></div>
    </>
  ) },
  { key: "records", label: "Relevant records", apps: ["crm"], x: 0, y: 196, w: 262, ex: 392, ey: 290, body: (
    <>
      <Row lead={<span className="wc2-ini">N</span>} t="Northgate Holdings" s="Customer since 2021" />
      <Row lead={<span className="wc2-ini">S</span>} t="Service contract" s="Gold, 4 hour response" />
    </>
  ) },
  { key: "activity", label: "Activity and history", apps: ["crm", "desk"], x: 120, y: 392, w: 260, ex: 430, ey: 448, body: (
    <>
      <Row lead={<Av who="mia" />} t="Customer called twice" s="Today, 9:40" />
      <Row lead={<Av who="sam" />} t="Filter replaced" s="Last visit, Oct 2" />
    </>
  ) },
  { key: "documents", label: "Documents and instructions", apps: [], x: 900, y: 0, w: 250, ex: 782, ey: 120, body: (
    <>
      <Row lead={<span className="wc2-doc"><Doc /></span>} t="Cooling repair procedure" />
      <Row lead={<span className="wc2-doc"><Doc /></span>} t="Warranty terms" />
      <Row lead={<span className="wc2-doc"><Doc /></span>} t="Site access notes" />
    </>
  ) },
  { key: "operations", label: "Operational requirements", apps: ["serviceops", "inventory"], x: 896, y: 196, w: 304, ex: 808, ey: 290, body: (
    <>
      <Row lead={<Av who="sam" />} t="Sam is free" s="Friday, 10:00" end={<Dot c="#1FA971" />} />
      <Row lead={<span className="wc2-ini">V</span>} t="Compressor valve" s="3 in stock" end={<Dot c="#1FA971" />} />
    </>
  ) },
  { key: "rules", label: "Rules and approvals", apps: ["ctrl"], x: 820, y: 392, w: 260, ex: 770, ey: 448, body: (
    <>
      <Row t="Approval mode" end={<span className="wc2-mode">Ask first</span>} />
      <Row t="Can book jobs" end={<span className="wc2-ok">Allowed</span>} />
    </>
  ) },
];

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
const seg = (v: number, a: number, b: number) => clamp01((v - a) / (b - a));
const inOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/* The beats along the scroll. */
const GATHER = [0.08, 0.56] as const; // cards move in, EVI fills with colour
const OUT = [0.66, 0.8] as const; // the proposed step comes out
const STATUS = ["Reviewing the task", "Bringing context together", "Preparing a recommendation", "Ready for review"];
const beatOf = (v: number) => (v < GATHER[0] + 0.04 ? 0 : v < GATHER[1] ? 1 : v < OUT[0] ? 2 : 3);

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

function Moving({ c, i, p }: { c: Ctx; i: number; p: MotionValue<number> }) {
  const m = (v: number) => inOut(seg(v, GATHER[0] + i * 0.035, GATHER[1] - 0.12 + i * 0.02));
  const dx = c.ex - (c.x + c.w / 2);
  const dy = c.ey - (c.y + 70);
  const x = useTransform(p, (v) => dx * m(v));
  const y = useTransform(p, (v) => dy * m(v));
  const scale = useTransform(p, (v) => 1 - 0.42 * m(v));
  return (
    <motion.div className="wc2-pos" style={{ left: c.x, top: c.y, width: c.w, x, y, scale }}>
      <CtxCard c={c} />
    </motion.div>
  );
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

export function SectionWorkContext() {
  const ref = useRef<HTMLElement>(null);
  const holder = useRef<HTMLDivElement>(null);
  const reduce = !!useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const still = useMotionValue(1);
  const p = reduce ? still : scrollYProgress;

  const [flat, setFlat] = useState(false);
  const [scale, setScale] = useState(1);
  const [beat, setBeat] = useState(reduce ? 3 : 0);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 860px)");
    const fit = () => {
      setFlat(mq.matches);
      const w = (holder.current?.clientWidth ?? W + 80) - 80;
      const hAvail = window.innerHeight - 250;
      setScale(Math.max(0.5, Math.min(1, w / W, hAvail / H)));
    };
    fit();
    mq.addEventListener("change", fit);
    window.addEventListener("resize", fit);
    return () => { mq.removeEventListener("change", fit); window.removeEventListener("resize", fit); };
  }, []);

  useEffect(() => p.on("change", (v) => setBeat((o) => (beatOf(v) === o ? o : beatOf(v)))), [p]);

  // the colour rises over the line drawing from the bottom, with a soft edge
  const fill = useTransform(p, (v) => seg(v, GATHER[0] + 0.04, GATHER[1]) * 130);
  const mask = useMotionTemplate`linear-gradient(to top, #000 calc(${fill}% - 30%), transparent ${fill}%)`;
  const glow = useTransform(p, (v) => seg(v, GATHER[1] - 0.12, GATHER[1] + 0.06));
  const outOpacity = useTransform(p, (v) => seg(v, OUT[0], OUT[1]));
  const outX = useTransform(p, (v) => 40 * (1 - inOut(seg(v, OUT[0], OUT[1]))));

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
            <img src={`${CHAR}/evi-half.webp`} alt="EVI" />
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

  return (
    <section className={`s-wc s-wc2${reduce ? " still" : ""}`} ref={ref}>
      <div className="wc-stage">
        <div className="wc-inner" ref={holder}>
          {head}
          <div className="wc-canvas-wrap" style={{ width: W * scale, height: H * scale }}>
            <div className="wc-canvas" style={{ width: W, height: H, transform: `scale(${scale})` }}>
              {CTX.map((c, i) => <Moving key={c.key} c={c} i={i} p={p} />)}

              <div className="wc2-char" style={{ left: EVI.x, top: EVI.y, width: EVI.w, height: EVI.h }}>
                <motion.span className="wc2-glow" style={{ opacity: glow }} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="wc2-img" src={`${CHAR}/evi-half-sketch.webp`} alt="" />
                { }
                <motion.img className="wc2-img" src={`${CHAR}/evi-half.webp`} alt="EVI" style={{ maskImage: mask, WebkitMaskImage: mask }} />
              </div>
              <span className={`wc-state wc2-state b${beat}`} aria-live="polite">
                {beat < 3 && <i className="wc-state-dot" />}
                {STATUS[beat]}
              </span>

              <motion.div className="wc2-out" style={{ opacity: outOpacity, x: outX }}>
                <Outcome />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
