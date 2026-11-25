# CRM features page: new visual style and a lighter left side (plan)

Planning only. Nothing is changed until this is reviewed.

---

## 1. What the Monday CRM section does (checked tab by tab)

"One connected revenue engine" has four tabs in a pill bar. One tab shows one panel.

| Part | What it looks like |
|---|---|
| Tab bar | One grey rounded bar with four pills. The active pill is light blue. Nothing else competes with it |
| Panel | One soft grey rounded box, about 420 px tall, split in two halves |
| Visual (left half) | A white inner card with one small piece of the product, centered, with a lot of empty space around it. Tab 1: a three step flow. Tab 2: one lead profile card. Tab 3: an email and meeting timeline. Tab 4: a table with one floating deal card and a cursor |
| Text (right half) | A two line heading, a three line paragraph and one text link. No numbers, no list, no pins |
| Feel | One idea per tab, no photographs, no overlapping layers, soft shadows, a lot of white space |

Our page does the opposite: ten areas, a full screen of the app that bleeds off the edges, a photograph, two or three cards, three pins and a plane on one visual. That is why it feels busy.

## 2. Proposed visual style (right side)

1. **One fragment, not a whole screen.** Each area shows a zoomed crop of the real app (a lead record, two Kanban columns, a timeline, a role tree, four KPI cards), with sample data. It sits in a white inner card on a soft panel, with space around it.
2. **At most one small floating card** per area, and a cursor arrow where an action is shown (as in Monday's last tab).
3. **Mobile screens in four areas:** Lead Management (a new lead on a phone), Pipeline & Deals (a deal moving a stage), Tasks & Scheduling (due today) and Views & Everyday Tools (a list on the phone). The phone frame sits beside the fragment, not over it.
4. **Drawn fragments where the app has no screen:** Campaigns (segment, email, reply as three small nodes) and Automation (a trigger, a rule and an action, like Monday's first tab). These are drawn for this page.
5. **No stock photographs.** The people photos are the least Monday like part and add the most noise.
6. **Pins and plane.** Pins on a small fragment will crowd it. I suggest a soft ring around the part of the fragment the active feature describes, and keeping the plane as a small pointer that moves to that part. If you prefer Monday's cursor arrow instead of the plane, it is the same code.

## 3. The left side: why it feels congested, and options

Today the left column holds ten area names, three group headings, and for the open area a title, a paragraph and three features. That is about 1,130 px of text beside one visual.

| Option | What it is | For | Against |
|---|---|---|---|
| **L1 (recommended): pill bar on top, Monday style** | The ten areas become short pills in one row above the panel: Leads, Contacts, Pipeline, Tasks, Campaigns, Team, Reports, Automation, Access, Views. Below is the panel: text on the left (title, one line, the three features), the fragment on the right | The left column holds only the open area, so the list of ten disappears. The section fits on one screen and is about half as tall. It matches the reference. Pills scroll sideways on phones | A visitor sees the other areas only as pill names |
| L2: two rows | Three group pills (Sell, Reach & measure, Set up & control), and under them three to four small area tabs | Fewer pills at once | Two clicks to reach an area |
| L3: names only rail | Keep a vertical list, but only area names, no group headings, no text. The open area's text moves into the panel beside the visual | Keeps the familiar list | The panel gets the text and the crowding returns on the right |

With L1 the right visual no longer needs to be sticky, because the whole section fits one screen. The auto tour stays: the pills advance one by one until a visitor clicks.

## 4. Fragment for each area

| Area | Fragment (real app unless noted) | Mobile |
|---|---|---|
| Lead Management | A lead record with its stage bar | Phone: a new lead |
| Contacts & Accounts | The contact header and the overview fields | |
| Pipeline & Deals | Two Kanban columns, with one deal card lifted and a cursor | Phone: a deal in a stage |
| Tasks & Scheduling | A short task list (sample tasks added in the demo) | Phone: due today |
| Campaigns | Drawn: segment, email, reply nodes | |
| Team Performance | The four KPI cards and a trend | |
| Reports & Analytics | The saved reports list with one chart | |
| Customization & Automation | Drawn: trigger, rule, action nodes, plus a modules row | |
| Access & Administration | The role tree and three permission rows | |
| Views & Everyday Tools | The same list in light and dark side by side | Phone: the list |

## 5. Work steps

1. Capture the fragments from the demo (clean sample data, no account details) and the mobile screens.
2. Build the pill bar and the panel, and move the content out of the old scene definitions.
3. Draw the two node fragments and the phone frame.
4. Remove the photographs and the old full screen scenes, then check desktop, tablet and phone widths and the text wrapping.

## 6. Questions before I start

1. L1, L2 or L3 for the left side?
2. Pins and plane, or a soft ring and a cursor arrow?
3. Drop all stock photographs?
4. **Mobile:** is there a native EVOQ CRM mobile app, or does the demo only run in the browser at phone width? This decides whether the phone screens may be captioned as the mobile app, and whether "works offline" stays in the Mobile Access feature. I can capture the demo at phone width, but I have not yet checked how it behaves there.
5. Are drawn fragments fine for Campaigns and Automation, since the demo has no screen for them?
6. Keep the automatic tour?
