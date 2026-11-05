import { ApptHome } from "@/components/bookings/appointments/ApptHome";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/bookings/appointments");

export default function AppointmentScheduling() {
  return (
    <>
      <PageJsonLd path="/products/bookings/appointments" />
      <ApptHome />
    </>
  );
}
