"use client";

import { useEffect, useRef, useState } from "react";

/* Night plan effects for the Space & Room Reservations microsite: a quiet building at night, with
   twinkling dots, now and then a booking ping streaking across, and a lit horizon that sections rest on.
   CSS only (transform and opacity), paused while off screen, still for people who prefer less motion. */

const rnd = (i: number, s: number) => {
  const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453;
  return Math.round((x - Math.floor(x)) * 1000) / 1000;
};

/* Short decimals, so the server and the browser print identical style values. */
const f = (n: number) => Math.round(n * 100) / 100;

export function useInView<T extends HTMLElement>(threshold = 0.05) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen] as const;
}

export function NightField({ stars = 48, pings = 3, seed = 1 }: { stars?: number; pings?: number; seed?: number }) {
  const [ref, on] = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={`fx-field${on ? " on" : ""}`} aria-hidden>
      {Array.from({ length: stars }, (_, i) => {
        const s = f(1 + rnd(i, seed + 1) * 1.7);
        return (
          <span
            key={i}
            className="fx-star"
            style={{ left: `${f(rnd(i, seed + 2) * 100)}%`, top: `${f(rnd(i, seed + 3) * 100)}%`, width: `${s}px`, height: `${s}px`, ["--d" as string]: `${f(3 + rnd(i, seed + 4) * 4)}s`, ["--l" as string]: `${f(rnd(i, seed + 5) * 6)}s` }}
          />
        );
      })}
      {Array.from({ length: pings }, (_, i) => (
        <span
          key={`p${i}`}
          className="fx-ping"
          style={{ left: `${f(rnd(i, seed + 7) * 55)}%`, top: `${f(6 + rnd(i, seed + 8) * 46)}%`, ["--w" as string]: `${f(90 + rnd(i, seed + 9) * 70)}px`, ["--d" as string]: `${f(9 + rnd(i, seed + 10) * 7)}s`, ["--l" as string]: `${f(i * 3.4 + rnd(i, seed + 11) * 2)}s` }}
        />
      ))}
    </div>
  );
}

/* A large curved horizon. Content placed in front of it looks as if it rests on the ground. */
export function Horizon({ top = "58%" }: { top?: string }) {
  return <div className="fx-horizon" style={{ top }} aria-hidden />;
}


/* A skyline whose windows light up now and then: each lit window is a booked room. The drawing is 2400
   wide and 200 tall and fills its box by height, so nothing is cut off at the top; only the far sides crop. */
type Tower = { x: number; w: number; h: number; roof?: "flat" | "step" | "spire" | "pitch" | "tank" };
const TOWERS: Tower[] = [
  { x: 0, w: 150, h: 104, roof: "flat" }, { x: 150, w: 120, h: 150, roof: "step" }, { x: 270, w: 190, h: 92, roof: "pitch" },
  { x: 460, w: 130, h: 168, roof: "spire" }, { x: 590, w: 170, h: 118, roof: "tank" }, { x: 760, w: 120, h: 138, roof: "step" },
  { x: 880, w: 200, h: 96, roof: "flat" }, { x: 1080, w: 140, h: 176, roof: "spire" }, { x: 1220, w: 180, h: 112, roof: "pitch" },
  { x: 1400, w: 130, h: 146, roof: "step" }, { x: 1530, w: 190, h: 100, roof: "tank" }, { x: 1720, w: 120, h: 162, roof: "flat" },
  { x: 1840, w: 170, h: 124, roof: "step" }, { x: 2010, w: 150, h: 94, roof: "pitch" }, { x: 2160, w: 240, h: 136, roof: "flat" },
];
const H = 200;
export function Skyline() {
  const [ref, on] = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={`fx-sky${on ? " on" : ""}`} aria-hidden>
      <svg viewBox={`0 0 2400 ${H}`} preserveAspectRatio="xMidYMax slice">
        {TOWERS.map((b, bi) => {
          const top = H - b.h;
          const cols = Math.floor((b.w - 20) / 20);
          const rows = Math.floor((b.h - 22) / 24);
          const cx = b.x + b.w / 2;
          return (
            <g key={bi}>
              <rect x={b.x} y={top} width={b.w} height={b.h} fill="#122019" />
              <rect x={b.x} y={top} width={b.w} height="2" fill="rgba(217,185,140,.3)" />
              {b.roof === "step" && <rect x={b.x + b.w * 0.2} y={top - 22} width={b.w * 0.6} height="22" fill="#122019" />}
              {b.roof === "spire" && <><rect x={cx - 14} y={top - 26} width="28" height="26" fill="#122019" /><rect x={cx - 1.5} y={top - 58} width="3" height="32" fill="#122019" /><circle cx={cx} cy={top - 60} r="3" fill="#F4D9A3" className="fx-beacon" /></>}
              {b.roof === "pitch" && <polygon points={`${b.x},${top} ${cx},${top - 26} ${b.x + b.w},${top}`} fill="#122019" />}
              {b.roof === "tank" && <><rect x={cx - 16} y={top - 20} width="32" height="20" rx="3" fill="#122019" /><rect x={cx - 22} y={top - 4} width="44" height="4" fill="#122019" /></>}
              {Array.from({ length: rows * cols }, (_, i) => {
                const r = Math.floor(i / cols);
                const c = i % cols;
                const lit = rnd(i + bi * 97, 21) < 0.28;
                return (
                  <rect
                    key={i}
                    className={lit ? "fx-win lit" : "fx-win"}
                    x={b.x + 13 + c * 20}
                    y={top + 14 + r * 24}
                    width="9"
                    height="12"
                    rx="1.2"
                    style={lit ? { animationDelay: `${f(rnd(i, bi + 5) * 9)}s`, animationDuration: `${f(5 + rnd(i, bi + 6) * 6)}s` } : undefined}
                  />
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export const FX_CSS = `
  .fx-field{position:absolute;inset:0;overflow:hidden;pointer-events:none}
  .fx-star{position:absolute;border-radius:50%;background:#F4E6C8;opacity:.2;animation:fxTw var(--d,4s) ease-in-out infinite;animation-delay:var(--l,0s);animation-play-state:paused}
  .fx-ping{position:absolute;height:1.5px;width:var(--w,120px);border-radius:2px;background:linear-gradient(90deg,rgba(244,230,200,0),#F4E6C8);opacity:0;animation:fxPing var(--d,10s) linear infinite;animation-delay:var(--l,0s);animation-play-state:paused;will-change:transform,opacity}
  .fx-field.on .fx-star,.fx-field.on .fx-ping{animation-play-state:running}
  @keyframes fxTw{0%,100%{opacity:.15;transform:scale(.8)}50%{opacity:.95;transform:scale(1.2)}}
  @keyframes fxPing{0%{opacity:0;transform:translate3d(0,0,0) rotate(20deg)}3%{opacity:1}14%{opacity:0;transform:translate3d(440px,160px,0) rotate(20deg)}100%{opacity:0;transform:translate3d(440px,160px,0) rotate(20deg)}}
  .fx-horizon{position:absolute;left:50%;width:150%;aspect-ratio:1;transform:translateX(-50%);border-radius:50%;pointer-events:none;
    background:radial-gradient(closest-side,#1A2C21 78%,#233B2D 100%);
    box-shadow:0 -1.5px 0 rgba(217,185,140,.55),0 -36px 110px rgba(217,185,140,.16),inset 0 28px 90px rgba(217,185,140,.1)}
  .fx-sky{position:absolute;left:0;right:0;bottom:0;height:var(--sky,clamp(120px,11vw,210px));pointer-events:none;z-index:1}
  .fx-sky svg{width:100%;height:100%;display:block}
  .fx-win{fill:rgba(217,185,140,.1)}
  .fx-win.lit{fill:#F4D9A3;opacity:.12;animation:fxWin 8s ease-in-out infinite;animation-play-state:paused}
  .fx-sky.on .fx-win.lit{animation-play-state:running}
  .fx-beacon{animation:fxBeacon 2.4s ease-in-out infinite}
  @keyframes fxBeacon{0%,100%{opacity:.25}50%{opacity:1}}
  @keyframes fxWin{0%,35%,100%{opacity:.12}50%,80%{opacity:.95}}
  @media (prefers-reduced-motion:reduce){.fx-win.lit{animation:none;opacity:.6}.fx-star{animation:none;opacity:.5}.fx-ping{display:none}}
  @media (max-width:640px){.fx-star:nth-child(3n){display:none}}
`;
