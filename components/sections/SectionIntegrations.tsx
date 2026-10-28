"use client";

import { motion, type Easing } from "framer-motion";
import { Eyebrow, ArrowRt } from "./shared";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as Easing },
});

/* Tools EVOQ connects to, from the /integrations directory. Logos are the real
   third-party marks already in /public. */
const TOOLS: { name: string; logo: string }[] = [
  { name: "Gmail", logo: "/site/images/logos-gmail.svg" },
  { name: "Slack", logo: "/site/images/logos-slack.svg" },
  { name: "Microsoft 365", logo: "/site/images/logos-microsoft365.svg" },
  { name: "QuickBooks", logo: "/site/images/logos-quickbooks.svg" },
  { name: "Stripe", logo: "/site/images/logos-stripe.svg" },
  { name: "Shopify", logo: "/site/images/logos-shopify.svg" },
  { name: "WooCommerce", logo: "/site/images/logos-woocommerce.svg" },
  { name: "Zendesk", logo: "/site/images/logos-zendesk.svg" },
  { name: "NetSuite", logo: "/site/images/logos-netsuite.png" },
  { name: "Google Analytics", logo: "/logos/integrations/googleanalytics.svg" },
  { name: "Make", logo: "/site/images/logos-make.svg" },
];

export function SectionIntegrations() {
  return (
    <section className="s-int">
      <div className="s-int-inner">
        <motion.div className="evoq-section-head" {...fadeUp(0)}>
          <Eyebrow>Integrations</Eyebrow>
          <h2 className="evoq-h2">
            Works with the tools you <span className="accent">already use.</span>
          </h2>
          <p className="evoq-sub">
            Connect EVOQ to your accounting, commerce, messaging and productivity tools, so data
            flows both ways without re-entry.
          </p>
        </motion.div>

        <motion.ul className="int-grid" {...fadeUp(0.08)}>
          {TOOLS.map((t) => (
            <li key={t.name} className="int-tile">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.logo} alt="" width={40} height={40} loading="lazy" />
              <span>{t.name}</span>
            </li>
          ))}
        </motion.ul>

        <motion.a href="/integrations" className="int-link" {...fadeUp(0.14)}>
          <span>See all integrations</span>
          <span className="ic"><ArrowRt size={11} color="#fff" /></span>
        </motion.a>
      </div>
    </section>
  );
}
