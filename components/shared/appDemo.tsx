"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type RefObject } from "react";

/* The cursor demo shared by the product features pages: a cursor goes from place to place inside an app window,
   a tag of a few words follows it, and its clicks change the screen. A page describes its demo as a list of acts. */

export type Act = { to: string; tag: string; hold: number; click?: boolean; auto?: boolean; fx?: number; fy?: number };

export function useReduced() {
  return useSyncExternalStore(
    (cb) => { const m = window.matchMedia("(prefers-reduced-motion: reduce)"); m.addEventListener("change", cb); return () => m.removeEventListener("change", cb); },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

export type DemoState = { i: number; p: number; x: number; y: number; flip: boolean };
const IDLE: DemoState = { i: -1, p: 0, x: 0, y: 0, flip: false };

/* plays the acts one after another and loops; i is the act, p turns 1 when its click lands */
export function useDemo(acts: Act[], active: boolean, paused: boolean, page: RefObject<HTMLDivElement | null>, onEnd?: () => void): DemoState {
  const reduce = useReduced();
  const [d, setD] = useState(IDLE);
  const end = useRef(onEnd);
  useEffect(() => { end.current = onEnd; });

  useEffect(() => {
    if (!active || paused || reduce) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms));
    const go = (i: number) => {
      const box = page.current;
      const el = box?.querySelector<HTMLElement>(acts[i].to);
      if (!box || !el) return;
      const r = el.getBoundingClientRect();
      const b = box.getBoundingClientRect();
      const x = r.left - b.left + r.width * (acts[i].fx ?? 0.6);
      const y = r.top - b.top + r.height * (acts[i].fy ?? 0.55);
      setD({ i, p: 0, x, y, flip: x > b.width - 200 });
      if (acts[i].click || acts[i].auto) at(() => setD((s) => ({ ...s, p: 1 })), 950);
      if (i + 1 < acts.length) at(() => go(i + 1), acts[i].hold);
      else {
        // when a tour is running, the next feature takes over; otherwise the same demo plays again
        at(() => { setD(IDLE); end.current?.(); }, acts[i].hold);
        at(() => go(0), acts[i].hold + 1300);
      }
    };
    at(() => go(0), 700);
    return () => timers.forEach(clearTimeout);
  }, [acts, active, paused, reduce, page]);

  // leaving the feature puts the screen back to how it began
  useEffect(() => () => setD(IDLE), [active]);

  // reduced motion: no cursor, the screen shows where the demo ends
  return reduce ? { ...IDLE, i: acts.length - 1, p: 1 } : d;
}

export function DemoCursor({ d, acts }: { d: DemoState; acts: Act[] }) {
  const reduce = useReduced();
  if (reduce) return null;
  return (
    <div className={`app-cur${d.i >= 0 ? " on" : ""}${d.flip ? " flip" : ""}`} style={{ transform: `translate(${d.x}px,${d.y}px)` }} aria-hidden>
      <svg viewBox="0 0 20 20" fill="none"><path d="M3 2.5 15.5 8.8 9.8 10.3 8 16.2 3 2.5Z" fill="#1F2430" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" /></svg>
      {d.i >= 0 && <span className="app-cur-tag" key={d.i}>{acts[d.i].tag}</span>}
      {d.p === 1 && acts[d.i]?.click && <i className="app-cur-rip" key={`r${d.i}`} />}
    </div>
  );
}

/* the cursor, its tag and the click ripple, in the product's colour */
export const demoCursorCss = (color: string, shadow: string) => `
  .app-cur{position:absolute;left:0;top:0;z-index:6;pointer-events:none;opacity:0;transition:transform .85s cubic-bezier(.45,.05,.2,1),opacity .3s ease;will-change:transform}
  .app-cur.on{opacity:1}
  .app-cur svg{display:block;width:24px;height:24px;filter:drop-shadow(0 2px 3px rgba(20,14,70,.4))}
  .app-cur-tag{position:absolute;left:20px;top:18px;padding:5px 11px;border-radius:999px;background:${color};color:#fff;font:600 12.5px var(--font-sans),system-ui,sans-serif;white-space:nowrap;box-shadow:0 8px 18px -8px ${shadow};animation:fmTag .3s ease both}
  .app-cur.flip .app-cur-tag{left:auto;right:12px}
  @keyframes fmTag{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}
  .app-cur-rip{position:absolute;left:-8px;top:-8px;width:20px;height:20px;border-radius:50%;box-shadow:0 0 0 2px ${color};animation:fmClick .6s ease-out both}
  @keyframes fmClick{from{transform:scale(.4);opacity:1}to{transform:scale(2.4);opacity:0}}
`;
