import { Topbar } from "@/components/hero/Topbar";
import { HeroShell } from "@/components/shared/HeroShell";
import { Footer } from "@/components/sections/Footer";
import { HcCrmNav } from "./HcCrmNav";
import { HcCrmFeaturesHero } from "./HcCrmFeaturesHero";
import { HcCrmFeaturesScroll, HcCrmFeaturesIntegrations, HcCrmFeaturesConfiguration, HcCrmFeaturesCTA } from "./HcCrmFeatureSections";

/* Patient Relationships features, version 1: six feature groups (merged from eight), then integrations, configuration and the closing. */

export function HealthcareCrmFeaturesPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--white)" }}>
      <HeroShell bg={{ background: "linear-gradient(to bottom right, #FFFFFF, #DDF5F0, #18B8D1)" }} topbar={<Topbar darkCTA={false} light ctaColor="#18B8D1" />}>
        <HcCrmNav />
        <HcCrmFeaturesHero />
      </HeroShell>
      <HcCrmFeaturesScroll />
      <HcCrmFeaturesIntegrations />
      <HcCrmFeaturesConfiguration />
      <HcCrmFeaturesCTA />
      <Footer background="#102A43" />
    </div>
  );
}
