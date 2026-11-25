# EVOQ CRM: features page vs the demo app

Compared on 2026-11-24. Left side: the current features page (`/products/crm/features`, 8 areas, 36 features). Right side: what I could find in the common demo app (`evoq-crm-v1.vercel.app`, signed in as an admin).
Internal working document. The status words below are for us only and must not appear on the website.

Legend
- **In the app**: found and working in the common demo.
- **Partly**: something close exists, but not the full claim.
- **Not seen**: not in the common demo. Some of these are in the enterprise demo (you confirmed automation, lead scoring, forecasting and mobile). Those need to be confirmed one by one.
- **Coming soon**: the app itself says "This section is coming soon."

## Summary

| Status | Features | Share |
|---|---|---|
| In the app | 10 | 28% |
| Partly | 6 | 17% |
| Coming soon | 1 | 3% |
| Not seen in the common demo | 19 | 53% |

The app is strong on the core record work (leads, contacts, accounts, deals, tasks, reports, roles). It is thin on everything that automates, forecasts or reaches out.

## Area by area

### 01 Lead Management
| Feature on the page | Status | What I found |
|---|---|---|
| Lead Capture (forms, campaigns, chats, imports, integrations) | Partly | New Lead form, CSV or Excel or JSON import in Settings, a Lead Source field on every lead. No web form, chat or integration capture. |
| Lead Assignment (rules, territories, availability) | Not seen | A Lead Owner field and owners on every lead. No rules or territories. |
| Lead Scoring | Not seen | A Rating field (for example "Warm"). No score. |
| Lead Nurturing (automated follow ups) | Not seen | Customer Comms is "coming soon". |
| Lead Pipeline | In the app | Six statuses (New, Contacted, In Progress, Qualified, Lost, Unqualified), List, Grid and Kanban views, a stage bar on each lead, Convert to deal. |

### 02 Contacts & Accounts
| Feature | Status | What I found |
|---|---|---|
| Contacts | In the app | Full record: owner, lead source, account, related deals, tasks, notes, attachments, Overview and Timeline tabs. |
| Accounts | In the app | List with owner, type and modified details. |
| Email Synchronization | Coming soon | Settings, Channels, Email says "coming soon". Records have a Send Email button, but nothing syncs. |
| Contact Import | In the app | Settings, Import (CSV, Excel, JSON). |

### 03 Sales Pipeline & Deals
| Feature | Status | What I found |
|---|---|---|
| Pipeline Management | In the app | Seven stages from Qualification to Closed Won, List, Grid and Kanban, stage totals. |
| Deal Tracking | In the app | Amount, probability, expected revenue, closing date, owner, type, next step, lead source, stage history with days in each stage. |
| Deal Stage Automation | Not seen | No triggers or rules. |
| Quote Generation | Not seen | "Quote" exists only as a task type. No quote builder on the deal. |
| Product Catalog | Not seen | No products module. |

### 04 Sales Team Management
| Feature | Status | What I found |
|---|---|---|
| Activity Monitoring | Partly | A live activity feed on the dashboard (who did what, when). Calls, notes and tasks are logged on records. |
| Goal Tracking (quotas) | Not seen | No targets or quotas. |
| Performance Dashboards | Partly | A dashboard with KPI cards, a revenue trend, pipeline by stage and recent deals. Custom dashboards can be created. No per rep or team view. |
| Sales Forecasting | Not seen | Each deal has an expected revenue figure (probability weighted). No forecast view. |

### 05 Tasks & Scheduling
| Feature | Status | What I found |
|---|---|---|
| Task Management | In the app | Tasks with type, subject, due date, status, priority, contact, related record and owner. |
| Meeting Scheduling | Not seen | The dashboard shows "Meetings today" but there is no meetings module. |
| Calendar Synchronization | Not seen | |
| Reminders & Alerts | Partly | A reminder switch on a task and a notification bell. |
| Activity Tracking | In the app | Calls, notes, tasks and a Timeline on records. |

### 06 Campaign Management
| Feature | Status | What I found |
|---|---|---|
| Email Campaigns | Not seen | Campaigns is a separate EVOQ product. |
| SMS Campaigns | Not seen | |
| Campaign Automation | Not seen | |
| Engagement Tracking | Not seen | Customer Comms is "coming soon". |

### 07 Reports & Analytics
| Feature | Status | What I found |
|---|---|---|
| Reports | In the app | Saved reports with tags and pinning, list and grid views, Create Report. Dashboard cards link to their source report. |
| Performance Dashboards | In the app | Dashboard V1 and Create Dashboard in Settings. |
| Pipeline Analytics | Partly | A "Pipeline by stage" chart. |
| Customer Segmentation | Not seen | This is the Analytics gap you mentioned. |
| Conversion Tracking | Not seen | |

### 08 Customization & Automation
| Feature | Status | What I found |
|---|---|---|
| Custom Fields | Partly | Modules and Fields lists the modules and lets you add a module. I did not open field editing. |
| Workflow Automation | Not seen | |
| Lead Routing Rules | Not seen | |
| Approval Workflows | Not seen | Roles and permissions exist, but no approval flow. |

## In the app but not on the features page

These are strengths the page does not mention. Several are worth adding.
- **Roles and permissions:** a role tree with reporting lines, and a permission matrix by module and by role. Users and Organization settings.
- **Three ways to see records:** List, Grid and Kanban, with filters, column choice, sorting and search on every list.
- **Convert:** lead to deal, and deal actions, from the record.
- **Stage history:** days spent in each stage and where the deal came from.
- **Themes:** several colour themes, and Dashboard Customization.
- **Everyday polish:** Ctrl K search, notifications, dark mode, attachments on records.

## "Coming soon" inside the app
Customer Comms, Email settings, Export, Data Backup.

## Effect on the CRM page

The v1 feature cards promise more than the common demo shows. By card:

| Card | Safe from the app | Needs the enterprise demo or a launch date |
|---|---|---|
| Contacts & Accounts | Profiles, activity history, notes, owner, import | Export (coming soon) |
| Leads & Pipeline | Statuses, three views, stages with probability, filters and sorting | Automatic lead assignment |
| Quotes & Revenue | Probability and expected revenue per deal | Quote generation, approval steps, payment tracking, lead scoring, ConfigX pairing |
| Reports & Forecasting | Saved reports, dashboards with source links, pipeline by stage | Revenue forecast, team performance and conversion trends |
| Tasks & Meetings | Tasks with type, priority and due date, linked records, reminders | Meetings, calendar sync |
| Campaigns & Outreach | Nothing (Campaigns is a separate product) | Segments, email and SMS, tracking |
| Automation & Customization | Custom modules, roles and permissions, themes, dashboards | Workflow automation, backup (coming soon) |
| Mobile | Not checked in this pass | Everything, including offline |

## Questions for you
1. Which of the "Not seen" features are real in the enterprise demo? Please confirm them by name so the v1 page and the features page can say the same thing.
2. Analytics (segmentation, conversion tracking): is there a date, or should the page leave them out until they ship?
3. The features page shows figures (247 active leads, 94% quota attainment, 12+ dashboard templates, 2,847 activities, ±8% forecast variance, $2.4M pipeline). None of them are backed by the app. Remove them from the new page?
4. Should the new features page also feature the strengths above (roles and permissions, three record views, stage history)?
