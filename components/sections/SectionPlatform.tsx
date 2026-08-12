"use client";

import { motion, type Easing } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as Easing },
});

const CATEGORIES = [
  {
    key: "growth",
    tone: "violet",
    label: "Growth",
    title: "Drive revenue and scale your business",
    apps: ["CRM", "Campaigns"],
  },
  {
    key: "operations",
    tone: "blue",
    label: "Operations",
    title: "Streamline workflows and automate the busywork",
    apps: ["ServiceOps", "Desk", "Projects", "Sync"],
  },
  {
    key: "people",
    tone: "green",
    label: "People",
    title: "Build and manage high-performing teams",
    apps: ["HRMS", "Payroll", "HRMS Plus", "Skillberry"],
  },
];

/* Growth: a chat-style question + a one-line answer + a tiny bar chart —
   the "ask a question, get an insight" pattern. */
function GrowthMock() {
  const bars = [38, 58, 46, 72, 54, 84, 66];
  return (
    <div className="platform-mock pm-growth">
      <div className="pm-chat-q">Where&apos;s this quarter&apos;s growth coming from?</div>
      <div className="pm-chat-a">
        <strong>+24%</strong> pipeline growth, led by Campaigns conversions.
      </div>
      <div className="pm-bars" aria-hidden>
        {bars.map((h, i) => (
          <span key={i} className="pm-bar" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

/* Operations: a small connected-node flow — apps handing work to each
   other automatically, distinct from Growth's chat/chart pairing. */
function OperationsMock() {
  return (
    <div className="platform-mock pm-ops">
      <div className="pm-flow-row">
        <span className="pm-node">ServiceOps</span>
        <span className="pm-flow-arrow" aria-hidden>→</span>
        <span className="pm-node">Desk</span>
      </div>
      <div className="pm-flow-row indent">
        <span className="pm-node">Projects</span>
        <span className="pm-flow-arrow" aria-hidden>→</span>
        <span className="pm-node">Sync</span>
      </div>
      <div className="pm-flow-caption">Handed off automatically, in real time</div>
    </div>
  );
}

/* People: a vertical timeline (onboarding-style progress) — distinct
   from both the chat/chart and node-flow patterns above. */
function PeopleMock() {
  const steps = [
    { label: "Offer accepted", state: "done" },
    { label: "Onboarding — Day 3", state: "active" },
    { label: "First review", state: "" },
  ];
  return (
    <div className="platform-mock pm-people">
      {steps.map((s, i) => (
        <div className="pm-tl-row" key={s.label}>
          <span className={`pm-tl-dot ${s.state}`} />
          {i < steps.length - 1 && <span className="pm-tl-line" />}
          <span className="pm-tl-label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

const MOCKS: Record<string, () => React.ReactElement> = {
  growth: GrowthMock,
  operations: OperationsMock,
  people: PeopleMock,
};

export function SectionPlatform() {
  return (
    <section className="s-platform">
      <div className="s-platform-inner">
        <motion.div className="evoq-section-head" {...fadeUp(0)}>
          <h2 className="evoq-h2">
            One <span className="accent">unified</span> platform.
          </h2>
          <p className="evoq-sub">
            Complete suite across Growth, Operations, and People. Your data flows through all of it.
          </p>
        </motion.div>

        <div className="platform-grid">
          {CATEGORIES.map((category, idx) => {
            const Mock = MOCKS[category.key];
            return (
              <motion.div
                key={category.key}
                className={`platform-card tone-${category.tone}`}
                {...fadeUp(0.05 + idx * 0.08)}
              >
                <span className="platform-label">{category.label}</span>
                <h3 className="platform-title">{category.title}</h3>
                <span className="platform-count">{category.apps.length} apps included</span>

                <Mock />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
