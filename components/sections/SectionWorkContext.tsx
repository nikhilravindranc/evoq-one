"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll } from "framer-motion";
import { Eyebrow } from "./shared";
import { AgentContextStage, CTX, CtxCard, H, Outcome, STATUS, W } from "./AgentContextStage";

/* "AI agent context", the pinned scroll version. A tall wrapper holds a sticky stage and one scroll value (0 to 1)
   plays the story (see AgentContextStage): EVI starts as a pencil drawing with the kinds of context spread around
   her; as you scroll the cards move in a little, staying readable and well clear of her, and she fills with colour;
   then the step the agent proposes comes up below her as a wide card.
   Below 861px, and with reduced motion, the section shows the finished state without pinning.
   Other versions: SectionWorkContextWake (plays once on view, no scroll pinning). The alternatives to the pencil
   drawing are live on /hero-versions. */

const CHAR = "/characters";

export function SectionWorkContext() {
  const ref = useRef<HTMLElement>(null);
  const holder = useRef<HTMLDivElement>(null);
  const reduce = !!useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const still = useMotionValue(1);
  const p = reduce ? still : scrollYProgress;

  const [flat, setFlat] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 860px)");
    const fit = () => {
      setFlat(mq.matches);
      const w = (holder.current?.clientWidth ?? W + 80) - 80;
      const hAvail = window.innerHeight - 250;
      setScale(Math.max(0.5, Math.min(1, w / W, hAvail / H)));
    };
    fit();
    mq.addEventListener("change", fit);
    window.addEventListener("resize", fit);
    return () => { mq.removeEventListener("change", fit); window.removeEventListener("resize", fit); };
  }, []);

  const head = (
    <div className="wc-head">
      <div>
        <Eyebrow>AI agent context</Eyebrow>
        <h2 className="evoq-h2 wc-h2">EVI gathers the context. <span className="accent">The agent prepares the work.</span></h2>
      </div>
      <div className="wc-lead">
        <p>Before an agent prepares anything, EVI brings together the records, documents, recent activity and instructions that apply to the task, within what that agent is permitted to access. You decide how much the agent does without asking.</p>
        <a href="/products/ai" className="wc-btn">Explore EVI and agents <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></a>
      </div>
    </div>
  );

  if (flat) {
    const reveal = { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-40px" }, transition: { duration: 0.4 } };
    return (
      <section className="s-wc s-wc-flat" ref={ref}>
        <div className="wc-inner">
          {head}
          <div className="wc2-flat-char">
            <span className="wc2-glow" style={{ opacity: 1 }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${CHAR}/evi-new.webp`} alt="EVI" />
            <span className="wc-state b3">{STATUS[3]}</span>
          </div>
          <div className="wc2-flat-grid">
            {CTX.map((c) => <motion.div key={c.key} {...reveal}><CtxCard c={c} /></motion.div>)}
          </div>
          <motion.div className="wc2-flat-out" {...reveal}><Outcome /></motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className={`s-wc s-wc2${reduce ? " still" : ""}`} ref={ref}>
      <div className="wc-stage">
        <div className="wc-inner" ref={holder}>
          {head}
          <div className="wc-canvas-wrap" style={{ width: W * scale, height: H * scale }}>
            <div className="wc-canvas" style={{ width: W, height: H, transform: `scale(${scale})` }}>
              <AgentContextStage p={p} reveal="pencil" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
