"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const W = 1120;
const H = 580;
const P = "#00ab88";
const D = "#0e342c";
const MUTED = "#6b7f7a";
const LINE = "#e6efec";

const ICONS: Record<string, ReactNode> = {
  grid: <><rect x="4" y="4" width="6.5" height="6.5" rx="1.5" /><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" /><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" /><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" /></>,
  doc: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 16h4" /></>,
  card: <><rect x="3" y="6" width="18" height="13" rx="2.5" /><path d="M3 10.5h18M7 15h4" /></>,
  users: <><circle cx="9" cy="8.5" r="3.2" /><path d="M3 20a6 6 0 0 1 12 0M16.5 5.5a3 3 0 0 1 0 6M21 20a5 5 0 0 0-3.5-4.8" /></>,
  wallet: <><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M3 9h18M15.5 14h2.5" /></>,
  chart: <><path d="M5 20V11M12 20V5M19 20v-6" /></>,
  bell: <><path d="M6 17V11a6 6 0 0 1 12 0v6l1.5 2h-15z" /><path d="M10 21h4" /></>,
  alert: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5v5.5M12 16.5v.1" /></>,
  cal: <><rect x="4" y="5" width="16" height="15" rx="2.5" /><path d="M8 3v4M16 3v4M4 10h16" /></>,
  send: <><path d="M21 3 10 14M21 3l-7 18-4-7-7-4z" /></>,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
};
function Ic({ n, s = 18, c = D, w = 1.8 }: { n: string; s?: number; c?: string; w?: number }) {
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICONS[n]}</svg>;
}

const NAV: [string, string][] = [["grid", "Dashboard"], ["doc", "Invoices"], ["card", "Receivables"], ["users", "Customers"], ["wallet", "Payments"], ["chart", "Reports"]];
const STATS = [
  { ic: "doc", v: "₹1.84L", l: "Outstanding", bg: "#e4f6f0", fg: P },
  { ic: "alert", v: "₹42K", l: "Overdue", bg: "#fdeaea", fg: "#e5484d" },
  { ic: "cal", v: "₹65K", l: "Due this week", bg: "#fff4dc", fg: "#e59a0a" },
];
const ROWS: [string, string, string, string, string, string, string, string][] = [
  ["AI", "Acme Industries", "INV-1048", "₹42,000", "Sep 12, 2026", "Overdue", "#fdeaea", "#d23a3f"],
  ["NS", "Northstar Services", "INV-1052", "₹18,500", "Sep 30, 2026", "Due today", "#fff4dc", "#b87800"],
  ["BC", "Brightline Co.", "INV-1055", "₹32,000", "Sep 28, 2026", "Paid", "#e4f6f0", "#0a8a6c"],
  ["RL", "Rivermark Labs", "INV-1058", "₹27,500", "Oct 02, 2026", "Due this week", "#fff4dc", "#b87800"],
  ["UC", "Unity Contractors", "INV-1061", "₹21,000", "Oct 05, 2026", "Pending", "#eef1f0", "#52635f"],
];

export function ReceivablesVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const [k, setK] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => setK(Math.min(1, el.clientWidth / W));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} role="img" aria-label="EVOQ Billing receivables screen showing outstanding, overdue and due-this-week totals, a customer table, a reminder card and a follow-up note" style={{ position: "relative", width: "100%", maxWidth: W, height: H * k, margin: "0 auto" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, transform: `scale(${k})`, transformOrigin: "top left", fontFamily: "inherit", textAlign: "left" }}>
        {/* soft light behind the composition: no hard shapes */}
        <div aria-hidden="true" style={{ position: "absolute", left: 60, top: 70, width: 1000, height: 460, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(0,171,136,.20), rgba(0,171,136,0))", filter: "blur(30px)" }} />

        {/* window */}
        <div style={{ position: "absolute", left: 20, top: 52, width: 800, height: 500, display: "flex", background: "#fff", borderRadius: 20, border: `1px solid ${LINE}`, boxShadow: "0 50px 90px -40px rgba(14,52,44,.40), 0 18px 40px -26px rgba(14,52,44,.28)", overflow: "hidden" }}>
          <div style={{ width: 178, background: "#f6faf8", borderRight: `1px solid ${LINE}`, padding: "22px 14px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/billing/images/billing-logo.png" alt="" height={30} style={{ height: 30, width: "auto", display: "block", marginLeft: 6 }} />
            <div style={{ marginTop: 26, display: "grid", gap: 4 }}>
              {NAV.map(([ic, l]) => {
                const on = l === "Receivables";
                return (
                  <div key={l} style={{ display: "flex", alignItems: "center", gap: 11, padding: "10px 12px", borderRadius: 10, fontSize: 13.5, fontWeight: on ? 700 : 500, color: on ? D : MUTED, background: on ? "#dff3ed" : "transparent" }}>
                    <Ic n={ic} s={18} c={on ? P : "#7d8f8b"} />{l}
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ flex: 1, padding: "22px 24px", minWidth: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 24, fontWeight: 700, color: D, letterSpacing: "-.01em" }}>Outstanding</div>
                <div style={{ fontSize: 12.5, color: MUTED, marginTop: 2 }}>Total receivables across all customers</div>
              </div>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: D, background: "#f1f5f3", padding: "9px 14px", borderRadius: 10 }}>This month ▾</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 18 }}>
              {STATS.map((s) => (
                <div key={s.l} style={{ display: "flex", alignItems: "center", gap: 12, background: s.bg, borderRadius: 14, padding: "14px 14px" }}>
                  <span style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(255,255,255,.75)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Ic n={s.ic} s={20} c={s.fg} /></span>
                  <span style={{ fontSize: 20, fontWeight: 700, color: D, lineHeight: 1.1 }}>{s.v}<span style={{ display: "block", fontSize: 11.5, fontWeight: 500, color: MUTED, marginTop: 3 }}>{s.l}</span></span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, border: `1px solid ${LINE}`, borderRadius: 14, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1.9fr .9fr .85fr 1fr 1.4fr", padding: "10px 16px", background: "#f6faf8", fontSize: 11.5, color: MUTED, fontWeight: 600 }}>
                <span>Customer</span><span>Invoice</span><span>Amount</span><span>Due date</span><span>Status</span>
              </div>
              {ROWS.map(([ini, name, inv, amt, due, st, bg, fg]) => (
                <div key={inv} style={{ display: "grid", gridTemplateColumns: "1.9fr .9fr .85fr 1fr 1.4fr", alignItems: "center", padding: "9px 16px", borderTop: `1px solid ${LINE}`, fontSize: 12.5, color: D }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 600, whiteSpace: "nowrap" }}>
                    <span style={{ width: 28, height: 28, borderRadius: "50%", background: "#e8f1ee", color: "#2f6f60", fontSize: 10.5, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{ini}</span>{name}
                  </span>
                  <span style={{ color: MUTED }}>{inv}</span>
                  <span style={{ fontWeight: 600 }}>{amt}</span>
                  <span style={{ color: MUTED }}>{due}</span>
                  <span><span style={{ fontSize: 11.5, fontWeight: 600, background: bg, color: fg, padding: "4px 11px", borderRadius: 99, whiteSpace: "nowrap" }}>{st}</span></span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, fontSize: 12.5, fontWeight: 700, color: P }}>View all receivables →</div>
          </div>
        </div>

        {/* reminder card */}
        <div style={{ position: "absolute", left: 800, top: 8, width: 310, background: "#fff", borderRadius: 18, border: `1px solid ${LINE}`, boxShadow: "0 36px 60px -30px rgba(14,52,44,.45)", padding: 18 }}>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <span style={{ width: 52, height: 52, borderRadius: 14, background: "#fdd66b", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Ic n="bell" s={26} c={D} /></span>
            <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.4 }}>
              Send a reminder to
              <div style={{ fontSize: 18, fontWeight: 700, color: D }}>3 customers</div>
              3 invoices are overdue or due today.
            </div>
          </div>
          <div style={{ marginTop: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 9, background: D, color: "#fff", fontSize: 14, fontWeight: 700, padding: "13px 0", borderRadius: 11 }}>
            <Ic n="send" s={17} c="#fff" w={2} />Send reminders
          </div>
        </div>

        {/* follow-up note */}
        <div style={{ position: "absolute", left: 780, top: 340, width: 226, transform: "rotate(5deg)", background: "#fdf3a6", padding: "18px 20px 20px", boxShadow: "0 30px 40px -22px rgba(14,52,44,.45)", borderRadius: 4 }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: D, transform: "rotate(-4deg)", transformOrigin: "left", fontFamily: "'Segoe Script','Bradley Hand',cursive" }}>Follow up</div>
          <div style={{ marginTop: 12, display: "grid", gap: 9 }}>
            {["Acme Industries", "Northstar Services", "Brightline Co."].map((t) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 14, color: D, fontFamily: "'Segoe Script','Bradley Hand',cursive" }}>
                <span style={{ width: 16, height: 16, border: `1.8px solid ${D}`, borderRadius: 3, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Ic n="check" s={12} c={D} w={2.6} /></span>{t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
