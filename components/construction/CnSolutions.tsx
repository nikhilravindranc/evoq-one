"use client";

import { useState, type KeyboardEvent } from "react";
import { C, PANELS } from "./cnData";
import { Stage, stageCss } from "./CnStage";
import { ProductChip, rowCss } from "./CnUi";

/* Construction, Engineering & Real Estate solutions (docs/construction-page-plan.md): the five buyers are side tabs, as on the
   Field Service page. The panel opens with a staged scene, then the buyer's lead and audiences, then its solutions as numbered rows. */

export function CnSolutions() {
  const [tab, setTab] = useState(0);
  const P = PANELS[tab];

  const onKey = (e: KeyboardEvent) => {
    const d = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (tab + d + PANELS.length) % PANELS.length;
    setTab(n);
    (e.currentTarget.querySelectorAll("button")[n] as HTMLElement | undefined)?.focus();
  };

  return (
    <section id="solutions" style={{ background: "#FFFDFB", padding: "96px 0 104px" }}>
      <style>{stageCss + rowCss + css}</style>
      <div className="cn-wrap">
        <div style={{ maxWidth: 900 }} data-rv="0">
          <p style={{ margin: "0 0 14px", fontSize: 12, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "#A2563B" }}>Solutions</p>
          <h2 style={{ margin: 0, letterSpacing: "-.025em", fontWeight: 600, color: C.INK }}>Project work, client follow up and property service, from enquiry to handover.</h2>
          <p style={{ margin: "16px 0 0", fontSize: 16, lineHeight: 1.7, color: C.SOFT, fontWeight: 600 }}>Choose the work closest to yours.</p>
        </div>

        <div className="ct-layout">
          <div className="ct-side" role="tablist" aria-label="Who it is for" aria-orientation="vertical" onKeyDown={onKey}>
            {PANELS.map((x, n) => {
              const sel = n === tab;
              return (
                <button key={x.key} type="button" role="tab" id={`ct-tab-${x.key}`} aria-selected={sel} aria-controls="ct-panel" tabIndex={sel ? 0 : -1} className={`ct-tab${sel ? " on" : ""}`} style={{ ["--ac" as string]: x.on }} onClick={() => setTab(n)}>
                  <span className="ct-th" style={{ backgroundImage: `url(${x.photo})`, backgroundPosition: x.pos }} />
                  <span className="ct-tx"><b>{x.tab}</b><small>{x.sub}</small></span>
                </button>
              );
            })}
          </div>

          <div id="ct-panel" role="tabpanel" aria-labelledby={`ct-tab-${P.key}`} key={P.key} className="ct-panel" style={{ ["--ac" as string]: P.on }}>
            <Stage p={P} label={`${P.tab} photograph`} />
            <h3 className="ct-title">{P.title}</h3>
            <p className="ct-lead" style={{ borderColor: P.on }}>{P.lead}</p>
            <div className="ct-aud">
              {P.audiences.map(([h, d]) => (
                <div key={h}><b style={{ color: P.on }}>{h}</b><p>{d}</p></div>
              ))}
            </div>
            <div className="cr-list ct-rows">
              {P.cards.map((c, i) => (
                <div key={c.name} className="cr-row">
                  <span className="cr-n" style={{ color: P.on }}>{String(i + 1).padStart(2, "0")}</span>
                  <div className="cr-t"><h4>{c.name}</h4><p>{c.desc}</p></div>
                  <div className="cr-c">{c.products.map((p) => <ProductChip key={p} name={p} />)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const css = `
  .ct-layout{display:grid;grid-template-columns:300px minmax(0,1fr);gap:56px;margin-top:56px;align-items:start}
  .ct-side{position:sticky;top:96px;display:grid;gap:6px}
  .ct-tab{display:flex;align-items:center;gap:14px;text-align:left;border:0;border-left:3px solid transparent;background:transparent;border-radius:0 8px 8px 0;padding:14px 16px 14px 14px;cursor:pointer;font-family:inherit;color:#6A7280;transition:background .2s,border-color .2s,color .2s}
  .ct-tab:hover{background:#fff}
  .ct-tab.on{background:#fff;border-left-color:var(--ac);color:${C.BROWN};box-shadow:0 18px 36px -28px rgba(41,37,36,.5)}
  .ct-tab:focus-visible{outline:3px solid ${C.TERRA};outline-offset:2px}
  .ct-th{flex:none;width:52px;height:52px;border-radius:50%;background-size:cover;background-color:${C.LSAND};filter:saturate(.7);opacity:.8;transition:filter .2s,opacity .2s}
  .ct-tab.on .ct-th{filter:none;opacity:1;box-shadow:0 0 0 3px #fff,0 0 0 5px var(--ac)}
  .ct-tx{display:grid;gap:3px}
  .ct-tx b{font-family:var(--font-display),system-ui,sans-serif;font-size:16.5px;font-weight:700;line-height:1.3;letter-spacing:-.01em}
  .ct-tx small{font-size:13px;line-height:1.4;color:${C.SOFT}}
  @keyframes ctIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  .ct-panel{min-width:0;animation:ctIn .35s ease}
  .ct-title{margin:36px 0 0;max-width:24ch;text-wrap:balance;font-size:var(--h3-size);font-weight:600;letter-spacing:-.015em;line-height:1.2;color:${C.BROWN}}
  .ct-lead{margin:20px 0 0;padding-left:18px;border-left:3px solid;font-size:16.5px;line-height:1.7;font-weight:600;color:${C.INK};max-width:60ch}
  .ct-aud{display:grid;grid-template-columns:1fr 1fr;gap:28px;margin-top:26px}
  .ct-aud b{font-size:15px}
  .ct-aud p{margin:6px 0 0;font-size:14.5px;line-height:1.7;color:${C.SOFT}}
  .ct-rows{margin-top:44px}
  @media (max-width:1100px){.ct-layout{grid-template-columns:250px minmax(0,1fr);gap:34px}.ct-th{width:44px;height:44px}.ct-tx b{font-size:15.5px}}
  @media (max-width:860px){
    .ct-layout{grid-template-columns:1fr;gap:26px;margin-top:40px}
    .ct-side{position:static;display:flex;overflow-x:auto;gap:8px;scrollbar-width:none;padding-bottom:4px}
    .ct-side::-webkit-scrollbar{display:none}
    .ct-tab{flex:none;border-left:0;border-radius:999px;padding:8px 18px 8px 8px;background:#fff;box-shadow:inset 0 0 0 1px ${C.LINE}}
    .ct-tab.on{box-shadow:inset 0 0 0 2px var(--ac)}
    .ct-tx small{display:none}
    .ct-th{width:36px;height:36px}
    .ct-tx b{font-size:14px;white-space:nowrap}
    .ct-aud{grid-template-columns:1fr;gap:18px}
  }
  @media (prefers-reduced-motion:reduce){.ct-panel{animation:none}}
`;
