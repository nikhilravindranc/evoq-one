import { LegalPage } from "@/components/legal/LegalPage";

export const metadata = {
  title: "Cookie Preferences — EVOQ",
  description: "How EVOQ uses cookies and how you can manage them.",
  alternates: { canonical: "/cookie-preferences" },
};

export default function Page() {
  return <LegalPage doc="cookie-preferences" />;
}
