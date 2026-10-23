import { FieldServicePage } from "@/components/field-service/FieldServicePage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/solutions/field-service-facilities-maintenance");

export default function FieldService() {
  return (
    <>
      <PageJsonLd path="/solutions/field-service-facilities-maintenance" />
      <FieldServicePage />
    </>
  );
}
