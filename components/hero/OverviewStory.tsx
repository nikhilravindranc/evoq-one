"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ProductBadge } from "@/components/shared/ProductBadge";
import { AgentTile, CHAR, Stage, Tick, card, ease, label, useStoryClock } from "./story/kit";

/* The hero's opening visual: the whole EVOQ cast. EVI in front, the five agents behind her, each
   under its category and with that category's apps. Once everyone has arrived, a spotlight moves
   through the six in turn (the five agents, then EVI). The one in the spotlight steps forward, the
   others dim, and a short outcome says what that part of EVOQ does. */

const AGENTS = [
  { key: "ava", name: "Ava", cat: "Growth", apps: ["crm", "campaigns", "configx"], outcome: "3 follow ups drafted" },
  { key: "kai", name: "Kai", cat: "Operations", apps: ["serviceops", "projects", "desk", "bookings"], outcome: "Job booked, customer notified" },
  { key: "sana", name: "Sana", cat: "People", apps: ["hrms", "skillberry"], outcome: "First week planned for a new hire" },
  { key: "rohan", name: "Rohan", cat: "Finance", apps: ["billing", "inventory"], outcome: "4 overdue reminders drafted" },
  { key: "leo", name: "Leo", cat: "Platform", apps: ["sync"], outcome: "11 of 12 records synced" },
];
const EVI_OUTCOME = "Answers come with sources";
const SPOTLIGHT = 5; // index of EVI in the six steps

// Arrival timings in seconds, then the spotlight in milliseconds.
const AT = { evi: 0.1, stem: 0.5, bar: 0.7, first: 0.9, step: 0.18, end: 1.8 };
export const OVERVIEW_FIRST_LIGHT_MS = 2200;
export const OVERVIEW_STEP_MS = 1500;
const line = "linear-gradient(180deg, rgba(255,255,255,0.9), #9C8CFF)";

function Bubble({ name, text, on, pointer }: { name: string; text: string; on: boolean; pointer: React.CSSProperties }) {
  return (
    <motion.div
      aria-hidden
      initial={false}
      animate={{ opacity: on ? 1 : 0, y: on ? 0 : 6 }}
      transition={{ duration: 0.32, ease }}
      style={{ ...card, borderRadius: 12, padding: "1.8cqw 2.4cqw", position: "relative", pointerEvents: "none" }}
    >
      <span aria-hidden style={{ position: "absolute", width: "2.2cqw", height: "2.2cqw", background: "#fff", transform: "rotate(45deg)", ...pointer }} />
      <span style={{ ...label, color: "#3A3AC9", fontSize: "clamp(8.5px, 1.9cqw, 10px)", letterSpacing: ".04em", textTransform: "uppercase" }}>{name}</span>
      <span style={{ display: "flex", alignItems: "center", gap: "1.6cqw", marginTop: 3, fontSize: "clamp(10px, 2.5cqw, 12.5px)", fontWeight: 700, color: "#1F2430", lineHeight: 1.25 }}>
        <Tick size={14} />
        {text}
      </span>
    </motion.div>
  );
}

export function OverviewStory() {
  const reduce = !!useReducedMotion();
  const { at: atT } = useStoryClock(AT.end);
  const at = (s: number) => atT(s);
  const [lit, setLit] = useState<number | null>(null);

  // The spotlight keeps moving for as long as the overview stays on screen.
  // With reduced motion the cast stays in place and nothing is spotlit.
  useEffect(() => {
    if (reduce) return;
    let i = 0;
    let id: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      setLit(0);
      id = setInterval(() => { i = (i + 1) % 6; setLit(i); }, OVERVIEW_STEP_MS);
    }, OVERVIEW_FIRST_LIGHT_MS);
    return () => { clearTimeout(start); clearInterval(id); };
  }, [reduce]);

  const spot = lit !== null;
  const eviLit = lit === SPOTLIGHT;
  const dim = (on: boolean) => (spot && !on ? 0.5 : 1);

  return (
    <Stage>
      {/* EVI, in front */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: at(AT.evi) ? dim(eviLit) : 0, scale: at(AT.evi) ? (eviLit ? 1.06 : 1) : 0.92 }}
        transition={{ duration: 0.45, ease }}
        style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.6cqw" }}
      >
        <AgentTile srcs={[`${CHAR}/evi.webp`]} size="26cqw" glow={eviLit} />
        <span style={{ ...label, color: "#fff", textAlign: "center", lineHeight: 1.2, textShadow: "0 1px 8px rgba(20,16,80,0.4)" }}>
          EVI
          <span style={{ display: "block", fontWeight: 600, opacity: 0.8, fontSize: "clamp(8.5px, 1.9cqw, 10px)" }}>AI assistant</span>
        </span>
        {/* EVI's outcome sits beside her */}
        <div style={{ position: "absolute", left: "calc(50% + 16cqw)", top: "9cqw", width: "34cqw" }}>
          <Bubble name="EVI" text={EVI_OUTCOME} on={eviLit} pointer={{ left: "-1.1cqw", top: "50%", marginTop: "-1.1cqw" }} />
        </div>
      </motion.div>

      {/* The line from EVI to each agent */}
      <div aria-hidden style={{ position: "relative", height: "9cqw", margin: "1cqw 0" }}>
        <motion.span initial={{ scaleY: 0 }} animate={{ scaleY: at(AT.stem) ? 1 : 0 }} transition={{ duration: 0.3, ease }} style={{ position: "absolute", left: "50%", top: 0, height: "4cqw", width: 2, marginLeft: -1, transformOrigin: "top", background: line, borderRadius: 2 }} />
        <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: at(AT.bar) ? 1 : 0 }} transition={{ duration: 0.45, ease }} style={{ position: "absolute", left: "10%", right: "10%", top: "4cqw", height: 2, transformOrigin: "center", background: "linear-gradient(90deg, #9C8CFF, rgba(255,255,255,0.9), #9C8CFF)", borderRadius: 2 }} />
        {AGENTS.map((a, i) => (
          <motion.span
            key={a.key}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: at(AT.first + i * AT.step) ? 1 : 0, boxShadow: lit === i ? "0 0 10px 2px rgba(190,170,255,0.9)" : "0 0 0 0 rgba(190,170,255,0)", opacity: dim(lit === i) }}
            transition={{ duration: 0.3, ease }}
            style={{ position: "absolute", left: `${10 + i * 20}%`, top: "4cqw", height: "5cqw", width: 2, marginLeft: -1, transformOrigin: "top", background: line, borderRadius: 2 }}
          />
        ))}
      </div>

      {/* The five agents, one per category, with their apps */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: "1.2cqw" }}>
        {AGENTS.map((a, i) => {
          const on = at(AT.first + i * AT.step);
          const here = lit === i;
          return (
            <motion.div
              key={a.key}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: on ? dim(here) : 0, y: on ? (here ? -3 : 0) : 14, scale: here ? 1.1 : 1 }}
              transition={{ duration: 0.4, ease }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.6cqw", minWidth: 0 }}
            >
              <AgentTile srcs={[`${CHAR}/${a.key}.webp`]} size="15.5cqw" glow={here} />
              <span style={{ ...label, color: here ? "#fff" : "rgba(255,255,255,0.86)", textAlign: "center", transition: "color .3s" }}>{a.cat}</span>
              <span style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 4, maxWidth: "15cqw" }} aria-hidden>
                {a.apps.map((k, j) => (
                  <motion.span key={k} initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.7 }} transition={{ duration: 0.3, delay: 0.2 + j * 0.06, ease }} style={{ display: "block" }}>
                    <ProductBadge productKey={k} size={18} />
                  </motion.span>
                ))}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* The outcome for whoever is in the spotlight, pointing at their tile */}
      <div aria-hidden style={{ position: "relative", height: "12cqw", marginTop: "3cqw" }}>
        {AGENTS.map((a, i) => {
          const center = 10 + i * 20;
          const width = 46;
          const left = Math.min(Math.max(center - width / 2, 0), 100 - width);
          return (
            <div key={a.key} style={{ position: "absolute", top: 0, left: `${left}%`, width: `${width}%` }}>
              <Bubble name={`${a.name} · ${a.cat}`} text={a.outcome} on={lit === i} pointer={{ left: `${((center - left) / width) * 100}%`, top: "-1.1cqw", marginLeft: "-1.1cqw" }} />
            </div>
          );
        })}
      </div>
    </Stage>
  );
}
