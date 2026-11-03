import { SpacePricing } from "@/components/bookings/space/SpacePricing";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/bookings/space-and-room-reservations/pricing");

export default function SpaceAndRoomPricing() {
  return (
    <>
      <PageJsonLd path="/products/bookings/space-and-room-reservations/pricing" />
      <SpacePricing />
    </>
  );
}
