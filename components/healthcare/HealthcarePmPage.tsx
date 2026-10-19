import { Topbar } from "@/components/hero/Topbar";
import { HeroShell } from "@/components/shared/HeroShell";
import { Footer } from "@/components/sections/Footer";
import { HealthcarePmNav } from "./HealthcarePmNav";
import { HealthcarePmHero } from "./HealthcarePmHero";
import {
  HealthcarePmWorkflow,
  HealthcarePmFeatures,
  HealthcarePmPractices,
  HealthcarePmGrow,
  HealthcarePmMarket,
  HealthcarePmCTA,
} from "./HealthcarePmSections";
import { HealthcarePmAI } from "./HealthcareAISections";

export function HealthcarePmPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--white)" }}>
      <HeroShell
        bg={{ background: "linear-gradient(115deg,#DDF1FA 0%,#EEF6FC 30%,#FFFFFF 55%,#F3F3FB 100%)" }}
        topbar={<Topbar darkCTA={false} light ctaColor="#7ACFC5" />}
      >
        <HealthcarePmNav />
        <HealthcarePmHero />
      </HeroShell>
      <HealthcarePmWorkflow />
      <HealthcarePmFeatures />
      <HealthcarePmAI />
      <HealthcarePmPractices />
      <HealthcarePmGrow />
      <HealthcarePmMarket />
      <HealthcarePmCTA />
      <Footer background="#7ACFC5" darkText />
    </div>
  );
}
