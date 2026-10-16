import { Topbar } from "@/components/hero/Topbar";
import { Footer } from "@/components/sections/Footer";
import { WhyEvoqPage } from "@/components/why-evoq/WhyEvoqPage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/why-evoq");

export default function WhyEvoq() {
  return (
    <>
      <PageJsonLd path="/why-evoq" />
    <div style={{ minHeight: "100vh", background: "var(--white)" }}>
      <div style={{ background: "var(--soft)", position: "relative", zIndex: 10, borderBottom: "1px solid rgba(189,189,255,0.3)" }}>
        <Topbar darkCTA={false} constrained light />
      </div>
      <WhyEvoqPage />
      <Footer />
    </div>
    </>
  );
}
