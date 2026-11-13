"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Easing } from "framer-motion";
import { Eyebrow } from "./shared";
import { AppIcon, SolutionApps } from "./SolutionApps";
import { SolutionScreen, hasScreen } from "./SolutionScreens";
import { ALL_APPS, APPS, SOLUTIONS } from "./solutionsData";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as Easing },
});

/* One industry solution at a time, each in its own palette: the apps it includes on the left, and on the right
   the apps lining up and filling a board together (SolutionApps). The visual moves the tabs on as each loop
   ends, until the visitor picks a tab. Data and copy live in solutionsData.ts. */

/* Smallest width at which each tab label wraps to two lines at most (measured at 14px, weight 600, plus padding). */
const TAB_W: Record<string, number> = { healthcare: 103, manufacturing: 127, "field-service": 181, hospitality: 113, finance: 88, construction: 190, all: 96 };

export function SectionSolutions() {
  const [active, setActive] = useState(0);
  const [stopped, setStopped] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ left: false, right: false, overflow: false });

  // One row of tabs that scrolls sideways: track whether there is more to see on either side.
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const read = () => setEdge({ overflow: el.scrollWidth > el.clientWidth + 2, left: el.scrollLeft > 2, right: el.scrollLeft + el.clientWidth < el.scrollWidth - 2 });
    read();
    el.addEventListener("scroll", read, { passive: true });
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => { el.removeEventListener("scroll", read); ro.disconnect(); };
  }, []);

  // Keep the active tab in view (it changes on its own while auto-advancing).
  useEffect(() => {
    const el = scroller.current;
    const tab = el?.querySelectorAll<HTMLElement>(".sol-tab")[active];
    if (!el || !tab) return;
    const pad = 12;
    if (tab.offsetLeft - pad < el.scrollLeft) el.scrollTo({ left: tab.offsetLeft - pad, behavior: "smooth" });
    else if (tab.offsetLeft + tab.offsetWidth + pad > el.scrollLeft + el.clientWidth) el.scrollTo({ left: tab.offsetLeft + tab.offsetWidth + pad - el.clientWidth, behavior: "smooth" });
  }, [active]);

  const nudge = (dir: -1 | 1) => scroller.current?.scrollBy({ left: dir * Math.max(220, scroller.current.clientWidth * 0.6), behavior: "smooth" });

  // Each tab plays its loop, then the next one comes up, until the visitor picks a tab themselves.
  const next = useCallback(() => { if (!stopped) setActive((i) => (i + 1) % SOLUTIONS.length); }, [stopped]);

  const x = SOLUTIONS[active];

  return (
    <section className="s-solutions">
      <div className="s-solutions-inner">
        <div className="sol-top">
          <motion.div className="evoq-section-head sol-head" {...fadeUp(0)}>
            <Eyebrow>Solutions</Eyebrow>
            <h2 className="evoq-h2">
              Industry solutions, built from <span className="accent">the apps your teams use.</span>
            </h2>
            <p className="evoq-sub sol-sub">
              Each solution combines EVOQ apps around how that industry works. Choose yours to see which
              apps are included and what each covers.
            </p>
          </motion.div>
        </div>

        <motion.div className="sol-tabs-wrap" {...fadeUp(0.08)}>
          {edge.overflow && (
            <button type="button" className="sol-arrow" aria-label="Show previous industries" disabled={!edge.left} onClick={() => nudge(-1)}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          )}
          <div className={`sol-scroll${edge.left ? " fl" : ""}${edge.right ? " fr" : ""}`} ref={scroller}>
          <div className="sol-tabs" role="tablist" aria-label="Industries">
            {SOLUTIONS.map((s, i) => {
              const on = i === active;
              return (
                <button
                  key={s.key}
                  role="tab"
                  aria-selected={on}
                  className={`sol-tab${on ? " on" : ""}`}
                  style={{ "--tw": `${TAB_W[s.key]}px`, ...(on ? { "--sol-c": s.color, "--sol-soft": s.soft } : {}) } as React.CSSProperties}
                  onClick={() => { setActive(i); setStopped(true); }}
                >
                  {s.tab}
                </button>
              );
            })}
          </div>
          </div>
          {edge.overflow && (
            <button type="button" className="sol-arrow" aria-label="Show more industries" disabled={!edge.right} onClick={() => nudge(1)}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="m6 3 5 5-5 5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          )}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={x.key}
            className="sol-stage"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ "--sol-c": x.color, "--sol-soft": x.soft } as React.CSSProperties}
          >
            <div className="sol-copy">
              <p className="sol-name">{x.name}</p>
              <h3 className="sol-title">
                {x.lead.trim()}<span style={{ display: "block", color: x.color }}>{x.accent}</span>
              </h3>
              <p className="sol-desc">{x.desc}</p>
              <ul className="sa-list">
                {x.key === "all"
                  ? ALL_APPS.map((g) => (
                      <li key={g.team}>
                        <AppIcon app={g.apps[0]} size={28} />
                        <span><b>{g.team}</b><em>{g.apps.map((a) => APPS[a].name).join(", ")}</em></span>
                      </li>
                    ))
                  : null}
              </ul>
              {x.key !== "all" && (
                <div className="sa-chips">
                  <span className="sa-chips-k">Apps in this solution</span>
                  <div>
                    {x.rows.map((r) => (
                      <span key={r.app} className="sa-chip" title={r.job}><AppIcon app={r.app} size={18} />{APPS[r.app].name}</span>
                    ))}
                  </div>
                </div>
              )}
              <a href={x.href} className="sol-cta" style={{ background: x.btn ?? x.color }}>
                {x.cta}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
            </div>

            {hasScreen(x.key) ? <SolutionScreen s={x} onLoop={next} /> : <SolutionApps s={x} onLoop={next} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
