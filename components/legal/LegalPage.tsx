import { Topbar } from "@/components/hero/Topbar";
import { Footer } from "@/components/sections/Footer";
import { LEGAL } from "./legal-content";

export function LegalPage({ doc }: { doc: keyof typeof LEGAL }) {
  const d = LEGAL[doc];
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "var(--font-sans), system-ui, sans-serif", color: "#1F2430" }}>
      <Topbar darkCTA={false} light ctaColor="#1F2340" />
      <main>
        <section className="px-5 pb-20 pt-16 sm:px-6">
          <div className="mx-auto max-w-[860px]">
            <h1 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 48, lineHeight: 1.08, letterSpacing: "-0.03em", fontWeight: 700, color: "#1F2340" }}>{d.title}</h1>
            <p style={{ margin: "14px 0 0", fontSize: 16, color: "#5F6B7A" }}>{d.updated}</p>
            <div style={{ marginTop: 44, display: "grid", gap: 40 }}>
              {d.sections.map((s) => (
                <section key={s.h}>
                  <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 24, lineHeight: 1.25, fontWeight: 600, letterSpacing: "-0.01em", color: "#1F2340" }}>{s.h}</h2>
                  <div style={{ marginTop: 14, display: "grid", gap: 14 }}>
                    {s.p.map((p, i) => (
                      <p key={i} style={{ margin: 0, fontSize: 16, lineHeight: 1.75, color: "#374151", whiteSpace: "pre-wrap" }}>{p}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
