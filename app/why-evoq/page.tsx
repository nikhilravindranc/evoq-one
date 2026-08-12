import { Topbar } from "@/components/hero/Topbar";
import { Footer } from "@/components/sections/Footer";
import { WhyEvoqPage } from "@/components/why-evoq/WhyEvoqPage";

export const metadata = {
  title: "Why EVOQ — Built for How Businesses Actually Work",
  description:
    "EVOQ keeps operations connected through a scalable system structure that adapts as the business grows.",
};

export default function WhyEvoq() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--white)" }}>
      <div style={{ background: "var(--soft)", position: "relative", zIndex: 10, borderBottom: "1px solid rgba(189,189,255,0.3)" }}>
        <Topbar darkCTA={false} constrained light />
      </div>
      <WhyEvoqPage />
      <Footer />
    </div>
  );
}
