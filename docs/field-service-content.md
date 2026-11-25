# Field Service, Facilities & Maintenance: page content and UI plan (Option B)

> **Design update, built version.** The solutions section follows the Hospitality layout: three photo arch cards pick the area, and the panel shows a photograph with a real ServiceOps screen over it and a small note card, then the area's solutions as cards with the products behind each. The explorer, the step chips and the drawn screens were dropped. The shared products are now "Supporting solutions", titled "The work around the job.", in the same card style, with the Sync and EVOQ AI rows below. The Sync chip lines on the cards were removed.

For review and approval. Nothing is built until you approve. Companion file: `docs/field-service-solution-analysis.md` (why each solution is here).

## 1. Page map

| # | Section | What it does |
|---|---|---|
| 1 | Hero | Says what the page covers: requests, work, sites and equipment. The existing map, route and phone visual stays. |
| 2 | Solutions | Three tabs, one per area. Each tab opens a panel with its own solutions and an app screen. |
| 3 | The EVOQ products around the job | Six shared products, then the Sync band and the EVOQ AI band. |
| 4 | Questions | Accordion, nine questions. |
| 5 | Closing card | Talk to an expert. |

Removed from today's page: the ecosystem tree, the "challenges, improves, fits" lists inside each tab (they carry the "every" lines), and the product mentions repeated inside each tab. Everything they said now lives in the solution rows.

## 2. Copy

### 2.1 Hero
- Eyebrow: Field Service · Facilities · Maintenance
- H1: **Service requests logged, work assigned, sites and equipment maintained.**
- Body: Log service requests, assign and dispatch technicians, record parts used and raise the invoice when the job closes. Site requests, inspections and preventive maintenance run alongside reactive jobs, across sites and assets.
- Buttons: **Talk to an expert** (opens the enquiry form) and **Explore the solutions** (scrolls to section 2).

### 2.2 Solutions section
- Eyebrow: Solutions
- H2: **Field jobs, site upkeep and planned maintenance, from request to invoice.**
- Line: Choose the work closest to yours.
- Tabs (icon, name, sub-label):
  1. Field service. Requests, dispatch and visits.
  2. Facilities management. Sites, work orders and bookings.
  3. Equipment and asset maintenance. Planned and corrective work.

#### Panel 1: Field service
- Panel title: **Log the request, send the technician, record the visit.**
- Audiences: *For service providers:* requests, estimates, work orders and visits tracked through to completion. *For internal field teams:* work organized across sites and equipment locations, with records kept for follow-up.

| Solution | Description | Products |
|---|---|---|
| Service requests | Requests from calls, email, the web form and the customer portal land in a shared inbox, ready to become work orders. | Desk, ServiceOps |
| Online booking of service visits | Customers pick an open slot on a booking page, with reminders, deposits and waitlists where you use them. | Bookings (Appointments) |
| Estimate, dispatch and visit | A request becomes a work order and an estimate the customer approves from a private link. Dispatch ranks technicians for the job. Technicians work it on a phone, with checklists, photos, parts and a signature, even without signal. | ServiceOps |

The third row has three small steps (Estimate, Dispatch, Visit) that swap its screen.

#### Panel 2: Facilities management
- Panel title: **Assign the site work, record the inspection, open spaces for booking.**
- Audiences: *For facilities management providers:* client-site work, service commitments and delivered work on record. *For internal facilities teams:* occupant and department requests assigned and tracked across facilities.

| Solution | Description | Products |
|---|---|---|
| Site requests | Requests from occupants, departments and site managers logged and assigned with a named owner. | Desk |
| Work, inspections and assignments | Work orders and inspections assigned to staff, contractors and service providers, with findings recorded and open work listed by site. | ServiceOps |
| Assets and service history by site | Equipment records and service history kept per building and location, so a returning issue shows what was done before. | ServiceOps |
| Room and equipment booking | Meeting rooms, halls, training rooms and equipment, with their own availability and rules, approvals, check in and utilization across locations. | Bookings (Spaces) |
| Amenity, court and venue booking | Courts, pools, halls and event venues open for online reservations, with rules for who can book and when. | Bookings (Facilities) |

#### Panel 3: Equipment and asset maintenance
- Panel title: **Schedule the servicing, repair the faults, keep the history by asset.**
- Audiences: *For maintenance teams:* planned servicing and corrective repairs recorded against each equipment item. *For asset-intensive organizations:* maintenance activity visible across equipment and sites.

| Solution | Description | Products |
|---|---|---|
| Assets, warranty and service history | Equipment records with make, model, serial number, warranty and status, plus history across sites and the next service. | ServiceOps |
| Planned and corrective maintenance | Service plans show work due in the next 30, 60 or 90 days and raise the work orders. Faults are recorded, assigned and tracked to completion. | ServiceOps |
| Job costs and margin | Labour, parts and other costs booked on a job show its margin. Profitability splits margin by job, customer, trade and technician. | ServiceOps, Billing |

### 2.3 The EVOQ products around the job
- H2: **The EVOQ products around the job.**
- Line: They work alongside ServiceOps, whichever area you run.

| Card | Description | Products |
|---|---|---|
| Parts and stock | Stock and purchasing for parts, with the parts used on a job recorded against it. | Inventory, Sync chip |
| Invoices and payments | Invoices and payments for billable service work, with overdue invoices followed up. | Billing, Sync chip |
| Customers and follow-up | Customer accounts, enquiries and follow-ups. | CRM, Sync chip |
| Installations and fit-outs | Installations, refurbishments and upgrades planned as projects, with tasks and owners. | Projects |
| Training and certifications | Employee records, with training assigned and tracked so new technicians start with the training they need. | HRMS, Skillberry |
| Customer messages and feedback | Notifications to customers about visits and planned maintenance, and feedback requested after a job. | Campaigns, Surveys, ServiceOps |

- **Sync chips.** Parts and stock, Invoices and payments, and Customers and follow-up each carry a small Sync chip with one line, such as "Kept in step with your accounting system, where supported." The chip names a system category only, never a brand.
- **Sync band.** Title: **Connected to your accounting and other systems.** Body: Where supported integrations are available, service information can be shared with accounting and financial applications, CRM and customer communication systems, email and messaging services, payment providers, and ERP and inventory systems. Icon: Sync.
- **AI band.** Title: **EVI and the agents prepare routine work for your approval.** Body: The Intake, Dispatch, Quote Follow-up and Collections agents draft and flag. A person sends, books or decides. Icons: EVOQ AI, ServiceOps.

### 2.4 Questions
- Eyebrow: Questions
- H2: **Questions about EVOQ for field service, facilities and maintenance.**
- The seven existing questions stay. One answer changes: "Confirm the data exchange between them for your deployment" becomes "The data each product shares depends on your setup."
- Two are added:
  - **Where do bookings fit?** Bookings covers online booking of service visits, meeting rooms and equipment, and courts, pools, halls and event venues. It sits alongside ServiceOps, which runs the work itself.
  - **Does an AI agent act on its own?** No. The agents draft and flag, and a person sends, books or decides.

### 2.5 Closing card
- Eyebrow: Talk to us
- H2: **Start with how your service requests and visits work today.**
- Body: Tell us how requests, technician scheduling and maintenance run today, and we will show where EVOQ products fit.
- Button: Talk to an expert.

## 3. UI plan

**Tokens.** The page palette stays: navy, blue and burnt orange, with each tab keeping its colour (Field service blue, Facilities navy, Maintenance burnt orange). Headings follow the site type scale. Text balances so no title ends on a single word.

**Hero.** Layout unchanged, with the new copy. The H1 sits on two lines at 1440px. The second button scrolls smoothly to the tabs.

**Solutions section.**
- *Tab bar:* three large tabs with icon, name and sub-label, as today. Arrow keys move between tabs, with `role="tablist"`. On a phone the bar scrolls sideways.
- *Panel header:* a wide photo band, with the panel title over a soft gradient and the two audiences in two columns beneath it. The photos are the three already on the page, so no new stock is needed.
- *Explorer (below the header):* two columns. Left: the solution rows, stacked with hairlines. Each row has the name, a one line description and small product chips. The open row gets the area colour on its edge and a slightly larger name. Right: a framed app screen that fades when the row changes. A short quiet tour moves through the rows while the section is in view and stops on hover, on focus and when the visitor picks a row. Reduced motion turns the tour off.
- *Merged row:* "Estimate, dispatch and visit" shows three step chips under the screen that swap between screens.
- *Phone:* the explorer becomes an accordion of rows, each opening its screen inline.

**Around the job.** A 3 by 2 grid of white cards with the product icon, title, description and a link to the product page. Below it, the Sync band as a pale strip with a flow line from left to right, and the AI band as a dark strip with the EVOQ AI mark. On a phone the grid is a single column.

**Questions.** The existing accordion, restyled to the page tokens, left aligned, with the plus icon rotating on open.

**Closing card.** As today, with the new text.

## 4. Screens and photos

| Need | Source | Status |
|---|---|---|
| Requests list | `public/serviceops/app/requests-list.png` | Exists |
| Work orders | `public/serviceops/app/work-orders.png` | Exists |
| Dispatch | `public/serviceops/app/dispatch.png` | Exists |
| Technician phone | `public/serviceops/v2/technician.jpg` | Exists |
| Customer and site record | `public/serviceops/app/customer-detail.png` | Exists |
| Service plans | `public/serviceops/app/plans.png` | Exists |
| Billing | `public/serviceops/app/billing.png` | Exists |
| Estimate approval page | ServiceOps demo app | Capture |
| Asset record | ServiceOps demo app | Capture |
| Profitability | ServiceOps demo app | Capture |
| Inspection findings | ServiceOps demo app | Capture |
| Appointments booking page | Bookings demo, or drawn | Needed |
| Spaces booking and approvals | Bookings demo, or drawn | Needed |
| Facilities booking page | Drawn from the Facilities page direction | Needed |
| Product icons | Site logos | Exist |

**Open question on repeats.** Several screens above also appear on the ServiceOps pages. Earlier you said visuals should never repeat. Recommendation: use real ServiceOps screens here, cropped differently from their ServiceOps page, and draw the Bookings screens as new fragments in the CRM style. I need your call on this.

## 5. Build steps

1. Rewrite `FsSolutions.tsx` as the three panel explorer, with a shared data file for the rows.
2. Add `FsAround.tsx` for the six cards and the two bands.
3. Update `FieldServicePage.tsx`: hero copy, remove the ecosystem tree, the new questions and the new closing text.
4. Capture and add the screens under `public/field-service/`.
5. Check: `tsc`, `eslint`, wrapping at 1440, 1024, 768 and 375px, then `npm run build`, commit and push.

## 6. Set check on every new title

H1, Solutions H2, the three panel titles, the products H2, the AI and Sync titles, the questions H2 and the closing H2: no repeated openers (the panel titles open with Log, Assign and Schedule), no absolutes, counts, dashes or filler, and no "see", "know" or "what".

## 7. Decisions I need

1. Approve the copy in section 2, or mark the lines to change.
2. Screens: real ServiceOps screens cropped differently, plus drawn Bookings fragments (recommended), or all drawn?
3. The Facilities booking row and the Facilities answer in the questions: keep them now, or hold until the Facilities page ships?
4. Confirm that Campaigns, Surveys, Projects, HRMS and Skillberry belong on the page. Surveys is new in this version.
5. Loyalty and ConfigX are left out on purpose: Loyalty has no natural fit in these industries, and ConfigX serves companies that sell configured products. Say if you want either added.
