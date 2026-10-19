import type { CSSProperties } from "react";
import { Topbar } from "@/components/hero/Topbar";
import { Footer } from "@/components/sections/Footer";
import { EnquiryModal } from "@/components/manufacturing/EnquiryModal";
import { HsMotion } from "@/components/hospitality/HsMotion";
import { ConstructionIndustries } from "./ConstructionTabs";

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
const ICON: Record<string, string> = { CRM: I("crm-menu-icn.png"), Projects: I("evoq-projects-menu-icn.png"), Inventory: I("inventory-menu-icn.png"), Billing: I("billing-menu-icn.png"), Desk: I("desk-menu-icn.png"), Campaigns: I("campaigns-menu-icn.png"), ServiceOps: I("serviceops-icon.svg"), HRMS: I("hrms-menu-icn-new.png"), Skillberry: I("Skillberry-menu-icn.png") };

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
const h2: CSSProperties = { margin: 0, letterSpacing: "-.025em", fontWeight: 600, color: BROWN };
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
  return (
    <section style={{ background: WARM, position: "relative", overflow: "hidden", ...grid(LCON + "88", 48) }}>
      <div className="cn-wrap">
        <nav aria-label="Breadcrumb" style={{ paddingTop: 22, fontSize: 12, color: CONCRETE }}>Home <span style={{ margin: "0 6px" }}>/</span> Solutions <span style={{ margin: "0 6px" }}>/</span> <b style={{ color: BROWN, fontWeight: 600 }}>Construction, Engineering &amp; Real Estate</b></nav>
        <div className="cn-hero">
          <div data-rv="0">
            <Eyebrow>Construction · Engineering · Real Estate</Eyebrow>
            <h1 style={{ margin: 0, letterSpacing: "-.03em", fontWeight: 600, color: CLAY }}>Where plans become places.</h1>
            <p style={{ margin: "24px 0 0", fontSize: 17, lineHeight: 1.75, color: "#44403C", maxWidth: "50ch" }}>From engineering ideas and construction projects to the properties people buy, use and maintain, explore solutions relevant to the work behind the built environment.</p>
            <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Cta>Talk to an expert</Cta>
              <a href="/industries" className="cn-btn" style={{ display: "inline-flex", alignItems: "center", padding: "15px 26px", borderRadius: 4, border: `1.5px solid ${TERRA}`, color: TERRA, textDecoration: "none", fontSize: 14.5, fontWeight: 600 }}>Explore industries</a>
            </div>
          </div>
          <div className="cn-hero-vis" data-rv="1" role="img" aria-label="A contemporary building under construction" style={{ ...photo(IMG.site), borderRadius: "6px 90px 6px 6px", boxShadow: "0 40px 80px -44px rgba(124,45,31,.7)" }} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 3. How products work together */
function Together() {
  // Illustrative grouping only: no lines between apps, because integrations are not claimed here.
  const groups: { label: string; title: string; body: string; apps: [string, string][] }[] = [
    { label: "Project and client activity", title: "Coordinate project work", body: "Projects can support project task coordination, while CRM can support the client relationships and opportunities associated with the work.",
      apps: [["Projects", "Project task coordination"], ["CRM", "Client relationships and opportunities"]] },
    { label: "Commercial operations", title: "Support commercial processes", body: "Billing and Inventory can support the invoicing and stock-management processes covered by their available capabilities.",
      apps: [["Billing", "Invoicing processes"], ["Inventory", "Stock-management processes"]] },
    { label: "Service and people", title: "Organize service and people operations", body: "Desk can support applicable request-handling needs. ServiceOps can support relevant work order and maintenance processes, while HRMS and Skillberry address applicable people administration and learning requirements.",
      apps: [["ServiceOps", "Work orders and maintenance"], ["Desk", "Request handling"], ["HRMS", "People administration"], ["Skillberry", "Learning and development"]] },
  ];
  return (
    <section id="approach" style={{ background: LSAND + "55", padding: "96px 0", borderTop: `1px solid ${LSAND}` }}>
      <div className="cn-wrap">
        <div className="cn-split" data-rv="0" style={{ alignItems: "end" }}>
          <div><Eyebrow>How EVOQ products work together</Eyebrow><h2 style={h2}>Choose products around the work that matters.</h2></div>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.8, color: "#57534E", maxWidth: "54ch" }}>Different organizations need different combinations of products. Start with the activities that need better coordination, then identify the EVOQ products that fit those requirements.</p>
        </div>

        <div data-rv="1" style={{ marginTop: 52 }}>
          <div className="cn-root" aria-hidden="true">
            <span className="cn-pill">Your operation</span>
          </div>
          <div className="cn-g3 cn-tree" aria-hidden="true"><i /><i /><i /></div>
          <div className="cn-g3 cn-groups">
            {groups.map((g, i) => (
              <article key={g.label} className="cn-group" style={{ background: "#fff", border: `1px solid ${LSAND}`, borderTop: `4px solid ${[TERRA, CLAY, SAND][i]}`, borderRadius: 6, padding: "26px 26px 28px", display: "flex", flexDirection: "column" }}>
                <p style={{ margin: 0, fontSize: 11.5, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: TERRA }}>{g.label}</p>
                <h3 style={{ margin: "10px 0 0", fontWeight: 600, color: BROWN, letterSpacing: "-.015em" }}>{g.title}</h3>
                <p style={{ margin: "10px 0 0", fontSize: 14.5, lineHeight: 1.7, color: "#57534E" }}>{g.body}</p>
                <div style={{ paddingTop: 22 }}>
                  <div style={{ display: "grid", gap: 12, paddingTop: 18, borderTop: `1px solid ${LSAND}` }}>
                    {g.apps.map(([a, role]) => (
                      <div key={a} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={ICON[a]} alt="" width={32} height={32} style={{ flex: "none", width: 32, height: 32, objectFit: "contain", background: WARM, border: `1px solid ${LSAND}`, borderRadius: 8, padding: 3 }} />
                        <div><div style={{ fontSize: 14, fontWeight: 700, color: BROWN }}>{a}</div><div style={{ fontSize: 12.5, color: CONCRETE }}>{role}</div></div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div style={{ marginTop: 28, display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 20, flexWrap: "wrap" }}>
            <p style={{ margin: 0, fontSize: 16, fontWeight: 600, color: BROWN }}>The right combination depends on your operating model, current processes and required capabilities.</p>
            <p style={{ margin: 0, fontSize: 12, color: CONCRETE }}>An illustrative grouping of products, not a technical integration map.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 4. FAQ */
const FAQ: [string, string][] = [
  ["Which EVOQ products are relevant to my organization?", "The right combination depends on your industry, operating processes and priorities. Construction and engineering organizations may focus on project coordination and client relationships, while real estate organizations may prioritize enquiry management, sales follow-up or property service operations."],
  ["Can I start with the products most relevant to my needs?", "The recommended starting point depends on EVOQ's available plans, licensing and implementation arrangements. Discuss your requirements with an EVOQ expert to establish the appropriate scope."],
  ["Can EVOQ support both engineering consultancies and contractors?", "The relevant product combination can differ. Consultancies may prioritize client relationships and project coordination, while contractors may also need inventory or service-related capabilities. Specific requirements should be assessed against the functionality available in each product."],
  ["Which EVOQ products are relevant to real estate?", "Agencies and brokers may benefit from CRM and campaign capabilities, developers may need support for buyer relationships and applicable billing processes, and property operations teams may prioritize service requests and maintenance coordination. The appropriate combination depends on the required functionality."],
  ["Can EVOQ replace our existing industry-specific software?", "That depends on the capabilities your current software provides and the requirements EVOQ can meet. Specialist functions such as property leasing, construction estimating or engineering document control should be evaluated individually before considering a replacement."],
  ["How do we identify the right product combination?", "Start by identifying the processes that need improvement, the information that must be tracked and the outcomes you expect. An EVOQ expert can help assess those requirements against the relevant products and available capabilities."],
];
function Faq() {
  return (
    <section style={{ background: "#FFFDFB", padding: "96px 0" }}>
      <div className="cn-wrap" style={{ maxWidth: 940 }}>
        <div data-rv="0"><Eyebrow>FAQ</Eyebrow><h2 style={h2}>Questions about choosing the right solution</h2></div>
        <div data-rv="1" style={{ marginTop: 40, borderTop: `1px solid ${LSAND}` }}>
          {FAQ.map(([q, a]) => (
            <details key={q} className="cn-faq" style={{ borderBottom: `1px solid ${LSAND}` }}>
              <summary style={{ cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, padding: "22px 0", fontSize: 18, fontWeight: 600, color: BROWN }}>
                {q}<span aria-hidden="true" className="cn-plus" style={{ flex: "none", width: 28, height: 28, borderRadius: "50%", border: `1.5px solid ${TERRA}`, color: TERRA, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 18, lineHeight: 1 }}>+</span>
              </summary>
              <p style={{ margin: "0 0 24px", maxWidth: "72ch", fontSize: 15.5, lineHeight: 1.8, color: "#57534E" }}>{a}</p>
            </details>
          ))}
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
        <div className="cn-cta" data-rv="0" style={{ position: "relative", overflow: "hidden", background: LSAND, borderRadius: 6, borderLeft: `8px solid ${TERRA}`, display: "block" }}>
          <div style={{ position: "relative", padding: "56px 56px 60px", maxWidth: 700 }}>
            
            <h2 style={h2}>Start with the work that needs attention.</h2>
            <p style={{ margin: "18px 0 0", fontSize: 15.5, lineHeight: 1.75, color: "#44403C", maxWidth: "56ch" }}>Whether the priority is project coordination, client follow-ups or property service operations, identify the processes that need improvement and explore the EVOQ products that fit.</p>
            <div style={{ marginTop: 30 }}><Cta>Talk to an expert</Cta></div>
          </div>
          <div className="cn-cta-img" aria-hidden="true" style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "46%", pointerEvents: "none" }}>
            <span style={{ position: "absolute", right: -60, top: -50, width: 300, height: 190, borderRadius: "0 100% 0 100%", background: `linear-gradient(135deg, ${SAND}, rgba(214,184,140,0))`, filter: "blur(14px)", opacity: .8 }} />
            <span style={{ position: "absolute", right: 60, top: "14%", width: 330, height: 210, borderRadius: "0 100% 0 100%", transform: "rotate(-8deg)", background: `linear-gradient(135deg, ${SAND}, ${TERRA})`, opacity: .3, border: "2px solid rgba(255,255,255,.85)", boxShadow: "inset 0 0 40px rgba(255,255,255,.5)" }} />
            <span style={{ position: "absolute", right: -80, bottom: -90, width: 360, height: 230, borderRadius: "100% 0 100% 0", transform: "rotate(-8deg)", background: `linear-gradient(135deg, ${TERRA}, ${CLAY})`, opacity: .22, border: "2px solid rgba(255,255,255,.85)", boxShadow: "inset 0 0 40px rgba(255,255,255,.5)" }} />
            <span style={{ position: "absolute", right: 250, bottom: -110, width: 300, height: 190, borderRadius: "0 100% 0 100%", transform: "rotate(-8deg)", background: `linear-gradient(135deg, #fff, ${SAND})`, opacity: .45, border: "2px solid rgba(255,255,255,.85)" }} />
          </div>
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
        .cn-hero-vis{position:relative;height:460px}
        .cn-root{display:flex;justify-content:center}
        .cn-pill{background:#7C2D1F;color:#fff;font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;padding:9px 18px;border-radius:99px}
        .cn-tree{height:44px}
        .cn-tree i{position:relative;display:block}
        .cn-tree i::before{content:"";position:absolute;top:21px;height:2px;background:#A89B8C}
        .cn-tree i::after{content:"";position:absolute;left:calc(50% - 1px);width:2px;bottom:0;top:21px;background:#A89B8C}
        .cn-tree i:nth-child(1)::before{left:50%;right:-11px}
        .cn-tree i:nth-child(2)::before{left:-11px;right:-11px}
        .cn-tree i:nth-child(2)::after{top:0}
        .cn-tree i:nth-child(3)::before{left:-11px;right:50%}
        .cn-faq summary::-webkit-details-marker{display:none}
        .cn-faq[open] .cn-plus{background:#B4533C;color:#fff;transform:rotate(45deg)}
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
        @media (max-width:1100px){.cn-root,.cn-tree{display:none}.cn-g4{grid-template-columns:repeat(2,minmax(0,1fr))}.cn-g3{grid-template-columns:1fr}.cn-apps{grid-template-columns:repeat(4,minmax(0,1fr))}}
        @media (max-width:900px){.cn-hero,.cn-split{grid-template-columns:1fr;gap:34px}.cn-hero-vis{height:380px}.cn-cta{grid-template-columns:1fr!important}.cn-cta>div:first-child{padding:38px 28px 40px!important}.cn-cta-img{display:none}}
        @media (max-width:640px){.cn-apps{grid-template-columns:repeat(2,minmax(0,1fr))}.cn-g4{grid-template-columns:1fr}}
        @media (prefers-reduced-motion:reduce){.hs-rv,.cn-card,.cn-btn{transition:none}}
      `}</style>
      <div style={{ background: "#fff", position: "relative", zIndex: 60, borderBottom: `1px solid ${LCON}` }}>
        <Topbar darkCTA={false} light ctaColor={CLAY} />
      </div>
      <Hero />
      <ConstructionIndustries />
      <Together />
      <Faq />
      <FinalCta />
      <Footer background={CLAY} />
    </div>
  );
}
