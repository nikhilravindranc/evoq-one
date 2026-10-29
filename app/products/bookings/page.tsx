import { BookingsPage } from "@/components/bookings/BookingsPage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products/bookings");

export default function Bookings() {
  return (
    <>
      <PageJsonLd path="/products/bookings" />
      <BookingsPage />
    </>
  );
}
