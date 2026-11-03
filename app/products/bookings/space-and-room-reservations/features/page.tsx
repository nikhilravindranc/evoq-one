import { SpaceFeatures } from "@/components/bookings/space/SpaceFeatures";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/bookings/space-and-room-reservations/features");

export default function SpaceAndRoomFeatures() {
  return (
    <>
      <PageJsonLd path="/products/bookings/space-and-room-reservations/features" />
      <SpaceFeatures />
    </>
  );
}
