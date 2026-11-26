/* Healthcare main page v1: the solutions content (docs/healthcare-fix-plan.md).
   Descriptions use only what the product pages state. Booking is named Bookings throughout. */

export const C = {
  BLUE: "#2064B6", CYAN: "#18B8D1", MINT: "#6DCCC3", NAVY: "#31465A", DEEP: "#102A43", MIST: "#F1F5F7",
  INK: "#1F2A37", SOFT: "#5B6470", LINE: "#E2E8EC", TINT: "#F4F8FB",
};

const I = (f: string) => `/billing/images/${f}`;
export const ICON: Record<string, string> = {
  CRM: I("crm-menu-icn.png"), Billing: I("billing-menu-icn.png"), Campaigns: I("campaigns-menu-icn.png"),
  Sync: I("sync-menu-icn.png"), Bookings: "/logos/bookings-icon.svg", "EVOQ AI": "/ai/ai-logo-icon.png",
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

const P = (f: string) => `/healthcare/stock/${f}`;

export const PANELS: Panel[] = [
  {
    key: "clinics", tab: "Clinics and specialty practices", sub: "Appointments, providers and visits",
    on: "#2064B6", from: "#2064B6", to: "#0B2A4F", glow: "rgba(150,200,250,.5)",
    photo: P("care-clinics-2.jpg"), pos: "50% 40%",
    title: "Fill the schedule, follow up the patient, bill the visit.",
    lead: "Appointments, enquiries and invoices for clinics and specialty practices.",
    audiences: [
      ["For clinics", "Provider schedules, appointments and visit details kept with the patient's record."],
      ["For specialty practices", "Referrals and follow ups tracked from the first enquiry to the return visit."],
    ],
    cards: [
      { name: "Appointments and providers", desc: "Provider schedules and appointments for the day, with visit details recorded by the provider.", products: ["Practice Management"] },
      { name: "Online booking", desc: "Patients pick an open slot on a booking page, with provider availability, reminders, deposits and waitlists.", products: ["Bookings"] },
      { name: "Enquiries and follow ups", desc: "Enquiries and referrals recorded with the conversation and the next step, so follow ups have a named owner.", products: ["CRM"] },
      { name: "Invoices and payments", desc: "Invoices raised for visits and payments recorded against them, with overdue invoices followed up.", products: ["Billing"] },
    ],
  },
  {
    key: "dental", tab: "Dental practices", sub: "Appointments, recall and billing",
    on: "#0E8FA5", from: "#0E8FA5", to: "#06303A", glow: "rgba(150,230,240,.5)",
    photo: P("care-dental-2.jpg"), pos: "50% 40%",
    title: "Book the chair, follow up the recall, bill the visit.",
    lead: "Appointments, patient follow ups and billing for dental practices.",
    audiences: [
      ["For practice managers", "Appointments, providers and follow ups listed in one place."],
      ["For front desk teams", "Bookings, reminders and invoices handled from the same patient record."],
    ],
    cards: [
      { name: "Appointments, providers and visits", desc: "Appointments organized by provider, with visit details and treatments recorded against the patient.", products: ["Practice Management"] },
      { name: "Patient follow ups", desc: "Recalls and follow ups assigned with a due date, so patients who are due back are not missed.", products: ["CRM"] },
      { name: "Online booking", desc: "Patients book an open slot online, with reminders and deposits where you use them.", products: ["Bookings"] },
      { name: "Billing", desc: "Invoices and payments for treatments, with overdue invoices followed up.", products: ["Billing"] },
      { name: "Reminders and campaigns", desc: "Email and SMS reminders and campaigns to patient segments, with results tracked.", products: ["Campaigns"] },
    ],
  },
  {
    key: "aesthetics", tab: "Aesthetics and wellness", sub: "Consultations, treatments and return visits",
    on: "#2F8A7F", from: "#2F8A7F", to: "#0C2F2B", glow: "rgba(160,230,215,.5)",
    photo: P("care-aesthetics.jpg"), pos: "50% 35%",
    title: "Convert the consultation, plan the treatments, bring patients back.",
    lead: "Enquiries, appointments and return visits for aesthetics and wellness practices.",
    audiences: [
      ["For aesthetics clinics", "Enquiry to consultation to treatment tracked on the patient's record."],
      ["For wellness and spa teams", "Memberships, rewards and feedback that keep patients coming back."],
    ],
    cards: [
      { name: "Enquiries and consultations", desc: "Enquiries from several channels recorded with the conversation, then moved to a consultation.", products: ["CRM"] },
      { name: "Appointments and treatments", desc: "Appointments and treatments organized by provider, with visit details recorded for each session.", products: ["Practice Management"] },
      { name: "Online booking", desc: "Patients book consultations and sessions online, with reminders and deposits where you use them.", products: ["Bookings"] },
      { name: "Campaigns to returning patients", desc: "Email and SMS campaigns to segments, with opens and replies tracked.", products: ["Campaigns"] },
      { name: "Feedback after a visit", desc: "Feedback requested after a visit, so a follow up starts from what the patient said.", products: ["Surveys"] },
      { name: "Rewards, memberships and tiers", desc: "Loyalty rewards, memberships and tiers for returning patients.", products: ["Loyalty"] },
    ],
  },
  {
    key: "hospitals", tab: "Hospitals, networks and multi-location groups", sub: "Referrals, schedules and locations",
    on: "#31465A", from: "#3A546C", to: "#0C1B2A", glow: "rgba(160,190,220,.5)",
    photo: P("care-hospitals-2.jpg"), pos: "50% 40%",
    title: "Route the referral, schedule the provider, run many locations.",
    lead: "Referrals, schedules and patient follow ups across departments and locations.",
    audiences: [
      ["For hospital administrators", "Referrals and enquiries tracked to the first appointment, with provider schedules alongside."],
      ["For networks and multi-location groups", "Practices and locations run on the same patient and appointment records."],
    ],
    cards: [
      { name: "Referrals and enquiries", desc: "Referrals and enquiries from departments and locations recorded with the conversation and the next step.", products: ["CRM"] },
      { name: "Schedules and providers", desc: "Provider schedules and appointments coordinated across departments and locations.", products: ["Practice Management"] },
      { name: "Online booking", desc: "Patients book open slots online, with provider availability and reminders.", products: ["Bookings"] },
      { name: "Health data standards and privacy", desc: "HL7, FHIR and APIs for exchanging health information, with privacy and data protection requirements checked against your organization. Details are in the section below.", products: [] },
    ],
  },
  {
    key: "diagnostics", tab: "Diagnostic centres", sub: "Referrals, tests and repeat visits",
    on: "#5B4BD5", from: "#5B4BD5", to: "#1A1450", glow: "rgba(200,190,250,.5)",
    photo: P("care-diagnostics-2.jpg"), pos: "50% 40%",
    title: "Track the referral, book the test, remind for the repeat.",
    lead: "Referrals, test bookings and patient follow ups for diagnostic centres.",
    audiences: [
      ["For centre managers", "Referrals and enquiries tracked until the test is booked and paid."],
      ["For front desk teams", "Slots, reminders and invoices handled from the patient's record."],
    ],
    cards: [
      { name: "Enquiries and doctor referrals", desc: "Enquiries and referrals recorded with the source, the conversation and the next step, until the test is booked.", products: ["CRM"] },
      { name: "Online booking of tests and collection slots", desc: "Patients pick an open slot online, with reminders where you use them.", products: ["Bookings"] },
      { name: "Reminders for repeat tests", desc: "Email and SMS reminders and follow ups to patients due for a repeat test.", products: ["Campaigns"] },
      { name: "Invoices and payments", desc: "Invoices raised and payments recorded, with overdue invoices followed up.", products: ["Billing"] },
      { name: "Feedback after a visit", desc: "Feedback requested after a visit, so the centre sees what patients say.", products: ["Surveys"] },
    ],
  },
];

export const STANDARDS = [
  { key: "interop", title: "Interoperability", tags: ["HL7", "FHIR", "APIs"], desc: "Support standards-based exchange of healthcare information across connected applications and systems.", ink: "#1777F0", tile: "#E6F0FD", border: "#BFD9F7" },
  { key: "privacy", title: "Privacy & security", tags: ["HIPAA", "DPDP", "UAE PDPL"], desc: "Support applicable privacy and data-protection requirements according to the organization, location, and deployment.", ink: "#0FA3BC", tile: "#DDF6F8", border: "#B5E6EE" },
  { key: "ecosystems", title: "Digital health ecosystems", tags: ["ABDM", "NABIDH", "Riayati", "Malaffi"], desc: "Support relevant digital-health and health-information exchange requirements where applicable to the organization and deployment.", ink: "#5B4BD5", tile: "#ECE8FB", border: "#D3CCF5" },
];

export const TOOLS = [
  { name: "Google Calendar", src: "googlecalendar", bg: "#E8F1FA" },
  { name: "Google Meet", src: "googlemeet", bg: "#E7F7F5" },
  { name: "Stripe", src: "stripe", bg: "#EDECFE" },
  { name: "WhatsApp", src: "whatsapp", bg: "#E3F8EA" },
  { name: "Google Analytics", src: "googleanalytics", bg: "#FDF0DE" },
  { name: "WooCommerce", src: "woocommerce", bg: "#F0EAFA" },
  { name: "Shopify", src: "shopify", bg: "#EEF6E4" },
];
