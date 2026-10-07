"use client";

import { useState } from "react";

const U = (id: string, w = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;
const VIEWS = [U("1736161999520-0a20fa297a89"), U("1653071098188-99a98ea1f466"), U("1711199694531-e982a79ea381"), U("1738747597485-f162862935c4")];

const G = "#1F2933";
const ST = "#475569";
const SL = "#64748B";
const LS = "#94A3B8";
const CG = "#CBD5E1";
const PG = "#F1F5F9";
const BL = "#2563EB";
const PB = "#DBEAFE";

const OPTIONS: { label: string; values: string[]; prices: number[] }[] = [
  { label: "Housing", values: ["Aluminium", "Cast iron", "Stainless steel"], prices: [0, 380, 640] },
  { label: "Motor", values: ["Standard", "High torque", "Servo"], prices: [0, 520, 910] },
  { label: "Mounting", values: ["Foot mount", "Base mount", "Flange mount"], prices: [0, 120, 210] },
  { label: "Seal", values: ["Standard", "IP65", "IP67"], prices: [0, 90, 180] },
];

const TABS = ["Configuration", "Visualize", "Pricing", "Quote"];

export function ConfigXWindow() {
  const [sel, setSel] = useState([0, 1, 1, 0]);
  const [open, setOpen] = useState<number | null>(null);
  const [tab, setTab] = useState(0);
  const [view, setView] = useState(0);
  const [sent, setSent] = useState(false);
  const base = 3800;
  const total = base + OPTIONS.reduce((a, o, i) => a + o.prices[sel[i]], 0);
  const set = (i: number, v: number) => {
    setSel((s) => s.map((x, n) => (n === i ? v : x)));
    setOpen(null);
  };
  const fmt = (n: number) => "₹" + n.toLocaleString("en-IN");
  return (
    <div style={{ background: "#fff", borderRadius: 18, border: `1px solid ${CG}`, boxShadow: "0 40px 80px -40px rgba(31,41,51,.45)", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 18px", borderBottom: `1px solid ${PG}`, background: PG }}>
        <span style={{ fontSize: 12.5, fontWeight: 700, color: G, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: 2, background: BL }} />Product configurator
        </span>
        <span style={{ fontSize: 11, color: SL }}>ConfigX</span>
      </div>
      <div style={{ display: "flex", gap: 4, padding: "10px 14px 0", borderBottom: `1px solid ${PG}` }}>
        {TABS.map((t, i) => (
          <button key={t} type="button" onClick={() => setTab(i)} style={{ fontFamily: "inherit", cursor: "pointer", border: 0, background: "none", padding: "8px 12px", fontSize: 12, fontWeight: tab === i ? 700 : 500, color: tab === i ? G : SL, borderBottom: tab === i ? `2px solid ${BL}` : "2px solid transparent", marginBottom: -1 }}>{t}</button>
        ))}
      </div>
      <div key={tab} className="mf-cfg mf-pop" style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: 0 }}>
        <div style={{ padding: 18, position: "relative", backgroundImage: `linear-gradient(${CG}55 1px, transparent 1px), linear-gradient(90deg, ${CG}55 1px, transparent 1px)`, backgroundSize: "24px 24px", minHeight: 300 }}>
          {tab === 3 ? (
            <div style={{ background: "#fff", border: `1px solid ${CG}`, borderRadius: 10, padding: 16, boxShadow: "0 24px 44px -28px rgba(31,41,51,.5)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <b style={{ fontSize: 13, color: G }}>Quote QT-2041</b>
                <span style={{ fontSize: 10.5, fontWeight: 700, padding: "3px 9px", borderRadius: 99, background: sent ? "#DCFCE7" : PB, color: sent ? "#166534" : BL }}>{sent ? "Sent" : "Draft"}</span>
              </div>
              <div style={{ fontSize: 10.5, color: SL, marginTop: 2 }}>Prepared for Apex Machinery · Valid till 30 Nov</div>
              <div style={{ marginTop: 12, borderTop: `1px solid ${PG}` }}>
                {[["Industrial Control Unit ICU-420", fmt(base)], ...OPTIONS.map((o, i) => [`${o.label}: ${o.values[sel[i]]}`, o.prices[sel[i]] ? fmt(o.prices[sel[i]]) : "Included"])].map(([l, v]) => (
                  <div key={l} style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, padding: "8px 0", borderBottom: `1px solid ${PG}`, color: ST }}><span>{l}</span><b style={{ color: G }}>{v}</b></div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "10px 0 0", color: G }}><b>Total</b><b>{fmt(total)}</b></div>
              </div>
            </div>
          ) : tab === 2 ? (
            <>
              <div style={{ fontSize: 12, fontWeight: 700, color: G }}>Price build-up</div>
              <div style={{ fontSize: 10.5, color: SL }}>Base price plus selected options</div>
              <div style={{ display: "grid", gap: 11, marginTop: 16 }}>
                {([["Base unit", base], ...OPTIONS.map((o, i) => [o.label, o.prices[sel[i]]])] as [string, number][]).map(([l, v]) => (
                  <div key={l}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: ST, marginBottom: 4 }}><span>{l}</span><b style={{ color: G }}>{fmt(v)}</b></div>
                    <div style={{ height: 7, borderRadius: 4, background: PG }}><div style={{ height: "100%", width: `${Math.max((v / total) * 100, 2)}%`, borderRadius: 4, background: l === "Base unit" ? G : BL, transition: "width .4s" }} /></div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: 12, fontWeight: 700, color: G }}>Industrial Control Unit</div>
              <div style={{ fontSize: 10.5, color: SL }}>Product code ICU-420 · Rev 3</div>
              <div key={view} className="mf-pop" style={{ position: "relative", marginTop: 12, height: tab === 1 ? 250 : 230, borderRadius: 12, backgroundImage: `url(${VIEWS[view]})`, backgroundSize: "cover", backgroundPosition: "center", boxShadow: "0 24px 44px -24px rgba(31,41,51,.6)" }}>
                <span style={{ position: "absolute", left: 10, bottom: 10, fontSize: 10.5, fontWeight: 700, color: "#fff", background: "rgba(31,41,51,.7)", padding: "4px 9px", borderRadius: 99 }}>{OPTIONS[0].values[sel[0]]} · {OPTIONS[1].values[sel[1]]}</span>
                {tab === 1 && ["Housing", "Motor"].map((l, i) => (
                  <span key={l} style={{ position: "absolute", left: i ? "58%" : "18%", top: i ? "56%" : "24%", background: "#fff", color: G, fontSize: 10.5, fontWeight: 700, padding: "4px 9px", borderRadius: 7, boxShadow: "0 8px 18px -8px rgba(0,0,0,.5)", border: `1.5px solid ${BL}` }}>{l}: {OPTIONS[i].values[sel[i]]}</span>
                ))}
              </div>
            </>
          )}
        </div>
        <div style={{ padding: 18, borderLeft: `1px solid ${PG}` }}>
          {tab === 1 ? (
            <>
              <div style={{ fontSize: 12, fontWeight: 700, color: G, marginBottom: 10 }}>Views</div>
              <div style={{ display: "grid", gap: 8 }}>
                {["Front", "Side", "Detail", "Installed"].map((l, n) => (
                  <button key={l} type="button" onClick={() => setView(n)} style={{ fontFamily: "inherit", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, padding: 6, borderRadius: 9, border: `1px solid ${n === view ? BL : CG}`, background: n === view ? PB : "#fff", fontSize: 11.5, fontWeight: 600, color: G, textAlign: "left" }}>
                    <span style={{ width: 46, height: 34, borderRadius: 6, flexShrink: 0, backgroundImage: `url(${VIEWS[n]})`, backgroundSize: "cover", backgroundPosition: "center" }} />{l} view
                  </button>
                ))}
              </div>
            </>
          ) : tab === 2 ? (
            <>
              <div style={{ fontSize: 12, fontWeight: 700, color: G, marginBottom: 10 }}>Estimated price</div>
              <div key={total} className="mf-pop" style={{ fontSize: 30, fontWeight: 700, color: G }}>{fmt(total)}</div>
              <div style={{ fontSize: 10.5, color: SL, marginTop: 2 }}>Excl. GST · per unit</div>
              <div style={{ marginTop: 16, display: "grid", gap: 8 }}>
                {([["10+ units", 0.95], ["50+ units", 0.9]] as [string, number][]).map(([l, d]) => (
                  <div key={l} style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, padding: "9px 12px", borderRadius: 9, border: `1px solid ${CG}`, color: SL }}>{l}<b style={{ color: G }}>{fmt(Math.round(total * d))}</b></div>
                ))}
              </div>
            </>
          ) : tab === 3 ? (
            <>
              <div style={{ fontSize: 12, fontWeight: 700, color: G, marginBottom: 12 }}>Quote status</div>
              {["Draft created", "Sent to customer", "Approved"].map((l, i) => {
                const done = i === 0 || (sent && i === 1);
                return (
                  <div key={l} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", fontSize: 11.5, color: done ? G : LS, fontWeight: done ? 700 : 500 }}>
                    <span style={{ width: 18, height: 18, borderRadius: "50%", background: done ? BL : "#fff", border: `1.5px solid ${done ? BL : CG}`, color: "#fff", fontSize: 10, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{done ? "✓" : ""}</span>{l}
                  </div>
                );
              })}
              <div style={{ fontSize: 10.5, color: SL, marginTop: 10, lineHeight: 1.5 }}>The quote carries the exact configuration, so what the customer approves is what gets built.</div>
            </>
          ) : (
            <>
              <div style={{ fontSize: 12, fontWeight: 700, color: G, marginBottom: 10 }}>Configuration</div>
              <div style={{ display: "grid", gap: 8 }}>
                {OPTIONS.map((o, i) => (
                  <div key={o.label} style={{ position: "relative" }}>
                    <button type="button" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} style={{ fontFamily: "inherit", cursor: "pointer", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 12px", borderRadius: 9, border: `1px solid ${open === i ? BL : CG}`, background: "#fff", fontSize: 11.5, color: G, boxShadow: open === i ? `0 0 0 3px ${PB}` : "none" }}>
                      <span style={{ color: SL }}>{o.label}</span>
                      <b>{o.values[sel[i]]} ▾</b>
                    </button>
                    {open === i && (
                      <div style={{ position: "absolute", left: 0, right: 0, top: "calc(100% + 4px)", zIndex: 10, background: "#fff", borderRadius: 10, border: `1px solid ${CG}`, boxShadow: "0 20px 40px -20px rgba(31,41,51,.5)", overflow: "hidden" }}>
                        {o.values.map((v, n) => (
                          <button key={v} type="button" onClick={() => set(i, n)} style={{ fontFamily: "inherit", cursor: "pointer", width: "100%", textAlign: "left", display: "flex", justifyContent: "space-between", padding: "9px 12px", border: 0, background: sel[i] === n ? PB : "#fff", fontSize: 11.5, color: G }}>
                            <span>{v}</span><span style={{ color: SL }}>{o.prices[n] ? "+" + fmt(o.prices[n]) : "Included"}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "12px 18px", borderTop: `1px solid ${PG}`, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 8 }}>
          {[0, 1, 2, 3].map((n) => (
            <button key={n} type="button" aria-label={`View ${n + 1}`} onClick={() => { setView(n); if (tab > 1) setTab(1); }} style={{ cursor: "pointer", padding: 0, width: 58, height: 42, borderRadius: 8, border: `2px solid ${n === view ? BL : CG}`, backgroundImage: `url(${VIEWS[n]})`, backgroundSize: "cover", backgroundPosition: "center" }} />
          ))}
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 10.5, color: SL }}>Estimated price</div>
          <div key={total} className="mf-pop" style={{ fontSize: 22, fontWeight: 700, color: G }}>{fmt(total)}</div>
        </div>
        <button type="button" onClick={() => (tab === 3 ? setSent(true) : setTab(tab + 1))} style={{ fontFamily: "inherit", cursor: "pointer", border: 0, fontSize: 11.5, fontWeight: 700, color: "#fff", background: tab === 3 && sent ? "#166534" : G, padding: "10px 14px", borderRadius: 9 }}>{["View visual", "View pricing", "Create quote", sent ? "Quote sent ✓" : "Send quote"][tab]}</button>
      </div>
    </div>
  );
}
