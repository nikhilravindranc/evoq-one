"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* EVOQ AI section on the Products page: a dark canvas with the three ways to use
   AI as tabs. Each tab plays its own scene; tabs auto-advance unless reduced motion. */

const P = "#4747E0";
const DEEP = "#1A1190";
const LAV = "#C9C6FF";
const MINT = "#5DCAA5";
const MS = 6500;

const MODES: [string, string][] = [
  ["Ask EVI", "Get answers and next steps across your products."],
  ["Assign an agent", "Give defined, multi-step work to an AI agent."],
  ["Let agents run automatically", "Run tasks from schedules, events or conditions."],
];

const Arrow = () => <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>;
const Check = ({ c = MINT }: { c?: string }) => <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8 12.5l2.7 2.7L16 9.8" /></svg>;

const rise = (d: number) => ({ initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.45, ease: [0.2, 0.7, 0.2, 1] as const } });

function AskScene() {
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <motion.div {...rise(0.1)} style={{ display: "flex", justifyContent: "flex-end", gap: 10, alignItems: "flex-end" }}>
        <span style={{ maxWidth: "78%", background: P, padding: "12px 16px", borderRadius: "18px 18px 6px 18px", fontSize: 14.5, fontWeight: 600 }}>Which deals need follow-up this week?</span>
        <span style={{ width: 32, height: 32, borderRadius: "50%", background: LAV, color: DEEP, fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>AN</span>
      </motion.div>
      <motion.div {...rise(0.7)} style={{ marginLeft: 44, background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.12)", borderRadius: "6px 18px 18px 18px", padding: "14px 16px", fontSize: 14, lineHeight: 1.6, color: "rgba(255,255,255,.9)" }}>
        Three deals need follow-up. <b style={{ color: "#fff" }}>Northgate Logistics</b> also has an overdue invoice in Billing, so start there.
        <div style={{ display: "grid", gap: 6, marginTop: 12 }}>
          {[["Northgate Logistics", "Renewal · invoice overdue", "#F7A8A8"], ["Beta Inc.", "Proposal sent 9 days ago", "#F5C77A"], ["Harbor Foods", "Demo done, no next step", "#F5C77A"]].map(([a, b, c]) => (
            <div key={a} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 10, background: "rgba(255,255,255,.05)", fontSize: 13 }}>
              <i style={{ width: 7, height: 7, borderRadius: "50%", background: c, flex: "none" }} />
              <b style={{ color: "#fff", fontWeight: 600 }}>{a}</b><span style={{ color: "rgba(255,255,255,.6)", marginLeft: "auto", fontSize: 12 }}>{b}</span>
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div {...rise(1.4)} style={{ marginLeft: 44, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {["Draft follow-up emails", "Schedule calls", "Send invoice reminder"].map((t) => <span key={t} style={{ background: "#fff", color: DEEP, fontSize: 12.5, fontWeight: 700, padding: "7px 13px", borderRadius: 99 }}>{t}</span>)}
      </motion.div>
    </div>
  );
}

function AgentScene() {
  const steps = ["Find overdue invoices in Billing", "Match each invoice to its account in CRM", "Draft a reminder for each contact", "Send 4 drafts to Priya for approval"];
  return (
    <div>
      <motion.div {...rise(0.05)} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <span style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(201,198,255,.14)", border: "1px solid rgba(201,198,255,.3)", display: "flex", alignItems: "center", justifyContent: "center", flex: "none" }}>
          <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke={LAV} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="8" width="16" height="11" rx="3" /><path d="M12 4v4M9 13h.01M15 13h.01M2 13v2M22 13v2" /></svg>
        </span>
        <span style={{ lineHeight: 1.35 }}><b style={{ display: "block", fontSize: 15 }}>Collections agent</b><span style={{ fontSize: 12.5, color: "rgba(255,255,255,.6)" }}>Assigned by Priya · month-end</span></span>
        <span style={{ marginLeft: "auto", fontSize: 12, fontWeight: 700, color: MINT, background: "rgba(93,202,165,.12)", padding: "4px 10px", borderRadius: 99 }}>Running</span>
      </motion.div>
      <div style={{ position: "relative", display: "grid", gap: 8 }}>
        {steps.map((s, i) => (
          <motion.div key={s} initial={{ opacity: 0.3 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.85, duration: 0.4 }} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderRadius: 12, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", fontSize: 13.5 }}>
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 + i * 0.85, type: "spring", stiffness: 400, damping: 18 }} style={{ display: "flex" }}><Check c={i === 3 ? LAV : MINT} /></motion.span>
            <span style={{ flex: 1 }}>{s}</span>
            <span style={{ fontSize: 11.5, color: "rgba(255,255,255,.5)" }}>{["Billing", "CRM", "Email", "Approval"][i]}</span>
          </motion.div>
        ))}
      </div>
      <motion.div {...rise(4)} style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 12, background: "#fff", color: DEEP, fontSize: 13.5, fontWeight: 600 }}>
        4 reminders ready for review<span style={{ marginLeft: "auto", fontSize: 12, fontWeight: 700, background: DEEP, color: "#fff", padding: "5px 11px", borderRadius: 8 }}>Approve</span>
      </motion.div>
    </div>
  );
}

function AutoScene() {
  const rows: [string, string, string][] = [["When", "Every Monday at 9:00", "Schedule"], ["If", "Any item is below its reorder level", "Inventory"], ["Then", "Create a purchase request and notify the buyer", "Inventory · Email"]];
  return (
    <div>
      <div style={{ position: "relative", display: "grid", gap: 18 }}>
        <span aria-hidden="true" style={{ position: "absolute", left: 27, top: 30, bottom: 30, width: 2, background: "linear-gradient(180deg, rgba(201,198,255,.5), rgba(93,202,165,.5))" }} />
        <motion.span aria-hidden="true" initial={{ top: 24, opacity: 0 }} animate={{ top: ["8%", "50%", "88%"], opacity: [0, 1, 1, 0] }} transition={{ delay: 0.6, duration: 2.4, times: [0, 0.5, 1], repeat: Infinity, repeatDelay: 0.8 }} style={{ position: "absolute", left: 23, width: 10, height: 10, borderRadius: "50%", background: LAV, boxShadow: `0 0 14px ${LAV}` }} />
        {rows.map(([k, t, src], i) => (
          <motion.div key={k} {...rise(0.15 + i * 0.35)} style={{ position: "relative", display: "flex", alignItems: "center", gap: 14, padding: "14px 16px 14px 12px", borderRadius: 14, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)" }}>
            <span style={{ width: 32, height: 32, borderRadius: 10, background: i === 2 ? "rgba(93,202,165,.18)" : "rgba(201,198,255,.16)", color: i === 2 ? MINT : LAV, fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flex: "none", letterSpacing: ".02em" }}>{k}</span>
            <span style={{ flex: 1, fontSize: 14, lineHeight: 1.45 }}>{t}</span>
            <span style={{ fontSize: 11.5, color: "rgba(255,255,255,.5)", whiteSpace: "nowrap" }}>{src}</span>
          </motion.div>
        ))}
      </div>
      <motion.div {...rise(1.4)} style={{ marginTop: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
        {[["14", "runs this month"], ["32", "requests created"], ["0", "stock-outs"]].map(([n, l]) => (
          <span key={l} style={{ flex: "1 1 80px", padding: "10px 12px", borderRadius: 12, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)" }}>
            <b style={{ display: "block", fontSize: 20, color: "#fff" }}>{n}</b><span style={{ fontSize: 12, color: "rgba(255,255,255,.6)" }}>{l}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function AiModes() {
  const [m, setM] = useState(0);
  const [paused, setPaused] = useState(false);
  const auto = true;

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setM((v) => (v + 1) % MODES.length), MS);
    return () => clearTimeout(t);
  }, [m, paused]);

  return (
    <section style={{ position: "relative", overflow: "hidden", background: "#0E0C2B", color: "#fff", padding: "100px 0 104px" }}>
      <style>{`
        .ai-grid{display:grid;grid-template-columns:minmax(0,.92fr) minmax(0,1.08fr);gap:56px;align-items:center}
        .ai-tab{position:relative;display:block;width:100%;text-align:left;padding:15px 18px;border-radius:14px;border:1px solid rgba(255,255,255,.1);background:transparent;color:#fff;cursor:pointer;transition:background .25s,border-color .25s;font:inherit}
        .ai-tab:hover{background:rgba(255,255,255,.04)}
        .ai-tab.on{background:rgba(255,255,255,.07);border-color:rgba(201,198,255,.45)}
        .ai-bar{position:absolute;left:18px;right:18px;bottom:8px;height:2px;border-radius:2px;background:rgba(255,255,255,.1);overflow:hidden}
        .ai-bar i{display:block;height:100%;background:${LAV};transform-origin:left;animation:aiFill ${MS}ms linear forwards}
        .ai-tab.hold .ai-bar i{animation-play-state:paused}
        @keyframes aiFill{from{transform:scaleX(0)}to{transform:scaleX(1)}}
        .ai-stage{position:relative;min-height:440px;border-radius:24px;padding:28px 28px 28px;background:linear-gradient(160deg,rgba(255,255,255,.07),rgba(255,255,255,.02));border:1px solid rgba(255,255,255,.12);box-shadow:0 50px 100px -50px rgba(0,0,0,.8)}
        .ai-btn{transition:transform .2s ease,box-shadow .2s ease}.ai-btn:hover{transform:translateY(-2px);box-shadow:0 16px 30px -16px rgba(201,198,255,.6)}
        @media (max-width:980px){.ai-grid{grid-template-columns:1fr;gap:36px}.ai-evi{display:none}}
        @media (max-width:640px){.ai-stage{padding:20px;min-height:0}}
      `}</style>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px)", backgroundSize: "56px 56px", maskImage: "radial-gradient(ellipse at 70% 50%, #000 0%, transparent 70%)", WebkitMaskImage: "radial-gradient(ellipse at 70% 50%, #000 0%, transparent 70%)" }} />
      <div aria-hidden="true" style={{ position: "absolute", right: "-10%", top: "10%", width: 760, height: 620, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(71,71,224,.42), rgba(71,71,224,0))" }} />
      <div aria-hidden="true" style={{ position: "absolute", left: "-12%", bottom: "-30%", width: 600, height: 500, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(150,80,255,.22), rgba(150,80,255,0))" }} />

      <div className="pd-wrap ai-grid" style={{ position: "relative" }}>
        <div data-rv="0">
          <p style={{ margin: "0 0 14px", fontSize: 12, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: LAV }}>EVOQ AI</p>
          <h2 style={{ margin: 0, fontSize: 44, lineHeight: 1.1, letterSpacing: "-.025em", fontWeight: 700, color: "#fff", fontFamily: "var(--font-display), system-ui, sans-serif" }}>AI that works across your products</h2>
          <p style={{ margin: "20px 0 0", fontSize: 17, lineHeight: 1.75, color: "rgba(255,255,255,.75)", maxWidth: "50ch" }}>EVOQ AI brings AI into the products, systems and processes where your work happens. Ask EVI for help, assign work to AI agents, or let AI work automatically.</p>
          <div role="tablist" aria-label="Ways to use EVOQ AI" style={{ marginTop: 30, display: "grid", gap: 10, maxWidth: 520 }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            {MODES.map(([t, d], i) => (
              <button key={t} type="button" role="tab" aria-selected={m === i} className={`ai-tab${m === i ? " on" : ""}${paused ? " hold" : ""}`} onClick={() => { setM(i); }}>
                <span style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ width: 30, height: 30, borderRadius: 9, background: m === i ? "#fff" : "rgba(255,255,255,.08)", color: m === i ? DEEP : "rgba(255,255,255,.7)", fontSize: 13, fontWeight: 800, display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "none", transition: "background .25s,color .25s" }}>{i + 1}</span>
                  <span>
                    <b style={{ display: "block", fontSize: 15.5, fontWeight: 700 }}>{t}</b>
                    <span style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,.62)", marginTop: 2 }}>{d}</span>
                  </span>
                </span>
                {m === i && auto && <span className="ai-bar"><i key={m} /></span>}
              </button>
            ))}
          </div>
          <a href="/products/ai" className="ai-btn" style={{ marginTop: 32, display: "inline-flex", alignItems: "center", gap: 10, padding: "15px 28px", borderRadius: 12, background: "#fff", color: DEEP, textDecoration: "none", fontSize: 15, fontWeight: 700 }}>Explore EVOQ AI <Arrow /></a>
        </div>

        <div data-rv="1" style={{ position: "relative" }} aria-live="polite">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="ai-evi" src="/evoq-ai/evi-hold.webp" alt="" width={1010} height={784} style={{ position: "absolute", right: -18, top: -92, width: 150, height: "auto", zIndex: 2, filter: "drop-shadow(0 20px 30px rgba(0,0,0,.5))", pointerEvents: "none" }} />
          <div className="ai-stage">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22, paddingBottom: 16, borderBottom: "1px solid rgba(255,255,255,.08)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/ai/ai-logo-icon.png" alt="" width={22} height={22} style={{ width: 22, height: 22, objectFit: "contain" }} />
              <b style={{ fontSize: 14 }}>EVOQ AI</b>
              <span style={{ fontSize: 12.5, color: "rgba(255,255,255,.55)" }}>· {MODES[m][0]}</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={m} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                {m === 0 ? <AskScene /> : m === 1 ? <AgentScene /> : <AutoScene />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
