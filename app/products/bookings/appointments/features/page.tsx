import { ApptFeatures } from "@/components/bookings/appointments/ApptFeatures";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/bookings/appointments/features");

export default function AppointmentFeatures() {
  return (
    <>
      <PageJsonLd path="/products/bookings/appointments/features" />
      <ApptFeatures />
    </>
  );
}
