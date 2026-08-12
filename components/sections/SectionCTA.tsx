"use client";

import { motion } from "framer-motion";
import { ArrowRt } from "./shared";

export function SectionCTA() {
  return (
    <section className="s-cta">
      <motion.div
        className="s-cta-inner"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="cta-left">
          <h2 className="evoq-h2">
            Start with one.
            <br/>
            <span className="accent">Scale with all.</span>
          </h2>
          <p>
            Every EVOQ app is complete on its own. Connect two and your data flows
            automatically. Use all four and you have a fully unified business operating
            system.
          </p>
          <button className="cta-talk">
            <span>Talk to us</span>
            <span className="ic"><ArrowRt color="#fff"/></span>
          </button>
        </div>

        <div className="steps">
          <div className="step">
            <div className="num">01</div>
            <div className="text">
              <h4>Pick the app your team needs today</h4>
              <p>
                Each app is fully standalone. Start with whichever solves your most
                immediate challenge &mdash; no compromises, no dependencies required.
              </p>
            </div>
          </div>
          <div className="step">
            <div className="num">02</div>
            <div className="text">
              <h4>Add another app, data connects automatically</h4>
              <p>
                No imports, no re-entry. The moment you add a second app, EVOQ
                recognises it and begins sharing data in real time across your
                business.
              </p>
            </div>
          </div>
          <div className="step">
            <div className="num">03</div>
            <div className="text">
              <h4>Run your entire business from one suite</h4>
              <p>
                All four apps work as a single operating system &mdash; one source of
                truth, zero duplication, complete visibility across every team.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
