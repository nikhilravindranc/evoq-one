import { BANDS, C, COMMON } from "./fsData";
import { ProductChip, rowCss } from "./FsUi";

/* The supporting solutions shared by the three areas, as hairline columns with the products behind each, then the Sync
   and EVOQ AI rows (docs/field-service-content.md, section 2.3). */

export function FsAround() {
  return (
    <section id="around" style={{ background: C.PALE, padding: "96px 0 104px" }}>
      <style>{rowCss + css}</style>
      <div className="fs-wrap">
        <div style={{ maxWidth: 820 }} data-rv="0">
          <p style={{ margin: "0 0 14px", fontSize: 11.5, fontWeight: 700, letterSpacing: ".22em", textTransform: "uppercase", color: C.BURNT }}>Supporting solutions</p>
          <h2 className="fs-h2" style={{ margin: 0, color: C.NAVY }}>The work around the job.</h2>
          <p style={{ margin: "16px 0 0", fontSize: 16, lineHeight: 1.8, color: C.SOFT }}>These solutions support whichever area you run.</p>
        </div>

        <div className="fa-cols" data-rv="1">
          {COMMON.map((c) => (
            <article key={c.name} className="fa-col">
              <h4>{c.name}</h4>
              <p>{c.desc}</p>
              <div className="fa-chips">{c.products.map((p) => <ProductChip key={p} name={p} />)}</div>
            </article>
          ))}
        </div>

        <div className="fa-rows" data-rv="1">
          {BANDS.map((b) => (
            <div key={b.name} className="fa-row">
              <div>
                <h4>{b.name}</h4>
                <p>{b.desc}</p>
              </div>
              <div className="fa-rc">{b.products.map((p) => <ProductChip key={p} name={p} />)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const css = `
  .fa-cols{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));margin-top:56px;border-top:1px solid rgba(15,61,117,.28)}
  .fa-col{display:flex;flex-direction:column;padding:32px 34px 34px;border-bottom:1px solid rgba(15,61,117,.28)}
  .fa-col:not(:nth-child(3n+1)){border-left:1px solid rgba(15,61,117,.28)}
  .fa-col:nth-child(3n+1){padding-left:0}
  .fa-col:nth-child(3n){padding-right:0}
  .fa-col h4{margin:0;font-family:var(--font-display),system-ui,sans-serif;font-size:20px;font-weight:700;letter-spacing:-.01em;color:${C.NAVY}}
  .fa-col p{margin:10px 0 0;font-size:15px;line-height:1.75;color:${C.SOFT}}
  .fa-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:auto;padding-top:20px}
  .fa-rows{display:grid;gap:14px;margin-top:32px}
  .fa-row{display:flex;align-items:center;justify-content:space-between;gap:32px;border-radius:20px;padding:24px 28px;background:#fff;box-shadow:0 22px 44px -34px rgba(15,61,117,.55)}
  .fa-row h4{margin:0;font-family:var(--font-display),system-ui,sans-serif;font-size:19px;font-weight:700;letter-spacing:-.01em;color:${C.NAVY}}
  .fa-row p{margin:8px 0 0;font-size:14.5px;line-height:1.7;color:${C.SOFT};max-width:84ch}
  .fa-rc{display:flex;flex-wrap:wrap;gap:8px;justify-content:flex-end;flex:none}
  @media (max-width:1000px){
    .fa-cols{grid-template-columns:repeat(2,minmax(0,1fr))}
    .fa-col{padding:28px 26px}
    .fa-col:nth-child(3n+1),.fa-col:nth-child(3n){padding:28px 26px}
    .fa-col:nth-child(odd){padding-left:0;border-left:0}
    .fa-col:nth-child(even){padding-right:0;border-left:1px solid rgba(15,61,117,.28)}
  }
  @media (max-width:700px){
    .fa-cols{grid-template-columns:1fr}
    .fa-col,.fa-col:nth-child(n){padding:26px 0;border-left:0}
    .fa-row{flex-direction:column;align-items:flex-start;gap:16px;padding:22px 20px}
    .fa-rc{justify-content:flex-start}
  }
`;
