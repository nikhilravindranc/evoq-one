"use client";

import { useMemo, useState } from "react";
import { ArrowLeftRight, ArrowRight, Check, Layers, Plug, Repeat, Wrench, Zap, Clock } from "lucide-react";
import { APP, APPS, C, CAT_LABEL, CATS, type App } from "./data";
import { Closing, Mark, SyncShell, useDemo } from "./Shell";
import { Faq, Label, sharedCss } from "./SyncV1";

/* EVOQ Sync v1 pricing. Sync is quoted by app pair and sync direction, so this page has no list prices: it shows what
   can move between the two apps chosen (from the Sync app catalog) and sends the pair with the quote request. */

/* objects that line up across apps even when the names differ */
const SAME: Record<string, string> = { "Sales Order": "Order", Order: "Order", Opportunity: "Deal", Deal: "Deal", Contact: "Contact", Customer: "Customer" };
function movable(a: App, b: App) {
  const key = (o: string) => SAME[o] ?? o;
  const out: string[] = [];
  a.objects.forEach((o) => {
    const m = b.objects.find((x) => key(x) === key(o));
    if (m && !out.includes(o === m ? o : `${o} to ${m}`)) out.push(o === m ? o : `${o} to ${m}`);
  });
  return out;
}

function Picker({ label, value, other, onPick }: { label: string; value: string; other: string; onPick: (id: string) => void }) {
  const [cat, setCat] = useState(APP(value).cat);
  const list = APPS.filter((a) => a.cat === cat);
  return (
    <div className="pk">
      <div className="pk-hd"><span>{label}</span><b><Mark id={value} size={24} />{APP(value).name}</b></div>
      <div className="pk-cats" role="tablist" aria-label={`${label} category`}>
        {CATS.map((c) => <button key={c} type="button" role="tab" aria-selected={cat === c} className={cat === c ? "on" : undefined} onClick={() => setCat(c)}>{CAT_LABEL[c]}</button>)}
      </div>
      <ul className="pk-apps">
        {list.map((a) => {
          const off = a.id === other;
          return (
            <li key={a.id}>
              <button type="button" disabled={off} aria-pressed={a.id === value} className={a.id === value ? "on" : undefined} onClick={() => onPick(a.id)}>
                <Mark id={a.id} size={28} /><span className="pk-n">{a.name}</span>{a.soon && <em>Soon</em>}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Configurator() {
  const open = useDemo();
  const [src, setSrc] = useState("shopify");
  const [dst, setDst] = useState("netsuite");
  const [two, setTwo] = useState(false);
  const a = APP(src), b = APP(dst);
  const objs = useMemo(() => movable(a, b), [a, b]);
  const sameCat = a.cat === b.cat;
  return (
    <div className="cf" data-rv>
      <div className="cf-pick">
        <Picker key={`s-${src}`} label="Source app" value={src} other={dst} onPick={setSrc} />
        <button type="button" className="cf-swap" aria-label="Swap source and destination" onClick={() => { setSrc(dst); setDst(src); }}><ArrowLeftRight aria-hidden /></button>
        <Picker key={`d-${dst}`} label="Destination app" value={dst} other={src} onPick={setDst} />
      </div>
      <aside className="cf-sum" aria-live="polite">
        <span className="cf-sum-t">Your integration</span>
        <div className="cf-pair">
          <Mark id={src} size={44} /><span className="cf-arrow">{two ? "⇄" : "→"}</span><Mark id={dst} size={44} />
        </div>
        <b className="cf-name">{a.name} {two ? "and" : "to"} {b.name}</b>
        <div className="cf-dir" role="radiogroup" aria-label="Sync direction">
          <button type="button" role="radio" aria-checked={!two} className={!two ? "on" : undefined} onClick={() => setTwo(false)}><ArrowRight aria-hidden />Single direction</button>
          <button type="button" role="radio" aria-checked={two} className={two ? "on" : undefined} onClick={() => setTwo(true)}><Repeat aria-hidden />Both directions</button>
        </div>
        <dl className="cf-facts">
          <div><dt>What can move</dt><dd>{objs.length ? objs.join(", ") : "Mapped field by field, set up with you"}</dd></div>
          <div><dt>When it runs</dt><dd>{a.events ? <><Zap aria-hidden />On record events in {a.name}, or on a schedule</> : <><Clock aria-hidden />On a schedule, or on demand</>}</dd></div>
          <div><dt>How each app signs in</dt><dd>{a.name}: {a.auth.join(" or ")}<br />{b.name}: {b.auth.join(" or ")}</dd></div>
          {two && <div><dt>Conflict policy</dt><dd>You choose which side wins when both change</dd></div>}
          {(a.soon || b.soon) && <div><dt>Availability</dt><dd>{[a, b].filter((x) => x.soon).map((x) => x.name).join(", ")} is coming soon</dd></div>}
          {sameCat && <div><dt>Note</dt><dd>Both apps are {CAT_LABEL[a.cat]}. We will confirm the setup on the call.</dd></div>}
        </dl>
        <button type="button" className="sx-btn primary cf-cta" onClick={() => open(`pricing_${src}_${dst}_${two ? "both" : "single"}`, `Price for ${a.name} ${two ? "and" : "to"} ${b.name}`)}>Get the price for this pair</button>
        <small className="cf-note">Priced by the apps you connect and the direction. You get the figure on the walkthrough, with the setup.</small>
      </aside>
    </div>
  );
}

const HOW = [
  { i: Layers, t: "By app pair", d: "Each integration connects a source and a destination. The pair you choose sets the starting point." },
  { i: Repeat, t: "By direction", d: "A single direction, or both directions with a conflict policy. Both directions means more mapping and checks." },
  { i: Plug, t: "Add pairs as you grow", d: "Start with the two systems that disagree most. Add the next integration when you need it." },
  { i: Wrench, t: "Custom work quoted apart", d: "Custom connectors and unusual requirements are available as expert assisted implementation." },
];
const INCLUDED = [
  "Connections with OAuth 2.0, API key or token, and alerts before they expire",
  "The guided wizard, templates and the Workflow Builder with Run Test",
  "Data mapping with transformations, required field checks and a record preview",
  "Monitoring, the error queue and logs for every record",
  "Explained failures: the exact error, likely cause, suggested fix and retry safety",
  "EVI on every screen, and Sync Agent proposals that wait for approval",
  "Controls for each agent capability, and the approval and autonomy policy",
  "Reports with CSV export, roles, MFA, SSO and audit history",
];

export function SyncV1Pricing() {
  return (
    <SyncShell page="pricing">
      <style>{css}</style>
      <section className="sx-out ph">
        <div className="sx-in">
          <div className="sx-head c ph-head">
            <Label>Pricing</Label>
            <h1 data-rv>Priced by the apps you connect and the direction data moves.</h1>
            <p data-rv="1">Pick your two apps to see what can move between them, how it runs, and how each app signs in. Then get the price for that pair.</p>
          </div>
          <Configurator />
        </div>
      </section>

      <section className="sx-sec sx-out sx-grey">
        <div className="sx-in">
          <div className="sx-head">
            <Label>How pricing works</Label>
            <h2 data-rv>Four things set the price.</h2>
          </div>
          <div className="pw">
            {HOW.map((h, k) => {
              const I = h.i;
              return <article key={h.t} className="pw-c" data-rv={k}><span><I aria-hidden /></span><h3>{h.t}</h3><p>{h.d}</p></article>;
            })}
          </div>
        </div>
      </section>

      <section className="sx-sec sx-out">
        <div className="sx-in pi">
          <div>
            <Label>Included with every integration</Label>
            <h2 data-rv>The whole product, not a starter tier.</h2>
            <p className="pi-p" data-rv="1">The same screens on every integration you run. Usage against your plan shows in Settings and in Reports.</p>
          </div>
          <ul className="pi-list">
            {INCLUDED.map((x, k) => <li key={x} data-rv={k % 4}><span><Check aria-hidden /></span>{x}</li>)}
          </ul>
        </div>
      </section>

      <Faq items={[
        ["Why is there no list price on this page?", "The price depends on the two apps and the direction, and on how much mapping the pair needs. You get the figure on the walkthrough, against your own setup."],
        ["What if my app is not in the catalog?", "Anything with a REST API can be connected through a custom API connection. New connectors are added on request, and custom connectors can be built as expert assisted implementation."],
        ["Does syncing in both directions change the price?", "Direction is part of the quote. Both directions needs mapping and a conflict policy on each side, so the quote reflects that work."],
        ["Are EVI and the Sync Agent extra?", "EVI and the Sync Agent are part of the product on every integration. Ask on the walkthrough if your plan needs specific limits."],
        ["Is there a free trial?", "EVOQ works through a demo. On the walkthrough we set up your pair, run it on sample data and show the price."],
      ]} />
      <Closing title="Tell us the pair. We will show you the price and the setup." text="Bring the two systems that disagree most. We map the fields, run a test on sample data and give you the price for that pair." />
    </SyncShell>
  );
}

const css = `
  ${sharedCss}
  .ph{padding-top:72px;padding-bottom:96px;background:radial-gradient(900px 420px at 50% 0%,${C.tint},rgba(255,255,255,0) 70%),#fff}
  .ph-head{max-width:860px}
  .ph-head h1{margin-top:4px}

  .cf{display:grid;grid-template-columns:1fr 360px;gap:20px;align-items:start}
  .cf-pick{position:relative;display:grid;grid-template-columns:1fr 1fr;gap:14px}
  .cf-swap{position:absolute;left:50%;top:24px;z-index:2;display:flex;align-items:center;justify-content:center;width:38px;height:38px;margin-left:-19px;border-radius:50%;border:0;background:${C.primary};color:#fff;cursor:pointer;box-shadow:0 0 0 5px #fff}
  .cf-swap svg{width:17px;height:17px}
  .pk{padding:18px;border-radius:20px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line};min-width:0}
  .pk-hd{display:flex;flex-direction:column;gap:6px;padding-bottom:14px;border-bottom:1px solid ${C.line}}
  .pk-hd span{font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:${C.muted}}
  .pk-hd b{display:flex;align-items:center;gap:10px;font-family:var(--font-display),system-ui,sans-serif;font-size:18px;color:${C.ink}}
  .pk-cats{display:flex;flex-wrap:wrap;gap:6px;margin:14px 0}
  .pk-cats button{padding:5px 11px;border-radius:999px;border:1px solid ${C.line};background:#fff;font-size:13px;font-weight:500;color:${C.body};cursor:pointer}
  .pk-cats button.on{background:${C.ink};border-color:${C.ink};color:#fff}
  .pk-apps{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:8px}
  .pk-apps button{display:flex;align-items:center;gap:10px;width:100%;padding:9px 10px;border-radius:12px;border:0;background:${C.g1};text-align:left;font-size:14px;font-weight:500;color:${C.ink};cursor:pointer;transition:box-shadow .15s ease,background .15s ease}
  .pk-apps .pk-n{flex:1;min-width:0;line-height:1.3}
  .pk-apps button em{padding:0 6px;border-radius:5px;background:#FEF3C7;font-style:normal;font-size:11px;font-weight:600;color:#92400E}
  .pk-apps button:hover{background:${C.tint}}
  .pk-apps button.on{background:${C.surface};box-shadow:inset 0 0 0 1.5px ${C.primary}}
  .pk-apps button:disabled{opacity:.4;cursor:not-allowed}

  .cf-sum{position:sticky;top:84px;padding:24px;border-radius:22px;background:${C.depth};color:#D9CCF0}
  .cf-sum-t{font-size:12px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:${C.lime}}
  .cf-pair{display:flex;align-items:center;gap:12px;margin-top:16px}
  .cf-arrow{font-size:24px;font-weight:700;color:${C.lime}}
  .cf-name{display:block;margin-top:14px;font-family:var(--font-display),system-ui,sans-serif;font-size:21px;line-height:1.3;color:#fff}
  .cf-dir{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:16px;padding:4px;border-radius:12px;background:rgba(255,255,255,.08)}
  .cf-dir button{display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:9px 8px;border:0;border-radius:9px;background:transparent;color:#D9CCF0;font-size:13.5px;font-weight:600;cursor:pointer}
  .cf-dir button svg{width:15px;height:15px}
  .cf-dir button.on{background:#fff;color:${C.ink}}
  .cf-facts{margin:18px 0 0;display:grid;gap:12px}
  .cf-facts div{padding-top:12px;border-top:1px solid rgba(255,255,255,.12)}
  .cf-facts dt{font-size:12px;font-weight:600;letter-spacing:.04em;color:#B9A8D8}
  .cf-facts dd{margin:4px 0 0;font-size:14.5px;line-height:1.5;color:#fff}
  .cf-facts dd svg{display:inline-block;width:14px;height:14px;vertical-align:-2px;margin-right:6px;color:${C.lime}}
  .sx-btn.cf-cta{width:100%;margin-top:20px;background:${C.lime};color:${C.limeInk};box-shadow:none}
  .sx-btn.cf-cta:hover{background:#B5EF4F}
  .cf-note{display:block;margin-top:12px;font-size:13px;line-height:1.5;color:#B9A8D8}

  .pw{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
  .pw-c{padding:24px;border-radius:20px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line}}
  .pw-c>span{display:flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:12px;background:${C.tint};color:${C.primary}}
  .pw-c>span svg{width:20px;height:20px}
  .pw-c h3{--h3-size:19px;margin-top:18px!important}
  .pw-c p{margin:8px 0 0;font-size:15px}

  .pi{display:grid;grid-template-columns:.9fr 1.1fr;gap:56px;align-items:start}
  .pi .sx-label{margin-bottom:14px}
  .pi-p{margin:16px 0 0;font-size:17px}
  .pi-list{list-style:none;margin:0;padding:0;display:grid;gap:10px}
  .pi-list li{display:flex;gap:12px;align-items:flex-start;padding:14px 16px;border-radius:14px;background:${C.g1};font-size:15.5px;color:${C.ink}}
  .pi-list li span{display:flex;align-items:center;justify-content:center;width:22px;height:22px;margin-top:1px;border-radius:6px;background:${C.primary};color:#fff;flex-shrink:0}
  .pi-list li span svg{width:13px;height:13px}

  @media (max-width:1100px){
    .cf{grid-template-columns:1fr}
    .cf-sum{position:static}
    .pw{grid-template-columns:1fr 1fr}
  }
  @media (max-width:760px){
    .ph{padding-top:48px;padding-bottom:64px}
    .cf-pick{grid-template-columns:1fr}
    .cf-swap{position:static;margin:0 auto;box-shadow:none;transform:rotate(90deg)}
    .pi{grid-template-columns:1fr;gap:28px}
    .pw{grid-template-columns:1fr}
  }
  @media (max-width:420px){.pk-apps{grid-template-columns:1fr}}
`;
