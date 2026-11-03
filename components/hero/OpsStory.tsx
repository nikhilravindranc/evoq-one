"use client";

import { motion } from "framer-motion";
import { ProductBadge } from "@/components/shared/ProductBadge";
import { AgentTile, Beat, CHAR, Cursor, GhostButton, PersonAvatar, Pointer, PrimaryButton, Stage, Tick, card, ease, label, typed, useStoryClock } from "./story/kit";

/* Operations: a vertical thread. Mia asks, EVI gathers context from the applications,
   Kai (Dispatch agent) prepares the job, and nothing happens until Mia approves. */

const REQUEST = "Why is ticket #4821 still open? Get the AC repair scheduled.";
const AT = { send: 2.1, desk: 2.9, ops: 3.6, hand: 4.5, prepared: 5.5, approve: 6.9, done: 7.6 };

/* Vertical thread joining two beats: it draws in, then a dot keeps travelling down it. */
function Thread({ on }: { on: boolean }) {
  return (
    <div style={{ position: "relative", height: "3.2cqw", minHeight: 12, marginLeft: "12cqw", width: 0 }} aria-hidden>
      <motion.span
        initial={{ scaleY: 0 }}
        animate={{ scaleY: on ? 1 : 0 }}
        transition={{ duration: 0.4, ease }}
        style={{ position: "absolute", left: -1, top: 0, bottom: 0, width: 2, transformOrigin: "top", background: "linear-gradient(180deg, rgba(255,255,255,0.9), #9C8CFF)", borderRadius: 2, boxShadow: "0 0 6px rgba(156,140,255,0.6)" }}
      />
      {on && (
        <motion.span
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: [0, 18], opacity: [0, 1, 0] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "easeIn" }}
          style={{ position: "absolute", left: -3, top: 0, width: 6, height: 6, borderRadius: "50%", background: "#fff", boxShadow: "0 0 8px 2px rgba(156,140,255,0.8)" }}
        />
      )}
    </div>
  );
}

export function OpsStory() {
  const { t, reduce, at: atT } = useStoryClock(AT.done);
  const at = (k: keyof typeof AT) => atT(AT[k]);
  const gathering = at("send") && !at("hand");
  const eviPose = at("done") ? 2 : at("send") ? 1 : 0;

  return (
    <Stage>
      {/* 1. Ask */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease }} style={{ display: "flex", alignItems: "center", gap: "3cqw" }}>
        <div style={{ width: "24cqw", display: "flex", justifyContent: "center" }}>
          <PersonAvatar src={`${CHAR}/mia.webp`} size="15cqw" />
        </div>
        <div style={{ ...card, flex: 1, padding: "2.2cqw 2.6cqw" }}>
          <div style={{ ...label, color: "rgba(31,36,48,0.55)" }}>Mia · Support Lead</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "2cqw", marginTop: 3 }}>
            <p style={{ margin: 0, flex: 1, minHeight: "2.7em", fontSize: "clamp(11px, 2.7cqw, 14px)", lineHeight: 1.35, fontWeight: 600, color: "#1F2430" }}>
              {typed(REQUEST, t)}
              {!at("send") && <Cursor />}
            </p>
            <motion.span
              animate={{ scale: at("send") ? [1, 1.25, 1] : 1, background: at("send") ? "#4747E0" : "#C9CBE6" }}
              transition={{ duration: 0.35 }}
              style={{ flexShrink: 0, width: "6cqw", minWidth: 24, aspectRatio: "1 / 1", borderRadius: "50%", display: "grid", placeItems: "center" }}
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </motion.span>
          </div>
        </div>
      </motion.div>

      <Thread on={at("send")} />

      {/* 2. Gather */}
      <div style={{ display: "flex", alignItems: "center", gap: "3cqw" }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, delay: 0.15, ease }} style={{ width: "24cqw", display: "flex", justifyContent: "center" }}>
          <AgentTile srcs={[`${CHAR}/evi.webp`, `${CHAR}/evi-working.webp`, `${CHAR}/evi-done.webp`]} pose={eviPose} size="22cqw" glow={gathering} />
        </motion.div>
        <div style={{ ...card, flex: 1, padding: "2.2cqw 2.6cqw" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", ...label, color: "#3A3AC9" }}>
            EVI · AI assistant
            <span style={{ fontWeight: 600, color: "rgba(31,36,48,0.55)", display: "inline-flex", alignItems: "center", gap: 5 }}>
              {gathering && <i style={{ width: 6, height: 6, borderRadius: "50%", background: "#4747E0", animation: "wcPulse 1.1s ease-in-out infinite" }} />}
              {at("done") ? "Done" : at("hand") ? "Passed to Kai" : at("send") ? "Checking Desk and ServiceOps" : "Listening"}
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2cqw", marginTop: "1.6cqw", minHeight: "calc(2 * 1.3em + 1.2cqw)" }}>
            {([
              ["desk", "Desk", "Ticket #4821 · AC failure, open 2 days", "desk"],
              ["serviceops", "ServiceOps", "Raj, field technician, free at 14:00", "ops"],
            ] as const).map(([key, name, text, beat]) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: at(beat) ? 1 : 0, x: at(beat) ? 0 : -8 }}
                transition={{ duration: 0.4, ease }}
                style={{ display: "flex", alignItems: "center", gap: "2cqw", fontSize: "clamp(9.5px, 2.3cqw, 12px)", color: "#1F2430" }}
              >
                <ProductBadge productKey={key} size={18} />
                <span style={{ lineHeight: 1.3 }}><b>{name}</b> <span style={{ color: "rgba(31,36,48,0.62)" }}>{text}</span></span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Thread on={at("hand")} />

      {/* 3. Prepare, then wait for approval */}
      <Beat on={at("hand")} style={{ display: "flex", alignItems: "center", gap: "3cqw" }}>
        <div style={{ width: "24cqw", display: "flex", justifyContent: "center" }}>
          <AgentTile srcs={[`${CHAR}/kai.webp`]} size="19cqw" />
        </div>
        <div style={{ ...card, flex: 1, padding: "2.2cqw 2.6cqw" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
            <span style={{ ...label, color: "#3A3AC9" }}>Kai · Dispatch agent</span>
            <span
              style={{
                fontSize: "clamp(8.5px, 1.9cqw, 10px)", fontWeight: 700, padding: "2px 7px", borderRadius: 999, whiteSpace: "nowrap",
                color: at("approve") ? "#167A43" : at("prepared") ? "#B45309" : "#4747E0",
                background: at("approve") ? "rgba(34,160,90,0.14)" : at("prepared") ? "rgba(245,158,11,0.16)" : "rgba(71,71,224,0.12)",
              }}
            >
              {at("approve") ? "Approved" : at("prepared") ? "Awaiting approval" : "Preparing"}
            </span>
          </div>
          <p style={{ margin: "1.4cqw 0 0", minHeight: "2.6em", fontSize: "clamp(10px, 2.4cqw, 12.5px)", lineHeight: 1.35, color: "#1F2430" }}>
            {at("prepared") ? "Book Raj for 14:00 today and notify the customer." : "Drafting the job from the ticket…"}
          </p>
          <div style={{ position: "relative", marginTop: "1.8cqw", height: "clamp(22px, 5.6cqw, 28px)" }}>
            <motion.div animate={{ opacity: at("prepared") && !at("approve") ? 1 : 0 }} transition={{ duration: 0.3 }} style={{ display: "flex", gap: "1.6cqw", position: "absolute", inset: 0 }}>
              <GhostButton>Edit</GhostButton>
              <PrimaryButton>Approve</PrimaryButton>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: at("approve") ? 1 : 0, scale: at("approve") ? 1 : 0.9 }}
              transition={{ duration: 0.35, ease: [0.34, 1.5, 0.64, 1] }}
              style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", gap: 7, fontSize: "clamp(9.5px, 2.2cqw, 11.5px)", fontWeight: 700, color: "#167A43" }}
            >
              <PersonAvatar src={`${CHAR}/mia.webp`} size={20} />
              Approved by Mia
            </motion.div>
            <Pointer show={at("prepared") && !at("approve")} from={[96, 34]} to={[56, 8]} reduce={reduce} />
          </div>
        </div>
      </Beat>

      {/* 4. Done */}
      <Beat on={at("done")} style={{ ...card, marginTop: "2.6cqw", marginLeft: "27cqw", padding: "1.8cqw 2.6cqw", display: "flex", alignItems: "center", gap: "2cqw" }}>
        <Tick size={20} />
        <span style={{ flex: 1, fontSize: "clamp(10px, 2.5cqw, 13px)", fontWeight: 700, color: "#1F2430", lineHeight: 1.25 }}>
          Job #482 booked <span style={{ fontWeight: 500, color: "rgba(31,36,48,0.6)" }}>· customer notified</span>
        </span>
        <span style={{ display: "inline-flex", gap: 4 }} aria-hidden>
          <ProductBadge productKey="desk" size={18} />
          <ProductBadge productKey="serviceops" size={18} />
        </span>
      </Beat>
    </Stage>
  );
}
