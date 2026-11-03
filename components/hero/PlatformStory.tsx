"use client";

import { motion } from "framer-motion";
import { ProductBadge } from "@/components/shared/ProductBadge";
import { AgentTile, Beat, CHAR, Cursor, GhostButton, PersonAvatar, Pointer, PrimaryButton, Stage, Tick, card, ease, label, typed, useStoryClock } from "./story/kit";

/* Platform: a connection map. Sync raises an alert that 12 orders did not reach Inventory;
   Mia asks why. The red link shows where it broke, Leo (Sync agent) finds the cause and
   proposes a fix, and after Mia approves the link turns green. One record still needs a
   person, which is said plainly. */

const ASK = "Why did these fail?";
const AT = { alert: 0.3, ask: 1.0, send: 2.5, map: 2.9, fail: 3.4, hand: 4.2, cause: 5.1, ready: 5.8, approve: 7.0, healed: 7.7, done: 8.5 };

type Node = { key: string; name: string; x: number; y: number; badge?: string };
const NODES: Node[] = [
  { key: "crm", name: "CRM", x: 14, y: 22, badge: "crm" },
  { key: "billing", name: "Billing", x: 86, y: 22, badge: "billing" },
  { key: "inventory", name: "Inventory", x: 86, y: 78, badge: "inventory" },
  { key: "store", name: "Online store", x: 14, y: 78 },
];

const Store = () => (
  <span style={{ width: 28, height: 28, borderRadius: 8, background: "#6D4FEB", display: "grid", placeItems: "center" }}>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h2l2.4 11h10.2L20 7H6.2" /><circle cx="9" cy="19" r="1.4" /><circle cx="17" cy="19" r="1.4" /></svg>
  </span>
);

export function PlatformStory() {
  const { t, reduce, at: atT } = useStoryClock(AT.done);
  const at = (k: keyof typeof AT) => atT(AT[k]);
  const broken = at("fail") && !at("healed");
  const inventoryLine = at("healed") ? "#22C55E" : at("fail") ? "#EF4444" : "#CFC9FF";

  return (
    <Stage>
      {/* The alert, then the question */}
      <Beat on={at("alert")} from={8} style={{ ...card, display: "flex", alignItems: "center", gap: "2.4cqw", padding: "2cqw 2.6cqw", borderLeft: "4px solid #EF4444" }}>
        <ProductBadge productKey="sync" size={22} />
        <span style={{ flex: 1, minWidth: 0, fontSize: "clamp(10px, 2.4cqw, 12.5px)", fontWeight: 700, color: "#1F2430" }}>12 orders did not reach Inventory</span>
        <span style={{ fontSize: "clamp(8.5px, 1.9cqw, 10px)", fontWeight: 700, padding: "2px 7px", borderRadius: 999, color: "#B91C1C", background: "rgba(239,68,68,0.1)", whiteSpace: "nowrap" }}>Sync alert</span>
      </Beat>
      <Beat on style={{ marginTop: "2.4cqw", display: "flex", alignItems: "center", gap: "2.4cqw", justifyContent: "flex-end" }}>
        <div style={{ ...card, borderRadius: "18px 18px 4px 18px", padding: "1.8cqw 2.6cqw", display: "flex", alignItems: "center", gap: "2cqw", opacity: at("ask") ? 1 : 0, transition: "opacity .3s" }}>
          <div>
            <div style={{ ...label, color: "rgba(31,36,48,0.55)", fontSize: "clamp(8.5px, 1.9cqw, 10px)" }}>Mia · Platform admin</div>
            <p style={{ margin: "2px 0 0", minHeight: "1.4em", minWidth: "26cqw", fontSize: "clamp(11px, 2.7cqw, 14px)", fontWeight: 600, color: "#1F2430" }}>
              {typed(ASK, t, AT.ask)}
              {!at("send") && at("ask") && <Cursor />}
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
        <PersonAvatar src={`${CHAR}/mia.webp`} size="12cqw" style={{ opacity: at("ask") ? 1 : 0, transition: "opacity .3s" }} />
      </Beat>

      {/* The map */}
      <Beat on={at("map")} style={{ ...card, marginTop: "2.8cqw", padding: 0, overflow: "hidden" }}>
        <div style={{ position: "relative", width: "100%", aspectRatio: "2 / 1" }}>
          <svg viewBox="0 0 100 50" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} aria-hidden>
            {NODES.map((n) => (
              <motion.line
                key={n.key}
                x1={50} y1={25} x2={(n.x / 100) * 100} y2={(n.y / 100) * 50}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, stroke: n.key === "inventory" ? inventoryLine : "#CFC9FF" }}
                transition={{ opacity: { duration: 0.7, ease }, stroke: { duration: 0.6 } }}
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeDasharray={n.key === "inventory" && broken ? "2.2 2.2" : undefined}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>
          {/* Sync, the hub */}
          <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", display: "grid", placeItems: "center", width: "15cqw", aspectRatio: "1 / 1", borderRadius: "50%", background: "#fff", boxShadow: "0 0 0 1px rgba(71,71,224,0.2), 0 10px 24px -10px rgba(16,20,80,0.5)" }}>
            <ProductBadge productKey="sync" size={30} />
          </div>
          {NODES.map((n) => (
            <div key={n.key} style={{ position: "absolute", left: `${n.x}%`, top: `${n.y}%`, transform: "translate(-50%,-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <span style={{ display: "grid", placeItems: "center", width: "11cqw", aspectRatio: "1 / 1", borderRadius: "50%", background: "#fff", boxShadow: n.key === "inventory" && broken ? "0 0 0 2px #EF4444, 0 0 18px 2px rgba(239,68,68,0.35)" : "0 0 0 1px rgba(16,20,50,0.1), 0 8px 18px -10px rgba(16,20,80,0.5)", transition: "box-shadow .4s" }}>
                {n.badge ? <ProductBadge productKey={n.badge} size={24} /> : <Store />}
              </span>
              <span style={{ fontSize: "clamp(8px, 1.8cqw, 9.5px)", fontWeight: 700, color: "rgba(31,36,48,0.6)" }}>{n.name}</span>
            </div>
          ))}
          {/* Link state, on the Sync to Inventory link */}
          <motion.span
            animate={{ opacity: at("fail") ? 1 : 0, scale: at("fail") ? 1 : 0.9 }}
            transition={{ duration: 0.35 }}
            style={{ position: "absolute", left: "68%", top: "50%", transform: "translate(-50%,-50%)", fontSize: "clamp(8.5px, 1.9cqw, 10px)", fontWeight: 800, padding: "2px 8px", borderRadius: 999, whiteSpace: "nowrap", color: at("healed") ? "#167A43" : "#B91C1C", background: at("healed") ? "rgba(34,160,90,0.16)" : "rgba(239,68,68,0.14)" }}
          >
            {at("healed") ? "11 synced" : "12 failed"}
          </motion.span>
          <motion.span
            animate={{ opacity: at("done") ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            style={{ position: "absolute", left: "67%", top: "82%", transform: "translate(-50%,-50%)", fontSize: "clamp(8px, 1.8cqw, 9.5px)", fontWeight: 700, padding: "1px 7px", borderRadius: 999, whiteSpace: "nowrap", color: "#B45309", background: "rgba(245,158,11,0.18)" }}
          >
            1 needs review
          </motion.span>
        </div>
      </Beat>

      {/* The agent */}
      <Beat on={at("hand")} style={{ ...card, marginTop: "2.4cqw", padding: "2.2cqw 2.6cqw", display: "flex", alignItems: "center", gap: "2.6cqw" }}>
        <AgentTile srcs={[`${CHAR}/leo.webp`]} size="14cqw" glow={at("hand") && !at("ready")} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <span style={{ ...label, color: "#3A3AC9" }}>Leo · Sync agent</span>
          <p style={{ margin: "1.2cqw 0 0", minHeight: "2.6em", fontSize: "clamp(9.5px, 2.2cqw, 11.5px)", lineHeight: 1.35, color: "#1F2430" }}>
            {at("approve") ? (at("done") ? "Retried 12 records. 1 has no stock location and needs a person." : "Retrying the 12 records…") : at("cause") ? "Cause: no stock location on 12 orders. Map them to the main warehouse and retry." : "Checking the failed records…"}
          </p>
          <div style={{ position: "relative", marginTop: "1.2cqw", height: "clamp(22px, 5.6cqw, 28px)" }}>
            <motion.div animate={{ opacity: at("ready") && !at("approve") ? 1 : 0 }} transition={{ duration: 0.3 }} style={{ display: "flex", gap: "1.6cqw", position: "absolute", inset: 0 }}>
              <GhostButton>Review</GhostButton>
              <PrimaryButton>Approve retry</PrimaryButton>
            </motion.div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: at("approve") ? 1 : 0 }}
              transition={{ duration: 0.35 }}
              style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", gap: 7, fontSize: "clamp(9.5px, 2.2cqw, 11.5px)", fontWeight: 700, color: at("done") ? "#167A43" : "#1F2430" }}
            >
              {at("done") ? <><Tick size={16} /> 11 of 12 synced</> : <><PersonAvatar src={`${CHAR}/mia.webp`} size={20} /> Approved by Mia</>}
            </motion.span>
            <Pointer show={at("ready") && !at("approve")} from={[160, 30]} to={[96, 8]} reduce={reduce} />
          </div>
        </div>
      </Beat>
    </Stage>
  );
}
