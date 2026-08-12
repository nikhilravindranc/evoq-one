import { Topbar } from "@/components/hero/Topbar";
import { Footer } from "@/components/sections/Footer";
import { ContactPage } from "@/components/contact/ContactPage";

export const metadata = {
  title: "Contact Us — EVOQ",
  description:
    "Get in touch with EVOQ. Tell us what you want to do and we'll connect you to the right team.",
};

export default function Contact() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--white)" }}>
      {/* Header band — flat dark brand colour, no gradient */}
      <div
        style={{
          background: "linear-gradient(135deg, #000099 0%, #3333CC 55%, #4747E0 100%)",
          position: "relative",
          zIndex: 10,
        }}
      >
        <Topbar darkCTA={false} constrained />
      </div>

      {/* Contact content */}
      <ContactPage />

      {/* Shared footer */}
      <Footer />
    </div>
  );
}
