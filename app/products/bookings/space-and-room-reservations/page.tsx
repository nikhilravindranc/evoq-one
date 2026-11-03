import { SpaceHome } from "@/components/bookings/space/SpaceHome";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/bookings/space-and-room-reservations");

export default function SpaceAndRoom() {
  return (
    <>
      <PageJsonLd path="/products/bookings/space-and-room-reservations" />
      <SpaceHome />
    </>
  );
}
