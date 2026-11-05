import { ApptPricing } from "@/components/bookings/appointments/ApptPricing";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/bookings/appointments/pricing");

export default function AppointmentPricing() {
  return (
    <>
      <PageJsonLd path="/products/bookings/appointments/pricing" />
      <ApptPricing />
    </>
  );
}
