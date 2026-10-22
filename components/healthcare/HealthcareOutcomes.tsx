/* Outcome-led entry points: what a healthcare organization wants to improve, and the
   products behind each outcome. The links anchor to the journey and solution cards. */

const ICONS = {
  acquire: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM19 8v6M22 11h-6",
  retain: "M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 22l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z",
  efficiency: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM9 16l2 2 4-4",
  revenue: "M3 3v18h18M7 15l4-4 3 3 5-6",
  arrow: "M5 12h14M13 6l6 6-6 6",
} as const;

function Ic({ n, size = 22, stroke }: { n: keyof typeof ICONS; size?: number; stroke: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICONS[n]} />
    </svg>
  );
}

const OUTCOMES = [
  { icon: "acquire", title: "Patient Acquisition", desc: "Turn more enquiries and referrals into consultations and appointments.", products: ["CRM", "Campaigns", "Appointment Booking"], link: "Explore patient acquisition", href: "#healthcare-crm", tile: "bg-[#E8F1FA]", ink: "#2064B6" },
  { icon: "retain", title: "Patient Retention", desc: "Follow-ups sent on schedule, communication kept relevant, return visits tracked.", products: ["CRM", "Campaigns", "Loyalty", "Surveys"], link: "Explore patient retention", href: "#patient-engagement", tile: "bg-[#E7F7F5]", ink: "#2F8A7F" },
  { icon: "efficiency", title: "Practice Efficiency", desc: "Coordinate appointments, providers, services, and daily practice activity.", products: ["Practice Management", "Appointment Booking"], link: "Explore practice efficiency", href: "#practice-management", tile: "bg-[#E5F8FB]", ink: "#0E8FA5" },
  { icon: "revenue", title: "Revenue Optimization", desc: "Enquiry conversion, appointment utilization, repeat visits and payment collection, tracked.", products: ["CRM", "Appointment Booking", "Practice Management", "Billing"], link: "Explore revenue optimization", href: "#patient-journey", tile: "bg-[#EAEFF3]", ink: "#31465A" },
] as const;

export function HealthcareOutcomes() {
  return (
    <section id="healthcare-outcomes" className="relative scroll-mt-24 overflow-hidden bg-white">
      <div className="px-5 sm:px-6 lg:px-6">
        <div className="mx-auto max-w-[1300px] py-20 lg:py-24">
          <div className="max-w-[720px]">
            <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#18B8D1]">Healthcare outcomes</p>
            <h2 className="mt-4 font-[var(--font-display)] text-[38px] font-extrabold leading-[1.08] tracking-[-0.02em] text-[#31465A]">
              What would you like to improve?
            </h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {OUTCOMES.map((o) => (
              <a
                key={o.title}
                href={o.href}
                className="group flex flex-col rounded-[22px] bg-white p-6 no-underline ring-1 ring-[#31465A]/10 transition-all hover:-translate-y-1 hover:shadow-[0_24px_50px_-22px_rgba(49,70,90,0.3)]"
                style={{ ["--oc" as string]: o.ink }}
              >
                <span className={`flex h-12 w-12 items-center justify-center rounded-[14px] ${o.tile}`}>
                  <Ic n={o.icon} stroke={o.ink} />
                </span>
                <h3 className="mt-5 font-[var(--font-display)] text-[21px] font-bold leading-snug text-[#31465A]">{o.title}</h3>
                <p className="mt-3 flex-1 text-[14.5px] leading-[1.65] text-[#64748B]">{o.desc}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {o.products.map((p) => (
                    <span key={p} className="rounded-full bg-[#F1F5F7] px-2.5 py-1 text-[11.5px] font-semibold text-[#31465A]">{p}</span>
                  ))}
                </div>
                <span className="mt-5 inline-flex items-center gap-2 border-t border-[#31465A]/8 pt-4 text-[14px] font-semibold" style={{ color: o.ink }}>
                  {o.link}
                  <span className="transition-transform group-hover:translate-x-1"><Ic n="arrow" size={15} stroke="currentColor" /></span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
