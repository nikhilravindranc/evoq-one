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

type Tab = { tab: string; sub: string; on: string; off: string; icon: string; who: string; title: string; body: string; help: [string, string, string][]; img: string };
const TABS: Tab[] = [
  {
    tab: "Construction", sub: "Projects, sites and handovers", on: "#A2563B", off: "#F7EFE9", icon: "M3 18h18M5 18a7 7 0 0 1 14 0M12 6v5M9 8.5V11M15 8.5V11", who: "Contractors, builders and site teams", title: "From project planning to site handover",
    body: "Keep project activities, client communication, materials and commercial work connected through delivery.",
    help: [["Projects", "Project coordination", "Organize activities, responsibilities and delivery milestones."], ["CRM", "Client relationships", "Track enquiries, keep contact records and follow up."], ["Inventory", "Materials and stock", "Support inventory activities tied to project work."], ["ServiceOps", "Post-handover service", "Coordinate service requests after the project is delivered."]],
    img: "/construction/tab-construction.webp",
  },
  {
    tab: "Engineering", sub: "Technical projects and delivery", on: "#274B7A", off: "#EEF3F8", icon: "M12 3l-6 17M12 3l6 17M8 14h8M9.5 9.5h5M4 20h16", who: "Engineering and technical consulting firms", title: "Coordinate technical projects and delivery",
    body: "Manage client engagements, responsibilities and milestones, and the commercial side of technical work, alongside your specialist engineering tools.",
    help: [["Projects", "Project delivery", "Organize activities, responsibilities and milestones."], ["CRM", "Client relationships", "Maintain enquiry records, opportunities and communication."], ["HRMS", "Resource administration", "Support relevant people administration."], ["Billing", "Commercial coordination", "Handle applicable billing for the work delivered."]],
    img: "/construction/tab-engineering.webp",
  },
  {
    tab: "Real Estate", sub: "Property enquiries and transactions", on: "#2E5A47", off: "#EEF4EF", icon: "M5 21V4h9v17M14 9h5v12M8 8h3M8 12h3M8 16h3M3 21h18", who: "Agencies, developers and property managers", title: "Move property enquiries towards a decision",
    body: "Capture buyer and tenant enquiries, keep the conversation going, and handle the paperwork and service requests that follow.",
    help: [["CRM", "Enquiries and sales follow-up", "Capture prospects and track opportunities through the sales process."], ["Campaigns", "Prospect engagement", "Support relevant campaigns and follow-up activities."], ["Billing", "Commercial processes", "Handle applicable billing and transaction administration."], ["Desk", "Property service requests", "Manage tenant and owner requests in one place."]],
    img: "/construction/tab-real-estate.webp",
  },
];

export function ConstructionTabs() {
  const [i, setI] = useState(0);
  const t = TABS[i];
  const INK = "#1F2A37";
  const MUTE = "#5B6470";
  return (
    <section id="solutions" style={{ background: "#FFFDFB", color: INK, padding: "92px 0 96px" }}>
      <style>{`
        @keyframes ctIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
        .ct-in{animation:ctIn .45s ease both}
        .ct-tabs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
        .ct-cols{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));row-gap:24px}
        .ct-col{padding:0 24px 0 0}
        .ct-col:nth-child(even){padding:0 0 0 24px;border-left:1px solid #E6E0D8}
        @media (max-width:1100px){.ct-cols{max-width:none!important}.ct-photo{display:none!important}.ct-copy{max-width:none!important}}
        @media (max-width:760px){.ct-tabs{grid-template-columns:1fr}.ct-cols{grid-template-columns:1fr}.ct-col{padding:0!important;border-left:0!important}.ct-panel{padding:26px 22px!important}}
        @media (prefers-reduced-motion:reduce){.ct-in{animation:none}}
      `}</style>
      <div className="cn-wrap">
        <p style={{ margin: "0 0 14px", fontSize: 12, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "#A2563B" }}>Solutions by industry</p>
        <h2 style={{ margin: 0, fontSize: 42, lineHeight: 1.1, letterSpacing: "-.025em", fontWeight: 600, color: INK, maxWidth: 900 }}>Find the right product combination for your operation</h2>
        <p style={{ margin: "16px 0 0", fontSize: 16, lineHeight: 1.7, color: MUTE, maxWidth: "62ch" }}>Explore how EVOQ products may support the operational needs of construction companies, engineering firms and real estate organizations.</p>

        <div className="ct-tabs" role="tablist" aria-label="Industry solutions" style={{ marginTop: 36 }}>
          {TABS.map((x, n) => {
            const act = n === i;
            return (
              <button key={x.tab} type="button" role="tab" aria-selected={act} onClick={() => setI(n)} style={{ fontFamily: "inherit", cursor: "pointer", border: `1px solid ${act ? x.on : "rgba(31,42,55,.06)"}`, borderRadius: 14, background: act ? x.on : x.off, color: act ? "#fff" : INK, display: "flex", alignItems: "center", gap: 18, padding: "20px 22px", textAlign: "left", transition: "background .2s, color .2s", boxShadow: act ? `0 14px 30px -14px ${x.on}` : "none" }}>
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={act ? "#fff" : x.on} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flex: "none" }}><path d={x.icon} /></svg>
                <span style={{ width: 1, alignSelf: "stretch", background: act ? "rgba(255,255,255,.35)" : "rgba(31,42,55,.14)" }} />
                <span>
                  <span style={{ display: "block", fontSize: 17, fontWeight: 700 }}>{x.tab}</span>
                  <span style={{ display: "block", marginTop: 3, fontSize: 13, opacity: act ? 0.9 : 0.7 }}>{x.sub}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div key={i} className="ct-panel ct-in" style={{ position: "relative", overflow: "hidden", marginTop: 14, background: "#fff", border: "1px solid #ECE5DC", borderRadius: 18, padding: "36px 40px 40px", boxShadow: "0 24px 60px -40px rgba(31,42,55,.25)" }}>
          <div className="ct-photo" aria-hidden="true" style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "56%", backgroundImage: `url(${t.img})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "right center" }} />
          <div style={{ position: "relative" }}>
            <div className="ct-copy" style={{ maxWidth: "54%" }}>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: t.on }}>{t.tab}</p>
              <h3 style={{ margin: "8px 0 0", fontSize: 32, lineHeight: 1.18, fontWeight: 600, letterSpacing: "-.02em", color: INK }}>{t.title}</h3>
              <p style={{ margin: "12px 0 0", fontSize: 15.5, lineHeight: 1.7, color: MUTE }}>{t.body}</p>
            </div>
            <div style={{ margin: "26px 0 24px", height: 1, background: "#E6E0D8", maxWidth: "54%" }} />
            <div className="ct-cols" style={{ maxWidth: "54%" }}>
              {t.help.map(([prod, need, d], n) => (
                <div key={prod} className="ct-col">
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ width: 38, height: 38, borderRadius: "50%", background: t.off, color: t.on, fontSize: 14, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{String(n + 1).padStart(2, "0")}</span>
                  </div>
                  <div style={{ marginTop: 12, fontSize: 16, lineHeight: 1.25, fontWeight: 700, color: INK }}>{need}</div>
                  <p style={{ margin: "6px 0 0", fontSize: 13.5, lineHeight: 1.6, color: MUTE }}>{d}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 28, paddingTop: 22, borderTop: "1px solid #E6E0D8", maxWidth: "54%", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: t.on, marginRight: 4 }}>EVOQ products you may need</span>
              {t.help.map(([prod]) => (
                <span key={prod} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px 6px 7px", borderRadius: 99, background: t.off, color: INK, fontSize: 13, fontWeight: 700 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ICON[prod]} alt="" width={22} height={22} style={{ width: 22, height: 22, objectFit: "contain", borderRadius: 6, background: "#fff", padding: 2 }} />{prod}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
