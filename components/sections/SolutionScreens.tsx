"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AppIcon } from "./SolutionApps";
import { APPS, type AppKey, type Solution } from "./solutionsData";

/* The Solutions section's right side: the screen each industry works in, so every tab looks different.
   Healthcare a clinic day calendar, manufacturing a product configurator, hospitality a room board, field service a
   dispatch map, financial services a review pack, construction a site timeline. Each plays one small change on a
   loop. Drawn on a fixed 680x500 canvas (the same frame as SolutionApps) and scaled to the column.
   Names, figures and dates are sample data. */

const W = 680, H = 500;
const ease = [0.22, 1, 0.36, 1] as const;
const INK = "#1F2430", MUTE = "#7A8294", LINE = "#EEF0F4";
const GREEN = "#1FA971", AMBER = "#E8A21B", RED = "#E2445C", BLUE = "#2F7BEA";
export const SCREEN_LOOP = 9;

/* Seconds into the loop. `onLoop` runs as each loop ends. Reduced motion holds the finished state. */
function useLoop(onLoop?: () => void) {
  const reduce = !!useReducedMotion();
  const [t, setT] = useState(reduce ? SCREEN_LOOP - 1 : 0);
  const cb = useRef(onLoop);
  useEffect(() => { cb.current = onLoop; }, [onLoop]);
  useEffect(() => {
    if (reduce) return;
    let start = performance.now();
    let raf = 0;
    const tick = () => {
      const s = (performance.now() - start) / 1000;
      if (s >= SCREEN_LOOP) { start = performance.now(); cb.current?.(); }
      setT(Math.floor(Math.min(s, SCREEN_LOOP) * 20) / 20);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);
  return t;
}

const tx = (size: number, weight = 600, color = INK): CSSProperties => ({ fontSize: size, fontWeight: weight, color, whiteSpace: "nowrap", lineHeight: 1.25 });

function Pill({ c, children, solid }: { c: string; children: string; solid?: boolean }) {
  return (
    <motion.span initial={false} animate={{ backgroundColor: solid ? c : `${c}1F`, color: solid ? "#fff" : c }} transition={{ duration: 0.35 }} style={{ display: "inline-grid", placeItems: "center", height: 20, padding: "0 8px", borderRadius: 6, ...tx(10, 700), color: undefined }}>
      <motion.span key={children} initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>{children}</motion.span>
    </motion.span>
  );
}

/* A floating note that names the app behind a change. */
function Toast({ on, app, text, style }: { on: boolean; app: AppKey; text: string; style: CSSProperties }) {
  return (
    <motion.div initial={false} animate={{ opacity: on ? 1 : 0, y: on ? 0 : 10, scale: on ? 1 : 0.96 }} transition={{ duration: 0.4, ease }}
      style={{ position: "absolute", zIndex: 4, display: "flex", alignItems: "center", gap: 8, padding: "8px 12px 8px 8px", borderRadius: 12, background: "#fff", boxShadow: "0 16px 30px -14px rgba(20,24,60,.55), 0 0 0 1px rgba(31,36,48,.06)", ...style }}>
      <AppIcon app={app} size={20} />
      <span style={tx(11.5, 700)}>{text}</span>
      <span style={{ width: 16, height: 16, borderRadius: "50%", background: GREEN, display: "grid", placeItems: "center" }}>
        <svg width="9" height="9" viewBox="0 0 16 16" fill="none"><path d="M3 8.5 6.5 12 13 4.5" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ Healthcare: the clinic's day */
function Healthcare({ t }: { t: number }) {
  const cols = ["Dr. Patel", "Dr. Rao", "Nurse Lee"];
  const y = (h: number) => 34 + (h - 9) * 86;
  const cw = 172, x0 = 52;
  const appts: [number, number, number, string, string, string][] = [
    [0, 9, 0.5, "Sarah J.", "Check up", "#0F766E"], [0, 10, 1, "Lena P.", "Treatment", "#0F766E"], [0, 12, 0.5, "Marcus L.", "Review", "#0F766E"],
    [1, 9.5, 0.5, "David W.", "Physio", "#0E8FA5"], [1, 10.5, 0.5, "Priya M.", "Consult", "#0E8FA5"],
    [2, 9, 1, "Vaccinations", "Clinic", "#7C4DDB"], [2, 11, 0.5, "Tom B.", "Dressing", "#7C4DDB"], [2, 12, 0.5, "Ana S.", "Bloods", "#7C4DDB"],
  ];
  const booked = t >= 2.2;
  const block = (c: number, h: number, d: number, n: string, s: string, col: string, extra?: ReactNode, hi?: boolean) => (
    <div style={{ position: "absolute", left: x0 + c * (cw + 8), top: y(h) + 2, width: cw, height: d * 86 - 4, borderRadius: 8, background: `${col}14`, borderLeft: `3px solid ${col}`, padding: "6px 9px", boxSizing: "border-box", boxShadow: hi ? `0 0 0 2px ${col}, 0 12px 22px -12px rgba(20,24,60,.5)` : "none" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6 }}>
        <span style={tx(11.5, 700)}>{n}</span>{extra}
      </div>
      <span style={tx(10, 500, MUTE)}>{s}</span>
    </div>
  );
  return (
    <div style={{ position: "relative", height: "100%", padding: 12 }}>
      {cols.map((c, i) => <span key={c} style={{ position: "absolute", left: x0 + i * (cw + 8) + 4, top: 10, ...tx(11, 700, MUTE) }}>{c}</span>)}
      {[9, 10, 11, 12, 13].map((h) => (
        <div key={h} style={{ position: "absolute", left: 12, right: 12, top: y(h), borderTop: `1px solid ${LINE}` }}>
          <span style={{ position: "absolute", left: 0, top: 3, ...tx(10, 600, MUTE) }}>{h}:00</span>
        </div>
      ))}
      {appts.map(([c, h, d, n, s, col]) => (
        <div key={n}>{block(c, h, d, n, s, col, n === "Sarah J." ? <Pill c={GREEN} solid={t >= 1}>{t >= 1 ? "Arrived" : "Due"}</Pill> : undefined)}</div>
      ))}
      <motion.div initial={false} animate={{ opacity: booked ? 1 : 0, scale: booked ? 1 : 0.9, y: booked ? 0 : -8 }} transition={{ duration: 0.45, ease }} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {block(1, 11.5, 0.5, "Omar K.", "Follow up", "#0E8FA5", <AppIcon app="booking-engine" size={16} />, true)}
      </motion.div>
      <Toast on={t >= 3.6} app="campaigns" text="Reminder sent to Omar K." style={{ right: 16, bottom: 14 }} />
    </div>
  );
}

/* --------------------------------------------------------- Manufacturing: configure a product and quote it */
function Manufacturing({ t }: { t: number }) {
  const size = t >= 1.4 ? 1800 : 1600;
  const walnut = t >= 2.6;
  const tray = t >= 3.6;
  const price = 1240 + (size === 1800 ? 160 : 0) + (walnut ? 120 : 0) + (tray ? 45 : 0);
  const quoted = t >= 4.9;
  const seg = (opts: string[], on: string) => (
    <div style={{ display: "flex", gap: 6 }}>
      {opts.map((o) => (
        <motion.span key={o} initial={false} animate={{ backgroundColor: o === on ? "#2563EB" : "#F2F4F8", color: o === on ? "#fff" : INK }} transition={{ duration: 0.3 }} style={{ padding: "6px 12px", borderRadius: 8, ...tx(11.5, 700), color: undefined }}>{o}</motion.span>
      ))}
    </div>
  );
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div style={{ flex: "none", width: 300, margin: 12, borderRadius: 14, background: "linear-gradient(180deg, #F2F5FB, #E8EDF6)", position: "relative" }}>
        <svg viewBox="0 0 300 300" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} aria-hidden="true">
          <motion.g initial={false} animate={{ scaleX: size === 1800 ? 1.12 : 1 }} transition={{ duration: 0.6, ease }} style={{ transformOrigin: "150px 170px" }}>
            <motion.path initial={false} animate={{ fill: walnut ? "#6B4A33" : "#C9A27A" }} transition={{ duration: 0.6 }} d="M60 150 L240 150 L262 170 L82 170 Z" />
            <motion.path initial={false} animate={{ fill: walnut ? "#55392A" : "#B08860" }} transition={{ duration: 0.6 }} d="M82 170 L262 170 L262 178 L82 178 Z" />
            <path d="M92 178 V248 M252 178 V248 M70 165 V232" stroke="#3A3F4B" strokeWidth="6" strokeLinecap="round" />
            <motion.rect initial={false} animate={{ opacity: tray ? 1 : 0 }} x="110" y="182" width="120" height="10" rx="3" fill="#3A3F4B" />
          </motion.g>
        </svg>
        <span style={{ position: "absolute", left: 14, top: 12, ...tx(12.5, 800) }}>Modular desk</span>
        <span style={{ position: "absolute", left: 14, top: 30, ...tx(10.5, 600, MUTE) }}>{size} mm · {walnut ? "Walnut" : "Oak"}{tray ? " · cable tray" : ""}</span>
      </div>
      <div style={{ flex: 1, padding: "16px 16px 12px 4px", display: "flex", flexDirection: "column", gap: 14 }}>
        <div><span style={tx(10.5, 700, MUTE)}>Size</span><div style={{ marginTop: 6 }}>{seg(["1400", "1600", "1800"], String(size))}</div></div>
        <div>
          <span style={tx(10.5, 700, MUTE)}>Finish</span>
          <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
            {[["Oak", "#C9A27A"], ["Walnut", "#6B4A33"], ["White", "#F1F1EE"]].map(([n, c]) => {
              const on = (walnut ? "Walnut" : "Oak") === n;
              return (
                <span key={n} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 9px 5px 5px", borderRadius: 8, boxShadow: on ? "0 0 0 2px #2563EB" : "0 0 0 1px #E1E4EC" }}>
                  <i style={{ width: 16, height: 16, borderRadius: 5, background: c, boxShadow: "inset 0 0 0 1px rgba(0,0,0,.08)" }} />
                  <span style={tx(11, 700)}>{n}</span>
                </span>
              );
            })}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={tx(11.5, 700)}>Cable tray</span>
          <motion.span initial={false} animate={{ backgroundColor: tray ? "#2563EB" : "#D5D9E3" }} style={{ width: 34, height: 20, borderRadius: 99, position: "relative" }}>
            <motion.i initial={false} animate={{ x: tray ? 16 : 2 }} style={{ position: "absolute", top: 2, width: 16, height: 16, borderRadius: "50%", background: "#fff" }} />
          </motion.span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 10, background: "#F4F6FA" }}>
          <AppIcon app="inventory" size={18} /><span style={tx(11, 600)}>40 in stock, ships Oct 9</span>
        </div>
        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <span style={tx(10.5, 700, MUTE)}>Price</span>
            <motion.div key={price} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} style={tx(22, 800)}>${price.toLocaleString("en-US")}</motion.div>
          </div>
          <span style={{ padding: "9px 14px", borderRadius: 10, background: "#2563EB", ...tx(12, 700, "#fff") }}>Create quote</span>
        </div>
      </div>
      <Toast on={quoted} app="configx" text="Quote Q118 added to Northgate's deal" style={{ left: 24, bottom: 16 }} />
    </div>
  );
}

/* ------------------------------------------------------------------ Hospitality: today's room board */
function Hospitality({ t }: { t: number }) {
  const ST: Record<string, [string, string]> = { occ: ["Occupied", "#6D5BFF"], arr: ["Arriving", AMBER], cln: ["Cleaning", BLUE], rdy: ["Ready", GREEN], out: ["Departing", "#9AA0AE"] };
  const r204 = t >= 2.8 ? "occ" : t >= 1.4 ? "rdy" : "cln";
  const floors: [number, string[]][] = [
    [3, ["occ", "rdy", "arr", "occ", "out", "occ"]],
    [2, ["occ", "occ", "rdy", r204, "arr", "cln"]],
    [1, ["arr", "occ", "occ", "rdy", "occ", "out"]],
  ];
  const ready = 31 + (t >= 1.4 && t < 2.8 ? 1 : 0);
  return (
    <div style={{ padding: 14, height: "100%", boxSizing: "border-box", position: "relative" }}>
      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        {[["Arrivals", "24"], ["Departures", "18"], ["Rooms ready", String(ready)], ["Covers tonight", "38"]].map(([k, v]) => (
          <div key={k} style={{ flex: 1, padding: "8px 10px", borderRadius: 10, background: "#F5F3EC" }}>
            <span style={tx(10, 600, MUTE)}>{k}</span>
            <motion.div key={v} initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} style={tx(17, 800)}>{v}</motion.div>
          </div>
        ))}
      </div>
      {floors.map(([f, rooms]) => (
        <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <span style={{ width: 44, ...tx(10.5, 700, MUTE) }}>Floor {f}</span>
          {rooms.map((s, i) => {
            const n = `${f}${String(i + 1).padStart(2, "0")}`;
            const [label, c] = ST[s];
            const hi = n === "204" && t >= 1.4;
            return (
              <motion.div key={n} initial={false} animate={{ backgroundColor: `${c}1A`, boxShadow: hi ? `0 0 0 2px ${c}` : `0 0 0 1px ${c}33` }} transition={{ duration: 0.4 }} style={{ flex: 1, height: 62, borderRadius: 10, padding: "7px 8px", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <span style={tx(12.5, 800)}>{n}</span>
                <motion.span key={label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={tx(9.5, 700, c)}>{label}</motion.span>
              </motion.div>
            );
          })}
        </div>
      ))}
      <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
        {Object.values(ST).map(([l, c]) => <span key={l} style={{ display: "flex", alignItems: "center", gap: 5, ...tx(10, 600, MUTE) }}><i style={{ width: 8, height: 8, borderRadius: 3, background: c }} />{l}</span>)}
      </div>
      <Toast on={t >= 1.4 && t < 2.8} app="desk" text="Room 204 cleaned and ready" style={{ right: 16, bottom: 16 }} />
      <Toast on={t >= 2.8} app="bookings" text="Elena R. checked in, Room 204" style={{ right: 16, bottom: 16 }} />
    </div>
  );
}

/* ------------------------------------------------------------- Field service: the dispatch map */
function FieldService({ t }: { t: number }) {
  const path = "M40 300 C 90 300, 110 230, 160 220 S 230 150, 270 120";
  const p = Math.min(1, Math.max(0, (t - 0.8) / 3));
  const arrived = p >= 1;
  const assigned = t >= 4.6;
  const pins: [number, number, string][] = [[270, 120, "1043"], [120, 110, "1042"], [250, 300, "1044"]];
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div style={{ flex: "none", width: 330, margin: 12, borderRadius: 14, background: "#EEF3F8", position: "relative", overflow: "hidden" }}>
        <svg viewBox="0 0 330 404" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} aria-hidden="true">
          {[60, 140, 220, 300, 380].map((y) => <path key={y} d={`M0 ${y} H330`} stroke="#fff" strokeWidth="7" />)}
          {[50, 130, 210, 290].map((x) => <path key={x} d={`M${x} 0 V404`} stroke="#fff" strokeWidth="7" />)}
          <path d="M0 250 C 80 230, 140 280, 330 240" stroke="#CFE1F5" strokeWidth="16" fill="none" />
          <path d={path} stroke="#1777F0" strokeWidth="3" strokeDasharray="6 6" fill="none" opacity=".6" />
          {pins.map(([x, y, n]) => (
            <g key={n} transform={`translate(${x} ${y})`}>
              <path d="M0 0 C -9 -12, -12 -18, -12 -24 A 12 12 0 1 1 12 -24 C 12 -18, 9 -12, 0 0 Z" fill={n === "1044" ? (assigned ? "#1777F0" : RED) : n === "1043" && arrived ? GREEN : "#1777F0"} />
              <circle cy="-24" r="4.5" fill="#fff" />
            </g>
          ))}
        </svg>
        <motion.div style={{ position: "absolute", left: 0, top: 0, offsetPath: `path("${path}")`, offsetDistance: `${p * 100}%`, offsetRotate: "0deg", width: 26, height: 26, marginLeft: -13, marginTop: -13 } as CSSProperties}>
          <span style={{ display: "grid", placeItems: "center", width: 26, height: 26, borderRadius: "50%", background: "#1777F0", boxShadow: "0 0 0 4px rgba(23,119,240,.25)", ...tx(10, 800, "#fff") }}>AK</span>
        </motion.div>
        <span style={{ position: "absolute", left: 120 - 13, top: 110 - 52, width: 26, height: 26, borderRadius: "50%", background: GREEN, boxShadow: "0 0 0 4px rgba(31,169,113,.25)", display: "grid", placeItems: "center", ...tx(10, 800, "#fff") }}>PR</span>
      </div>
      <div style={{ flex: 1, padding: "14px 14px 12px 4px" }}>
        <span style={tx(11, 700, MUTE)}>Today&apos;s jobs</span>
        {[
          ["1042", "Water leak, Level 3", "Priya", "On site", GREEN, true],
          ["1043", "Cooling fault", "Arjun", arrived ? "On site" : `En route, ${Math.max(1, Math.round(12 * (1 - p)))} min`, arrived ? GREEN : BLUE, arrived],
          ["1044", "Lift inspection", assigned ? "Sam" : "Unassigned", assigned ? "Assigned" : "Needs a technician", assigned ? BLUE : RED, false],
        ].map(([id, title, who, st, c, solid]) => (
          <div key={id as string} style={{ padding: "10px 0", borderBottom: `1px solid ${LINE}`, display: "flex", flexDirection: "column", gap: 5 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}><span style={tx(12, 700)}>{title as string}</span><span style={tx(10, 700, MUTE)}>#{id as string}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}><span style={tx(10.5, 600, MUTE)}>{who as string}</span><Pill c={c as string} solid={solid as boolean}>{st as string}</Pill></div>
          </div>
        ))}
        <motion.div initial={false} animate={{ opacity: assigned ? 1 : 0 }} style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 10, background: "#F4F6FA" }}>
          <AppIcon app="inventory" size={18} /><span style={tx(11, 600)}>Lift sensor reserved for #1044</span>
        </motion.div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------- Financial services: a client review pack */
function Finance({ t }: { t: number }) {
  const items: [AppKey, string, string][] = [
    ["crm", "Client record and holdings", "CRM"], ["desk", "Open requests", "1 closed this week"], ["projects", "Review meeting", "Thursday, 10:00"], ["campaigns", "Market update", "Drafted"], ["surveys", "Last feedback", "Very satisfied"],
  ];
  const done = (i: number) => t >= 1 + i * 0.7;
  const ready = t >= 1 + items.length * 0.7;
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div style={{ flex: 1, padding: 14 }}>
        <span style={tx(11, 700, MUTE)}>Reviews this week</span>
        {[["Harper", "Annual review", "Thu", ready ? "Pack ready" : "Preparing", ready ? GREEN : AMBER, ready], ["Orion", "Renewal", "Mon", "Booked", BLUE, false], ["Brightpath", "Annual review", "To book", "Needs a date", RED, false], ["Ridgeway", "Onboarding", "Fri", "Booked", BLUE, false]].map(([n, k, d, st, c, solid], i) => (
          <div key={n as string} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 8px", borderBottom: `1px solid ${LINE}`, borderRadius: 8, background: i === 0 ? "#E7F3EE" : "transparent" }}>
            <span style={{ width: 28, height: 28, borderRadius: "50%", background: "#1B7F8C1F", color: "#1B7F8C", display: "grid", placeItems: "center", ...tx(11, 800, "#1B7F8C") }}>{(n as string)[0]}</span>
            <span style={{ flex: 1, display: "flex", flexDirection: "column" }}><span style={tx(12, 700)}>{n as string}</span><span style={tx(10, 500, MUTE)}>{k as string}</span></span>
            <span style={{ width: 52, ...tx(10.5, 700, MUTE) }}>{d as string}</span>
            <Pill c={c as string} solid={solid as boolean}>{st as string}</Pill>
          </div>
        ))}
      </div>
      <div style={{ flex: "none", width: 236, borderLeft: `1px solid ${LINE}`, padding: 14, background: "#FAFBFC" }}>
        <span style={tx(11, 700, MUTE)}>Review pack</span>
        <div style={{ ...tx(15, 800), margin: "2px 0 12px" }}>Harper</div>
        {items.map(([app, label, sub], i) => (
          <motion.div key={label} initial={false} animate={{ opacity: done(i) ? 1 : 0.45 }} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: `1px solid ${LINE}` }}>
            <AppIcon app={app} size={18} />
            <span style={{ flex: 1, display: "flex", flexDirection: "column" }}><span style={tx(11, 700)}>{label}</span><span style={tx(9.5, 500, MUTE)}>{sub}</span></span>
            <motion.span initial={false} animate={{ backgroundColor: done(i) ? GREEN : "#E1E4EC" }} style={{ width: 16, height: 16, borderRadius: "50%", display: "grid", placeItems: "center" }}>
              <svg width="9" height="9" viewBox="0 0 16 16" fill="none"><path d="M3 8.5 6.5 12 13 4.5" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </motion.span>
          </motion.div>
        ))}
        <motion.span initial={false} animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 6 }} style={{ display: "block", marginTop: 12, padding: "9px 0", borderRadius: 10, textAlign: "center", background: "#0B2D4F", ...tx(12, 700, "#fff") }}>Open review pack</motion.span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Construction: the site timeline */
function Construction({ t }: { t: number }) {
  const weeks = ["W40", "W41", "W42", "W43", "W44", "W45", "W46", "W47"];
  const x0 = 120, cw = 58;
  const framing = t >= 1 ? Math.min(0.75, 0.35 + (t - 1) * 0.2) : 0.35;
  const passed = t >= 3.4;
  const rows: [string, [string, number, number, string, number?][]][] = [
    ["Tower B", [["Foundations", 0, 2, GREEN, 1], ["Framing", 2, 3, "#B4533C", framing], ["Roofing", 5, 2, "#C9B8AE", 0]]],
    ["Riverside", [["Site prep", 1, 2, GREEN, 1], ["Foundations", 3, 3, "#B4533C", 0.2]]],
    ["Elm Court", [["Planning", 0, 3, GREEN, 1], ["Permits", 3, 2, AMBER, 0.5], ["Site prep", 5, 3, "#C9B8AE", 0]]],
  ];
  return (
    <div style={{ position: "relative", height: "100%", padding: 14, boxSizing: "border-box" }}>
      <div style={{ position: "absolute", left: x0, top: 14, display: "flex" }}>
        {weeks.map((w) => <span key={w} style={{ width: cw, ...tx(10, 700, MUTE) }}>{w}</span>)}
      </div>
      <div style={{ position: "absolute", left: x0 + 3.4 * cw, top: 30, bottom: 70, width: 2, background: "#B4533C" }}>
        <span style={{ position: "absolute", top: -2, left: -18, padding: "1px 6px", borderRadius: 4, background: "#B4533C", ...tx(9, 700, "#fff") }}>Today</span>
      </div>
      {rows.map(([site, bars], r) => (
        <div key={site} style={{ position: "absolute", left: 14, right: 14, top: 52 + r * 96, height: 84, borderTop: `1px solid ${LINE}` }}>
          <span style={{ position: "absolute", left: 0, top: 10, ...tx(12, 800) }}>{site}</span>
          {bars.map(([n, s, d, c, prog], i) => (
            <div key={n + i} style={{ position: "absolute", left: x0 - 14 + s * cw, top: 10 + (i % 2) * 34, width: d * cw - 6, height: 28, borderRadius: 7, background: `${c}26`, overflow: "hidden" }}>
              <motion.span initial={false} animate={{ width: `${(prog ?? 0) * 100}%` }} transition={{ duration: 0.6, ease }} style={{ position: "absolute", left: 0, top: 0, bottom: 0, background: c, opacity: 0.85 }} />
              <span style={{ position: "relative", padding: "0 8px", lineHeight: "28px", ...tx(10.5, 700, (prog ?? 0) > 0.5 ? "#fff" : INK) }}>{n}</span>
            </div>
          ))}
        </div>
      ))}
      <motion.span initial={false} animate={{ backgroundColor: passed ? GREEN : "#fff", borderColor: passed ? GREEN : "#B4533C" }} style={{ position: "absolute", left: x0 + 5 * cw - 7, top: 52 + 46, width: 14, height: 14, border: "2px solid", transform: "rotate(45deg)", borderRadius: 3 }} />
      <Toast on={passed} app="projects" text="Tower B framing inspection passed" style={{ left: 30, bottom: 16 }} />
      <Toast on={t >= 5} app="inventory" text="Steel for Riverside delivered" style={{ right: 16, bottom: 16 }} />
    </div>
  );
}

const SCREENS: Record<string, { app: AppKey; view: string; draw: (p: { t: number }) => ReactNode }> = {
  healthcare: { app: "practice", view: "Day view", draw: Healthcare },
  manufacturing: { app: "configx", view: "Configure product", draw: Manufacturing },
  hospitality: { app: "bookings", view: "Room board", draw: Hospitality },
  "field-service": { app: "serviceops", view: "Dispatch", draw: FieldService },
  finance: { app: "crm", view: "Client reviews", draw: Finance },
  construction: { app: "projects", view: "Site timeline", draw: Construction },
};
export const hasScreen = (key: string) => key in SCREENS;

export function SolutionScreen({ s, onLoop }: { s: Solution; onLoop?: () => void }) {
  const t = useLoop(onLoop);
  const wrap = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(Math.min(1, e.contentRect.width / W)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const sc = SCREENS[s.key];
  const Draw = sc.draw;
  return (
    <div ref={wrap} className="sa-wrap" aria-hidden="true" style={{ height: H * scale }}>
      <div className="sa-canvas" style={{ width: W, height: H, transform: `scale(${scale})`, ["--sol-c" as string]: s.color, ["--sol-soft" as string]: s.soft } as CSSProperties}>
        <div className="sa-frame" style={{ background: `color-mix(in srgb, ${s.soft} 70%, #F1F2F6)` }}>
          <div className="sa-window">
            <div className="sa-side">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/symbol-color.png" alt="" className="sa-logo" />
              {s.rows.map((r) => (
                <span key={r.app} style={{ opacity: r.app === sc.app ? 1 : 0.55, borderRadius: 8, boxShadow: r.app === sc.app ? `0 0 0 2px ${s.color}` : "none" }}>
                  <AppIcon app={r.app} size={24} />
                </span>
              ))}
            </div>
            <div className="sa-main">
              <div className="sa-top">
                <b>{s.place}</b>
                <span className="sa-tabs"><em style={{ borderColor: s.color, color: s.color }}>{sc.view}</em></span>
                <span className="sa-count" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: s.soft, color: s.color }}><AppIcon app={sc.app} size={14} />{APPS[sc.app].name}</span>
              </div>
              <div className="sa-body"><Draw t={t} /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
