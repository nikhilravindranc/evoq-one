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
          See EVOQ <span>set up for your teams.</span>
        </h2>
        <p className="cta3-sub">
          Tell us which teams you run and which tools you use today. We will show how EVOQ fits, and how
          much of the work you can let EVI and the agents prepare.
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
