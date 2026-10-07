"use client";

import { useState, type CSSProperties } from "react";

const G = "#1F2933";
const SL = "#64748B";
const CG = "#CBD5E1";
const PG = "#F1F5F9";
const BL = "#2563EB";
const PB = "#DBEAFE";

const U = (id: string, w: number) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;
const photo = (src: string, extra: CSSProperties = {}): CSSProperties => ({ backgroundImage: `url(${src})`, backgroundSize: "cover", backgroundPosition: "center", ...extra });

type Scene = {
  name: string;
  main: string;
  inset: string;
  card: { title: string; rows: string[][] };
  panel: { title: string; count: string; rows: string[][] };
};

const SCENES: Scene[] = [
  {
    name: "Industrial control unit",
    main: U("1717386255773-1e3037c81788", 1600),
    inset: U("1736161999520-0a20fa297a89", 900),
    card: { title: "Industrial Control Unit", rows: [["Configuration", "11 options"], ["Material", "Aluminium"], ["Status", "Ready for quote"], ["Price (Estimated)", "₹4,800"]] },
    panel: { title: "Configuration", count: "01 / 04", rows: [["Housing", "Aluminium"], ["Motor", "High torque"], ["Mounting", "Base mount"]] },
  },
  {
    name: "Machined component set",
    main: U("1740209475472-aa7d280f7452", 1600),
    inset: U("1748000970909-845f4aa144d2", 900),
    card: { title: "Machined Component Set", rows: [["Tolerance", "±0.02 mm"], ["Material", "Hardened steel"], ["Status", "Quote sent"], ["Price (Quoted)", "₹12,400"]] },
    panel: { title: "Quote QT-2041", count: "Draft 2", rows: [["Quantity", "250 units"], ["Finish", "Anodised"], ["Valid till", "30 Nov"]] },
  },
  {
    name: "Automation cell",
    main: U("1647427060118-4911c9821b82", 1600),
    inset: U("1740209475472-aa7d280f7452", 900),
    card: { title: "Automation Cell", rows: [["Order", "SO-8814"], ["Stage", "In production"], ["Lead time", "3 weeks"], ["Order value", "₹18.6 L"]] },
    panel: { title: "Order flow", count: "03 / 05", rows: [["Quote", "Approved"], ["Production", "Running"], ["Dispatch", "Planned"]] },
  },
  {
    name: "Aluminium profile set",
    main: U("1738966523829-5d3c195abce3", 1600),
    inset: U("1644079446600-219068676743", 900),
    card: { title: "Aluminium Profile Set", rows: [["In stock", "1,240 m"], ["Warehouse", "Pune"], ["Status", "Ready to ship"], ["Dispatch", "Tomorrow"]] },
    panel: { title: "Delivery", count: "Track", rows: [["Packed", "Done"], ["In transit", "Today"], ["Installed", "Scheduled"]] },
  },
];

export function HeroVisual() {
  const [n, setN] = useState(0);
  const s = SCENES[n];
  return (
    <>
      <div key={`m${n}`} className="mf-pop" style={{ position: "absolute", right: 0, top: 16, width: "78%", height: "88%", borderRadius: 14, ...photo(s.main), boxShadow: "0 40px 80px -40px rgba(31,41,51,.6)" }} />
      <div key={`i${n}`} className="mf-float" style={{ position: "absolute", left: "30%", top: "30%", width: "44%", aspectRatio: "4 / 3", borderRadius: 14, border: "4px solid #fff", boxShadow: "0 30px 60px -24px rgba(31,41,51,.7)", ...photo(s.inset) }} />
      <div key={`c${n}`} className="mf-pop" style={{ position: "absolute", left: "2%", top: 8, width: 230, padding: 14, background: "#fff", borderRadius: 12, border: `1px solid ${CG}`, boxShadow: "0 24px 50px -28px rgba(31,41,51,.45)" }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: G }}>{s.card.title}</div>
        {s.card.rows.map(([a, b]) => (
          <div key={a} style={{ display: "flex", justifyContent: "space-between", fontSize: 11, padding: "6px 0", borderBottom: `1px solid ${PG}`, color: SL }}><span>{a}</span><b style={{ color: G }}>{b}</b></div>
        ))}
      </div>
      <div key={`p${n}`} className="mf-pop" style={{ position: "absolute", left: "8%", bottom: 6, width: 210, padding: 12, background: "#fff", borderRadius: 12, border: `1px solid ${CG}`, boxShadow: "0 24px 50px -28px rgba(31,41,51,.45)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, fontWeight: 700, color: G }}>{s.panel.title}<span style={{ color: SL, fontWeight: 500 }}>{s.panel.count}</span></div>
        {s.panel.rows.map(([a, b]) => (
          <div key={a} style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5, padding: "6px 8px", marginTop: 6, borderRadius: 6, border: `1px solid ${CG}`, color: SL }}>{a}<b style={{ color: G }}>{b}</b></div>
        ))}
      </div>
      <div style={{ position: "absolute", right: "4%", bottom: 6, display: "flex", gap: 6 }}>
        {SCENES.map((sc, i) => (
          <button key={sc.name} type="button" aria-label={`Show ${sc.name}`} aria-pressed={i === n} onClick={() => setN(i)} style={{ cursor: "pointer", width: 58, height: 46, borderRadius: 8, background: i === n ? PB : "#fff", border: `${i === n ? 2 : 1}px solid ${i === n ? BL : CG}`, padding: 5 }}>
            <span style={{ width: "100%", height: "100%", borderRadius: 5, display: "block", ...photo(sc.main.replace("w=1600", "w=240")) }} />
          </button>
        ))}
      </div>
    </>
  );
}
