"use client";

import { motion } from "framer-motion";
import { ProductBadge } from "@/components/shared/ProductBadge";
import { AgentTile, Beat, CHAR, Cursor, GhostButton, PersonAvatar, Pointer, PrimaryButton, Stage, Tick, card, ease, label, typed, useStoryClock } from "./story/kit";

/* Finance: a ledger. Dana asks EVI which invoices are overdue; the total counts up and the
   four invoices appear, EVI notes two items below reorder level in Inventory, and Rohan
   (Collections agent) drafts a reminder for each. They go out only after Dana approves. */

const REQUEST = "Which invoices are overdue?";
const AT = { send: 1.9, ledger: 2.3, row: 2.5, rowStep: 0.28, stock: 3.9, hand: 4.4, draft: 4.8, ready: 6.1, approve: 7.3, sent: 7.45, done: 8.4 };

const ROWS = [
  { who: "Bluepeak Studio", inv: "INV-2486", amt: "$6,200", late: "41 days" },
  { who: "Alder & Finch", inv: "INV-2471", amt: "$5,150", late: "28 days" },
  { who: "Northgate Partners", inv: "INV-2492", amt: "$4,350", late: "19 days" },
  { who: "Fenwick & Co", inv: "INV-2503", amt: "$2,700", late: "12 days" },
];
const TOTAL = 18400;

export function FinanceStory() {
  const { t, reduce, at: atT } = useStoryClock(AT.done);
  const at = (k: keyof typeof AT) => atT(AT[k]);
  const p = Math.min(1, Math.max(0, (t - AT.ledger) / 1.2));
  const total = Math.round(TOTAL * (1 - Math.pow(1 - p, 3)));
  const rowOn = (i: number) => t >= AT.row + i * AT.rowStep;
  const stateOf = (i: number) => (t >= AT.sent + i * 0.2 ? 2 : t >= AT.draft + i * 0.28 ? 1 : 0);

  return (
    <Stage>
      {/* Ask: a search bar with the person inside it */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease }} style={{ ...card, borderRadius: 999, padding: "1.6cqw 1.8cqw 1.6cqw 1.6cqw", display: "flex", alignItems: "center", gap: "2.4cqw" }}>
        <PersonAvatar src={`${CHAR}/dana.webp`} size="10cqw" style={{ boxShadow: "0 0 0 2px #fff, 0 4px 10px -4px rgba(16,20,50,0.4)" }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ ...label, color: "rgba(31,36,48,0.55)", fontSize: "clamp(8.5px, 1.9cqw, 10px)" }}>Dana · Finance Lead</div>
          <p style={{ margin: 0, minHeight: "1.4em", fontSize: "clamp(11px, 2.7cqw, 14px)", lineHeight: 1.4, fontWeight: 600, color: "#1F2430", whiteSpace: "nowrap" }}>
            {typed(REQUEST, t)}
            {!at("send") && <Cursor />}
          </p>
        </div>
        <motion.span
          animate={{ scale: at("send") ? [1, 1.25, 1] : 1, background: at("send") ? "#4747E0" : "#C9CBE6" }}
          transition={{ duration: 0.35 }}
          style={{ flexShrink: 0, width: "7cqw", minWidth: 26, aspectRatio: "1 / 1", borderRadius: "50%", display: "grid", placeItems: "center" }}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </motion.span>
      </motion.div>

      {/* The ledger */}
      <Beat on={at("ledger")} style={{ ...card, marginTop: "2.4cqw", padding: "2.2cqw 2.6cqw" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "2cqw" }}>
          <ProductBadge productKey="billing" size={22} />
          <div style={{ flex: 1 }}>
            <div style={{ ...label, color: "rgba(31,36,48,0.55)" }}>Overdue invoices</div>
            <div style={{ fontSize: "clamp(16px, 4.6cqw, 24px)", fontWeight: 800, letterSpacing: "-0.02em", color: "#1F2430", lineHeight: 1.1, fontVariantNumeric: "tabular-nums" }}>${total.toLocaleString("en-US")}</div>
          </div>
          <AgentTile srcs={[`${CHAR}/evi.webp`, `${CHAR}/evi-working.webp`]} pose={at("row") ? 1 : 0} size="9cqw" glow={at("ledger") && !at("stock")} />
        </div>
        <div style={{ marginTop: "2cqw", display: "flex", flexDirection: "column" }}>
          {ROWS.map((r, i) => {
            const st = stateOf(i);
            return (
              <motion.div
                key={r.inv}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: rowOn(i) ? 1 : 0, x: rowOn(i) ? 0 : -8 }}
                transition={{ duration: 0.4, ease }}
                style={{ display: "grid", gridTemplateColumns: "1fr auto auto", alignItems: "center", gap: "2.4cqw", padding: "1cqw 0", borderTop: "1px solid rgba(16,20,50,0.07)" }}
              >
                <span style={{ minWidth: 0 }}>
                  <span style={{ display: "block", fontSize: "clamp(9.5px, 2.3cqw, 12px)", fontWeight: 700, color: "#1F2430", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.who}</span>
                  <span style={{ fontSize: "clamp(8.5px, 1.9cqw, 10px)", color: "rgba(31,36,48,0.5)" }}>{r.inv} · <span style={{ color: "#C2410C", fontWeight: 600 }}>{r.late} late</span></span>
                </span>
                <span style={{ fontSize: "clamp(9.5px, 2.3cqw, 12px)", fontWeight: 700, color: "#1F2430", fontVariantNumeric: "tabular-nums" }}>{r.amt}</span>
                <span style={{ minWidth: "17cqw", display: "inline-flex", justifyContent: "flex-end" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: "clamp(8.5px, 1.9cqw, 10px)", fontWeight: 700, padding: "2px 7px", borderRadius: 999, whiteSpace: "nowrap", color: st === 2 ? "#167A43" : st === 1 ? "#B45309" : "#C2410C", background: st === 2 ? "rgba(34,160,90,0.14)" : st === 1 ? "rgba(245,158,11,0.16)" : "rgba(239,68,68,0.1)" }}>
                    {st === 2 ? <><Tick size={10} /> Sent</> : st === 1 ? "Reminder drafted" : "Overdue"}
                  </span>
                </span>
              </motion.div>
            );
          })}
        </div>
        <Beat on={at("stock")} from={6} style={{ marginTop: "1.6cqw", display: "flex", alignItems: "center", gap: "1.8cqw", padding: "1.4cqw 2cqw", borderRadius: 10, background: "rgba(245,158,11,0.12)" }}>
          <ProductBadge productKey="inventory" size={16} />
          <span style={{ fontSize: "clamp(8.5px, 2cqw, 10.5px)", fontWeight: 600, color: "#92400E" }}>2 items below reorder level in Inventory</span>
        </Beat>
      </Beat>

      {/* The agent */}
      <Beat on={at("hand")} style={{ ...card, marginTop: "2cqw", padding: "1.8cqw 2.6cqw", display: "flex", alignItems: "center", gap: "2.6cqw" }}>
        <AgentTile srcs={[`${CHAR}/rohan.webp`]} size="13cqw" glow={at("hand") && !at("ready")} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <span style={{ ...label, color: "#3A3AC9" }}>Rohan · Collections agent</span>
          <div style={{ position: "relative", marginTop: "1.4cqw", height: "clamp(22px, 5.6cqw, 28px)" }}>
            <motion.span animate={{ opacity: at("hand") && !at("ready") ? 1 : 0 }} transition={{ duration: 0.3 }} style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", fontSize: "clamp(9.5px, 2.2cqw, 11.5px)", color: "rgba(31,36,48,0.7)" }}>
              Drafting a reminder for each invoice…
            </motion.span>
            <motion.div animate={{ opacity: at("ready") && !at("approve") ? 1 : 0 }} transition={{ duration: 0.3 }} style={{ display: "flex", gap: "1.6cqw", position: "absolute", inset: 0 }}>
              <GhostButton>Review</GhostButton>
              <PrimaryButton>Send 4 reminders</PrimaryButton>
            </motion.div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: at("approve") ? 1 : 0 }}
              transition={{ duration: 0.35 }}
              style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", gap: 7, fontSize: "clamp(9.5px, 2.2cqw, 11.5px)", fontWeight: 700, color: at("done") ? "#167A43" : "#1F2430" }}
            >
              {at("done") ? <><Tick size={16} /> 4 reminders sent · $18,400 followed up</> : <><PersonAvatar src={`${CHAR}/dana.webp`} size={20} /> Approved by Dana</>}
            </motion.span>
            <Pointer show={at("ready") && !at("approve")} from={[160, 30]} to={[116, 8]} reduce={reduce} />
          </div>
        </div>
      </Beat>
    </Stage>
  );
}
