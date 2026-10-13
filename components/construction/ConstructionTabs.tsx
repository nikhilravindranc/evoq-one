"use client";

import { useState, type CSSProperties } from "react";

const TERRA = "#B4533C";
const CLAY = "#7C2D1F";
const SAND = "#D6B88C";
const LSAND = "#E8D8BF";

const U = (id: string, w = 1000) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;
const I = (f: string) => `/billing/images/${f}`;
const ICON: Record<string, string> = {
  CRM: I("crm-menu-icn.png"), Projects: I("evoq-projects-menu-icn.png"), Inventory: I("inventory-menu-icn.png"), Billing: I("billing-menu-icn.png"),
  Desk: I("desk-menu-icn.png"), Campaigns: I("campaigns-menu-icn.png"), ServiceOps: I("serviceops-icon.svg"), HRMS: I("hrms-menu-icn-new.png"),
};

type Tab = { tab: string; sub: string; title: string; body: string; help: [string, string][]; products: string[]; img: string };
const TABS: Tab[] = [
  {
    tab: "Construction", sub: "Projects, sites and handovers", title: "From project planning to site handover",
    body: "Construction companies and contractors coordinate project activities, client communication, materials-related processes and commercial responsibilities throughout project delivery. EVOQ products may support relevant parts of this work, depending on your requirements.",
    help: [["Project coordination", "Organize project activities, responsibilities and delivery milestones."], ["Client relationships", "Track enquiries, maintain contact records and manage follow-up."], ["Inventory and commercial processes", "Support relevant inventory activities and billing."], ["Post-handover service", "Coordinate applicable service requests and related activities."]],
    products: ["Projects", "CRM", "Inventory", "Billing", "ServiceOps"], img: U("1778074762022-c33cc42f79ae", 1100),
  },
  {
    tab: "Engineering", sub: "Technical projects and delivery", title: "Coordinate technical projects and delivery",
    body: "Engineering firms manage client engagements, project responsibilities, delivery milestones and the commercial administration associated with technical work. EVOQ products may support these operational requirements alongside existing specialist engineering systems.",
    help: [["Project delivery", "Organize activities, responsibilities and milestones."], ["Client relationships", "Maintain enquiry records, opportunities and communication."], ["Resource administration", "Support relevant people administration."], ["Commercial coordination", "Handle applicable billing and inventory-related activities."]],
    products: ["Projects", "CRM", "HRMS", "Billing", "Inventory"], img: U("1705579611777-ed5eced0a9e9", 1100),
  },
  {
    tab: "Real Estate", sub: "Property enquiries and transactions", title: "Move property enquiries towards a decision",
    body: "Real estate agencies, developers and property organizations manage enquiries, prospective buyers and tenants, ongoing communication and transaction-related administration. EVOQ products may support these activities across the sales relationship and applicable property-related service processes.",
    help: [["Enquiry management", "Capture prospects and maintain property-related enquiry records."], ["Sales follow-up", "Track opportunities and maintain communication throughout the sales process."], ["Prospect engagement", "Support relevant campaigns and follow-up activities."], ["Commercial and service processes", "Handle applicable billing and property-related service requests."]],
    products: ["CRM", "Campaigns", "Billing", "Desk", "ServiceOps"], img: U("1748063578185-3d68121b11ff", 1100),
  },
];

export function ConstructionTabs() {
  const [i, setI] = useState(0);
  const t = TABS[i];
  const photo: CSSProperties = { backgroundImage: `url(${t.img})`, backgroundSize: "cover", backgroundPosition: "center" };
  return (
    <section id="solutions" style={{ position: "relative", overflow: "hidden", background: CLAY, color: "#fff", padding: "96px 0 100px", backgroundImage: "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)", backgroundSize: "56px 56px" }}>
      <style>{`
        @keyframes ctIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
        .ct-in{animation:ctIn .45s ease both}
        .ct-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.05fr);gap:56px;align-items:start}
        .ct-help{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
        .ct-tabs::-webkit-scrollbar{display:none}
        @media (max-width:980px){.ct-grid{grid-template-columns:1fr;gap:34px}}
        @media (max-width:560px){.ct-help{grid-template-columns:1fr}}
        @media (prefers-reduced-motion:reduce){.ct-in{animation:none}}
      `}</style>
      <div className="cn-wrap">
        <div style={{ maxWidth: 760 }}>
          <p style={{ margin: "0 0 16px", display: "flex", alignItems: "center", gap: 12, fontSize: 11.5, fontWeight: 600, letterSpacing: ".22em", textTransform: "uppercase", color: SAND }}><span style={{ width: 28, height: 2, background: SAND }} />Solutions by industry</p>
          <h2 style={{ margin: 0, fontSize: 42, lineHeight: 1.1, letterSpacing: "-.025em", fontWeight: 600, color: "#fff" }}>Find the right product combination for your operation</h2>
          <p style={{ margin: "18px 0 0", fontSize: 16, lineHeight: 1.75, color: "#EBD9CC", maxWidth: "58ch" }}>Explore how EVOQ products may support the operational needs of construction companies, engineering firms and real estate organizations.</p>
        </div>

        <div className="ct-tabs" role="tablist" aria-label="Industry solutions" style={{ marginTop: 40, display: "flex", gap: 0, borderBottom: "1px solid rgba(255,255,255,.2)", overflowX: "auto", scrollbarWidth: "none" }}>
          {TABS.map((x, n) => (
            <button key={x.tab} type="button" role="tab" aria-selected={n === i} onClick={() => setI(n)} style={{ fontFamily: "inherit", cursor: "pointer", border: 0, background: n === i ? "rgba(255,255,255,.1)" : "transparent", color: n === i ? "#fff" : "#E0C9BD", padding: "16px 28px", textAlign: "left", borderBottom: `3px solid ${n === i ? SAND : "transparent"}`, marginBottom: -1, whiteSpace: "nowrap", transition: "background .2s" }}>
              <span style={{ display: "block", fontSize: 16, fontWeight: 700 }}>{x.tab}</span>
              <span style={{ display: "block", fontSize: 12, fontWeight: 400, opacity: 0.8, marginTop: 2 }}>{x.sub}</span>
            </button>
          ))}
        </div>

        <div key={i} className="ct-grid ct-in" style={{ marginTop: 44 }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 32, lineHeight: 1.2, fontWeight: 600, letterSpacing: "-.02em" }}>{t.title}</h3>
            <p style={{ margin: "16px 0 0", fontSize: 15.5, lineHeight: 1.8, color: "#EBD9CC" }}>{t.body}</p>
            <div style={{ marginTop: 28, fontSize: 10.5, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: SAND }}>Relevant EVOQ products</div>
            <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {t.products.map((a) => (
                <span key={a} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px 6px 7px", borderRadius: 4, background: "#fff", color: CLAY, fontSize: 13, fontWeight: 700 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ICON[a]} alt="" width={22} height={22} style={{ width: 22, height: 22, objectFit: "contain", borderRadius: 5 }} />{a}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div style={{ position: "relative", height: 250, borderRadius: 4, ...photo, boxShadow: "0 40px 70px -40px rgba(0,0,0,.7)" }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(41,37,36,0) 55%, rgba(41,37,36,.55))" }} />
              <span style={{ position: "absolute", left: 16, bottom: 14, fontSize: 11, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "#fff" }}>{t.tab}</span>
            </div>
            <div style={{ marginTop: 20, fontSize: 10.5, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: SAND }}>Where products may help</div>
            <div className="ct-help" style={{ marginTop: 12 }}>
              {t.help.map(([h, d], n) => (
                <div key={h} style={{ background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.16)", borderTop: `3px solid ${n === 0 ? SAND : TERRA}`, borderRadius: 4, padding: "16px 16px 18px" }}>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>{h}</div>
                  <p style={{ margin: "7px 0 0", fontSize: 13, lineHeight: 1.65, color: "#EBD9CC" }}>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <span style={{ display: "none", color: LSAND }} />
    </section>
  );
}
