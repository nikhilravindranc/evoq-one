import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = {
  title: "Cookie Policy — EVOQ",
  description: "How EVOQ uses cookies and how you can manage them.",
  alternates: { canonical: "/cookie-policy" },
};

export default function Page() {
  return <LegalPage doc="cookie-policy" />;
}
