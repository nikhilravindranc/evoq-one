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

const FLOAT = "absolute rounded-2xl bg-white shadow-[0_22px_50px_-22px_rgba(49,70,90,0.45)] ring-1 ring-[#31465A]/5";

function CrmVisual() {
  const rows = [
    { i: "OC", n: "Olivia Carter", s: "Follow-up", pill: "bg-[#E7F7F5] text-[#2F8A7F]", av: "bg-[#E8F1FA] text-[#2064B6]" },
    { i: "LB", n: "Liam Brooks", s: "Consultation", pill: "bg-[#E5F8FB] text-[#0E8FA5]", av: "bg-[#E7F7F5] text-[#2F8A7F]" },
    { i: "NP", n: "Noah Patel", s: "New enquiry", pill: "bg-[#E8F1FA] text-[#2064B6]", av: "bg-[#E5F8FB] text-[#0E8FA5]" },
  ];
  return (
    <div className={`${FLOAT} bottom-4 left-4 right-4 p-3.5 sm:right-auto sm:w-[78%]`}>
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-bold text-[#31465A]">Patients</p>
        <span className="rounded-full bg-[#2064B6] px-2.5 py-1 text-[9.5px] font-semibold text-white">+ Add patient</span>
      </div>
      <ul className="mt-2.5 flex flex-col gap-2">
        {rows.map((r) => (
          <li key={r.n} className="flex items-center gap-2.5">
            <span className={`flex h-7 w-7 items-center justify-center rounded-full text-[9.5px] font-bold ${r.av}`}>{r.i}</span>
            <span className="flex-1 text-[11.5px] font-semibold text-[#31465A]">{r.n}</span>
            <span className={`rounded-md px-2 py-1 text-[9.5px] font-semibold ${r.pill}`}>{r.s}</span>
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
    { t: "12:00 PM", n: "Priya Sharma", s: "Follow-up", pill: "bg-[#E5F8FB] text-[#0E8FA5]" },
  ];
  return (
    <div className={`${FLOAT} left-4 right-4 top-4 p-3.5 sm:left-auto sm:w-[78%]`}>
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-bold text-[#31465A]">Today</p>
        <span className="text-[10px] text-[#64748B]">Tue, Sep 16</span>
      </div>
      <ul className="mt-2.5 flex flex-col gap-2">
        {rows.map((r) => (
          <li key={r.t} className="grid grid-cols-[52px_1fr_auto] items-center gap-2">
            <span className="text-[10px] text-[#64748B]">{r.t}</span>
            <span className="text-[11.5px] font-semibold text-[#31465A]">{r.n}</span>
            <span className={`rounded-md px-2 py-1 text-[9.5px] font-semibold ${r.pill}`}>{r.s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PeVisual() {
  return (
    <div className={`${FLOAT} bottom-4 left-4 right-4 p-3.5 sm:right-auto sm:w-[80%]`}>
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FDEAF3]">
          <Ic n="megaphone" size={14} stroke="#C2477F" />
        </span>
        <p className="text-[12px] font-bold text-[#31465A]">Wellness follow-up</p>
        <span className="ml-auto rounded-md bg-[#E7F7F5] px-2 py-1 text-[9.5px] font-semibold text-[#2F8A7F]">SMS</span>
      </div>
      <p className="mt-2.5 rounded-xl rounded-tl-sm bg-[#F1F5F7] p-2.5 text-[11px] leading-[1.5] text-[#31465A]">
        Hi Sarah, it&apos;s time for your follow-up appointment. Book your visit in a few taps.
      </p>
      <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-[#2064B6] px-3.5 py-1.5 text-[10.5px] font-semibold text-white">
        Book now <Ic n="arrow" size={11} stroke="#fff" />
      </span>
    </div>
  );
}

const CARDS = [
  {
    photo: "/healthcare/stock/hc-card-crm-2.jpg",
    pos: "50% 30%",
    alt: "Doctor speaking with a patient",
    title: "Healthcare CRM",
    desc: "Manage enquiries, patient information, interactions, relationships, and follow-ups throughout the patient journey.",
    link: "Explore Healthcare CRM",
    href: "/healthcare/crm",
    tint: "bg-[#E8F1FA]",
    visual: <CrmVisual />,
  },
  {
    photo: "/healthcare/stock/hc-card-pm-2.jpg",
    pos: "60% 40%",
    alt: "Receptionist welcoming a patient",
    title: "Healthcare Practice Management",
    desc: "Manage patients, appointments, providers, schedules, services, visits, and everyday practice operations.",
    link: "Explore Healthcare Practice Management",
    href: "/healthcare/practice-management",
    tint: "bg-[#E5F8FB]",
    visual: <PmVisual />,
  },
  {
    photo: "/healthcare/stock/hc-card-pe.jpg",
    pos: "70% 40%",
    alt: "Patient using her phone",
    title: "Patient Engagement",
    desc: "Extend the patient experience with booking, billing, campaigns, feedback, and loyalty.",
    link: "Explore patient journey",
    href: "#patient-engagement",
    tint: "bg-[#E7F7F5]",
    visual: <PeVisual />,
  },
];

const BENEFITS = [
  { icon: "users", tile: "bg-[#E8F1FA]", stroke: "#2064B6", l1: "Better experiences", l2: "for your patients." },
  { icon: "bars", tile: "bg-[#E7F7F5]", stroke: "#3FA99B", l1: "More efficient", l2: "operations for your team." },
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
              <h2 className="mt-4 font-[var(--font-display)] text-[36px] font-extrabold leading-[1.08] tracking-[-0.02em] text-[#31465A] sm:text-[48px]">
                Bring every part of the healthcare journey together.
              </h2>
              <p className="mt-5 text-[16.5px] leading-[1.7] text-[#64748B]">
                Combine patient relationships, practice operations, booking, billing, and engagement so information can
                move with the patient journey.
              </p>
            </div>
            <div className="hidden shrink-0 items-center gap-6 lg:flex">
              <div className="border-l-2 border-[#31465A]/10 pl-6 pt-1">
                <p className="max-w-[200px] text-[14px] font-semibold leading-[1.55] text-[#31465A]">
                  Patients move forward when everything works together.
                </p>
                <span className="mt-4 block h-[3px] w-9 rounded-full bg-[#18B8D1]" />
              </div>
              <div className="relative">
                <Image src="/healthcare/stock/hc-header-circle.jpg" alt="Senior patient speaking with a doctor" width={1400} height={933} className="h-[176px] w-[176px] rounded-full object-cover object-[45%_40%] ring-4 ring-[#E5F8FB]" />
                <div className="absolute -bottom-3 -left-24 flex w-[230px] items-center gap-2.5 rounded-2xl bg-white p-3 shadow-[0_16px_40px_-12px_rgba(49,70,90,0.25)] ring-1 ring-[#31465A]/5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E7F7F5]">
                    <Ic n="users" size={15} stroke="#2F8A7F" />
                  </span>
                  <p className="text-[11px] font-semibold leading-[1.4] text-[#31465A]">Stronger relationships lead to healthier outcomes.</p>
                </div>
              </div>
            </div>
          </div>

          {/* cards */}
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {CARDS.map((c) => (
              <article
                key={c.title}
                className="group flex flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_2px_16px_rgba(49,70,90,0.06)] ring-1 ring-[#31465A]/6 transition-all hover:-translate-y-1 hover:shadow-[0_24px_50px_-20px_rgba(49,70,90,0.28)]"
              >
                <div className={`relative h-[250px] overflow-hidden ${c.tint}`}>
                  <Image src={c.photo} alt={c.alt} fill sizes="(min-width: 768px) 420px, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" style={{ objectPosition: c.pos }} />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#31465A]/35 to-transparent" />
                  {c.visual}
                </div>
                <div className="flex flex-1 flex-col px-6 pb-6 pt-6">
                  <h3 className="font-[var(--font-display)] text-[19px] font-bold leading-snug text-[#31465A]">{c.title}</h3>
                  <p className="mt-3 text-[14px] leading-[1.65] text-[#64748B]">{c.desc}</p>
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
