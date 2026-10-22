import { Topbar } from "@/components/hero/Topbar";
import { HeroShell } from "@/components/shared/HeroShell";
import { Footer } from "@/components/sections/Footer";
import { EnquiryModal } from "@/components/manufacturing/EnquiryModal";
import { HsMotion } from "@/components/hospitality/HsMotion";
import { FinModels } from "./FinModels";

/* Financial Services, "ledger" look: hairline rules, numbered rows, tabular
   figures and navy duotone photography. Square-ish corners, no arches or
   circles. Navy leads, teal supports, gold stays a small accent. */
const NAVY = "#0B2D4F";
const TEAL = "#1B7F8C";
const SLATE = "#5B8DB8";
const MINT = "#E7F3EE";
const GOLD = "#C9A96A";
const SURFACE = "#F7F9FB";
const BORDER = "#E2E8F0";
const INK = "#0F172A";
const SERIF = "'Iowan Old Style', 'Palatino Linotype', Palatino, 'Book Antiqua', Georgia, serif";
const MUTE = "#64748B";

function Cta({ children, light = false, pill = false }: { children: string; light?: boolean; pill?: boolean }) {
  return (
    <a href="#" data-enquiry="" className="fn-btn" style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "16px 28px", borderRadius: pill ? 999 : 4, fontSize: 15, fontWeight: 700, textDecoration: "none", background: light ? "#fff" : NAVY, color: light ? NAVY : "#fff" }}>
      {children}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
    </a>
  );
}

/* ------------------------------------------------------------------ 1. Hero */
const Line = ({ d, c = TEAL }: { d: string; c?: string }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
);
function Hero() {
  const rows: [string, string, string][] = [
    ["M7 3h8l4 4v14H7zM15 3v4h4M10 12h6M10 16h6", "New enquiry", "12m ago"],
    ["M4 5h16v11H9l-5 4zM8 9h8M8 12h5", "Follow-up", "32m ago"],
    ["M4 14v-2a8 8 0 0 1 16 0v2M4 14h3v5H4zM17 14h3v5h-3zM17 19a4 4 0 0 1-4 2", "Service request", "1h ago"],
    ["M4 6h16v14H4zM4 10h16M9 3v4M15 3v4", "Meeting scheduled", "2h ago"],
  ];
  const benefits: [string, string, string, string][] = [
    ["M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M17 11a2.6 2.6 0 1 0 0-5.2M18.5 14.3c1.7.8 2.8 2.6 2.8 4.7", "Stronger client relationships", "Organize enquiries, follow-ups and service communication.", TEAL],
    ["M5 21v-7M11 21V8M17 21v-5M3 21h18", "More consistent follow-through", "Keep responsibilities visible and on track.", GOLD],
    ["M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6zM8.5 12l2.5 2.5 4.5-5", "A better client experience", "Respond faster and maintain long-term relationships.", TEAL],
  ];
  return (
    <section className="fn-herosec" style={{ position: "relative", overflow: "hidden", borderBottom: `1px solid ${BORDER}` }}>
      {/* real consultation photograph, running to the right edge and fading into the page */}
      <div className="fn-heroimg" data-rv="1" role="img" aria-label="Two colleagues in a client consultation, with a city skyline behind" style={{ backgroundImage: "url(/finance/hero.jpg)" }}>
        <span aria-hidden="true" className="fn-heroshade" />
        <svg aria-hidden="true" className="fn-arc" viewBox="0 0 400 300" fill="none"><path d="M10 250 C 90 120, 230 40, 395 22" stroke={GOLD} strokeWidth="1.4" strokeLinecap="round" /></svg>
        <div className="fn-panel" aria-hidden="true">
          <div style={{ fontSize: 14, fontWeight: 600, color: NAVY }}>Client enquiries</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 6 }}>
            <b style={{ fontSize: 38, fontWeight: 600, letterSpacing: "-.02em", color: NAVY, fontVariantNumeric: "tabular-nums" }}>248</b>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: "#15803D" }}>↑ 18%</span>
            <span style={{ fontSize: 11.5, color: MUTE }}>vs. last month</span>
          </div>
          <svg viewBox="0 0 250 70" width="100%" height="62" preserveAspectRatio="none" style={{ display: "block", margin: "8px 0 6px" }}>
            <defs><linearGradient id="fnSpark" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={TEAL} stopOpacity=".22" /><stop offset="1" stopColor={TEAL} stopOpacity="0" /></linearGradient></defs>
            <path d="M0 58 C 25 54, 40 44, 62 48 S 98 56, 124 44 S 168 30, 190 24 S 226 8, 250 6 L250 70 L0 70 Z" fill="url(#fnSpark)" />
            <path className="fn-spark" d="M0 58 C 25 54, 40 44, 62 48 S 98 56, 124 44 S 168 30, 190 24 S 226 8, 250 6" stroke={TEAL} strokeWidth="1.8" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            <circle cx="250" cy="6" r="3.6" fill={TEAL} stroke="#fff" strokeWidth="1.5" />
          </svg>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {rows.map(([d, t, ago], i) => (
              <li key={t} className="fn-prow" style={{ animationDelay: `${0.7 + i * 0.22}s`, display: "grid", gridTemplateColumns: "30px 1fr auto", gap: 12, alignItems: "center", padding: "9px 0", borderTop: `1px solid ${BORDER}` }}>
                <Line d={d} c={NAVY} />
                <span style={{ fontSize: 12.5, fontWeight: 600, color: NAVY }}>{t}</span>
                <span style={{ fontSize: 11.5, color: MUTE }}>{ago}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="fn-mini fn-mini-a" aria-hidden="true">
          <span className="fn-mini-ic" style={{ background: MINT }}><Line d="M5 12.5l4.5 4.5L19 7" c={TEAL} /></span>
          <span><b>Service request resolved</b><i>Statement query · closed in 3 days</i></span>
        </div>
        <div className="fn-mini fn-mini-b" aria-hidden="true">
          <span className="fn-mini-ic" style={{ background: "#F6EFDF" }}><Line d="M4 6h16v14H4zM4 10h16M9 3v4M15 3v4" c="#A9893F" /></span>
          <span><b>Meeting scheduled</b><i>Annual review · Thursday 10:00</i></span>
        </div>
        <ul aria-hidden="true" className="fn-vlabels">
          {["People", "Insights", "Growth"].map((t) => <li key={t}>{t}</li>)}
        </ul>
      </div>

      <div className="fn-wrap" style={{ position: "relative" }}>
        <nav aria-label="Breadcrumb" style={{ paddingTop: 22, fontSize: 12, color: MUTE }}>Home <span style={{ margin: "0 6px" }}>/</span> Solutions <span style={{ margin: "0 6px" }}>/</span> <b style={{ color: INK, fontWeight: 600 }}>Financial Services</b></nav>
        <div className="fn-hero">
          <div data-rv="0">
            <p style={{ margin: "0 0 20px", display: "flex", alignItems: "center", gap: 14, fontSize: 12, fontWeight: 600, letterSpacing: ".26em", textTransform: "uppercase", color: "#5B6B80" }}><span aria-hidden="true" style={{ width: 54, height: 1.5, background: GOLD }} />Financial Services</p>
            <h1 style={{ margin: 0, fontFamily: SERIF, letterSpacing: "-.02em", fontWeight: 500, color: NAVY }}>Where client enquiries become long-term relationships.</h1>
            <p style={{ margin: "26px 0 0", fontSize: 17, lineHeight: 1.75, color: "#475569", maxWidth: "50ch" }}>Every financial relationship involves more than a transaction. Customer enquiries, ongoing communication, service requests and internal coordination all shape the experience. EVOQ products support these activities, helping financial-services organizations manage client relationships and the work surrounding them.</p>
            <div style={{ marginTop: 34 }}><Cta pill>Talk to an expert</Cta></div>
          </div>
        </div>
        <div className="fn-benefits" data-rv="1">
          {benefits.map(([d, t, s, c]) => (
            <div key={t} className="fn-benefit">
              <Line d={d} c={c} />
              <b>{t}</b>
              <span>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 3. Behind the relationship */
function Behind() {
  const labels: [string, string][] = [
    ["Enquiries", "Customer details and follow-up."],
    ["Client communication", "Relationship activity and ongoing contact."],
    ["Service requests", "Issues and customer follow-up."],
    ["Internal work", "Responsibilities and assigned tasks."],
    ["Customer engagement", "Communications, feedback and continued relationships."],
  ];
  return (
    <section style={{ background: SURFACE, padding: "104px 0", borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
      <div className="fn-wrap">
        <div className="fn-behind">
          <div data-rv="0">
            <p style={{ margin: "0 0 16px", fontSize: 11.5, fontWeight: 700, letterSpacing: ".22em", textTransform: "uppercase", color: TEAL }}>Behind every relationship</p>
            <h2 style={{ margin: 0, fontFamily: SERIF, letterSpacing: "-.015em", fontWeight: 500, color: NAVY }}>Every financial relationship involves more than a transaction.</h2>
            <p style={{ margin: "22px 0 0", fontSize: 16.5, lineHeight: 1.8, color: "#334155", maxWidth: "52ch" }}>A customer enquiry can lead to several conversations, service requests and follow-up activities. Staff need to maintain relevant information, coordinate responsibilities and keep outstanding work visible.</p>
            <p style={{ margin: "14px 0 0", fontSize: 16.5, lineHeight: 1.8, color: "#334155", maxWidth: "52ch" }}>EVOQ products support the customer-facing and internal activities surrounding financial services, helping teams manage relationship-related work and maintain consistent follow-through.</p>
            <div className="fn-duo-wrap" style={{ marginTop: 30 }}>
              <div role="img" aria-label="A client meeting" style={{ height: 210, backgroundImage: "url(/finance/team.jpg)", backgroundSize: "cover", backgroundPosition: "50% 45%", filter: "grayscale(1) contrast(1.05)" }} />
            </div>
          </div>
          <ol data-rv="1" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {labels.map(([t, d], i) => (
              <li key={t} className="fn-lrow" style={{ display: "grid", gridTemplateColumns: "64px minmax(0,1fr)", gap: 16, padding: "24px 4px", borderBottom: `1px solid ${BORDER}`, alignItems: "baseline" }}>
                <span className="fn-lnum" style={{ fontSize: 28, fontWeight: 300, letterSpacing: "-.02em", color: "#B8C4D2", fontVariantNumeric: "tabular-nums" }}>{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <b style={{ display: "block", fontSize: 19, fontWeight: 600, color: NAVY }}>{t}</b>
                  <span style={{ display: "block", marginTop: 4, fontSize: 15, lineHeight: 1.6, color: MUTE }}>{d}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ 4. Final CTA */
function FinalCta() {
  return (
    <section id="talk" style={{ background: "#fff", padding: "96px 0 100px" }}>
      <div className="fn-wrap">
        <div data-rv="0" className="fn-cta" style={{ paddingTop: 8, display: "grid", gridTemplateColumns: "minmax(0,1.1fr) minmax(0,.9fr)", gap: 64, alignItems: "end" }}>
          <div>
            <p style={{ margin: "0 0 16px", display: "flex", alignItems: "center", gap: 12, fontSize: 11.5, fontWeight: 700, letterSpacing: ".22em", textTransform: "uppercase", color: TEAL }}><span aria-hidden="true" style={{ width: 28, height: 1.5, background: GOLD }} />Financial Services</p>
            <h2 style={{ margin: 0, fontFamily: SERIF, letterSpacing: "-.015em", fontWeight: 500, color: NAVY }}>Start with how your client enquiries and follow-ups work today.</h2>
          </div>
          <div>
            <p style={{ margin: "0 0 28px", fontSize: 16.5, lineHeight: 1.8, color: "#334155" }}>Explore how EVOQ products could support client relationships, service activities and internal coordination across your financial-services organization.</p>
            <Cta>Talk to an expert</Cta>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FinancePage() {
  return (
    <div className="hs-root" style={{ minHeight: "100vh", background: "#fff", color: INK, fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
      <HsMotion />
      <EnquiryModal eyebrow="EVOQ Financial Services" segments={["Banking & lending", "Insurance & brokerages", "Wealth management & financial advisory", "Other financial services"]} segmentLabel="Your organization" placeholder="Client enquiries, service requests, follow-up, communications..." accent={NAVY} accentSoft={TEAL} />
      <style>{`
        .fn-wrap{max-width:1240px;margin:0 auto;padding:0 24px}
        .fn-hero{max-width:560px;padding:84px 0 56px}
        .fn-heroimg{position:absolute;top:0;right:0;bottom:0;width:64%;background-size:cover;background-position:40% 45%}
        .fn-heroshade{position:absolute;inset:0;background:linear-gradient(90deg,#F7F9FB 0%,rgba(247,249,251,.88) 8%,rgba(247,249,251,.4) 20%,rgba(247,249,251,0) 38%),linear-gradient(0deg,rgba(247,249,251,.9) 0%,rgba(247,249,251,0) 28%)}
        .fn-arc{position:absolute;right:0;top:0;width:58%;height:auto;opacity:.9}
        .fn-panel{position:absolute;left:24%;top:9%;width:292px;background:#fff;border-radius:10px;padding:18px 20px 8px;box-shadow:0 30px 60px -28px rgba(11,45,79,.45),0 0 0 1px ${BORDER}}
        .fn-mini{position:absolute;display:flex;align-items:center;gap:12px;background:#fff;border-radius:10px;padding:12px 16px 12px 12px;box-shadow:0 26px 50px -26px rgba(11,45,79,.5),0 0 0 1px ${BORDER};opacity:0;animation:fnPop .6s ease forwards}
        .fn-mini b{display:block;font-size:13px;font-weight:700;color:${NAVY}}
        .fn-mini i{display:block;font-style:normal;font-size:11.5px;color:${MUTE};margin-top:1px}
        .fn-mini-ic{width:34px;height:34px;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;flex:none}
        .fn-mini-a{right:4%;top:46%;animation-delay:1.6s}
        .fn-mini-b{right:9%;bottom:13%;animation-delay:1.9s}
        @keyframes fnPop{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
        .fn-spark{stroke-dasharray:420;stroke-dashoffset:420;animation:fnDraw 1.6s .4s ease forwards}
        @keyframes fnDraw{to{stroke-dashoffset:0}}
        .fn-prow{opacity:0;transform:translateX(8px);animation:fnRow .5s ease forwards}
        @keyframes fnRow{to{opacity:1;transform:none}}
        .fn-vlabels{position:absolute;right:30px;top:60px;list-style:none;margin:0;padding:0;display:grid;gap:12px;text-align:right}
        .fn-vlabels li{font-size:11px;font-weight:600;letter-spacing:.28em;text-transform:uppercase;color:#fff;text-shadow:0 1px 8px rgba(11,45,79,.55);display:flex;align-items:center;justify-content:flex-end;gap:10px}
        .fn-vlabels li::before{content:"";width:18px;height:1.5px;background:${GOLD}}
        .fn-benefits{position:relative;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));max-width:760px;margin-top:8px;padding:30px 0 56px;border-top:1px solid ${BORDER}}
        .fn-benefit{display:flex;flex-direction:column;gap:8px;padding:0 26px;border-left:1px solid ${BORDER}}
        .fn-benefit:first-child{padding-left:0;border-left:0}
        .fn-benefit b{margin-top:6px;font-size:16px;font-weight:700;line-height:1.3;color:${NAVY}}
        .fn-benefit span{font-size:13.5px;line-height:1.55;color:${MUTE}}
        .fn-behind{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:80px;align-items:start}
        .fn-duo-wrap{position:relative;border-radius:6px;overflow:hidden}
        .fn-duo-wrap::after{content:"";position:absolute;inset:0;background:${NAVY};mix-blend-mode:multiply;opacity:.78;pointer-events:none}
        .fn-lrow{transition:background .25s ease}
        .fn-lrow:hover{background:#fff}
        .fn-lrow:hover .fn-lnum{color:${TEAL}}
        .fn-lnum{transition:color .25s ease}
        .fn-btn{transition:transform .2s ease,box-shadow .2s ease}
        .fn-btn:hover{transform:translateY(-2px);box-shadow:0 16px 28px -16px rgba(11,45,79,.6)}
        .fm-head{}
        .hs-rv{opacity:0;transform:translateY(26px);transition:opacity .8s cubic-bezier(.2,.7,.2,1),transform .8s cubic-bezier(.2,.7,.2,1);transition-delay:var(--hs-d,0ms)}
        .hs-rv.hs-in{opacity:1;transform:none}
        @media (max-width:1180px){.fn-panel,.fn-vlabels,.fn-arc,.fn-mini{display:none}}
        @media (max-width:1000px){.fn-behind,.fn-cta,.fm-head{grid-template-columns:1fr!important;gap:36px!important}.fn-herosec{display:flex;flex-direction:column}.fn-heroimg{position:relative;order:2;width:100%;height:300px}.fn-heroshade{background:linear-gradient(180deg,#F7F9FB,rgba(247,249,251,0) 35%)}.fn-hero{padding:48px 0 40px}.fn-benefits{order:3;grid-template-columns:1fr;gap:22px;padding:30px 0 44px}.fn-benefit,.fn-benefit:first-child{border-left:0;padding:0}}
        @media (prefers-reduced-motion:reduce){.hs-rv,.fn-btn,.fn-lrow{transition:none}.fn-spark{animation:none;stroke-dashoffset:0}.fn-prow,.fn-mini{animation:none;opacity:1;transform:none}}
      `}</style>
      <HeroShell bg={{ background: SURFACE }} topbar={<Topbar darkCTA={false} light ctaColor={NAVY} />}>
        <Hero />
      </HeroShell>
      <FinModels />
      <Behind />
      <FinalCta />
      <Footer background={NAVY} />
    </div>
  );
}
