"use client";
/* eslint-disable @next/next/no-img-element */

import { useState, useSyncExternalStore } from "react";
import { AREAS, ROLES, type F } from "./featuresData";
import { AMBER_DEEP, BODY, G1, G2, INK, LINE, MUTED } from "./palette";
import { SoDemo, ServiceOpsShell } from "./ServiceOpsShell";
import { AppGuide, GUIDES, guideCss } from "./AppGuide";
import { Closing, homeCss, Label, P } from "./ServiceOpsHome";

/* ServiceOps, Features. The catalogue lives in featuresData. The catalogue section shows one area at a time: an app window
   with a cursor demo, the five main features, and the rest on request. People and companies are sample data. */

/* features that are not built yet are left off this page: it lists what the app does today */
const shown = (items: F[]) => items.filter((f) => f.s !== "planned");

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

function Row({ f }: { f: F }) {
  return (
    <div className="fz-row">
      <div className="fz-row-h"><b>{f.n}</b></div>
      <p>{f.d}{f.note && !/demo/i.test(f.note) && <span className="fz-note"> {f.note}</span>}</p>
    </div>
  );
}

/* the five features most people look for in each area; the rest open under them */
const TOP: Record<string, string[]> = {
  work: ["Requests inbox", "Work orders", "Estimates", "Dispatch", "Jobs"],
  field: ["Technician app", "Required checklist steps", "Customer sign-off options", "Problem buttons", "Works offline"],
  records: ["Customers", "Partners", "Assets", "Inventory", "Catalog"],
  money: ["Billing", "Customer payment link", "Insights and Reports", "Profitability", "Job costing tab"],
  ai: ["EVI assistant", "Agents", "AI hub", "Approve, dismiss and Ask why", "Privacy protections"],
  customers: ["Online booking page", "Estimate approval link", "Payment link", "Review page", "Customer portal"],
  automation: ["Automation rules", "Run now with a dry run", "Events", "Bell inbox", "Delivery log"],
  look: ["Layouts", "Colour themes and banner", "Customize Home page", "Global search", "Custom fields"],
  setup: ["Roles and permissions", "Users and invites", "Settings", "Activity log", "Integrations"],
};

function useMedia(q: string) {
  return useSyncExternalStore(
    (cb) => { const m = window.matchMedia(q); m.addEventListener("change", cb); return () => m.removeEventListener("change", cb); },
    () => window.matchMedia(q).matches,
    () => false,
  );
}
function useHash() {
  return useSyncExternalStore(
    (cb) => { window.addEventListener("hashchange", cb); return () => window.removeEventListener("hashchange", cb); },
    () => window.location.hash.slice(1),
    () => "",
  );
}

/* one area at a time: the list of areas on the left, and on the right the app window, the five main features and the rest */
function Explorer() {
  const hash = useHash();
  const mobile = useMedia("(max-width:899px)");
  const reduced = useMedia("(prefers-reduced-motion: reduce)");
  const [sel, setSel] = useState<{ id: string; hash: string } | null>(null);
  const [tour, setTour] = useState(true);
  const [held, setHeld] = useState(false);
  const [all, setAll] = useState<string | null>(null);
  // a link to another area (a changed address hash) wins over the last click
  const id = hash !== sel?.hash && AREAS.some((a) => a.id === hash) ? hash : sel?.id ?? AREAS[0].id;

  const go = (nid: string) => {
    window.history.replaceState(null, "", `#${nid}`);
    setSel({ id: nid, hash: nid });
    setTour(false);
  };
  // the areas take turns on their own, each after its demo has played, until a visitor picks one or is reading
  const next = () => {
    const k = AREAS.findIndex((a) => a.id === id);
    setSel({ id: AREAS[(k + 1) % AREAS.length].id, hash });
  };
  const linked = hash !== sel?.hash && AREAS.some((a) => a.id === hash);
  const running = tour && !held && !mobile && !reduced && !linked;

  const body = (a: (typeof AREAS)[number]) => {
    const items = shown(a.items);
    const top = (TOP[a.id] ?? []).map((n) => items.find((f) => f.n === n)).filter((f): f is F => !!f);
    const rest = items.filter((f) => !top.includes(f));
    const open = all === a.id;
    return (
      <div className="fe-body" onMouseEnter={() => setHeld(true)} onMouseLeave={() => setHeld(false)} onFocus={() => setHeld(true)} onBlur={() => setHeld(false)}>
        {GUIDES[a.id] && <AppGuide key={a.id} id={a.id} onEnd={running ? next : undefined} />}
        <div className="fe-top">
          {top.map((f) => (
            <div key={f.n} className="fe-card">
              <b>{f.n}</b>
              <p>{f.d}{f.note && !/demo/i.test(f.note) && <span className="fz-note"> {f.note}</span>}</p>
            </div>
          ))}
        </div>
        {rest.length > 0 && (
          <>
            <button type="button" className="fe-more" aria-expanded={open} onClick={() => { setAll(open ? null : a.id); setTour(false); }}>
              {open ? "Show fewer features" : `Show all ${items.length} features`}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: open ? "rotate(180deg)" : "none" }}><path d="m6 9 6 6 6-6" /></svg>
            </button>
            {open && <div className="fz-rows fe-rest">{rest.map((f) => <Row key={f.n} f={f} />)}</div>}
          </>
        )}
      </div>
    );
  };

  return (
    <div className="fe">
      <div>
        <p className="fe-hint"><span>Select an area</span><span>{String(AREAS.findIndex((a) => a.id === id) + 1).padStart(2, "0")} / {String(AREAS.length).padStart(2, "0")}</span></p>
        <ul className="fe-list" role={mobile ? undefined : "tablist"} aria-label="Features by area" aria-orientation="vertical">
          {AREAS.map((a, n) => {
            const on = a.id === id;
            return (
              <li key={a.id} id={a.id} className={`fe-item${on ? " on" : ""}`}>
                <button type="button" role={mobile ? undefined : "tab"} aria-selected={mobile ? undefined : on} aria-expanded={mobile ? on : undefined} onClick={() => go(a.id)}>
                  <i>{String(n + 1).padStart(2, "0")}</i><span>{AREA_TEXT[a.id]?.k ?? a.k}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </button>
                {on && (
                  <div className="fe-desc">
                    <p className="fe-t">{AREA_TEXT[a.id]?.title ?? a.title}</p>
                    <p>{a.lead}</p>
                    {mobile && body(a)}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      {!mobile && <div role="tabpanel" aria-label={AREA_TEXT[id]?.k ?? AREAS.find((a) => a.id === id)!.k}>{body(AREAS.find((a) => a.id === id)!)}</div>}
    </div>
  );
}

export function ServiceOpsFeatures() {
  return (
    <ServiceOpsShell page="features">
      <style>{homeCss}</style>
      <style>{css}</style>
      <style>{guideCss}</style>

      {/* hero */}
      <section className="fh-out">
        <div className="fh">
          <div className="fh-copy">
            <Label>ServiceOps features</Label>
            <h1>From the first request to the finished job.</h1>
            <p>The features in the app today, by area. Each line says what you can do.</p>
            <div className="v2-ctas"><SoDemo location="features_hero">Request a Demo</SoDemo></div>
          </div>
          <div className="fh-vis">
            <div className="fh-photo"><img src="/serviceops/v2/install.jpg" alt="Two technicians reviewing a job on a tablet at a site" style={{ objectPosition: "78% 45%" }} /></div>
          </div>
        </div>
      </section>

      {/* the catalogue */}
      <section className="v2-sec v2-out v2-grey" id="catalogue">
        <div className="v2-in">
          <Explorer />
        </div>
      </section>

      {/* roles */}
      <section className="v2-sec v2-out" id="roles">
        <div className="v2-in">
          <div className="tr-head" data-rv>
            <div>
              <Label>Roles</Label>
              <h2 className="v2-h2">Each role opens its own screens.</h2>
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

      <Closing />
    </ServiceOpsShell>
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


  /* roles: pick one and see what it opens and uses */
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
  .fe{display:grid;grid-template-columns:minmax(0,.34fr) minmax(0,.66fr);gap:48px;align-items:start}
  .fe>div:first-child{position:sticky;top:84px}
  .fe-hint{display:flex;align-items:center;justify-content:space-between;margin:0 0 12px;padding:0 4px;font-family:var(--font-display),system-ui,sans-serif;font-size:11.5px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:${MUTED}}
  .fe-list{list-style:none;margin:0;padding:0;border-bottom:1px solid #D9D3C9}
  .fe-item{scroll-margin-top:84px;border-top:1px solid #D9D3C9}
  .fe-item.on,.fe-item.on+.fe-item{border-top-color:transparent}
  .fe-item>button{all:unset;box-sizing:border-box;display:flex;align-items:center;gap:14px;width:100%;padding:14px 16px;border-radius:14px;cursor:pointer;font-family:var(--font-display),system-ui,sans-serif;font-size:16px;font-weight:600;color:${BODY};transition:background .2s ease,color .2s ease}
  .fe-item>button:hover{background:#fff;color:${INK}}
  .fe-item>button:focus-visible{outline:2px solid ${AMBER_DEEP};outline-offset:2px}
  .fe-item>button i{flex:0 0 auto;width:22px;font-style:normal;font-size:11px;font-weight:600;letter-spacing:.14em;color:${MUTED}}
  .fe-item>button span{flex:1}
  .fe-item>button svg{flex:0 0 auto;width:18px;height:18px;opacity:.5;transition:transform .2s ease,opacity .2s ease}
  .fe-item>button:hover svg{opacity:1;transform:translateX(3px)}
  .fe-item.on>button{background:#fff;color:${INK};font-weight:700;box-shadow:0 14px 30px -20px rgba(32,26,20,.5),0 0 0 1px ${LINE}}
  .fe-item.on>button i{color:${AMBER_DEEP}}
  .fe-item.on>button svg{opacity:1;color:${AMBER_DEEP};transform:none}
  .fe-desc{padding:12px 16px 18px}
  .fe-desc p{margin:0;font-size:14.5px;line-height:1.6;color:${BODY}}
  .fe-desc .fe-t{margin-bottom:4px;font-family:var(--font-display),system-ui,sans-serif;font-size:16.5px;font-weight:600;color:${INK}}
  .fe-body{min-width:0}
  .fe-top{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
  .fe-card{padding:16px 18px;border-radius:16px;background:#fff;box-shadow:inset 0 0 0 1px ${LINE}}
  .fe-card:last-child:nth-child(odd){grid-column:1 / -1}
  .fe-card b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:16px;font-weight:600;color:${INK}}
  .fe-card p{margin:5px 0 0;font-size:14px;line-height:1.55;color:${BODY}}
  .fe-more{all:unset;box-sizing:border-box;display:inline-flex;align-items:center;gap:8px;margin-top:16px;padding:11px 18px;border-radius:12px;cursor:pointer;background:#fff;box-shadow:inset 0 0 0 1.5px ${AMBER_DEEP};font-family:var(--font-display),system-ui,sans-serif;font-size:14px;font-weight:600;color:${AMBER_DEEP};transition:background .2s ease}
  .fe-more:hover{background:#FFF8EC}
  .fe-more:focus-visible{outline:2px solid ${AMBER_DEEP};outline-offset:2px}
  .fe-more svg{width:16px;height:16px;transition:transform .2s ease}
  .fe-rest{margin-top:14px;animation:feIn .35s ease both}
  @media (max-width:420px){.fr{grid-template-columns:1fr}}
  @keyframes feIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
  .fz-rows{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 40px}
  .fz-row{padding:16px 0;border-top:1px solid #DDD8D0}
  .fz-row-h{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
  .fz-row b{font-family:var(--font-display),system-ui,sans-serif;font-size:16.5px;font-weight:600;color:${INK}}
  .fz-row p{margin:4px 0 0;font-size:15px;line-height:1.55;color:${BODY}}
  .fz-note{color:${MUTED}}

  @media (max-width:1180px){.fr{grid-template-columns:repeat(2,minmax(0,1fr))}}
  @media (max-width:899px){.fe{grid-template-columns:minmax(0,1fr);gap:0}.fe>div:first-child{position:static}.fe-item .fe-body{margin-top:14px}}
  @media (max-width:980px){
    .fh{grid-template-columns:1fr;gap:0;padding:0 20px 48px;min-height:0}
    .fh-copy{padding:56px 0 36px}
    .fh-vis{height:400px}
    .fz-rows{grid-template-columns:minmax(0,1fr)}
  }
  @media (max-width:640px){
    .fh{padding:0 16px 40px}
    .fh-vis{height:auto}.fh-photo{position:relative;width:100%;height:240px}.fh-key{position:relative;left:auto;bottom:auto;width:auto;margin:-40px 12px 0}
    .fe-top{grid-template-columns:1fr}
    .fr{grid-template-columns:1fr 1fr;gap:12px}.fr li{padding:8px 8px 16px}
  }
`;
