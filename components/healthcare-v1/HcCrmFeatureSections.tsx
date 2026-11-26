"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ---------- shared style tokens ---------- */

const WRAP = "px-5 sm:px-6 lg:px-6";
const INNER = "mx-auto max-w-[1300px]";
const H2 = "font-[var(--font-display)] text-[32px] font-extrabold leading-[1.12] tracking-[-0.02em] text-[#102A43] sm:text-[36px]";
const LEAD = "mt-4 max-w-[600px] text-[15.5px] leading-[1.65] text-[#31465A]/75";
const EYEBROW = "text-[12.5px] font-bold uppercase tracking-[0.26em] text-[#0F9488]";

/* ---------- icons ---------- */

const ICONS = {
  user: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
  users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  usercheck: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM16 11l2 2 4-4",
  userplus: "M15 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M8.5 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM20 8v6M23 11h-6",
  note: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M9 13h6M9 17h4",
  sliders: "M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6",
  mail: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  share: "M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8.6 13.5l6.8-3.9M8.6 16.5l6.8 3.9",
  cal: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  tag: "M12.6 2H4a2 2 0 0 0-2 2v8.6a2 2 0 0 0 .6 1.4l9 9a2 2 0 0 0 2.8 0l7.6-7.6a2 2 0 0 0 0-2.8l-9-9a2 2 0 0 0-1.4-.6z",
  refresh: "M21 12a9 9 0 0 0-15-6.7L3 8M3 3v5h5M3 12a9 9 0 0 0 15 6.7L21 16M21 21v-5h-5",
  check: "M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",
  bell: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0",
  calx: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM9.5 14.5l5 5M14.5 14.5l-5 5",
  pulse: "M22 12h-4l-3 9L9 3l-3 9H2",
  clock: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2",
  chat: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  phone: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z",
  timeline: "M4 6h4M4 12h4M4 18h4M12 6h8M12 12h8M12 18h8",
  history: "M3 3v5h5M3.05 13A9 9 0 1 0 6 5.3L3 8M12 7v5l3 2",
  funnel: "M22 3H2l8 9.5V19l4 2v-8.5z",
  columns: "M3 4h7v16H3zM14 4h7v10h-7z",
  layers: "m12 3 9 5-9 5-9-5 9-5zM3 13l9 5 9-5",
  trending: "M23 6l-9.5 9.5-5-5L1 18M17 6h6v6",
  chart: "M3 3v18h18M7 15l4-5 3 3 5-7",
  pie: "M21.2 15a9 9 0 1 1-9.2-13v9z",
  target: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2z",
  route: "M9 3H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM19 15h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2zM11 7h6a2 2 0 0 1 2 2v4M9 17H7a2 2 0 0 1-2-2v-4",
  megaphone: "m3 11 18-5v12L3 14v-3zM11.6 16.8a3 3 0 1 1-5.8-1.6",
  zap: "M13 2 3 14h7l-1 8 10-12h-7z",
  key: "M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4",
  file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6",
  code: "m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16",
} as const;
type IconName = keyof typeof ICONS;

function Ic({ n, size = 20, stroke = "#0F766E" }: { n: IconName; size?: number; stroke?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={ICONS[n]} />
    </svg>
  );
}

const ArrowRight = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* ---------- feature data ---------- */

type Feature = { icon: IconName; title: string; desc: string; tile: string; stroke: string };

type CrmSection = {
  key: string;
  eyebrow: string;
  title: string;
  intro: string;
  photo: string;
  alt: string;
  pos: string;
  features: Feature[];
};

const SECTIONS: CrmSection[] = [
  {
    key: "patient-record",
    eyebrow: "Patient record & history",
    title: "Know the patient beyond the enquiry.",
    intro: "Keep the information your team needs to understand the patient in one place. Build a clear patient view without turning your CRM into a clinical records system.",
    photo: "/healthcare/pm/stock-patient.jpg",
    alt: "Doctor reviewing a patient record with a patient",
    pos: "60% 28%",
    features: [
      { icon: "user", title: "Patient profiles", desc: "Keep essential patient and contact information organized and accessible.", tile: "bg-[#DDF5F0]", stroke: "#0F766E" },
      { icon: "note", title: "Notes and preferences", desc: "Capture notes, preferences and relationship details for more informed conversations.", tile: "bg-[#F3E8FF]", stroke: "#7C3AED" },
      { icon: "users", title: "Family and relationships", desc: "Connect related patients and family relationships where needed.", tile: "bg-[#DDF5F0]", stroke: "#0F766E" },
      { icon: "sliders", title: "Custom fields", desc: "Capture the information that matters to your organization with configurable fields.", tile: "bg-[#EEF6FF]", stroke: "#1777F0" },
      { icon: "timeline", title: "Interaction timeline", desc: "See the sequence of activities and interactions on the patient's record.", tile: "bg-[#EEF6FF]", stroke: "#1777F0" },
      { icon: "chat", title: "Communication history", desc: "Keep calls, messages and other interactions with the patient they belong to.", tile: "bg-[#F3E8FF]", stroke: "#7C3AED" },
    ],
  },
  {
    key: "enquiries",
    eyebrow: "Enquiries & referrals",
    title: "Turn enquiries into a clear next step.",
    intro: "Capture enquiries from different sources, see what patients are interested in, and give your team one way to manage new patients.",
    photo: "/healthcare/pm/stock-frontdesk.jpg",
    alt: "Front desk team welcoming a patient",
    pos: "62% 45%",
    features: [
      { icon: "mail", title: "Enquiry management", desc: "Capture, organize, assign and track patient enquiries.", tile: "bg-[#EEF6FF]", stroke: "#1777F0" },
      { icon: "share", title: "Source tracking", desc: "See where new patients and enquiries are coming from.", tile: "bg-[#FDEAF3]", stroke: "#C2477F" },
      { icon: "users", title: "Referral management", desc: "Track referred patients and the relationships behind those referrals.", tile: "bg-[#F3E8FF]", stroke: "#7C3AED" },
      { icon: "tag", title: "Treatment and service interest", desc: "Record the treatments, procedures, services or packages a patient asked about.", tile: "bg-[#FEF3DC]", stroke: "#B7791F" },
      { icon: "usercheck", title: "Assignment and ownership", desc: "Route enquiries to the right team member and keep ownership clear.", tile: "bg-[#EEF6FF]", stroke: "#1777F0" },
      { icon: "funnel", title: "Pipeline and conversion", desc: "Track enquiries through stages you define, and see how they progress toward appointments.", tile: "bg-[#DDF5F0]", stroke: "#0F766E" },
    ],
  },
  {
    key: "followups",
    eyebrow: "Follow ups & activities",
    title: "Keep follow ups on track.",
    intro: "Keep important conversations from getting lost between calls, appointments, messages and busy days.",
    photo: "/healthcare/stock/hc-card-crm-2.jpg",
    alt: "Doctor talking with an older patient at a desk",
    pos: "50% 18%",
    features: [
      { icon: "refresh", title: "Follow up management", desc: "Plan and manage the next action for a patient.", tile: "bg-[#DDF5F0]", stroke: "#0F766E" },
      { icon: "check", title: "Tasks and activities", desc: "Create, assign and track activities across your team.", tile: "bg-[#EEF6FF]", stroke: "#1777F0" },
      { icon: "bell", title: "Reminders", desc: "Give your team timely reminders for important patient follow ups.", tile: "bg-[#FEF3DC]", stroke: "#B7791F" },
      { icon: "calx", title: "Missed appointment follow up", desc: "Keep patients who miss appointments from being overlooked.", tile: "bg-[#FDEAF3]", stroke: "#C2477F" },
      { icon: "pulse", title: "Treatment follow up", desc: "Stay in touch with patients after consultations, treatments or services.", tile: "bg-[#F3E8FF]", stroke: "#7C3AED" },
      { icon: "clock", title: "Recalls", desc: "Bring patients back into focus when another interaction is due.", tile: "bg-[#DDF5F0]", stroke: "#0F766E" },
    ],
  },
  {
    key: "engagement",
    eyebrow: "Staying in touch",
    title: "Stay connected between visits.",
    intro: "Understand patient status and activity so your team can find opportunities to reconnect.",
    photo: "/healthcare/stock/hc-card-pe.jpg",
    alt: "Patient checking her phone",
    pos: "60% 32%",
    features: [
      { icon: "pie", title: "Patient segmentation", desc: "Group patients by the characteristics and details that matter to your organization.", tile: "bg-[#F3E8FF]", stroke: "#7C3AED" },
      { icon: "trending", title: "Patient status", desc: "Keep track of where patients are in their relationship with your organization.", tile: "bg-[#EEF6FF]", stroke: "#1777F0" },
      { icon: "userplus", title: "New patient tracking", desc: "See new patient acquisition and the sources behind it.", tile: "bg-[#DDF5F0]", stroke: "#0F766E" },
      { icon: "refresh", title: "Returning patients", desc: "Identify and manage the relationships with returning patients.", tile: "bg-[#FEF3DC]", stroke: "#B7791F" },
      { icon: "megaphone", title: "Re-engagement", desc: "Bring inactive or previously engaged patients back into the conversation.", tile: "bg-[#FDEAF3]", stroke: "#C2477F" },
      { icon: "share", title: "Referral and recommendation tracking", desc: "See the referrals and recommendations that patients generate.", tile: "bg-[#DDF5F0]", stroke: "#0F766E" },
    ],
  },
  {
    key: "automation",
    eyebrow: "Automation",
    title: "Make routine follow up easier.",
    intro: "Automate repeatable CRM activities so your team spends less time on admin and more time responding to patients.",
    photo: "/healthcare/stock/org-team.jpg",
    alt: "Doctor and nurse reviewing a patient record together",
    pos: "50% 30%",
    features: [
      { icon: "zap", title: "Workflow automation", desc: "Automate routine actions based on defined conditions and processes.", tile: "bg-[#EEF6FF]", stroke: "#1777F0" },
      { icon: "bell", title: "Follow up automation", desc: "Trigger follow up activities when specific actions or stages are reached.", tile: "bg-[#DDF5F0]", stroke: "#0F766E" },
      { icon: "check", title: "Task automation", desc: "Create recurring or rule-based tasks without manual entry.", tile: "bg-[#F3E8FF]", stroke: "#7C3AED" },
      { icon: "bell", title: "Notifications", desc: "Tell your team when an action or follow up needs attention.", tile: "bg-[#FEF3DC]", stroke: "#B7791F" },
      { icon: "chat", title: "Personalized communication", desc: "Use information held in the CRM to support more relevant patient communication.", tile: "bg-[#FDEAF3]", stroke: "#C2477F" },
    ],
  },
  {
    key: "insights",
    eyebrow: "Insights & reporting",
    title: "See what is happening across your patient relationships.",
    intro: "Turn CRM activity into practical insight: where enquiries originate, how teams are following up, and how patient relationships are developing over time.",
    photo: "/healthcare/stock/pm-insights.jpg",
    alt: "A person reviewing a chart on a laptop",
    pos: "50% 50%",
    features: [
      { icon: "chart", title: "CRM dashboard", desc: "Get a clear view of relationship activity and key CRM metrics.", tile: "bg-[#DDF5F0]", stroke: "#0F766E" },
      { icon: "trending", title: "Patient relationship analytics", desc: "Understand activity and trends across patient relationships.", tile: "bg-[#EEF6FF]", stroke: "#1777F0" },
      { icon: "pie", title: "Enquiry source analytics", desc: "See which sources are generating enquiries.", tile: "bg-[#F3E8FF]", stroke: "#7C3AED" },
      { icon: "target", title: "Follow up performance", desc: "Track follow up activity and team performance.", tile: "bg-[#FEF3DC]", stroke: "#B7791F" },
      { icon: "refresh", title: "Retention and re-engagement reports", desc: "Understand returning and re-engaged patient relationships.", tile: "bg-[#FDEAF3]", stroke: "#C2477F" },
      { icon: "funnel", title: "Pipeline reporting", desc: "Monitor enquiry volume, stages and conversion activity.", tile: "bg-[#DDF5F0]", stroke: "#0F766E" },
    ],
  },
];

const STEP_VH = 78;

/* ============================================================
   Scroll listing: eyebrow list on the left, photo + feature
   listing (which changes as you scroll) on the right. The
   photo is never covered by text — the listing sits below it.
   ============================================================ */

export function HcCrmFeaturesScroll() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;

    function measure() {
      raf = 0;
      const el = wrapRef.current;
      if (!el) return;
      const vh = window.innerHeight;
      const rect = el.getBoundingClientRect();
      const total = rect.height - vh;
      if (total <= 0) {
        setActive(0);
        return;
      }
      const progress = Math.min(1, Math.max(0, -rect.top / total));
      const idx = Math.min(SECTIONS.length - 1, Math.floor(progress * SECTIONS.length));
      setActive(idx);
    }

    function onScroll() {
      if (!raf) raf = requestAnimationFrame(measure);
    }

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  function goTo(i: number) {
    const el = wrapRef.current;
    if (!el) return;
    const vh = window.innerHeight;
    const rect = el.getBoundingClientRect();
    const total = rect.height - vh;
    const targetY = window.scrollY + rect.top + (i / SECTIONS.length) * total + 4;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  }

  const s = SECTIONS[active];

  return (
    <section className="bg-white">
      <div className={WRAP}>
        <div className={INNER}>
          <div ref={wrapRef} className="relative" style={{ height: `${SECTIONS.length * STEP_VH}vh` }}>
            <div className="sticky top-24 py-4 lg:top-28">
              <div className="grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-16">
                {/* left: feature index with progress rail */}
                <div className="hidden lg:block">
                  <div className="flex items-center justify-between">
                    <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#31465A]/45">CRM features</p>
                    <p className="text-[12px] font-semibold tabular-nums text-[#31465A]/45">
                      <span className="text-[#0F766E]">{String(active + 1).padStart(2, "0")}</span>
                      {" / "}
                      {String(SECTIONS.length).padStart(2, "0")}
                    </p>
                  </div>
                  <ul className="mt-5 flex flex-col border-l-2 border-[#31465A]/10">
                    {SECTIONS.map((sec, i) => (
                      <li key={sec.key}>
                        <button
                          type="button"
                          onClick={() => goTo(i)}
                          aria-current={i === active ? "true" : undefined}
                          className={`-ml-[2px] flex w-full cursor-pointer items-baseline gap-3.5 border-l-2 py-3 pl-5 pr-3 text-left transition-all duration-300 ${
                            i === active
                              ? "border-[#0F766E] bg-gradient-to-r from-[#0F766E]/8 to-transparent"
                              : "border-transparent hover:bg-[#31465A]/[0.03]"
                          }`}
                        >
                          <span
                            className={`w-5 shrink-0 text-[12px] font-bold tabular-nums transition-colors duration-300 ${
                              i === active ? "text-[#0F766E]" : "text-[#31465A]/35"
                            }`}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={`text-[15px] font-semibold leading-[1.35] transition-colors duration-300 ${
                              i === active ? "text-[#102A43]" : "text-[#31465A]/55 hover:text-[#102A43]"
                            }`}
                          >
                            {sec.eyebrow}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* mobile: current eyebrow only */}
                <p className={`${EYEBROW} lg:hidden`}>{s.eyebrow}</p>

                {/* right: photo (unobstructed) + listing below it */}
                <div>
                  <div className="relative h-[240px] w-full overflow-hidden rounded-[24px] shadow-[0_30px_60px_-28px_rgba(16,42,67,0.4)] sm:h-[320px]">
                    <Image
                      key={s.photo}
                      src={s.photo}
                      alt={s.alt}
                      fill
                      sizes="(min-width: 1024px) 940px, 100vw"
                      quality={90}
                      className="object-cover"
                      style={{ objectPosition: s.pos }}
                      priority={active === 0}
                    />
                    <span className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/92 text-[13px] font-extrabold text-[#0F766E] shadow-[0_8px_18px_-8px_rgba(16,42,67,0.4)] backdrop-blur">
                      {String(active + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h2 className={`mt-7 ${H2}`}>{s.title}</h2>
                  <p className={LEAD}>{s.intro}</p>

                  <div className="mt-7 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                    {s.features.map((f) => (
                      <div key={f.title} className="flex items-start gap-3">
                        <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${f.tile}`}>
                          <Ic n={f.icon} size={15} stroke={f.stroke} />
                        </span>
                        <p className="text-[13.5px] leading-[1.5] text-[#31465A]/75">
                          <span className="font-bold text-[#102A43]">{f.title}</span>
                          <br />
                          {f.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Integrations
   ============================================================ */

const INTEGRATIONS = [
  { icon: "cal" as IconName, tile: "bg-[#DDF5F0]", stroke: "#0F766E", title: "EVOQ Practice Management", desc: "Connect patient relationships with providers, schedules, services, appointments, and operational workflows.", href: "/solutions/healthcare/practice-management" },
  { icon: "check", tile: "bg-[#EEF6FF]", stroke: "#1777F0", title: "Bookings", desc: "Connect enquiries and patient relationships with online appointment booking.", href: "#" },
  { icon: "file", tile: "bg-[#FEF3DC]", stroke: "#B7791F", title: "Billing", desc: "Connect patient relationships with invoices, payments, and outstanding balances.", href: "#" },
  { icon: "megaphone", tile: "bg-[#FDEAF3]", stroke: "#C2477F", title: "Campaigns", desc: "Use CRM context to support targeted patient campaigns and outreach.", href: "#" },
  { icon: "note", tile: "bg-[#F3E8FF]", stroke: "#7C3AED", title: "Surveys", desc: "Connect patient feedback with the broader relationship history.", href: "#" },
  { icon: "trending", tile: "bg-[#DDF5F0]", stroke: "#0F766E", title: "Loyalty", desc: "Connect loyalty activity with patient relationships and returning patients.", href: "#" },
  { icon: "code", tile: "bg-[#EEF6FF]", stroke: "#1777F0", title: "Healthcare systems and integrations", desc: "Connect EVOQ with healthcare and business systems through supported integrations and APIs.", href: "#" },
] as const;

export function HcCrmFeaturesIntegrations() {
  return (
    <section className="bg-white">
      <div className={WRAP}>
        <div className={`${INNER} py-16 lg:py-24`}>
          <div className="max-w-[600px]">
            <p className={EYEBROW}>Integrations</p>
            <h2 className={`mt-4 ${H2}`}>Keep patient relationships connected across the journey.</h2>
            <p className={LEAD}>
              EVOQ CRM works alongside the products and systems that manage other parts of your practice.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {INTEGRATIONS.map((it) => (
              <Link
                key={it.title}
                href={it.href}
                className="group flex flex-col rounded-[20px] bg-white p-6 no-underline shadow-[0_18px_44px_-30px_rgba(16,42,67,0.3)] ring-1 ring-[#102A43]/6 transition-all hover:-translate-y-1 hover:shadow-[0_24px_52px_-28px_rgba(16,42,67,0.36)]"
              >
                <span className={`flex h-12 w-12 items-center justify-center rounded-full ${it.tile}`}>
                  <Ic n={it.icon as IconName} size={22} stroke={it.stroke} />
                </span>
                <p className="mt-4 text-[16px] font-bold leading-[1.3] text-[#102A43]">{it.title}</p>
                <p className="mt-2 flex-1 text-[13.5px] leading-[1.6] text-[#31465A]/70">{it.desc}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-[#0F766E]">
                  Learn more
                  <ArrowRight size={13} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Configuration
   ============================================================ */

const CONFIGURATION = [
  { icon: "sliders" as IconName, tile: "bg-[#DDF5F0]", stroke: "#0F766E", title: "Configurable fields", desc: "Capture information specific to your organization." },
  { icon: "key", tile: "bg-[#EEF6FF]", stroke: "#1777F0", title: "Role-based access control", desc: "Control access according to team roles and responsibilities." },
  { icon: "route", tile: "bg-[#F3E8FF]", stroke: "#7C3AED", title: "Workflow configuration", desc: "Adapt CRM processes to your patient journey." },
  { icon: "chart", tile: "bg-[#FEF3DC]", stroke: "#B7791F", title: "Reports & dashboards", desc: "Create visibility around the information your teams need to monitor." },
  { icon: "code", tile: "bg-[#FDEAF3]", stroke: "#C2477F", title: "API access", desc: "Extend the CRM through supported APIs and integrations on eligible plans." },
  { icon: "file", tile: "bg-[#DDF5F0]", stroke: "#0F766E", title: "File & document management", desc: "Keep relevant relationship documents organized alongside CRM information." },
] as const;

export function HcCrmFeaturesConfiguration() {
  return (
    <section className="bg-[#F8FAFB]">
      <div className={WRAP}>
        <div className={`${INNER} py-16 lg:py-24`}>
          <div className="max-w-[600px]">
            <p className={EYEBROW}>Configuration</p>
            <h2 className={`mt-4 ${H2}`}>Adapt records, stages and fields to your organization.</h2>
            <p className={LEAD}>
              Healthcare organizations differ in services, teams, patient journeys and ways of working.
              Configure the CRM around the information you capture, the stages you manage, and the activities your
              teams need to follow.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CONFIGURATION.map((c) => (
              <div key={c.title} className="flex flex-col rounded-[20px] bg-white p-6 shadow-[0_18px_44px_-30px_rgba(16,42,67,0.3)] ring-1 ring-[#102A43]/6">
                <span className={`flex h-12 w-12 items-center justify-center rounded-full ${c.tile}`}>
                  <Ic n={c.icon} size={22} stroke={c.stroke} />
                </span>
                <p className="mt-4 text-[16px] font-bold leading-[1.3] text-[#102A43]">{c.title}</p>
                <p className="mt-2 text-[13.5px] leading-[1.6] text-[#31465A]/70">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Final CTA
   ============================================================ */

export function HcCrmFeaturesCTA() {
  return (
    <section id="expert" className="isolate bg-white">
      <div className={WRAP}>
        <div className={`${INNER} pb-16 pt-6 lg:pb-24`}>
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0B5F58] via-[#0F766E] to-[#18B8D1] px-6 py-14 text-center sm:px-10 lg:px-16 lg:py-20">
            <div className="pointer-events-none absolute -right-24 -top-24 h-[380px] w-[380px] rounded-full border border-white/15" />
            <div className="pointer-events-none absolute -bottom-28 left-10 h-[300px] w-[300px] rounded-full bg-white/10 blur-3xl" />

            <div className="relative mx-auto max-w-[680px]">
              <h2 className="font-[var(--font-display)] text-[34px] font-extrabold leading-[1.1] tracking-[-0.025em] text-white sm:text-[42px]">
                Start with how your practice handles enquiries today.
              </h2>
              <p className="mx-auto mt-5 max-w-[560px] text-[16.5px] leading-[1.65] text-white/85">
                From the first enquiry to the next follow up, give your team the history and the next step on the
                patient's record.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
                <a
                  href="/solutions/healthcare/patient-relationships-v1#pricing"
                  className="inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3.5 text-[15px] font-semibold text-[#0F766E] no-underline shadow-[0_14px_30px_-14px_rgba(0,0,0,0.4)] transition-all hover:-translate-y-px hover:bg-[#F1F5F7]"
                >
                  Explore pricing
                  <ArrowRight />
                </a>
                <a
                  href="/solutions/healthcare/patient-relationships-v1#expert"
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/50 px-6 py-3.5 text-[15px] font-semibold text-white no-underline transition-all hover:-translate-y-px hover:bg-white/10"
                >
                  Talk to an expert
                  <ArrowRight />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
