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
  async redirects() {
    const moved: [string, string][] = [
      ["/ai", "/products/ai"],
      ["/evoq-ai", "/products/ai"],
      ["/billing", "/products/billing"],
      ["/billing/features", "/products/billing/features"],
      ["/billing/pricing", "/products/billing/pricing"],
      ["/healthcare", "/solutions/healthcare"],
      ["/healthcare/crm", "/solutions/healthcare/crm"],
      ["/healthcare/crm/features", "/solutions/healthcare/crm/features"],
      ["/healthcare/practice-management", "/solutions/healthcare/practice-management"],
      ["/manufacturing", "/solutions/manufacturing"],
    ];
    return moved.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;
