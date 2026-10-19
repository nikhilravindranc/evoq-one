import { Topbar } from "@/components/hero/Topbar";
import { HeroShell } from "@/components/shared/HeroShell";
import { Footer } from "@/components/sections/Footer";
import { HealthcareCrmNav } from "./HealthcareCrmNav";
import { HealthcareCrmFeaturesHero } from "./HealthcareCrmFeaturesHero";
import {
  HealthcareCrmFeaturesScroll,
  HealthcareCrmFeaturesIntegrations,
  HealthcareCrmFeaturesConfiguration,
  HealthcareCrmFeaturesCTA,
} from "./HealthcareCrmFeatureSections";

export function HealthcareCrmFeaturesPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--white)" }}>
      <HeroShell
        bg={{ background: "linear-gradient(to bottom right, #FFFFFF, #DDF5F0, #18B8D1)" }}
        topbar={<Topbar darkCTA={false} light ctaColor="#18B8D1" />}
      >
        <HealthcareCrmNav />
        <HealthcareCrmFeaturesHero />
      </HeroShell>
      <HealthcareCrmFeaturesScroll />
      <HealthcareCrmFeaturesIntegrations />
      <HealthcareCrmFeaturesConfiguration />
      <HealthcareCrmFeaturesCTA />
      <Footer background="#18B8D1" />
    </div>
  );
}
