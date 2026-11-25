import { BANDS, C } from "./cnData";
import { ProductChip, rowCss } from "./CnUi";

/* Connected systems and AI: two rows under the solutions (docs/construction-page-plan.md, section 4). The Sync line names system
   categories only. */

export function CnAround() {
  return (
    <section id="connected" style={{ background: C.TINT, padding: "88px 0 96px", borderTop: `1px solid ${C.LSAND}` }}>
      <style>{rowCss + css}</style>
      <div className="cn-wrap">
        <div style={{ maxWidth: 820 }} data-rv="0">
          <p style={{ margin: "0 0 14px", fontSize: 12, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "#A2563B" }}>Connected</p>
          <h2 style={{ margin: 0, letterSpacing: "-.025em", fontWeight: 600, color: C.INK }}>Connected to your systems, with AI where it helps.</h2>
          <p style={{ margin: "16px 0 0", fontSize: 16, lineHeight: 1.8, color: C.SOFT }}>These support whichever work you run.</p>
        </div>
        <div className="cc-rows" data-rv="1">
          {BANDS.map((b) => (
            <div key={b.name} className="cc-row">
              <div>
                <h4>{b.name}</h4>
                <p>{b.desc}</p>
              </div>
              <div className="cc-rc">{b.products.map((p) => <ProductChip key={p} name={p} />)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const css = `
  .cc-rows{display:grid;gap:16px;margin-top:44px}
  .cc-row{display:flex;align-items:center;justify-content:space-between;gap:32px;border-radius:12px;padding:26px 30px;background:#fff;border:1px solid ${C.LINE};box-shadow:0 22px 44px -34px rgba(41,37,36,.5)}
  .cc-row h4{margin:0;font-family:var(--font-display),system-ui,sans-serif;font-size:19px;font-weight:700;letter-spacing:-.01em;color:${C.BROWN}}
  .cc-row p{margin:8px 0 0;font-size:14.5px;line-height:1.7;color:${C.SOFT};max-width:84ch}
  .cc-rc{display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-end;flex:none}
  @media (max-width:760px){.cc-row{flex-direction:column;align-items:flex-start;gap:16px;padding:22px 20px}.cc-rc{justify-content:flex-start}}
`;
