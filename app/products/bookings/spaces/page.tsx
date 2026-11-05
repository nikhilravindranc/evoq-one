import { SpaceHome } from "@/components/bookings/space/SpaceHome";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/bookings/spaces");

export default function SpaceAndRoom() {
  return (
    <>
      <PageJsonLd path="/products/bookings/spaces" />
      <SpaceHome />
    </>
  );
}
