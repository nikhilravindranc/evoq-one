const ICONS = {
  chat: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2zM8 10h.01M12 10h.01M16 10h.01",
  cal: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM9 16l2 2 4-4",
  steth: "M6 3v6a4 4 0 0 0 8 0V3M10 13v2a5 5 0 0 0 10 0v-1M20 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4z",
  card: "M3 6h18a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zM2 10h20M6 15h4",
  bell: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0",
  refresh: "M21 12a9 9 0 0 0-15-6.7L3 8M3 3v5h5M3 12a9 9 0 0 0 15 6.7L21 16M21 21v-5h-5",
  heart: "M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 22l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z",
} as const;

function Ic({ n, size = 24, stroke = "#2064B6" }: { n: keyof typeof ICONS; size?: number; stroke?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d={ICONS[n]} />
    </svg>
  );
}

const STEPS = [
  { icon: "chat", label: "First enquiry", app: "Healthcare CRM", tile: "bg-[#E8F1FA]", stroke: "#2064B6", chip: "bg-[#E8F1FA] text-[#2064B6]" },
  { icon: "cal", label: "Appointments", app: "Booking Engine", tile: "bg-[#E5F8FB]", stroke: "#18B8D1", chip: "bg-[#E5F8FB] text-[#0E8FA5]" },
  { icon: "steth", label: "Care", app: "Practice Management", tile: "bg-[#E7F7F5]", stroke: "#3FA99B", chip: "bg-[#E7F7F5] text-[#2F8A7F]" },
  { icon: "card", label: "Payment", app: "Billing", tile: "bg-[#E8F1FA]", stroke: "#2064B6", chip: "bg-[#E8F1FA] text-[#2064B6]" },
  { icon: "bell", label: "Follow-up", app: "CRM and Campaigns", tile: "bg-[#E5F8FB]", stroke: "#18B8D1", chip: "bg-[#E5F8FB] text-[#0E8FA5]" },
  { icon: "refresh", label: "The next visit", app: "Loyalty and Surveys", tile: "bg-[#E7F7F5]", stroke: "#3FA99B", chip: "bg-[#E7F7F5] text-[#2F8A7F]" },
] as const;

export function HealthcareConnected() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-[#E5F8FB] blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[380px] w-[380px] rounded-full bg-[#E7F7F5] blur-3xl" />

      <div className="relative px-5 sm:px-6 lg:px-6">
        <div className="mx-auto max-w-[1300px] py-20 lg:py-28">
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
            <h2 className="font-[var(--font-display)] text-[36px] font-extrabold leading-[1.06] tracking-[-0.025em] text-[#31465A] sm:text-[50px]">
              Healthcare is a connected experience.
            </h2>
            <div className="text-[16.5px] leading-[1.7] text-[#64748B]">
              <p>
                A patient does not experience your organization as separate departments or applications. They
                experience one journey, from the first enquiry through appointments, care, payment, follow-up, and the
                next visit.
              </p>
              <p className="mt-4">
                EVOQ brings the applications behind that journey together, helping your teams work with the
                information they need while keeping the patient relationship connected along the way.
              </p>
            </div>
          </div>

          {/* journey ribbon */}
          <div className="relative mt-14 overflow-hidden rounded-[32px] bg-gradient-to-br from-[#F1F5F7] via-white to-[#E5F8FB] px-6 py-12 ring-1 ring-[#E2E8EC] sm:px-10 lg:px-12 lg:py-14">
            <div className="pointer-events-none absolute -right-20 -top-20 h-[280px] w-[280px] rounded-full bg-[#18B8D1]/10 blur-2xl" />

            <div className="relative">
              {/* connector */}
              <svg className="pointer-events-none absolute left-[8%] right-[8%] top-[22px] hidden h-10 w-[84%] xl:block" viewBox="0 0 1000 40" preserveAspectRatio="none" fill="none">
                <defs>
                  <linearGradient id="hcConnected" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1000" y2="0">
                    <stop offset="0" stopColor="#2064B6" />
                    <stop offset="0.5" stopColor="#18B8D1" />
                    <stop offset="1" stopColor="#6DCCC3" />
                  </linearGradient>
                </defs>
                <path d="M0 20 H1000" stroke="url(#hcConnected)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="2 9" vectorEffect="non-scaling-stroke" />
              </svg>

              <ol className="relative grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                {STEPS.map((s, i) => (
                  <li key={s.label} className="flex flex-col items-center text-center">
                    <span className={`relative flex h-[62px] w-[62px] items-center justify-center rounded-full ${s.tile} shadow-[0_14px_30px_-14px_rgba(32,100,182,0.55)] ring-[5px] ring-white`}>
                      <Ic n={s.icon} size={26} stroke={s.stroke} />
                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#31465A] text-[10px] font-bold text-white">{i + 1}</span>
                    </span>
                    <span className="mt-4 text-[16px] font-bold text-[#31465A]">{s.label}</span>
                    <span className={`mt-3 rounded-full px-3.5 py-1.5 text-[12px] font-semibold ${s.chip}`}>{s.app}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="relative mt-12 flex flex-col items-center gap-3 border-t border-[#31465A]/8 pt-8 text-center sm:flex-row sm:justify-center sm:gap-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#2064B6] to-[#18B8D1]">
                <Ic n="heart" size={20} stroke="#fff" />
              </span>
              <p className="text-[15.5px] font-semibold text-[#31465A]">
                One journey. One connected patient relationship.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
