import { Topbar } from "@/components/hero/Topbar";
import { HeroShell } from "@/components/shared/HeroShell";
import { Footer } from "@/components/sections/Footer";
import { EnquiryModal } from "@/components/manufacturing/EnquiryModal";
import { HsMotion } from "@/components/hospitality/HsMotion";
import { HcCrmNav } from "./HcCrmNav";
import { HcCrmHero } from "./HcCrmHero";
import { HcCrmSlides } from "./HcCrmSlides";
import { HcCrmOrganizations } from "./HcCrmOrganizations";
import { HcCrmConnected } from "./HcCrmConnected";
import { HcCrmCTA } from "./HcCrmCTA";

/* Patient Relationships, version 1 (docs/healthcare-patient-relationships-plan.md): eight sections, normal scroll. Hero, then one slider with the journey,
   the shared context and the follow ups, care settings as one row of cards, connected (products and standards), closing. */

export function PatientRelationshipsV1Page() {
  return (
    <div className="hs-root" style={{ minHeight: "100vh", background: "var(--white)", fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
      <HsMotion />
      <EnquiryModal eyebrow="EVOQ CRM for healthcare" segments={["Clinics and practices", "Dental", "Aesthetics and wellness", "Hospitals", "Diagnostics", "Multi-location groups", "Other healthcare"]} segmentLabel="Type of organization" placeholder="Tell us how you manage patient enquiries today..." accent="#31465A" accentSoft="#2064B6" />
      <style>{`
        .hc-wrap{max-width:1300px;margin:0 auto;padding:0 24px}
        .hs-rv{opacity:0;transform:translateY(26px);transition:opacity .8s cubic-bezier(.2,.7,.2,1),transform .8s cubic-bezier(.2,.7,.2,1);transition-delay:var(--hs-d,0ms)}
        .hs-rv.hs-in{opacity:1;transform:none}
        @media (prefers-reduced-motion:reduce){.hs-rv{transition:none}}
      `}</style>
      <HeroShell bg={{ background: "#F4FBFA" }} topbar={<Topbar darkCTA={false} light ctaColor="#18B8D1" />}>
        <HcCrmNav />
        <HcCrmHero />
      </HeroShell>
      <HcCrmSlides />
      <HcCrmOrganizations />
      <HcCrmConnected />
      <HcCrmCTA />
      <Footer background="#102A43" />
    </div>
  );
}
