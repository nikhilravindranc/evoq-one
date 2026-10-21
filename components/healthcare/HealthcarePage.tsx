import { Topbar } from "@/components/hero/Topbar";
import { HeroShell } from "@/components/shared/HeroShell";
import { Footer } from "@/components/sections/Footer";
import { EnquiryModal } from "@/components/manufacturing/EnquiryModal";
import { HealthcareNav } from "./HealthcareNav";
import { HealthcareHero } from "./HealthcareHero";
import { HealthcareCareSettings } from "./HealthcareCareSettings";
import { HealthcareOutcomes } from "./HealthcareOutcomes";
import { HealthcareJourney } from "./HealthcareJourney";
import { HealthcareJourneyTogether } from "./HealthcareJourneyTogether";
import { HealthcareAISpotlight } from "./HealthcareAI";
import { HealthcareStandards } from "./HealthcareStandards";
import { HealthcareIntegrations } from "./HealthcareIntegrations";
import { HealthcareCTA } from "./HealthcareCTA";

export function HealthcarePage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--white)" }}>
      <EnquiryModal eyebrow="EVOQ Healthcare" segments={["Clinics and practices", "Dental", "Aesthetics and wellness", "Hospitals", "Diagnostics", "Multi-location groups", "Other healthcare"]} segmentLabel="Type of organization" placeholder="Tell us what you would like to improve..." accent="#31465A" accentSoft="#2064B6" />
      <HeroShell
        bg={{ background: "#F1F5F7" }}
        topbar={<Topbar darkCTA={false} light ctaColor="#18B8D1" />}
      >
        <HealthcareNav />
        <HealthcareHero />
      </HeroShell>
      <HealthcareOutcomes />
      <HealthcareJourney />
      <HealthcareJourneyTogether />
      <HealthcareCareSettings />
      <HealthcareAISpotlight />
      <HealthcareStandards />
      <HealthcareIntegrations />
      <HealthcareCTA />
      <Footer background="#18B8D1" />
    </div>
  );
}
