/* EVOQ Sync v1: palette, the 32 app catalog and shared copy data. App facts (objects, sign in methods, events) are
   taken from the Sync app's own catalog (src/data.js) so the site and the product say the same thing. */

export const SYNC_BASE = "/products/sync-v1";
export const IMG = "/sync-v1";

/* Grape, with lime as a small signal */
export const C = {
  depth: "#2E1065",
  primary: "#7E22CE",
  action: "#A855F7",
  hover: "#C084FC",
  soft: "#E9D5FF",
  tint: "#F3E8FF",
  surface: "#FAF5FF",
  lime: "#A3E635",
  limeInk: "#1A2E05",
  limeDeep: "#4D7C0F",
  ink: "#1C1530",
  body: "#4A4458",
  muted: "#756E85",
  line: "#E7E3EE",
  g1: "#F7F6FA",
  ok: "#16A34A",
  warn: "#D97706",
  err: "#DC2626",
};

export type Cat = "CRM" | "ERP" | "Accounting" | "eCommerce" | "Inventory" | "Marketing" | "Productivity" | "Other";
export type App = { id: string; name: string; cat: Cat; color: string; objects: string[]; auth: string[]; events: boolean; soon?: boolean };

export const APPS: App[] = [
  { id: "hubspot", name: "HubSpot", cat: "CRM", color: "#ff7a59", auth: ["OAuth 2.0", "Private app token"], objects: ["Customer", "Contact", "Deal", "Product"], events: true },
  { id: "salesforce", name: "Salesforce", cat: "CRM", color: "#00a1e0", auth: ["OAuth 2.0"], objects: ["Customer", "Contact", "Opportunity", "Product"], events: true },
  { id: "pipedrive", name: "Pipedrive", cat: "CRM", color: "#1a1a1a", auth: ["OAuth 2.0", "API key"], objects: ["Customer", "Contact", "Deal"], events: true },
  { id: "copper", name: "Copper", cat: "CRM", color: "#f57c00", auth: ["OAuth 2.0", "API key"], objects: ["Customer", "Contact", "Opportunity"], events: true },
  { id: "insightly", name: "Insightly", cat: "CRM", color: "#f25b29", auth: ["API key"], objects: ["Customer", "Contact", "Opportunity"], events: true },
  { id: "zohocrm", name: "Zoho CRM", cat: "CRM", color: "#e42527", auth: ["OAuth 2.0"], objects: ["Customer", "Contact", "Deal"], events: true },
  { id: "dynamics", name: "Dynamics 365", cat: "CRM", color: "#0b6a4b", auth: ["OAuth 2.0"], objects: ["Customer", "Contact", "Opportunity"], events: false, soon: true },
  { id: "netsuite", name: "NetSuite", cat: "ERP", color: "#1f3b5c", auth: ["Token based (TBA)", "OAuth 2.0"], objects: ["Customer", "Product", "Sales Order", "Invoice", "Payment", "Inventory"], events: false },
  { id: "sap", name: "SAP Business One", cat: "ERP", color: "#0a6ed1", auth: ["Service layer session"], objects: ["Customer", "Product", "Sales Order", "Invoice", "Inventory"], events: false },
  { id: "odoo", name: "Odoo", cat: "ERP", color: "#714b67", auth: ["API key"], objects: ["Customer", "Product", "Sales Order", "Invoice", "Inventory"], events: false },
  { id: "acumatica", name: "Acumatica", cat: "ERP", color: "#e8590c", auth: ["OAuth 2.0"], objects: ["Customer", "Product", "Sales Order", "Invoice"], events: false },
  { id: "exactonline", name: "Exact Online", cat: "ERP", color: "#e30613", auth: ["OAuth 2.0"], objects: ["Customer", "Product", "Sales Order", "Invoice", "Payment", "Inventory"], events: true },
  { id: "quickbooks", name: "QuickBooks", cat: "Accounting", color: "#2ca01c", auth: ["OAuth 2.0"], objects: ["Customer", "Invoice", "Payment", "Product"], events: true },
  { id: "xero", name: "Xero", cat: "Accounting", color: "#13b5ea", auth: ["OAuth 2.0"], objects: ["Customer", "Invoice", "Payment"], events: true },
  { id: "sage", name: "Sage", cat: "Accounting", color: "#00d639", auth: ["OAuth 2.0"], objects: ["Customer", "Invoice", "Payment", "Product"], events: false },
  { id: "zohobooks", name: "Zoho Books", cat: "Accounting", color: "#c8202f", auth: ["OAuth 2.0"], objects: ["Customer", "Invoice", "Payment"], events: false },
  { id: "stripe", name: "Stripe", cat: "Accounting", color: "#635bff", auth: ["API key", "OAuth 2.0"], objects: ["Customer", "Invoice", "Payment", "Product"], events: true },
  { id: "shopify", name: "Shopify", cat: "eCommerce", color: "#5a863e", auth: ["OAuth 2.0", "Admin API token"], objects: ["Customer", "Product", "Order", "Inventory", "Refund"], events: true },
  { id: "woocommerce", name: "WooCommerce", cat: "eCommerce", color: "#7f54b3", auth: ["API key and secret"], objects: ["Customer", "Product", "Order", "Inventory"], events: true },
  { id: "magento", name: "Magento", cat: "eCommerce", color: "#ee672f", auth: ["Integration token"], objects: ["Customer", "Product", "Order", "Inventory"], events: false },
  { id: "bigcommerce", name: "BigCommerce", cat: "eCommerce", color: "#121118", auth: ["API account token"], objects: ["Customer", "Product", "Order"], events: true },
  { id: "adobecommerce", name: "Adobe Commerce", cat: "eCommerce", color: "#fa0f00", auth: ["Integration token", "OAuth 2.0"], objects: ["Customer", "Product", "Order", "Inventory"], events: true },
  { id: "cin7", name: "Cin7", cat: "Inventory", color: "#00a3a1", auth: ["API key"], objects: ["Product", "Inventory", "Sales Order"], events: false },
  { id: "katana", name: "Katana", cat: "Inventory", color: "#f26b3a", auth: ["API key"], objects: ["Product", "Inventory"], events: false },
  { id: "mailchimp", name: "Mailchimp", cat: "Marketing", color: "#f5b800", auth: ["OAuth 2.0", "API key"], objects: ["Contact", "Customer"], events: true },
  { id: "klaviyo", name: "Klaviyo", cat: "Marketing", color: "#222222", auth: ["Private API key"], objects: ["Contact", "Customer"], events: true },
  { id: "sheets", name: "Google Sheets", cat: "Productivity", color: "#188038", auth: ["OAuth 2.0"], objects: ["Row"], events: false },
  { id: "slack", name: "Slack", cat: "Productivity", color: "#4a154b", auth: ["OAuth 2.0"], objects: ["Message"], events: true },
  { id: "monday", name: "monday.com", cat: "Productivity", color: "#ff3d57", auth: ["OAuth 2.0", "API token"], objects: ["Item", "Contact"], events: true },
  { id: "zendesk", name: "Zendesk", cat: "Other", color: "#03363d", auth: ["OAuth 2.0", "API token"], objects: ["Customer", "Contact", "Ticket"], events: true },
  { id: "tableau", name: "Tableau", cat: "Other", color: "#e97627", auth: ["Personal access token"], objects: ["Dataset"], events: false },
  { id: "powerbi", name: "Power BI", cat: "Other", color: "#f2c811", auth: ["OAuth 2.0"], objects: ["Dataset"], events: false },
];

export const APP = (id: string) => APPS.find((a) => a.id === id)!;
export const CATS: Cat[] = ["CRM", "ERP", "Accounting", "eCommerce", "Inventory", "Marketing", "Productivity", "Other"];
export const CAT_LABEL: Record<Cat, string> = { CRM: "CRM", ERP: "ERP", Accounting: "Accounting", eCommerce: "eCommerce", Inventory: "Inventory", Marketing: "Marketing", Productivity: "Productivity", Other: "Support and BI" };

/* PNG marks for apps simple-icons does not carry */
export const IMAGE_MARKS: Record<string, string> = {
  pipedrive: `${IMG}/logos/pipedrive.png`, dynamics: `${IMG}/logos/dynamics.png`, netsuite: `${IMG}/logos/netsuite.png`, klaviyo: `${IMG}/logos/klaviyo.png`,
  acumatica: `${IMG}/logos/acumatica.png`, cin7: `${IMG}/logos/cin7.png`, exactonline: `${IMG}/logos/exactonline.png`, copper: `${IMG}/logos/copper.png`,
  insightly: `${IMG}/logos/insightly.png`, monday: `${IMG}/logos/monday.png`,
};

/* The terms the category uses, mapped to what EVOQ Sync actually does. Only capabilities the product has today. */
export const KEYWORDS: { k: string; what: string; href: string }[] = [
  { k: "iPaaS", what: "Integration platform as a service for the CRM, ERP, accounting and shop apps you run", href: "#apps" },
  { k: "Integration and orchestration", what: "Triggers, data steps, rules and app actions chained on a canvas", href: "features#builder" },
  { k: "Workflow builder", what: "Node library, canvas, Run Test and an Enabled switch", href: "features#builder" },
  { k: "Data mapping", what: "Field pairs, transformations, required field checks and a record preview", href: "features#mapping" },
  { k: "Sync in both directions", what: "Per field direction with a conflict policy you set in advance", href: "#two-way" },
  { k: "Custom API connection", what: "Any REST API, with base URL, authentication and a test call", href: "features#connections" },
  { k: "Middleware integration", what: "Sits between your apps, so no app has to know about the others", href: "features#integrations" },
  { k: "Monitoring and error queue", what: "Every execution, failed records grouped by cause, connection alerts", href: "features#monitoring" },
  { k: "AI companion", what: "EVI reads the screen you are on and explains, guides and prepares", href: "#evi" },
  { k: "Agent governance", what: "Seven capabilities, each with a scope and a switch, plus an autonomy policy", href: "#control" },
  { k: "Audit history", what: "Every request, proposal and decision with the person and the time", href: "features#settings" },
  { k: "Templates", what: "Common app pairs ready to adjust instead of starting blank", href: "features#wizard" },
];
