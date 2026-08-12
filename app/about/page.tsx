import { Topbar } from "@/components/hero/Topbar";
import { Footer } from "@/components/sections/Footer";
import { AboutPage } from "@/components/about/AboutPage";

export const metadata = {
  title: "About Us — EVOQ",
  description:
    "We're building the operating system for modern business teams — one suite that unifies growth, operations, and people.",
};

export default function About() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--white)" }}>
      <div style={{ background: "var(--soft)", position: "relative", zIndex: 10, borderBottom: "1px solid rgba(189,189,255,0.3)" }}>
        <Topbar darkCTA={false} constrained light />
      </div>
      <AboutPage />
      <Footer />
    </div>
  );
}
