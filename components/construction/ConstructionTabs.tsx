"use client";

import { useScrollSpy } from "@/components/shared/useScrollSpy";

const INK = "#1F2A37";
const MUTE = "#5B6470";
const LINE = "#E6E0D8";

const U = (id: string, w = 1000) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;
const I = (f: string) => `/billing/images/${f}`;
const ICON: Record<string, string> = {
  CRM: I("crm-menu-icn.png"), Projects: I("evoq-projects-menu-icn.png"), Inventory: I("inventory-menu-icn.png"), Billing: I("billing-menu-icn.png"),
  Desk: I("desk-menu-icn.png"), Campaigns: I("campaigns-menu-icn.png"), ServiceOps: I("serviceops-icon.svg"), HRMS: I("hrms-menu-icn-new.png"),
  Skillberry: I("Skillberry-menu-icn.png"),
};

type Pair = [string, string];
type Palette = { on: string; off: string };

const CON: Palette = { on: "#A2563B", off: "#F7EFE9" };
const ENG: Palette = { on: "#274B7A", off: "#EEF3F8" };
const REA: Palette = { on: "#2E5A47", off: "#EEF4EF" };

const CONSTRUCTION = {
  kicker: "Construction",
  title: "From project plans to site progress",
  body: "Tasks, client commitments, materials and invoices change daily on a project. Each needs an owner and a status the whole team can see.",
  img: U("1778074762022-c33cc42f79ae", 1200),
  challenges: [
    ["Project updates are difficult to follow", "Updates split across messages, spreadsheets and separate records."],
    ["Responsibilities are not always clear", "Tasks without a clear owner or next step."],
    ["Client follow-ups compete with delivery work", "New enquiries competing with live project work."],
    ["Commercial activities are managed separately", "Stock and invoices tracked outside the project."],
  ] as Pair[],
  outcomes: [
    "Tasks, owners and milestones visible to the team.",
    "Outstanding work and upcoming commitments listed by date.",
    "Client enquiries followed up on schedule.",
    "Stock and billing information available alongside the project.",
  ],
  help: [
    ["Project coordination", "Projects: tasks, owners and progress."],
    ["Client and opportunity management", "CRM: enquiries, opportunities, communications and follow-ups for prospective and existing clients."],
    ["Inventory and billing", "Inventory and Billing: stock and invoicing."],
    ["Handover and ongoing service", "ServiceOps: work orders and maintenance after handover."],
  ] as Pair[],
  apps: [
    ["Projects", "Tasks, responsibilities and progress"],
    ["CRM", "Enquiries, opportunities and follow-ups"],
    ["Inventory", "Stock-management processes"],
    ["Billing", "Supported invoicing processes"],
    ["ServiceOps", "Work orders after handover"],
  ] as Pair[],
};

const ENGINEERING = {
  kicker: "Engineering",
  title: "Where technical work meets project delivery",
  body: "Consultancies track client commitments and technical deliverables. Contractors also manage site execution, responsibilities and materials.",
  img: U("1774600166588-1db444bda799", 1200),
  challenges: [
    ["Project commitments need constant attention", "Deadlines and owners lost as technical projects progress."],
    ["Client work and project delivery overlap", "Client enquiries competing with project deadlines."],
    ["Contractor activities require coordination", "Site activities and delivery milestones not visible to everyone involved."],
    ["Administrative work grows with project activity", "People administration and billing growing with project volume."],
  ] as Pair[],
  outcomes: [
    "Every task has an owner.",
    "Progress and open commitments listed by project.",
    "Client enquiries and follow-ups logged and scheduled.",
    "People, stock and billing records kept with the project.",
  ],
  audiences: [
    ["Engineering consultancies", "Project tasks, deadlines and owners tracked alongside client relationships and opportunities."],
    ["Engineering contractors", "Site activities, responsibilities and delivery milestones tracked, with stock and service visits where the work needs them."],
  ] as Pair[],
  help: [
    ["Project delivery", "Projects: tasks and responsibilities."],
    ["Client relationships", "CRM: client enquiries, opportunities and follow-ups."],
    ["People administration and learning", "HRMS and Skillberry: employee administration and learning."],
    ["Commercial and inventory processes", "Billing and Inventory: invoicing and stock."],
  ] as Pair[],
  apps: [
    ["Projects", "Project tasks and responsibilities"],
    ["CRM", "Client enquiries and opportunities"],
    ["Billing", "Supported invoicing"],
    ["HRMS", "Employee administration"],
    ["Skillberry", "Learning and development"],
    ["Inventory", "Stock-management processes"],
  ] as Pair[],
};

const REAL_ESTATE = [
  {
    key: "agencies", tab: "Agencies and brokers",
    title: "Property enquiries followed up from first contact to viewing.",
    body: "Enquiries arrive through several channels. Prospect details, viewings and next steps are recorded against each one.",
    img: U("1758523671301-cf64a85d0d34", 1000),
    challenges: [
      "Enquiries spread across different records.",
      "Follow-ups that depend on individual reminders.",
      "Viewings and next steps without an owner.",
      "No clear list of opportunities needing attention.",
    ],
    outcomes: [
      "Prospect records with every conversation.",
      "Follow-ups scheduled, not remembered.",
      "Viewings assigned and tracked.",
      "Active opportunities listed by status.",
    ],
    help: "CRM: enquiries and opportunities. Campaigns: prospect communication. Desk: service requests.",
    apps: ["CRM", "Campaigns", "Desk"],
  },
  {
    key: "developers", tab: "Developers and builders",
    title: "Buyer enquiries, follow-ups and invoices tracked from launch to handover.",
    body: "Buyers keep communicating after the first enquiry. Sales follow-ups, communication and post-sale tasks are recorded for each buyer.",
    img: U("1597026405082-eda9beae7513", 1000),
    challenges: [
      "Buyer conversations without consistent follow-up.",
      "Sales activity hard to review.",
      "Communication continuing after the sale.",
      "Invoicing handled separately from sales.",
    ],
    outcomes: [
      "Buyer history in one record.",
      "Prospective buyers followed up on schedule.",
      "Sales tasks listed by status.",
      "Invoices tied to the sale.",
    ],
    help: "CRM: buyer relationships and opportunities. Campaigns: communication. Billing: invoicing.",
    apps: ["CRM", "Campaigns", "Billing"],
  },
  {
    key: "operations", tab: "Property operations",
    title: "Service requests assigned and closed.",
    body: "Occupier requests arrive through several channels. Each is logged, assigned and tracked to completion.",
    img: U("1732395805034-e0bf859665e5", 1000),
    challenges: [
      "Requests arriving through different channels.",
      "Unclear owners and status.",
      "Maintenance without follow-up.",
      "Service and billing handled separately.",
    ],
    outcomes: [
      "Every request has an owner.",
      "Request status visible.",
      "Maintenance follow-ups scheduled.",
      "Service and invoicing connected.",
    ],
    help: "Desk: service requests. ServiceOps: work orders and maintenance. Billing: invoicing.",
    apps: ["Desk", "ServiceOps", "Billing", "CRM"],
  },
];

function Check({ c }: { c: string }) {
  return <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flex: "none", marginTop: 3 }}><circle cx="10" cy="10" r="10" fill={c} opacity=".14" /><path d="M5.8 10.4l2.8 2.8 5.6-6" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
const Label = ({ c, children }: { c: string; children: string }) => (
  <p style={{ margin: "0 0 14px", fontSize: 11.5, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: c }}>{children}</p>
);
function AppIcon({ app, bg }: { app: string; bg: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={ICON[app]} alt="" width={30} height={30} style={{ flex: "none", width: 30, height: 30, objectFit: "contain", borderRadius: 8, background: bg, padding: 3 }} />;
}
function Bullets({ items, p, check = false }: { items: string[]; p: Palette; check?: boolean }) {
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 10 }}>
      {items.map((o) => (
        <li key={o} style={{ display: "flex", gap: 11, fontSize: 14.5, lineHeight: 1.6, color: check ? INK : MUTE }}>
          {check ? <Check c={p.on} /> : <span style={{ flex: "none", width: 6, height: 6, borderRadius: 1, background: p.on, marginTop: 9 }} />}{o}
        </li>
      ))}
    </ul>
  );
}
function Challenges({ items, p }: { items: Pair[]; p: Palette }) {
  return (
    <div>
      <Label c={p.on}>Where projects lose track</Label>
      <div className="ci-g2 ci-tight">
        {items.map(([t, d]) => (
          <div key={t} style={{ background: p.off, borderRadius: 10, padding: "18px 20px 20px", borderLeft: `3px solid ${p.on}` }}>
            <div style={{ fontSize: 15.5, fontWeight: 700, lineHeight: 1.3, color: INK }}>{t}</div>
            <p style={{ margin: "6px 0 0", fontSize: 13.5, lineHeight: 1.6, color: MUTE }}>{d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
function Help({ items, p }: { items: Pair[]; p: Palette }) {
  return (
    <div style={{ display: "grid", gap: 18 }}>
      {items.map(([t, d], n) => (
        <div key={t} style={{ display: "flex", gap: 12 }}>
          <span style={{ flex: "none", width: 28, height: 28, borderRadius: "50%", background: p.off, color: p.on, fontSize: 11.5, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{String(n + 1).padStart(2, "0")}</span>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.3, color: INK }}>{t}</div>
            <p style={{ margin: "4px 0 0", fontSize: 13.5, lineHeight: 1.6, color: MUTE }}>{d}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
function AppRow({ apps, p }: { apps: Pair[]; p: Palette }) {
  return (
    <div style={{ background: p.off, borderRadius: 12, padding: "20px 24px" }}>
      <Label c={p.on}>Relevant EVOQ products</Label>
      <div className="ci-apps">
        {apps.map(([a, role]) => (
          <div key={a} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <AppIcon app={a} bg="#fff" />
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{a}</div>
              <div style={{ fontSize: 12.5, lineHeight: 1.35, color: MUTE }}>{role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Numbered chapter header: the colour band and number tell the visitor which industry they are in. */
function ChapterHead({ n, name, title, body, img, p }: { n: string; name: string; title: string; body: string; img: string; p: Palette }) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 14, paddingBottom: 18, borderBottom: `2px solid ${p.on}` }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#fff", background: p.on, borderRadius: 6, padding: "5px 9px", letterSpacing: ".04em" }}>{n}</span>
        <span style={{ fontSize: 20, fontWeight: 700, color: p.on, letterSpacing: "-.01em" }}>{name}</span>
      </div>
      <div className="ci-intro">
        <div>
          <h3 style={{ margin: 0, fontWeight: 600, letterSpacing: "-.02em", color: INK }}>{title}</h3>
          <p style={{ margin: "12px 0 0", fontSize: 15.5, lineHeight: 1.75, color: MUTE }}>{body}</p>
        </div>
        <div className="ci-img" role="img" aria-label={`${name} photograph`} style={{ backgroundImage: `url(${img})` }} />
      </div>
    </>
  );
}

function Chapter({ id, n, d, p }: { id: string; n: string; d: typeof CONSTRUCTION & { audiences?: Pair[] }; p: Palette }) {
  return (
    <article id={id} className="ci-chapter">
      <ChapterHead n={n} name={d.kicker} title={d.title} body={d.body} img={d.img} p={p} />
      <Challenges items={d.challenges} p={p} />
      {d.audiences && (
        <div>
          <Label c={p.on}>By organization type</Label>
          <div className="ci-g2 ci-tight">
            {d.audiences.map(([t, b]) => (
              <div key={t} style={{ border: `1px solid ${LINE}`, borderRadius: 10, padding: "20px 22px", background: "#fff" }}>
                <h4 style={{ margin: 0, fontWeight: 700, color: p.on }}>{t}</h4>
                <p style={{ margin: "6px 0 0", fontSize: 14, lineHeight: 1.65, color: MUTE }}>{b}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="ci-g2">
        <div><Label c={p.on}>What changes</Label><Bullets items={d.outcomes} p={p} check /></div>
        <div><Label c={p.on}>Areas where EVOQ can help</Label><Help items={d.help} p={p} /></div>
      </div>
      <AppRow apps={d.apps} p={p} />
    </article>
  );
}

function RealEstateChapter() {
  const p = REA;
  return (
    <article id="ind-real-estate" className="ci-chapter">
      <div style={{ display: "flex", alignItems: "center", gap: 14, paddingBottom: 18, borderBottom: `2px solid ${p.on}` }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#fff", background: p.on, borderRadius: 6, padding: "5px 9px", letterSpacing: ".04em" }}>03</span>
        <span style={{ fontSize: 20, fontWeight: 700, color: p.on, letterSpacing: "-.01em" }}>Real Estate</span>
      </div>
      <div>
        <h3 style={{ margin: 0, fontWeight: 600, letterSpacing: "-.02em", color: INK }}>From property enquiries to ongoing operations</h3>
        <p style={{ margin: "12px 0 0", fontSize: 15.5, lineHeight: 1.75, color: MUTE, maxWidth: "78ch" }}>Agencies, developers and property operations teams handle enquiries, sales and maintenance differently. Choose yours.</p>
      </div>
      {REAL_ESTATE.map((a, i) => (
        <section key={a.key} id={`re-${a.key}`} className="ci-aud" aria-labelledby={`re-${a.key}-t`}>
          <div className="ci-aud-top">
            <div className="ci-aud-img" role="img" aria-label={`${a.tab} photograph`} style={{ backgroundImage: `url(${a.img})` }} />
            <div>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: p.on }}>{String.fromCharCode(65 + i)} · {a.tab}</p>
              <h4 id={`re-${a.key}-t`} style={{ margin: "6px 0 0", fontWeight: 700, color: INK }}>{a.title}</h4>
              <p style={{ margin: "8px 0 0", fontSize: 14.5, lineHeight: 1.7, color: MUTE }}>{a.body}</p>
            </div>
          </div>
          <div className="ci-g2">
            <div><Label c={p.on}>Where work loses track</Label><Bullets items={a.challenges} p={p} /></div>
            <div><Label c={p.on}>What changes</Label><Bullets items={a.outcomes} p={p} check /></div>
          </div>
          <div style={{ background: p.off, borderRadius: 10, padding: "18px 22px" }}>
            <Label c={p.on}>Areas where EVOQ can help</Label>
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.7, color: INK }}>{a.help}</p>
            <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px 18px" }}>
              {a.apps.map((x) => (
                <span key={x} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, fontWeight: 700, color: INK }}>
                  <AppIcon app={x} bg="#fff" />{x}{a.key === "operations" && x === "CRM" && <span style={{ fontWeight: 400, color: MUTE }}>where relationship tracking is relevant</span>}
                </span>
              ))}
            </div>
          </div>
        </section>
      ))}
      <div style={{ borderTop: `1px solid ${LINE}`, paddingTop: 24 }}>
        <h4 style={{ margin: 0, fontWeight: 700, color: INK }}>Choosing the right product combination</h4>
        <p style={{ margin: "8px 0 0", fontSize: 14.5, lineHeight: 1.7, color: MUTE, maxWidth: "80ch" }}>Start with the activity that needs the most improvement: enquiries, buyer follow-up or property service.</p>
      </div>
    </article>
  );
}

const NAV = [
  { id: "ind-construction", n: "01", label: "Construction", p: CON },
  { id: "ind-engineering", n: "02", label: "Engineering", p: ENG },
  { id: "ind-real-estate", n: "03", label: "Real Estate", p: REA },
];

/* Same tab pattern as the home "Built for how your industry works" section:
   one pill bar on top, the active pill tinted with that industry's colour,
   one industry shown at a time. */
export function ConstructionIndustries() {
  const { active, go } = useScrollSpy(NAV.map((x) => x.id));

  return (
    <section id="solutions" style={{ background: "#FFFDFB", color: INK, padding: "92px 0 100px" }}>
      <style>{`
        .ci-tabs-wrap{position:sticky;top:0;z-index:20;display:flex;justify-content:flex-start;margin-top:30px;padding:12px 0 14px;background:linear-gradient(180deg,#FFFDFB 78%,rgba(255,253,251,0))}
        .ci-tabs{display:flex;gap:4px;padding:6px;border-radius:999px;background:#fff;max-width:100%;overflow-x:auto;scrollbar-width:none;box-shadow:0 10px 34px -14px rgba(20,24,60,.28),0 0 0 1px rgba(31,36,48,.06)}
        .ci-tabs::-webkit-scrollbar{display:none}
        .ci-tab{flex-shrink:0;display:inline-flex;align-items:center;gap:9px;padding:12px 24px 12px 12px;border-radius:999px;border:0;background:transparent;cursor:pointer;font-family:inherit;font-size:15.5px;font-weight:600;color:#3A4658;white-space:nowrap;transition:background .18s ease,color .18s ease}
        .ci-tab:hover{color:${INK};background:#F6F1EB}
        .ci-tab.on{font-weight:700;box-shadow:inset 0 0 0 1.5px currentColor}
        .ci-num{flex:none;width:26px;height:26px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:11.5px;font-weight:700;background:#EDE6DE;color:#3A4658;transition:background .18s ease,color .18s ease}
        .ci-chapters{margin-top:40px;display:grid;gap:0}
        .ci-chapter{display:grid;gap:36px;scroll-margin-top:110px;padding-top:80px;margin-top:80px;border-top:1px solid ${LINE}}
        .ci-chapter:first-child{padding-top:0;margin-top:0;border-top:0}
        .ci-aud{display:grid;gap:24px;padding:28px;border:1px solid ${LINE};border-radius:16px;background:#fff}
        .ci-aud-top{display:grid;grid-template-columns:220px minmax(0,1fr);gap:26px;align-items:center}
        .ci-aud-img{height:160px;border-radius:10px;background-size:cover;background-position:center;background-color:#E5ECE7}
        .ci-intro{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:36px;align-items:center}
        .ci-img{height:260px;border-radius:14px;background-size:cover;background-position:center;background-color:#E8D8BF}
        .ci-g2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:28px 40px}
        .ci-g2.ci-tight{gap:14px}
        .ci-apps{display:flex;flex-wrap:wrap;gap:16px 32px}
        @media (max-width:760px){
          .ci-intro,.ci-g2,.ci-aud-top{grid-template-columns:1fr}
          .ci-img{height:220px}.ci-aud-img{height:180px}
          .ci-aud{padding:20px}
          .ci-tab{padding:9px 16px 9px 9px;font-size:14px}
        }
      `}</style>
      <div className="cn-wrap">
        <p style={{ margin: "0 0 14px", fontSize: 12, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "#A2563B" }}>Industries</p>
        <h2 style={{ margin: 0, letterSpacing: "-.025em", fontWeight: 600, color: INK }}>Construction, engineering and real estate, each with its own work.</h2>
        <p style={{ margin: "14px 0 0", fontSize: 16, lineHeight: 1.7, color: MUTE, maxWidth: "62ch" }}>Choose the sector closest to your work.</p>

        <div className="ci-tabs-wrap">
          <div className="ci-tabs" role="tablist" aria-label="Industries">
            {NAV.map((x, i) => {
              const sel = i === active;
              return (
                <button
                  key={x.id}
                  type="button"
                  role="tab"
                  aria-selected={sel}
                  aria-controls={x.id}
                  className={`ci-tab${sel ? " on" : ""}`}
                  style={sel ? { background: x.p.off, color: x.p.on } : undefined}
                  onClick={go(i)}
                >
                  <span className="ci-num" style={sel ? { background: x.p.on, color: "#fff" } : undefined}>{x.n}</span>
                  {x.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="ci-chapters">
          <Chapter id="ind-construction" n="01" d={CONSTRUCTION} p={CON} />
          <Chapter id="ind-engineering" n="02" d={ENGINEERING} p={ENG} />
          <RealEstateChapter />
        </div>
      </div>
    </section>
  );
}
