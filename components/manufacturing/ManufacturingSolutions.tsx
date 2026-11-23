"use client";

import { useEffect, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import { ConfigXWindow } from "./ConfigX";

/* The manufacturing solutions: the work a manufacturer does, in the order a sale moves, and the EVOQ apps that run each
   part. Pick a solution to see its app screen. Copy is plain and uses only what each app does. */

const G = "#1F2933";
const ST = "#475569";
const SL = "#64748B";
const LS = "#94A3B8";
const CG = "#CBD5E1";
const PG = "#F1F5F9";
const BL = "#2563EB";
const PB = "#DBEAFE";
const LB = "#DBEAFE";


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


function VisOrders() {
  const ord: [string, string, string, string[]][] = [
    ["ORD-1186", "ABC Industries · Industrial Control Unit", "₹4,820", [...BLUE, "Confirmed"] as string[]],
    ["ORD-1185", "Northstar Engineering · Gearbox set", "₹2,100", [...OK, "Invoiced"] as string[]],
    ["ORD-1184", "Rivermark Fabrication · Seal kits", "₹6,400", [...OK, "Paid"] as string[]],
  ];
  return (
    <Shell title="Orders · Billing" float={<Float style={{ right: -14, bottom: 22 }}><Ic n="check" s={14} c={BL} w={2.6} />INV-4871 paid · ₹4,820</Float>}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: LS, marginBottom: 2 }}>Orders from agreed quotes</div>
      {ord.map(([id, n, v, [bg, fg, l]]) => (
        <div key={id} style={{ ...row, padding: "9px 0" }}><span style={{ flex: 1, fontWeight: 700 }}>{id}<span style={sub}>{n}</span></span><b>{v}</b><Pill t={l} bg={bg} fg={fg} /></div>
      ))}
      <div style={{ marginTop: 14, border: `1px solid ${CG}`, borderRadius: 10, padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: G }}>Invoice INV-4871<span style={sub}>ABC Industries · Net 30</span></span>
        <span style={{ textAlign: "right" }}><b style={{ fontSize: 15, color: G }}>₹4,820</b><br /><Pill t="Paid" bg={OK[0]} fg={OK[1]} /></span>
      </div>
    </Shell>
  );
}

function VisStock() {
  const stock: [string, string, string, string[]][] = [["ICU-420", "Control unit", "12", [...OK, "In stock"] as string[]], ["GBX-210", "Gearbox", "4", [...WARN, "Low"] as string[]], ["SEAL-IP65", "Seal kit", "86", [...OK, "In stock"] as string[]]];
  return (
    <Shell title="Inventory · Stock" float={<Float style={{ left: -14, bottom: 30 }}><Ic n="box" s={14} c={BL} />Open orders checked against stock</Float>}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: LS, marginBottom: 2 }}>Availability</div>
      {stock.map(([sku, n, q, [bg, fg, l]]) => (
        <div key={sku} style={{ ...row, padding: "9px 0" }}><span style={{ flex: 1, fontWeight: 700 }}>{sku}<span style={sub}>{n}</span></span><b>{q} units</b><Pill t={l} bg={bg} fg={fg} /></div>
      ))}
      <div style={{ marginTop: 14, borderRadius: 10, background: PG, padding: "12px 14px", fontSize: 11.5, color: ST, display: "flex", justifyContent: "space-between" }}>
        <span>Open orders need<b style={{ display: "block", color: G, fontSize: 13 }}>GBX-210 · 6 units</b></span>
        <span>On hand<b style={{ display: "block", color: G, fontSize: 13 }}>4 units</b></span>
      </div>
    </Shell>
  );
}

/* ---------- the explorer ---------- */
const IC = (f: string) => `/billing/images/${f}`;
const MARK: Record<string, string> = {
  CRM: IC("crm-menu-icn.png"),
  Campaigns: IC("campaigns-menu-icn.png"),
  ConfigX: IC("ConfigX-menu-icn.png"),
  Billing: IC("billing-menu-icn.png"),
  Projects: IC("evoq-projects-menu-icn.png"),
  Inventory: IC("inventory-menu-icn.png"),
  ServiceOps: IC("serviceops-icon.svg"),
  Desk: IC("desk-menu-icn.png"),
  HRMS: IC("hrms-menu-icn-new.png"),
  Skillberry: IC("Skillberry-menu-icn.png"),
  Sync: IC("sync-menu-icn.png"),
};

const LINE: Record<string, string> = {
  CRM: "Enquiries, accounts and opportunities",
  Campaigns: "Product news and offers to distributors",
  ConfigX: "Guided options, a visual result and the price",
  Billing: "Invoices and payments against each order",
  Projects: "Tasks, owners and dates",
  Inventory: "Stock tracked against open orders",
  ServiceOps: "Work orders and technician visits",
  Desk: "Support requests tracked until resolved",
  HRMS: "Employee records",
  Skillberry: "Training and certifications",
  Sync: "Keeps EVOQ and your systems in step",
};

const PHOTO = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1400&q=75`;

const SOLUTIONS: { t: string; d: string; apps: string[]; img: string; vis: () => ReactNode }[] = [
  { t: "Enquiries and customer relationships", d: "Every enquiry, account and opportunity recorded with a follow-up owner, so no buyer or distributor request goes cold. Product news and offers go out to distributors and past customers.", apps: ["CRM", "Campaigns"], img: PHOTO("1532634902-bbce41c89ef6"), vis: VisCrm },
  { t: "Configuration and quotes", d: "Sales chooses options, dimensions and materials against what the buyer needs, sees the result, and sends a quote that matches the configuration and its price.", apps: ["ConfigX"], img: PHOTO("1740209475472-aa7d280f7452"), vis: () => <ConfigXWindow /> },
  { t: "Orders and invoicing", d: "The agreed quote becomes an order, and invoices and payments are recorded against it.", apps: ["CRM", "Billing"], img: PHOTO("1738966523829-5d3c195abce3"), vis: VisOrders },
  { t: "Production and delivery", d: "Preparation, production and delivery tasks with owners and dates, tracked against the delivery commitment.", apps: ["Projects"], img: PHOTO("1764185800646-f75f7e16e465"), vis: VisProjects },
  { t: "Stock and supply", d: "Components and finished stock tracked against open orders, so you know what can ship.", apps: ["Inventory"], img: PHOTO("1644079446600-219068676743"), vis: VisStock },
  { t: "Installation and service", d: "Work orders, technician visits and warranty dates, with service history that stays with the product after it ships.", apps: ["ServiceOps"], img: PHOTO("1778074762033-c6595907684d"), vis: VisService },
  { t: "Customer support", d: "Requests from customers and distributors tracked until they are resolved.", apps: ["Desk"], img: PHOTO("1766066014237-00645c74e9c6"), vis: VisDesk },
  { t: "Plant and field teams", d: "Employee records, training and certifications for operators and technicians.", apps: ["HRMS", "Skillberry"], img: PHOTO("1598299803204-b73796f43289"), vis: VisPeople },
  { t: "Connected to your systems", d: "EVOQ apps and your ERP, accounting and spreadsheets kept in step.", apps: ["Sync"], img: PHOTO("1717386255767-52643970d483"), vis: VisSync },
];

function useMedia(q: string) {
  return useSyncExternalStore(
    (cb) => { const m = window.matchMedia(q); m.addEventListener("change", cb); return () => m.removeEventListener("change", cb); },
    () => window.matchMedia(q).matches,
    () => false,
  );
}

const TOUR_MS = 6500;

export function ManufacturingSolutions() {
  const [i, setI] = useState(0);
  const [tour, setTour] = useState(true);
  const [held, setHeld] = useState(false);
  const mobile = useMedia("(max-width:899px)");
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const running = tour && !held && !mobile && !reduced;

  // the solutions take turns on their own until a visitor picks one or is using a screen
  useEffect(() => {
    if (!running) return;
    const id = setTimeout(() => setI((n) => (n + 1) % SOLUTIONS.length), TOUR_MS);
    return () => clearTimeout(id);
  }, [i, running]);

  const pick = (n: number) => { setI(n); setTour(false); };
  const on = SOLUTIONS[i];
  const Vis = on.vis;
  // a photo for the solution, with its app screen laid over it
  const frame = (
    <div className={`ms-frame${on.apps.length > 1 ? " two" : ""}`} role={mobile ? undefined : "tabpanel"} aria-label={on.t}>
      <div key={`p${i}`} className="ms-photo ms-fade" style={{ backgroundImage: `url(${on.img})` }} />
      <div className="ms-scrim" aria-hidden="true" />
      <div className="ms-cap">
        {on.apps.map((a) => (
          <div key={a}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={MARK[a]} alt="" width={30} height={30} style={{ width: 30, height: 30, objectFit: "contain" }} />
            <span><b>{a}</b><small>{LINE[a]}</small></span>
          </div>
        ))}
      </div>
      <div className="ms-stage" onMouseEnter={() => setHeld(true)} onMouseLeave={() => setHeld(false)} onFocus={() => setHeld(true)} onBlur={() => setHeld(false)}>
        <div key={i} className="ms-in"><Vis /></div>
      </div>
    </div>
  );
  return (
    <section id="solutions" style={{ position: "relative", overflow: "hidden", background: "linear-gradient(180deg, #111827 0%, #1F2933 100%)", padding: "88px 0 96px", color: "#fff" }}>
      <style>{`
        @keyframes msIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
        @keyframes msFade{from{opacity:0}to{opacity:1}}
        @keyframes msProg{from{transform:scaleX(0)}to{transform:scaleX(1)}}
        .ms-in{animation:msIn .45s ease both}
        .ms-fade{animation:msFade .6s ease both}
        @keyframes stFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        .st-float{animation:stFloat 6s ease-in-out infinite;z-index:3}
        .ms-grid{display:grid;grid-template-columns:minmax(0,.78fr) minmax(0,1.22fr);gap:44px;align-items:start}
        .ms-hint{display:flex;align-items:center;justify-content:space-between;margin:0 0 12px;padding:0 4px;font-size:11.5px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.6)}
        .ms-list{list-style:none;margin:0;padding:0;border-bottom:1px solid rgba(255,255,255,.16)}
        .ms-item{position:relative;border-top:1px solid rgba(255,255,255,.16)}
        .ms-item.on,.ms-item.on+.ms-item{border-top-color:transparent}
        .ms-item>button{all:unset;box-sizing:border-box;display:flex;align-items:center;gap:14px;width:100%;padding:15px 16px;border-radius:14px;cursor:pointer;color:rgba(255,255,255,.82);font-size:15.5px;font-weight:600;line-height:1.3;transition:background .2s ease,color .2s ease}
        .ms-item>button:hover{background:rgba(255,255,255,.08);color:#fff}
        .ms-item>button:focus-visible{outline:2px solid ${LB};outline-offset:2px}
        .ms-item>button i{flex:0 0 auto;font-style:normal;font-size:11px;font-weight:600;letter-spacing:.14em;color:${LS};width:22px}
        .ms-item>button span{flex:1}
        .ms-item>button svg{flex:0 0 auto;width:18px;height:18px;opacity:.55;transition:transform .2s ease,opacity .2s ease}
        .ms-item>button:hover svg{opacity:1;transform:translateX(3px)}
        .ms-item.on>button{background:#fff;color:${G};font-weight:700;box-shadow:0 18px 36px -22px rgba(0,0,0,.7)}
        .ms-item.on>button i{color:${BL}}
        .ms-item.on>button svg{opacity:1;color:${BL};transform:none}
        .ms-prog{position:absolute;left:16px;right:16px;top:calc(100% - 0px);height:0}
        .ms-item.on>button{position:relative;overflow:hidden}
        .ms-item.on>button::after{content:"";position:absolute;left:0;right:0;bottom:0;height:3px;background:${BL};transform-origin:left;transform:scaleX(0)}
        .ms-item.on.run>button::after{animation:msProg ${TOUR_MS}ms linear both}
        .ms-more{margin:0;padding:12px 16px 22px;animation:msIn .35s ease both}
        .ms-more p{margin:0;font-size:14.5px;line-height:1.7;color:rgba(255,255,255,.82)}
        .ms-cap{position:absolute;left:22px;top:22px;z-index:2;display:grid;gap:8px;max-width:calc(100% - 44px)}
        .ms-cap>div{display:flex;align-items:center;gap:11px;padding:8px 16px 8px 9px;border-radius:12px;background:#fff;box-shadow:0 16px 30px -16px rgba(0,0,0,.65)}
        .ms-cap b{display:block;font-size:13.5px;line-height:1.2;color:${G}}
        .ms-cap small{display:block;font-size:12px;line-height:1.35;color:${ST}}
        .ms-frame{position:relative;overflow:hidden;min-height:560px;border-radius:22px;display:flex;align-items:flex-end;justify-content:flex-end;padding:24px;background:#0B1220;box-shadow:0 40px 80px -40px rgba(0,0,0,.8),0 0 0 1px rgba(255,255,255,.12)}
        .ms-photo{position:absolute;inset:0;background-size:cover;background-position:center}
        .ms-scrim{position:absolute;inset:0;background:linear-gradient(180deg,rgba(17,24,39,.15),rgba(17,24,39,.55))}
        .ms-stage{position:relative;width:88%}
        .ms-item .ms-frame{min-height:0;margin:0 0 4px;padding:120px 12px 12px;display:block}
        .ms-item .ms-frame.two{padding-top:170px}
        .ms-item .ms-cap{left:12px;top:12px;max-width:calc(100% - 24px)}
        .ms-item .ms-stage{width:100%}
        @media (max-width:899px){.ms-grid{grid-template-columns:minmax(0,1fr);gap:0}.st-float{display:none}.ms-hint{margin-bottom:10px}}
        @media (prefers-reduced-motion:reduce){.ms-in,.ms-more,.st-float,.ms-fade{animation:none}.ms-item.on.run>button::after{animation:none}}
      `}</style>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)", backgroundSize: "44px 44px", maskImage: "radial-gradient(70% 80% at 50% 40%, #000, transparent)", WebkitMaskImage: "radial-gradient(70% 80% at 50% 40%, #000, transparent)" }} />
      <div aria-hidden="true" style={{ position: "absolute", left: "55%", top: "28%", width: 640, height: 480, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(37,99,235,.16), rgba(37,99,235,0))", filter: "blur(30px)" }} />
      <div className="mf-wrap" style={{ position: "relative" }}>
        <div style={{ textAlign: "center", margin: "0 auto", maxWidth: 1120 }}>
          <p style={{ margin: "0 0 14px", fontSize: 11, fontWeight: 600, letterSpacing: ".22em", textTransform: "uppercase", color: LB }}>Solutions for manufacturing</p>
          <h2 className="mf-h2" style={{ color: "#fff", textWrap: "balance" }}>Solutions for the way manufacturers sell, build and service.</h2>
          <p style={{ margin: "18px auto 0", fontSize: 16, lineHeight: 1.7, color: "rgba(255,255,255,.74)", maxWidth: "86ch" }}>Each solution runs on EVOQ apps that work together, so what the sales team records is there for production, delivery and service.</p>
        </div>

        <div className="ms-grid" style={{ marginTop: 56 }}>
          <div>
            <p className="ms-hint"><span>Select a solution</span><span>{String(i + 1).padStart(2, "0")} / {String(SOLUTIONS.length).padStart(2, "0")}</span></p>
            <ul className="ms-list" role={mobile ? undefined : "tablist"} aria-label="Manufacturing solutions" aria-orientation="vertical">
              {SOLUTIONS.map((s, n) => (
                <li key={s.t} className={`ms-item${n === i ? " on" : ""}${n === i && running ? " run" : ""}`}>
                  <button type="button" role={mobile ? undefined : "tab"} aria-selected={mobile ? undefined : n === i} aria-expanded={mobile ? n === i : undefined} onClick={() => pick(n)}>
                    <i>0{n + 1}</i><span>{s.t}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </button>
                  {n === i && (
                    <div className="ms-more">
                      <p>{s.d}</p>
                      {mobile && frame}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          {!mobile && frame}
        </div>
      </div>
    </section>
  );
}
