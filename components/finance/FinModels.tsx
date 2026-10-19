"use client";

import { useState, type CSSProperties } from "react";

/* Financial services segments, "ledger" style: a ruled list of three segments
   on the left, the selected segment's detail on the right (no navigation).
   Copy is the approved page content; EVOQ product claims stay as written. */
const NAVY = "#0B2D4F";
const TEAL = "#1B7F8C";
const MINT = "#E7F3EE";
const GOLD = "#C9A96A";
const SURFACE = "#F7F9FB";
const BORDER = "#E2E8F0";
const INK = "#0F172A";
const SERIF = "'Iowan Old Style', 'Palatino Linotype', Palatino, 'Book Antiqua', Georgia, serif";
const MUTE = "#64748B";

const I = (f: string) => `/billing/images/${f}`;
const ICON: Record<string, string> = {
  CRM: I("crm-menu-icn.png"), Desk: I("desk-menu-icn.png"), Projects: I("evoq-projects-menu-icn.png"), Campaigns: I("campaigns-menu-icn.png"),
};

type Segment = {
  key: string; name: string; summary: string; img: string; pos: string;
  title: string; intro: string[]; points: [string, string][]; products: string[];
};

const SEGMENTS: Segment[] = [
  {
    key: "banking", name: "Banking & lending", img: "/finance/bank.jpg", pos: "50% 40%",
    summary: "Organize customer enquiries, prospect follow-up, relationship management and service communication across banking and lending operations. Choose EVOQ products according to the processes your institution needs to support.",
    title: "Support the relationships behind every financial service.",
    intro: [
      "Customer relationships extend beyond the initial enquiry. Prospects need timely follow-up, existing clients need responsive service, and staff need access to relevant customer information to manage ongoing interactions.",
      "EVOQ products can support customer relationship management, service requests and internal coordination alongside specialist banking and lending systems.",
    ],
    points: [
      ["Customer relationships", "Maintain customer records, organize enquiries and track follow-up activity."],
      ["Service requests", "Record customer issues and organize the work required to respond."],
      ["Internal coordination", "Assign responsibilities and keep relevant tasks visible to the people handling them."],
      ["Customer engagement", "Support customer communications and gather feedback."],
    ],
    products: ["CRM", "Desk", "Projects", "Campaigns", "Surveys"],
  },
  {
    key: "insurance", name: "Insurance & brokerages", img: "/finance/insurance.jpg", pos: "50% 45%",
    summary: "Support prospect management, client relationships, follow-up communication and customer service throughout the insurance relationship. Specialist policy and claims processes may require dedicated insurance systems.",
    title: "Keep client relationships moving beyond the policy.",
    intro: [
      "Insurance relationships involve ongoing communication, service enquiries, renewal-related follow-up and opportunities to maintain client engagement. Staff need clear customer records and visibility into the interactions that require attention.",
      "EVOQ products can support client relationship management, service communication and customer engagement alongside specialist insurance administration systems.",
    ],
    points: [
      ["Prospect management", "Organize enquiries and maintain visibility into follow-up activity."],
      ["Client communication", "Keep customer details and relationship activity accessible to the relevant staff."],
      ["Service coordination", "Record enquiries and organize the follow-up needed to address client requests."],
      ["Renewal-related engagement", "Support planned customer communications and follow-up where relevant."],
      ["Customer feedback", "Gather feedback and identify opportunities to improve service."],
    ],
    products: ["CRM", "Desk", "Campaigns", "Surveys", "Projects"],
  },
  {
    key: "wealth", name: "Wealth management & financial advisory", img: "/finance/wealth.jpg", pos: "50% 40%",
    summary: "Organize prospect enquiries, client relationships, appointment coordination and ongoing communication across advisory services. Investment portfolio management and regulated advisory processes may require specialist systems.",
    title: "Give every client relationship the attention it requires.",
    intro: [
      "Financial advisory relationships develop over time. Initial enquiries lead to conversations, scheduled meetings, ongoing communication and follow-up. Maintaining clear records helps staff understand the relationship and identify the next administrative action.",
      "EVOQ products can support customer records, relationship follow-up, service requests and internal coordination alongside specialist wealth management and investment systems.",
    ],
    points: [
      ["Client relationships", "Maintain client details and track relationship-related follow-up."],
      ["Appointment coordination", "Organize meeting-related tasks and follow-up activity using the capabilities available."],
      ["Ongoing communication", "Support customer communications and planned engagement."],
      ["Service requests", "Record client enquiries and organize responses."],
      ["Client feedback", "Gather feedback to understand service experiences."],
    ],
    products: ["CRM", "Desk", "Campaigns", "Surveys", "Projects"],
  },
];

export function FinModels() {
  const [open, setOpen] = useState(0);
  const m = SEGMENTS[open];
  const photo: CSSProperties = { backgroundImage: `url(${m.img})`, backgroundSize: "cover", backgroundPosition: m.pos };
  return (
    <section id="segments" style={{ background: "#fff", padding: "104px 0 108px" }}>
      <style>{`
        .fm-row{all:unset;box-sizing:border-box;display:grid;grid-template-columns:54px minmax(0,1fr) 22px;gap:6px 14px;align-items:start;width:100%;cursor:pointer;padding:24px 18px 24px 20px;border-top:1px solid ${BORDER};position:relative;transition:background .25s ease}
        .fm-row:last-child{border-bottom:1px solid ${BORDER}}
        .fm-row::before{content:"";position:absolute;left:0;top:-1px;bottom:-1px;width:3px;background:${GOLD};transform:scaleY(0);transform-origin:top;transition:transform .3s ease}
        .fm-row:hover{background:${SURFACE}}
        .fm-row.on{background:${SURFACE}}
        .fm-row.on::before{transform:scaleY(1)}
        .fm-row:focus-visible{outline:2px solid ${NAVY};outline-offset:-2px}
        .fm-num{font-size:30px;font-weight:300;line-height:1;letter-spacing:-.02em;color:#B8C4D2;font-variant-numeric:tabular-nums;transition:color .25s ease}
        .fm-row:hover .fm-num,.fm-row.on .fm-num{color:${TEAL}}
        .fm-arrow{margin-top:4px;color:#B8C4D2;transition:transform .3s ease,color .25s ease}
        .fm-row:hover .fm-arrow{transform:translateX(4px);color:${NAVY}}
        .fm-row.on .fm-arrow{color:${NAVY}}
        .fm-sum{display:block;overflow:hidden;max-height:0;opacity:0;transition:max-height .45s ease,opacity .35s ease}
        .fm-row.on .fm-sum{max-height:220px;opacity:1}
        .fm-layout{display:grid;grid-template-columns:minmax(0,.82fr) minmax(0,1.18fr);gap:56px;align-items:start}
        .fm-duo{position:relative;height:230px;border-radius:6px;overflow:hidden;background-size:cover;filter:grayscale(1) contrast(1.05)}
        .fm-duo-wrap{position:relative;border-radius:6px;overflow:hidden}
        .fm-duo-wrap::after{content:"";position:absolute;inset:0;background:${NAVY};mix-blend-mode:multiply;opacity:.78;pointer-events:none}
        .fm-duo-wrap::before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(27,127,140,.35),rgba(27,127,140,0));z-index:1;pointer-events:none}
        .fm-trow{display:grid;grid-template-columns:210px minmax(0,1fr);gap:20px;padding:16px 0;border-top:1px solid ${BORDER}}
        .fm-detail{animation:fmIn .4s ease both}
        @keyframes fmIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
        @media (max-width:1000px){.fm-layout{grid-template-columns:1fr;gap:34px}}
        @media (max-width:640px){.fm-trow{grid-template-columns:1fr;gap:4px}.fm-row{grid-template-columns:42px minmax(0,1fr) 18px}.fm-num{font-size:24px}}
        @media (prefers-reduced-motion:reduce){.fm-detail{animation:none}.fm-row,.fm-sum,.fm-arrow,.fm-num,.fm-row::before{transition:none}}
      `}</style>
      <div className="fn-wrap">
        <div className="fm-head" data-rv="0" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,.9fr)", gap: 56, alignItems: "end", paddingBottom: 36, borderBottom: `2px solid ${NAVY}`, marginBottom: 0 }}>
          <div>
            <p style={{ margin: "0 0 16px", fontSize: 11.5, fontWeight: 700, letterSpacing: ".22em", textTransform: "uppercase", color: TEAL }}>Solutions for different financial services</p>
            <h2 style={{ margin: 0, fontFamily: SERIF, letterSpacing: "-.015em", fontWeight: 500, color: NAVY }}>Different relationships. Different operational needs.</h2>
          </div>
          <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.8, color: MUTE }}>Banks, insurance providers and financial advisors serve clients in different ways. Explore the operational needs of your segment and see where EVOQ products can help.</p>
        </div>

        <div className="fm-layout" style={{ marginTop: 48 }} data-rv="1">
          <div role="tablist" aria-label="Financial services segments">
            {SEGMENTS.map((x, i) => (
              <button key={x.key} type="button" role="tab" aria-selected={i === open} aria-controls="fm-detail" className={`fm-row${i === open ? " on" : ""}`} onClick={() => setOpen(i)}>
                <span className="fm-num">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span style={{ display: "block", fontSize: 21, fontWeight: 600, lineHeight: 1.25, letterSpacing: "-.01em", color: NAVY }}>{x.name}</span>
                  <span className="fm-sum"><span style={{ display: "block", marginTop: 10, fontSize: 14.5, lineHeight: 1.75, color: MUTE }}>{x.summary}</span></span>
                </span>
                <svg className="fm-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </button>
            ))}
          </div>

          <div id="fm-detail" key={m.key} role="tabpanel" className="fm-detail">
            <div className="fm-duo-wrap"><div className="fm-duo" style={photo} role="img" aria-label={`${m.name} photograph`} /></div>
            <h3 style={{ margin: "30px 0 0", fontFamily: SERIF, fontWeight: 500, letterSpacing: "-.01em", color: NAVY }}>{m.title}</h3>
            {m.intro.map((p) => <p key={p} style={{ margin: "14px 0 0", fontSize: 16, lineHeight: 1.8, color: "#334155" }}>{p}</p>)}
            <div style={{ marginTop: 26, borderBottom: `1px solid ${BORDER}` }}>
              {m.points.map(([h, d]) => (
                <div key={h} className="fm-trow">
                  <div style={{ fontSize: 15.5, fontWeight: 700, color: NAVY }}>{h}</div>
                  <div style={{ fontSize: 14.5, lineHeight: 1.65, color: MUTE }}>{d}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 22, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: TEAL, marginRight: 6 }}>Relevant products</span>
              {m.products.map((a) => (
                <span key={a} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 13px 5px 6px", borderRadius: 6, background: MINT, fontSize: 12.5, fontWeight: 700, color: NAVY }}>
                  {ICON[a] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={ICON[a]} alt="" width={20} height={20} style={{ width: 20, height: 20, objectFit: "contain" }} />
                  ) : (
                    <span style={{ width: 20, height: 20, borderRadius: 4, background: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: TEAL }}>{a[0]}</span>
                  )}
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
