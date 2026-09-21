import Image from "next/image";

/* ---------- inline icons ---------- */

type IconProps = { stroke: string };

const mk = (stroke: string) =>
  ({
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke,
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  }) as const;

const StethoscopeIcon = ({ stroke }: IconProps) => (
  <svg {...mk(stroke)}>
    <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
    <path d="M8 15v1a6 6 0 0 0 6 6 6 6 0 0 0 6-6v-4" />
    <circle cx="20" cy="10" r="2" />
  </svg>
);

const ToothIcon = ({ stroke }: IconProps) => (
  <svg {...mk(stroke)}>
    <path d="M7 3c-2.5 0-4 2-4 4.5C3 11 4.5 21 6.5 21c1.5 0 1.5-3.5 2.5-5.5.7-1.4 1.3-1.5 3-1.5s2.3.1 3 1.5c1 2 1 5.5 2.5 5.5 2 0 3.5-10 3.5-13.5C21 5 19.5 3 17 3c-2 0-3 1.2-5 1.2S9 3 7 3z" />
  </svg>
);

const LotusIcon = ({ stroke }: IconProps) => (
  <svg {...mk(stroke)}>
    <path d="M12 20c-4 0-7-2.5-8-6 2 0 3.5.5 4.5 1.5C8 13 9 9 12 7c3 2 4 6 3.5 8.5 1-1 2.5-1.5 4.5-1.5-1 3.5-4 6-8 6z" />
    <path d="M2 17c1.5 2.5 4 4 6.5 4M22 17c-1.5 2.5-4 4-6.5 4" />
  </svg>
);

const HospitalIcon = ({ stroke }: IconProps) => (
  <svg {...mk(stroke)}>
    <rect x="4" y="3" width="16" height="18" rx="1" />
    <path d="M12 8v6M9 11h6" />
    <path d="M4 21h16" />
  </svg>
);

const FlaskIcon = ({ stroke }: IconProps) => (
  <svg {...mk(stroke)}>
    <path d="M9 3h6M10 3v6.3L4.7 18a2 2 0 0 0 1.8 3h11a2 2 0 0 0 1.8-3L14 9.3V3" />
    <path d="M7.5 14h9" />
  </svg>
);

const MapPinIcon = ({ stroke }: IconProps) => (
  <svg {...mk(stroke)}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

/* ---------- data ---------- */

const CARDS = [
  {
    img: "/healthcare/cards/clinics.jpg",
    alt: "Doctor's desk with stethoscope and laptop",
    icon: <StethoscopeIcon stroke="#2064B6" />,
    tile: "bg-[#E8F1FA]",
    title: "Medical clinics and specialty practices",
    desc: "Manage patients, appointments, providers, services, visits, follow-ups, and everyday practice activity.",
  },
  {
    img: "/healthcare/cards/dental.jpg",
    alt: "Modern dental practice treatment room",
    icon: <ToothIcon stroke="#18B8D1" />,
    tile: "bg-[#E5F8FB]",
    title: "Dental practices",
    desc: "Coordinate appointments, patient relationships, treatment-related activity, follow-ups, and billing.",
  },
  {
    img: "/healthcare/cards/aesthetics.jpg",
    alt: "Aesthetic wellness treatment in progress",
    icon: <LotusIcon stroke="#6DCCC3" />,
    tile: "bg-[#E7F7F5]",
    title: "Medical aesthetics and wellness",
    desc: "Manage enquiries, consultations, appointments, treatments, returning patients, and ongoing engagement.",
  },
  {
    img: "/healthcare/cards/hospitals.jpg",
    alt: "Bright hospital ward with beds",
    icon: <HospitalIcon stroke="#2064B6" />,
    tile: "bg-[#E8F1FA]",
    title: "Hospitals and healthcare networks",
    desc: "Manage patient enquiries, referrals, relationships, and follow-ups across departments, facilities, teams, and locations.",
  },
  {
    img: "/healthcare/cards/diagnostics.jpg",
    alt: "Diagnostic laboratory with analyzers",
    icon: <FlaskIcon stroke="#18B8D1" />,
    tile: "bg-[#E5F8FB]",
    title: "Diagnostic centers",
    desc: "Organize enquiries, referrals, patient communication, and follow-ups throughout the diagnostic journey.",
  },
  {
    img: "/healthcare/cards/multilocation.jpg",
    alt: "Medical center building exterior",
    icon: <MapPinIcon stroke="#6DCCC3" />,
    tile: "bg-[#E7F7F5]",
    title: "Multi-location healthcare organizations",
    desc: "Maintain consistent patient relationship and operational processes across clinics, specialties, teams, and locations.",
  },
];

/* ---------- section ---------- */

export function HealthcareCareSettings() {
  return (
    <section className="relative overflow-hidden bg-[#F1F5F7]">
      {/* soft decorative washes */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-[#C9EFEB]/50 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[#E8F1FA]/70 blur-3xl" />

      <div className="relative px-5 sm:px-6 lg:px-6">
        <div className="mx-auto max-w-[1300px] py-20 lg:py-24">
          {/* header */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-[680px]">
              <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#2064B6]">
                Industries and care settings
              </p>
              <h2 className="mt-4 font-[var(--font-display)] text-[36px] font-extrabold leading-[1.08] tracking-[-0.02em] text-[#31465A] sm:text-[48px]">
                Designed around the way healthcare works.
              </h2>
              <p className="mt-5 max-w-[720px] text-[15.5px] leading-[1.7] text-[#64748B]">
                From medical clinics and dental practices to hospitals,
                diagnostics, aesthetics, wellness, and specialty care, EVOQ
                supports the different operational and relationship needs of
                healthcare organizations.
              </p>
            </div>
            <div className="hidden shrink-0 border-l-2 border-[#E2E8EC] pl-6 pt-2 lg:block">
              <p className="max-w-[220px] text-[14px] leading-[1.6] text-[#64748B]">
                Different care settings.
                <br />
                A more connected experience.
              </p>
              <span className="mt-4 block h-[3px] w-9 rounded-full bg-[#2064B6]" />
            </div>
          </div>

          {/* cards */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CARDS.map((c) => (
              <article
                key={c.title}
                className="group flex flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_2px_16px_rgba(16,42,67,0.06)] ring-1 ring-[#E2E8EC] transition-all hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(16,42,67,0.12)]"
              >
                <div className="relative h-[180px] overflow-hidden">
                  <Image
                    src={c.img}
                    alt={c.alt}
                    fill
                    sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${c.tile}`}>
                    {c.icon}
                  </span>
                  <h3 className="mt-4 font-[var(--font-display)] text-[17px] font-bold leading-snug text-[#31465A]">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-[1.6] text-[#64748B]">
                    {c.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* footer row */}
          <div className="mt-12 border-t border-[#E2E8EC] pt-8">
            <p className="flex items-center gap-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#64748B]">
              <span className="hidden h-px w-14 bg-[#E2E8EC] sm:block" />
              Healthcare for what&apos;s next
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
