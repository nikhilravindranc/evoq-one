"use client";

import { motion, type Easing } from "framer-motion";
import { Eyebrow, ArrowRt } from "./shared";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as Easing },
});

/* Third-party tools listed in the /integrations directory; logos are the real marks in /public. */

const TOOLS: { slug: string; name: string; logo: string }[] = [
  { slug: "gmail", name: "Gmail", logo: "/site/images/logos-gmail.svg" },
  { slug: "slack", name: "Slack", logo: "/site/images/logos-slack.svg" },
  { slug: "microsoft-365", name: "Microsoft 365", logo: "/site/images/logos-microsoft365.svg" },
  { slug: "quickbooks", name: "QuickBooks", logo: "/site/images/logos-quickbooks.svg" },
  { slug: "stripe", name: "Stripe", logo: "/site/images/logos-stripe.svg" },
  { slug: "shopify", name: "Shopify", logo: "/site/images/logos-shopify.svg" },
  { slug: "woocommerce", name: "WooCommerce", logo: "/site/images/logos-woocommerce.svg" },
  { slug: "zendesk", name: "Zendesk", logo: "/site/images/logos-zendesk.svg" },
  { slug: "netsuite", name: "NetSuite", logo: "/site/images/logos-netsuite.png" },
  { slug: "google-analytics", name: "Google Analytics", logo: "/logos/integrations/googleanalytics.svg" },
  { slug: "make", name: "Make", logo: "/site/images/logos-make.svg" },
];

export function SectionIntegrations() {
  return (
    <section className="s-int">
      <div className="s-int-inner">
        <motion.div className="evoq-section-head" {...fadeUp(0)}>
          <Eyebrow>Integrations</Eyebrow>
          <h2 className="evoq-h2">
            Keep the tools you already use.<br /><span className="accent">EVOQ connects to them.</span>
          </h2>
          <p className="evoq-sub">
            EVOQ apps share records with each other and connect to supported tools such as Gmail, Slack and
            QuickBooks. Sync exchanges data with the systems you already run, so your teams do not have to
            copy information between them.
          </p>
        </motion.div>

        <motion.ul className="int-grid" {...fadeUp(0.06)}>
          {TOOLS.map((t) => (
            <li key={t.slug} className="int-tile">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.logo} alt="" width={40} height={40} loading="lazy" />
              <span>{t.name}</span>
            </li>
          ))}
        </motion.ul>

        <motion.p className="int-note" {...fadeUp(0.12)}>
          Connecting a tool does not give AI agents access to it. Agents only use the data and actions you permit.
        </motion.p>

        <motion.a href="/integrations" className="int-link" {...fadeUp(0.14)}>
          <span>See all integrations</span>
          <span className="ic"><ArrowRt size={11} color="#fff" /></span>
        </motion.a>
      </div>
    </section>
  );
}
