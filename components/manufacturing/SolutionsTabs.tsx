"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

const G = "#1F2933";
const ST = "#475569";
const SL = "#64748B";
const LS = "#94A3B8";
const CG = "#CBD5E1";
const PG = "#F1F5F9";
const BL = "#2563EB";
const PB = "#DBEAFE";
const LB = "#DBEAFE";

const MOTOR = "https://images.unsplash.com/photo-1736161999520-0a20fa297a89?auto=format&fit=crop&w=600&q=75";

const ICONS: Record<string, ReactNode> = {
  chat: <><path d="M21 12a8 8 0 0 1-11.5 7.2L4 20l1.1-4.2A8 8 0 1 1 21 12z" /><path d="M9 11h6M9 14h4" /></>,
  cog: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" /></>,
  layers: <><path d="m12 2 10 5-10 5L2 7z" /><path d="m2 12 10 5 10-5M2 17l10 5 10-5" /></>,
  wrench: <path d="M14.7 6.3a4 4 0 0 0-5 5L3 18l3 3 6.7-6.7a4 4 0 0 0 5-5l-2.4 2.4-2.6-.6-.6-2.6z" />,
  box: <><path d="M21 8 12 3 3 8v8l9 5 9-5z" /><path d="m3 8 9 5 9-5M12 13v8" /></>,
  headset: <><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="2" y="14" width="5" height="6" rx="2" /><rect x="17" y="14" width="5" height="6" rx="2" /></>,
  users: <><circle cx="9" cy="8" r="3.5" /><path d="M2 21a7 7 0 0 1 14 0M17 4a3.5 3.5 0 0 1 0 7M22 21a7 7 0 0 0-4-6.3" /></>,
  sync: <path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5" />,
  arrow: <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>,
  check: <path d="M20 6 9 17l-5-5" />,
};
function Ic({ n, s = 18, c = G, w = 1.8 }: { n: string; s?: number; c?: string; w?: number }) {
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICONS[n]}</svg>;
}

function Pill({ t, bg, fg }: { t: string; bg: string; fg: string }) {
  return <span style={{ fontSize: 10.5, fontWeight: 600, background: bg, color: fg, padding: "3px 9px", borderRadius: 99, whiteSpace: "nowrap" }}>{t}</span>;
}
/* status pills stay inside the Manufacturing palette: graphite, steel and cool greys, with blue only for active states */
const OK = [CG, G], WARN = ["#94A3B8", G], BLUE = [PB, BL], GREY = [PG, ST], RED = [G, "#fff"];

function Shell({ title, children, float }: { title: string; children: ReactNode; float?: ReactNode }) {
  return (
    <div style={{ position: "relative", background: "#fff", borderRadius: 14, boxShadow: "0 30px 60px -34px rgba(15,23,42,.55)", overflow: "visible", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "13px 18px", borderBottom: `1px solid ${PG}` }}>
        <span style={{ display: "flex", gap: 5 }}>{["#F87171", "#FBBF24", "#34D399"].map((c) => <i key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />)}</span>
        <b style={{ fontSize: 12.5, color: G }}>{title}</b>
      </div>
      <div style={{ padding: 18, flex: 1, minHeight: 0 }}>{children}</div>
      {float}
    </div>
  );
}
function Float({ style, children }: { style: CSSProperties; children: ReactNode }) {
  return <div className="st-float" style={{ position: "absolute", background: "#fff", border: `1px solid ${CG}`, borderRadius: 11, boxShadow: "0 22px 40px -22px rgba(15,23,42,.6)", padding: "9px 13px", fontSize: 11.5, color: G, fontWeight: 700, display: "flex", alignItems: "center", gap: 9, ...style }}>{children}</div>;
}
const row: CSSProperties = { display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: `1px solid ${PG}`, fontSize: 12.5, color: G };
const sub: CSSProperties = { display: "block", fontSize: 10.5, fontWeight: 400, color: SL, marginTop: 1 };
const avatar = (t: string): ReactNode => <span style={{ width: 30, height: 30, borderRadius: "50%", background: PB, color: BL, fontSize: 10.5, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{t}</span>;

function VisCrm() {
  const rows: [string, string, string, string, string[]][] = [
    ["AI", "ABC Industries", "Industrial equipment", "₹4.8L", [...BLUE, "Proposal"] as string[]],
    ["NS", "Northstar Engineering", "Machinery components", "₹2.1L", [...WARN, "Qualified"] as string[]],
    ["RM", "Rivermark Fabrication", "Custom fabrication", "₹6.4L", [...OK, "Negotiation"] as string[]],
    ["UC", "Unity Controls", "Control panels", "₹1.2L", [...GREY, "New enquiry"] as string[]],
  ];
  return (
    <Shell title="CRM · Opportunities" float={<Float style={{ right: -14, bottom: -16 }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: BL }} />Follow-up today · 3:00 PM</Float>}>
      <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>{["All", "Open", "Won"].map((t, i) => <span key={t} style={{ fontSize: 11.5, fontWeight: 600, padding: "5px 12px", borderRadius: 99, background: i === 1 ? G : PG, color: i === 1 ? "#fff" : ST }}>{t}</span>)}</div>
      {rows.map(([a, n, d, v, [bg, fg, l]]) => (
        <div key={n} style={row}>{avatar(a)}<span style={{ flex: 1, fontWeight: 700 }}>{n}<span style={sub}>{d}</span></span><b>{v}</b><Pill t={l} bg={bg} fg={fg} /></div>
      ))}
    </Shell>
  );
}

function VisCpq() {
  const opts: [string, string][] = [["Housing", "Aluminium"], ["Motor", "High torque"], ["Mounting", "Base mount"], ["Seal", "IP65"]];
  return (
    <Shell title="ConfigX · Industrial Control Unit" float={<Float style={{ left: -14, bottom: 26 }}><Ic n="check" s={14} c={BL} w={2.6} />Quote ready to send</Float>}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, height: "100%" }}>
        <div style={{ borderRadius: 10, minHeight: 190, backgroundImage: `url(${MOTOR})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {opts.map(([a, b]) => <div key={a} style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, padding: "8px 10px", border: `1px solid ${CG}`, borderRadius: 8, color: SL }}>{a}<b style={{ color: G }}>{b}</b></div>)}
          <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 10.5, color: SL }}>Estimated price<b style={{ display: "block", fontSize: 21, color: G }}>₹4,440</b></span>
            <span style={{ fontSize: 11.5, fontWeight: 700, color: "#fff", background: G, padding: "9px 12px", borderRadius: 8 }}>Create quote</span>
          </div>
        </div>
      </div>
    </Shell>
  );
}

function VisProjects() {
  const bars: [string, number, number, number][] = [["Site survey", 0, 22, 100], ["Delivery", 18, 30, 100], ["Installation", 44, 28, 60], ["Commissioning", 70, 24, 0]];
  return (
    <Shell title="Projects · Line 3 installation" float={<Float style={{ right: -14, top: 62 }}><Ic n="layers" s={14} c={BL} />Milestone: Delivery complete</Float>}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5, color: LS, margin: "0 0 10px 112px" }}>{["Week 1", "Week 2", "Week 3", "Week 4"].map((w) => <span key={w}>{w}</span>)}</div>
      {bars.map(([n, l, w, p]) => (
        <div key={n} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 0", borderBottom: `1px solid ${PG}` }}>
          <span style={{ width: 100, fontSize: 12, fontWeight: 600, color: G }}>{n}</span>
          <div style={{ position: "relative", flex: 1, height: 16 }}>
            <div style={{ position: "absolute", left: `${l}%`, width: `${w}%`, height: 16, borderRadius: 5, background: PB, overflow: "hidden" }}><div style={{ width: `${p}%`, height: "100%", background: BL }} /></div>
          </div>
        </div>
      ))}
      <div style={{ display: "flex", gap: 8, marginTop: 14 }}>{[["Owner", "Meera S."], ["Due", "28 Nov"], ["Progress", "62%"]].map(([a, b]) => <span key={a} style={{ fontSize: 11, color: SL, background: PG, padding: "6px 10px", borderRadius: 8 }}>{a} <b style={{ color: G }}>{b}</b></span>)}</div>
    </Shell>
  );
}

function VisService() {
  const wo: [string, string, string, string[]][] = [
    ["WO-2041", "Preventive maintenance · Line 2", "Ravi K.", [...BLUE, "Scheduled"] as string[]],
    ["WO-2042", "Gearbox inspection · Plant B", "Anita D.", [...WARN, "In progress"] as string[]],
    ["WO-2043", "Spare part replacement", "Sameer P.", [...OK, "Completed"] as string[]],
  ];
  return (
    <Shell title="ServiceOps · Work orders" float={<Float style={{ left: -14, bottom: 34 }}><Ic n="wrench" s={14} c={BL} />Technician dispatched · ETA 25 min</Float>}>
      {wo.map(([id, d, who, [bg, fg, l]]) => (
        <div key={id} style={row}><span style={{ width: 34, height: 34, borderRadius: 9, background: PG, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Ic n="wrench" s={16} c={ST} /></span><span style={{ flex: 1, fontWeight: 700 }}>{id}<span style={sub}>{d}</span></span><span style={{ fontSize: 11, color: SL }}>{who}</span><Pill t={l} bg={bg} fg={fg} /></div>
      ))}
      <div style={{ marginTop: 14, borderRadius: 10, background: PG, padding: "12px 14px", fontSize: 11.5, color: ST, display: "flex", justifyContent: "space-between" }}><span>Next visit<b style={{ display: "block", color: G, fontSize: 13 }}>Tue, 10:00 · Plant B</b></span><span>Warranty<b style={{ display: "block", color: G, fontSize: 13 }}>Active · 8 months</b></span></div>
    </Shell>
  );
}

function VisInvBill() {
  const stock: [string, string, string, string[]][] = [["ICU-420", "Control unit", "12", [...OK, "In stock"] as string[]], ["GBX-210", "Gearbox", "4", [...WARN, "Low"] as string[]], ["SEAL-IP65", "Seal kit", "86", [...OK, "In stock"] as string[]]];
  return (
    <Shell title="Inventory · Billing" float={<Float style={{ right: -14, bottom: 22 }}><Ic n="check" s={14} c={BL} w={2.6} />INV-4871 paid · ₹4,820</Float>}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: LS, marginBottom: 2 }}>Availability</div>
      {stock.map(([sku, n, q, [bg, fg, l]]) => (
        <div key={sku} style={{ ...row, padding: "9px 0" }}><span style={{ flex: 1, fontWeight: 700 }}>{sku}<span style={sub}>{n}</span></span><b>{q} units</b><Pill t={l} bg={bg} fg={fg} /></div>
      ))}
      <div style={{ marginTop: 14, border: `1px solid ${CG}`, borderRadius: 10, padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: G }}>Invoice INV-4871<span style={sub}>ABC Industries · Net 30</span></span>
        <span style={{ textAlign: "right" }}><b style={{ fontSize: 15, color: G }}>₹4,820</b><br /><Pill t="Paid" bg={OK[0]} fg={OK[1]} /></span>
      </div>
    </Shell>
  );
}

function VisDesk() {
  const t: [string, string, string, string[]][] = [
    ["Seal leaking on unit ICU-420", "ABC Industries · #3318", "SLA 2h", [...RED, "High"] as string[]],
    ["Request for spare parts list", "Northstar Engineering · #3317", "SLA 6h", [...WARN, "Medium"] as string[]],
    ["Commissioning documents", "Rivermark Fabrication · #3314", "Resolved", [...OK, "Closed"] as string[]],
  ];
  return (
    <Shell title="Desk · Tickets" float={<Float style={{ left: -14, bottom: 30 }}><Ic n="headset" s={14} c={BL} />Reply sent to customer</Float>}>
      {t.map(([a, b, sla, [bg, fg, l]]) => (
        <div key={b} style={row}><span style={{ flex: 1, fontWeight: 700 }}>{a}<span style={sub}>{b}</span></span><span style={{ fontSize: 11, color: SL }}>{sla}</span><Pill t={l} bg={bg} fg={fg} /></div>
      ))}
      <div style={{ marginTop: 14, display: "flex", gap: 10, alignItems: "flex-start" }}>{avatar("AI")}<div style={{ background: PG, borderRadius: "4px 12px 12px 12px", padding: "9px 12px", fontSize: 11.5, color: ST, lineHeight: 1.5 }}>Thanks for flagging this. A technician has been scheduled for tomorrow morning.</div></div>
    </Shell>
  );
}

function VisPeople() {
  const staff: [string, string, string, string[]][] = [
    ["RK", "Ravi Kumar", "Field technician · Plant B", [...OK, "Active"] as string[]],
    ["AD", "Anita Das", "Service coordinator", [...OK, "Active"] as string[]],
    ["SP", "Sameer Patel", "Line supervisor", [...WARN, "On leave"] as string[]],
  ];
  return (
    <Shell title="HRMS · Skillberry" float={<Float style={{ right: -14, bottom: 26 }}><Ic n="check" s={14} c={BL} w={2.6} />Safety training completed</Float>}>
      {staff.map(([a, n, r, [bg, fg, l]]) => (
        <div key={n} style={row}>{avatar(a)}<span style={{ flex: 1, fontWeight: 700 }}>{n}<span style={sub}>{r}</span></span><Pill t={l} bg={bg} fg={fg} /></div>
      ))}
      <div style={{ marginTop: 16, border: `1px solid ${CG}`, borderRadius: 10, padding: "12px 14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 700, color: G }}>Machine operation certification<span style={{ color: SL, fontWeight: 600 }}>72%</span></div>
        <div style={{ marginTop: 9, height: 7, borderRadius: 4, background: PG }}><div style={{ width: "72%", height: "100%", borderRadius: 4, background: BL }} /></div>
        <div style={{ marginTop: 7, fontSize: 10.5, color: SL }}>Skills and training progress across the team</div>
      </div>
    </Shell>
  );
}

function VisSync() {
  const left = ["CRM", "Inventory", "Billing"];
  const right = ["ERP", "Accounting", "Spreadsheets"];
  const node = (t: string, on: boolean) => <span key={t} style={{ fontSize: 12, fontWeight: 700, color: on ? "#fff" : G, background: on ? BL : PG, border: on ? 0 : `1px solid ${CG}`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>{t}</span>;
  return (
    <Shell title="Sync · Connected systems" float={<Float style={{ left: -14, bottom: 30 }}><Ic n="sync" s={14} c={BL} />Last sync · 2 min ago</Float>}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 70px 1fr", alignItems: "center", gap: 6, minHeight: 190 }}>
        <div style={{ display: "grid", gap: 12 }}>{left.map((t) => node(t, true))}</div>
        <div style={{ display: "grid", gap: 12, justifyItems: "center" }}>
          {[0, 1, 2].map((i) => <span key={i} style={{ width: "100%", height: 2, backgroundImage: `repeating-linear-gradient(90deg, ${BL} 0 5px, transparent 5px 9px)`, position: "relative" }}><i style={{ position: "absolute", right: -2, top: -4, borderLeft: `7px solid ${BL}`, borderTop: "5px solid transparent", borderBottom: "5px solid transparent" }} /></span>)}
        </div>
        <div style={{ display: "grid", gap: 12 }}>{right.map((t) => node(t, false))}</div>
      </div>
      <div style={{ marginTop: 14, fontSize: 11, color: SL, textAlign: "center" }}>EVOQ products and your existing systems, kept in step</div>
    </Shell>
  );
}

type Tab = { tab: string; ic: string; title: string; line: string; apps: [string, string][]; vis: () => ReactNode };
const IC = (f: string) => `/billing/images/${f}`;
const TABS: Tab[] = [
  { tab: "Growth", ic: "chat", title: "Growth", line: "Customer relationships, demand generation and product configuration.", apps: [[IC("crm-menu-icn.png"), "CRM"], [IC("campaigns-menu-icn.png"), "Campaigns"], [IC("ConfigX-menu-icn.png"), "ConfigX"]], vis: VisCrm },
  { tab: "Operations", ic: "wrench", title: "Operations", line: "Project coordination, service delivery and customer support.", apps: [[IC("serviceops-icon.svg"), "ServiceOps"], [IC("evoq-projects-menu-icn.png"), "Projects"], [IC("desk-menu-icn.png"), "Desk"]], vis: VisService },
  { tab: "People", ic: "users", title: "People", line: "Employee administration, learning and workforce development.", apps: [[IC("hrms-menu-icn-new.png"), "HRMS"], [IC("Skillberry-menu-icn.png"), "Skillberry"]], vis: VisPeople },
  { tab: "Finance", ic: "box", title: "Finance", line: "Invoicing, revenue and inventory information.", apps: [[IC("billing-menu-icn.png"), "Billing"], [IC("inventory-menu-icn.png"), "Inventory"]], vis: VisInvBill },
  { tab: "Platform", ic: "layers", title: "Platform", line: "Data synchronization across products and systems.", apps: [[IC("sync-menu-icn.png"), "Sync"]], vis: VisSync },
];

export function SolutionsTabs() {
  const [i, setI] = useState(0);
  const t = TABS[i];
  const Vis = t.vis;
  return (
    <section id="solutions" style={{ position: "relative", overflow: "hidden", background: "linear-gradient(180deg, #111827 0%, #1F2933 100%)", padding: "88px 0 80px", color: "#fff" }}>
      <style>{`
        @keyframes stIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
        .st-in{animation:stIn .45s ease both}
        @keyframes stFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        .st-float{animation:stFloat 6s ease-in-out infinite;z-index:3}
        .st-tabs::-webkit-scrollbar{display:none}
        .st-grid{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:56px;align-items:center}
        @media (max-width:900px){.st-grid{grid-template-columns:1fr;gap:34px}.st-frame{padding:16px!important}.st-float{display:none}}
        @media (prefers-reduced-motion:reduce){.st-in,.st-float{animation:none}}
      `}</style>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)", backgroundSize: "44px 44px", maskImage: "radial-gradient(70% 80% at 50% 40%, #000, transparent)", WebkitMaskImage: "radial-gradient(70% 80% at 50% 40%, #000, transparent)" }} />
      <div aria-hidden="true" style={{ position: "absolute", left: "55%", top: "28%", width: 640, height: 480, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(37,99,235,.16), rgba(37,99,235,0))", filter: "blur(30px)" }} />
      <div className="mf-wrap" style={{ position: "relative" }}>
        <div style={{ textAlign: "center", margin: "0 auto" }}>
          <p style={{ margin: "0 0 14px", fontSize: 11, fontWeight: 600, letterSpacing: ".22em", textTransform: "uppercase", color: LB }}>EVOQ solutions for manufacturing</p>
          <h2 className="mf-h2 mf-one" style={{ color: "#fff" }}>Products that support the manufacturing lifecycle</h2>
          <p style={{ margin: "18px auto 0", fontSize: 15.5, lineHeight: 1.7, color: "rgba(255,255,255,.72)" }}>From customer acquisition and product configuration to service delivery and financial operations, explore the EVOQ products relevant to your manufacturing requirements.</p>
        </div>

        <div className="st-tabs" role="tablist" aria-label="Manufacturing solutions" style={{ display: "flex", gap: 4, width: "fit-content", maxWidth: "100%", margin: "36px auto 0", padding: 6, background: "#fff", borderRadius: 99, boxShadow: "0 18px 40px -20px rgba(0,0,0,.6)", overflowX: "auto", scrollbarWidth: "none" }}>
          {TABS.map((x, n) => (
            <button key={x.tab} type="button" role="tab" aria-selected={n === i} onClick={() => setI(n)} style={{ fontFamily: "inherit", cursor: "pointer", border: 0, whiteSpace: "nowrap", padding: "11px 20px", borderRadius: 99, fontSize: 13.5, fontWeight: n === i ? 700 : 500, color: n === i ? G : SL, background: n === i ? PB : "transparent", transition: "background .2s, color .2s" }}>{x.tab}</button>
          ))}
        </div>

        <div key={i} className="st-grid st-in" style={{ marginTop: 44 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: LB }}>
              <span style={{ width: 34, height: 34, borderRadius: 9, background: "rgba(255,255,255,.1)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Ic n={t.ic} s={17} c={LB} /></span>{t.title}
            </div>
            <h3 style={{ margin: "18px 0 0", fontSize: 32, lineHeight: 1.2, fontWeight: 600, letterSpacing: "-.02em", color: "#fff", maxWidth: "20ch" }}>{t.line}</h3>
            <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 10 }}>
              {t.apps.map(([img, name]) => (
                <span key={name} style={{ display: "inline-flex", alignItems: "center", gap: 9, height: 44, padding: "0 16px 0 10px", borderRadius: 12, background: "#fff", boxShadow: "0 14px 28px -16px rgba(0,0,0,.6)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt="" width={28} height={28} style={{ width: 28, height: 28, objectFit: "contain" }} />
                  <b style={{ fontSize: 14.5, color: G }}>{name}</b>
                </span>
              ))}
            </div>
          </div>
          <div className="st-frame" style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.14)", borderRadius: 20, padding: 28, minHeight: 400 }}>
            <Vis />
          </div>
        </div>

      </div>
    </section>
  );
}
