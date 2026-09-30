"use client";

import { ParticleSphere } from "./ParticleSphere";

const NODES = [
  { label: "Sales", color: "#3B82F6", x: 18, y: 24, lx: 40, ly: 42 },
  { label: "Service", color: "#14B8A6", x: 12, y: 58, lx: 34, ly: 56 },
  { label: "Operations", color: "#8B5CF6", x: 86, y: 16, lx: 62, ly: 36 },
  { label: "Finance", color: "#F59E0B", x: 92, y: 46, lx: 68, ly: 50 },
  { label: "People", color: "#EC4899", x: 88, y: 74, lx: 65, ly: 62 },
];

const DUST = [
  { x: 6, y: 44, s: 10, d: "0s" },
  { x: 30, y: 8, s: 14, d: "0.6s" },
  { x: 96, y: 30, s: 9, d: "1.1s" },
  { x: 82, y: 90, s: 12, d: "0.3s" },
  { x: 46, y: 94, s: 8, d: "0.9s" },
  { x: 4, y: 78, s: 11, d: "1.4s" },
];

export function AIOrbitVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      <style>{`
        @keyframes aiDustFloat {
          0%, 100% { transform: translateY(0); opacity: 0.55; }
          50% { transform: translateY(-10px); opacity: 0.9; }
        }
        @keyframes aiGlowPulse {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
      `}</style>

      {/* soft glassy blob glow behind the sphere */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{
          background: "radial-gradient(circle at 38% 32%, rgba(255,255,255,0.9), rgba(147,197,253,0.55) 35%, rgba(139,92,246,0.4) 62%, rgba(59,130,246,0.15) 85%)",
          animation: "aiGlowPulse 5s ease-in-out infinite",
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[58%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle at 42% 38%, rgba(255,255,255,0.95), rgba(191,219,254,0.5) 45%, transparent 75%)" }}
      />

      {/* particle sphere */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <ParticleSphere size={360} />
      </div>

      {/* connector lines + node labels */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {NODES.map((n) => (
          <line key={n.label} x1={n.x} y1={n.y} x2={n.lx} y2={n.ly} stroke={n.color} strokeOpacity={0.35} strokeWidth={0.35} />
        ))}
      </svg>

      {NODES.map((n) => (
        <div
          key={n.label}
          className="absolute flex items-center gap-2"
          style={{ left: `${n.x}%`, top: `${n.y}%`, transform: "translate(-50%, -50%)" }}
        >
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ background: n.color, boxShadow: `0 0 0 4px ${n.color}22, 0 0 12px ${n.color}` }}
          />
          <span className="whitespace-nowrap rounded-full bg-white/90 px-2.5 py-1 text-[12.5px] font-semibold text-[#182230] shadow-[0_4px_14px_-4px_rgba(16,42,67,0.25)]">
            {n.label}
          </span>
        </div>
      ))}

      {/* floating dust particles */}
      {DUST.map((d, i) => (
        <span
          key={i}
          className="pointer-events-none absolute rounded-full"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.s,
            height: d.s,
            background: "radial-gradient(circle at 35% 30%, #fff, #BFD3F7 55%, transparent 80%)",
            boxShadow: "0 6px 16px -4px rgba(59,130,246,0.4)",
            animation: `aiDustFloat ${3 + i * 0.4}s ease-in-out infinite`,
            animationDelay: d.d,
          }}
        />
      ))}
    </div>
  );
}
