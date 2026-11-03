"use client";

import { motion } from "framer-motion";
import { ProductBadge } from "@/components/shared/ProductBadge";
import { AgentTile, Beat, CHAR, Cursor, PersonAvatar, Stage, card, ease, label, typed, useStoryClock } from "./story/kit";

/* AI: EVI leads. There is no approval step here, because this beat is about answering:
   Marcus asks a question that spans three applications and EVI answers with where each
   piece came from, then offers the next step, including handing it to an agent. */

const ASK = "What changed on the Northgate account this week?";
const AT = { send: 2.3, think: 2.5, a: 3.2, b: 3.9, c: 4.6, ctx: 5.3, chips: 5.9, done: 6.5 };

const FACTS = [
  { app: "crm", name: "CRM", text: "Deal moved to Negotiation · $48K", at: AT.a },
  { app: "desk", name: "Desk", text: "1 ticket resolved, 1 still open", at: AT.b },
  { app: "billing", name: "Billing", text: "Invoice INV-2492 paid in full", at: AT.c },
];

export function AiStory() {
  const { t, at: atT } = useStoryClock(AT.done);
  const at = (k: keyof typeof AT) => atT(AT[k]);
  const pose = at("ctx") ? 2 : at("send") ? 1 : 0;
  const thinking = at("think") && !at("ctx");

  return (
    <Stage>
      <div style={{ display: "grid", gridTemplateColumns: "30cqw 1fr", gap: "3cqw", alignItems: "start" }}>
        {/* EVI leads */}
        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2cqw", paddingTop: "10cqw" }}>
          <AgentTile srcs={[`${CHAR}/evi.webp`, `${CHAR}/evi-working.webp`, `${CHAR}/evi-done.webp`]} pose={pose} size="30cqw" glow={thinking} />
          <span style={{ ...label, color: "#fff", textShadow: "0 1px 8px rgba(20,16,80,0.4)", textAlign: "center", lineHeight: 1.2 }}>
            EVI
            <span style={{ display: "block", fontWeight: 600, opacity: 0.8, fontSize: "clamp(8.5px, 1.9cqw, 10px)" }}>AI assistant</span>
          </span>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2.6cqw", minWidth: 0 }}>
          {/* The question */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease }} style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-end", gap: "2cqw" }}>
            <div style={{ ...card, borderRadius: "18px 18px 4px 18px", padding: "2cqw 2.6cqw", flex: 1 }}>
              <div style={{ ...label, color: "rgba(31,36,48,0.55)", fontSize: "clamp(8.5px, 1.9cqw, 10px)" }}>Marcus · Sales Lead</div>
              <p style={{ margin: "2px 0 0", minHeight: "2.7em", fontSize: "clamp(10.5px, 2.5cqw, 13px)", lineHeight: 1.35, fontWeight: 600, color: "#1F2430" }}>
                {typed(ASK, t, 0.4, 30)}
                {!at("send") && <Cursor />}
              </p>
            </div>
            <PersonAvatar src={`${CHAR}/marcus.webp`} size="11cqw" />
          </motion.div>

          {/* The answer, with where each piece came from */}
          <Beat on={at("think")} style={{ ...card, padding: "2.4cqw 2.6cqw" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", ...label, color: "#3A3AC9" }}>
              EVI
              <span style={{ fontWeight: 600, color: "rgba(31,36,48,0.55)", display: "inline-flex", alignItems: "center", gap: 5 }}>
                {thinking && <i style={{ width: 6, height: 6, borderRadius: "50%", background: "#4747E0", animation: "wcPulse 1.1s ease-in-out infinite" }} />}
                {at("ctx") ? "Here is what I found" : "Reading CRM, Desk and Billing"}
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.6cqw", marginTop: "2cqw", minHeight: "calc(3 * 20px + 3.2cqw)" }}>
              {FACTS.map((f) => (
                <motion.div
                  key={f.app}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: t >= f.at ? 1 : 0, x: t >= f.at ? 0 : -8 }}
                  transition={{ duration: 0.4, ease }}
                  style={{ display: "flex", alignItems: "center", gap: "2cqw" }}
                >
                  <ProductBadge productKey={f.app} size={20} />
                  <span style={{ fontSize: "clamp(9.5px, 2.3cqw, 12px)", lineHeight: 1.3, color: "#1F2430" }}><b>{f.name}</b> <span style={{ color: "rgba(31,36,48,0.65)" }}>{f.text}</span></span>
                </motion.div>
              ))}
            </div>
            <Beat on={at("ctx")} from={6} style={{ marginTop: "1.8cqw", paddingTop: "1.8cqw", borderTop: "1px solid rgba(16,20,50,0.07)", display: "flex", alignItems: "center", gap: "1.6cqw", fontSize: "clamp(8.5px, 1.9cqw, 10px)", color: "rgba(31,36,48,0.55)", fontWeight: 600 }}>
              Context from
              <span style={{ display: "inline-flex", gap: 3 }} aria-hidden>
                <ProductBadge productKey="crm" size={14} />
                <ProductBadge productKey="desk" size={14} />
                <ProductBadge productKey="billing" size={14} />
              </span>
              three applications
            </Beat>
          </Beat>

          {/* What to do next, including handing it to an agent */}
          <Beat on={at("chips")} style={{ display: "flex", flexWrap: "wrap", gap: "1.8cqw" }}>
            <span style={{ padding: "0 3cqw", height: "clamp(24px, 6cqw, 30px)", display: "inline-flex", alignItems: "center", borderRadius: 999, background: "#fff", boxShadow: "0 8px 18px -10px rgba(16,20,50,0.5), 0 0 0 1px rgba(71,71,224,0.2)", fontSize: "clamp(9.5px, 2.2cqw, 11.5px)", fontWeight: 600, color: "#3A3AC9", whiteSpace: "nowrap" }}>
              Draft a check-in
            </span>
            <span style={{ padding: "0 3cqw 0 1.2cqw", height: "clamp(24px, 6cqw, 30px)", display: "inline-flex", alignItems: "center", gap: "1.6cqw", borderRadius: 999, background: "#fff", boxShadow: "0 8px 18px -10px rgba(16,20,50,0.5), 0 0 0 1px rgba(71,71,224,0.2)", fontSize: "clamp(9.5px, 2.2cqw, 11.5px)", fontWeight: 600, color: "#3A3AC9", whiteSpace: "nowrap" }}>
              <PersonAvatar src={`${CHAR}/ava.webp`} size="clamp(18px, 4.6cqw, 22px)" style={{ borderRadius: "30%", boxShadow: "0 0 0 1.5px #8F7BFF" }} />
              Hand to Ava
            </span>
          </Beat>
        </div>
      </div>
    </Stage>
  );
}
