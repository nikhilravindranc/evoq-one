import { Topbar } from "@/components/hero/Topbar";
import { HeroShell } from "@/components/shared/HeroShell";
import { Footer } from "@/components/sections/Footer";
import { EnquiryModal } from "@/components/manufacturing/EnquiryModal";
import { HsMotion } from "@/components/hospitality/HsMotion";
import { HealthcareNav } from "@/components/healthcare/HealthcareNav";
import { HcHero } from "./HcHero";
import { HcOutcomes } from "./HcOutcomes";
import { HcSolutions } from "./HcSolutions";
import { HcAI } from "./HcAI";
import { HcConnected } from "./HcConnected";
import { HcCTA } from "./HcCTA";

/* Healthcare main page, version 1 (docs/healthcare-fix-plan.md): six sections. Hero, outcomes, tabbed solutions by care setting, AI,
   connected (standards and integrations), closing. */

export function HealthcarePage() {
  return (
    <div className="hs-root" style={{ minHeight: "100vh", background: "var(--white)", fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
      <HsMotion />
      <EnquiryModal eyebrow="EVOQ Healthcare" segments={["Clinics and practices", "Dental", "Aesthetics and wellness", "Hospitals", "Diagnostics", "Multi-location groups", "Other healthcare"]} segmentLabel="Type of organization" placeholder="Tell us what you would like to improve..." accent="#31465A" accentSoft="#2064B6" />
      <style>{`
        .hc-wrap{max-width:1300px;margin:0 auto;padding:0 24px}
        .hs-rv{opacity:0;transform:translateY(26px);transition:opacity .8s cubic-bezier(.2,.7,.2,1),transform .8s cubic-bezier(.2,.7,.2,1);transition-delay:var(--hs-d,0ms)}
        .hs-rv.hs-in{opacity:1;transform:none}
        @media (prefers-reduced-motion:reduce){.hs-rv{transition:none}}
      `}</style>
      <HeroShell bg={{ background: "#F1F5F7" }} topbar={<Topbar darkCTA={false} light ctaColor="#18B8D1" />}>
        <HealthcareNav />
        <HcHero />
      </HeroShell>
      <HcOutcomes />
      <HcSolutions />
      <HcAI />
      <HcConnected />
      <HcCTA />
      <Footer background="#18B8D1" />
    </div>
  );
}
