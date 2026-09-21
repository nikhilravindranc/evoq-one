import { Topbar } from "@/components/hero/Topbar";
import { Footer } from "@/components/sections/Footer";
import { HealthcareCrmNav } from "./HealthcareCrmNav";
import { HealthcareCrmHero } from "./HealthcareCrmHero";
import { HealthcareCrmEnquiry } from "./HealthcareCrmEnquiry";
import { HealthcareCrmJourney } from "./HealthcareCrmJourney";
import { HealthcareCrmSplit } from "./HealthcareCrmSplit";
import { HealthcareCrmOrganizations } from "./HealthcareCrmOrganizations";
import { HealthcareCrmFollowUp } from "./HealthcareCrmFollowUp";
import { HealthcareCrmConnected } from "./HealthcareCrmConnected";
import { HealthcareCrmSecurity } from "./HealthcareCrmSecurity";
import { HealthcareCrmCTA } from "./HealthcareCrmCTA";

export function HealthcareCrmPage() {
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
      <HealthcareCrmNav />
      <HealthcareCrmHero />
      <HealthcareCrmEnquiry />
      <HealthcareCrmJourney />
      <HealthcareCrmSplit />
      <HealthcareCrmOrganizations />
      <HealthcareCrmFollowUp />
      <HealthcareCrmConnected />
      <HealthcareCrmSecurity />
      <HealthcareCrmCTA />
      <Footer />
    </div>
  );
}
