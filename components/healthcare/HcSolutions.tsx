"use client";

import { useState, type KeyboardEvent } from "react";
import { C, PANELS, type Panel } from "./hcData";
import { Stage, stageCss } from "./HcStage";
import { ProductChip, rowCss } from "./HcUi";

/* Healthcare solutions (docs/healthcare-fix-plan.md): the five care settings are side tabs, as on the Construction page. The panel opens with a
   staged scene, then the lead and audiences, then the solutions as numbered rows. */

export function HcSolutions({ panels = PANELS, eyebrow = "Solutions", heading = "Solutions shaped by your care setting.", sub = "Choose the setting closest to yours." }: { panels?: Panel[]; eyebrow?: string; heading?: string; sub?: string }) {
  const [tab, setTab] = useState(0);
  const P = panels[tab];

  const onKey = (e: KeyboardEvent) => {
    const d = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (tab + d + panels.length) % panels.length;
    setTab(n);
    (e.currentTarget.querySelectorAll("button")[n] as HTMLElement | undefined)?.focus();
  };

  return (
    <section id="solutions" className="scroll-mt-24" style={{ background: "#fff", padding: "96px 0 104px" }}>
      <style>{stageCss + rowCss + css}</style>
      <div className="hc-wrap">
        <div style={{ maxWidth: 900 }} data-rv="0">
          <p style={{ margin: "0 0 14px", fontSize: 13, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: C.CYAN }}>{eyebrow}</p>
          <h2 style={{ margin: 0, letterSpacing: "-.02em", fontWeight: 800, color: C.NAVY }}>{heading}</h2>
          <p style={{ margin: "16px 0 0", fontSize: 16, lineHeight: 1.7, color: C.SOFT, fontWeight: 600 }}>{sub}</p>
        </div>

        <div className="ht-layout">
          <div className="ht-side" role="tablist" aria-label="Care setting" aria-orientation="vertical" onKeyDown={onKey}>
            {panels.map((x, n) => {
              const sel = n === tab;
              return (
                <button key={x.key} type="button" role="tab" id={`ht-tab-${x.key}`} aria-selected={sel} aria-controls="ht-panel" tabIndex={sel ? 0 : -1} className={`ht-tab${sel ? " on" : ""}`} style={{ ["--ac" as string]: x.on }} onClick={() => setTab(n)}>
                  <span className="ht-th" style={{ backgroundImage: `url(${x.photo})`, backgroundPosition: x.pos }} />
                  <span className="ht-tx"><b>{x.tab}</b><small>{x.sub}</small></span>
                </button>
              );
            })}
          </div>

          <div id="ht-panel" role="tabpanel" aria-labelledby={`ht-tab-${P.key}`} key={P.key} className="ht-panel" style={{ ["--ac" as string]: P.on }}>
            <Stage p={P} label={`${P.tab} photograph`} />
            <h3 className="ht-title">{P.title}</h3>
            <p className="ht-lead" style={{ borderColor: P.on }}>{P.lead}</p>
            <div className="ht-aud">
              {P.audiences.map(([h, d]) => (
                <div key={h}><b style={{ color: P.on }}>{h}</b><p>{d}</p></div>
              ))}
            </div>
            <div className="hr-list ht-rows">
              {P.cards.map((c, i) => (
                <div key={c.name} className="hr-row">
                  <span className="hr-n" style={{ color: P.on }}>{String(i + 1).padStart(2, "0")}</span>
                  <div className="hr-t"><h4>{c.name}</h4><p>{c.desc}</p></div>
                  <div className="hr-c">{c.products.map((p) => <ProductChip key={p} name={p} />)}</div>
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
  .ht-layout{display:grid;grid-template-columns:300px minmax(0,1fr);gap:56px;margin-top:56px;align-items:start}
  .ht-side{position:sticky;top:96px;display:grid;gap:6px}
  .ht-tab{display:flex;align-items:center;gap:14px;text-align:left;border:0;border-left:3px solid transparent;background:transparent;border-radius:0 10px 10px 0;padding:14px 16px 14px 14px;cursor:pointer;font-family:inherit;color:#6A7280;transition:background .2s,border-color .2s,color .2s}
  .ht-tab:hover{background:${C.MIST}}
  .ht-tab.on{background:#fff;border-left-color:var(--ac);color:${C.NAVY};box-shadow:0 18px 36px -28px rgba(16,42,67,.5)}
  .ht-tab:focus-visible{outline:3px solid ${C.BLUE};outline-offset:2px}
  .ht-th{flex:none;width:52px;height:52px;border-radius:50%;background-size:cover;background-color:${C.MIST};filter:saturate(.7);opacity:.8;transition:filter .2s,opacity .2s}
  .ht-tab.on .ht-th{filter:none;opacity:1;box-shadow:0 0 0 3px #fff,0 0 0 5px var(--ac)}
  .ht-tx{display:grid;gap:3px}
  .ht-tx b{font-family:var(--font-display),system-ui,sans-serif;font-size:16.5px;font-weight:700;line-height:1.3;letter-spacing:-.01em}
  .ht-tx small{font-size:13px;line-height:1.4;color:${C.SOFT}}
  @keyframes htIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  .ht-panel{min-width:0;animation:htIn .35s ease}
  .ht-title{margin:36px 0 0;max-width:26ch;text-wrap:balance;font-size:var(--h3-size);font-weight:700;letter-spacing:-.015em;line-height:1.2;color:${C.NAVY}}
  .ht-lead{margin:20px 0 0;padding-left:18px;border-left:3px solid;font-size:16.5px;line-height:1.7;font-weight:600;color:${C.INK};max-width:60ch}
  .ht-aud{display:grid;grid-template-columns:1fr 1fr;gap:28px;margin-top:26px}
  .ht-aud b{font-size:15px}
  .ht-aud p{margin:6px 0 0;font-size:14.5px;line-height:1.7;color:${C.SOFT}}
  .ht-rows{margin-top:44px}
  @media (max-width:1100px){.ht-layout{grid-template-columns:250px minmax(0,1fr);gap:34px}.ht-th{width:44px;height:44px}.ht-tx b{font-size:15.5px}}
  @media (max-width:860px){
    .ht-layout{grid-template-columns:1fr;gap:26px;margin-top:40px}
    .ht-side{position:static;display:flex;overflow-x:auto;gap:8px;scrollbar-width:none;padding-bottom:4px}
    .ht-side::-webkit-scrollbar{display:none}
    .ht-tab{flex:none;border-left:0;border-radius:999px;padding:8px 18px 8px 8px;background:#fff;box-shadow:inset 0 0 0 1px ${C.LINE}}
    .ht-tab.on{box-shadow:inset 0 0 0 2px var(--ac)}
    .ht-tx small{display:none}
    .ht-th{width:36px;height:36px}
    .ht-tx b{font-size:14px;white-space:nowrap}
    .ht-aud{grid-template-columns:1fr;gap:18px}
  }
  @media (prefers-reduced-motion:reduce){.ht-panel{animation:none}}
`;
