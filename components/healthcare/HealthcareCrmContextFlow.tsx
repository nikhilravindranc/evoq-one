import Image from "next/image";
import { Caveat } from "next/font/google";

const script = Caveat({ subsets: ["latin"], weight: ["600"] });

const sv = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

type IP = { size?: number; stroke?: string };
const I = ({ size = 22, stroke = "#2064B6", children }: IP & { children: React.ReactNode }) => (
  <svg {...sv} width={size} height={size} stroke={stroke}>
    {children}
  </svg>
);

const UserIcon = (p: IP) => (
  <I {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
  </I>
);
const UsersIcon = (p: IP) => (
  <I {...p}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </I>
);
const StethIcon = (p: IP) => (
  <I {...p}>
    <path d="M6 3v6a4 4 0 0 0 8 0V3M10 13v2a5 5 0 0 0 10 0v-1" />
    <circle cx="20" cy="12" r="2" />
  </I>
);
const ChartUserIcon = (p: IP) => (
  <I {...p}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="10" r="3" />
    <path d="M6.5 18a6 6 0 0 1 11 0" />
  </I>
);
const ChatIcon = (p: IP) => (
  <I {...p}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <path d="M8 10h.01M12 10h.01M16 10h.01" />
  </I>
);
const CalIcon = (p: IP) => (
  <I {...p}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18M12 13v5M9.5 15.5h5" />
  </I>
);
const CalCheckIcon = (p: IP) => (
  <I {...p}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18M9 16l2 2 4-4" />
  </I>
);
const RefreshIcon = (p: IP) => (
  <I {...p}>
    <path d="M21 12a9 9 0 0 0-15-6.7L3 8M3 3v5h5M3 12a9 9 0 0 0 15 6.7L21 16M21 21v-5h-5" />
  </I>
);
const MailIcon = (p: IP) => (
  <I {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </I>
);
const NoteIcon = (p: IP) => (
  <I {...p}>
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <path d="m9 15 1-3 5-5 2 2-5 5z" />
  </I>
);
const HistoryIcon = (p: IP) => (
  <I {...p}>
    <path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 7v5l3 2" />
  </I>
);
const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const Chevron = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#31465A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const ROLES = [
  { icon: <UserIcon size={26} />, tile: "bg-[#E8F1FA]", title: "Front desk", desc: "See recent enquiries and appointment activity." },
  { icon: <UsersIcon size={26} stroke="#18B8D1" />, tile: "bg-[#E1F6F8]", title: "Patient relationship teams", desc: "Access full interaction history and next steps." },
  { icon: <StethIcon size={26} stroke="#18B8D1" />, tile: "bg-[#E1F6F8]", title: "Healthcare providers", desc: "Understand patient interests and previous consultations." },
  { icon: <ChartUserIcon size={26} stroke="#18B8D1" />, tile: "bg-[#E1F6F8]", title: "Managers", desc: "Get a complete view of patient relationships." },
];

const PROFILE_ROWS = [
  { icon: <HistoryIcon size={18} stroke="#2064B6" />, label: "Last visit", value: "Jan 14, 2025", pill: "Completed" },
  { icon: <CalCheckIcon size={18} stroke="#2064B6" />, label: "Next appointment", value: "Mar 3, 2025", pill: "Scheduled" },
  { icon: <MailIcon size={18} stroke="#2064B6" />, label: "Preferred contact", value: "Email" },
  { icon: <NoteIcon size={18} stroke="#2064B6" />, label: "Notes", value: "Interested in skin treatment" },
];

const STATS = [
  { value: "48", label: "New enquiries", delta: "12%", tile: "bg-[#EAF3FD]", icon: <UserIcon size={16} />, chip: "bg-[#DCEBFA]" },
  { value: "32", label: "In discussion", delta: "8%", tile: "bg-[#E7F7F5]", icon: <ChatIcon size={16} stroke="#18B8D1" />, chip: "bg-[#D5F1EE]" },
  { value: "24", label: "Appointment", delta: "20%", tile: "bg-[#FEF4E6]", icon: <CalIcon size={16} stroke="#D97706" />, chip: "bg-[#FCE7C8]" },
  { value: "18", label: "Ongoing", delta: "14%", tile: "bg-[#F1ECFB]", icon: <RefreshIcon size={16} stroke="#7C3AED" />, chip: "bg-[#E4DBF8]" },
];

const ENQUIRIES = [
  { img: "ava-b", name: "Ava Thompson", source: "Website", interest: "Skin treatment", status: "New", pill: "bg-[#E4EEFB] text-[#2064B6]", next: "Jan 16, 2025" },
  { img: "noah", name: "Noah Patel", source: "Referral", interest: "Hair restoration", status: "In discussion", pill: "bg-[#E1F6F3] text-[#3D9A92]", next: "Jan 18, 2025" },
  { img: "emma-b", name: "Emma Wilson", source: "Instagram", interest: "Laser treatment", status: "Appointment", pill: "bg-[#FEF0DC] text-[#D97706]", next: "Jan 20, 2025" },
  { img: "liam", name: "Liam Carter", source: "Phone", interest: "Wellness program", status: "Follow-up", pill: "bg-[#E8EDFB] text-[#3B5BDB]", next: "Jan 22, 2025" },
];

const TABLE_COLS = "grid-cols-[1.55fr_0.95fr_1.25fr_1.1fr_1.05fr]";

const SOURCES = [
  { label: "Website", pct: 42, color: "#2064B6" },
  { label: "Phone", pct: 24, color: "#18B8D1" },
  { label: "Referral", pct: 18, color: "#6DCCC3" },
  { label: "Social media", pct: 16, color: "#CFE8F7" },
];

function Donut() {
  const r = 44;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg width="112" height="112" viewBox="0 0 112 112" className="-rotate-90">
      {SOURCES.map((s) => {
        const len = (s.pct / 100) * c;
        const el = (
          <circle
            key={s.label}
            cx="56"
            cy="56"
            r={r}
            fill="none"
            stroke={s.color}
            strokeWidth="20"
            strokeDasharray={`${len} ${c - len}`}
            strokeDashoffset={-offset}
          />
        );
        offset += len;
        return el;
      })}
    </svg>
  );
}

function Script({ lines, className = "" }: { lines: string[]; className?: string }) {
  return (
    <div className={`pointer-events-none -rotate-[10deg] ${className}`}>
      <p className={`${script.className} text-[30px] leading-[1.02] text-[#18B8D1]`}>
        {lines.map((l, i) => (
          <span key={l} className="block" style={{ marginLeft: i * 10 }}>
            {l}
          </span>
        ))}
      </p>
      <svg width="130" height="12" viewBox="0 0 110 14" fill="none" className="mt-1">
        <path d="M2 11C30 6 70 3 108 2" stroke="#18B8D1" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}


const EYEBROW = "text-[12px] font-bold uppercase tracking-[0.28em] text-[#18A0B8]";
const H2 =
  "mt-4 font-[var(--font-display)] text-[38px] font-extrabold leading-[1.06] tracking-[-0.025em] text-[#102A43]";
const GRID = "relative grid gap-10 px-6 py-10 sm:px-10 xl:grid-cols-[42%_1fr] xl:gap-8 xl:px-14 xl:py-14";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-white">
      <div className="px-5 sm:px-6 lg:px-6">
        <div className="mx-auto max-w-[1300px] py-10 lg:py-16">
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-white via-[#F4F9FD] to-[#EAF6F7] ring-1 ring-[#31465A]/8">
            <div className="pointer-events-none absolute -right-24 -top-24 h-[300px] w-[300px] rounded-full bg-[#DCF3F4]/70 blur-2xl" />
            <div className="pointer-events-none absolute -left-20 bottom-0 h-[260px] w-[260px] rounded-full bg-[#DDF3F3]/70 blur-2xl" />
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- shared context ---------- */

export function HealthcareCrmSharedContext() {
  return (
    <Frame>
      <div className={GRID}>
        <div className="relative z-10">
          <p className={EYEBROW}>Shared context. Better care.</p>
          <h2 className={`${H2} max-w-[520px]`}>Give every team member the context they need.</h2>

          <div className="mt-6 max-w-[520px] text-[15.5px] leading-[1.6] text-[#31465A]/75">
            <p>Patients should not have to repeat their story every time they speak with someone new.</p>
            <p className="mt-4">
              With patient profiles, interaction history, communication records, notes, activities, and relationship
              details connected in one place, teams can understand the conversation before they respond.
            </p>
            <p className="mt-4">
              From front desk and patient relationship teams to managers and healthcare providers, everyone can work
              from the same relationship context.
            </p>
          </div>

          <a
            href="#features"
            className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#2064B6] px-7 py-3.5 text-[15.5px] font-semibold text-white no-underline shadow-[0_14px_30px_-14px_rgba(32,100,182,0.6)] transition-all hover:-translate-y-px hover:bg-[#1A559C]"
          >
            Explore patient management
            <ArrowRight />
          </a>
        </div>

        <div className="relative xl:min-h-[560px]">
          {/* doctor photo */}
          <div className="relative h-[340px] overflow-hidden rounded-2xl xl:absolute xl:right-0 xl:top-0 xl:h-[440px] xl:w-[430px] xl:rounded-none">
            <Image
              src="/healthcare/stock/crm-split-doctor.jpg"
              alt="Doctor reviewing a patient profile"
              fill
              sizes="(min-width: 1280px) 430px, 100vw"
              className="object-cover object-[50%_28%]"
              style={{
                maskImage: "linear-gradient(90deg, transparent 0%, #000 34%), linear-gradient(180deg, #000 72%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 34%), linear-gradient(180deg, #000 72%, transparent 100%)",
                maskComposite: "intersect",
                WebkitMaskComposite: "source-in",
              }}
            />
          </div>

          <Script lines={["Informed", "Teams", "Happier", "Patients"]} className="absolute left-[35%] top-[40px] hidden xl:block" />

          {/* roles */}
          <ul className="relative z-10 mt-8 grid gap-6 sm:grid-cols-2 xl:mt-0 xl:w-[250px] xl:grid-cols-1">
            {ROLES.map((r) => (
              <li key={r.title} className="flex items-start gap-4">
                <span className={`flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full ${r.tile}`}>{r.icon}</span>
                <span>
                  <span className="block text-[15px] font-bold leading-[1.25] text-[#102A43]">{r.title}</span>
                  <span className="mt-1 block text-[13.5px] leading-[1.45] text-[#31465A]/65">{r.desc}</span>
                </span>
              </li>
            ))}
          </ul>

          {/* patient profile card */}
          <div className="relative z-10 mt-8 rounded-[18px] bg-white p-4 shadow-[0_28px_60px_-28px_rgba(16,42,67,0.4)] ring-1 ring-[#31465A]/5 xl:absolute xl:bottom-0 xl:right-0 xl:mt-0 xl:w-[310px]">
            <div className="flex items-center gap-3">
              <Image src="/healthcare/avatars/olivia.jpg" alt="Olivia Bennett" width={44} height={44} className="h-11 w-11 rounded-full object-cover" />
              <div className="flex-1">
                <p className="text-[13.5px] font-bold text-[#102A43]">Olivia Bennett</p>
                <p className="text-[11.5px] text-[#31465A]/55">Patient &nbsp;·&nbsp; ID P-10483</p>
              </div>
              <span className="text-[16px] font-bold leading-none tracking-widest text-[#31465A]/45">···</span>
            </div>
            <div className="mt-3 flex gap-4 border-b border-[#31465A]/8 text-[11px]">
              {["Overview", "Interactions", "Notes", "Appointments"].map((t, i) => (
                <span key={t} className={`pb-2 font-medium ${i === 0 ? "border-b-2 border-[#2064B6] text-[#2064B6]" : "text-[#31465A]/55"}`}>
                  {t}
                </span>
              ))}
            </div>
            <ul className="mt-3 flex flex-col gap-2.5">
              {PROFILE_ROWS.map((row) => (
                <li key={row.label} className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center">{row.icon}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-medium text-[#102A43]">{row.label}</span>
                    <span className="block truncate text-[11px] text-[#31465A]/60">{row.value}</span>
                  </span>
                  {row.pill && (
                    <span className="rounded-md bg-[#E1F6F3] px-2.5 py-1 text-[10.5px] font-medium text-[#3D9A92]">{row.pill}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* ---------- enquiry to relationship ---------- */

export function HealthcareCrmEnquiryFlow() {
  return (
    <Frame>
      <div className={GRID}>
        <div className="relative z-10">
          <p className={EYEBROW}>Track. Follow up. Build relationships.</p>
          <h2 className={`${H2} max-w-[520px]`}>From enquiry to ongoing relationship.</h2>
          <div className="mt-6 max-w-[520px] text-[15.5px] leading-[1.6] text-[#31465A]/75">
            <p>
              A new enquiry should not disappear after the first conversation. EVOQ Healthcare CRM gives your team
              visibility into what happens after every interaction.
            </p>
            <p className="mt-4">
              Track where enquiries come from, what patients are interested in, who is responsible for the
              relationship, what follow-up is due, and how enquiries progress toward appointments and ongoing
              relationships.
            </p>
            <p className="mt-4">
              This creates a clearer view of the patient journey without turning your CRM into a clinical records
              system.
            </p>
          </div>
        </div>

        <div className="relative min-w-0">
          {/* enquiries dashboard */}
          <div className="rounded-[18px] bg-white p-5 shadow-[0_24px_54px_-30px_rgba(16,42,67,0.3)] ring-1 ring-[#31465A]/5">
            <div className="flex items-center justify-between">
              <p className="font-[var(--font-display)] text-[16px] font-bold text-[#102A43]">Enquiries</p>
              <span className="inline-flex items-center gap-2 rounded-lg border border-[#31465A]/12 px-3 py-1.5 text-[11.5px] text-[#31465A]/80">
                Last 30 days <Chevron />
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className={`relative rounded-xl p-3 ${s.tile}`}>
                  <span className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full ${s.chip}`}>{s.icon}</span>
                  <p className="font-[var(--font-display)] text-[22px] font-bold leading-none text-[#102A43]">{s.value}</p>
                  <p className="mt-1.5 text-[11px] text-[#2064B6]">{s.label}</p>
                  <p className="mt-0.5 text-[10.5px] font-medium text-[#3D9A92]">↑ {s.delta}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 overflow-x-auto">
              <div className="min-w-[500px]">
                <div className={`grid ${TABLE_COLS} gap-2 rounded-lg bg-[#F4F7FA] px-3 py-2.5 text-[11px] text-[#31465A]/70`}>
                  <span>Name</span>
                  <span>Source</span>
                  <span>Interest</span>
                  <span>Status</span>
                  <span>Next follow-up</span>
                </div>
                {ENQUIRIES.map((e) => (
                  <div key={e.name} className={`grid ${TABLE_COLS} items-center gap-2 px-3 py-[9px] text-[11.5px] text-[#102A43]`}>
                    <span className="flex items-center gap-2 font-medium">
                      <Image src={`/healthcare/avatars/${e.img}.jpg`} alt="" width={26} height={26} className="h-[26px] w-[26px] rounded-full object-cover" />
                      {e.name}
                    </span>
                    <span>{e.source}</span>
                    <span>{e.interest}</span>
                    <span>
                      <span className={`rounded-md px-2.5 py-1 text-[10.5px] font-medium ${e.pill}`}>{e.status}</span>
                    </span>
                    <span>{e.next}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* sources + script */}
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <div className="w-full max-w-[300px] rounded-[18px] bg-white p-5 shadow-[0_24px_54px_-30px_rgba(16,42,67,0.3)] ring-1 ring-[#31465A]/5">
              <p className="font-[var(--font-display)] text-[14px] font-bold text-[#102A43]">Enquiry sources</p>
              <div className="mt-3 flex items-center gap-4">
                <Donut />
                <ul className="flex flex-1 flex-col gap-2 text-[11.5px] text-[#31465A]/80">
                  {SOURCES.map((s) => (
                    <li key={s.label} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                      <span className="flex-1">{s.label}</span>
                      <span className="font-medium text-[#102A43]">{s.pct}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Script lines={["More Enquiries", "More Appointments", "Stronger Relationships"]} className="hidden pr-2 xl:block" />
          </div>
        </div>
      </div>
    </Frame>
  );
}
