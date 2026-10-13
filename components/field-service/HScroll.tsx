"use client";

import { useEffect, useRef, type ReactNode } from "react";

/* Scroll-linked horizontal track: as the page scrolls down, the cards slide left; scrolling back up slides them right.
   On small screens, or with reduced motion, it falls back to a normal swipeable row. */
export function HScroll({ header, children }: { header: ReactNode; children: ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const stick = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const o = outer.current, s = stick.current, t = track.current;
    if (!o || !s || !t) return;
    const mq = window.matchMedia("(max-width: 900px), (prefers-reduced-motion: reduce)");
    let max = 0;
    const measure = () => {
      if (mq.matches) {
        o.style.height = "";
        t.style.transform = "";
        max = 0;
        return;
      }
      max = Math.max(0, t.scrollWidth - s.clientWidth);
      o.style.height = `${s.offsetHeight + max}px`;
      update();
    };
    const update = () => {
      if (mq.matches) return;
      const m = Math.max(0, t.scrollWidth - s.clientWidth);
      if (Math.abs(m - max) > 1) {
        max = m;
        o.style.height = `${s.offsetHeight + max}px`;
      }
      if (!max) return;
      const rect = o.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -rect.top / (rect.height - s.offsetHeight)));
      t.style.transform = `translate3d(${-p * max}px,0,0)`;
    };
    measure();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", measure);
    mq.addEventListener("change", measure);
    const ro = new ResizeObserver(measure);
    ro.observe(t);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", measure);
      mq.removeEventListener("change", measure);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={outer} className="hs-outer" style={{ position: "relative" }}>
      <div ref={stick} className="hs-stick" style={{ position: "sticky", top: 0, minHeight: 720, display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden", padding: "44px 0" }}>
        {header}
        <div className="hs-trackwrap">
          <div ref={track} className="hs-track" style={{ display: "flex", gap: 28, width: "max-content", willChange: "transform", paddingLeft: "max(24px, calc((100vw - 1192px) / 2))", paddingRight: "max(24px, calc((100vw - 1192px) / 2))" }}>
            {children}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px){
          .hs-stick{position:static!important;min-height:0!important;padding:20px 0!important}
          .hs-trackwrap{overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch}
          .hs-track > *{scroll-snap-align:center}
        }
        @media (prefers-reduced-motion: reduce){
          .hs-stick{position:static!important;min-height:0!important}
          .hs-trackwrap{overflow-x:auto}
        }
      `}</style>
    </div>
  );
}
