/* CRM v1 pricing content (docs/crm-v1-pricing-plan.md). The plans, prices, inclusions and comparison rows are the ones on the live
   pricing page, shown as they are. Annual billing is 15% below the monthly price, and a trial is not offered. */

export type RegionKey = "in" | "intl";

export const REGIONS: Record<RegionKey, { label: string; code: string; sym: string; pro: number; max: number }> = {
  in: { label: "India", code: "INR", sym: "₹", pro: 1200, max: 1900 },
  intl: { label: "International", code: "USD", sym: "$", pro: 18, max: 30 },
};

export const ANNUAL_OFF = 0.15;

export type Plan = {
  key: "pro" | "max" | "enterprise";
  name: string;
  fit: string;
  included: string[];
  limits: string[];
};

export const PLANS: Plan[] = [
  {
    key: "pro", name: "Pro", fit: "Best for startups and small teams getting started with a CRM.",
    included: ["Contact & Account Management", "Lead & Deal Management", "Task & Appointment Scheduling", "Email & Calendar Integration", "Basic Dashboards & Reports", "Role-based Access Control", "File & Document Management", "AI Assistant, 300 credits a month"],
    limits: ["100,000 CRM records", "2 GB storage"],
  },
  {
    key: "max", name: "Max", fit: "Best for growing teams that need automation and better visibility.",
    included: ["AI Assistant, 3,000 credits a month", "Workflow Automation", "Approval Workflows", "Sales Pipeline Management", "Inventory Management", "Quotes & Invoices", "Custom Reports & Dashboards", "Additional AI credit packs"],
    limits: ["500,000 CRM records", "10 GB storage"],
  },
  {
    key: "enterprise", name: "Enterprise", fit: "Best for enterprises with complex processes and advanced needs.",
    included: ["Advanced Sales Forecasting", "Lead Scoring & Auto Assignment", "Customer Segmentation", "AI-powered Insights & Win Probability", "Advanced CRM Customization", "Territory Management", "API Access", "Custom Integrations", "Priority Support", "Dedicated Customer Success Manager"],
    limits: ["1,000,000+ CRM records", "50 GB storage, expandable", "Custom AI credit allocation"],
  },
];

/* Y is included, - is not included, any other text is the value. Columns: Pro, Max, Enterprise. */
export type Row = [string, string, string, string];
export const COMPARE: { k: string; rows: Row[] }[] = [
  {
    k: "Sales",
    rows: [
      ["Contacts & Accounts", "Y", "Y", "Y"], ["Leads", "Y", "Y", "Y"], ["Deals", "Y", "Y", "Y"], ["Activities", "Y", "Y", "Y"],
      ["Tasks", "Y", "Y", "Y"], ["Calendar", "Y", "Y", "Y"], ["Products", "Y", "Y", "Y"], ["Price Books", "Y", "Y", "Y"],
      ["Quotes", "-", "Y", "Y"], ["Sales Orders", "-", "Y", "Y"], ["Invoices", "-", "Y", "Y"], ["Inventory", "-", "Y", "Y"],
      ["Territory Management", "-", "-", "Y"], ["Lead Scoring", "-", "-", "Y"], ["Sales Forecasting", "-", "-", "Y"],
    ],
  },
  {
    k: "Automation & AI",
    rows: [
      ["Workflow Automation", "Basic", "Advanced", "Advanced"], ["Approval Workflows", "-", "Y", "Y"], ["Assignment Rules", "Y", "Y", "Y"],
      ["AI Assistant", "300 credits", "3,000 credits", "Custom"], ["AI Credit Packs", "Optional", "Y", "Y"], ["AI Insights", "-", "-", "Y"], ["Win Probability", "-", "-", "Y"],
    ],
  },
  {
    k: "Analytics",
    rows: [
      ["Standard Reports", "Y", "Y", "Y"], ["Custom Reports", "-", "Y", "Y"], ["Dashboards", "Basic", "Advanced", "Executive"], ["Customer Segmentation", "-", "-", "Y"],
    ],
  },
  {
    k: "Customization",
    rows: [
      ["Custom Fields", "Y", "Y", "Y"], ["Custom Layouts", "Y", "Y", "Y"], ["Custom Modules", "Y", "Y", "Y"], ["Validation Rules", "Y", "Y", "Y"],
      ["API Access", "-", "-", "Y"], ["Custom Integrations", "-", "-", "Y"],
    ],
  },
  {
    k: "Security & Support",
    rows: [
      ["Role-based Permissions", "Y", "Y", "Y"], ["Email Support", "Y", "Y", "Y"], ["Chat Support", "Y", "Y", "Y"],
      ["Priority Support", "-", "-", "Y"], ["Dedicated Customer Success Manager", "-", "-", "Y"],
    ],
  },
  {
    k: "Limits",
    rows: [
      ["CRM Records", "100,000", "500,000", "1,000,000+"], ["Attachment Storage", "2 GB", "10 GB", "50 GB, expandable"],
      ["AI Credits a Month", "300", "3,000", "Custom"], ["Additional AI Credits", "Optional", "Available", "Available"],
    ],
  },
];

export const PRICE_FACTORS: { t: string; d: string; icon: string }[] = [
  { t: "Users", d: "Pricing is per user a month. Add or remove users at any time, and billing follows the active users.", icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" },
  { t: "Storage", d: "Attachment storage and CRM record limits come with the plan. Extra storage can be added as usage grows.", icon: "M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" },
  { t: "AI credit packs", d: "Each plan includes a monthly allowance of AI credits. Extra credit packs can be added without switching plans.", icon: "M13 2L4 14h7l-1 8 9-12h-7l1-8z" },
  { t: "Implementation", d: "Setup and onboarding are scoped around your stages, roles and data. The implementation page has the details.", icon: "M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-2.4 2.6-2.6z" },
];

export const FAQ: { q: string; a: string }[] = [
  { q: "How do I get started?", a: "Book a demo. We set up the CRM around a real deal and talk through the plan that fits your team." },
  { q: "Do I need to sign a long term contract?", a: "No. Plans are billed monthly or annually, and you can upgrade, downgrade or cancel at any time." },
  { q: "What does annual billing change?", a: "Annual billing takes 15% off the monthly price per user." },
  { q: "What happens when the team grows?", a: "Add or remove users at any time. Billing adjusts to the number of active users." },
  { q: "Can I move data from another CRM?", a: "Yes. Import tools handle CSV, Excel and JSON files, and onboarding support helps with the move." },
  { q: "What support is included?", a: "Plans include email and chat support. Enterprise adds priority support and a dedicated customer success manager." },
  { q: "Can I move between plans later?", a: "Yes. You can move between Pro, Max and Enterprise at any time, and your data, settings and history carry over." },
  { q: "What if I need more storage or AI credits?", a: "Extra storage and AI credit packs can be added as usage grows, without switching plans." },
];
