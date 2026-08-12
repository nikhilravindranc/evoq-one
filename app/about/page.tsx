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
      <AboutPage />
      <Footer />
    </div>
  );
}
