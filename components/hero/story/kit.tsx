"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* Shared pieces for the hero stories (one per tab). Every story follows the same
   grammar, so the cast reads the same way: people are round avatars, while EVI and the
   agents are violet-ringed tiles. What differs per tab is the composition. */

export const CHAR = "/characters";
export const ease = [0.22, 1, 0.36, 1] as const;

export const card: CSSProperties = {
  background: "#fff",
  borderRadius: 16,
  boxShadow: "0 18px 36px -16px rgba(16,20,50,0.45), 0 0 0 1px rgba(16,20,50,0.05)",
};
export const label: CSSProperties = { fontSize: "clamp(9px, 2.1cqw, 11px)", fontWeight: 700, letterSpacing: ".01em" };
export const body: CSSProperties = { fontSize: "clamp(10px, 2.4cqw, 12.5px)", lineHeight: 1.35, color: "#1F2430" };

/* One clock per story. Elapsed time is measured, not counted, so the story is on the right
   beat even if frames were skipped (background tab, slow device). Reduced motion jumps to the end. */
export function useStoryClock(end: number) {
  const reduce = !!useReducedMotion();
  const [t, setT] = useState(reduce ? 99 : 0);
  useEffect(() => {
    if (reduce) return;
    const start = performance.now();
    let raf = 0;
    const tick = () => {
      const s = (performance.now() - start) / 1000;
      setT(Math.floor(s * 40) / 40);
      if (s <= end + 0.6) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce, end]);
  return { t, reduce, at: (s: number) => t >= s };
}

/* The text typed so far, 36 characters a second from `start`. */
export const typed = (text: string, t: number, start = 0.5, cps = 36) => text.slice(0, Math.max(0, Math.floor((t - start) * cps)));

/* Fixed-height frame so the hero does not jump when the tab changes. */
export function Stage({ children }: { children: ReactNode }) {
  return (
    <div style={{ width: "100%", containerType: "inline-size" }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: "88cqw", padding: "0 1cqw" }}>{children}</div>
    </div>
  );
}

/* EVI or an agent: rounded square with a violet ring. `srcs` are poses cross-faded by `pose`. */
export function AgentTile({ srcs, pose = 0, size, glow, style }: { srcs: string[]; pose?: number; size: string; glow?: boolean; style?: CSSProperties }) {
  return (
    <motion.div
      animate={{ boxShadow: glow ? "0 0 0 2.5px #8F7BFF, 0 0 0 6px rgba(255,255,255,0.35), 0 0 34px 6px rgba(160,140,255,0.75)" : "0 0 0 2.5px #8F7BFF, 0 0 0 6px rgba(255,255,255,0.3), 0 0 0 0 rgba(160,140,255,0)" }}
      transition={{ duration: 0.6 }}
      style={{ position: "relative", width: size, aspectRatio: "1 / 1", borderRadius: "26%", overflow: "hidden", background: "#E9E4FF", flexShrink: 0, ...style }}
    >
      {srcs.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <motion.img
          key={src}
          src={src}
          alt=""
          aria-hidden
          initial={false}
          animate={{ opacity: i === pose ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
      ))}
    </motion.div>
  );
}

export function PersonAvatar({ src, size, style }: { src: string; size: string | number; style?: CSSProperties }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" aria-hidden style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", display: "block", flexShrink: 0, boxShadow: "0 0 0 2.5px #fff, 0 8px 18px -8px rgba(16,20,50,0.5)", ...style }} />
  );
}

/* A beat keeps its space but stays hidden until its moment, so nothing jumps. */
export function Beat({ on, children, style, from = 12 }: { on: boolean; children: ReactNode; style?: CSSProperties; from?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: from }} animate={{ opacity: on ? 1 : 0, y: on ? 0 : from }} transition={{ duration: 0.5, ease }} style={style}>
      {children}
    </motion.div>
  );
}

export const Tick = ({ size = 18, color = "#22C55E" }: { size?: number; color?: string }) => (
  <span style={{ width: size, height: size, flexShrink: 0, borderRadius: "50%", background: color, display: "grid", placeItems: "center" }}>
    <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 16 16" fill="none"><path d="M3 8.5 6.5 12 13 4.5" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
  </span>
);

export const Spinner = ({ size = 14 }: { size?: number }) => (
  <span aria-hidden style={{ width: size, height: size, flexShrink: 0, borderRadius: "50%", border: "2px solid rgba(71,71,224,0.2)", borderTopColor: "#4747E0", display: "inline-block", animation: "aqSpin 0.8s linear infinite" }} />
);

/* The pointer that clicks an approval button. `from`/`to` are offsets inside the button's box. */
export function Pointer({ show, from, to, reduce }: { show: boolean; from: [number, number]; to: [number, number]; reduce: boolean }) {
  if (reduce) return null;
  return (
    <motion.svg
      width="18" height="18" viewBox="0 0 20 20" fill="none"
      initial={{ opacity: 0, x: from[0], y: from[1] }}
      animate={show ? { opacity: 1, x: to[0], y: to[1] } : { opacity: 0, x: from[0], y: from[1] }}
      transition={{ duration: 0.9, ease }}
      style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none", zIndex: 3 }}
      aria-hidden
    >
      <path d="M3 2.5 15.5 8.8 9.8 10.3 8 16.2 3 2.5Z" fill="#1F2430" stroke="#fff" strokeWidth="1.1" strokeLinejoin="round" />
    </motion.svg>
  );
}

export function PrimaryButton({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <span style={{ padding: "0 4cqw", display: "inline-grid", placeItems: "center", height: "clamp(22px, 5.6cqw, 28px)", borderRadius: 999, fontSize: "clamp(9.5px, 2.2cqw, 11.5px)", fontWeight: 700, color: "#fff", background: "#4747E0", whiteSpace: "nowrap", ...style }}>{children}</span>;
}
export function GhostButton({ children }: { children: ReactNode }) {
  return <span style={{ padding: "0 3cqw", display: "inline-grid", placeItems: "center", height: "clamp(22px, 5.6cqw, 28px)", borderRadius: 999, fontSize: "clamp(9.5px, 2.2cqw, 11.5px)", fontWeight: 600, color: "#4B5563", boxShadow: "inset 0 0 0 1px #D9DCEA", whiteSpace: "nowrap" }}>{children}</span>;
}

export const Cursor = () => (
  <span style={{ display: "inline-block", width: 1.5, height: "1em", background: "#4747E0", marginLeft: 1, verticalAlign: "-2px", animation: "wcPulse 0.9s ease-in-out infinite" }} />
);
