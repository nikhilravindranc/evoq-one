import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Topbar } from "@/components/hero/Topbar";
import { HeroShell } from "@/components/shared/HeroShell";
import { Footer } from "@/components/sections/Footer";
import { EnquiryModal } from "@/components/manufacturing/EnquiryModal";
import { HealthcareLogo } from "./HealthcareLogo";
import { HealthcareSwitcher } from "./HealthcareSwitcher";

/* Patient Engagement: the third Healthcare sub-page (Campaigns, Surveys, Loyalty).
   Same shell as the Patient Relationships and Practice Management pages; each
   product chapter carries its own accent and a code-built screen. */

const NAVY = "#31465A";
const TEAL = "#18B8D1";
const BLUE = "#2064B6";

type Key = "campaigns" | "surveys" | "loyalty";
const P: Record<Key, { name: string; c: string; tint: string; deep: string }> = {
  campaigns: { name: "Campaigns", c: "#7C3AED", tint: "#F3E8FF", deep: "#3D1E5C" },
  surveys: { name: "Surveys", c: "#0D9488", tint: "#E6F7F5", deep: "#0F3D3A" },
  loyalty: { name: "Loyalty", c: "#DB2777", tint: "#FCE7F3", deep: "#5B1534" },
};

const PATHS: Record<Key | "check" | "arrow" | "star", string> = {
  campaigns: "m3 11 18-5v12L3 14v-3zM11.6 16.8a3 3 0 1 1-5.8-1.6",
  surveys: "M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",
  loyalty: "M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z",
  check: "m5 12.5 4.5 4.5L19 7",
  arrow: "M5 12h14M13 6l6 6-6 6",
  star: "m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z",
};
function Ic({ n, size = 18, stroke = "currentColor", fill = "none", w = 2 }: { n: keyof typeof PATHS; size?: number; stroke?: string; fill?: string; w?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={PATHS[n]} />
    </svg>
  );
}
function ProductTile({ k, size = 40 }: { k: Key; size?: number }) {
  const p = P[k];
  return (
    <span className="flex shrink-0 items-center justify-center rounded-[12px]" style={{ width: size, height: size, background: p.tint, color: p.c }}>
      <Ic n={k} size={Math.round(size * 0.5)} />
    </span>
  );
}

/* ------------------------------------------------------------------ nav */
const MENU = [
  { name: "Overview", href: "#overview" },
  { name: "Campaigns", href: "#campaigns" },
  { name: "Surveys", href: "#surveys" },
  { name: "Loyalty", href: "#loyalty" },
];
function PeNav() {
  return (
    <div className="border-b border-[#102A43]/8">
      <div className="px-5 sm:px-6 lg:px-6">
        <div className="mx-auto flex max-w-[1300px] items-center gap-6 py-3 pl-2 sm:pl-4 md:pl-6 lg:gap-8 lg:pl-[54px]">
          <Link href="/solutions/healthcare/patient-engagement" className="shrink-0 no-underline">
            <HealthcareLogo label="Patient Engagement" />
          </Link>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Patient Engagement">
            {MENU.map((m, i) => (
              <a key={m.name} href={m.href} className={`relative rounded-full px-4 py-2.5 text-sm font-medium no-underline transition-colors ${i === 0 ? "text-[#2064B6]" : "text-[#64748B] hover:bg-[#F2F4F6] hover:text-[#26384B]"}`}>
                {m.name}
                {i === 0 && <span className="absolute inset-x-4 -bottom-[13px] h-[2.5px] rounded-full bg-[#2064B6]" />}
              </a>
            ))}
          </nav>
          <div className="ml-auto hidden md:block">
            <HealthcareSwitcher current="engagement" accent={BLUE} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ shared bits */
const CARD = "rounded-2xl bg-white shadow-[0_22px_50px_-24px_rgba(49,70,90,0.45)] ring-1 ring-[#31465A]/6";
const H2 = "font-[var(--font-display)] text-[34px] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#31465A] sm:text-[38px]";
const Eyebrow = ({ children, c = TEAL }: { children: ReactNode; c?: string }) => (
  <p className="text-[13px] font-bold uppercase tracking-[0.14em]" style={{ color: c }}>{children}</p>
);
function Wrap({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className="px-5 sm:px-6 lg:px-6">
      <div className={`mx-auto max-w-[1300px] ${className}`}>{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ hero */
function Hero() {
  return (
    <section id="overview" className="relative scroll-mt-24 overflow-hidden">
      <style>{`@keyframes peFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}.pe-float{animation:peFloat 5.6s ease-in-out infinite}@media (prefers-reduced-motion:reduce){.pe-float{animation:none}}`}</style>
      <Wrap className="grid items-center gap-12 pb-20 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-24 lg:pt-20">
        <div>
          <Eyebrow>Patient Engagement</Eyebrow>
          <div className="mt-4 flex flex-wrap gap-2">
            {(Object.keys(P) as Key[]).map((k) => (
              <span key={k} className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[13px] font-semibold ring-1 ring-[#31465A]/10" style={{ color: P[k].deep }}>
                <span style={{ color: P[k].c }}><Ic n={k} size={15} /></span>{P[k].name}
              </span>
            ))}
          </div>
          <h1 className="mt-6 font-[var(--font-display)] text-[28px] font-extrabold leading-[1.1] tracking-[-0.02em] text-[#31465A] sm:text-[42px] lg:text-[46px]">
            Keep patient relationships going beyond the appointment.
          </h1>
          <p className="mt-5 max-w-[560px] text-[17px] leading-[1.7] text-[#64748B]">
            Help patients stay informed, understand their experience, and maintain an ongoing relationship with your practice. EVOQ Campaigns, Surveys, and Loyalty support three essential parts of patient engagement: communication, feedback, and retention.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <a href="#" data-enquiry="" className="inline-flex items-center gap-2.5 rounded-full bg-[#2064B6] px-7 py-3.5 text-[15px] font-semibold text-white no-underline shadow-[0_12px_28px_-10px_rgba(32,100,182,0.45)] transition-all hover:-translate-y-px hover:bg-[#185596]">
              Talk to an expert <Ic n="arrow" size={15} />
            </a>
            <a href="/solutions/healthcare" className="inline-flex items-center gap-2.5 rounded-full border border-[#2064B6] bg-white/80 px-7 py-3.5 text-[15px] font-semibold text-[#2064B6] no-underline transition-all hover:-translate-y-px hover:bg-white">
              Explore Healthcare <Ic n="arrow" size={15} />
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[560px]" aria-hidden="true">
          <div className="relative h-[420px] overflow-hidden rounded-[28px] shadow-[0_40px_80px_-36px_rgba(49,70,90,0.55)] ring-[6px] ring-white sm:h-[480px]">
            <Image src="/healthcare/stock/hc-card-pe.jpg" alt="" fill priority sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" style={{ objectPosition: "65% 40%" }} />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#31465A]/30 to-transparent" />
          </div>
          {/* campaign */}
          <div className={`${CARD} pe-float absolute -left-4 top-8 hidden w-[240px] p-4 sm:block lg:-left-12`}>
            <div className="flex items-center gap-2.5">
              <ProductTile k="campaigns" size={30} />
              <div className="leading-tight"><p className="text-[12px] font-bold text-[#31465A]">Practice update</p><p className="text-[10.5px] text-[#64748B]">Scheduled · Tue 9:00 AM</p></div>
            </div>
            <p className="mt-3 rounded-lg bg-[#F8F5FF] px-3 py-2 text-[11.5px] font-semibold text-[#3D1E5C]">New Saturday clinic hours</p>
            <p className="mt-2 text-[10.5px] text-[#64748B]">Audience: patients seen in the last 12 months</p>
          </div>
          {/* survey */}
          <div className={`${CARD} pe-float absolute -right-3 top-[44%] hidden w-[210px] p-4 sm:block lg:-right-8`} style={{ animationDelay: "1.2s" }}>
            <div className="flex items-center gap-2.5">
              <ProductTile k="surveys" size={30} />
              <p className="text-[12px] font-bold leading-tight text-[#31465A]">How was your visit?</p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-[#F59E0B]">
              {[0, 1, 2, 3, 4].map((i) => <Ic key={i} n="star" size={15} fill={i < 4 ? "#F59E0B" : "none"} stroke="#F59E0B" w={1.6} />)}
              <span className="ml-1.5 text-[12px] font-bold text-[#31465A]">4.6</span>
            </div>
            <p className="mt-2 text-[10.5px] text-[#64748B]">“Clear explanation of the treatment plan.”</p>
          </div>
          {/* loyalty */}
          <div className={`${CARD} pe-float absolute -bottom-6 left-8 hidden w-[250px] p-4 sm:block`} style={{ animationDelay: "2.2s" }}>
            <div className="flex items-center gap-2.5">
              <ProductTile k="loyalty" size={30} />
              <div className="leading-tight"><p className="text-[12px] font-bold text-[#31465A]">Returning patient</p><p className="text-[10.5px] text-[#64748B]">6 visits · member since 2023</p></div>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#FCE7F3]"><i className="block h-full w-[75%] rounded-full bg-[#DB2777]" /></div>
            <p className="mt-1.5 text-[10.5px] text-[#64748B]">2 visits to the next benefit</p>
          </div>
        </div>
      </Wrap>
    </section>
  );
}

/* ------------------------------------------------------------------ intro */
const THREE: { k: Key; title: string; body: string }[] = [
  { k: "campaigns", title: "Reach patients with relevant communication", body: "Share practice updates, service information, and educational content with relevant patient audiences through EVOQ Campaigns." },
  { k: "surveys", title: "Understand the patient experience", body: "Gather patient feedback through EVOQ Surveys to learn about their experiences and identify opportunities to improve services." },
  { k: "loyalty", title: "Encourage ongoing relationships", body: "Use EVOQ Loyalty to support retention initiatives that recognize returning patients and encourage continued engagement." },
];
function Intro() {
  return (
    <section className="bg-white">
      <Wrap className="py-20 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <h2 className={H2}>Patient relationships extend beyond the consultation.</h2>
          <div>
            <p className="text-[16.5px] leading-[1.75] text-[#64748B]">
              An appointment is one part of the patient experience. Communication between visits keeps patients informed. Feedback helps practices understand what patients value. Loyalty initiatives can encourage patients to maintain their relationship with the practice.
            </p>
            <p className="mt-4 text-[15.5px] font-semibold leading-[1.65] text-[#31465A]">
              EVOQ Patient Engagement brings these activities together through three distinct products.
            </p>
          </div>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {THREE.map((t) => (
            <a key={t.k} href={`#${t.k}`} className="group flex flex-col rounded-[22px] bg-white p-7 no-underline ring-1 ring-[#31465A]/10 transition-all hover:-translate-y-1 hover:shadow-[0_24px_50px_-22px_rgba(49,70,90,0.3)]">
              <ProductTile k={t.k} size={48} />
              <p className="mt-5 text-[12px] font-bold uppercase tracking-[0.12em]" style={{ color: P[t.k].c }}>{P[t.k].name}</p>
              <h3 className="mt-2 font-[var(--font-display)] text-[21px] font-bold leading-snug text-[#31465A]">{t.title}</h3>
              <p className="mt-3 flex-1 text-[14.5px] leading-[1.65] text-[#64748B]">{t.body}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-[14px] font-semibold" style={{ color: P[t.k].c }}>
                See {P[t.k].name} <span className="transition-transform group-hover:translate-x-1"><Ic n="arrow" size={15} /></span>
              </span>
            </a>
          ))}
        </div>
      </Wrap>
    </section>
  );
}

/* ------------------------------------------------------------------ product screens */
function CampaignScreen() {
  const c = P.campaigns;
  return (
    <div className={`${CARD} p-5`}>
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-bold text-[#31465A]">New campaign</p>
        <span className="rounded-full px-2.5 py-1 text-[11px] font-semibold" style={{ background: c.tint, color: c.deep }}>Draft</span>
      </div>
      <div className="mt-4 grid gap-3 text-[12.5px]">
        {[["Name", "Seasonal flu vaccination"], ["Audience", "Adult patients · last visit within 12 months"], ["Send", "Thu, Oct 30 · 9:00 AM"]].map(([k, v]) => (
          <div key={k} className="flex items-center justify-between gap-4 border-b border-[#F0F1F6] pb-2.5">
            <span className="text-[#64748B]">{k}</span><span className="text-right font-semibold text-[#31465A]">{v}</span>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <span className="text-[#64748B]">Channel</span>
          {["Email", "SMS"].map((x, i) => <span key={x} className="rounded-full px-2.5 py-1 text-[11px] font-semibold" style={i === 0 ? { background: c.c, color: "#fff" } : { background: c.tint, color: c.deep }}>{x}</span>)}
        </div>
      </div>
      <div className="mt-4 rounded-xl p-4" style={{ background: "#FAF7FF" }}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: c.c }}>Preview</p>
        <p className="mt-1.5 text-[14px] font-bold text-[#31465A]">Flu vaccinations are now available</p>
        <p className="mt-1 text-[12px] leading-[1.6] text-[#64748B]">Book a short appointment at any of our clinics this month. Walk-in slots on Saturdays.</p>
        <span className="mt-3 inline-block rounded-full px-3.5 py-1.5 text-[11.5px] font-semibold text-white" style={{ background: c.c }}>Book a slot</span>
      </div>
    </div>
  );
}
function SurveyScreen() {
  const c = P.surveys;
  const bars: [string, number][] = [["5", 62], ["4", 24], ["3", 8], ["2", 4], ["1", 2]];
  return (
    <div className={`${CARD} p-5`}>
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-bold text-[#31465A]">Post-visit feedback</p>
        <span className="text-[11.5px] text-[#64748B]">Last 30 days · 186 responses</span>
      </div>
      <div className="mt-4 grid grid-cols-[96px_1fr] items-center gap-5">
        <div className="text-center">
          <p className="font-[var(--font-display)] text-[38px] font-extrabold leading-none text-[#31465A]">4.6</p>
          <div className="mt-2 flex justify-center gap-0.5">{[0, 1, 2, 3, 4].map((i) => <Ic key={i} n="star" size={13} fill={i < 4 ? "#F59E0B" : "none"} stroke="#F59E0B" w={1.6} />)}</div>
        </div>
        <div className="grid gap-1.5">
          {bars.map(([s, v]) => (
            <div key={s} className="flex items-center gap-2 text-[11px] text-[#64748B]">
              <span className="w-3">{s}</span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-[#EEF2F4]"><i className="block h-full rounded-full" style={{ width: `${v}%`, background: c.c }} /></span>
              <span className="w-8 text-right">{v}%</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 grid gap-2">
        <div className="rounded-xl bg-[#F6FBFA] px-3.5 py-2.5 text-[12px] text-[#31465A]">“The doctor explained the treatment plan clearly.”</div>
        <div className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-[12px]" style={{ background: "#FFF7ED" }}>
          <span className="font-semibold text-[#9A3412]">Recurring theme: waiting time at reception</span>
          <span className="text-[#9A3412]">14 mentions</span>
        </div>
      </div>
    </div>
  );
}
function LoyaltyScreen() {
  const c = P.loyalty;
  return (
    <div className={`${CARD} p-5`}>
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full text-[13px] font-bold" style={{ background: c.tint, color: c.deep }}>AS</span>
        <div className="leading-tight">
          <p className="text-[14px] font-bold text-[#31465A]">Anita Sharma</p>
          <p className="text-[12px] text-[#64748B]">Returning patient · 6 visits</p>
        </div>
        <span className="ml-auto rounded-full px-2.5 py-1 text-[11px] font-semibold text-white" style={{ background: c.c }}>Member</span>
      </div>
      <div className="mt-5">
        <div className="flex justify-between text-[12px]"><span className="font-semibold text-[#31465A]">Progress to next benefit</span><span className="text-[#64748B]">6 of 8 visits</span></div>
        <div className="mt-2 h-2 overflow-hidden rounded-full" style={{ background: c.tint }}><i className="block h-full w-[75%] rounded-full" style={{ background: c.c }} /></div>
      </div>
      <p className="mt-5 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-[#64748B]">Available benefits</p>
      <div className="mt-2 grid gap-2">
        {[["Priority booking for follow-up visits", "Active"], ["Annual wellness check offer", "Eligible"], ["Family member referral reward", "On request"]].map(([t, s]) => (
          <div key={t} className="flex items-center justify-between rounded-xl bg-[#FCFAFB] px-3.5 py-2.5 text-[12.5px] ring-1 ring-[#F3E3EC]">
            <span className="text-[#31465A]">{t}</span><span className="font-semibold" style={{ color: c.c }}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ chapters */
type Chapter = { k: Key; label: string; title: string; body: string[]; listTitle: string; list: string[]; screen: ReactNode };
const CHAPTERS: Chapter[] = [
  {
    k: "campaigns", label: "Patient communication", title: "Make practice communication more relevant.",
    body: ["Keep patients informed about your practice, services, and updates with communications suited to your intended audience. EVOQ Campaigns supports outreach to existing patients and prospective audiences, helping practices communicate beyond the consultation room."],
    listTitle: "Communication use cases",
    list: ["Share practice news and service announcements.", "Communicate educational and awareness information.", "Tailor campaigns to relevant patient groups, where supported.", "Promote appropriate services and practice initiatives."],
    screen: <CampaignScreen />,
  },
  {
    k: "surveys", label: "Patient feedback", title: "Understand the experience from the patient's perspective.",
    body: ["Patient feedback can help reveal what is working well and where the experience needs attention. EVOQ Surveys gives practices a way to collect responses, understand patient perceptions, and use that feedback to inform service improvements."],
    listTitle: "Feedback use cases",
    list: ["Collect patient satisfaction feedback.", "Ask patients about their consultation or treatment experience.", "Identify recurring concerns and areas for improvement.", "Gather input to guide service decisions."],
    screen: <SurveyScreen />,
  },
  {
    k: "loyalty", label: "Patient retention", title: "Give lasting patient relationships the attention they deserve.",
    body: [
      "Many patient relationships continue across multiple appointments, treatments, and stages of care. Loyalty initiatives can recognize that continued relationship and give patients additional reasons to stay engaged with your practice.",
      "EVOQ Loyalty supports patient retention initiatives that encourage ongoing participation and help practices recognize returning patients.",
    ],
    listTitle: "Retention use cases",
    list: ["Introduce patient loyalty initiatives.", "Support rewards or membership programs where available.", "Offer benefits to eligible returning patients, where supported.", "Encourage continued participation in practice programs."],
    screen: <LoyaltyScreen />,
  },
];
function Chapters() {
  return (
    <>
      {CHAPTERS.map((ch, i) => {
        const p = P[ch.k];
        const flip = i % 2 === 1;
        return (
          <section key={ch.k} id={ch.k} className="relative scroll-mt-24 overflow-hidden" style={{ background: i % 2 === 0 ? "#F7F9FB" : "#FFFFFF" }}>
            <div className="pointer-events-none absolute h-[420px] w-[420px] rounded-full blur-3xl" style={{ background: p.tint, opacity: 0.7, top: -120, [flip ? "left" : "right"]: -140 }} />
            <Wrap className={`relative grid items-center gap-12 py-20 lg:grid-cols-2 lg:gap-16 lg:py-24`}>
              <div className={flip ? "lg:order-2" : ""}>
                <div className="flex items-center gap-3">
                  <ProductTile k={ch.k} size={44} />
                  <span className="font-[var(--font-display)] text-[20px] font-bold" style={{ color: p.deep }}>{p.name}</span>
                </div>
                <div className="mt-6"><Eyebrow c={p.c}>{ch.label}</Eyebrow></div>
                <h2 className={`mt-3 ${H2}`}>{ch.title}</h2>
                {ch.body.map((b) => <p key={b.slice(0, 20)} className="mt-5 text-[16px] leading-[1.75] text-[#64748B]">{b}</p>)}
                <p className="mt-7 text-[13px] font-bold uppercase tracking-[0.12em] text-[#31465A]">{ch.listTitle}</p>
                <ul className="mt-3 grid gap-2.5">
                  {ch.list.map((li) => (
                    <li key={li} className="flex items-start gap-3 text-[15px] leading-[1.6] text-[#31465A]">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: p.tint, color: p.c }}><Ic n="check" size={12} w={2.6} /></span>
                      {li}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`mx-auto w-full max-w-[520px] ${flip ? "lg:order-1" : ""}`} aria-hidden="true">{ch.screen}</div>
            </Wrap>
          </section>
        );
      })}
    </>
  );
}

/* ------------------------------------------------------------------ ecosystem */
const ECO: { title: string; body: string; href?: string; current?: boolean; tile: string; ink: string; d: string }[] = [
  { title: "Patient Relationships", body: "Manage patient enquiries, relationship history, and follow-ups.", href: "/solutions/healthcare/patient-relationships", tile: "bg-[#E8F1FA]", ink: BLUE, d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" },
  { title: "Practice Management", body: "Coordinate appointments, visits, providers, and daily practice activity.", href: "/solutions/healthcare/practice-management", tile: "bg-[#E5F8FB]", ink: "#0E8FA5", d: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM9 16l2 2 4-4" },
  { title: "Patient Access & Payments", body: "Support appointment booking and billing-related processes.", tile: "bg-[#EAEFF3]", ink: NAVY, d: "M2 7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zM2 10h20M6 15h4" },
  { title: "Patient Engagement", body: "Use Campaigns, Surveys, and Loyalty to support communication, feedback, and retention.", current: true, tile: "bg-[#F3E8FF]", ink: P.campaigns.c, d: "M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 22l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" },
];
function Ecosystem() {
  return (
    <section className="bg-white">
      <Wrap className="py-20 lg:py-24">
        <div className="max-w-[760px]">
          <Eyebrow>Part of the wider EVOQ healthcare ecosystem</Eyebrow>
          <h2 className={`mt-4 ${H2}`}>Support more of the patient journey.</h2>
          <p className="mt-5 text-[16.5px] leading-[1.7] text-[#64748B]">
            Patient engagement is one part of practice operations. EVOQ healthcare products address different needs across patient relationships, daily practice activity, access, payments, and ongoing communication.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ECO.map((e) => {
            const inner = (
              <>
                <span className={`flex h-11 w-11 items-center justify-center rounded-[13px] ${e.tile}`} style={{ color: e.ink }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={e.d} /></svg>
                </span>
                <h3 className="mt-5 font-[var(--font-display)] text-[19px] font-bold leading-snug text-[#31465A]">{e.title}</h3>
                <p className="mt-2.5 flex-1 text-[14px] leading-[1.65] text-[#64748B]">{e.body}</p>
                {e.current && <span className="mt-4 inline-flex w-fit rounded-full px-3 py-1 text-[11.5px] font-semibold" style={{ background: P.campaigns.tint, color: P.campaigns.deep }}>You are here</span>}
                {e.href && <span className="mt-4 inline-flex items-center gap-2 text-[14px] font-semibold" style={{ color: e.ink }}>Explore {e.title} <span className="transition-transform group-hover:translate-x-1"><Ic n="arrow" size={15} /></span></span>}
              </>
            );
            const cls = "group flex flex-col rounded-[22px] bg-white p-6 no-underline ring-1 ring-[#31465A]/10";
            return e.href
              ? <a key={e.title} href={e.href} className={`${cls} transition-all hover:-translate-y-1 hover:shadow-[0_24px_50px_-22px_rgba(49,70,90,0.3)]`}>{inner}</a>
              : <div key={e.title} className={cls} style={e.current ? { boxShadow: `inset 0 0 0 1.5px ${P.campaigns.c}` } : undefined}>{inner}</div>;
          })}
        </div>
      </Wrap>
    </section>
  );
}

/* ------------------------------------------------------------------ CTA */
function Cta() {
  return (
    <section id="expert" className="bg-white">
      <Wrap className="pb-16 pt-2 lg:pb-24">
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#3D1E5C] via-[#2064B6] to-[#18B8D1] px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
          <div className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full border border-white/15" />
          <div className="pointer-events-none absolute -right-4 top-6 h-[260px] w-[260px] rounded-full border border-white/15" />
          <div className="relative max-w-[720px]">
            <h2 className="font-[var(--font-display)] text-[34px] font-extrabold leading-[1.08] tracking-[-0.02em] text-white sm:text-[38px]">Patient engagement that continues beyond the appointment.</h2>
            <p className="mt-6 text-[16px] leading-[1.65] text-white/85">Maintain patient relationships through relevant communication, meaningful feedback, and ongoing engagement.</p>
            <p className="mt-3 text-[16px] leading-[1.65] text-white/85">EVOQ Patient Engagement brings Campaigns, Surveys, and Loyalty together to support these activities across the patient journey.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#" data-enquiry="" className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-[14.5px] font-semibold text-[#2064B6] no-underline shadow-[0_14px_30px_-14px_rgba(0,0,0,0.4)] transition-all hover:-translate-y-px">Talk to an expert <Ic n="arrow" size={15} /></a>
              <a href="/solutions/healthcare" className="inline-flex items-center gap-3 rounded-full border border-white/50 px-6 py-3.5 text-[14.5px] font-semibold text-white no-underline transition-all hover:-translate-y-px hover:bg-white/10">Explore healthcare solutions <Ic n="arrow" size={15} /></a>
            </div>
          </div>
        </div>
      </Wrap>
    </section>
  );
}

export function HealthcarePePage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--white)" }}>
      <EnquiryModal eyebrow="EVOQ Patient Engagement" segments={["Clinics and practices", "Dental", "Aesthetics and wellness", "Hospitals", "Diagnostics", "Multi-location groups", "Other healthcare"]} segmentLabel="Type of organization" placeholder="Tell us how you communicate with patients and collect feedback today..." accent={NAVY} accentSoft={BLUE} />
      <HeroShell bg={{ background: "linear-gradient(115deg,#F1ECFD 0%,#F5F8FC 38%,#FFFFFF 58%,#E8F7F5 100%)" }} topbar={<Topbar darkCTA={false} light ctaColor={TEAL} />}>
        <PeNav />
        <Hero />
      </HeroShell>
      <Intro />
      <Chapters />
      <Ecosystem />
      <Cta />
      <Footer background={TEAL} />
    </div>
  );
}
