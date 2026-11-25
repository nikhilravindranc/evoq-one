import type { CSSProperties } from "react";
import { Topbar } from "@/components/hero/Topbar";
import { HeroShell } from "@/components/shared/HeroShell";
import { Footer } from "@/components/sections/Footer";
import { EnquiryModal } from "@/components/manufacturing/EnquiryModal";
import { HsMotion } from "@/components/hospitality/HsMotion";
import { CnSolutions } from "./CnSolutions";
import { CnAround } from "./CnAround";

/* Construction & Real Estate: architectural, structural, grounded. Linework, grids and site photography. */
const TERRA = "#B4533C";
const CLAY = "#7C2D1F";
const SAND = "#D6B88C";
const LSAND = "#E8D8BF";
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
/* ------------------------------------------------------------------ 1. Hero */
function Hero() {
  return (
    <section style={{ position: "relative", overflow: "hidden" }}>
      <div className="cn-wrap">
        <nav aria-label="Breadcrumb" style={{ paddingTop: 22, fontSize: 12, color: CONCRETE }}>Home <span style={{ margin: "0 6px" }}>/</span> Solutions <span style={{ margin: "0 6px" }}>/</span> <b style={{ color: BROWN, fontWeight: 600 }}>Construction, Engineering &amp; Real Estate</b></nav>
        <div className="cn-hero">
          <div data-rv="0">
            <Eyebrow>Construction · Engineering · Real Estate</Eyebrow>
            <h1 style={{ margin: 0, letterSpacing: "-.03em", fontWeight: 600, color: CLAY }}>Enquiries followed up, projects coordinated, properties maintained.</h1>
            <p style={{ margin: "24px 0 0", fontSize: 17, lineHeight: 1.75, color: "#44403C", maxWidth: "50ch" }}>Follow a bid or a property enquiry through delivery, milestone billing and handover, then into service. For contractors, engineering firms, developers, agents and property managers.</p>
            <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Cta>Talk to an expert</Cta>
              <a href="#solutions" className="cn-btn" style={{ display: "inline-flex", alignItems: "center", padding: "15px 26px", borderRadius: 4, border: `1.5px solid ${TERRA}`, color: TERRA, textDecoration: "none", fontSize: 14.5, fontWeight: 600 }}>Explore the solutions</a>
            </div>
          </div>
          <div className="cn-hero-vis" data-rv="1" role="img" aria-label="A contemporary building under construction" style={{ ...photo(IMG.site), borderRadius: "6px 90px 6px 6px", boxShadow: "0 40px 80px -44px rgba(124,45,31,.7)" }} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 4. FAQ */
const FAQ: [string, string][] = [
  ["Which EVOQ products fit my business?", "Contractors and engineering firms usually start with Projects and CRM. Agencies start with CRM, Bookings and Campaigns. Developers add Billing and ConfigX. Property operations start with Desk and ServiceOps."],
  ["Can I start with the products most relevant to my needs?", "Yes. Plans and licensing set the starting scope, and an EVOQ expert will confirm it with you."],
  ["Can EVOQ support both engineering consultancies and contractors?", "Consultancies usually start with CRM and Projects. Contractors add Inventory and ServiceOps for materials and site service."],
  ["Can prospects and buyers book viewings and site visits?", "Yes. Bookings lets a prospect pick an open slot on a booking page, with reminders where you use them."],
  ["Can landlords and property managers offer rooms and amenities for booking?", "Yes. Bookings covers meeting rooms, halls and equipment, and courts, pools, halls and event venues, each with its own availability and rules."],
  ["Can EVOQ raise invoices at project milestones?", "Yes. Billing supports milestone invoices, with payments recorded against them."],
  ["Does an AI agent act on its own?", "No. The agents draft and flag, and a person sends, books or decides."],
  ["Can EVOQ replace our existing industry-specific software?", "It depends on what your current software does. Leasing, estimating and document control should be evaluated one by one."],
  ["How do we identify the right product combination?", "List the processes you want to improve, the records you need and the results you expect. An EVOQ expert can match them to products."],
];
function Faq() {
  return (
    <section style={{ background: "#FFFDFB", padding: "96px 0" }}>
      <div className="cn-wrap" style={{ maxWidth: 940 }}>
        <div data-rv="0"><Eyebrow>FAQ</Eyebrow><h2 style={h2}>Questions about EVOQ for construction, engineering and real estate.</h2></div>
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
            
            <h2 style={h2}>Start with how your enquiries, projects and site requests work today.</h2>
            <p style={{ margin: "18px 0 0", fontSize: 15.5, lineHeight: 1.75, color: "#44403C", maxWidth: "56ch" }}>Tell us whether project coordination, client follow-up or property service comes first, and we will show where EVOQ products fit.</p>
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
        .cn-wrap{max-width:1328px;margin:0 auto;padding:0 24px}
        .cn-hero{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:56px;align-items:center;padding:46px 0 72px}
        .cn-hero-vis{position:relative;height:460px}
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
        @media (max-width:1100px){.cn-g4{grid-template-columns:repeat(2,minmax(0,1fr))}.cn-g3{grid-template-columns:1fr}.cn-apps{grid-template-columns:repeat(4,minmax(0,1fr))}}
        @media (max-width:900px){.cn-hero,.cn-split{grid-template-columns:1fr;gap:34px}.cn-hero-vis{height:380px}.cn-cta{grid-template-columns:1fr!important}.cn-cta>div:first-child{padding:38px 28px 40px!important}.cn-cta-img{display:none}}
        @media (max-width:640px){.cn-apps{grid-template-columns:repeat(2,minmax(0,1fr))}.cn-g4{grid-template-columns:1fr}}
        @media (prefers-reduced-motion:reduce){.hs-rv,.cn-card,.cn-btn{transition:none}}
      `}</style>
      <HeroShell bg={{ background: WARM, ...grid(LCON + "88", 48) }} topbar={<Topbar darkCTA={false} light ctaColor={CLAY} />}>
        <Hero />
      </HeroShell>
      <CnSolutions />
      <CnAround />
      <Faq />
      <FinalCta />
      <Footer background={CLAY} />
    </div>
  );
}
