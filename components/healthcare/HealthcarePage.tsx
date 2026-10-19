import { Topbar } from "@/components/hero/Topbar";
import { HeroShell } from "@/components/shared/HeroShell";
import { Footer } from "@/components/sections/Footer";
import { HealthcareNav } from "./HealthcareNav";
import { HealthcareHero } from "./HealthcareHero";
import { HealthcareCareSettings } from "./HealthcareCareSettings";
import { HealthcareJourney } from "./HealthcareJourney";
import { HealthcareJourneyTogether } from "./HealthcareJourneyTogether";
import { HealthcareAISpotlight } from "./HealthcareAI";
import { HealthcareStandards } from "./HealthcareStandards";
import { HealthcareIntegrations } from "./HealthcareIntegrations";
import { HealthcareCTA } from "./HealthcareCTA";

export function HealthcarePage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--white)" }}>
      <HeroShell
        bg={{ background: "#F1F5F7" }}
        topbar={<Topbar darkCTA={false} light ctaColor="#18B8D1" />}
      >
        <HealthcareNav />
        <HealthcareHero />
      </HeroShell>
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
