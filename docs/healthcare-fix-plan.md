# Healthcare pages: fix plan (for review)

Based on `docs/healthcare-audit.md` and your answers. Nothing is built. The Patient Access & Payments page comes after the current pages are optimized, so this plan covers the main page and the three solution pages, with an interim home for Access & Payments.

## 1. Answers folded in

| Question | Answer and what it changes |
|---|---|
| Is "Booking Engine" the same as EVOQ Bookings (Appointments)? | **Yes.** One name everywhere: **Bookings**, with "online booking" as the feature. "Booking Engine", "Appointment Booking" and "EVOQ Booking" all go. |
| Does Access & Payments get a page? | **Yes, later.** Until then it is the fourth solution card on the main page, linked to the Bookings and Billing product pages. |
| Loyalty: rewards, memberships, tiers? | You answered "Yes". I read it as all three. The "where supported" and "where available" hedges come out of the Loyalty copy. Tell me if only some of the three exist. |
| Compliance and standards claims | Kept as they stand in the Interoperability, privacy and healthcare standards section. The text does not change. |
| Clinical record boundary | **Not decided.** See section 5. No boundary line is added until it is. |
| Which integrations are live? | Checked against the site's integrations catalog. **Stripe, WhatsApp Business, WooCommerce, Shopify and Google Analytics are listed.** **Google Calendar and Google Meet are not in the catalog.** Google Calendar appears once as a Bookings setting, and Meet appears nowhere else. Confirm these two before the integrations row names them. |

## 2. Main page: from nine sections to six

| # | Section | Change |
|---|---|---|
| 1 | Hero | New H1 and plain chips (below). |
| 2 | "What would you like to improve?" | Keep, as the entry row. Rename "Revenue Optimization". Every card opens its solution. |
| 3 | **Solutions** | Replaces the patient journey, the solutions block and the care settings. Side tabs by care setting, a staged scene each, numbered solution rows, as on the Field Service and Construction pages. |
| 4 | AI | Keep. Fix the copy. |
| 5 | **Connected** | Merges the standards section and the integrations section into one. |
| 6 | Closing card | Keep. |

**Care setting tabs (5):** Clinics and specialty practices; Dental practices; Aesthetics and wellness; Hospitals, networks and multi-location groups; Diagnostic centres. The sixth setting (multi-location) joins hospitals and networks.

**What each tab shows.** Rows come from the products and the wording already on the page:

| Tab | Solutions (product) |
|---|---|
| Clinics and specialty practices | Appointments and providers (Practice Management); online booking (Bookings); enquiries and follow ups (CRM); invoices and payments (Billing) |
| Dental practices | Appointments, providers and visits (Practice Management); patient relationships and follow ups (CRM); online booking (Bookings); billing (Billing); reminders and campaigns (Campaigns) |
| Aesthetics and wellness | Enquiries, consultations and returning patients (CRM); appointments and treatments (Practice Management); campaigns, feedback and loyalty (Campaigns, Surveys, Loyalty); online booking (Bookings) |
| Hospitals, networks and multi-location groups | Enquiries, referrals and follow ups across departments and locations (CRM); schedules and providers (Practice Management); standards and privacy up front |
| Diagnostic centres | Enquiries and referrals (CRM); patient communication (Campaigns); follow ups (CRM). If you want a diagnostics-specific row, say so. |

**Patient Access & Payments** stays a fourth solution card in the tabs and on the entry row: "Patients book online. Your team raises invoices and records payments." It links to Bookings and Billing for now.

## 3. Copy fixes

| Where | Now | Proposed |
|---|---|---|
| Hero H1 | Stronger patient relationships. More efficient practice operations. | **Enquiries followed up, appointments organized, patients kept in touch.** It matches the other solution pages. |
| Hero chip | Appointments: Schedule with ease | **Booked around provider availability** |
| Hero chip | Patient engagement: Stay connected | **Campaigns, surveys and loyalty** |
| Hero chip | Better outcomes: Build lasting relationships | Replace with **Follow ups: assigned and tracked after visits** |
| Entry card | Revenue Optimization | **Appointments and payments** |
| Solution block | Make appointments and payments easier to manage | **Patients book online. Your team raises invoices and records payments.** |
| Integrations H2 | Connect the tools your team already uses | **Connect the tools your team uses.** |
| Standards H2 | Privacy, security and integration questions to settle before you adopt | **Built to work across healthcare systems.** (the line the Practice Management page already uses) |
| Sentences | "same view of each patient", "one patient history across every team", "every touchpoint", "each stage", "Every enquiry…", "Everything your team needs…" | Reword each. The full list is in the audit. |
| Booking names | Booking Engine, Appointment Booking, EVOQ Booking | **Bookings** |
| Card footers | "Powered by EVOQ CRM" and "Powered by Practice Management" | One pattern: **EVOQ CRM**, **EVOQ Practice Management**, **EVOQ Campaigns, Surveys and Loyalty** |

## 4. The three solution pages

| Page | From | To | How |
|---|---|---|---|
| Patient Relationships | 16 sections, 12,176px | about 8, about 7,500px | Merge "Every patient relationship starts somewhere" with "From enquiry to ongoing care". Merge "Track. Follow up. Build relationships." with "Stay connected. At the right time.". Keep shared context, connected apps, AI, care settings, standards and the closing. Reword every "Every". Features page H1 loses "Everything". |
| Practice Management | 8 sections, 9,343px | 8 sections, about 7,500px | Split the overloaded section (patient information, front desk) into two short blocks of about 150 words each. Use the same care settings as the main page. Remove Booking and Billing from the "Patient Engagement" line in its ecosystem block. |
| Patient Engagement | 7 sections, 5,604px | 7 sections, about 5,000px | Keep the structure. Remove "where supported" and "where available". Rewrite Loyalty as rewards, memberships and tiers. |

All three use the shared standards wording unchanged.

## 5. Decision still needed: the clinical record boundary

You were not sure what EVOQ stores for a visit. Until that is decided, the plan adds no boundary line. Two options for when it is known:

1. **EVOQ is not the clinical record.** "EVOQ manages enquiries, appointments, follow ups and practice activity. Your clinical records stay in your clinical system."
2. **EVOQ holds visit notes, forms and documents.** State exactly what it holds, for example "Visit notes, forms and documents are kept with the patient's profile," and say nothing about the clinical record.

The Practice Management page currently says providers "record visit details, notes, forms and documents", which fits option 2. Someone from product should pick one.

## 6. Order of work

1. Main page.
2. Patient Relationships.
3. Practice Management.
4. Patient Engagement.
5. Later: the Patient Access & Payments page, then switch the card links to it.

Each step ends with checks at 1440, 1024, 768 and 375px, then the build.

## 7. Open items

- Which of rewards, memberships and tiers Loyalty covers.
- Google Calendar and Google Meet in the integrations row.
- The clinical record boundary (section 5).
- Whether diagnostics gets its own solution rows.
