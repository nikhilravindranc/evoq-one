"use client";

import { motion } from "framer-motion";
import { ArrowRt } from "./shared";
import { trackCta } from "@/lib/track";

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
          Bring a workflow.<br /><span>See how EVOQ handles it.</span>
        </h2>
        <p className="cta3-sub">
          Pick a workflow that matters to your teams. We will show it step by step in EVOQ, with the apps
          involved and the tools you want to keep.
        </p>

        <div className="cta3-actions">
          <a className="cta3-primary" href="/contact" onClick={() => trackCta("book_demo", "final_cta")}>
            <span>Book a demo</span>
            <span className="ic"><ArrowRt color="#4747E0" /></span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
