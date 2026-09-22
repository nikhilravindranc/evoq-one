import { Topbar } from "@/components/hero/Topbar";
import { Footer } from "@/components/sections/Footer";
import { HealthcareCrmNav } from "./HealthcareCrmNav";
import { HealthcareCrmFeaturesHero } from "./HealthcareCrmFeaturesHero";

export function HealthcareCrmFeaturesPage() {
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
      <HealthcareCrmFeaturesHero />
      <Footer />
    </div>
  );
}
