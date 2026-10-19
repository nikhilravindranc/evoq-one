import type { MetadataRoute } from "next";

const BASE = "https://evoq.one";
const routes = [
  "/", "/about", "/contact", "/implementation", "/integrations", "/why-evoq",
  "/products", "/products/ai", "/products/crm", "/products/crm/features", "/products/crm/pricing", "/products/campaigns", "/products/configx", "/products/desk", "/products/hrms", "/products/hrms/features", "/products/inventory", "/products/inventory/features", "/products/inventory/pricing", "/products/projects", "/products/projects/features", "/products/serviceops", "/products/skillberry", "/products/sync", "/products/sync/features", "/products/sync/pricing", "/products/billing", "/products/billing/features", "/products/billing/pricing",
  "/solutions", "/solutions/healthcare", "/solutions/healthcare/crm", "/solutions/healthcare/crm/features", "/solutions/healthcare/practice-management",
  "/solutions/construction", "/solutions/field-service", "/solutions/finance", "/solutions/hospitality", "/solutions/manufacturing",
  "/industries", "/privacy-policy", "/cookie-policy", "/cookie-preferences",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({ url: `${BASE}${r === "/" ? "" : r}` }));
}
