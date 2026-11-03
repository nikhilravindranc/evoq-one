"use client";

import { motion } from "framer-motion";
import { AgentTile, Beat, CHAR, Cursor, GhostButton, PersonAvatar, Pointer, PrimaryButton, Spinner, Stage, Tick, card, ease, label, typed, useStoryClock } from "./story/kit";

/* Growth: a deals board. Marcus asks EVI to follow up on this week's open deals; EVI
   finds three, Ava (Follow-up agent) drafts an email for each, and the cards move across
   the board as the drafts are written and, after Marcus approves them all, sent. */

const REQUEST = "Follow up on this week's open deals.";
const AT = { send: 1.9, deals: 2.4, hand: 3.7, draft: 4.2, ready: 6.0, approve: 7.2, done: 8.3 };

const DEALS = [
  { name: "Northgate", amount: "$48K" },
  { name: "Bluepeak", amount: "$22K" },
  { name: "Alder & Finch", amount: "$15K" },
];
const COLS = ["Open deals", "Follow-up drafted", "Sent"];
const ROW = 11.5; // cqw per card row
const GAP = 1.6;

export function GrowthStory() {
  const { t, reduce, at: atT } = useStoryClock(AT.done);
  const at = (k: keyof typeof AT) => atT(AT[k]);
  // Where each card is: column 0 once found, 1 once drafted, 2 once sent.
  const colOf = (i: number) => (t >= AT.approve + 0.15 + i * 0.25 ? 2 : t >= AT.draft + i * 0.55 ? 1 : 0);
  const shown = (i: number) => t >= AT.deals + i * 0.3;
  const drafting = at("hand") && !at("ready");

  return (
    <Stage>
      {/* Ask */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease }} style={{ display: "flex", alignItems: "center", gap: "2.6cqw" }}>
        <PersonAvatar src={`${CHAR}/marcus.webp`} size="13cqw" />
        <div style={{ ...card, flex: 1, padding: "2.2cqw 2.8cqw", display: "flex", alignItems: "center", gap: "2cqw" }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ ...label, color: "rgba(31,36,48,0.55)" }}>Marcus · Sales Lead</div>
            <p style={{ margin: "3px 0 0", minHeight: "1.4em", fontSize: "clamp(11px, 2.7cqw, 14px)", lineHeight: 1.35, fontWeight: 600, color: "#1F2430" }}>
              {typed(REQUEST, t)}
              {!at("send") && <Cursor />}
            </p>
          </div>
          <motion.span
            animate={{ scale: at("send") ? [1, 1.25, 1] : 1, background: at("send") ? "#4747E0" : "#C9CBE6" }}
            transition={{ duration: 0.35 }}
            style={{ flexShrink: 0, width: "6cqw", minWidth: 24, aspectRatio: "1 / 1", borderRadius: "50%", display: "grid", placeItems: "center" }}
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </motion.span>
        </div>
      </motion.div>

      {/* The board */}
      <Beat on={at("send")} style={{ ...card, marginTop: "3cqw", padding: "2.4cqw 2.6cqw 2.6cqw" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "2cqw", marginBottom: "2cqw" }}>
          <AgentTile srcs={[`${CHAR}/evi.webp`, `${CHAR}/evi-working.webp`]} pose={at("deals") ? 1 : 0} size="8cqw" glow={at("send") && !at("deals")} />
          <span style={{ ...label, color: "#3A3AC9" }}>EVI</span>
          <span style={{ ...label, fontWeight: 600, color: "rgba(31,36,48,0.6)", flex: 1 }}>
            {at("deals") ? "3 deals closing this week" : "Checking CRM"}
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: `${GAP}cqw`, marginBottom: "1.4cqw" }}>
          {COLS.map((c, i) => (
            <span key={c} style={{ fontSize: "clamp(8.5px, 1.9cqw, 10px)", fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase", color: i === 2 ? "#167A43" : "rgba(31,36,48,0.5)" }}>{c}</span>
          ))}
        </div>
        <div style={{ position: "relative", height: `${3 * ROW + 2 * GAP}cqw` }}>
          {/* faint column rails */}
          {[0, 1, 2].map((c) => (
            <span key={c} aria-hidden style={{ position: "absolute", top: 0, bottom: 0, left: `calc(${c} * (100% + ${GAP}cqw) / 3)`, width: `calc((100% - ${2 * GAP}cqw) / 3)`, borderRadius: 12, background: c === 2 ? "rgba(34,197,94,0.07)" : "rgba(71,71,224,0.05)" }} />
          ))}
          {DEALS.map((d, i) => {
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
                  <span style={{ color: "#3A3AC9" }}>{d.amount}</span>
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: "clamp(8.5px, 1.9cqw, 10px)", fontWeight: 600, color: col === 2 ? "#167A43" : col === 1 ? "#B45309" : "rgba(31,36,48,0.55)", whiteSpace: "nowrap" }}>
                  {col === 2 ? <><Tick size={11} /> Sent</> : col === 1 ? "Draft ready" : drafting && t >= AT.draft + i * 0.55 - 0.5 ? <><Spinner size={10} /> Drafting</> : "Closing this week"}
                </span>
              </motion.div>
            );
          })}
        </div>
      </Beat>

      {/* The agent */}
      <Beat on={at("hand")} style={{ ...card, marginTop: "2.6cqw", padding: "2.2cqw 2.6cqw", display: "flex", alignItems: "center", gap: "2.6cqw" }}>
        <AgentTile srcs={[`${CHAR}/ava.webp`]} size="14cqw" />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
            <span style={{ ...label, color: "#3A3AC9" }}>Ava · Follow-up agent</span>
            <span style={{ fontSize: "clamp(8.5px, 1.9cqw, 10px)", fontWeight: 700, padding: "2px 7px", borderRadius: 999, whiteSpace: "nowrap", color: at("done") ? "#167A43" : at("ready") ? "#B45309" : "#4747E0", background: at("done") ? "rgba(34,160,90,0.14)" : at("ready") ? "rgba(245,158,11,0.16)" : "rgba(71,71,224,0.12)" }}>
              {at("done") ? "Completed" : at("approve") ? "Sending" : at("ready") ? "Awaiting approval" : "Drafting"}
            </span>
          </div>
          <div style={{ position: "relative", marginTop: "1.4cqw", height: "clamp(22px, 5.6cqw, 28px)" }}>
            <motion.div animate={{ opacity: at("ready") && !at("approve") ? 1 : 0 }} transition={{ duration: 0.3 }} style={{ display: "flex", gap: "1.6cqw", position: "absolute", inset: 0 }}>
              <GhostButton>Review drafts</GhostButton>
              <PrimaryButton>Approve all 3</PrimaryButton>
            </motion.div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: at("approve") ? 1 : 0 }}
              transition={{ duration: 0.35 }}
              style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", gap: 7, fontSize: "clamp(9.5px, 2.2cqw, 11.5px)", fontWeight: 700, color: at("done") ? "#167A43" : "#1F2430" }}
            >
              {at("done") ? <><Tick size={16} /> 3 follow-ups sent · $85K in play</> : <><PersonAvatar src={`${CHAR}/marcus.webp`} size={20} /> Approved by Marcus</>}
            </motion.span>
            <Pointer show={at("ready") && !at("approve")} from={[170, 30]} to={[140, 8]} reduce={reduce} />
          </div>
        </div>
      </Beat>
    </Stage>
  );
}
