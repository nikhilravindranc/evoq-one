import type { CSSProperties } from "react";
import { Topbar } from "@/components/hero/Topbar";
import { Footer } from "@/components/sections/Footer";
import { EnquiryModal } from "@/components/manufacturing/EnquiryModal";
import { HsMotion } from "@/components/hospitality/HsMotion";
import { ConstructionTabs } from "./ConstructionTabs";

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
        <nav aria-label="Breadcrumb" style={{ paddingTop: 22, fontSize: 12, color: CONCRETE }}>Home <span style={{ margin: "0 6px" }}>/</span> Solutions <span style={{ margin: "0 6px" }}>/</span> <b style={{ color: BROWN, fontWeight: 600 }}>Construction, Engineering &amp; Real Estate</b></nav>
        <div className="cn-hero">
          <div data-rv="0">
            <Eyebrow>Industry solutions</Eyebrow>
            <h1 style={{ margin: 0, fontSize: 56, lineHeight: 1.06, letterSpacing: "-.03em", fontWeight: 600, color: CLAY }}>Coordinate projects, technical work and property operations</h1>
            <p style={{ margin: "24px 0 0", fontSize: 16.5, lineHeight: 1.75, color: "#44403C", maxWidth: "52ch" }}>From project delivery and client relationships to commercial processes and ongoing service, construction, engineering and real estate organizations manage different kinds of work with overlapping operational needs. EVOQ products can support these activities through relevant product combinations tailored to each organization.</p>
            <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Cta>Talk to an expert</Cta>
              <a href="#solutions" className="cn-btn" style={{ display: "inline-flex", alignItems: "center", padding: "15px 26px", borderRadius: 4, border: `1.5px solid ${TERRA}`, color: TERRA, textDecoration: "none", fontSize: 14.5, fontWeight: 600 }}>Explore solutions</a>
            </div>
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

/* ------------------------------------------------------------------ 2. Overview */
function Overview() {
  const items: [string, string, string][] = [
    ["01", "Project coordination", "Organize project activities, track responsibilities and maintain visibility into delivery progress."],
    ["02", "Client relationships", "Capture enquiries, maintain prospect and client records, and manage follow-up throughout the relationship."],
    ["03", "Commercial operations", "Support applicable billing, inventory-related processes and the administrative work associated with projects and services."],
  ];
  return (
    <section style={{ background: LSAND + "55", padding: "92px 0 96px", borderTop: `1px solid ${LSAND}` }}>
      <div className="cn-wrap">
        <div className="cn-split" data-rv="0" style={{ alignItems: "end" }}>
          <div><Eyebrow>Industry overview</Eyebrow><h2 style={h2}>The work behind every project and property</h2></div>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.8, color: "#57534E", maxWidth: "54ch" }}>Projects, technical engagements and property transactions follow different paths. Yet each depends on timely communication, clear responsibilities and reliable coordination between the people handling the work.</p>
        </div>
        <div className="cn-g3" style={{ marginTop: 48 }}>
          {items.map(([n, t, d], i) => (
            <article key={t} data-rv={String(i)} className="cn-card" style={{ position: "relative", background: "#fff", border: `1px solid ${LSAND}`, borderTop: `3px solid ${TERRA}`, borderRadius: 4, padding: "28px 26px 30px" }}>
              <svg aria-hidden="true" width="100%" height="64" viewBox="0 0 280 64" fill="none" stroke={TAUPE} strokeWidth="1.3">
                {i === 0 && <path d="M6 58h268M24 58V26h44v32M68 58V10h52v48M120 58V34h40v32M160 58V20h46v38M206 58V38h60v20" />}
                {i === 1 && <><circle cx="70" cy="30" r="14" /><circle cx="140" cy="30" r="14" /><circle cx="210" cy="30" r="14" /><path d="M84 30h42M154 30h42" strokeDasharray="4 4" /></>}
                {i === 2 && <path d="M6 58h268M30 58V30h50v28M80 58V18h50v40M130 58V30h50v28M180 58V42h50v16" />}
              </svg>
              <div style={{ marginTop: 18, fontSize: 11, fontWeight: 700, letterSpacing: ".2em", color: TERRA }}>{n}</div>
              <h3 style={{ margin: "8px 0 0", fontSize: 22, fontWeight: 700, color: CLAY, letterSpacing: "-.01em" }}>{t}</h3>
              <p style={{ margin: "12px 0 0", fontSize: 14.5, lineHeight: 1.75, color: "#57534E" }}>{d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 4. Approach */
function Approach() {
  const blocks: [string, number, number, boolean][] = [["Projects", 0, 0, true], ["CRM", 1, 0, true], ["Billing", 2, 0, false], ["Inventory", 0, 1, false], ["ServiceOps", 1, 1, false], ["Add as needed", 2, 1, false]];
  return (
    <section id="approach" style={{ background: WARM, padding: "96px 0 40px", ...grid(LCON + "88", 48) }}>
      <div className="cn-wrap cn-split" style={{ alignItems: "center", gap: 64 }}>
        <div data-rv="0">
          <Eyebrow>Solution approach</Eyebrow>
          <h2 style={h2}>Start with your operation, not a predefined package</h2>
          <p style={{ margin: "22px 0 0", fontSize: 16, lineHeight: 1.8, color: "#44403C", maxWidth: "54ch" }}>Some organizations may need support for project coordination and client relationships. Others may need a combination that also addresses billing, inventory-related activities or service requests.</p>
          <p style={{ margin: "14px 0 0", fontSize: 16, lineHeight: 1.8, color: "#44403C", maxWidth: "54ch" }}>EVOQ helps you explore which products may fit your requirements, how they could work together, and where configuration or integrations may be needed.</p>
        </div>
        <div data-rv="1" aria-hidden="true" style={{ position: "relative", padding: 22, border: `1px dashed ${TAUPE}`, borderRadius: 4, background: "#ffffffaa" }}>
          <div style={{ position: "absolute", left: 22, top: -11, background: WARM, padding: "0 10px", fontSize: 11, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: CONCRETE }}>Your combination</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: 12 }}>
            {blocks.map(([t, , , on]) => (
              <div key={t} style={{ height: 96, borderRadius: 3, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 8, background: on ? TERRA : t === "Add as needed" ? "transparent" : LSAND, border: t === "Add as needed" ? `1.5px dashed ${TAUPE}` : "none", color: on ? "#fff" : t === "Add as needed" ? CONCRETE : CLAY, fontSize: 13, fontWeight: 700, boxShadow: on ? "0 18px 30px -20px rgba(124,45,31,.8)" : "none" }}>
                {ICON[t] && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={ICON[t]} alt="" width={30} height={30} style={{ width: 30, height: 30, objectFit: "contain", background: "#fff", borderRadius: 7, padding: 2 }} />
                )}
                {t === "Add as needed" && <span style={{ fontSize: 24, lineHeight: 1 }}>+</span>}
                {t}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", fontSize: 11.5, color: CONCRETE, borderTop: `1px solid ${TAUPE}66`, paddingTop: 12 }}><span>Configuration</span><span>Integrations</span><span>Specialist systems</span></div>
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
            <Eyebrow>Final step</Eyebrow>
            <h2 style={{ ...h2, fontSize: 38 }}>Let&apos;s identify the right fit for your operation</h2>
            <p style={{ margin: "18px 0 0", fontSize: 15.5, lineHeight: 1.75, color: "#44403C", maxWidth: "56ch" }}>Discuss your current processes, existing systems and priorities with EVOQ. Explore suitable product combinations and clarify the capabilities, configuration and integrations required for your organization.</p>
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
      <EnquiryModal eyebrow="EVOQ Construction, Engineering & Real Estate" segments={["Construction companies and contractors", "Engineering firms", "Real estate agencies and developers", "Property and facilities management", "Other"]} segmentLabel="Your business" placeholder="Projects, enquiries, service requests, billing..." accent={CLAY} accentSoft={TERRA} />
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
      <Overview />
      <ConstructionTabs />
      <Approach />
      <FinalCta />
      <Footer background={CLAY} />
    </div>
  );
}
