/* Home Solutions section: the EVOQ apps in each industry solution, and the sample board each one fills.
   App lists follow each industry's own solution page. Names, records and statuses are sample data.
   Voice rules: no dashes or hyphens, no "one", no unsupported claims. */

export type AppKey =
  | "crm" | "campaigns" | "configx" | "serviceops" | "projects" | "desk" | "hrms" | "skillberry"
  | "billing" | "inventory" | "bookings" | "sync" | "ai"
  | "practice" | "booking-engine" | "surveys" | "loyalty";

/* Apps with a logo in the shared badge set use it (`badge`); the rest get a glyph tile. */
export const APPS: Record<AppKey, { name: string; badge?: string; glyph?: string; tint?: string }> = {
  crm: { name: "CRM", badge: "crm" },
  campaigns: { name: "Campaigns", badge: "campaigns" },
  configx: { name: "ConfigX", badge: "configx" },
  serviceops: { name: "ServiceOps", badge: "serviceops" },
  projects: { name: "Projects", badge: "projects" },
  desk: { name: "Desk", badge: "desk" },
  hrms: { name: "HRMS", badge: "hrms" },
  skillberry: { name: "Skillberry", badge: "skillberry" },
  billing: { name: "Billing", badge: "billing" },
  inventory: { name: "Inventory", badge: "inventory" },
  bookings: { name: "Bookings", badge: "bookings" },
  sync: { name: "Sync", badge: "sync" },
  ai: { name: "EVOQ AI", badge: "ai" },
  practice: { name: "Practice Management", glyph: "M6 3v6a4 4 0 0 0 8 0V3M10 13v2a5 5 0 0 0 10 0v-1M20 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4z", tint: "#0F766E" },
  "booking-engine": { name: "Booking Engine", glyph: "M7 3v3M17 3v3M4 9h16M5.5 5h13A1.5 1.5 0 0 1 20 6.5v12a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5v-12A1.5 1.5 0 0 1 5.5 5z", tint: "#0E8FA5" },
  surveys: { name: "Surveys", glyph: "M4 5h16v11H9l-5 4V5zM8 9h8M8 12h5", tint: "#7C4DDB" },
  loyalty: { name: "Loyalty", glyph: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z", tint: "#D9468F" },
};

/* A board row: the app, what it covers, the status it leaves on each record ("!" marks one that still needs
   a person), and the step EVI reports for it. */
export type AppRow = { app: AppKey; job: string; cells: [string, string, string]; step: string };

export type Solution = {
  key: string; tab: string; name: string;
  lead: string; accent: string; desc: string;
  href: string; cta: string;
  color: string; soft: string; btn?: string;
  place: string; records: [string, string, string];
  person: string; request: string; done: string;
  rows: AppRow[];
};

export const SOLUTIONS: Solution[] = [
  {
    key: "healthcare", tab: "Healthcare", name: "Healthcare",
    lead: "Referrals, visits and follow ups. ", accent: "Seven apps share the patient journey.",
    desc: "Each app takes a part of the journey, from the first referral to the return visit. Start with the apps your practice needs and add the others when you are ready.",
    href: "/solutions/healthcare", cta: "Explore healthcare",
    color: "#0F766E", soft: "#DDF5F0",
    place: "Brightwell Clinic · Friday", records: ["Sarah J.", "Omar K.", "Lena P."],
    person: "mia", request: "Get Friday's patients ready", done: "Ready for your review",
    rows: [
      { app: "crm", job: "Referrals", cells: ["Referred", "Referred", "Enquiry"], step: "Referrals checked" },
      { app: "booking-engine", job: "Appointments", cells: ["Fri 10:00", "Fri 11:30", "Fri 14:00"], step: "Slots confirmed" },
      { app: "practice", job: "Visits and notes", cells: ["Notes ready", "Notes ready", "!Intake due"], step: "Notes prepared" },
      { app: "campaigns", job: "Reminders", cells: ["Drafted", "Drafted", "Drafted"], step: "Reminders drafted" },
      { app: "surveys", job: "Feedback", cells: ["Queued", "Queued", "Queued"], step: "Surveys queued" },
      { app: "loyalty", job: "Return visits", cells: ["6 visits", "2 visits", "New"], step: "Visits counted" },
      { app: "billing", job: "Invoices", cells: ["Paid", "Drafted", "!Claim due"], step: "Invoices drafted" },
    ],
  },
  {
    key: "manufacturing", tab: "Manufacturing", name: "Manufacturing",
    lead: "Quotes, orders, stock and service. ", accent: "Each team works in its own app.",
    desc: "Sales, planning, the warehouse and service each have an app for their stage of the order, from the first enquiry to the service visit after installation.",
    href: "/solutions/manufacturing", cta: "Explore manufacturing",
    color: "#2563EB", soft: "#DBEAFE",
    place: "Orders · October", records: ["Northgate", "Bluepeak", "Alder"],
    person: "marcus", request: "Where do this month's orders stand?", done: "Ready for your review",
    rows: [
      { app: "crm", job: "Enquiries", cells: ["Won", "Won", "!Open"], step: "Deals checked" },
      { app: "configx", job: "Quotes", cells: ["Q118", "Q121", "!Draft"], step: "Quotes matched" },
      { app: "inventory", job: "Stock", cells: ["Reserved", "Reserved", "!Low stock"], step: "Stock reserved" },
      { app: "projects", job: "Delivery", cells: ["Oct 9", "Oct 14", "Oct 20"], step: "Deliveries planned" },
      { app: "serviceops", job: "Service visits", cells: ["Booked", "Booked", "Planned"], step: "Visits planned" },
      { app: "desk", job: "Support", cells: ["Clear", "!1 open", "Clear"], step: "Tickets checked" },
      { app: "billing", job: "Invoices", cells: ["Invoiced", "Paid", "Drafted"], step: "Invoices drafted" },
    ],
  },
  {
    key: "hospitality", tab: "Hospitality, Travel & F&B", name: "Hospitality, Travel & F&B",
    lead: "Reservations, requests and repeat visits. ", accent: "An app for each part of the stay.",
    desc: "Hotels, restaurants and travel operators pick the apps they need, from the reservation and guest requests to the bill, the feedback and the offer for the next visit.",
    href: "/solutions/hospitality-travel-food-and-beverage", cta: "Explore hospitality",
    color: "#14532D", soft: "#F7F1E3",
    place: "The Terrace · Today", records: ["Elena R.", "James O.", "Tom B."],
    person: "sam", request: "Prepare today's arrivals", done: "Ready for your review",
    rows: [
      { app: "crm", job: "Guest profiles", cells: ["Returning", "New", "Returning"], step: "Profiles checked" },
      { app: "bookings", job: "Reservations", cells: ["Room 214", "Table 8", "Suite 3"], step: "Bookings confirmed" },
      { app: "desk", job: "Guest requests", cells: ["Noted", "!Late arrival", "Noted"], step: "Requests assigned" },
      { app: "inventory", job: "Supplies", cells: ["Stocked", "Stocked", "!Low"], step: "Supplies checked" },
      { app: "billing", job: "Bills", cells: ["Prepaid", "Open", "Prepaid"], step: "Bills opened" },
      { app: "surveys", job: "Feedback", cells: ["Queued", "Queued", "Queued"], step: "Surveys queued" },
      { app: "loyalty", job: "Rewards", cells: ["Gold", "Joined", "Silver"], step: "Rewards updated" },
      { app: "campaigns", job: "Offers", cells: ["Drafted", "Drafted", "Drafted"], step: "Offers drafted" },
    ],
  },
  {
    key: "field-service", tab: "Field Service, Facilities & Maintenance", name: "Field Service, Facilities & Maintenance",
    lead: "Requests, technicians, parts and invoices. ", accent: "On the same job.",
    desc: "The request is logged in Desk, dispatched in ServiceOps, the parts come from Inventory and the invoice from Billing. Skillberry keeps technician certifications current.",
    href: "/solutions/field-service-facilities-maintenance", cta: "Explore field service",
    color: "#1777F0", soft: "#DBEAFE",
    place: "Today's jobs", records: ["WO1042", "WO1043", "WO1044"],
    person: "sam", request: "Plan today's jobs", done: "Waiting for your approval",
    rows: [
      { app: "desk", job: "Requests", cells: ["Leak", "Cooling", "Lift"], step: "Requests read" },
      { app: "serviceops", job: "Dispatch", cells: ["Arjun", "Priya", "!Unassigned"], step: "Technicians matched" },
      { app: "inventory", job: "Parts", cells: ["2 filters", "Valve", "!Order part"], step: "Parts reserved" },
      { app: "skillberry", job: "Certifications", cells: ["Certified", "Certified", "!Renew"], step: "Certifications checked" },
      { app: "billing", job: "Invoices", cells: ["On close", "On close", "On close"], step: "Invoices set up" },
    ],
  },
  {
    key: "finance", tab: "Financial Services", name: "Financial Services",
    lead: "Enquiries, requests and reviews. ", accent: "Answered in turn.",
    desc: "Advisers keep client records in CRM, service requests go through Desk, reviews are planned in Projects, and Campaigns and Surveys handle client updates and feedback.",
    href: "/solutions/financial-services", cta: "Explore financial services",
    color: "#1B7F8C", soft: "#E7F3EE", btn: "#0B2D4F",
    place: "Client reviews · This week", records: ["Harper", "Orion", "Brightpath"],
    person: "dana", request: "Get this week's client reviews ready", done: "Ready for your review",
    rows: [
      { app: "crm", job: "Clients", cells: ["Renewal", "New", "Active"], step: "Client records read" },
      { app: "desk", job: "Service requests", cells: ["Closed", "!Open", "Closed"], step: "Requests checked" },
      { app: "projects", job: "Reviews", cells: ["Thu", "Mon", "!To book"], step: "Reviews scheduled" },
      { app: "campaigns", job: "Client updates", cells: ["Drafted", "Drafted", "Drafted"], step: "Updates drafted" },
      { app: "surveys", job: "Feedback", cells: ["Replied", "Sent", "Replied"], step: "Feedback summarised" },
    ],
  },
  {
    key: "construction", tab: "Construction, Engineering & Real Estate", name: "Construction, Engineering & Real Estate",
    lead: "Bids, sites, crews and invoices. ", accent: "Run from the apps each team uses.",
    desc: "Bids are won in CRM, sites are planned in Projects, materials come from Inventory and crews from HRMS, and progress invoices go out from Billing.",
    href: "/solutions/construction-engineering-real-estate", cta: "Explore construction",
    color: "#B4533C", soft: "#F6E9E3",
    place: "Sites · This week", records: ["Tower B", "Riverside", "Elm Court"],
    person: "marcus", request: "Where do our sites stand this week?", done: "Ready for your review",
    rows: [
      { app: "crm", job: "Bids", cells: ["Won", "Won", "!Bid due"], step: "Bids checked" },
      { app: "projects", job: "Site plans", cells: ["Phase 2", "Phase 1", "Planning"], step: "Plans read" },
      { app: "inventory", job: "Materials", cells: ["Delivered", "!Short", "Ordered"], step: "Materials checked" },
      { app: "hrms", job: "Crews", cells: ["12 crew", "8 crew", "!Hiring"], step: "Crews counted" },
      { app: "skillberry", job: "Safety training", cells: ["Trained", "!2 due", "Trained"], step: "Training checked" },
      { app: "serviceops", job: "Site visits", cells: ["Tue", "Wed", "Fri"], step: "Visits booked" },
      { app: "desk", job: "Snags", cells: ["3 open", "Clear", "Clear"], step: "Snags listed" },
      { app: "billing", job: "Progress invoices", cells: ["Stage 2", "Stage 1", "Drafted"], step: "Invoices drafted" },
    ],
  },
  {
    key: "all", tab: "All industries", name: "All industries",
    lead: "Start with the apps your business needs. ", accent: "Add the rest as it grows.",
    desc: "EVOQ has solutions for six industries. For any other business, the apps combine around how you work, and EVI can point you to where to start.",
    href: "/industries", cta: "Explore all industries",
    color: "#4747E0", soft: "#EEEDFF",
    place: "EVOQ apps", records: ["", "", ""],
    person: "dana", request: "Which apps does a wholesale business need?", done: "Start with CRM, Inventory and Billing",
    rows: [],
  },
];

/* Every app, by team, for the "All industries" tab. The apps EVI suggests are listed in `PICK`. */
export const ALL_APPS: { team: string; apps: AppKey[] }[] = [
  { team: "Growth", apps: ["crm", "campaigns", "configx"] },
  { team: "Operations", apps: ["serviceops", "projects", "desk", "bookings"] },
  { team: "People", apps: ["hrms", "skillberry"] },
  { team: "Finance", apps: ["billing", "inventory"] },
  { team: "Platform and AI", apps: ["sync", "ai"] },
];
export const PICK: AppKey[] = ["crm", "inventory", "billing"];
export const ALL_STEPS = ["Wholesale needs read", "Stock and orders matched", "Starting apps suggested"];
