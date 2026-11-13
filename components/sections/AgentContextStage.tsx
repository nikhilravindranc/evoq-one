"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionTemplate, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { AppIcon } from "./SolutionApps";
import type { AppKey } from "./solutionsData";

/* The stage of the "AI agent context" section: six context cards on the sides, EVI in the middle, the proposed step
   below her. One value `p` (0 to 1) drives it, scroll on the home page and a timer on /hero-versions. The cards move
   in a little and stay readable and clear of EVI. `reveal` is how EVI comes into view while the context is gathered:
   a pencil drawing that fills with colour (the home page), or one of the alternatives shown on /hero-versions.
   Every card follows the same sample job (ticket 4821, a unit not cooling) so the context reads as one case. */

export const W = 1200;
export const H = 650;
const EVI = { x: 445, y: 30, w: 310, h: 450 }; // the half body, fading out above the proposed step
const CHAR = "/characters";
const IMG = `${CHAR}/evi-new.webp`;
const SKETCH = `${CHAR}/evi-new-sketch.webp`;

export type Reveal = "pencil" | "focus" | "scan" | "focus-scan" | "mosaic" | "halftone" | "silhouette" | "layers";

export type Ctx = {
  key: string; label: string; apps: (AppKey | "ctrl")[];
  x: number; y: number; w: number; // where the card starts, spread around EVI
  dx: number; // how far it moves in as you scroll; it stops well clear of EVI and stays readable
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

export const CTX: Ctx[] = [
  { key: "task", label: "Task details", apps: ["desk"], x: 20, y: 0, w: 270, dx: 24, body: (
    <>
      <Row t="Ticket 4821" s="Unit not cooling at Unit 4B" />
      <div className="wc2-chips"><span className="warn">High priority</span><span>Opened today</span></div>
    </>
  ) },
  { key: "records", label: "Relevant records", apps: ["crm"], x: 10, y: 160, w: 290, dx: 24, body: (
    <>
      <Row lead={<span className="wc2-ini">N</span>} t="Northgate Holdings" s="Customer since 2021" />
      <Row lead={<span className="wc2-ini">S</span>} t="Service contract" s="Gold, 4 hour response" />
    </>
  ) },
  { key: "activity", label: "Activity and history", apps: ["crm", "desk"], x: 20, y: 322, w: 290, dx: 24, body: (
    <>
      <Row lead={<Av who="mia" />} t="Customer called twice" s="Today, 9:40" />
      <Row lead={<Av who="sam" />} t="Filter replaced" s="Last visit, Oct 2" />
    </>
  ) },
  { key: "documents", label: "Documents and instructions", apps: [], x: 910, y: 0, w: 270, dx: -24, body: (
    <>
      <Row lead={<span className="wc2-doc"><Doc /></span>} t="Cooling repair procedure" />
      <Row lead={<span className="wc2-doc"><Doc /></span>} t="Warranty terms" />
      <Row lead={<span className="wc2-doc"><Doc /></span>} t="Site access notes" />
    </>
  ) },
  { key: "operations", label: "Operational requirements", apps: ["serviceops", "inventory"], x: 880, y: 172, w: 320, dx: -24, body: (
    <>
      <Row lead={<Av who="sam" />} t="Sam is free" s="Friday, 10:00" end={<Dot c="#1FA971" />} />
      <Row lead={<span className="wc2-ini">V</span>} t="Compressor valve" s="3 in stock" end={<Dot c="#1FA971" />} />
    </>
  ) },
  { key: "rules", label: "Rules and approvals", apps: ["ctrl"], x: 910, y: 332, w: 270, dx: -24, body: (
    <>
      <Row t="Approval mode" end={<span className="wc2-mode">Ask first</span>} />
      <Row t="Can book jobs" end={<span className="wc2-ok">Allowed</span>} />
    </>
  ) },
];

export const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
export const seg = (v: number, a: number, b: number) => clamp01((v - a) / (b - a));
export const inOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/* The beats along the value. */
export const GATHER = [0.08, 0.56] as const; // cards move in, EVI comes into view
export const OUT = [0.68, 0.82] as const; // the proposed step comes out
export const STATUS = ["Reviewing the task", "Bringing context together", "Preparing a recommendation", "Ready for review"];
export const beatOf = (v: number) => (v < GATHER[0] + 0.04 ? 0 : v < GATHER[1] ? 1 : v < OUT[0] ? 2 : 3);
const arrive = (i: number) => GATHER[1] - 0.12 + i * 0.02; // the value at which card i has finished moving

function AppTag({ a, compact = false }: { a: AppKey | "ctrl"; compact?: boolean }) {
  if (a === "ctrl") {
    return (
      <span className="wc2-app">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/symbol-color.png" alt="" width={14} height={14} />EVOQ CTRL
      </span>
    );
  }
  const name = { crm: "CRM", desk: "Desk", serviceops: "ServiceOps", inventory: "Inventory" }[a as string] ?? a;
  if (compact) return <span className="wc2-app ic" title={name}><AppIcon app={a} size={18} /></span>;
  return <span className="wc2-app"><AppIcon app={a} size={14} />{name}</span>;
}

export function CtxCard({ c }: { c: Ctx }) {
  return (
    <div className="wc2-card">
      <div className="wc2-card-h">
        <b>{c.label}</b>
        {c.apps.map((a) => <AppTag key={a} a={a} compact={c.apps.length > 1} />)}
      </div>
      <div className="wc2-prev">{c.body}</div>
    </div>
  );
}

function Moving({ c, i, p }: { c: Ctx; i: number; p: MotionValue<number> }) {
  const m = (v: number) => inOut(seg(v, GATHER[0] + i * 0.035, arrive(i)));
  const x = useTransform(p, (v) => c.dx * m(v));
  const scale = useTransform(p, (v) => 1 - 0.03 * m(v));
  return (
    <motion.div className="wc2-pos" style={{ left: c.x, top: c.y, width: c.w, x, scale }}>
      <CtxCard c={c} />
    </motion.div>
  );
}

export const Outcome = ({ wide = false }: { wide?: boolean }) => (
  <div className={`wc-card out${wide ? " wide" : ""}`}>
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

/* ------------------------------------------------------------------ how EVI comes into view */

/* the pencil drawing, with the colour rising over it from the bottom */
function Pencil({ t }: { t: MotionValue<number> }) {
  const fill = useTransform(t, (v) => v * 130);
  const mask = useMotionTemplate`linear-gradient(to top, #000 calc(${fill}% - 30%), transparent ${fill}%)`;
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="wc2-img" src={SKETCH} alt="" />
      <motion.img className="wc2-img" src={IMG} alt="EVI" style={{ maskImage: mask, WebkitMaskImage: mask }} />
    </>
  );
}

/* soft, blurred and washed out at first; sharpens into full colour */
function Focus({ t }: { t: MotionValue<number> }) {
  const blur = useTransform(t, (v) => (1 - v) * 14);
  const gray = useTransform(t, (v) => 1 - v);
  const opacity = useTransform(t, (v) => 0.5 + 0.5 * v);
  const filter = useMotionTemplate`blur(${blur}px) grayscale(${gray})`;
  return <motion.img className="wc2-img" src={IMG} alt="EVI" style={{ filter, opacity }} />;
}

/* a beam of light sweeps across a pale ghost of her and colour appears behind it; `blurred` also starts the ghost out of focus */
function Scan({ t, blurred = false }: { t: MotionValue<number>; blurred?: boolean }) {
  const x = useTransform(t, (v) => v * 112);
  const mask = useMotionTemplate`linear-gradient(to right, #000 calc(${x}% - 8%), transparent ${x}%)`;
  const left = useMotionTemplate`${x}%`;
  const beam = useTransform(t, (v) => (v > 0.01 && v < 0.88 ? 1 : 0));
  const ghostBlur = useTransform(t, (v) => (blurred ? (1 - v) * 9 : 0));
  const ghostFilter = useMotionTemplate`grayscale(1) blur(${ghostBlur}px)`;
  return (
    <>
      <motion.img className="wc2-img" src={IMG} alt="" style={{ filter: ghostFilter, opacity: 0.3 }} />
      <motion.img className="wc2-img" src={IMG} alt="EVI" style={{ maskImage: mask, WebkitMaskImage: mask }} />
      <motion.span className="wc6-beam" style={{ left, opacity: beam }} />
    </>
  );
}

/* a flat pale violet shape first; the jacket, then the face, then the hair take their colour */
function Silhouette({ t }: { t: MotionValue<number> }) {
  const step = useTransform(t, (v) => seg(v, 0.04, 0.3) * 0.42 + seg(v, 0.36, 0.62) * 0.32 + seg(v, 0.68, 0.94) * 0.26);
  const fill = useTransform(step, (v) => v * 124);
  const mask = useMotionTemplate`linear-gradient(to top, #000 calc(${fill}% - 14%), transparent ${fill}%)`;
  return (
    <>
      <span
        className="wc2-img"
        style={{ background: "#D9D2F8", maskImage: `url(${IMG})`, WebkitMaskImage: `url(${IMG})`, maskSize: "contain", WebkitMaskSize: "contain", maskPosition: "50% 100%", WebkitMaskPosition: "50% 100%", maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat" }}
      />
      <motion.img className="wc2-img" src={IMG} alt="EVI" style={{ maskImage: mask, WebkitMaskImage: mask }} />
    </>
  );
}

/* jacket first, then face, then hair, each rising into place. An approximation cut from one image; the real version
   would use separate pieces of artwork. */
function Layers({ t }: { t: MotionValue<number> }) {
  const jk = useTransform(t, (v) => inOut(seg(v, 0.05, 0.4)));
  const fc = useTransform(t, (v) => inOut(seg(v, 0.35, 0.7)));
  const hr = useTransform(t, (v) => inOut(seg(v, 0.65, 0.98)));
  const jkY = useTransform(jk, (v) => 36 * (1 - v));
  const fcY = useTransform(fc, (v) => 36 * (1 - v));
  const hrY = useTransform(hr, (v) => -36 * (1 - v));
  return (
    <>
      <motion.img className="wc2-img" src={IMG} alt="EVI" style={{ clipPath: "inset(61% 0 0 0)", opacity: jk, y: jkY }} />
      <motion.img className="wc2-img" src={IMG} alt="" style={{ clipPath: "inset(33% 0 40% 0)", opacity: fc, y: fcY }} />
      <motion.img className="wc2-img" src={IMG} alt="" style={{ clipPath: "inset(0 0 67% 0)", opacity: hr, y: hrY }} />
    </>
  );
}

/* the pixelated and halftone looks are drawn on a canvas from the same cutout */
function Dots({ t, mode }: { t: MotionValue<number>; mode: "mosaic" | "halftone" }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const real = useTransform(t, (v) => (mode === "mosaic" ? seg(v, 0.9, 1) : seg(v, 0.78, 1)));
  useEffect(() => {
    const i = new Image();
    i.onload = () => setImg(i);
    i.src = IMG;
  }, []);
  useEffect(() => {
    if (!img) return;
    const c = ref.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const CW = 620, CH = 900;
    c.width = CW; c.height = CH;
    const ih = Math.round((CW * img.height) / img.width);
    const oy = CH - ih;
    const tmp = document.createElement("canvas");
    let last = -1;
    const draw = (v: number) => {
      if (mode === "mosaic") {
        const n = Math.max(4, Math.round(4 * Math.pow(42, v)));
        if (n === last) return;
        last = n;
        const rows = Math.max(1, Math.round((n * img.height) / img.width));
        tmp.width = n; tmp.height = rows;
        const tc = tmp.getContext("2d");
        if (!tc) return;
        tc.clearRect(0, 0, n, rows);
        tc.drawImage(img, 0, 0, n, rows);
        ctx.clearRect(0, 0, CW, CH);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(tmp, 0, 0, n, rows, 0, oy, CW, ih);
      } else {
        const q = Math.round(v * 40);
        if (q === last) return;
        last = q;
        const cell = 12;
        const cols = Math.round(CW / cell), rows = Math.round(ih / cell);
        tmp.width = cols; tmp.height = rows;
        const tc = tmp.getContext("2d", { willReadFrequently: true });
        if (!tc) return;
        tc.clearRect(0, 0, cols, rows);
        tc.drawImage(img, 0, 0, cols, rows);
        const d = tc.getImageData(0, 0, cols, rows).data;
        ctx.clearRect(0, 0, CW, CH);
        const k = 0.16 + 0.9 * Math.pow(q / 40, 0.75);
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const o = (y * cols + x) * 4;
            const a = d[o + 3];
            if (a < 40) continue;
            ctx.fillStyle = `rgb(${d[o]},${d[o + 1]},${d[o + 2]})`;
            ctx.beginPath();
            ctx.arc((x + 0.5) * cell, oy + (y + 0.5) * (ih / rows), (cell / 2) * k * (a / 255), 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };
    draw(t.get());
    return t.on("change", draw);
  }, [img, t, mode]);
  return (
    <>
      <canvas ref={ref} className="wc2-img" aria-hidden="true" />
      <motion.img className="wc2-img" src={IMG} alt="EVI" style={{ opacity: real }} />
    </>
  );
}

function Figure({ p, t, reveal }: { p: MotionValue<number>; t: MotionValue<number>; reveal: Reveal }) {
  void p;
  switch (reveal) {
    case "focus": return <Focus t={t} />;
    case "scan": return <Scan t={t} />;
    case "focus-scan": return <Scan t={t} blurred />;
    case "mosaic": return <Dots t={t} mode="mosaic" />;
    case "halftone": return <Dots t={t} mode="halftone" />;
    case "silhouette": return <Silhouette t={t} />;
    case "layers": return <Layers t={t} />;
    default: return <Pencil t={t} />;
  }
}

export function AgentContextStage({ p, reveal = "pencil" }: { p: MotionValue<number>; reveal?: Reveal }) {
  const reduce = !!useReducedMotion();
  const [step, setStep] = useState(0);
  const beat = reduce ? 3 : step;
  useEffect(() => p.on("change", (v) => setStep((o) => (beatOf(v) === o ? o : beatOf(v)))), [p]);

  const t = useTransform(p, (v) => seg(v, GATHER[0] + 0.04, GATHER[1])); // how far EVI has come into view
  const glow = useTransform(p, (v) => seg(v, GATHER[1] - 0.12, GATHER[1] + 0.06));
  const outOpacity = useTransform(p, (v) => seg(v, OUT[0], OUT[1]));
  const outY = useTransform(p, (v) => 34 * (1 - inOut(seg(v, OUT[0], OUT[1]))));

  return (
    <>
      {CTX.map((c, i) => <Moving key={c.key} c={c} i={i} p={p} />)}

      <motion.span className="wc3-halo" style={{ opacity: glow, left: 400, top: 40 }} />
      <div className="wc2-char" style={{ left: EVI.x, top: EVI.y, width: EVI.w, height: EVI.h }}>
        <Figure p={p} t={t} reveal={reveal} />
      </div>

      <span className={`wc-state wc2-state b${beat}`} style={{ top: 2 }} aria-live="polite">
        {beat < 3 && <i className="wc-state-dot" />}
        {STATUS[beat]}
      </span>

      <motion.div className="wc2-out" style={{ opacity: outOpacity, y: outY, left: 260, top: 496, width: 680 }}>
        <Outcome wide />
      </motion.div>
    </>
  );
}
