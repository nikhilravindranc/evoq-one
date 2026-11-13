"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Stage, card, ease } from "./story/kit";

/* The hero's opening visual: ask, then choose how much happens on its own.
   A plain question is typed into the ask bar, answers come in from different apps (each says where it came from),
   and EVI suggests a next step. Below it, the approval dial moves from Manual to Auto and the same step changes
   with it: you write it, it waits for your approval, it comes as a plan, or it is sent and logged.
   No characters and no app icons. Names, figures and dates are sample data.
   Earlier versions: OverviewCastStory, OverviewStackStory, OverviewTreeStory. */

const ASK = "What is overdue for Northgate?";
const MODES = ["Manual", "Ask first", "Plan", "Auto"] as const;
type Mode = (typeof MODES)[number];

/* Seconds into the loop. */
const AT = { bar: 0.2, type: 0.6, send: 1.9, answers: 2.2, step: 3.4, dial: 3.7 };
const MODE_AT = [3.7, 6.0, 8.5, 11.0]; // when the dial reaches each mode
const LOOP = 14.4;
export const OVERVIEW_LOOP_MS = LOOP * 1000;

const INK = "#1F2430", MUTE = "#7A8294", GREEN = "#1FA971", AMBER = "#B7791F", VIOLET = "#4B3FD6";
const fs = (min: number, cq: number, max: number) => `clamp(${min}px, ${cq}cqw, ${max}px)`;
const T = { lg: fs(11, 2.9, 14.5), md: fs(10, 2.45, 12.5), sm: fs(8.5, 2, 10.5) };
const glass: CSSProperties = {
  background: "linear-gradient(160deg, rgba(255,255,255,0.3), rgba(255,255,255,0.12))",
  backdropFilter: "blur(14px) saturate(1.4)",
  WebkitBackdropFilter: "blur(14px) saturate(1.4)",
  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.5), 0 16px 30px -18px rgba(20,14,70,0.6)",
};

/* Seconds into the loop, measured from the clock. Reduced motion holds the last frame. */
function useLoop() {
  const reduce = !!useReducedMotion();
  const [t, setT] = useState(reduce ? LOOP - 0.5 : 0);
  useEffect(() => {
    if (reduce) return;
    const start = performance.now();
    let raf = 0;
    const tick = () => {
      setT(Math.floor((((performance.now() - start) / 1000) % LOOP) * 20) / 20);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);
  return { t, reduce };
}

const Tag = ({ c, bg, children }: { c: string; bg: string; children: ReactNode }) => (
  <span style={{ display: "inline-flex", alignItems: "center", height: "4.4cqw", padding: "0 1.8cqw", borderRadius: "1.2cqw", background: bg, color: c, fontSize: T.sm, fontWeight: 700, whiteSpace: "nowrap" }}>{children}</span>
);
const Btn = ({ children, ghost }: { children: ReactNode; ghost?: boolean }) => (
  <span style={{ display: "inline-grid", placeItems: "center", height: "5.6cqw", padding: "0 3cqw", borderRadius: 999, background: ghost ? "transparent" : "#4747E0", color: ghost ? VIOLET : "#fff", boxShadow: ghost ? "inset 0 0 0 1.5px #CFCBFF" : "none", fontSize: T.sm, fontWeight: 700, whiteSpace: "nowrap" }}>{children}</span>
);
const Check = ({ on }: { on: boolean }) => (
  <span style={{ flex: "none", width: "3.6cqw", height: "3.6cqw", borderRadius: "50%", background: on ? GREEN : "#E3E5EC", display: "grid", placeItems: "center" }}>
    <svg width="60%" height="60%" viewBox="0 0 16 16" fill="none"><path d="M3 8.5 6.5 12 13 4.5" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  </span>
);

/* What the suggested step looks like in each mode. */
function StepBody({ mode }: { mode: Mode }) {
  const line = (w: string) => <span style={{ display: "block", height: "1.3cqw", width: w, borderRadius: 99, background: "#ECEEF3" }} />;
  const p: CSSProperties = { margin: 0, fontSize: T.md, color: INK, lineHeight: 1.4 };
  if (mode === "Manual") {
    return (
      <>
        <p style={p}>EVI points out the overdue invoice. You write the reminder yourself.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.2cqw", padding: "2cqw", borderRadius: "2cqw", boxShadow: "inset 0 0 0 1.5px #E3E5EC" }}>{line("40%")}{line("85%")}{line("60%")}</div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}><Btn>Write reminder</Btn></div>
      </>
    );
  }
  if (mode === "Ask first") {
    return (
      <>
        <p style={p}><b>Draft:</b> &ldquo;Hi Dana, a quick reminder that invoice 2041 for $4,800 was due on October 1.&rdquo;</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "2cqw" }}>
          <Tag c={AMBER} bg="#FDF1DC">Waiting for your approval</Tag>
          <span style={{ display: "flex", gap: "1.4cqw" }}><Btn ghost>Edit</Btn><Btn>Approve</Btn></span>
        </div>
      </>
    );
  }
  if (mode === "Plan") {
    const steps = ["Send the reminder today", "Call Dana on Friday if still unpaid", "Flag the account for the renewal review"];
    return (
      <>
        {steps.map((s, i) => (
          <div key={s} style={{ display: "flex", alignItems: "center", gap: "1.8cqw" }}>
            <span style={{ flex: "none", width: "4.4cqw", height: "4.4cqw", borderRadius: "50%", background: "#EEEBFF", color: VIOLET, display: "grid", placeItems: "center", fontSize: T.sm, fontWeight: 800 }}>{i + 1}</span>
            <span style={{ fontSize: T.md, fontWeight: 600, color: INK }}>{s}</span>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "flex-end" }}><Btn>Approve plan</Btn></div>
      </>
    );
  }
  return (
    <>
      <p style={p}>Reminder sent to Dana at Northgate. A follow up is set for Friday.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.2cqw" }}>
        {["Reminder sent, 10:42", "Follow up set for Friday", "Added to the activity log"].map((s) => (
          <span key={s} style={{ display: "flex", alignItems: "center", gap: "1.6cqw", fontSize: T.md, fontWeight: 600, color: INK }}><Check on />{s}</span>
        ))}
      </div>
    </>
  );
}

export function OverviewStory() {
  const { t, reduce } = useLoop();
  const at = (s: number) => t >= s;
  const typed = reduce ? ASK.length : Math.max(0, Math.min(ASK.length, Math.floor((t - AT.type) * 26)));
  const modeIdx = MODE_AT.reduce((m, s, i) => (t >= s ? i : m), 0);
  const mode = MODES[modeIdx];

  const answers: [string, string, ReactNode][] = [
    ["From Billing", "Invoice 2041, $4,800", <Tag key="a" c="#B42318" bg="#FDE4E4">12 days overdue</Tag>],
    ["From CRM", "Dana Reyes", <span key="b" style={{ fontSize: T.sm, color: MUTE, fontWeight: 600, whiteSpace: "nowrap" }}>Accounts, prefers email</span>],
    ["From Desk", "Ticket 4821", <Tag key="c" c="#167A43" bg="#E7F7EE">Resolved Tuesday</Tag>],
  ];

  return (
    <Stage>
      <div style={{ display: "flex", flexDirection: "column", gap: "3cqw" }}>
        {/* the ask bar */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: at(AT.bar) ? 1 : 0, y: at(AT.bar) ? 0 : 10 }} transition={{ duration: 0.45, ease }}
          style={{ ...glass, borderRadius: 999, display: "flex", alignItems: "center", gap: "2.4cqw", padding: "2cqw 2cqw 2cqw 4cqw" }}>
          <span style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
            <span style={{ fontSize: T.sm, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)" }}>Ask EVI</span>
            <span style={{ fontSize: T.lg, fontWeight: 600, color: "#fff", minHeight: "1.3em", whiteSpace: "nowrap", textShadow: "0 1px 2px rgba(20,14,70,0.3)" }}>
              {ASK.slice(0, typed)}
              {!reduce && !at(AT.send) && <span style={{ display: "inline-block", width: 1.5, height: "1em", marginLeft: 1, background: "#fff", verticalAlign: "-2px", animation: "wcPulse 0.9s ease-in-out infinite" }} />}
            </span>
          </span>
          <motion.span initial={false} animate={{ scale: at(AT.send) && !at(AT.send + 0.35) ? 1.15 : 1, backgroundColor: typed >= ASK.length ? "#4747E0" : "rgba(30,27,75,0.45)" }} transition={{ duration: 0.3 }}
            style={{ flex: "none", width: "8cqw", height: "8cqw", borderRadius: "50%", display: "grid", placeItems: "center" }}>
            <svg width="44%" height="44%" viewBox="0 0 16 16" fill="none"><path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </motion.span>
        </motion.div>

        {/* answers, each saying where it came from */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "2cqw" }}>
          {answers.map(([src, title, tag], i) => {
            const on = at(AT.answers + i * 0.22);
            return (
              <motion.div key={src} initial={{ opacity: 0, y: 12 }} animate={{ opacity: on ? 1 : 0, y: on ? 0 : 12 }} transition={{ duration: 0.4, ease }}
                style={{ ...card, borderRadius: "3cqw", padding: "2.2cqw 2.4cqw", display: "flex", flexDirection: "column", gap: "1.2cqw", minWidth: 0 }}>
                <span style={{ fontSize: T.sm, fontWeight: 700, color: VIOLET, whiteSpace: "nowrap" }}>{src}</span>
                <span style={{ fontSize: T.md, fontWeight: 700, color: INK, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{title}</span>
                <span>{tag}</span>
              </motion.div>
            );
          })}
        </div>

        {/* the suggested next step, which changes with the dial */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: at(AT.step) ? 1 : 0, y: at(AT.step) ? 0 : 14 }} transition={{ duration: 0.45, ease }}
          style={{ ...card, borderRadius: "3.6cqw", padding: "3cqw 3.4cqw", display: "flex", flexDirection: "column", gap: "2cqw" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "2cqw" }}>
            <span style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: T.sm, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: MUTE }}>Suggested next step</span>
              <span style={{ fontSize: T.lg, fontWeight: 800, color: INK, whiteSpace: "nowrap" }}>Remind Northgate about invoice 2041</span>
            </span>
          </div>
          <div style={{ position: "relative", minHeight: "22cqw" }}>
            <motion.div key={mode} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease }} style={{ display: "flex", flexDirection: "column", gap: "1.8cqw" }}>
              <StepBody mode={mode} />
            </motion.div>
          </div>
        </motion.div>

        {/* the approval dial */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: at(AT.dial) ? 1 : 0 }} transition={{ duration: 0.4 }}
          style={{ ...glass, position: "relative", borderRadius: 999, padding: "1.2cqw", display: "grid", gridTemplateColumns: `repeat(${MODES.length}, 1fr)` }}>
          <motion.span initial={false} animate={{ left: `calc(1.2cqw + ${modeIdx} * (100% - 2.4cqw) / ${MODES.length})` }} transition={{ duration: 0.55, ease }}
            style={{ position: "absolute", top: "1.2cqw", bottom: "1.2cqw", width: `calc((100% - 2.4cqw) / ${MODES.length})`, borderRadius: 999, background: "#fff", boxShadow: "0 8px 18px -10px rgba(20,14,70,0.6)" }} />
          {MODES.map((m, i) => (
            <span key={m} style={{ position: "relative", height: "6.4cqw", display: "grid", placeItems: "center", fontSize: T.md, fontWeight: 700, color: i === modeIdx ? VIOLET : "#fff", transition: "color .3s", whiteSpace: "nowrap" }}>{m}</span>
          ))}
        </motion.div>
      </div>
    </Stage>
  );
}
