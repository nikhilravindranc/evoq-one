import Image from "next/image";

/* ---------- inline icons ---------- */

type IconProps = { stroke?: string; size?: number };

const mk = (stroke: string, size: number) =>
  ({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke,
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  }) as const;

const PatientsIcon = ({ stroke = "#2064B6", size = 20 }: IconProps) => (
  <svg {...mk(stroke, size)}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const CalendarIcon = ({ stroke = "#18B8D1", size = 20 }: IconProps) => (
  <svg {...mk(stroke, size)}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
    <path d="m9 16 2 2 4-4" />
  </svg>
);

const ServicesIcon = ({ stroke = "#6DCCC3", size = 20 }: IconProps) => (
  <svg {...mk(stroke, size)}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M9 13h6M9 17h4" />
  </svg>
);

const HeartIcon = ({ stroke = "#2064B6", size = 20 }: IconProps) => (
  <svg {...mk(stroke, size)}>
    <path d="M19 14c1.5-1.5 3-3.5 3-5.5A4.5 4.5 0 0 0 17.5 4c-1.8 0-3.4 1-4.5 2.5C11.9 5 10.3 4 8.5 4A4.5 4.5 0 0 0 4 8.5c0 2 1.5 4 3 5.5l4.5 4z" />
  </svg>
);

const HomeIcon = ({ stroke = "#2064B6", size = 16 }: IconProps) => (
  <svg {...mk(stroke, size)}>
    <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" />
  </svg>
);

const SearchIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const BellIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.7 21a2 2 0 0 1-3.4 0" />
  </svg>
);

const ArrowRight = ({ stroke = "currentColor" }: { stroke?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const TrendUp = ({ stroke = "#18B8D1" }: { stroke?: string }) => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);

/* ---------- data ---------- */

const FEATURES = [
  {
    icon: <PatientsIcon />,
    tile: "bg-[#E8F1FA]",
    title: "Patient relationships",
    desc: "Capture enquiries, manage patient information, and keep every interaction connected.",
  },
  {
    icon: <CalendarIcon />,
    tile: "bg-[#E5F8FB]",
    title: "Appointments and schedules",
    desc: "Coordinate appointments and provider schedules with real-time visibility.",
  },
  {
    icon: <ServicesIcon />,
    tile: "bg-[#E7F7F5]",
    title: "Services and billing",
    desc: "Connect services with invoices, payments, and outstanding balances.",
  },
  {
    icon: <HeartIcon />,
    tile: "bg-[#E8F1FA]",
    title: "Engagement and follow-ups",
    desc: "Stay in touch with patients and keep follow-ups organized across every stage of care.",
  },
];

const SIDEBAR = [
  { label: "Home", icon: <HomeIcon size={14} />, active: true },
  { label: "Patients", icon: <PatientsIcon stroke="#64748B" size={14} /> },
  { label: "Appointments", icon: <CalendarIcon stroke="#64748B" size={14} /> },
  { label: "Providers", icon: <PatientsIcon stroke="#64748B" size={14} /> },
  { label: "Services", icon: <ServicesIcon stroke="#64748B" size={14} /> },
  { label: "Billing", icon: <ServicesIcon stroke="#64748B" size={14} /> },
  { label: "Communications", icon: <HeartIcon stroke="#64748B" size={14} /> },
  { label: "Reports", icon: <ServicesIcon stroke="#64748B" size={14} /> },
];

const STATS = [
  { icon: <PatientsIcon stroke="#2064B6" size={16} />, tile: "bg-[#E8F1FA]", value: "28", label: "New enquiries", delta: "12%", tone: "text-[#2064B6]" },
  { icon: <CalendarIcon stroke="#18B8D1" size={16} />, tile: "bg-[#E5F8FB]", value: "42", label: "Appointments today", delta: "8%", tone: "text-[#18B8D1]" },
  { icon: <HeartIcon stroke="#6DCCC3" size={16} />, tile: "bg-[#E7F7F5]", value: "12", label: "Follow-ups due", delta: "5%", tone: "text-[#18B8D1]" },
  { icon: <ServicesIcon stroke="#6DCCC3" size={16} />, tile: "bg-[#E7F7F5]", value: "$12,480", label: "Payments received", delta: "18%", tone: "text-[#18B8D1]" },
];

const APPOINTMENTS: { time: string; name: string; type: string; doctor: string; status: string; pill: string }[] = [
  { time: "09:00 AM", name: "Sarah Mitchell", type: "Consultation", doctor: "Dr. Reynolds", status: "Confirmed", pill: "bg-[#E7F7F5] text-[#18B8D1]" },
  { time: "10:30 AM", name: "James Carter", type: "Follow-up", doctor: "Dr. Patel", status: "Confirmed", pill: "bg-[#E7F7F5] text-[#18B8D1]" },
  { time: "11:15 AM", name: "Emma Wilson", type: "Treatment", doctor: "Dr. Reynolds", status: "In progress", pill: "bg-[#E8F1FA] text-[#2064B6]" },
  { time: "01:00 PM", name: "Michael Brown", type: "Consultation", doctor: "Dr. Chen", status: "Scheduled", pill: "bg-[#F1F5F9] text-[#64748B]" },
  { time: "02:30 PM", name: "Olivia Davis", type: "Follow-up", doctor: "Dr. Patel", status: "Scheduled", pill: "bg-[#F1F5F9] text-[#64748B]" },
];

/* ---------- dashboard mock ---------- */

function DashboardMock() {
  return (
    <div className="overflow-hidden rounded-[18px] bg-white shadow-[0_30px_80px_-20px_rgba(49,70,90,0.35)] ring-1 ring-[#E2E8EC]">
      {/* window header */}
      <div className="flex items-center justify-between border-b border-[#EEF2F6] px-4 py-2.5">
        <Image src="/black-logo.png" alt="EVOQ" width={64} height={18} className="h-[16px] w-auto" />
        <div className="flex w-[38%] items-center gap-1.5 rounded-full bg-[#F4F7FA] px-3 py-1.5 text-[10px] text-[#94A3B8]">
          <SearchIcon />
          Search patients, appointments...
        </div>
        <div className="flex items-center gap-2.5">
          <BellIcon />
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2064B6] text-[9px] font-bold text-white">JD</span>
        </div>
      </div>

      <div className="flex">
        {/* sidebar */}
        <div className="hidden w-[128px] shrink-0 flex-col gap-0.5 border-r border-[#EEF2F6] p-2.5 sm:flex">
          {SIDEBAR.map((item) => (
            <span
              key={item.label}
              className={`flex items-center gap-2 rounded-lg px-2.5 py-[7px] text-[10.5px] font-medium ${
                item.active ? "bg-[#E5F8FB] font-semibold text-[#2064B6]" : "text-[#64748B]"
              }`}
            >
              {item.icon}
              {item.label}
            </span>
          ))}
        </div>

        {/* main panel */}
        <div className="min-w-0 flex-1 bg-[#FAFCFE] p-4">
          <p className="font-[var(--font-display)] text-[15px] font-bold text-[#31465A]">Good morning</p>
          <p className="text-[10.5px] text-[#94A3B8]">Here&apos;s what&apos;s happening today.</p>

          {/* stat cards */}
          <div className="mt-3 grid grid-cols-2 gap-2.5 xl:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-xl border border-[#EEF2F6] bg-white p-2.5">
                <span className={`flex h-6 w-6 items-center justify-center rounded-md ${s.tile}`}>{s.icon}</span>
                <p className="mt-1.5 font-[var(--font-display)] text-[15px] font-extrabold text-[#31465A]">{s.value}</p>
                <p className="text-[9px] leading-tight text-[#94A3B8]">{s.label}</p>
                <p className={`mt-1 flex items-center gap-0.5 text-[9px] font-semibold ${s.tone}`}>
                  <TrendUp stroke="#18B8D1" />
                  {s.delta}
                </p>
              </div>
            ))}
          </div>

          {/* appointments */}
          <div className="mt-3 rounded-xl border border-[#EEF2F6] bg-white p-3">
            <div className="flex items-center justify-between">
              <p className="text-[11.5px] font-bold text-[#31465A]">Upcoming appointments</p>
              <span className="text-[9.5px] font-semibold text-[#2064B6]">View all</span>
            </div>
            <div className="mt-2 flex flex-col divide-y divide-[#F1F5F9]">
              {APPOINTMENTS.map((a) => (
                <div key={a.time} className="grid grid-cols-[52px_1fr_auto] items-center gap-2 py-[7px] text-[10px] sm:grid-cols-[56px_1fr_80px_76px_auto]">
                  <span className="text-[#94A3B8]">{a.time}</span>
                  <span className="truncate font-semibold text-[#31465A]">{a.name}</span>
                  <span className="hidden text-[#64748B] sm:block">{a.type}</span>
                  <span className="hidden text-[#64748B] sm:block">{a.doctor}</span>
                  <span className={`rounded-full px-2 py-[3px] text-[8.5px] font-semibold ${a.pill}`}>{a.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- section ---------- */

export function HealthcareOperations() {
  return (
    <section className="relative overflow-hidden">
      {/* background photo with left fade */}
      <div className="absolute inset-0">
        <Image
          src="/healthcare/operations-bg.jpg"
          alt=""
          fill
          priority={false}
          className="object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/10" />
      </div>

      {/* soft cyan→mint gradient wash behind the left copy */}
      <div
        className="pointer-events-none absolute -left-48 top-1/3 h-[620px] w-[620px] -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(24,184,209,0.16), rgba(109,204,195,0.12) 50%, rgba(32,100,182,0.06) 75%, transparent 78%)",
        }}
      />

      <div className="relative px-5 sm:px-6 lg:px-6">
        <div className="mx-auto grid max-w-[1300px] items-center gap-14 py-20 lg:grid-cols-2 lg:py-28">
          {/* copy */}
          <div className="max-w-[560px]">
            <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#2064B6]">
              Connected operations
            </p>
            <h2 className="mt-4 font-[var(--font-display)] text-[36px] font-extrabold leading-[1.08] tracking-[-0.02em] text-[#31465A] sm:text-[48px]">
              Everything behind better healthcare operations.
            </h2>
            <p className="mt-5 text-[15.5px] leading-[1.7] text-[#64748B]">
              Healthcare organizations manage far more than appointments. Your
              teams handle enquiries, patient relationships, scheduling,
              providers, services, billing, follow-ups, and ongoing engagement.
              EVOQ brings the applications behind these activities together so
              information can move across the patient journey.
            </p>

            <div className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {FEATURES.map((f) => (
                <div key={f.title} className="flex gap-3.5">
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${f.tile}`}>
                    {f.icon}
                  </span>
                  <div>
                    <p className="text-[15px] font-bold text-[#31465A]">{f.title}</p>
                    <p className="mt-1 text-[13.5px] leading-[1.55] text-[#64748B]">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3.5">
              <a
                href="#healthcare-crm"
                className="inline-flex items-center gap-2 rounded-full bg-[#2064B6] px-6 py-3 text-[15px] font-semibold text-white transition-all hover:-translate-y-px hover:bg-[#185596]"
              >
                Explore solutions
                <ArrowRight />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-[#2064B6] bg-white px-6 py-3 text-[15px] font-semibold text-[#2064B6] transition-all hover:-translate-y-px hover:bg-[#F1F5F7]"
              >
                Talk to an expert
                <ArrowRight />
              </a>
            </div>
          </div>

          {/* dashboard mock */}
          <div className="relative lg:pl-6">
            <DashboardMock />
          </div>
        </div>
      </div>
    </section>
  );
}
