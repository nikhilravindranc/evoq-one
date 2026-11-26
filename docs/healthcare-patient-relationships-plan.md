# Patient Relationships: page plan (for review)

Routes: `/solutions/healthcare/patient-relationships-v1` and `/solutions/healthcare/patient-relationships/features-v1`. The live pages stay untouched until you approve. Nothing is built.

## 1. What the page is today

11 blocks on the main page, 5 of them inside a JavaScript "stacked scroll" that pins each panel full screen. That pinning is the main reason the page measures 12,176px for about 930 words.

| # | Block now | Says |
|---|---|---|
| 1 | Hero | Turn patient enquiries into lasting relationships. |
| 2 | Enquiry | Every patient relationship starts somewhere. |
| 3 | Journey (pinned) | Keep the patient journey connected. |
| 4 | Shared context (pinned) | Give every team member the context they need. |
| 5 | Enquiry flow (pinned) | Track. Follow up. Build relationships. |
| 6 | Follow up (pinned) | Track every follow-up until it is completed. |
| 7 | Connected (pinned) | Connect patient relationships with the rest of your practice. |
| 8 | AI | AI that supports your team with enquiries and follow-ups. |
| 9 | Organizations | Built for the way healthcare organizations work. |
| 10 | Security | Built to work across healthcare systems. |
| 11 | Closing | Make every patient interaction count. |

Blocks 2 to 6 tell one story: enquiry in, history on the record, next step assigned, patient kept in touch. It is told five times.

## 2. Proposed page: 8 sections, normal scroll, about 7,000px

| # | Section | From | What it does |
|---|---|---|---|
| 1 | **Hero** | 1 | New H1 and body (section 3). Keep the patient record visual. |
| 2 | **From the first enquiry to the return visit** | 2 + 3 | One four step row: Capture the enquiry, Know the patient, Follow up, Bring them back. One visual (the enquiry card and timeline). |
| 3 | **The history is on the record before your team replies** | 4 + 5 | Shared context and the pipeline, together. One visual. |
| 4 | **Follow ups with a due date and a named owner** | 6 | Tasks, reminders, missed appointments, recalls. |
| 5 | **Solutions shaped by your care setting** | 9 | The five tabs from the main page, with CRM rows for each setting. |
| 6 | **Connected** | 7 + 10 | CRM beside Practice Management, Bookings, Billing, Campaigns, Surveys and Loyalty, then the standards block, text unchanged. |
| 7 | **AI** | 8 | Kept, copy fixed. |
| 8 | **Closing** | 11 | New title. |

The stacked scroll goes. Pinning makes the page long, hides the next section behind a scroll, and is the part most likely to misbehave on a phone.

## 3. Copy

| Where | Now | Proposed |
|---|---|---|
| H1 | Turn patient enquiries into lasting relationships. | **Enquiries captured, follow ups assigned, patient history in view.** "Lasting relationships" fits any CRM, so it fails the competitor test. |
| Hero body | Every enquiry is an opportunity to begin a patient relationship. EVOQ CRM helps… move each relationship forward. | **Capture enquiries and referrals, assign follow ups, and keep conversations and patient history together on the patient's record. For clinics, dental and aesthetics practices, hospitals and diagnostic centres.** |
| Section 2 | Every patient relationship starts somewhere. / Keep the patient journey connected. | **From the first enquiry to the return visit.** |
| Section 3 | Give every team member the context they need. / Track. Follow up. Build relationships. | **The history is on the record before your team replies.** |
| Section 4 | Track every follow-up until it is completed. | **Follow ups with a due date and a named owner.** |
| Section 6 label | One relationship. Every touchpoint. | **Connected to the rest of your practice.** |
| Visual captions | "Nothing important is missed." "More conversations, more appointments, stronger relationships." "One connected view." | Remove. They are claims, not features. |
| Closing | Make every patient interaction count. | **Start with how your practice handles enquiries today.** |
| Names | "Healthcare CRM", "Booking Engine" | **EVOQ CRM** and **Bookings**. |
| Spelling | "inquiry" in the enquiry card | **enquiry**, as everywhere else. |
| Hyphens | follow-up, follow-ups | **follow up, follow ups**, the form the new main page uses. |

## 4. Care setting rows (section 5)

Five tabs, the same photos and scenes as the main page. CRM leads each row, and the other products show only where they connect.

| Tab | Rows |
|---|---|
| Clinics and specialty practices | Enquiries and referrals recorded with the source / Follow ups assigned after a visit / Patient history on the record (CRM) / Booking from an enquiry (Bookings) |
| Dental practices | Enquiries and new patient tracking / Recalls and follow ups with a due date / Reminders (Campaigns) |
| Aesthetics and wellness | Enquiry to consultation tracked / Treatment interest recorded / Returning patients and re-engagement / Feedback (Surveys) / Rewards, memberships and tiers (Loyalty) |
| Hospitals, networks and multi-location groups | Referrals across departments and locations / Enquiry assignment and ownership / Consistent processes across clinics and teams |
| Diagnostic centres | Enquiries and doctor referrals / Booking a test from an enquiry (Bookings) / Reminders for repeat tests (Campaigns) |

## 5. Features page (`/features-v1`)

Now 7 groups with 6 to 7 features each, plus integrations and configuration, in 9,575px. Several groups say the same thing: "Treatment and service interest" and "Treatment interest tracking", "Enquiry assignment" and "Team ownership", "Notes and activities" and "Patient notes and preferences".

| New group | Features kept |
|---|---|
| Patient record and history | Patient profiles, contacts, notes and preferences, family and relationships, custom fields, interaction timeline |
| Enquiries and referrals | Enquiry management, source tracking, referral management, assignment and ownership, pipeline and stages, conversion tracking |
| Follow ups | Follow up management, tasks and activities, reminders, missed appointment follow up, treatment follow up, recall |
| Staying in touch | Segmentation, patient status, returning patients, re-engagement |
| Automation | Workflow, follow up and task automation, notifications, personalized communication |

- **H1:** "Everything your team needs to manage patient relationships." becomes **Features for enquiries, follow ups and patient history.**
- **Group titles:** "Turn every enquiry…", "Keep every follow-up…", "Keep every conversation…" lose "every".
- **Kept:** the intro that says "without turning your CRM into a clinical records system", pending your decision on the record boundary. It is the only page that states a boundary, so the pages disagree until you decide.
- **Result:** about 5 groups, about 7,000px.

## 6. Build notes

- The tabbed section is the main page's component, made reusable with the CRM rows as data.
- The hero keeps the patient record visual, which is the strongest image on the current page.
- Checks at 1440, 1024, 768 and 375px, titles on one line where the width allows, then the build.

## 7. Decisions for you

1. **Remove the stacked scroll** and use normal scrolling. Recommended.
2. **The H1:** "Enquiries captured, follow ups assigned, patient history in view." Or give me another direction.
3. **Features page:** merge 7 groups into 5 as above.
4. **Name:** "EVOQ CRM" on this page, not "Healthcare CRM".
5. **The boundary sentence** on the features page: keep it as it is, or remove it until product decides.
