"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState, type ReactNode } from "react";
import { Ic } from "../serviceops/icons";
import { AREAS, CHIP, NOT_YET, ROLES, type F, type Status } from "../serviceops/ServiceOpsFeatures";
import { AMBER, AMBER_DEEP, AMBER_SOFT, BODY, G1, G2, INK, LINE, MUTED } from "./palette";
import { V2Demo, V2Shell } from "./V2Shell";
import { AdminWorkflow, APP, Closing, DELIGHT, homeCss, Label, P, Screen } from "./ServiceOpsV2";

/* ServiceOps v2, Features. The same catalogue as v1 (one source of truth in ServiceOpsFeatures), dressed in the v2 look:
   real photos with the matching app screen over each area. People and companies are sample data. */

const all = AREAS.flatMap((a) => a.items);
const count = {
  avail: all.filter((f) => !f.s || f.s === "demo" || f.s === "setup").length,
  partial: all.filter((f) => f.s === "partial").length,
  planned: all.filter((f) => f.s === "planned").length,
};

/* who appears on each role card, the same people as the home page */
const PEOPLE: Record<string, { img: string; n: string; pos: string }> = {
  Administrator: { img: P.admin, n: "Owen Clarke", pos: "50% 30%" },
  "Service manager": { img: P.manager, n: "Priya Shah", pos: "55% 30%" },
  Dispatcher: { img: P.dispatcher, n: "Nia Brooks", pos: "35% 38%" },
  "Service coordinator": { img: P.coordinator, n: "Marcus Bell", pos: "55% 35%" },
  Technician: { img: P.tech, n: "Daniel Mensah", pos: "28% 40%" },
};

function Rules() {
  return (
    <div className="fx-card" aria-label="Automation rules written as plain sentences, with a dry run">
      <b className="fx-t">Automation rules</b>
      {[
        ["Remind the customer", "when an estimate is unanswered for 3 days"],
        ["Tell the manager", "when a technician stops work as unsafe"],
        ["Archive the request", "when it is untouched for 30 days"],
      ].map(([a, b]) => <span key={a} className="fx-rule"><i>{Ic.bell}</i><span><b>{a}</b> {b}</span></span>)}
      <span className="fx-run"><em>Healthy</em><u>Run now as a dry run</u></span>
    </div>
  );
}

/* the picture for each area: a photo, and the screen that does the work laid over it */
const VIS: Record<string, { photo: string; pos: string; over: ReactNode; narrow?: boolean; tall?: boolean }> = {
  work: { photo: "/industries/v2/mo-team-hd.jpg", pos: "45% 40%", over: <Shot tall f="work-orders.png" alt="Work orders with their work type, trade and status" /> },
  field: { photo: "/industries/v2/fs-detail-hd.jpg", pos: "40% 35%", narrow: true, tall: true, over: <div className="fd-phone fx-phone"><i className="fd-notch" aria-hidden /><div className="fd-scr"><Screen n={1} /></div></div> },
  records: { photo: "/industries/v2/rt-main-hd.jpg", pos: "30% 45%", over: <Shot tall f="customer-detail.png" alt="A customer record with contacts, sites, open work and balance" /> },
  money: { photo: "/solutions/hospitality.jpg", pos: "60% 45%", over: <Shot tall f="billing.png" alt="Billing, with work ready to invoice, outstanding and collected" /> },
  ai: { photo: "/solutions/construction.jpg", pos: "40% 30%", over: <Shot f="agents-dispatch-intake.png" alt="The Dispatch and Intake agents, each listing what needs a person" /> },
  customers: { photo: P.cust1, pos: "55% 35%", narrow: true, over: <div className="dl-scr fx-cust">{DELIGHT[1].ui}</div> },
  automation: { photo: "/serviceops/v2/hero.jpg", pos: "40% 45%", over: <Rules /> },
  look: { photo: "/industries/v2/mo-circle-hd.jpg", pos: "50% 35%", over: <Shot f="customers-list.png" alt="The customers list with its filters and columns" /> },
  setup: { photo: P.admin, pos: "50% 30%", tall: true, over: <AdminWorkflow /> },
};

function Shot({ f, alt, tall }: { f: string; alt: string; tall?: boolean }) {
  return <div className={`lc-shot fx-shot${tall ? " sq" : ""}`}><img src={`${APP}/${f}`} alt={alt} /></div>;
}

const Chip = ({ s }: { s: Status }) => <em className={`fz-chip ${s}`}>{CHIP[s]}</em>;

function Row({ f }: { f: F }) {
  return (
    <div className="fz-row">
      <div className="fz-row-h"><b>{f.n}</b>{f.s && <Chip s={f.s} />}</div>
      <p>{f.d}{f.note && <span className="fz-note"> {f.note}</span>}</p>
    </div>
  );
}

const TOC = [...AREAS.map((a, n) => ({ id: a.id, k: a.k, n: String(n + 1).padStart(2, "0") })), { id: "not-yet", k: "Not available yet", n: String(AREAS.length + 1).padStart(2, "0") }];

/* the area in view on the right is the one lit on the left */
function Toc() {
  const [on, setOn] = useState(TOC[0].id);
  useEffect(() => {
    const els = TOC.map((t) => document.getElementById(t.id)).filter((e): e is HTMLElement => !!e);
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.38;
      let cur = TOC[0].id;
      for (const el of els) if (el.getBoundingClientRect().top <= line) cur = el.id;
      setOn((p) => (p === cur ? p : cur));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return (
    <nav className="fz-toc" aria-label="Features by area">
      <span className="fz-toc-k">On this page</span>
      {TOC.map((t) => (
        <a key={t.id} href={`#${t.id}`} className={t.id === on ? "on" : undefined} aria-current={t.id === on ? "true" : undefined}><i>{t.n}</i>{t.k}</a>
      ))}
    </nav>
  );
}

export function ServiceOpsV2Features() {
  return (
    <V2Shell page="features">
      <style>{homeCss}</style>
      <style>{css}</style>

      {/* hero */}
      <section className="fh-out">
        <div className="fh">
          <div className="fh-copy">
            <Label>ServiceOps features</Label>
            <h1>What ServiceOps does today.</h1>
            <p>The features in the app now, by area. Each line says what you can do, and anything partial or planned says so.</p>
            <p className="fh-sub">AI features run on a built-in demo model with clearly labelled sample answers until a live AI model is connected.</p>
            <div className="v2-ctas"><V2Demo location="features_hero">Request a Demo</V2Demo></div>
          </div>
          <div className="fh-vis">
            <div className="fh-photo"><img src="/industries/v2/mf-main-hd.jpg" alt="A maintenance technician at work in a plant" /></div>
            <div className="fh-key">
              <span className="fh-key-k">Status key</span>
              <div className="fh-kr"><b>{count.avail}</b><span><em className="fz-chip ok">Available</em><small>Works today.</small></span></div>
              <div className="fh-kr"><b>{count.partial}</b><span><em className="fz-chip partial">Partial</em><small>Works with a stated limit.</small></span></div>
              <div className="fh-kr"><b>{count.planned}</b><span><em className="fz-chip planned">Planned</em><small>Not built yet.</small></span></div>
            </div>
          </div>
        </div>
      </section>

      {/* roles */}
      <section className="v2-sec v2-out" id="roles">
        <div className="v2-in">
          <div className="tr-head" data-rv>
            <div>
              <Label>Roles</Label>
              <h2 className="v2-h2">Who can open what.</h2>
            </div>
            <p>ServiceOps has five roles, set by an administrator. Each person sees the screens their role includes, and the server enforces it.</p>
          </div>
          <ul className="fr">
            {ROLES.map(([r, d, s], i) => {
              const p = PEOPLE[r];
              return (
                <li key={r} data-rv style={{ ["--hs-d" as string]: `${i * 70}ms` }}>
                  <figure><img src={p.img} alt="" style={{ objectPosition: p.pos }} /><figcaption>{p.n}</figcaption></figure>
                  <h3>{r}</h3>
                  <p>{d}</p>
                  <div className="fr-opens">{s.split(", ").map((x) => <em key={x}>{x}</em>)}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* the catalogue */}
      <section className="v2-sec v2-out v2-grey" id="catalogue">
        <div className="v2-in fz">
          <Toc />
          <div className="fz-main">
            {AREAS.map((a, n) => {
              const v = VIS[a.id];
              return (
                <section key={a.id} id={a.id} className="fz-area" data-rv>
                  <div className="fz-area-h">
                    <span className="fz-num">{String(n + 1).padStart(2, "0")}</span>
                    <div><span className="fz-k">{a.k}</span><h3>{a.title}</h3><p>{a.lead}</p></div>
                  </div>
                  {v && (
                    <div className={`lc-vis fz-vis${v.narrow ? " narrow" : ""}${v.tall ? " tall" : ""}`}>
                      <div className="lc-photo"><img src={v.photo} alt="" style={{ objectPosition: v.pos }} /></div>
                      <div className="lc-over">{v.over}</div>
                    </div>
                  )}
                  <div className="fz-rows">{a.items.map((f) => <Row key={f.n} f={f} />)}</div>
                </section>
              );
            })}
            <section id="not-yet" className="fz-area" data-rv>
              <div className="fz-area-h">
                <span className="fz-num muted">{TOC[TOC.length - 1].n}</span>
                <div><span className="fz-k">Not available yet</span><h3>On the way, not here today.</h3><p>These are not built, so they are not part of what ServiceOps does today.</p></div>
              </div>
              <ul className="fz-not">{NOT_YET.map((t) => <li key={t}>{Ic.clock}<span>{t}</span></li>)}</ul>
            </section>
          </div>
        </div>
      </section>

      <Closing />
    </V2Shell>
  );
}

const css = `
  /* hero, the same full width band as the overview page */
  .fh-out{padding:0}
  .fh{display:grid;grid-template-columns:minmax(0,560px) minmax(0,1fr);gap:56px;align-items:center;min-height:560px;padding:0 max(20px,calc((100vw - 1240px) / 2 + 20px));background:linear-gradient(135deg,#F7F5F1 0%,#EEEBE5 100%);border-bottom:1px solid ${LINE}}
  .fh-copy{padding:64px 0}
  .fh-copy .v2-label{margin-bottom:16px}
  .fh-copy h1{text-wrap:balance}
  .fh-copy p{margin:20px 0 0;font-size:18px;line-height:1.65;color:${BODY};max-width:52ch}
  .fh-copy p.fh-sub{margin-top:12px;font-size:15px;color:${MUTED}}
  .fh-vis{position:relative;height:440px}
  .fh-photo{position:absolute;right:0;top:0;width:78%;height:100%;border-radius:24px;overflow:hidden;background:${G2}}
  .fh-photo img{width:100%;height:100%;object-fit:cover;object-position:55% 40%}
  .fh-key{position:absolute;left:0;bottom:28px;display:grid;gap:12px;width:300px;padding:20px;border-radius:20px;background:#fff;box-shadow:0 30px 60px -30px rgba(32,26,20,.55),0 0 0 1px ${LINE}}
  .fh-key-k{font-family:var(--font-display),system-ui,sans-serif;font-size:12px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:${AMBER_DEEP}}
  .fh-kr{display:grid;grid-template-columns:52px minmax(0,1fr);gap:12px;align-items:center;padding-top:12px;border-top:1px solid ${LINE}}
  .fh-kr>b{font-family:var(--font-display),system-ui,sans-serif;font-size:30px;line-height:1;color:${INK}}
  .fh-kr span{display:grid;gap:3px;justify-items:start}.fh-kr small{font-size:13px;color:${MUTED}}

  .fz-chip{display:inline-flex;align-items:center;padding:2px 9px;border-radius:999px;font-style:normal;font-size:11.5px;font-weight:600;letter-spacing:.02em;white-space:nowrap}
  .fz-chip.ok{background:#E3F5EA;color:#167A43}
  .fz-chip.partial{background:${AMBER_SOFT};color:#7A4A07}
  .fz-chip.planned{background:${G2};color:#5E5246}
  .fz-chip.demo{background:#FDECC8;color:#78350F}
  .fz-chip.setup{background:#FCE4D6;color:#9A3412}

  /* roles, a person on each card */
  .fr{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:20px}
  .fr li{display:flex;flex-direction:column;padding:12px 12px 20px;border-radius:20px;background:${G1};box-shadow:inset 0 0 0 1px ${LINE}}
  .fr figure{position:relative;margin:0 0 16px;aspect-ratio:4/3;border-radius:14px;overflow:hidden;background:${G2}}
  .fr figure img{width:100%;height:100%;object-fit:cover}
  .fr figcaption{position:absolute;left:8px;bottom:8px;padding:4px 10px;border-radius:999px;background:rgba(255,255,255,.94);font-size:12px;font-weight:600;color:${INK}}
  .fr h3{--h3-size:18px;margin:0 8px 6px!important;line-height:1.25}
  .fr p{margin:0 8px;font-size:14.5px;line-height:1.55;color:${BODY}}
  .fr-opens{display:flex;flex-wrap:wrap;gap:6px;margin:14px 8px 0;padding-top:12px;border-top:1px solid ${LINE}}
  .fr-opens em{padding:3px 10px;border-radius:999px;background:#fff;box-shadow:inset 0 0 0 1px ${LINE};font-style:normal;font-size:12px;font-weight:600;color:${INK}}

  /* the catalogue */
  .fz{display:grid;grid-template-columns:220px minmax(0,1fr);gap:64px;align-items:start}
  .fz-toc{position:sticky;top:84px;display:grid;gap:2px}
  .fz-toc-k{margin-bottom:8px;font-family:var(--font-display),system-ui,sans-serif;font-size:12px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:${MUTED}}
  .fz-toc a{position:relative;display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:10px;font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;font-weight:500;color:${MUTED};text-decoration:none;transition:background .15s ease,color .15s ease}
  .fz-toc a i{display:grid;place-items:center;width:24px;height:24px;border-radius:50%;font-style:normal;font-size:11px;font-weight:600;color:${AMBER_DEEP};transition:background .2s ease}
  .fz-toc a:hover{background:#fff;color:${INK}}
  .fz-toc a.on{background:#fff;color:${INK};font-weight:600;box-shadow:0 10px 24px -16px rgba(32,26,20,.45),0 0 0 1px ${LINE}}
  .fz-toc a.on i{background:${AMBER};color:${INK}}
  .fz-main{display:grid;gap:88px}
  .fz-area{scroll-margin-top:84px}
  .fz-area-h{display:grid;grid-template-columns:52px minmax(0,1fr);gap:18px;align-items:start;margin-bottom:28px}
  .fz-num{display:grid;place-items:center;width:46px;height:46px;border-radius:14px;background:${AMBER};font-family:var(--font-display),system-ui,sans-serif;font-size:15px;font-weight:700;color:${INK}}
  .fz-num.muted{background:${G2};color:${MUTED}}
  .fz-k{display:block;margin-bottom:6px;font-family:var(--font-display),system-ui,sans-serif;font-size:12px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:${AMBER_DEEP}}
  .fz-area-h h3{letter-spacing:-.015em}
  .fz-area-h p{margin:6px 0 0;font-size:16.5px;color:${BODY}}
  .fz-vis{height:460px;margin-bottom:32px}
  .fz-vis .lc-photo{width:62%}
  .fz-vis .lc-over{width:62%}
  .fz-vis.narrow .lc-over{width:auto;right:auto;left:calc(62% - 110px);bottom:24px}
  .fz-vis.narrow.tall .lc-over{bottom:0}
  .fx-shot{max-height:none}
  .fx-shot.sq{width:400px;max-width:100%;margin-left:auto}
  .fx-phone{position:relative;width:270px;padding:8px;border-radius:38px}
  .fx-phone .fd-scr{min-height:0;padding:40px 13px 16px;border-radius:31px;gap:8px}
  .fz-vis.tall{height:480px}
  .fx-cust{width:250px;min-height:300px}
  .fx-card{display:flex;flex-direction:column;gap:9px;padding:20px;border-radius:16px;background:#fff;box-shadow:0 26px 50px -30px rgba(32,26,20,.5),0 0 0 1px ${LINE}}
  .fx-t{font-family:var(--font-display),system-ui,sans-serif;font-size:18px;color:${INK}}
  .fx-rule{display:flex;gap:10px;align-items:flex-start;padding:10px 12px;border-radius:10px;background:${G1};font-size:13.5px;line-height:1.45;color:${BODY}}
  .fx-rule b{color:${INK}}
  .fx-rule i{display:grid;place-items:center;flex-shrink:0;width:24px;height:24px;border-radius:8px;background:${AMBER_SOFT};color:${AMBER_DEEP}}.fx-rule i svg{width:13px;height:13px}
  .fx-run{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:4px;font-size:13px}
  .fx-run em{font-style:normal;padding:3px 10px;border-radius:999px;background:#E3F5EA;font-weight:600;color:#167A43}
  .fx-run u{text-decoration:none;padding:7px 12px;border-radius:9px;box-shadow:inset 0 0 0 1.5px ${LINE};font-weight:600;color:${INK}}
  .fz-rows{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 40px}
  .fz-row{padding:16px 0;border-top:1px solid #DDD8D0}
  .fz-row-h{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
  .fz-row b{font-family:var(--font-display),system-ui,sans-serif;font-size:16.5px;font-weight:600;color:${INK}}
  .fz-row p{margin:4px 0 0;font-size:15px;line-height:1.55;color:${BODY}}
  .fz-note{color:${MUTED}}
  .fz-not{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 40px}
  .fz-not li{display:flex;gap:12px;align-items:flex-start;padding:14px 0;border-top:1px solid #DDD8D0;font-size:15.5px;color:${INK}}
  .fz-not svg{width:17px;height:17px;flex-shrink:0;margin-top:4px;color:${MUTED}}

  @media (max-width:1180px){.fr{grid-template-columns:repeat(3,minmax(0,1fr))}.fz{grid-template-columns:minmax(0,1fr)}.fz-toc{display:none}}
  @media (max-width:980px){
    .fh{grid-template-columns:1fr;gap:0;padding:0 20px 48px;min-height:0}
    .fh-copy{padding:56px 0 36px}
    .fh-vis{height:400px}
    .fz-rows,.fz-not{grid-template-columns:minmax(0,1fr)}
  }
  @media (max-width:640px){
    .fh{padding:0 16px 40px}
    .fh-vis{height:auto}.fh-photo{position:relative;width:100%;height:240px}.fh-key{position:relative;left:auto;bottom:auto;width:auto;margin:-40px 12px 0}
    .fr{grid-template-columns:1fr 1fr;gap:12px}.fr li{padding:8px 8px 16px}
    .fz-area-h{grid-template-columns:40px minmax(0,1fr);gap:12px}.fz-num{width:40px;height:40px;border-radius:12px;font-size:14px}
    .fz-vis{height:auto}.fz-vis .lc-photo{width:100%}.fz-vis .lc-over,.fz-vis.narrow .lc-over{width:auto;right:auto}
    .fz-vis.narrow .lc-over,.fz-vis.narrow.tall .lc-over{left:auto;bottom:auto;display:flex;justify-content:center}
    .fx-phone{width:250px}
  }
  @media (max-width:420px){.fr{grid-template-columns:1fr}}
`;
