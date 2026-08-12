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

function CheckGlyph({ color }: { color: string }) {
  return (
    <svg width="13" height="13" viewBox="0 0 20 20" fill="none" aria-hidden style={{ flexShrink: 0 }}>
      <path d="M4.5 10.4 8.2 14.1 15.5 6.4" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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
          {CATEGORIES.map((category, idx) => (
            <motion.div
              key={category.key}
              className={`platform-card tone-${category.tone}`}
              {...fadeUp(0.05 + idx * 0.08)}
            >
              <span className="platform-label">{category.label}</span>
              <h3 className="platform-title">{category.title}</h3>
              <span className="platform-count">{category.apps.length} apps included</span>

              <div className="platform-mock">
                {category.apps.map((app) => (
                  <div className="platform-mock-row" key={app}>
                    <span className="platform-mock-name">{app}</span>
                    <CheckGlyph color="var(--platform-tone-ink)" />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
