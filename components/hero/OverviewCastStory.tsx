"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ProductBadge } from "@/components/shared/ProductBadge";
import { AgentTile, CHAR, PersonAvatar, Stage, Tick, card, ease, label } from "./story/kit";

/* The hero's opening visual, in two scenes that loop.
   Scene 1, the cast: Dana's portrait card in front with four agent cards tucked behind it. She types a request into
   the frosted prompt at the foot of her own card.
   Scene 2, the work: the week's board across the EVOQ apps. The agents take a row each, one after the other. Ava's
   drafts are added to a frosted panel as she writes them, then Dana reviews and approves.
   Records, names and counts are sample data. */

const REQUEST = "Prepare my week";
const GREY = "#797E93", RED = "#E2445C", AMBER = "#E8A21B", GREEN = "#1FA971", VIOLET = "#6D5BFF";

type Row = {
  key: string;
  agent: string;
  team: string;
  title: string;
  app: "crm" | "desk" | "hrms" | "billing";
  appName: string;
  owner: string;
  before: { t: string; c: string };
  after: { t: string; c: string };
  sent?: string; // the status once Dana has approved
  working: string;
  done: string;
  start: number; // seconds: the agent's chip arrives
  end: number; // seconds: the work is finished
};

const ROWS: Row[] = [
  { key: "ava", agent: "Ava", team: "Growth", title: "Renewal follow ups", app: "crm", appName: "CRM", owner: "marcus", before: { t: "Needs follow up", c: AMBER }, after: { t: "Drafts ready", c: VIOLET }, sent: "Sent", working: "Drafting", done: "3 follow ups drafted", start: 4.0, end: 6.7 },
  { key: "kai", agent: "Kai", team: "Operations", title: "Ticket 4821, unit not cooling", app: "desk", appName: "Desk", owner: "sam", before: { t: "Not booked", c: RED }, after: { t: "Job booked", c: GREEN }, working: "Booking", done: "Job booked", start: 7.5, end: 8.5 },
  { key: "sana", agent: "Sana", team: "People", title: "New hire, first week", app: "hrms", appName: "HRMS", owner: "mia", before: { t: "Not planned", c: GREY }, after: { t: "Plan ready", c: VIOLET }, sent: "Plan shared", working: "Planning", done: "First week planned", start: 9.3, end: 10.3 },
  { key: "rohan", agent: "Rohan", team: "Finance", title: "Invoice 2041", app: "billing", appName: "Billing", owner: "dana", before: { t: "Overdue", c: RED }, after: { t: "Reminders ready", c: VIOLET }, sent: "Sent", working: "Drafting", done: "4 reminders drafted", start: 11.1, end: 12.1 },
];
const DRAFTS = [
  { to: "Northgate", at: 4.9 },
  { to: "Bluepeak", at: 5.45 },
  { to: "Alder & Finch", at: 6.0 },
];

/* The beats, in seconds from the start of a loop. */
const AT = { type: 0.9, send: 2.5, board: 3.5, panel: 4.5, panelOff: 6.9, review: 12.9, approved: 14.0, out: 15.3 };
const LOOP = 15.8;
const STILL = 3.2; // reduced motion: the cast, with the request written

/* Seconds into the current loop, in 50ms steps. Measured from the clock, so skipped frames do not shift the beats. */
function useLoopClock() {
  const reduce = !!useReducedMotion();
  const [t, setT] = useState(reduce ? STILL : 0);
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

/* Stage geometry, in cqw. */
const H = 84;
const BOARD_TOP = 10, HEAD = 8, ROW_H = 12;
const rowTop = (i: number) => BOARD_TOP + 3 + HEAD + i * ROW_H;

const small = "clamp(9px, 2.1cqw, 10.5px)";
const frost: CSSProperties = {
  background: "linear-gradient(150deg, rgba(255,255,255,0.34), rgba(214,204,255,0.2))",
  backdropFilter: "blur(14px) saturate(1.5)",
  WebkitBackdropFilter: "blur(14px) saturate(1.5)",
  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.55), 0 10px 24px -12px rgba(20,14,70,0.55)",
};
const frame: CSSProperties = { position: "absolute", borderRadius: "4.4cqw", background: "#fff", padding: "1.1cqw", boxSizing: "border-box" };
const tag: CSSProperties = { ...frost, position: "absolute", left: "1.6cqw", bottom: "1.6cqw", padding: "0.8cqw 1.8cqw", borderRadius: 999, fontSize: small, fontWeight: 700, color: "#fff", whiteSpace: "nowrap", textShadow: "0 1px 2px rgba(20,14,70,0.45)" };

/* An agent's portrait card, tucked behind Dana's. */
function AgentCard({ r, on, lit, style, from }: { r: Row; on: boolean; lit: boolean; style: CSSProperties; from: number }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: on ? 1 : 0, x: on ? "0%" : `${from}%`, scale: on ? 1 : 0.9, boxShadow: lit ? "0 0 0 2px #A996FF, 0 0 30px 4px rgba(170,150,255,0.8), 0 18px 36px -16px rgba(16,20,50,0.5)" : "0 0 0 0px #A996FF, 0 0 0 0 rgba(170,150,255,0), 0 18px 36px -16px rgba(16,20,50,0.5)" }}
      transition={{ duration: 0.6, ease }}
      style={{ ...frame, width: "25cqw", height: "27cqw", ...style }}
    >
      <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "3.4cqw", overflow: "hidden", background: "#E9E4FF" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${CHAR}/${r.key}.webp`} alt="" aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <span style={tag}>{r.agent}, {r.team}</span>
      </div>
    </motion.div>
  );
}

function StatusPill({ s, style }: { s: { t: string; c: string }; style?: CSSProperties }) {
  return (
    <motion.span initial={false} animate={{ backgroundColor: s.c }} transition={{ duration: 0.45, ease }} style={{ height: "4.8cqw", minWidth: "21cqw", padding: "0 2cqw", borderRadius: 6, display: "grid", placeItems: "center", color: "#fff", fontSize: "clamp(9px, 2.2cqw, 11px)", fontWeight: 700, whiteSpace: "nowrap", boxSizing: "border-box", ...style }}>
      <motion.span key={s.t} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease }}>{s.t}</motion.span>
    </motion.span>
  );
}

/* The chip that names who is working and what came of it. */
function Chip({ on, top, tile, name, working, done, finished }: { on: boolean; top: number; tile: ReactNode; name: string; working: string; done: string; finished: boolean }) {
  return (
    <motion.div
      aria-hidden
      initial={false}
      animate={{ opacity: on ? 1 : 0, y: on ? 0 : 10, scale: on ? 1 : 0.94 }}
      transition={{ duration: 0.4, ease }}
      style={{ position: "absolute", left: "9cqw", top: `${top}cqw`, zIndex: 4, padding: 1.5, borderRadius: "3.4cqw", background: "linear-gradient(100deg, #8F7BFF, #E06BD8)", boxShadow: "0 18px 34px -14px rgba(30,20,90,0.6)", pointerEvents: "none" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "2.2cqw", height: "11.4cqw", minWidth: "62cqw", padding: "0 2.4cqw 0 1.6cqw", borderRadius: "calc(3.4cqw - 1.5px)", background: "#fff", boxSizing: "border-box" }}>
        {tile}
        <span style={{ flex: 1, fontSize: "clamp(10.5px, 3cqw, 15px)", fontWeight: 600, color: "#1F2430", whiteSpace: "nowrap" }}>
          <motion.span key={finished ? "d" : "w"} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease }} style={{ display: "inline-block" }}>{finished ? done : name}</motion.span>
        </span>
        <motion.span
          initial={false}
          animate={{ backgroundColor: finished ? GREEN : "#E4DEFF", color: finished ? "#fff" : "#4B3FD6" }}
          transition={{ duration: 0.35 }}
          style={{ display: "inline-flex", alignItems: "center", gap: "1cqw", height: "6cqw", padding: "0 2.6cqw", borderRadius: "1.4cqw", fontSize: "clamp(9.5px, 2.5cqw, 12.5px)", fontWeight: 700, whiteSpace: "nowrap" }}
        >
          {finished ? "Done" : working}
        </motion.span>
      </div>
    </motion.div>
  );
}

export function OverviewCastStory() {
  const { t, reduce } = useLoopClock();
  const at = (s: number) => t >= s;
  const cast = !at(AT.board) || at(AT.out);
  const board = at(AT.board) && !at(AT.out);
  const typedN = Math.max(0, Math.min(REQUEST.length, Math.floor((t - AT.type) * 12)));
  const sent = at(AT.send) && !at(AT.out);
  const active = ROWS.findIndex((r, i) => at(r.start) && !at(ROWS[i + 1]?.start ?? AT.review));
  const panel = at(AT.panel) && !at(AT.panelOff);
  const review = at(AT.review) && !at(AT.out);
  const approved = at(AT.approved) && !at(AT.out);
  // the pointer rests on the status of the row being worked
  const pointerRow = active >= 0 ? active : 0;

  return (
    <Stage>
      <div style={{ position: "relative", height: `${H}cqw` }}>
        {/* Scene 1: the cast */}
        <motion.div
          initial={false}
          animate={{ opacity: cast ? 1 : 0, scale: cast ? 1 : 0.94, filter: cast ? "blur(0px)" : "blur(6px)" }}
          transition={{ duration: 0.55, ease }}
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        >
          <AgentCard r={ROWS[0]} on={cast && at(0.35)} lit={sent && at(AT.send + 0.1) && cast} from={48} style={{ left: "4cqw", top: "13cqw", rotate: "-3deg" }} />
          <AgentCard r={ROWS[2]} on={cast && at(0.5)} lit={sent && at(AT.send + 0.3) && cast} from={48} style={{ left: "5cqw", top: "42cqw", rotate: "2deg" }} />
          <AgentCard r={ROWS[1]} on={cast && at(0.42)} lit={sent && at(AT.send + 0.2) && cast} from={-48} style={{ right: "4cqw", top: "13cqw", rotate: "3deg" }} />
          <AgentCard r={ROWS[3]} on={cast && at(0.58)} lit={sent && at(AT.send + 0.4) && cast} from={-48} style={{ right: "5cqw", top: "42cqw", rotate: "-2deg" }} />

          {/* Dana, in front, with the prompt inside her card */}
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease }}
            style={{ ...frame, left: "27cqw", top: "10cqw", width: "44cqw", height: "62cqw", zIndex: 2, boxShadow: "0 30px 50px -22px rgba(16,12,60,0.65), 0 0 0 1px rgba(16,20,50,0.04)" }}
          >
            <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "3.4cqw", overflow: "hidden", background: "#CFDDF7" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${CHAR}/dana.webp`} alt="" aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 30%" }} />
              <span style={{ position: "absolute", left: "2.4cqw", top: "2.2cqw", fontSize: small, fontWeight: 700, color: "#1F2430", whiteSpace: "nowrap" }}>Dana, Managing Director</span>
              <div style={{ ...frost, position: "absolute", left: "2cqw", right: "2cqw", bottom: "2cqw", height: "10cqw", borderRadius: "2.8cqw", display: "flex", alignItems: "center", gap: "1.8cqw", padding: "0 1.8cqw 0 2.4cqw", boxSizing: "border-box" }}>
                <span style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "0.3cqw" }}>
                  <span style={{ fontSize: "clamp(7.5px, 1.7cqw, 9px)", fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: "rgba(255,255,255,0.82)", whiteSpace: "nowrap" }}>Ask EVI</span>
                  <span style={{ fontSize: "clamp(10px, 2.7cqw, 13.5px)", fontWeight: 600, color: "#fff", lineHeight: 1.2, minHeight: "1.2em", whiteSpace: "nowrap", textShadow: "0 1px 2px rgba(20,14,70,0.35)" }}>
                    {REQUEST.slice(0, reduce ? REQUEST.length : typedN)}
                    {!reduce && !sent && <span style={{ display: "inline-block", width: 1.5, height: "1em", marginLeft: 1, background: "#fff", verticalAlign: "-2px", animation: "wcPulse 0.9s ease-in-out infinite" }} />}
                  </span>
                </span>
                <motion.span
                  initial={false}
                  animate={{ scale: sent ? [1, 1.22, 1] : 1, backgroundColor: typedN >= REQUEST.length || reduce ? "#4747E0" : "rgba(30,27,75,0.55)" }}
                  transition={{ duration: 0.35 }}
                  style={{ flexShrink: 0, width: "6.4cqw", aspectRatio: "1 / 1", borderRadius: "50%", display: "grid", placeItems: "center" }}
                >
                  <svg width="46%" height="46%" viewBox="0 0 16 16" fill="none"><path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </motion.span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scene 2: the work */}
        <motion.div
          initial={false}
          animate={{ opacity: board ? 1 : 0, y: board ? 0 : 16 }}
          transition={{ duration: 0.55, ease }}
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        >
          <div style={{ ...card, position: "absolute", left: 0, right: 0, top: `${BOARD_TOP}cqw`, borderRadius: 18, padding: "3cqw", boxSizing: "border-box" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "2cqw", height: `${HEAD}cqw` }}>
              <span style={{ fontSize: "clamp(11px, 3.1cqw, 14.5px)", fontWeight: 800, color: "#1F2430", letterSpacing: "-.01em", whiteSpace: "nowrap" }}>This week across EVOQ</span>
              <span style={{ ...label, padding: "0.9cqw 2.4cqw", borderRadius: 999, background: "#EFEBFF", color: "#4B3FD6", fontSize: small, whiteSpace: "nowrap" }}>4 teams</span>
            </div>
            {ROWS.map((r, i) => {
              const finished = board && at(r.end);
              const status = !finished ? r.before : r.sent && at(AT.approved + 0.25 + i * 0.15) ? { t: r.sent, c: GREEN } : r.after;
              return (
                <div key={r.key} style={{ position: "relative", height: `${ROW_H}cqw`, borderTop: "1px solid #EEF0F6" }}>
                  <motion.span aria-hidden initial={false} animate={{ backgroundColor: status.c }} transition={{ duration: 0.45 }} style={{ position: "absolute", left: 0, top: "1.8cqw", bottom: "1.8cqw", width: "1cqw", borderRadius: 4 }} />
                  <span style={{ position: "absolute", left: "3cqw", right: "25cqw", top: "1.9cqw", fontSize: "clamp(10.5px, 2.8cqw, 13px)", fontWeight: 700, color: "#1F2430", lineHeight: 1.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.title}</span>
                  <StatusPill s={status} style={{ position: "absolute", right: 0, top: "1.6cqw" }} />
                  <span aria-hidden style={{ position: "absolute", left: "3cqw", top: "6.6cqw", display: "flex", alignItems: "center", gap: "1.6cqw", fontSize: small, color: "#5F6B7A", fontWeight: 600 }}>
                    <ProductBadge productKey={r.app} size={16} />
                    {r.appName}
                    <PersonAvatar src={`${CHAR}/${r.owner}.webp`} size="4.4cqw" style={{ marginLeft: "1.2cqw", boxShadow: "0 0 0 1.5px #fff, 0 2px 6px -2px rgba(16,20,50,.4)" }} />
                  </span>
                </div>
              );
            })}
          </div>

          {/* the agent's pointer, on the status it is changing */}
          {!reduce && (
            <motion.svg
              aria-hidden
              viewBox="0 0 20 20"
              fill="none"
              initial={false}
              animate={{ opacity: active >= 0 ? 1 : 0, top: `${rowTop(pointerRow) + 5.2}cqw` }}
              transition={{ top: { duration: 0.6, ease }, opacity: { duration: 0.3 } }}
              style={{ position: "absolute", right: "24cqw", width: "4.4cqw", height: "4.4cqw", zIndex: 3 }}
            >
              <path d="M17 2.5 4.5 8.8l5.7 1.5 1.8 5.9L17 2.5Z" fill="#6D5BFF" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
            </motion.svg>
          )}

          {/* one chip per agent, each over the row it is working */}
          {ROWS.map((r, i) => (
            <Chip
              key={r.key}
              on={board && active === i}
              top={rowTop(i) + 6.4}
              tile={<AgentTile srcs={[`${CHAR}/${r.key}.webp`]} size="8cqw" style={{ boxShadow: "0 0 0 2px #8F7BFF" }} />}
              name={`${r.agent}, ${r.team}`}
              working={r.working}
              done={r.done}
              finished={at(r.end)}
            />
          ))}

          {/* Ava's drafts, added one after the other */}
          <motion.div
            aria-hidden
            initial={false}
            animate={{ opacity: panel ? 1 : 0, x: panel ? 0 : 18, scale: panel ? 1 : 0.97 }}
            transition={{ duration: 0.45, ease }}
            style={{ position: "absolute", left: "33cqw", right: "-1cqw", top: `${rowTop(0) + 20}cqw`, height: "37cqw", zIndex: 5, borderRadius: "3.4cqw", padding: "2.4cqw", boxSizing: "border-box", background: "linear-gradient(150deg, rgba(244,240,255,0.72), rgba(255,255,255,0.5))", backdropFilter: "blur(16px) saturate(1.5)", WebkitBackdropFilter: "blur(16px) saturate(1.5)", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.9), 0 24px 44px -18px rgba(30,20,90,0.55)", transformOrigin: "100% 0%" }}
          >
            <span style={{ display: "block", fontSize: small, fontWeight: 700, color: "#4B3FD6", marginBottom: "1.6cqw", whiteSpace: "nowrap" }}>Drafting follow ups</span>
            {DRAFTS.map((d) => {
              const shown = panel && at(d.at);
              return (
                <motion.div
                  key={d.to}
                  initial={false}
                  animate={{ opacity: shown ? 1 : 0, y: shown ? 0 : 8, scale: shown ? 1 : 0.96 }}
                  transition={{ duration: 0.4, ease }}
                  style={{ display: "flex", alignItems: "center", gap: "2cqw", height: "8.4cqw", marginBottom: "1.4cqw", padding: "0 2cqw", borderRadius: "2cqw", background: "#fff", boxShadow: "0 8px 18px -10px rgba(16,20,50,0.45), 0 0 0 1px rgba(16,20,50,0.05)", boxSizing: "border-box" }}
                >
                  <span style={{ flexShrink: 0, width: "4.8cqw", height: "4.8cqw", borderRadius: "50%", background: "#EFEBFF", color: "#4B3FD6", display: "grid", placeItems: "center", fontSize: small, fontWeight: 800 }}>{d.to[0]}</span>
                  <span style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "0.9cqw" }}>
                    <span style={{ fontSize: "clamp(9.5px, 2.4cqw, 12px)", fontWeight: 700, color: "#1F2430", lineHeight: 1.1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>To {d.to}</span>
                    <span style={{ height: "1.1cqw", width: "78%", borderRadius: 99, background: "#E7E9F3" }} />
                  </span>
                  <Tick size={13} color={VIOLET} />
                </motion.div>
              );
            })}
          </motion.div>

          {/* Dana reviews what the agents prepared */}
          <Chip
            on={review}
            top={rowTop(1) + 2}
            tile={<PersonAvatar src={`${CHAR}/dana.webp`} size="8cqw" style={{ boxShadow: "0 0 0 2px #fff, 0 0 0 3.5px #C9BEFF" }} />}
            name="Dana"
            working="Reviewing"
            done="Approved by Dana"
            finished={approved}
          />
          <motion.div
            aria-hidden
            initial={false}
            animate={{ opacity: board && !review ? 1 : 0, scale: board && !review ? 1 : 0.8 }}
            transition={{ duration: 0.45, ease }}
            style={{ position: "absolute", right: "1cqw", top: `${rowTop(ROWS.length) - 2}cqw`, zIndex: 3 }}
          >
            <PersonAvatar src={`${CHAR}/dana.webp`} size="11cqw" style={{ boxShadow: "0 0 0 3px #fff, 0 12px 24px -10px rgba(16,20,50,0.6)" }} />
          </motion.div>
        </motion.div>
      </div>
    </Stage>
  );
}
