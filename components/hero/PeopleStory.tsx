"use client";

import { motion } from "framer-motion";
import { ProductBadge } from "@/components/shared/ProductBadge";
import { AgentTile, Beat, CHAR, Cursor, GhostButton, PersonAvatar, Pointer, PrimaryButton, Stage, Tick, card, ease, label, typed, useStoryClock } from "./story/kit";

/* People: a week plan. Sam asks EVI to set up a new hire's first week; EVI passes it to
   Sana (Onboarding agent), who fills Monday to Friday across HRMS, Skillberry and Projects.
   Nothing is published to the new hire until Sam approves. */

const REQUEST = "Set up Priya's first week.";
const AT = { send: 2.0, plan: 2.5, first: 2.9, step: 0.45, ready: 5.6, approve: 6.9, done: 8.1 };

const DAYS = [
  { d: "Mon", app: "hrms", t: "Laptop and access" },
  { d: "Tue", app: "skillberry", t: "Policy training" },
  { d: "Wed", app: "projects", t: "Meet the team" },
  { d: "Thu", app: "skillberry", t: "Role training" },
  { d: "Fri", app: "projects", t: "First check-in" },
];

export function PeopleStory() {
  const { t, reduce, at: atT } = useStoryClock(AT.done);
  const at = (k: "send" | "plan" | "ready" | "approve" | "done") => atT(AT[k]);
  const filled = (i: number) => t >= AT.first + i * AT.step;
  const ticked = (i: number) => t >= AT.approve + 0.15 + i * 0.22;
  const building = at("plan") && !at("ready");

  return (
    <Stage>
      {/* Ask: a speech bubble, so this tab does not open like the others */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease }} style={{ display: "flex", alignItems: "flex-end", gap: "2.4cqw" }}>
        <PersonAvatar src={`${CHAR}/sam.webp`} size="13cqw" />
        <div style={{ ...card, borderRadius: "18px 18px 18px 4px", padding: "2.4cqw 3cqw", display: "flex", alignItems: "center", gap: "2.4cqw" }}>
          <div>
            <div style={{ ...label, color: "rgba(31,36,48,0.55)" }}>Sam · People Ops</div>
            <p style={{ margin: "3px 0 0", minHeight: "1.4em", minWidth: "34cqw", fontSize: "clamp(11px, 2.7cqw, 14px)", lineHeight: 1.35, fontWeight: 600, color: "#1F2430" }}>
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

      {/* The week */}
      <Beat on={at("plan")} style={{ ...card, marginTop: "3cqw", padding: "2.6cqw" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "2cqw", marginBottom: "2.2cqw" }}>
          <ProductBadge productKey="hrms" size={22} />
          <span style={{ ...label, color: "#1F2430", fontSize: "clamp(10px, 2.4cqw, 12.5px)" }}>Priya&apos;s first week</span>
          <span style={{ marginLeft: "auto", fontSize: "clamp(8.5px, 1.9cqw, 10px)", fontWeight: 700, padding: "2px 7px", borderRadius: 999, whiteSpace: "nowrap", color: at("done") ? "#167A43" : at("ready") ? "#B45309" : "#4747E0", background: at("done") ? "rgba(34,160,90,0.14)" : at("ready") ? "rgba(245,158,11,0.16)" : "rgba(71,71,224,0.12)" }}>
            {at("done") ? "Published" : at("ready") ? "Draft plan" : "Building"}
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1.6cqw" }}>
          {DAYS.map((day, i) => (
            <div key={day.d} style={{ borderRadius: 12, background: "rgba(71,71,224,0.05)", padding: "1.6cqw 1.4cqw", minHeight: "22cqw", display: "flex", flexDirection: "column", gap: "1.4cqw", boxSizing: "border-box" }}>
              <span style={{ fontSize: "clamp(8.5px, 1.9cqw, 10px)", fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase", color: "rgba(31,36,48,0.5)" }}>{day.d}</span>
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.94 }}
                animate={{ opacity: filled(i) ? 1 : 0, y: filled(i) ? 0 : 8, scale: filled(i) ? 1 : 0.94 }}
                transition={{ duration: 0.45, ease }}
                style={{ background: "#fff", borderRadius: 10, padding: "1.4cqw", boxShadow: "0 6px 14px -8px rgba(16,20,50,0.5), 0 0 0 1px rgba(16,20,50,0.06)", display: "flex", flexDirection: "column", gap: "1cqw", flex: 1, position: "relative" }}
              >
                <ProductBadge productKey={day.app} size={16} />
                <span style={{ fontSize: "clamp(8.5px, 2cqw, 10.5px)", fontWeight: 600, lineHeight: 1.2, color: "#1F2430" }}>{day.t}</span>
                <motion.span initial={{ scale: 0 }} animate={{ scale: ticked(i) ? 1 : 0 }} transition={{ duration: 0.3, ease: [0.34, 1.6, 0.64, 1] }} style={{ position: "absolute", right: 5, bottom: 5, display: "block" }}>
                  <Tick size={13} />
                </motion.span>
              </motion.div>
            </div>
          ))}
        </div>
      </Beat>

      {/* The agent */}
      <Beat on={at("plan")} style={{ marginTop: "2.4cqw", display: "flex", alignItems: "center", gap: "2.6cqw", ...card, padding: "2.2cqw 2.6cqw" }}>
        <AgentTile srcs={[`${CHAR}/sana.webp`]} size="14cqw" glow={building} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6, flexWrap: "wrap" }}>
            <span style={{ ...label, color: "#3A3AC9" }}>Sana · Onboarding agent</span>
            <span style={{ fontSize: "clamp(8.5px, 1.9cqw, 10px)", color: "rgba(31,36,48,0.55)" }}>passed on by EVI</span>
          </div>
          <div style={{ position: "relative", marginTop: "1.4cqw", height: "clamp(22px, 5.6cqw, 28px)" }}>
            <motion.span animate={{ opacity: building ? 1 : 0 }} transition={{ duration: 0.3 }} style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", fontSize: "clamp(9.5px, 2.2cqw, 11.5px)", color: "rgba(31,36,48,0.7)" }}>
              Adding items across HRMS, Skillberry and Projects…
            </motion.span>
            <motion.div animate={{ opacity: at("ready") && !at("approve") ? 1 : 0 }} transition={{ duration: 0.3 }} style={{ display: "flex", gap: "1.6cqw", position: "absolute", inset: 0 }}>
              <GhostButton>Edit</GhostButton>
              <PrimaryButton>Publish plan</PrimaryButton>
            </motion.div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: at("approve") ? 1 : 0 }}
              transition={{ duration: 0.35 }}
              style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", gap: 7, fontSize: "clamp(9.5px, 2.2cqw, 11.5px)", fontWeight: 700, color: at("done") ? "#167A43" : "#1F2430" }}
            >
              {at("done") ? <><Tick size={16} /> Published · Priya notified for Monday</> : <><PersonAvatar src={`${CHAR}/sam.webp`} size={20} /> Approved by Sam</>}
            </motion.span>
            <Pointer show={at("ready") && !at("approve")} from={[150, 30]} to={[96, 8]} reduce={reduce} />
          </div>
        </div>
      </Beat>
    </Stage>
  );
}
