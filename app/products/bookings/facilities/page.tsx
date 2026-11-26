import { FacilitiesHome } from "@/components/bookings/facilities/FacilitiesHome";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/bookings/facilities");

export default function FacilitiesScheduling() {
  return (
    <>
      <PageJsonLd path="/products/bookings/facilities" />
      <FacilitiesHome />
    </>
  );
}
