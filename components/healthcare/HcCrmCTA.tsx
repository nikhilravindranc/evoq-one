const STEPS = ["Enquiry", "Conversation", "Follow up", "Referral", "Return visit"];

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export function HcCrmCTA() {
  return (
    <section id="expert" className="isolate bg-white">
      <div className="px-5 sm:px-6 lg:px-6">
        <div className="mx-auto max-w-[1300px] pb-20 pt-6 lg:pb-28">
          <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#123B5E] via-[#2064B6] to-[#18B8D1] px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
            <div className="pointer-events-none absolute -right-24 -top-28 h-[460px] w-[460px] rounded-full border border-white/15" />
            <div className="pointer-events-none absolute -right-2 top-4 h-[300px] w-[300px] rounded-full border border-white/15" />
            <div className="pointer-events-none absolute -bottom-40 left-1/4 h-[340px] w-[340px] rounded-full bg-[#6DCCC3]/25 blur-3xl" />

            <div className="relative grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#B7ECF5]">Talk to the EVOQ team</p>
                <h2 className="mt-4 max-w-[640px] font-[var(--font-display)] text-[38px] font-extrabold leading-[1.08] tracking-[-0.02em] text-white">
                  Start with how your practice handles enquiries today.
                </h2>
                <p className="mt-5 max-w-[540px] text-[16.5px] leading-[1.7] text-white/80">
                  Show us how enquiries, follow ups and patient history are handled today, and we will show where EVOQ CRM fits.
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-3.5">
                  <a
                    href="#"
                    data-enquiry=""
                    className="inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-[#2064B6] no-underline shadow-[0_16px_34px_-16px_rgba(0,0,0,0.45)] transition-all hover:-translate-y-px hover:bg-[#F1F5F7]"
                  >
                    Talk to an expert
                    <ArrowRight />
                  </a>
                  <a
                    href="/solutions/healthcare"
                    className="inline-flex items-center gap-2.5 rounded-full border border-white/60 px-7 py-3.5 text-[15px] font-semibold text-white no-underline transition-all hover:-translate-y-px hover:bg-white/10"
                  >
                    Explore healthcare solutions
                    <ArrowRight />
                  </a>
                </div>
              </div>

              <ol className="relative mx-auto hidden w-full max-w-[320px] flex-col gap-3 lg:flex">
                <span className="absolute bottom-6 left-[26px] top-6 w-px bg-white/30" />
                {STEPS.map((s, i) => (
                  <li key={s} className="relative flex items-center gap-4 rounded-2xl bg-white/12 px-4 py-3 ring-1 ring-white/20 backdrop-blur">
                    <span className="relative z-10 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-white text-[11px] font-bold text-[#2064B6]">
                      {i + 1}
                    </span>
                    <span className="text-[14.5px] font-semibold text-white">{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
