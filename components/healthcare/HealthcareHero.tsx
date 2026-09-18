import Image from "next/image";

/* ---------- small inline icons (teal stroke) ---------- */

const iconProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#0F766E",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const EnquiriesIcon = () => (
  <svg {...iconProps}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <path d="M8 9h8M8 12h5" />
  </svg>
);

const AppointmentsIcon = () => (
  <svg {...iconProps}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
    <path d="m9 16 2 2 4-4" />
  </svg>
);

const ProvidersIcon = () => (
  <svg {...iconProps}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const BillingIcon = () => (
  <svg {...iconProps}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M9 13h6M9 17h4" />
  </svg>
);

const EngagementIcon = () => (
  <svg {...iconProps}>
    <path d="M19 14c1.5-1.5 3-3.5 3-5.5A4.5 4.5 0 0 0 17.5 4c-1.8 0-3.4 1-4.5 2.5C11.9 5 10.3 4 8.5 4A4.5 4.5 0 0 0 4 8.5c0 2 1.5 4 3 5.5l4.5 4z" />
  </svg>
);

const OutcomesIcon = () => (
  <svg {...iconProps}>
    <path d="M3 3v18h18" />
    <path d="M7 14l4-4 3 3 5-6" />
  </svg>
);

const ClinicsIcon = () => (
  <svg {...iconProps}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const HospitalsIcon = () => (
  <svg {...iconProps}>
    <rect x="4" y="3" width="16" height="18" rx="1" />
    <path d="M12 8v6M9 11h6" />
    <path d="M4 21h16" />
  </svg>
);

const DentalIcon = () => (
  <svg {...iconProps}>
    <path d="M7 3c-2.5 0-4 2-4 4.5C3 11 4.5 21 6.5 21c1.5 0 1.5-3.5 2.5-5.5.7-1.4 1.3-1.5 3-1.5s2.3.1 3 1.5c1 2 1 5.5 2.5 5.5 2 0 3.5-10 3.5-13.5C21 5 19.5 3 17 3c-2 0-3 1.2-5 1.2S9 3 7 3z" />
  </svg>
);

const WellnessIcon = () => (
  <svg {...iconProps}>
    <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
    <path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z" />
  </svg>
);

/* ---------- data ---------- */

const FLOATING_CARDS = [
  { icon: <EnquiriesIcon />, title: "Enquiries", sub: "Capture and manage" },
  { icon: <AppointmentsIcon />, title: "Appointments", sub: "Schedule with ease" },
  { icon: <ProvidersIcon />, title: "Providers", sub: "Coordinate schedules" },
  { icon: <BillingIcon />, title: "Billing", sub: "Create and track payments" },
  { icon: <EngagementIcon />, title: "Patient engagement", sub: "Stay connected" },
  { icon: <OutcomesIcon />, title: "Better outcomes", sub: "Build lasting relationships" },
];

// x/y are % positions inside the hero (right half), delay staggers the float
const CARD_POSITIONS = [
  { x: 46, y: 14, delay: "0s" },
  { x: 45, y: 38, delay: "0.9s" },
  { x: 46, y: 62, delay: "1.7s" },
  { x: 77, y: 10, delay: "0.5s" },
  { x: 79, y: 34, delay: "1.3s" },
  { x: 77, y: 58, delay: "2.2s" },
];

const SEGMENTS = [
  { icon: <ClinicsIcon />, lines: ["Clinics and", "specialty practices"] },
  { icon: <HospitalsIcon />, lines: ["Hospitals and", "healthcare networks"] },
  { icon: <DentalIcon />, lines: ["Dental", "practices"] },
  { icon: <WellnessIcon />, lines: ["Aesthetics,", "wellness and more"] },
];

/* ---------- hero ---------- */

export function HealthcareHero() {
  return (
    <section
      id="overview"
      className="relative overflow-hidden"
      style={{ background: "#F4FBFA" }}
    >
      <style>{`
        @keyframes hcFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-9px); }
        }
        .hc-card { animation: hcFloat 5.2s ease-in-out infinite; }
      `}</style>

      {/* Background photo, right-weighted with soft fade into healthcare pale */}
      <div className="absolute inset-0">
        <Image
          src="/healthcare/hero-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #F4FBFA 0%, rgba(244,251,250,0.97) 28%, rgba(244,251,250,0.75) 45%, rgba(244,251,250,0.15) 68%, rgba(244,251,250,0) 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[140px]"
          style={{
            background:
              "linear-gradient(180deg, rgba(244,251,250,0) 0%, #F4FBFA 100%)",
          }}
        />
      </div>

      {/* Floating capability cards */}
      {FLOATING_CARDS.map((card, i) => (
        <div
          key={card.title}
          className="hc-card absolute z-[5] hidden w-[168px] rounded-2xl bg-white/95 p-3.5 shadow-[0_18px_40px_-18px_rgba(16,42,67,0.35),0_2px_6px_rgba(16,42,67,0.06)] lg:block"
          style={{
            left: `${CARD_POSITIONS[i].x}%`,
            top: `${CARD_POSITIONS[i].y}%`,
            animationDelay: CARD_POSITIONS[i].delay,
          }}
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-[#DDF5F0]">
              {card.icon}
            </span>
            <span className="text-[13px] font-bold leading-tight text-[#102A43]">
              {card.title}
            </span>
          </div>
          <p className="mt-1.5 text-[11.5px] leading-snug text-[#102A43]/55">
            {card.sub}
          </p>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 px-5 sm:px-8 lg:px-20">
        <div className="mx-auto max-w-[1168px] pb-16 pt-[72px] lg:pt-[96px]">
        <div className="max-w-[560px]">
          <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#0F766E]">
            Healthcare Solutions
          </p>
          <h1 className="mt-4 font-[var(--font-display)] text-[44px] font-extrabold leading-[1.06] tracking-[-0.02em] text-[#102A43] sm:text-[56px]">
            Manage healthcare operations. Grow patient relationships.
          </h1>
          <p className="mt-5 text-[17px] leading-[1.65] text-[#102A43]/65">
            Manage patients, appointments, providers, billing, and everyday
            operations while keeping every patient interaction in context.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <a
              href="#demo"
              className="inline-flex items-center gap-3 rounded-full bg-[#1777F0] py-3.5 pl-6 pr-4 text-[15px] font-semibold text-white no-underline shadow-[0_12px_28px_-10px_rgba(23,119,240,0.55)] transition-all hover:-translate-y-px hover:bg-[#0F66D8]"
            >
              Get a demo
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </a>
            <a
              href="#expert"
              className="inline-flex items-center gap-2.5 rounded-full border border-[#102A43]/15 bg-white/80 py-3.5 px-6 text-[15px] font-semibold text-[#102A43] no-underline backdrop-blur transition-all hover:-translate-y-px hover:border-[#0F766E]/40 hover:text-[#0F766E]"
            >
              Talk to an expert
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>

        {/* Segment strip */}
        <div className="mt-[88px] border-t border-[#102A43]/8 pt-8">
          <div className="grid grid-cols-2 gap-x-6 gap-y-7 md:grid-cols-4">
            {SEGMENTS.map((s) => (
              <div key={s.lines[0]} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#DDF5F0]">
                  {s.icon}
                </span>
                <span className="text-[13.5px] font-semibold leading-[1.35] text-[#102A43]/80">
                  {s.lines[0]}
                  <br />
                  {s.lines[1]}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-9 flex items-center gap-4">
            <span className="h-[3px] w-10 rounded-full bg-[#2CB6A5]" />
            <span className="text-[14px] font-medium italic text-[#102A43]/50">
              A more connected healthcare experience.
            </span>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
