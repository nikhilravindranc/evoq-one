"use client";

import { motion, type Easing } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as Easing },
});

const STATS = [
  { v: "90%",  l: "Spent on manual updates and cross-tool reporting" },
  { v: "30%",  l: "After workflow automation and shared visibility" },
  { v: "15%",  l: "Through loyalty programs, repeat purchases, and stronger" },
  { v: "100%", l: "Across tools and roles. No silos, no guesswork, just clarity." },
];

export function SectionImpact() {
  return (
    <section className="s-impact">
      <div className="s-impact-inner">
        <motion.div className="evoq-section-head" {...fadeUp(0)}>
          <h2 className="evoq-h2">
            Real business <span className="accent">impact.</span>
          </h2>
          <p className="evoq-sub">
            Real results from real businesses who chose unified operations over
            scattered tools.
          </p>
        </motion.div>

        <div className="impact-stats">
          {STATS.map((s, i) => (
            <motion.div key={i} className="stat" {...fadeUp(0.05 + i * 0.08)}>
              <div className="v">{s.v}</div>
              <div className="l">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
