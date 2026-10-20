import type { CSSProperties } from "react";
import { Topbar } from "@/components/hero/Topbar";
import { Footer } from "@/components/sections/Footer";
import { EnquiryModal } from "@/components/manufacturing/EnquiryModal";
import { HsMotion } from "@/components/hospitality/HsMotion";
import { ProductsHeroVisual } from "./ProductsHeroVisual";
import { ProductsGrid } from "./ProductsGrid";
import { AiModes } from "./AiModes";

/* EVOQ products: the landing page for the Products menu. Uses the main EVOQ brand (indigo / soft lavender). */
const P = "#4747E0";
const DEEP = "#1A1190";
const SOFT = "#F2F2FF";
const LINE = "#E6EAF0";
const INK = "#1F2430";
const BODY = "#5F6B7A";

const Arrow = ({ s = 15 }: { s?: number }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>;
function Eyebrow({ children, light = false }: { children: string; light?: boolean }) {
  return <p style={{ margin: "0 0 14px", fontSize: 12, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: light ? "#C9C6FF" : P }}>{children}</p>;
}
const h2: CSSProperties = { margin: 0, fontSize: 40, lineHeight: 1.12, letterSpacing: "-.025em", fontWeight: 700, color: INK, fontFamily: "var(--font-display), system-ui, sans-serif" };

/* ------------------------------------------------------------------ 1. Hero */
function Hero() {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: "linear-gradient(180deg, #F6F5FF 0%, #FFFFFF 100%)" }}>
      <div aria-hidden="true" style={{ position: "absolute", right: "-6%", top: "-20%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(71,71,224,.16), rgba(71,71,224,0))" }} />
      <div className="pd-wrap">
        <div className="pd-hero">
          <div data-rv="0">
            <Eyebrow>EVOQ products</Eyebrow>
            <h1 style={{ margin: 0, fontSize: 58, lineHeight: 1.05, letterSpacing: "-.03em", fontWeight: 700, color: DEEP, fontFamily: "var(--font-display), system-ui, sans-serif" }}>One suite. Every product your work runs on.</h1>
            <p style={{ margin: "24px 0 0", fontSize: 17.5, lineHeight: 1.75, color: BODY, maxWidth: "50ch" }}>EVOQ brings customer relationships, operations, people, finance and AI together as products that work on their own or connect as one. Start with the one you need and add the rest as you grow.</p>
            <div style={{ marginTop: 32, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="#apps" className="pd-btn" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "15px 26px", borderRadius: 12, background: P, color: "#fff", textDecoration: "none", fontSize: 15, fontWeight: 700, boxShadow: "0 18px 34px -18px rgba(71,71,224,.8)" }}>Explore the products <Arrow /></a>
              <a href="#" data-enquiry="" className="pd-btn" style={{ display: "inline-flex", alignItems: "center", padding: "15px 26px", borderRadius: 12, background: "#fff", color: DEEP, border: `1px solid ${LINE}`, textDecoration: "none", fontSize: 15, fontWeight: 700 }}>Talk to an expert</a>
            </div>
            <div style={{ marginTop: 34, display: "flex", gap: 26, flexWrap: "wrap", fontSize: 13, color: BODY }}>
              {["12 products", "Use one or connect them all", "AI across the suite"].map((t) => <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><i style={{ width: 7, height: 7, borderRadius: "50%", background: P, display: "inline-block" }} />{t}</span>)}
            </div>
          </div>
          <div className="pd-vis" data-rv="1">
            <ProductsHeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 2. Products by category */
function Apps() {
  return (
    <section id="apps" style={{ background: "#fff", padding: "92px 0 96px", borderTop: `1px solid ${LINE}` }}>
      <div className="pd-wrap">
        <div style={{ textAlign: "center", maxWidth: 740, margin: "0 auto 34px" }} data-rv="0">
          <Eyebrow>The products</Eyebrow>
          <h2 style={h2}>Find the product for the work in front of you</h2>
          <p style={{ margin: "18px auto 0", fontSize: 16.5, lineHeight: 1.75, color: BODY }}>Browse by what you need to get done. Each product works on its own, and they share data when you connect them.</p>
        </div>
        <ProductsGrid />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 4. Start small */
function Grow() {
  const steps: [string, string, string][] = [
    ["01", "Start with one product", "Pick the product that solves your most pressing problem, such as CRM for sales or Billing for invoicing."],
    ["02", "Connect what you already use", "Use Sync to share data between EVOQ products and your existing systems through supported integrations."],
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
              <h4 style={{ margin: "6px 0 0", fontSize: 21, fontWeight: 700, color: DEEP }}>{t}</h4>
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
            <h2 style={{ ...h2, color: "#fff" }}>Not sure which products fit?</h2>
            <p style={{ margin: "16px 0 0", fontSize: 16, lineHeight: 1.75, color: "#DDDCFF" }}>Tell us how your team works today. We will help you identify the products, combinations and integrations that match your requirements, or explore how EVOQ fits your industry.</p>
          </div>
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 12, minWidth: 220 }}>
            <a href="#" data-enquiry="" className="pd-btn" style={{ display: "inline-flex", justifyContent: "center", alignItems: "center", gap: 10, padding: "15px 26px", borderRadius: 12, background: "#fff", color: DEEP, textDecoration: "none", fontSize: 15, fontWeight: 700 }}>Talk to an expert <Arrow /></a>
            <a href="/industries" className="pd-btn" style={{ display: "inline-flex", justifyContent: "center", alignItems: "center", padding: "14px 26px", borderRadius: 12, border: "1px solid rgba(255,255,255,.45)", color: "#fff", textDecoration: "none", fontSize: 15, fontWeight: 600 }}>Explore industries</a>
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
      <EnquiryModal eyebrow="EVOQ Products" segments={["Growth (CRM, Campaigns, ConfigX)", "Operations (ServiceOps, Projects, Desk)", "People (HRMS, Skillberry)", "Finance (Billing, Inventory)", "Platform (Sync)", "EVOQ AI", "Not sure yet"]} segmentLabel="Area of interest" placeholder="Tell us what you would like to improve or connect..." accent={DEEP} accentSoft={P} />
      <style>{`
        .pd-wrap{max-width:1240px;margin:0 auto;padding:0 24px}
        .pd-hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:40px;align-items:center;padding:56px 0 84px}
        .pd-vis{min-width:0}
        .pd-row{display:grid;grid-template-columns:260px minmax(0,1fr);gap:40px;padding:38px 0}
        .pd-apps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
        .pd-g3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}
        .pd-ai{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.9fr);gap:56px;align-items:center}
        .pd-btn{transition:transform .2s ease,box-shadow .2s ease}
        .pd-btn:hover{transform:translateY(-2px);box-shadow:0 16px 30px -16px rgba(26,17,144,.6)}
        .pd-card{transition:transform .3s ease,box-shadow .3s ease,border-color .3s ease}
        .pd-card:hover{transform:translateY(-5px);box-shadow:0 28px 52px -30px rgba(71,71,224,.5);border-color:#C9C6FF!important}
        .pd-link svg{transition:transform .2s ease}.pd-link:hover svg{transform:translateX(4px)}
        .hs-rv{opacity:0;transform:translateY(26px);transition:opacity .8s cubic-bezier(.2,.7,.2,1),transform .8s cubic-bezier(.2,.7,.2,1);transition-delay:var(--hs-d,0ms)}
        .hs-rv.hs-in{opacity:1;transform:none}
        @media (max-width:1100px){.pd-apps{grid-template-columns:repeat(2,minmax(0,1fr))}.pd-g3{grid-template-columns:1fr}.pd-arr{display:none}}
        @media (max-width:980px){.pd-hero,.pd-ai,.pd-row{grid-template-columns:1fr;gap:30px}.pd-cta{padding:38px 28px!important}}
        @media (max-width:640px){.pd-apps{grid-template-columns:1fr}.pd-hero h1{font-size:40px!important}}
        @media (prefers-reduced-motion:reduce){.hs-rv,.pd-card,.pd-btn{transition:none}}
      `}</style>
      <div style={{ background: "#fff", position: "relative", zIndex: 60, borderBottom: `1px solid ${LINE}` }}>
        <Topbar darkCTA={false} light />
      </div>
      <Hero />
      <Apps />
      <AiModes />
      <Grow />
      <FinalCta />
      <Footer />
    </div>
  );
}
