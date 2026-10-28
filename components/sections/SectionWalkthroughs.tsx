"use client";

import { motion, type Easing } from "framer-motion";
import { Eyebrow, ArrowRt } from "./shared";
import { ProductBadge } from "@/components/shared/ProductBadge";
import { trackCta } from "@/lib/track";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as Easing },
});

/* Entry points into the product, in place of customer proof until genuine,
   permissioned customer evidence exists. Previews 2 and 3 are coded
   illustrations and say so; swap them for real interface recordings when available. */

const APPS = ["crm", "campaigns", "configx", "serviceops", "projects", "desk", "hrms", "skillberry", "billing", "inventory", "sync", "ai"];
const SCENARIO = [
  ["crm", "Lead recorded"],
  ["crm", "Converted to deal"],
  ["crm", "Deal won"],
  ["billing", "Invoice raised"],
];

/* Three ways to evaluate EVOQ, kept distinct:
   walkthroughs show how an application works, scenarios follow a process from start to finish,
   previews focus on the interface. The previews below are coded illustrations. */

function WalkthroughPreview() {
  return (
    <div className="wt-apps" aria-hidden>
      {APPS.map((k) => <span key={k}><ProductBadge productKey={k} size={30} /></span>)}
    </div>
  );
}

function ScenarioPreview() {
  return (
    <div className="wt-flow" aria-hidden>
      <span className="wt-tag">Example</span>
      <b>Lead to invoice</b>
      <ol>
        {SCENARIO.map(([k, s], i) => (
          <li key={s} className={i < 3 ? "done" : undefined}><i /><ProductBadge productKey={k} size={16} />{s}</li>
        ))}
      </ol>
    </div>
  );
}

function ScreenPreview() {
  return (
    <div className="wt-screen" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/crm-app/deal-record.webp" alt="" loading="lazy" />
    </div>
  );
}

const ENTRIES = [
  { key: "walkthroughs", title: "Product walkthroughs", text: "Explore how individual EVOQ applications work, the capabilities they offer, and the tasks they support.", cta: "Explore walkthroughs", href: "/walkthroughs/crm", preview: <WalkthroughPreview /> },
  { key: "scenarios", title: "Example scenarios", text: "Follow representative industry processes to understand how applications and available capabilities work together.", cta: "Explore scenarios", href: "/scenarios/enquiry-to-invoice", preview: <ScenarioPreview /> },
  { key: "previews", title: "Application previews", text: "Get a closer look at application interfaces, key screens, and the experience of working with EVOQ.", cta: "Preview applications", href: "/previews/crm", preview: <ScreenPreview /> },
];

export function SectionWalkthroughs() {
  return (
    <section className="s-walk" id="walkthroughs">
      <div className="s-walk-inner">
        <motion.div className="evoq-section-head" {...fadeUp(0)}>
          <Eyebrow>Walkthroughs</Eyebrow>
          <h2 className="evoq-h2">
            See EVOQ <span className="accent">in action.</span>
          </h2>
          <p className="evoq-sub">
            Explore the applications, follow a representative process and see how available AI
            capabilities support the work.
          </p>
        </motion.div>

        <div className="wt-grid">
          {ENTRIES.map((e, i) => (
            <motion.a key={e.key} href={e.href} className="wt-card" onClick={() => trackCta(`walkthrough_${e.key}`, "walkthroughs")} {...fadeUp(0.08 + i * 0.08)}>
              <div className="wt-preview">{e.preview}</div>
              <div className="wt-body">
                <b>{e.title}</b>
                <p>{e.text}</p>
                <span className="wt-cta">{e.cta} <ArrowRt size={12} /></span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
