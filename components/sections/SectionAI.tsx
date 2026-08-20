"use client";

import { motion, type Easing } from "framer-motion";
import { ArrowRt, Eyebrow } from "./shared";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as Easing },
});

const THREAD: { from: "bot" | "user"; text: string }[] = [
  { from: "bot", text: "Good morning. You have 3 deals closing this week and 2 service jobs overdue. Want follow-up emails for the deals?" },
  { from: "user", text: "Yes please, all three." },
  { from: "bot", text: "Done — drafts saved in CRM for AcmeCorp, Nova Retail, and BrightPath. I've also flagged the 2 overdue jobs to the ServiceOps team." },
];

const CHIPS = ["Show jobs at risk", "What closed last week?", "Remind me about BrightPath"];

export function SectionAI() {
  return (
    <section className="s-ai">
      {/* Shell paints the glowing bezel; the frame inside is the panel */}
      <div className="s-ai-shell">
        <div className="s-ai-frame">
          <div className="grain" />
          <div className="vignette" />

          <motion.div className="s-ai-head" {...fadeUp(0)}>
            <Eyebrow noDot dark>EVI</Eyebrow>
            <h2 className="evoq-h2 dark">Meet EVI</h2>
          </motion.div>

          <div className="s-ai-inner">
            <motion.div className="ai-copy" {...fadeUp(0.04)}>
              <span className="ai-copy-label">EE-vee</span>
              <p className="lead">
                Your AI assistant for work across&nbsp;EVOQ.
              </p>
              <p className="body">
                Meet EVI, a context-aware AI assistant that understands what&rsquo;s
                happening across your EVOQ apps, recommends what to do next, and
                helps get the work done.
              </p>
              <p className="body strong">
                Most tools give you data. EVI gives you decisions.
              </p>
              <p className="body">
                It looks across your CRM, service jobs, and projects to surface
                what needs attention, what can wait, and what you can act on next.
              </p>
            </motion.div>

            {/* Mascot sits above the card, tucked into its top-right
                corner, so it reads as EVI looking over its own chat card
                rather than as a third, competing column. */}
            <div className="ai-right">
              <motion.div className="ai-mascot" {...fadeUp(0.08)} aria-hidden="true">
                <div className="ai-mascot-glow" />
                <span className="ai-mascot-crop">
                  <img src="/ai-assist-mascot.svg" alt="" className="ai-mascot-img" />
                </span>
              </motion.div>

              <motion.div className="ai-card" {...fadeUp(0.16)}>
                <div className="ai-card-hd">
                  <span className="ai-card-avatar">
                    <img src="/ai-assist-mascot.svg" alt="" />
                  </span>
                  <div>
                    <div className="ai-card-name">EVI</div>
                    <div className="ai-card-status"><span className="dot" />AI &middot; Online</div>
                  </div>
                </div>

                <div className="ai-thread">
                  {THREAD.map((m, i) => (
                    <div key={i} className={`ai-bubble ${m.from}`}>
                      {m.text}
                    </div>
                  ))}
                </div>

                <div className="ai-chips">
                  {CHIPS.map((c) => (
                    <span key={c} className="ai-chip">{c}</span>
                  ))}
                </div>

                <button className="ai-cta-plan wide">
                  <span>Explore EVI in Action</span>
                  <span className="ic"><ArrowRt size={11} color="#fff" /></span>
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
