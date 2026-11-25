/* Field Service, Facilities & Maintenance: the solutions content (docs/field-service-content.md).
   Descriptions use only what the product pages and the ServiceOps content state. */

export const C = {
  BLUE: "#1777F0", NAVY: "#0F3D75", AZURE: "#3B82F6", PALE: "#DBEAFE", ORANGE: "#F97316", BURNT: "#C2410C", POR: "#FFEDD5",
  CW: "#F8FAFC", INK: "#172033", SOFT: "rgba(23,32,51,.72)", LINE: "rgba(15,61,117,.16)", TINT: "#EEF4FC",
};

const I = (f: string) => `/billing/images/${f}`;
export const ICON: Record<string, string> = {
  ServiceOps: I("serviceops-icon.svg"), CRM: I("crm-menu-icn.png"), Inventory: I("inventory-menu-icn.png"), Billing: I("billing-menu-icn.png"),
  Desk: I("desk-menu-icn.png"), Projects: I("evoq-projects-menu-icn.png"), HRMS: I("hrms-menu-icn-new.png"), Campaigns: I("campaigns-menu-icn.png"),
  Skillberry: I("Skillberry-menu-icn.png"), Sync: I("sync-menu-icn.png"), Bookings: "/logos/bookings-icon.svg", "EVOQ AI": "/ai/ai-logo-icon.png",
};

export type Card = { name: string; desc: string; products: string[] };

export type Panel = {
  key: string; tab: string; sub: string; on: string; off: string;
  photo: string; pos: string;
  title: string; lead: string;
  audiences: [string, string][];
  cards: Card[];
};

const U = (id: string, w = 1400) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

export const PANELS: Panel[] = [
  {
    key: "field", tab: "Field service", sub: "Requests, dispatch and visits", on: C.BLUE, off: C.PALE,
    photo: U("1660330589827-da8ab7dd3c02"), pos: "50% 30%",
    title: "Log the request, send the technician, record the visit.",
    lead: "Requests, estimates, work orders and visits for service providers and internal field teams.",
    audiences: [
      ["For service providers", "Requests, estimates, work orders and visits tracked through to completion."],
      ["For internal field teams", "Work organized across sites and equipment locations, with records kept for follow-up."],
    ],
    cards: [
      { name: "Service requests", desc: "Requests from calls, email, the web form and the customer portal land in a shared inbox, ready to become work orders.", products: ["Desk", "ServiceOps"] },
      { name: "Online booking of service visits", desc: "Customers pick an open slot on a booking page, with reminders, deposits and waitlists where you use them.", products: ["Bookings"] },
      { name: "Estimate, dispatch and visit", desc: "A request becomes a work order and an estimate the customer approves from a private link. Dispatch ranks technicians for the job. Technicians work it on a phone, with checklists, photos, parts and a signature, even without signal.", products: ["ServiceOps"] },
    ],
  },
  {
    key: "facilities", tab: "Facilities management", sub: "Sites, work orders and bookings", on: C.NAVY, off: C.PALE,
    photo: U("1732395805034-e0bf859665e5"), pos: "50% 35%",
    title: "Assign the site work, record the inspection, open spaces for booking.",
    lead: "Requests, work orders, inspections and bookings for facilities providers and internal facilities teams.",
    audiences: [
      ["For facilities management providers", "Client-site work, service commitments and delivered work on record."],
      ["For internal facilities teams", "Occupant and department requests assigned and tracked across facilities."],
    ],
    cards: [
      { name: "Site requests", desc: "Requests from occupants, departments and site managers logged and assigned with a named owner.", products: ["Desk"] },
      { name: "Work, inspections and assignments", desc: "Work orders and inspections assigned to staff, contractors and service providers, with findings recorded and open work listed by site.", products: ["ServiceOps"] },
      { name: "Assets and service history by site", desc: "Equipment records and service history kept per building and location, so a returning issue shows what was done before.", products: ["ServiceOps"] },
      { name: "Room and equipment booking", desc: "Meeting rooms, halls, training rooms and equipment, with their own availability and rules, approvals, check in and utilization across locations.", products: ["Bookings"] },
      { name: "Amenity, court and venue booking", desc: "Courts, pools, halls and event venues open for online reservations, with rules for who can book and when.", products: ["Bookings"] },
    ],
  },
  {
    key: "maintenance", tab: "Equipment and asset maintenance", sub: "Planned and corrective work", on: C.BURNT, off: C.POR,
    photo: U("1748256086767-8974ee677f77"), pos: "60% 30%",
    title: "Schedule the servicing, repair the faults, keep the history by asset.",
    lead: "Planned servicing and corrective repairs for maintenance teams and asset-intensive organizations.",
    audiences: [
      ["For maintenance teams", "Planned servicing and corrective repairs recorded against each equipment item."],
      ["For asset-intensive organizations", "Maintenance activity visible across equipment and sites."],
    ],
    cards: [
      { name: "Assets, warranty and service history", desc: "Equipment records with make, model, serial number, warranty and status, plus history across sites and the next service.", products: ["ServiceOps"] },
      { name: "Planned and corrective maintenance", desc: "Service plans show work due in the next 30, 60 or 90 days and raise the work orders. Faults are recorded, assigned and tracked to completion.", products: ["ServiceOps"] },
      { name: "Job costs and margin", desc: "Labour, parts and other costs booked on a job show its margin. Profitability splits margin by job, customer, trade and technician.", products: ["ServiceOps", "Billing"] },
    ],
  },
];

/* The supporting solutions shared by the three areas */
export const COMMON: Card[] = [
  { name: "Parts and stock", desc: "Stock and purchasing for parts, with the parts used on a job recorded against it.", products: ["Inventory"] },
  { name: "Invoices and payments", desc: "Invoices and payments for billable service work, with overdue invoices followed up.", products: ["Billing"] },
  { name: "Customers and follow-up", desc: "Customer accounts, enquiries and follow-ups.", products: ["CRM"] },
  { name: "Installations and fit-outs", desc: "Installations, refurbishments and upgrades planned as projects, with tasks and owners.", products: ["Projects"] },
  { name: "Training and certifications", desc: "Employee records, with training assigned and tracked so new technicians start with the training they need.", products: ["HRMS", "Skillberry"] },
  { name: "Customer messages and feedback", desc: "Notifications to customers about visits and planned maintenance, and feedback requested after a job.", products: ["Campaigns", "Surveys", "ServiceOps"] },
];

export const BANDS: { name: string; desc: string; products: string[] }[] = [
  { name: "Connected to your accounting and other systems", desc: "Where supported integrations are available, service information can be shared with accounting and financial applications, CRM and customer communication systems, email and messaging services, payment providers, and ERP and inventory systems.", products: ["Sync"] },
  { name: "EVI and the agents prepare routine work for your approval", desc: "The Intake, Dispatch, Quote Follow-up and Collections agents draft and flag. A person sends, books or decides.", products: ["EVOQ AI", "ServiceOps"] },
];
