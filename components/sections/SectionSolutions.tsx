"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Easing } from "framer-motion";
import { Eyebrow } from "./shared";
import { SolutionDash } from "./SolutionDash";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as Easing },
});

/* One featured industry at a time. Each wears its own industry page's
   palette (Healthcare teal, Manufacturing graphite, Construction
   terracotta, Field Service blue, Hospitality forest) for the active
   pill, accent word and button -- no new colours. */
type Industry = {
  key: string; tab: string; name: string;
  lead: string; accent: string; body: string;
  href: string; cta?: string;
  color: string; deep: string; soft: string; btn?: string;
  cards: [FloatCard, FloatCard];   // [top-right, bottom-left] over the dashboard
};
type FloatCard = { tone: "ok" | "warn" | "info"; title: string; sub: string };

const INDUSTRIES: Industry[] = [
  { key: "healthcare", tab: "Healthcare", name: "Healthcare",
    lead: "Every patient. ", accent: "Every follow-up.",
    body: "Coordinate patient enquiries, practice operations and patient engagement with solutions tailored to healthcare providers.",
    cta: "Explore healthcare", href: "/solutions/healthcare",
    color: "#0F766E", deep: "#123B3A", soft: "#DDF5F0",
    cards: [{ tone: "warn", title: "2 follow-ups overdue", sub: "Review and complete" }, { tone: "ok", title: "Appointment confirmed", sub: "Follow-up booked for Friday" }] },
  { key: "manufacturing", tab: "Manufacturing", name: "Manufacturing",
    lead: "From configured order to ", accent: "shipped product.",
    body: "Address operational needs across product configuration, order management, inventory and production-related processes.",
    cta: "Explore manufacturing", href: "/solutions/manufacturing",
    color: "#2563EB", deep: "#1F2933", soft: "#DBEAFE",
    cards: [{ tone: "warn", title: "Low stock · Steel sheet 2 mm", sub: "120 units · reorder flagged" }, { tone: "ok", title: "Stock updated", sub: "Order released to the floor" }] },
  { key: "finance", tab: "Financial Services", name: "Financial Services",
    lead: "Every client. ", accent: "Every follow-up.",
    body: "Organize client relationships, manage follow-ups, coordinate communications and handle ongoing client service requests.",
    href: "/solutions/finance", cta: "Explore financial services",
    color: "#1B7F8C", deep: "#0B2D4F", soft: "#E7F3EE", btn: "#0B2D4F",
    cards: [{ tone: "warn", title: "Follow-up due", sub: "Annual review call · Thursday" }, { tone: "ok", title: "Client request resolved", sub: "Statement query closed" }] },
  { key: "construction", tab: "Construction, Engineering & Real Estate", name: "Construction, Engineering & Real Estate",
    lead: "Plans, projects and ", accent: "people, in sync.",
    body: "Support project delivery, engineering coordination, property enquiries and related operations with products suited to the industry.",
    cta: "Explore construction", href: "/solutions/construction",
    color: "#B4533C", deep: "#7C2D1F", soft: "#E8D8BF",
    cards: [{ tone: "info", title: "Client follow-up", sub: "Quote sent to Nova Residences" }, { tone: "ok", title: "Milestone completed", sub: "Phase 2 handed to the client" }] },
  { key: "field-service", tab: "Field Service, Facilities & Maintenance", name: "Field Service, Facilities & Maintenance",
    lead: "Jobs scheduled. ", accent: "Work completed.",
    body: "Support service operations, work orders, asset maintenance and facility-related activities with relevant EVOQ products.",
    cta: "Explore field service", href: "/solutions/field-service",
    color: "#1777F0", deep: "#0F3D75", soft: "#DBEAFE",
    cards: [{ tone: "info", title: "Technician en route", sub: "Arjun · ETA 12 min" }, { tone: "ok", title: "Work order closed", sub: "Parts logged, invoice raised" }] },
  { key: "hospitality", tab: "Hospitality, Travel & F&B", name: "Hospitality, Travel & F&B",
    lead: "Guests first. ", accent: "Operations in step.",
    body: "Address operational needs across hospitality and related service activities with relevant EVOQ products.",
    cta: "Explore hospitality", href: "/solutions/hospitality",
    color: "#14532D", deep: "#064E3B", soft: "#F7F1E3",
    cards: [{ tone: "info", title: "Table for 4 · 8:00 PM", sub: "Confirmed at The Terrace" }, { tone: "ok", title: "Returning guest recognised", sub: "Preferences noted at check-in" }] },
  { key: "all", tab: "All industries", name: "All industries",
    lead: "One suite. ", accent: "Every industry.",
    body: "Don't see your industry? EVOQ products combine to fit how your organization works, so you can start with what you need.",
    href: "/industries", cta: "Explore all industries",
    color: "#4747E0", deep: "#1F2A60", soft: "#EEEDFF",
    cards: [{ tone: "info", title: "13 industries · 11 products", sub: "One suite, combined your way" }, { tone: "ok", title: "Your industry not listed?", sub: "We'll map it with you" }] },
];

const AUTO_MS = 7000;

// Keep hyphenated words ("follow-up") on one line so titles never break at the hyphen.
const keep = (t: string) =>
  t.split(/(\S*-\S*)/).map((p, i) => (p.includes("-") ? <span key={i} style={{ whiteSpace: "nowrap" }}>{p}</span> : p));

export function SectionSolutions() {
  const [active, setActive] = useState(0);
  const [stopped, setStopped] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Gentle auto-advance so the hidden industries get seen; stops for good
  // once the visitor picks one themselves.
  useEffect(() => {
    if (stopped) return;
    timer.current = setInterval(() => setActive((i) => (i + 1) % INDUSTRIES.length), AUTO_MS);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [stopped]);

  const x = INDUSTRIES[active];

  return (
    <section className="s-solutions">
      <div className="s-solutions-inner">
        <div className="sol-top">
          <motion.div className="evoq-section-head sol-head" {...fadeUp(0)}>
            <Eyebrow>Solutions</Eyebrow>
            <h2 className="evoq-h2">
              Built for how <span className="accent">your industry works.</span>
            </h2>
          </motion.div>
          <motion.div className="sol-links" {...fadeUp(0.04)}>
            <a href="/solutions" className="sol-more-btn">Solutions overview <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></a>
          </motion.div>
        </div>

        <motion.div className="sol-tabs-wrap" {...fadeUp(0.08)}>
          <div className="sol-tabs" role="tablist" aria-label="Industries">
            {INDUSTRIES.map((s, i) => {
              const on = i === active;
              return (
                <button
                  key={s.key}
                  role="tab"
                  aria-selected={on}
                  className={`sol-tab${on ? " on" : ""}`}
                  style={on ? ({ "--sol-c": s.color, "--sol-soft": s.soft } as React.CSSProperties) : undefined}
                  onClick={() => { setActive(i); setStopped(true); }}
                >
                  {s.tab}
                </button>
              );
            })}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={x.key}
            className="sol-stage"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ "--sol-c": x.color, "--sol-deep": x.deep, "--sol-soft": x.soft } as React.CSSProperties}
          >
            <div className="sol-copy">
              <h3 className="sol-title">
                {keep(x.lead)}<span style={{ color: x.color }}>{keep(x.accent)}</span>
              </h3>
              <p className="sol-name">{x.name}</p>
              <p className="sol-desc">{x.body}</p>
              <a href={x.href} className="sol-cta" style={{ background: x.btn ?? x.color }}>
                {x.cta ?? `Explore ${x.tab.toLowerCase()}`}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </div>

            <div className="sol-visual">
              <div className="sol-frame">
                <SolutionDash k={x.key} c={x.color} />
              </div>
              {x.cards.map((cd, n) => (
                <motion.div
                  key={cd.title}
                  className={`sol-float ${n === 0 ? "tr" : "bl"}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.25 + n * 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className={`sol-float-ic ${cd.tone}`}>
                    {cd.tone === "ok" && <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3.5 8.4l3 3 6-6.4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                    {cd.tone === "warn" && <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 4.5v4.2M8 11.2v.3" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg>}
                    {cd.tone === "info" && <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 4.8V8l2.2 1.6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                  </span>
                  <div>
                    <div className="sol-float-t">{cd.title}</div>
                    <div className="sol-float-s">{cd.sub}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
