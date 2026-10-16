import { Topbar } from "@/components/hero/Topbar";
import { Footer } from "@/components/sections/Footer";
import { ImplementationPage } from "@/components/implementation/ImplementationPage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/implementation");

export default function Implementation() {
  return (
    <>
      <PageJsonLd path="/implementation" />
    <div style={{ minHeight: "100vh", background: "var(--white)" }}>
      <div style={{ background: "var(--soft)", position: "relative", zIndex: 10, borderBottom: "1px solid rgba(189,189,255,0.3)" }}>
        <Topbar darkCTA={false} constrained light />
      </div>
      <ImplementationPage />
      <Footer />
    </div>
    </>
  );
}
