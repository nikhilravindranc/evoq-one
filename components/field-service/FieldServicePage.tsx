import type { CSSProperties } from "react";
import { Topbar } from "@/components/hero/Topbar";
import { Footer } from "@/components/sections/Footer";
import { HScroll } from "./HScroll";
import { EnquiryModal } from "@/components/manufacturing/EnquiryModal";
import { HsMotion } from "@/components/hospitality/HsMotion";

/* Field Service, Facilities & Maintenance: fast, operational, directional, connected.
   Palette is strictly: EVOQ blue, navy, azure, pale blue, orange, burnt orange, pale orange, cool white, slate black. */
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

const U = (id: string, w = 1100) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;
const photo = (src: string, extra: CSSProperties = {}): CSSProperties => ({ backgroundImage: `url(${src})`, backgroundSize: "cover", backgroundPosition: "center", ...extra });
const I = (f: string) => `/billing/images/${f}`;
const ICON: Record<string, string> = {
  ServiceOps: I("serviceops-icon.svg"), CRM: I("crm-menu-icn.png"), Inventory: I("inventory-menu-icn.png"), Billing: I("billing-menu-icn.png"), Desk: I("desk-menu-icn.png"),
  Projects: I("evoq-projects-menu-icn.png"), HRMS: I("hrms-menu-icn-new.png"), Campaigns: I("campaigns-menu-icn.png"), Skillberry: I("Skillberry-menu-icn.png"), Sync: I("sync-menu-icn.png"),
};

const Arrow = ({ s = 15 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>;
function Eyebrow({ children, dark = false }: { children: string; dark?: boolean }) {
  return <p style={{ margin: "0 0 14px", fontSize: 11.5, fontWeight: 700, letterSpacing: ".22em", textTransform: "uppercase", color: dark ? ORANGE : BURNT }}>{children}</p>;
}
function Cta({ children, dark = false }: { children: string; dark?: boolean }) {
  return (
    <a href="#" data-enquiry="" className="fs-btn" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "15px 28px", borderRadius: 12, fontSize: 15, fontWeight: 700, textDecoration: "none", background: dark ? CW : BLUE, color: dark ? NAVY : CW, boxShadow: dark ? "none" : `0 18px 32px -18px ${BLUE}` }}>{children}<Arrow /></a>
  );
}
function Chips({ list }: { list: string[] }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {list.map((a) => (
        <span key={a} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 12px 5px 6px", borderRadius: 10, background: CW, border: `1px solid ${LINE}`, fontSize: 12.5, fontWeight: 700, color: NAVY }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ICON[a]} alt="" width={20} height={20} style={{ width: 20, height: 20, objectFit: "contain", borderRadius: 5 }} />{a}
        </span>
      ))}
    </div>
  );
}
const h2: CSSProperties = { margin: 0, fontSize: 42, lineHeight: 1.1, letterSpacing: "-.025em", fontWeight: 700, color: NAVY };

/* ------------------------------------------------------------------ 1. Hero */
function Hero() {
  const steps = ["Request", "Dispatch", "Visit", "Resolution", "Follow-up"];
  return (
    <section style={{ position: "relative", overflow: "hidden", background: CW }}>
      <div aria-hidden="true" style={{ position: "absolute", right: "-10%", top: "-30%", width: 780, height: 780, borderRadius: "50%", background: `radial-gradient(closest-side, ${PALE}, rgba(219,234,254,0))` }} />
      <div className="fs-wrap" style={{ position: "relative" }}>
        <nav aria-label="Breadcrumb" style={{ paddingTop: 22, fontSize: 12, color: SOFT }}>Home <span style={{ margin: "0 6px" }}>/</span> Solutions <span style={{ margin: "0 6px" }}>/</span> <b style={{ color: INK, fontWeight: 600 }}>Field Service, Facilities &amp; Maintenance</b></nav>
        <div className="fs-hero">
          <div data-rv="0">
            <Eyebrow>Field Service, Facilities &amp; Maintenance</Eyebrow>
            <h1 style={{ margin: 0, fontSize: 58, lineHeight: 1.05, letterSpacing: "-.03em", fontWeight: 700, color: NAVY }}>Keep service work moving from request to <span style={{ color: BLUE }}>resolution</span></h1>
            <p style={{ margin: "24px 0 0", fontSize: 17, lineHeight: 1.75, color: SOFT, maxWidth: "52ch" }}>Coordinating service requests, technicians, parts and follow-up requires more than completing individual work orders. EVOQ products can support the wider operation, from customer relationships and service coordination to inventory, billing and ongoing service activities.</p>
            <div style={{ marginTop: 32 }}><Cta>Talk to an expert</Cta></div>
            <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", fontSize: 13, fontWeight: 700, color: NAVY }}>
              {steps.map((t, i) => (
                <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><i style={{ width: 9, height: 9, borderRadius: "50%", background: i === 1 ? ORANGE : BLUE, display: "inline-block" }} />{t}</span>
                  {i < steps.length - 1 && <span style={{ color: AZURE }}><Arrow s={14} /></span>}
                </span>
              ))}
            </div>
          </div>

          {/* map, route and mobile work order */}
          <div className="fs-hero-vis" data-rv="1" aria-hidden="true">
            <div style={{ position: "absolute", left: 0, top: 0, width: "78%", height: "76%", borderRadius: 26, background: PALE, border: `1px solid ${LINE}`, overflow: "hidden", boxShadow: "0 40px 70px -44px rgba(15,61,117,.6)" }}>
              <svg viewBox="0 0 440 300" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} fill="none">
                <g stroke={AZURE} strokeOpacity=".22" strokeWidth="1">{[40, 90, 140, 190, 240].map((y) => <path key={y} d={`M0 ${y}H440`} />)}{[60, 130, 200, 270, 340, 410].map((x) => <path key={x} d={`M${x} 0V300`} />)}</g>
                <path d="M-10 230 C 90 210, 120 120, 210 130 S 330 60, 460 80" stroke={CW} strokeWidth="14" strokeLinecap="round" opacity=".9" />
                <path d="M40 270 C 100 190, 180 210, 240 170 S 360 150, 420 110" stroke={CW} strokeWidth="8" strokeLinecap="round" opacity=".7" />
                <path id="fs-route" d="M60 246 C 120 200, 150 168, 214 150 S 330 110, 372 74" stroke={BLUE} strokeWidth="4" strokeLinecap="round" strokeDasharray="2 9" className="fs-route" />
                <g transform="translate(372 74)"><circle r="18" fill={ORANGE} opacity=".22" className="fs-pulse" /><circle r="9" fill={ORANGE} /><circle r="3.5" fill={CW} /></g>
                <g><circle r="9" fill={BLUE} stroke={CW} strokeWidth="3"><animateMotion dur="7s" repeatCount="indefinite"><mpath href="#fs-route" /></animateMotion></circle></g>
              </svg>
              <span style={{ position: "absolute", left: 16, top: 14, background: CW, color: NAVY, fontSize: 11.5, fontWeight: 700, padding: "6px 12px", borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 7 }}><i style={{ width: 8, height: 8, background: NAVY, borderRadius: "50%", display: "inline-block" }} />Service desk</span>
              <span style={{ position: "absolute", left: 16, top: 52, background: POR, color: BURNT, fontSize: 11.5, fontWeight: 700, padding: "6px 12px", borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 7 }}><i style={{ width: 8, height: 8, background: ORANGE, borderRadius: "50%", display: "inline-block" }} />Dispatched · ETA 18 min</span>
            </div>
            <div style={{ position: "absolute", left: 18, bottom: 0, width: "40%", height: "36%", borderRadius: 22, border: `5px solid ${CW}`, ...photo(U("1613620838744-a0fbfb76bae3", 900)), boxShadow: "0 30px 56px -30px rgba(15,61,117,.7)" }} />
            <div className="fs-phone" style={{ position: "absolute", right: 0, top: 24, width: 218, height: 408, borderRadius: 36, background: NAVY, padding: 9, boxShadow: "0 50px 80px -36px rgba(15,61,117,.8)" }}>
              <div style={{ height: "100%", borderRadius: 28, background: CW, padding: "20px 16px", overflow: "hidden" }}>
                <div style={{ width: 54, height: 5, borderRadius: 3, background: LINE, margin: "0 auto 14px" }} />
                <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: BURNT }}>Work order</div>
                <div style={{ marginTop: 3, fontSize: 17, fontWeight: 700, color: NAVY }}>WO-2041</div>
                <div style={{ fontSize: 11.5, color: SOFT }}>Preventive maintenance · Line 2</div>
                <div style={{ marginTop: 14, display: "grid", gap: 0 }}>
                  {[["Request", "Logged 09:10", "done"], ["Dispatch", "Ravi assigned", "dispatch"], ["Visit", "On the way", "now"], ["Resolution", "Pending", "next"], ["Follow-up", "Pending", "next"]].map(([t, d, st], i) => (
                    <div key={t} style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <span style={{ width: 16, height: 16, borderRadius: "50%", background: st === "next" ? CW : st === "dispatch" ? ORANGE : BLUE, border: `2px solid ${st === "next" ? LINE : st === "dispatch" ? ORANGE : BLUE}`, boxShadow: st === "now" ? `0 0 0 4px ${PALE}` : "none" }} />
                        {i < 4 && <span style={{ width: 2, height: 24, background: st === "next" ? LINE : AZURE }} />}
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: INK, marginTop: -1 }}>{t}<span style={{ display: "block", fontSize: 10.5, fontWeight: 400, color: SOFT }}>{d}</span></div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 12, background: BLUE, color: CW, textAlign: "center", fontSize: 12, fontWeight: 700, padding: "10px 0", borderRadius: 10 }}>Update status</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 2. Service operations */
function Operations() {
  const items: [string, string, string][] = [
    ["Field service", "Coordinate customer requests, service assignments, site visits and the activities associated with service delivery.", "M4 17h3l2-5h6l2 5h3M7 17a2 2 0 1 0 0 .1M17 17a2 2 0 1 0 0 .1M9 12V8h6v4"],
    ["Facilities management", "Organize incoming service requests, coordinate maintenance activities and manage the operational requirements of buildings and facilities.", "M5 21V5h9v16M14 9h5v12M8 9h3M8 13h3M8 17h3M3 21h18"],
    ["Maintenance operations", "Coordinate planned maintenance and breakdown response, assign work and maintain records of completed activities.", "M14.7 6.3a4 4 0 0 0-5 5L3 18l3 3 6.7-6.7a4 4 0 0 0 5-5l-2.4 2.4-2.6-.6-.6-2.6z"],
  ];
  return (
    <section style={{ background: PALE, padding: "92px 0 96px" }}>
      <div className="fs-wrap">
        <div className="fs-split" data-rv="0" style={{ alignItems: "end" }}>
          <div><Eyebrow>Service operations</Eyebrow><h2 style={h2}>Every service request sets work in motion</h2></div>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.8, color: SOFT, maxWidth: "54ch" }}>A repair request, scheduled maintenance task or facility issue can involve several people, resources and follow-up activities. Clear responsibilities and timely coordination help service organizations move work forward and maintain visibility into what has been completed.</p>
        </div>
        <div className="fs-g3" style={{ marginTop: 48 }}>
          {items.map(([t, d, path], i) => (
            <article key={t} data-rv={String(i)} className="fs-card" style={{ background: CW, border: `1px solid ${LINE}`, borderRadius: 20, padding: "28px 26px 30px", position: "relative" }}>
              <span style={{ width: 52, height: 52, borderRadius: 14, background: i === 0 ? BLUE : NAVY, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={CW} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={path} /></svg>
              </span>
              <span aria-hidden="true" style={{ position: "absolute", right: 24, top: 26, fontSize: 12, fontWeight: 700, letterSpacing: ".14em", color: BURNT }}>0{i + 1}</span>
              <h3 style={{ margin: "22px 0 0", fontSize: 23, fontWeight: 700, color: NAVY, letterSpacing: "-.01em" }}>{t}</h3>
              <p style={{ margin: "12px 0 0", fontSize: 14.5, lineHeight: 1.75, color: SOFT }}>{d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 3. Enquiry to follow-up */
const FLOW: [string, string, string][] = [
  ["Enquiry", "Capture enquiries and customer details.", "M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12zM8.5 12h.01M12 12h.01M15.5 12h.01"],
  ["Service contracts", "Keep customer and service terms in one place.", "M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6"],
  ["Work order", "Organize work, owners and progress.", "M4 6l1.5 1.5L8 5M4 12l1.5 1.5L8 11M4 18l1.5 1.5L8 17M11 6h9M11 12h9M11 18h9"],
  ["Dispatch", "Assign the right people to the work.", "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4"],
  ["Service visit", "Carry out and record the work.", "M14.7 6.3a4 4 0 0 0-5 5L3 18l3 3 6.7-6.7a4 4 0 0 0 5-5l-2.4 2.4-2.6-.6-.6-2.6z"],
  ["Parts & inventory", "Account for parts and materials.", "M12 3l8 4.5v9L12 21l-8-4.5v-9zM4 7.5l8 4.5 8-4.5M12 12v9"],
  ["Billing", "Handle charges and billing.", "M7 3h7l5 5v13H7zM14 3v5h5M10 14h6M10 18h4"],
  ["Follow-up", "Keep customers informed after the visit.", "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 5.5a3 3 0 0 1 0 5.5M17 14.3c2.3.6 4 2.7 4 5.7"],
];

function Flow() {
  return (
    <section id="flow" style={{ background: CW, padding: "96px 0 100px", overflow: "hidden" }}>
      <div className="fs-wrap">
        <div className="fs-split" data-rv="0" style={{ alignItems: "end" }}>
          <div><Eyebrow>From enquiry to follow-up</Eyebrow><h2 style={h2}>See how the work moves through your operation</h2></div>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.8, color: SOFT, maxWidth: "58ch" }}>Service delivery involves a sequence of related activities, from the first customer enquiry to the work performed and the follow-up that comes afterward.</p>
        </div>
        <div data-rv="1" className="fl-wave" style={{ marginTop: 56, position: "relative" }}>
          <svg className="fl-svg" aria-hidden="true" viewBox="-600 0 2800 120" preserveAspectRatio="none" style={{ position: "absolute", left: "-37.5%", top: 30, width: "175%", height: 120 }}>
            <defs><linearGradient id="flfade" gradientUnits="userSpaceOnUse" x1="-600" x2="2200" y1="0" y2="0"><stop offset="0" stopColor={AZURE} stopOpacity="0"/><stop offset=".2" stopColor={AZURE} stopOpacity="1"/><stop offset=".8" stopColor={AZURE} stopOpacity="1"/><stop offset="1" stopColor={AZURE} stopOpacity="0"/></linearGradient><linearGradient id="flfade2" gradientUnits="userSpaceOnUse" x1="-600" x2="2200" y1="0" y2="0"><stop offset="0" stopColor={PALE} stopOpacity="0"/><stop offset=".2" stopColor={PALE}/><stop offset=".8" stopColor={PALE}/><stop offset="1" stopColor={PALE} stopOpacity="0"/></linearGradient></defs>
            <path d="M-600 76 C -400 76 -200 60 100 60  C170 19.5 230 19.5 300 60 C370 100.5 430 100.5 500 60 C570 19.5 630 19.5 700 60 C770 100.5 830 100.5 900 60 C970 19.5 1030 19.5 1100 60 C1170 100.5 1230 100.5 1300 60 C1370 19.5 1430 19.5 1500 60 C1800 60 2000 60 2200 44" fill="none" stroke="url(#flfade)" strokeOpacity=".6" strokeWidth="1.75" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </svg>
          <i className="fl-dot" aria-hidden="true" style={{ position: "absolute", left: "12.5%", top: 52, width: 16, height: 16, marginLeft: -8, borderRadius: "50%", background: CW, border: `2px solid ${AZURE}`, boxSizing: "border-box" }} />
          <i className="fl-dot" aria-hidden="true" style={{ position: "absolute", left: "25.0%", top: 112, width: 16, height: 16, marginLeft: -8, borderRadius: "50%", background: CW, border: `2px solid ${AZURE}`, boxSizing: "border-box" }} />
          <i className="fl-dot" aria-hidden="true" style={{ position: "absolute", left: "37.5%", top: 52, width: 16, height: 16, marginLeft: -8, borderRadius: "50%", background: CW, border: `2px solid ${AZURE}`, boxSizing: "border-box" }} />
          <i className="fl-dot" aria-hidden="true" style={{ position: "absolute", left: "50.0%", top: 112, width: 16, height: 16, marginLeft: -8, borderRadius: "50%", background: CW, border: `2px solid ${AZURE}`, boxSizing: "border-box" }} />
          <i className="fl-dot" aria-hidden="true" style={{ position: "absolute", left: "62.5%", top: 52, width: 16, height: 16, marginLeft: -8, borderRadius: "50%", background: CW, border: `2px solid ${AZURE}`, boxSizing: "border-box" }} />
          <i className="fl-dot" aria-hidden="true" style={{ position: "absolute", left: "75.0%", top: 112, width: 16, height: 16, marginLeft: -8, borderRadius: "50%", background: CW, border: `2px solid ${AZURE}`, boxSizing: "border-box" }} />
          <i className="fl-dot" aria-hidden="true" style={{ position: "absolute", left: "87.5%", top: 52, width: 16, height: 16, marginLeft: -8, borderRadius: "50%", background: CW, border: `2px solid ${AZURE}`, boxSizing: "border-box" }} />
          <ol className="fl-grid" style={{ listStyle: "none", margin: 0, padding: 0, position: "relative", display: "grid", gridTemplateColumns: "repeat(8,minmax(0,1fr))", gap: 8 }}>
            {FLOW.map(([t, d, path], i) => {
              const hot = false;
              return (
                <li key={t} className="fl-step" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                  <span style={{ width: 34, height: 34, borderRadius: "50%", fontSize: 13, fontWeight: 700, color: hot ? BURNT : SOFT, background: hot ? POR : PALE, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{String(i + 1).padStart(2, "0")}</span>
                  <span style={{ marginTop: 16, width: 90, height: 90, borderRadius: "50%", background: CW, boxShadow: hot ? "0 14px 34px rgba(249,115,22,.28)" : "0 12px 30px rgba(15,61,117,.14)", display: "inline-flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1 }}>
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={hot ? BURNT : NAVY} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={path} /></svg>
                  </span>
                  <span aria-hidden="true" style={{ width: 2, height: 26, background: hot ? ORANGE : LINE, marginTop: 10, position: "relative" }}><i style={{ position: "absolute", left: -3, top: 9, width: 8, height: 8, borderRadius: "50%", background: hot ? ORANGE : AZURE }} /></span>
                  <h4 style={{ margin: "12px 0 0", fontSize: 17, lineHeight: 1.25, fontWeight: 700, color: INK, minHeight: 44, display: "flex", alignItems: "flex-start", justifyContent: "center" }}>{t}</h4>
                  <p style={{ margin: "8px 0 0", fontSize: 13.5, lineHeight: 1.6, color: SOFT, maxWidth: 150 }}>{d}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 4. Solutions for your operation */
const OPS: { n: string; title: string; label: string; body: string; help: string[]; products: string[]; img: string; chip: string }[] = [
  { n: "01", title: "Coordinate service work from assignment to completion", label: "Field service operations", body: "Field service providers coordinate customer requests, service assignments, site visits and the resources required to complete each job. The surrounding operation may also involve parts, billing and customer follow-up.", help: ["Organize customer enquiries and maintain service relationships.", "Coordinate service activities and related work.", "Support relevant inventory and billing processes.", "Maintain customer communication and follow-up."], products: ["ServiceOps", "CRM", "Inventory", "Billing", "Desk"], img: U("1660330589827-da8ab7dd3c02"), chip: "Technician en route" },
  { n: "02", title: "Coordinate requests, maintenance and facility services", label: "Facilities management", body: "Facilities management involves responding to building-related requests, organizing maintenance activities and coordinating the people responsible for keeping facilities operational. Requirements vary according to the facilities managed and the service arrangements in place.", help: ["Handle incoming service requests and related communication.", "Coordinate relevant maintenance activities and project work.", "Support inventory-related processes and associated billing.", "Maintain records and communication across applicable service processes."], products: ["ServiceOps", "Desk", "Projects", "Inventory", "Billing"], img: U("1732395805034-e0bf859665e5"), chip: "Request logged" },
  { n: "03", title: "Coordinate planned work and breakdown response", label: "Maintenance operations", body: "Maintenance teams handle scheduled tasks alongside unexpected equipment or facility issues. Their requirements may include work coordination, responsibility assignment, parts availability and records of completed activities.", help: ["Coordinate maintenance-related activities and responsibilities.", "Organize related project work where applicable.", "Support inventory and parts-related processes.", "Handle associated billing and commercial administration."], products: ["ServiceOps", "Inventory", "Projects", "Billing"], img: U("1748256086767-8974ee677f77"), chip: "Work order in progress" },
];

function Solutions() {
  const header = (
    <div className="fs-wrap" style={{ width: "100%", textAlign: "center", marginBottom: 34 }}>
      <Eyebrow>Solutions for your operation</Eyebrow>
      <h2 className="fs-oneline" style={h2}>Different service operations. Different requirements.</h2>
      <p style={{ margin: "14px auto 0", fontSize: 15.5, lineHeight: 1.7, color: SOFT, maxWidth: "70ch" }}>Field service providers, facilities management companies and maintenance teams share some operational needs, but each works differently. Explore the requirements most relevant to your operation and the EVOQ products that may support them.</p>
    </div>
  );
  return (
    <section id="solutions" style={{ background: CW }}>
      <HScroll header={header}>
        {OPS.map((o) => (
          <article key={o.label} className="fs-hcard" style={{ flex: "0 0 min(1000px, 86vw)", display: "grid", gridTemplateColumns: "minmax(0,.8fr) minmax(0,1.2fr)", background: PALE, border: `1px solid ${LINE}`, borderRadius: 28, overflow: "hidden", boxShadow: "0 40px 70px -48px rgba(15,61,117,.55)" }}>
            <div style={{ position: "relative", minHeight: 420, ...photo(o.img) }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(15,61,117,0) 55%, rgba(15,61,117,.55))" }} />
              <span style={{ position: "absolute", left: 16, bottom: 16, display: "inline-flex", alignItems: "center", gap: 8, background: CW, color: NAVY, fontSize: 12.5, fontWeight: 700, padding: "8px 14px", borderRadius: 999 }}><i style={{ width: 9, height: 9, borderRadius: "50%", background: ORANGE, display: "inline-block" }} />{o.chip}</span>
            </div>
            <div style={{ padding: "30px 32px 30px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: BURNT }}><span style={{ color: BLUE }}>{o.n}</span>{o.label}</div>
              <h3 style={{ margin: "10px 0 0", fontSize: 27, lineHeight: 1.18, fontWeight: 700, letterSpacing: "-.02em", color: NAVY }}>{o.title}</h3>
              <p style={{ margin: "12px 0 0", fontSize: 14.2, lineHeight: 1.72, color: SOFT }}>{o.body}</p>
              <div style={{ marginTop: 18, fontSize: 11, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: NAVY }}>Where EVOQ products may help</div>
              <div className="fs-help" style={{ marginTop: 10 }}>
                {o.help.map((h) => (
                  <div key={h} style={{ background: CW, borderRadius: 12, padding: "10px 13px", fontSize: 12.8, lineHeight: 1.55, color: INK }}>{h}</div>
                ))}
              </div>
              <div style={{ marginTop: 16, fontSize: 11, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: NAVY }}>Relevant EVOQ products</div>
              <div style={{ marginTop: 9 }}><Chips list={o.products} /></div>
            </div>
          </article>
        ))}
      </HScroll>
    </section>
  );
}

/* ------------------------------------------------------------------ 5. Ecosystem */
function Ecosystem() {
  const groups: [string, string[], string][] = [
    ["Customer relationships and communication", ["CRM", "Campaigns", "Desk"], "Support relevant enquiry management, customer follow-up, campaigns and incoming service requests."],
    ["Service resources and coordination", ["Projects", "HRMS", "Skillberry"], "Support applicable project coordination, people administration and training requirements."],
    ["Parts and commercial processes", ["Inventory", "Billing"], "Support relevant inventory-related activities and billing associated with service operations."],
    ["Data exchange", ["Sync"], "Support information exchange between EVOQ products and existing systems through available integrations."],
  ];
  const card = (g: (typeof groups)[number], i: number) => (
    <div key={g[0]} data-rv={String(i)} className="fs-card" style={{ background: PALE, border: `1px solid ${LINE}`, borderRadius: 18, padding: "22px 22px 24px" }}>
      <h4 style={{ margin: 0, fontSize: 17.5, fontWeight: 700, color: NAVY, lineHeight: 1.25 }}>{g[0]}</h4>
      <div style={{ marginTop: 12 }}><Chips list={g[1]} /></div>
      <p style={{ margin: "12px 0 0", fontSize: 13.5, lineHeight: 1.7, color: SOFT }}>{g[2]}</p>
    </div>
  );
  return (
    <section style={{ background: CW, padding: "20px 0 96px" }}>
      <div className="fs-wrap">
        <div style={{ maxWidth: 780 }} data-rv="0">
          <Eyebrow>The EVOQ product ecosystem</Eyebrow>
          <h2 style={h2}>Service operations rarely work in isolation</h2>
          <p style={{ margin: "18px 0 0", fontSize: 16, lineHeight: 1.8, color: SOFT, maxWidth: "62ch" }}>Service delivery involves customer relationships, people, materials, commercial processes and information exchanged with other systems. ServiceOps provides the central operational focus for this solution, while relevant EVOQ products may support the surrounding activities.</p>
        </div>
        <div className="fs-eco" style={{ marginTop: 48 }}>
          <div style={{ display: "grid", gap: 18 }}>{card(groups[0], 0)}{card(groups[1], 1)}</div>
          <div className="fs-hub" data-rv="1">
            <div className="fs-hub-lines" aria-hidden="true" />
            <div style={{ position: "relative", zIndex: 1, width: 200, height: 200, borderRadius: "50%", background: NAVY, color: CW, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, boxShadow: `0 0 0 12px ${PALE}, 0 40px 70px -34px ${NAVY}` }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ICON.ServiceOps} alt="" width={60} height={60} style={{ width: 60, height: 60, objectFit: "contain", background: CW, borderRadius: 16, padding: 6 }} />
              <b style={{ fontSize: 20 }}>ServiceOps</b>
              <span style={{ fontSize: 11.5, color: PALE }}>Operational focus</span>
            </div>
          </div>
          <div style={{ display: "grid", gap: 18 }}>{card(groups[2], 2)}{card(groups[3], 3)}</div>
        </div>
        <p data-rv="0" style={{ margin: "34px 0 0", paddingLeft: 18, borderLeft: `3px solid ${ORANGE}`, fontSize: 15, lineHeight: 1.75, color: SOFT, maxWidth: "70ch" }}>The products required will depend on your operating model, existing systems and the capabilities needed. Not every organization will need every product.</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 6. Final CTA */
function FinalCta() {
  return (
    <section id="talk" style={{ background: CW, padding: "20px 0 96px" }}>
      <div className="fs-wrap">
        <div data-rv="0" className="fs-cta" style={{ position: "relative", overflow: "hidden", borderRadius: 28, background: PALE, border: `1px solid ${LINE}`, color: INK, padding: "60px 60px", display: "block", minHeight: 340 }}>
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(15,61,117,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(15,61,117,.07) 1px, transparent 1px)", backgroundSize: "44px 44px", maskImage: "linear-gradient(90deg, #000, transparent 90%)", WebkitMaskImage: "linear-gradient(90deg, #000, transparent 90%)" }} />
          <div style={{ position: "relative", maxWidth: 560 }}>
            <Eyebrow>Let&apos;s talk</Eyebrow>
            <h2 style={{ ...h2, fontSize: 38 }}>Let&apos;s discuss your service operation</h2>
            <p style={{ margin: "18px 0 28px", fontSize: 15.5, lineHeight: 1.8, color: SOFT, maxWidth: "58ch" }}>Explain how your organization handles service requests, maintenance activities, technician coordination and related processes. Explore the EVOQ products that may fit your requirements and clarify the capabilities and integrations needed.</p>
            <Cta>Talk to an expert</Cta>
          </div>
          <div className="fs-ctavis" aria-hidden="true" style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "52%", pointerEvents: "none" }}>
            <span style={{ position: "absolute", right: -60, top: -50, width: 300, height: 190, borderRadius: "0 100% 0 100%", background: `linear-gradient(135deg, ${POR}, rgba(255,237,213,0))`, filter: "blur(14px)", opacity: .9 }} />
            <span style={{ position: "absolute", right: 70, top: "12%", width: 340, height: 220, borderRadius: "0 100% 0 100%", transform: "rotate(-8deg)", background: `linear-gradient(135deg, ${AZURE}, ${BLUE})`, opacity: .28, border: "2px solid rgba(255,255,255,.9)", boxShadow: "inset 0 0 40px rgba(255,255,255,.55)" }} />
            <span style={{ position: "absolute", right: -80, bottom: -90, width: 360, height: 230, borderRadius: "100% 0 100% 0", transform: "rotate(-8deg)", background: `linear-gradient(135deg, ${AZURE}, ${NAVY})`, opacity: .22, border: "2px solid rgba(255,255,255,.9)", boxShadow: "inset 0 0 40px rgba(255,255,255,.55)" }} />
            <span style={{ position: "absolute", right: 250, bottom: -110, width: 300, height: 190, borderRadius: "0 100% 0 100%", transform: "rotate(-8deg)", background: `linear-gradient(135deg, ${PALE}, ${AZURE})`, opacity: .4, border: "2px solid rgba(255,255,255,.9)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function FieldServicePage() {
  return (
    <div className="hs-root" style={{ minHeight: "100vh", background: CW, color: INK, fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
      <HsMotion />
      <EnquiryModal eyebrow="EVOQ Field Service, Facilities & Maintenance" segments={["Field service provider", "Facilities management company", "Maintenance team", "Other service operation"]} segmentLabel="Your operation" placeholder="Service requests, technicians, parts, scheduling, follow-up..." accent={NAVY} accentSoft={BLUE} />
      <style>{`
        .fs-wrap{max-width:1240px;margin:0 auto;padding:0 24px}
        .fs-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:40px;align-items:center;padding:52px 0 88px}
        .fs-hero-vis{position:relative;height:500px}
        .fs-cta{}@media (max-width:900px){.fs-cta{grid-template-columns:1fr!important;padding:36px 24px!important}}
        .fs-split{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:48px}
        .fs-g3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px}
        .fs-g4{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:24px 22px}
        .fs-eco{display:grid;grid-template-columns:minmax(0,1fr) 260px minmax(0,1fr);gap:26px;align-items:center}
        .fs-hub{position:relative;display:flex;align-items:center;justify-content:center;min-height:240px}
        .fs-hub-lines{position:absolute;left:-26px;right:-26px;top:50%;height:0;border-top:2px dashed ${AZURE}}
        .fs-op{display:grid;grid-template-columns:minmax(0,.95fr) minmax(0,1.05fr);gap:60px;align-items:center}
        .fs-op-r .fs-op-img{order:2}
        .fs-help{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
        .fl-step{min-width:0}
        .fs-oneline{white-space:nowrap}
        .fs-btn{transition:transform .2s ease,box-shadow .2s ease}
        .fs-btn:hover{transform:translateY(-2px)}
        .fs-card{transition:transform .3s ease,box-shadow .3s ease}
        .fs-card:hover{transform:translateY(-5px);box-shadow:0 28px 52px -30px rgba(15,61,117,.55)}
        @keyframes fsDash{to{stroke-dashoffset:-44}}
        .fs-route{animation:fsDash 2.4s linear infinite}
        @keyframes fsPulse{0%{r:9;opacity:.5}100%{r:26;opacity:0}}
        .fs-pulse{animation:fsPulse 2s ease-out infinite}
        .hs-rv{opacity:0;transform:translateY(26px);transition:opacity .8s cubic-bezier(.2,.7,.2,1),transform .8s cubic-bezier(.2,.7,.2,1);transition-delay:var(--hs-d,0ms)}
        .hs-rv.hs-in{opacity:1;transform:none}
        @media (max-width:1100px){.fs-g4{grid-template-columns:repeat(2,minmax(0,1fr))}.fs-arr{display:none}.fs-g3{grid-template-columns:1fr}}
        @media (max-width:760px){        @media (max-width:1180px){.fs-oneline{white-space:normal}}
        @media (max-width:980px){.fs-hcard{grid-template-columns:1fr!important}.fs-op{grid-template-columns:1fr;gap:28px}.fs-op-r .fs-op-img{order:0}.fs-op-img{min-height:300px!important}.fs-hero,.fs-split,.fs-fit,.fs-cta{grid-template-columns:1fr!important;gap:34px}.fs-hero-vis{height:470px}.fs-eco{grid-template-columns:1fr}.fs-hub-lines{display:none}.fs-cta{padding:38px 28px!important}}
        @media (max-width:1100px){.fl-svg,.fl-glow,.fl-dot{display:none}.fl-grid{grid-template-columns:repeat(4,minmax(0,1fr))!important;row-gap:36px!important}}
        @media (max-width:640px){.fl-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}.fs-help{grid-template-columns:1fr}.fs-g4{grid-template-columns:1fr}.fs-hero h1{font-size:40px!important}.fs-phone{width:190px!important}}
        @media (prefers-reduced-motion:reduce){.fs-route,.fs-pulse.hs-rv,.fs-card,.fs-btn{transition:none}}
      `}</style>
      <div style={{ background: CW, position: "relative", zIndex: 60, borderBottom: `1px solid ${LINE}` }}>
        <Topbar darkCTA={false} light ctaColor={NAVY} />
      </div>
      <Hero />
      <Operations />
      <Flow />
      <Solutions />
      <Ecosystem />
      <FinalCta />
      <Footer background={NAVY} />
    </div>
  );
}
