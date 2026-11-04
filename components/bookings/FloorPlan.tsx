/* Architectural line drawing of a small floor: walls, door swings, tables and chairs.
   Used as a supporting layer behind photos and booking UI. Rooms can be tinted by state.
   Illustrative; not a real building. */

export type RoomState = "free" | "busy" | "sel";

const ROOMS = [
  { id: "a", name: "Focus Room A", x: 20, y: 20, w: 170, h: 140, table: [55, 55, 100, 50], chairs: 6 },
  { id: "b", name: "Meeting Room 3", x: 190, y: 20, w: 190, h: 140, table: [40, 45, 110, 50], chairs: 8 },
  { id: "c", name: "Board Room", x: 380, y: 20, w: 200, h: 140, table: [30, 40, 140, 60], chairs: 10 },
  { id: "d", name: "Prayer Room", x: 20, y: 220, w: 210, h: 160, table: null, chairs: 0 },
  { id: "e", name: "Main Hall", x: 230, y: 220, w: 200, h: 160, table: [30, 40, 140, 80], chairs: 0 },
  { id: "f", name: "Studio 1", x: 430, y: 220, w: 150, h: 160, table: null, chairs: 0 },
] as const;

const FILL: Record<RoomState, string> = { free: "rgba(100,133,109,.16)", busy: "rgba(200,120,90,.16)", sel: "rgba(100,133,109,.32)" };

function chairsAround(x: number, y: number, w: number, h: number, n: number) {
  const out: [number, number][] = [];
  const per = Math.max(1, Math.floor((n - 2) / 2));
  for (let i = 0; i < per; i++) {
    const cx = x + ((i + 1) * w) / (per + 1);
    out.push([cx, y - 9], [cx, y + h + 9]);
  }
  if (n > 2 * per) out.push([x - 9, y + h / 2], [x + w + 9, y + h / 2]);
  return out;
}

export function FloorPlan({ states = {}, fills, labels = true, stroke = "#34483B", paper = "#FFFFFF", className, style }: {
  states?: Partial<Record<(typeof ROOMS)[number]["id"], RoomState>>;
  /** override the room tints, for microsites with their own palette */
  fills?: Partial<Record<RoomState, string>>;
  labels?: boolean;
  stroke?: string;
  /** background colour, used to cut door openings in the walls */
  paper?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg viewBox="0 0 600 400" className={className} style={style} fill="none" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
      {/* rooms */}
      {ROOMS.map((r) => {
        const st = states[r.id];
        const doorX = r.x + r.w / 2 - 14;
        const doorY = r.y < 200 ? r.y + r.h : r.y;
        const sweep = r.y < 200 ? 1 : 0;
        return (
          <g key={r.id}>
            <rect x={r.x} y={r.y} width={r.w} height={r.h} fill={st ? (fills?.[st] ?? FILL[st]) : "none"} strokeWidth={st === "sel" ? 2.4 : 1.4} />
            {/* door opening and swing */}
            <line x1={doorX} y1={doorY} x2={doorX + 28} y2={doorY} stroke={paper} strokeWidth="3" />
            <path d={`M${doorX} ${doorY} A28 28 0 0 ${sweep} ${doorX + 28} ${doorY + (r.y < 200 ? 28 : -28)}`} strokeDasharray="3 3" opacity=".6" />
            <line x1={doorX + 28} y1={doorY} x2={doorX + 28} y2={doorY + (r.y < 200 ? 28 : -28)} opacity=".6" />
            {r.table && <rect x={r.x + r.table[0]} y={r.y + r.table[1]} width={r.table[2]} height={r.table[3]} rx="6" opacity=".7" />}
            {r.table && chairsAround(r.x + r.table[0], r.y + r.table[1], r.table[2], r.table[3], r.chairs).map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r="5" opacity=".55" />)}
            {r.id === "d" && [0, 1, 2].map((row) => [0, 1, 2, 3].map((c) => <rect key={`${row}-${c}`} x={r.x + 34 + c * 38} y={r.y + 34 + row * 34} width="26" height="16" rx="3" opacity=".45" />))}
            {r.id === "e" && [0, 1, 2, 3, 4].map((c) => <line key={c} x1={r.x + 40 + c * 30} y1={r.y + 132} x2={r.x + 40 + c * 30} y2={r.y + 146} opacity=".45" />)}
            {r.id === "f" && [0, 1].map((row) => [0, 1, 2].map((c) => <rect key={`${row}-${c}`} x={r.x + 22 + c * 38} y={r.y + 40 + row * 56} width="28" height="40" rx="4" opacity=".45" />))}
            {labels && <text x={r.x + 10} y={r.y + r.h - 10} fill={stroke} stroke="none" fontSize="11" fontFamily="var(--font-sans), system-ui, sans-serif" opacity=".75">{r.name}</text>}
          </g>
        );
      })}
      {/* corridor and outer wall */}
      <rect x="20" y="20" width="560" height="360" strokeWidth="2.6" />
      <line x1="20" y1="190" x2="580" y2="190" strokeDasharray="2 6" opacity=".4" />
      {/* dimension line */}
      <g opacity=".45">
        <line x1="20" y1="394" x2="580" y2="394" />
        <line x1="20" y1="389" x2="20" y2="399" /><line x1="580" y1="389" x2="580" y2="399" />
      </g>
    </svg>
  );
}
