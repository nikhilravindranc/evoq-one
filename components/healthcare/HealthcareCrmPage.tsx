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
import { HealthcareCrmStackedScroll } from "./HealthcareCrmStackedScroll";

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

      {/* Stacked scroll sequence: each panel pins full-screen for a stretch
          of scrolling, then the next one takes over. Driven by JS (see
          HealthcareCrmStackedScroll) rather than CSS `position: sticky`. */}
      <HealthcareCrmStackedScroll
        panels={[
          <HealthcareCrmJourney key="journey" />,
          <HealthcareCrmSplit key="split" />,
          <HealthcareCrmFollowUp key="followup" />,
          <HealthcareCrmConnected key="connected" />,
        ]}
      />

      <HealthcareCrmOrganizations />
      <HealthcareCrmSecurity />
      <HealthcareCrmCTA />
      <Footer />
    </div>
  );
}
