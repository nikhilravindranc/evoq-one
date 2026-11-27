import Image from "next/image";

/* Patient Relationships hero (docs/healthcare-patient-relationships-plan.md): copy on the left, one photograph on the right with one small card.
   Minimal on purpose, so the hero takes about 520px at 1440. */

const ArrowRight = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export function HcCrmHero() {
  return (
    <section id="overview" className="relative overflow-hidden">
      <style>{css}</style>
      <div className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-[#DDF5F0]/60 blur-3xl" />
      <div className="hc-wrap hch-grid">
        <div>
          <p className="hch-eye">Patient relationships</p>
          <h1 className="hch-h1">Turn patient enquiries into lasting&nbsp;relationships.</h1>
          <p className="hch-p">
            Every enquiry is an opportunity to begin a patient relationship. EVOQ CRM helps healthcare organizations manage enquiries, referrals,
            conversations and follow-ups, giving teams the context they need to move each relationship forward.
          </p>
          <div className="hch-btns">
            <a href="#expert" className="hch-btn primary">Talk to an expert<ArrowRight size={15} /></a>
            <a href="#features" className="hch-btn ghost">Explore features<ArrowRight size={15} /></a>
          </div>
        </div>

        <div className="hch-vis">
          <Image
            src="/healthcare/crm-team-doctor.webp"
            alt="A doctor reviewing patient records on a laptop"
            fill
            priority
            sizes="(min-width: 900px) 46vw, 100vw"
            className="object-cover object-[60%_30%]"
          />
          <div className="hch-card" aria-hidden="true">
            <span className="hch-av">EC</span>
            <span>
              <b>Follow up assigned</b>
              <small>Emily Carter, due Friday</small>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

const css = `
  .hch-grid{position:relative;display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:56px;align-items:center;padding-top:36px;padding-bottom:52px}
  .hch-eye{margin:0;font-size:12.5px;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:#0F9488}
  .hch-h1{margin:14px 0 0;text-wrap:balance;font-family:var(--font-display),system-ui,sans-serif;font-weight:800;letter-spacing:-.025em;color:#102A43}
  .hch-p{margin:20px 0 0;max-width:52ch;font-size:16.5px;line-height:1.65;color:rgba(16,42,67,.7)}
  .hch-btns{margin-top:28px;display:flex;flex-wrap:wrap;gap:12px}
  .hch-btn{display:inline-flex;align-items:center;gap:10px;padding:14px 26px;border-radius:999px;font-size:15px;font-weight:600;text-decoration:none;transition:transform .2s,background .2s}
  .hch-btn:hover{transform:translateY(-1px)}
  .hch-btn.primary{background:#0F766E;color:#fff;box-shadow:0 12px 28px -12px rgba(15,118,110,.6)}
  .hch-btn.primary:hover{background:#0B5F58}
  .hch-btn.ghost{border:1px solid #0F766E;color:#0F766E;background:rgba(255,255,255,.7)}
  .hch-btn.ghost:hover{background:#fff}
  .hch-vis{position:relative;height:380px;border-radius:12px 110px 12px 12px;overflow:hidden;background:#E6F4F2;box-shadow:0 36px 70px -46px rgba(16,42,67,.5)}
  .hch-card{position:absolute;left:20px;bottom:20px;display:flex;align-items:center;gap:12px;background:#fff;border-radius:14px;padding:12px 18px 12px 12px;box-shadow:0 0 0 1px #E2E8EC,0 24px 44px -22px rgba(16,42,67,.4)}
  .hch-av{width:36px;height:36px;border-radius:50%;background:#DDF5F0;color:#0F766E;font-size:12px;font-weight:800;display:inline-flex;align-items:center;justify-content:center;flex:none}
  .hch-card b{display:block;font-size:13px;font-weight:700;color:#102A43;line-height:1.3}
  .hch-card small{display:block;font-size:12px;color:#64748B;margin-top:1px}
  @media (max-width:900px){
    .hch-grid{grid-template-columns:1fr;gap:32px;padding-top:28px;padding-bottom:40px}
    .hch-vis{height:300px}
  }
`;
