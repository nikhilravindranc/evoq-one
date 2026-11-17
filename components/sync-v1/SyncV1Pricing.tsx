"use client";

import { useMemo, useRef, useState } from "react";
import { ArrowRight, Check, Clock, DollarSign, Repeat, Search, Zap } from "lucide-react";
import { APP, APPS, C, CAT_LABEL, CATS, type App } from "./data";
import { Mark, SyncShell, useDemo } from "./Shell";
import { Faq, Label, sharedCss } from "./SyncV1";

/* EVOQ Sync v1 pricing. Same flow as the live Sync pricing page: pick two apps, choose the direction, request pricing.
   Sync is quoted by app pair and direction, so there are no list prices. The pair is sent with the request. */

/* objects that line up across apps even when the names differ */
const SAME: Record<string, string> = { "Sales Order": "Order", Order: "Order", Opportunity: "Deal", Deal: "Deal", Contact: "Contact", Customer: "Customer" };
function movable(a: App, b: App) {
  const key = (o: string) => SAME[o] ?? o;
  const out: string[] = [];
  a.objects.forEach((o) => {
    const m = b.objects.find((x) => key(x) === key(o));
    const label = o === m ? o : `${o} to ${m}`;
    if (m && !out.includes(label)) out.push(label);
  });
  return out;
}

const HIGHLIGHTS = [
  "CRM, ERP, ecommerce and business app integrations",
  "One way or bidirectional sync support",
  "Flexible sync frequency",
  "Secure operational data handling",
  "Scalable for growing teams and workflows",
];

function Configurator() {
  const open = useDemo();
  const [src, setSrc] = useState("");
  const [dst, setDst] = useState("");
  const [two, setTwo] = useState(false);
  const [q, setQ] = useState("");
  const list = useRef<HTMLDivElement>(null);

  const a = src ? APP(src) : null;
  const b = dst ? APP(dst) : null;
  const ready = !!(a && b);
  const objs = useMemo(() => (a && b ? movable(a, b) : []), [a, b]);

  const pick = (id: string) => {
    if (id === src) return setSrc("");
    if (id === dst) return setDst("");
    if (!src) return setSrc(id);
    setDst(id);
  };

  const groups = CATS.map((c) => ({ c, items: APPS.filter((x) => x.cat === c && x.name.toLowerCase().includes(q.trim().toLowerCase())) })).filter((g) => g.items.length);

  const jump = (c: string) => {
    const box = list.current;
    const el = box?.querySelector<HTMLElement>(`[data-cat="${c}"]`);
    if (box && el) box.scrollTo({ top: el.offsetTop - 8, behavior: "smooth" });
  };

  return (
    <div className="cf" data-rv>
      <section className="cf-p cf-apps" aria-label="Select applications">
        <div className="cf-ph">
          <div><b className="cf-t">Select applications</b><small>Choose a source and a destination</small></div>
          <div className="cf-steps" aria-hidden><i className={src ? "on" : undefined}>1</i><u /><i className={dst ? "on" : undefined}>2</i></div>
        </div>
        <label className="cf-search"><Search aria-hidden /><input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search applications" aria-label="Search applications" /></label>
        <div className="cf-jump"><small>Jump to</small>{CATS.map((c) => <button key={c} type="button" onClick={() => jump(c)}>{CAT_LABEL[c]}</button>)}</div>
        <div className="cf-list" ref={list}>
          {groups.map((g) => (
            <div key={g.c} data-cat={g.c}>
              <p className="cf-cat">{CAT_LABEL[g.c]}</p>
              <ul>
                {g.items.map((x) => {
                  const n = x.id === src ? 1 : x.id === dst ? 2 : 0;
                  return (
                    <li key={x.id}>
                      <button type="button" aria-pressed={n > 0} className={n ? "on" : undefined} onClick={() => pick(x.id)}>
                        <Mark id={x.id} size={34} />
                        <span>{x.name}</span>
                        {x.soon && <em>Soon</em>}
                        {n > 0 && <i>{n}</i>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
          {!groups.length && <p className="cf-none">No application matches “{q}”.</p>}
        </div>
      </section>

      <section className="cf-p cf-pair" aria-label="Your integration" aria-live="polite">
        <div className="cf-ph"><div><b className="cf-t">Your integration</b><small>Apps and sync direction</small></div></div>
        {a || b ? (
          <div className="cf-chosen">
            <div className="cf-app">{a ? <Mark id={a.id} size={52} /> : <span className="cf-blank">1</span>}<b>{a ? a.name : "Source"}</b></div>
            <span className="cf-arrow">{two ? <Repeat aria-hidden /> : <ArrowRight aria-hidden />}</span>
            <div className="cf-app">{b ? <Mark id={b.id} size={52} /> : <span className="cf-blank">2</span>}<b>{b ? b.name : "Destination"}</b></div>
          </div>
        ) : (
          <div className="cf-empty"><span><ArrowRight aria-hidden /></span>Select apps to configure</div>
        )}
        <div className="cf-dirl">Sync direction</div>
        <div className="cf-dir" role="radiogroup" aria-label="Sync direction">
          <button type="button" role="radio" aria-checked={!two} className={!two ? "on" : undefined} onClick={() => setTwo(false)}><ArrowRight aria-hidden /><b>One way</b><small>Data flows in one direction</small></button>
          <button type="button" role="radio" aria-checked={two} className={two ? "on" : undefined} onClick={() => setTwo(true)}><Repeat aria-hidden /><b>Two way</b><small>Bidirectional sync</small></button>
        </div>
        {a && b && (
          <dl className="cf-facts">
            <div><dt>What can move</dt><dd>{objs.length ? objs.join(", ") : "Mapped field by field, set up with you"}</dd></div>
            <div><dt>When it runs</dt><dd>{a.events ? <><Zap aria-hidden />On record events in {a.name}, or on a schedule</> : <><Clock aria-hidden />On a schedule, or on demand</>}</dd></div>
            {(a.soon || b.soon) && <div><dt>Availability</dt><dd>{[a, b].filter((x) => x.soon).map((x) => x.name).join(", ")} is coming soon</dd></div>}
          </dl>
        )}
      </section>

      <aside className="cf-p cf-price">
        <div className="cf-ph"><div><b className="cf-t">Custom pricing</b><small>Quote based on your selection</small></div></div>
        {ready ? (
          <div className="cf-quote">
            <div className="cf-qpair"><Mark id={a.id} size={36} /><span>{two ? <Repeat aria-hidden /> : <ArrowRight aria-hidden />}</span><Mark id={b.id} size={36} /></div>
            <b>{a.name} {two ? "and" : "to"} {b.name}</b>
            <p>Pricing is tailored to your apps, sync complexity and operational requirements.</p>
          </div>
        ) : (
          <div className="cf-empty"><span><DollarSign aria-hidden /></span>Select two apps to see pricing<small>Pricing updates automatically</small></div>
        )}
        <div className="cf-hl">
          <small>Included highlights</small>
          <ul>{HIGHLIGHTS.map((x) => <li key={x}><span><Check aria-hidden /></span>{x}</li>)}</ul>
        </div>
        <button
          type="button"
          className="sx-btn primary cf-cta"
          disabled={!ready}
          onClick={() => a && b && open(`pricing_${src}_${dst}_${two ? "both" : "single"}`, `Pricing for ${a.name} ${two ? "and" : "to"} ${b.name}`)}
        >
          Request pricing
        </button>
      </aside>
    </div>
  );
}

export function SyncV1Pricing() {
  return (
    <SyncShell page="pricing">
      <style>{css}</style>
      <section className="sx-out ph">
        <div className="sx-in">
          <div className="sx-head c ph-head">
            <Label>Pricing</Label>
            <h1 data-rv>Build your <span className="t2">integration.</span></h1>
            <p data-rv="1">Select any two apps and choose your sync direction. EVOQ Sync connects CRM, ERP, ecommerce and business apps with flexible one way and two way sync options.</p>
          </div>
          <Configurator />
        </div>
      </section>

      <Faq items={[
        ["Why is there no list price on this page?", "Pricing is tailored to the two apps, the sync direction, the complexity of the sync and your operational requirements. Request pricing for your pair and you get the figure with the setup."],
        ["What if my app is not in the list?", "Anything with a REST API can be connected through a Custom REST API Connection. New connectors are added on request."],
        ["Does syncing in both directions change the price?", "Direction is part of the quote. Two way sync needs mapping and a conflict policy on each side, so the quote reflects that work."],
        ["Are EVI and the Sync Agent extra?", "EVI and the Sync Agent are part of the product on every integration. Ask on the walkthrough if your plan needs specific limits."],
        ["Is there a free trial?", "EVOQ works through a demo. On the walkthrough we set up your pair, run it on sample data and show the price."],
      ]} />
    </SyncShell>
  );
}

const css = `
  ${sharedCss}
  .ph{padding-top:72px;padding-bottom:96px;background:radial-gradient(900px 420px at 50% 0%,${C.tint},rgba(255,255,255,0) 70%),#fff}
  .ph-head{max-width:820px}
  .ph-head h1{margin-top:4px}
  .ph-head h1 .t2{color:#8E8C96}

  .cf{display:grid;grid-template-columns:1.25fr 1fr 1fr;gap:16px;align-items:stretch;margin-top:12px}
  .cf-p{display:flex;flex-direction:column;gap:14px;min-width:0;padding:22px;border-radius:24px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line},0 24px 50px -36px rgba(46,16,101,.4)}
  .cf-ph{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}
  .cf-t{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:20px;line-height:1.25;color:${C.ink}}
  .cf-ph small{display:block;margin-top:3px;font-size:13.5px;color:${C.muted}}
  .cf-steps{display:flex;align-items:center;gap:6px;flex-shrink:0;padding-top:2px}
  .cf-steps i{display:flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;background:${C.g1};box-shadow:inset 0 0 0 1px ${C.line};font-style:normal;font-size:12px;font-weight:700;color:${C.muted};transition:background .2s ease,color .2s ease}
  .cf-steps i.on{background:${C.primary};box-shadow:none;color:#fff}
  .cf-steps u{width:16px;height:2px;background:${C.line}}

  .cf-search{display:flex;align-items:center;gap:10px;padding:0 14px;height:44px;border-radius:12px;background:${C.g1};box-shadow:inset 0 0 0 1px ${C.line}}
  .cf-search:focus-within{box-shadow:inset 0 0 0 1.5px ${C.primary}}
  .cf-search svg{width:16px;height:16px;color:${C.muted};flex-shrink:0}
  .cf-search input{flex:1;min-width:0;border:0;outline:0;background:transparent;font:500 14.5px var(--font-sans),system-ui,sans-serif;color:${C.ink}}
  .cf-jump{display:flex;flex-wrap:wrap;align-items:center;gap:6px}
  .cf-jump small{margin-right:4px;font-size:12px;font-weight:600;color:${C.muted}}
  .cf-jump button{padding:4px 11px;border-radius:999px;border:1px solid ${C.line};background:#fff;font-size:12.5px;font-weight:600;color:${C.body};cursor:pointer;transition:background .15s ease,color .15s ease}
  .cf-jump button:hover{background:${C.tint};color:${C.primary}}
  .cf-list{position:relative;flex:1;min-height:0;max-height:430px;overflow-y:auto;padding-right:6px;scrollbar-width:thin}
  .cf-cat{margin:14px 0 8px;font-size:12px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:${C.muted}}
  .cf-list>div:first-child .cf-cat{margin-top:0}
  .cf-list ul{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
  .cf-list li button{position:relative;display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;height:100%;padding:14px 6px 10px;border:0;border-radius:14px;background:${C.g1};box-shadow:inset 0 0 0 1px transparent;text-align:center;font-size:13px;font-weight:600;line-height:1.25;color:${C.ink};cursor:pointer;transition:background .15s ease,box-shadow .15s ease}
  .cf-list li button:hover{background:${C.tint}}
  .cf-list li button.on{background:${C.surface};box-shadow:inset 0 0 0 1.5px ${C.primary}}
  .cf-list li button em{position:absolute;top:6px;left:6px;padding:0 6px;border-radius:5px;background:#FEF3C7;font-style:normal;font-size:10.5px;font-weight:600;color:#92400E}
  .cf-list li button i{position:absolute;top:6px;right:6px;display:flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:50%;background:${C.primary};font-style:normal;font-size:11px;font-weight:700;color:#fff}
  .cf-none{margin:20px 0;text-align:center;font-size:14.5px;color:${C.muted}}

  .cf-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;flex:1;min-height:150px;padding:20px;border-radius:18px;background:${C.g1};text-align:center;font-size:14.5px;font-weight:500;color:${C.muted}}
  .cf-empty>span{display:flex;align-items:center;justify-content:center;width:46px;height:46px;border-radius:14px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line};color:${C.muted}}
  .cf-empty>span svg{width:20px;height:20px}
  .cf-empty small{margin:0;font-size:12.5px}
  .cf-chosen{display:flex;align-items:center;justify-content:center;gap:14px;padding:22px 12px;border-radius:18px;background:${C.surface};box-shadow:inset 0 0 0 1px ${C.soft}}
  .cf-app{display:flex;flex-direction:column;align-items:center;gap:8px;min-width:0;text-align:center}
  .cf-app b{font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;line-height:1.25;color:${C.ink}}
  .cf-blank{display:flex;align-items:center;justify-content:center;width:52px;height:52px;border-radius:16px;border:2px dashed ${C.soft};font-weight:700;color:${C.muted}}
  .cf-arrow{display:flex;align-items:center;justify-content:center;width:34px;height:34px;margin-bottom:22px;border-radius:50%;background:${C.primary};color:#fff;flex-shrink:0}
  .cf-arrow svg{width:16px;height:16px}
  .cf-dirl{margin-top:4px;font-size:12px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:${C.muted}}
  .cf-dir{display:grid;gap:8px}
  .cf-dir button{display:grid;grid-template-columns:auto 1fr;column-gap:12px;align-items:center;padding:12px 14px;border:0;border-radius:14px;background:${C.g1};box-shadow:inset 0 0 0 1px transparent;text-align:left;cursor:pointer;transition:background .15s ease,box-shadow .15s ease}
  .cf-dir button svg{grid-row:1 / 3;width:34px;height:34px;padding:8px;border-radius:10px;background:#fff;color:${C.primary}}
  .cf-dir button b{font-family:var(--font-display),system-ui,sans-serif;font-size:15px;color:${C.ink}}
  .cf-dir button small{font-size:13px;color:${C.muted}}
  .cf-dir button.on{background:${C.surface};box-shadow:inset 0 0 0 1.5px ${C.primary}}
  .cf-dir button.on svg{background:${C.primary};color:#fff}
  .cf-facts{margin:0;display:grid;gap:10px}
  .cf-facts div{padding-top:10px;border-top:1px solid ${C.line}}
  .cf-facts dt{font-size:12px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:${C.muted}}
  .cf-facts dd{margin:4px 0 0;font-size:14.5px;line-height:1.5;color:${C.ink}}
  .cf-facts dd svg{display:inline-block;width:14px;height:14px;vertical-align:-2px;margin-right:6px;color:${C.primary}}

  .cf-quote{display:grid;gap:10px;justify-items:start;padding:18px;border-radius:18px;background:${C.surface};box-shadow:inset 0 0 0 1px ${C.soft}}
  .cf-qpair{display:flex;align-items:center;gap:10px}
  .cf-qpair span{display:flex;color:${C.primary}}
  .cf-qpair svg{width:18px;height:18px}
  .cf-quote b{font-family:var(--font-display),system-ui,sans-serif;font-size:18px;line-height:1.3;color:${C.ink}}
  .cf-quote p{margin:0;font-size:14.5px;line-height:1.55;color:${C.body}}
  .cf-hl small{display:block;margin-bottom:10px;font-size:12px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:${C.muted}}
  .cf-hl ul{list-style:none;margin:0;padding:0;display:grid;gap:9px}
  .cf-hl li{display:flex;gap:10px;font-size:14.5px;line-height:1.45;color:${C.ink}}
  .cf-hl li span{display:flex;align-items:center;justify-content:center;width:20px;height:20px;margin-top:1px;border-radius:50%;background:${C.tint};color:${C.primary};flex-shrink:0}
  .cf-hl li span svg{width:12px;height:12px}
  .sx-btn.cf-cta{width:100%;margin-top:auto}
  .sx-btn.cf-cta:disabled{opacity:.45;cursor:not-allowed}

  @media (max-width:1180px){
    .cf{grid-template-columns:1fr 1fr}
    .cf-apps{grid-column:1 / -1}
    .cf-list ul{grid-template-columns:repeat(4,1fr)}
  }
  @media (max-width:760px){
    .ph{padding-top:48px;padding-bottom:64px}
    .cf{grid-template-columns:1fr}
    .cf-p{padding:18px}
    .cf-list{max-height:360px}
    .cf-list ul{grid-template-columns:repeat(3,1fr)}
  }
  @media (max-width:420px){.cf-list ul{grid-template-columns:repeat(2,1fr)}}
  @media (prefers-reduced-motion:reduce){.cf-steps i,.cf-list li button,.cf-dir button{transition:none}}
`;
