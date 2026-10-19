import type { CSSProperties, ReactNode } from "react";
import { Topbar } from "@/components/hero/Topbar";
import { Footer } from "@/components/sections/Footer";
import { HsMotion } from "@/components/hospitality/HsMotion";
import { EnquiryModal } from "@/components/manufacturing/EnquiryModal";

/* Solutions overview: EVOQ blue / sapphire accents, layered backgrounds, matching the All Industries page. */
const SAPPHIRE = "#2563EB";
const DEEP = "#1E3A8A";
const NAVY = "#172554";
const PALE = "#DBEAFE";
const SLATE = "#64748B";
const MIST = "#E2E8F0";
const WARM = "#FAFAF9";
const INK = "#1F2937";

const U = (id: string, w = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;
const photo = (src: string): CSSProperties => ({ backgroundImage: `url(${src})`, backgroundSize: "cover", backgroundPosition: "center" });
const I = (f: string) => `/billing/images/${f}`;

const ICONS: Record<string, ReactNode> = {
  heart: <path d="M3 12h4l2-5 4 10 2-5h6M12 21C7 17 3 13.5 3 9.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 9 2.5c0 1.6-.6 3-1.6 4.4" />,
  building: <path d="M5 21V4h9v17M14 9h5v12M8 8h3M8 12h3M8 16h3M3 21h18" />,
  gear: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" /></>,
  wrench: <path d="M14.7 6.3a4 4 0 0 0-5 5L3 18l3 3 6.7-6.7a4 4 0 0 0 5-5l-2.4 2.4-2.6-.6-.6-2.6z" />,
  hotel: <path d="M3 20V8M3 14h18v6M21 14v-2a3 3 0 0 0-3-3h-7v5M7 12h.01" />,
  bank: <path d="M3 10 12 4l9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18" />,
  grid: <><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></>,
};
const Icon = ({ n, c = "currentColor", s = 22 }: { n: string; c?: string; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICONS[n]}</svg>
);

/* Each solution's own colours: fg = icon and link, deep = headings, tint = soft fills. */
const BRAND: Record<string, { fg: string; deep: string; tint: string }> = {
  "Healthcare": { fg: "#18B8D1", deep: "#0F766E", tint: "#E3F6F9" },
  "Construction, Engineering & Real Estate": { fg: "#B5532F", deep: "#7C2D1F", tint: "#F8ECDC" },
  "Manufacturing": { fg: "#1F2933", deep: "#1F2933", tint: "#E6EAEF" },
  "Field Service, Facilities & Maintenance": { fg: "#1F5FE0", deep: "#0F3D75", tint: "#E6EFFF" },
  "Hospitality, Travel & F&B": { fg: "#1F4D3A", deep: "#14532D", tint: "#F4ECD9" },
  "Financial Services": { fg: "#1B7F8C", deep: "#0B2D4F", tint: "#E7F3EE" },
  "All industries": { fg: "#2563EB", deep: "#1E3A8A", tint: "#E9EDF7" },
};

type Industry = { name: string; short: string; icon: string; body: string; link: string; href: string; img: string };
const INDUSTRIES: Industry[] = [
  { name: "Healthcare", short: "Healthcare", icon: "heart", body: "Coordinate patient enquiries, practice operations and patient engagement with solutions tailored to healthcare providers.", link: "Explore healthcare solutions", href: "/solutions/healthcare", img: "/healthcare/stock/hc-cta-team.jpg" },
  { name: "Construction, Engineering & Real Estate", short: "Construction", icon: "building", body: "Support project delivery, engineering coordination, property enquiries and related operations with products suited to the needs of the industry.", link: "Explore Construction, Engineering & Real Estate solutions", href: "/solutions/construction", img: U("1778074762022-c33cc42f79ae") },
  { name: "Manufacturing", short: "Manufacturing", icon: "gear", body: "Address operational needs across product configuration, order management, inventory and production-related processes with relevant EVOQ products.", link: "Explore manufacturing solutions", href: "/solutions/manufacturing", img: U("1717386255773-1e3037c81788") },
  { name: "Field Service, Facilities & Maintenance", short: "Field service", icon: "wrench", body: "Support service operations, work orders, asset maintenance and facility-related activities with relevant EVOQ products.", link: "Explore Field Service, Facilities & Maintenance solutions", href: "/solutions/field-service", img: U("1660330589827-da8ab7dd3c02") },
  { name: "Hospitality, Travel & F&B", short: "Hospitality", icon: "hotel", body: "Address operational needs across hospitality and related service activities with relevant EVOQ products.", link: "Explore Hospitality, Travel & F&B solutions", href: "/solutions/hospitality", img: U("1730367019960-9906d9cbbf05") },
  { name: "Financial Services", short: "Financial services", icon: "bank", body: "Organize client relationships, manage follow-ups, coordinate communications and handle ongoing client service requests.", link: "Explore financial services solutions", href: "/solutions/finance", img: U("1714974528737-3e6c7e4d11af") },
  { name: "All industries", short: "All industries", icon: "grid", body: "Don't see your industry? EVOQ products combine to fit how your organization works, so you can start with what you need.", link: "Explore all industries", href: "/industries", img: U("1542744173-8e7e53415bb0") },
];

/* Existing routes are /solutions/healthcare/crm and /practice-management (not the /healthcare-crm paths in the brief).
   Patient Engagement has no page yet, so that card is not linked. */
const HEALTHCARE: { name: string; body: string; link?: string; href?: string }[] = [
  { name: "Healthcare CRM", body: "Organize patient enquiries, manage follow-ups and maintain visibility into patient relationships.", link: "Explore Healthcare CRM", href: "/solutions/healthcare/crm" },
  { name: "Healthcare Practice Management", body: "Coordinate appointments, patient visits and day-to-day practice activities.", link: "Explore Healthcare Practice Management", href: "/solutions/healthcare/practice-management" },
  { name: "Patient Engagement", body: "Support patient communication and engagement through relevant EVOQ products." },
];

const APPS: [string, string][] = [
  ["CRM", I("crm-menu-icn.png")], ["Campaigns", I("campaigns-menu-icn.png")], ["Projects", I("evoq-projects-menu-icn.png")], ["ServiceOps", I("serviceops-icon.svg")],
  ["Desk", I("desk-menu-icn.png")], ["Billing", I("billing-menu-icn.png")], ["Inventory", I("inventory-menu-icn.png")], ["HRMS", I("hrms-menu-icn-new.png")],
];

function Eyebrow({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <p style={{ margin: "0 0 16px", display: "flex", alignItems: "center", gap: 12, fontSize: 11.5, fontWeight: 600, letterSpacing: ".22em", textTransform: "uppercase", color: light ? PALE : SAPPHIRE }}>
      <span aria-hidden="true" style={{ width: 28, height: 2, borderRadius: 2, background: light ? PALE : SAPPHIRE }} />{children}
    </p>
  );
}
const Arrow = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;

function Btn({ href, children, ghost = false, onDark = false, enquiry = false }: { href: string; children: string; ghost?: boolean; onDark?: boolean; enquiry?: boolean }) {
  const solid = !ghost;
  return (
    <a href={href} {...(enquiry ? { "data-enquiry": "" } : {})} className="sl-btn" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 24px", borderRadius: 99, fontSize: 14.5, fontWeight: 600, textDecoration: "none", background: solid ? (onDark ? "#fff" : SAPPHIRE) : "transparent", color: solid ? (onDark ? DEEP : "#fff") : DEEP, border: solid ? "1px solid transparent" : `1.5px solid ${DEEP}`, boxShadow: solid && !onDark ? "0 14px 28px -16px rgba(37,99,235,.9)" : "none" }}>
      {children}<Arrow />
    </a>
  );
}

const dots = "radial-gradient(rgba(30,58,138,.16) 1.2px, transparent 1.4px)";
const gridLines = "linear-gradient(rgba(30,58,138,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(30,58,138,.06) 1px, transparent 1px)";

function Hero() {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: `radial-gradient(900px 520px at 88% 8%, #BFDBFE 0%, rgba(191,219,254,0) 60%), radial-gradient(700px 480px at -5% 90%, #E0E7FF 0%, rgba(224,231,255,0) 60%), ${WARM}` }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: dots, backgroundSize: "26px 26px", WebkitMaskImage: "linear-gradient(90deg, #000 0%, transparent 55%)", maskImage: "linear-gradient(90deg, #000 0%, transparent 55%)" }} />
      <span aria-hidden="true" style={{ position: "absolute", right: -140, top: -160, width: 520, height: 520, borderRadius: "50%", border: "1.5px solid rgba(37,99,235,.18)" }} />
      <span aria-hidden="true" style={{ position: "absolute", right: 40, top: 60, width: 300, height: 300, borderRadius: "50%", border: "1.5px dashed rgba(37,99,235,.22)" }} />
      <div className="sl-wrap" style={{ position: "relative" }}>
        <nav aria-label="Breadcrumb" style={{ paddingTop: 22, fontSize: 12, color: SLATE }}><a href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</a> <span style={{ margin: "0 6px" }}>/</span> <b style={{ color: INK, fontWeight: 600 }}>Solutions</b></nav>
        <div className="sl-hero">
          <div data-rv="0">
            <Eyebrow>Solutions</Eyebrow>
            <h1 style={{ margin: 0, letterSpacing: "-.03em", fontWeight: 600, color: DEEP }}>Solutions for the way your industry operates</h1>
            <p style={{ margin: "22px 0 0", fontSize: 17, lineHeight: 1.75, color: "#4B5563", maxWidth: "52ch" }}>Every industry has its own processes, priorities and operational challenges. EVOQ brings together products that address these needs, helping organizations manage industry-specific activities with greater visibility and coordination.</p>
            <div style={{ marginTop: 32, display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Btn href="#" enquiry>Talk to an expert</Btn>
            </div>
            <ul aria-label="Industries" style={{ listStyle: "none", margin: "34px 0 0", padding: 0, display: "flex", flexWrap: "wrap", gap: 8 }}>
              {INDUSTRIES.map((x) => (
                <li key={x.name} style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(255,255,255,.8)", border: `1px solid ${MIST}`, borderRadius: 99, padding: "6px 13px 6px 9px", fontSize: 12.5, fontWeight: 600, color: DEEP }}>
                  <Icon n={x.icon} c={SAPPHIRE} s={15} />{x.short}
                </li>
              ))}
            </ul>
          </div>
          <div data-rv="1" className="sl-mosaic" aria-hidden="true">
            {INDUSTRIES.slice(0, 5).map((x, i) => (
              <span key={x.name} className={`sl-tile sl-t${i}`} style={photo(x.img)}>
                <i className="sl-tag"><Icon n={x.icon} c={SAPPHIRE} s={14} />{x.short}</i>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ByIndustry() {
  return (
    <section id="industries" style={{ position: "relative", background: "#fff", padding: "92px 0 96px", borderTop: `1px solid ${MIST}` }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: gridLines, backgroundSize: "56px 56px", WebkitMaskImage: "linear-gradient(180deg, #000, transparent 70%)", maskImage: "linear-gradient(180deg, #000, transparent 70%)" }} />
      <div className="sl-wrap" style={{ position: "relative" }}>
        <div data-rv="0" style={{ maxWidth: 760 }}>
          <Eyebrow>Solutions by industry</Eyebrow>
          <h2 style={{ margin: 0, letterSpacing: "-.025em", fontWeight: 600, color: DEEP }}>Find solutions for your industry</h2>
          <p style={{ margin: "16px 0 0", fontSize: 16, lineHeight: 1.7, color: "#4B5563" }}>Explore how EVOQ products address the specific needs of different industries.</p>
        </div>
        <div className="sl-grid" style={{ marginTop: 48 }}>
          {INDUSTRIES.map((x, i) => {
            const bc = BRAND[x.name] ?? { fg: SAPPHIRE, deep: DEEP, tint: PALE };
            return (
            <a key={x.name} href={x.href} data-rv={String(i % 3)} className={`sl-card sl-c${i}`} style={{ ["--ic" as string]: bc.fg, ["--it" as string]: bc.tint, display: "flex", flexDirection: "column", background: "#fff", border: `1px solid ${MIST}`, borderTop: `3px solid ${bc.fg}`, borderRadius: 20, overflow: "hidden", textDecoration: "none", color: INK, boxShadow: "0 18px 40px -34px rgba(30,58,138,.5)" } as CSSProperties}>
              <span aria-hidden="true" className="sl-cimg" style={{ position: "relative", display: "block", height: 200, ...photo(x.img) }}>
                <span style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, rgba(0,0,0,0) 45%, ${bc.deep}99)` }} />
                <span style={{ position: "absolute", left: 16, top: 16, fontSize: 11, fontWeight: 700, letterSpacing: ".14em", color: "#fff", background: `${bc.deep}b3`, borderRadius: 99, padding: "5px 11px", backdropFilter: "blur(4px)" }}>{String(i + 1).padStart(2, "0")}</span>
              </span>
              <span style={{ position: "relative", display: "flex", flexDirection: "column", flex: 1, padding: "34px 26px 26px" }}>
                <span aria-hidden="true" style={{ position: "absolute", left: 22, top: -24, width: 48, height: 48, borderRadius: 14, background: bc.fg, color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: `0 12px 24px -10px ${bc.fg}, 0 0 0 5px #fff` }}><Icon n={x.icon} /></span>
                <h3 style={{ margin: 0, fontWeight: 600, letterSpacing: "-.015em", color: bc.deep }}>{x.name}</h3>
                <span style={{ margin: "10px 0 0", fontSize: 14.5, lineHeight: 1.7, color: "#4B5563", flex: 1 }}>{x.body}</span>
                <span style={{ marginTop: 18, paddingTop: 16, borderTop: `1px solid ${MIST}`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, fontSize: 14, fontWeight: 600, color: bc.deep }}>{x.link} <span className="sl-go" style={{ flex: "none", width: 30, height: 30, borderRadius: "50%", background: bc.tint, color: bc.deep, display: "inline-flex", alignItems: "center", justifyContent: "center" }}><Arrow /></span></span>
              </span>
            </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Healthcare() {
  return (
    <section id="healthcare" style={{ position: "relative", overflow: "hidden", background: "linear-gradient(180deg, #EFF6FF 0%, #E0F2FE 100%)", padding: "92px 0 100px" }}>
      <span aria-hidden="true" style={{ position: "absolute", left: -120, bottom: -140, width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,.14), rgba(37,99,235,0) 70%)" }} />
      <span aria-hidden="true" style={{ position: "absolute", right: -90, top: -80, width: 340, height: 340, borderRadius: "50%", border: "1.5px solid rgba(37,99,235,.16)" }} />
      <div className="sl-wrap" style={{ position: "relative" }}>
        <div data-rv="0" style={{ maxWidth: 780 }}>
          <Eyebrow>Featured solutions</Eyebrow>
          <h2 style={{ margin: 0, letterSpacing: "-.025em", fontWeight: 600, color: DEEP }}>Explore healthcare solutions</h2>
          <p style={{ margin: "16px 0 0", fontSize: 16, lineHeight: 1.7, color: "#4B5563" }}>From the first patient enquiry to practice operations and ongoing engagement, EVOQ offers dedicated solutions for key parts of the healthcare journey.</p>
        </div>
        <div className="sl-journey" style={{ position: "relative", marginTop: 56 }}>
          <span aria-hidden="true" className="sl-jline" style={{ position: "absolute", left: "16.6%", right: "16.6%", top: 22, borderTop: `2px dashed ${SAPPHIRE}`, opacity: 0.35 }} />
          <div className="sl-g3">
            {HEALTHCARE.map((h, i) => {
              const inner = (
                <>
                  <span aria-hidden="true" className="sl-node" style={{ position: "absolute", left: 26, top: -22, width: 44, height: 44, borderRadius: "50%", background: SAPPHIRE, color: "#fff", fontSize: 14, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 6px #E8F1FE, 0 12px 22px -10px rgba(37,99,235,.9)" }}>{String(i + 1).padStart(2, "0")}</span>
                  <h3 style={{ margin: "14px 0 0", fontWeight: 600, letterSpacing: "-.015em", color: DEEP }}>{h.name}</h3>
                  <span style={{ margin: "10px 0 0", fontSize: 14.5, lineHeight: 1.7, color: "#4B5563", flex: 1 }}>{h.body}</span>
                  {h.link && <span style={{ marginTop: 20, display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: SAPPHIRE }}>{h.link} <Arrow /></span>}
                </>
              );
              const st: CSSProperties = { position: "relative", display: "flex", flexDirection: "column", background: "#fff", border: `1px solid ${MIST}`, borderRadius: 20, padding: "38px 28px 28px", textDecoration: "none", color: INK, boxShadow: "0 24px 50px -36px rgba(30,58,138,.6)" };
              return h.href
                ? <a key={h.name} href={h.href} data-rv={String(i)} className="sl-card" style={st}>{inner}</a>
                : <div key={h.name} data-rv={String(i)} style={st}>{inner}</div>;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Products() {
  return (
    <section id="products" style={{ position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${NAVY} 0%, ${DEEP} 55%, #2347B5 100%)`, color: "#fff", padding: "96px 0 100px" }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)", backgroundSize: "48px 48px", WebkitMaskImage: "linear-gradient(90deg, rgba(0,0,0,.2), #000)", maskImage: "linear-gradient(90deg, rgba(0,0,0,.2), #000)" }} />
      <span aria-hidden="true" style={{ position: "absolute", right: -120, bottom: -160, width: 520, height: 520, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,.16)" }} />
      <span aria-hidden="true" style={{ position: "absolute", left: -80, top: -120, width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(96,165,250,.28), rgba(96,165,250,0) 70%)" }} />
      <div className="sl-wrap sl-split" style={{ position: "relative" }}>
        <div data-rv="0">
          <Eyebrow light>Our products</Eyebrow>
          <h2 style={{ margin: 0, letterSpacing: "-.025em", fontWeight: 600, color: "#fff" }}>Products that address specific operational needs</h2>
          <p style={{ margin: "18px 0 0", fontSize: 16, lineHeight: 1.75, color: "#DBEAFE", maxWidth: "56ch" }}>EVOQ products serve different operational purposes, from managing customer relationships and projects to handling service operations, billing and inventory. The right combination depends on your industry&apos;s requirements.</p>
          <div style={{ marginTop: 30 }}><Btn href="/products" onDark>Explore all products</Btn></div>
        </div>
        <ul data-rv="1" aria-label="EVOQ products" className="sl-apps" style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {APPS.map(([n, src], i) => (
            <li key={n} className="sl-prod" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.22)", borderRadius: 18, padding: "20px 10px 16px", backdropFilter: "blur(6px)", transform: i % 2 ? "translateY(14px)" : "none" }}>
              <span style={{ width: 54, height: 54, borderRadius: 14, background: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "0 12px 24px -12px rgba(0,0,0,.5)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" width={36} height={36} style={{ width: 36, height: 36, objectFit: "contain" }} />
              </span>
              <span style={{ fontSize: 13.5, fontWeight: 600, color: "#fff" }}>{n}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section style={{ position: "relative", background: "#fff", padding: "92px 0 96px" }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: dots, backgroundSize: "28px 28px", WebkitMaskImage: "radial-gradient(60% 80% at 50% 50%, #000, transparent)", maskImage: "radial-gradient(60% 80% at 50% 50%, #000, transparent)" }} />
      <div className="sl-wrap" style={{ position: "relative" }}>
        <div data-rv="0" className="sl-close" style={{ position: "relative", overflow: "hidden", borderRadius: 26, background: `linear-gradient(120deg, #EFF6FF, ${PALE})`, border: `1px solid #BFDBFE`, padding: "64px 56px", textAlign: "center" }}>
          <span aria-hidden="true" style={{ position: "absolute", left: -90, top: -90, width: 300, height: 300, borderRadius: "50%", border: "1.5px solid rgba(37,99,235,.2)" }} />
          <span aria-hidden="true" style={{ position: "absolute", right: -70, bottom: -110, width: 340, height: 340, borderRadius: "50%", border: "1.5px solid rgba(37,99,235,.2)" }} />
          <div style={{ position: "relative", maxWidth: 900, margin: "0 auto" }}>
            <p style={{ margin: "0 0 16px", fontSize: 11.5, fontWeight: 600, letterSpacing: ".22em", textTransform: "uppercase", color: SAPPHIRE }}>All industries</p>
            <h2 className="sl-oneline" style={{ margin: 0, letterSpacing: "-.025em", fontWeight: 600, color: DEEP }}>Find the right solution for your industry</h2>
            <p className="sl-oneline" style={{ margin: "16px 0 28px", fontSize: 16, lineHeight: 1.75, color: "#374151" }}>Explore the industries EVOQ serves and discover the solutions relevant to your organization&apos;s needs.</p>
            <Btn href="#" enquiry>Talk to an expert</Btn>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SolutionsPage() {
  return (
    <div className="hs-root" style={{ minHeight: "100vh", background: "#fff", color: INK, fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
      <HsMotion />
      <EnquiryModal eyebrow="EVOQ Solutions" segments={["Healthcare", "Manufacturing", "Construction, Engineering & Real Estate", "Field Service, Facilities & Maintenance", "Hospitality, Travel & F&B", "Financial Services", "Another industry"]} segmentLabel="Your industry" placeholder="Tell us about your processes and what you would like to support..." accent={DEEP} accentSoft={SAPPHIRE} />
      <style>{`
        .sl-wrap{max-width:1240px;margin:0 auto;padding:0 24px}
        .sl-hero{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:56px;align-items:center;padding:46px 0 84px}
        .sl-mosaic{display:grid;grid-template-columns:repeat(6,1fr);grid-template-rows:repeat(2,160px);gap:12px}
        .sl-tile{position:relative;border-radius:16px;box-shadow:0 22px 44px -26px rgba(30,58,138,.55);border:3px solid #fff}
        .sl-t0{grid-column:span 3;grid-row:span 2;border-radius:22px 22px 22px 84px}
        .sl-t1{grid-column:span 3}.sl-t2,.sl-t3,.sl-t4{grid-column:span 1}
        .sl-tag{position:absolute;left:8px;bottom:8px;display:inline-flex;align-items:center;gap:5px;background:rgba(255,255,255,.94);color:${DEEP};font-style:normal;font-size:11px;font-weight:700;padding:4px 9px 4px 7px;border-radius:99px}
        .sl-t2 .sl-tag,.sl-t3 .sl-tag,.sl-t4 .sl-tag{display:none}
        .sl-grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:36px 20px}
        .sl-c0,.sl-c1,.sl-c2,.sl-c3{grid-column:span 3}.sl-c4,.sl-c5,.sl-c6{grid-column:span 4}
        .sl-oneline{white-space:nowrap}
        .sl-g3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:34px 22px}
        .sl-split{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:56px;align-items:center}
        .sl-apps{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;padding-bottom:14px!important}
        .sl-card{transition:transform .25s ease,box-shadow .25s ease,border-color .25s ease}
        .sl-card:hover,.sl-card:focus-visible{transform:translateY(-5px);box-shadow:0 30px 56px -32px rgba(30,58,138,.6)}
        .sl-card:hover .sl-go{background:var(--ic,${SAPPHIRE})!important;color:#fff!important}
        .sl-go{transition:background .2s ease,color .2s ease}
        .sl-prod{transition:background .2s ease}
        .sl-prod:hover{background:rgba(255,255,255,.18)}
        .sl-btn,.sl-link{transition:transform .2s ease,box-shadow .2s ease}
        .sl-btn:hover{transform:translateY(-2px)}
        .sl-btn:focus-visible,.sl-link:focus-visible,.sl-card:focus-visible{outline:3px solid #93C5FD;outline-offset:3px}
        .hs-rv{opacity:0;transform:translateY(26px);transition:opacity .8s cubic-bezier(.2,.7,.2,1),transform .8s cubic-bezier(.2,.7,.2,1);transition-delay:var(--hs-d,0ms)}
        .hs-rv.hs-in{opacity:1;transform:none}
        @media (max-width:1100px){.sl-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.sl-c0,.sl-c1,.sl-c2,.sl-c3,.sl-c4,.sl-c5{grid-column:span 1}.sl-c6{grid-column:span 2}}
        @media (max-width:1000px){.sl-hero,.sl-split{grid-template-columns:1fr;gap:36px}.sl-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.sl-oneline{white-space:normal}.sl-g3{grid-template-columns:1fr}.sl-jline{display:none}}
        @media (max-width:640px){.sl-grid{grid-template-columns:1fr}.sl-c6{grid-column:span 1}.sl-apps{grid-template-columns:repeat(2,minmax(0,1fr))}.sl-mosaic{grid-template-rows:repeat(2,110px)}.sl-close{padding:40px 24px!important}}
        @media (prefers-reduced-motion:reduce){.hs-rv,.sl-card,.sl-btn{transition:none}}
      `}</style>
      <Topbar darkCTA={false} light ctaColor={DEEP} />
      <Hero />
      <ByIndustry />
      <Healthcare />
      <Products />
      <Closing />
      <Footer background={NAVY} />
    </div>
  );
}
