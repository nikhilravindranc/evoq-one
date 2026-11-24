# EVOQ CRM v1: features page content

Route: `/products/crm-v1/features` (the live `/products/crm/features` stays as it is).
Content only, no UI decisions yet. Written from two sources: the current features page and the demo app audit in `docs/crm-features-gap.md`.

Decision applied: the demo app is an internal build, so a feature that is on the current page but not in the demo is treated as real in the live app. The things the app has that the page never mentioned are added.
Voice rules applied: no dashes, no "one" as filler, no absolutes such as every, all, each or the same, no counts in the copy, no exaggeration, no figures we cannot back, no status tags, "&" in titles.

---

## 1. What changes from the current features page

### 1.1 Overall
| Now | Change | Why |
|---|---|---|
| 8 areas, 36 features | 10 areas, 50 features | Two new areas (Access & Administration, Views & Everyday Tools) and 14 new features the app has but the page never mentioned |
| Hero: "Sell Smarter, Faster, and Better" | Rewrite | Generic line that fits any CRM, and it uses "smarter" and "better" |
| Hero line "all in one place" | Remove | The word "one" as filler, and it says nothing specific |
| Hero button "Book a demo" | Remove | The page leads with content. The demo form stays in the closing section |
| Buttons "Book a Demo" and "Get Started Free" | Keep "Book a demo" only | There is no free plan. The demo is the offer |
| Area intro lines such as "Capture and Qualify the Right Prospects" | Rewrite as plain outcomes | Title Case slogans read as filler |
| Sample figures: 247 active leads, scores 94 / 72 / 61 / 88, 2,847 activities, 94% quota attainment, 12+ dashboard templates, ±8% forecast variance, $2.4M pipeline, 68% win rate, 34 day cycle, +31% | Remove all of them | None are backed by the product, and they break the no fake proof rule |
| Closing "Everything Your Team Needs, All in One CRM" | Replace with "Bring a renewal you need to close." and the demo form | Matches the home page, removes the filler word |
| Area order: Lead, Contacts, Pipeline, Sales Team, Tasks, Campaigns, Analytics, Customization | Lead, Contacts, Pipeline, Tasks, Campaigns, Team Performance, Reports & Analytics, Customization, Access, Views | Follows a deal from first lead to the people and tools around it, and puts the team and reporting areas after the daily work |
| Title Case everywhere | Sentence case for lines, Title Case for feature names | Matches the home page |

### 1.2 Feature by feature
Keep means the feature stays with a rewritten description. Add means it is new.

| Area | Keep (reworded) | Add from the app |
|---|---|---|
| 01 Lead Management | Lead Capture, Lead Assignment, Lead Scoring, Lead Nurturing, Lead Pipeline | Lead Record (call, email and convert from the record, with a stage bar) |
| 02 Contacts & Accounts | Contacts, Accounts, Email Synchronization, Contact Import | Timeline (calls, emails, notes and tasks in order) |
| 03 Sales Pipeline & Deals | Pipeline Management, Deal Tracking, Deal Stage Automation, Quote Generation, Product Catalog | Stage History (days spent in a stage and where a deal came from) |
| 04 Tasks & Scheduling | Task Management, Meeting Scheduling, Calendar Synchronization, Reminders & Alerts, Activity Tracking | None |
| 05 Campaign Management | Email Campaigns, SMS Campaigns, Campaign Automation, Engagement Tracking | None |
| 06 Team Performance (was Sales Team Management) | Activity Monitoring, Goal Tracking, Performance Dashboards, Sales Forecasting | None |
| 07 Reports & Analytics | Reports, Performance Dashboards (renamed Dashboards), Pipeline Analytics, Customer Segmentation, Conversion Tracking | Source links (a dashboard card opens the report it comes from) |
| 08 Customization & Automation | Custom Fields (renamed Modules & Fields), Workflow Automation, Lead Routing Rules, Approval Workflows | None |
| 09 Access & Administration (new area) | None | Role Hierarchy, Permissions, Users & Organization, Data Import, Export & Backup |
| 10 Views & Everyday Tools (new area) | None | List, Grid & Kanban, Filters, Columns & Sorting, Search, Notifications, Themes & Dark Mode, Mobile Access |

Totals: 36 kept, 14 added, 0 removed.

### 1.3 Things to confirm before launch
1. The features marked Not seen in `docs/crm-features-gap.md` is treated as live. Please confirm the names are right in the live app, in particular Lead Scoring, Lead Assignment, Quote Generation, Product Catalog, Calendar Synchronization and the four Campaign features.
2. Export and Data Backup show "coming soon" in the internal build. Confirm they are live.
3. Mobile Access: confirm offline use.
4. Approval Workflows: confirm that quotes, deals and pricing changes can require approval.

---

## 2. Page copy

### Meta
- **Title:** EVOQ CRM features | Leads, deals, tasks, reports & access
- **Description:** What EVOQ CRM covers, from the first lead to the closed deal: contacts, pipeline, tasks, campaigns, reports, automation, roles and the tools around them.

### Hero
- **Headline:** What your sales team gets in EVOQ CRM.
- **Alternatives:** The CRM, in the order a deal moves. / From the first lead to the closed deal, area by area.
- **Subhead:** The areas of the CRM in the order a deal moves, from the first lead to the closed sale, and the people and settings around it.
- **CTA:** None. The demo form is in the closing section.
- **Area menu (sticky, a chip for each area):** Lead Management, Contacts & Accounts, Pipeline & Deals, Tasks & Scheduling, Campaigns, Team Performance, Reports & Analytics, Customization & Automation, Access & Administration, Views & Everyday Tools

---

### 01 Lead Management
- **Headline:** Leads that have an owner and a next step.
- **Intro:** Bring leads in from forms, imports and campaigns, score them, route them by your rules and watch them move from New to Qualified.
- **Features:**
  - **Lead Capture.** Bring leads in from web forms, chats, imports and integrations.
  - **Lead Assignment.** Route new leads to the right owner by rule, territory or availability.
  - **Lead Scoring.** Rank leads by behavior, engagement and profile so reps start with the likeliest.
  - **Lead Nurturing.** Follow up automatically until a lead is ready for a conversation.
  - **Lead Pipeline.** See leads by status, from New to Qualified, Lost or Unqualified, and convert a qualified lead to a deal without retyping.
  - **Lead Record.** Call, email and log the conversation on the record, with a stage bar, the source, the rating and the history.
- **Visual brief:** The lead record (stage bar, call, email and convert) drawn as floating cards, with a real face on the owner. Pair with a photo of a colleague on a call.

### 02 Contacts & Accounts
- **Headline:** The person and the company behind the deal.
- **Intro:** Keep people and the companies they belong to side by side, with the conversations attached.
- **Features:**
  - **Contacts.** A profile for a person with their owner, lead source, related deals, tasks, notes and attachments.
  - **Accounts.** Companies with their owners and the contacts that belong to them.
  - **Timeline.** Calls, emails, notes and tasks on a record, in order.
  - **Email Synchronization.** Keep email conversations on the record they belong to.
  - **Contact Import.** Bring existing contacts in from CSV, Excel or JSON.
- **Visual brief:** The contact, accounts and activity illustration already used on the home page, extended with the timeline.

### 03 Pipeline & Deals
- **Headline:** See where a deal stands and what happens next.
- **Intro:** Move deals through stages that follow your process, and keep the money and the next step on the record.
- **Features:**
  - **Pipeline Management.** Stages that follow your process, in List, Grid or Kanban.
  - **Deal Tracking.** Amount, probability, expected revenue, closing date, owner and next step on a deal.
  - **Stage History.** How many days a deal spent in a stage and where it came from.
  - **Deal Stage Automation.** Trigger an action when a deal moves between stages.
  - **Quote Generation.** Create and send a quote from the deal.
  - **Product Catalog.** Keep products and prices ready to add to a deal or a quote.
- **Visual brief:** Photo led: a real photograph of hands working through a quote, with a quote card, approver and paid chip floating over it (as on the home page).

### 04 Tasks & Scheduling
- **Headline:** Follow ups with an owner and a date.
- **Intro:** Tasks, meetings and reminders sit on the records they belong to, so nothing depends on memory.
- **Features:**
  - **Task Management.** Tasks with type, status, priority, due date and the contact or deal they relate to.
  - **Meeting Scheduling.** Book and manage meetings from the CRM.
  - **Calendar Synchronization.** Keep availability in step with external calendars.
  - **Reminders & Alerts.** A reminder on a task, and notifications for what is due.
  - **Activity Tracking.** Log calls, meetings and notes against the lead, contact or deal.
- **Visual brief:** Photo led: the colleague on a call with the meeting chip and task list floating over her, as on the home page.

### 05 Campaign Management
- **Headline:** Reach the right people, then see who responded.
- **Intro:** Run email and SMS campaigns to the segments you build in the CRM, and see the results next to the leads.
- **Features:**
  - **Email Campaigns.** Send targeted email to prospects and customers.
  - **SMS Campaigns.** Reach people quickly when timing matters.
  - **Campaign Automation.** Start a sequence from what a lead does.
  - **Engagement Tracking.** Opens, clicks and replies for a campaign.
- **Visual brief:** The message going out in rings to real faces, as on the home page.

### 06 Team Performance
- **Headline:** Know how the team is doing without asking.
- **Intro:** Activity, goals and forecasts in dashboards that update as the team works.
- **Features:**
  - **Activity Monitoring.** See calls, meetings and follow ups as they happen, and who did them.
  - **Goal Tracking.** Set targets for people or teams and watch progress.
  - **Performance Dashboards.** Closed deals, pipeline value and activity by person or team.
  - **Sales Forecasting.** Project revenue from deal probability and the pipeline.
- **Visual brief:** The trend line that continues into a dashed forecast, with the team members along the bottom.

### 07 Reports & Analytics
- **Headline:** Report from the records the team already works in.
- **Intro:** Reports and dashboards come from the records, so a figure can be traced back.
- **Features:**
  - **Reports.** Saved reports with tags, pinned favorites and a list or grid view.
  - **Dashboards.** Build dashboards for a team, and open the source report from a card.
  - **Pipeline Analytics.** Deals by stage, and how they move.
  - **Customer Segmentation.** Group customers by behavior, history or engagement.
  - **Conversion Tracking.** See where leads become deals and deals become customers.
- **Visual brief:** A real reports screen (the saved reports list), plus the dashboard with cards that link to their source. Real app screens are allowed here.

### 08 Customization & Automation
- **Headline:** Make the CRM follow your process.
- **Intro:** Change the modules and fields, and let the routine steps run on rules.
- **Features:**
  - **Modules & Fields.** Add modules and the fields your team uses.
  - **Workflow Automation.** Run repeated steps such as assignment, follow ups and notifications.
  - **Lead Routing Rules.** Assign leads to the right person automatically.
  - **Approval Workflows.** Ask for approval on quotes, deals or pricing changes.
- **Visual brief:** The trigger, rule and actions flow with a person on the assign step, as on the home page.

### 09 Access & Administration
- **Headline:** Decide who sees and changes what.
- **Intro:** Set up the team, the roles and the rules once, and keep your data safe and portable.
- **Features:**
  - **Role Hierarchy.** A role tree that shows who reports to whom.
  - **Permissions.** Set what a role can view, edit, delete and export, module by module.
  - **Users & Organization.** Add team members, and keep the company details and settings together.
  - **Data Import, Export & Backup.** Bring data in from CSV, Excel or JSON, take it out, and keep a backup.
- **Visual brief:** The real role tree and permission matrix are the strongest proof here. Allowed to use real screens, with clean role names.

### 10 Views & Everyday Tools
- **Headline:** Work the way you prefer.
- **Intro:** Your records in the view that suits the task, with small tools that save time during the day.
- **Features:**
  - **List, Grid & Kanban.** See deals and leads as a table, as cards or as a board.
  - **Filters, Columns & Sorting.** Choose what to show, narrow it down and order it.
  - **Search.** Find a lead, deal or contact from anywhere with Ctrl K.
  - **Notifications.** A bell for what needs attention.
  - **Themes & Dark Mode.** Pick a theme, or switch to dark mode.
  - **Mobile Access.** Open deals, update leads, manage tasks and send email from a phone, including offline.
- **Visual brief:** The Kanban board with real owners, and the phone with floating chips (as on the home page). Use clean sample data.

---

### Closing
- **Headline:** Bring a renewal you need to close.
- **Body:** Book a demo and we will set up your stages and approval rules around a real deal.
- **Buttons:** Book a demo, Request pricing

---

## 3. Home page link
The "Explore all features" button on `/products/crm-v1` should point to `/products/crm-v1/features` once this page is built. Today it points to the old page.
