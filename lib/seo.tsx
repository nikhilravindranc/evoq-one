import type { Metadata } from "next";

/* One place for every page's meta title, description, Open Graph / Twitter tags and JSON-LD schema.
   To change a page's SEO, edit its row in PAGES. */

export const SITE = {
  url: "https://evoq.one",
  name: "EVOQ",
  legalName: "EVOQ",
  tagline: "One Suite. Endless Potential.",
  logo: "/black-logo.png",
  ogImage: "/opengraph-image",
  locale: "en_US",
};

type Kind = "home" | "web" | "product" | "productPage" | "solution" | "collection" | "legal";
type Page = { title: string; description: string; crumb: string; kind: Kind; app?: string; category?: string };

const P = (title: string, description: string, crumb: string, kind: Kind, extra: Partial<Page> = {}): Page => ({ title, description, crumb, kind, ...extra });

export const PAGES: Record<string, Page> = {
  "/": P("EVOQ — Every team. Every workflow. Finally connected.", "EVOQ is a unified business operating system that connects CRM, campaigns, service, projects, HR, billing, inventory and AI, so every team works from one source of truth.", "Home", "home"),
  "/about": P("About EVOQ — The operating system for modern business teams", "We're building the operating system for modern business teams: one suite that unifies growth, operations and people.", "About", "web"),
  "/contact": P("Contact EVOQ — Talk to our team", "Get in touch with EVOQ. Tell us what you want to do and we'll connect you to the right team.", "Contact", "web"),
  "/implementation": P("EVOQ Implementation Services — Go live with confidence", "Deploy EVOQ with confidence. Implementation services cover configuration, data migration, integrations, training and go-live.", "Implementation", "web"),
  "/integrations": P("EVOQ Integrations — Connect the systems you already use", "Connect your EVOQ products with the business systems, platforms and services your teams already rely on.", "Integrations", "web"),
  "/why-evoq": P("Why EVOQ — Built for how businesses actually work", "EVOQ keeps operations connected through a scalable system structure that adapts as your business grows.", "Why EVOQ?", "web"),

  "/products": P("EVOQ Products — Growth, operations, people and finance", "Explore the EVOQ products: CRM, Campaigns, ConfigX, ServiceOps, Projects, Desk, HRMS, Skillberry, Billing, Inventory, Sync and EVOQ AI. Use one or connect them all.", "Products", "collection"),
  "/products/ai": P("EVOQ AI — AI that gets work done", "EVOQ AI brings AI into the products, systems and processes where your work happens. Ask EVI for help, assign work to AI agents, or let AI work automatically.", "EVOQ AI", "product", { app: "EVOQ AI", category: "BusinessApplication" }),

  "/products/crm": P("EVOQ CRM — Sell smarter, close faster, grow better", "Keep leads, deals, contacts and follow-ups organized in one CRM built for modern sales teams.", "CRM", "product", { app: "EVOQ CRM", category: "BusinessApplication" }),
  "/products/crm/features": P("EVOQ CRM features — Pipeline, quotes and forecasting", "Explore EVOQ CRM features: lead capture, contact and account context, pipeline and deal tracking, quotes, forecasting, follow-up reminders and multichannel engagement.", "Features", "productPage"),
  "/products/crm/pricing": P("EVOQ CRM pricing — Plans for every team", "Compare EVOQ CRM Pro, Max and Enterprise plans, choose monthly or annual billing, and find the right fit for your team.", "Pricing", "productPage"),

  "/products/campaigns": P("EVOQ Campaigns — Turn engagement into opportunities", "Segment audiences, run email and SMS campaigns, automate journeys and measure results with EVOQ Campaigns, with EVOQ CRM or your existing CRM.", "Campaigns", "product", { app: "EVOQ Campaigns", category: "BusinessApplication" }),
  "/products/configx": P("EVOQ ConfigX — Make complex products easier to buy", "Visual product configuration with 2D, 3D and AR configurators, CPQ and commerce for products that need configuration, from product logic to purchase.", "ConfigX", "product", { app: "EVOQ ConfigX", category: "BusinessApplication" }),
  "/products/desk": P("EVOQ Desk — Support software without the upgrade traps", "Manage customer support tickets and requests in EVOQ Desk, a helpdesk built to grow with your team.", "Desk", "product", { app: "EVOQ Desk", category: "BusinessApplication" }),

  "/products/hrms": P("EVOQ HRMS — Organize everyday people operations", "Manage employee information and everyday HR operations in EVOQ HRMS, part of the EVOQ suite.", "HRMS", "product", { app: "EVOQ HRMS", category: "BusinessApplication" }),
  "/products/hrms/features": P("EVOQ HRMS features — Built for everyday HR operations", "Explore the capabilities of EVOQ HRMS, built around everyday HR operations.", "Features", "productPage"),

  "/products/inventory": P("EVOQ Inventory — Know what you have, keep business moving", "Track stock and supply information in EVOQ Inventory so you always know what you have and what to reorder.", "Inventory", "product", { app: "EVOQ Inventory", category: "BusinessApplication" }),
  "/products/inventory/features": P("EVOQ Inventory features — Stock, purchasing and fulfillment", "Explore EVOQ Inventory features: stock movement, purchasing and receiving, replenishment, orders and fulfillment, serial, batch and barcode tracking, and reports.", "Features", "productPage"),
  "/products/inventory/pricing": P("EVOQ Inventory pricing — Plans that grow with you", "Compare EVOQ Inventory plans and pick the one that fits your business.", "Pricing", "productPage"),

  "/products/projects": P("EVOQ Projects — Plan, coordinate and execute work", "Plan, coordinate and execute work across teams with EVOQ Projects, keeping activities and responsibilities organized in one place.", "Projects", "product", { app: "EVOQ Projects", category: "BusinessApplication" }),
  "/products/projects/features": P("EVOQ Projects features — Built for operational execution", "Explore the capabilities of EVOQ Projects, built to support operational execution across teams.", "Features", "productPage"),

  "/products/serviceops": P("EVOQ ServiceOps — Close field jobs on time, every time", "ServiceOps is the field service app that keeps technicians assigned, dispatched and on the move, with a clear history for every job.", "ServiceOps", "product", { app: "EVOQ ServiceOps", category: "BusinessApplication" }),
  "/products/skillberry": P("EVOQ Skillberry — Turn what you know into a programme", "Build and sell learning programmes with EVOQ Skillberry: courses, coaching, workshops and training in one place.", "Skillberry", "product", { app: "EVOQ Skillberry", category: "EducationalApplication" }),

  "/products/sync": P("EVOQ Sync — Connect, integrate, automate", "EVOQ Sync turns scattered, manual data movement into a single, reliable flow between your CRM, ERP, ecommerce and other systems.", "Sync", "product", { app: "EVOQ Sync", category: "BusinessApplication" }),
  "/products/sync/features": P("EVOQ Sync features — Sync data the smart way", "Explore EVOQ Sync features for connecting CRM, ERP, ecommerce and business apps with reliable, automated data flows.", "Features", "productPage"),
  "/products/sync/pricing": P("EVOQ Sync pricing — Build your integration", "Select any two apps, choose your sync direction and see instant EVOQ Sync pricing.", "Pricing", "productPage"),

  "/products/billing": P("EVOQ Billing — Invoicing, payments and revenue", "EVOQ Billing brings invoicing, payments, tax compliance and revenue tracking together with the rest of your EVOQ suite.", "Billing", "product", { app: "EVOQ Billing", category: "FinanceApplication" }),
  "/products/billing/features": P("EVOQ Billing features — Invoicing, payments and tax", "Explore EVOQ Billing features: invoicing, product catalog, payments, tax compliance, workflow automation and financial insight.", "Features", "productPage"),
  "/products/billing/pricing": P("EVOQ Billing pricing — Simple, transparent plans", "Compare EVOQ Billing plans, choose monthly or yearly billing and pick your currency.", "Pricing", "productPage"),

  "/solutions": P("EVOQ Solutions — Built for the way your industry operates", "Explore EVOQ solutions for healthcare, construction, engineering and real estate, manufacturing, field service, facilities and maintenance, and hospitality, travel and F&B.", "Solutions", "collection"),
  "/industries": P("EVOQ for your industry — Products that fit your needs", "EVOQ products can work individually or together to support your operations, from customer relationships and project delivery to inventory, service and billing.", "All Industries", "collection"),
  "/solutions/healthcare": P("EVOQ Healthcare — Manage operations, grow patient relationships", "Manage patients, appointments, providers, billing and everyday operations while keeping every patient interaction in context.", "Healthcare", "solution"),
  "/solutions/healthcare/crm": P("EVOQ Healthcare CRM — Every patient interaction in context", "Keep patient conversations, relationships and activities connected from the first enquiry to every follow-up.", "Healthcare CRM", "solution"),
  "/solutions/healthcare/crm/features": P("EVOQ Healthcare CRM features — Enquiries to engagement", "Everything your team needs to manage patient relationships: enquiries, follow-ups, communication and engagement in one connected workspace.", "Features", "solution"),
  "/solutions/healthcare/practice-management": P("EVOQ Healthcare Practice Management — Keep your practice moving", "Manage patients, appointments, providers, visits, services and daily practice activity from a workspace that keeps the day organized.", "Practice Management", "solution"),
  "/solutions/construction": P("EVOQ for Construction, Engineering & Real Estate", "EVOQ products support project coordination, client relationships and commercial processes across construction, engineering and real estate organizations.", "Construction, Engineering & Real Estate", "solution"),
  "/solutions/field-service": P("EVOQ for Field Service, Facilities & Maintenance", "EVOQ products support service requests, technicians, parts and follow-up across field service, facilities management and maintenance operations.", "Field Service, Facilities & Maintenance", "solution"),
  "/solutions/hospitality": P("EVOQ for Hospitality, Travel & F&B", "From the first enquiry to the service that brings customers back, EVOQ products support the customer-facing and operational work behind each hospitality experience.", "Hospitality, Travel & F&B", "solution"),
  "/solutions/finance": P("EVOQ for Financial Services — Build stronger financial relationships", "EVOQ products support client relationships, service requests and internal coordination across banking and lending, insurance and brokerages, and wealth management and financial advisory.", "Financial Services", "solution"),
  "/solutions/manufacturing": P("EVOQ for Manufacturing — From product enquiry to the field", "Manage the commercial and operational work around your products, from complex configuration and quoting to delivery and service.", "Manufacturing", "solution"),

  "/privacy-policy": P("Privacy Policy — EVOQ", "Read how EVOQ collects, uses, discloses and protects your information, how long we keep it, and the rights you have over your data.", "Privacy Policy", "legal"),
  "/cookie-policy": P("Cookie Policy — EVOQ", "Learn what cookies are, which types EVOQ uses, how third-party cookies work and how to manage your cookie choices.", "Cookie Policy", "legal"),
  "/cookie-preferences": P("Cookie Preferences — EVOQ", "Manage your cookie choices for EVOQ. See the types of cookies we use, how we use them and how to change your consent.", "Cookie Preferences", "legal"),
};

const abs = (p: string) => (p === "/" ? SITE.url : `${SITE.url}${p}`);

export function pageMeta(path: string): Metadata {
  const pg = PAGES[path];
  if (!pg) throw new Error(`No SEO entry for ${path}`);
  const url = abs(path);
  return {
    title: { absolute: pg.title },
    description: pg.description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: SITE.locale,
      url,
      title: pg.title,
      description: pg.description,
      images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: `${SITE.name} — ${SITE.tagline}` }],
    },
    twitter: { card: "summary_large_image", title: pg.title, description: pg.description, images: [SITE.ogImage] },
  };
}

const ORG_ID = `${SITE.url}/#organization`;
const SITE_ID = `${SITE.url}/#website`;

export const organizationSchema = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE.legalName,
  url: SITE.url,
  logo: { "@type": "ImageObject", url: abs(SITE.logo) },
  slogan: SITE.tagline,
};

export const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    organizationSchema,
    { "@type": "WebSite", "@id": SITE_ID, url: SITE.url, name: SITE.name, publisher: { "@id": ORG_ID }, inLanguage: "en" },
  ],
};

function crumbs(path: string) {
  const parts = path.split("/").filter(Boolean);
  const items = [{ name: PAGES["/"].crumb, item: SITE.url }];
  let cur = "";
  for (const seg of parts) {
    cur += "/" + seg;
    if (PAGES[cur]) items.push({ name: PAGES[cur].crumb, item: abs(cur) });
  }
  return items;
}

function parentOf(path: string): string | null {
  const parts = path.split("/").filter(Boolean);
  while (parts.length > 1) {
    parts.pop();
    const p = "/" + parts.join("/");
    if (PAGES[p]) return p;
  }
  return null;
}

export function pageSchema(path: string) {
  const pg = PAGES[path];
  const url = abs(path);
  const crumbList = {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: crumbs(path).map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: c.item })),
  };
  const base = { "@id": `${url}#webpage`, url, name: pg.title, description: pg.description, inLanguage: "en", isPartOf: { "@id": SITE_ID }, publisher: { "@id": ORG_ID }, breadcrumb: { "@id": crumbList["@id"] } };
  const graph: Record<string, unknown>[] = [crumbList];
  const parent = parentOf(path);

  if (pg.kind === "collection") {
    const depth = path.split("/").filter(Boolean).length;
    const children = Object.keys(PAGES).filter((p) => p !== path && p.startsWith(path + "/") && p.split("/").filter(Boolean).length === depth + 1);
    const list = children.length
      ? { mainEntity: { "@type": "ItemList", itemListElement: children.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: PAGES[c].crumb, url: abs(c) })) } }
      : {};
    graph.push({ ...base, "@type": "CollectionPage", ...list });
  } else if (pg.kind === "product") {
    graph.push({ ...base, "@type": "WebPage", about: { "@id": `${url}#software` } });
    graph.push({ "@type": "SoftwareApplication", "@id": `${url}#software`, name: pg.app, description: pg.description, url, applicationCategory: pg.category ?? "BusinessApplication", operatingSystem: "Web", publisher: { "@id": ORG_ID } });
  } else if (pg.kind === "productPage" && parent) {
    graph.push({ ...base, "@type": "WebPage", isPartOf: { "@id": `${abs(parent)}#webpage` }, about: { "@id": `${abs(parent)}#software` } });
  } else if (pg.kind === "solution") {
    graph.push({ ...base, "@type": "WebPage", isPartOf: { "@id": `${parent ? abs(parent) : SITE.url + "/solutions"}#webpage` } });
  } else if (pg.kind === "home") {
    graph.push({ ...base, "@type": "WebPage", url: SITE.url, "@id": `${SITE.url}/#webpage`, about: { "@id": ORG_ID } });
  } else if (path === "/about") {
    graph.push({ ...base, "@type": "AboutPage", about: { "@id": ORG_ID } });
  } else if (path === "/contact") {
    graph.push({ ...base, "@type": "ContactPage" });
  } else {
    graph.push({ ...base, "@type": "WebPage" });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

const json = (d: unknown) => JSON.stringify(d).replace(/</g, "\\u003c");

export function PageJsonLd({ path }: { path: string }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json(pageSchema(path)) }} />;
}

export function SiteJsonLd() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json(siteSchema) }} />;
}
