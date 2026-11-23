"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

/* The manufacturing segments: every kind of manufacturer the page speaks to, in a row that scrolls sideways. */

const G = "#1F2933";
const ST = "#475569";
const SL = "#64748B";
const CG = "#CBD5E1";
const BL = "#2563EB";

const U = (id: string, w = 800) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;
const SEGS: [string, string, string][] = [
  ["Industrial manufacturing", "Enquiries, quotes and service history for industrial products.", U("1647427060118-4911c9821b82")],
  ["Equipment manufacturers", "Configured equipment, customer projects and ongoing service visits.", U("1649807533255-bbc9c9fb7d77")],
  ["Fabrication and metalworking companies", "Manage customer accounts, quotation workflows, material inventory, project activities and billing administration.", U("1598299803204-b73796f43289")],
  ["Electrical and electronics manufacturers", "Handle customer relationships, product options, quotation preparation, inventory records and after-sales service.", "/manufacturing/field-tech.jpg"],
  ["Labels, nameplates and component manufacturers", "Manage customer specifications, quotation requirements, order-related coordination, stock records and commercial documentation.", "/manufacturing/warehouse.jpg"],
  ["Furniture & modular products", "Configurable product sales, enquiries and orders.", U("1742192757416-27d69a5d5029")],
  ["Building products", "Enquiries, product options, commercial records and fulfilment.", U("1738966523829-5d3c195abce3")],
  ["Medical devices", "Customer accounts, orders and post-sale service for devices.", U("1748000970909-845f4aa144d2")],
  ["Other configurable products", "Configuration, quoting and order handling for other configurable products.", U("1740209475472-aa7d280f7452")],
];

const corner = (pos: CSSProperties): CSSProperties => ({ position: "absolute", width: 14, height: 14, borderColor: "rgba(255,255,255,.85)", borderStyle: "solid", borderWidth: 0, ...pos });

export function ManufacturingSegments() {
  const row = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  const measure = useCallback(() => {
    const el = row.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, []);
  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);
  const move = (dir: 1 | -1) => {
    const el = row.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".sg-card");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 240) + 14) * 2, behavior: "smooth" });
  };

  return (
    <section id="segments" style={{ background: "#fff", padding: "84px 0 88px", position: "relative", overflow: "hidden" }}>
      <style>{`
        .sg-row{display:flex;gap:14px;overflow-x:auto;scroll-snap-type:x proximity;scrollbar-width:none;padding:4px 2px 10px;margin:0 -2px}
        .sg-row::-webkit-scrollbar{display:none}
        .sg-card{flex:0 0 calc((100% - 70px) / 5.4);scroll-snap-align:start;display:flex;flex-direction:column;border-radius:14px;overflow:hidden;border:1px solid ${CG};background:#fff;transition:transform .25s ease,box-shadow .25s ease}
        .sg-card:hover{transform:translateY(-4px);box-shadow:0 26px 48px -28px rgba(31,41,51,.55)}
        .sg-img{position:absolute;inset:0;background-size:cover;background-position:center;transition:transform .5s ease}
        .sg-card:hover .sg-img{transform:scale(1.06)}
        .sg-btn{all:unset;box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:50%;cursor:pointer;background:#fff;border:1px solid ${CG};color:${G};transition:background .2s ease,color .2s ease,opacity .2s ease}
        .sg-btn:hover:not(:disabled){background:${G};color:#fff}
        .sg-btn:disabled{opacity:.35;cursor:default}
        .sg-btn:focus-visible{outline:2px solid ${BL};outline-offset:2px}
        @media (max-width:1100px){.sg-card{flex-basis:calc((100% - 28px) / 3.3)}}
        @media (max-width:700px){.sg-card{flex-basis:calc((100% - 14px) / 1.6)}}
        @media (prefers-reduced-motion:reduce){.sg-card,.sg-img{transition:none}}
      `}</style>
      <div className="mf-wrap">
        <div className="mf-split2" style={{ alignItems: "end", marginBottom: 38 }}>
          <div>
            <p style={{ margin: "0 0 14px", fontSize: 11, fontWeight: 600, letterSpacing: ".22em", textTransform: "uppercase", color: SL }}>Manufacturing segments</p>
            <h2 className="mf-h2">See what fits the way you manufacture.</h2>
          </div>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: ST, maxWidth: "56ch" }}>Configuration, order handling, delivery and after-sale support differ by product type. Choose the type closest to yours.</p>
        </div>
        <div className="sg-row" ref={row} onScroll={measure} role="list" aria-label="Manufacturing segments">
          {SEGS.map(([t, d, img], i) => (
            <div key={t} className="sg-card" role="listitem">
              <div style={{ position: "relative", aspectRatio: "4 / 5", overflow: "hidden", flexShrink: 0 }}>
                <div className="sg-img" style={{ backgroundImage: `url(${img})` }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(15,23,42,.28), rgba(15,23,42,0) 40%)" }} />
                <span style={corner({ left: 12, top: 12, borderTopWidth: 1.5, borderLeftWidth: 1.5 })} />
                <span style={corner({ right: 12, bottom: 12, borderBottomWidth: 1.5, borderRightWidth: 1.5 })} />
                <span style={{ position: "absolute", left: 32, top: 12, fontSize: 10.5, fontWeight: 600, letterSpacing: ".18em", color: "#fff", textShadow: "0 1px 6px rgba(15,23,42,.6)" }}>0{i + 1}</span>
              </div>
              <div style={{ padding: "16px 16px 20px" }}>
                <h4 style={{ margin: 0, fontSize: 15.5, lineHeight: 1.3, fontWeight: 700, color: G, letterSpacing: "-.005em" }}>{t}</h4>
                <p style={{ margin: "8px 0 0", fontSize: 13, lineHeight: 1.6, color: ST }}>{d}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 18 }}>
          <button type="button" className="sg-btn" aria-label="Previous segments" disabled={edge.start} onClick={() => move(-1)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
          </button>
          <button type="button" className="sg-btn" aria-label="Next segments" disabled={edge.end} onClick={() => move(1)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
