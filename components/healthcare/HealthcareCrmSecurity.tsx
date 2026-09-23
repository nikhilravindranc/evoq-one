type IP = { size?: number; stroke?: string };
const I = ({ size = 24, stroke = "#2064B6", children }: IP & { children: React.ReactNode }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const NetworkIcon = ({ size = 32, stroke = "#18B8D1" }: IP) => (
  <I size={size} stroke={stroke}>
    <circle cx="12" cy="5" r="2.5" />
    <circle cx="5" cy="19" r="2.5" />
    <circle cx="19" cy="19" r="2.5" />
    <path d="M12 7.5v4M12 11.5 6.7 17M12 11.5l5.3 5.5" />
  </I>
);
const ShieldCheckIcon = ({ size = 20, stroke = "#2064B6" }: IP) => (
  <I size={size} stroke={stroke}>
    <path d="M12 3 4 6v6c0 4.5 3.2 8 8 9 4.8-1 8-4.5 8-9V6z" />
    <path d="m9 12 2 2 4-4" />
  </I>
);
const GlobeIcon = ({ size = 32, stroke = "#7C6BE0" }: IP) => (
  <I size={size} stroke={stroke}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
  </I>
);
const ShieldNetworkIcon = ({ size = 32, stroke = "#2064B6" }: IP) => (
  <I size={size} stroke={stroke}>
    <path d="M12 2.6 4.5 5.4v5.7c0 4.9 3.2 8.7 7.5 9.9 4.3-1.2 7.5-5 7.5-9.9V5.4z" />
    <circle cx="12" cy="8.6" r="1.35" fill={stroke} stroke="none" />
    <circle cx="9" cy="13.6" r="1.35" fill={stroke} stroke="none" />
    <circle cx="15" cy="13.6" r="1.35" fill={stroke} stroke="none" />
    <path d="M11.3 9.8 9.6 12.4M12.7 9.8l1.7 2.6M10.3 13.6h3.4" strokeWidth="1.4" />
  </I>
);

type Category = {
  key: string;
  icon: (p: IP) => React.ReactNode;
  accent: string;
  tile: string;
  title: string;
  standards: string[];
  desc: string;
};

const CATEGORIES: Category[] = [
  {
    key: "interop",
    icon: (p) => <NetworkIcon {...p} />,
    accent: "#2064B6",
    tile: "bg-[#E8F1FA]",
    title: "Interoperability",
    standards: ["HL7", "FHIR"],
    desc: "Support standards-based exchange of healthcare information between connected applications and systems.",
  },
  {
    key: "privacy",
    icon: (p) => <ShieldCheckIcon {...p} />,
    accent: "#18B8D1",
    tile: "bg-[#E1F6F8]",
    title: "Privacy & security",
    standards: ["HIPAA", "Regional privacy requirements"],
    desc: "Support applicable privacy and security requirements based on the organization, location, and deployment.",
  },
  {
    key: "ecosystems",
    icon: (p) => <GlobeIcon {...p} />,
    accent: "#7C6BE0",
    tile: "bg-[#ECE8FB]",
    title: "Digital health ecosystems",
    standards: ["ABDM", "NABIDH", "Riayati", "Malaffi"],
    desc: "Support relevant digital-health and health-information exchange requirements where applicable to the organization and deployment.",
  },
];

export function HealthcareCrmSecurity() {
  return (
    <section className="bg-white">
      <div className="px-5 sm:px-6 lg:px-6">
        <div className="mx-auto max-w-[1300px] py-10 lg:py-16">
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-white via-[#F2F8FD] to-[#E6F4F6] ring-1 ring-[#31465A]/8">
            <div className="pointer-events-none absolute -left-32 -top-32 h-[340px] w-[340px] rounded-full bg-[#E3F2FA] blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 right-[-60px] h-[420px] w-[420px] rounded-full bg-[#DCEAFB]/70 blur-3xl" />

            <div className="relative px-6 py-10 sm:px-10 lg:px-14 lg:py-16">
              {/* header */}
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-[720px]">
                  <p className="text-[12px] font-bold uppercase tracking-[0.28em] text-[#18A0B8]">
                    Interoperability, privacy &amp; healthcare standards
                  </p>
                  <h2 className="mt-4 font-[var(--font-display)] text-[38px] font-extrabold leading-[1.08] tracking-[-0.025em] text-[#102A43]">
                    Built to work across healthcare systems.
                  </h2>
                  <p className="mt-5 text-[16px] leading-[1.65] text-[#31465A]/75">
                    Healthcare organizations rely on a growing network of clinical, operational, billing,
                    communication, and health-information systems. EVOQ Healthcare CRM provides a
                    relationship-management foundation that can work alongside this ecosystem through relevant
                    interoperability standards, privacy requirements, integrations, and regional digital-health
                    frameworks.
                  </p>
                </div>
                <span className="flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full bg-[#E8F1FA] lg:mt-1">
                  <ShieldNetworkIcon />
                </span>
              </div>

              {/* category cards */}
              <div className="mt-10 grid gap-5 lg:grid-cols-3">
                {CATEGORIES.map((c) => (
                  <div
                    key={c.key}
                    className="flex flex-col rounded-[20px] bg-white p-6 shadow-[0_18px_44px_-28px_rgba(32,100,182,0.4)] ring-1 ring-[#31465A]/6"
                  >
                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${c.tile}`}>
                      {c.icon({ size: 22, stroke: c.accent })}
                    </span>

                    <p className="mt-4 font-[var(--font-display)] text-[17px] font-bold leading-[1.3] text-[#102A43]">
                      {c.title}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {c.standards.map((s) => (
                        <span
                          key={s}
                          className={`inline-flex items-center rounded-full ${c.tile} px-2.5 py-1 text-[11.5px] font-semibold`}
                          style={{ color: c.accent }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <p className="mt-4 flex-1 text-[13.5px] leading-[1.6] text-[#31465A]/70">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
