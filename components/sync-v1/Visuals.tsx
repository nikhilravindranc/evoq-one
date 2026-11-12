"use client";

import type { ReactNode } from "react";
import { AlertTriangle, ArrowRight, Check, Clock, Database, Filter, GitBranch, Plug, Search, ShieldCheck, Type, X, Zap, type LucideIcon } from "lucide-react";
import { C } from "./data";
import { Mark, SyncMark } from "./Shell";

/* Drawn product visuals for the Sync pages. They show how each area works without reproducing the app's screens;
   only the EVI and Sync Agent sections use captures of the app. Names, IDs and times are sample data. */

export function Panel({ title, tag, children, className = "" }: { title: string; tag?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={`vz ${className}`}>
      <div className="vz-hd"><span className="vz-t"><SyncMark size={20} />{title}</span>{tag}</div>
      <div className="vz-bd">{children}</div>
    </div>
  );
}

const Chip = ({ tone = "n", children }: { tone?: "ok" | "warn" | "err" | "n" | "p"; children: ReactNode }) => <span className={`vz-chip ${tone}`}>{children}</span>;

/* ---- dashboard ---- */
export function VisDashboard() {
  const bars = [[14, 0, 0], [12, 1, 0], [15, 1, 1], [16, 0, 0], [11, 2, 0], [13, 0, 1], [12, 2, 1]];
  return (
    <Panel title="Overview" tag={<Chip tone="n">Last 7 days</Chip>}>
      <div className="vz-stats">
        {[["Integrations", "6", "1 archived"], ["Success rate", "94.2%", "97 of 103 runs"], ["Failed runs", "6", "12 records"], ["Needs you", "8", "3 approvals"]].map(([a, b, c], k) => (
          <div key={a} className={k === 3 ? "vz-stat hot" : "vz-stat"}><small>{a}</small><b>{b}</b><em>{c}</em></div>
        ))}
      </div>
      <div className="vz-two">
        <div className="vz-card">
          <b className="vz-ch">Execution activity</b>
          <div className="vz-bars">{bars.map(([s, p, f], k) => (
            <div key={k}><i style={{ height: f * 6 }} className="f" /><i style={{ height: p * 6 }} className="p" /><i style={{ height: s * 6 }} className="s" /></div>
          ))}</div>
        </div>
        <div className="vz-card">
          <b className="vz-ch">Attention queue <Chip tone="warn">8</Chip></b>
          <ul className="vz-list">
            <li><AlertTriangle aria-hidden /><div><b>QuickBooks credentials expired</b><small>Reauthorize to resume</small></div></li>
            <li><X aria-hidden /><div><b>3 failed records, HubSpot to NetSuite</b><small>EX-20491</small></div></li>
            <li><Clock aria-hidden /><div><b>Delayed run, NetSuite stock</b><small>Every 5 minutes</small></div></li>
          </ul>
        </div>
      </div>
    </Panel>
  );
}

/* ---- connections ---- */
export function VisConnections() {
  const rows: [string, string, string, "ok" | "warn" | "err" | "n", string][] = [
    ["hubspot", "HubSpot Production", "OAuth 2.0", "ok", "Connected"],
    ["netsuite", "NetSuite EMEA", "Token based", "warn", "Attention"],
    ["shopify", "Shopify Main store", "OAuth 2.0", "ok", "Connected"],
    ["quickbooks", "QuickBooks Finance", "OAuth 2.0", "err", "Expired"],
    ["mailchimp", "Mailchimp Marketing", "OAuth 2.0", "n", "Disconnected"],
  ];
  return (
    <Panel title="Connections" tag={<span className="vz-btn"><Plug aria-hidden />Custom API</span>}>
      <ul className="vz-rows">
        {rows.map(([id, n, a, t, s], k) => (
          <li key={id}><Mark id={id} size={34} /><div><b>{n}</b><small>{a} · {k === 1 ? "3 integrations use it" : k === 4 ? "unused" : "1 or 2 integrations use it"}</small></div><Chip tone={t}>{s}</Chip></li>
        ))}
      </ul>
    </Panel>
  );
}

/* ---- integrations ---- */
export function VisIntegrations() {
  const rows: [string, string, string, string, number, "ok" | "warn" | "err"][] = [
    ["hubspot", "netsuite", "Accounts to customers", "One way", 96.4, "warn"],
    ["shopify", "netsuite", "Orders to sales orders", "Both ways", 99.2, "ok"],
    ["salesforce", "quickbooks", "Invoices", "Both ways", 71.0, "err"],
    ["netsuite", "shopify", "Inventory to stock", "One way", 98.1, "ok"],
  ];
  return (
    <Panel title="Integrations" tag={<span className="vz-tabs"><b>All 6</b><span>Active 3</span><span>Failed 1</span></span>}>
      <ul className="vz-rows">
        {rows.map(([a, b, n, d, r, t]) => (
          <li key={n}>
            <span className="vz-pair"><Mark id={a} size={30} /><i>{d === "Both ways" ? "⇄" : "→"}</i><Mark id={b} size={30} /></span>
            <div><b>{n}</b><small>{d}</small></div>
            <span className="vz-meter"><i style={{ width: `${r}%` }} className={t} /></span>
            <Chip tone={t}>{r.toFixed(1)}%</Chip>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

/* ---- wizard ---- */
export function VisWizard() {
  const steps = ["General", "Apps", "Connections", "Objects", "Direction", "Mapping", "Rules", "Test", "Review", "Activate"];
  return (
    <Panel title="Create integration" tag={<Chip tone="p">Step 5 of 10</Chip>}>
      <ol className="vz-steps">
        {steps.map((s, k) => <li key={s} className={k < 4 ? "done" : k === 4 ? "on" : undefined}><span>{k < 4 ? <Check aria-hidden /> : k + 1}</span><small>{s}</small></li>)}
      </ol>
      <div className="vz-opts">
        <div className="vz-opt on"><ArrowRight aria-hidden /><div><b>One way</b><small>Changes in Shopify update NetSuite. Nothing flows back.</small></div></div>
        <div className="vz-opt"><span className="vz-bi">⇄</span><div><b>Both ways</b><small>Changes in either app update the other. You set who wins on a conflict.</small></div></div>
      </div>
    </Panel>
  );
}

/* ---- mapping ---- */
export function VisMapping() {
  const rows: [string, string, string, string][] = [
    ["Company name", "companyName", "trim()", "ok"],
    ["Billing email", "email", "lowercase()", "ok"],
    ["Tax / VAT ID", "taxRegistrationNumber", "remove spaces", "ok"],
    ["Country", "country", "name to ISO code", "warn"],
  ];
  return (
    <Panel title="Data mapping" tag={<span className="vz-seg"><b>One way</b><span>Both ways</span></span>}>
      <div className="vz-map">
        {rows.map(([a, b, t, s]) => (
          <div key={a} className="vz-map-r">
            <span className="vz-f"><Mark id="hubspot" size={20} />{a}</span>
            <span className="vz-x"><ArrowRight aria-hidden /><em>{t}</em></span>
            <span className="vz-f"><Mark id="netsuite" size={20} />{b}</span>
            <Chip tone={s === "ok" ? "ok" : "warn"}>{s === "ok" ? "Valid" : "Required"}</Chip>
          </div>
        ))}
      </div>
      <div className="vz-prev">
        <div><small>Before</small><code>tax_id: &quot; DE 811 907 980 &quot;</code></div>
        <ArrowRight aria-hidden />
        <div><small>After</small><code>taxRegistrationNumber: &quot;DE811907980&quot;</code></div>
      </div>
    </Panel>
  );
}

/* ---- builder ---- */
type N = { icon?: LucideIcon; app?: string; t: string; tone: string };
const FLOW: N[] = [
  { app: "shopify", t: "Order paid", tone: C.primary },
  { icon: ShieldCheck, t: "Required fields", tone: C.warn },
  { icon: Search, t: "Find customer", tone: "#0F766E" },
  { icon: GitBranch, t: "Exists?", tone: "#1D4ED8" },
];
function Node({ n }: { n: N }) {
  const I = n.icon;
  return <div className="vz-node"><span style={{ background: n.app ? "#fff" : n.tone }}>{n.app ? <Mark id={n.app} size={30} /> : I ? <I aria-hidden /> : null}</span><small>{n.t}</small></div>;
}
export function VisBuilder() {
  return (
    <Panel title="Workflow builder" tag={<span className="vz-tabs"><span className="on">Enabled</span></span>}>
      <div className="vz-canvas">
        <div className="vz-lib">
          {[["Triggers", Zap], ["Data", Database], ["Transform", Type], ["Logic", Filter]].map(([l, I]) => { const J = I as LucideIcon; return <span key={l as string}><J aria-hidden />{l as string}</span>; })}
        </div>
        <div className="vz-flow">
          <div className="vz-row">{FLOW.map((n, k) => <span key={n.t} className="vz-seg-n"><Node n={n} />{k < FLOW.length - 1 && <i className="vz-link" />}</span>)}</div>
          <div className="vz-branch">
            <div><b>Yes</b><Node n={{ icon: Database, t: "Update customer", tone: "#0F766E" }} /></div>
            <div><b>No</b><Node n={{ app: "netsuite", t: "Create customer", tone: C.primary }} /></div>
          </div>
        </div>
      </div>
      <div className="vz-bar"><span className="vz-btn pri"><Zap aria-hidden />Run Test</span><span className="vz-btn">Save</span><span className="vz-btn">Add node</span></div>
    </Panel>
  );
}

/* ---- monitoring: the error queue, grouped by cause ---- */
export function VisMonitoring() {
  const g: [string, string, number, string][] = [
    ["Validation", "Required field taxRegistrationNumber is empty", 3, "Add a default or skip when empty"],
    ["Data type", "creditLimit: expected number, received N/A", 5, "Convert with toNumber(null)"],
    ["Rate limit", "HTTP 429 from NetSuite EMEA", 2, "Retry after the window, ask first"],
  ];
  return (
    <Panel title="Error queue" tag={<Chip tone="err">10 records</Chip>}>
      <ul className="vz-groups">
        {g.map(([c, m, n, f]) => (
          <li key={c}>
            <div className="vz-g-hd"><Chip tone="warn">{c}</Chip><b>{n} records</b></div>
            <code>{m}</code>
            <small><Check aria-hidden />{f}</small>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

/* ---- reports ---- */
export function VisReports() {
  const pts = [88, 91, 90, 94, 93, 96, 94];
  const max = 100, min = 80;
  const d = pts.map((p, k) => `${k === 0 ? "M" : "L"} ${k * 52 + 10} ${70 - ((p - min) / (max - min)) * 60}`).join(" ");
  return (
    <Panel title="Reports" tag={<span className="vz-btn">Export CSV</span>}>
      <div className="vz-two">
        <div className="vz-card">
          <b className="vz-ch">Success rate, 7 days</b>
          <svg viewBox="0 0 330 80" className="vz-line" role="img" aria-label="Success rate trending between 88 and 96 percent"><path d={d} fill="none" stroke={C.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />{pts.map((p, k) => <circle key={k} cx={k * 52 + 10} cy={70 - ((p - min) / (max - min)) * 60} r="3.5" fill="#fff" stroke={C.primary} strokeWidth="2" />)}</svg>
        </div>
        <div className="vz-card">
          <b className="vz-ch">Recurring causes</b>
          <ul className="vz-cause">
            {[["Validation", 46], ["Data type", 28], ["Rate limit", 16], ["Auth", 10]].map(([l, v]) => <li key={l as string}><span>{l}</span><i><em style={{ width: `${v}%` }} /></i></li>)}
          </ul>
        </div>
      </div>
      <div className="vz-rec"><Chip tone="p">Recommendation</Chip><span>Cap NetSuite EMEA at 2 concurrent requests. The limit was hit 4 times in 24 hours.</span></div>
    </Panel>
  );
}

/* ---- controls ---- */
export function VisControls() {
  const rows: [string, boolean][] = [["Integration Setup", true], ["Mapping", true], ["Error Diagnosis", true], ["Integration Management", false], ["Optimization", true]];
  return (
    <Panel title="Controls" tag={<Chip tone="p">4 of 5 on</Chip>}>
      <ul className="vz-rows">
        {rows.map(([n, on]) => (
          <li key={n}><div><b>{n}</b><small>{on ? "Read, draft, propose. Approval to apply." : "Off. No new proposals of this kind."}</small></div><span className={`sx-switch${on ? " on" : ""}`}><i /></span></li>
        ))}
      </ul>
    </Panel>
  );
}

/* ---- settings ---- */
export function VisSettings() {
  return (
    <Panel title="Settings" tag={<Chip tone="n">Security</Chip>}>
      <div className="vz-two">
        <div className="vz-card">
          <b className="vz-ch">Roles</b>
          <ul className="vz-list">{[["Priya Nair", "Owner"], ["Daniel Okafor", "Administrator"], ["Mei Lin", "Integration Manager"]].map(([n, r]) => <li key={n}><span className="vz-av">{n.split(" ").map((x) => x[0]).join("")}</span><div><b>{n}</b><small>{r}</small></div></li>)}</ul>
        </div>
        <div className="vz-card">
          <b className="vz-ch">Audit history</b>
          <ul className="vz-list">
            <li><Check aria-hidden /><div><b>Approved: make Tax ID optional</b><small>Priya Nair · 2 h ago</small></div></li>
            <li><X aria-hidden /><div><b>Rejected: cap concurrency</b><small>Daniel Okafor · 7 h ago</small></div></li>
          </ul>
        </div>
      </div>
      <div className="vz-sec">{["Multi factor sign in", "Single sign on", "IP allow list"].map((l) => <span key={l}><span className="sx-switch on"><i /></span>{l}</span>)}</div>
    </Panel>
  );
}

export const VIS: Record<string, () => ReactNode> = {
  overview: VisDashboard, connections: VisConnections, integrations: VisIntegrations, wizard: VisWizard, mapping: VisMapping,
  builder: VisBuilder, monitoring: VisMonitoring, reports: VisReports, settings: VisSettings,
};

export const visCss = `
  .vz{border-radius:18px;background:#fff;box-shadow:0 0 0 1px ${C.line},0 30px 60px -34px rgba(46,16,101,.4);overflow:hidden;min-width:0}
  .vz-hd{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 18px;border-bottom:1px solid ${C.line};background:${C.surface}}
  .vz-t{display:inline-flex;align-items:center;gap:10px;font-family:var(--font-display),system-ui,sans-serif;font-size:15.5px;font-weight:600;color:${C.ink}}
  .vz-bd{padding:18px}
  .vz-chip{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:999px;font-size:12px;font-weight:600;white-space:nowrap;background:${C.g1};color:${C.body}}
  .vz-chip.ok{background:#DCFCE7;color:#166534}.vz-chip.warn{background:#FEF3C7;color:#92400E}.vz-chip.err{background:#FEE2E2;color:#991B1B}.vz-chip.p{background:${C.tint};color:${C.primary}}
  .vz-btn{display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:9px;background:#fff;box-shadow:inset 0 0 0 1px ${C.line};font-size:13px;font-weight:600;color:${C.ink}}
  .vz-btn svg{width:14px;height:14px}
  .vz-btn.pri{background:${C.primary};color:#fff;box-shadow:none}
  .vz-tabs{display:inline-flex;gap:6px;font-size:13px;color:${C.muted}}
  .vz-tabs b,.vz-tabs .on{padding:3px 10px;border-radius:999px;background:${C.tint};color:${C.primary};font-weight:600}
  .vz-seg{display:inline-flex;padding:3px;border-radius:9px;background:${C.g1};font-size:12.5px;color:${C.muted}}
  .vz-seg b,.vz-seg span{padding:3px 10px;border-radius:7px}.vz-seg b{background:#fff;color:${C.ink};box-shadow:0 1px 2px rgba(0,0,0,.08)}

  .vz-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
  .vz-stat{padding:12px;border-radius:12px;background:${C.g1}}
  .vz-stat small{display:block;font-size:12px;color:${C.muted}}
  .vz-stat b{display:block;margin-top:2px;font-family:var(--font-display),system-ui,sans-serif;font-size:24px;line-height:1.15;color:${C.ink}}
  .vz-stat em{display:block;font-style:normal;font-size:12px;color:${C.muted}}
  .vz-stat.hot{background:#FEF3C7}.vz-stat.hot b{color:#92400E}
  .vz-two{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px}
  .vz-card{padding:14px;border-radius:14px;box-shadow:inset 0 0 0 1px ${C.line};min-width:0}
  .vz-ch{display:flex;align-items:center;gap:8px;font-family:var(--font-display),system-ui,sans-serif;font-size:14px;color:${C.ink}}
  .vz-bars{display:flex;align-items:flex-end;gap:8px;height:100px;margin-top:14px}
  .vz-bars>div{flex:1;display:flex;flex-direction:column-reverse;gap:1px;height:100%;justify-content:flex-start}
  .vz-bars i{display:block;border-radius:3px;width:100%}.vz-bars .s{background:${C.action}}.vz-bars .p{background:#F59E0B}.vz-bars .f{background:#DC2626}
  .vz-list{list-style:none;margin:10px 0 0;padding:0;display:grid;gap:10px}
  .vz-list li{display:flex;gap:10px;align-items:flex-start}
  .vz-list li>svg{width:16px;height:16px;margin-top:2px;flex-shrink:0;color:${C.primary}}
  .vz-list b{display:block;font-size:13.5px;line-height:1.35;color:${C.ink}}
  .vz-list small{display:block;font-size:12.5px;color:${C.muted}}
  .vz-av{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;background:${C.tint};color:${C.primary};font-size:12px;font-weight:700;flex-shrink:0}

  .vz-rows{list-style:none;margin:0;padding:0;display:grid;gap:8px}
  .vz-rows li{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:12px;background:${C.g1}}
  .vz-rows li>div{flex:1;min-width:0}
  .vz-rows b{display:block;font-size:14px;line-height:1.3;color:${C.ink}}
  .vz-rows small{display:block;font-size:12.5px;color:${C.muted}}
  .vz-pair{display:inline-flex;align-items:center;gap:6px}.vz-pair i{font-style:normal;font-weight:700;color:${C.primary}}
  .vz-meter{width:70px;height:6px;border-radius:99px;background:#E5E1EC;overflow:hidden;flex-shrink:0}
  .vz-meter i{display:block;height:100%;border-radius:99px}.vz-meter .ok{background:#16A34A}.vz-meter .warn{background:#F59E0B}.vz-meter .err{background:#DC2626}

  .vz-steps{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(10,1fr);gap:4px}
  .vz-steps li{display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center}
  .vz-steps li>span{display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;background:${C.g1};color:${C.muted};font-size:12px;font-weight:700}
  .vz-steps li>span svg{width:14px;height:14px}
  .vz-steps li.done>span{background:${C.primary};color:#fff}.vz-steps li.on>span{background:${C.lime};color:${C.limeInk};box-shadow:0 0 0 4px rgba(163,230,53,.3)}
  .vz-steps small{font-size:11.5px;line-height:1.2;color:${C.muted}}.vz-steps li.on small{color:${C.ink};font-weight:600}
  .vz-opts{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:18px}
  .vz-opt{display:flex;gap:12px;padding:14px;border-radius:14px;box-shadow:inset 0 0 0 1px ${C.line}}
  .vz-opt.on{box-shadow:inset 0 0 0 2px ${C.primary};background:${C.surface}}
  .vz-opt>svg,.vz-bi{width:34px;height:34px;padding:8px;border-radius:10px;background:${C.tint};color:${C.primary};flex-shrink:0;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px}
  .vz-opt b{display:block;font-size:14.5px;color:${C.ink}}.vz-opt small{display:block;font-size:12.5px;line-height:1.45;color:${C.muted}}

  .vz-map{display:grid;gap:8px}
  .vz-map-r{display:grid;grid-template-columns:1fr auto 1.2fr auto;align-items:center;gap:10px;padding:8px 10px;border-radius:12px;background:${C.g1}}
  .vz-f{display:inline-flex;align-items:center;gap:8px;min-width:0;font-size:13px;font-weight:600;color:${C.ink}}
  .vz-x{display:inline-flex;flex-direction:column;align-items:center;color:${C.primary}}.vz-x svg{width:16px;height:16px}.vz-x em{font-style:normal;font-size:11px;color:${C.muted}}
  .vz-prev{display:flex;align-items:center;gap:12px;margin-top:14px;padding:12px 14px;border-radius:12px;background:#120B24;color:#F5F3FF}
  .vz-prev>div{flex:1;min-width:0}.vz-prev small{display:block;font-size:11.5px;color:#B9A8D8}.vz-prev code{display:block;font-size:12.5px;font-family:ui-monospace,Menlo,monospace;overflow-wrap:anywhere}
  .vz-prev>svg{width:16px;height:16px;color:${C.lime};flex-shrink:0}

  .vz-canvas{display:grid;grid-template-columns:96px 1fr;gap:14px;padding:14px;border-radius:14px;background:${C.g1};background-image:radial-gradient(rgba(46,16,101,.14) 1px,transparent 1.3px);background-size:18px 18px}
  .vz-lib{display:grid;gap:6px;align-content:start}
  .vz-lib span{display:flex;align-items:center;gap:6px;padding:6px 8px;border-radius:8px;background:#fff;font-size:12px;font-weight:600;color:${C.ink};box-shadow:inset 0 0 0 1px ${C.line}}
  .vz-lib svg{width:13px;height:13px;color:${C.primary}}
  .vz-row{display:flex;align-items:flex-start}
  .vz-seg-n{display:inline-flex;align-items:flex-start}
  .vz-node{display:flex;flex-direction:column;align-items:center;gap:5px;width:74px;text-align:center}
  .vz-node>span{display:flex;align-items:center;justify-content:center;width:46px;height:46px;border-radius:14px;color:#fff;box-shadow:0 0 0 1px ${C.line}}
  .vz-node svg{width:20px;height:20px}.vz-node small{font-size:11.5px;line-height:1.25;color:${C.ink}}
  .vz-link{display:block;width:22px;height:2px;margin:22px -6px 0;background:repeating-linear-gradient(90deg,${C.primary} 0 5px,transparent 5px 9px)}
  .vz-branch{display:flex;gap:26px;margin:14px 0 0 150px}
  .vz-branch>div{display:flex;flex-direction:column;align-items:center;gap:4px}.vz-branch b{font-size:11.5px;color:${C.primary}}
  .vz-bar{display:flex;gap:8px;margin-top:14px}

  .vz-groups{list-style:none;margin:0;padding:0;display:grid;gap:10px}
  .vz-groups li{padding:12px 14px;border-radius:12px;background:${C.g1}}
  .vz-g-hd{display:flex;align-items:center;justify-content:space-between}.vz-g-hd b{font-size:13.5px;color:${C.ink}}
  .vz-groups code{display:block;margin-top:8px;font-size:12.5px;font-family:ui-monospace,Menlo,monospace;color:${C.body};overflow-wrap:anywhere}
  .vz-groups small{display:flex;align-items:center;gap:6px;margin-top:8px;font-size:12.5px;color:${C.primary};font-weight:600}.vz-groups small svg{width:13px;height:13px}

  .vz-line{width:100%;height:auto;margin-top:10px}
  .vz-cause{list-style:none;margin:12px 0 0;padding:0;display:grid;gap:9px}
  .vz-cause li{display:grid;grid-template-columns:80px 1fr;align-items:center;gap:10px;font-size:12.5px;color:${C.body}}
  .vz-cause i{display:block;height:8px;border-radius:99px;background:#E5E1EC}.vz-cause em{display:block;height:100%;border-radius:99px;background:${C.action}}
  .vz-rec{display:flex;align-items:center;gap:10px;margin-top:12px;padding:12px 14px;border-radius:12px;background:${C.surface};font-size:13.5px;color:${C.ink}}
  .vz-sec{display:flex;flex-wrap:wrap;gap:14px 22px;margin-top:12px;font-size:13px;font-weight:600;color:${C.ink}}.vz-sec>span{display:inline-flex;align-items:center;gap:8px}

  @media (max-width:640px){
    .vz-stats{grid-template-columns:1fr 1fr}
    .vz-two,.vz-opts{grid-template-columns:1fr}
    .vz-steps{grid-template-columns:repeat(5,1fr);row-gap:12px}
    .vz-map-r{grid-template-columns:1fr auto;row-gap:6px}.vz-map-r .vz-x{display:none}
    .vz-canvas{grid-template-columns:1fr}.vz-lib{grid-template-columns:repeat(4,auto);overflow-x:auto}
    .vz-row{flex-wrap:wrap;gap:8px}.vz-link{display:none}.vz-branch{margin-left:0}
    .vz-meter{display:none}
  }
`;
