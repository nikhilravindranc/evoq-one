"use client";

import { motion, type Easing } from "framer-motion";
import { ProductBadge } from "@/components/shared/ProductBadge";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as Easing },
});

/* ── small line-style glyphs (deliberately generic, not product logos —
   card 1 is about universal business functions, not specific apps) ── */
const GlyphUsers = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M15.5 5.5c1.5.4 2.5 1.6 2.5 3s-1 2.6-2.5 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M15.8 14c2 .3 3.7 1.8 3.7 4.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);
const GlyphHeadset = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M4 13v-1a8 8 0 0 1 16 0v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <rect x="3" y="13" width="4" height="6" rx="1.6" stroke="currentColor" strokeWidth="1.8" />
    <rect x="17" y="13" width="4" height="6" rx="1.6" stroke="currentColor" strokeWidth="1.8" />
    <path d="M19 19v1a3 3 0 0 1-3 3h-2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const GlyphCart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h7.3a2 2 0 0 0 2-1.6L20 8H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="10" cy="20.5" r="1.4" fill="currentColor" />
    <circle cx="17" cy="20.5" r="1.4" fill="currentColor" />
  </svg>
);
const GlyphShield = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 3.5 19 6.5v5c0 5-3 8.2-7 9.5-4-1.3-7-4.5-7-9.5v-5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M9 12.2 11.2 14.4 15.5 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const GlyphRoute = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="6" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="18" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.8" />
    <path d="M8.2 7 12 11m0 0 3-3m-3 3v6.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const GlyphBell = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M6 10.5a6 6 0 0 1 12 0c0 4 1.4 5.3 1.4 5.3H4.6S6 14.5 6 10.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M10 19a2.2 2.2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const GlyphSync = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M4 12a8 8 0 0 1 13.6-5.7M20 12a8 8 0 0 1-13.6 5.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M17.6 3.8v3h-3M6.4 20.2v-3h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* Card 1: a spacious row of large module badges on a rich, painterly
   gradient — mirrors the reference's "every model" card almost exactly
   (big circles, generous whitespace, soft multi-tone background). */
const MODULES = [
  { label: "CRM", glyph: GlyphUsers, bg: "#EEF0FF", fg: "#4747E0" },
  { label: "Service", glyph: GlyphHeadset, bg: "#E6F7FB", fg: "#0E8C9E" },
  { label: "Commerce", glyph: GlyphCart, bg: "#FFF1DF", fg: "#C97A16" },
  { label: "Support", glyph: GlyphShield, bg: "#E7FBF0", fg: "#128A57" },
];
function TcModules() {
  return (
    <div className="tc-modules-wrap">
      <div className="tc-modules">
        {MODULES.map((m, i) => (
          <motion.div
            key={m.label}
            className="tc-module-item"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
          >
            <span className="tc-module" style={{ background: m.bg, color: m.fg }}>
              <m.glyph />
            </span>
            <span className="tc-module-label">{m.label}</span>
          </motion.div>
        ))}
      </div>
      <div className="tc-modules-caption">
        <span className="tc-modules-caption-line" />
        <span className="tc-modules-caption-text">
          <span className="tc-badge-live" aria-hidden />
          Synced in real time
        </span>
        <span className="tc-modules-caption-line" />
      </div>
    </div>
  );
}

/* Card 2: a stats dashboard with generous spacing and a soft sparkline
   behind the numbers, instead of cramped rows. */
function Sparkline({ color }: { color: string }) {
  return (
    <svg width="56" height="24" viewBox="0 0 56 24" fill="none" aria-hidden>
      <path d="M1 18 9 14 17 16 25 8 33 11 41 4 48 7 55 2" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.55" />
    </svg>
  );
}
function TcStats() {
  const stats = [
    { label: "Revenue", value: "$24.8K", change: "18%", up: true, live: true, color: "#0E9F6E" },
    { label: "Deals", value: "142", change: "6%", up: true, color: "#2554EB" },
    { label: "CSAT", value: "96%", change: "2%", up: false, color: "rgba(31,36,48,0.4)" },
  ];
  return (
    <div className="tc-stats">
      {stats.map((s) => (
        <div className="tc-stat" key={s.label}>
          <div>
            <span className="tc-stat-label">
              {s.label}
              {s.live && <span className="tc-badge-live" aria-hidden />}
            </span>
            <div className="tc-stat-row">
              <span className="tc-stat-value">{s.value}</span>
              <span className={`tc-stat-change ${s.up ? "up" : "down"}`}>{s.up ? "▲" : "▼"} {s.change}</span>
            </div>
          </div>
          <Sparkline color={s.color} />
        </div>
      ))}
    </div>
  );
}

/* Card 3: per-row dot timelines (reference's "recurring tasks" card) —
   a row of hollow steps with one active dot, a floating tooltip riding
   above it, and the whole thing animates along the track on a loop. */
function TcTaskRow({
  icon, iconBg, label, sub, dots, progress, tooltip, animated, delay = 0,
}: {
  icon: React.ReactNode; iconBg: string; label: string; sub: string;
  dots: number; progress: number; tooltip?: string; animated?: boolean; delay?: number;
}) {
  const pct = (i: number) => `${(i / (dots - 1)) * 100}%`;
  return (
    <div className="tc-task-row">
      <span className="tc-task-icon" style={{ background: iconBg }}>{icon}</span>
      <div className="tc-task-col">
        <div className="tc-task-label">{label}</div>
        <div className="tc-task-sub">{sub}</div>
      </div>
      <div className="tc-task-track">
        <span className="tc-task-line" />
        {Array.from({ length: dots }).map((_, i) => (
          <span key={i} className="tc-task-hollow" style={{ left: pct(i) }} />
        ))}
        {animated ? (
          <>
            <motion.span
              className="tc-task-tip"
              animate={{ left: [pct(0), pct(dots - 1), pct(0)] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
            >
              {tooltip}
            </motion.span>
            <motion.span
              className="tc-task-dot"
              animate={{ left: [pct(0), pct(dots - 1), pct(0)] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
            />
          </>
        ) : (
          <span className="tc-task-dot static" style={{ left: pct(progress) }} />
        )}
      </div>
      <span className="tc-task-toggle" aria-hidden>
        <span className="tc-task-toggle-knob" />
      </span>
    </div>
  );
}
function TcAutomations() {
  return (
    <div className="tc-tasks">
      <TcTaskRow icon={<GlyphRoute />} iconBg="#2554EB" label="Lead routing" sub="Every new signup" dots={5} progress={2} tooltip="Routing…" animated delay={0} />
      <TcTaskRow icon={<GlyphBell />} iconBg="#F5A123" label="Follow-up reminders" sub="Daily at 9 AM" dots={5} progress={3} />
      <TcTaskRow icon={<GlyphSync />} iconBg="#0E9F6E" label="Data sync" sub="Every 15 minutes" dots={5} progress={4} />
      <div className="tc-tasks-footer">
        <span className="tc-tasks-footer-ic" aria-hidden>
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M9 1 3 9h4l-1 6 6-8H8z" fill="#F5A123" /></svg>
        </span>
        3 automations running now
      </div>
    </div>
  );
}

/* Card 4 (2-col span): a sparse, organic logo grid — real EVOQ product
   logos mixed with quiet placeholder cells, gently staggered, echoing
   the reference's "connect to data" card instead of a tight uniform
   grid. */
/* 20 cells (10x2), real logos scattered across the full width rather
   than clustered on one side, so the grid uses the whole 2-column card
   instead of leaving half of it empty. */
const APP_GRID = [
  "crm", null, "serviceops", null, "campaigns", null, "desk", null, "sync", null,
  null, "projects", null, "hrms", null, "skillberry", null, null, null, null,
];
function TcAppGrid() {
  return (
    <div className="tc-app-grid-wrap">
      <div className="tc-app-grid">
        {APP_GRID.map((key, i) => (
          <span
            key={i}
            className={`tc-app-tile${key ? "" : " ghost"}${i % 7 === 2 ? " stagger" : ""}`}
          >
            {key && <ProductBadge productKey={key} size={24} />}
          </span>
        ))}
      </div>
      <div className="tc-summary">
        <span className="tc-summary-check">
          <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M4.5 10.4 8.2 14.1 15.5 6.4" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        <div>
          <div className="tc-summary-title">8 / 8 apps active</div>
          <div className="tc-summary-sub">All working. All connected.</div>
        </div>
      </div>
    </div>
  );
}

/* Card 5: a small flowchart — nodes joined by taller dashed connectors
   with a condition label, echoing the reference's "canvas" card. Each
   node carries a real icon glyph instead of a bare color dot. */
function TcCanvas() {
  const steps = [
    { label: "New Lead", color: "#E1567C", glyph: GlyphBell },
    { label: "Assign Rep", color: "#2554EB", glyph: GlyphUsers },
    { label: "Notify Team", color: "#0E9F6E", glyph: GlyphHeadset },
  ];
  return (
    <div className="tc-canvas">
      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        return (
          <div className="tc-canvas-item" key={s.label}>
            <div className={`tc-canvas-node${last ? " accent" : ""}`}>
              <span
                className="tc-canvas-icon"
                style={last ? { background: "rgba(255,255,255,0.16)", color: "#fff" } : { background: `${s.color}1A`, color: s.color }}
              >
                <s.glyph />
              </span>
              {s.label}
              {last && <span className="tc-canvas-live" aria-hidden />}
            </div>
            {i < steps.length - 1 && (
              <div className="tc-canvas-connector">
                <span className="tc-canvas-line" />
                {i === 0 && <span className="tc-canvas-cond">Qualified?</span>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function SectionTeams() {
  return (
    <section className="s-teams">
      <div className="s-teams-inner">
        <motion.div className="evoq-section-head" {...fadeUp(0)}>
          <h2 className="evoq-h2">
            Engineered for <span className="accent">modern teams.</span>
          </h2>
          <p className="evoq-sub">
            EVOQ runs sales, service, operations, and support, so your teams stay in
            sync and decisions happen faster.
          </p>
        </motion.div>

        <div className="teams-grid">
          {/* Row 1, col 1: featured */}
          <motion.div className="team-card featured" {...fadeUp(0.05)}>
            <div className="tc-content">
              <h3>Everything works together.</h3>
              <p>One source of truth across sales, service, commerce, and support.</p>
            </div>
            <div className="tc-visual">
              <TcModules />
            </div>
          </motion.div>

          {/* Row 1, col 2 */}
          <motion.div className="team-card tone-slate" {...fadeUp(0.1)}>
            <div className="tc-content">
              <h3>See everything, miss nothing.</h3>
              <p>Real-time data across departments, roles, and channels.</p>
            </div>
            <div className="tc-visual">
              <TcStats />
            </div>
          </motion.div>

          {/* Row 1, col 3 */}
          <motion.div className="team-card tone-peach" {...fadeUp(0.15)}>
            <div className="tc-content">
              <h3>Automate what slows you down.</h3>
              <p>Actions, approvals, and updates run on their own. Your team focuses on what matters.</p>
            </div>
            <div className="tc-visual">
              <TcAutomations />
            </div>
          </motion.div>

          {/* Row 2, col 1+2: spans 2 columns */}
          <motion.div className="team-card tone-lavender" style={{ gridColumn: "span 2" }} {...fadeUp(0.1)}>
            <div className="tc-content">
              <h3>Flexible for your future.</h3>
              <p>Scale teams, add products, or connect systems; EVOQ grows with you.</p>
            </div>
            <div className="tc-visual">
              <TcAppGrid />
            </div>
          </motion.div>

          {/* Row 2, col 3 */}
          <motion.div className="team-card tone-mint" {...fadeUp(0.15)}>
            <div className="tc-content">
              <h3>Workflows, your way.</h3>
              <p>Customize how your processes run, without jumping between tools.</p>
            </div>
            <div className="tc-visual">
              <TcCanvas />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
