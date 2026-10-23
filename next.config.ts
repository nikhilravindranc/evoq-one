import type { NextConfig } from "next";

/* Route structure: products live under /products/<name>, industry solutions under /solutions/<name>.
   Old top-level URLs are redirected permanently. Sources are exact paths on purpose: /healthcare/*, /billing/*
   and /ai/* also hold static assets in /public, and a wildcard redirect would break those images. */
const nextConfig: NextConfig = {
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
      ["/billing/features", "/products/billing/features"],
      ["/billing/pricing", "/products/billing/pricing"],
      ["/healthcare", "/solutions/healthcare"],
      ["/healthcare/crm", "/solutions/healthcare/patient-relationships"],
      ["/healthcare/crm/features", "/solutions/healthcare/patient-relationships/features"],
      ["/healthcare/practice-management", "/solutions/healthcare/practice-management"],
      ["/manufacturing", "/solutions/manufacturing"],
      ["/solutions/industries", "/industries"],
    ];
    return moved.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;
