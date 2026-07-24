"use client";

import { motion, type Easing } from "framer-motion";
import { ArrowRt, Eyebrow } from "./shared";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as Easing },
});

export function SectionAI() {
  return (
    <section className="s-ai">
      <div className="grain"/>
      <div className="vignette"/>
      <div className="s-ai-inner">
        <motion.div className="ai-copy" {...fadeUp(0)}>
          <Eyebrow dark>&#9733; EVOQ AI Assist</Eyebrow>
          <h2 className="evoq-h2 dark">
            Intelligence is built into{" "}
            <span className="accent">every workflow.</span>
          </h2>
          <p className="lead">
            Meet Evoq AI Assist, a context-aware AI that thinks across your entire
            suite, recommends what to do next, and executes work at scale.
          </p>
          <p className="body">
            Most tools give you data. EVOQ Assist gives you decisions. It reads across
            your CRM, service jobs, and projects, then tells you what needs attention,
            what can wait, and what it handles for you.
          </p>
        </motion.div>

        <motion.div className="ai-card" {...fadeUp(0.12)}>
          <div className="ai-input">
            <div>
              <div className="placeholder">Ask Evoq AI Assist about your business&hellip;</div>
              <div className="micro"><span>@</span><span>+</span><span>&#9733;</span></div>
            </div>
            <button className="ai-send" aria-label="Send">
              <ArrowRt color="#fff"/>
            </button>
          </div>

          <div className="ai-suggestion">
            <span>Summarise stalled deals this week</span>
            <span className="arr"><ArrowRt size={12}/></span>
          </div>
          <div className="ai-suggestion">
            <span>Draft follow-up email for Acme Corp</span>
            <span className="arr"><ArrowRt size={12}/></span>
          </div>
          <div className="ai-suggestion">
            <span>Show jobs at risk of delay</span>
            <span className="arr"><ArrowRt size={12}/></span>
          </div>

          <div className="ai-cta-row">
            <div className="agent"><span className="av"/>Evoq AI · ready</div>
            <button className="ai-cta-plan">
              <span>Create a Project Plan</span>
              <span className="ic"><ArrowRt size={11} color="#fff"/></span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
