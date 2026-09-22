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

const MessageIcon = ({ stroke = "#FFFFFF", size = 20 }: IconProps) => (
  <svg {...mk(stroke, size)}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const UsersIcon = ({ stroke = "#FFFFFF", size = 20 }: IconProps) => (
  <svg {...mk(stroke, size)}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const CalendarIcon = ({ stroke = "#FFFFFF", size = 20 }: IconProps) => (
  <svg {...mk(stroke, size)}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

const ClipboardIcon = ({ stroke = "#FFFFFF", size = 20 }: IconProps) => (
  <svg {...mk(stroke, size)}>
    <rect x="8" y="2" width="8" height="4" rx="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M9 12h6M9 16h4" />
  </svg>
);

const HeartIcon = ({ stroke = "#FFFFFF", size = 20 }: IconProps) => (
  <svg {...mk(stroke, size)}>
    <path d="M19 14c1.5-1.5 3-3.5 3-5.5A4.5 4.5 0 0 0 17.5 4c-1.8 0-3.4 1-4.5 2.5C11.9 5 10.3 4 8.5 4A4.5 4.5 0 0 0 4 8.5c0 2 1.5 4 3 5.5l4.5 4z" />
  </svg>
);

const BarChartIcon = ({ stroke = "#FFFFFF", size = 20 }: IconProps) => (
  <svg {...mk(stroke, size)}>
    <path d="M3 3v18h18" />
    <path d="M7 15v3M12 10v8M17 6v12" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#18B8D1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m5 13 4 4L19 7" />
  </svg>
);

const ArrowRight = ({ stroke = "currentColor" }: { stroke?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* ---------- data ---------- */

const STEPS = [
  {
    icon: <MessageIcon />,
    label: "Capture",
    desc: "Turn enquiries from calls, forms, referrals, and other channels into structured patient relationships.",
  },
  {
    icon: <UsersIcon />,
    label: "Consult",
    desc: "Keep consultations, requirements, interactions, and follow-ups organized.",
  },
  {
    icon: <CalendarIcon />,
    label: "Book",
    desc: "Make appointments easier to schedule around provider availability.",
  },
  {
    icon: <ClipboardIcon />,
    label: "Manage",
    desc: "Keep patients, appointments, providers, services, visits, and practice activity organized.",
  },
  {
    icon: <HeartIcon />,
    label: "Follow up",
    desc: "Stay on top of follow-ups after appointments, consultations, and treatments.",
  },
  {
    icon: <BarChartIcon />,
    label: "Re-engage",
    desc: "Use CRM and Campaigns to bring patients back for relevant services and ongoing care.",
  },
];

/* ---------- section ---------- */

export function HealthcareJourney() {
  return (
    <section className="relative overflow-hidden bg-[#F1F5F7]">
      <div
        className="pointer-events-none absolute -left-40 top-0 h-[480px] w-[480px] -translate-y-1/4 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(24,184,209,0.16), rgba(109,204,195,0.1) 55%, transparent 75%)" }}
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] translate-y-1/4 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(32,100,182,0.12), rgba(24,184,209,0.1) 55%, transparent 75%)" }}
      />

      <div className="relative px-5 sm:px-6 lg:px-6">
        <div className="mx-auto max-w-[1300px] py-20 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_440px] lg:gap-20">
            <div>
              <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#18B8D1]">The patient journey</p>
              <h2 className="mt-4 max-w-[640px] font-[var(--font-display)] text-[38px] font-extrabold leading-[1.08] tracking-[-0.02em] text-[#31465A]">
                From first enquiry to ongoing care.
              </h2>
              <p className="mt-5 max-w-[560px] text-[16.5px] leading-[1.7] text-[#64748B]">
                Keep the patient journey organized from the first interaction through appointments, treatment,
                follow-up, and re-engagement.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3.5">
                <a
                  href="#healthcare-crm"
                  className="inline-flex items-center gap-2 rounded-full bg-[#2064B6] px-7 py-3.5 text-[15px] font-semibold text-white transition-all hover:-translate-y-px hover:bg-[#185596]"
                >
                  See how it works
                  <ArrowRight />
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-[#2064B6] bg-white px-7 py-3.5 text-[15px] font-semibold text-[#2064B6] transition-all hover:-translate-y-px hover:bg-[#F1F5F7]"
                >
                  Talk to an expert
                  <ArrowRight />
                </a>
              </div>
            </div>

            {/* photo card */}
            <div className="relative mx-auto hidden w-full max-w-[440px] pb-6 lg:block">
              <div className="absolute -left-8 -top-8 h-[160px] w-[160px] rounded-full bg-[#6DCCC3]/30" />
              <div className="relative overflow-hidden rounded-[28px] rounded-tr-[110px] shadow-[0_30px_80px_-24px_rgba(49,70,90,0.4)] ring-[6px] ring-white">
                <Image src="/healthcare/journey-consult.jpg" alt="Doctor consulting a patient" width={800} height={533} className="h-[290px] w-full object-cover" />
              </div>
              <div className="absolute -left-10 bottom-0 w-[270px] rounded-2xl border border-[#E2E8EC] bg-white p-4 shadow-[0_20px_50px_-12px_rgba(49,70,90,0.25)]">
                <div className="flex items-center justify-between">
                  <p className="text-[12px] font-bold text-[#31465A]">Next Follow-up</p>
                  <ArrowRight stroke="#2064B6" />
                </div>
                <div className="mt-2.5 flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E8F1FA]">
                    <UsersIcon stroke="#2064B6" size={16} />
                  </span>
                  <div>
                    <p className="text-[13px] font-semibold text-[#31465A]">Sarah Mitchell</p>
                    <p className="text-[11px] leading-[1.5] text-[#64748B]">Skin Treatment Follow-up<br />Apr 24, 2026 · 10:00 AM</p>
                  </div>
                </div>
              </div>
              <div className="absolute -right-2 bottom-2 flex items-center gap-2.5 rounded-full border border-[#E2E8EC] bg-white py-2.5 pl-3 pr-5 shadow-[0_16px_40px_-12px_rgba(49,70,90,0.22)]">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E7F7F5]"><CheckIcon /></span>
                <p className="text-[12px] font-semibold text-[#31465A]">Appointment Confirmed</p>
              </div>
            </div>
          </div>

          {/* steps */}
          <ol className="relative mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {STEPS.map((s, i) => (
              <li key={s.label} className="relative flex flex-col rounded-[22px] bg-white p-6 shadow-[0_18px_44px_-30px_rgba(49,70,90,0.4)] ring-1 ring-[#E2E8EC] transition-all hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <span
                    className="flex h-[52px] w-[52px] items-center justify-center rounded-full shadow-[0_10px_24px_-10px_rgba(24,184,209,0.6)]"
                    style={{ background: i % 2 === 0 ? "linear-gradient(135deg, #18B8D1, #6DCCC3)" : "linear-gradient(135deg, #2064B6, #18B8D1)" }}
                  >
                    {s.icon}
                  </span>
                  <span className="font-[var(--font-display)] text-[26px] font-extrabold text-[#31465A]/10">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="mt-5 text-[16px] font-bold text-[#31465A]">{s.label}</p>
                <p className="mt-2 text-[13.5px] leading-[1.6] text-[#64748B]">{s.desc}</p>
                {i < STEPS.length - 1 && (
                  <span className="pointer-events-none absolute -right-[13px] top-[38px] z-10 hidden h-6 w-6 items-center justify-center rounded-full bg-white text-[#18B8D1] shadow ring-1 ring-[#E2E8EC] xl:flex">
                    <ArrowRight stroke="#18B8D1" />
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
