type IP = { size?: number; stroke?: string };
const I = ({ size = 24, stroke = "#2064B6", children }: IP & { children: React.ReactNode }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const GlobeIcon = ({ size = 32, stroke = "#18B8D1" }: IP) => (
  <I size={size} stroke={stroke}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
  </I>
);
const ShieldCheckIcon = ({ size = 20, stroke = "#2064B6" }: IP) => (
  <I size={size} stroke={stroke}>
    <path d="M12 3 4 6v6c0 4.5 3.2 8 8 9 4.8-1 8-4.5 8-9V6z" />
    <path d="m9 12 2 2 4-4" />
  </I>
);

type Country = {
  code: string;
  name: string;
  accent: string;
  tile: string;
  heading: string;
  desc: string;
  badges: string[];
};

const COUNTRIES: Country[] = [
  {
    code: "US",
    name: "USA",
    accent: "#2064B6",
    tile: "bg-[#E8F1FA]",
    heading: "US healthcare privacy & security",
    desc: "Healthcare CRM deployments serving US healthcare organizations can be structured around applicable HIPAA requirements, including appropriate access controls, information handling, security measures, and contractual arrangements where protected health information is involved.",
    badges: ["HIPAA"],
  },
  {
    code: "IN",
    name: "India",
    accent: "#18B8D1",
    tile: "bg-[#E1F6F8]",
    heading: "Indian healthcare privacy & digital health",
    desc: "Support deployments around India's DPDP requirements and, where applicable, digital-health ecosystems such as ABDM. Integrations and interoperability can be configured according to the systems, standards, and requirements applicable to each organization.",
    badges: ["DPDP", "ABDM"],
  },
  {
    code: "AE",
    name: "UAE",
    accent: "#7C6BE0",
    tile: "bg-[#ECE8FB]",
    heading: "UAE privacy & healthcare interoperability",
    desc: "Support deployments around applicable UAE PDPL requirements and healthcare interoperability ecosystems such as Riayati, NABIDH, and Malaffi, where relevant to the organization and deployment.",
    badges: ["PDPL", "Riayati", "NABIDH", "Malaffi"],
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
                <div className="max-w-[640px]">
                  <p className="text-[12px] font-bold uppercase tracking-[0.28em] text-[#18A0B8]">
                    Privacy &amp; compliance
                  </p>
                  <h2 className="mt-4 font-[var(--font-display)] text-[38px] font-extrabold leading-[1.08] tracking-[-0.025em] text-[#102A43]">
                    Global by design. Relevant to your market.
                  </h2>
                  <p className="mt-5 text-[16px] leading-[1.65] text-[#31465A]/75">
                    Healthcare organizations operate within different privacy, security, data-handling, and healthcare
                    interoperability requirements. EVOQ Healthcare CRM provides a common relationship-management
                    foundation that can be configured around the requirements of different markets and deployments.
                  </p>
                </div>
                <span className="flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full bg-[#E1F6F8] lg:mt-1">
                  <GlobeIcon />
                </span>
              </div>

              {/* country cards */}
              <div className="mt-10 grid gap-5 lg:grid-cols-3">
                {COUNTRIES.map((c) => (
                  <div
                    key={c.code}
                    className="flex flex-col rounded-[20px] bg-white p-6 shadow-[0_18px_44px_-28px_rgba(32,100,182,0.4)] ring-1 ring-[#31465A]/6"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[12px] font-extrabold text-white"
                        style={{ background: c.accent }}
                      >
                        {c.code}
                      </span>
                      <span className="font-[var(--font-display)] text-[16px] font-bold text-[#102A43]">{c.name}</span>
                    </div>

                    <p className="mt-4 text-[14.5px] font-bold leading-[1.35] text-[#102A43]">{c.heading}</p>
                    <p className="mt-2.5 flex-1 text-[13.5px] leading-[1.6] text-[#31465A]/70">{c.desc}</p>

                    <div className="mt-5 flex flex-wrap gap-2 border-t border-[#31465A]/8 pt-4">
                      {c.badges.map((b) => (
                        <span
                          key={b}
                          className={`inline-flex items-center gap-1.5 rounded-full ${c.tile} px-3 py-1.5 text-[12px] font-semibold`}
                          style={{ color: c.accent }}
                        >
                          <ShieldCheckIcon size={13} stroke={c.accent} />
                          {b}
                        </span>
                      ))}
                    </div>
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
