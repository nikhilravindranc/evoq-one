"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ProductBadge } from "@/components/shared/ProductBadge";
import { CHAR, Stage, Tick, card, ease, label, useStoryClock } from "./story/kit";

/* The hero's opening visual: EVOQ as a tree. EVOQ at the top, a line down to each category, and under each
   category its apps. Once everything has arrived, a spotlight moves through the five categories and then EVI:
   the one in the spotlight lifts, the others dim, and a short outcome says what that part of EVOQ does.
   This is the original tree with the agent characters taken out: the categories are shown by their apps, and
   EVI appears once, small, beside EVOQ. Earlier versions: OverviewCastStory (cast cards), OverviewStackStory
   (window stack). Outcomes are sample data. */

const CATS = [
  { key: "growth", cat: "Growth", apps: ["crm", "campaigns", "configx"], app: "CRM", outcome: "3 follow ups drafted" },
  { key: "ops", cat: "Operations", apps: ["serviceops", "projects", "desk", "bookings"], app: "ServiceOps", outcome: "Job booked, customer notified" },
  { key: "people", cat: "People", apps: ["hrms", "skillberry"], app: "HRMS", outcome: "First week planned for a new hire" },
  { key: "finance", cat: "Finance", apps: ["billing", "inventory"], app: "Billing", outcome: "4 overdue reminders drafted" },
  { key: "platform", cat: "Platform", apps: ["sync"], app: "Sync", outcome: "11 of 12 records synced" },
];
const EVI_OUTCOME = "Answers come with sources";
const EVI_STEP = CATS.length; // the last step of the spotlight

const AT = { root: 0.1, stem: 0.5, bar: 0.7, first: 0.9, step: 0.18, end: 1.8 };
const OVERVIEW_FIRST_LIGHT_MS = 2200;
const OVERVIEW_STEP_MS = 1500;
const line = "linear-gradient(180deg, rgba(255,255,255,0.9), #9C8CFF)";
const glass: CSSProperties = {
  background: "linear-gradient(160deg, rgba(255,255,255,0.3), rgba(255,255,255,0.12))",
  backdropFilter: "blur(14px) saturate(1.4)",
  WebkitBackdropFilter: "blur(14px) saturate(1.4)",
  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.5), 0 16px 30px -18px rgba(20,14,70,0.6)",
};

function Bubble({ name, text, on, pointer }: { name: string; text: string; on: boolean; pointer: CSSProperties }) {
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

export function OverviewTreeStory() {
  const reduce = !!useReducedMotion();
  const { at } = useStoryClock(AT.end);
  const [lit, setLit] = useState<number | null>(null);

  // The spotlight keeps moving for as long as the overview stays on screen.
  // With reduced motion the tree stays in place and nothing is spotlit.
  useEffect(() => {
    if (reduce) return;
    let i = 0;
    let id: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      setLit(0);
      id = setInterval(() => { i = (i + 1) % (CATS.length + 1); setLit(i); }, OVERVIEW_STEP_MS);
    }, OVERVIEW_FIRST_LIGHT_MS);
    return () => { clearTimeout(start); clearInterval(id); };
  }, [reduce]);

  const spot = lit !== null;
  const eviLit = lit === EVI_STEP;
  const dim = (on: boolean) => (spot && !on ? 0.5 : 1);

  return (
    <Stage>
      {/* EVOQ at the top, with EVI beside it */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: at(AT.root) ? 1 : 0, scale: at(AT.root) ? 1 : 0.92 }}
        transition={{ duration: 0.45, ease }}
        style={{ position: "relative", display: "flex", justifyContent: "center" }}
      >
        <motion.div
          initial={false}
          animate={{ opacity: dim(false) === 0.5 && !eviLit ? 0.85 : 1 }}
          style={{ ...glass, borderRadius: "5cqw", padding: "3.4cqw 5cqw 3cqw", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.4cqw" }}
        >
          <span style={{ width: "15cqw", height: "15cqw", borderRadius: "4cqw", background: "#fff", display: "grid", placeItems: "center", boxShadow: "0 12px 24px -12px rgba(20,14,70,0.55)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/symbol-color.png" alt="" style={{ width: "62%", height: "62%", objectFit: "contain" }} />
          </span>
          <span style={{ ...label, color: "#fff", textAlign: "center", lineHeight: 1.2, fontSize: "clamp(11px, 2.8cqw, 14px)", textShadow: "0 1px 8px rgba(20,16,80,0.4)" }}>
            EVOQ
            <span style={{ display: "block", fontWeight: 600, opacity: 0.8, fontSize: "clamp(8.5px, 1.9cqw, 10px)" }}>13 apps</span>
          </span>
        </motion.div>

        {/* EVI, the only character, small and beside EVOQ */}
        <motion.div
          initial={false}
          animate={{ opacity: at(AT.bar) ? dim(eviLit) : 0, x: at(AT.bar) ? 0 : -8, scale: eviLit ? 1.08 : 1 }}
          transition={{ duration: 0.4, ease }}
          style={{ position: "absolute", left: "calc(50% + 15cqw)", top: "5cqw", display: "flex", alignItems: "center", gap: "1.6cqw", padding: "1cqw 2.6cqw 1cqw 1cqw", borderRadius: 999, ...glass, boxShadow: eviLit ? "inset 0 0 0 1px rgba(255,255,255,0.7), 0 0 26px 4px rgba(190,170,255,0.75)" : glass.boxShadow }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${CHAR}/evi.webp`} alt="" style={{ width: "8cqw", height: "8cqw", borderRadius: "2.4cqw", objectFit: "cover", boxShadow: "0 0 0 2px #8F7BFF" }} />
          <span style={{ ...label, color: "#fff", lineHeight: 1.2, whiteSpace: "nowrap" }}>
            EVI
            <span style={{ display: "block", fontWeight: 600, opacity: 0.8, fontSize: "clamp(8.5px, 1.9cqw, 10px)" }}>AI assistant</span>
          </span>
        </motion.div>
        <div style={{ position: "absolute", left: "calc(50% + 15cqw)", bottom: "calc(100% - 3cqw)", width: "34cqw" }}>
          <Bubble name="EVI" text={EVI_OUTCOME} on={eviLit} pointer={{ left: "6cqw", bottom: "-1.1cqw" }} />
        </div>
      </motion.div>

      {/* The line from EVOQ to each category */}
      <div aria-hidden style={{ position: "relative", height: "9cqw", margin: "1cqw 0" }}>
        <motion.span initial={{ scaleY: 0 }} animate={{ scaleY: at(AT.stem) ? 1 : 0 }} transition={{ duration: 0.3, ease }} style={{ position: "absolute", left: "50%", top: 0, height: "4cqw", width: 2, marginLeft: -1, transformOrigin: "top", background: line, borderRadius: 2 }} />
        <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: at(AT.bar) ? 1 : 0 }} transition={{ duration: 0.45, ease }} style={{ position: "absolute", left: "10%", right: "10%", top: "4cqw", height: 2, transformOrigin: "center", background: "linear-gradient(90deg, #9C8CFF, rgba(255,255,255,0.9), #9C8CFF)", borderRadius: 2 }} />
        {CATS.map((c, i) => (
          <motion.span
            key={c.key}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: at(AT.first + i * AT.step) ? 1 : 0, boxShadow: lit === i ? "0 0 10px 2px rgba(190,170,255,0.9)" : "0 0 0 0 rgba(190,170,255,0)", opacity: dim(lit === i) }}
            transition={{ duration: 0.3, ease }}
            style={{ position: "absolute", left: `${10 + i * 20}%`, top: "4cqw", height: "5cqw", width: 2, marginLeft: -1, transformOrigin: "top", background: line, borderRadius: 2 }}
          />
        ))}
      </div>

      {/* The five categories, each shown by its apps */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: "1.4cqw" }}>
        {CATS.map((c, i) => {
          const on = at(AT.first + i * AT.step);
          const here = lit === i;
          return (
            <motion.div
              key={c.key}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: on ? dim(here) : 0, y: on ? (here ? -4 : 0) : 14, scale: here ? 1.08 : 1 }}
              transition={{ duration: 0.4, ease }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.6cqw", minWidth: 0 }}
            >
              <div
                aria-hidden
                style={{
                  ...glass, width: "100%", aspectRatio: "1 / 1", borderRadius: "3.6cqw", boxSizing: "border-box", padding: "2cqw",
                  display: "flex", flexWrap: "wrap", alignContent: "center", justifyContent: "center", gap: "1.4cqw",
                  boxShadow: here ? "inset 0 0 0 1.5px rgba(255,255,255,0.85), 0 0 26px 4px rgba(190,170,255,0.7)" : glass.boxShadow,
                }}
              >
                {c.apps.map((k, j) => (
                  <motion.span key={k} initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.7 }} transition={{ duration: 0.3, delay: 0.15 + j * 0.06, ease }} style={{ display: "block", borderRadius: 8, boxShadow: "0 6px 12px -6px rgba(20,14,70,0.5)" }}>
                    <ProductBadge productKey={k} size={c.apps.length > 2 ? 22 : 28} />
                  </motion.span>
                ))}
              </div>
              <span style={{ ...label, color: here ? "#fff" : "rgba(255,255,255,0.86)", textAlign: "center", transition: "color .3s" }}>{c.cat}</span>
            </motion.div>
          );
        })}
      </div>

      {/* The outcome for the category in the spotlight, pointing at it */}
      <div aria-hidden style={{ position: "relative", height: "12cqw", marginTop: "3cqw" }}>
        {CATS.map((c, i) => {
          const center = 10 + i * 20;
          const width = 46;
          const left = Math.min(Math.max(center - width / 2, 0), 100 - width);
          return (
            <div key={c.key} style={{ position: "absolute", top: 0, left: `${left}%`, width: `${width}%` }}>
              <Bubble name={`${c.cat} · ${c.app}`} text={c.outcome} on={lit === i} pointer={{ left: `${((center - left) / width) * 100}%`, top: "-1.1cqw", marginLeft: "-1.1cqw" }} />
            </div>
          );
        })}
      </div>
    </Stage>
  );
}
