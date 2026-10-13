import type { CSSProperties, ReactNode } from "react";
import { Topbar } from "@/components/hero/Topbar";
import { Footer } from "@/components/sections/Footer";
import { EnquiryModal } from "@/components/manufacturing/EnquiryModal";
import { HsMotion } from "./HsMotion";

/* Hospitality, Travel & F&B: warm, premium, human, editorial. Photography leads. */
const FOREST = "#14532D";
const EVERGREEN = "#064E3B";
const BOTANICAL = "#2F6B4F";
const OLIVE = "#66734A";
const CREAM = "#F7F1E3";
const LIGHT = "#FBF8F0";
const BEIGE = "#E6D8C5";
const SAGE = "#DDE6D8";
const INK = "#17251D";
const MUTE = "#4B5A50";
const SERIF = "'Iowan Old Style', 'Palatino Linotype', Palatino, Georgia, serif";

const U = (id: string, w = 1200) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;
const IMG = {
  room: U("1730367019960-9906d9cbbf05", 1400),
  corridor: U("1768396747960-ae6ba3c855bc", 1400),
  lounge: U("1758448755981-954afbf60ff7", 1400),
  desk: U("1759038085950-1234ca8f5fed", 1200),
  checkin: U("1553369728-15ec6971afaf", 1200),
  lobby: U("1648857982515-4f6447705810", 1400),
  frontdesk: U("1724230758718-406bab979e67", 1200),
  plate: U("1566670829023-5badae05aa7d", 1200),
  wine: U("1543520788-f17401c3a3bd", 1400),
  table: U("1712949243315-b3da4fa6d973", 1400),
  cafe: U("1555396273-367ea4eb4db5", 1400),
  travel: U("1607068891828-f16297950a66", 1400),
  trip: U("1539635278303-d4002c07eae3", 1200),
  passport: U("1578894381163-e72c17f2d45f", 1200),
};
const photo = (src: string, extra: CSSProperties = {}): CSSProperties => ({ backgroundImage: `url(${src})`, backgroundSize: "cover", backgroundPosition: "center", ...extra });

const I = (f: string) => `/billing/images/${f}`;
const APPICON: Record<string, string> = {
  CRM: I("crm-menu-icn.png"), ServiceOps: I("serviceops-icon.svg"), Projects: I("evoq-projects-menu-icn.png"), HRMS: I("hrms-menu-icn-new.png"),
  Skillberry: I("Skillberry-menu-icn.png"), Desk: I("desk-menu-icn.png"), Billing: I("billing-menu-icn.png"), Inventory: I("inventory-menu-icn.png"), Campaigns: I("campaigns-menu-icn.png"),
};

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p style={{ margin: "0 0 16px", fontSize: 11.5, fontWeight: 600, letterSpacing: ".24em", textTransform: "uppercase", color: light ? "#BFD8C6" : OLIVE }}>{children}</p>;
}
function Cta({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <a href="#" data-enquiry="" className="hs-btn" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "15px 28px", borderRadius: 999, fontSize: 14.5, fontWeight: 600, textDecoration: "none", background: light ? CREAM : FOREST, color: light ? EVERGREEN : "#fff" }}>
      {children}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
    </a>
  );
}
const h2: CSSProperties = { margin: 0, fontFamily: SERIF, fontWeight: 400, fontSize: 46, lineHeight: 1.1, letterSpacing: "-.015em", color: INK };

/* ------------------------------------------------------------------ 1. Hero */
function Hero() {
  return (
    <section style={{ position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${EVERGREEN} 0%, #0B3B2C 100%)`, color: CREAM }}>
      <div aria-hidden="true" style={{ position: "absolute", right: "-8%", top: "-30%", width: 760, height: 760, borderRadius: "50%", background: "radial-gradient(closest-side, rgba(102,115,74,.45), rgba(102,115,74,0))" }} />
      <div className="hs-wrap" style={{ position: "relative" }}>
        <nav aria-label="Breadcrumb" style={{ paddingTop: 22, fontSize: 12, color: "#9DBBA6" }}>Home <span style={{ margin: "0 6px" }}>/</span> Solutions <span style={{ margin: "0 6px" }}>/</span> <b style={{ color: CREAM, fontWeight: 600 }}>Hospitality, Travel &amp; F&amp;B</b></nav>
        <div className="hs-hero">
          <div data-rv="0">
            <Eyebrow light>Hospitality, Travel &amp; F&amp;B</Eyebrow>
            <h1 style={{ margin: 0, fontFamily: SERIF, fontWeight: 400, fontSize: 62, lineHeight: 1.05, letterSpacing: "-.02em", color: CREAM }}>A better customer experience starts <em style={{ color: "#CFE3C0" }}>behind the scenes.</em></h1>
            <p style={{ margin: "26px 0 0", fontSize: 17.5, lineHeight: 1.75, color: "#D7E5DA", maxWidth: "50ch" }}>From the first enquiry to the service that brings customers back, hospitality depends on timely responses, well-coordinated teams and consistent follow-through. EVOQ applications support the customer-facing and operational work behind each experience.</p>
            <div style={{ marginTop: 34 }}><Cta light>Talk to an expert</Cta></div>
          </div>
          <div className="hs-hero-vis" data-rv="1">
            <div style={{ position: "absolute", right: 0, top: 0, width: "62%", height: "100%", borderRadius: "999px 999px 28px 28px", border: `6px solid ${CREAM}22`, ...photo(IMG.room), boxShadow: "0 50px 90px -40px rgba(0,0,0,.7)" }} />
            <div style={{ position: "absolute", left: 0, bottom: 34, width: "44%", height: "46%", borderRadius: 200, border: `5px solid ${EVERGREEN}`, ...photo(IMG.plate), boxShadow: "0 40px 70px -34px rgba(0,0,0,.7)" }} />
            <div className="hs-journey-pill" style={{ position: "absolute", left: "6%", right: "6%", bottom: 0, background: CREAM, color: EVERGREEN, borderRadius: 999, padding: "11px 20px", fontSize: 12, fontWeight: 600, letterSpacing: ".04em", display: "flex", justifyContent: "space-between", gap: 8, boxShadow: "0 24px 40px -22px rgba(0,0,0,.6)" }}>
              {["Discover", "Book", "Arrive", "Experience", "Service", "Return"].map((t, i) => <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>{t}{i < 5 && <span style={{ color: OLIVE }}>→</span>}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 2. Journey */
function Journey() {
  const steps: [string, string][] = [
    ["Discover or enquire", "Understand what the customer needs and respond to the initial enquiry."],
    ["Schedule or book", "Record appointments or bookings where advance scheduling is part of the service."],
    ["Confirm and prepare", "Confirm relevant details, record special requirements and prepare for the expected service."],
    ["Deliver the experience", "Coordinate the people and activities involved in serving the customer."],
    ["Handle requests", "Respond to questions, changes and issues throughout the experience."],
    ["Complete and follow up", "Handle applicable billing and completion steps, collect feedback and maintain the relationship for future visits."],
  ];
  return (
    <section id="journey" style={{ background: CREAM, padding: "96px 0 88px" }}>
      <div className="hs-wrap">
        <div className="hs-split" data-rv="0">
          <div><Eyebrow>The customer journey</Eyebrow><h2 style={h2}>Every experience has a <em style={{ color: BOTANICAL }}>journey.</em></h2></div>
          <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.8, color: MUTE, maxWidth: "52ch" }}>A customer may discover a business, make an inquiry, schedule a service, arrive, receive assistance and return. The steps vary by hospitality model, but each interaction creates work that needs attention.</p>
        </div>
        <div className="hs-steps" style={{ marginTop: 56 }}>
          <div className="hs-rail" aria-hidden="true" />
          {steps.map(([t, d], i) => (
            <div key={t} data-rv={String(i)} style={{ position: "relative" }}>
              <div style={{ position: "relative", zIndex: 1, width: 44, height: 44, borderRadius: "50%", background: i === 5 ? FOREST : LIGHT, border: `1.5px solid ${i === 5 ? FOREST : BOTANICAL}`, color: i === 5 ? CREAM : FOREST, fontFamily: SERIF, fontSize: 19, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</div>
              <h3 style={{ margin: "20px 0 0", fontFamily: SERIF, fontWeight: 400, fontSize: 21, lineHeight: 1.2, color: INK }}>{t}</h3>
              <p style={{ margin: "10px 0 0", fontSize: 14, lineHeight: 1.7, color: MUTE }}>{d}</p>
            </div>
          ))}
        </div>
        <p data-rv="0" style={{ margin: "52px 0 0", paddingTop: 22, borderTop: `1px solid ${BEIGE}`, fontFamily: SERIF, fontStyle: "italic", fontSize: 17.5, lineHeight: 1.6, color: BOTANICAL, maxWidth: "70ch" }}>Every operation follows its own sequence. Adapt the journey to the way your business handles bookings, service delivery and customer follow-up.</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 3. Solutions */
function Solutions() {
  const cards: { n: string; title: string; line: string; body: string; apps: string[]; img: string; pos?: string }[] = [
    { n: "01", title: "Hospitality CRM", line: "Turn enquiries into lasting relationships.", body: "Organize customer details, enquiries, sales opportunities and follow-ups. Give staff the context they need to continue conversations and encourage repeat business.", apps: ["CRM"], img: IMG.checkin },
    { n: "02", title: "Booking management", line: "Make it easier to schedule services and experiences.", body: "Let customers reserve available service slots, book scheduled activities and register for group experiences. Support the booking process around your services, staff and available resources.", apps: ["Booking"], img: IMG.lobby },
    { n: "03", title: "Service & workforce operations", line: "Coordinate the work behind the experience.", body: "Support relevant service activities, internal projects, employee administration and staff development. Help operational teams coordinate the work that supports customer-facing service.", apps: ["ServiceOps", "Projects", "HRMS", "Skillberry"], img: IMG.corridor },
    { n: "04", title: "Customer support", line: "Keep customer requests moving.", body: "Record customer questions, complaints and service issues so staff can track requests, coordinate follow-up and work toward resolution.", apps: ["Desk"], img: IMG.frontdesk },
    { n: "05", title: "Billing & inventory", line: "Keep financial and stock records in view.", body: "Manage invoices, payments and outstanding balances alongside relevant inventory records. Support the financial and stock-related processes that matter to your operation.", apps: ["Billing", "Inventory"], img: IMG.table },
    { n: "06", title: "Guest engagement", line: "Give customers a reason to return.", body: "Collect feedback, coordinate relevant customer communications and support loyalty initiatives that encourage repeat visits and ongoing relationships.", apps: ["Campaigns", "Surveys", "Loyalty"], img: IMG.wine },
  ];
  return (
    <section id="solutions" style={{ background: LIGHT, padding: "96px 0 100px" }}>
      <div className="hs-wrap">
        <div style={{ textAlign: "center", maxWidth: 1000, margin: "0 auto 54px" }} data-rv="0">
          <Eyebrow>Solutions for hospitality, travel &amp; F&amp;B</Eyebrow>
          <h2 className="hs-oneline" style={h2}>Support the work behind <em style={{ color: BOTANICAL }}>every experience.</em></h2>
          <p style={{ margin: "20px auto 0", maxWidth: 760, fontSize: 16.5, lineHeight: 1.8, color: MUTE }}>Choose the solutions that match your customer interactions and operational requirements, from scheduling services to managing relationships, requests and financial activity.</p>
        </div>
        <div className="hs-g3">
          {cards.map((c, i) => (
            <article key={c.title} data-rv={String(i % 3)} className="hs-card" style={{ background: "#fff", border: `1px solid ${BEIGE}`, borderRadius: 22, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ position: "relative", height: 190, ...photo(c.img) }}>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(6,78,59,0) 45%, rgba(6,78,59,.55))" }} />
                <span style={{ position: "absolute", left: 20, bottom: 14, fontFamily: SERIF, fontStyle: "italic", fontSize: 22, color: CREAM }}>{c.n}</span>
              </div>
              <div style={{ padding: "22px 24px 24px", display: "flex", flexDirection: "column", flex: 1 }}>
                <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: OLIVE }}>{c.title}</div>
                <h3 style={{ margin: "9px 0 0", fontFamily: SERIF, fontWeight: 400, fontSize: 24, lineHeight: 1.2, color: INK }}>{c.line}</h3>
                <p style={{ margin: "12px 0 0", fontSize: 14, lineHeight: 1.7, color: MUTE }}>{c.body}</p>
                <div style={{ marginTop: "auto", paddingTop: 20, display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
                  <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#7A8A7F", marginRight: 2 }}>{c.apps.length > 1 ? "Applications" : "Application"}</span>
                  {c.apps.map((a) => (
                    <span key={a} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 12px 5px 6px", borderRadius: 999, background: CREAM, border: `1px solid ${BEIGE}`, fontSize: 12, fontWeight: 600, color: FOREST }}>
                      {APPICON[a] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={APPICON[a]} alt="" width={20} height={20} style={{ width: 20, height: 20, objectFit: "contain" }} />
                      ) : (
                        <span style={{ width: 20, height: 20, borderRadius: "50%", background: SAGE, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: FOREST }}>{a[0]}</span>
                      )}
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 4. Behind the experience */
function Behind() {
  return (
    <section style={{ background: SAGE, padding: "100px 0", overflow: "hidden" }}>
      <div className="hs-wrap hs-split2">
        <div className="hs-collage" data-rv="0">
          <div style={{ position: "absolute", left: 0, top: 0, width: "70%", height: "78%", borderRadius: "28px 200px 28px 28px", ...photo(IMG.desk), boxShadow: "0 40px 80px -40px rgba(6,78,59,.6)" }} />
          <div style={{ position: "absolute", right: 0, bottom: 0, width: "52%", height: "52%", borderRadius: "200px 28px 28px 28px", border: `6px solid ${SAGE}`, ...photo(IMG.cafe) }} />
          <div style={{ position: "absolute", left: "8%", bottom: "6%", background: CREAM, borderRadius: 16, padding: "14px 18px", boxShadow: "0 26px 44px -26px rgba(6,78,59,.55)", fontSize: 12.5, color: INK, maxWidth: 210 }}>
            <b style={{ display: "block", fontFamily: SERIF, fontWeight: 400, fontSize: 16, color: FOREST }}>Reservation confirmed</b>
            <span style={{ color: MUTE }}>Special requirements noted for arrival</span>
          </div>
        </div>
        <div data-rv="1">
          <Eyebrow>Coordinate the work behind the experience</Eyebrow>
          <h2 style={h2}>The customer sees the experience. <em style={{ color: BOTANICAL }}>Your team manages the details.</em></h2>
          <p style={{ margin: "24px 0 0", fontSize: 16.5, lineHeight: 1.8, color: "#33443A", maxWidth: "52ch" }}>Bookings, enquiries, customer requests and follow-up often involve more than one person. Staff need clear responsibilities and access to the information relevant to their work.</p>
          <p style={{ margin: "16px 0 0", fontSize: 16.5, lineHeight: 1.8, color: "#33443A", maxWidth: "52ch" }}>EVOQ applications can support the activities that sit behind customer-facing service, from handling enquiries and requests to coordinating internal work and maintaining records. The right combination depends on how your operation runs.</p>
          <div style={{ marginTop: 26, display: "flex", flexWrap: "wrap", gap: 10 }}>
            {["Enquiries", "Bookings", "Requests", "Internal work", "Records"].map((t) => <span key={t} style={{ padding: "8px 16px", borderRadius: 999, border: `1px solid ${BOTANICAL}66`, fontSize: 13, fontWeight: 600, color: FOREST, background: "#ffffff55" }}>{t}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 5. Models */
function Models() {
  const items: [string, string, string][] = [
    ["Hotels & resorts", "Coordinate guest enquiries, appointment-based services, customer relationships and follow-up around the stay. Choose applications according to the processes your property needs to support.", IMG.lounge],
    ["Restaurants & cafés", "Support customer relationships, scheduled services where applicable, feedback and relevant billing or inventory processes. Restaurant table management and point-of-sale requirements should be addressed through suitable specialist systems where needed.", IMG.cafe],
    ["Travel & tour operators", "Manage customer enquiries, requirements, follow-ups and service-related communication across the trip-planning relationship. Travel itineraries, ticketing and supplier inventory may require specialist travel systems.", IMG.travel],
  ];
  return (
    <section id="models" style={{ background: CREAM, padding: "100px 0 104px" }}>
      <div className="hs-wrap">
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 56px" }} data-rv="0">
          <Eyebrow>Solutions for different hospitality models</Eyebrow>
          <h2 style={h2}>Different experiences. <em style={{ color: BOTANICAL }}>Different operational needs.</em></h2>
        </div>
        <div className="hs-g3" style={{ gap: 28 }}>
          {items.map(([t, d, img], i) => (
            <div key={t} data-rv={String(i)} className="hs-mcard">
              <div className="hs-arch" style={{ position: "relative", height: 330, borderRadius: "200px 200px 24px 24px", overflow: "hidden", ...photo(img) }}>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(6,78,59,0) 55%, rgba(6,78,59,.35))" }} />
              </div>
              <h3 style={{ margin: "26px 0 0", fontFamily: SERIF, fontWeight: 400, fontSize: 27, color: INK, textAlign: "center" }}>{t}</h3>
              <p style={{ margin: "12px auto 0", fontSize: 14.5, lineHeight: 1.75, color: MUTE, textAlign: "center", maxWidth: "40ch" }}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 6. Final CTA */
function FinalCta() {
  return (
    <section id="talk" style={{ position: "relative", overflow: "hidden", background: BEIGE, padding: "96px 0" }}>
      <div className="hs-wrap hs-split2" style={{ alignItems: "center" }}>
        <div data-rv="0">
          <Eyebrow>Hospitality, Travel &amp; F&amp;B</Eyebrow>
          <h2 style={h2}>Let&apos;s look at <em style={{ color: BOTANICAL }}>how your operation works.</em></h2>
          <p style={{ margin: "22px 0 0", fontSize: 16.5, lineHeight: 1.8, color: "#33443A", maxWidth: "50ch" }}>Every hospitality operation has its own booking model, service requirements and customer journey. Discuss your current process to identify where EVOQ applications may support your team.</p>
          <div style={{ marginTop: 32 }}><Cta>Talk to an expert</Cta></div>
        </div>
        <div className="hs-cta-vis" data-rv="1">
          <div style={{ position: "absolute", right: 0, top: 0, width: "78%", height: "100%", borderRadius: "999px 999px 28px 28px", ...photo(IMG.passport), boxShadow: "0 40px 80px -40px rgba(6,78,59,.55)" }} />
          <div style={{ position: "absolute", left: 0, bottom: 0, width: "46%", height: "56%", borderRadius: 160, border: `6px solid ${BEIGE}`, ...photo(IMG.wine) }} />
        </div>
      </div>
    </section>
  );
}

export function HospitalityPage() {
  return (
    <div className="hs-root" style={{ minHeight: "100vh", background: CREAM, color: INK, fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
      <HsMotion />
      <EnquiryModal eyebrow="EVOQ Hospitality" segments={["Hotels & resorts", "Restaurants & cafés", "Travel & tour operators", "Other hospitality business"]} segmentLabel="What type of business do you run?" placeholder="Bookings, guest enquiries, requests, follow-up..." accent={FOREST} accentSoft={BOTANICAL} />
      <style>{`
        .hs-wrap{max-width:1240px;margin:0 auto;padding:0 24px}
        .hs-hero{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:40px;align-items:center;padding:52px 0 84px}
        .hs-hero-vis{position:relative;height:540px}
        .hs-split{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:48px;align-items:end}
        .hs-split2{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:72px;align-items:center}
        .hs-collage{position:relative;height:520px}
        .hs-cta-vis{position:relative;height:420px}
        .hs-g3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}
        .hs-steps{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:26px;position:relative}
        .hs-rail{position:absolute;left:22px;right:22px;top:22px;height:0;border-top:1.5px dashed ${BOTANICAL}88}
        .hs-btn{transition:transform .2s ease,box-shadow .2s ease}
        .hs-btn:hover{transform:translateY(-2px);box-shadow:0 16px 30px -16px rgba(6,78,59,.6)}
        .hs-card{transition:transform .3s ease,box-shadow .3s ease}
        .hs-card:hover{transform:translateY(-6px);box-shadow:0 34px 60px -34px rgba(6,78,59,.45)}
        .hs-oneline{white-space:nowrap}
        .hs-arch{transition:transform .35s ease,box-shadow .35s ease}
        .hs-mcard:hover .hs-arch{transform:translateY(-8px);box-shadow:0 36px 56px -30px rgba(6,78,59,.55)}
        .hs-rv{opacity:0;transform:translateY(26px);transition:opacity .8s cubic-bezier(.2,.7,.2,1),transform .8s cubic-bezier(.2,.7,.2,1);transition-delay:var(--hs-d,0ms)}
        .hs-rv.hs-in{opacity:1;transform:none}
        @media (max-width:1100px){.hs-oneline{white-space:normal}.hs-steps{grid-template-columns:repeat(3,minmax(0,1fr));row-gap:40px}.hs-rail{display:none}.hs-g3{grid-template-columns:repeat(2,minmax(0,1fr))}}
        @media (max-width:900px){.hs-hero,.hs-split,.hs-split2{grid-template-columns:1fr;gap:34px}.hs-hero-vis{height:440px}.hs-collage{height:420px}.hs-journey-pill{display:none}}
        @media (max-width:640px){.hs-steps,.hs-g3{grid-template-columns:1fr}.hs-hero h1,.hs-hero h1+*{}}
        @media (prefers-reduced-motion:reduce){.hs-rv{transition:none}.hs-card,.hs-btn,.hs-arch{transition:none}}
      `}</style>
      <div style={{ background: "#fff", position: "relative", zIndex: 60, borderBottom: "1px solid #F1F5F9" }}>
        <Topbar darkCTA={false} light ctaColor={FOREST} />
      </div>
      <Hero />
      <Journey />
      <Solutions />
      <Behind />
      <Models />
      <FinalCta />
      <Footer background={FOREST} />
    </div>
  );
}
