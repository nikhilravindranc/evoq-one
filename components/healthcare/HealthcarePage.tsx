import { Topbar } from "@/components/hero/Topbar";
import { Footer } from "@/components/sections/Footer";
import { HealthcareNav } from "./HealthcareNav";
import { HealthcareHero } from "./HealthcareHero";
import { HealthcareConnected } from "./HealthcareConnected";
import { HealthcareCareSettings } from "./HealthcareCareSettings";
import { HealthcareJourney } from "./HealthcareJourney";
import { HealthcareJourneyTogether } from "./HealthcareJourneyTogether";
import { HealthcareEnvironment } from "./HealthcareEnvironment";
import { HealthcareModular } from "./HealthcareModular";
import { HealthcareCTA } from "./HealthcareCTA";

export function HealthcarePage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--white)" }}>
      <div
        style={{
          background: "var(--white)",
          position: "relative",
          zIndex: 60,
          borderBottom: "1px solid rgba(16,42,67,0.08)",
        }}
      >
        <Topbar darkCTA={false} light />
      </div>
      <HealthcareNav />
      <HealthcareHero />
      <HealthcareConnected />
      <HealthcareCareSettings />
      <HealthcareJourney />
      <HealthcareJourneyTogether />
      <HealthcareEnvironment />
      <HealthcareModular />
      <HealthcareCTA />
      <Footer />
    </div>
  );
}
