/* eslint-disable @next/next/no-img-element */
import { C, ICON } from "./fsData";

/* A product chip: the EVOQ product icon and its name. Surveys has no icon file yet, so it is drawn here. */
function SurveyMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#0D9488" />
      <path d="M8 6.5h8a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 16 17.5H8A1.5 1.5 0 0 1 6.5 16V8A1.5 1.5 0 0 1 8 6.5z" stroke="#fff" strokeWidth="1.5" />
      <path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Mark({ name, size = 20 }: { name: string; size?: number }) {
  if (name === "Surveys") return <SurveyMark size={size} />;
  return <img src={ICON[name]} alt="" width={size} height={size} style={{ width: size, height: size, objectFit: "contain", borderRadius: size * 0.25, flex: "none" }} />;
}

export function ProductChip({ name }: { name: string }) {
  return <span className="fr-chip"><Mark name={name} size={20} />{name}</span>;
}

/* Numbered spec rows with hairlines, shared by the panels and the supporting solutions. */
export const rowCss = `
  .fr-list{border-bottom:1px solid ${C.LINE}}
  .fr-row{display:grid;grid-template-columns:52px minmax(0,1fr) minmax(150px,230px);gap:20px;align-items:start;padding:26px 8px 26px 4px;border-top:1px solid ${C.LINE};transition:background .2s}
  .fr-row:hover{background:linear-gradient(90deg,rgba(219,234,254,.45),transparent)}
  .fr-n{font-family:var(--font-display),system-ui,sans-serif;font-size:15px;font-weight:800;letter-spacing:.04em;padding-top:3px}
  .fr-t h4{margin:0;font-family:var(--font-display),system-ui,sans-serif;font-size:20px;font-weight:700;letter-spacing:-.01em;line-height:1.3;color:${C.NAVY}}
  .fr-t p{margin:8px 0 0;font-size:15px;line-height:1.75;color:${C.SOFT};max-width:66ch}
  .fr-c{display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-end}
  .fr-chip{display:inline-flex;align-items:center;gap:7px;padding:4px 12px 4px 5px;border-radius:999px;background:#fff;border:1px solid ${C.LINE};font-size:12.5px;font-weight:700;color:${C.NAVY};white-space:nowrap}
  @media (max-width:760px){
    .fr-row{grid-template-columns:34px minmax(0,1fr);gap:4px 12px;padding:22px 0}
    .fr-c{grid-column:2;justify-content:flex-start;margin-top:10px}
    .fr-t h4{font-size:18px}
  }
`;

export const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
);
