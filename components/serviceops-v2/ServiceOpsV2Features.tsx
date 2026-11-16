"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState, type ReactNode } from "react";
import { Ic } from "../serviceops/icons";
import { AREAS, CHIP, ROLES, type F, type Status } from "../serviceops/ServiceOpsFeatures";
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
  "Service manager": { img: P.manager, n: "Yuki Tanaka", pos: "55% 30%" },
  Dispatcher: { img: P.dispatcher, n: "Nia Brooks", pos: "35% 38%" },
  "Service coordinator": { img: P.coordinator, n: "Marcus Bell", pos: "55% 35%" },
  Technician: { img: P.tech, n: "Daniel Mensah", pos: "28% 40%" },
};

/* the cards: in a smaller company one person holds the manager and the coordinator roles, so they share a card, and the
   administrator, often the owner, closes the row */
const roleOf = (n: string) => ROLES.find((r) => r[0] === n)!;
const ROLE_CARDS: { key: string; title: string; d: string; opens: string }[] = [
  { key: "Service manager", title: "Service manager and coordinator", d: "The manager sees all work, billing, insights and settings. The coordinator handles requests, customers, estimates and billing. In a smaller company one person often holds both.", opens: "Insights, Profitability, Billing, Requests, Customers, Estimates" },
  { key: "Dispatcher", title: "Dispatcher", d: roleOf("Dispatcher")[1], opens: roleOf("Dispatcher")[2] },
  { key: "Technician", title: "Technician", d: roleOf("Technician")[1], opens: roleOf("Technician")[2] },
  { key: "Administrator", title: "Administrator or business owner", d: "Everything, including users and integrations. In a smaller company this is usually the owner.", opens: roleOf("Administrator")[2] },
];

/* wording for this page only, the catalogue itself is shared with the first version of the page */
const AREA_TEXT: Record<string, { k?: string; title?: string }> = {
  setup: { k: "Settings", title: "Admin settings." },
  money: { k: "Billing" },
  ai: { title: "EVI answers. Agents flag. A person decides." },
  look: { k: "Workspace", title: "Make it yours. Find things fast." },
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

const AGENT_CARDS = [
  { img: "dispatch-agent", n: "Dispatch agent", d: "Finds work orders that are ready to schedule, and technicians who are booked past a full day or free while work waits.", guard: "Suggests, never books. Technician choice and times are made by a person in Dispatch.", reads: "Work orders, jobs, technician schedules", foot: "Nothing to review.", open: "Open Dispatch" },
  { img: "intake-agent", n: "Intake agent", d: "Checks new requests for missing details, and open requests that look like duplicates (same customer, similar title).", guard: "Never merges, declines or contacts anyone. A person opens the request and decides.", reads: "Requests", foot: "4 found, 4 to review.", open: "Open Requests" },
];

function Agents() {
  return (
    <div className="fx-agents" aria-label="The Dispatch and Intake agents, each listing what needs a person">
      {AGENT_CARDS.map((c) => (
        <div key={c.n} className="fx-ag">
          <div className="fx-ag-h"><img src={`/serviceops/v2/agents/${c.img}.jpg`} alt="" /><div><b>{c.n}</b><em>Enabled</em></div></div>
          <p>{c.d}</p>
          <dl><div><dt>Guardrail</dt><dd>{c.guard}</dd></div><div><dt>Reads</dt><dd>{c.reads}</dd></div></dl>
          <div className="fx-ag-f">{c.foot}</div>
          <div className="fx-ag-b"><span className="run">Run now</span><span>Review results</span><span>{c.open}</span></div>
        </div>
      ))}
    </div>
  );
}

const NAV = ["Home", "Requests", "Customers", "Dispatch", "Jobs", "Billing"];
const LAYOUTS = ["Classic", "Compact", "Clean", "Minimal"];

/* a Clean Home: the menu, search, Ask EVI, widgets with colour-block status, and the layout and theme choices */
function Workspace() {
  return (
    <div className="ws-app" role="img" aria-label="A ServiceOps Home with the menu, search, Ask EVI, widgets, and the layout and theme choices">
      <div className="ws-side">
        {NAV.map((n, i) => <span key={n} className={i === 0 ? "on" : ""}><i />{n}</span>)}
        <span className="ws-set"><i />Settings</span>
      </div>
      <div className="ws-main">
        <div className="ws-top">
          <span className="ws-search">{Ic.search}Search customers, jobs, invoices<kbd>Ctrl K</kbd></span>
          <span className="ws-evi"><img src="/serviceops/v2/agents/evi-ai-assistant.jpg" alt="" />Ask EVI</span>
          <span className="ws-new">Create</span>
        </div>
        <div className="ws-fav"><small>Recently visited</small><span>Requests</span><span>Dispatch</span><span>ABC Manufacturing</span></div>
        <div className="ws-grid">
          <div className="ws-w"><b>Open requests</b>
            <span><em className="c1" />Cooling fault, Room 204<small>New</small></span>
            <span><em className="c2" />Annual service, Plant 3<small>Reviewing</small></span>
            <span><em className="c3" />Panel inspection<small>Converted</small></span>
          </div>
          <div className="ws-w"><b>Today</b>
            <span><em className="c4" />09:00 Filter replacement<small>On site</small></span>
            <span><em className="c2" />11:30 Boiler check<small>Booked</small></span>
            <span><em className="c3" />14:00 Meter reading<small>Booked</small></span>
          </div>
        <div className="ws-pick">
          <b>Layout</b>
          <div className="ws-seg">{LAYOUTS.map((l) => <span key={l} className={l === "Clean" ? "on" : ""}>{l}</span>)}</div>
          <b>Theme</b>
          <div className="ws-sw"><i style={{ background: AMBER }} /><i style={{ background: "#2563EB" }} /><i style={{ background: "#16A34A" }} /><i style={{ background: "#7C3AED" }} /><u>Dark mode</u></div>
        </div>
        </div>
      </div>
    </div>
  );
}

/* the picture for each area: a photo, and the screen that does the work laid over it */
const VIS: Record<string, { photo: string; pos: string; over: ReactNode; narrow?: boolean; tall?: boolean; evi?: boolean; flip?: boolean; ws?: boolean }> = {
  work: { photo: "/industries/v2/mo-team-hd.jpg", pos: "45% 40%", over: <Shot tall f="work-orders.png" alt="Work orders with their work type, trade and status" /> },
  field: { photo: "/industries/v2/fs-detail-hd.jpg", pos: "40% 35%", narrow: true, tall: true, over: <div className="fd-phone fx-phone"><i className="fd-notch" aria-hidden /><div className="fd-scr"><Screen n={1} /></div></div> },
  records: { photo: "/industries/v2/rt-main-hd.jpg", pos: "30% 45%", over: <Shot tall f="customer-detail.png" alt="A customer record with contacts, sites, open work and balance" /> },
  money: { photo: "/billing/features/card-laptop.jpg", pos: "55% 45%", over: <Shot tall f="billing.png" alt="Billing, with work ready to invoice, outstanding and collected" /> },
  ai: { photo: "", pos: "", evi: true, over: <Agents /> },
  customers: { photo: "/team/sync-online-shopping.jpg", pos: "50% 40%", narrow: true, over: <div className="dl-scr fx-cust">{DELIGHT[1].ui}</div> },
  automation: { photo: "/billing/features/workflow.jpg", pos: "35% 50%", over: <Rules /> },
  look: { photo: "", pos: "", ws: true, over: null },
  setup: { photo: "/site/images/hr-manager.jpg", pos: "50% 28%", flip: true, tall: true, over: <AdminWorkflow /> },
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

const TOC = [...AREAS.map((a, n) => ({ id: a.id, k: AREA_TEXT[a.id]?.k ?? a.k, n: String(n + 1).padStart(2, "0") }))];

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
            <h1>From the first request to the finished job.</h1>
            <p>The features in the app now, by area. Each line says what you can do, and anything partial or planned says so.</p>
            <p className="fh-sub">AI features run on a built-in demo model with clearly labelled sample answers until a live AI model is connected.</p>
            <div className="v2-ctas"><V2Demo location="features_hero">Request a Demo</V2Demo></div>
          </div>
          <div className="fh-vis">
            <div className="fh-photo"><img src="/serviceops/v2/install.jpg" alt="Two technicians reviewing a job on a tablet at a site" style={{ objectPosition: "78% 45%" }} /></div>
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
            <p>An administrator sets each person&apos;s role. Each person sees the screens their role includes, and the server enforces it.</p>
          </div>
          <ul className="fr">
            {ROLE_CARDS.map((c, i) => {
              const p = PEOPLE[c.key];
              return (
                <li key={c.key} data-rv style={{ ["--hs-d" as string]: `${i * 70}ms` }}>
                  <figure><img src={p.img} alt="" style={{ objectPosition: p.pos }} /><figcaption>{p.n}</figcaption></figure>
                  <h3>{c.title}</h3>
                  <p>{c.d}</p>
                  <div className="fr-opens">{c.opens.split(", ").map((x) => <em key={x}>{x}</em>)}</div>
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
                    <div><span className="fz-k">{AREA_TEXT[a.id]?.k ?? a.k}</span><h3>{AREA_TEXT[a.id]?.title ?? a.title}</h3><p>{a.lead}</p></div>
                  </div>
                  {v && (
                    <div className={`lc-vis fz-vis${v.narrow ? " narrow" : ""}${v.tall ? " tall" : ""}${v.ws ? " full" : ""}`}>
                      <div className={`lc-photo${v.evi ? " evi" : ""}${v.ws ? " ws" : ""}`}>
                        {v.ws ? <Workspace /> : v.evi ? <img src="/characters/evi-new.webp" alt="EVI" /> : <img src={v.photo} alt="" style={{ objectPosition: v.pos, transform: v.flip ? "scaleX(-1)" : undefined }} />}
                      </div>
                      {v.over && <div className="lc-over">{v.over}</div>}
                    </div>
                  )}
                  <div className="fz-rows">{a.items.map((f) => <Row key={f.n} f={f} />)}</div>
                </section>
              );
            })}
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
  .fr{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px}
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
  .fz-vis .lc-photo.evi{background:linear-gradient(135deg,#FFF3D9 0%,#F6E9FF 55%,#E9D5FF 100%)}
  .fz-vis .lc-photo.evi img{object-fit:contain;object-position:10% 100%}
  .fx-agents{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:12px;border-radius:18px;background:#fff;box-shadow:0 26px 50px -30px rgba(32,26,20,.5),0 0 0 1px ${LINE}}
  .fx-ag{display:flex;flex-direction:column;gap:8px;padding:12px;border-radius:14px;background:${G1}}
  .fx-ag-h{display:flex;align-items:center;gap:10px}
  .fx-ag-h img{width:44px;height:44px;border-radius:50%;object-fit:cover;flex-shrink:0;background:${AMBER_SOFT}}
  .fx-ag-h b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;line-height:1.2;color:${INK}}
  .fx-ag-h em{display:inline-block;margin-top:3px;padding:1px 8px;border-radius:999px;background:#E3F5EA;font-style:normal;font-size:11px;font-weight:600;color:#167A43}
  .fx-ag p{margin:0;font-size:12px;line-height:1.45;color:${BODY}}
  .fx-ag dl{display:grid;gap:5px;margin:0}
  .fx-ag dl div{display:grid;grid-template-columns:62px minmax(0,1fr);gap:6px;font-size:11.5px;line-height:1.4}
  .fx-ag dt{color:${MUTED}}.fx-ag dd{margin:0;color:${INK}}
  .fx-ag-f{margin-top:auto;font-size:12px;font-weight:600;color:${INK}}
  .fx-ag-b{display:flex;flex-wrap:wrap;gap:5px}
  .fx-ag-b span{padding:5px 9px;border-radius:8px;background:#fff;box-shadow:inset 0 0 0 1px ${LINE};font-size:11px;font-weight:600;color:${INK}}
  .fx-ag-b span.run{background:${AMBER};box-shadow:none}
  .fz-vis.full .lc-photo{width:100%}
  .fz-vis .lc-photo.ws{background:linear-gradient(135deg,#FFF3D9 0%,#F6E9FF 55%,#E9D5FF 100%);display:flex;align-items:center;justify-content:center;padding:26px}
  .ws-app{position:relative;display:grid;grid-template-columns:150px minmax(0,1fr);width:100%;max-width:860px;height:100%;max-height:400px;border-radius:16px;background:#fff;box-shadow:0 30px 60px -30px rgba(32,26,20,.55),0 0 0 1px ${LINE};overflow:hidden}
  .ws-side{display:flex;flex-direction:column;gap:4px;padding:14px 10px;background:#FAF8F5;border-right:1px solid ${LINE}}
  .ws-side span{display:flex;align-items:center;gap:9px;padding:8px 10px;border-radius:8px;font-size:12.5px;font-weight:500;color:${BODY}}
  .ws-side span i{width:12px;height:12px;border-radius:4px;background:${G2}}
  .ws-side span.on{background:${AMBER_SOFT};color:${INK};font-weight:600}
  .ws-side span.on i{background:${AMBER}}
  .ws-side .ws-set{margin-top:auto}
  .ws-main{display:flex;flex-direction:column;gap:12px;min-width:0;padding:14px 16px}
  .ws-top{display:flex;align-items:center;gap:8px}
  .ws-search{display:flex;flex:1;align-items:center;gap:8px;min-width:0;padding:8px 12px;border-radius:9px;background:${G1};box-shadow:inset 0 0 0 1px ${LINE};font-size:12px;color:${MUTED};white-space:nowrap;overflow:hidden}
  .ws-search svg{width:14px;height:14px;flex-shrink:0}
  .ws-search kbd{margin-left:auto;padding:1px 6px;border-radius:5px;background:#fff;box-shadow:inset 0 0 0 1px ${LINE};font-family:inherit;font-size:10.5px}
  .ws-evi{display:inline-flex;align-items:center;gap:7px;padding:3px 12px 3px 3px;border-radius:999px;background:${AMBER_SOFT};font-size:12px;font-weight:600;color:${INK};white-space:nowrap}
  .ws-evi img{width:26px;height:26px;border-radius:50%}
  .ws-new{padding:8px 14px;border-radius:9px;background:${AMBER};font-size:12px;font-weight:600;color:${INK}}
  .ws-fav{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
  .ws-fav small{font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:${MUTED}}
  .ws-fav span{padding:5px 11px;border-radius:8px;background:#fff;box-shadow:inset 0 0 0 1px ${LINE};font-size:12px;font-weight:500;color:${INK}}
  .ws-grid{display:grid;grid-template-columns:1fr 1fr 200px;gap:12px;align-items:start}
  .ws-w{display:flex;flex-direction:column;gap:6px;padding:12px;border-radius:12px;background:${G1}}
  .ws-w b{font-family:var(--font-display),system-ui,sans-serif;font-size:13px;color:${INK}}
  .ws-w span{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:8px;background:#fff;font-size:12px;color:${INK};box-shadow:inset 0 0 0 1px ${LINE}}
  .ws-w span em{width:10px;height:10px;border-radius:3px;flex-shrink:0}
  .ws-w span small{margin-left:auto;font-size:11px;color:${MUTED};white-space:nowrap}
  .c1{background:#2563EB}.c2{background:${AMBER}}.c3{background:#16A34A}.c4{background:#7C3AED}
  .ws-pick{display:grid;gap:8px;padding:12px;border-radius:14px;background:#fff;box-shadow:0 24px 44px -24px rgba(32,26,20,.6),0 0 0 1px ${LINE}}
  .ws-pick b{font-family:var(--font-display),system-ui,sans-serif;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:${MUTED}}
  .ws-seg{display:grid;grid-template-columns:1fr 1fr;gap:5px}
  .ws-seg span{padding:6px 8px;border-radius:8px;background:${G1};text-align:center;font-size:12px;font-weight:600;color:${BODY}}
  .ws-seg span.on{background:${INK};color:#fff}
  .ws-sw{display:flex;align-items:center;gap:7px}
  .ws-sw i{width:20px;height:20px;border-radius:50%;box-shadow:0 0 0 2px #fff,0 0 0 3px ${LINE}}
  .ws-sw u{margin-left:auto;text-decoration:none;font-size:11.5px;font-weight:600;color:${BODY}}
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

  @media (max-width:1180px){.fr{grid-template-columns:repeat(2,minmax(0,1fr))}.fz{grid-template-columns:minmax(0,1fr)}.fz-toc{display:none}}
  @media (max-width:980px){
    .fh{grid-template-columns:1fr;gap:0;padding:0 20px 48px;min-height:0}
    .fh-copy{padding:56px 0 36px}
    .fh-vis{height:400px}
    .fz-rows{grid-template-columns:minmax(0,1fr)}
  }
  @media (max-width:640px){
    .fh{padding:0 16px 40px}
    .fh-vis{height:auto}.fh-photo{position:relative;width:100%;height:240px}.fh-key{position:relative;left:auto;bottom:auto;width:auto;margin:-40px 12px 0}
    .fr{grid-template-columns:1fr 1fr;gap:12px}.fr li{padding:8px 8px 16px}
    .fz-area-h{grid-template-columns:40px minmax(0,1fr);gap:12px}.fz-num{width:40px;height:40px;border-radius:12px;font-size:14px}
    .fz-vis{height:auto}.fz-vis .lc-photo{width:100%}.fz-vis .lc-over,.fz-vis.narrow .lc-over{width:auto;right:auto}
    .fz-vis.narrow .lc-over,.fz-vis.narrow.tall .lc-over{left:auto;bottom:auto;display:flex;justify-content:center}
    .fx-phone{width:250px}
    .fx-agents{grid-template-columns:1fr}
    .fz-vis .lc-photo.ws{padding:12px}
    .ws-app{grid-template-columns:minmax(0,1fr);max-height:none}
    .ws-side,.ws-fav,.ws-grid .ws-w:nth-child(2){display:none}
    .ws-grid{grid-template-columns:1fr}
  }
  @media (max-width:420px){.fr{grid-template-columns:1fr}}
`;
