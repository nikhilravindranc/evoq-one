/* Data for the /integrations directory: categories, EVOQ products, and
   the integration list itself. Kept separate from IntegrationsPage.tsx
   so the (fairly long) data literal doesn't bury the component logic. */

export type CategoryKey =
  | "all"
  | "accounting-finance"
  | "commerce-payments"
  | "communication"
  | "erp-business"
  | "marketing"
  | "productivity"
  | "shipping-logistics"
  | "customer-data"
  | "other";

export const CATEGORIES: { key: CategoryKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "accounting-finance", label: "Accounting & Finance" },
  { key: "commerce-payments", label: "Commerce & Payments" },
  { key: "communication", label: "Communication" },
  { key: "erp-business", label: "ERP & Business Systems" },
  { key: "marketing", label: "Marketing" },
  { key: "productivity", label: "Productivity & Collaboration" },
  { key: "shipping-logistics", label: "Shipping & Logistics" },
  { key: "customer-data", label: "Customer & Data" },
  { key: "other", label: "Other" },
];

// Ink color per category, used for the integration lettermark badge and
// the category tag on each card. Deliberately distinct from the EVOQ
// product brand colors (ProductBadge.tsx) even where a hue is similar —
// the two color scales label different things and are rarely read side
// by side, so a near-duplicate hue isn't actually confusing in practice.
export const CATEGORY_INK: Record<CategoryKey, string> = {
  all: "#667085",
  "accounting-finance": "#0E8C82",
  "commerce-payments": "#DB2777",
  communication: "#4747E0",
  "erp-business": "#7C3AED",
  marketing: "#F5A123",
  productivity: "#2554EB",
  "shipping-logistics": "#0E9F6E",
  "customer-data": "#0E8C9E",
  other: "#667085",
};

export type ProductKey =
  | "crm"
  | "campaigns"
  | "serviceops"
  | "desk"
  | "projects"
  | "sync"
  | "hrms"
  | "skillberry"
  | "inventory"
  | "billing"
  | "booking"
  | "loyalty"
  | "surveys";

export const PRODUCTS: { key: ProductKey; label: string }[] = [
  { key: "crm", label: "CRM" },
  { key: "campaigns", label: "Campaigns" },
  { key: "serviceops", label: "ServiceOps" },
  { key: "desk", label: "Desk" },
  { key: "projects", label: "Projects" },
  { key: "sync", label: "Sync" },
  { key: "hrms", label: "HRMS" },
  { key: "skillberry", label: "Skillberry" },
  { key: "inventory", label: "Inventory" },
  { key: "billing", label: "Billing" },
  { key: "booking", label: "Booking" },
  { key: "loyalty", label: "Loyalty" },
  { key: "surveys", label: "Surveys" },
];

export const PRODUCT_LABEL: Record<ProductKey, string> = Object.fromEntries(
  PRODUCTS.map((p) => [p.key, p.label])
) as Record<ProductKey, string>;

// Products without a real logo asset in ProductBadge.tsx yet -- the
// integrations page falls back to a lettermark for these instead of an
// <Image>, see IntegrationBadge/ProductChip in IntegrationsPage.tsx.
export const PRODUCT_INK: Record<ProductKey, string> = {
  crm: "#2554EB",
  desk: "#0E8C82",
  hrms: "#1B7A4D",
  skillberry: "#E94E77",
  serviceops: "#F5A123",
  campaigns: "#6D4FEB",
  sync: "#0E9F6E",
  projects: "#6D4FEB",
  inventory: "#0E8C9E",
  billing: "#7C6EF0",
  booking: "#EA580C",
  loyalty: "#DB2777",
  surveys: "#0D9488",
};

export type Integration = {
  slug: string;
  name: string;
  categories: CategoryKey[];
  products: ProductKey[] | "all";
  /** Uses "{p}" as a placeholder for whichever product is in view. */
  blurb: string;
};

// products: "all" integrations that connect to virtually anything (Zapier,
// webhooks, ...) match every product filter rather than needing all
// thirteen keys spelled out.
export const INTEGRATIONS: Integration[] = [
  // Accounting & Finance
  { slug: "quickbooks", name: "QuickBooks", categories: ["accounting-finance"], products: ["billing", "inventory", "crm"], blurb: "Sync invoices and payments between {p} and QuickBooks." },
  { slug: "xero", name: "Xero", categories: ["accounting-finance"], products: ["billing", "inventory", "crm"], blurb: "Keep {p} and Xero books in sync automatically." },
  { slug: "zoho-books", name: "Zoho Books", categories: ["accounting-finance"], products: ["billing", "crm"], blurb: "Push {p} invoices straight into Zoho Books." },
  { slug: "tally", name: "Tally", categories: ["accounting-finance"], products: ["billing", "inventory"], blurb: "Reconcile {p} records against your Tally ledgers." },
  { slug: "freshbooks", name: "FreshBooks", categories: ["accounting-finance"], products: ["billing", "crm"], blurb: "Turn {p} activity into FreshBooks invoices." },
  { slug: "wave", name: "Wave Accounting", categories: ["accounting-finance"], products: ["billing"], blurb: "Send {p} billing data to Wave for bookkeeping." },

  // Commerce & Payments
  { slug: "shopify", name: "Shopify", categories: ["commerce-payments"], products: ["crm", "inventory", "billing", "loyalty"], blurb: "Sync customer and commerce data with {p}." },
  { slug: "woocommerce", name: "WooCommerce", categories: ["commerce-payments"], products: ["crm", "inventory", "billing"], blurb: "Bring WooCommerce orders into {p}." },
  { slug: "razorpay", name: "Razorpay", categories: ["commerce-payments"], products: ["crm", "billing"], blurb: "Bring payment information into your {p} workflows." },
  { slug: "stripe", name: "Stripe", categories: ["commerce-payments"], products: ["crm", "billing"], blurb: "Reconcile Stripe payments against {p} records." },
  { slug: "paypal", name: "PayPal", categories: ["commerce-payments"], products: ["billing", "crm"], blurb: "Track PayPal transactions inside {p}." },
  { slug: "paytm", name: "Paytm", categories: ["commerce-payments"], products: ["billing", "crm"], blurb: "Match Paytm payouts to {p} invoices." },

  // Communication
  { slug: "whatsapp-business", name: "WhatsApp Business", categories: ["communication"], products: ["crm", "desk", "serviceops"], blurb: "Manage customer communication alongside {p}." },
  { slug: "slack", name: "Slack", categories: ["communication"], products: ["crm", "desk", "projects", "hrms"], blurb: "Get {p} updates and alerts directly in Slack." },
  { slug: "gmail", name: "Gmail", categories: ["communication"], products: ["crm", "desk", "campaigns"], blurb: "Log and send Gmail messages from {p}." },
  { slug: "outlook", name: "Outlook", categories: ["communication"], products: ["crm", "desk", "hrms"], blurb: "Keep Outlook mail and calendar in step with {p}." },
  { slug: "twilio", name: "Twilio", categories: ["communication"], products: ["crm", "desk", "serviceops"], blurb: "Send SMS and calls from {p} through Twilio." },
  { slug: "zoom", name: "Zoom", categories: ["communication"], products: ["hrms", "projects", "crm", "booking"], blurb: "Schedule and log Zoom meetings from {p}." },

  // ERP & Business Systems
  { slug: "sap-business-one", name: "SAP Business One", categories: ["erp-business"], products: ["sync", "inventory", "billing"], blurb: "Connect core SAP data with {p}." },
  { slug: "netsuite", name: "Oracle NetSuite", categories: ["erp-business"], products: ["sync", "inventory", "billing"], blurb: "Keep NetSuite and {p} records aligned." },
  { slug: "dynamics-365", name: "Microsoft Dynamics 365", categories: ["erp-business"], products: ["sync", "crm", "inventory"], blurb: "Bridge Dynamics 365 and {p} in real time." },
  { slug: "odoo", name: "Odoo", categories: ["erp-business"], products: ["sync", "inventory", "billing", "projects"], blurb: "Mirror Odoo modules against {p}." },
  { slug: "sage-intacct", name: "Sage Intacct", categories: ["erp-business"], products: ["sync", "billing"], blurb: "Sync financial data between Sage Intacct and {p}." },

  // Marketing
  { slug: "mailchimp", name: "Mailchimp", categories: ["marketing"], products: ["campaigns", "crm"], blurb: "Sync Mailchimp audiences with {p} contacts." },
  { slug: "hubspot-marketing", name: "HubSpot Marketing", categories: ["marketing"], products: ["campaigns", "crm"], blurb: "Bring HubSpot campaign activity into {p}." },
  { slug: "meta-ads", name: "Meta Ads", categories: ["marketing"], products: ["campaigns"], blurb: "Turn Meta Ads leads into {p} activity." },
  { slug: "google-ads", name: "Google Ads", categories: ["marketing"], products: ["campaigns"], blurb: "Track Google Ads performance from {p}." },
  { slug: "linkedin-ads", name: "LinkedIn Ads", categories: ["marketing"], products: ["campaigns"], blurb: "Capture LinkedIn Ads leads directly in {p}." },
  { slug: "klaviyo", name: "Klaviyo", categories: ["marketing"], products: ["campaigns", "crm"], blurb: "Keep Klaviyo segments in sync with {p}." },
  { slug: "smile-io", name: "Smile.io", categories: ["marketing", "commerce-payments"], products: ["loyalty", "campaigns", "crm"], blurb: "Run loyalty rewards from {p} through Smile.io." },

  // Productivity & Collaboration
  { slug: "google-workspace", name: "Google Workspace", categories: ["productivity", "communication"], products: ["crm", "desk", "projects", "hrms", "sync", "booking", "surveys"], blurb: "Connect {p} with Google Workspace." },
  { slug: "microsoft-365", name: "Microsoft 365", categories: ["productivity"], products: ["crm", "desk", "projects", "hrms", "sync"], blurb: "Connect {p} with Microsoft 365." },
  { slug: "notion", name: "Notion", categories: ["productivity"], products: ["projects", "hrms"], blurb: "Mirror {p} records as Notion pages." },
  { slug: "trello", name: "Trello", categories: ["productivity"], products: ["projects"], blurb: "Keep Trello boards aligned with {p}." },
  { slug: "asana", name: "Asana", categories: ["productivity"], products: ["projects"], blurb: "Sync tasks between Asana and {p}." },
  { slug: "calendly", name: "Calendly", categories: ["productivity"], products: ["crm", "hrms", "serviceops", "booking"], blurb: "Book meetings from {p} through Calendly." },

  // Shipping & Logistics
  { slug: "shiprocket", name: "Shiprocket", categories: ["shipping-logistics"], products: ["inventory", "serviceops"], blurb: "Track Shiprocket shipments from {p}." },
  { slug: "fedex", name: "FedEx", categories: ["shipping-logistics"], products: ["inventory", "serviceops"], blurb: "Pull FedEx delivery status into {p}." },
  { slug: "dhl", name: "DHL Express", categories: ["shipping-logistics"], products: ["inventory", "serviceops"], blurb: "Sync DHL tracking with {p} orders." },
  { slug: "delhivery", name: "Delhivery", categories: ["shipping-logistics"], products: ["inventory", "serviceops"], blurb: "Bring Delhivery logistics data into {p}." },
  { slug: "blue-dart", name: "Blue Dart", categories: ["shipping-logistics"], products: ["inventory", "serviceops"], blurb: "Track Blue Dart deliveries from {p}." },
  { slug: "easypost", name: "EasyPost", categories: ["shipping-logistics"], products: ["inventory", "serviceops"], blurb: "Generate and track labels from {p} via EasyPost." },

  // Customer & Data
  { slug: "zendesk", name: "Zendesk", categories: ["customer-data"], products: ["desk", "crm"], blurb: "Bring Zendesk tickets into {p}." },
  { slug: "intercom", name: "Intercom", categories: ["customer-data"], products: ["desk", "crm"], blurb: "Sync Intercom conversations with {p}." },
  { slug: "segment", name: "Segment", categories: ["customer-data"], products: ["sync", "crm"], blurb: "Stream Segment events into {p}." },
  { slug: "google-analytics", name: "Google Analytics", categories: ["customer-data"], products: ["campaigns", "crm"], blurb: "Bring Google Analytics insights into {p}." },
  { slug: "mixpanel", name: "Mixpanel", categories: ["customer-data"], products: ["crm", "campaigns"], blurb: "Track product usage from {p} in Mixpanel." },
  { slug: "amplitude", name: "Amplitude", categories: ["customer-data"], products: ["crm", "campaigns"], blurb: "Send {p} events to Amplitude for analysis." },
  { slug: "typeform", name: "Typeform", categories: ["customer-data"], products: ["surveys", "crm"], blurb: "Turn Typeform responses into {p} records." },

  // Other
  { slug: "zapier", name: "Zapier", categories: ["other"], products: "all", blurb: "Connect {p} to thousands of apps through Zapier." },
  { slug: "make", name: "Make", categories: ["other"], products: "all", blurb: "Automate {p} workflows visually with Make." },
  { slug: "webhooks", name: "Webhooks", categories: ["other"], products: "all", blurb: "Push live {p} events to any endpoint you run." },
  { slug: "custom-api", name: "Custom API", categories: ["other"], products: "all", blurb: "Build your own integration on top of the {p} API." },
  { slug: "google-sheets", name: "Google Sheets", categories: ["other", "productivity"], products: ["sync", "inventory", "billing", "crm", "projects"], blurb: "Export {p} data to Google Sheets on a schedule." },
  { slug: "n8n", name: "n8n", categories: ["other"], products: "all", blurb: "Wire {p} into self-hosted n8n workflows." },
];

export function integrationSupportsProduct(i: Integration, product: ProductKey | "all"): boolean {
  if (product === "all") return true;
  return i.products === "all" || i.products.includes(product);
}

export function blurbFor(i: Integration, product: ProductKey | "all"): string {
  const p =
    product !== "all"
      ? PRODUCT_LABEL[product]
      : PRODUCT_LABEL[i.products === "all" ? "crm" : i.products[0]];
  return i.blurb.replace("{p}", p);
}
