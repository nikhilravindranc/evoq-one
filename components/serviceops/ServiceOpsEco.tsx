"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ProductBadge } from "@/components/shared/ProductBadge";
import { Ic } from "./icons";
import { DEEP, INK, LINE, MUTED, NEUTRAL, PAPER, PRIMARY } from "./palette";

/* Connected service operations as one pinned stage. Scrolling opens the three titles one after the other
   (existing applications, EVI and agents, EVOQ applications) and the panel on the right follows. Integration
   categories are examples, not an existing catalogue, so they are plain category marbles with no partner logos.
   Agent descriptions, reads, changes and guardrails follow the AI hub in the ServiceOps app. */

const AG = "/serviceops/agents";

/* ---------- 1. marbles that really fall and settle ---------- */
type BallDef = { r: number; label: string; node: ReactNode; bg?: string };

const BALLS: BallDef[] = [
  { r: 46, label: "Accounting and financial", bg: "radial-gradient(circle at 32% 26%,#9BE3C4,#3FA27C 46%,#1F6B50)", node: Ic.receipt },
  { r: 46, label: "CRM and customer communication", bg: "radial-gradient(circle at 32% 26%,#A9C2FF,#4F78DC 46%,#2447A6)", node: Ic.users },
  { r: 46, label: "Email and messaging", bg: "radial-gradient(circle at 32% 26%,#FFB4AE,#E2605A 46%,#B03530)", node: Ic.chat },
  { r: 46, label: "Payment providers", bg: "radial-gradient(circle at 32% 26%,#CDBBFF,#7E5FDF 46%,#5236B8)", node: Ic.card },
  { r: 46, label: "ERP and inventory", bg: "radial-gradient(circle at 32% 26%,#9BE4EF,#2FA6B9 46%,#0B6F80)", node: Ic.box },
  { r: 42, label: "CRM", node: <ProductBadge productKey="crm" size={54} /> },
  { r: 42, label: "Desk", node: <ProductBadge productKey="desk" size={54} /> },
  { r: 42, label: "Billing", node: <ProductBadge productKey="billing" size={54} /> },
  { r: 42, label: "Sync", node: <ProductBadge productKey="sync" size={54} /> },
  { r: 40, label: "Inventory", node: <ProductBadge productKey="inventory" size={50} /> },
  { r: 40, label: "EVI", node: <img src={`${AG}/evi-ai-assistant.jpg`} alt="" /> },
  { r: 40, label: "Field AI", node: <img src={`${AG}/field-ai.jpg`} alt="" /> },
  { r: 54, label: "ServiceOps", node: <img className="ec-so" src="/logos/serviceops-icon.png" alt="" /> },
];

const CATS = ["Accounting and financial", "CRM and customer communication", "Email and messaging", "Payment providers", "ERP and inventory"];
const PW = 540;
const PH = 380;

type Body = { x: number; y: number; vx: number; vy: number; r: number; at: number };

function makeBodies(W: number): Body[] {
  return BALLS.map((b, i) => ({
    r: b.r,
    x: W / 2 + ((i * 47) % 13 - 6) * Math.min(24, W / 24),
    y: -b.r - 30,
    vx: ((i * 29) % 7 - 3) * 0.35,
    vy: 0,
    at: i * 9,
  }));
}

function stepWorld(bs: Body[], frame: number, W: number) {
  for (const b of bs) {
    if (frame < b.at) continue;
    b.vy += 0.62;
    b.vx *= 0.996;
    b.x += b.vx;
    b.y += b.vy;
    if (b.x < b.r) { b.x = b.r; b.vx = Math.abs(b.vx) * 0.3; }
    if (b.x > W - b.r) { b.x = W - b.r; b.vx = -Math.abs(b.vx) * 0.3; }
    if (b.y > PH - b.r - 10) { b.y = PH - b.r - 10; b.vy *= -0.26; b.vx *= 0.93; if (Math.abs(b.vy) < 1.2) b.vy = 0; }
  }
  for (let it = 0; it < 3; it++) {
    for (let i = 0; i < bs.length; i++) {
      const a = bs[i];
      if (frame < a.at) continue;
      for (let j = i + 1; j < bs.length; j++) {
        const c = bs[j];
        if (frame < c.at) continue;
        const dx = c.x - a.x;
        const dy = c.y - a.y;
        const d = Math.hypot(dx, dy) || 0.001;
        const min = a.r + c.r;
        if (d >= min) continue;
        const nx = dx / d;
        const ny = dy / d;
        const push = (min - d) / 2;
        a.x -= nx * push; a.y -= ny * push;
        c.x += nx * push; c.y += ny * push;
        const rv = (c.vx - a.vx) * nx + (c.vy - a.vy) * ny;
        if (rv < 0) {
          const imp = (-(1 + 0.28) * rv) / 2;
          a.vx -= imp * nx; a.vy -= imp * ny;
          c.vx += imp * nx; c.vy += imp * ny;
        }
        a.vx *= 0.998; c.vx *= 0.998;
      }
    }
  }
}

function Pile() {
  const wrap = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = wrap.current;
    if (!root) return;
    const els = [...root.querySelectorAll<HTMLElement>(".ec-ball")];
    const W = Math.max(300, Math.min(PW, root.clientWidth || PW));
    const bodies = makeBodies(W);
    const paint = (frame: number) => {
      bodies.forEach((b, i) => {
        els[i].style.opacity = frame >= b.at ? "1" : "0";
        els[i].style.transform = `translate3d(${b.x - b.r}px,${b.y - b.r}px,0)`;
      });
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      for (let f = 0; f < 800; f++) stepWorld(bodies, f, W);
      paint(1000);
      return;
    }
    paint(0);
    let raf = 0;
    let frame = 0;
    let calm = 0;
    let last = 0;
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (!last) last = t;
      const acc = Math.min(t - last, 400);
      last = t;
      /* fixed 60 Hz steps so a slow frame does not change how the pile lands */
      const steps = Math.max(1, Math.round(acc / 16.67));
      for (let s = 0; s < steps; s++) { stepWorld(bodies, frame, W); frame++; }
      paint(frame);
      const speed = Math.max(...bodies.map((b) => Math.abs(b.vx) + Math.abs(b.vy)));
      calm = frame > 150 && speed < 0.2 ? calm + 1 : 0;
      if (calm > 25 || frame > 900) cancelAnimationFrame(raf);
    };
    /* its own observer, so it also plays on very tall screens where the page-wide reveal skips blocks that start in view */
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { io.disconnect(); raf = requestAnimationFrame(loop); }
    }, { threshold: 0.2 });
    io.observe(root);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="ec-wrap">
      <div className="ec-pile" ref={wrap} aria-label="ServiceOps with external application categories, EVOQ applications and EVI">
        {BALLS.map((b) => (
          <span key={b.label} className="ec-ball" title={b.label} style={{ width: b.r * 2, height: b.r * 2, background: b.bg }}>
            {b.node}
          </span>
        ))}
        <span className="ec-floor" aria-hidden />
      </div>
      <ul className="ec-chips">{CATS.map((c) => <li key={c}>{c}</li>)}</ul>
    </div>
  );
}

/* ---------- 2. EVI and agents: pick a face, read exactly what that agent does ---------- */
type Agent = { short: string; n: string; role: string; img: string; d: string; reads: string; changes: string; g: string };

const AGENTS: Agent[] = [
  { short: "Intake", n: "Intake Agent", role: "Service request capture and validation", img: "intake-agent", d: "Checks new requests for missing details, and open requests that look like duplicates (same customer, similar title).", reads: "Requests", changes: "Nothing", g: "Never merges, declines or contacts anyone. A person opens the request and decides." },
  { short: "Receptionist", n: "AI Receptionist", role: "Web chat for service requests", img: "ai-receptionist", d: "On your public booking page, customers can chat with EVI instead of filling in a form. EVI collects name, address, the problem, urgency and a preferred time, and sends it to Requests as an online booking to verify.", reads: "What the customer types into the chat", changes: "Nothing. It adds a request for the team to verify", g: "Web chat only. It never confirms a time, quotes a price or promises a technician." },
  { short: "Dispatch", n: "Dispatch Agent", role: "Technician scheduling and job assignment", img: "dispatch-agent", d: "Finds work orders that are ready to schedule, and technicians who are booked past a full day or free while work waits.", reads: "Work orders, jobs, technician schedules", changes: "Nothing", g: "Suggests, never books. Technician choice and times are made by a person in Dispatch." },
  { short: "Field AI", n: "Field AI", role: "Technician guidance and job information", img: "field-ai", d: "On the technician job screen: a troubleshooting chat, a hands-free checklist you can run by voice, and a nameplate scan that reads equipment data plates from a photo.", reads: "The job, the equipment history, the checklist, the van's parts, a nameplate photo", changes: "Nothing. You confirm before anything is saved", g: "Suggestions to check, never instructions, and never part numbers or prices." },
  { short: "Quotes", n: "Quote Follow-up Agent", role: "Quote tracking and customer follow-ups", img: "quote-follow-up-agent", d: "Finds estimates sent and not answered, and customer links that are about to expire, with follow-up wording drafted from the template.", reads: "Estimates, work orders", changes: "Nothing", g: "Never sends a follow-up or changes an estimate. A person sends it." },
  { short: "Collections", n: "Collections Agent", role: "Payments and overdue invoice follow-ups", img: "collections-agent", d: "Lists overdue invoices by balance and age, with reminder wording drafted from the company's own reminder template.", reads: "Invoices, payments, credit notes", changes: "Nothing", g: "Never sends a reminder. A person reviews the wording and sends it from Billing." },
  { short: "Costing", n: "Job Costing and Profitability AI", role: "Job costs, margins and profitability", img: "job-costing-ai", d: "On Profitability and on a job's Costing tab, Explain this says in plain words what is driving margin and gives practical suggestions, using figures ServiceOps worked out itself.", reads: "Figures ServiceOps worked out: revenue, labour, parts, overhead", changes: "Nothing", g: "It explains and suggests. It changes nothing." },
  { short: "Risk flags", n: "Risk Flags Agent", role: "Operational and account risks", img: "risk-flags-agent", d: "Flags SLA risk, work orders stuck in a workflow stage, certifications expiring within 30 days, customers on hold with open work, and visits that did not finish.", reads: "Jobs, work orders, customers, certifications", changes: "Nothing", g: "Flags only. Escalation, reassignment and any customer message are decided by a person." },
  { short: "Coaching", n: "Coaching Agent", role: "Performance insights and coaching", img: "coaching-agent", d: "Per-technician facts for one-to-one conversations: first-time completion, time on site against plan, checklist completion and return visits.", reads: "Jobs and their work records", changes: "Nothing", g: "Neutral facts with the basis and date range. Never a score, grade or ranking of people." },
  { short: "Reviews", n: "Review Replies Agent", role: "Customer review responses", img: "review-replies-agent", d: "On Insights, Draft reply writes a short public reply to a customer review for you to copy.", reads: "The review you open", changes: "Nothing. The reply is never posted", g: "Never posted anywhere." },
];

function Agents() {
  const [on, setOn] = useState(2);
  const a = AGENTS[on];
  return (
    <div className="ax">
      <ul className="ax-faces" role="tablist" aria-label="Agents">
        {AGENTS.map((x, i) => (
          <li key={x.n}>
            <button type="button" role="tab" aria-selected={i === on} className={i === on ? "on" : ""} onClick={() => setOn(i)}>
              <img src={`${AG}/${x.img}.jpg`} alt="" />
              <span>{x.short}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="ax-card" key={a.n}>
        <div className="ax-h">
          <img src={`${AG}/${a.img}.jpg`} alt="" />
          <div><b>{a.n}</b><small>{a.role}</small></div>
        </div>
        <p>{a.d}</p>
        <dl>
          <div><dt>Reads</dt><dd>{a.reads}</dd></div>
          <div><dt>Changes</dt><dd>{a.changes}</dd></div>
          <div className="g"><dt>Guardrail</dt><dd>{a.g}</dd></div>
        </dl>
      </div>
    </div>
  );
}

/* ---------- 3. EVOQ applications ---------- */
const EVOQ_APPS: [string, string, string][] = [
  ["crm", "CRM", "Customer and relationship management."],
  ["desk", "Desk", "Service enquiries and support intake."],
  ["inventory", "Inventory", "Stock and parts management."],
  ["billing", "Billing", "Financial and accounting operations."],
  ["sync", "Sync", "Data exchange between connected systems."],
];

function EvoqApps() {
  return (
    <div className="ea">
      <div className="ea-hub"><img src="/logos/serviceops-icon.png" alt="" /><b>ServiceOps</b></div>
      <span className="ea-stem" aria-hidden />
      <ul className="ea-grid">
        {EVOQ_APPS.map(([k, n, d]) => (
          <li key={k}><ProductBadge productKey={k} size={48} /><span><b>{n}</b><small>{d}</small></span></li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- the stage ---------- */
const ITEMS: { t: string; body: ReactNode }[] = [
  {
    t: "Your existing applications",
    body: (
      <p>Keep your existing technology investments in view. Where supported integrations are available, service information can be shared with relevant external systems. Examples of the systems companies may want to integrate include accounting and financial applications, CRM and customer communication systems, email and messaging services, payment providers, and ERP and inventory systems.</p>
    ),
  },
  {
    t: "EVI and AI agents",
    body: (
      <>
        <p>EVI provides an assistant for working with ServiceOps information. AI agents and screen-level helpers can identify issues, prepare drafts and provide guidance for human review. Together they form a practical service operations layer.</p>
        <span className="cn-ask" aria-hidden><i>{Ic.spark}</i>Ask EVI: what needs attention today?</span>
        <Link href="/products/ai" className="cn-link">About EVI {Ic.arrow}</Link>
      </>
    ),
  },
  {
    t: "EVOQ applications",
    body: (
      <p>ServiceOps can also work alongside relevant EVOQ applications. The value is not simply having more applications. It is being able to coordinate the service operation with the systems responsible for other parts of the organization.</p>
    ),
  },
];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

function Stage() {
  const [on, setOn] = useState(0);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const wide = window.matchMedia("(min-width:981px)");
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!wide.matches) return;
      const r = el.getBoundingClientRect();
      const stick = el.firstElementChild?.getBoundingClientRect().height ?? 0;
      const p = clamp01((84 - r.top) / Math.max(1, r.height - stick));
      const i = p < 1 / 3 ? 0 : p < 2 / 3 ? 1 : 2;
      setOn((prev) => (prev === i ? prev : i));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const go = (i: number) => {
    const el = track.current;
    if (!el) return;
    if (!window.matchMedia("(min-width:981px)").matches) { setOn(i); return; }
    const r = el.getBoundingClientRect();
    const stick = el.firstElementChild?.getBoundingClientRect().height ?? 0;
    const y = window.scrollY + r.top - 84 + ((i + 0.5) / 3) * (r.height - stick);
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div className="cn-track" ref={track}>
      <div className="cn-stick">
        <div className="cn">
          <div className="cn-l" role="tablist" aria-label="Connected service operations" aria-orientation="vertical">
            {ITEMS.map((it, i) => (
              <div key={it.t} className={`cn-it${i === on ? " on" : ""}`}>
                <button type="button" role="tab" aria-selected={i === on} className="cn-t" onClick={() => go(i)}>
                  <span>{String(i + 1).padStart(2, "0")}</span>{it.t}
                </button>
                <div className="cn-d"><div>{it.body}</div></div>
              </div>
            ))}
          </div>
          <div className="cn-r" role="tabpanel">
            <div className="cn-v" key={on}>
              {on === 0 && <Pile />}
              {on === 1 && <Agents />}
              {on === 2 && <EvoqApps />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ServiceOpsEco() {
  return (
    <section className="so-sec so-white" id="connected">
      <style>{css}</style>
      <div className="so-out"><div className="so-in">
        <div className="so-head c" data-rv>
          <span className="so-label">Connected service operations</span>
          <h2 className="so-h2">Bring service information together. Let AI help move the work forward.</h2>
          <p className="so-lead">Service operations rarely happen inside a single application. Companies may already use accounting, communication, CRM, ERP, payment and other specialist systems. ServiceOps supports an ecosystem approach: work with the applications your organization already uses, and connect relevant EVOQ applications as your requirements grow.</p>
        </div>
        <Stage />
      </div></div>
    </section>
  );
}

const css = `
  #connected small{display:block;font-size:13px;line-height:1.4;color:${NEUTRAL}}

  /* pinned: the track is tall, the panel sticks, and scrolling opens one title after the other */
  .cn-track{position:relative;height:270vh}
  .cn-stick{position:sticky;top:84px;height:calc(100vh - 110px);min-height:560px;max-height:650px}
  .cn{box-sizing:border-box;height:100%;display:grid;grid-template-columns:minmax(0,.78fr) minmax(0,1.22fr);gap:48px;align-items:center;padding:36px 48px;border-radius:36px;background:#FBF9F5;box-shadow:inset 0 0 0 1px ${LINE}}
  .cn-it{border-top:1px solid ${LINE}}
  .cn-it:last-child{border-bottom:1px solid ${LINE}}
  .cn-t{display:flex;align-items:baseline;gap:14px;width:100%;padding:18px 0;border:0;background:none;text-align:left;cursor:pointer;font-family:var(--font-display),system-ui,sans-serif;font-size:26px;font-weight:600;letter-spacing:-.015em;line-height:1.15;color:#C2B7A2;transition:color .35s ease}
  .cn-t span{font-size:13px;font-weight:600;letter-spacing:.06em;color:#D3C9B5;transition:color .35s ease}
  .cn-t:hover{color:#7C6A52}
  .cn-it.on .cn-t{color:${DEEP}}
  .cn-it.on .cn-t span{color:${PRIMARY}}
  .cn-d{display:grid;grid-template-rows:0fr;transition:grid-template-rows .55s cubic-bezier(.2,.7,.2,1)}
  .cn-d>div{overflow:hidden;min-height:0}
  .cn-it.on .cn-d{grid-template-rows:1fr}
  .cn-d p{margin:0 0 14px;font-size:15.5px;line-height:1.6;color:${MUTED}}
  .cn-d>div>*:last-child{margin-bottom:22px}
  .cn-ask{display:inline-flex;align-items:center;gap:9px;margin:0 14px 12px 0;padding:9px 16px;border-radius:999px;background:#fff;box-shadow:0 10px 26px -16px rgba(42,27,12,.45),0 0 0 1px ${LINE};font-size:13.5px;color:${MUTED}}
  .cn-ask i{display:grid;color:#D97706}.cn-ask svg{width:16px;height:16px}
  .cn-link{display:inline-flex;align-items:center;gap:7px;font-family:var(--font-display),system-ui,sans-serif;font-size:15px;font-weight:600;color:${PRIMARY};text-decoration:none}
  .cn-link svg{width:16px;height:16px}.cn-link:hover{text-decoration:underline}
  .cn-r{height:100%;display:grid;align-items:center;min-width:0}
  .cn-v{animation:cnIn .5s cubic-bezier(.2,.7,.2,1) both}
  @keyframes cnIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}

  /* marbles: real physics, positions come from the script; they rest on a soft floor, no box around them */
  .ec-wrap{max-width:${PW}px;margin:0 auto}
  .ec-pile{position:relative;width:100%;height:${PH}px;clip-path:inset(0 -90px -30px -90px)}
  .ec-ball{position:absolute;left:0;top:0;display:grid;place-items:center;border-radius:50%;background:#fff;color:#fff;overflow:hidden;opacity:0;will-change:transform;box-shadow:0 14px 22px -12px rgba(42,27,12,.55),inset 0 -10px 18px rgba(42,27,12,.2),inset 0 8px 14px rgba(255,255,255,.6)}
  .ec-ball::after{content:"";position:absolute;left:15%;top:9%;width:44%;height:28%;border-radius:50%;background:radial-gradient(closest-side,rgba(255,255,255,.8),rgba(255,255,255,0));pointer-events:none}
  .ec-ball svg{width:38%;height:38%}
  .ec-ball img{width:100%;height:100%;object-fit:cover;transform:scale(1.12)}
  .ec-ball img.ec-so{width:68%;height:68%;border-radius:22%;transform:none}
  .ec-floor{position:absolute;left:6%;right:6%;bottom:2px;height:22px;border-radius:50%;background:radial-gradient(closest-side,rgba(42,27,12,.2),rgba(42,27,12,0));filter:blur(3px)}
  .ec-chips{list-style:none;margin:10px 0 0;padding:0;display:flex;flex-wrap:wrap;justify-content:center;gap:6px}
  .ec-chips li{padding:5px 12px;border-radius:999px;background:#fff;box-shadow:inset 0 0 0 1px ${LINE};font-size:12.5px;font-weight:500;color:${INK}}

  /* agents: a row of faces, one large readable card */
  .ax-faces{list-style:none;margin:0 0 20px;padding:0;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px 8px}
  .ax-faces button{display:flex;flex-direction:column;align-items:center;gap:7px;width:100%;padding:8px 2px 6px;border:0;border-radius:18px;background:transparent;cursor:pointer;font:inherit;transition:background .25s ease,transform .25s ease}
  .ax-faces button:hover{transform:translateY(-2px)}
  .ax-faces img{width:58px;height:58px;border-radius:50%;object-fit:cover;background:#fff;box-shadow:0 0 0 3px #fff,0 0 0 4px ${LINE};transition:box-shadow .25s ease,transform .25s ease}
  .ax-faces span{font-size:12.5px;font-weight:600;color:${MUTED};line-height:1.2;text-align:center;transition:color .25s ease}
  .ax-faces button.on{background:#fff;box-shadow:0 12px 26px -16px rgba(42,27,12,.45),0 0 0 1px ${LINE}}
  .ax-faces button.on img{box-shadow:0 0 0 3px #fff,0 0 0 5px ${PRIMARY};transform:scale(1.06)}
  .ax-faces button.on span{color:${DEEP}}
  .ax-card{padding:22px 26px 20px;border-radius:24px;background:#fff;box-shadow:0 24px 50px -30px rgba(42,27,12,.5),0 0 0 1px ${LINE};animation:cnIn .45s cubic-bezier(.2,.7,.2,1) both}
  .ax-h{display:flex;align-items:center;gap:16px;margin-bottom:12px}
  .ax-h img{width:64px;height:64px;flex-shrink:0;border-radius:50%;object-fit:cover;box-shadow:0 0 0 3px #fff,0 0 0 4px ${LINE}}
  .ax-h b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:20px;line-height:1.2;color:${DEEP}}
  .ax-h small{margin-top:3px;font-size:13.5px}
  .ax-card p{margin:0 0 14px;font-size:15px;line-height:1.55;color:${INK}}
  .ax-card dl{margin:0}
  .ax-card dl>div{display:grid;grid-template-columns:86px minmax(0,1fr);gap:12px;padding:9px 0;border-top:1px solid ${LINE}}
  .ax-card dt{font-size:12.5px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:${NEUTRAL}}
  .ax-card dd{margin:0;font-size:14px;line-height:1.45;color:${INK}}
  .ax-card dl>div.g dd{font-weight:600;color:#78350F}

  /* EVOQ applications: a hub and five apps */
  .ea{display:flex;flex-direction:column;align-items:center;padding:34px 28px 30px;border-radius:28px;background:#fff;box-shadow:0 24px 50px -30px rgba(42,27,12,.5),0 0 0 1px ${LINE}}
  .ea-hub{display:flex;align-items:center;gap:12px;padding:10px 26px 10px 12px;border-radius:999px;background:${PAPER};box-shadow:0 0 0 1px ${LINE}}
  .ea-hub img{width:38px;height:38px;border-radius:10px}
  .ea-hub b{font-family:var(--font-display),system-ui,sans-serif;font-size:19px;color:${DEEP}}
  .ea-stem{display:block;width:2px;height:30px;background:repeating-linear-gradient(${PRIMARY} 0 4px,transparent 4px 8px);opacity:.5}
  .ea-grid{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;width:100%}
  .ea-grid li{display:flex;gap:14px;align-items:center;padding:14px 16px;border-radius:18px;background:${PAPER};box-shadow:0 0 0 1px ${LINE}}
  .ea-grid li:last-child{grid-column:1/-1}
  .ea-grid b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:16px;color:${DEEP}}
  .ea-grid small{font-size:13.5px;color:${MUTED}}

  @media (prefers-reduced-motion:reduce){.cn-v,.ax-card{animation:none}.cn-d{transition:none}}
  @media (max-width:1180px){.cn{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:30px;padding:28px 32px}.cn-t{font-size:23px}}
  @media (max-width:980px){
    .cn-track{height:auto}
    .cn-stick{position:static;height:auto;min-height:0;max-height:none}
    .cn{height:auto;grid-template-columns:1fr;gap:26px}
    .cn-r{height:auto}
  }
  @media (max-width:700px){
    .cn{padding:22px 16px 24px;border-radius:28px}
    .cn-t{font-size:22px;padding:16px 0}
    .ax-faces{grid-template-columns:repeat(5,minmax(0,1fr));gap:8px 2px}
    .ax-faces img{width:44px;height:44px}
    .ax-faces span{font-size:11px}
    .ax-card{padding:18px 16px}
    .ax-card dl>div{grid-template-columns:1fr;gap:2px}
    .ea-grid{grid-template-columns:1fr}.ea-grid li:last-child{grid-column:auto}
  }
`;
