"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

/* Hospitality models: three image cards; clicking one opens its detail
   beneath the cards (no navigation). Copy is the approved page content. */
const FOREST = "#14532D";
const BOTANICAL = "#2F6B4F";
const OLIVE = "#66734A";
const CREAM = "#F7F1E3";
const BEIGE = "#E6D8C5";
const SAGE = "#DDE6D8";
const INK = "#17251D";
const MUTE = "#4B5A50";
const SERIF = "'Iowan Old Style', 'Palatino Linotype', Palatino, Georgia, serif";

const U = (id: string, w = 1200) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;
const photo = (src: string): CSSProperties => ({ backgroundImage: `url(${src})`, backgroundSize: "cover", backgroundPosition: "center" });
const I = (f: string) => `/billing/images/${f}`;
const ICON: Record<string, string> = {
  CRM: I("crm-menu-icn.png"), ServiceOps: I("serviceops-icon.svg"), Projects: I("evoq-projects-menu-icn.png"), HRMS: I("hrms-menu-icn-new.png"),
  Skillberry: I("Skillberry-menu-icn.png"), Desk: I("desk-menu-icn.png"), Billing: I("billing-menu-icn.png"), Inventory: I("inventory-menu-icn.png"), Campaigns: I("campaigns-menu-icn.png"),
};

type Model = {
  key: string; name: string; summary: string; img: string;
  title: string; intro: string[]; points: [string, string][]; products: string[];
};

const MODELS: Model[] = [
  {
    key: "hotels", name: "Hotels & resorts", img: U("1758448755981-954afbf60ff7", 1400),
    summary: "Coordinate guest enquiries, appointment-based services, customer relationships and follow-up around the stay. Choose EVOQ products according to the processes your property needs to support.",
    title: "Support the work behind every guest stay.",
    intro: [
      "Guest service extends beyond arrival and departure. Enquiries need responses, guest requests need attention, staff need clear responsibilities and customer relationships continue after checkout.",
      "EVOQ products can support the customer-facing and administrative activities surrounding a guest stay, alongside specialist hotel property management and reservation systems.",
    ],
    points: [
      ["Guest relationships", "Maintain guest details, organize enquiries and keep follow-up activity accessible to staff."],
      ["Service coordination", "Record service requests, organize internal responsibilities and track outstanding work."],
      ["Billing administration", "Support invoicing and payment records through the relevant products."],
      ["Guest engagement", "Gather feedback and support communications that encourage future stays."],
    ],
    products: ["CRM", "Desk", "ServiceOps", "Billing", "Campaigns", "Surveys", "Loyalty"],
  },
  {
    key: "restaurants", name: "Restaurants & cafés", img: U("1555396273-367ea4eb4db5", 1400),
    summary: "Support customer relationships, scheduled services where applicable, feedback, and relevant billing or inventory processes. Restaurant table management and point-of-sale requirements may need suitable specialist systems.",
    title: "Keep customer service and daily operations in view.",
    intro: [
      "Running a restaurant involves more than serving a meal. Customer relationships, stock records, billing, staff administration and customer feedback all contribute to day-to-day operations.",
      "EVOQ products can support these administrative and customer-facing activities alongside specialist restaurant and point-of-sale systems.",
    ],
    points: [
      ["Customer relationships", "Maintain customer records and organize follow-up activity to support repeat visits."],
      ["Inventory administration", "Keep product and stock information organized through the relevant inventory capabilities."],
      ["Billing administration", "Support invoicing and payment records for applicable transactions."],
      ["Staff administration", "Support employee administration and training."],
      ["Customer engagement", "Gather feedback and support campaigns and loyalty initiatives."],
    ],
    products: ["CRM", "Inventory", "Billing", "HRMS", "Skillberry", "Campaigns", "Surveys", "Loyalty"],
  },
  {
    key: "travel", name: "Travel & tour operators", img: U("1607068891828-f16297950a66", 1400),
    summary: "Manage customer enquiries, requirements, follow-ups and service-related communication throughout the trip-planning relationship. Travel itineraries, ticketing and supplier inventory may require specialist travel systems.",
    title: "Keep travel enquiries moving from first contact to follow-up.",
    intro: [
      "Travel enquiries can involve multiple conversations, changing requirements and coordination across several activities. Staff need a clear record of the customer relationship and the tasks that still require attention.",
      "EVOQ products can support enquiry management, customer follow-up, internal coordination and billing administration alongside specialist travel booking and itinerary systems.",
    ],
    points: [
      ["Enquiry management", "Organize enquiries, maintain customer details and keep follow-up activity visible."],
      ["Customer coordination", "Maintain communication history and relevant customer information throughout the relationship."],
      ["Internal task management", "Assign and track internal tasks associated with customer requests and trip preparation."],
      ["Billing administration", "Support invoicing and payment records within the capabilities of the relevant products."],
      ["Post-trip engagement", "Gather feedback and maintain customer relationships for future enquiries."],
    ],
    products: ["CRM", "Projects", "Desk", "Billing", "Campaigns", "Surveys", "Loyalty"],
  },
];

export function HsModels({ eyebrow }: { eyebrow: ReactNode }) {
  const [open, setOpen] = useState(0);
  const m = MODELS[open];
  return (
    <section id="models" style={{ background: CREAM, padding: "100px 0 104px" }}>
      <style>{`
        .hm-card{all:unset;box-sizing:border-box;display:block;cursor:pointer;text-align:center;border-radius:28px;padding:10px 10px 22px;transition:transform .3s ease}
        .hm-card:focus-visible{outline:2px solid ${FOREST};outline-offset:3px}
        .hm-card:hover{transform:translateY(-6px)}
        .hm-arch{position:relative;overflow:hidden;transition:box-shadow .35s ease}
        .hm-card:hover .hm-arch{box-shadow:0 36px 56px -30px rgba(6,78,59,.55)}
        .hm-photo{position:absolute;inset:0;background-size:cover;background-position:center;transition:transform .7s cubic-bezier(.2,.7,.2,1)}
        .hm-card:hover .hm-photo,.hm-card.on .hm-photo{transform:scale(1.07)}
        .hm-tint{position:absolute;inset:0;background:linear-gradient(180deg,rgba(6,78,59,0) 45%,rgba(6,78,59,.35));transition:opacity .35s ease}
        .hm-card:hover .hm-tint{background:linear-gradient(180deg,rgba(6,78,59,0) 30%,rgba(6,78,59,.55))}
        .hm-badge{position:absolute;left:50%;bottom:18px;width:46px;height:46px;margin-left:-23px;border-radius:50%;background:#fff;color:${FOREST};display:flex;align-items:center;justify-content:center;opacity:0;transform:translateY(12px) scale(.85);transition:opacity .3s ease,transform .35s cubic-bezier(.34,1.4,.64,1);box-shadow:0 14px 28px -10px rgba(0,0,0,.45)}
        .hm-card:hover .hm-badge,.hm-card:focus-visible .hm-badge{opacity:1;transform:none}
        .hm-card.on .hm-badge{opacity:1;transform:none;background:${FOREST};color:#fff}
        .hm-name{display:inline-block;position:relative;padding-bottom:6px;transition:color .25s ease}
        .hm-name::after{content:"";position:absolute;left:50%;bottom:0;height:2px;width:0;background:${BOTANICAL};transition:width .35s ease,left .35s ease}
        .hm-card:hover .hm-name::after,.hm-card.on .hm-name::after{width:44px;left:calc(50% - 22px)}
        .hm-card:hover .hm-name{color:${FOREST}}
        .hm-more svg{transition:transform .3s ease}
        .hm-card:hover .hm-more svg{transform:rotate(90deg) translateX(4px)!important}
        .hm-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}
        .hm-pts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px 28px}
        .hm-detail{animation:hmIn .4s ease both}
        @keyframes hmIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
        @media (max-width:1100px){.hm-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
        @media (max-width:760px){.hm-grid{grid-template-columns:1fr}.hm-pts{grid-template-columns:1fr}.hm-detail{padding:28px 22px!important}}
        @media (prefers-reduced-motion:reduce){.hm-detail{animation:none}.hm-photo,.hm-card,.hm-badge,.hm-name::after{transition:none}.hm-card:hover{transform:none}}
      `}</style>
      <div className="hs-wrap">
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 56px" }} data-rv="0">
          {eyebrow}
          <h2 style={{ margin: 0, fontFamily: SERIF, fontWeight: 400, lineHeight: 1.1, letterSpacing: "-.015em", color: INK }}>Different experiences. <em style={{ color: BOTANICAL }}>Different operational needs.</em></h2>
          <p style={{ margin: "20px auto 0", fontSize: 16.5, lineHeight: 1.8, color: "#33443A", maxWidth: "58ch" }}>Hotels, restaurants and travel operators serve customers in different ways. Explore the operational needs of your industry and see where EVOQ products can help.</p>
        </div>

        <div className="hm-grid" role="tablist" aria-label="Hospitality models" data-rv="1">
          {MODELS.map((x, i) => (
            <button key={x.key} type="button" role="tab" aria-selected={i === open} aria-controls="hm-detail" className={`hm-card${i === open ? " on" : ""}`} onClick={() => setOpen(i)}>
              <div className="hm-arch" style={{ height: 330, borderRadius: "200px 200px 24px 24px", boxShadow: i === open ? "0 36px 56px -30px rgba(6,78,59,.55)" : "none" }}>
                <div className="hm-photo" style={{ backgroundImage: `url(${x.img})` }} />
                <div className="hm-tint" />
                <span className="hm-badge" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
                </span>
              </div>
              <h3 style={{ margin: "24px 0 0", fontFamily: SERIF, fontWeight: 400, color: INK }}><span className="hm-name">{x.name}</span></h3>
              <p style={{ margin: "12px auto 0", padding: "0 10px", fontSize: 14.5, lineHeight: 1.75, color: MUTE, maxWidth: "40ch" }}>{x.summary}</p>
              <span className="hm-more" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 16, fontSize: 13.5, fontWeight: 700, color: FOREST }}>
                {i === open ? "Showing below" : "See the details"}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: "rotate(90deg)" }}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </span>
            </button>
          ))}
        </div>

        <div id="hm-detail" key={m.key} role="tabpanel" className="hm-detail" style={{ position: "relative", marginTop: 30, background: "#fff", border: `1px solid ${BEIGE}`, borderRadius: 28, padding: "44px 48px 46px", boxShadow: "0 40px 70px -48px rgba(6,78,59,.5)" }}>
          <span aria-hidden="true" style={{ position: "absolute", top: -9, left: `${open * 33.333 + 16.666}%`, width: 18, height: 18, background: "#fff", borderLeft: `1px solid ${BEIGE}`, borderTop: `1px solid ${BEIGE}`, transform: "translateX(-50%) rotate(45deg)" }} />
          <div className="hm-cols" style={{ display: "grid", gridTemplateColumns: "minmax(0,.9fr) minmax(0,1.1fr)", gap: 56 }}>
            <div>
              <h3 style={{ margin: 0, fontFamily: SERIF, fontWeight: 400, lineHeight: 1.15, color: INK }}>{m.title}</h3>
              {m.intro.map((p) => <p key={p} style={{ margin: "16px 0 0", fontSize: 16, lineHeight: 1.8, color: "#33443A" }}>{p}</p>)}
            </div>
            <div className="hm-pts">
              {m.points.map(([h, d]) => (
                <div key={h} style={{ background: CREAM, borderRadius: 16, padding: "18px 20px" }}>
                  <div style={{ fontFamily: SERIF, fontSize: 19, color: FOREST }}>{h}</div>
                  <p style={{ margin: "6px 0 0", fontSize: 14.5, lineHeight: 1.65, color: MUTE }}>{d}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 32, paddingTop: 22, borderTop: `1px solid ${BEIGE}`, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: OLIVE, marginRight: 6 }}>Relevant products</span>
            {m.products.map((a) => (
              <span key={a} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 13px 5px 6px", borderRadius: 999, background: CREAM, border: `1px solid ${BEIGE}`, fontSize: 12.5, fontWeight: 600, color: FOREST }}>
                {ICON[a] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={ICON[a]} alt="" width={20} height={20} style={{ width: 20, height: 20, objectFit: "contain" }} />
                ) : (
                  <span style={{ width: 20, height: 20, borderRadius: "50%", background: SAGE, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: FOREST }}>{a[0]}</span>
                )}
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
