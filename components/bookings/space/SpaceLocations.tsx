"use client";
/* eslint-disable @next/next/no-img-element */

import { useState } from "react";
import { I } from "../theme";
import { BG, DEEP, INK, LINE, MUTED, NEUTRAL, PRIMARY } from "./palette";

/* "Several locations", shown as a tab of the rules section: the all locations screen Mia from Operations opens to compare every site. A compact
   app window with a side rail, one list that compares the sites, and the rules the chosen site keeps.
   Sample sites and numbers. */

type Range = "week" | "today";
const SITES = [
  { id: "hq", name: "Head office", note: "3 levels", spaces: 24, booked: 7, util: { week: 64, today: 58 }, hours: "Mon to Fri, 08:00 to 19:00", admins: "Facilities team" },
  { id: "river", name: "Riverside campus", note: "4 buildings", spaces: 38, booked: 11, util: { week: 71, today: 66 }, hours: "Mon to Sat, 07:00 to 21:00", admins: "Campus operations" },
  { id: "train", name: "Training center", note: "Ground floor", spaces: 12, booked: 5, util: { week: 48, today: 41 }, hours: "Mon to Fri, 08:00 to 18:00", admins: "People team" },
  { id: "city", name: "City hub", note: "2 levels", spaces: 16, booked: 4, util: { week: 56, today: 49 }, hours: "Every day, 06:00 to 22:00", admins: "Hub managers" },
  { id: "annex", name: "North annex", note: "1 level", spaces: 9, booked: 2, util: { week: 33, today: 28 }, hours: "Mon to Fri, 09:00 to 17:00", admins: "Site administrator" },
] as const;
const demand = (u: number) => (u >= 65 ? ["warn", "Busy"] : u >= 45 ? ["ok", "Steady"] : ["off", "Quiet"]);
const RAIL = [I.rules, I.space, I.pin, I.activity];

export function LocationsView() {
  const [sel, setSel] = useState<string>("river");
  const [range, setRange] = useState<Range>("week");
  const totalSpaces = SITES.reduce((a, x) => a + x.spaces, 0);
  const totalBooked = SITES.reduce((a, x) => a + x.booked, 0);
  const avg = Math.round(SITES.reduce((a, x) => a + x.util[range], 0) / SITES.length);

  return (
    <div className="lc-view">
      <style>{css}</style>
    <div className="lc-wrap">
      <div className="lc-win">
        <div className="lc-chrome">
          <span className="lc-dots" aria-hidden><i /><i /><i /></span>
          <span className="lc-url"><svg viewBox="0 0 16 16" width="11" height="11" aria-hidden><path d="M5 7V5a3 3 0 0 1 6 0v2M4 7h8v6H4z" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>app.northwind.example/locations</span>
        </div>

        <div className="lc-body">
          <nav className="lc-rail" aria-hidden>
            {RAIL.map((ic, i) => <span key={i} className={i === 2 ? "on" : ""}>{ic}</span>)}
          </nav>

          <div className="lc-app">
            <div className="lc-head">
              <img className="lc-face" src="/characters/mia.webp" alt="" width={30} height={30} />
              <span className="lc-title"><b>All locations</b><small>Mia, Operations · {SITES.length} sites · {totalSpaces} spaces</small></span>
              <span className="lc-coach"><b>1</b>Compare every site<svg viewBox="0 0 16 16" width="12" height="12" aria-hidden><path d="M8 2v11M3.5 8.5 8 13l4.5-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
              <div className="lc-seg" role="group" aria-label="Period">
                {([["today", "Today"], ["week", "This week"]] as const).map(([k, l]) => (
                  <button key={k} type="button" className={range === k ? "on" : ""} aria-pressed={range === k} onClick={() => setRange(k)}>{l}</button>
                ))}
              </div>
            </div>

            <div className="lc-table">
              <div className="lc-th"><span>Location</span><span>Spaces</span><span>Booked</span><span>Utilization</span><span>Demand</span></div>
              {SITES.map((n) => {
                const d = demand(n.util[range]);
                return (
                  <div key={n.id} className={`lc-item${n.id === sel ? " on" : ""}`}>
                    <button type="button" className="lc-tr" aria-pressed={n.id === sel} aria-expanded={n.id === sel} onClick={() => setSel(n.id)}>
                      <span className="lc-n"><b>{n.name}</b><small>{n.note}</small></span>
                      <span>{n.spaces}</span>
                      <span>{n.booked}</span>
                      <span className="lc-u"><i className="lc-meter" aria-hidden><i style={{ width: `${n.util[range]}%` }} /></i><em>{n.util[range]}%</em></span>
                      <em className={`sr-badge ${d[0]}`}>{d[1]}</em>
                    </button>
                    {n.id === sel && (
                      <div className="lc-rules">
                        <span><small>Hours</small>{n.hours}</span>
                        <span><small>Administered by</small>{n.admins}</span>
                        <span className="lc-coach"><b>2</b>Its own rules<svg viewBox="0 0 16 16" width="12" height="12" aria-hidden style={{ transform: "rotate(180deg)" }}><path d="M8 2v11M3.5 8.5 8 13l4.5-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                      </div>
                    )}
                  </div>
                );
              })}
              <div className="lc-total"><span>All locations</span><span>{totalSpaces}</span><span>{totalBooked}</span><span>{avg}% on average</span><span /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

const css = `
  .lc-wrap{min-width:0}
  .lc-win{background:#FBF7F1;color:${INK};border-radius:16px;overflow:hidden;text-align:left;box-shadow:0 40px 70px -30px rgba(0,0,0,.8),0 0 0 1px rgba(255,255,255,.14);font-size:14px;line-height:1.4}
  .lc-chrome{display:flex;align-items:center;gap:12px;padding:7px 14px;background:#EDE7DD;border-bottom:1px solid ${LINE}}
  .lc-dots{display:inline-flex;gap:6px}.lc-dots i{width:10px;height:10px;border-radius:50%;background:#D6CCBF}
  .lc-url{display:inline-flex;align-items:center;gap:7px;height:24px;padding:0 12px;border-radius:12px;background:#fff;font-size:11.5px;color:${MUTED};box-shadow:0 0 0 1px ${LINE};margin-left:8px}
  .lc-body{display:grid;grid-template-columns:48px minmax(0,1fr)}
  .lc-rail{display:flex;flex-direction:column;align-items:center;gap:6px;padding:12px 0;background:#F4EFE8;border-right:1px solid ${LINE}}
  .lc-rail span{width:32px;height:32px;border-radius:9px;display:grid;place-items:center;color:${NEUTRAL}}
  .lc-rail span svg{width:17px;height:17px}
  .lc-rail span.on{background:${DEEP};color:#fff}
  .lc-app{padding:12px 14px 14px;display:grid;gap:10px;min-width:0}
  .lc-head{display:flex;align-items:center;gap:10px}
  .lc-face{width:30px;height:30px;border-radius:50%;object-fit:cover;box-shadow:0 0 0 2px #fff,0 2px 6px rgba(43,33,28,.25);flex-shrink:0}
  .lc-title{display:grid;flex:1;min-width:0}.lc-title b{font-family:var(--font-display),system-ui,sans-serif;font-size:15.5px;color:${DEEP}}.lc-title small{font-size:11.5px;color:${NEUTRAL};white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .lc-seg{display:inline-flex;background:${BG};border-radius:9px;padding:2px;box-shadow:0 0 0 1px ${LINE}}
  .lc-seg button{border:0;background:none;padding:5px 11px;border-radius:7px;font-size:12px;font-weight:600;color:${MUTED};cursor:pointer;font-family:var(--font-display),system-ui,sans-serif;white-space:nowrap}
  .lc-seg button.on{background:#fff;color:${DEEP};box-shadow:0 1px 3px rgba(43,33,28,.18)}
  .lc-table{position:relative;background:#fff;border-radius:12px;box-shadow:0 0 0 1px ${LINE};overflow:hidden}
  .lc-th,.lc-tr,.lc-total{display:grid;grid-template-columns:minmax(0,1.5fr) 46px 52px minmax(0,1.2fr) 62px;gap:10px;align-items:center;padding:0 12px;text-align:left}
  .lc-th{height:30px;font-size:10.5px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:${NEUTRAL};background:${BG};border-bottom:1px solid ${LINE}}
  .lc-tr{width:100%;height:42px;border:0;background:none;cursor:pointer;font:inherit;color:${INK};transition:background .15s ease}
  .lc-item{border-top:1px solid ${LINE}}.lc-th+.lc-item{border-top:0}
  .lc-item:hover .lc-tr{background:#FAF4EE}.lc-item.on{background:rgba(180,88,58,.08);box-shadow:inset 3px 0 0 ${PRIMARY}}.lc-item.on .lc-tr{background:none}
  .lc-tr:focus-visible{outline:2px solid ${PRIMARY};outline-offset:-2px}
  .lc-n{display:grid;min-width:0;line-height:1.2}.lc-n b{font-size:13px;color:${DEEP}}.lc-n small{font-size:11px;color:${NEUTRAL}}
  .lc-tr>span:nth-child(2),.lc-tr>span:nth-child(3){font-size:13px;font-weight:600;color:${DEEP}}
  .lc-u{display:flex;align-items:center;gap:8px}
  .lc-meter{flex:1;height:6px;border-radius:6px;background:#EDE4D8;overflow:hidden;display:block}
  .lc-meter i{display:block;height:100%;border-radius:6px;background:${PRIMARY};transition:width .45s ease}
  .lc-u em{font-style:normal;font-size:12.5px;font-weight:700;color:${DEEP};min-width:34px;text-align:right}
  .lc-tr .sr-badge{justify-self:start;font-size:10.5px;padding:2px 8px}
  .lc-rules{display:flex;align-items:center;gap:22px;padding:2px 12px 10px 15px;font-size:12.5px;font-weight:600;color:${DEEP};animation:lcIn .3s ease both}
  .lc-rules>span{display:grid}.lc-rules small{font-size:10.5px;font-weight:500;color:${NEUTRAL}}
  .lc-rules .lc-coach{margin-left:auto;display:inline-flex}
  @keyframes lcIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}
  .lc-total{height:34px;border-top:1px solid ${LINE};background:${BG};font-size:12px;font-weight:700;color:${DEEP}}
  .lc-total span:nth-child(4){grid-column:4/6;font-weight:600;color:${MUTED}}
  .lc-coach{display:inline-flex;align-items:center;gap:6px;padding:3px 9px 3px 4px;border-radius:999px;background:#F4D9A3;color:#3B2A12;font-family:var(--font-display),system-ui,sans-serif;font-size:11px;font-weight:700;white-space:nowrap;box-shadow:0 8px 18px -8px rgba(59,42,18,.55)}
  .lc-coach b{width:17px;height:17px;border-radius:50%;background:#3B2A12;color:#F4D9A3;display:grid;place-items:center;font-size:10px}
  .lc-coach svg{animation:lcNudge 1.4s ease-in-out infinite}
  @keyframes lcNudge{0%,100%{translate:0 0}50%{translate:0 3px}}
  @media (max-width:640px){
    .lc-body{grid-template-columns:minmax(0,1fr)}.lc-rail{display:none}
    .lc-app{padding:12px}
    .lc-head{flex-wrap:wrap}.lc-seg{margin-left:40px}.lc-head>.lc-coach{display:none}
    .lc-th,.lc-tr,.lc-total{grid-template-columns:minmax(0,1fr) 40px 48px 56px;gap:8px;padding:0 10px}
    .lc-th span:nth-child(5),.lc-tr .sr-badge,.lc-total span:nth-child(5){display:none}
    .lc-meter{display:none}.lc-total span:nth-child(4){grid-column:4/5;font-size:11px}
    .lc-rules{flex-wrap:wrap;gap:6px 18px}.lc-rules .lc-coach{display:none}
  }
  @media (prefers-reduced-motion:reduce){.lc-coach svg,.lc-rules{animation:none}.lc-meter i{transition:none}}
`;
