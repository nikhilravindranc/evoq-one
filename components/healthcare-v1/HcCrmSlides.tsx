"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { C } from "./hcData";
import { HcCrmJourney } from "./HcCrmJourney";
import { HcCrmSharedContext } from "./HcCrmContext";
import { HcCrmFollowUp } from "./HcCrmFollowUp";

/* Patient Relationships: the journey, the shared context and the follow ups as three full-width slides, so the three sections take the height of one
   (docs/healthcare-patient-relationships-plan.md). A small toggle centred below the slides shows which one is open and moves between them.
   The content of each slide is unchanged. While the section is on screen it moves on by itself every few seconds, so the sideways scroll is
   obvious. It stops for good as soon as the visitor scrolls, swipes, clicks or uses the keys, pauses on hover and focus, and never runs when
   the visitor prefers reduced motion. */

const SLIDES = [
  { key: "journey", label: "Patient journey", node: <HcCrmJourney /> },
  { key: "context", label: "Shared context", node: <HcCrmSharedContext /> },
  { key: "followups", label: "Follow ups", node: <HcCrmFollowUp /> },
];

export function HcCrmSlides() {
  const track = useRef<HTMLDivElement>(null);
  const [act, setAct] = useState(0);
  const [seen, setSeen] = useState(false);
  const [hold, setHold] = useState(false);
  const [stopped, setStopped] = useState(false);
  const sec = useRef<HTMLElement>(null);

  const measure = useCallback(() => {
    const t = track.current;
    if (!t) return;
    const w = t.clientWidth || 1;
    setAct(Math.max(0, Math.min(SLIDES.length - 1, Math.round(t.scrollLeft / w))));
  }, []);

  useEffect(() => {
    const t = track.current;
    if (!t) return;
    measure();
    t.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => { t.removeEventListener("scroll", measure); window.removeEventListener("resize", measure); };
  }, [measure]);

  const go = (n: number) => {
    const t = track.current;
    if (!t) return;
    const k = Math.max(0, Math.min(SLIDES.length - 1, n));
    t.scrollTo({ left: k * t.clientWidth, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  useEffect(() => {
    const el = sec.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!seen || hold || stopped) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => {
      if (!document.hidden) go(act === SLIDES.length - 1 ? 0 : act + 1);
    }, act === 0 ? 4000 : 6500);
    return () => window.clearTimeout(id);
  }, [seen, hold, stopped, act]);

  const stop = () => setStopped(true);

  return (
    <section
      id="features"
      ref={sec}
      className="hsl-sec"
      aria-label="From enquiry to return visit"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={() => setHold(false)}
    >
      <style>{css}</style>
      <div
        className="hsl-track"
        ref={track}
        tabIndex={0}
        role="region"
        aria-label="Patient journey, shared context and follow ups, slide sideways"
        onTouchStart={stop}
        onPointerDown={stop}
        onWheel={(e) => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) stop(); }}
        onKeyDown={(e) => {
          stop();
          if (e.key === "ArrowRight") { e.preventDefault(); go(act + 1); }
          if (e.key === "ArrowLeft") { e.preventDefault(); go(act - 1); }
        }}
      >
        {SLIDES.map((s) => (
          <div key={s.key} className="hsl-slide">{s.node}</div>
        ))}
      </div>
      <div className="hsl-toggle" role="group" aria-label="Choose a view">
        {SLIDES.map((s, n) => (
          <button key={s.key} type="button" aria-label={s.label} title={s.label} aria-current={n === act ? "true" : undefined} onClick={() => { stop(); go(n); }}><i /></button>
        ))}
      </div>
    </section>
  );
}

const css = `
  .hsl-sec{background:#fff;padding:20px 0 8px;scroll-margin-top:16px}
  .hsl-track{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;overscroll-behavior-x:contain}
  .hsl-track::-webkit-scrollbar{display:none}
  .hsl-track:focus-visible{outline:3px solid ${C.BLUE};outline-offset:-3px}
  .hsl-slide{flex:0 0 100%;min-width:0;scroll-snap-align:start}
  .hsl-toggle{display:flex;width:max-content;margin:6px auto 0;padding:5px;gap:2px;border-radius:999px;background:#fff;box-shadow:inset 0 0 0 1px ${C.LINE},0 12px 24px -18px rgba(16,42,67,.35)}
  .hsl-toggle button{all:unset;box-sizing:border-box;cursor:pointer;height:28px;min-width:28px;padding:0 9px;display:inline-flex;align-items:center;justify-content:center;border-radius:999px}
  .hsl-toggle button i{display:block;width:8px;height:8px;border-radius:999px;background:#C5D0DC;transition:width .3s ease,background .3s ease}
  .hsl-toggle button:hover i{background:${C.BLUE}}
  .hsl-toggle button[aria-current="true"] i{width:26px;background:${C.BLUE}}
  .hsl-toggle button:focus-visible{outline:3px solid ${C.BLUE};outline-offset:2px}
  @media (prefers-reduced-motion:reduce){.hsl-toggle button i{transition:none}}
`;
