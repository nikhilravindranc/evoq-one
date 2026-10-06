"use client";

/* Coded hero visual for the Billing features page: a dashboard window surrounded by the product's
   key objects (invoice, recurring toggle, payment received, receivables chart). Inline styles only. */
import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";

const D = "#0e342c";
const P = "#00ab88";
const M = "rgba(14, 52, 44, 0.6)";
const SH = "0 28px 56px -28px rgba(14, 52, 44, 0.45)";

function Card({ style, children, float = 0 }: { style: CSSProperties; children: ReactNode; float?: number }) {
  return (
    <div className="bm-float bm-lift" style={{ position: "absolute", background: "#fff", borderRadius: 22, boxShadow: SH, animationDelay: `${float}s`, ...style }}>
      {children}
    </div>
  );
}

export function FeaturesHeroVisual() {
  const [auto, setAuto] = useState(true);
  const [hot, setHot] = useState(4);
  const bars = [34, 52, 44, 70, 62, 92];
  const rows: [string, string, string, string, string][] = [
    ["Acme Industries", "INV-1048", "₹42,000", "Overdue", "#fde2df|#c2483d"],
    ["Northstar Services", "INV-1052", "₹18,500", "Due today", "#fdf3d0|#a86f00"],
    ["Brightline Co.", "INV-1055", "₹32,000", "Paid", "#d4f1e6|#04795f"],
    ["Rivermark Labs", "INV-1058", "₹27,500", "Due this week", "#fdf3d0|#a86f00"],
  ];
  return (
    <div className="mx-auto h-[172px] w-[363px] sm:h-[312px] sm:w-[660px] md:h-[442px] md:w-[935px] lg:h-[520px] lg:w-[1100px]">
      <style>{`
        @keyframes bmFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
        .bm-float{animation:bmFloat 7s ease-in-out infinite}
        .bm-lift{transition:box-shadow .25s ease}
        @media (prefers-reduced-motion:reduce){.bm-float{animation:none!important}}
      `}</style>
      <div className="relative origin-top-left scale-[.33] sm:scale-[.6] md:scale-[.85] lg:scale-100" style={{ width: 1100, height: 520 }}>
        {/* soft shapes */}
        <div aria-hidden="true" style={{ position: "absolute", left: 120, top: 20, width: 860, height: 470, borderRadius: 60, background: "linear-gradient(135deg, #cfeee2 0%, #e9f7f1 60%, rgba(233,247,241,0) 100%)", transform: "rotate(-2deg)" }} />
        <div aria-hidden="true" style={{ position: "absolute", right: 30, top: 50, width: 190, height: 190, borderRadius: "46% 54% 40% 60%", background: "linear-gradient(160deg, #fbe881, #f6d84e)", opacity: 0.85 }} />
        <div aria-hidden="true" style={{ position: "absolute", left: 0, top: 330, width: 260, height: 150, borderRadius: 40, background: "linear-gradient(135deg, #9ee3c9, #cfeee2)", transform: "rotate(8deg)" }} />

        {/* dashboard window */}
        <div style={{ position: "absolute", left: 262, top: 36, width: 640, height: 440, borderRadius: 26, background: "#fff", boxShadow: "0 40px 80px -36px rgba(14, 52, 44, 0.5)", overflow: "hidden", display: "flex" }}>
          <div style={{ width: 150, background: "#f6f9f8", padding: "18px 12px", borderRight: "1px solid rgba(14,52,44,.06)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/billing/images/billing-logo.png" alt="" style={{ height: 24, width: "auto", marginBottom: 18 }} />
            {["Dashboard", "Invoices", "Customers", "Payments", "Products", "Receivables", "Automation", "Reports"].map((n, i) => (
              <div key={n} style={{ fontSize: 11.5, padding: "8px 10px", borderRadius: 9, marginBottom: 3, fontWeight: i === 0 ? 700 : 500, background: i === 0 ? "#d4f1e6" : "transparent", color: i === 0 ? D : M }}>{n}</div>
            ))}
          </div>
          <div style={{ flex: 1, padding: "18px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 17, fontWeight: 700, color: D }}>Overview</span>
              <span style={{ fontSize: 10.5, fontWeight: 600, color: D, background: "#f1f4f3", padding: "6px 12px", borderRadius: 8 }}>This month ▾</span>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
              {[["₹1.84L", "Outstanding", "#d4f1e6"], ["₹42K", "Overdue", "#fde2df"], ["₹65K", "Due this week", "#fdf3d0"]].map(([v, l, bg]) => (
                <div key={l} style={{ flex: 1, background: bg, borderRadius: 14, padding: "12px 14px" }}>
                  <div style={{ fontSize: 19, fontWeight: 700, color: D }}>{v}</div>
                  <div style={{ fontSize: 10.5, color: M }}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
              <div style={{ flex: 1.1, background: "#f7faf9", borderRadius: 14, padding: "10px 12px" }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: D, marginBottom: 6 }}>Collections</div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 7, height: 66 }}>
                  {bars.map((h, i) => (
                    <button key={i} type="button" aria-label={`Month ${i + 1}`} onMouseEnter={() => setHot(i)} style={{ flex: 1, height: `${h}%`, border: 0, padding: 0, borderRadius: 5, cursor: "pointer", background: i === hot ? P : "#bfe8d9", transition: "background .2s" }} />
                  ))}
                </div>
              </div>
              <div style={{ flex: 1, background: "#f7faf9", borderRadius: 14, padding: "10px 12px" }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: D, marginBottom: 8 }}>Aging</div>
                {[["0–30 days", 72, P], ["31–60 days", 38, "#fec915"], ["60+ days", 18, "#e9736b"]].map(([l, w, c]) => (
                  <div key={String(l)} style={{ marginBottom: 7 }}>
                    <div style={{ fontSize: 9.5, color: M, marginBottom: 2 }}>{l}</div>
                    <div style={{ height: 5, borderRadius: 9, background: "rgba(14,52,44,.08)" }}>
                      <div style={{ width: `${w}%`, height: "100%", borderRadius: 9, background: String(c) }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ marginTop: 12 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", fontSize: 9.5, color: M, padding: "4px 0" }}>
                <span>Customer</span><span>Invoice</span><span>Amount</span><span>Status</span>
              </div>
              {rows.map(([n, inv, amt, st, col]) => {
                const [bg, c] = col.split("|");
                return (
                  <div key={n} style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", fontSize: 10.5, color: D, padding: "5px 0", borderTop: "1px solid rgba(14,52,44,.06)", alignItems: "center" }}>
                    <span style={{ fontWeight: 600 }}>{n}</span><span style={{ color: M }}>{inv}</span><span>{amt}</span>
                    <span style={{ justifySelf: "start", fontSize: 9.5, fontWeight: 700, padding: "2px 9px", borderRadius: 99, background: bg, color: c }}>{st}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* invoice card */}
        <Card float={0.3} style={{ left: 40, top: 70, width: 230, padding: 18, transform: "rotate(-6deg)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 19, fontWeight: 700, color: D }}>Invoice</span>
            <span style={{ width: 34, height: 34, borderRadius: 11, background: "#d4f1e6", color: P, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8l6 6v12a2 2 0 0 1-2 2z" /><path d="M14 2v6h6M9 13h6M9 17h4" /></svg>
            </span>
          </div>
          {[88, 100, 70].map((w, i) => <div key={i} style={{ height: 7, borderRadius: 9, background: "#e9edec", width: `${w}%`, marginTop: 10 }} />)}
          <div style={{ marginTop: 16, fontSize: 11.5, color: M }}>
            {[["Subtotal", "₹42,000"], ["GST (18%)", "₹7,560"]].map(([a, b]) => (
              <div key={a} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span>{a}</span><span style={{ color: D }}>{b}</span></div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 6, borderTop: "1px solid rgba(14,52,44,.1)", fontWeight: 700, color: D }}><span>Total</span><span>₹49,560</span></div>
          </div>
        </Card>

        {/* recurring toggle */}
        <Card float={1} style={{ left: 22, top: 400, width: 260, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", borderRadius: 18 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, fontWeight: 600, color: D }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={P} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 15-6.7L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16" /><path d="M3 21v-5h5" /></svg>
            Recurring invoice
          </span>
          <button type="button" role="switch" aria-checked={auto} aria-label="Recurring invoice" onClick={() => setAuto((v) => !v)} style={{ width: 48, height: 28, borderRadius: 99, border: 0, cursor: "pointer", background: auto ? P : "#cfd6d4", position: "relative", transition: "background .25s" }}>
            <span style={{ position: "absolute", top: 3, left: auto ? 23 : 3, width: 22, height: 22, borderRadius: "50%", background: "#fff", transition: "left .25s", boxShadow: "0 2px 6px rgba(0,0,0,.25)" }} />
          </button>
        </Card>

        {/* payment received */}
        <Card float={0.6} style={{ left: 850, top: 60, width: 230, padding: "16px 18px", display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ width: 44, height: 44, borderRadius: 13, background: "#e1e6fb", color: "#4a6fd8", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="5" width="20" height="14" rx="3" /><rect x="2" y="9" width="20" height="2.4" fill="#fff" /><rect x="5" y="14" width="5" height="1.8" rx=".9" fill="#fff" /></svg>
          </span>
          <span style={{ flex: 1 }}>
            <span style={{ display: "block", fontSize: 11, color: M }}>Payment received</span>
            <span style={{ display: "block", fontSize: 17, fontWeight: 700, color: D }}>₹18,500</span>
          </span>
          <span style={{ width: 30, height: 30, borderRadius: "50%", background: P, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
          </span>
        </Card>

        {/* receivables chart */}
        <Card float={1.4} style={{ left: 870, top: 240, width: 210, padding: 16, transform: "rotate(4deg)" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: D }}>Receivables</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 90, marginTop: 14 }}>
            {[30, 46, 58, 78, 100].map((h, i) => <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: 6, background: `linear-gradient(180deg, ${i === 4 ? "#17c9a0" : "#9ee3c9"}, ${i === 4 ? "#00ab88" : "#cfeee2"})` }} />)}
          </div>
        </Card>

        {/* send reminders */}
        <Card float={0.9} style={{ left: 880, top: 442, width: 215, padding: "12px 14px", borderRadius: 16, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 34, height: 34, borderRadius: 11, background: "#fdf3d0", color: "#b98a00", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
          </span>
          <span style={{ fontSize: 12.5, fontWeight: 700, color: D }}>3 reminders sent<span style={{ display: "block", fontSize: 10.5, fontWeight: 500, color: M }}>Overdue invoices followed up</span></span>
        </Card>
      </div>
    </div>
  );
}
