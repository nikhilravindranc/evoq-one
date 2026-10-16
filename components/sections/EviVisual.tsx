"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ProductBadge } from "@/components/shared/ProductBadge";

/* The EVOQ AI home visual, rebuilt in code (it used to be one flat webp) so
   every part can move. Drawn on the original 1630 x 965 canvas and scaled
   to the column, so positions below are the artwork's own coordinates.

   One loop (~9.5s) while the section is on screen:
   ask (typing) -> EVI reaches across the apps (packet along the arc) ->
   the follow-up agent reports back (rows tick in) -> rest, repeat. */
const W = 1630;
const H = 965;
const CYCLE = 9.5;
const QUESTION = "Prepare follow-ups for this week's opportunities";
const TYPE_START = 0.4;
const TYPE_MS = 34;

const INDIGO = "#4747E0";
const INK = "#1F2430";

const APPS: { key: string; name: string; x: number; y: number }[] = [
  { key: "crm", name: "CRM", x: 880, y: 17 },
  { key: "serviceops", name: "ServiceOps", x: 1075, y: 30 },
  { key: "projects", name: "Projects", x: 1252, y: 75 },
  { key: "desk", name: "Desk", x: 1400, y: 162 },
  { key: "sync", name: "Sync", x: 1492, y: 305 },
];
// Where along the arc (0-1) the packet passes each tile, for the glow timing.
const APP_AT = [0.2, 0.38, 0.55, 0.72, 0.86];
const ARC =
  "M 762 178 C 820 110, 880 80, 938 78 C 1030 76, 1080 80, 1133 90 C 1220 105, 1260 115, 1310 133 C 1390 160, 1420 185, 1459 222 C 1510 270, 1540 320, 1549 366 C 1556 420, 1552 470, 1540 520";
const RIDE = { at: 2.8, dur: 1.8 };
const ROWS: { kind: "ok" | "warn"; text: string; at: number }[] = [
  { kind: "ok", text: "3 opportunities reviewed", at: 4.9 },
  { kind: "ok", text: "2 follow-ups prepared", at: 5.4 },
  { kind: "warn", text: "1 requires approval", at: 5.9 },
];

const I = {
  home: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
  layers: "M12 3 2 8l10 5 10-5-10-5zM2 12.5l10 5 10-5M2 16.5l10 5 10-5",
  grid: "M4 4h6.5v6.5H4zM13.5 4H20v6.5h-6.5zM4 13.5h6.5V20H4zM13.5 13.5H20V20h-6.5z",
  chart: "M5 20v-7M10 20V8M15 20v-4M20 20V5",
  gear: "M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4zM19.4 13.5l1.6 1.2-1.8 3.1-1.9-.7a7 7 0 0 1-2 1.2l-.3 2H11l-.3-2a7 7 0 0 1-2-1.2l-1.9.7L5 14.7l1.6-1.2a7 7 0 0 1 0-3L5 9.3l1.8-3.1 1.9.7a7 7 0 0 1 2-1.2l.3-2h3.9l.3 2a7 7 0 0 1 2 1.2l1.9-.7 1.8 3.1-1.6 1.2a7 7 0 0 1 0 3z",
  clip: "M21 11.5l-8.5 8.5a5 5 0 0 1-7-7L14 4.5a3.5 3.5 0 0 1 5 5L10.5 18a2 2 0 0 1-3-3L15 7.5",
  at: "M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8",
  globe: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20",
  send: "M22 2 11 13M22 2l-7 20-4-9-9-4z",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-4.3-4.3",
  file: "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h6",
  play: "M7 4l13 8-13 8z",
  rocket: "M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M14 4c3-1 6-1 6-1s0 3-1 6l-7 7-5-5zM9 10H5l3-3h4M14 15v4l3-3v-4",
  arrow: "M5 12h14M13 6l6 6-6 6",
};
function Ic({ d, size, color = INDIGO, w = 1.9, style }: { d: string; size: number; color?: string; w?: number; style?: CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" aria-hidden style={style}>
      <path d={d} />
    </svg>
  );
}
function Star({ x, y, s, color }: { x: number; y: number; s: number; color: string }) {
  return (
    <svg className="evi-star" width={s} height={s} viewBox="0 0 24 24" aria-hidden style={{ position: "absolute", left: x - s / 2, top: y - s / 2 }}>
      <path d="M12 0c.9 6.6 5.4 11.1 12 12-6.6.9-11.1 5.4-12 12-.9-6.6-5.4-11.1-12-12 6.6-.9 11.1-5.4 12-12z" fill={color} />
    </svg>
  );
}

export function EviVisual() {
  const fitRef = useRef<HTMLDivElement>(null);
  const inView = useInView(fitRef, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [scale, setScale] = useState(0.4);
  const [cycle, setCycle] = useState(0);
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    const el = fitRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / W));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // One loop per cycle while on screen; typing is the only part that needs
  // JS, everything else is declarative motion keyed on the cycle.
  useEffect(() => {
    if (reduce || !inView) return;
    setTyped(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let n = 1; n <= QUESTION.length; n++) {
      timers.push(setTimeout(() => setTyped(n), TYPE_START * 1000 + n * TYPE_MS));
    }
    timers.push(setTimeout(() => setCycle((c) => c + 1), CYCLE * 1000));
    return () => timers.forEach(clearTimeout);
  }, [cycle, inView, reduce]);

  const still = !!reduce;
  const shown = still ? QUESTION.length : typed;
  const playing = !still && inView;

  // appears at `at`, holds, fades out just before the loop restarts
  const life = (at: number, extra: Record<string, number[]> = {}) =>
    still
      ? { initial: false as const, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0 },
          animate: playing ? { opacity: [0, 1, 1, 0], ...extra } : { opacity: 0 },
          transition: { duration: CYCLE, times: [at / CYCLE, (at + 0.35) / CYCLE, (CYCLE - 0.6) / CYCLE, 1], ease: "easeOut" as const },
        };

  return (
    <div ref={fitRef} className="evi-fit" role="img" aria-label="EVOQ AI home screen: ask EVI anything, with EVOQ apps and a follow-up agent working alongside">
      <div className="evi-canvas" style={{ width: W, height: H, transform: `scale(${scale})` }}>
        {/* dashed arc linking the apps, with node dots */}
        <svg width={W} height={H} style={{ position: "absolute", inset: 0 }} aria-hidden>
          <path d={ARC} fill="none" stroke="#5B5BEA" strokeWidth="2.5" strokeDasharray="9 9" strokeLinecap="round" opacity=".75" />
          {[[765, 172], [1018, 54], [1396, 147], [1536, 277]].map(([cx, cy]) => (
            <circle key={cx} cx={cx} cy={cy} r="6" fill="#fff" stroke="#5B5BEA" strokeWidth="2.5" />
          ))}
        </svg>

        {/* app tiles */}
        {APPS.map((a, i) => (
          <div key={a.key} className="evi-app" style={{ left: a.x, top: a.y }}>
            {playing && (
              <span
                key={cycle}
                className="evi-app-glow"
                style={{ animationDelay: `${RIDE.at + RIDE.dur * APP_AT[i] - 0.15}s` }}
              />
            )}
            <span
              key={`b${cycle}`}
              className={playing ? "evi-app-body lift" : "evi-app-body"}
              style={{ animationDelay: `${RIDE.at + RIDE.dur * APP_AT[i] - 0.15}s` }}
            >
              <ProductBadge productKey={a.key} size={64} />
              <span>{a.name}</span>
            </span>
          </div>
        ))}
        {playing && (
          <span key={`p${cycle}`} className="evi-packet" style={{ offsetPath: `path('${ARC}')`, animationDelay: `${RIDE.at}s`, animationDuration: `${RIDE.dur}s` } as CSSProperties} />
        )}

        {/* the EVI window */}
        <div className="evi-window">
          <aside className="evi-side">
            {/* the swirl from the EVOQ wordmark, cropped to its square */}
            <span className="evi-logo" />
            <span className="evi-nav on"><Ic d={I.home} size={34} /></span>
            <span className="evi-nav"><Ic d={I.layers} size={34} color={INK} /></span>
            <span className="evi-nav"><Ic d={I.grid} size={34} color={INK} /></span>
            <span className="evi-nav"><Ic d={I.chart} size={34} color={INK} /></span>
            <span className="evi-nav"><Ic d={I.gear} size={34} color={INK} /></span>
          </aside>
          <div className="evi-main">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/team/growth-right.jpg" alt="" className="evi-me" />
            <h3 className="evi-h">How can I help you today?</h3>
            <div className={`evi-input${shown > 0 ? " typing" : ""}`}>
              <div className="evi-q">
                {shown === 0 ? <span className="evi-ph">Ask a question or describe what you need…</span> : QUESTION.slice(0, shown)}
                {!still && shown > 0 && shown < QUESTION.length && <i className="evi-caret" />}
              </div>
              <div className="evi-tools">
                <Ic d={I.clip} size={30} /><Ic d={I.at} size={30} /><Ic d={I.globe} size={30} />
                <motion.span
                  key={`s${cycle}`}
                  className="evi-send"
                  {...(playing ? { animate: { scale: [1, 1, 1.25, 1] }, transition: { duration: 2.9, times: [0, 0.86, 0.93, 1] } } : {})}
                >
                  <Ic d={I.send} size={32} />
                </motion.span>
              </div>
            </div>
            <div className="evi-chips">
              <span className="evi-chip"><Ic d={I.search} size={24} />Find information</span>
              <span className="evi-chip"><Ic d={I.file} size={24} />Summarize activity</span>
              <span className="evi-chip">
                <motion.span key={`c${cycle}`} className="evi-chip-hi" {...life(2.4)} />
                <Ic d={I.play} size={22} /><span style={{ position: "relative" }}>Prepare work</span>
              </span>
            </div>
          </div>
        </div>

        {/* robot + sparkles */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/evoq-ai/evi-robot.webp" alt="" className={`evi-robot${still ? "" : " wave"}`} />
        <Star x={1510} y={510} s={62} color="#1F6BFF" />
        <Star x={1546} y={557} s={34} color="#6C3BF5" />

        {/* follow-up agent card */}
        <div className="evi-card">
          <div className="evi-card-h">
            <span className="evi-card-ic"><Ic d={I.rocket} size={28} color="#fff" w={2} /></span>
            <b>Follow-up agent</b>
            <span className="evi-more"><i /><i /><i /></span>
          </div>
          <div key={`r${cycle}`} className="evi-rows">
            {ROWS.map((r) => (
              <motion.div key={r.text} className={`evi-row ${r.kind}`} {...life(r.at, still ? {} : { y: [8, 0, 0, 0] })}>
                <span className="evi-row-ic">
                  {r.kind === "ok"
                    ? <svg width="20" height="20" viewBox="0 0 16 16" fill="none"><path d="M3.5 8.4l3 3 6-6.4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    : <b>!</b>}
                </span>
                {r.text}
              </motion.div>
            ))}
          </div>
          <div className="evi-card-rule" />
          <motion.span key={`v${cycle}`} className="evi-view" {...life(6.4)}>
            View details <Ic d={I.arrow} size={24} w={2.2} />
          </motion.span>
        </div>
      </div>
    </div>
  );
}
