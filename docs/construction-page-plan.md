# Construction, Engineering & Real Estate: content fixes and solutions plan (for review)

Nothing is built. This follows the Field Service approach: audit the copy, analyse which EVOQ apps serve these buyers, then propose the solutions and the layout.

## 1. Content audit (every block checked)

| Block | Today | Verdict and fix |
|---|---|---|
| Hero H1 | Site progress, client commitments and billing milestones in one view. | "one view" is filler. "Billing milestones" is a claim to confirm (see section 5). Proposed: **Enquiries followed up, projects coordinated, properties maintained.** It covers all three sectors and follows the result-list heroes of the other solution pages. |
| Hero body | Follow a bid or property enquiry through project delivery, client commitments and billing milestones, then into service after handover. | Long, one sentence. Tighten after the H1 is chosen. |
| Hero buttons | Talk to an expert / Explore industries (goes to /industries) | The second button leaves the page. Change to **Explore the solutions**, which scrolls to the solutions section. |
| Section label and H2 | Industries / Construction, engineering and real estate, each with its own work. | "each". "Industries" is also the name of another site page. Label becomes **Solutions**. H2 proposed: **Project work, client follow up and property service, from enquiry to handover.** |
| Construction | Body: "Each needs an owner and a status the whole team can see." | "Each", "whole". |
| Engineering | Outcome: "Every task has an owner." | "Every". |
| Real estate | "Prospect records with every conversation", "Every request has an owner", "Buyer history in one record", "Each is logged…" | "every", "each", "one". |
| How products work together | Illustrative grouping caption: "An illustrative grouping of products, not a technical integration map." | A disclaimer caption, which we do not add to EVOQ visuals. Remove. The section is replaced (section 4). |
| FAQ | Six questions. Q1 and Q4 overlap. | Merge Q1 and Q4. Add questions on viewings and bookings, and on AI approval. |
| Closing | Start with the project, client or site process you want to improve first. | Long, "first". Proposed: **Start with how your enquiries, projects and site requests work today.** |
| Structure | Three sector chapters stacked on one long scroll, with a nested audience list inside Real Estate. | Inconsistent: three sectors but five buyer types. See section 3. |

## 2. What these buyers need, and what the site already offers

| Need | Buyer | EVOQ app and evidence on the site |
|---|---|---|
| Project tasks, owners, progress | Contractors, engineering firms, developers | **Projects.** "Plan and coordinate project tasks, responsibilities and delivery-related work." |
| Enquiries, opportunities, follow ups, quotes | All | **CRM.** Leads, contacts, deals, quote generation and approvals. |
| Prospect and buyer communication | Agencies, developers | **Campaigns.** Email and SMS campaigns to segments. |
| Property viewings and site visits booked online | Agencies, developers | **Bookings, Appointments.** Provider schedules, availability rules, reminders, deposits and waitlists. **Missing from the page today.** |
| Meeting rooms, halls, amenities and venues for managed properties | Property operations | **Bookings, Spaces and Facilities.** Spaces: rooms, halls and equipment with rules, approvals and check in. Facilities: courts, pools, halls and venues. **Missing today.** |
| Client and occupier requests, snags | Contractors, property operations | **Desk.** Tickets and requests tracked to resolution. |
| Handover and maintenance: work orders, asset records, warranty, service plans, contractors | Contractors, developers, property operations | **ServiceOps.** Asset records with warranty and next service, 30, 60 and 90 day service plans, work orders, partners. |
| Materials, stock, purchasing | Contractors, engineering contractors | **Inventory.** |
| Invoices and payments | All | **Billing.** Invoicing, payments, tax compliance, workflow automation. |
| Crew records, training, certifications | Contractors, engineering firms | **HRMS and Skillberry.** |
| Feedback after a viewing or a visit | Agencies, property operations | **Surveys.** Feedback requested after an event. **Missing today.** |
| Configurable unit options, finishes and quotes | Developers, builders, fit-out and building-product contractors | **ConfigX.** The microsite page: 2D and 3D configurators with dimensions, layouts, materials and finishes, CPQ with pricing rules, discounts and approvals, and commerce. "Building products" and "Furniture and interiors" are two of its named industries. **Missing today.** |
| Accounting and ERP link | All | **Sync.** Where supported integrations exist. **Missing today.** |
| Routine work prepared for approval | All | **EVOQ AI.** EVI and agents that draft and flag, with a person deciding. **Missing today.** |

Apps on the page today: Projects, CRM, Inventory, Billing, ServiceOps, Desk, Campaigns, HRMS and Skillberry. **Apps to add: Bookings (Appointments, Spaces, Facilities), ConfigX, Surveys, Sync and EVOQ AI.**

## 3. Proposed solutions: five buyer tabs

The page names five buyers in its own enquiry form, so the tabs follow them. Each tab is a different prospect with a different day.

| Tab | Solutions (product) |
|---|---|
| **Construction companies and contractors** | Project coordination (Projects); tender and client enquiries (CRM); **quotes for configured work such as fit-outs, windows and doors (ConfigX)**; site requests and snags (Desk); materials and stock (Inventory); client invoices and payments, including milestone invoices (Billing); handover and maintenance (ServiceOps); site crew training (HRMS, Skillberry) |
| **Engineering firms** | Project delivery (Projects); client relationships and proposals (CRM); team records and learning (HRMS, Skillberry); client billing (Billing); materials for contractors (Inventory); site service visits (ServiceOps) |
| **Real estate agencies and brokers** | Property enquiries (CRM); **online booking of viewings (Bookings, Appointments)**; prospect communication (Campaigns); **feedback after a viewing (Surveys)**; owner and tenant requests (Desk) |
| **Developers and builders** | Buyer enquiries and follow up (CRM); launch campaigns (Campaigns); **site visit and show unit booking (Bookings, Appointments)**; buyer invoices and payments (Billing); build progress (Projects); handover and snag requests (Desk, ServiceOps); **unit layouts, finishes and options, priced into a quote with approvals (ConfigX)** |
| **Property operations** | Occupier requests (Desk); work orders, assets and service plans (ServiceOps); **room and equipment booking (Bookings, Spaces)**; **amenity and venue booking (Bookings, Facilities)**; service charge invoices (Billing); contractors and vendors (ServiceOps partners) |

Below the tabs, as on the Field Service page: a short "work around the job" block for what applies to everyone (Sync for accounting and ERP, **EVOQ AI** with EVI and the agents), in the same card style.

Overlap to manage: Property operations and the Field Service page's Facilities tab share Desk, ServiceOps and Bookings. Keep them different by audience (landlords and managers against facilities providers) and link between the two pages.

## 4. UI plan (the same model as Field Service)

- **Side tabs** for the five buyers, each with a round photo, a name and a sub-label. Sticky on desktop, scrolling pills on a phone.
- **Staged scene** per tab: gradient stage in that tab's colour, a real photograph, a phone drawn from the product's own screens, and two floating cards.
  - Construction: a site task list with owners, and a stock alert.
  - Engineering: project deadlines, and a client follow up.
  - Agencies: a viewing booked, and a new enquiry assigned.
  - Developers: a buyer follow up, and an invoice paid.
  - Property operations: a request assigned, and a room booked.
- **Solution rows**, numbered, with hairlines and the product chips on the right.
- **Replace** the stacked chapters, the nested real estate list and the "How products work together" tree.
- **Keep** the page palette (clay, terracotta and sand) and the FAQ and closing card.
- Phone behaviour, wrapping checks and the build follow the Field Service checks.

## 5. Facts confirmed

1. **Milestone billing:** Billing supports milestone invoices. The copy can say it.
2. **Viewings:** Appointments can be described as booking a property viewing, with reminders.
3. **Bookings for managed properties:** Spaces and Facilities can be offered to landlords and property managers.
4. **ConfigX:** relevant. Its microsite page names building products and furniture and interiors, and it covers layouts, materials and finishes in 2D and 3D, plus CPQ with approvals. It goes into the Developers and Construction tabs.
5. **Five tabs:** confirmed.

## 6. Still open

- Which accounting and ERP systems Sync supports, if the band should name any. Default: name categories only, as on the Field Service page.
