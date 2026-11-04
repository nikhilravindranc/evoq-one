"use client";

import type { KeyboardEvent } from "react";
import { SPACE_IMG } from "./ui";

/* A 2D floor plan of one office level, drawn like an architectural plan: thick outer walls, door swings,
   window breaks, furniture (tables, chairs, desks, stairs, lift) and room tints for status. Used by the
   hero booking tool and by the floor plan tab. Rooms are real buttons. Sample building. */

export type RoomId = "board" | "m3" | "m4" | "fa" | "fb" | "train" | "quiet";
export type PlanState = "free" | "busy" | "approval" | "pending" | "mine";
export type PlanRoom = {
  id: RoomId; name: string; short: string; meta: string; seats: number; approval: boolean; img: string;
  x: number; y: number; w: number; h: number; busy: [number, number][];
};

export const PLAN_ROOMS: PlanRoom[] = [
  { id: "board", short: "Board Room", name: "Board Room", meta: "12 seats · Display and video call kit", seats: 12, approval: false, img: SPACE_IMG.board, x: 20, y: 20, w: 230, h: 194, busy: [[10, 12]] },
  { id: "m3", short: "Meeting 3", name: "Meeting Room 3", meta: "6 seats · Whiteboard", seats: 6, approval: false, img: SPACE_IMG.glass, x: 250, y: 20, w: 140, h: 194, busy: [[9, 13.5]] },
  { id: "m4", short: "Meeting 4", name: "Meeting Room 4", meta: "6 seats · Display", seats: 6, approval: false, img: SPACE_IMG.corridor, x: 390, y: 20, w: 140, h: 194, busy: [[14, 16]] },
  { id: "fa", short: "Focus A", name: "Focus Room A", meta: "2 seats · Phone calls", seats: 2, approval: false, img: SPACE_IMG.lounge, x: 530, y: 20, w: 100, h: 194, busy: [[8, 10], [13, 15]] },
  { id: "fb", short: "Focus B", name: "Focus Room B", meta: "2 seats · Sofa", seats: 2, approval: false, img: SPACE_IMG.glass, x: 630, y: 20, w: 110, h: 194, busy: [] },
  { id: "train", short: "Training Room 2", name: "Training Room 2", meta: "24 seats · Projector · Classroom layout", seats: 24, approval: true, img: SPACE_IMG.training, x: 20, y: 262, w: 280, h: 198, busy: [[9, 11]] },
  { id: "quiet", short: "Quiet Room", name: "Quiet Room", meta: "8 seats · Soft seating", seats: 8, approval: false, img: SPACE_IMG.lounge, x: 300, y: 262, w: 120, h: 198, busy: [[15, 17]] },
];

/* the state of every room at a time, before any booking the visitor makes */
export function stateAt(r: PlanRoom, t: number): PlanState {
  if (r.busy.some(([a, b]) => t >= a && t < b)) return "busy";
  return r.approval ? "approval" : "free";
}

const INK = "#4A3228";
const LINE = "#A89B8E";
const WOOD = "#F3EFE4";

const FILL: Record<PlanState, string> = {
  free: "rgba(120,190,150,.2)",
  busy: "rgba(217,185,140,.55)",
  approval: "rgba(120,190,150,.2)",
  pending: "rgba(232,170,80,.4)",
  mine: "rgba(180,88,58,.42)",
};

const Chair = ({ x, y }: { x: number; y: number }) => <rect x={x - 4} y={y - 4} width="8" height="8" rx="2.6" fill="#fff" stroke={LINE} strokeWidth=".9" />;
const Table = ({ x, y, w, h, r = 4 }: { x: number; y: number; w: number; h: number; r?: number }) => <rect x={x} y={y} width={w} height={h} rx={r} fill={WOOD} stroke={LINE} strokeWidth="1" />;
const Plant = ({ x, y, r = 7 }: { x: number; y: number; r?: number }) => (
  <g>
    <circle cx={x} cy={y} r={r} fill="#CFE3D4" stroke="#7FA38A" strokeWidth=".9" />
    <circle cx={x} cy={y} r={r * 0.45} fill="#9BC4A7" />
  </g>
);

/* a door in a horizontal wall: opening, leaf and swing */
function Door({ x, y, down = true }: { x: number; y: number; down?: boolean }) {
  const dy = down ? 1 : -1;
  return (
    <g>
      <rect x={x} y={y - 2.5} width="28" height="5" fill="#FBF7F1" />
      <line x1={x} y1={y} x2={x} y2={y + dy * 28} stroke={INK} strokeWidth="1.2" />
      <path d={`M${x} ${y + dy * 28} A28 28 0 0 ${down ? 0 : 1} ${x + 28} ${y}`} fill="none" stroke={LINE} strokeWidth=".9" strokeDasharray="2.5 2.5" />
    </g>
  );
}
/* a window break in a wall: a gap with two thin panes */
function WinH({ x, y, w }: { x: number; y: number; w: number }) {
  return (
    <g>
      <rect x={x} y={y - 3.2} width={w} height="6.4" fill="#FBF7F1" />
      <line x1={x} y1={y - 1.6} x2={x + w} y2={y - 1.6} stroke={INK} strokeWidth=".9" />
      <line x1={x} y1={y + 1.6} x2={x + w} y2={y + 1.6} stroke={INK} strokeWidth=".9" />
    </g>
  );
}
function WinV({ x, y, h }: { x: number; y: number; h: number }) {
  return (
    <g>
      <rect x={x - 3.2} y={y} width="6.4" height={h} fill="#FBF7F1" />
      <line x1={x - 1.6} y1={y} x2={x - 1.6} y2={y + h} stroke={INK} strokeWidth=".9" />
      <line x1={x + 1.6} y1={y} x2={x + 1.6} y2={y + h} stroke={INK} strokeWidth=".9" />
    </g>
  );
}

export function PlanMap({ status, selected, onSelect, label = true }: {
  status: Partial<Record<RoomId, PlanState>>;
  selected?: RoomId | null;
  onSelect?: (id: RoomId) => void;
  label?: boolean;
}) {
  const key = (id: RoomId) => (e: KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect?.(id); } };
  return (
    <svg className="pm" viewBox="0 0 760 482" role="group" aria-label="Floor plan, Level 1">
      <defs>
        <pattern id="pmHatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="7" stroke="rgba(180,88,58,.5)" strokeWidth="1.3" />
        </pattern>
        <pattern id="pmCore" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(110,51,32,.14)" strokeWidth="1" />
        </pattern>
      </defs>

      <rect x="0" y="0" width="760" height="482" fill="#FBF7F1" />

      {/* room tints */}
      {PLAN_ROOMS.map((r) => {
        const st = status[r.id] ?? stateAt(r, 13);
        return (
          <g key={r.id}>
            <rect x={r.x} y={r.y} width={r.w} height={r.h} fill={FILL[st]} />
            {(st === "approval" || st === "pending") && <rect x={r.x} y={r.y} width={r.w} height={r.h} fill="url(#pmHatch)" />}
          </g>
        );
      })}
      {/* corridor, desk zone and core */}
      <rect x="20" y="214" width="720" height="48" fill="#F4F1E8" />
      <rect x="420" y="262" width="220" height="198" fill="rgba(217,185,140,.08)" />
      <rect x="640" y="262" width="100" height="198" fill="url(#pmCore)" />

      {/* walls */}
      <g fill="none" stroke={INK} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round">
        <path d="M250 20V214M390 20V214M530 20V214M630 20V214" />
        <path d="M20 214H740M20 262H740" />
        <path d="M300 262V460M420 262V460M640 262V460" />
        <path d="M650 350H730M690 350V460" strokeWidth="1.6" />
      </g>
      {/* doors */}
      <Door x={121} y={214} down={false} />
      <Door x={306} y={214} down={false} />
      <Door x={446} y={214} down={false} />
      <Door x={566} y={214} down={false} />
      <Door x={671} y={214} down={false} />
      <Door x={146} y={262} />
      <Door x={346} y={262} />
      <Door x={666} y={262} />

      {/* exterior wall with window breaks */}
      <rect x="20" y="20" width="720" height="440" fill="none" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
      {[70, 160, 275, 330, 420, 480, 556, 590, 660, 705].map((x, i) => <WinH key={`wt${i}`} x={x} y={20} w={i % 2 ? 26 : 38} />)}
      {[60, 140, 330, 400].map((x, i) => <WinH key={`wb${i}`} x={x} y={460} w={44} />)}
      {[460, 520, 600].map((x, i) => <WinH key={`wb2${i}`} x={x} y={460} w={40} />)}
      {[70, 140].map((y, i) => <WinV key={`wl${i}`} x={20} y={y} h={36} />)}
      {[300, 380].map((y, i) => <WinV key={`wl2${i}`} x={20} y={y} h={44} />)}
      {[60, 120].map((y, i) => <WinV key={`wr${i}`} x={740} y={y} h={34} />)}
      {/* structural columns */}
      {[[250, 238], [390, 238], [530, 238], [640, 238]].map(([x, y]) => <rect key={`${x}`} x={x - 4} y={y - 4} width="8" height="8" fill={INK} />)}

      {/* Board Room */}
      <rect x="40" y="24" width="60" height="5" fill="#3F281D" opacity=".75" />
      <Table x={72} y={86} w={128} h={44} r={8} />
      {[0, 1, 2, 3, 4].map((i) => <g key={i}><Chair x={86 + i * 26} y={78} /><Chair x={86 + i * 26} y={138} /></g>)}
      <Chair x={64} y={108} /><Chair x={208} y={108} />
      <Plant x={36} y={190} /><Plant x={236} y={36} r={6} />

      {/* Meeting Room 3: round table */}
      <circle cx="320" cy="112" r="26" fill={WOOD} stroke={LINE} strokeWidth="1" />
      {[0, 1, 2, 3, 4, 5].map((i) => { const a = (i / 6) * Math.PI * 2 - Math.PI / 2; return <Chair key={i} x={320 + Math.cos(a) * 38} y={112 + Math.sin(a) * 38} />; })}
      <rect x="270" y="24" width="3" height="40" fill="#3F281D" opacity=".6" />

      {/* Meeting Room 4 */}
      <Table x={430} y={92} w={80} h={36} />
      {[0, 1, 2].map((i) => <g key={i}><Chair x={444 + i * 26} y={84} /><Chair x={444 + i * 26} y={136} /></g>)}
      <rect x="440" y="24" width="60" height="5" fill="#3F281D" opacity=".75" />

      {/* Focus Rooms */}
      <Table x={544} y={44} w={72} h={24} /><Chair x={580} y={80} />
      <rect x="560" y="46" width="22" height="3" fill="#3F281D" opacity=".6" />
      <Table x={644} y={44} w={72} h={24} /><Chair x={680} y={80} />
      <rect x="652" y="150" width="54" height="22" rx="9" fill="#fff" stroke={LINE} strokeWidth="1" /><rect x="652" y="144" width="54" height="8" rx="4" fill="#EFEADB" stroke={LINE} strokeWidth="1" />
      <Plant x={722} y={192} r={6} />

      {/* Training Room 2: classroom */}
      <rect x="60" y="268" width="200" height="4" fill="#3F281D" opacity=".75" />
      <rect x="132" y="276" width="14" height="8" rx="2" fill="#fff" stroke={LINE} strokeWidth=".9" />
      {[0, 1, 2].map((row) => [0, 1, 2].map((col) => (
        <g key={`${row}${col}`}>
          <Table x={40 + col * 86} y={316 + row * 44} w={70} h={20} r={3} />
          <Chair x={59 + col * 86} y={346 + row * 44} /><Chair x={91 + col * 86} y={346 + row * 44} />
        </g>
      )))}

      {/* Quiet Room */}
      <rect x="316" y="338" width="30" height="30" rx="9" fill="#fff" stroke={LINE} strokeWidth="1" />
      <rect x="372" y="338" width="30" height="30" rx="9" fill="#fff" stroke={LINE} strokeWidth="1" />
      <circle cx="359" cy="392" r="11" fill={WOOD} stroke={LINE} strokeWidth="1" />
      <Plant x={404} y={442} /><Plant x={318} y={442} r={6} />

      {/* open desks */}
      <rect x="430" y="272" width="200" height="180" rx="6" fill="none" stroke={LINE} strokeWidth="1" strokeDasharray="4 4" />
      {[0, 1, 2, 3].map((row) => [0, 1, 2, 3].map((col) => (
        <g key={`${row}${col}`}>
          <Table x={446 + col * 46} y={290 + row * 38} w={34} h={16} r={2} />
          <Chair x={463 + col * 46} y={320 + row * 38} />
        </g>
      )))}

      {/* core: stairs, lift, restrooms */}
      {Array.from({ length: 8 }, (_, i) => <line key={i} x1="652" y1={274 + i * 8} x2="690" y2={274 + i * 8} stroke={INK} strokeWidth=".9" />)}
      <rect x="652" y="272" width="38" height="64" fill="none" stroke={INK} strokeWidth="1.2" />
      <rect x="702" y="272" width="30" height="30" fill="none" stroke={INK} strokeWidth="1.2" />
      <path d="M702 272L732 302M732 272L702 302" stroke={INK} strokeWidth=".9" />
      <circle cx="670" cy="400" r="9" fill="#fff" stroke={LINE} strokeWidth="1" /><circle cx="710" cy="400" r="9" fill="#fff" stroke={LINE} strokeWidth="1" />

      {/* reception */}
      <Table x={34} y={226} w={84} h={16} r={3} />
      <rect x="150" y="226" width="64" height="24" rx="9" fill="#fff" stroke={LINE} strokeWidth="1" />
      <Plant x={236} y={238} r={6} />

      {/* labels */}
      {label && (
        <g fontFamily="var(--font-sans), system-ui, sans-serif" fill={INK}>
          {PLAN_ROOMS.map((r) => {
            const top = r.y < 200;
            const ly = top ? r.y + r.h - 24 : r.y + 22;
            return (
              <g key={r.id}>
                <text x={r.x + 10} y={ly} style={{ fontSize: "calc(11.5px * var(--pm-ls, 1))" }} fontWeight="700">{r.short}</text>
                <text className="pm-seats" x={r.x + 10} y={ly + 12.5} fontSize="9" fill="#7A6A60">{r.seats} seats</text>
              </g>
            );
          })}
          <text x="430" y="445" fontSize="9" fill="#7A6A60" fontWeight="600">Open desks</text>
          <text x="124" y="241" fontSize="9" fill="#7A6A60" fontWeight="600" textAnchor="start">Reception</text>
          <text x="652" y="452" fontSize="8.5" fill="#7A6A60" fontWeight="600">WC</text>
          <g stroke={INK} strokeWidth="1" fill="none"><path d="M644 473H740M644 470V476M740 470V476M692 471V475" /></g>
          <text x="602" y="476" fontSize="8" fill="#7A6A60">0 to 5 m</text>
        </g>
      )}

      {/* hit areas */}
      {PLAN_ROOMS.map((r) => (
        <g key={`h${r.id}`}>
          <rect
            className={`pm-hit${selected === r.id ? " on" : ""}`}
            x={r.x + 2} y={r.y + 2} width={r.w - 4} height={r.h - 4}
            role="button" tabIndex={onSelect ? 0 : -1}
            aria-label={`${r.name}, ${r.seats} seats`} aria-pressed={selected === r.id}
            onClick={() => onSelect?.(r.id)} onKeyDown={key(r.id)}
          />
        </g>
      ))}
    </svg>
  );
}

export const PM_CSS = `
  .pm{width:100%;height:auto;display:block;border-radius:10px}
  @media (max-width:560px){.pm{--pm-ls:1.55;--pm-seats:none}}
  .pm-seats{display:var(--pm-seats,block)}
  .pm-hit{fill:transparent;cursor:pointer;stroke:transparent;stroke-width:3;transition:fill .15s ease}
  .pm-hit:hover{fill:rgba(180,88,58,.1)}
  .pm-hit.on{stroke:#6E3320;fill:rgba(180,88,58,.06)}
  .pm-hit:focus-visible{outline:none;stroke:#D9B98C;stroke-width:4}
`;
