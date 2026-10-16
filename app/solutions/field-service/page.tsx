import { FieldServicePage } from "@/components/field-service/FieldServicePage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/solutions/field-service");

export default function FieldService() {
  return (
    <>
      <PageJsonLd path="/solutions/field-service" />
      <FieldServicePage />
    </>
  );
}
