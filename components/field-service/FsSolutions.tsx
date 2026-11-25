"use client";

import { useState, type KeyboardEvent } from "react";
import { C, PANELS } from "./fsData";
import { Stage, stageCss } from "./FsStage";
import { ProductChip, rowCss } from "./FsUi";

/* Field Service solutions (docs/field-service-content.md): the three areas are side tabs, as on the Zendesk home page.
   The panel opens with a staged scene, then the area's lead and audiences, then its solutions as numbered rows. */

export function FsSolutions() {
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
    <section id="solutions" style={{ background: C.CW, padding: "96px 0 104px" }}>
      <style>{stageCss + rowCss + css}</style>
      <div className="fs-wrap">
        <div style={{ maxWidth: 900 }} data-rv="0">
          <p style={{ margin: "0 0 14px", fontSize: 11.5, fontWeight: 700, letterSpacing: ".22em", textTransform: "uppercase", color: C.BURNT }}>Solutions</p>
          <h2 className="fs-h2" style={{ margin: 0, color: C.NAVY }}>Field jobs, site upkeep and planned maintenance, from request to invoice.</h2>
          <p style={{ margin: "16px 0 0", fontSize: 16, lineHeight: 1.8, color: C.INK, fontWeight: 600 }}>Choose the work closest to yours.</p>
        </div>

        <div className="fv-layout">
          <div className="fv-side" role="tablist" aria-label="Operating areas" aria-orientation="vertical" onKeyDown={onKey}>
            {PANELS.map((x, n) => {
              const sel = n === tab;
              return (
                <button key={x.key} type="button" role="tab" id={`fv-tab-${x.key}`} aria-selected={sel} aria-controls="fv-panel" tabIndex={sel ? 0 : -1} className={`fv-tab${sel ? " on" : ""}`} style={{ ["--ac" as string]: x.on, ["--off" as string]: x.off }} onClick={() => setTab(n)}>
                  <span className="fv-th" style={{ backgroundImage: `url(${x.photo})`, backgroundPosition: x.pos }} />
                  <span className="fv-tx"><b>{x.tab}</b><small>{x.sub}</small></span>
                </button>
              );
            })}
          </div>

          <div id="fv-panel" role="tabpanel" aria-labelledby={`fv-tab-${P.key}`} key={P.key} className="fv-panel" style={{ ["--ac" as string]: P.on }}>
            <Stage area={P.key} photo={P.photo} pos={P.pos} label={`${P.tab} photograph`} />
            <h3 className="fs-h3 fv-title">{P.title}</h3>
            <p className="fv-lead" style={{ borderColor: P.on }}>{P.lead}</p>
            <div className="fv-aud">
              {P.audiences.map(([h, d]) => (
                <div key={h}><b style={{ color: P.on }}>{h}</b><p>{d}</p></div>
              ))}
            </div>
            <div className="fr-list">
              {P.cards.map((c, i) => (
                <div key={c.name} className="fr-row">
                  <span className="fr-n" style={{ color: P.on }}>{String(i + 1).padStart(2, "0")}</span>
                  <div className="fr-t"><h4>{c.name}</h4><p>{c.desc}</p></div>
                  <div className="fr-c">{c.products.map((p) => <ProductChip key={p} name={p} />)}</div>
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
  .fv-layout{display:grid;grid-template-columns:300px minmax(0,1fr);gap:56px;margin-top:56px;align-items:start}
  .fv-side{position:sticky;top:96px;display:grid;gap:6px}
  .fv-tab{display:flex;align-items:center;gap:14px;text-align:left;border:0;border-left:3px solid transparent;background:transparent;border-radius:0 16px 16px 0;padding:14px 16px 14px 14px;cursor:pointer;font-family:inherit;color:#5B6B85;transition:background .2s,border-color .2s,color .2s}
  .fv-tab:hover{background:#fff}
  .fv-tab.on{background:#fff;border-left-color:var(--ac);color:${C.NAVY};box-shadow:0 18px 36px -28px rgba(15,61,117,.55)}
  .fv-tab:focus-visible{outline:3px solid ${C.BLUE};outline-offset:2px}
  .fv-th{flex:none;width:52px;height:52px;border-radius:50%;background-size:cover;background-color:${C.PALE};filter:saturate(.7);opacity:.8;transition:filter .2s,opacity .2s}
  .fv-tab.on .fv-th{filter:none;opacity:1;box-shadow:0 0 0 3px #fff,0 0 0 5px var(--ac)}
  .fv-tx{display:grid;gap:3px}
  .fv-tx b{font-family:var(--font-display),system-ui,sans-serif;font-size:17px;font-weight:700;line-height:1.3;letter-spacing:-.01em}
  .fv-tx small{font-size:13px;line-height:1.4;color:${C.SOFT}}
  @keyframes fvIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  .fv-panel{min-width:0;animation:fvIn .35s ease}
  .hs-root .fv-title{margin:36px 0 0;color:${C.NAVY};text-wrap:balance;max-width:24ch}
  .fv-lead{margin:20px 0 0;padding-left:18px;border-left:3px solid;font-size:16.5px;line-height:1.7;font-weight:600;color:${C.INK};max-width:60ch}
  .fv-aud{display:grid;grid-template-columns:1fr 1fr;gap:28px;margin-top:26px}
  .fv-aud b{font-size:15px}
  .fv-aud p{margin:6px 0 0;font-size:14.5px;line-height:1.7;color:${C.SOFT}}
  .fr-list{margin-top:44px}
  @media (max-width:1100px){.fv-layout{grid-template-columns:250px minmax(0,1fr);gap:34px}.fv-th{width:44px;height:44px}.fv-tx b{font-size:16px}}
  @media (max-width:860px){
    .fv-layout{grid-template-columns:1fr;gap:26px;margin-top:40px}
    .fv-side{position:static;display:flex;overflow-x:auto;gap:8px;scrollbar-width:none;padding-bottom:4px}
    .fv-side::-webkit-scrollbar{display:none}
    .fv-tab{flex:none;border-left:0;border-radius:999px;padding:8px 18px 8px 8px;background:#fff;box-shadow:inset 0 0 0 1px ${C.LINE}}
    .fv-tab.on{box-shadow:inset 0 0 0 2px var(--ac)}
    .fv-tx small{display:none}
    .fv-th{width:36px;height:36px}
    .fv-tx b{font-size:14.5px;white-space:nowrap}
    .fv-aud{grid-template-columns:1fr;gap:18px}
  }
  @media (prefers-reduced-motion:reduce){.fv-panel{animation:none}}
`;
