import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = {
  title: "Privacy Policy — EVOQ",
  description: "How EVOQ collects, uses and protects your information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function Page() {
  return <LegalPage doc="privacy-policy" />;
}
