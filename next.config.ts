import type { NextConfig } from "next";

/* Route structure: products live under /products/<name>, industry solutions under /solutions/<name>.
   Old top-level URLs are redirected permanently. Sources are exact paths on purpose: /healthcare/*, /billing/*
   and /ai/* also hold static assets in /public, and a wildcard redirect would break those images. */
const nextConfig: NextConfig = {
  // Pin the workspace root: with a parent-folder lockfile Next infers the wrong root and watches too much.
  turbopack: { root: __dirname },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async headers() {
    // The embedded product pages in public/site are edited in place, so make browsers re-check them instead of reusing a stale copy.
    return [{ source: "/site/:file*.html", headers: [{ key: "Cache-Control", value: "no-cache, must-revalidate" }] }];
  },
  async redirects() {
    const moved: [string, string][] = [
      ["/ai", "/products/ai"],
      ["/evoq-ai", "/products/ai"],
      ["/billing", "/products/billing"],
      ["/bookings", "/products/bookings"],
      ["/billing/features", "/products/billing/features"],
      ["/billing/pricing", "/products/billing/pricing"],
      ["/healthcare", "/solutions/healthcare"],
      ["/healthcare/crm", "/solutions/healthcare/patient-relationships"],
      ["/healthcare/crm/features", "/solutions/healthcare/patient-relationships/features"],
      ["/healthcare/practice-management", "/solutions/healthcare/practice-management"],
      ["/manufacturing", "/solutions/manufacturing"],
      ["/solutions/industries", "/industries"],
      // the microsite plan's proposed paths
      ["/products/bookings/space-booking", "/products/bookings/spaces"],
      ["/products/bookings/space-booking/features", "/products/bookings/spaces/features"],
      ["/products/bookings/space-booking/pricing", "/products/bookings/spaces"],
      // earlier long names of the Spaces and Appointments pages
      ["/products/bookings/space-and-room-reservations", "/products/bookings/spaces"],
      ["/products/bookings/space-and-room-reservations/features", "/products/bookings/spaces/features"],
      ["/products/bookings/space-and-room-reservations/pricing", "/products/bookings/spaces"],
      ["/products/bookings/spaces/pricing", "/products/bookings/spaces"],
      ["/products/bookings/appointment-scheduling", "/products/bookings/appointments"],
      // ServiceOps v2 and Sync v1 became the main pages
      ["/products/serviceops-v2", "/products/serviceops"],
      ["/products/serviceops-v2/features", "/products/serviceops/features"],
      ["/products/serviceops-v2/pricing", "/products/serviceops/pricing"],
      ["/products/serviceops-v1/features", "/products/serviceops/features"],
      ["/products/sync-v1", "/products/sync"],
      ["/products/sync-v1/features", "/products/sync/features"],
      ["/products/sync-v1/pricing", "/products/sync/pricing"],
    ];
    return moved.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;
