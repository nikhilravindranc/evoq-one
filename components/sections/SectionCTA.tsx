"use client";

import { motion } from "framer-motion";
import { ArrowRt } from "./shared";

export function SectionCTA() {
  return (
    <section className="s-cta">
      <motion.div
        className="cta3"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="cta3-title">
          Start with one. <span>Scale with all.</span>
        </h2>
        <p className="cta3-sub">
          Every EVOQ product works on its own. Add another and your data connects
          automatically.
        </p>

        <div className="cta3-actions">
          <a className="cta3-primary" href="/contact">
            <span>Book a demo</span>
            <span className="ic"><ArrowRt color="#4747E0" /></span>
          </a>
          <a className="cta3-ghost" href="/contact">Talk to us</a>
        </div>
      </motion.div>
    </section>
  );
}
