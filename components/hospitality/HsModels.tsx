"use client";

import { useState, type ReactNode } from "react";

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
const I = (f: string) => `/billing/images/${f}`;
const ICON: Record<string, string> = {
  CRM: I("crm-menu-icn.png"), ServiceOps: I("serviceops-icon.svg"), Projects: I("evoq-projects-menu-icn.png"), HRMS: I("hrms-menu-icn-new.png"),
  Skillberry: I("Skillberry-menu-icn.png"), Desk: I("desk-menu-icn.png"), Billing: I("billing-menu-icn.png"), Inventory: I("inventory-menu-icn.png"), Campaigns: I("campaigns-menu-icn.png"),
};

type Model = {
  key: string; name: string; summary: string; img: string;
  collage: [string, string]; note: [string, string];
  tag: string; blurb: string; show: string[];
  title: string; intro: string[]; points: [string, string][]; products: string[];
};

const MODELS: Model[] = [
  {
    key: "hotels", name: "Hotels & resorts", img: U("1758448755981-954afbf60ff7", 1400),
    tag: "Guests see the stay. Your team manages the details.", show: ["Enquiries", "Requests", "Internal work", "Financial records"],
    blurb: "Guest stays, requests and follow-up",
    collage: [U("1759038085950-1234ca8f5fed"), U("1758448755981-954afbf60ff7")], note: ["Reservation confirmed", "Special requirements noted for arrival"],
    summary: "Guest enquiries, appointment-based services and follow-up recorded around each stay.",
    title: "Reservations, requests and follow-up around every stay.",
    intro: [
      "Enquiries answered before arrival, requests handled during the stay, follow-up sent after checkout. Each task has an owner.",
      "Works alongside hotel property management and reservation systems.",
    ],
    points: [
      ["Guest relationships", "Guest details and enquiries recorded, with follow-up visible to staff."],
      ["Service coordination", "Service requests logged, assigned and tracked to completion."],
      ["Billing administration", "Invoices and payments recorded."],
      ["Guest engagement", "Feedback collected and return-stay communication sent."],
    ],
    products: ["CRM", "Desk", "ServiceOps", "Billing", "Campaigns", "Surveys", "Loyalty"],
  },
  {
    key: "restaurants", name: "Restaurants & cafés", img: U("1555396273-367ea4eb4db5", 1400),
    tag: "Customers see the meal. Your team manages everything around it.", show: ["Enquiries", "Internal work", "Financial records", "Stock records"],
    blurb: "Customers, stock and daily operations",
    collage: [U("1555396273-367ea4eb4db5"), U("1566670829023-5badae05aa7d")], note: ["Table request noted", "Dietary requirements recorded for the visit"],
    summary: "Customer records, feedback, billing and stock. Table management and point of sale stay in your restaurant systems.",
    title: "Customer records, stock and billing for daily service.",
    intro: [
      "Behind every service: regular-customer records, stock counts, invoices, staff records and guest feedback.",
      "Works alongside restaurant and point-of-sale systems.",
    ],
    points: [
      ["Customer relationships", "Regular-customer records and follow-up to bring guests back."],
      ["Inventory administration", "Product and stock records kept up to date."],
      ["Billing administration", "Invoices and payments recorded for applicable transactions."],
      ["Staff administration", "Employee records and training."],
      ["Customer engagement", "Feedback collected, campaigns and loyalty offers sent."],
    ],
    products: ["CRM", "Inventory", "Billing", "HRMS", "Skillberry", "Campaigns", "Surveys", "Loyalty"],
  },
  {
    key: "travel", name: "Travel & tour operators", img: U("1607068891828-f16297950a66", 1400),
    tag: "Travellers see the trip. Your team manages the enquiries and follow-up behind it.", show: ["Enquiries", "Requests", "Internal work", "Financial records"],
    blurb: "Enquiries, requirements and follow-up",
    collage: [U("1607068891828-f16297950a66"), U("1578894381163-e72c17f2d45f")], note: ["Enquiry logged", "Trip requirements recorded for follow-up"],
    summary: "Enquiries, requirements and follow-up recorded through trip planning. Itineraries, ticketing and supplier inventory stay in your travel systems.",
    title: "Travel enquiries tracked from first contact to post-trip follow-up.",
    intro: [
      "One trip can mean several conversations and changing requirements. Each conversation and open task is recorded against the traveller.",
      "Works alongside travel booking and itinerary systems.",
    ],
    points: [
      ["Enquiry management", "Enquiries and traveller details recorded, follow-up visible."],
      ["Customer coordination", "Communication history kept for the whole relationship."],
      ["Internal task management", "Trip preparation tasks assigned and tracked."],
      ["Billing administration", "Invoices and payments recorded."],
      ["Post-trip engagement", "Post-trip feedback collected, relationships kept for future enquiries."],
    ],
    products: ["CRM", "Projects", "Desk", "Billing", "Campaigns", "Surveys", "Loyalty"],
  },
];

const LABEL_TEXT: Record<string, string> = {
  "Enquiries": "Customer details and follow-up.",
  "Requests": "Issues and service follow-up.",
  "Internal work": "Responsibilities and assigned tasks.",
  "Financial records": "Invoicing and payment administration.",
  "Stock records": "Product and inventory information.",
};

export function HsModels({ eyebrow }: { eyebrow: ReactNode }) {
  const [sel, setSel] = useState(0);
  const m = MODELS[sel];

  // Remember the visitor's type so the enquiry form opens with it selected.
  const choose = (i: number) => () => {
    setSel(i);
    document.documentElement.dataset.enquirySegment = MODELS[i].name;
  };

  return (
    <section id="models" style={{ background: CREAM, padding: "100px 0 108px" }}>
      <style>{`
        .hm-pick{all:unset;box-sizing:border-box;display:block;cursor:pointer;text-align:center;border-radius:26px;padding:10px 10px 18px;transition:transform .3s ease,background .3s ease}
        .hm-pick:focus-visible{outline:2px solid ${FOREST};outline-offset:3px}
        .hm-pick:hover{transform:translateY(-5px)}
        .hm-pick.off{opacity:.62}
        .hm-pick.off:hover{opacity:1}
        .hm-arch{position:relative;overflow:hidden;height:250px;border-radius:200px 200px 22px 22px;transition:box-shadow .35s ease}
        .hm-pick.on .hm-arch{box-shadow:0 0 0 4px ${CREAM},0 0 0 6px ${FOREST},0 34px 50px -28px rgba(6,78,59,.6)}
        .hm-photo{position:absolute;inset:0;background-size:cover;background-position:center;transition:transform .7s cubic-bezier(.2,.7,.2,1)}
        .hm-pick:hover .hm-photo,.hm-pick.on .hm-photo{transform:scale(1.06)}
        .hm-tint{position:absolute;inset:0;background:linear-gradient(180deg,rgba(6,78,59,0) 50%,rgba(6,78,59,.42))}
        .hm-tick{position:absolute;left:50%;bottom:16px;width:40px;height:40px;margin-left:-20px;border-radius:50%;background:${FOREST};color:#fff;display:flex;align-items:center;justify-content:center;opacity:0;transform:scale(.7);transition:opacity .25s ease,transform .3s cubic-bezier(.34,1.4,.64,1);box-shadow:0 12px 24px -10px rgba(0,0,0,.5)}
        .hm-pick.on .hm-tick{opacity:1;transform:none}
        .hm-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px}
        .hm-panel{animation:hmIn .45s ease both}
        @keyframes hmIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
        .hm-top{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:48px;align-items:center}
        .hm-photo-lg{position:relative;height:360px;border-radius:22px 140px 22px 22px;background-size:cover;background-position:center;box-shadow:0 30px 56px -34px rgba(6,78,59,.6)}
        .hm-flow{list-style:none;margin:0;padding:0;display:grid;gap:34px}
        .hm-step{position:relative;padding:22px 16px 14px;border-radius:14px;border:1px solid ${BEIGE};background:${CREAM}}
        .hm-step b{display:block;font-size:14px;color:${FOREST}}
        .hm-step > span:not(.hm-node){font-size:12.5px;line-height:1.5;color:${MUTE}}
        .hm-node{position:absolute;left:14px;top:-14px;width:28px;height:28px;border-radius:50%;background:${FOREST};color:#fff;font-size:13px;font-weight:700;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 4px #fff}
        .hm-next{position:absolute;right:-30px;top:50%;margin-top:-13px;background:#fff;border-radius:50%}
        .hm-pts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px 20px}
        @media (max-width:1000px){.hm-top{grid-template-columns:1fr;gap:28px}.hm-photo-lg{height:280px}}
        @media (max-width:900px){.hm-flow{grid-template-columns:1fr!important;gap:30px}.hm-next{right:auto;left:50%;margin-left:-13px;top:auto;bottom:-29px;margin-top:0;transform:rotate(90deg)}}
        @media (max-width:760px){.hm-grid{grid-template-columns:1fr;gap:6px}.hm-arch{height:200px}.hm-pts{grid-template-columns:1fr}.hm-panel{padding:28px 22px!important}}
        @media (prefers-reduced-motion:reduce){.hm-panel{animation:none}.hm-photo,.hm-pick,.hm-tick{transition:none}}
      `}</style>
      <div className="hs-wrap">
        <div style={{ textAlign: "center", maxWidth: 740, margin: "0 auto 44px" }} data-rv="0">
          {eyebrow}
          <h2 style={{ margin: 0, fontFamily: SERIF, fontWeight: 400, lineHeight: 1.1, letterSpacing: "-.015em", color: INK }}>Hotels, restaurants and <em style={{ color: BOTANICAL }}>travel companies each run differently.</em></h2>
          <p style={{ margin: "20px auto 0", fontSize: 16.5, lineHeight: 1.8, color: "#33443A", maxWidth: "58ch" }}>Hotels, restaurants and travel operators handle bookings, service and follow-up differently. Choose yours.</p>
        </div>

        <p style={{ margin: "0 0 18px", textAlign: "center", fontSize: 12, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: OLIVE }}>What kind of operation do you run?</p>
        <div className="hm-grid" role="tablist" aria-label="Choose your type of operation" data-rv="1">
          {MODELS.map((x, i) => (
            <button key={x.key} type="button" role="tab" aria-selected={i === sel} aria-controls="hm-panel" className={`hm-pick ${i === sel ? "on" : "off"}`} onClick={choose(i)}>
              <div className="hm-arch">
                <div className="hm-photo" style={{ backgroundImage: `url(${x.img})` }} />
                <div className="hm-tint" />
                <span className="hm-tick" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7" /></svg>
                </span>
              </div>
              <h3 style={{ margin: "20px 0 0", fontFamily: SERIF, fontWeight: 400, color: INK }}>{x.name}</h3>
              <p style={{ margin: "8px auto 0", padding: "0 8px", fontSize: 14, lineHeight: 1.5, color: MUTE }}>{x.blurb}</p>
            </button>
          ))}
        </div>

        <div id="hm-panel" key={m.key} role="tabpanel" aria-label={m.name} className="hm-panel" style={{ position: "relative", marginTop: 34, background: "#fff", border: `1px solid ${BEIGE}`, borderRadius: 28, padding: "46px 50px 48px", boxShadow: "0 40px 70px -48px rgba(6,78,59,.5)" }}>
          <div className="hm-top">
            <div className="hm-photo-lg" role="img" aria-label={`${m.name}`} style={{ backgroundImage: `url(${m.collage[0]})` }}>
              <div style={{ position: "absolute", left: 18, bottom: 18, background: CREAM, borderRadius: 14, padding: "12px 16px", boxShadow: "0 22px 40px -24px rgba(6,78,59,.55)", maxWidth: 220 }}>
                <b style={{ display: "block", fontFamily: SERIF, fontWeight: 400, fontSize: 15, color: FOREST }}>{m.note[0]}</b>
                <span style={{ fontSize: 12, color: MUTE }}>{m.note[1]}</span>
              </div>
            </div>
            <div>
              <p style={{ margin: 0, fontFamily: SERIF, fontStyle: "italic", fontSize: 22, lineHeight: 1.3, color: BOTANICAL }}>{m.tag}</p>
              <h3 style={{ margin: "14px 0 0", fontFamily: SERIF, fontWeight: 400, lineHeight: 1.15, color: INK }}>{m.title}</h3>
              <p style={{ margin: "16px 0 0", paddingLeft: 16, borderLeft: `3px solid ${BOTANICAL}`, fontSize: 16.5, lineHeight: 1.7, fontWeight: 600, color: INK }}>{m.summary}</p>
              {m.intro.map((p) => <p key={p} style={{ margin: "14px 0 0", fontSize: 16, lineHeight: 1.8, color: "#33443A" }}>{p}</p>)}
            </div>
          </div>

          <div style={{ margin: "40px 0 0" }}>
            <p style={{ margin: "0 0 14px", fontSize: 11.5, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: OLIVE }}>What your team manages behind the scenes</p>
            <ol className="hm-flow" style={{ gridTemplateColumns: `repeat(${m.show.length}, minmax(0, 1fr))` }}>
              {m.show.map((t, i) => (
                <li key={t} className="hm-step">
                  <span className="hm-node">{i + 1}</span>
                  <b>{t}</b>
                  <span>{LABEL_TEXT[t]}</span>
                  {i < m.show.length - 1 && (
                    <svg className="hm-next" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={BOTANICAL} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
                  )}
                </li>
              ))}
            </ol>
          </div>

          <div className="hm-pts" style={{ marginTop: 28 }}>
            {m.points.map(([h, d]) => (
              <div key={h} style={{ background: CREAM, borderRadius: 16, padding: "18px 20px" }}>
                <div style={{ fontFamily: SERIF, fontSize: 19, color: FOREST }}>{h}</div>
                <p style={{ margin: "6px 0 0", fontSize: 14.5, lineHeight: 1.65, color: MUTE }}>{d}</p>
              </div>
            ))}
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
            <a href="#" data-enquiry="" data-enquiry-segment={m.name} className="hs-btn" style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 10, padding: "13px 24px", borderRadius: 999, fontSize: 14, fontWeight: 600, textDecoration: "none", background: FOREST, color: "#fff" }}>
              Talk to an expert
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
