"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ProductBadge } from "@/components/shared/ProductBadge";
import { AgentTile, CHAR, PersonAvatar, Spinner, Stage, Tick, card, ease, label, useStoryClock } from "./story/kit";

/* An earlier overview, kept for the /hero-versions page: one work board across the EVOQ apps. Each row is a record
   from a different app, with its owner and a status. The five agents take the rows one at a time: the person asks
   EVI, the agent for that team docks on its row, works, and the status moves on. The last step is EVI answering
   with sources. Records, names and counts are sample data. */

type Row = {
  key: string;
  agent: string;
  team: string;
  title: string;
  app: "crm" | "desk" | "hrms" | "billing" | "sync";
  appName: string;
  owner: string;
  before: { t: string; c: string };
  after: { t: string; c: string };
  asks: string;
  working: string;
  done: string;
};

const GREY = "#797E93", RED = "#E2445C", AMBER = "#E8A21B", GREEN = "#1FA971", VIOLET = "#6D5BFF";

const ROWS: Row[] = [
  { key: "ava", agent: "Ava", team: "Growth", title: "Renewal follow ups", app: "crm", appName: "CRM", owner: "dana", before: { t: "Needs follow up", c: AMBER }, after: { t: "Drafts ready", c: VIOLET }, asks: "Which deals need a follow up this week?", working: "Drafting follow ups", done: "3 follow ups drafted" },
  { key: "kai", agent: "Kai", team: "Operations", title: "Ticket 4821, unit not cooling", app: "desk", appName: "Desk", owner: "marcus", before: { t: "Not booked", c: RED }, after: { t: "Job booked", c: GREEN }, asks: "Why is ticket 4821 stuck?", working: "Booking the job", done: "Job booked, customer notified" },
  { key: "sana", agent: "Sana", team: "People", title: "New hire, first week", app: "hrms", appName: "HRMS", owner: "mia", before: { t: "Not planned", c: GREY }, after: { t: "Plan ready", c: VIOLET }, asks: "Set up Priya's first week", working: "Planning the week", done: "First week planned" },
  { key: "rohan", agent: "Rohan", team: "Finance", title: "Invoice 2041", app: "billing", appName: "Billing", owner: "sam", before: { t: "Overdue", c: RED }, after: { t: "Reminders ready", c: VIOLET }, asks: "What is overdue, and who do I remind?", working: "Drafting reminders", done: "4 reminders drafted" },
  { key: "leo", agent: "Leo", team: "Platform", title: "Orders to Inventory", app: "sync", appName: "Sync", owner: "dana", before: { t: "1 failed", c: RED }, after: { t: "1 needs you", c: AMBER }, asks: "Why did the orders fail to sync?", working: "Checking 12 records", done: "11 of 12 records synced" },
];
const EVI_ASK = "What needs my attention first?";
const EVI_DONE = "Answers come with sources";
const STEPS = ROWS.length + 1; // the five agents, then EVI

const FIRST_LIGHT_MS = 1800;
const STEP_MS = 2300;
const WORK_MS = 1000;

/* the text typed so far; restarts whenever `text` changes */
function useTyped(text: string, run: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    let i = 0;
    const id = setInterval(() => { i += 1; setN(i); if (i >= text.length) clearInterval(id); }, 28);
    return () => { clearInterval(id); setN(0); };
  }, [text, run]);
  return run ? text.slice(0, n) : text;
}

const small = "clamp(9px, 2.1cqw, 10.5px)";

function Status({ s, from, on }: { s: { t: string; c: string }; from: { t: string; c: string }; on: boolean }) {
  const cur = on ? s : from;
  return (
    <motion.span
      initial={false}
      animate={{ backgroundColor: cur.c }}
      transition={{ duration: 0.45, ease }}
      style={{ position: "absolute", right: "2.4cqw", top: "1.5cqw", height: "4.8cqw", minWidth: "21cqw", padding: "0 2cqw", borderRadius: 6, display: "grid", placeItems: "center", color: "#fff", fontSize: "clamp(9px, 2.2cqw, 11px)", fontWeight: 700, whiteSpace: "nowrap" }}
    >
      <motion.span key={cur.t} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease }}>{cur.t}</motion.span>
    </motion.span>
  );
}

export function OverviewBoardStory() {
  const reduce = !!useReducedMotion();
  const { at: atT } = useStoryClock(2.2);
  const [lit, setLit] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  // One step every STEP_MS for as long as it is on screen: the agent works, then the row moves on.
  useEffect(() => {
    if (reduce) return;
    let i = 0;
    let loop: ReturnType<typeof setInterval>;
    let work: ReturnType<typeof setTimeout>;
    const run = () => { setLit(i); setDone(false); clearTimeout(work); work = setTimeout(() => setDone(true), WORK_MS); };
    const start = setTimeout(() => { run(); loop = setInterval(() => { i = (i + 1) % STEPS; run(); }, STEP_MS); }, FIRST_LIGHT_MS);
    return () => { clearTimeout(start); clearInterval(loop); clearTimeout(work); };
  }, [reduce]);

  const eviLit = lit === ROWS.length;
  const ask = lit === null ? ROWS[0].asks : eviLit ? EVI_ASK : ROWS[lit].asks;
  const typedAsk = useTyped(ask, !reduce && lit !== null);

  return (
    <Stage>
      <div style={{ ...card, borderRadius: 18, padding: "3cqw", position: "relative", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "2cqw", height: "7cqw" }}>
          <span style={{ fontSize: "clamp(11px, 3.1cqw, 14.5px)", fontWeight: 800, color: "#1F2430", letterSpacing: "-.01em" }}>This week across EVOQ</span>
          <span style={{ ...label, padding: "0.9cqw 2.4cqw", borderRadius: 999, background: "#EFEBFF", color: "#4B3FD6", fontSize: small, whiteSpace: "nowrap" }}>5 teams</span>
        </div>

        <div>
          {ROWS.map((r, i) => {
            const shown = atT(0.25 + i * 0.16);
            const here = lit === i;
            const finished = here && done;
            const faded = lit !== null && !here;
            return (
              <motion.div
                key={r.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: shown ? (faded ? 0.55 : 1) : 0, y: shown ? 0 : 10 }}
                transition={{ duration: 0.4, ease }}
                style={{ position: "relative", height: "12.6cqw", borderTop: "1px solid #EEF0F6" }}
              >
                <motion.span aria-hidden initial={false} animate={{ backgroundColor: (finished ? r.after : r.before).c }} transition={{ duration: 0.45 }} style={{ position: "absolute", left: 0, top: "1.8cqw", bottom: "1.8cqw", width: "1cqw", borderRadius: 4 }} />
                <span style={{ position: "absolute", left: "3cqw", right: "27cqw", top: "1.7cqw", fontSize: "clamp(10.5px, 2.8cqw, 13px)", fontWeight: 700, color: "#1F2430", lineHeight: 1.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.title}</span>
                <Status s={r.after} from={r.before} on={finished} />
                <span aria-hidden style={{ position: "absolute", left: "3cqw", top: "7cqw", display: "flex", alignItems: "center", gap: "1.6cqw", fontSize: small, color: "#5F6B7A", fontWeight: 600 }}>
                  <ProductBadge productKey={r.app} size={16} />
                  {r.appName}
                  <PersonAvatar src={`${CHAR}/${r.owner}.webp`} size="4.4cqw" style={{ marginLeft: "1.2cqw", boxShadow: "0 0 0 1.5px #fff, 0 2px 6px -2px rgba(16,20,50,.4)" }} />
                </span>
                <motion.div
                  aria-hidden
                  initial={false}
                  animate={{ opacity: here ? 1 : 0, x: here ? 0 : 14, scale: here ? 1 : 0.96 }}
                  transition={{ duration: 0.38, ease }}
                  style={{ position: "absolute", right: "2.4cqw", top: "6.5cqw", height: "5.4cqw", display: "flex", alignItems: "center", gap: "1.4cqw", padding: "0 2.2cqw 0 0.5cqw", borderRadius: 999, background: "#F4F1FF", boxShadow: "0 0 0 1.5px #8F7BFF, 0 8px 18px -8px rgba(110,90,255,.6)", whiteSpace: "nowrap", pointerEvents: "none" }}
                >
                  <AgentTile srcs={[`${CHAR}/${r.key}.webp`]} size="4.4cqw" style={{ boxShadow: "0 0 0 1.5px #fff" }} />
                  <span style={{ ...label, fontSize: small, color: "#3A3AC9" }}>{r.agent}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "1.2cqw", fontSize: small, fontWeight: 600, color: "#1F2430" }}>
                    {finished ? <Tick size={13} /> : <Spinner size={11} />}
                    <motion.span key={finished ? "d" : "w"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>{finished ? r.done : r.working}</motion.span>
                  </span>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: atT(1.3) ? 1 : 0, y: atT(1.3) ? 0 : 12 }}
          transition={{ duration: 0.45, ease }}
          style={{ marginTop: "2.2cqw", display: "flex", alignItems: "center", gap: "2.2cqw", padding: "1.6cqw 1.8cqw 1.6cqw 1.6cqw", borderRadius: 14, background: "#1E1B4B", position: "relative" }}
        >
          <AgentTile srcs={[`${CHAR}/evi.webp`]} size="7.4cqw" glow={eviLit} />
          <span style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "0.4cqw" }}>
            <span style={{ ...label, fontSize: "clamp(8.5px, 1.9cqw, 10px)", color: "#B9B2FF", letterSpacing: ".04em", textTransform: "uppercase" }}>Ask EVI</span>
            <span style={{ fontSize: "clamp(10px, 2.6cqw, 12.5px)", fontWeight: 600, color: "#fff", lineHeight: 1.25, minHeight: "1.3em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {typedAsk}
              {!reduce && lit !== null && typedAsk.length < ask.length && <span style={{ display: "inline-block", width: 1.5, height: "1em", marginLeft: 1, background: "#B9B2FF", verticalAlign: "-2px" }} />}
            </span>
          </span>
          <motion.span
            initial={false}
            animate={{ opacity: eviLit && done ? 1 : 0, scale: eviLit && done ? 1 : 0.94 }}
            transition={{ duration: 0.3, ease }}
            style={{ position: "absolute", right: "2cqw", top: "-4.2cqw", display: "flex", alignItems: "center", gap: "1.4cqw", padding: "1cqw 2.2cqw", borderRadius: 999, background: "#fff", boxShadow: "0 8px 18px -8px rgba(16,20,50,.5)", fontSize: small, fontWeight: 700, color: "#1F2430", whiteSpace: "nowrap", pointerEvents: "none" }}
            aria-hidden
          >
            <Tick size={13} />{EVI_DONE}
          </motion.span>
        </motion.div>
      </div>
    </Stage>
  );
}
