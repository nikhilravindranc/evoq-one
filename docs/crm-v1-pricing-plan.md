# CRM v1 pricing page: review of the live page and the plan

Route to build: `/products/crm-v1/pricing` (the live `/products/crm/pricing` stays as it is).
Planning only. Nothing is built until the decisions in section 4 are answered.

---

## 1. What the live pricing page has today

It is a static HTML file (`public/site/products-crm-pricing.html`) shown inside the site, so it does not use the CRM v1 shell, header bar or type tokens.

| Block | Content |
|---|---|
| Hero | "Powerful CRM, Simple Pricing", one line, four chips: 14 day free trial with no credit card, No hidden fees, Monthly or annual billing, Scales as your business grows |
| Controls | Monthly and Annual toggle ("Save up to 30%"), region and currency selector (India, INR only) |
| Plan cards | Pro ₹1,200, Max ₹1,900 (marked Most Popular), Enterprise on request. Annual shows ₹800 and ₹1,400. Each card has 8 to 12 inclusions and its limits |
| Notes | A line on tax, links to implementation details and the full comparison |
| Compare plans | A table of about 45 rows in six groups (Sales, Automation & AI, Analytics, Customization, Security & Support, Resources), mostly ticks and dashes |
| FAQ | Ten questions in an accordion |
| Footer | Standard footer |

## 2. What is wrong or out of date

1. **Free trial.** The page promises a 14 day free trial, "Start Free Trial" and "no credit card". The confirmed model is a demo on request with no free trial, and we already removed "Get Started Free" from the features page.
2. **Annual discount contradicts itself.** The toggle says "Save up to 30%" and shows ₹800 and ₹1,400 (33% and 26% below monthly). The FAQ says annual billing gives a 10% discount. One of them is wrong.
3. **Fake proof.** "Most Popular" on Max is a claim we cannot back.
4. **Copy that breaks our rules.**
   - "Powerful CRM, Simple Pricing", "No hidden fees" and "Scales as your business grows" fit any SaaS brand.
   - "every plan", "Everything you need to know", "Absolutely", "seamlessly", "easy import tools".
   - "enterprise grade encryption" is a claim nobody has confirmed.
   - The footer still says "One Suite. Endless Potential."
5. **Outdated names.** The FAQ says EVOQ CRM connects with "FSM, Commerce". The products are ServiceOps and the others on the products page.
6. **Names and tiers do not match the v1 features page.** The features page names Lead Assignment, Lead Scoring, Approval Workflows, Quote Generation and Forecasting without a plan. The pricing page puts them in different tiers: Scoring, Auto Assignment, Forecasting, Segmentation and Territory in Enterprise, and Workflow Automation, Approval Workflows, Quotes & Invoices and Inventory in Max. Mobile, offline use, campaigns, export and backup appear on neither list.
7. **Credits.** "AI Assistant (300 credits)" is AI led wording, and we agreed not to push AI. It also never says what a credit buys.
8. **Design.** It is the generic template look, with a different header and a long table at the end. It is the same endless scroll problem we just removed from the features page.

## 3. Proposed CRM v1 pricing page

Same shell, product bar (Pricing shown as active), site type tokens, single line section titles, no disclaimer captions and no status tags.

| Order | Section | What it does |
|---|---|---|
| 1 | Hero | A short headline and one line. A new photo that appears nowhere else, with two small cards (a plan and a user count) in the style of the features hero. No form, one button: Book a demo |
| 2 | Plans | Three cards: Pro, Max, Enterprise. A monthly and annual toggle and the region selector sit above them. Each card shows who it is for, the price, the six to eight inclusions people ask about, and its limits as small chips. Max is lifted by size and colour, with no "Most Popular" tag. Buttons: Book a demo, and Talk to sales for Enterprise |
| 3 | Compare | Not a 45 row table. Groups become tabs (Sales, Automation, Analytics, Customization, Security & Support, Limits), one group on screen at a time, with a switch to show only the rows that differ between plans. Values read as words (Basic, Advanced, Executive) instead of ticks where there is a difference |
| 4 | What changes the price | Four small cards: users, storage, extra AI credit packs, and implementation. The last one links to the implementation page |
| 5 | Questions | Eight questions in an accordion, rewritten (see below) |
| 6 | Closing | The same "Bring a renewal you need to close." card with both buttons |

Questions after the rewrite: Is there a trial? (answer points to the demo), Is there a long term contract, What does annual billing change, What happens when the team grows, Can I move data from another CRM, What support is included, Can I move between plans, What if I need more storage or credits. The security and integration questions stay only if the facts are confirmed.

Files: `components/crm-v1/CrmV1PricingPage.tsx`, `components/crm-v1/pricingData.ts`, `app/products/crm-v1/pricing/page.tsx`, a `noindex` entry in `lib/seo.tsx`, and the product bar change (Pricing becomes a link to this page).

Visuals: a new hero photo and small cards only. Plan cards stay typographic with soft colour bands. The app screens and photos on the features page are not reused here.

## 4. Decisions needed

1. **Show prices?** The live page shows ₹1,200 and ₹1,900, while the confirmed model says pricing is shared in the demo. Options: A, show the prices with Book a demo buttons (recommended if the prices are final). B, show plans and limits but no prices, "Pricing in the demo". C, show prices for India only and "on request" elsewhere.
2. **Free trial.** Remove it everywhere, including the FAQ. Confirm.
3. **Annual discount.** Is it the 26% to 33% the toggle shows, or the 10% in the FAQ?
4. **Regions and currencies.** India and INR only, or are there other prices? Keep the selector?
5. **Tiers.** Confirm the plan for these features: Lead Assignment and Lead Scoring, Approval Workflows, Quote Generation, Sales Forecasting, Customer Segmentation, Mobile and offline, Export and Backup, Campaigns. Then we choose between plan tags on the features page and no tags.
6. **AI credits.** Keep the word "credits", and what does one credit buy? Or leave AI out of the plan list?
7. **Limits.** Are 100,000, 500,000 and 1,000,000+ records, and 2, 10 and 50 GB of storage still right?
8. **Security and integration answers.** What can we say about encryption and the integrations with other EVOQ apps?
9. **Header button.** After this page exists, should the "Request pricing" form go, and keep only "Book a demo"?
