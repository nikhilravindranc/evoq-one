"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import { AREAS, ROLES, type F } from "./featuresData";
import { AMBER, AMBER_DEEP, BODY, G1, G2, INK, LINE, MUTED } from "./palette";
import { V2Demo, V2Shell } from "./V2Shell";
import { AppGuide, GUIDES, guideCss } from "./AppGuide";
import { Closing, homeCss, Label, P } from "./ServiceOpsV2";

/* ServiceOps v2, Features. The catalogue lives in featuresData:
   real photos with the matching app screen over each area. People and companies are sample data. */

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
      <style>{guideCss}</style>

      {/* hero */}
      <section className="fh-out">
        <div className="fh">
          <div className="fh-copy">
            <Label>ServiceOps features</Label>
            <h1>From the first request to the finished job.</h1>
            <p>The features in the app today, by area. Each line says what you can do.</p>
            <div className="v2-ctas"><V2Demo location="features_hero">Request a Demo</V2Demo></div>
          </div>
          <div className="fh-vis">
            <div className="fh-photo"><img src="/serviceops/v2/install.jpg" alt="Two technicians reviewing a job on a tablet at a site" style={{ objectPosition: "78% 45%" }} /></div>
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
              return (
                <section key={a.id} id={a.id} className="fz-area" data-rv>
                  <div className="fz-area-h">
                    <span className="fz-num">{String(n + 1).padStart(2, "0")}</span>
                    <div><span className="fz-k">{AREA_TEXT[a.id]?.k ?? a.k}</span><h3>{AREA_TEXT[a.id]?.title ?? a.title}</h3><p>{a.lead}</p></div>
                  </div>
                  {GUIDES[a.id] && <AppGuide id={a.id} />}
                  <div className="fz-rows">{shown(a.items).map((f) => <Row key={f.n} f={f} />)}</div>
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
  }
  @media (max-width:420px){.fr{grid-template-columns:1fr}}
`;
