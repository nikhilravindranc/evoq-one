"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ProductBadge } from "@/components/shared/ProductBadge";
import { ALL_APPS, ALL_STEPS, APPS, PICK, type AppKey, type Solution } from "./solutionsData";

/* The right side of the Solutions section, after Monday's "Get more done with agents".
   Industry tabs: the solution's apps line up as cards, dock into the sidebar of an EVOQ window, and a board fills
   app by app while EVI's panel ticks off a step for each. "All industries" shows every app by team, and EVI
   points to where to start. Drawn on a fixed 680x500 canvas and scaled to the column; narrow columns get a
   stacked version without the board. */

const W = 680, H = 500;
const ease = [0.22, 1, 0.36, 1] as const;
const GREEN = "#1FA971", AMBER = "#E8A21B";

export function AppIcon({ app, size }: { app: AppKey; size: number }) {
  const a = APPS[app];
  if (a.badge) return <ProductBadge productKey={a.badge} size={size} />;
  return (
    <span style={{ width: size, height: size, borderRadius: Math.round(size * 0.32), background: a.tint, display: "grid", placeItems: "center", flexShrink: 0 }}>
      <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d={a.glyph} stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/* The beats, in seconds, for a board with `n` apps and a request of `chars` characters. */
function beats(n: number, chars: number, all: boolean) {
  if (all) {
    const req = 1.9, s0 = req + chars / 30 + 0.4;
    return { out: 0, board: 0.15, req, s0, step: 0.75, end: s0 + 3 * 0.75 + 0.2, loop: s0 + 3 * 0.75 + 3.4 };
  }
  const out = 1.5 + n * 0.12 + 0.9, board = out + 0.35, req = board + 0.3, s0 = req + chars / 30 + 0.4, step = 0.72;
  const end = s0 + n * step + 0.2;
  return { out, board, req, s0, step, end, loop: end + 2.6 };
}

/* Seconds into the loop; `onLoop` runs each time it completes. Reduced motion holds the finished board. */
function useLoop(loop: number, still: number, onLoop?: () => void) {
  const reduce = !!useReducedMotion();
  const [t, setT] = useState(reduce ? still : 0);
  const cb = useRef(onLoop);
  useEffect(() => { cb.current = onLoop; }, [onLoop]);
  useEffect(() => {
    if (reduce) return;
    let start = performance.now();
    let raf = 0;
    const tick = () => {
      const s = (performance.now() - start) / 1000;
      if (s >= loop) { start = performance.now(); cb.current?.(); }
      setT(Math.floor(Math.min(s, loop) * 20) / 20);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce, loop]);
  return { t, reduce };
}

/* Scales the fixed canvas to the column width; below 540px it reports narrow. */
function useFit() {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState<number | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return { ref, w };
}

const Tick = ({ c = GREEN, s = 14 }: { c?: string; s?: number }) => (
  <span style={{ width: s, height: s, borderRadius: "50%", background: c, display: "grid", placeItems: "center", flexShrink: 0 }}>
    <svg width={s * 0.6} height={s * 0.6} viewBox="0 0 16 16" fill="none"><path d="M3 8.5 6.5 12 13 4.5" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  </span>
);
const Spin = () => <span aria-hidden className="sa-spin" />;

function Cell({ v, on, c }: { v: string; on: boolean; c: string }) {
  const warn = v.startsWith("!");
  return (
    <motion.span
      className="sa-cell"
      initial={false}
      animate={{ backgroundColor: on ? (warn ? AMBER : GREEN) : "#F0F1F5", color: on ? "#fff" : "rgba(0,0,0,0)", scale: on ? [0.86, 1.06, 1] : 1 }}
      transition={{ duration: 0.4, ease }}
      style={{ "--sol-c": c } as CSSProperties}
    >
      {warn ? v.slice(1) : v}
    </motion.span>
  );
}

/* EVI's panel: the request, then a step per app, then the result. */
function Panel({ s, t, b, steps, icons, reduce }: { s: Solution; t: number; b: ReturnType<typeof beats>; steps: string[]; icons: (AppKey | null)[]; reduce: boolean }) {
  const typedN = reduce ? s.request.length : Math.max(0, Math.min(s.request.length, Math.floor((t - b.req) * 30)));
  return (
    <div className="sa-panel">
      <div className="sa-panel-h">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/characters/evi.webp" alt="" className="sa-evi" />
        <b>EVI</b>
        <span>AI agent</span>
      </div>
      <motion.div className="sa-ask" initial={false} animate={{ opacity: t >= b.req ? 1 : 0, y: t >= b.req ? 0 : 6 }} transition={{ duration: 0.35, ease }}>
        <span>{s.request.slice(0, typedN)}{typedN < s.request.length && <i className="sa-caret" />}</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/characters/${s.person}.webp`} alt="" />
      </motion.div>
      <div className="sa-steps">
        {steps.map((st, k) => {
          const start = b.s0 + k * b.step, done = t >= start + b.step * 0.8;
          return (
            <motion.div key={st} className="sa-step" initial={false} animate={{ opacity: t >= start ? 1 : 0, x: t >= start ? 0 : 8 }} transition={{ duration: 0.3, ease }}>
              {icons[k] ? <AppIcon app={icons[k]!} size={16} /> : <span className="sa-dot" />}
              <span className="sa-step-t">{st}</span>
              {done ? <Tick s={13} /> : <Spin />}
            </motion.div>
          );
        })}
      </div>
      <motion.div className="sa-done" initial={false} animate={{ opacity: t >= b.end ? 1 : 0, y: t >= b.end ? 0 : 8, scale: t >= b.end ? 1 : 0.96 }} transition={{ duration: 0.4, ease }} style={{ background: s.key === "all" ? s.soft : "#E7F7EE", color: s.key === "all" ? s.color : "#167A43" }}>
        <Tick c={s.key === "all" ? s.color : GREEN} s={15} />
        {s.done}
      </motion.div>
    </div>
  );
}

function Window({ s, t, b, sideApps, children }: { s: Solution; t: number; b: ReturnType<typeof beats>; sideApps: AppKey[]; children: ReactNode }) {
  return (
    <div className="sa-frame">
      <div className="sa-window">
        <div className="sa-side">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/symbol-color.png" alt="" className="sa-logo" />
          {sideApps.map((a, i) => {
            const on = t >= b.out + 0.1 + i * 0.06;
            return (
              <motion.span key={a} initial={false} animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.4 }} transition={{ duration: 0.35, ease }}>
                <AppIcon app={a} size={24} />
              </motion.span>
            );
          })}
        </div>
        <div className="sa-main">
          <div className="sa-top">
            <b>{s.place}</b>
            <span className="sa-tabs"><em style={{ borderColor: s.color, color: s.color }}>Main table</em><em>Kanban</em></span>
            <span className="sa-count" style={{ background: s.soft, color: s.color }}>{s.key === "all" ? "13 apps" : `${s.rows.length} apps`}</span>
          </div>
          <div className="sa-body">{children}</div>
        </div>
      </div>
    </div>
  );
}

function IndustryCanvas({ s, t, b, reduce }: { s: Solution; t: number; b: ReturnType<typeof beats>; reduce: boolean }) {
  const lineup = t < b.out;
  const active = s.rows.findIndex((_, k) => t >= b.s0 + k * b.step && t < b.s0 + (k + 1) * b.step);
  return (
    <Window s={s} t={t} b={b} sideApps={s.rows.map((r) => r.app)}>
      {/* the apps line up first */}
      <motion.div className="sa-lineup" initial={false} animate={{ opacity: lineup ? 1 : 0, scale: lineup ? 1 : 0.95 }} transition={{ duration: 0.4, ease }}>
        {s.rows.map((r, i) => {
          const on = t >= 0.2 + i * 0.12;
          return (
            <motion.div key={r.app} className="sa-card" initial={false} animate={{ opacity: on ? 1 : 0, y: on ? 0 : 18, scale: on ? 1 : 0.92 }} transition={{ duration: 0.45, ease }} style={{ background: `linear-gradient(170deg, ${s.soft}, #fff 78%)` }}>
              <AppIcon app={r.app} size={46} />
              <b>{APPS[r.app].name}</b>
              <span>{r.job}</span>
            </motion.div>
          );
        })}
      </motion.div>

      {/* then the board and EVI */}
      <motion.div className="sa-work" initial={false} animate={{ opacity: t >= b.board ? 1 : 0 }} transition={{ duration: 0.4, ease }}>
        <div className="sa-board">
          <div className="sa-th">
            <span>App</span>
            {s.records.map((rec) => <span key={rec} className="sa-rec"><i style={{ background: s.soft, color: s.color }}>{rec[0]}</i>{rec}</span>)}
          </div>
          {s.rows.map((r, k) => {
            const start = b.s0 + k * b.step;
            return (
              <motion.div key={r.app} className="sa-tr" initial={false} animate={{ opacity: t >= b.board + k * 0.05 ? 1 : 0, backgroundColor: active === k ? s.soft : "rgba(255,255,255,0)" }} transition={{ duration: 0.3 }}>
                <span className="sa-app"><AppIcon app={r.app} size={20} /><span><b>{APPS[r.app].name}</b><em>{r.job}</em></span></span>
                {r.cells.map((v, j) => <span key={j} className="sa-td"><Cell v={v} on={t >= start + 0.22 + j * 0.12} c={s.color} /></span>)}
              </motion.div>
            );
          })}
          {/* EVI's marker on the row being worked */}
          {!reduce && (
            <motion.span className="sa-marker" initial={false} animate={{ opacity: active >= 0 ? 1 : 0, top: 30 + Math.max(active, 0) * 40 + 9 }} transition={{ top: { duration: 0.45, ease }, opacity: { duration: 0.25 } }}>
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none"><path d="M3 2.5 15.5 8.8 9.8 10.3 8 16.2 3 2.5Z" fill={s.color} stroke="#fff" strokeWidth="1.3" strokeLinejoin="round" /></svg>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/characters/evi.webp" alt="" />
            </motion.span>
          )}
        </div>
        <Panel s={s} t={t} b={b} steps={s.rows.map((r) => r.step)} icons={s.rows.map((r) => r.app)} reduce={reduce} />
      </motion.div>
    </Window>
  );
}

function AllCanvas({ s, t, b, reduce }: { s: Solution; t: number; b: ReturnType<typeof beats>; reduce: boolean }) {
  const picked = t >= b.end;
  let i = 0;
  return (
    <Window s={s} t={t} b={{ ...b, out: -1 }} sideApps={[]}>
      <div className="sa-work" style={{ opacity: 1 }}>
        <div className="sa-board sa-teams">
          {ALL_APPS.map((g) => (
            <div key={g.team} className="sa-team">
              <span className="sa-team-k">{g.team}</span>
              <div className="sa-team-apps">
                {g.apps.map((a) => {
                  const on = t >= 0.2 + i++ * 0.08;
                  const pick = picked && PICK.includes(a);
                  return (
                    <motion.span key={a} className="sa-tile" initial={false} animate={{ opacity: on ? (picked && !pick ? 0.45 : 1) : 0, y: on ? 0 : 10, boxShadow: pick ? `0 0 0 2px ${s.color}, 0 10px 22px -12px rgba(20,24,60,.6)` : "0 0 0 1px rgba(31,36,48,.07), 0 6px 14px -10px rgba(20,24,60,.4)" }} transition={{ duration: 0.4, ease }}>
                      <AppIcon app={a} size={26} />
                      <b>{APPS[a].name}</b>
                    </motion.span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <Panel s={s} t={t} b={b} steps={ALL_STEPS} icons={[null, null, null]} reduce={reduce} />
      </div>
    </Window>
  );
}

/* Stacked version for narrow columns: the apps, then EVI's finished steps. */
function Narrow({ s }: { s: Solution }) {
  const apps: { app: AppKey; job?: string }[] = s.key === "all" ? ALL_APPS.flatMap((g) => g.apps.map((app) => ({ app, job: g.team }))) : s.rows;
  const steps = s.key === "all" ? ALL_STEPS : s.rows.map((r) => r.step);
  return (
    <div className="sa-narrow">
      <div className="sa-narrow-apps">
        {apps.map((a, i) => (
          <motion.span key={a.app} className="sa-narrow-app" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.05 * i, ease }}>
            <AppIcon app={a.app} size={28} />
            <span><b>{APPS[a.app].name}</b><em>{a.job}</em></span>
          </motion.span>
        ))}
      </div>
      <div className="sa-narrow-evi">
        <div className="sa-panel-h">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/characters/evi.webp" alt="" className="sa-evi" />
          <b>EVI</b>
          <span>{s.request}</span>
        </div>
        <div className="sa-narrow-steps">
          {steps.map((st) => <span key={st}><Tick s={13} />{st}</span>)}
        </div>
        <div className="sa-done" style={{ position: "static", opacity: 1, background: s.key === "all" ? s.soft : "#E7F7EE", color: s.key === "all" ? s.color : "#167A43" }}>
          <Tick c={s.key === "all" ? s.color : GREEN} s={15} />{s.done}
        </div>
      </div>
    </div>
  );
}

export function SolutionApps({ s, onLoop }: { s: Solution; onLoop?: () => void }) {
  const all = s.key === "all";
  const b = beats(s.rows.length, s.request.length, all);
  const { t, reduce } = useLoop(b.loop, b.end + 0.1, onLoop);
  const { ref, w } = useFit();
  const narrow = w !== null && w < 540;
  const scale = w ? Math.min(1, w / W) : 1;
  return (
    <div ref={ref} className="sa-wrap" aria-hidden="true" style={narrow ? undefined : { height: H * scale }}>
      {narrow ? <Narrow s={s} /> : (
        <div className="sa-canvas" style={{ width: W, height: H, transform: `scale(${scale})`, ["--sol-c" as string]: s.color, ["--sol-soft" as string]: s.soft } as CSSProperties}>
          {all ? <AllCanvas s={s} t={t} b={b} reduce={reduce} /> : <IndustryCanvas s={s} t={t} b={b} reduce={reduce} />}
        </div>
      )}
    </div>
  );
}
