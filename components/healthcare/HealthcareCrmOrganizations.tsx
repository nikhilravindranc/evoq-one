import Image from "next/image";
import { Caveat } from "next/font/google";

const script = Caveat({ subsets: ["latin"], weight: ["600"] });

type IP = { size?: number; stroke?: string };
const I = ({ size = 28, stroke = "#2064B6", children }: IP & { children: React.ReactNode }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const HospitalIcon = () => (
  <I>
    <rect x="4" y="3" width="16" height="18" rx="1.5" />
    <path d="M12 8v6M9 11h6M9 21v-3h6v3" />
  </I>
);
const StethIcon = () => (
  <I stroke="#18B8D1">
    <path d="M6 3v6a4 4 0 0 0 8 0V3M10 13v2a5 5 0 0 0 10 0v-1" />
    <circle cx="20" cy="12" r="2" />
  </I>
);
const ToothIcon = () => (
  <I>
    <path d="M7 3c-2.5 0-4 2-4 4.5C3 11 4.5 21 6.5 21c1.5 0 1.5-3.5 2.5-5.5.7-1.4 1.3-1.5 3-1.5s2.3.1 3 1.5c1 2 1 5.5 2.5 5.5 2 0 3.5-10 3.5-13.5C21 5 19.5 3 17 3c-2 0-3 1.2-5 1.2S9 3 7 3z" />
  </I>
);
const LotusIcon = () => (
  <I stroke="#18B8D1">
    <path d="M12 20c-3-1-6-4-6-8 3 0 5 1.5 6 4 1-2.5 3-4 6-4 0 4-3 7-6 8zM12 16c-2-2-2-6 0-10 2 4 2 8 0 10zM3 12c0 3 2 6 5 7M21 12c0 3-2 6-5 7" />
  </I>
);
const FlaskIcon = () => (
  <I>
    <path d="M9 3h6M10 3v6l-5.5 9.5A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-2.5L14 9V3M7.5 15h9" />
  </I>
);
const PinIcon = ({ size = 28, stroke = "#2064B6" }: IP) => (
  <I size={size} stroke={stroke}>
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </I>
);
const UsersIcon = ({ size = 28, stroke = "#2064B6" }: IP) => (
  <I size={size} stroke={stroke}>
    <circle cx="12" cy="7" r="3" />
    <circle cx="5" cy="9" r="2.2" />
    <circle cx="19" cy="9" r="2.2" />
    <path d="M7 20v-2a5 5 0 0 1 10 0v2M1.5 18v-1a3.5 3.5 0 0 1 4-3.4M22.5 18v-1a3.5 3.5 0 0 0-4-3.4" />
  </I>
);
const BarsIcon = () => (
  <I size={20} stroke="#18B8D1">
    <path d="M6 20V10M12 20V4M18 20v-7" />
  </I>
);
const ArrowRight = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const ORG_FILE: Record<string, string> = {
  hospitals: "org-hospital-building",
  clinics: "org-clinic-doctor",
  dental: "org-dental",
  aesthetics: "org-aesthetics-facial",
  diagnostics: "org-diagnostics",
};

const ORG_POS: Record<string, string> = {
  hospitals: "50% 65%",
  clinics: "50% 30%",
  dental: "50% 30%",
  aesthetics: "50% 45%",
  diagnostics: "50% 60%",
};

type Org = {
  title: string[];
  desc: string;
  includes?: string;
  icon: React.ReactNode;
  tile: string;
  bg: string;
  photo?: string;
  alt?: string;
};

const ORGS: Org[] = [
  {
    title: ["Hospitals and", "healthcare networks"],
    desc: "Connect patient enquiries, referrals, relationships, and follow-ups across departments, teams, facilities, and locations.",
    icon: <HospitalIcon />,
    tile: "bg-[#E8F1FA]",
    bg: "bg-white",
    photo: "hospitals",
    alt: "Hospital building",
  },
  {
    title: ["Medical clinics and", "specialty practices"],
    desc: "Manage enquiries, patient relationships, appointments, consultations, and follow-ups across general and specialized medical services.",
    includes: "Medical clinics, Dermatology, Ophthalmology, Physiotherapy, and other specialty practices.",
    icon: <StethIcon />,
    tile: "bg-[#E1F6F3]",
    bg: "bg-gradient-to-br from-[#EAF8F6] via-white to-white",
    photo: "clinics",
    alt: "Clinician at a specialty practice",
  },
  {
    title: ["Dental clinics"],
    desc: "Manage patient enquiries, appointments, treatment-related follow-ups, and ongoing patient relationships from one connected workspace.",
    icon: <ToothIcon />,
    tile: "bg-[#E8F1FA]",
    bg: "bg-white",
    photo: "dental",
    alt: "Dental treatment room",
  },
  {
    title: ["Medical aesthetics", "and wellness"],
    desc: "Manage enquiries, consultations, bookings, follow-ups, and returning patients across aesthetics, wellness, and related services.",
    includes: "Medical aesthetics, Wellness clinics, skincare clinics, and similar patient-focused practices.",
    icon: <LotusIcon />,
    tile: "bg-[#E1F6F3]",
    bg: "bg-gradient-to-br from-[#FDF1EE] via-white to-white",
    photo: "aesthetics",
    alt: "Aesthetics treatment room",
  },
  {
    title: ["Diagnostic centers"],
    desc: "Manage enquiries, referrals, patient communication, and follow-ups across the diagnostic journey.",
    icon: <FlaskIcon />,
    tile: "bg-[#E8F1FA]",
    bg: "bg-white",
    photo: "diagnostics",
    alt: "Diagnostic laboratory",
  },
  {
    title: ["Multi-location", "healthcare organizations"],
    desc: "Maintain consistent patient relationship processes across multiple clinics, specialties, teams, and locations.",
    icon: <PinIcon />,
    tile: "bg-[#E8F1FA]",
    bg: "bg-white",
  },
];

const DOTS = {
  backgroundImage: "radial-gradient(#9CC7E6 1.2px, transparent 1.4px)",
  backgroundSize: "9px 9px",
};

function MapPanel() {
  const pins = [
    { l: "58%", t: "10%" },
    { l: "36%", t: "34%" },
    { l: "72%", t: "40%" },
    { l: "12%", t: "62%" },
  ];
  return (
    <div className="absolute inset-y-3 right-3 hidden w-[44%] overflow-hidden rounded-l-[70px] rounded-r-2xl bg-[#EAF3FB] sm:block">
      <div className="absolute inset-0 opacity-60" style={{ ...DOTS, WebkitMaskImage: "radial-gradient(ellipse at 60% 45%, #000 30%, transparent 75%)", maskImage: "radial-gradient(ellipse at 60% 45%, #000 30%, transparent 75%)" }} />
      {pins.map((p) => (
        <span key={p.l} className="absolute" style={{ left: p.l, top: p.t }}>
          <PinIcon size={26} />
        </span>
      ))}
      <div className="absolute bottom-6 right-2 flex items-center gap-2.5 rounded-xl bg-white px-3 py-2.5 shadow-[0_16px_36px_-18px_rgba(16,42,67,0.35)]">
        <BarsIcon />
        <span>
          <span className="block text-[10.5px] font-bold text-[#102A43]">Multiple locations</span>
          <span className="block text-[10px] text-[#31465A]/60">One connected view</span>
        </span>
      </div>
    </div>
  );
}

export function HealthcareCrmOrganizations() {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      <div className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-[#E3F2FA] blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-40 h-[380px] w-[380px] rounded-full bg-[#E1F6F3]/70 blur-3xl" />

      <div className="relative px-5 sm:px-6 lg:px-6">
        <div className="mx-auto max-w-[1300px] py-16 lg:py-20">
          {/* header */}
          <div className="relative lg:min-h-[290px]">
            <div className="max-w-[600px]">
              <p className="text-[12px] font-bold uppercase tracking-[0.28em] text-[#18A0B8]">
                Across specialties. At every scale.
              </p>
              <h2 className="mt-4 font-[var(--font-display)] text-[38px] font-extrabold leading-[1.05] tracking-[-0.025em] text-[#102A43]">
                Built for the way healthcare organizations work.
              </h2>
              <p className="mt-6 text-[16px] leading-[1.6] text-[#31465A]/75">
                Healthcare organizations differ in size, specialty, structure, and patient journey. EVOQ Healthcare
                CRM provides a flexible relationship-management foundation that can be configured around your teams,
                workflows, information, and follow-up processes.
              </p>
            </div>

            <div className="pointer-events-none absolute right-[490px] top-2 z-10 hidden -rotate-[10deg] xl:block">
              <p className={`${script.className} text-[27px] leading-[1.02] text-[#18B8D1]`}>
                {["Different", "organizations.", "A common goal.", "Better patient", "relationships."].map((l, i) => (
                  <span key={l} className="block" style={{ marginLeft: i * 6 }}>
                    {l}
                  </span>
                ))}
              </p>
              <svg width="130" height="12" viewBox="0 0 110 14" fill="none" className="mt-1">
                <path d="M2 11C30 6 70 3 108 2" stroke="#18B8D1" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>

            <div className="absolute right-0 top-[-40px] hidden h-[330px] w-[470px] lg:block">
              <div className="absolute -left-24 top-8 h-[300px] w-[300px] rounded-full bg-[#D7EEF8]/80 blur-[2px]" />
              <Image
                src="/healthcare/stock/org-team.jpg"
                alt="Doctor and nurse reviewing a patient record"
                width={1400}
                height={933}
                priority={false}
                className="absolute bottom-0 left-0 h-auto w-[400px] rounded-t-[140px]"
                style={{ maskImage: "linear-gradient(180deg, #000 80%, transparent 100%)", WebkitMaskImage: "linear-gradient(180deg, #000 80%, transparent 100%)" }}
              />
              <div className="absolute -right-2 top-[118px] flex w-[108px] flex-col items-center rounded-2xl bg-white px-3 py-4 text-center shadow-[0_18px_40px_-20px_rgba(16,42,67,0.35)]">
                <UsersIcon size={30} />
                <span className="mt-2 text-[12.5px] font-bold text-[#102A43]">Patients</span>
                <span className="text-[10.5px] text-[#31465A]/60">at the center</span>
              </div>
            </div>
          </div>

          {/* cards */}
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {ORGS.map((o) => (
              <article
                key={o.title[0]}
                className={`relative flex min-h-[270px] overflow-hidden rounded-[22px] ${o.bg} shadow-[0_18px_44px_-30px_rgba(16,42,67,0.3)] ring-1 ring-[#31465A]/6 transition-all hover:-translate-y-1 hover:shadow-[0_24px_52px_-28px_rgba(16,42,67,0.36)]`}
              >
                <div className="relative z-10 flex w-full flex-col px-6 py-6 sm:w-[58%]">
                  <div className="flex items-center gap-4">
                    <span className={`flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full ${o.tile}`}>{o.icon}</span>
                    <h3 className="text-[24px] font-bold leading-[1.25] text-[#102A43]">
                      {o.title[0]}
                      {o.title[1] && (
                        <>
                          <br />
                          {o.title[1]}
                        </>
                      )}
                    </h3>
                  </div>
                  <p className="mt-4 text-[13.5px] leading-[1.5] text-[#31465A]/70">{o.desc}</p>
                  {o.includes && (
                    <p className="mt-2 text-[11.5px] leading-[1.45] text-[#31465A]/60">
                      <span className="font-semibold text-[#31465A]/75">Includes:</span> {o.includes}
                    </p>
                  )}
                  <span className="mt-auto pt-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F1FA] text-[#2064B6]">
                      <ArrowRight />
                    </span>
                  </span>
                </div>

                {o.photo ? (
                  <div className="absolute inset-y-3 right-3 hidden w-[44%] overflow-hidden rounded-l-[70px] rounded-r-2xl sm:block">
                    <Image
                      src={`/healthcare/stock/${ORG_FILE[o.photo as string]}.jpg`}
                      alt={o.alt ?? ""}
                      fill
                      sizes="(min-width: 1280px) 190px, 240px"
                      className="object-cover"
                      style={{ objectPosition: ORG_POS[o.photo as string] }}
                    />
                  </div>
                ) : (
                  <MapPanel />
                )}
              </article>
            ))}
          </div>

          {/* banner */}
          <div className="mt-6 flex flex-col gap-5 rounded-[22px] bg-gradient-to-r from-[#EEF4FB] via-[#F1F8FC] to-[#E9F5F7] px-6 py-6 ring-1 ring-[#31465A]/6 sm:px-9 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5">
              <span className="flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full bg-[#DFEBF8]">
                <UsersIcon size={30} />
              </span>
              <div>
                <p className="text-[17px] font-bold leading-[1.3] text-[#102A43]">
                  Healthcare moves forward when people, information and care are aligned.
                </p>
                <p className="mt-1 text-[14px] text-[#31465A]/65">
                  EVOQ Healthcare CRM helps you keep every patient relationship on track.
                </p>
              </div>
            </div>
            <a
              href="#expert"
              className="inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-[#2064B6] px-8 py-4 text-[15.5px] font-semibold text-white no-underline shadow-[0_14px_30px_-14px_rgba(32,100,182,0.6)] transition-all hover:-translate-y-px hover:bg-[#1A559C]"
            >
              See how it fits your organization
              <ArrowRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
