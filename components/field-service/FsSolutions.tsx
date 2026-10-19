"use client";

import type { CSSProperties } from "react";
import { useScrollSpy } from "@/components/shared/useScrollSpy";

/* Field Service solutions: one pill-tab bar, one operating area at a time
   (same pattern as the home Solutions and Construction pages). Copy is the
   approved page content; product claims stay as written. */
const BLUE = "#1777F0";
const NAVY = "#0F3D75";
const AZURE = "#3B82F6";
const PALE = "#DBEAFE";
const ORANGE = "#F97316";
const BURNT = "#C2410C";
const POR = "#FFEDD5";
const CW = "#F8FAFC";
const INK = "#172033";
const SOFT = "rgba(23,32,51,.72)";
const LINE = "rgba(15,61,117,.16)";

const U = (id: string, w = 1200) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;
const I = (f: string) => `/billing/images/${f}`;
const ICON: Record<string, string> = {
  ServiceOps: I("serviceops-icon.svg"), Inventory: I("inventory-menu-icn.png"), Billing: I("billing-menu-icn.png"), Desk: I("desk-menu-icn.png"),
};

type Pair = [string, string];
type Tab = {
  key: string; tab: string; sub: string; icon: string; on: string; off: string;
  eyebrow: string; title: string; intro: string[]; img: string;
  challenges: string[]; improves: string[]; fits: Pair[];
  apps: string[]; audiences: Pair[]; cta: string;
};

const TABS: Tab[] = [
  {
    key: "field", tab: "Field service", sub: "Requests, dispatch and visits", on: BLUE, off: PALE,
    icon: "M4 17h3l2-5h6l2 5h3M7 17a2 2 0 1 0 0 .1M17 17a2 2 0 1 0 0 .1M9 12V8h6v4",
    eyebrow: "Field service management",
    title: "Coordinate every service job, from assignment to completion.",
    intro: ["Field service involves more than sending a technician to a location. Requests must be assessed, work scheduled, the right technician assigned and each visit documented. EVOQ ServiceOps helps external service providers and internal field teams coordinate these activities and maintain visibility into ongoing work."],
    img: U("1660330589827-da8ab7dd3c02"),
    challenges: [
      "Service requests arrive through different channels, making it harder to maintain a consistent view of incoming work.",
      "Scheduling and technician assignments require coordination across locations, priorities and availability.",
      "Work progress and visit outcomes can be difficult to follow when service records are incomplete or scattered.",
      "Parts, service charges and follow-up actions need to be accounted for after the job.",
    ],
    improves: [
      "A clearer view of open requests, assigned work and job status.",
      "More organized scheduling and technician dispatch.",
      "Consistent records of service visits, work performed and completion details.",
      "Better visibility into parts used, service costs and billing-related follow-up.",
    ],
    fits: [
      ["Service request and work order management", "Record incoming service requirements, assess the work and create the appropriate work orders and jobs."],
      ["Scheduling and dispatch", "Organize service appointments, assign technicians and coordinate field activity through scheduling and dispatch views."],
      ["Service visits and job records", "Give technicians access to relevant job information and mobile field workflows for recording work performed, updates and supporting documentation."],
      ["Parts and service billing", "Keep job-related parts and billable service information available to support inventory and billing processes."],
    ],
    apps: ["ServiceOps", "Inventory", "Billing"],
    audiences: [
      ["For service providers", "Coordinate customer requests, estimates, work orders, technician visits and service completion across the jobs your organization delivers."],
      ["For internal field teams", "Organize service work across company sites, equipment locations and operational priorities while maintaining records for follow-up."],
    ],
    cta: "Explore ServiceOps",
  },
  {
    key: "facilities", tab: "Facilities management", sub: "Requests, work orders and sites", on: NAVY, off: PALE,
    icon: "M5 21V5h9v16M14 9h5v12M8 9h3M8 13h3M8 17h3M3 21h18",
    eyebrow: "Facilities operations",
    title: "Keep buildings and sites running as expected.",
    intro: [
      "Facilities operations involve a steady flow of requests, repairs, inspections and contractor assignments. Without clear ownership and consistent records, routine issues can remain unresolved and outstanding work becomes harder to oversee.",
      "EVOQ helps facilities management providers and internal facilities teams organize service requests, assign responsibilities and follow work across buildings and sites.",
    ],
    img: U("1732395805034-e0bf859665e5"),
    challenges: [
      "Requests from occupants, departments and site managers are difficult to track consistently.",
      "Responsibility for repairs and follow-up is unclear across internal staff and external contractors.",
      "Teams lack a straightforward view of outstanding work across multiple locations.",
      "Service history and completion records are not consistently available when recurring issues arise.",
    ],
    improves: [
      "A structured process for recording and assigning facilities-related work.",
      "Clearer responsibility for each request, work order and follow-up action.",
      "Better visibility into work in progress and unresolved issues.",
      "More consistent service records across buildings and operating locations.",
    ],
    fits: [
      ["Facilities service requests", "Capture building-related service needs and organize them for assessment, assignment and resolution."],
      ["Work order coordination", "Create and track work orders, assign responsible personnel and monitor progress through completion."],
      ["Site and service oversight", "Review outstanding work and service activity to help coordinate responsibilities across locations."],
      ["Internal and external service coordination", "Organize work involving in-house maintenance personnel, contractors and facilities service providers."],
    ],
    apps: ["ServiceOps", "Desk"],
    audiences: [
      ["For facilities management providers", "Coordinate work across client sites, manage service commitments and maintain a clearer record of work delivered."],
      ["For internal facilities teams", "Organize requests from occupants and departments, assign maintenance responsibilities and track outstanding work across your facilities."],
    ],
    cta: "Explore ServiceOps for facilities",
  },
  {
    key: "maintenance", tab: "Equipment and asset maintenance", sub: "Planned and corrective work", on: BURNT, off: POR,
    icon: "M14.7 6.3a4 4 0 0 0-5 5L3 18l3 3 6.7-6.7a4 4 0 0 0 5-5l-2.4 2.4-2.6-.6-.6-2.6z",
    eyebrow: "Asset & maintenance management",
    title: "Plan maintenance before it becomes an urgent repair.",
    intro: [
      "Equipment downtime, overdue maintenance and incomplete service histories make it harder to protect operational continuity. Maintenance teams need to know which assets require attention, what work is scheduled and what has already been done.",
      "EVOQ ServiceOps supports planned maintenance and corrective work, helping maintenance teams organize asset-related tasks, manage work orders and maintain service history.",
    ],
    img: U("1748256086767-8974ee677f77"),
    challenges: [
      "Maintenance activity becomes reactive when planned work is difficult to schedule and monitor.",
      "Equipment records and previous maintenance details are incomplete or difficult to retrieve.",
      "Corrective repairs compete with scheduled maintenance for technician time.",
      "Parts used during maintenance are difficult to reconcile with stock records and job requirements.",
    ],
    improves: [
      "Better oversight of assets and their maintenance requirements.",
      "More organized preventive maintenance schedules and recurring work.",
      "Clearer coordination of corrective repairs and technician assignments.",
      "More consistent maintenance history and records of completed work.",
      "Improved visibility into parts associated with maintenance jobs.",
    ],
    fits: [
      ["Asset records and maintenance history", "Maintain asset information and service records to support maintenance planning and future repair decisions."],
      ["Preventive maintenance", "Organize planned maintenance activities and recurring work to help teams keep scheduled tasks on track."],
      ["Corrective maintenance", "Record equipment issues, create work orders, assign technicians and track repairs through completion."],
      ["Parts and maintenance costs", "Refer to job-related parts and service costs to support inventory management and billing processes where applicable."],
    ],
    apps: ["ServiceOps", "Inventory", "Billing"],
    audiences: [
      ["For maintenance teams", "Coordinate planned servicing and corrective repairs while maintaining records of equipment-related work."],
      ["For asset-intensive organizations", "Improve visibility into maintenance activity across equipment and sites, helping teams make better-informed decisions about outstanding work and service history."],
    ],
    cta: "Explore ServiceOps for maintenance",
  },
];

const Label = ({ c, children }: { c: string; children: string }) => (
  <p style={{ margin: "0 0 14px", fontSize: 11.5, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: c }}>{children}</p>
);
const Tick = ({ c }: { c: string }) => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flex: "none", marginTop: 3 }}><circle cx="10" cy="10" r="10" fill={c} opacity=".14" /><path d="M5.8 10.4l2.8 2.8 5.6-6" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const Arrow = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>;

export function FsSolutions() {
  const { active: i, go } = useScrollSpy(TABS.map((x) => `fx-${x.key}`));
  const panel: CSSProperties = { marginTop: 40 };
  return (
    <section id="solutions" style={{ background: CW, padding: "96px 0 104px" }}>
      <style>{`
        .fx-tabs-wrap{position:sticky;top:0;z-index:20;display:flex;justify-content:flex-start;margin-top:30px;padding:12px 0 14px;background:linear-gradient(180deg,${CW} 78%,rgba(248,250,252,0))}
        .fx-tabs{display:flex;gap:4px;padding:6px;border-radius:999px;background:#fff;max-width:100%;overflow-x:auto;scrollbar-width:none;box-shadow:0 10px 34px -14px rgba(15,61,117,.3),0 0 0 1px rgba(15,61,117,.08)}
        .fx-tabs::-webkit-scrollbar{display:none}
        .fx-tab{flex-shrink:0;display:inline-flex;align-items:center;gap:9px;padding:12px 24px 12px 12px;border-radius:999px;border:0;background:transparent;cursor:pointer;font-family:inherit;font-size:15.5px;font-weight:600;color:#33415C;white-space:nowrap;transition:background .18s ease,color .18s ease}
        .fx-tab:hover{color:${INK};background:#F1F5FB}
        .fx-tab.on{font-weight:700;box-shadow:inset 0 0 0 1.5px currentColor}
        .fx-num{flex:none;width:26px;height:26px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;background:#DCE5F2;color:#33415C;transition:background .18s ease,color .18s ease}
        .fx-chapters{display:grid;gap:0}
        .fx-chapter{scroll-margin-top:110px;padding-top:72px;margin-top:72px;border-top:1px solid ${LINE}}
        .fx-chapter:first-child{padding-top:0;margin-top:0;border-top:0}
        .fx-chead{display:flex;align-items:center;gap:12px;padding-bottom:16px;border-bottom:2px solid}
        .fx-chead span{color:#fff;font-size:13px;font-weight:700;border-radius:6px;padding:5px 9px;letter-spacing:.04em}
        .fx-chead b{font-size:20px;letter-spacing:-.01em}
        @keyframes fxIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
        .fx-stack{display:grid;gap:56px}
        .fx-intro{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:40px;align-items:center}
        .fx-img{height:300px;border-radius:18px;background-size:cover;background-position:center;background-color:${PALE}}
        .fx-g2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
        .fx-cols{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:48px}
        .fx-apps{display:flex;flex-wrap:wrap;gap:10px}
        @media (max-width:900px){.fx-intro,.fx-cols,.fx-g2{grid-template-columns:1fr}.fx-img{height:230px}}
        @media (max-width:640px){.fx-tab{padding:9px 16px 9px 9px;font-size:14px}}
        @media (prefers-reduced-motion:reduce){.fx-in{animation:none}}
      `}</style>
      <div className="fs-wrap">
        <div style={{ maxWidth: 900 }} data-rv="0">
          <p style={{ margin: "0 0 14px", fontSize: 11.5, fontWeight: 700, letterSpacing: ".22em", textTransform: "uppercase", color: BURNT }}>Solutions</p>
          <h2 className="fs-h2" style={{ margin: 0, color: NAVY }}>Three kinds of service work. One clear way to run each.</h2>
          <p style={{ margin: "16px 0 0", fontSize: 16, lineHeight: 1.8, color: SOFT, maxWidth: "70ch" }}>Whether technicians are responding to customer requests, facilities teams are resolving site issues or maintenance staff are servicing critical equipment, the work depends on clear responsibilities, timely action and reliable records.</p>
          <p style={{ margin: "10px 0 0", fontSize: 16, lineHeight: 1.8, color: INK, fontWeight: 600 }}>Explore how EVOQ supports each operating area.</p>
        </div>

        <div className="fx-tabs-wrap">
          <div className="fx-tabs" role="tablist" aria-label="Operating areas">
            {TABS.map((x, n) => {
              const sel = n === i;
              return (
                <button key={x.key} type="button" role="tab" aria-selected={sel} className={`fx-tab${sel ? " on" : ""}`} style={sel ? { background: x.off, color: x.on } : undefined} onClick={go(n)}>
                  <span className="fx-num" style={sel ? { background: x.on, color: "#fff" } : undefined}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={x.icon} /></svg>
                  </span>
                  {x.tab}
                </button>
              );
            })}
          </div>
        </div>

        <div className="fx-chapters" style={panel}>
        {TABS.map((t, n) => (
        <div key={t.key} id={`fx-${t.key}`} className="fx-chapter fx-stack" role="tabpanel" aria-label={t.tab}>
          <div className="fx-chead" style={{ borderColor: t.on }}>
            <span style={{ background: t.on }}>{String(n + 1).padStart(2, "0")}</span>
            <b style={{ color: t.on }}>{t.tab}</b>
          </div>
          <div className="fx-intro">
            <div>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: t.on }}>{t.eyebrow}</p>
              <h3 className="fs-h3" style={{ margin: "10px 0 0", color: NAVY }}>{t.title}</h3>
              {t.intro.map((p) => <p key={p} style={{ margin: "14px 0 0", fontSize: 15.5, lineHeight: 1.75, color: SOFT }}>{p}</p>)}
            </div>
            <div className="fx-img" role="img" aria-label={`${t.tab} photograph`} style={{ backgroundImage: `url(${t.img})` }} />
          </div>

          <div>
            <Label c={t.on}>Common challenges</Label>
            <div className="fx-g2">
              {t.challenges.map((c) => (
                <div key={c} style={{ background: "#fff", border: `1px solid ${LINE}`, borderLeft: `3px solid ${t.on}`, borderRadius: 12, padding: "16px 18px", fontSize: 14.5, lineHeight: 1.65, color: INK }}>{c}</div>
              ))}
            </div>
          </div>

          <div className="fx-cols">
            <div>
              <Label c={t.on}>What improves</Label>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 12 }}>
                {t.improves.map((o) => <li key={o} style={{ display: "flex", gap: 11, fontSize: 14.5, lineHeight: 1.6, color: INK }}><Tick c={t.on} />{o}</li>)}
              </ul>
            </div>
            <div>
              <Label c={t.on}>Where EVOQ fits</Label>
              <div style={{ display: "grid", gap: 18 }}>
                {t.fits.map(([h, d], n) => (
                  <div key={h} style={{ display: "flex", gap: 14 }}>
                    <span style={{ flex: "none", width: 30, height: 30, borderRadius: "50%", background: t.off, color: t.on, fontSize: 12, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{String(n + 1).padStart(2, "0")}</span>
                    <div>
                      <div style={{ fontSize: 15.5, fontWeight: 700, lineHeight: 1.3, color: INK }}>{h}</div>
                      <p style={{ margin: "4px 0 0", fontSize: 14, lineHeight: 1.65, color: SOFT }}>{d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ background: t.off, border: `1px solid ${LINE}`, borderRadius: 16, padding: "24px 26px" }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: t.on, marginRight: 4 }}>Relevant products</span>
              <div className="fx-apps">
                {t.apps.map((a) => (
                  <span key={a} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px 5px 6px", borderRadius: 999, background: "#fff", fontSize: 13, fontWeight: 700, color: NAVY }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={ICON[a]} alt="" width={22} height={22} style={{ width: 22, height: 22, objectFit: "contain", borderRadius: 6 }} />{a}
                  </span>
                ))}
              </div>
            </div>
            <div className="fx-g2" style={{ marginTop: 20, gap: 28 }}>
              {t.audiences.map(([h, d]) => (
                <div key={h}>
                  <div style={{ fontSize: 15.5, fontWeight: 700, color: t.on }}>{h}</div>
                  <p style={{ margin: "6px 0 0", fontSize: 14.5, lineHeight: 1.7, color: INK }}>{d}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <a href="/products/serviceops" className="fs-btn" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "15px 28px", borderRadius: 12, fontSize: 15, fontWeight: 700, textDecoration: "none", background: t.on === NAVY ? NAVY : t.on, color: CW, boxShadow: `0 18px 32px -20px ${t.on}` }}>{t.cta}<Arrow /></a>
          </div>
        </div>
        ))}
        </div>
      </div>
    </section>
  );
}
