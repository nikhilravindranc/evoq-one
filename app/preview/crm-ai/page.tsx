import { ProductAISection } from "@/components/ai-sections/ProductAISection";
import { productAIConfigs } from "@/components/ai-sections/product-configs";

/* Internal preview of the product AI section template inside a mock product-page layout.
   Not linked anywhere and excluded from search engines. Delete app/preview before release if not needed.
   Try /preview/crm-ai?product=billing  (crm, serviceops, desk, projects, billing, inventory, hrms) */
export const metadata = {
  title: "Product AI section preview",
  robots: { index: false, follow: false },
};

function Band({ label, tone, h = 240, dark = false }: { label: string; tone: string; h?: number; dark?: boolean }) {
  return (
    <div style={{ background: tone, height: h, display: "flex", alignItems: "center", justifyContent: "center", color: dark ? "#fff" : "#475467", fontSize: 15, fontWeight: 600, letterSpacing: ".04em" }}>
      {label}
    </div>
  );
}

export default async function ProductAIPreview({ searchParams }: { searchParams: Promise<{ product?: string }> }) {
  const { product } = await searchParams;
  const key = (product && product in productAIConfigs ? product : "crm") as keyof typeof productAIConfigs;
  return (
    <div style={{ background: "#fff" }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", padding: "14px 24px", background: "#0B1230", fontSize: 13 }}>
        {Object.keys(productAIConfigs).map((k) => (
          <a key={k} href={`?product=${k}`} style={{ color: k === key ? "#fff" : "#9AA4C2", fontWeight: k === key ? 700 : 500, textDecoration: "none" }}>
            {k}
          </a>
        ))}
      </div>
      <Band label="Hero" tone="#FFFFFF" h={300} />
      <Band label="Stats / benefits band" tone="#0B1B4D" h={200} dark />

      <ProductAISection config={productAIConfigs[key]} />

      <Band label="Feature 1" tone="#F6F7FB" />
      <Band label="Feature 2" tone="#FFFFFF" />
      <Band label="Call to action" tone="#F6F7FB" h={200} />
    </div>
  );
}
