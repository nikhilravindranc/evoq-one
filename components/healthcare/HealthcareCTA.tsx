import Image from "next/image";

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const APPS = [
  { label: "Healthcare CRM", dot: "#2064B6", pos: "left-[-18px] top-[46px]" },
  { label: "Practice Management", dot: "#18B8D1", pos: "right-[-14px] top-[104px]" },
  { label: "Billing", dot: "#6DCCC3", pos: "left-[6px] bottom-[64px]" },
  { label: "Booking Engine", dot: "#2064B6", pos: "right-[10px] bottom-[18px]" },
] as const;

/* ---------- section ---------- */

export function HealthcareCTA() {
  return (
    <section className="bg-white">
      <div className="px-5 sm:px-6 lg:px-6">
        <div className="mx-auto max-w-[1300px] pb-20 pt-6 lg:pb-28">
          <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#123B5E] via-[#2064B6] to-[#18B8D1] px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
            <div className="pointer-events-none absolute -right-24 -top-28 h-[460px] w-[460px] rounded-full border border-white/15" />
            <div className="pointer-events-none absolute -right-2 top-4 h-[300px] w-[300px] rounded-full border border-white/15" />
            <div className="pointer-events-none absolute -bottom-40 left-1/4 h-[340px] w-[340px] rounded-full bg-[#6DCCC3]/25 blur-3xl" />

            <div className="relative grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#B7ECF5]">
                  Ready to build your healthcare environment?
                </p>
                <h2 className="mt-4 max-w-[640px] font-[var(--font-display)] text-[34px] font-extrabold leading-[1.08] tracking-[-0.02em] text-white sm:text-[48px]">
                  Bring healthcare operations and patient relationships together.
                </h2>
                <p className="mt-5 max-w-[540px] text-[16.5px] leading-[1.7] text-white/80">
                  Manage practice operations, patient relationships, booking, billing, and engagement with EVOQ.
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-3.5">
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-[#2064B6] no-underline shadow-[0_16px_34px_-16px_rgba(0,0,0,0.45)] transition-all hover:-translate-y-px hover:bg-[#F1F5F7]"
                  >
                    Get a demo
                    <ArrowRight />
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2.5 rounded-full border border-white/60 px-7 py-3.5 text-[15px] font-semibold text-white no-underline transition-all hover:-translate-y-px hover:bg-white/10"
                  >
                    Talk to an expert
                    <ArrowRight />
                  </a>
                </div>
              </div>

              {/* team photo with app chips */}
              <div className="relative mx-auto hidden w-full max-w-[460px] lg:block">
                <div className="absolute -right-6 -top-6 h-[120px] w-[120px] rounded-full bg-[#6DCCC3]/40" />
                <div className="relative h-[330px] overflow-hidden rounded-[28px] rounded-tr-[120px] ring-[6px] ring-white/90 shadow-[0_34px_70px_-30px_rgba(0,0,0,0.6)]">
                  <Image src="/healthcare/stock/hc-cta-team.jpg" alt="Healthcare team" fill sizes="460px" className="object-cover" style={{ objectPosition: "50% 30%" }} />
                </div>
                {APPS.map((a) => (
                  <span key={a.label} className={`absolute inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[12.5px] font-semibold text-[#31465A] shadow-[0_16px_34px_-16px_rgba(0,0,0,0.5)] ${a.pos}`}>
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: a.dot }} />
                    {a.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
