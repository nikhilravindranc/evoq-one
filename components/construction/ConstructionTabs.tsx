"use client";

import { useEffect, useState } from "react";

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
  body: "Construction projects involve many moving parts. Project responsibilities, client commitments, materials and commercial activities all need attention as work progresses. When information is scattered across different tools and conversations, keeping track of outstanding tasks can become difficult.",
  img: U("1778074762022-c33cc42f79ae", 1200),
  challenges: [
    ["Project updates are difficult to follow", "Project information and task updates can be spread across conversations, spreadsheets and separate records, making it harder to establish what needs attention."],
    ["Responsibilities are not always clear", "When several people contribute to a project, outstanding tasks, ownership and next steps can be difficult to track consistently."],
    ["Client follow-ups compete with delivery work", "New enquiries, opportunities and ongoing client commitments need attention alongside day-to-day project responsibilities."],
    ["Commercial activities are managed separately", "Inventory and billing processes may sit outside the project coordination process, requiring additional effort to maintain visibility."],
  ] as Pair[],
  outcomes: [
    "A clearer view of project tasks, responsibilities and milestones.",
    "Better visibility into outstanding work and upcoming commitments.",
    "More consistent follow-up on client enquiries and opportunities.",
    "Easier access to relevant inventory and billing information through the appropriate applications.",
  ],
  help: [
    ["Project coordination", "Organize project tasks, responsibilities and progress using Projects, subject to its available project management capabilities."],
    ["Client and opportunity management", "Use CRM to track enquiries, opportunities, communications and follow-ups associated with prospective and existing clients."],
    ["Inventory and billing", "Use Inventory and Billing for supported stock-management and invoicing processes relevant to the organization."],
    ["Handover and ongoing service", "Where post-project service is part of the operating model, ServiceOps may support relevant work order and maintenance activities."],
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
  body: "Engineering consultancies and contractors have different operating priorities. Consultancies coordinate client commitments and technical project work, while contractors may also need to manage project execution, site responsibilities and materials. The right operational approach depends on the work being delivered and the responsibilities involved.",
  img: U("1774600166588-1db444bda799", 1200),
  challenges: [
    ["Project commitments need constant attention", "Deadlines, tasks and responsibilities need to remain visible as technical projects progress."],
    ["Client work and project delivery overlap", "Client enquiries, opportunities and ongoing commitments compete for attention alongside project responsibilities."],
    ["Contractor activities require coordination", "Engineering contractors may need to keep project activities, assigned responsibilities and delivery milestones visible across the people involved."],
    ["Administrative work grows with project activity", "People administration, commercial processes and other supporting tasks can require additional effort as project volumes increase."],
  ] as Pair[],
  outcomes: [
    "Clearer ownership of project tasks and responsibilities.",
    "Better visibility into project progress and outstanding commitments.",
    "More consistent management of client enquiries and follow-ups.",
    "Better coordination of supported people-management, inventory and billing processes.",
  ],
  audiences: [
    ["Engineering consultancies", "Coordinate project tasks, deadlines and responsibilities while keeping client relationships and opportunities visible. Use relevant applications to support project delivery and associated administrative work."],
    ["Engineering contractors", "Maintain visibility into project activities, responsibilities and delivery milestones. Where relevant, inventory and service capabilities may support associated operational requirements."],
  ] as Pair[],
  help: [
    ["Project delivery", "Use Projects to coordinate project tasks and responsibilities, subject to the available functionality."],
    ["Client relationships", "Use CRM to organize client enquiries, opportunities, communications and follow-ups."],
    ["People administration and learning", "Use HRMS for applicable employee administration and Skillberry for relevant learning and development requirements."],
    ["Commercial and inventory processes", "Use Billing and Inventory where their supported capabilities match the organization's invoicing and stock-management needs."],
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
    title: "Turn property enquiries into consistent follow-ups.",
    body: "Property enquiries can arrive through several channels. Keeping prospect details, communications, viewing appointments and next steps organized helps agents maintain visibility into active opportunities.",
    img: U("1758523671301-cf64a85d0d34", 1000),
    challenges: [
      "Enquiries and prospect information are spread across different records.",
      "Follow-ups depend on individual reminders and manual tracking.",
      "Viewing appointments and next steps need consistent coordination.",
      "It can be difficult to establish which opportunities need attention.",
    ],
    outcomes: [
      "More organized prospect records and enquiry follow-ups.",
      "Clearer visibility into conversations and deal progress.",
      "Better coordination of viewing appointments where scheduling capabilities support the requirement.",
      "More consistent communication with prospective clients.",
    ],
    help: "CRM may support enquiry and opportunity management. Campaigns may support applicable prospect communication, while Desk may be relevant where customer service requests need to be handled.",
    apps: ["CRM", "Campaigns", "Desk"],
  },
  {
    key: "developers", tab: "Developers and builders",
    title: "Keep buyer relationships and sales activity visible.",
    body: "Property development involves more than generating buyer enquiries. Sales follow-ups, buyer communication and post-sale responsibilities can create additional administrative work as activity grows.",
    img: U("1597026405082-eda9beae7513", 1000),
    challenges: [
      "Project-related enquiries and buyer conversations need consistent follow-up.",
      "Sales activity and outstanding next steps can be difficult to review.",
      "Buyer communication continues beyond the initial enquiry.",
      "Applicable billing processes need to be handled alongside sales activity.",
    ],
    outcomes: [
      "Better visibility into buyer relationships and communications.",
      "More consistent follow-up on prospective buyers.",
      "Clearer tracking of sales-related activity and outstanding tasks.",
      "Better coordination of supported billing processes.",
    ],
    help: "CRM may support buyer relationship and opportunity management. Campaigns may support applicable communications, while Billing can support the invoicing processes covered by its available functionality.",
    apps: ["CRM", "Campaigns", "Billing"],
  },
  {
    key: "operations", tab: "Property operations",
    title: "Keep service requests moving.",
    body: "Property operations involve recurring requests, maintenance responsibilities and follow-up. When requests and updates are handled through disconnected channels, it can be difficult to see what remains outstanding.",
    img: U("1732395805034-e0bf859665e5", 1000),
    challenges: [
      "Service requests arrive through different channels.",
      "Responsibilities and request status are difficult to track.",
      "Maintenance work requires coordination and follow-up.",
      "Related service and billing processes may be handled separately.",
    ],
    outcomes: [
      "Clearer ownership of service requests.",
      "Better visibility into request status and outstanding work.",
      "More consistent follow-up on maintenance activities.",
      "Better coordination of supported service and billing processes.",
    ],
    help: "Desk may support applicable service request handling. ServiceOps may support work orders and maintenance coordination where the required capabilities are available. Billing may support associated invoicing processes.",
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
      <Label c={p.on}>Where coordination gets harder</Label>
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
      <Label c={p.on}>Relevant EVOQ applications</Label>
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
          <Label c={p.on}>Support for different engineering organizations</Label>
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
        <div><Label c={p.on}>What better coordination can look like</Label><Bullets items={d.outcomes} p={p} check /></div>
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
        <p style={{ margin: "12px 0 0", fontSize: 15.5, lineHeight: 1.75, color: MUTE, maxWidth: "78ch" }}>Real estate covers several distinct activities, from generating property enquiries and progressing sales to managing service requests and maintenance. Agencies, developers and property operations teams therefore need different kinds of operational support. Choose the area most relevant to your organization.</p>
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
            <div><Label c={p.on}>Where coordination gets harder</Label><Bullets items={a.challenges} p={p} /></div>
            <div><Label c={p.on}>What better coordination can look like</Label><Bullets items={a.outcomes} p={p} check /></div>
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
        <h4 style={{ margin: 0, fontWeight: 700, color: INK }}>Choosing the right application combination</h4>
        <p style={{ margin: "8px 0 0", fontSize: 14.5, lineHeight: 1.7, color: MUTE, maxWidth: "80ch" }}>The relevant applications depend on whether your organization primarily manages property enquiries, buyer relationships, sales follow-ups or ongoing property service. Start with the activities that need improvement and identify the application capabilities required to support them.</p>
      </div>
    </article>
  );
}

const NAV = [
  { id: "ind-construction", n: "01", label: "Construction", p: CON, subs: [] as { id: string; label: string }[] },
  { id: "ind-engineering", n: "02", label: "Engineering", p: ENG, subs: [] as { id: string; label: string }[] },
  { id: "ind-real-estate", n: "03", label: "Real Estate", p: REA, subs: REAL_ESTATE.map((a) => ({ id: `re-${a.key}`, label: a.tab })) },
];

export function ConstructionIndustries() {
  const [active, setActive] = useState("ind-construction");
  const [sub, setSub] = useState("");

  // Scroll-spy: whichever chapter (and Real Estate audience) crosses the
  // reading line just above the middle of the screen is highlighted.
  useEffect(() => {
    const ids = [...NAV.map((x) => x.id), ...NAV[2].subs.map((s) => s.id)];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const id = e.target.id;
          if (id.startsWith("re-")) { setSub(id); setActive("ind-real-estate"); }
          else { setActive(id); if (id !== "ind-real-estate") setSub(""); }
        });
      },
      { rootMargin: "-38% 0px -58% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  };

  return (
    <section id="solutions" style={{ background: "#FFFDFB", color: INK, padding: "92px 0 100px" }}>
      <style>{`
        .ci-layout{display:grid;grid-template-columns:230px minmax(0,1fr);gap:56px;align-items:start;margin-top:48px}
        .ci-nav{position:sticky;top:96px}
        .ci-nav a{text-decoration:none}
        .ci-item{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:10px;color:${MUTE};font-weight:600;font-size:15px;border:1px solid transparent;transition:background .2s,color .2s,border-color .2s}
        .ci-item:hover{background:#F5F1EC;color:${INK}}
        .ci-num{flex:none;width:28px;height:28px;border-radius:7px;display:inline-flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;background:#F1ECE6;color:${MUTE};transition:background .2s,color .2s}
        .ci-subs{margin:4px 0 6px 27px;padding-left:16px;border-left:1px solid ${LINE};display:grid;gap:2px}
        .ci-sub{display:block;padding:7px 10px;border-radius:7px;font-size:13.5px;color:${MUTE};margin-left:-17px;border-left:2px solid transparent;padding-left:25px}
        .ci-sub:hover{color:${INK}}
        .ci-chapters{display:grid;gap:88px}
        .ci-chapter{display:grid;gap:36px;scroll-margin-top:96px}
        .ci-aud{display:grid;gap:24px;padding:28px;border:1px solid ${LINE};border-radius:16px;background:#fff;scroll-margin-top:96px}
        .ci-aud-top{display:grid;grid-template-columns:220px minmax(0,1fr);gap:26px;align-items:center}
        .ci-aud-img{height:160px;border-radius:10px;background-size:cover;background-position:center;background-color:#E5ECE7}
        .ci-intro{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:36px;align-items:center}
        .ci-img{height:260px;border-radius:14px;background-size:cover;background-position:center;background-color:#E8D8BF}
        .ci-g2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:28px 40px}
        .ci-g2.ci-tight{gap:14px}
        .ci-apps{display:flex;flex-wrap:wrap;gap:16px 32px}
        @media (max-width:1024px){
          .ci-layout{grid-template-columns:1fr;gap:0}
          .ci-nav{top:0;z-index:20;margin:0 -24px 32px;padding:10px 24px;background:rgba(255,253,251,.94);backdrop-filter:blur(8px);border-bottom:1px solid ${LINE}}
          .ci-nav-list{display:flex;gap:8px;overflow-x:auto}
          .ci-subs,.ci-nav-title{display:none}
          .ci-item{padding:8px 14px 8px 8px;white-space:nowrap;border-color:${LINE};background:#fff}
          .ci-num{width:24px;height:24px}
          .ci-chapter,.ci-aud{scroll-margin-top:80px}
        }
        @media (max-width:760px){
          .ci-intro,.ci-g2,.ci-aud-top{grid-template-columns:1fr}
          .ci-img{height:220px}.ci-aud-img{height:180px}
          .ci-aud{padding:20px}
          .ci-chapters{gap:64px}
        }
      `}</style>
      <div className="cn-wrap">
        <p style={{ margin: "0 0 14px", fontSize: 12, fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "#A2563B" }}>Industries</p>
        <h2 style={{ margin: 0, letterSpacing: "-.025em", fontWeight: 600, color: INK }}>Solutions by industry</h2>
        <p style={{ margin: "14px 0 0", fontSize: 16, lineHeight: 1.7, color: MUTE, maxWidth: "62ch" }}>Explore the challenges, priorities and operational requirements specific to your industry.</p>

        <div className="ci-layout">
          <nav className="ci-nav" aria-label="Industries on this page">
            <p className="ci-nav-title" style={{ margin: "0 0 10px 14px", fontSize: 11, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: MUTE }}>On this page</p>
            <div className="ci-nav-list">
              {NAV.map((x) => {
                const on = active === x.id;
                return (
                  <div key={x.id}>
                    <a href={`#${x.id}`} onClick={go(x.id)} aria-current={on ? "true" : undefined} className="ci-item" style={on ? { background: x.p.off, color: x.p.on, borderColor: x.p.on + "33" } : undefined}>
                      <span className="ci-num" style={on ? { background: x.p.on, color: "#fff" } : undefined}>{x.n}</span>{x.label}
                    </a>
                    {x.subs.length > 0 && (
                      <div className="ci-subs">
                        {x.subs.map((s) => {
                          const sOn = sub === s.id;
                          return (
                            <a key={s.id} href={`#${s.id}`} onClick={go(s.id)} aria-current={sOn ? "true" : undefined} className="ci-sub" style={sOn ? { color: x.p.on, fontWeight: 700, borderLeftColor: x.p.on } : undefined}>{s.label}</a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>

          <div className="ci-chapters">
            <Chapter id="ind-construction" n="01" d={CONSTRUCTION} p={CON} />
            <Chapter id="ind-engineering" n="02" d={ENGINEERING} p={ENG} />
            <RealEstateChapter />
          </div>
        </div>
      </div>
    </section>
  );
}
