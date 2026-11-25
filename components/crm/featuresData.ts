/* CRM features page content (docs/crm-features-content.md). Ten areas. A visitor sees the title, the description and the three
   headline features of the open area; the remaining features of the area are only named. The visual for each area is drawn in
   CrmFeaturesPage.tsx. */

export type Feature = { n: string; d: string };

export type Area = {
  id: string;
  name: string;
  head: string;
  lead: string;
  top: [Feature, Feature, Feature];
  also: string[];
};

export const AREAS: Area[] = [
  {
    id: "leads", name: "Lead Management",
    head: "Capture leads and assign them by your rules.",
    lead: "Bring leads in, route them by your rules and watch them move from New to Qualified.",
    top: [
      { n: "Lead Capture", d: "Bring leads in from web forms, chats, imports and integrations." },
      { n: "Lead Pipeline", d: "See leads by status, from New to Qualified, and convert a qualified lead to a deal." },
      { n: "Lead Assignment", d: "Route new leads to the right owner by rule, territory or availability." },
    ],
    also: ["Lead Scoring", "Lead Nurturing", "Lead Record"],
  },
  {
    id: "contacts", name: "Contacts & Accounts",
    head: "Keep people, companies and conversations together.",
    lead: "Keep people and the companies they belong to side by side, with the conversations attached.",
    top: [
      { n: "Contacts", d: "A profile for a person with their owner, lead source, related deals, tasks and notes." },
      { n: "Accounts", d: "Companies with their owners and the contacts that belong to them." },
      { n: "Timeline", d: "Calls, emails, notes and tasks on a record, in order." },
    ],
    also: ["Email Synchronization", "Contact Import"],
  },
  {
    id: "pipeline", name: "Pipeline & Deals",
    head: "Move deals through your sales stages.",
    lead: "Move deals through stages that follow your process, with the money and the next step on the record.",
    top: [
      { n: "Pipeline Management", d: "Stages that follow your process, in list, grid or Kanban." },
      { n: "Deal Tracking", d: "Amount, expected revenue, closing date, owner and next step on a deal." },
      { n: "Quote Generation", d: "Create and send a quote from the deal." },
    ],
    also: ["Stage History", "Deal Stage Automation", "Product Catalog"],
  },
  {
    id: "tasks", name: "Tasks & Scheduling",
    head: "Schedule follow ups, meetings and reminders.",
    lead: "Tasks, meetings and reminders sit on the records they belong to, so nothing depends on memory.",
    top: [
      { n: "Task Management", d: "Tasks with type, status, priority, due date and the contact or deal they relate to." },
      { n: "Meeting Scheduling", d: "Book and manage meetings from the CRM." },
      { n: "Reminders & Alerts", d: "A reminder on a task, and notifications for what is due." },
    ],
    also: ["Calendar Synchronization", "Activity Tracking"],
  },
  {
    id: "campaigns", name: "Campaigns",
    head: "Send email and SMS campaigns to your segments.",
    lead: "Run email and SMS campaigns to the segments you build in the CRM, and see the results next to the leads.",
    top: [
      { n: "Email Campaigns", d: "Send targeted email to prospects and customers." },
      { n: "SMS Campaigns", d: "Reach people quickly when timing matters." },
      { n: "Engagement Tracking", d: "Opens, clicks and replies for a campaign." },
    ],
    also: ["Campaign Automation"],
  },
  {
    id: "team", name: "Team Performance",
    head: "Track team activity, goals and forecasts.",
    lead: "Activity, goals and forecasts in dashboards that update as the team works.",
    top: [
      { n: "Goal Tracking", d: "Set targets for people or teams and watch progress." },
      { n: "Performance Dashboards", d: "Closed deals, pipeline value and activity by person or team." },
      { n: "Sales Forecasting", d: "Project revenue from deal probability and the pipeline." },
    ],
    also: ["Activity Monitoring"],
  },
  {
    id: "reports", name: "Reports & Analytics",
    head: "Build reports and dashboards from your records.",
    lead: "Reports and dashboards come from the records, so a figure can be traced back.",
    top: [
      { n: "Reports", d: "Saved reports with tags, pinned favorites and a list or grid view." },
      { n: "Dashboards", d: "Build dashboards for a team, and open the source report from a card." },
      { n: "Pipeline Analytics", d: "Deals by stage, and how they move." },
    ],
    also: ["Customer Segmentation", "Conversion Tracking"],
  },
  {
    id: "automation", name: "Customization & Automation",
    head: "Adjust fields and modules, and automate routine steps.",
    lead: "Change the modules and fields, and let the routine steps run on rules.",
    top: [
      { n: "Workflow Automation", d: "Run repeated steps such as assignment, follow ups and notifications." },
      { n: "Modules & Fields", d: "Add modules and the fields your team uses." },
      { n: "Approval Workflows", d: "Ask for approval on quotes, deals or pricing changes." },
    ],
    also: ["Lead Routing Rules"],
  },
  {
    id: "access", name: "Access & Administration",
    head: "Set roles and permissions for your team.",
    lead: "Set up the team, the roles and the rules once, and keep your data safe and portable.",
    top: [
      { n: "Role Hierarchy", d: "A role tree that shows who reports to whom." },
      { n: "Permissions", d: "Set what a role can view, edit, delete and export, module by module." },
      { n: "Users & Organization", d: "Add team members, and keep the company details and settings together." },
    ],
    also: ["Data Import, Export & Backup"],
  },
  {
    id: "views", name: "Views & Mobile",
    head: "Switch between list, grid and kanban views.",
    lead: "Your records in the view that suits the task, with small tools that save time during the day.",
    top: [
      { n: "Search", d: "Find a lead, deal or contact from anywhere with Ctrl K." },
      { n: "Themes & Dark Mode", d: "Pick a theme, or switch to dark mode." },
      { n: "Mobile Access", d: "Open deals, update leads, manage tasks and send email from a phone, including offline." },
    ],
    also: ["List, Grid & Kanban", "Filters, Columns & Sorting", "Notifications"],
  },
];
