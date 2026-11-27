/* Construction, Engineering & Real Estate: the solutions content (docs/construction-page-plan.md).
   Descriptions use only what the product pages and the product content state. */

export const C = {
  TERRA: "#B4533C", CLAY: "#7C2D1F", SAND: "#D6B88C", LSAND: "#E8D8BF", WARM: "#FAF7F2", BROWN: "#292524",
  CONCRETE: "#78716C", INK: "#1F2A37", SOFT: "#5B6470", LINE: "#E6E0D8", TINT: "#F7F1EA",
};

const I = (f: string) => `/billing/images/${f}`;
export const ICON: Record<string, string> = {
  CRM: I("crm-menu-icn.png"), Projects: I("evoq-projects-menu-icn.png"), Inventory: I("inventory-menu-icn.png"), Billing: I("billing-menu-icn.png"),
  Desk: I("desk-menu-icn.png"), Campaigns: I("campaigns-menu-icn.png"), ServiceOps: I("serviceops-icon.svg"), HRMS: I("hrms-menu-icn-new.png"),
  Skillberry: I("Skillberry-menu-icn.png"), ConfigX: I("ConfigX-menu-icn.png"), Sync: I("sync-menu-icn.png"), Bookings: "/logos/bookings-icon.svg",
  "EVOQ AI": "/ai/ai-logo-icon.png",
};

export type Card = { name: string; desc: string; products: string[] };

export type Panel = {
  key: string; tab: string; sub: string;
  on: string; from: string; to: string; glow: string;
  photo: string; pos: string;
  title: string; lead: string;
  audiences: [string, string][];
  cards: Card[];
};

const U = (id: string, w = 1400) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

export const PANELS: Panel[] = [
  {
    key: "construction", tab: "Construction companies and contractors", sub: "Projects, sites and handover",
    on: "#A2563B", from: "#FBF1EC", to: "#F2D9CE", glow: "rgba(180,83,60,.2)",
    photo: U("1778074762022-c33cc42f79ae"), pos: "50% 45%",
    title: "Coordinate the project, bill the milestones, hand over the site.",
    lead: "Tasks, client commitments, materials and invoices for contractors, from the tender to handover.",
    audiences: [
      ["For general contractors", "Project tasks, owners and progress tracked across sites, with client commitments and invoices alongside."],
      ["For specialist and fit-out contractors", "Quotes for configured work, site requests and handover tracked with the job."],
    ],
    cards: [
      { name: "Project coordination", desc: "Tasks, owners and milestones for the work on site, with progress listed by project.", products: ["Projects"] },
      { name: "Tender and client enquiries", desc: "Enquiries, opportunities, communications and follow ups for prospective and existing clients.", products: ["CRM"] },
      { name: "Quotes for configured work", desc: "Product options, pricing rules and approvals turned into accurate quotes for fit-outs, windows, doors and similar work.", products: ["ConfigX"] },
      { name: "Site requests and snags", desc: "Requests from clients and site teams logged, assigned with a named owner and tracked until closed.", products: ["Desk"] },
      { name: "Materials and stock", desc: "Stock and purchasing for materials, with reorder levels so sites do not run short.", products: ["Inventory"] },
      { name: "Milestone invoices and payments", desc: "Invoices raised at project milestones, with payments recorded and overdue invoices followed up.", products: ["Billing"] },
      { name: "Handover and maintenance", desc: "Work orders, equipment records with warranty, and service plans after handover.", products: ["ServiceOps"] },
      { name: "Site crew training", desc: "Employee records, with safety training and certifications assigned and tracked.", products: ["HRMS", "Skillberry"] },
    ],
  },
  {
    key: "engineering", tab: "Engineering firms", sub: "Consultancies and contractors",
    on: "#274B7A", from: "#EEF3F9", to: "#D5E1F0", glow: "rgba(39,75,122,.2)",
    photo: U("1774600166588-1db444bda799"), pos: "50% 40%",
    title: "Deliver the project, follow up the client, develop the team.",
    lead: "Technical deliverables, client commitments and people records for consultancies and engineering contractors.",
    audiences: [
      ["For engineering consultancies", "Project tasks, deadlines and owners tracked alongside client relationships and opportunities."],
      ["For engineering contractors", "Site activities, responsibilities and delivery milestones tracked, with stock and service visits where the work needs them."],
    ],
    cards: [
      { name: "Project delivery", desc: "Tasks, deadlines and owners for technical projects, with progress and open commitments listed by project.", products: ["Projects"] },
      { name: "Client relationships and proposals", desc: "Client enquiries, opportunities, follow ups and quotes.", products: ["CRM"] },
      { name: "Team records and learning", desc: "Employee records, with training and certifications assigned and tracked.", products: ["HRMS", "Skillberry"] },
      { name: "Client billing", desc: "Invoices raised at project milestones, with payments recorded against them.", products: ["Billing"] },
      { name: "Materials for contractors", desc: "Stock and purchasing for the materials used on site.", products: ["Inventory"] },
      { name: "Site service visits", desc: "Work orders and visits for service work, with equipment records and history.", products: ["ServiceOps"] },
    ],
  },
  {
    key: "agencies", tab: "Real estate agencies and brokers", sub: "Enquiries, viewings and follow up",
    on: "#2E5A47", from: "#EFF6F2", to: "#D5E8DD", glow: "rgba(46,90,71,.22)",
    photo: U("1758523671301-cf64a85d0d34"), pos: "50% 40%",
    title: "Follow up the enquiry, book the viewing, keep the buyer updated.",
    lead: "Enquiries, viewings and prospect communication for agencies and brokers.",
    audiences: [
      ["For sales agents and brokers", "Prospect records, viewings and next steps tracked until the deal closes."],
      ["For lettings and rental teams", "Enquiries, viewings and owner requests logged and assigned."],
    ],
    cards: [
      { name: "Property enquiries", desc: "Enquiries from several channels recorded with the prospect, the conversation and the next step.", products: ["CRM"] },
      { name: "Online booking of viewings", desc: "Prospects pick an open viewing slot on a booking page, with reminders where you use them.", products: ["Bookings"] },
      { name: "Prospect communication", desc: "Email and SMS campaigns to segments, with opens and replies tracked.", products: ["Campaigns"] },
      { name: "Feedback after a viewing", desc: "Feedback requested after a viewing, so a follow up starts from what the prospect said.", products: ["Surveys"] },
      { name: "Owner and tenant requests", desc: "Requests logged, assigned and tracked until they are closed.", products: ["Desk"] },
    ],
  },
  {
    key: "developers", tab: "Developers and builders", sub: "Launches, buyers and handover",
    on: "#7C2D1F", from: "#FAF1EA", to: "#EFD8CC", glow: "rgba(124,45,31,.18)",
    photo: U("1597026405082-eda9beae7513"), pos: "50% 50%",
    title: "Launch the project, follow the buyer, invoice and hand over.",
    lead: "Buyer enquiries, site visits, unit options, invoices and handover for developers and builders.",
    audiences: [
      ["For developers", "Buyer follow ups, communication and sales tasks recorded on the buyer's record."],
      ["For builders", "Build progress, snag requests and handover tracked alongside the buyer."],
    ],
    cards: [
      { name: "Buyer enquiries and follow up", desc: "Buyer enquiries, opportunities and follow ups, with the history on the buyer's record.", products: ["CRM"] },
      { name: "Launch campaigns", desc: "Email and SMS campaigns to prospects and buyers, with segments and results.", products: ["Campaigns"] },
      { name: "Site visit and show unit booking", desc: "Buyers book a site visit or a show unit slot online, with reminders.", products: ["Bookings"] },
      { name: "Unit layouts, finishes and options", desc: "Layouts, materials and finishes explored in 2D and 3D, then priced into a quote with approvals.", products: ["ConfigX"] },
      { name: "Buyer invoices and payments", desc: "Booking amounts, milestone invoices and payments recorded against the sale, with overdue payments followed up.", products: ["Billing"] },
      { name: "Build progress", desc: "Tasks, owners and progress for the build, listed by project.", products: ["Projects"] },
      { name: "Handover and snag requests", desc: "Requests after handover logged and assigned, with work orders and warranty records for repairs.", products: ["Desk", "ServiceOps"] },
    ],
  },
  {
    key: "operations", tab: "Property operations", sub: "Requests, upkeep and bookings",
    on: "#1F6F6B", from: "#EEF7F6", to: "#D2E9E6", glow: "rgba(31,111,107,.2)",
    photo: U("1722650362309-2f2fdffbfbf1"), pos: "50% 55%",
    title: "Assign the request, schedule the upkeep, open spaces for booking.",
    lead: "Occupier requests, maintenance, bookings and service charges for landlords and property managers.",
    audiences: [
      ["For landlords and owners", "Requests, maintenance and invoices tracked for the properties you own."],
      ["For property managers", "Occupier requests assigned and tracked across buildings and sites."],
    ],
    cards: [
      { name: "Occupier requests", desc: "Requests from occupiers and owners logged, assigned with a named owner and tracked until closed.", products: ["Desk"] },
      { name: "Work orders, assets and service plans", desc: "Work orders, equipment records with warranty and service history, and service plans that show work due in the next 30, 60 or 90 days.", products: ["ServiceOps"] },
      { name: "Room and equipment booking", desc: "Meeting rooms, halls, training rooms and equipment, with their own availability and rules, approvals, check in and utilization across locations.", products: ["Bookings"] },
      { name: "Amenity and venue booking", desc: "Courts, pools, halls and event venues open for online reservations, with rules for who can book and when.", products: ["Bookings"] },
      { name: "Service charge invoices", desc: "Invoices and payments for service charges and billable work, with overdue invoices followed up.", products: ["Billing"] },
      { name: "Contractors and vendors", desc: "Work assigned to contractors and service providers, with a named owner for the work.", products: ["ServiceOps"] },
    ],
  },
];

export const BANDS: { name: string; desc: string; products: string[] }[] = [
  { name: "Connected to your accounting and other systems", desc: "Where supported integrations are available, information can be shared with accounting and financial applications, CRM and customer communication systems, email and messaging services, payment providers, and ERP and inventory systems.", products: ["Sync"] },
  { name: "EVI and the agents prepare routine work for your approval", desc: "The Intake, Quote Follow-up and Collections agents draft and flag. A person sends, books or decides.", products: ["EVOQ AI", "CRM", "Billing"] },
];
