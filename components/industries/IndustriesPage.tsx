import type { CSSProperties } from "react";
import { Topbar } from "@/components/hero/Topbar";
import { Footer } from "@/components/sections/Footer";
import { EnquiryModal } from "@/components/manufacturing/EnquiryModal";
import { HsMotion } from "@/components/hospitality/HsMotion";

/* All Industries: a broad, editorial discovery page. Neutral warm-white canvas with sapphire accents. */
const SAPPHIRE = "#2563EB";
const DEEP = "#1E3A8A";
const BLUE = "#3B82F6";
const PALE = "#DBEAFE";
const SLATE = "#64748B";
const MIST = "#E2E8F0";
const WARM = "#FAFAF9";
const INK = "#1F2937";

const U = (id: string, w = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;
const photo = (src: string): CSSProperties => ({ backgroundImage: `url(${src})`, backgroundSize: "cover", backgroundPosition: "center" });
const I = (f: string) => `/billing/images/${f}`;
const ICON: Record<string, string> = {
  CRM: I("crm-menu-icn.png"), Projects: I("evoq-projects-menu-icn.png"), Billing: I("billing-menu-icn.png"), Desk: I("desk-menu-icn.png"),
  Inventory: I("inventory-menu-icn.png"), Campaigns: I("campaigns-menu-icn.png"), Skillberry: I("Skillberry-menu-icn.png"), ServiceOps: I("serviceops-icon.svg"),
};

const INDUSTRIES: { name: string; tag: string; body: string; apps: string[]; img: string }[] = [
  { name: "Professional services", tag: "Services", body: "Manage client relationships, coordinate project delivery, handle billing and keep client requests moving throughout each engagement.", apps: ["CRM", "Projects", "Billing", "Desk"], img: U("1542744173-8e7e53415bb0") },
  { name: "Wholesale and distribution", tag: "Trade", body: "Support account management, sales follow-up, inventory visibility, invoicing and customer service across wholesale and distribution operations.", apps: ["CRM", "Inventory", "Billing", "Desk"], img: U("1627915589334-14a3c3e3a741") },
  { name: "Education and training", tag: "Learning", body: "Manage prospective learner enquiries, course-related communications, training activities and learner support.", apps: ["CRM", "Campaigns", "Skillberry", "Desk", "Billing"], img: U("1758691737182-d42aefd6dee8") },
  { name: "Retail and e-commerce", tag: "Commerce", body: "Support customer relationships, promotional campaigns, inventory records, billing and customer service across retail operations.", apps: ["CRM", "Campaigns", "Inventory", "Billing", "Desk"], img: U("1776000680544-ebf0989a71df") },
  { name: "Logistics and transportation", tag: "Movement", body: "Manage customer relationships, coordinate project-related activities where applicable, handle billing and organize customer service requests.", apps: ["CRM", "Projects", "Billing", "Desk"], img: U("1678182451047-196f22a4143e") },
  { name: "Financial services", tag: "Finance", body: "Organize client relationships, manage follow-ups, coordinate communications and handle ongoing client service requests.", apps: ["CRM", "Campaigns", "Desk"], img: U("1714974528737-3e6c7e4d11af") },
  { name: "Automotive and equipment", tag: "Mobility", body: "Manage sales enquiries, maintain customer relationships, coordinate applicable service operations, track inventory and handle billing.", apps: ["CRM", "ServiceOps", "Inventory", "Billing", "Desk"], img: U("1727893119356-1702fe921cf9") },
  { name: "Energy and utilities", tag: "Utilities", body: "Support customer relationships, coordinate applicable service and project activities, track relevant inventory and manage billing processes.", apps: ["CRM", "ServiceOps", "Projects", "Inventory", "Billing", "Desk"], img: U("1611845061243-459aad2ab56b") },
];

const FEATURED: { name: string; tag: string; body: string; href: string; img: string }[] = [
  { name: "Healthcare", tag: "Healthcare", body: "Coordinate patient enquiries, practice operations and patient engagement with solutions tailored to healthcare providers.", href: "/solutions/healthcare", img: "/healthcare/stock/hc-cta-team.jpg" },
  { name: "Construction, Engineering & Real Estate", tag: "Built environment", body: "Support project delivery, engineering coordination, property enquiries and related operations with applications suited to the needs of the industry.", href: "/solutions/construction", img: U("1778074762022-c33cc42f79ae") },
  { name: "Manufacturing", tag: "Production", body: "Address operational needs across product configuration, order management, inventory and production-related processes with relevant EVOQ applications.", href: "/solutions/manufacturing", img: U("1717386255773-1e3037c81788") },
  { name: "Field Service, Facilities & Maintenance", tag: "Service", body: "Support service operations, work orders, asset maintenance and facility-related activities with relevant EVOQ applications.", href: "/solutions/field-service", img: U("1660330589827-da8ab7dd3c02") },
  { name: "Hospitality, Travel & F&B", tag: "Hospitality", body: "Address operational needs across hospitality and related service activities with relevant EVOQ applications.", href: "/solutions/hospitality", img: U("1730367019960-9906d9cbbf05") },
];

const ALL: { name: string; tag: string; body: string; img: string; href?: string }[] = [...FEATURED, ...INDUSTRIES];

function Eyebrow({ children }: { children: string }) {
  return <p style={{ margin: "0 0 16px", fontSize: 11.5, fontWeight: 600, letterSpacing: ".22em", textTransform: "uppercase", color: SAPPHIRE }}>{children}</p>;
}
const Arrow = ({ c = "currentColor" }: { c?: string }) => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>;

function Hero() {
  return (
    <section style={{ background: WARM, position: "relative", overflow: "hidden" }}>
      <div className="in-wrap">
        <nav aria-label="Breadcrumb" style={{ paddingTop: 22, fontSize: 12, color: SLATE }}><a href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</a> <span style={{ margin: "0 6px" }}>/</span> <a href="/solutions" style={{ color: "inherit", textDecoration: "none" }}>Solutions</a> <span style={{ margin: "0 6px" }}>/</span> <b style={{ color: INK, fontWeight: 600 }}>All Industries</b></nav>
        <div className="in-hero">
          <div data-rv="0">
            <Eyebrow>Solutions for your industry</Eyebrow>
            <h1 style={{ margin: 0, fontSize: 58, lineHeight: 1.06, letterSpacing: "-.03em", fontWeight: 600, color: DEEP }}>Applications that fit your industry&apos;s needs</h1>
            <p style={{ margin: "24px 0 0", fontSize: 17, lineHeight: 1.75, color: "#4B5563", maxWidth: "52ch" }}>Every industry has its own processes, priorities and operational challenges. EVOQ applications can work individually or together to support relevant parts of those operations, from customer relationships and project delivery to inventory, service and billing.</p>
            <p style={{ margin: "16px 0 0", fontSize: 15, lineHeight: 1.7, color: SLATE }}>Explore the industries below to see where EVOQ applications may fit.</p>
            <a href="#" data-enquiry="" className="in-btn" style={{ marginTop: 28, display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 24px", borderRadius: 10, background: SAPPHIRE, color: "#fff", textDecoration: "none", fontSize: 14.5, fontWeight: 600 }}>Talk to an expert <Arrow /></a>
          </div>
          <div className="in-mosaic" data-rv="1" aria-hidden="true">
            <div style={{ gridRow: "1 / 3", borderRadius: 20, ...photo(U("1517048676732-d65bc937f952", 900)) }} />
            <div style={{ borderRadius: 20, ...photo(U("1678182451047-196f22a4143e", 800)) }} />
            <div style={{ borderRadius: 20, ...photo(U("1611845061243-459aad2ab56b", 800)) }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Industries() {
  return (
    <section id="industries" style={{ background: "#fff", padding: "88px 0 96px", borderTop: `1px solid ${MIST}` }}>
      <div className="in-wrap">
        <div className="in-head" data-rv="0">
          <div><Eyebrow>Explore industries</Eyebrow><h2 style={{ margin: 0, fontSize: 40, lineHeight: 1.1, letterSpacing: "-.025em", fontWeight: 600, color: DEEP }}>Find where EVOQ fits your operation</h2></div>
          <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.7, color: SLATE, maxWidth: "46ch" }}>Every industry has its own processes, priorities and operational challenges.</p>
        </div>
        <div className="in-grid">
          {ALL.map((x, i) => {
            const body = (
              <>
                <div style={{ position: "relative", aspectRatio: "16 / 10", ...photo(x.img) }}>
                  <span style={{ position: "absolute", left: 14, top: 14, background: "rgba(255,255,255,.94)", color: DEEP, fontSize: 10.5, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", padding: "5px 11px", borderRadius: 99 }}>{String(i + 1).padStart(2, "0")} · {x.tag}</span>
                </div>
                <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <h3 style={{ margin: 0, fontWeight: 700, color: DEEP, letterSpacing: "-.01em" }}>{x.name}</h3>
                  <p style={{ margin: "10px 0 0", fontSize: 13.5, lineHeight: 1.7, color: "#4B5563", flex: 1 }}>{x.body}</p>
                  {x.href && <span style={{ marginTop: 16, display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: SAPPHIRE }}>Explore solutions <Arrow /></span>}
                </div>
              </>
            );
            const st: CSSProperties = { background: "#fff", border: `1px solid ${MIST}`, borderRadius: 18, overflow: "hidden", display: "flex", flexDirection: "column", textDecoration: "none", color: INK };
            return x.href
              ? <a key={x.name} href={x.href} data-rv={String(i % 4)} className="in-card" style={st}>{body}</a>
              : <article key={x.name} data-rv={String(i % 4)} className="in-card" style={st}>{body}</article>;
          })}
        </div>
      </div>
    </section>
  );
}

function Apps() {
  return (
    <section style={{ background: WARM, padding: "72px 0 0" }}>
      <div className="in-wrap">
        <div data-rv="0" className="in-apps" style={{ borderRadius: 22, background: PALE, padding: "40px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap", border: `1px solid ${PALE}` }}>
          <div style={{ maxWidth: 640 }}>
            <h2 style={{ margin: 0, fontSize: 32, lineHeight: 1.15, letterSpacing: "-.02em", fontWeight: 600, color: DEEP }}>Explore EVOQ applications</h2>
            <p style={{ margin: "12px 0 0", fontSize: 15.5, lineHeight: 1.7, color: "#374151" }}>Discover the individual EVOQ applications, understand their capabilities and identify which ones may fit your requirements.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {Object.keys(ICON).map((a) => (
                <span key={a} title={a} style={{ width: 42, height: 42, borderRadius: 11, background: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 18px -12px rgba(30,58,138,.5)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ICON[a]} alt={a} width={26} height={26} style={{ width: 26, height: 26, objectFit: "contain" }} />
                </span>
              ))}
            </div>
            <a href="/products" className="in-btn" style={{ display: "inline-flex", alignItems: "center", gap: 9, fontSize: 14.5, fontWeight: 700, color: SAPPHIRE, textDecoration: "none" }}>Explore all applications <Arrow /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section id="talk" style={{ background: WARM, padding: "28px 0 90px" }}>
      <div className="in-wrap">
        <div data-rv="0" style={{ position: "relative", overflow: "hidden", borderRadius: 26, background: `linear-gradient(120deg, ${DEEP}, ${SAPPHIRE})`, color: "#fff", padding: "64px 60px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 36, flexWrap: "wrap", boxShadow: "0 50px 90px -50px rgba(30,58,138,.8)" }} className="in-cta">
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px)", backgroundSize: "36px 36px", maskImage: "linear-gradient(90deg, #000, rgba(0,0,0,.2))", WebkitMaskImage: "linear-gradient(90deg, #000, rgba(0,0,0,.2))" }} />
          <div style={{ position: "relative", maxWidth: 700 }}>
            <h2 style={{ margin: 0, fontSize: 40, lineHeight: 1.1, letterSpacing: "-.025em", fontWeight: 600 }}>Discuss your industry requirements</h2>
            <p style={{ margin: "18px 0 0", fontSize: 15.5, lineHeight: 1.75, color: "#DBEAFE", maxWidth: "58ch" }}>Every operation has its own processes and system requirements. Discuss your needs with the EVOQ team to explore suitable application combinations and identify any configuration, integration or specialist capabilities required.</p>
          </div>
          <a href="#" data-enquiry="" className="in-btn" style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 10, padding: "15px 28px", borderRadius: 10, background: "#fff", color: DEEP, textDecoration: "none", fontSize: 14.5, fontWeight: 700 }}>Talk to an expert <Arrow /></a>
        </div>
      </div>
    </section>
  );
}

export function IndustriesPage() {
  return (
    <div className="hs-root" style={{ minHeight: "100vh", background: WARM, color: INK, fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
      <HsMotion />
      <EnquiryModal eyebrow="EVOQ Solutions" segments={["Professional services", "Wholesale and distribution", "Education and training", "Retail and e-commerce", "Logistics and transportation", "Financial services", "Automotive and equipment", "Energy and utilities", "Another industry"]} segmentLabel="Your industry" placeholder="Tell us about your processes and what you would like to support..." accent={DEEP} accentSoft={SAPPHIRE} />
      <style>{`
        .in-wrap{max-width:1240px;margin:0 auto;padding:0 24px}
        .in-hero{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:56px;align-items:center;padding:48px 0 84px}
        .in-mosaic{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:230px 230px;gap:14px}
        .in-head{display:flex;justify-content:space-between;align-items:flex-end;gap:32px;flex-wrap:wrap;margin-bottom:44px}
        .in-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px}
        .in-btn{transition:transform .2s ease,box-shadow .2s ease}
        .in-btn:hover{transform:translateY(-2px);box-shadow:0 16px 30px -16px rgba(30,58,138,.55)}
        .in-card{transition:transform .3s ease,box-shadow .3s ease,border-color .3s ease}
        .in-card:hover{transform:translateY(-5px);box-shadow:0 30px 56px -32px rgba(30,58,138,.5);border-color:${BLUE}}
        .in-link svg{transition:transform .2s ease}.in-link:hover svg{transform:translateX(4px)}
        .hs-rv{opacity:0;transform:translateY(26px);transition:opacity .8s cubic-bezier(.2,.7,.2,1),transform .8s cubic-bezier(.2,.7,.2,1);transition-delay:var(--hs-d,0ms)}
        .hs-rv.hs-in{opacity:1;transform:none}
        @media (max-width:1180px){.in-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
        @media (max-width:900px){.in-hero{grid-template-columns:1fr;gap:34px}.in-mosaic{grid-template-rows:170px 170px}.in-apps,.in-cta{padding:34px 28px!important}}
        @media (max-width:640px){.in-grid{grid-template-columns:1fr}.in-hero h1{font-size:40px!important}}
        @media (prefers-reduced-motion:reduce){.hs-rv,.in-card,.in-btn{transition:none}}
      `}</style>
      <div style={{ background: "#fff", position: "relative", zIndex: 60, borderBottom: `1px solid ${MIST}` }}>
        <Topbar darkCTA={false} light ctaColor={DEEP} />
      </div>
      <Hero />
      <Industries />
      <Apps />
      <FinalCta />
      <Footer background={DEEP} />
    </div>
  );
}
