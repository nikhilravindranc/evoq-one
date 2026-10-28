"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ProductBadge } from "@/components/shared/ProductBadge";
import { EviVisual, I, Ic, Star } from "./EviVisual";

/* The AI section's visual: one EVI, shown across the apps. Frame 1 is the EVOQ AI
   home (EviVisual). Frames 2-4 drop the same agent into CRM, ServiceOps and
   Billing: the same window, robot and agent card, so it reads as one agent.
   Frames are drawn on the same 1630 x 965 canvas as frame 1 and scaled to fit. */

const W = 1630;
const H = 965;

type Tone = "ok" | "warn" | "bad" | "info" | "mute";
type Row = { cells: string[]; tone: Tone; hi?: boolean; logo?: string };
type Frame = {
  key: string;
  product: string;
  name: string;
  title: string;
  cols: string[];
  grid: string;
  rows: Row[];
  hiTag: string;
  agent: { name: string; status: string; items: { ok: boolean; text: string }[]; cta: string };
  caption: string;
};

const FRAMES: Frame[] = [
  { key: "crm", product: "crm", name: "CRM", title: "Accounts", cols: ["Account", "Stage", "Owner", "Last contact"], grid: "1.5fr 1.15fr 1.1fr 1.05fr",
    hiTag: "Follow-up due",
    rows: [
      { cells: ["Northgate Partners", "Proposal sent", "Marcus Bell", "2 days ago"], tone: "info" },
      { cells: ["Bluepeak Studio", "Negotiation", "Elena Rossi", "9 days ago"], tone: "warn", hi: true },
      { cells: ["Alder & Finch", "Qualified", "Jun Tanaka", "Today"], tone: "ok" },
      { cells: ["Westbridge Labs", "Proposal sent", "Marcus Bell", "4 days ago"], tone: "info" },
    ],
    agent: { name: "EVI in CRM", status: "Draft ready", items: [{ ok: true, text: "Bluepeak follow-up drafted" }, { ok: true, text: "Revised proposal attached" }, { ok: false, text: "Needs your review" }], cta: "Review and send" },
    caption: "In CRM, EVI drafts the follow-up that's due." },
  { key: "serviceops", product: "serviceops", name: "ServiceOps", title: "Work orders", cols: ["Work order", "Customer", "Visit", "Status"], grid: "1.7fr 1.55fr 1.2fr 1fr",
    hiTag: "Conflict",
    rows: [
      { cells: ["WO-2040 Filters", "Alder & Finch", "Wed, 2:00 PM", "Scheduled"], tone: "ok" },
      { cells: ["WO-2041 Boiler", "Northgate Partners", "Thu, 10:00 AM", "Scheduled"], tone: "ok" },
      { cells: ["WO-2043 Chiller", "Bluepeak Studio", "Thu, 10:00 AM", "Conflict"], tone: "bad", hi: true },
      { cells: ["WO-2044 Pump", "Westbridge Labs", "Fri, 9:00 AM", "Scheduled"], tone: "ok" },
    ],
    agent: { name: "EVI in ServiceOps", status: "Change proposed", items: [{ ok: true, text: "Conflict found on WO-2043" }, { ok: true, text: "Fri, 10:00 AM is free" }, { ok: false, text: "Reschedule needs approval" }], cta: "Review change" },
    caption: "In ServiceOps, EVI resolves a scheduling conflict." },
  { key: "billing", product: "billing", name: "Billing", title: "Invoices", cols: ["Invoice", "Customer", "Amount", "Status"], grid: "1fr 1.6fr .9fr 1.3fr",
    hiTag: "Overdue",
    rows: [
      { cells: ["INV-2481", "Northgate Partners", "$2,750", "Paid"], tone: "ok" },
      { cells: ["INV-2486", "Bluepeak Studio", "$4,800", "Overdue 6 days"], tone: "bad", hi: true },
      { cells: ["INV-2490", "Alder & Finch", "$1,950", "Overdue 2 days"], tone: "bad" },
      { cells: ["INV-2493", "Westbridge Labs", "$3,200", "Due in 5 days"], tone: "mute" },
    ],
    agent: { name: "EVI in Billing", status: "Reminders ready", items: [{ ok: true, text: "2 overdue invoices found" }, { ok: true, text: "2 reminders drafted" }, { ok: false, text: "1 needs your approval" }], cta: "Review reminders" },
    caption: "In Billing, EVI chases the invoices that need attention." },
  { key: "desk", product: "desk", name: "Desk", title: "Tickets", cols: ["Ticket", "Customer", "Priority", "Status"], grid: "1.6fr 1.6fr .9fr 1fr",
    hiTag: "SLA at risk",
    rows: [
      { cells: ["#4818 Login", "Northgate Partners", "Low", "Resolved"], tone: "ok" },
      { cells: ["#4821 Delivery", "Bluepeak Studio", "High", "Open"], tone: "bad", hi: true },
      { cells: ["#4822 Invoice", "Alder & Finch", "Medium", "Pending"], tone: "warn" },
      { cells: ["#4825 Setup", "Westbridge Labs", "Low", "Open"], tone: "info" },
    ],
    agent: { name: "EVI in Desk", status: "Reply drafted", items: [{ ok: true, text: "Ticket #4821 marked high" }, { ok: true, text: "Reply drafted with update" }, { ok: false, text: "Escalation needs approval" }], cta: "Review reply" },
    caption: "In Desk, EVI triages the ticket and drafts the reply." },
  { key: "sync", product: "sync", name: "Sync", title: "Connections", cols: ["Connection", "Direction", "Last sync", "Status"], grid: "1.5fr 1fr 1.1fr 1fr",
    hiTag: "Sync failed",
    rows: [
      { cells: ["QuickBooks", "Two-way", "5 min ago", "Synced"], tone: "ok", logo: "/site/images/logos-quickbooks.svg" },
      { cells: ["Shopify", "Two-way", "2 hrs ago", "Failed"], tone: "bad", hi: true, logo: "/site/images/logos-shopify.svg" },
      { cells: ["Slack", "One-way", "1 hr ago", "Synced"], tone: "ok", logo: "/site/images/logos-slack.svg" },
      { cells: ["Gmail", "One-way", "3 min ago", "Synced"], tone: "ok", logo: "/site/images/logos-gmail.svg" },
    ],
    agent: { name: "EVI in Sync", status: "Fix proposed", items: [{ ok: true, text: "Shopify sync failed" }, { ok: true, text: "Retry updated 14 orders" }, { ok: false, text: "Mapping needs approval" }], cta: "Review mapping" },
    caption: "In Sync, EVI finds the broken connection and fixes it." },
];

const FIRST_CAPTION = "Ask EVI anything, and it works across your apps.";
const DUR = [9500, 7500, 7500, 7500, 7500, 7500];

function AppFrame({ f, scale }: { f: Frame; scale: number }) {
  return (
    <div className="af-fit">
      <div className="evi-canvas" style={{ width: W, height: H, transform: `scale(${scale})` }}>
        <div className="evi-window">
          <aside className="evi-side">
            <span className="evi-logo" />
            {FRAMES.map((x) => (
              <span key={x.key} className={`evi-nav${x.key === f.key ? " on" : ""}`}>
                <ProductBadge productKey={x.product} size={52} />
              </span>
            ))}
          </aside>
          <div className="evi-main af-main">
            <div className="af-head">
              <ProductBadge productKey={f.product} size={60} />
              <span className="af-prod">{f.name}</span>
              <h3>{f.title}</h3>
            </div>
            <div className="af-table">
              <div className="af-tr af-th" style={{ gridTemplateColumns: f.grid }}>
                {f.cols.map((c) => <span key={c}>{c}</span>)}
              </div>
              {f.rows.map((r, i) => (
                <div key={r.cells[0]} className={`af-tr af-in${r.hi ? " hi" : ""}`} style={{ gridTemplateColumns: f.grid, ["--d" as string]: `${0.15 + i * 0.12}s` }}>
                  {r.cells.map((c, j) => (
                    j === r.cells.length - 1
                      ? <span key={c}><i className={`af-pill ${r.tone}`}>{c}</i></span>
                      : j === 0
                        ? (
                          <span key={c} className="af-first">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            {r.logo && <img src={r.logo} alt="" width={34} height={34} />}
                            <b>{c}</b>
                          </span>
                        )
                        : <span key={c}>{c}</span>
                  ))}
                  {r.hi && <em className="af-tag">{f.hiTag}</em>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/evoq-ai/evi-robot.webp" alt="" className="evi-robot wave" />
        <Star x={1510} y={510} s={62} color="#1F6BFF" />
        <Star x={1546} y={557} s={34} color="#6C3BF5" />

        <div className="evi-card af-card">
          <div className="evi-card-h">
            <span className="evi-card-ic"><Ic d={I.rocket} size={28} color="#fff" w={2} /></span>
            <b>{f.agent.name}</b>
          </div>
          <span className="af-status">{f.agent.status}</span>
          <div className="evi-rows">
            {f.agent.items.map((it, i) => (
              <div key={it.text} className={`evi-row af-in ${it.ok ? "ok" : "warn"}`} style={{ ["--d" as string]: `${0.8 + i * 0.45}s` }}>
                <span className="evi-row-ic">
                  {it.ok
                    ? <svg width="20" height="20" viewBox="0 0 16 16" fill="none"><path d="M3.5 8.4l3 3 6-6.4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    : <b>!</b>}
                </span>
                {it.text}
              </div>
            ))}
          </div>
          <div className="evi-card-rule" />
          <span className="evi-view af-in" style={{ ["--d" as string]: "2.3s" }}>{f.agent.cta} <Ic d={I.arrow} size={24} w={2.2} /></span>
        </div>
      </div>
    </div>
  );
}

export function AiFrames() {
  const box = useRef<HTMLDivElement>(null);
  const inView = useInView(box, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [scale, setScale] = useState(0.4);
  const [idx, setIdx] = useState(0);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / W));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (reduce || !inView || hover) return;
    const t = setTimeout(() => setIdx((i) => (i + 1) % (FRAMES.length + 1)), DUR[idx]);
    return () => clearTimeout(t);
  }, [idx, inView, hover, reduce]);

  const caption = idx === 0 ? FIRST_CAPTION : FRAMES[idx - 1].caption;
  const total = FRAMES.length + 1;

  return (
    <div className="ai-frames" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div ref={box} className="af-stage">
        <AnimatePresence initial={false}>
          <motion.div
            key={idx}
            className="af-slide"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            {idx === 0 ? <EviVisual /> : <AppFrame f={FRAMES[idx - 1]} scale={scale} />}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="af-nav">
        <p className="af-cap" aria-live="polite">{caption}</p>
        <div className="af-dots" role="tablist" aria-label="AI examples">
          {Array.from({ length: total }, (_, i) => (
            <button key={i} type="button" role="tab" aria-selected={i === idx} aria-label={i === 0 ? "EVOQ AI home" : FRAMES[i - 1].caption} className={i === idx ? "on" : undefined} onClick={() => setIdx(i)} />
          ))}
        </div>
      </div>
    </div>
  );
}
