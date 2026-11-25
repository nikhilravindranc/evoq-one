import type { ReactNode } from "react";
import { CORAL, INK, MINT } from "./palette";

/* The pipeline illustration used in the home page hero: stages that rise, with the real faces of the people who own each deal. */

const FONT = "var(--font-display), system-ui, sans-serif";
const AV = (k: string) => `/crm/a-${k}.webp`;

function Svg({ id, label, slice = false, decorative = false, children }: { id: string; label: string; slice?: boolean; decorative?: boolean; children: ReactNode }) {
  return (
    <svg viewBox="0 0 600 420" preserveAspectRatio={slice ? "xMidYMid slice" : "xMidYMid meet"} role={decorative ? undefined : "img"} aria-label={decorative ? undefined : label} aria-hidden={decorative ? true : undefined} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id={`sh-${id}`} x="-25%" y="-25%" width="150%" height="160%">
          <feDropShadow dx="0" dy="10" stdDeviation="9" floodColor={INK} floodOpacity=".2" />
        </filter>
        <clipPath id={`cp-${id}`} clipPathUnits="objectBoundingBox"><circle cx=".5" cy=".5" r=".5" /></clipPath>
      </defs>
      {children}
    </svg>
  );
}

function Face({ id, x, y, r, k, ring = "#fff", w = 3.5, shadow = true, badge }: { id: string; x: number; y: number; r: number; k: string; ring?: string; w?: number; shadow?: boolean; badge?: "check" | "clock" }) {
  return (
    <g filter={shadow ? `url(#sh-${id})` : undefined}>
      <circle cx={x} cy={y} r={r + w} fill={ring} />
      <image href={AV(k)} x={x - r} y={y - r} width={r * 2} height={r * 2} clipPath={`url(#cp-${id})`} preserveAspectRatio="xMidYMid slice" />
      {badge && (
        <g>
          <circle cx={x + r * 0.72} cy={y + r * 0.72} r={r * 0.42 + 1.5} fill="#fff" />
          <circle cx={x + r * 0.72} cy={y + r * 0.72} r={r * 0.42} fill={badge === "check" ? MINT : CORAL} />
          {badge === "check" ? (
            <path d={`M${x + r * 0.72 - r * 0.18} ${y + r * 0.72}l${r * 0.14} ${r * 0.14}l${r * 0.26} -${r * 0.3}`} fill="none" stroke="#fff" strokeWidth={Math.max(1.6, r * 0.1)} strokeLinecap="round" strokeLinejoin="round" />
          ) : (
            <path d={`M${x + r * 0.72} ${y + r * 0.72 - r * 0.2}v${r * 0.22}l${r * 0.16} ${r * 0.1}`} fill="none" stroke="#fff" strokeWidth={Math.max(1.6, r * 0.1)} strokeLinecap="round" strokeLinejoin="round" />
          )}
        </g>
      )}
    </g>
  );
}

/* 2. Leads & Pipeline: stages that rise, with the people who own each deal and one gone quiet */
export function ArtPipeline({ compact = false }: { compact?: boolean }) {
  const id = "pipeline";
  const sh = `url(#sh-${id})`;
  const stages: [string, number, string[]][] = [
    ["Lead", 96, ["laptop", "call"]],
    ["Qualified", 136, ["curly", "man", "teal"]],
    ["Proposal", 176, ["glasses", "dark", "blond"]],
    ["Negotiation", 216, ["smile", "orange"]],
    ["Won", 256, ["phone"]],
  ];
  return (
    <Svg id={id} label="Five pipeline stages rising from lead to won, each deal shown with its owner, one marked as quiet">
      {stages.map(([name, h, owners], i) => {
        const x = 70 + i * 98;
        const y = 334 - h;
        return (
          <g key={name}>
            <rect x={x} y={y} width="78" height={h} rx="20" fill="#fff" filter={sh} />
            {owners.map((k, n) => {
              const quiet = (i === 1 && n === 0) || (i === 2 && n === 1);
              return <Face key={k} id={id} x={x + (n % 2 ? 54 : 24)} y={y + 28 + Math.floor(n / 2) * 32} r={13} k={k} shadow={false} w={2.5} ring={quiet ? CORAL : i === 4 ? MINT : "#fff"} badge={quiet ? "clock" : i === 4 ? "check" : undefined} />;
            })}
            {!compact && <text x={x + 39} y="362" textAnchor="middle" fontSize="13" fontWeight="600" fill={INK} style={{ fontFamily: FONT }}>{name}</text>}
          </g>
        );
      })}
      <path d="M92 150C200 60 330 60 452 90" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 9" />
      <path d="M440 78l18 12l-20 8" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <Face id={id} x={78} y={156} r={22} k="laptop" w={4} />
    </Svg>
  );
}
