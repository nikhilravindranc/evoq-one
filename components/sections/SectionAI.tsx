"use client";

import { motion, type Easing } from "framer-motion";
import { ArrowRt } from "./shared";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as Easing },
});

export function SectionAI() {
  return (
    <section className="s-ai">
      {/* Shell paints the glowing bezel; the frame inside is the panel */}
      <div className="s-ai-shell">
        <div className="s-ai-frame">
          <div className="s-ai-inner">
            {/* Eyebrow + heading now live in the copy column itself
                (was a full-width header spanning both columns) so the
                whole left side reads as one block next to the visual,
                matching the reference layout. */}
            <motion.div className="ai-copy" {...fadeUp(0.04)}>
              <h2 className="evoq-h2">AI built into the work you already do</h2>
              <p className="lead">
                EVOQ brings AI into the applications your teams already use.
              </p>
              <p className="body">
                EVI, the EVOQ AI assistant, helps you find information, understand
                activity, prepare outputs, and take action across your applications.
                AI agents handle defined tasks that involve multiple steps, from
                preparing a customer follow-up to reviewing service activity or
                identifying invoices that need attention.
              </p>
              <p className="body strong">
                The result is AI that works with the information and processes
                behind your everyday work, rather than sitting outside them.
              </p>
              <a href="/ai" className="ai-cta">
                <span>Explore EVOQ AI</span>
                <span className="ic"><ArrowRt size={11} color="#fff" /></span>
              </a>
            </motion.div>

            {/* EVOQ AI home screen with the app orbit, EVI mascot and follow-up agent card */}
            <motion.div className="ai-right" {...fadeUp(0.08)}>
              <img
                src="/evi-home-visual-v2.webp"
                alt="EVOQ AI home screen: ask EVI anything, with EVOQ apps and a follow-up agent working alongside"
                className="ai-right-img"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
