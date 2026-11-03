"use client";

import { motion, type Easing } from "framer-motion";
import { AiSequence } from "./AiSequence";
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
              <h2 className="evoq-h2">Ask EVI. An agent prepares the work. <span className="accent">You decide when it acts.</span></h2>
              <p className="body">
                Ask EVI a question and it pulls context from your EVOQ apps. An agent then prepares the task
                and shows you the result. You decide how much it does on its own.
              </p>
              <dl className="ai-defs">
                <div><dt>EVI</dt><dd>The assistant you ask in plain language, inside your applications.</dd></div>
                <div><dt>AI agents</dt><dd>Carry out defined tasks, such as preparing follow-ups, with approval where required.</dd></div>
              </dl>
              <a href="/products/ai" className="ai-cta">
                <span>Explore EVOQ AI</span>
                <span className="ic"><ArrowRt size={11} color="#fff" /></span>
              </a>
            </motion.div>

            {/* One illustrative request: request, context, prepared action, result */}
            <motion.div className="ai-right" {...fadeUp(0.08)}>
              <AiSequence />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
