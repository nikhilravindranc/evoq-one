import { Topbar } from "@/components/hero/Topbar";
import { Footer } from "@/components/sections/Footer";
import { EvoqAIPage } from "@/components/evoq-ai/EvoqAIPage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/ai");

export default function AI() {
  return (
    <>
      <PageJsonLd path="/products/ai" />
    <div style={{ position: "relative", minHeight: "100vh", background: "#fff" }}>
      {/* nav floats over the hero gradient */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 50 }}>
        <Topbar darkCTA={false} />
      </div>
      <EvoqAIPage />
      <Footer background="#1A1190" />
    </div>
    </>
  );
}
