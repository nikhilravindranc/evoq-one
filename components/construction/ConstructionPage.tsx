import type { CSSProperties } from "react";
import { Topbar } from "@/components/hero/Topbar";
import { Footer } from "@/components/sections/Footer";
import { EnquiryModal } from "@/components/manufacturing/EnquiryModal";
import { HsMotion } from "@/components/hospitality/HsMotion";

/* Construction & Real Estate: architectural, structural, grounded. Linework, grids and site photography. */
const TERRA = "#B4533C";
const CLAY = "#7C2D1F";
const SAND = "#D6B88C";
const LSAND = "#E8D8BF";
const TAUPE = "#A89B8C";
const WARM = "#FAF7F2";
const BROWN = "#292524";
const CONCRETE = "#78716C";
const LCON = "#E7E5E4";

const U = (id: string, w = 1000) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;
const IMG = {
  site: U("1578052315041-06c7c248b325", 1400),
  plans: U("1774600166588-1db444bda799", 900),
  workers: U("1778074762022-c33cc42f79ae", 900),
  dev: U("1597026405082-eda9beae7513", 900),
  agent: U("1758523671301-cf64a85d0d34", 900),
  facil: U("1732395805034-e0bf859665e5", 900),
  interior: U("1722650362309-2f2fdffbfbf1", 1000),
  site2: U("1564995408557-f12ea1e4ecf1", 1000),
};
const photo = (src: string, extra: CSSProperties = {}): CSSProperties => ({ backgroundImage: `url(${src})`, backgroundSize: "cover", backgroundPosition: "center", ...extra });
const I = (f: string) => `/billing/images/${f}`;
const ICON: Record<string, string> = { CRM: I("crm-menu-icn.png"), Projects: I("evoq-projects-menu-icn.png"), Inventory: I("inventory-menu-icn.png"), Billing: I("billing-menu-icn.png"), Desk: I("desk-menu-icn.png"), Campaigns: I("campaigns-menu-icn.png"), ServiceOps: I("serviceops-icon.svg") };

const grid = (c: string, s = 40): CSSProperties => ({ backgroundImage: `linear-gradient(${c} 1px, transparent 1px), linear-gradient(90deg, ${c} 1px, transparent 1px)`, backgroundSize: `${s}px ${s}px` });
const Arrow = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>;
function Eyebrow({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <p style={{ margin: "0 0 16px", display: "flex", alignItems: "center", gap: 12, fontSize: 11.5, fontWeight: 600, letterSpacing: ".22em", textTransform: "uppercase", color: light ? SAND : TERRA }}>
      <span style={{ width: 28, height: 2, background: light ? SAND : TERRA }} />{children}
    </p>
  );
}
function Cta({ light = false, children }: { light?: boolean; children: string }) {
  return (
    <a href="#" data-enquiry="" className="cn-btn" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "15px 28px", borderRadius: 4, fontSize: 14.5, fontWeight: 600, textDecoration: "none", background: light ? "#fff" : TERRA, color: light ? CLAY : "#fff", boxShadow: light ? "none" : "0 16px 30px -18px rgba(124,45,31,.8)" }}>
      {children}<Arrow />
    </a>
  );
}
const h2: CSSProperties = { margin: 0, fontSize: 42, lineHeight: 1.1, letterSpacing: "-.025em", fontWeight: 600, color: BROWN };
function Apps({ list, dark = false }: { list: string[]; dark?: boolean }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {list.map((a) => (
        <span key={a} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 12px 5px 6px", borderRadius: 4, background: dark ? "rgba(255,255,255,.1)" : LSAND + "99", border: dark ? "1px solid rgba(255,255,255,.18)" : `1px solid ${LSAND}`, fontSize: 12, fontWeight: 600, color: dark ? "#fff" : CLAY }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ICON[a]} alt="" width={20} height={20} style={{ width: 20, height: 20, objectFit: "contain", background: "#fff", borderRadius: 4, padding: 1 }} />{a}
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ 1. Hero */
function Hero() {
  const stages = ["Lead", "Opportunity", "Proposal", "Project", "Site", "Handover", "Maintenance"];
  return (
    <section style={{ background: WARM, position: "relative", overflow: "hidden", ...grid(LCON + "88", 48) }}>
      <div className="cn-wrap">
        <nav aria-label="Breadcrumb" style={{ paddingTop: 22, fontSize: 12, color: CONCRETE }}>Home <span style={{ margin: "0 6px" }}>/</span> Solutions <span style={{ margin: "0 6px" }}>/</span> <b style={{ color: BROWN, fontWeight: 600 }}>Construction &amp; Real Estate</b></nav>
        <div className="cn-hero">
          <div data-rv="0">
            <Eyebrow>Construction &amp; Real Estate</Eyebrow>
            <h1 style={{ margin: 0, fontSize: 58, lineHeight: 1.05, letterSpacing: "-.03em", fontWeight: 600, color: CLAY }}>Coordinate projects and property operations</h1>
            <p style={{ margin: "24px 0 0", fontSize: 16.5, lineHeight: 1.75, color: "#44403C", maxWidth: "52ch" }}>Construction and property operations involve multiple stakeholders, ongoing project activities and commercial responsibilities. From managing client enquiries to coordinating project work and handling service requests, each stage requires clear ownership and timely follow-through.</p>
            <p style={{ margin: "14px 0 0", fontSize: 15.5, lineHeight: 1.75, color: CONCRETE, maxWidth: "52ch" }}>EVOQ products support relevant parts of these operations, helping organizations manage relationships, coordinate activities and handle associated processes.</p>
            <div style={{ marginTop: 32 }}><Cta>Talk to an expert</Cta></div>
          </div>
          <div className="cn-hero-vis" data-rv="1">
            <div style={{ position: "absolute", right: 0, top: 0, width: "84%", height: "78%", ...photo(IMG.site), borderRadius: "6px 90px 6px 6px", boxShadow: "0 40px 80px -44px rgba(124,45,31,.7)" }} />
            <div style={{ position: "absolute", left: 0, bottom: 0, width: "46%", height: "46%", ...photo(IMG.plans), border: `6px solid ${WARM}`, borderRadius: 6, boxShadow: "0 30px 60px -34px rgba(41,37,36,.6)" }} />
            <svg aria-hidden="true" viewBox="0 0 520 440" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} fill="none" stroke={SAND} strokeWidth="1.2">
              <path d="M430 18v-0M82 330H500M82 322v16M500 322v16" stroke="#fff" opacity=".9" />
              <path d="M492 20V312M484 20h16M484 312h16" stroke="#fff" opacity=".9" />
              <rect x="40" y="40" width="46" height="46" strokeDasharray="4 5" opacity=".9" stroke="#fff" />
            </svg>
            <span style={{ position: "absolute", right: 22, top: "34%", fontSize: 10.5, fontWeight: 600, letterSpacing: ".1em", color: "#fff", background: "rgba(41,37,36,.55)", padding: "3px 8px", borderRadius: 3, transform: "rotate(90deg)", transformOrigin: "right center", textShadow: "none" }}>SITE · 24.0 M</span>
          </div>
        </div>
      </div>
      <div style={{ background: CLAY, color: "#fff" }}>
        <div className="cn-wrap cn-stages" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, padding: "20px 24px", overflowX: "auto" }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: SAND, whiteSpace: "nowrap" }}>Project lifecycle</span>
          {stages.map((t, i) => (
            <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 14, whiteSpace: "nowrap", fontSize: 14, fontWeight: 600 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><i style={{ width: 8, height: 8, background: i === 3 ? SAND : "transparent", border: `1.5px solid ${SAND}`, display: "inline-block" }} />{t}</span>
              {i < stages.length - 1 && <span style={{ width: 28, height: 1, background: SAND + "88" }} />}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 2. People */
function People() {
  const items: [string, string, string, string][] = [
    ["A", "Construction companies and contractors", "Coordinate project activities, maintain client relationships and manage related commercial processes from project planning through handover.", IMG.workers],
    ["B", "Property developers and builders", "Manage buyer enquiries, follow up on sales opportunities and coordinate communication throughout the property development and sales journey.", IMG.dev],
    ["C", "Real estate agencies", "Organize property-related enquiries, track prospective buyers and tenants, and maintain consistent follow-up across sales and rental opportunities.", IMG.agent],
    ["D", "Property and facilities management companies", "Coordinate incoming service requests, organize maintenance-related activities and manage applicable billing processes.", IMG.facil],
  ];
  return (
    <section style={{ background: LSAND + "55", padding: "92px 0 96px", borderTop: `1px solid ${LSAND}` }}>
      <div className="cn-wrap">
        <div className="cn-split" data-rv="0">
          <div><Eyebrow>Who we support</Eyebrow><h2 style={h2}>For the people behind every project and property</h2></div>
        </div>
        <div className="cn-g4" style={{ marginTop: 48 }}>
          {items.map(([k, t, d, img], i) => (
            <article key={t} data-rv={String(i)} className="cn-card" style={{ background: "#fff", border: `1px solid ${LSAND}`, borderRadius: 4, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ position: "relative", height: 210, ...photo(img) }}>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(41,37,36,0) 55%, rgba(41,37,36,.5))" }} />
                <span style={{ position: "absolute", left: 14, top: 14, width: 30, height: 30, background: "#fff", color: CLAY, fontWeight: 700, fontSize: 13, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{k}</span>
              </div>
              <div style={{ padding: "20px 22px 24px", borderTop: `3px solid ${TERRA}` }}>
                <h3 style={{ margin: 0, fontSize: 18, lineHeight: 1.25, fontWeight: 700, color: CLAY }}>{t}</h3>
                <p style={{ margin: "11px 0 0", fontSize: 13.5, lineHeight: 1.7, color: "#57534E" }}>{d}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 3. Solutions */
function Solutions() {
  const items: [string, string, string, string[]][] = [
    ["Construction and project delivery", "Coordinate project activities, maintain client relationships, manage relevant inventory and handle billing and incoming requests throughout project delivery.", "", ["CRM", "Projects", "Inventory", "Billing", "Desk"]],
    ["Property development and sales", "Manage buyer enquiries, follow up on prospective buyers, coordinate applicable project activities and maintain communication through key milestones.", "", ["CRM", "Campaigns", "Projects", "Billing", "Desk"]],
    ["Real estate and property operations", "Organize property-related enquiries, maintain client relationships, handle service requests and support applicable billing processes.", "", ["CRM", "Desk", "ServiceOps", "Billing"]],
  ];
  return (
    <section style={{ background: CLAY, color: "#fff", padding: "96px 0 100px", position: "relative", overflow: "hidden", ...grid("rgba(255,255,255,.06)", 56) }}>
      <div className="cn-wrap">
        <div className="cn-split" data-rv="0" style={{ alignItems: "end" }}>
          <div><Eyebrow light>Solutions for construction and property</Eyebrow><h2 style={{ ...h2, color: "#fff" }}>Select the structure that fits your work</h2></div>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.75, color: "#EBD9CC", maxWidth: "52ch" }}>EVOQ products can work individually or together to support selected processes across construction, property sales and ongoing operations.</p>
        </div>
        <div className="cn-g3" style={{ marginTop: 52 }}>
          {items.map(([t, d, , apps], i) => (
            <article key={t} data-rv={String(i)} className="cn-card" style={{ position: "relative", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.18)", borderRadius: 4, padding: "30px 28px 28px", display: "flex", flexDirection: "column" }}>
              <svg aria-hidden="true" width="100%" height="86" viewBox="0 0 300 86" fill="none" stroke={SAND} strokeWidth="1.4" style={{ opacity: 0.85 }}>
                {i === 0 && <><path d="M10 80h280M30 80V30h60v50M90 80V10h70v70M160 80V44h50v36M210 80V24h60v56" /><path d="M120 10v-6M120 4h16" /></>}
                {i === 1 && <><path d="M10 80h280M40 80V40l40-26 40 26v40M150 80V50l32-20 32 20v30M236 80V58l22-14 22 14v22" /><path d="M64 80V58h32v22" /></>}
                {i === 2 && <><rect x="14" y="10" width="270" height="68" /><path d="M14 44h120M134 10v68M134 54h150M208 10v44M60 10v34" /><path d="M96 78v-10a10 10 0 0 1 10-10" /></>}
              </svg>
              <div style={{ marginTop: 18, fontSize: 11, fontWeight: 700, letterSpacing: ".2em", color: SAND }}>0{i + 1}</div>
              <h3 style={{ margin: "8px 0 0", fontSize: 24, lineHeight: 1.2, fontWeight: 600, letterSpacing: "-.01em" }}>{t}</h3>
              <p style={{ margin: "14px 0 0", fontSize: 14.5, lineHeight: 1.75, color: "#EBD9CC" }}>{d}</p>
              <div style={{ marginTop: "auto", paddingTop: 26 }}>
                <div style={{ marginBottom: 10, fontSize: 10.5, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: SAND }}>Relevant products</div>
                <Apps list={apps} dark />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 3b. Applications */
function Applications() {
  const apps: [string, string][] = [
    ["CRM", "Enquiries, buyers, tenants and follow-ups"],
    ["Campaigns", "Promote developments and listings"],
    ["Projects", "Tasks, timelines and milestones"],
    ["Inventory", "Materials and stock records"],
    ["ServiceOps", "Maintenance and service work"],
    ["Desk", "Requests and issues to resolution"],
    ["Billing", "Invoices and payments"],
  ];
  return (
    <section id="applications" style={{ background: WARM, padding: "92px 0 20px" }}>
      <div className="cn-wrap">
        <div className="cn-split" data-rv="0" style={{ alignItems: "end" }}>
          <div><Eyebrow>EVOQ products</Eyebrow><h2 style={h2}>The products behind these solutions</h2></div>
          <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.75, color: "#57534E", maxWidth: "52ch" }}>Discover the individual EVOQ products, understand their capabilities and identify which ones may fit your requirements.</p>
        </div>
        <div className="cn-apps" style={{ marginTop: 44 }}>
          {apps.map(([a, d], i) => (
            <div key={a} data-rv={String(i % 4)} className="cn-card" style={{ background: "#fff", border: `1px solid ${LSAND}`, borderTop: `3px solid ${TERRA}`, borderRadius: 4, padding: "22px 18px 22px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ICON[a]} alt="" width={44} height={44} style={{ width: 44, height: 44, objectFit: "contain", borderRadius: 10 }} />
              <h3 style={{ margin: "16px 0 0", fontSize: 17, fontWeight: 700, color: CLAY }}>{a}</h3>
              <p style={{ margin: "8px 0 0", fontSize: 13, lineHeight: 1.6, color: "#57534E" }}>{d}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 28 }} data-rv="0">
          <a href="/products" className="cn-btn" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 24px", borderRadius: 4, border: `1.5px solid ${TERRA}`, color: TERRA, textDecoration: "none", fontSize: 14.5, fontWeight: 700 }}>Explore all products<Arrow /></a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 4. Final CTA */
function FinalCta() {
  return (
    <section id="talk" style={{ background: WARM, padding: "88px 0 92px", ...grid(LCON + "88", 48) }}>
      <div className="cn-wrap">
        <div className="cn-cta" data-rv="0" style={{ position: "relative", overflow: "hidden", background: LSAND, borderRadius: 6, borderLeft: `8px solid ${TERRA}`, display: "grid", gridTemplateColumns: "minmax(0,1.2fr) minmax(0,.8fr)", alignItems: "stretch" }}>
          <div style={{ padding: "56px 56px 60px" }}>
            <Eyebrow>Discuss your requirements</Eyebrow>
            <h2 style={{ ...h2, fontSize: 38 }}>Every project and property has its own way of working</h2>
            <p style={{ margin: "18px 0 0", fontSize: 15.5, lineHeight: 1.75, color: "#44403C", maxWidth: "56ch" }}>Every construction and property operation has its own processes, priorities and system requirements. Discuss your current setup with the EVOQ team to explore suitable product combinations and clarify any configuration or integration requirements.</p>
            <div style={{ marginTop: 30 }}><Cta>Talk to an expert</Cta></div>
          </div>
          <div className="cn-cta-img" style={{ ...photo(IMG.interior), minHeight: 260 }} />
        </div>
      </div>
    </section>
  );
}

export function ConstructionPage() {
  return (
    <div className="hs-root" style={{ minHeight: "100vh", background: WARM, color: BROWN, fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
      <HsMotion />
      <EnquiryModal eyebrow="EVOQ Construction & Real Estate" segments={["Construction companies and contractors", "Property developers and builders", "Real estate agencies", "Property and facilities management companies", "Other"]} segmentLabel="Your business" placeholder="Projects, enquiries, service requests, billing..." accent={CLAY} accentSoft={TERRA} />
      <style>{`
        .cn-wrap{max-width:1240px;margin:0 auto;padding:0 24px}
        .cn-hero{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:56px;align-items:center;padding:46px 0 72px}
        .cn-hero-vis{position:relative;height:440px}
        .cn-split{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:48px}
        .cn-g4{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px}
        .cn-g3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px}
        .cn-apps{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:14px}
        .cn-btn{transition:transform .2s ease,box-shadow .2s ease}
        .cn-btn:hover{transform:translateY(-2px);box-shadow:0 18px 32px -16px rgba(124,45,31,.7)}
        .cn-card{transition:transform .3s ease,box-shadow .3s ease}
        .cn-card:hover{transform:translateY(-5px);box-shadow:0 30px 56px -34px rgba(41,37,36,.6)}
        .hs-rv{opacity:0;transform:translateY(26px);transition:opacity .8s cubic-bezier(.2,.7,.2,1),transform .8s cubic-bezier(.2,.7,.2,1);transition-delay:var(--hs-d,0ms)}
        .hs-rv.hs-in{opacity:1;transform:none}
        @media (max-width:1100px){.cn-g4{grid-template-columns:repeat(2,minmax(0,1fr))}.cn-g3{grid-template-columns:1fr}.cn-apps{grid-template-columns:repeat(4,minmax(0,1fr))}}
        @media (max-width:900px){.cn-hero,.cn-split{grid-template-columns:1fr;gap:34px}.cn-hero-vis{height:380px}.cn-cta{grid-template-columns:1fr!important}.cn-cta>div:first-child{padding:38px 28px 40px!important}.cn-cta-img{min-height:200px!important}}
        @media (max-width:640px){.cn-apps{grid-template-columns:repeat(2,minmax(0,1fr))}.cn-g4{grid-template-columns:1fr}.cn-hero h1{font-size:40px!important}}
        @media (prefers-reduced-motion:reduce){.hs-rv,.cn-card,.cn-btn{transition:none}}
      `}</style>
      <div style={{ background: "#fff", position: "relative", zIndex: 60, borderBottom: `1px solid ${LCON}` }}>
        <Topbar darkCTA={false} light ctaColor={CLAY} />
      </div>
      <Hero />
      <People />
      <Solutions />
      <Applications />
      <FinalCta />
      <Footer background={CLAY} />
    </div>
  );
}
