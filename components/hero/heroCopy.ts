/* Hero copy: the overview shown when the page opens, and one message per category.
   The category lines describe exactly what that tab's story on the right shows.
   Voice rules: no dashes or hyphens, no "one", no unsupported claims.
   `label` is the small line above the headline; `apps` are the apps in that category. */

export type HeroTab = "growth" | "operations" | "people" | "finance" | "platform" | "ai";
export type HeroView = "overview" | HeroTab;

export const HERO_COPY: Record<HeroView, { label: string; lead?: string; headline: string; text: string }> = {
  overview: {
    label: "EVOQ",
    lead: "Run every team on",
    headline: "apps built to work together.",
    text: "EVOQ brings sales, service, operations, people and finance into connected apps. EVI and AI agents prepare work from your records, and you choose how much they do on their own.",
  },
  growth: {
    label: "Growth · CRM, Campaigns, ConfigX",
    headline: "Know which deals need a follow up this week.",
    text: "CRM holds the open deals. Ask EVI, and an agent drafts the follow up emails for your review.",
  },
  operations: {
    label: "Operations · ServiceOps, Projects, Desk, Bookings",
    headline: "Find out why a ticket is stuck, and get the job booked.",
    text: "Desk holds the ticket and ServiceOps holds the technician schedule. EVI checks both, and an agent prepares the booking and the customer notice.",
  },
  people: {
    label: "People · HRMS, Skillberry",
    headline: "Set up a new hire's first week from a plain request.",
    text: "HRMS holds the profile, Skillberry the training and Projects the team board. An agent fills the week across all three.",
  },
  finance: {
    label: "Finance · Billing, Inventory",
    headline: "See what is overdue and send the reminders.",
    text: "Billing lists the overdue invoices and Inventory flags items below reorder level. An agent drafts a reminder for each customer.",
  },
  platform: {
    label: "Platform · Sync",
    headline: "Find out why records failed to sync, and fix them.",
    text: "Sync connects EVOQ apps with your existing systems. When orders fail to reach Inventory, an agent finds the cause, proposes a fix and tells you what still needs a person.",
  },
  ai: {
    label: "EVOQ AI · EVI and agents",
    headline: "Ask about a customer and see where each answer came from.",
    text: "EVI answers from the records in your EVOQ apps and shows its sources. For each agent you choose the approval mode, from asking before every action to running automatically.",
  },
};

/* The auto tour: the overview first, then each category, then back to the overview.
   Dwell times in milliseconds; each story runs about 9 seconds. */
export const TOUR: HeroView[] = ["overview", "growth", "operations", "people", "finance", "platform", "ai"];
export const DWELL_MS: Record<HeroView, number> = {
  overview: 12000, // arrival, then the spotlight visits all six
  growth: 12500,
  operations: 12500,
  people: 12500,
  finance: 12500,
  platform: 12500,
  ai: 12500,
};
