"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { GetStartedModal } from "@/components/shared/GetStartedModal";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});
const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.97 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
});

/* shared card shell — white with border, works on light bg */
const cardShell: React.CSSProperties = {
  background: "#ffffff",
  borderRadius: 16,
  border: "1px solid rgba(189,189,255,0.45)",
  boxShadow: "0 4px 20px -6px rgba(71,71,224,0.12), 0 1px 4px rgba(31,36,48,0.06)",
};

/* animate-in helper using animate (not whileInView) so hero fires immediately */
const floatIn = (delay = 0, x = 0, y = 0) => ({
  initial: { opacity: 0, x, y },
  animate: { opacity: 1, x: 0, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

/* ─────────────────────────────────────────────────────────────
   SECTION 2 VISUAL — Numbered column cards (reference style)
   Large blue number · title · whitespace · description
   Columns separated by vertical dividers, top border rule
   ───────────────────────────────────────────────────────────── */
const STEPS_DATA = [
  {
    num: "01.",
    title: "Start where it matters most",
    desc: "Adopt the products that address current priorities.",
  },
  {
    num: "02.",
    title: "Expand as requirements change",
    desc: "Introduce new teams, workflows, and capabilities over time.",
  },
  {
    num: "03.",
    title: "Maintain alignment throughout",
    desc: "Keep information, processes, and teams connected as the organization evolves.",
  },
];

function StepFlow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ marginTop: 56, borderTop: "1px solid var(--border)" }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
        {STEPS_DATA.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              padding: "44px 40px 44px",
              borderRight: i < 2 ? "1px solid var(--border)" : "none",
              display: "flex",
              flexDirection: "column",
              minHeight: 300,
            }}
          >
            {/* Large blue number */}
            <div style={{
              fontFamily: "var(--font-display)",
              fontSize: 56,
              fontWeight: 800,
              color: "var(--interactive)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              marginBottom: 20,
            }}>
              {step.num}
            </div>

            {/* Title */}
            <div style={{
              fontFamily: "var(--font-display)",
              fontSize: 22,
              fontWeight: 700,
              color: "var(--charcoal)",
              lineHeight: 1.3,
              letterSpacing: "-0.02em",
            }}>
              {step.title}
            </div>

            {/* Spacer pushes description to bottom */}
            <div style={{ flex: 1 }} />

            {/* Description */}
            <div style={{
              fontFamily: "var(--font-sans)",
              fontSize: 15,
              lineHeight: 1.7,
              color: "var(--body-text)",
            }}>
              {step.desc}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Card icons ── */
const ICONS = {
  data:     <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="5" rx="9" ry="3" stroke="var(--interactive)" strokeWidth="1.75"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" stroke="var(--interactive)" strokeWidth="1.75"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" stroke="var(--interactive)" strokeWidth="1.75"/></svg>,
  workflow: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="2" stroke="var(--interactive)" strokeWidth="1.75"/><rect x="14" y="3" width="7" height="7" rx="2" stroke="var(--interactive)" strokeWidth="1.75"/><rect x="14" y="14" width="7" height="7" rx="2" stroke="var(--interactive)" strokeWidth="1.75"/><rect x="3" y="14" width="7" height="7" rx="2" stroke="var(--interactive)" strokeWidth="1.75"/><path d="M10 6.5h4M17.5 10v4M10 17.5h4M6.5 10v4" stroke="var(--interactive)" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  eye:      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M2 12S5 5 12 5s10 7 10 7-3 7-10 7S2 12 2 12z" stroke="var(--interactive)" strokeWidth="1.75"/><circle cx="12" cy="12" r="3" stroke="var(--interactive)" strokeWidth="1.75"/></svg>,
  scale:    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="var(--interactive)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>,
};
const CARDS = [
  { icon: ICONS.data,     title: "Shared business context",      body: "Teams work from the same operational information rather than maintaining separate versions of the truth." },
  { icon: ICONS.workflow, title: "Flexible ways of working",     body: "Departments can follow processes that fit their responsibilities while remaining aligned with broader organizational goals." },
  { icon: ICONS.eye,      title: "Clear operational visibility", body: "Leaders gain insight into performance, progress, and priorities without relying on manual consolidation." },
  { icon: ICONS.scale,    title: "Room to scale",                body: "Organizations can introduce new teams, workflows, and responsibilities without disrupting existing operations." },
];

const ROLES = [
  { title: "Leadership",                  desc: "Visibility across sales, service, operations, and support without manual reporting.",                                           photo: "https://randomuser.me/api/portraits/men/32.jpg",   accent: "var(--deep)" },
  { title: "Sales & Customer Teams",      desc: "Manage relationships, service requests, and customer interactions from connected data.",                                       photo: "https://randomuser.me/api/portraits/women/44.jpg", accent: "var(--interactive)" },
  { title: "Operations & Delivery Teams", desc: "Coordinate projects, workflows, field service, and day-to-day execution from a shared system.",                               photo: "https://randomuser.me/api/portraits/men/76.jpg",   accent: "var(--primary)" },
  { title: "Managers",                    desc: "Keep teams aligned with real-time information and cross-functional visibility.",                                               photo: "https://randomuser.me/api/portraits/women/55.jpg", accent: "var(--mid)" },
];

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export function WhyEvoqPage() {
  const [showGetStarted, setShowGetStarted] = useState(false);

  return (
    <div className="why-evoq-page">

      {/* ── Section 1: Hero ── */}
      <section className="s-why-hero">
        {/* Grain */}
        {/* Subtle dot grid texture */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(71,71,224,0.12) 1px, transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none", zIndex: 0, opacity: 0.6 }} />

        {/* ── FLOATING CARDS (6 data cards, no photo tiles) ── */}

        {/* TOP-LEFT inner: EVOQ Suite */}
        <motion.div className="s-why-float" style={{ left: "15%", top: "20%" }} {...floatIn(0.3, -18, 0)}>
          <div style={{ ...cardShell, padding: "14px 18px", minWidth: 160 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 700, color: "#1F2430", marginBottom: 12 }}>EVOQ Suite</div>
            {[
              { label: "CRM",        dot: "#1D4ED8" },
              { label: "ServiceOps", dot: "#059669" },
              { label: "Projects",   dot: "#7C3AED" },
              { label: "Sync",       dot: "#F59E0B" },
            ].map((m, i) => (
              <div key={m.label} style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: i < 3 ? 8 : 0 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: m.dot, flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 500, color: "#1F2430" }}>{m.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* TOP-RIGHT inner: 3× metric */}
        <motion.div className="s-why-float" style={{ right: "17%", top: "20%" }} {...floatIn(0.35, 18, 0)}>
          <div style={{ ...cardShell, padding: "16px 22px", textAlign: "center", minWidth: 130 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 38, fontWeight: 800, color: "#1F2430", lineHeight: 1, letterSpacing: "-0.04em" }}>3×</div>
            <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "#5F6B7A", marginTop: 6, lineHeight: 1.45 }}>Faster cross-team<br />handoffs</div>
          </div>
        </motion.div>

        {/* MID-LEFT inner: Deal Won */}
        <motion.div className="s-why-float" style={{ left: "15%", top: "58%" }} {...floatIn(0.4, -18, 0)}>
          <div style={{ ...cardShell, padding: "12px 14px", width: 185 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 8 }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, overflow: "hidden", flexShrink: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 700, color: "#1F2430" }}>Deal Won · CRM</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "#5F6B7A" }}>Acme Corp</div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 800, color: "#1F2430" }}>$84k</span>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 600, color: "#059669", background: "#DAF6F1", padding: "3px 8px", borderRadius: 6 }}>Closed ✓</span>
            </div>
          </div>
        </motion.div>

        {/* MID-RIGHT inner: Operations Team */}
        <motion.div className="s-why-float" style={{ right: "15%", top: "57%" }} {...floatIn(0.45, 18, 0)}>
          <div style={{ ...cardShell, padding: "14px 18px" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 700, color: "#1F2430", marginBottom: 10 }}>Operations Team</div>
            <div style={{ display: "flex" }}>
              {[
                "https://randomuser.me/api/portraits/women/68.jpg",
                "https://randomuser.me/api/portraits/men/22.jpg",
                "https://randomuser.me/api/portraits/women/55.jpg",
              ].map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={src} alt="" style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", border: "2px solid #fff", marginLeft: i === 0 ? 0 : -10 }} />
              ))}
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#F2F2FF", border: "2px solid #fff", marginLeft: -10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#4747E0" }}>+12</div>
            </div>
          </div>
        </motion.div>

        {/* BOTTOM-LEFT inner: Ticket chip */}
        <motion.div className="s-why-float" style={{ left: "23%", bottom: "14%" }} {...floatIn(0.5, -14, 8)}>
          <div style={{ ...cardShell, padding: "10px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#4747E0", flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 700, color: "#1F2430" }}>Ticket #482 Resolved</div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "#5F6B7A" }}>ServiceOps · 2h response</div>
            </div>
          </div>
        </motion.div>

        {/* BOTTOM-RIGHT inner: Sync Live */}
        <motion.div className="s-why-float" style={{ right: "12%", bottom: "11%" }} {...floatIn(0.55, 14, 8)}>
          <div style={{ ...cardShell, padding: "12px 16px", minWidth: 158 }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 700, color: "#1F2430", marginBottom: 10 }}>Sync · Live</div>
            {[{ label: "CRM", w: "82%" }, { label: "ServiceOps", w: "65%" }, { label: "Projects", w: "91%" }].map(r => (
              <div key={r.label} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "#9BA8B7", width: 56, flexShrink: 0 }}>{r.label}</span>
                <div style={{ flex: 1, height: 5, borderRadius: 3, background: "#EBEBF5" }}>
                  <div style={{ width: r.w, height: "100%", background: "linear-gradient(to right,#4747E0,#8484FF)", borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── CENTERED CONTENT ── */}
        <div className="s-why-hero-center">
          <motion.h1 {...floatIn(0)} className="evoq-h2 why-h1" style={{ marginBottom: 20 }}>
            Business Complexity Shouldn't Create<br /><span className="accent">Operational Complexity</span>
          </motion.h1>
          <motion.p {...floatIn(0.1)} className="evoq-sub" style={{ marginTop: 0, margin: "0 auto 16px" }}>
            Most organizations rely on multiple teams, workflows, and systems to keep work moving. As the business grows, information becomes harder to track, processes become harder to coordinate, and visibility becomes harder to maintain.
          </motion.p>
          <motion.p {...floatIn(0.18)} className="why-body" style={{ margin: "0 auto 36px", maxWidth: "44ch" }}>
            EVOQ helps organizations stay aligned by connecting the work happening across sales, service, operations, support, and every function in between.
          </motion.p>
          <motion.div {...floatIn(0.26)} style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button type="button" onClick={() => setShowGetStarted(true)} style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "13px 28px", borderRadius: 999, border: 0, cursor: "pointer", background: "var(--interactive)", color: "#fff", fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, boxShadow: "0 8px 28px -8px rgba(71,71,224,0.45)", transition: "transform 0.15s, background 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.background = "var(--mid)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "var(--interactive)"; }}>
              Get Started
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── Section 2: Flexible by Structure ── */}
      <section className="s-why-flexible">
        <div className="s-why-flexible-inner">
          <motion.div {...fadeUp(0)}>
            <h2 className="evoq-h2" style={{ marginBottom: 12 }}>Designed to Evolve with <span className="accent">Your Business</span></h2>
            <p className="evoq-sub" style={{ marginTop: 0 }}>
              Business priorities change. Teams expand. New responsibilities emerge. Systems that work today often become barriers tomorrow. EVOQ allows organizations to adopt what they need today and expand over time without disrupting existing workflows. Every application becomes part of a connected operational environment that grows alongside the business.
            </p>
          </motion.div>
          <StepFlow />
        </div>
      </section>

      {/* ── Section 3: What Changes with EVOQ ── */}
      <section className="s-why-changes">
        <div className="s-why-changes-inner">
          <motion.div {...fadeUp(0)} className="evoq-section-head" style={{ textAlign: "center" }}>
            <h2 className="evoq-h2">What Changes with <span className="accent">EVOQ</span></h2>
            <p className="evoq-sub" style={{ margin: "16px auto 0", textAlign: "center" }}>
              Growth creates complexity. Complexity creates gaps between teams. EVOQ reduces those gaps by creating a connected environment where information, workflows, and decision-making remain aligned across the organization.
            </p>
          </motion.div>
          <div className="s-why-cards">
            {CARDS.map((card, i) => (
              <motion.div key={card.title} className="s-why-card" {...fadeUp(0.07 + i * 0.08)}>
                <div className="s-why-card-icon">{card.icon}</div>
                <h4>{card.title}</h4>
                <p>{card.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: EVOQ Stands for All ── */}
      <section className="s-why-stands">
        <div className="s-why-stands-inner">

          {/* ── LEFT: copy + role benefit list ── */}
          <div>
            <motion.h2 {...fadeUp(0)} className="evoq-h2" style={{ marginBottom: 16 }}>
              EVOQ stands <span className="accent">for all.</span>
            </motion.h2>
            <motion.p {...fadeUp(0.08)} className="evoq-sub" style={{ marginTop: 0, marginBottom: 16 }}>
              Successful organizations depend on coordination between leadership, managers, customer-facing teams, operational teams, and specialists across the business.
            </motion.p>
            <motion.p {...fadeUp(0.13)} className="why-body" style={{ marginBottom: 16 }}>
              EVOQ helps each team access the information they need while staying connected to the work happening around them. This creates better collaboration, faster decisions, and fewer operational silos.
            </motion.p>
            <motion.p {...fadeUp(0.18)} className="why-body" style={{ marginBottom: 36 }}>
              The result is an environment where teams can work differently while remaining aligned to the same objectives.
            </motion.p>

            <motion.div {...fadeUp(0.23)} style={{ marginTop: 0 }}>
              <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "13px 26px", borderRadius: 999, background: "var(--interactive)", color: "#fff", fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 600, textDecoration: "none", boxShadow: "0 8px 24px -8px rgba(71,71,224,0.45)", transition: "background 0.15s, transform 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "var(--mid)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "var(--interactive)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                Talk to an Expert
              </Link>
            </motion.div>
          </div>

          {/* ── RIGHT: featured photo + floating person cards + stat ── */}
          <motion.div {...fadeUp(0.1)} style={{ position: "relative", display: "flex", justifyContent: "center" }}>

            {/* Soft brand circle behind the photo */}
            <div style={{ position: "absolute", width: 360, height: 360, borderRadius: "50%", background: "var(--soft)", bottom: 0, left: "50%", transform: "translateX(-50%)", zIndex: 0 }} />

            {/* Featured person photo */}
            <div style={{ position: "relative", zIndex: 1, width: 300, height: 440, borderRadius: 24, overflow: "hidden", boxShadow: "0 24px 60px -16px rgba(31,36,48,0.3)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&crop=top&w=600&h=880&q=85"
                alt="EVOQ team member"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
              />
              {/* Subtle gradient scrim at bottom */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 60%, rgba(31,36,48,0.18) 100%)" }} />
            </div>

            {/* Floating person cards — right side, stacked */}
            {[
              { name: "James Carter",  role: "CEO",             photo: "https://randomuser.me/api/portraits/men/32.jpg",   top: "10%"  },
              { name: "Sarah Chen",    role: "Ops Manager",     photo: "https://randomuser.me/api/portraits/women/44.jpg", top: "38%" },
              { name: "Alex Rivera",   role: "Support Lead",    photo: "https://randomuser.me/api/portraits/men/76.jpg",   top: "66%"  },
            ].map((p, i) => (
              <motion.div key={p.name}
                initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.2 + i * 0.12 }}
                style={{ position: "absolute", right: -12, top: p.top, zIndex: 3, background: "#fff", borderRadius: 14, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 8px 28px -8px rgba(31,36,48,0.2), 0 0 0 1px rgba(31,36,48,0.05)", minWidth: 180 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.photo} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 700, color: "#1F2430", lineHeight: 1.2 }}>{p.name}</div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "#9BA8B7" }}>{p.role}</div>
                </div>
              </motion.div>
            ))}

            {/* Stat card — bottom-left */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.45 }}
              style={{ position: "absolute", bottom: -16, left: -16, zIndex: 3, background: "#fff", borderRadius: 16, padding: "16px 20px", boxShadow: "0 12px 36px -8px rgba(31,36,48,0.2), 0 0 0 1px rgba(31,36,48,0.05)", minWidth: 170 }}>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: 11, fontWeight: 600, color: "#9BA8B7", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Team Efficiency</div>
              {/* Mini bar chart */}
              <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 36, marginBottom: 8 }}>
                {[40, 55, 48, 62, 58, 72, 68, 84].map((h, i) => (
                  <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: 3, background: i >= 6 ? "var(--interactive)" : "var(--soft)" }} />
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 800, color: "#1F2430", lineHeight: 1 }}>3×</span>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: 11, color: "#059669", fontWeight: 600 }}>↑ this quarter</span>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ── Section 5: Foundation ── */}
      <section className="s-why-foundation">
        <div style={{ position: "absolute", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(92,92,255,0.12) 0%, transparent 65%)", top: "-200px", right: "-100px", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(71,71,224,0.1) 0%, transparent 70%)", bottom: "-150px", left: "-100px", pointerEvents: "none" }} />

        {/* Full-width heading and description */}
        <div style={{ position: "relative", zIndex: 1, width: "100%", textAlign: "center", paddingBottom: 48 }}>
          <motion.h2 {...fadeUp(0)} className="evoq-h2" style={{ marginBottom: 20 }}>
            Ready for <span className="accent">What Comes Next</span>
          </motion.h2>
          <motion.p {...fadeUp(0.08)} className="evoq-sub">
            Organizations rarely stay the same. New opportunities, new services, new teams, and new processes become part of growth.
          </motion.p>
          <motion.p {...fadeUp(0.14)} className="why-body">
            EVOQ provides a structured operational foundation that adapts to change without creating fragmentation. As the business evolves, teams remain connected, information remains accessible, and operations remain aligned.
          </motion.p>
          <motion.p {...fadeUp(0.19)} className="why-body" style={{ fontStyle: "italic", color: "var(--interactive)", fontWeight: 600 }}>
            Growth should create momentum, not operational friction.
          </motion.p>
        </div>

        {/* Buttons */}
        <motion.div {...fadeUp(0.24)} style={{ position: "relative", zIndex: 1, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "13px 28px", borderRadius: 999, background: "var(--interactive)", color: "#fff", fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 600, textDecoration: "none", boxShadow: "0 10px 30px -10px rgba(0,0,153,0.4), inset 0 0 0 1px rgba(255,255,255,0.08)", transition: "background 0.15s, transform 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--mid)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "var(--interactive)"; e.currentTarget.style.transform = "translateY(0)"; }}>
            Talk to an Expert
          </Link>
        </motion.div>
      </section>

      <GetStartedModal isOpen={showGetStarted} onClose={() => setShowGetStarted(false)} />
    </div>
  );
}
