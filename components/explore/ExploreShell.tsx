import type { ReactNode } from "react";
import Link from "next/link";
import { Topbar } from "@/components/hero/Topbar";
import { Footer } from "@/components/sections/Footer";
import { EnquiryModal } from "@/components/manufacturing/EnquiryModal";
import { HsMotion } from "@/components/hospitality/HsMotion";

/* Shared frame for the "See EVOQ in action" detail pages: product walkthroughs,
   example scenarios and application previews. Each kind answers a different question,
   and the shell keeps them apart:
   - walkthrough: how an application works and what it is used for
   - scenario:    how applications work together across one process, start to finish
   - preview:     what the interface looks like, screen by screen */

const P = "#4747E0";
const DEEP = "#1A1190";
const LINE = "#E6EAF0";
const INK = "#1F2430";
const BODY = "#5F6B7A";

export type ExploreKind = "walkthrough" | "scenario" | "preview";

const KINDS: { key: ExploreKind; label: string; asks: string; href: string }[] = [
  { key: "walkthrough", label: "Product walkthroughs", asks: "How does the application work?", href: "/walkthroughs/crm" },
  { key: "scenario", label: "Example scenarios", asks: "How does a whole process run?", href: "/scenarios/enquiry-to-invoice" },
  { key: "preview", label: "Application previews", asks: "What does it look like to use?", href: "/previews/crm" },
];

const Arrow = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>;

export function ExploreShell({
  kind, title, intro, crumb, label, children,
}: {
  kind: ExploreKind;
  title: string;
  intro: string;
  crumb: string;
  /** Marks conceptual or simulated content so it is never mistaken for a customer result. */
  label?: string;
  children: ReactNode;
}) {
  const current = KINDS.find((k) => k.key === kind)!;
  return (
    <div className="hs-root" style={{ minHeight: "100vh", background: "#fff", color: INK, fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
      <HsMotion />
      <EnquiryModal eyebrow="EVOQ walkthroughs" segments={["CRM", "Billing", "Another application", "A full industry process", "Not sure yet"]} segmentLabel="Area of interest" placeholder="Tell us what you would like to see or evaluate..." accent={DEEP} accentSoft={P} />
      <style>{`
        .ex-wrap{max-width:1328px;margin:0 auto;padding:0 24px}
        .ex-crumbs{display:flex;flex-wrap:wrap;gap:8px;align-items:center;font-size:13px;color:${BODY};padding:22px 0 0}
        .ex-crumbs a{color:${BODY};text-decoration:none}.ex-crumbs a:hover{color:${P}}
        .ex-hero{padding:26px 0 40px;max-width:820px}
        .ex-kind{display:inline-flex;align-items:center;gap:8px;padding:5px 12px;border-radius:999px;background:#EEEDFF;color:#3A3AC9;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase}
        .ex-label{display:inline-flex;margin-left:10px;padding:5px 12px;border-radius:999px;background:#FDEFD3;color:#9A5B06;font-size:12px;font-weight:700}
        .ex-tabs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;padding-bottom:44px}
        .ex-tab{display:flex;flex-direction:column;gap:3px;padding:14px 18px;border-radius:14px;border:1px solid ${LINE};text-decoration:none;color:${INK};background:#fff;transition:border-color .2s ease,box-shadow .2s ease}
        .ex-tab b{font-size:14.5px}.ex-tab span{font-size:13px;color:${BODY}}
        .ex-tab:hover{border-color:#C9C6FF;box-shadow:0 14px 28px -20px rgba(71,71,224,.5)}
        .ex-tab[aria-current="page"]{border-color:${P};background:#F6F5FF;box-shadow:inset 0 0 0 1px ${P}}
        .ex-body{padding:20px 0 90px}
        .ex-more{background:#F6F5FF;padding:64px 0}
        .ex-more-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;margin-top:26px}
        .ex-card{display:flex;flex-direction:column;gap:6px;padding:22px 24px;border-radius:18px;background:#fff;border:1px solid ${LINE};text-decoration:none;color:${INK};transition:transform .25s ease,box-shadow .25s ease}
        .ex-card:hover{transform:translateY(-3px);box-shadow:0 24px 44px -30px rgba(71,71,224,.5)}
        .ex-card b{font-size:17px}.ex-card p{margin:0;font-size:14px;line-height:1.6;color:${BODY}}
        .ex-card i{margin-top:8px;display:inline-flex;align-items:center;gap:6px;font-style:normal;font-size:14px;font-weight:600;color:${P}}
        .ex-cta{padding:64px 0 80px;text-align:center}
        .ex-btn{display:inline-flex;align-items:center;gap:10px;padding:15px 26px;border-radius:12px;background:${P};color:#fff;text-decoration:none;font-size:15px;font-weight:700;box-shadow:0 18px 34px -18px rgba(71,71,224,.8);transition:transform .2s ease}
        .ex-btn:hover{transform:translateY(-2px)}
        .ex-btn.ghost{background:#fff;color:${DEEP};border:1px solid ${LINE};box-shadow:none}
        .hs-rv{opacity:0;transform:translateY(26px);transition:opacity .8s cubic-bezier(.2,.7,.2,1),transform .8s cubic-bezier(.2,.7,.2,1);transition-delay:var(--hs-d,0ms)}
        .hs-rv.hs-in{opacity:1;transform:none}
        @media (max-width:860px){.ex-tabs,.ex-more-grid{grid-template-columns:1fr}.ex-hero h1{font-size:36px!important}}
        @media (prefers-reduced-motion:reduce){.hs-rv,.ex-card,.ex-btn{transition:none}}
      `}</style>

      <div style={{ background: "#fff", position: "relative", zIndex: 60, borderBottom: `1px solid ${LINE}` }}>
        <Topbar darkCTA={false} light />
      </div>

      <section style={{ background: "linear-gradient(180deg, #F6F5FF 0%, #FFFFFF 100%)" }}>
        <div className="ex-wrap">
          <nav className="ex-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span><Link href="/#walkthroughs">See EVOQ in action</Link><span>/</span><span aria-current="page" style={{ color: INK }}>{crumb}</span>
          </nav>
          <div className="ex-hero" data-rv="0">
            <div style={{ marginBottom: 18 }}>
              <span className="ex-kind">{current.label.replace(/s$/, "")}</span>
              {label && <span className="ex-label">{label}</span>}
            </div>
            <h1 style={{ margin: 0, fontSize: 52, lineHeight: 1.07, letterSpacing: "-.03em", fontWeight: 700, color: DEEP, fontFamily: "var(--font-display), system-ui, sans-serif" }}>{title}</h1>
            <p style={{ margin: "22px 0 0", fontSize: 17.5, lineHeight: 1.75, color: BODY, maxWidth: "62ch" }}>{intro}</p>
          </div>
          <nav className="ex-tabs" aria-label="Ways to explore EVOQ">
            {KINDS.map((k) => (
              <a key={k.key} href={k.href} className="ex-tab" aria-current={k.key === kind ? "page" : undefined}>
                <b>{k.label}</b><span>{k.asks}</span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div className="ex-wrap ex-body">{children}</div>

      <section className="ex-more">
        <div className="ex-wrap">
          <h2 style={{ margin: 0, fontSize: 30, letterSpacing: "-.02em", fontWeight: 700, color: INK, fontFamily: "var(--font-display), system-ui, sans-serif" }}>Continue exploring</h2>
          <div className="ex-more-grid">
            {KINDS.filter((k) => k.key !== kind).map((k) => (
              <a key={k.key} href={k.href} className="ex-card">
                <b>{k.label}</b>
                <p>{k.asks}</p>
                <i>Open the CRM example <Arrow /></i>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="ex-cta">
        <div className="ex-wrap" data-rv="0">
          <h2 style={{ margin: 0, fontSize: 34, letterSpacing: "-.02em", fontWeight: 700, color: INK, fontFamily: "var(--font-display), system-ui, sans-serif" }}>Want to see it with your own process?</h2>
          <p style={{ margin: "14px auto 28px", maxWidth: "54ch", fontSize: 16.5, lineHeight: 1.7, color: BODY }}>Tell us what you want to evaluate and we will walk you through it.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#" data-enquiry="" className="ex-btn">Book a demo <Arrow /></a>
            <a href="/products" className="ex-btn ghost">Browse all applications</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
