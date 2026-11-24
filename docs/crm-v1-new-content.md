# EVOQ CRM v1: marketing content, version 2

Route: `/products/crm-v1`. The live `/products/crm` stays as it is.
Replaces `docs/crm-v1-content.md`. Content only, no UI decisions yet.

What changed from the first draft:
- Titles sell an outcome in the buyer's own words, not a generic promise.
- The CRM is introduced by what a person asks for ("close this renewal"), then what the CRM gathers, does and asks approval for.
- Trust is shown inside the product visuals (permissions, approval step, activity trail), not in a security block.
- AI is the method, not the headline. The word "agent" appears once, in a plain list of jobs.
- No title starts with "Your".

---

## 1. Marketing approach

### The buyer
A company decision maker who needs a CRM and has been burned by legacy tools, spreadsheets or too many disconnected apps. Their real question is not "can it write an email". It is "can my team hand it a task, and can I trust what it does with our customer and revenue data".

### The story in four moves
1. **Outcome.** Start from the result a sales leader wants: every qualified lead followed up, every proposal chased, every renewal closed.
2. **Intent.** A person states the goal in a sentence. The CRM finds the context, then does the work or proposes it.
3. **Control.** Permissions, approval modes and an activity trail decide what happens next. This is shown on screen, never argued in a paragraph.
4. **Connected.** The deal moves on into billing, projects and support under the same EVOQ CTRL login.

### How trust is said without saying it
| Promise a buyer wants | Where the page shows it | Wording rule |
|---|---|---|
| Least privilege access | Roles & permissions card, a role specific screen in Roles | State what each role can open. No security jargon. |
| Human approval for risky actions | Approval card inside the outcome example | Show "Waiting for approval" with an approver name. Never write "nothing happens without approval", because approval modes are configurable. |
| Audit trail | Activity row under every example: "Prepared by EVI, approved by Priya, 10:42" | Show the row. Do not claim reversibility until confirmed. |
| Customer controlled definitions | Modules & fields card: "Add the fields and stages your team uses" | Frame as "your terms in the CRM", no ontology talk |
| Data location and training on data | Not on the page yet | Held for the demo conversation and the security page until confirmed |

### Where AI sits
EVI appears in the hero (intent prompts), in the outcome cards and in a single section about jobs. Nowhere else. No "AI powered" headline, no superlatives, no stacked claims.

### Proof
Real screens, real field names, clean invented records. The call to action is always a demo. Pricing on request.

### Tone
Concrete nouns, short lines, a verb in every title. No dashes, no exaggeration, no status tags, no disclaimers. Competitor test: a line stays only if it would sound wrong with another CRM's name on it.

---

## 2. Page copy: Home

### Meta
- **Title:** EVOQ CRM | Deals, follow ups & renewals
- **Description:** Find the proposals nobody answered and the renewals nobody called. EVOQ CRM prepares each follow up for the owner to approve. Book a demo.

### Section A. Hero (chosen: option 1)
- **Eyebrow:** EVOQ CRM
- **Headline:** How many deals went quiet this week?
- **Subhead:** EVOQ CRM finds the proposals nobody answered and the renewals nobody called, then prepares each follow up for the owner to approve.
- **Primary CTA:** Book a demo
- **Secondary CTA:** See how it works
- **Hero visual brief:** The pipeline board on the right, with a few deals carrying an idle badge ("9 days idle", "12 days idle"). A glass summary card over the board reads "6 deals went quiet this week", which answers the headline. Below it, an EVI card: "Prepared 6 follow ups. Waiting for approval", with an Approve button and the owner's name. Clean invented names (Halo Health, Vertex Retail, Beta Inc., Orion Foods). Same hero grammar as the home page: portrait style cards, glass prompt, work added in sequence.
- **Hero motion brief:** The idle badges appear first, then the counter reaches 6, then the EVI card slides in. No looping prompt text.

### Section A2. Headline options, version 2
The test for each: does it make the reader check their own business, or want the answer? Each option opens a question that the next section of the page answers.

| # | Headline | Style | The question it opens |
|---|---|---|---|
| 1 | How many deals went quiet this week? | Question | "Probably more than I know. What do I do about it?" Answered by Section B. |
| 2 | Reps do not forget to follow up. They run out of hours. | Reframe | "Then what fixes it?" Answered by Sections B and C. |
| 3 | Pick any deal in your pipeline. When was it last touched? | Challenge | "I honestly do not know." Answered by the pipeline view in Section D. |
| 4 | What did your pipeline do while you were in meetings? | Scene | "Can a CRM do that?" Answered by Section E, the four jobs. |
| 5 | Monday morning, the follow ups are already drafted. | Scene | "Drafted by what, and who checks them?" Answered by Section C. |
| 6 | Why do your follow ups still live in spreadsheets? | Switcher | "Because the CRM never did them." Answered by Section F onward. |

**Subhead pairings**
- 1: EVOQ CRM finds the proposals nobody answered and the renewals nobody called, then prepares each follow up for the owner to approve.
- 2: EVOQ CRM prepares the follow up, so the rep only has to approve it.
- 3: EVOQ CRM shows the last touch on every deal, prepares the next step and asks the owner to approve it.
- 4: Leads were assigned, proposals were chased and renewals were flagged. You open the CRM and approve what is ready.
- 5: Proposals, renewals and new leads each have the next step prepared on the record, waiting for the right person.
- 6: Move to a CRM where the next step is prepared on the record, not tracked on the side.

**My pick:** 1 for the hero, because it is short and the reader answers it before reading on. 2 is the strongest second choice. 6 works as the closing section title for buyers replacing a CRM they already pay for.

### Section B. Outcomes
- **Title:** Say the outcome. See the work.
- **Subhead:** Five requests a sales team makes every week, and what the CRM does with each.
- **Cards, each showing: what you say, what it gathers, what it does, who approves:**

**Close this renewal**
- You say: "Close the Halo Health renewal."
- It gathers: contract value, stage, last conversation, open tasks.
- It does: drafts the renewal follow up and adds a call task for the owner.
- Approval: the account owner reviews before anything is sent.

**Chase this proposal**
- You say: "Follow up on proposals waiting for a reply."
- It gathers: deals in the proposal stage with no activity for several days.
- It does: drafts a follow up for each and schedules a task.
- Approval: sent after review, or automatically if your admin sets this job to automatic.

**Qualify this lead**
- You say: "Qualify the leads that came in this week."
- It gathers: lead source, status, score and history.
- It does: scores each lead, assigns an owner and moves the status.
- Approval: the manager confirms assignments, or lets the rules run.

**Prepare this meeting**
- You say: "Prepare Thursday's call with Vertex Retail."
- It gathers: account history, open deals, notes and tasks.
- It does: produces a short brief on the record, ready before the call.
- Approval: none needed, nothing leaves the CRM.

**Report this quarter**
- You say: "How does the pipeline look this quarter?"
- It gathers: pipeline by stage, forecast and deals at risk.
- It does: answers with the figures and links each to its source report.
- Approval: none needed, read only.

### Section C. Inside a request
- **Title:** From a sentence to a recorded action.
- **Body:** Every request leaves a trail on the record: what was asked, which records were used, what was prepared, who approved it and when. Admins set how much runs on its own: automatically, with approval, or only as a suggestion.
- **Visual brief:** A single deal record with a vertical timeline:
  1. Requested by Sarah K: "Close the Halo Health renewal."
  2. Records used: deal, contact, last 3 notes, 2 open tasks.
  3. Prepared by EVI: renewal follow up draft, call task for Friday.
  4. Waiting for approval: Priya M, account owner.
  5. Approved by Priya M, 10:42. Sent.
- **Footnote text:** none.

### Section D. Features by area
- **Title:** The CRM behind each request.
- **Subhead:** Pick an area for its top features, or open the full list.

**1. Contacts & Accounts**
*Walk into every conversation with the history.*
- Profiles for people and companies
- Full activity history on each record
- Notes and conversations in the same place
- An owner on every record
- Import & export of existing data

**2. Leads & Pipeline**
*Move leads to deals without retyping.*
- Lead statuses from New to Qualified, Lost or Unqualified
- List, grid and Kanban views
- Deal stages with probability
- Automatic lead assignment
- Filters, columns and sorting on every list

**3. Quotes & Revenue**
*Get from proposal to payment on the same record.*
- Generate quotes from a deal
- Approval steps before a quote goes out
- Payment tracking against each deal
- Lead scoring and win probability
- Pairs with ConfigX when quotes need product configuration

**4. Reports & Forecasting**
*Report from the records the team already works in.*
- Dashboards where every card links to its source report
- Saved reports with tags
- Revenue trend and pipeline by stage
- Revenue forecast
- Team performance and conversion trends

**5. Tasks & Meetings**
*Give every follow up an owner and a date.*
- Tasks with type, priority and due date
- Tasks linked to a contact or deal
- Meetings and reminders
- Calendar sync
- A daily view of tasks due, deals to follow up and meetings

**6. Campaigns & Outreach**
*Send to a segment, then see who responded.*
- Segments by behavior, history or engagement
- Email and SMS campaigns
- Open rate, conversion and engagement tracking
- Results across campaigns in a single dashboard
- Works with EVOQ Campaigns

**7. Automation & Customization**
*Set stages, fields and rules the way your team sells.*
- Custom modules and fields
- Workflow automation for repeated steps
- Roles and permissions
- Customizable dashboards and themes
- Data backup

**Mobile** (closing row under the explorer)
- Open deals, update leads, manage tasks and send email from a phone, including offline.

### Section E. Jobs EVI can take on
- **Title:** Routine follow through, handled.
- **Body:** These are the jobs most sales teams hand off first. Each runs inside your roles and approval rules.
- **List (four items, each with a short line):**
  - **Idle proposals.** Finds proposals with no reply and prepares the follow up.
  - **New leads.** Scores, assigns and moves new leads along.
  - **Meeting briefs.** Prepares the account history before a call.
  - **Renewals.** Flags renewals approaching their date and drafts the reminder.
- **CTA text link:** Explore EVOQ AI

### Section F. Roles
- **Title:** Each role opens its own screens.
- **Sales reps & Account owners:** Start the day with tasks due, deals to follow up and meetings. Approve what EVI prepared and move on.
- **Sales managers:** See the pipeline by stage and by owner, confirm assignments and spot deals gone quiet.
- **Sales operations & Admins:** Shape modules, fields, roles and approval rules. Import, export and back up data.
- **Leadership & Business owners:** Read revenue trend, booked revenue and pipeline health without requesting a report.

### Section G. Controls
- **Title:** Permissions and approvals, set where the work happens.
- **Body:** Roles decide who can open and change what. Approval rules decide what EVI does automatically, what it asks about first and what it only suggests. Both live in the same settings as your modules and fields.
- **Three cards:**
  - **Roles & Permissions.** Set who can view, edit and approve.
  - **Approval Modes.** Choose automatic, ask first or suggest only.
  - **Modules & Fields.** Add the terms and fields your team uses.

### Section H. From closed deal to the next step
- **Title:** A won deal does not stop at the CRM.
- **Body:** EVOQ CRM shares a login with your other EVOQ apps through EVOQ CTRL, so a closed deal can move on to billing, projects and support.
- **Cards (a title and a line each):**
  - **Billing.** Invoice the deals you win.
  - **Projects.** Plan the work that starts after the close.
  - **Desk.** Support the customers you sold to.
  - **ConfigX.** Configure products and price the quote.
  - **Campaigns.** Reach the segments you built in the CRM.

### Section I. Common questions
- **Can EVI send messages on its own?** Your admin chooses. It can act automatically, ask first or only suggest.
- **Who sees what?** Roles and permissions control access by user.
- **Can we use our own stages and fields?** Yes. Modules and fields are customizable, and stages can follow your process.
- **How do we bring in existing records?** Use the import tool in settings. Export sits in the same place.
- **Does it work on a phone?** Yes. Deals, leads, tasks and email are available on mobile.
- **How much does it cost?** It depends on your team and setup. Ask us during a demo.

### Section J. Closing
- **Title:** Bring a renewal you need to close.
- **Body:** Book a demo and we will set up your stages and approval rules around a real deal.
- **CTA:** Book a demo (opens the demo form)
- **Secondary:** Request pricing

---

## 3. Features page (only if we keep a separate one)
Same seven areas as Section D, each expanded to its full list, plus a worked request per area in the style of Section B. Feature names to be finalized with the product team.

---

## 4. To confirm before this goes live
1. **Approval mode per job:** the page now says an admin sets each job to automatic, ask first or suggest only. Confirm the mode can be set per job. Approval by action type or amount is not claimed anywhere.
2. **Activity trail:** Section C shows who asked, which records were used, what was prepared and who approved. The demo already has an activity feed with user and time. Ask the product team to confirm the extra detail exists at launch. Until then Section C shows only who asked, who approved and when. Reversal is not mentioned.
3. **Mobile offline, lead conversion history, quote approvals, payment tracking, calendar sync, SMS:** carried over from the first draft.
4. **Jobs in Section E:** idle proposals, new leads, meeting briefs and renewals all exist at launch (confirmed by you).
5. **Data between apps:** Section H promises the same login only. Confirm before saying data moves automatically.
6. **Regional hosting and training on customer data:** not stated anywhere on the page until confirmed.
7. **Open access (API or MCP):** confirm what EVOQ exposes before any line about working with other tools.

## 5. Left out on purpose
- "Know where every deal stands", "Your pipeline, always current" and other lines that fit any CRM
- Titles that start with "Your"
- Numbers such as "3x faster", "99.9% uptime", "+27%"
- "AI powered", "agentic", "#1", "easiest", "one suite"
- Status tags and disclaimer captions
