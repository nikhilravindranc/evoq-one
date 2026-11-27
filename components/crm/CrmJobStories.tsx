"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { AgentTile, Beat, CHAR, Cursor, GhostButton, PersonAvatar, Pointer, PrimaryButton, Spinner, Stage, Tick, card, ease, label, typed, useStoryClock } from "../hero/story/kit";

/* The four stories of the CRM page's EVI section, built like the Growth tab on the home hero and from the same kit. Someone asks, EVI finds, the
   cards move or fill in, the agent works, the result appears. Three jobs use the three column board (the same mechanic as Growth), and the meeting
   brief uses a short list of facts. Each story plays once from the moment it is mounted. Mount it again with a new key to replay it. The agents use the
   characters already made for the site: Quote Follow-up, Dispatch, Coaching and Collections. The names and numbers explain a situation, they are not figures from the product. */

export const END = 8.3; // seconds one story takes
const AT = { send: 1.9, found: 2.4, hand: 3.7, draft: 4.2, ready: 6.0, approve: 7.2, done: END };
const ROW = 11.5; // cqw per card row
const GAP = 1.6;

type Item = { name: string; meta: string; s: [string, string, string] };
type Board = {
  request: string; checking: string; found: string;
  cols: [string, string, string]; items: Item[];
  agent: { name: string; src?: string; icon?: ReactNode };
  working: string; waiting: string; sending: string;
  ghost: string; primary: string; done: string;
};

const BOARDS: Board[] = [
  {
    request: "Follow up on proposals with no reply.", checking: "Checking CRM", found: "3 proposals with no reply",
    cols: ["No reply", "Follow up drafted", "Sent"],
    items: [
      { name: "Northgate", meta: "$27K", s: ["No reply, 12 days", "Draft ready", "Sent"] },
      { name: "Beta Inc.", meta: "$18K", s: ["No reply, 9 days", "Draft ready", "Sent"] },
      { name: "Orbit Retail", meta: "$22K", s: ["No reply, 8 days", "Draft ready", "Sent"] },
    ],
    agent: { name: "Quote Follow-up Agent", src: `${CHAR}/agents/quote.webp` },
    working: "Drafting", waiting: "Awaiting approval", sending: "Sending", ghost: "Review drafts", primary: "Approve all 3", done: "3 follow ups sent",
  },
  {
    request: "Respond to today's new leads.", checking: "Checking CRM", found: "3 new leads, no owner yet",
    cols: ["New", "Assigned", "Contacted"],
    items: [
      { name: "Maya Rao", meta: "Website", s: ["New today", "Priya M", "Contacted"] },
      { name: "Daniel Cruz", meta: "Referral", s: ["New today", "Marcus L", "Contacted"] },
      { name: "Sophia Hale", meta: "Event", s: ["New today", "Anita R", "Contacted"] },
    ],
    agent: { name: "Lead Agent", src: `${CHAR}/agents/dispatch.webp` },
    working: "Assigning", waiting: "Awaiting confirmation", sending: "Moving along", ghost: "Review owners", primary: "Confirm all 3", done: "3 leads moved to Contacted",
  },
  {
    request: "Which renewals are coming up?", checking: "Checking CRM", found: "3 renewals in the next 30 days",
    cols: ["Due soon", "Reminder drafted", "Sent"],
    items: [
      { name: "Halo Health", meta: "$41K", s: ["Renews in 14 days", "Draft ready", "Sent"] },
      { name: "Brightway", meta: "$22K", s: ["Renews in 21 days", "Draft ready", "Sent"] },
      { name: "Kestrel Labs", meta: "$36K", s: ["Renews in 28 days", "Draft ready", "Sent"] },
    ],
    agent: { name: "Renewal Agent", src: `${CHAR}/agents/collections.webp` },
    working: "Drafting", waiting: "Awaiting approval", sending: "Sending", ghost: "Review reminders", primary: "Approve all 3", done: "3 reminders sent",
  },
];

const WHO = "Priya M · Deal owner";
const ME = "/crm/priya.webp";

function Ask({ text, t, sent }: { text: string; t: number; sent: boolean }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease }} style={{ display: "flex", alignItems: "center", gap: "2.6cqw" }}>
      <PersonAvatar src={ME} size="13cqw" style={{ objectPosition: "50% 12%" }} />
      <div style={{ ...card, flex: 1, padding: "2.2cqw 2.8cqw", display: "flex", alignItems: "center", gap: "2cqw" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ ...label, color: "rgba(31,36,48,0.55)" }}>{WHO}</div>
          <p style={{ margin: "3px 0 0", minHeight: "1.4em", fontSize: "clamp(11px, 2.7cqw, 14px)", lineHeight: 1.35, fontWeight: 600, color: "#1F2430" }}>
            {typed(text, t)}
            {!sent && <Cursor />}
          </p>
        </div>
        <motion.span
          animate={{ scale: sent ? [1, 1.25, 1] : 1, background: sent ? "#4747E0" : "#C9CBE6" }}
          transition={{ duration: 0.35 }}
          style={{ flexShrink: 0, width: "6cqw", minWidth: 24, aspectRatio: "1 / 1", borderRadius: "50%", display: "grid", placeItems: "center" }}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </motion.span>
      </div>
    </motion.div>
  );
}

function CrmChip() {
  return <span style={{ fontSize: "clamp(8.5px, 1.9cqw, 10px)", fontWeight: 700, padding: "2px 8px", borderRadius: 999, color: "#1D4ED8", background: "rgba(29,78,216,0.1)", whiteSpace: "nowrap" }}>CRM</span>;
}

function AgentRow({ agent, status, statusTone, children, on }: { agent: Board["agent"]; status: string; statusTone: "run" | "wait" | "ok"; children: ReactNode; on: boolean }) {
  const tone = statusTone === "ok" ? ["#167A43", "rgba(34,160,90,0.14)"] : statusTone === "wait" ? ["#B45309", "rgba(245,158,11,0.16)"] : ["#4747E0", "rgba(71,71,224,0.12)"];
  return (
    <Beat on={on} style={{ ...card, marginTop: "2.6cqw", padding: "2.2cqw 2.6cqw", display: "flex", alignItems: "center", gap: "2.6cqw" }}>
      {agent.src ? (
        <AgentTile srcs={[agent.src]} size="14cqw" />
      ) : (
        <div style={{ width: "14cqw", aspectRatio: "1 / 1", borderRadius: "50%", background: "#E9E4FF", color: "#4747E0", display: "grid", placeItems: "center", flexShrink: 0, boxShadow: "0 0 0 2.5px #8F7BFF, 0 0 0 6px rgba(255,255,255,0.3)" }}>{agent.icon}</div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <span style={{ ...label, color: "#3A3AC9" }}>{agent.name}</span>
          <span style={{ fontSize: "clamp(8.5px, 1.9cqw, 10px)", fontWeight: 700, padding: "2px 7px", borderRadius: 999, whiteSpace: "nowrap", color: tone[0], background: tone[1] }}>{status}</span>
        </div>
        {children}
      </div>
    </Beat>
  );
}

function BoardStory({ b }: { b: Board }) {
  const { t, reduce, at: atT } = useStoryClock(END);
  const at = (k: keyof typeof AT) => atT(AT[k]);
  const colOf = (i: number) => (t >= AT.approve + 0.15 + i * 0.25 ? 2 : t >= AT.draft + i * 0.55 ? 1 : 0);
  const shown = (i: number) => t >= AT.found + i * 0.3;
  const working = at("hand") && !at("ready");

  return (
    <Stage>
      <Ask text={b.request} t={t} sent={at("send")} />

      <Beat on={at("send")} style={{ ...card, marginTop: "3cqw", padding: "2.4cqw 2.6cqw 2.6cqw" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "2cqw", marginBottom: "2cqw" }}>
          <AgentTile srcs={[`${CHAR}/evi.webp`, `${CHAR}/evi-working.webp`]} pose={at("found") ? 1 : 0} size="8cqw" glow={at("send") && !at("found")} />
          <span style={{ ...label, color: "#3A3AC9" }}>EVI</span>
          <span style={{ ...label, fontWeight: 600, color: "rgba(31,36,48,0.6)", flex: 1 }}>{at("found") ? b.found : b.checking}</span>
          <CrmChip />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: `${GAP}cqw`, marginBottom: "1.4cqw" }}>
          {b.cols.map((c, i) => (
            <span key={c} style={{ fontSize: "clamp(8.5px, 1.9cqw, 10px)", fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase", color: i === 2 ? "#167A43" : "rgba(31,36,48,0.5)" }}>{c}</span>
          ))}
        </div>
        <div style={{ position: "relative", height: `${3 * ROW + 2 * GAP}cqw` }}>
          {[0, 1, 2].map((c) => (
            <span key={c} aria-hidden style={{ position: "absolute", top: 0, bottom: 0, left: `calc(${c} * (100% + ${GAP}cqw) / 3)`, width: `calc((100% - ${2 * GAP}cqw) / 3)`, borderRadius: 12, background: c === 2 ? "rgba(34,197,94,0.07)" : "rgba(71,71,224,0.05)" }} />
          ))}
          {b.items.map((d, i) => {
            const col = colOf(i);
            return (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, left: "0%" }}
                animate={{ opacity: shown(i) ? 1 : 0, left: `calc(${col} * (100% + ${GAP}cqw) / 3)` }}
                transition={{ left: { duration: 0.7, ease }, opacity: { duration: 0.4 } }}
                style={{
                  position: "absolute", top: `${i * (ROW + GAP)}cqw`, width: `calc((100% - ${2 * GAP}cqw) / 3)`, height: `${ROW}cqw`,
                  borderRadius: 12, background: "#fff", boxShadow: "0 8px 18px -10px rgba(16,20,50,0.5), 0 0 0 1px rgba(16,20,50,0.07)",
                  padding: "1.6cqw 2cqw", display: "flex", flexDirection: "column", justifyContent: "space-between", boxSizing: "border-box",
                }}
              >
                <span style={{ display: "flex", justifyContent: "space-between", gap: 4, fontSize: "clamp(9.5px, 2.3cqw, 12px)", fontWeight: 700, color: "#1F2430", lineHeight: 1.15 }}>
                  <span style={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{d.name}</span>
                  <span style={{ color: "#3A3AC9", whiteSpace: "nowrap" }}>{d.meta}</span>
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: "clamp(8.5px, 1.9cqw, 10px)", fontWeight: 600, color: col === 2 ? "#167A43" : col === 1 ? "#B45309" : "rgba(31,36,48,0.55)", whiteSpace: "nowrap" }}>
                  {col === 2 ? <><Tick size={11} /> {d.s[2]}</> : col === 1 ? d.s[1] : working && t >= AT.draft + i * 0.55 - 0.5 ? <><Spinner size={10} /> {b.working}</> : d.s[0]}
                </span>
              </motion.div>
            );
          })}
        </div>
      </Beat>

      <AgentRow agent={b.agent} on={at("hand")} status={at("done") ? "Completed" : at("approve") ? b.sending : at("ready") ? b.waiting : b.working} statusTone={at("done") ? "ok" : at("ready") && !at("approve") ? "wait" : "run"}>
        <div style={{ position: "relative", marginTop: "1.4cqw", height: "clamp(22px, 5.6cqw, 28px)" }}>
          <motion.div animate={{ opacity: at("ready") && !at("approve") ? 1 : 0 }} transition={{ duration: 0.3 }} style={{ display: "flex", gap: "1.6cqw", position: "absolute", inset: 0 }}>
            <GhostButton>{b.ghost}</GhostButton>
            <PrimaryButton>{b.primary}</PrimaryButton>
          </motion.div>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: at("approve") ? 1 : 0 }} transition={{ duration: 0.35 }} style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", gap: 7, fontSize: "clamp(9.5px, 2.2cqw, 11.5px)", fontWeight: 700, color: at("done") ? "#167A43" : "#1F2430" }}>
            {at("done") ? <><Tick size={16} /> {b.done}</> : <><PersonAvatar src={ME} size={20} style={{ objectPosition: "50% 12%" }} /> Approved by Priya</>}
          </motion.span>
          <Pointer show={at("ready") && !at("approve")} from={[170, 30]} to={[140, 8]} reduce={reduce} />
        </div>
      </AgentRow>
    </Stage>
  );
}

const FACTS: [string, string][] = [
  ["Last contact", "12 days ago"],
  ["Proposal", "Sent 3 November"],
  ["Open question", "Pricing"],
];

function BriefStory() {
  const { t, reduce, at: atT } = useStoryClock(END);
  const at = (k: keyof typeof AT) => atT(AT[k]);
  const writing = at("hand") && !at("ready");
  const agent = { name: "Meeting Brief Agent", src: `${CHAR}/agents/coaching.webp` };

  return (
    <Stage>
      <Ask text="Prepare my brief for the 3 PM Northgate call." t={t} sent={at("send")} />

      <Beat on={at("send")} style={{ ...card, marginTop: "3cqw", padding: "2.4cqw 2.6cqw 2.6cqw" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "2cqw", marginBottom: "2cqw" }}>
          <AgentTile srcs={[`${CHAR}/evi.webp`, `${CHAR}/evi-working.webp`]} pose={at("found") ? 1 : 0} size="8cqw" glow={at("send") && !at("found")} />
          <span style={{ ...label, color: "#3A3AC9" }}>EVI</span>
          <span style={{ ...label, fontWeight: 600, color: "rgba(31,36,48,0.6)", flex: 1 }}>{at("found") ? "3 things to know before the call" : "Reading the Northgate record"}</span>
          <CrmChip />
        </div>
        <div style={{ height: `${3 * ROW + 2 * GAP + 4.4}cqw`, display: "grid", gridTemplateRows: "repeat(3, 1fr)", gap: `${GAP}cqw` }}>
          {FACTS.map(([k, v], i) => (
            <Beat key={k} on={t >= AT.found + i * 0.4} from={8} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, background: "rgba(71,71,224,0.05)", borderRadius: 12, padding: "0 2.6cqw" }}>
              <span style={{ ...label, fontWeight: 600, color: "rgba(31,36,48,0.55)" }}>{k}</span>
              <span style={{ fontSize: "clamp(10px, 2.5cqw, 12.5px)", fontWeight: 700, color: "#1F2430" }}>{v}</span>
            </Beat>
          ))}
        </div>
      </Beat>

      <AgentRow agent={agent} on={at("hand")} status={at("done") ? "Completed" : at("approve") ? "Adding" : at("ready") ? "Brief ready" : "Writing"} statusTone={at("done") ? "ok" : at("ready") && !at("approve") ? "wait" : "run"}>
        <div style={{ position: "relative", marginTop: "1.4cqw", height: "clamp(22px, 5.6cqw, 28px)" }}>
          <motion.span animate={{ opacity: writing ? 1 : 0 }} transition={{ duration: 0.3 }} style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", gap: 7, fontSize: "clamp(9.5px, 2.2cqw, 11.5px)", fontWeight: 600, color: "rgba(31,36,48,0.6)" }}>
            <Spinner size={11} /> Writing the brief
          </motion.span>
          <motion.div animate={{ opacity: at("ready") && !at("approve") ? 1 : 0 }} transition={{ duration: 0.3 }} style={{ display: "flex", gap: "1.6cqw", position: "absolute", inset: 0 }}>
            <GhostButton>Review brief</GhostButton>
            <PrimaryButton>Add to record</PrimaryButton>
          </motion.div>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: at("approve") ? 1 : 0 }} transition={{ duration: 0.35 }} style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", gap: 7, fontSize: "clamp(9.5px, 2.2cqw, 11.5px)", fontWeight: 700, color: at("done") ? "#167A43" : "#1F2430" }}>
            {at("done") ? <><Tick size={16} /> Brief on the Northgate record</> : <><PersonAvatar src={ME} size={20} style={{ objectPosition: "50% 12%" }} /> Added by Priya</>}
          </motion.span>
          <Pointer show={at("ready") && !at("approve")} from={[170, 30]} to={[150, 8]} reduce={reduce} />
        </div>
      </AgentRow>
    </Stage>
  );
}

/* job 0 to 3, in the order of the cards */
export function JobStory({ job }: { job: number }) {
  if (job === 2) return <BriefStory />;
  return <BoardStory b={BOARDS[job === 3 ? 2 : job]} />;
}
