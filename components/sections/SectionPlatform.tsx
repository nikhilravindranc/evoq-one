"use client";

import { motion, type Easing } from "framer-motion";
import { Person, SyncIc, Check } from "./shared";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as Easing },
});

const CATEGORIES = [
  {
    key: "v-growth",
    label: "Growth",
    title: "Drive revenue and scale your business",
    icon: <Person size={9} color="#fff" />,
    products: ["CRM", "Campaigns"],
  },
  {
    key: "v-operations",
    label: "Operations",
    title: "Streamline workflows and automate the busywork",
    icon: <SyncIc size={9} color="#fff" />,
    products: ["ServiceOps", "Desk", "Projects", "Sync"],
  },
  {
    key: "v-people",
    label: "People",
    title: "Build and manage high-performing teams",
    icon: <Check size={9} color="#fff" />,
    products: ["HRMS", "Payroll", "HRMS Plus", "Skillberry"],
  },
];

export function SectionPlatform() {
  return (
    <section className="s-platform">
      <div className="s-platform-inner">
        <motion.div className="evoq-section-head" {...fadeUp(0)}>
          <h2 className="evoq-h2">
            One <span className="accent">unified</span> platform.
          </h2>
          <p className="evoq-sub">
            Complete suite across Growth, Operations, and People. Your data flows through all of it.
          </p>
        </motion.div>

        <div className="platform-grid">
          {CATEGORIES.map((category, idx) => (
            <motion.div
              key={category.key}
              className={`product-card ${category.key}`}
              {...fadeUp(0.05 + idx * 0.08)}
            >
              <div className="product-eyebrow">
                <span className="swatch">{category.icon}</span>
                <span>{category.label}</span>
              </div>
              <h3 className="product-title">{category.title}</h3>
              <div className="pc-mock">
                <div className="pc-mock-hd">
                  <span>Included apps</span>
                  <span>{category.products.length}</span>
                </div>
                {category.products.map((product) => (
                  <div className="pc-row" key={product}>
                    <div className="lead">
                      <span className="name">{product}</span>
                    </div>
                    <span className="pill tint">Included</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
