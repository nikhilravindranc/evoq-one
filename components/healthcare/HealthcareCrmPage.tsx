import { Topbar } from "@/components/hero/Topbar";
import { HeroShell } from "@/components/shared/HeroShell";
import { Footer } from "@/components/sections/Footer";
import { HealthcareCrmNav } from "./HealthcareCrmNav";
import { HealthcareCrmHero } from "./HealthcareCrmHero";
import { HealthcareCrmEnquiry } from "./HealthcareCrmEnquiry";
import { HealthcareCrmJourney } from "./HealthcareCrmJourney";
import { HealthcareCrmSharedContext, HealthcareCrmEnquiryFlow } from "./HealthcareCrmContextFlow";
import { HealthcareCrmOrganizations } from "./HealthcareCrmOrganizations";
import { HealthcareCrmFollowUp } from "./HealthcareCrmFollowUp";
import { HealthcareCrmConnected } from "./HealthcareCrmConnected";
import { HealthcareCrmSecurity } from "./HealthcareCrmSecurity";
import { HealthcareCrmCTA } from "./HealthcareCrmCTA";
import { HealthcareCrmStackedScroll } from "./HealthcareCrmStackedScroll";
import { HealthcareCrmAI } from "./HealthcareAISections";

export function HealthcareCrmPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--white)" }}>
      <HeroShell
        bg={{ background: "#F4FBFA" }}
        topbar={<Topbar darkCTA={false} light ctaColor="#18B8D1" />}
      >
        <HealthcareCrmNav />
        <HealthcareCrmHero />
      </HeroShell>
      <HealthcareCrmEnquiry />

      {/* Stacked scroll sequence: each panel pins full-screen for a stretch
          of scrolling, then the next one takes over. Driven by JS (see
          HealthcareCrmStackedScroll) rather than CSS `position: sticky`. */}
      <HealthcareCrmStackedScroll
        panels={[
          <HealthcareCrmJourney key="journey" />,
          <HealthcareCrmSharedContext key="shared-context" />,
            <HealthcareCrmEnquiryFlow key="enquiry-flow" />,
          <HealthcareCrmFollowUp key="followup" />,
          <HealthcareCrmConnected key="connected" />,
        ]}
      />

      <HealthcareCrmAI />
      <HealthcareCrmOrganizations />
      <HealthcareCrmSecurity />
      <HealthcareCrmCTA />
      <Footer background="#18B8D1" />
    </div>
  );
}
