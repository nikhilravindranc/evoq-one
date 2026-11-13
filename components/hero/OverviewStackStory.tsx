"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ProductBadge } from "@/components/shared/ProductBadge";
import { Stage, ease } from "./story/kit";

/* The hero's opening visual: a fanned stack of EVOQ app windows. The front window cycles through CRM, Desk,
   Billing and HRMS, and each one shows a small change as it comes forward: a deal is won, a ticket is resolved,
   an invoice is paid, a new hire's first week is set up. A dock below names the app in front.
   No characters; names, records and figures are sample data. The earlier character version is OverviewCastStory. */

const GREEN = "#1FA971", AMBER = "#E8A21B", RED = "#E2445C", VIOLET = "#6D5BFF", INK = "#1F2430", MUTE = "#7A8294";
const STEP = 3.4; // seconds each app stays in front
const CHANGE = 1.1; // seconds after arriving in front that its change plays

type App = { key: string; name: string; view: string; badge: string; c: string };
const APPS: App[] = [
  { key: "crm", name: "CRM", view: "Pipeline", badge: "crm", c: "#2554EB" },
  { key: "desk", name: "Desk", view: "Open tickets", badge: "desk", c: "#0E8C82" },
  { key: "billing", name: "Billing", view: "Invoices", badge: "billing", c: "#7C6EF0" },
  { key: "hrms", name: "HRMS", view: "Onboarding", badge: "hrms", c: "#1B7F5A" },
];
export const OVERVIEW_STACK_LOOP_MS = APPS.length * STEP * 1000;

/* Where each depth sits: 0 is the front window. */
const SLOTS = [
  { x: 0, y: 0, s: 1, r: 0, o: 1 },
  { x: 4.5, y: -5.5, s: 0.93, r: 3, o: 1 },
  { x: -4.5, y: -9, s: 0.87, r: -3.5, o: 0.95 },
  { x: 0, y: -12, s: 0.81, r: 0, o: 0.8 },
];

const fs = (min: number, cq: number, max: number) => `clamp(${min}px, ${cq}cqw, ${max}px)`;
const T = { title: fs(11, 2.9, 14.5), body: fs(9.5, 2.3, 12), small: fs(8.5, 1.95, 10.5) };

function Pill({ c, children, solid }: { c: string; children: string; solid?: boolean }) {
  return (
    <motion.span
      initial={false}
      animate={{ backgroundColor: solid ? c : `${c}1F`, color: solid ? "#fff" : c }}
      transition={{ duration: 0.4, ease }}
      style={{ flex: "none", display: "inline-grid", placeItems: "center", height: "4.6cqw", minWidth: "15cqw", padding: "0 1.8cqw", borderRadius: "1.2cqw", fontSize: T.small, fontWeight: 700, whiteSpace: "nowrap" }}
    >
      <motion.span key={children} initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>{children}</motion.span>
    </motion.span>
  );
}
const Ini = ({ t, c }: { t: string; c: string }) => (
  <span style={{ flex: "none", width: "6cqw", height: "6cqw", borderRadius: "50%", background: `${c}1F`, color: c, display: "grid", placeItems: "center", fontSize: T.small, fontWeight: 800 }}>{t}</span>
);
const row: CSSProperties = { display: "flex", alignItems: "center", gap: "2cqw", height: "8.6cqw", borderTop: "1px solid #F0F1F5" };
const rowT: CSSProperties = { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "0.5cqw" };
const b: CSSProperties = { fontSize: T.body, fontWeight: 700, color: INK, whiteSpace: "nowrap" };
const em: CSSProperties = { fontSize: T.small, color: MUTE, whiteSpace: "nowrap" };

/* CRM: Northgate moves from Proposal to Won. */
function Crm({ on }: { on: boolean }) {
  const cols = ["Proposal", "Negotiation", "Won"];
  const deal = (name: string, amt: string, hi = false) => (
    <motion.div layout layoutId={`crm-${name}`} transition={{ duration: 0.6, ease }} key={name} style={{ padding: "1.6cqw", borderRadius: "1.8cqw", background: "#fff", boxShadow: hi && on ? `0 0 0 1.5px ${GREEN}, 0 8px 16px -10px rgba(20,24,60,.5)` : "0 0 0 1px rgba(31,36,48,.08)", display: "flex", flexDirection: "column", gap: "0.6cqw" }}>
      <span style={b}>{name}</span>
      <span style={{ ...em, color: hi && on ? GREEN : "#2554EB", fontWeight: 700 }}>{amt}</span>
    </motion.div>
  );
  const cards: Record<string, ReactNode[]> = {
    Proposal: [deal("Bluepeak", "$22K"), ...(on ? [] : [deal("Northgate", "$48K", true)])],
    Negotiation: [deal("Alder", "$15K"), deal("Ridgeway", "$31K")],
    Won: [...(on ? [deal("Northgate", "$48K", true)] : []), deal("Harper", "$12K")],
  };
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.8cqw", height: "100%" }}>
      {cols.map((c) => (
        <div key={c} style={{ borderRadius: "2.2cqw", background: c === "Won" ? "#EAF7F0" : "#F4F5F8", padding: "1.6cqw", display: "flex", flexDirection: "column", gap: "1.4cqw" }}>
          <span style={{ ...em, fontWeight: 700, color: c === "Won" ? GREEN : MUTE }}>{c}</span>
          {cards[c]}
        </div>
      ))}
    </div>
  );
}

/* Desk: ticket 4821 is resolved. */
function Desk({ on }: { on: boolean }) {
  const t: [string, string, string, string][] = [
    ["4821", "Unit not cooling", "Northgate", on ? "Resolved" : "Open"],
    ["4822", "Invoice copy needed", "Bluepeak", "Waiting"],
    ["4823", "Door sensor fault", "Alder", "Open"],
    ["4824", "Change visit time", "Harper", "New"],
  ];
  const tone = (s: string) => (s === "Resolved" ? GREEN : s === "Waiting" ? AMBER : s === "New" ? VIOLET : RED);
  return (
    <div>
      {t.map(([id, title, who, st], i) => (
        <div key={id} style={{ ...row, borderTop: i ? row.borderTop : "none" }}>
          <span style={{ ...em, width: "8cqw", fontWeight: 700 }}>#{id}</span>
          <span style={rowT}><span style={b}>{title}</span><span style={em}>{who}</span></span>
          <Pill c={tone(st)} solid={st === "Resolved"}>{st}</Pill>
        </div>
      ))}
    </div>
  );
}

/* Billing: invoice 2041 is paid and the collected total goes up. */
function Billing({ on }: { on: boolean }) {
  const inv: [string, string, string, string][] = [
    ["2041", "Northgate", "$4,800", on ? "Paid" : "Overdue"],
    ["2042", "Bluepeak", "$2,150", "Sent"],
    ["2043", "Alder", "$960", "Paid"],
  ];
  const tone = (s: string) => (s === "Paid" ? GREEN : s === "Overdue" ? RED : VIOLET);
  return (
    <div>
      <div style={{ display: "flex", gap: "1.8cqw", marginBottom: "1.2cqw" }}>
        {[["Collected in October", on ? "$18,760" : "$13,960"], ["Outstanding", on ? "$2,150" : "$6,950"]].map(([k, v]) => (
          <div key={k} style={{ flex: 1, padding: "1.6cqw 2cqw", borderRadius: "2cqw", background: "#F4F5F8" }}>
            <span style={em}>{k}</span>
            <motion.span key={v} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} style={{ display: "block", fontSize: T.title, fontWeight: 800, color: INK }}>{v}</motion.span>
          </div>
        ))}
      </div>
      {inv.map(([id, who, amt, st], i) => (
        <div key={id} style={{ ...row, borderTop: i ? row.borderTop : "none" }}>
          <span style={{ ...em, width: "8cqw", fontWeight: 700 }}>#{id}</span>
          <span style={rowT}><span style={b}>{who}</span></span>
          <span style={{ ...b, marginRight: "1cqw" }}>{amt}</span>
          <Pill c={tone(st)} solid={id === "2041" && on}>{st}</Pill>
        </div>
      ))}
    </div>
  );
}

/* HRMS: Priya's first week is set up, task by task. */
function Hrms({ on }: { on: boolean }) {
  const tasks = ["Laptop and access", "Welcome session, Monday", "Safety training", "Team introductions"];
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "2cqw", marginBottom: "1.4cqw" }}>
        <Ini t="PS" c="#1B7F5A" />
        <span style={rowT}><span style={b}>Priya Shah</span><span style={em}>Starts Monday, Operations</span></span>
        <Pill c={on ? GREEN : AMBER} solid={on}>{on ? "Week ready" : "Setting up"}</Pill>
      </div>
      <div style={{ height: "1.2cqw", borderRadius: 99, background: "#ECEEF3", overflow: "hidden", marginBottom: "0.6cqw" }}>
        <motion.span initial={false} animate={{ width: on ? "100%" : "25%" }} transition={{ duration: 1.1, ease }} style={{ display: "block", height: "100%", background: GREEN, borderRadius: 99 }} />
      </div>
      {tasks.map((t, i) => {
        const done = i === 0 || on;
        return (
          <div key={t} style={{ ...row, height: "7cqw", borderTop: i ? row.borderTop : "none" }}>
            <motion.span initial={false} animate={{ backgroundColor: done ? GREEN : "#fff", borderColor: done ? GREEN : "#D5D8E2" }} transition={{ duration: 0.3, delay: on ? i * 0.18 : 0 }} style={{ flex: "none", width: "4cqw", height: "4cqw", borderRadius: "1.2cqw", border: "1.5px solid", display: "grid", placeItems: "center" }}>
              <svg width="60%" height="60%" viewBox="0 0 16 16" fill="none"><path d="M3 8.5 6.5 12 13 4.5" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </motion.span>
            <span style={{ ...b, fontWeight: 600, color: done ? INK : MUTE }}>{t}</span>
          </div>
        );
      })}
    </div>
  );
}

const BODY: Record<string, (p: { on: boolean }) => ReactNode> = { crm: Crm, desk: Desk, billing: Billing, hrms: Hrms };

function Window({ app, on }: { app: App; on: boolean }) {
  const Body = BODY[app.key];
  return (
    <div style={{ width: "100%", height: "100%", borderRadius: "3.4cqw", background: "#fff", overflow: "hidden", display: "flex", boxShadow: "0 30px 50px -26px rgba(16,12,60,.6), 0 0 0 1px rgba(16,20,50,.06)" }}>
      <div style={{ flex: "none", width: "9cqw", borderRight: "1px solid #EEF0F4", display: "flex", flexDirection: "column", alignItems: "center", gap: "2cqw", paddingTop: "2.4cqw" }}>
        <ProductBadge productKey={app.badge} size={22} />
        {[0, 1, 2, 3].map((i) => <span key={i} style={{ width: "3.6cqw", height: "1cqw", borderRadius: 99, background: i === 0 ? app.c : "#E3E5EC" }} />)}
      </div>
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <div style={{ height: "9cqw", flex: "none", display: "flex", alignItems: "center", gap: "2cqw", padding: "0 3cqw", borderBottom: "1px solid #EEF0F4" }}>
          <span style={{ fontSize: T.title, fontWeight: 800, color: INK, whiteSpace: "nowrap" }}>{app.view}</span>
          <span style={{ ...em, fontWeight: 600 }}>{app.name}</span>
          <span style={{ marginLeft: "auto", width: "14cqw", height: "4.4cqw", borderRadius: "1.4cqw", border: "1px solid #E5E7EE" }} />
        </div>
        <div style={{ flex: 1, minHeight: 0, padding: "2.4cqw 3cqw" }}><Body on={on} /></div>
      </div>
    </div>
  );
}

export function OverviewStackStory() {
  const reduce = !!useReducedMotion();
  const [front, setFront] = useState(0);
  const [changed, setChanged] = useState(reduce);

  useEffect(() => {
    if (reduce) return;
    let i = 0;
    let change: ReturnType<typeof setTimeout>;
    const show = () => { setFront(i); setChanged(false); clearTimeout(change); change = setTimeout(() => setChanged(true), CHANGE * 1000); };
    show();
    const loop = setInterval(() => { i = (i + 1) % APPS.length; show(); }, STEP * 1000);
    return () => { clearInterval(loop); clearTimeout(change); };
  }, [reduce]);

  return (
    <Stage>
      <div style={{ position: "relative", height: "84cqw" }}>
        {APPS.map((app, i) => {
          const depth = (i - front + APPS.length) % APPS.length;
          const s = SLOTS[depth];
          return (
            <motion.div
              key={app.key}
              initial={false}
              animate={{ x: `${s.x}cqw`, y: `${s.y}cqw`, scale: s.s, rotate: s.r, opacity: s.o }}
              transition={{ duration: 0.65, ease }}
              style={{ position: "absolute", left: "5cqw", top: "15cqw", width: "90cqw", height: "60cqw", zIndex: APPS.length - depth, transformOrigin: "50% 100%" }}
            >
              <Window app={app} on={depth === 0 && changed} />
            </motion.div>
          );
        })}

        {/* dock: the app in front, and the rest of the suite */}
        <div style={{ position: "absolute", left: "50%", top: "78cqw", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: "2cqw", padding: "1.4cqw 1.6cqw 1.4cqw 1.6cqw", borderRadius: 999, background: "rgba(255,255,255,0.22)", backdropFilter: "blur(14px) saturate(1.4)", WebkitBackdropFilter: "blur(14px) saturate(1.4)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.5), 0 12px 26px -14px rgba(20,14,70,.55)", zIndex: 10 }}>
          {APPS.map((app, i) => (
            <motion.span key={app.key} initial={false} animate={{ scale: i === front ? 1.14 : 1, opacity: i === front ? 1 : 0.7 }} transition={{ duration: 0.35, ease }} style={{ display: "grid", borderRadius: 8, boxShadow: i === front ? "0 0 0 2px #fff" : "none" }}>
              <ProductBadge productKey={app.badge} size={24} />
            </motion.span>
          ))}
          <span style={{ fontSize: T.small, fontWeight: 700, color: "#fff", padding: "0 1.2cqw 0 0.4cqw", whiteSpace: "nowrap" }}>9 more apps</span>
        </div>
      </div>
    </Stage>
  );
}
