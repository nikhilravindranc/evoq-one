import { SpaceFeatures } from "@/components/bookings/space/SpaceFeatures";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/bookings/spaces/features");

export default function SpaceAndRoomFeatures() {
  return (
    <>
      <PageJsonLd path="/products/bookings/spaces/features" />
      <SpaceFeatures />
    </>
  );
}
