import { ProductBadge } from "@/components/shared/ProductBadge";

/* Example scenario: one process from beginning to end across CRM and Billing.
   The people and company are invented. The scenario shows how applications share a
   record across a process; it is not a customer result. */

const P = "#4747E0";
const LINE = "#E6EAF0";
const INK = "#1F2430";
const BODY = "#5F6B7A";

type Step = { app: "crm" | "billing"; appName: string; feature: string; who: string; title: string; text: string; record: string };

const STEPS: Step[] = [
  { app: "crm", appName: "CRM", feature: "Leads", who: "Sales",
    title: "A lead is recorded",
    text: "Hannah Weber at Westbridge Labs asks for a quote. Marcus Bell creates the lead with its source and industry and makes himself the lead owner. Its status is New.",
    record: "Lead CRM-LEAD-2026-000024 · Status: New · Source: Website" },
  { app: "crm", appName: "CRM", feature: "Calls and tasks", who: "Marcus Bell, Sales",
    title: "The first contact is planned",
    text: "Marcus schedules an intro call and adds a follow-up task with a due date. Both appear under Activities on the lead, and the status moves to Contacted once he has spoken to her.",
    record: "Call: Intro call · Scheduled · Thu, 10:00 AM" },
  { app: "crm", appName: "CRM", feature: "Convert to deal", who: "Marcus Bell, Sales",
    title: "The lead is qualified and converted",
    text: "After the call the lead is ready. Marcus uses Convert to deal, so the opportunity starts from the lead's details and nothing is typed in again. The deal begins at Qualification.",
    record: "Deal CRM-DEAL-2026-000031 · Stage: Qualification" },
  { app: "crm", appName: "CRM", feature: "Deal products and stages", who: "Marcus Bell, Sales",
    title: "The deal is priced and proposed",
    text: "Marcus adds product lines with quantity, rate and discount, links Hannah as the primary contact and moves the deal to Proposal/Quotation. The deal shows its amount, probability and expected revenue.",
    record: "Amount: $48,000 · Probability: 30% · Expected revenue: $14,400" },
  { app: "crm", appName: "CRM", feature: "Pipeline stages", who: "Marcus Bell, Sales",
    title: "The deal is negotiated and won",
    text: "The deal moves through Negotiation and Ready to Close. Marcus notes the next step at each point, and when Hannah accepts he marks it Won.",
    record: "Stage: Negotiation → Ready to Close → Won" },
  { app: "billing", appName: "Billing", feature: "Invoicing, when used with CRM", who: "Finance",
    title: "An invoice is raised",
    text: "If Billing is used alongside CRM, finance raises the invoice for Westbridge Labs and tracks the payment, instead of starting again from a blank record.",
    record: "Invoice raised for Westbridge Labs" },
];

const css = `
  .sc-wrap{display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:48px;align-items:start}
  .sc-tl{list-style:none;margin:0;padding:0;position:relative}
  .sc-tl::before{content:"";position:absolute;left:23px;top:24px;bottom:24px;width:2px;background:#E3E0FF}
  .sc-step{position:relative;display:grid;grid-template-columns:48px minmax(0,1fr);gap:20px;padding-bottom:30px}
  .sc-dot{position:relative;z-index:1;width:48px;height:48px;border-radius:50%;background:#fff;border:2px solid #C9C6FF;display:flex;align-items:center;justify-content:center;font-size:15px;font-weight:700;color:${P}}
  .sc-card{padding:20px 22px;border-radius:18px;border:1px solid ${LINE};background:#fff}
  .sc-meta{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:10px}
  .sc-app{display:inline-flex;align-items:center;gap:7px;padding:4px 12px 4px 5px;border-radius:999px;background:#F2F2FF;font-size:12.5px;font-weight:700;color:#3A3AC9}
  .sc-feat{font-size:12.5px;color:${BODY}}
  .sc-who{margin-left:auto;font-size:12.5px;font-weight:600;color:${BODY}}
  .sc-card h3{margin:0;font-size:20px;letter-spacing:-.01em;color:${INK}}
  .sc-card p{margin:8px 0 0;font-size:15px;line-height:1.7;color:${BODY}}
  .sc-rec{margin-top:14px;padding:9px 12px;border-radius:10px;background:#F8F8FC;font-size:13px;font-weight:600;color:${INK};font-family:ui-monospace,Menlo,monospace}
  .sc-side{position:sticky;top:96px;display:grid;gap:16px}
  .sc-box{padding:22px;border-radius:18px;border:1px solid ${LINE};background:#fff}
  .sc-box h3{margin:0;font-size:16.5px;color:${INK}}
  .sc-box p{margin:8px 0 0;font-size:14px;line-height:1.65;color:${BODY}}
  .sc-apps{display:grid;gap:8px;margin-top:12px}
  .sc-apps a{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:12px;border:1px solid ${LINE};font-size:14px;font-weight:600;color:${INK};text-decoration:none}
  .sc-apps a:hover{border-color:#C9C6FF}
  .sc-box.note{background:#FDF8EC;border-color:#F3E3B8}
  @media (max-width:980px){.sc-wrap{grid-template-columns:1fr}.sc-side{position:static}}
  @media (max-width:560px){.sc-step{grid-template-columns:36px minmax(0,1fr);gap:12px}.sc-dot{width:36px;height:36px;font-size:13px}.sc-tl::before{left:17px}.sc-who{margin-left:0}}
`;

export function EnquiryToInvoiceScenario() {
  return (
    <>
      <style>{css}</style>
      <div className="sc-wrap">
        <ol className="sc-tl">
          {STEPS.map((s, i) => (
            <li key={s.title} className="sc-step" data-rv="0">
              <span className="sc-dot" aria-hidden>{i + 1}</span>
              <div className="sc-card">
                <div className="sc-meta">
                  <span className="sc-app"><ProductBadge productKey={s.app} size={20} />{s.appName}</span>
                  <span className="sc-feat">{s.feature}</span>
                  <span className="sc-who">{s.who}</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>{s.title}</h3>
                <p>{s.text}</p>
                <div className="sc-rec">{s.record}</div>
              </div>
            </li>
          ))}
        </ol>

        <aside className="sc-side">
          <div className="sc-box">
            <h3>Applications in this scenario</h3>
            <div className="sc-apps">
              <a href="/products/crm"><ProductBadge productKey="crm" size={26} />CRM</a>
              <a href="/products/billing"><ProductBadge productKey="billing" size={26} />Billing</a>
            </div>
            <p>CRM covers steps 1 to 5. Billing is used from step 6 when both applications are in use.</p>
          </div>
          <div className="sc-box">
            <h3>Where EVI and agents can help</h3>
            <p>EVI can help find information and prepare next steps, and an AI agent can prepare a defined task, such as a follow-up, for your review. What is available depends on your configuration.</p>
            <p><a href="/products/ai" style={{ color: P, fontWeight: 600, textDecoration: "none" }}>About EVOQ AI →</a></p>
          </div>
          <div className="sc-box note">
            <h3 style={{ color: "#7A4A05" }}>About this example</h3>
            <p style={{ color: "#7A4A05" }}>The people, company and figures are invented to show how a process runs from lead to invoice. This is not a customer result.</p>
          </div>
        </aside>
      </div>
    </>
  );
}
