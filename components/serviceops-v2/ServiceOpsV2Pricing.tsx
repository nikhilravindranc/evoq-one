"use client";
/* eslint-disable @next/next/no-img-element */

import { Fragment, useState, type ReactNode } from "react";
import { useRegion } from "@/components/shared/RegionContext";
import { Ic } from "../serviceops/icons";
import { AMBER, AMBER_DEEP, AMBER_SOFT, BODY, G1, G2, INK, LINE, MUTED } from "./palette";
import { V2Demo, V2Shell } from "./V2Shell";
import { homeCss, Label } from "./ServiceOpsV2";

/* ServiceOps v2, Pricing. India (INR) and International (USD) share the site wide region choice, so the toggle here
   and the one in the top bar always agree. Annual prices are the monthly price less 10%, as published. */

type Cur = "IN" | "INT";
type Plan = { n: string; jobs: string; d: string; f: string[]; p?: Record<Cur, [number, number]>; ent?: boolean };

const PLANS: Plan[] = [
  { n: "Standard", jobs: "250", d: "For smaller service operations managing a steady volume of jobs.", p: { IN: [12999, 11699], INT: [149, 134] },
    f: ["250 jobs per month", "10 user/technician accounts", "10 customer accounts", "500 products, assets and spare parts", "5 GB storage"] },
  { n: "Growth", jobs: "1,000", d: "For service operations coordinating more technicians and a higher monthly workload.", p: { IN: [29999, 26999], INT: [349, 314] },
    f: ["1,000 jobs per month", "40 user/technician accounts", "50 customer accounts", "2,000 products, assets and spare parts", "20 GB storage"] },
  { n: "Professional", jobs: "2,500", d: "For established service organizations managing multiple service teams and a larger job volume.", p: { IN: [49999, 44999], INT: [599, 539] },
    f: ["2,500 jobs per month", "100 user/technician accounts", "125 customer accounts", "5,000 products, assets and spare parts", "50 GB storage"] },
  { n: "Scale", jobs: "5,000", d: "For high-volume service operations with greater capacity requirements and customer-facing automation.", p: { IN: [89999, 80999], INT: [999, 899] },
    f: ["5,000 jobs per month", "200 user/technician accounts", "250 customer accounts", "10,000 products, assets and spare parts", "100 GB storage", "Web-chat receptionist"] },
  { n: "Enterprise", jobs: "10,000+", ent: true, d: "For large service organizations with custom operational, deployment and integration requirements.",
    f: ["10,000+ jobs per month", "Custom user and technician accounts", "Custom customer capacity", "Custom product, asset and spare-parts capacity", "Custom storage allocation", "Web-chat receptionist", "Phone and SMS receptionist entitlement", "Remote video expert entitlement", "Scheduled daily agent execution entitlement", "Review import and automatic posting entitlement", "Custom implementation and commercial terms"] },
];

const money = (c: Cur, n: number) => (c === "IN" ? "₹" + n.toLocaleString("en-IN") : "$" + n.toLocaleString("en-US"));

const Y = "y", N = "n";
const ALL = [Y, Y, Y, Y, Y];
const CAP: [string, string[]][] = [
  ["Jobs per month", ["250", "1,000", "2,500", "5,000", "10,000+"]],
  ["User and technician accounts", ["10", "40", "100", "200", "Custom"]],
  ["Customer accounts", ["10", "50", "125", "250", "Custom"]],
  ["Products, assets and spare parts", ["500", "2,000", "5,000", "10,000", "Custom"]],
  ["Storage", ["5 GB", "20 GB", "50 GB", "100 GB", "Custom"]],
];
const COMPARE: { t: string; rows: [string, string[]][] }[] = [
  { t: "Service management", rows: ["Service request management", "Work order management", "Multiple work types", "Estimates and customer approval", "Workflows and approval rules", "Job history and attachments", "Failed-visit follow-up"].map((x) => [x, ALL]) },
  { t: "Scheduling and technician operations", rows: ["Dispatch queue and scheduling", "Technician workload visibility", "Technician ranking and assignment explanations", "Optimize the Day recommendations", "Map and timeline views", "Technician mobile application", "Checklists, photos and job notes", "Timesheets and trip sheets", "Customer sign-off", "Offline synchronization", "Optional technician location sharing"].map((x) => [x, ALL]) },
  { t: "Customers, assets and inventory", rows: ["Customer records and service history", "Asset and warranty management", "Service plans and maintenance scheduling", "Products, parts and services catalog", "Inventory and van stock visibility", "Parts requests and returns"].map((x) => [x, ALL]) },
  { t: "Financial management and reporting", rows: ["Job costing", "Job profitability information", "Estimates and invoices", "Payment links and payment recording", "Operational reports", "Configurable dashboards", "CSV import and export"].map((x) => [x, ALL]) },
  { t: "Automation and AI", rows: ["Automation rules and notifications", "Operational alerts", "EVI assistant access", "Dispatch AI helper", "Intake AI helper", "Collections AI helper", "Quote Follow-up AI helper", "Risk Flags AI helper", "Coaching AI helper"].map((x) => [x, ALL]) },
  { t: "Customer-facing and Enterprise capabilities", rows: [
    ["Web-chat receptionist", [N, N, N, Y, Y]],
    ["Phone receptionist", [N, N, N, N, "Enterprise entitlement"]],
    ["SMS receptionist", [N, N, N, N, "Enterprise entitlement"]],
    ["Remote video expert", [N, N, N, N, "Enterprise entitlement"]],
    ["Scheduled daily agent execution", [N, N, N, N, "Enterprise entitlement"]],
    ["Review import and automatic posting", [N, N, N, N, "Enterprise entitlement"]],
    ["Custom integrations and development", [N, N, N, N, "Scope-based"]],
    ["Custom capacity and deployment arrangements", [N, N, N, N, Y]],
  ] },
];

const COVERS: { t: string; ic: ReactNode; items: string[] }[] = [
  { t: "Service requests and work orders", ic: Ic.inbox, items: ["Service request inbox and pipeline", "Work order creation and management", "Estimates and customer approval", "Work-type-specific workflows and approval steps", "Installation, Service, Maintenance, Repair and Inspection work types", "Job history, attachments and follow-up for unsuccessful visits"] },
  { t: "Scheduling and dispatch", ic: Ic.calendar, items: ["Dispatch queue and scheduling", "Technician workload visibility", "Technician ranking with assignment explanations", "Map and timeline views", "Optimize the Day assignment recommendations", "Review and apply proposed assignments before they are booked"] },
  { t: "Technician mobile operations", ic: Ic.checklist, items: ["Technician mobile application", "Job details and service checklists", "Photos, notes and service documentation", "Parts usage and requests", "Timesheets and trip sheets", "Customer sign-off", "Offline data synchronization", "Optional location sharing"] },
  { t: "Customers, assets and maintenance", ic: Ic.users, items: ["Customer records and service history", "Asset records, warranties and service history", "Service plans and maintenance scheduling", "Products, parts and services catalog", "Inventory and van stock visibility", "Parts requests and returns"] },
  { t: "Job costing and billing", ic: Ic.receipt, items: ["Job costing and profitability information", "Estimates and invoices", "Payment links and payment recording", "Service and parts costing"] },
  { t: "Reports and administration", ic: Ic.chart, items: ["Operational reports and dashboards", "CSV import and report export", "Role-based permissions", "Custom fields", "Configurable dashboards", "Automation rules and notifications", "Operational alerts and activity history"] },
  { t: "EVI and AI assistance", ic: Ic.spark, items: ["EVI assistant access", "Dispatch, Intake, Collections, Quote Follow-up, Risk Flags and Coaching AI helpers", "AI-generated drafts, recommendations and suggested actions for human review"] },
];

const EXTRA: [string, string, string][] = [
  ["100 jobs", "₹3,000", "$35"],
  ["1 user/technician account", "₹800", "$10"],
  ["10 GB storage", "₹500", "$5"],
  ["100 customer records", "₹500", "$5"],
  ["500 products, assets and spare parts", "₹1,000", "$15"],
];

const EXTRA_HOW = [
  "Add capacity when your service operation exceeds its included allowance.",
  "Purchase multiple units of an allowance.",
  "Additional capacity is added to the subscription's existing limits.",
  "Receive usage notifications before reaching the allocated limit.",
  "Additional charges require customer approval or an agreed billing arrangement.",
  "If additional capacity is needed consistently, EVOQ may recommend moving to a higher plan.",
];

const SERVICES = ["Initial system configuration", "Work types, approval rules and workflow setup", "Technician and user-role configuration", "SLA and notification configuration", "Data migration and import assistance", "Custom dashboards and reports", "Third-party integrations", "Payment gateway integration", "Custom technician payout calculations", "Multi-city operational configuration", "Admin training and onboarding"];

const ENT = ["Phone and SMS receptionist", "Remote video expert", "Scheduled daily agent execution", "Review import and automatic posting", "Custom usage allowances", "Custom integrations and reporting", "Agreed support and service commitments"];

const FAQ: [string, string][] = [
  ["What is included in each ServiceOps plan?", "Every published plan includes the core ServiceOps capabilities covering service requests, work orders, estimates, scheduling, dispatch, technician operations, customers, assets, inventory, job costing, billing, reporting and administration. Plan limits determine the included capacity."],
  ["Can I change my subscription later?", "Yes. You can upgrade when your service volume or operational requirements increase. Downgrades are subject to the lower plan's capacity limits and take effect according to the agreed billing terms."],
  ["How does annual billing work?", "Annual subscriptions require a 12-month commitment but are paid monthly. You receive a 10% discount against the standard monthly subscription price throughout the commitment period. The discounted monthly amount is shown in the annual pricing option."],
  ["Can I add more jobs or technicians without upgrading?", "Yes. Additional jobs and technician accounts can be purchased at the published additional-usage rates. The same rate card applies across Standard, Growth, Professional and Scale."],
  ["What happens when I reach my usage limit?", "You will receive usage notifications as you approach your allowance. You can purchase additional capacity or upgrade your subscription. Charges will not be applied automatically unless an automatic billing arrangement has been agreed."],
  ["Are implementation and onboarding included?", "Implementation and onboarding are quoted separately based on your deployment requirements. This ensures that data migration, configuration, integrations and training are scoped appropriately."],
  ["Is AI included in ServiceOps?", "EVI and the specialized AI helpers are available as product capabilities. Their operation depends on supported AI provider configuration. AI consumption, allowances and any additional charges are subject to the applicable AI usage terms."],
  ["Are SMS, phone and video services included?", "The phone and SMS receptionist and remote video expert are Enterprise-level entitlements. Provider charges, usage allowances, activation requirements and availability are agreed separately. These services are not unlimited by default."],
  ["Are taxes included in the listed prices?", "No. Prices are displayed before applicable taxes. The final invoice will include applicable taxes and any agreed additional charges."],
  ["Can I request a custom plan?", "Yes. Enterprise customers and organizations with requirements outside the published job volumes or capacity limits can contact EVOQ for a custom quotation."],
];

function Tick() {
  return <i className="pr-tick" aria-hidden>{Ic.check}</i>;
}

function Cell({ v }: { v: string }) {
  if (v === Y) return <span className="cm-y" aria-label="Included">{Ic.check}</span>;
  if (v === N) return <span className="cm-n" aria-label="Not included">&mdash;</span>;
  return <span className="cm-t">{v}</span>;
}

function Region({ cur, set }: { cur: Cur; set: (c: Cur) => void }) {
  return (
    <div className="pr-seg" role="group" aria-label="Currency and region">
      <button type="button" className={cur === "IN" ? "on" : ""} aria-pressed={cur === "IN"} onClick={() => set("IN")}>India <small>₹ INR</small></button>
      <button type="button" className={cur === "INT" ? "on" : ""} aria-pressed={cur === "INT"} onClick={() => set("INT")}>International <small>$ USD</small></button>
    </div>
  );
}

function PlanCard({ p, cur, annual }: { p: Plan; cur: Cur; annual: boolean }) {
  const price = p.p![cur];
  return (
    <li className="pr-card">
      <h3>{p.n}</h3>
      <small className="pr-jobs">{p.jobs} jobs/month</small>
      <p className="pr-d">{p.d}</p>
      <div className="pr-price">
        <b>{money(cur, price[annual ? 1 : 0])}</b>
        <span>per month{annual && <s>{money(cur, price[0])}</s>}</span>
        <em>{annual ? "12-month commitment, billed monthly" : "Month to month"}</em>
      </div>
      <V2Demo location={`pricing_${p.n.toLowerCase()}`} title="Get started" className="v2-btn primary pr-btn">Get Started</V2Demo>
      <ul className="pr-f">{p.f.map((x) => <li key={x}><Tick />{x}</li>)}</ul>
    </li>
  );
}

function EnterpriseBand({ p }: { p: Plan }) {
  return (
    <div className="pr-ent">
      <div className="pr-ent-l">
        <h3>{p.n}</h3>
        <small className="pr-jobs">{p.jobs} jobs/month</small>
        <p className="pr-d">{p.d}</p>
        <div className="pr-price"><b>Custom</b><em>Commercial terms agreed with you</em></div>
        <V2Demo location="pricing_enterprise_plan" title="Talk to an expert" className="v2-btn primary pr-btn">Talk to an Expert</V2Demo>
      </div>
      <ul className="pr-f">{p.f.map((x) => <li key={x}><Tick />{x}</li>)}</ul>
    </div>
  );
}

function PricingClosing() {
  return (
    <section className="v2-out cta-out flush">
      <div className="v2-in cta" data-rv>
        <div className="cta-copy">
          <h2 className="cta-h"><span>Find the right capacity</span> <span>for your service operation.</span></h2>
          <p className="cta-sub">Whether you manage a small technician team or a large field service operation, choose a subscription based on your monthly workload and expand capacity as requirements change.</p>
          <div className="v2-ctas">
            <V2Demo location="pricing_closing" title="Get started" className="v2-btn dark">Get Started</V2Demo>
            <V2Demo location="pricing_closing_expert" title="Talk to an expert" className="v2-btn ghost">Talk to an Expert</V2Demo>
          </div>
        </div>
        <div className="cta-ui" aria-hidden>
          <div className="cta-photo"><img src="/industries/v2/rt-main-hd.jpg" alt="" style={{ objectPosition: "30% 40%" }} /></div>
          <div className="cta-wo">
            <div className="cta-wo-h"><b>Plans by monthly jobs</b><small>Standard to Enterprise</small></div>
            {PLANS.map((p) => <div key={p.n} className="cta-st"><i>{Ic.check}</i><span>{p.n}</span><em>{p.jobs}</em></div>)}
          </div>
          <div className="cta-chip c1"><i>{Ic.layers}</i><span><b>Add capacity</b><small>As demand grows</small></span></div>
          <div className="cta-chip c2"><i>{Ic.check}</i><span><b>Save 10%</b><small>Annual commitment</small></span></div>
        </div>
      </div>
    </section>
  );
}

export function ServiceOpsV2Pricing() {
  const { region, setRegion } = useRegion();
  const cur: Cur = region === "India" ? "IN" : "INT";
  const setCur = (c: Cur) => setRegion(c === "IN" ? "India" : "USA");
  const [annual, setAnnual] = useState(false);
  const [open, setOpen] = useState<number | null>(0);
  const [more, setMore] = useState(false);

  return (
    <V2Shell page="pricing">
      <style>{homeCss}</style>
      <style>{css}</style>

      {/* hero */}
      <section className="ph-out">
        <div className="ph">
          <div className="ph-copy">
            <Label>ServiceOps pricing</Label>
            <h1>Service operations pricing that scales with your workload.</h1>
            <p>Choose a plan based on your monthly job volume, technician capacity and operational requirements. Add capacity as service demand increases, with custom arrangements available for larger operations.</p>
            <p className="ph-sub">All plans include core ServiceOps capabilities. Implementation, custom development and selected third-party services are quoted separately.</p>
          </div>
          <div className="ph-vis">
            <div className="ph-photo"><img src="/industries/v2/mo-team-hd.jpg" alt="A service team working through a plan together" /></div>
            <div className="ph-card">
              <span className="ph-card-k">Five plans</span>
              <b>250 to 10,000+<small> jobs a month</small></b>
              <em>Standard, Growth, Professional, Scale and Enterprise</em>
            </div>
          </div>
        </div>
      </section>

      {/* billing option, region and the plans */}
      <section className="v2-sec v2-out" id="plans">
        <div className="v2-in">
          <div className="pr-top" data-rv>
            <div>
              <Label>Subscription plans</Label>
              <h2 className="v2-h2">Choose your plan</h2>
            </div>
            <div className="pr-ctl">
              <div className="pr-seg sm" role="group" aria-label="Billing option">
                <button type="button" className={!annual ? "on" : ""} aria-pressed={!annual} onClick={() => setAnnual(false)}>Monthly</button>
                <button type="button" className={annual ? "on" : ""} aria-pressed={annual} onClick={() => setAnnual(true)}>Annual <small>Save 10%</small></button>
              </div>
              <Region cur={cur} set={setCur} />
            </div>
          </div>
          <p className="pr-opt" data-rv>
            {annual
              ? "Annual commitment: save 10% with a 12-month commitment and pay the discounted amount monthly. No upfront annual payment is required."
              : "Monthly subscription: pay month to month at the listed price. Choose the annual option to save 10%."}
          </p>
          <ul className="pr-grid">{PLANS.filter((p) => !p.ent).map((p) => <PlanCard key={p.n} p={p} cur={cur} annual={annual} />)}</ul>
          <EnterpriseBand p={PLANS[4]} />
          <p className="pr-fine">Annual prices reflect a 10% discount, rounded to the nearest whole currency unit. The annual option requires a 12-month commitment, with monthly payments at the discounted rate. Applicable taxes are additional. Enterprise capabilities are subject to agreed scope, provider configuration, availability and contractual terms.</p>
        </div>
      </section>

      {/* compare plans */}
      <section className="v2-sec v2-out v2-grey" id="compare">
        <div className="v2-in">
          <div className="tr-head" data-rv>
            <div>
              <Label>Compare ServiceOps plans</Label>
              <h2 className="v2-h2">Find the right fit for your service operation.</h2>
            </div>
            <p>Compare job allowances, operational capabilities and advanced features across subscription plans. See what is included at each level before choosing the right option.</p>
          </div>
          <div className={`cm-box${more ? " open" : ""}`} data-rv>
            <div className="cm-wrap">
              <table className="cm">
                <thead>
                  <tr><th scope="col"><span className="sr">Capability</span></th>{PLANS.map((p) => <th key={p.n} scope="col" className={p.ent ? "ent" : ""}>{p.n}</th>)}</tr>
                </thead>
                <tbody>
                  <tr className="cm-g"><th scope="colgroup" colSpan={6}>Plan capacity</th></tr>
                  {CAP.map(([l, v]) => (
                    <tr key={l}><th scope="row">{l}</th>{v.map((x, i) => <td key={i} className={i === 4 ? "ent" : ""}><Cell v={x} /></td>)}</tr>
                  ))}
                  {COMPARE.map((g, gi) => (gi === 0 || more) && (
                    <Fragment key={g.t}>
                      <tr className="cm-g"><th scope="colgroup" colSpan={6}>{g.t}</th></tr>
                      {g.rows.map(([l, v]) => (
                        <tr key={l}><th scope="row">{l}</th>{v.map((x, i) => <td key={i} className={i === 4 ? "ent" : ""}><Cell v={x} /></td>)}</tr>
                      ))}
                    </Fragment>
                  ))}
                  {more && (
                    <>
                      <tr className="cm-g"><th scope="colgroup" colSpan={6}>Additional usage <span className="pu-cur">{cur === "IN" ? "India, INR" : "International, USD"}</span></th></tr>
                      {EXTRA.map(([a, inr, usd]) => (
                        <tr key={a}>
                          <th scope="row">{a}</th>
                          <td colSpan={4} className="cm-add"><b>{cur === "IN" ? inr : usd}</b> per month, the same rate on Standard, Growth, Professional and Scale</td>
                          <td className="ent"><span className="cm-t">Agreed separately</span></td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
            <div className="cm-more">
              <button type="button" aria-expanded={more} onClick={() => setMore(!more)}>
                {more ? "View less" : "View all features and additional usage"}<i aria-hidden />
              </button>
            </div>
          </div>
          {more && (
            <div className="cm-how" data-rv>
              <h3>How additional usage works</h3>
              <ul>{EXTRA_HOW.map((x) => <li key={x}><Tick />{x}</li>)}</ul>
              <p>Additional capacity is billed monthly and applies to all published subscription plans. Multiple units can be purchased. Enterprise rates are agreed separately. Unused additional capacity does not automatically roll over to the next billing cycle.</p>
            </div>
          )}
          <p className="pr-fine">All core capabilities are subject to the applicable plan allowances and service terms. AI functionality depends on supported provider configuration. AI consumption may be subject to separate usage charges. Enterprise entitlements are subject to agreed scope, availability and provider configuration.</p>
          <div className="cm-need" data-rv>
            <div><b>Need a different job volume or deployment arrangement?</b><span>Contact our team to discuss a custom ServiceOps subscription.</span></div>
            <V2Demo location="pricing_compare" title="Talk to an expert" className="v2-btn dark">Talk to an Expert</V2Demo>
          </div>
        </div>
      </section>

      {/* what every plan covers */}
      <section className="v2-sec v2-out" id="covers">
        <div className="v2-in">
          <div className="tr-head" data-rv>
            <div>
              <Label>What is included</Label>
              <h2 className="v2-h2">Every plan covers the service lifecycle</h2>
            </div>
            <p>ServiceOps includes the core tools required to manage service requests, work orders, field visits, equipment and operational performance.</p>
          </div>
          <ul className="pc">
            {COVERS.map((c, i) => (
              <li key={c.t} data-rv style={{ ["--hs-d" as string]: `${(i % 4) * 60}ms` }}>
                <i>{c.ic}</i>
                <h3>{c.t}</h3>
                <ul>{c.items.map((x) => <li key={x}><Tick />{x}</li>)}</ul>
              </li>
            ))}
            <li className="pc-photo" aria-hidden>
              <img src="/industries/v2/fs-detail-hd.jpg" alt="" style={{ objectPosition: "40% 35%" }} />
            </li>
          </ul>
          <p className="pr-fine wide">AI functionality depends on the availability and configuration of supported AI providers. AI-generated outputs and proposed actions require appropriate review and approval. AI consumption and any applicable provider charges are governed by the applicable usage terms.</p>
        </div>
      </section>

      {/* implementation and enterprise */}
      <section className="v2-sec v2-out v2-grey" id="services">
        <div className="v2-in ps">
          <div className="ps-box" data-rv>
            <Label>Implementation and custom services</Label>
            <h2 className="v2-h2">Quoted for your deployment</h2>
            <p>Your ServiceOps subscription covers the application and the included plan capabilities. Implementation and customer-specific services are quoted separately.</p>
            <p>Depending on the deployment requirements, services may include:</p>
            <ul>{SERVICES.map((x) => <li key={x}><Tick />{x}</li>)}</ul>
            <small>The implementation quotation will define the agreed scope, deliverables, timeline and charges before work begins.</small>
          </div>
          <div className="ps-box ent" data-rv>
            <Label>Enterprise capabilities</Label>
            <h2 className="v2-h2">Built around your requirements</h2>
            <p>Enterprise agreements can include additional capabilities and deployment arrangements based on the customer&apos;s requirements.</p>
            <ul>{ENT.map((x) => <li key={x}><Tick />{x}</li>)}</ul>
            <small>These capabilities require scope confirmation and applicable provider configuration. Their availability, usage limits, third-party charges and activation timelines will be documented in the Enterprise agreement.</small>
            <V2Demo location="pricing_enterprise" title="Talk to an expert" className="v2-btn dark">Talk to an Expert</V2Demo>
          </div>
        </div>
      </section>

      {/* faq */}
      <section className="v2-sec v2-out" id="faq">
        <div className="v2-in pf">
          <div className="pf-head" data-rv>
            <Label>Questions</Label>
            <h2 className="v2-h2">Frequently asked questions</h2>
            <p>Can&apos;t find what you need? <button type="button" className="pf-link" onClick={() => document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" })}>Back to plans</button></p>
          </div>
          <div className="pf-list" data-rv>
            {FAQ.map(([q, a], i) => (
              <div key={q} className={`pf-item${open === i ? " on" : ""}`}>
                <h3>
                  <button type="button" id={`faq-b-${i}`} aria-expanded={open === i} aria-controls={`faq-p-${i}`} onClick={() => setOpen(open === i ? null : i)}>
                    {q}<i aria-hidden />
                  </button>
                </h3>
                <div id={`faq-p-${i}`} role="region" aria-labelledby={`faq-b-${i}`} hidden={open !== i}><p>{a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PricingClosing />
    </V2Shell>
  );
}

const css = `
  /* hero */
  .ph-out{padding:0}
  .ph{display:grid;grid-template-columns:minmax(0,600px) minmax(0,1fr);gap:56px;align-items:center;min-height:520px;padding:0 max(20px,calc((100vw - 1240px) / 2 + 20px));background:linear-gradient(135deg,#F7F5F1 0%,#EEEBE5 100%);border-bottom:1px solid ${LINE}}
  .ph-copy{padding:64px 0}
  .ph-copy .v2-label{margin-bottom:16px}
  .ph-copy h1{text-wrap:balance}
  .ph-copy p{margin:20px 0 0;font-size:18px;line-height:1.65;color:${BODY};max-width:54ch}
  .ph-copy p.ph-sub{margin-top:12px;font-size:15px;color:${MUTED}}
  .ph-vis{position:relative;height:400px}
  .ph-photo{position:absolute;right:0;top:0;width:82%;height:100%;border-radius:24px 0 0 24px;overflow:hidden;background:${G2}}
  .ph-photo img{width:100%;height:100%;object-fit:cover;object-position:45% 40%}
  .ph-card{position:absolute;left:0;bottom:36px;display:grid;gap:2px;padding:18px 22px;border-radius:18px;background:#fff;box-shadow:0 30px 60px -30px rgba(32,26,20,.55),0 0 0 1px ${LINE}}
  .ph-card-k{font-family:var(--font-display),system-ui,sans-serif;font-size:12px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:${AMBER_DEEP}}
  .ph-card b{font-family:var(--font-display),system-ui,sans-serif;font-size:32px;line-height:1.1;color:${INK}}
  .ph-card b small{font-size:14px;font-weight:500;color:${MUTED}}
  .ph-card em{font-style:normal;font-size:13.5px;color:${BODY}}

  /* shared bits */
  .pr-tick{display:grid;place-items:center;flex-shrink:0;width:18px;height:18px;margin-top:3px;border-radius:50%;background:${AMBER_SOFT};color:${AMBER_DEEP}}
  .pr-tick svg{width:10px;height:10px}
  .pr-fine{margin:22px 0 0;font-size:13.5px;line-height:1.6;color:${MUTED};max-width:100ch}
  .pr-fine.wide{margin-top:28px}
  .pr-seg{display:inline-flex;padding:4px;border-radius:999px;background:${G2};box-shadow:inset 0 0 0 1px ${LINE}}
  .pr-seg button{display:inline-flex;align-items:center;gap:8px;min-height:40px;padding:0 18px;border:0;border-radius:999px;background:transparent;font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;font-weight:600;color:${MUTED};cursor:pointer;white-space:nowrap;transition:background .2s ease,color .2s ease}
  .pr-seg button small{font-size:12px;font-weight:500;opacity:.8}
  .pr-seg button.on{background:${INK};color:#fff}
  .pr-seg.sm button{min-height:36px;padding:0 14px;font-size:14px}
  .pr-seg.sm button small{padding:1px 8px;border-radius:999px;background:${AMBER};font-size:11.5px;font-weight:600;color:${INK};opacity:1}
  .pr-seg button:not(.on):hover{color:${INK}}

  /* plans */
  .pr-top{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:20px;margin-bottom:14px}
  .pr-ctl{display:flex;flex-wrap:wrap;gap:10px}
  .pr-opt{margin:0 0 28px;max-width:80ch;font-size:15px;line-height:1.55;color:${BODY}}
  .pr-top .v2-label{margin-bottom:14px}
  .pr-grid{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px;align-items:stretch}
  .pr-card{display:flex;flex-direction:column;padding:28px 26px 26px;border-radius:20px;background:${G1};box-shadow:inset 0 0 0 1px ${LINE}}
  .pr-card h3{--h3-size:24px;line-height:1.15}
  .pr-jobs{margin:4px 0 0;font-size:13.5px;font-weight:600;color:${AMBER_DEEP}}
  .pr-d{margin:12px 0 0;min-height:96px;font-size:15px;line-height:1.55;color:${BODY}}
  .pr-price{display:grid;gap:2px;margin:18px 0 18px;padding-top:18px;border-top:1px solid ${LINE}}
  .pr-price b{font-family:var(--font-display),system-ui,sans-serif;font-size:32px;line-height:1.1;letter-spacing:-.02em;color:${INK}}
  .pr-price span{display:flex;align-items:baseline;gap:8px;font-size:14px;color:${MUTED}}
  .pr-price s{font-size:13px;color:#A39A8E}
  .pr-price em{min-height:20px;font-style:normal;font-size:12.5px;line-height:1.4;color:${MUTED}}
  .pr-btn{width:100%}
  .pr-f{list-style:none;margin:20px 0 0;padding:20px 0 0;border-top:1px solid ${LINE};display:grid;gap:10px}
  .pr-f li{display:flex;gap:10px;font-size:14.5px;line-height:1.45;color:${INK}}
  .pr-ent{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:48px;align-items:start;margin-top:18px;padding:32px 36px;border-radius:20px;background:${INK}}
  .pr-ent h3,.pr-ent .pr-d,.pr-ent .pr-f li{color:#fff}
  .pr-ent .pr-jobs{color:${AMBER}}
  .pr-ent .pr-d{min-height:0;max-width:44ch}
  .pr-ent .pr-price{border-top-color:rgba(255,255,255,.18)}
  .pr-ent .pr-price b{color:#fff}.pr-ent .pr-price em{color:#CFC8BE}
  .pr-ent .pr-btn{width:auto;padding:0 28px}
  .pr-ent .pr-f{margin:0;padding:0;border-top:0;grid-template-columns:1fr 1fr;gap:12px 28px}
  .pr-ent .pr-tick{background:rgba(245,165,36,.2);color:${AMBER}}

  /* compare plans */
  .sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
  .cm-wrap{overflow-x:auto;border-radius:20px;background:#fff;box-shadow:inset 0 0 0 1px ${LINE}}
  .cm{width:100%;min-width:820px;border-collapse:separate;border-spacing:0}
  .cm thead th{position:sticky;top:0;z-index:2;padding:18px 12px;background:#fff;border-bottom:2px solid ${INK};font-family:var(--font-display),system-ui,sans-serif;font-size:15.5px;font-weight:600;color:${INK};text-align:center}
  .cm thead th:first-child{width:30%}
  .cm th.ent,.cm td.ent{background:#FFF8EA}
  .cm thead th.ent{background:${AMBER_SOFT}}
  .cm tbody th[scope=row]{padding:13px 18px;border-bottom:1px solid ${LINE};font-size:15px;font-weight:500;text-align:left;color:${INK}}
  .cm tbody th[scope=row],.cm thead th:first-child{position:sticky;left:0;z-index:1;background:#fff;min-width:190px}
  .cm thead th:first-child{z-index:3}
  .cm td{padding:13px 12px;border-bottom:1px solid ${LINE};text-align:center;font-size:14.5px;color:${INK}}
  .cm-g th{padding:22px 18px 10px!important;background:#fff;border-bottom:1px solid ${LINE};font-family:var(--font-display),system-ui,sans-serif;font-size:12px!important;font-weight:600!important;letter-spacing:.1em;text-transform:uppercase;text-align:left;color:${AMBER_DEEP}!important}
  .cm-y{display:inline-grid;place-items:center;width:22px;height:22px;border-radius:50%;background:${AMBER_SOFT};color:${AMBER_DEEP}}
  .cm-y svg{width:12px;height:12px}
  .cm-n{color:#B9B1A6}
  .cm-t{font-weight:600}
  .cm td.ent .cm-t{color:#7A4A07}
  .pu-cur{margin-left:10px;padding:3px 10px;border-radius:999px;background:${G2};font-size:12px;font-weight:600;letter-spacing:0;text-transform:none;color:${INK}}
  .cm-box{position:relative}
  .cm-box:not(.open) .cm-wrap{padding-bottom:64px}
  .cm-box:not(.open)::after{content:"";position:absolute;left:1px;right:1px;bottom:56px;height:120px;border-radius:0 0 0 0;background:linear-gradient(180deg,rgba(255,255,255,0),#fff 85%);pointer-events:none}
  .cm-more{display:flex;justify-content:center;margin-top:-1px}
  .cm-box:not(.open) .cm-more{position:absolute;left:0;right:0;bottom:0;height:64px;align-items:center;background:#fff;border-radius:0 0 20px 20px;box-shadow:inset 0 0 0 1px ${LINE}}
  .cm-box.open .cm-more{margin-top:18px}
  .cm-more button{display:inline-flex;align-items:center;gap:10px;min-height:44px;padding:0 22px;border:0;border-radius:999px;background:${INK};font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;font-weight:600;color:#fff;cursor:pointer;transition:background .2s ease}
  .cm-more button:hover{background:#000}
  .cm-more button i{width:9px;height:9px;margin-top:-4px;border-right:2px solid currentColor;border-bottom:2px solid currentColor;transform:rotate(45deg);transition:transform .25s ease}
  .cm-more button[aria-expanded=true] i{margin-top:3px;transform:rotate(-135deg)}
  .cm-add{text-align:center!important;font-size:14.5px;color:${BODY}}
  .cm-add b{font-family:var(--font-display),system-ui,sans-serif;font-size:17px;color:${INK}}
  .cm-how{margin-top:28px;padding:28px 32px;border-radius:20px;background:#fff;box-shadow:inset 0 0 0 1px ${LINE}}
  .cm-how h3{--h3-size:24px;margin-bottom:16px!important}
  .cm-how ul{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:12px 40px}
  .cm-how li{display:flex;gap:12px;font-size:15.5px;line-height:1.5;color:${BODY}}
  .cm-how p{margin:20px 0 0;padding-top:18px;border-top:1px solid ${LINE};font-size:14px;line-height:1.6;color:${MUTED}}
  .cm-need{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:20px;margin-top:28px;padding:24px 28px;border-radius:18px;background:#fff;box-shadow:inset 0 0 0 1px ${LINE}}
  .cm-need div{display:grid;gap:4px}
  .cm-need b{font-family:var(--font-display),system-ui,sans-serif;font-size:18px;color:${INK}}
  .cm-need span{font-size:15.5px;color:${BODY}}

  /* what is included */
  .pc{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}
  .pc>li{padding:22px 22px 24px;border-radius:18px;background:${G1};box-shadow:inset 0 0 0 1px ${LINE}}
  .pc>li>i{display:grid;place-items:center;width:42px;height:42px;margin-bottom:16px;border-radius:12px;background:${AMBER_SOFT};color:${AMBER_DEEP}}
  .pc>li>i svg{width:21px;height:21px}
  .pc h3{--h3-size:18px;line-height:1.25;margin-bottom:12px!important}
  .pc ul{list-style:none;margin:0;padding:0;display:grid;gap:9px}
  .pc ul li{display:flex;gap:10px;font-size:14.5px;line-height:1.45;color:${BODY}}
  .pc>li.pc-photo{padding:0;overflow:hidden;box-shadow:none;background:${G2}}
  .pc-photo img{width:100%;height:100%;min-height:240px;object-fit:cover}

  /* additional usage */

  /* implementation and enterprise */
  .ps{display:grid;grid-template-columns:1fr 1fr;gap:20px;align-items:stretch}
  .ps-box{display:flex;flex-direction:column;align-items:flex-start;padding:36px;border-radius:24px;background:#fff;box-shadow:inset 0 0 0 1px ${LINE}}
  .ps-box.ent{background:${AMBER};box-shadow:none}
  .ps-box.ent .v2-label{color:#5A2E07}
  .ps-box .v2-label{margin-bottom:14px}
  .ps-box p{margin:14px 0 0;font-size:16.5px;line-height:1.6;color:${BODY}}
  .ps-box.ent p{color:#33291d}
  .ps-box ul{list-style:none;margin:16px 0 0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:10px 24px;width:100%}
  .ps-box li{display:flex;gap:10px;font-size:14.5px;line-height:1.45;color:${INK}}
  .ps-box.ent .pr-tick{background:rgba(255,255,255,.55);color:${INK}}
  .ps-box small{margin-top:auto;padding-top:22px;font-size:13.5px;line-height:1.6;color:${MUTED}}
  .ps-box.ent small{color:#4B3A22}
  .ps-box .v2-btn{margin-top:22px}

  /* faq */
  .pf{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:64px;align-items:start}
  .pf-head{position:sticky;top:96px;text-align:left}
  .pf-head .v2-label{margin-bottom:14px}
  .pf-head p{margin:16px 0 0;font-size:16.5px;color:${BODY}}
  .pf-link{padding:0;border:0;background:none;font:inherit;font-weight:600;color:${AMBER_DEEP};text-decoration:underline;text-underline-offset:3px;cursor:pointer}
  .pf-item{border-top:1px solid ${LINE}}
  .pf-item:last-child{border-bottom:1px solid ${LINE}}
  .pf-item h3{--h3-size:18px;margin:0!important;font-weight:600}
  .pf-item button{display:flex;align-items:center;justify-content:space-between;gap:20px;width:100%;padding:20px 0;border:0;background:none;font-family:var(--font-display),system-ui,sans-serif;font-size:18px;font-weight:600;line-height:1.35;text-align:left;color:${INK};cursor:pointer}
  .pf-item button i{position:relative;flex-shrink:0;width:28px;height:28px;border-radius:50%;background:${G2};transition:background .2s ease}
  .pf-item button i::before,.pf-item button i::after{content:"";position:absolute;left:8px;right:8px;top:13px;height:2px;border-radius:1px;background:${INK};transition:transform .25s ease}
  .pf-item button i::after{transform:rotate(90deg)}
  .pf-item.on button i{background:${AMBER}}
  .pf-item.on button i::after{transform:rotate(0)}
  .pf-item [role=region] p{margin:0 0 22px;max-width:62ch;font-size:16px;line-height:1.65;color:${BODY}}

  /* closing plan card */
  .cta-st em{margin-left:auto;font-style:normal;font-size:13px;color:${MUTED}}

  @media (max-width:1280px){
    .pr-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
    .pr-d{min-height:0}
    .pc{grid-template-columns:repeat(3,minmax(0,1fr))}
  }
  @media (max-width:980px){
    .ph{grid-template-columns:1fr;gap:0;padding:0 20px 48px;min-height:0}
    .ph-copy{padding:56px 0 36px}
    .pr-ent{grid-template-columns:1fr;gap:28px}
    .cm-how ul{grid-template-columns:1fr}
    .pc{grid-template-columns:repeat(2,minmax(0,1fr))}
    .ps,.pf{grid-template-columns:1fr;gap:32px}
    .pf-head{position:static}
  }
  @media (max-width:640px){
    .ph{padding:0 16px 40px}
    .ph-vis{height:auto}.ph-photo{position:relative;width:100%;height:240px;border-radius:20px}.ph-card{position:relative;left:auto;bottom:auto;margin:-36px 14px 0}
    .pr-ctl{width:100%}.pr-seg{display:flex;width:100%}.pr-seg button{flex:1;justify-content:center;padding:0 8px;font-size:13.5px}
    .pr-grid,.pc{grid-template-columns:1fr}
    .pr-ent{padding:24px 20px}.pr-ent .pr-f{grid-template-columns:1fr}
    .cm-need{padding:20px}.cm-how{padding:22px 20px}
    .pc>li.pc-photo{display:none}
    .ps-box{padding:24px 20px}.ps-box ul{grid-template-columns:1fr}
    .pf-item button{font-size:16.5px}
  }
`;
