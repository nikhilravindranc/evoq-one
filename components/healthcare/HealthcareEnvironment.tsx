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

const UsersIcon = ({ stroke = "#2064B6", size = 20 }: IconProps) => (
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

const SparklesIcon = ({ stroke = "#6DCCC3", size = 20 }: IconProps) => (
  <svg {...mk(stroke, size)}>
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.2 2.2M16.2 16.2l2.2 2.2M18.4 5.6l-2.2 2.2M7.8 16.2l-2.2 2.2" />
  </svg>
);

const HeartPulseIcon = ({ stroke = "#18B8D1", size = 26 }: IconProps) => (
  <svg {...mk(stroke, size)}>
    <path d="M19 14c1.5-1.5 3-3.5 3-5.5A4.5 4.5 0 0 0 17.5 4c-1.8 0-3.4 1-4.5 2.5C11.9 5 10.3 4 8.5 4A4.5 4.5 0 0 0 4 8.5c0 2 1.5 4 3 5.5" />
    <path d="M3.5 12h3l1.5-2.5 2 5 2-6.5 1.5 2h3" />
    <path d="M12 21c-2-1.2-4-2.8-5.5-4.5M12 21c2-1.2 4-2.8 5.5-4.5" />
  </svg>
);

const ReceiptIcon = ({ stroke = "#18B8D1", size = 14 }: IconProps) => (
  <svg {...mk(stroke, size)}>
    <path d="M4 2v20l2-1.5L8 22l2-1.5L12 22l2-1.5L16 22l2-1.5L20 22V2l-2 1.5L16 2l-2 1.5L12 2l-2 1.5L8 2 6 3.5z" />
    <path d="M9 8h6M9 12h6" />
  </svg>
);

const CalendarPlusIcon = ({ stroke = "#6DCCC3", size = 14 }: IconProps) => (
  <svg {...mk(stroke, size)}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
    <path d="M12 14v4M10 16h4" />
  </svg>
);

const MegaphoneIcon = ({ stroke = "#6DCCC3", size = 14 }: IconProps) => (
  <svg {...mk(stroke, size)}>
    <path d="m3 11 18-5v12L3 14v-3z" />
    <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
  </svg>
);

const SurveyIcon = ({ stroke = "#2064B6", size = 14 }: IconProps) => (
  <svg {...mk(stroke, size)}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <path d="M8 8h8M8 11h5" />
  </svg>
);

const StarIcon = ({ stroke = "#18B8D1", size = 14 }: IconProps) => (
  <svg {...mk(stroke, size)}>
    <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
  </svg>
);

const BarChartIcon = ({ stroke = "#2064B6", size = 20 }: IconProps) => (
  <svg {...mk(stroke, size)}>
    <path d="M3 3v18h18" />
    <path d="M7 15v3M12 10v8M17 6v12" />
  </svg>
);

const HeartIcon = ({ stroke = "#6DCCC3", size = 20 }: IconProps) => (
  <svg {...mk(stroke, size)}>
    <path d="M19 14c1.5-1.5 3-3.5 3-5.5A4.5 4.5 0 0 0 17.5 4c-1.8 0-3.4 1-4.5 2.5C11.9 5 10.3 4 8.5 4A4.5 4.5 0 0 0 4 8.5c0 2 1.5 4 3 5.5l4.5 4z" />
  </svg>
);

const ArrowRight = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* ---------- data ---------- */

const APPS = [
  { icon: <CalendarPlusIcon stroke="#2064B6" />, name: "Booking Engine" },
  { icon: <ReceiptIcon />, name: "Billing" },
  { icon: <MegaphoneIcon stroke="#6DCCC3" />, name: "Campaigns" },
  { icon: <SurveyIcon />, name: "Surveys" },
  { icon: <StarIcon />, name: "Loyalty" },
];

const STATS = [
  { icon: <UsersIcon stroke="#6DCCC3" />, tile: "bg-[#E7F7F5]", line1: "A more engaged", line2: "patient base" },
  { icon: <BarChartIcon />, tile: "bg-[#E8F1FA]", line1: "More efficient", line2: "daily operations" },
  { icon: <HeartIcon stroke="#18B8D1" />, tile: "bg-[#E5F8FB]", line1: "A better experience", line2: "at every step" },
];

/* ---------- section ---------- */

export function HealthcareEnvironment() {
  return (
    <section className="relative overflow-hidden bg-[#F1F5F7]">
      {/* soft decorative washes */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-[#C9EFEB]/50 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[#E8F1FA]/70 blur-3xl" />

      <div className="relative px-5 sm:px-6 lg:px-6">
        <div className="mx-auto max-w-[1300px] py-20 lg:py-24">
          {/* header */}
          <div className="mx-auto max-w-[720px] text-center">
            <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#18B8D1]">
              The EVOQ Healthcare environment
            </p>
            <h2 className="mt-4 font-[var(--font-display)] text-[36px] font-extrabold leading-[1.08] tracking-[-0.02em] text-[#31465A] sm:text-[48px]">
              One healthcare environment. Different applications.
            </h2>
            <p className="mt-5 text-[15.5px] leading-[1.7] text-[#64748B]">
              A unified environment for patient relationships, practice
              operations, and the entire patient journey, with dedicated
              applications that work together.
            </p>
          </div>

          {/* hub diagram */}
          <div className="relative mt-14">
            {/* dotted connectors */}
            <svg
              className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
              viewBox="0 0 1200 380"
              fill="none"
              preserveAspectRatio="none"
            >
              <path d="M340 190 H 500" stroke="#18B8D1" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="3 6" />
              <path d="M700 190 H 860" stroke="#18B8D1" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="3 6" />
              <path d="M600 190 V 120" stroke="#18B8D1" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="3 6" />
              <circle cx="500" cy="190" r="4" fill="#2064B6" />
              <circle cx="700" cy="190" r="4" fill="#18B8D1" />
              <circle cx="600" cy="120" r="4" fill="#6DCCC3" />
            </svg>

            <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
              {/* patient relationships */}
              <div className="rounded-[20px] bg-white p-6 shadow-[0_2px_16px_rgba(49,70,90,0.06)] ring-1 ring-[#E2E8EC] lg:max-w-[360px] lg:justify-self-end">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F1FA]">
                  <UsersIcon />
                </span>
                <h3 className="mt-4 font-[var(--font-display)] text-[17px] font-bold text-[#31465A]">
                  Patient relationships
                </h3>
                <p className="mt-2 text-[13.5px] leading-[1.6] text-[#64748B]">
                  Capture enquiries, manage patient information, and keep
                  interactions and follow-ups organized with Healthcare CRM.
                </p>
                <a
                  href="#healthcare-crm"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#E8F1FA] px-4 py-2 text-[12.5px] font-semibold text-[#2064B6] transition-colors hover:bg-[#D8E8F5]"
                >
                  Healthcare CRM
                  <ArrowRight />
                </a>
              </div>

              {/* center column: practice operations + hub */}
              <div className="flex flex-col items-center gap-8">
                <div className="w-full rounded-[20px] bg-white p-6 text-center shadow-[0_2px_16px_rgba(49,70,90,0.06)] ring-1 ring-[#E2E8EC] sm:max-w-[360px]">
                  <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-[#E5F8FB]">
                    <CalendarIcon />
                  </span>
                  <h3 className="mt-4 font-[var(--font-display)] text-[17px] font-bold text-[#31465A]">
                    Practice operations
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-[1.6] text-[#64748B]">
                    Manage patients, appointments, providers, services, visits,
                    and daily practice activity with Practice Management.
                  </p>
                  <a
                    href="#practice-management"
                    className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#E5F8FB] px-4 py-2 text-[12.5px] font-semibold text-[#18B8D1] transition-colors hover:bg-[#D3F2F7]"
                  >
                    Practice Management
                    <ArrowRight />
                  </a>
                </div>

                {/* hub */}
                <div
                  className="flex h-[160px] w-[160px] flex-col items-center justify-center rounded-full bg-white"
                  style={{
                    boxShadow:
                      "0 0 0 3px rgba(24,184,209,0.35), 0 0 0 7px rgba(109,204,195,0.18), 0 18px 50px -12px rgba(24,184,209,0.3)",
                  }}
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E5F8FB]">
                    <HeartPulseIcon stroke="#18B8D1" />
                  </span>
                  <p className="mt-2 font-[var(--font-display)] text-[16px] font-extrabold text-[#31465A]">
                    Healthcare
                  </p>
                </div>
                {/* spacer to balance the column on lg */}
                <div className="hidden lg:block" />
              </div>

              {/* patient journey */}
              <div className="rounded-[20px] bg-white p-6 shadow-[0_2px_16px_rgba(49,70,90,0.06)] ring-1 ring-[#E2E8EC] lg:max-w-[360px]">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E7F7F5]">
                  <SparklesIcon />
                </span>
                <h3 className="mt-4 font-[var(--font-display)] text-[17px] font-bold text-[#31465A]">
                  Patient journey
                </h3>
                <p className="mt-2 text-[13.5px] leading-[1.6] text-[#64748B]">
                  Extend the experience through Booking Engine, Billing,
                  Campaigns, Surveys, and Loyalty.
                </p>
                <div className="mt-4 flex flex-col gap-1.5">
                  {APPS.map((a) => (
                    <span
                      key={a.name}
                      className="flex items-center gap-2.5 rounded-lg bg-[#F1F5F7] px-3 py-2 text-[12.5px] font-semibold text-[#64748B]"
                    >
                      {a.icon}
                      {a.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* stats row */}
          <div className="mx-auto mt-16 grid max-w-[1000px] gap-8 rounded-[20px] bg-white px-8 py-8 shadow-[0_2px_16px_rgba(49,70,90,0.05)] ring-1 ring-[#E2E8EC] sm:grid-cols-3 sm:divide-x sm:divide-[#E2E8EC]">
            {STATS.map((s) => (
              <div key={s.line1} className="flex items-center gap-4 sm:justify-center">
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${s.tile}`}>
                  {s.icon}
                </span>
                <p className="text-[14.5px] font-bold leading-[1.45] text-[#31465A]">
                  {s.line1}
                  <br />
                  {s.line2}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
