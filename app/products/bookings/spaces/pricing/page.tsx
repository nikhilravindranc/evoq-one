import { SpacePricing } from "@/components/bookings/space/SpacePricing";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/bookings/spaces/pricing");

export default function SpaceAndRoomPricing() {
  return (
    <>
      <PageJsonLd path="/products/bookings/spaces/pricing" />
      <SpacePricing />
    </>
  );
}
