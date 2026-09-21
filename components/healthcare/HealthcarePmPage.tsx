import { Topbar } from "@/components/hero/Topbar";
import { Footer } from "@/components/sections/Footer";
import { HealthcarePmNav } from "./HealthcarePmNav";
import { HealthcarePmHero } from "./HealthcarePmHero";
import {
  HealthcarePmDay,
  HealthcarePmWorkflow,
  HealthcarePmFeatures,
  HealthcarePmPractices,
  HealthcarePmGrow,
  HealthcarePmMarket,
  HealthcarePmCTA,
} from "./HealthcarePmSections";

export function HealthcarePmPage() {
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
      <HealthcarePmNav />
      <HealthcarePmHero />
      <HealthcarePmDay />
      <HealthcarePmWorkflow />
      <HealthcarePmFeatures />
      <HealthcarePmPractices />
      <HealthcarePmGrow />
      <HealthcarePmMarket />
      <HealthcarePmCTA />
      <Footer />
    </div>
  );
}
