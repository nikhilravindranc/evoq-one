import { Footer } from "@/components/sections/Footer";
import { AboutPage } from "@/components/about/AboutPage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/about");

export default function About() {
  return (
    <>
      <PageJsonLd path="/about" />
    <div style={{ minHeight: "100vh", background: "var(--white)" }}>
      <AboutPage />
      <Footer />
    </div>
    </>
  );
}
