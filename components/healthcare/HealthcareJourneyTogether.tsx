import Image from "next/image";

/* ---------- icons ---------- */

const PATHS = {
  users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  cal: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM9 16l2 2 4-4",
  heart: "M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 22l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z",
  bars: "M6 20V10M12 20V4M18 20v-7",
  trend: "M7 17 17 7M9 7h8v8",
  arrow: "M5 12h14M13 6l6 6-6 6",
  megaphone: "m3 11 18-5v12L3 14v-3zM11.6 16.8a3 3 0 1 1-5.8-1.6",
} as const;

function Ic({ n, size = 20, stroke = "#2064B6" }: { n: keyof typeof PATHS; size?: number; stroke?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={PATHS[n]} />
    </svg>
  );
}

/* ---------- mini UI cards laid over each photo ---------- */

const FLOAT = "absolute rounded-2xl bg-white/94 shadow-[0_22px_50px_-22px_rgba(49,70,90,0.5)] ring-1 ring-white/60 backdrop-blur-sm";

function CrmVisual() {
  const rows = [
    { i: "OC", n: "Olivia Carter", s: "Follow-up", pill: "bg-[#E7F7F5] text-[#2F8A7F]", av: "bg-[#E8F1FA] text-[#2064B6]" },
    { i: "LB", n: "Liam Brooks", s: "Consultation", pill: "bg-[#E5F8FB] text-[#0E8FA5]", av: "bg-[#E7F7F5] text-[#2F8A7F]" },
  ];
  return (
    <div className={`${FLOAT} bottom-3.5 left-3.5 w-[62%] p-3`}>
      <div className="flex items-center justify-between">
        <p className="text-[11.5px] font-bold text-[#31465A]">Patients</p>
        <span className="rounded-full bg-[#2064B6] px-2 py-[3px] text-[9px] font-semibold text-white">+ Add</span>
      </div>
      <ul className="mt-2 flex flex-col gap-1.5">
        {rows.map((r) => (
          <li key={r.n} className="flex items-center gap-2">
            <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[8.5px] font-bold ${r.av}`}>{r.i}</span>
            <span className="min-w-0 flex-1 truncate text-[10.5px] font-semibold text-[#31465A]">{r.n}</span>
            <span className={`shrink-0 rounded-md px-1.5 py-0.5 text-[8.5px] font-semibold ${r.pill}`}>{r.s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PmVisual() {
  const rows = [
    { t: "9:00 AM", n: "Sarah Mitchell", s: "Consultation", pill: "bg-[#E8F1FA] text-[#2064B6]" },
    { t: "10:30 AM", n: "James Carter", s: "Treatment", pill: "bg-[#E7F7F5] text-[#2F8A7F]" },
  ];
  return (
    <div className={`${FLOAT} right-3.5 top-3.5 w-[62%] p-3`}>
      <div className="flex items-center justify-between">
        <p className="text-[11.5px] font-bold text-[#31465A]">Today</p>
        <span className="text-[9.5px] text-[#64748B]">Tue, Sep 16</span>
      </div>
      <ul className="mt-2 flex flex-col gap-1.5">
        {rows.map((r) => (
          <li key={r.t} className="grid grid-cols-[46px_1fr_auto] items-center gap-1.5">
            <span className="text-[9.5px] text-[#64748B]">{r.t}</span>
            <span className="min-w-0 truncate text-[10.5px] font-semibold text-[#31465A]">{r.n}</span>
            <span className={`shrink-0 rounded-md px-1.5 py-0.5 text-[8.5px] font-semibold ${r.pill}`}>{r.s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PeVisual() {
  return (
    <div className={`${FLOAT} bottom-3.5 right-3.5 w-[66%] p-3`}>
      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FDEAF3]">
          <Ic n="megaphone" size={12} stroke="#C2477F" />
        </span>
        <p className="min-w-0 flex-1 truncate text-[11px] font-bold text-[#31465A]">Wellness follow-up</p>
        <span className="shrink-0 rounded-md bg-[#E7F7F5] px-1.5 py-0.5 text-[8.5px] font-semibold text-[#2F8A7F]">SMS</span>
      </div>
      <p className="mt-2 rounded-xl rounded-tl-sm bg-[#F1F5F7] p-2 text-[10px] leading-[1.45] text-[#31465A]">
        Hi Sarah, it&apos;s time for your follow-up appointment.
      </p>
      <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#2064B6] px-3 py-1 text-[9.5px] font-semibold text-white">
        Book now <Ic n="arrow" size={10} stroke="#fff" />
      </span>
    </div>
  );
}

const CARDS = [
  {
    photo: "/healthcare/stock/hc-card-crm-2.jpg",
    pos: "50% 30%",
    alt: "Doctor speaking with a patient",
    id: "healthcare-crm",
    title: "Patient Relationships",
    desc: "Manage enquiries, referrals, patient interactions, and follow-ups throughout the relationship.",
    powered: ["Powered by EVOQ CRM"],
    link: "Explore Patient Relationships",
    href: "/solutions/healthcare/crm",
    tint: "bg-[#E8F1FA]",
    visual: <CrmVisual />,
  },
  {
    photo: "/healthcare/stock/hc-card-pm-2.jpg",
    pos: "60% 40%",
    alt: "Receptionist welcoming a patient",
    id: "practice-management",
    title: "Practice Management",
    desc: "Coordinate appointments, providers, services, visits, and everyday practice operations.",
    powered: ["Powered by Practice Management"],
    link: "Explore Practice Management",
    href: "/solutions/healthcare/practice-management",
    tint: "bg-[#E5F8FB]",
    visual: <PmVisual />,
  },
  {
    photo: "/healthcare/stock/hc-card-pe.jpg",
    pos: "70% 40%",
    alt: "Patient using her phone",
    id: "patient-engagement",
    title: "Patient Engagement",
    desc: "Keep patients informed, understand their experience, and encourage ongoing relationships.",
    powered: ["Campaigns", "Surveys", "Loyalty"],
    link: "Explore patient engagement",
    href: "/solutions/healthcare/patient-engagement",
    tint: "bg-[#E7F7F5]",
    visual: <PeVisual />,
  },
];

const BENEFITS = [
  { icon: "users", tile: "bg-[#E8F1FA]", stroke: "#2064B6", l1: "Clear patient history", l2: "for providers." },
  { icon: "bars", tile: "bg-[#E7F7F5]", stroke: "#3FA99B", l1: "Organized schedules", l2: "for the front desk." },
  { icon: "trend", tile: "bg-[#E5F8FB]", stroke: "#18B8D1", l1: "Stronger relationships", l2: "for long-term care." },
] as const;

/* ---------- section ---------- */

export function HealthcareJourneyTogether() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-[#E5F8FB] blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[#E7F7F5]/70 blur-3xl" />

      <div className="relative px-5 sm:px-6 lg:px-6">
        <div className="mx-auto max-w-[1300px] py-20 lg:py-24">
          {/* header */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-[720px]">
              <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#18B8D1]">A complete care journey</p>
              <h2 className="mt-4 font-[var(--font-display)] text-[38px] font-extrabold leading-[1.08] tracking-[-0.02em] text-[#31465A]">
                Patient relationships, practice operations and engagement in one place.
              </h2>
              <p className="mt-5 text-[16.5px] leading-[1.7] text-[#64748B]">
                Patient records, schedules, bookings, billing and communication share one patient history.
              </p>
            </div>
            <div className="hidden shrink-0 items-center gap-6 lg:flex">
              <div className="border-l-2 border-[#31465A]/10 pl-6 pt-1">
                <p className="max-w-[200px] text-[14px] font-semibold leading-[1.55] text-[#31465A]">
                  One patient history across every team.
                </p>
                <span className="mt-4 block h-[3px] w-9 rounded-full bg-[#18B8D1]" />
              </div>
              <div className="relative">
                <Image src="/healthcare/stock/hc-header-circle.jpg" alt="Senior patient speaking with a doctor" width={1400} height={933} className="h-[176px] w-[176px] rounded-full object-cover object-[45%_40%] ring-4 ring-[#E5F8FB]" />
                <div className="absolute -bottom-3 -left-24 flex w-[230px] items-center gap-2.5 rounded-2xl bg-white p-3 shadow-[0_16px_40px_-12px_rgba(49,70,90,0.25)] ring-1 ring-[#31465A]/5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E7F7F5]">
                    <Ic n="users" size={15} stroke="#2F8A7F" />
                  </span>
                  <p className="text-[11px] font-semibold leading-[1.4] text-[#31465A]">Follow-ups and appointments visible to every team member.</p>
                </div>
              </div>
            </div>
          </div>

          {/* cards */}
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {CARDS.map((c) => (
              <article
                key={c.title}
                id={c.id}
                className="group flex scroll-mt-24 flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_2px_16px_rgba(49,70,90,0.06)] ring-1 ring-[#31465A]/6 transition-all hover:-translate-y-1 hover:shadow-[0_24px_50px_-20px_rgba(49,70,90,0.28)]"
              >
                <div className={`relative h-[300px] overflow-hidden ${c.tint}`}>
                  <Image src={c.photo} alt={c.alt} fill sizes="(min-width: 768px) 420px, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" style={{ objectPosition: c.pos }} />
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#31465A]/25 to-transparent" />
                  {c.visual}
                </div>
                <div className="flex flex-1 flex-col px-6 pb-6 pt-6">
                  <h3 className="font-[var(--font-display)] text-[24px] font-bold leading-snug text-[#31465A]">{c.title}</h3>
                  <p className="mt-3 text-[14px] leading-[1.65] text-[#64748B]">{c.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {c.powered.map((t) => (
                      <span key={t} className="rounded-full bg-[#F1F5F7] px-2.5 py-1 text-[11.5px] font-semibold text-[#31465A]">{t}</span>
                    ))}
                  </div>
                  <a href={c.href} className="mt-auto inline-flex items-center gap-2 pt-5 text-[14px] font-semibold text-[#2064B6] no-underline transition-colors hover:text-[#185596]">
                    {c.link}
                    <Ic n="arrow" size={15} stroke="currentColor" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* connector flourish */}
          <div className="mt-2 hidden flex-col items-center lg:flex">
            <div className="grid w-full grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex justify-center">
                  <span className="h-10 w-px bg-[#31465A]/15" />
                </div>
              ))}
            </div>
            <span className="-mt-px block h-px w-2/3 bg-[#31465A]/15" />
            <span className="h-6 w-px bg-[#31465A]/15" />
            <span className="mt-3 inline-flex items-center gap-3 rounded-full bg-[#F1F5F7] px-5 py-2.5 ring-1 ring-[#31465A]/8">
              <span className="text-[12.5px] font-semibold text-[#31465A]/75">A more connected patient experience.</span>
            </span>
          </div>

          {/* supporting group: smaller than the three main cards */}
          <div className="mt-10 flex flex-col gap-5 rounded-[20px] bg-[#F1F5F7] px-6 py-5 ring-1 ring-[#31465A]/8 md:flex-row md:items-center md:justify-between md:gap-8">
            <div className="flex items-start gap-4">
              <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-white ring-1 ring-[#31465A]/8">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2064B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path d="M3 10h18M8 3v4M16 3v4M7 15h4" />
                </svg>
              </span>
              <div>
                <h3 className="font-[var(--font-display)] text-[19px] font-bold leading-snug text-[#31465A]">Patient Access &amp; Payments</h3>
                <p className="mt-1 text-[14px] font-semibold text-[#31465A]">Make appointments and payments easier to manage.</p>
                <p className="mt-1.5 max-w-[680px] text-[13.5px] leading-[1.65] text-[#64748B]">
                  Support key steps in the patient journey with EVOQ Booking and Billing. Help patients book appointments while giving practices tools to manage billing and payment processes associated with their services.
                </p>
              </div>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              {["Booking Engine", "Billing"].map((t) => (
                <span key={t} className="rounded-full bg-white px-3.5 py-1.5 text-[12.5px] font-semibold text-[#31465A] ring-1 ring-[#31465A]/10">{t}</span>
              ))}
            </div>
          </div>

          {/* benefits */}
          <div className="mx-auto mt-12 grid max-w-[1000px] gap-8 sm:grid-cols-3 sm:divide-x sm:divide-[#31465A]/8">
            {BENEFITS.map((b) => (
              <div key={b.l1} className="flex items-center gap-4 sm:justify-center">
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${b.tile}`}>
                  <Ic n={b.icon} size={20} stroke={b.stroke} />
                </span>
                <p className="text-[14.5px] font-bold leading-[1.45] text-[#31465A]">
                  {b.l1}
                  <br />
                  {b.l2}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
