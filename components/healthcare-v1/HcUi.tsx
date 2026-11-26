/* eslint-disable @next/next/no-img-element */
import { C, ICON } from "./hcData";

/* A product chip: the EVOQ product icon and its name. Practice Management, Surveys and Loyalty have no icon file yet, so they are drawn here. */
const DRAWN: Record<string, { bg: string; path: ReactPath }> = {
  "Practice Management": { bg: "#2064B6", path: "M8 4.5h8M9 3v3M15 3v3M6.5 6.5h11a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 17V8a1.5 1.5 0 0 1 1.5-1.5zM9 13l2 2 4-4" },
  Surveys: { bg: "#0D9488", path: "M8 6.5h8a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 16 17.5H8A1.5 1.5 0 0 1 6.5 16V8A1.5 1.5 0 0 1 8 6.5zM9 12l2 2 4-4" },
  Loyalty: { bg: "#D9488A", path: "M12 18.5s-5.5-3.4-5.5-7.4a3 3 0 0 1 5.5-1.6 3 3 0 0 1 5.5 1.6c0 4-5.5 7.4-5.5 7.4z" },
};
type ReactPath = string;

export function Mark({ name, size = 20 }: { name: string; size?: number }) {
  const d = DRAWN[name];
  if (d) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flex: "none" }}>
        <rect width="24" height="24" rx="6" fill={d.bg} />
        <path d={d.path} stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return <img src={ICON[name]} alt="" width={size} height={size} style={{ width: size, height: size, objectFit: "contain", borderRadius: size * 0.25, flex: "none" }} />;
}

export function ProductChip({ name }: { name: string }) {
  return <span className="hr-chip"><Mark name={name} size={20} />{name}</span>;
}

/* Numbered spec rows with hairlines, shared by the panels. */
export const rowCss = `
  .hr-list{border-bottom:1px solid ${C.LINE}}
  .hr-row{display:grid;grid-template-columns:52px minmax(0,1fr) minmax(150px,230px);gap:20px;align-items:start;padding:26px 8px 26px 4px;border-top:1px solid ${C.LINE};transition:background .2s}
  .hr-row:hover{background:linear-gradient(90deg,rgba(24,184,209,.08),transparent)}
  .hr-n{font-family:var(--font-display),system-ui,sans-serif;font-size:15px;font-weight:800;letter-spacing:.04em;padding-top:3px}
  .hr-t h4{margin:0;font-family:var(--font-display),system-ui,sans-serif;font-size:20px;font-weight:700;letter-spacing:-.01em;line-height:1.3;color:${C.NAVY}}
  .hr-t p{margin:8px 0 0;font-size:15px;line-height:1.75;color:${C.SOFT};max-width:66ch}
  .hr-c{display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-end}
  .hr-chip{display:inline-flex;align-items:center;gap:7px;padding:4px 12px 4px 5px;border-radius:999px;background:#fff;border:1px solid ${C.LINE};font-size:12.5px;font-weight:700;color:${C.NAVY};white-space:nowrap}
  @media (max-width:760px){
    .hr-row{grid-template-columns:34px minmax(0,1fr);gap:4px 12px;padding:22px 0}
    .hr-c{grid-column:2;justify-content:flex-start;margin-top:10px}
    .hr-t h4{font-size:18px}
  }
`;
