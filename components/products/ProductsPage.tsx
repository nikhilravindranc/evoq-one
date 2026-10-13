import type { CSSProperties } from "react";
import { Topbar } from "@/components/hero/Topbar";
import { Footer } from "@/components/sections/Footer";
import { EnquiryModal } from "@/components/manufacturing/EnquiryModal";
import { HsMotion } from "@/components/hospitality/HsMotion";

/* EVOQ applications: the landing page for the Products menu. Uses the main EVOQ brand (indigo / soft lavender). */
const P = "#4747E0";
const DEEP = "#1A1190";
const SOFT = "#F2F2FF";
const LINE = "#E6EAF0";
const INK = "#1F2430";
const BODY = "#5F6B7A";

const I = (f: string) => `/billing/images/${f}`;
type App = { name: string; icon: string; line: string; href?: string };
type Cat = { title: string; line: string; apps: App[] };

const CATEGORIES: Cat[] = [
  {
    title: "Growth",
    line: "Win customers and keep the relationship moving.",
    apps: [
      { name: "CRM", icon: I("crm-menu-icn.png"), line: "Manage customer accounts, enquiries, opportunities and follow-ups throughout the sales process." },
      { name: "Campaigns", icon: I("campaigns-menu-icn.png"), line: "Plan and launch marketing campaigns to reach prospective customers and support demand generation." },
      { name: "ConfigX", icon: I("ConfigX-menu-icn.png"), line: "Configure products, visualize options, calculate pricing and prepare customer quotes." },
    ],
  },
  {
    title: "Operations",
    line: "Deliver the work and support the customer after the sale.",
    apps: [
      { name: "ServiceOps", icon: I("serviceops-icon.svg"), line: "Manage work orders, technician dispatch, maintenance activities and service visits." },
      { name: "Projects", icon: I("evoq-projects-menu-icn.png"), line: "Plan and coordinate project tasks, responsibilities and delivery-related work." },
      { name: "Desk", icon: I("desk-menu-icn.png"), line: "Track customer enquiries, product questions and service issues through resolution." },
    ],
  },
  {
    title: "People",
    line: "Look after the team behind the work.",
    apps: [
      { name: "HRMS", icon: I("hrms-menu-icn-new.png"), line: "Manage employee information and workforce administration." },
      { name: "Skillberry", icon: I("Skillberry-menu-icn.png"), line: "Support employee learning, training and skills development." },
    ],
  },
  {
    title: "Finance",
    line: "Keep revenue and stock records in view.",
    apps: [
      { name: "Billing", icon: I("billing-menu-icn.png"), line: "Manage invoicing, payments and revenue-related activity.", href: "/products/billing" },
      { name: "Inventory", icon: I("inventory-menu-icn.png"), line: "Track stock and supply information relevant to product availability and fulfillment." },
    ],
  },
  {
    title: "Platform",
    line: "Connect applications and existing systems.",
    apps: [{ name: "Sync", icon: I("sync-menu-icn.png"), line: "Synchronize data between EVOQ applications and existing systems through supported integrations." }],
  },
];

const RING: { name: string; icon: string }[] = [
  { name: "CRM", icon: I("crm-menu-icn.png") }, { name: "Campaigns", icon: I("campaigns-menu-icn.png") }, { name: "ConfigX", icon: I("ConfigX-menu-icn.png") },
  { name: "ServiceOps", icon: I("serviceops-icon.svg") }, { name: "Projects", icon: I("evoq-projects-menu-icn.png") }, { name: "Desk", icon: I("desk-menu-icn.png") },
  { name: "AI", icon: "/ai/ai-logo-icon.png" }, { name: "HRMS", icon: I("hrms-menu-icn-new.png") }, { name: "Skillberry", icon: I("Skillberry-menu-icn.png") },
  { name: "Billing", icon: I("billing-menu-icn.png") }, { name: "Inventory", icon: I("inventory-menu-icn.png") }, { name: "Sync", icon: I("sync-menu-icn.png") },
];

const Arrow = ({ s = 15 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>;
function Eyebrow({ children, light = false }: { children: string; light?: boolean }) {
  return <p style={{ margin: "0 0 14px", fontSize: 12, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: light ? "#C9C6FF" : P }}>{children}</p>;
}
const h2: CSSProperties = { margin: 0, fontSize: 40, lineHeight: 1.12, letterSpacing: "-.025em", fontWeight: 700, color: INK, fontFamily: "var(--font-display), system-ui, sans-serif" };

/* ------------------------------------------------------------------ 1. Hero */
function Hero() {
  const R = 205;
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "linear-gradient(180deg, #F6F5FF 0%, #FFFFFF 100%)" }}>
      <div aria-hidden="true" style={{ position: "absolute", right: "-6%", top: "-20%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(71,71,224,.16), rgba(71,71,224,0))" }} />
      <div className="pd-wrap">
        <div className="pd-hero">
          <div data-rv="0">
            <Eyebrow>EVOQ applications</Eyebrow>
            <h1 style={{ margin: 0, fontSize: 58, lineHeight: 1.05, letterSpacing: "-.03em", fontWeight: 700, color: DEEP, fontFamily: "var(--font-display), system-ui, sans-serif" }}>One suite. Every application your work runs on.</h1>
            <p style={{ margin: "24px 0 0", fontSize: 17.5, lineHeight: 1.75, color: BODY, maxWidth: "50ch" }}>EVOQ brings customer relationships, operations, people, finance and AI together as applications that work on their own or connect as one. Start with the one you need and add the rest as you grow.</p>
            <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="#apps" className="pd-btn" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "15px 26px", borderRadius: 12, background: P, color: "#fff", textDecoration: "none", fontSize: 15, fontWeight: 700, boxShadow: "0 18px 34px -18px rgba(71,71,224,.8)" }}>Explore the applications <Arrow /></a>
              <a href="#" data-enquiry="" className="pd-btn" style={{ display: "inline-flex", alignItems: "center", padding: "15px 26px", borderRadius: 12, background: "#fff", color: DEEP, border: `1px solid ${LINE}`, textDecoration: "none", fontSize: 15, fontWeight: 700 }}>Talk to an expert</a>
            </div>
            <div style={{ marginTop: 34, display: "flex", gap: 26, flexWrap: "wrap", fontSize: 13, color: BODY }}>
              {["12 applications", "Use one or connect them all", "AI across the suite"].map((t) => <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><i style={{ width: 7, height: 7, borderRadius: "50%", background: P, display: "inline-block" }} />{t}</span>)}
            </div>
          </div>
          <div className="pd-orbit" data-rv="1" aria-hidden="true">
            <div style={{ position: "relative", width: 560, height: 560, margin: "0 auto" }} className="pd-orbit-in">
              <div className="pd-ring" style={{ position: "absolute", left: 280 - R, top: 280 - R, width: R * 2, height: R * 2, borderRadius: "50%", border: `1.5px dashed ${P}55` }} />
              <div style={{ position: "absolute", left: 280 - R + 52, top: 280 - R + 52, width: (R - 52) * 2, height: (R - 52) * 2, borderRadius: "50%", border: `1px solid ${P}22` }} />
              <div style={{ position: "absolute", left: 200, top: 200, width: 160, height: 160, borderRadius: "50%", background: "#fff", boxShadow: "0 30px 60px -28px rgba(71,71,224,.55), 0 0 0 10px #F2F2FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/billing/images/logo-evoq-1.png" alt="" width={110} style={{ width: 110, height: "auto" }} />
              </div>
              {RING.map((a, i) => {
                const ang = (i / RING.length) * Math.PI * 2 - Math.PI / 2;
                const x = 280 + Math.cos(ang) * R, y = 280 + Math.sin(ang) * R;
                return (
                  <div key={a.name} className="pd-node" style={{ position: "absolute", left: x - 38, top: y - 38, width: 76, height: 76, animationDelay: `${i * 0.35}s` }}>
                    <div style={{ width: 76, height: 76, borderRadius: 20, background: "#fff", boxShadow: "0 18px 36px -18px rgba(26,17,144,.5)", border: `1px solid ${LINE}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={a.icon} alt="" width={44} height={44} style={{ width: 44, height: 44, objectFit: "contain", borderRadius: 10 }} />
                    </div>
                    <span style={{ position: "absolute", left: "50%", top: 82, transform: "translateX(-50%)", fontSize: 11.5, fontWeight: 700, color: INK, whiteSpace: "nowrap" }}>{a.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 2. Applications by category */
function Apps() {
  return (
    <section id="apps" style={{ background: "#fff", padding: "92px 0 96px", borderTop: `1px solid ${LINE}` }}>
      <div className="pd-wrap">
        <div style={{ textAlign: "center", maxWidth: 740, margin: "0 auto 56px" }} data-rv="0">
          <Eyebrow>The applications</Eyebrow>
          <h2 style={h2}>Find the application for the work in front of you</h2>
          <p style={{ margin: "18px auto 0", fontSize: 16.5, lineHeight: 1.75, color: BODY }}>Browse by what you need to get done. Each application works on its own, and they share data when you connect them.</p>
        </div>
        {CATEGORIES.map((c, ci) => (
          <div key={c.title} className="pd-row" data-rv="0" style={{ borderTop: ci ? `1px solid ${LINE}` : 0 }}>
            <div>
              <h3 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: DEEP, letterSpacing: "-.015em", fontFamily: "var(--font-display), system-ui, sans-serif" }}>{c.title}</h3>
              <p style={{ margin: "10px 0 0", fontSize: 14.5, lineHeight: 1.65, color: BODY }}>{c.line}</p>
            </div>
            <div className="pd-apps">
              {c.apps.map((a) => (
                <article key={a.name} className="pd-card" style={{ background: "#fff", border: `1px solid ${LINE}`, borderRadius: 18, padding: 22, display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={a.icon} alt="" width={48} height={48} style={{ width: 48, height: 48, objectFit: "contain", borderRadius: 12 }} />
                    <h4 style={{ margin: 0, fontSize: 19, fontWeight: 700, color: INK }}>{a.name}</h4>
                  </div>
                  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: BODY, flex: 1 }}>{a.line}</p>
                  {a.href ? (
                    <a href={a.href} className="pd-link" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, fontWeight: 700, color: P, textDecoration: "none" }}>Explore {a.name} <Arrow s={14} /></a>
                  ) : (
                    <a href="#" data-enquiry="" className="pd-link" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, fontWeight: 700, color: P, textDecoration: "none" }}>Ask about {a.name} <Arrow s={14} /></a>
                  )}
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 3. AI */
function AiSection() {
  const modes: [string, string][] = [["Ask EVI", "Get answers and next steps across your applications."], ["Assign an agent", "Give defined, multi-step work to an AI agent."], ["Let agents run automatically", "Run tasks from schedules, events or conditions."]];
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #1A1190 0%, #3A1FDA 55%, #5A1FEA 100%)", color: "#fff", padding: "96px 0 100px" }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,.2) 1px, transparent 1px)", backgroundSize: "30px 30px", opacity: 0.35, maskImage: "linear-gradient(180deg, transparent, #000 30%, #000 70%, transparent)", WebkitMaskImage: "linear-gradient(180deg, transparent, #000 30%, #000 70%, transparent)" }} />
      <div aria-hidden="true" style={{ position: "absolute", right: "-8%", bottom: "-30%", width: 720, height: 560, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(184,77,255,.45), rgba(184,77,255,0))" }} />
      <div className="pd-wrap pd-ai" style={{ position: "relative" }}>
        <div data-rv="0">
          <Eyebrow light>EVOQ AI</Eyebrow>
          <h2 style={{ ...h2, color: "#fff", fontSize: 44 }}>AI that works across your applications</h2>
          <p style={{ margin: "20px 0 0", fontSize: 17, lineHeight: 1.75, color: "rgba(255,255,255,.86)", maxWidth: "50ch" }}>EVOQ AI brings AI into the applications, systems and processes where your work happens. Ask EVI for help, assign work to AI agents, or let AI work automatically.</p>
          <div style={{ marginTop: 28, display: "grid", gap: 12, maxWidth: 520 }}>
            {modes.map(([t, d], i) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 14, background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.18)" }}>
                <span style={{ width: 34, height: 34, borderRadius: 10, background: "#fff", color: P, fontWeight: 800, fontSize: 14, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</span>
                <span style={{ fontSize: 15, fontWeight: 700 }}>{t}<span style={{ display: "block", fontSize: 13, fontWeight: 400, color: "rgba(255,255,255,.75)", marginTop: 2 }}>{d}</span></span>
              </div>
            ))}
          </div>
          <a href="/products/ai" className="pd-btn" style={{ marginTop: 32, display: "inline-flex", alignItems: "center", gap: 10, padding: "15px 28px", borderRadius: 12, background: "#fff", color: DEEP, textDecoration: "none", fontSize: 15, fontWeight: 700 }}>Explore EVOQ AI <Arrow /></a>
        </div>
        <div className="pd-ai-vis" data-rv="1" aria-hidden="true">
          <div style={{ position: "relative", height: 440 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/evoq-ai/evi-hold.webp" alt="" width={1010} height={784} style={{ position: "absolute", left: 0, bottom: 0, width: "58%", height: "auto", filter: "drop-shadow(0 22px 34px rgba(10,8,60,.55))" }} />
            <div style={{ position: "absolute", right: 0, top: 10, maxWidth: "62%", background: "#5648F0", border: "1px solid rgba(255,255,255,.25)", borderRadius: "20px 20px 6px 20px", padding: "13px 18px", fontSize: 14, fontWeight: 600, boxShadow: "0 22px 40px -22px rgba(0,0,0,.6)" }}>Which opportunities need follow-up this week?</div>
            <div style={{ position: "absolute", right: 0, top: 96, maxWidth: "66%", background: "rgba(255,255,255,.14)", border: "1px solid rgba(255,255,255,.28)", backdropFilter: "blur(10px)", borderRadius: "6px 20px 20px 20px", padding: "13px 18px", fontSize: 14, lineHeight: 1.55 }}>I found 3 opportunities that need follow-up, including <b>Northgate Logistics</b> and <b>Beta Inc.</b> Here are the next actions.</div>
            <div style={{ position: "absolute", right: 0, top: 226, display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end", maxWidth: "68%" }}>
              {["Draft follow-up emails", "Schedule calls", "Review overdue invoices"].map((t) => <span key={t} style={{ background: "#fff", color: P, fontSize: 12.5, fontWeight: 700, padding: "7px 14px", borderRadius: 99 }}>{t}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 4. Start small */
function Grow() {
  const steps: [string, string, string][] = [
    ["01", "Start with one application", "Pick the application that solves your most pressing problem, such as CRM for sales or Billing for invoicing."],
    ["02", "Connect what you already use", "Use Sync to share data between EVOQ applications and your existing systems through supported integrations."],
    ["03", "Add more as you grow", "Bring in operations, people, finance and AI when you need them, with records that stay connected."],
  ];
  return (
    <section style={{ background: "#fff", padding: "96px 0 90px" }}>
      <div className="pd-wrap">
        <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 50px" }} data-rv="0">
          <Eyebrow>How it fits together</Eyebrow>
          <h2 style={h2}>Start small. Connect as you grow.</h2>
        </div>
        <div className="pd-g3">
          {steps.map(([n, t, d], i) => (
            <div key={n} data-rv={String(i)} className="pd-card" style={{ position: "relative", background: SOFT, borderRadius: 20, padding: "30px 28px 32px", border: "1px solid #E6E4FF" }}>
              <div style={{ fontSize: 40, fontWeight: 800, color: P, opacity: 0.25, letterSpacing: "-.03em" }}>{n}</div>
              <h3 style={{ margin: "6px 0 0", fontSize: 21, fontWeight: 700, color: DEEP }}>{t}</h3>
              <p style={{ margin: "12px 0 0", fontSize: 14.5, lineHeight: 1.7, color: BODY }}>{d}</p>
              {i < 2 && <span aria-hidden="true" className="pd-arr" style={{ position: "absolute", right: -22, top: "50%", width: 30, height: 30, borderRadius: "50%", background: "#fff", border: `1px solid ${LINE}`, color: P, display: "inline-flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}><Arrow s={14} /></span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 5. Final CTA */
function FinalCta() {
  return (
    <section id="talk" style={{ background: "#fff", padding: "0 0 92px" }}>
      <div className="pd-wrap">
        <div data-rv="0" className="pd-cta" style={{ position: "relative", overflow: "hidden", borderRadius: 26, background: "linear-gradient(115deg, #1A1190, #4747E0)", color: "#fff", padding: "60px 60px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 36, flexWrap: "wrap", boxShadow: "0 50px 90px -50px rgba(71,71,224,.8)" }}>
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,.22) 1px, transparent 1px)", backgroundSize: "28px 28px", opacity: 0.35, maskImage: "linear-gradient(90deg, #000, transparent 80%)", WebkitMaskImage: "linear-gradient(90deg, #000, transparent 80%)" }} />
          <div style={{ position: "relative", maxWidth: 660 }}>
            <h2 style={{ ...h2, color: "#fff" }}>Not sure which applications fit?</h2>
            <p style={{ margin: "16px 0 0", fontSize: 16, lineHeight: 1.75, color: "#DDDCFF" }}>Tell us how your team works today. We will help you identify the applications, combinations and integrations that match your requirements, or explore how EVOQ fits your industry.</p>
          </div>
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 12, minWidth: 220 }}>
            <a href="#" data-enquiry="" className="pd-btn" style={{ display: "inline-flex", justifyContent: "center", alignItems: "center", gap: 10, padding: "15px 26px", borderRadius: 12, background: "#fff", color: DEEP, textDecoration: "none", fontSize: 15, fontWeight: 700 }}>Talk to an expert <Arrow /></a>
            <a href="/solutions/industries" className="pd-btn" style={{ display: "inline-flex", justifyContent: "center", alignItems: "center", padding: "14px 26px", borderRadius: 12, border: "1px solid rgba(255,255,255,.45)", color: "#fff", textDecoration: "none", fontSize: 15, fontWeight: 600 }}>Explore industries</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProductsPage() {
  return (
    <div className="hs-root" style={{ minHeight: "100vh", background: "#fff", color: INK, fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
      <HsMotion />
      <EnquiryModal eyebrow="EVOQ Applications" segments={["Growth (CRM, Campaigns, ConfigX)", "Operations (ServiceOps, Projects, Desk)", "People (HRMS, Skillberry)", "Finance (Billing, Inventory)", "Platform (Sync)", "EVOQ AI", "Not sure yet"]} segmentLabel="Area of interest" placeholder="Tell us what you would like to improve or connect..." accent={DEEP} accentSoft={P} />
      <style>{`
        .pd-wrap{max-width:1240px;margin:0 auto;padding:0 24px}
        .pd-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:40px;align-items:center;padding:56px 0 84px}
        .pd-orbit{overflow:hidden}
        .pd-row{display:grid;grid-template-columns:260px minmax(0,1fr);gap:40px;padding:38px 0}
        .pd-apps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
        .pd-g3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}
        .pd-ai{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.9fr);gap:56px;align-items:center}
        .pd-btn{transition:transform .2s ease,box-shadow .2s ease}
        .pd-btn:hover{transform:translateY(-2px);box-shadow:0 16px 30px -16px rgba(26,17,144,.6)}
        .pd-card{transition:transform .3s ease,box-shadow .3s ease,border-color .3s ease}
        .pd-card:hover{transform:translateY(-5px);box-shadow:0 28px 52px -30px rgba(71,71,224,.5);border-color:#C9C6FF!important}
        .pd-link svg{transition:transform .2s ease}.pd-link:hover svg{transform:translateX(4px)}
        @keyframes pdFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        .pd-node{animation:pdFloat 6s ease-in-out infinite}
        @keyframes pdSpin{to{transform:rotate(360deg)}}
        .pd-ring{animation:pdSpin 80s linear infinite}
        .hs-rv{opacity:0;transform:translateY(26px);transition:opacity .8s cubic-bezier(.2,.7,.2,1),transform .8s cubic-bezier(.2,.7,.2,1);transition-delay:var(--hs-d,0ms)}
        .hs-rv.hs-in{opacity:1;transform:none}
        @media (max-width:1100px){.pd-apps{grid-template-columns:repeat(2,minmax(0,1fr))}.pd-g3{grid-template-columns:1fr}.pd-arr{display:none}}
        @media (max-width:980px){.pd-hero,.pd-ai,.pd-row{grid-template-columns:1fr;gap:30px}.pd-orbit-in{transform:scale(.72);transform-origin:top center;margin-bottom:-150px!important}.pd-cta{padding:38px 28px!important}}
        @media (max-width:640px){.pd-apps{grid-template-columns:1fr}.pd-hero h1{font-size:40px!important}.pd-orbit-in{transform:scale(.58)!important;margin-bottom:-230px!important}}
        @media (prefers-reduced-motion:reduce){.pd-node,.pd-ring{animation:none}.hs-rv,.pd-card,.pd-btn{transition:none}}
      `}</style>
      <div style={{ background: "#fff", position: "relative", zIndex: 60, borderBottom: `1px solid ${LINE}` }}>
        <Topbar darkCTA={false} light />
      </div>
      <Hero />
      <Apps />
      <AiSection />
      <Grow />
      <FinalCta />
      <Footer />
    </div>
  );
}
