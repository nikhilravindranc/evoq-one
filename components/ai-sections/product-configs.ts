import type { ProductAIConfig } from "./ProductAISection";

/**
 * One config per EVOQ product. Copy a block to add a new product.
 * All names, numbers and dates are PLACEHOLDER demo content: replace with
 * product-accurate examples before release.
 */

const learnMore = { label: "Explore EVOQ AI", href: "/ai" };
const demo = { label: "Book a Demo", href: "/contact" };

/* ------------------------------------------------------------------- CRM */
export const crmAI: ProductAIConfig = {
  id: "ai-in-crm",
  eyebrow: "AI in EVOQ CRM",
  title: "Follow up faster, with EVI and AI agents.",
  lead: "Find the deals that need attention. Prepare the next step. Keep every customer moving.",
  body: "EVI, the EVOQ AI assistant, helps your team find stalled deals, overdue follow-ups, and customer history, and prepares the next step. AI agents handle defined tasks such as drafting follow-ups and updating records, then return the result for your review.",
  primaryCta: demo,
  secondaryCta: learnMore,
  visualSide: "left",
  accent: "#2F6BFF",
  window: {
    logo: "/evoq-ai/apps/crm.png",
    title: "Pipeline",
    subtitle: "12 open deals · $1.24M",
    action: "New deal",
    layout: "board",
    columns: [
      { name: "Lead", dot: "#8A94A6", items: [{ title: "Acme Corp.", meta: "$24k" }, { title: "Summit Labs", meta: "$18k" }] },
      { name: "Qualified", dot: "#2F6BFF", items: [{ title: "Beta Inc.", meta: "$52k", tag: "9 days idle", flag: true }, { title: "Orion Foods", meta: "$31k" }] },
      { name: "Proposal", dot: "#7A5AF8", items: [{ title: "Northgate Logistics", meta: "$74k", tag: "12 days idle", flag: true }, { title: "Halo Health", meta: "$27k" }] },
      { name: "Negotiation", dot: "#0E9F6E", items: [{ title: "Vertex Retail", meta: "$41k", tag: "8 days idle", flag: true }, { title: "Kite Energy", meta: "$63k" }] },
    ],
  },
  scenes: [
    {
      question: "Which deals have gone quiet?",
      answer: "**4 deals** have had no activity for 7+ days, worth **$182,400**. Northgate Logistics is the largest.",
      agent: "Follow-up agent",
      steps: [{ text: "4 deals reviewed", done: true }, { text: "4 follow-ups drafted", done: true }, { text: "2 need your approval", done: false }],
      placeholder: "Ask EVI about a deal or customer…",
    },
    {
      question: "What should I focus on this week?",
      answer: "**3 proposals** are waiting on a reply and **2 renewals** close within 14 days. Beta Inc. is the most urgent.",
      agent: "Pipeline agent",
      steps: [{ text: "12 open deals scanned", done: true }, { text: "Priorities ranked", done: true }, { text: "1 renewal needs a call", done: false }],
      placeholder: "Ask EVI what to do next…",
    },
    {
      question: "Draft a follow-up for Northgate Logistics.",
      answer: "**Draft ready:** a short check-in on the proposal sent on Sept 24, with the pricing summary attached.",
      agent: "Follow-up agent",
      steps: [{ text: "Account history reviewed", done: true }, { text: "Email drafted", done: true }, { text: "Awaiting your approval", done: false }],
      placeholder: "Ask EVI to prepare something…",
    },
  ],
};

/* ------------------------------------------------------------- ServiceOps */
export const serviceOpsAI: ProductAIConfig = {
  id: "ai-in-serviceops",
  eyebrow: "AI in EVOQ ServiceOps",
  title: "Keep every visit on schedule, with EVI and AI agents.",
  lead: "Spot at-risk work orders. Match the right technician. Keep customers informed.",
  body: "EVI, the EVOQ AI assistant, helps your team find work orders at risk, technician availability, and service history, and prepares the next step. AI agents handle defined tasks such as dispatch suggestions and customer updates, then return the result for your review.",
  primaryCta: demo,
  secondaryCta: learnMore,
  visualSide: "right",
  accent: "#0E9F6E",
  window: {
    logo: "/evoq-ai/apps/serviceops.png",
    title: "Work orders",
    subtitle: "24 open · 3 at risk",
    action: "New order",
    layout: "board",
    columns: [
      { name: "Open", dot: "#8A94A6", items: [{ title: "WO-1042 HVAC", meta: "Northgate", tag: "No technician", flag: true }, { title: "WO-1043 Boiler", meta: "Halo Health" }] },
      { name: "Scheduled", dot: "#2F6BFF", items: [{ title: "WO-1038 Chiller", meta: "Tomorrow 9:00" }, { title: "WO-1039 Panel", meta: "Tomorrow 11:30" }] },
      { name: "In progress", dot: "#7A5AF8", items: [{ title: "WO-1031 Pump", meta: "Ravi K.", tag: "SLA in 2h", flag: true }, { title: "WO-1033 Fan", meta: "Maya S." }] },
      { name: "Completed", dot: "#0E9F6E", items: [{ title: "WO-1027 Valve", meta: "Today" }, { title: "WO-1024 Duct", meta: "Today" }] },
    ],
  },
  scenes: [
    {
      question: "Which visits are at risk today?",
      answer: "**3 visits** may miss their SLA. Two have no technician assigned and one is waiting on a part.",
      agent: "Dispatch agent",
      steps: [{ text: "24 work orders reviewed", done: true }, { text: "3 technicians matched", done: true }, { text: "1 reschedule needs approval", done: false }],
      placeholder: "Ask EVI about a work order…",
    },
    {
      question: "Who is free for an urgent job at 2 PM?",
      answer: "**Ravi K.** and **Maya S.** are free from 1:30 PM. Ravi is 12 minutes from the site.",
      agent: "Dispatch agent",
      steps: [{ text: "Schedules checked", done: true }, { text: "Travel time estimated", done: true }, { text: "Awaiting your assignment", done: false }],
      placeholder: "Ask EVI who is available…",
    },
  ],
};

/* ------------------------------------------------------------------- Desk */
export const deskAI: ProductAIConfig = {
  id: "ai-in-desk",
  eyebrow: "AI in EVOQ Desk",
  title: "Answer the right ticket first, with EVI and AI agents.",
  lead: "Sort what is urgent. Draft the reply. Resolve more with less effort.",
  body: "EVI, the EVOQ AI assistant, helps your team find urgent tickets, related history, and suggested answers, and prepares the next step. AI agents handle defined tasks such as triage and reply drafts, then return the result for your review.",
  primaryCta: demo,
  secondaryCta: learnMore,
  visualSide: "left",
  accent: "#F26A21",
  window: {
    logo: "/evoq-ai/apps/desk.png",
    title: "Tickets",
    subtitle: "38 open · 5 urgent",
    action: "New ticket",
    layout: "board",
    columns: [
      { name: "New", dot: "#2F6BFF", items: [{ title: "Login failure", meta: "Orion Foods", tag: "Urgent", flag: true }, { title: "Invoice question", meta: "Acme Corp." }] },
      { name: "Open", dot: "#7A5AF8", items: [{ title: "Report export", meta: "Beta Inc.", tag: "2h to SLA", flag: true }, { title: "User access", meta: "Summit Labs" }] },
      { name: "Pending", dot: "#F59E0B", items: [{ title: "Data import", meta: "Kite Energy" }, { title: "API key", meta: "Vertex Retail" }] },
      { name: "Resolved", dot: "#0E9F6E", items: [{ title: "Password reset", meta: "Today" }, { title: "Billing address", meta: "Today" }] },
    ],
  },
  scenes: [
    {
      question: "What needs a reply first?",
      answer: "**5 tickets** are urgent. Two are close to their SLA, and **Orion Foods** has been waiting the longest.",
      agent: "Triage agent",
      steps: [{ text: "38 tickets sorted", done: true }, { text: "5 replies drafted", done: true }, { text: "2 need your review", done: false }],
      placeholder: "Ask EVI about a ticket…",
    },
    {
      question: "Draft a reply for the login failure.",
      answer: "**Draft ready:** steps to reset the session and a link to the status page, matched to similar resolved tickets.",
      agent: "Reply agent",
      steps: [{ text: "Similar tickets found", done: true }, { text: "Reply drafted", done: true }, { text: "Awaiting your approval", done: false }],
      placeholder: "Ask EVI to draft a reply…",
    },
  ],
};

/* --------------------------------------------------------------- Projects */
export const projectsAI: ProductAIConfig = {
  id: "ai-in-projects",
  eyebrow: "AI in EVOQ Projects",
  title: "Keep projects on track, with EVI and AI agents.",
  lead: "See what is slipping. Prepare the update. Free your team to deliver.",
  body: "EVI, the EVOQ AI assistant, helps your team find overdue tasks, blockers, and project status, and prepares the next step. AI agents handle defined tasks such as status updates and owner reminders, then return the result for your review.",
  primaryCta: demo,
  secondaryCta: learnMore,
  visualSide: "right",
  accent: "#7A5AF8",
  window: {
    logo: "/evoq-ai/apps/projects.png",
    title: "Sprint board",
    subtitle: "18 tasks · 4 overdue",
    action: "New task",
    layout: "board",
    columns: [
      { name: "To do", dot: "#8A94A6", items: [{ title: "Vendor contract", meta: "Due Fri" }, { title: "Test plan", meta: "Due Mon" }] },
      { name: "In progress", dot: "#2F6BFF", items: [{ title: "API integration", meta: "Due yesterday", tag: "Overdue", flag: true }, { title: "Dashboard UI", meta: "Due Thu" }] },
      { name: "Review", dot: "#7A5AF8", items: [{ title: "Release notes", meta: "Due Wed" }, { title: "Data migration", meta: "3 days late", tag: "Overdue", flag: true }] },
      { name: "Done", dot: "#0E9F6E", items: [{ title: "Kickoff deck", meta: "Done" }, { title: "Scope sign-off", meta: "Done" }] },
    ],
  },
  scenes: [
    {
      question: "What is behind schedule?",
      answer: "**4 tasks** are overdue. **Data migration** is blocking the release and has been in review for 3 days.",
      agent: "Status agent",
      steps: [{ text: "18 tasks reviewed", done: true }, { text: "Status update drafted", done: true }, { text: "2 reminders need approval", done: false }],
      placeholder: "Ask EVI about a project…",
    },
    {
      question: "Summarize this week for the stakeholders.",
      answer: "**Summary ready:** 11 tasks done, 4 overdue, and one risk flagged on the release date.",
      agent: "Status agent",
      steps: [{ text: "Progress compiled", done: true }, { text: "Summary written", done: true }, { text: "Awaiting your approval", done: false }],
      placeholder: "Ask EVI to prepare an update…",
    },
  ],
};

/* ---------------------------------------------------------------- Billing */
export const billingAI: ProductAIConfig = {
  id: "ai-in-billing",
  eyebrow: "AI in EVOQ Billing",
  title: "Get paid sooner, with EVI and AI agents.",
  lead: "Find overdue invoices. Prepare the follow-up. Keep cash flow healthy.",
  body: "EVI, the EVOQ AI assistant, helps your team find overdue invoices, payment history, and account context, and prepares the next step. AI agents handle defined tasks such as payment reminders and follow-up drafts, then return the result for your review.",
  primaryCta: demo,
  secondaryCta: learnMore,
  visualSide: "left",
  accent: "#0E9F6E",
  window: {
    logo: "/evoq-ai/apps/billing.png",
    title: "Invoices",
    subtitle: "$214,300 outstanding",
    action: "New invoice",
    layout: "list",
    rows: [
      { title: "INV-2041 Acme Corp.", meta: "Due Sept 12", value: "$12,400", tag: "14 days overdue", flag: true },
      { title: "INV-2044 Northgate Logistics", meta: "Due Sept 18", value: "$38,900", tag: "8 days overdue", flag: true },
      { title: "INV-2046 Beta Inc.", meta: "Due Sept 30", value: "$9,750", tag: "Due soon" },
      { title: "INV-2049 Halo Health", meta: "Due Oct 04", value: "$21,600", tag: "Sent" },
      { title: "INV-2050 Vertex Retail", meta: "Due Oct 09", value: "$15,300", tag: "Sent" },
      { title: "INV-2052 Kite Energy", meta: "Due Oct 15", value: "$63,000", tag: "Draft" },
    ],
  },
  scenes: [
    {
      question: "Which invoices are overdue?",
      answer: "**7 invoices** are overdue, worth **$96,350**. Northgate Logistics and Acme Corp. are the largest.",
      agent: "Collections agent",
      steps: [{ text: "7 invoices reviewed", done: true }, { text: "7 reminders drafted", done: true }, { text: "2 need your approval", done: false }],
      placeholder: "Ask EVI about an invoice…",
    },
    {
      question: "Prepare a reminder for Acme Corp.",
      answer: "**Draft ready:** a friendly reminder for INV-2041 with the payment link and the account contact.",
      agent: "Collections agent",
      steps: [{ text: "Payment history checked", done: true }, { text: "Reminder drafted", done: true }, { text: "Awaiting your approval", done: false }],
      placeholder: "Ask EVI to prepare a reminder…",
    },
  ],
};

/* -------------------------------------------------------------- Inventory */
export const inventoryAI: ProductAIConfig = {
  id: "ai-in-inventory",
  eyebrow: "AI in EVOQ Inventory",
  title: "Never run short, with EVI and AI agents.",
  lead: "Spot low stock early. Prepare the reorder. Keep operations moving.",
  body: "EVI, the EVOQ AI assistant, helps your team find low stock, slow movers, and supplier history, and prepares the next step. AI agents handle defined tasks such as reorder suggestions and supplier requests, then return the result for your review.",
  primaryCta: demo,
  secondaryCta: learnMore,
  visualSide: "right",
  accent: "#2F6BFF",
  window: {
    logo: "/evoq-ai/apps/inventory.png",
    title: "Stock levels",
    subtitle: "1,240 items · 8 below reorder",
    action: "Add item",
    layout: "list",
    rows: [
      { title: "SKU-1182 Hydraulic hose", meta: "Reorder at 40", value: "12 left", tag: "Low stock", flag: true },
      { title: "SKU-2204 Filter pack", meta: "Reorder at 60", value: "27 left", tag: "Low stock", flag: true },
      { title: "SKU-3317 Sensor kit", meta: "Reorder at 25", value: "88 left", tag: "In stock" },
      { title: "SKU-4120 Gasket set", meta: "Reorder at 50", value: "140 left", tag: "In stock" },
      { title: "SKU-5008 Cable reel", meta: "Reorder at 20", value: "9 left", tag: "Low stock", flag: true },
    ],
  },
  scenes: [
    {
      question: "What is below reorder level?",
      answer: "**8 items** are below reorder level. The **hydraulic hose** will run out in about 4 days.",
      agent: "Replenishment agent",
      steps: [{ text: "1,240 items scanned", done: true }, { text: "8 reorders prepared", done: true }, { text: "3 need your approval", done: false }],
      placeholder: "Ask EVI about stock…",
    },
    {
      question: "Which supplier should I use for filters?",
      answer: "**Delta Supply** has delivered the last 6 orders on time, at 4% below the average price.",
      agent: "Replenishment agent",
      steps: [{ text: "Supplier history reviewed", done: true }, { text: "Order drafted", done: true }, { text: "Awaiting your approval", done: false }],
      placeholder: "Ask EVI about a supplier…",
    },
  ],
};

/* ------------------------------------------------------------------- HRMS */
export const hrmsAI: ProductAIConfig = {
  id: "ai-in-hrms",
  eyebrow: "AI in EVOQ HRMS",
  title: "Make every day-one smoother, with EVI and AI agents.",
  lead: "See who needs attention. Prepare the next step. Give your people time back.",
  body: "EVI, the EVOQ AI assistant, helps your team find upcoming joiners, pending requests, and policy answers, and prepares the next step. AI agents handle defined tasks such as onboarding checklists and request reminders, then return the result for your review.",
  primaryCta: demo,
  secondaryCta: learnMore,
  visualSide: "left",
  accent: "#7A5AF8",
  window: {
    logo: "/logos/hrms.png",
    title: "People",
    subtitle: "142 employees · 3 starting soon",
    action: "Add employee",
    layout: "list",
    rows: [
      { title: "Sophia Hale", meta: "Starts Mon · Sales", tag: "Onboarding open", flag: true },
      { title: "Daniel Cruz", meta: "Starts Mon · Support", tag: "Laptop pending", flag: true },
      { title: "Priya Nair", meta: "Leave request · 3 days", tag: "Awaiting manager" },
      { title: "Noah Brooks", meta: "Review due Friday", tag: "Scheduled" },
      { title: "Emily Carter", meta: "Probation ends Oct 14", tag: "On track" },
    ],
  },
  scenes: [
    {
      question: "Who starts next week?",
      answer: "**3 people** start on Monday. **2 have onboarding tasks open**, including a laptop that has not been ordered.",
      agent: "Onboarding agent",
      steps: [{ text: "3 joiners reviewed", done: true }, { text: "Checklists prepared", done: true }, { text: "1 order needs approval", done: false }],
      placeholder: "Ask EVI about your people…",
    },
    {
      question: "How many leave days does Priya have left?",
      answer: "**Priya** has **11 days** left this year. The 3-day request fits team coverage.",
      agent: "Leave agent",
      steps: [{ text: "Balance checked", done: true }, { text: "Coverage reviewed", done: true }, { text: "Awaiting manager approval", done: false }],
      placeholder: "Ask EVI about leave or policy…",
    },
  ],
};

export const productAIConfigs = {
  crm: crmAI,
  serviceops: serviceOpsAI,
  desk: deskAI,
  projects: projectsAI,
  billing: billingAI,
  inventory: inventoryAI,
  hrms: hrmsAI,
};
