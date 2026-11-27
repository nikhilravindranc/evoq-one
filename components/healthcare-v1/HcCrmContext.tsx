import Image from "next/image";

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
  { img: "liam", name: "Liam Carter", source: "Phone", interest: "Wellness program", status: "Follow up", pill: "bg-[#E8EDFB] text-[#3B5BDB]", next: "Jan 22, 2025" },
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

const EYEBROW = "text-[12px] font-bold uppercase tracking-[0.28em] text-[#18A0B8]";
const H2 =
  "mt-4 font-[var(--font-display)] text-[38px] font-extrabold leading-[1.06] tracking-[-0.025em] text-[#102A43]";
const GRID = "relative grid gap-10 px-6 py-10 sm:px-10 xl:min-h-[629px] xl:grid-cols-[42%_1fr] xl:items-center xl:gap-8 xl:px-14 xl:py-10";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-white">
      <div className="px-5 sm:px-6 lg:px-6">
        <div className="mx-auto max-w-[1300px] py-6 lg:py-8">
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

export function HcCrmSharedContext() {
  return (
    <Frame>
      <div className={GRID}>
        <div className="relative z-10">
          <p className={EYEBROW}>Shared context</p>
          <h2 className={`${H2} max-w-[520px]`}>The history is on the record before your team replies.</h2>

          <div className="mt-6 max-w-[520px] text-[15.5px] leading-[1.6] text-[#31465A]/75">
            <p>Patients should not have to repeat their story to someone new.</p>
            <p className="mt-4">
              Profiles, interaction history, notes and activities sit in one place, so front desk teams, managers and
              providers understand the conversation before they respond.
            </p>
          </div>

          <a
            href="/solutions/healthcare/patient-relationships/features-v1"
            className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#2064B6] px-7 py-3.5 text-[15.5px] font-semibold text-white no-underline shadow-[0_14px_30px_-14px_rgba(32,100,182,0.6)] transition-all hover:-translate-y-px hover:bg-[#1A559C]"
          >
            Explore the features
            <ArrowRight />
          </a>
        </div>

        <div className="relative grid gap-6 xl:grid-cols-[1fr_310px] xl:items-start">
          <ul className="relative z-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-1">
            {ROLES.map((r) => (
              <li key={r.title} className="flex items-start gap-4">
                <span className={`flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full ${r.tile}`}>{r.icon}</span>
                <span>
                  <span className="block text-[15px] font-bold leading-[1.25] text-[#102A43]">{r.title}</span>
                  <span className="mt-1 block text-[13.5px] leading-[1.45] text-[#31465A]/65">{r.desc}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="relative z-10 flex flex-col gap-5">
            <div className="relative h-[200px] overflow-hidden rounded-[18px]">
              <Image src="/healthcare/stock/crm-split-doctor.jpg" alt="Doctor reviewing a patient profile" fill sizes="(min-width: 1280px) 310px, 100vw" className="object-cover object-[50%_28%]" />
            </div>
          <div className="rounded-[18px] bg-white p-4 shadow-[0_28px_60px_-28px_rgba(16,42,67,0.4)] ring-1 ring-[#31465A]/5">
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
      </div>
    </Frame>
  );
}
