"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ProductBadge } from "@/components/shared/ProductBadge";
import { Ic } from "./icons";
import { BAND, DEEP, INK, LINE, MUTED, NEUTRAL, PAPER, PRIMARY } from "./palette";

/* Connected service operations as one pinned stage. Scrolling opens the three titles one after the other
   (existing applications, EVI and agents, EVOQ applications) and the panel on the right follows. Integration
   categories are examples, not an existing catalogue, so they are plain category marbles with no partner logos.
   Agent descriptions and guardrails follow the AI hub in the ServiceOps app; the screens are captures of that app. */

const AG = "/serviceops/agents";
const APP = "/serviceops/app";

/* ---------- 1. marbles that really fall and settle ---------- */
type BallDef = { r: number; label: string; node: ReactNode; bg?: string };

const BALLS: BallDef[] = [
  { r: 40, label: "Accounting and financial", bg: "radial-gradient(circle at 32% 26%,#9BE3C4,#3FA27C 46%,#1F6B50)", node: Ic.receipt },
  { r: 40, label: "CRM and customer communication", bg: "radial-gradient(circle at 32% 26%,#A9C2FF,#4F78DC 46%,#2447A6)", node: Ic.users },
  { r: 40, label: "Email and messaging", bg: "radial-gradient(circle at 32% 26%,#FFB4AE,#E2605A 46%,#B03530)", node: Ic.chat },
  { r: 40, label: "Payment providers", bg: "radial-gradient(circle at 32% 26%,#CDBBFF,#7E5FDF 46%,#5236B8)", node: Ic.card },
  { r: 40, label: "ERP and inventory", bg: "radial-gradient(circle at 32% 26%,#9BE4EF,#2FA6B9 46%,#0B6F80)", node: Ic.box },
  { r: 38, label: "CRM", node: <ProductBadge productKey="crm" size={48} /> },
  { r: 38, label: "Desk", node: <ProductBadge productKey="desk" size={48} /> },
  { r: 38, label: "Billing", node: <ProductBadge productKey="billing" size={48} /> },
  { r: 38, label: "Sync", node: <ProductBadge productKey="sync" size={48} /> },
  { r: 36, label: "Inventory", node: <ProductBadge productKey="inventory" size={46} /> },
  { r: 36, label: "EVI", node: <img src={`${AG}/evi-ai-assistant.jpg`} alt="" /> },
  { r: 36, label: "Field AI", node: <img src={`${AG}/field-ai.jpg`} alt="" /> },
  { r: 48, label: "ServiceOps", node: <img className="ec-so" src="/logos/serviceops-icon.png" alt="" /> },
];

const CATS = ["Accounting and financial", "CRM and customer communication", "Email and messaging", "Payment providers", "ERP and inventory"];
const PW = 470;
const PH = 330;

type Body = { x: number; y: number; vx: number; vy: number; r: number; at: number };

function makeBodies(W: number): Body[] {
  return BALLS.map((b, i) => ({
    r: b.r,
    x: W / 2 + ((i * 47) % 13 - 6) * Math.min(22, W / 24),
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
    if (b.y > PH - b.r - 6) { b.y = PH - b.r - 6; b.vy *= -0.26; b.vx *= 0.93; if (Math.abs(b.vy) < 1.2) b.vy = 0; }
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
    const W = Math.max(280, Math.min(PW, root.clientWidth || PW));
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
      let acc = t - last;
      last = t;
      acc = Math.min(acc, 64);
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
      </div>
      <ul className="ec-chips">{CATS.map((c) => <li key={c}>{c}</li>)}</ul>
    </div>
  );
}

/* ---------- 2. EVI and agents: pick a job, see the agent at work in the app ---------- */
type Agent = { n: string; img: string; d: string; g: string };
type Tab = { k: string; tab: string; head: string; agents: Agent[]; shot: string; alt: string; actor: string; say: string };

const TABS: Tab[] = [
  {
    k: "requests", tab: "Requests", head: "New requests, checked for gaps and duplicates.",
    agents: [
      { n: "Intake Agent", img: "intake-agent", d: "Checks new requests for missing details and likely duplicates.", g: "A person opens the request and decides." },
      { n: "AI Receptionist", img: "ai-receptionist", d: "Customers chat with EVI on the booking page. Details arrive in Requests to verify.", g: "Web chat. It never confirms a time or quotes a price." },
    ],
    shot: "requests-list.png", alt: "The ServiceOps Requests list showing requests from the web form, customer portal, online booking, email and phone", actor: "intake-agent", say: "4 found, 4 to review",
  },
  {
    k: "dispatch", tab: "Dispatch", head: "See what is ready to schedule, and who is free.",
    agents: [
      { n: "Dispatch Agent", img: "dispatch-agent", d: "Finds work ready to schedule, and technicians booked past a full day or free while work waits.", g: "Suggests, never books. A person chooses the technician and time." },
    ],
    shot: "agents-dispatch-intake.png", alt: "The Dispatch Agent and Intake Agent cards in the ServiceOps AI hub", actor: "dispatch-agent", say: "Suggests. You choose the technician and time.",
  },
  {
    k: "field", tab: "In the field", head: "Help at the job site, confirmed by the technician.",
    agents: [
      { n: "Field AI", img: "field-ai", d: "A troubleshooting chat, a hands-free checklist and a nameplate scan on the technician job screen.", g: "Suggestions to check, never instructions. You confirm before anything is saved." },
    ],
    shot: "helpers-receptionist-field.png", alt: "The Field AI and AI Receptionist cards in the ServiceOps AI hub", actor: "field-ai", say: "You confirm before anything is saved.",
  },
  {
    k: "money", tab: "Money", head: "Follow-ups and margins, drafted and explained.",
    agents: [
      { n: "Collections Agent", img: "collections-agent", d: "Lists overdue invoices by balance and age, with reminder wording drafted.", g: "Never sends a reminder. A person reviews and sends it." },
      { n: "Quote Follow-up Agent", img: "quote-follow-up-agent", d: "Finds estimates sent and not answered, with follow-up wording drafted.", g: "Never sends a follow-up or changes an estimate." },
      { n: "Job Costing and Profitability AI", img: "job-costing-ai", d: "Explains in plain words what is driving margin.", g: "It explains and suggests. It changes nothing." },
    ],
    shot: "agents-collections-quote.png", alt: "The Collections Agent and Quote Follow-up Agent cards in the ServiceOps AI hub", actor: "collections-agent", say: "Drafts the reminder. A person sends it.",
  },
  {
    k: "insights", tab: "Insights", head: "Risks and coaching facts, for a person to act on.",
    agents: [
      { n: "Risk Flags Agent", img: "risk-flags-agent", d: "Flags SLA risk, stuck work orders, expiring certifications and unfinished visits.", g: "Flags only. A person decides what happens next." },
      { n: "Coaching Agent", img: "coaching-agent", d: "Neutral per-technician facts for one-to-one conversations.", g: "Never a score, grade or ranking of people." },
      { n: "Review Replies Agent", img: "review-replies-agent", d: "Drafts a short public reply to a customer review.", g: "The reply is never posted." },
    ],
    shot: "agents-risk-coaching.png", alt: "The Risk Flags Agent and Coaching Agent cards in the ServiceOps AI hub", actor: "risk-flags-agent", say: "Flags only. A person decides.",
  },
];

function Agents() {
  const [on, setOn] = useState(0);
  const t = TABS[on];
  return (
    <div className="ag">
      <div className="ag-tabs" role="tablist" aria-label="Agents by job">
        {TABS.map((x, i) => (
          <button key={x.k} type="button" role="tab" aria-selected={i === on} className={`ag-tab${i === on ? " on" : ""}`} onClick={() => setOn(i)}>{x.tab}</button>
        ))}
      </div>
      <div className="ag-stage" key={t.k}>
        <h4 className="ag-head">{t.head}</h4>
        <div className="ag-vis">
          <div className="ag-shot"><img src={`${APP}/${t.shot}`} alt={t.alt} /></div>
          <div className="ag-actor">
            <span className="ag-say">{t.say}</span>
            <svg className="ag-cur" viewBox="0 0 24 24" aria-hidden><path d="M4 3l16 7-7 2.5L10 20z" /></svg>
            <img className="ag-face" src={`${AG}/${t.actor}.jpg`} alt="" />
          </div>
        </div>
        <ul className="ag-list">
          {t.agents.map((a) => (
            <li key={a.n}>
              <img src={`${AG}/${a.img}.jpg`} alt="" />
              <span><b>{a.n}</b><small>{a.d}</small><em>{a.g}</em></span>
            </li>
          ))}
        </ul>
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
      <ul className="ea-row">
        {EVOQ_APPS.map(([k, n, d]) => (
          <li key={k} title={d}><ProductBadge productKey={k} size={56} /><b>{n}</b></li>
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

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

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
  .cn-stick{position:sticky;top:84px;height:calc(100vh - 110px);min-height:560px;max-height:640px}
  .cn{box-sizing:border-box;height:100%;display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:44px;align-items:center;padding:30px 44px;border-radius:40px;background:${BAND};overflow:hidden}
  .cn-it{border-top:1px solid rgba(180,83,9,.22)}
  .cn-it:last-child{border-bottom:1px solid rgba(180,83,9,.22)}
  .cn-t{display:flex;align-items:baseline;gap:14px;width:100%;padding:18px 0;border:0;background:none;text-align:left;cursor:pointer;font-family:var(--font-display),system-ui,sans-serif;font-size:28px;font-weight:600;letter-spacing:-.015em;line-height:1.15;color:#BDB099;transition:color .35s ease}
  .cn-t span{font-size:13px;font-weight:600;letter-spacing:.06em;color:#CFC3AC;transition:color .35s ease}
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

  /* marbles: real physics, positions come from the script */
  .ec-wrap{max-width:${PW}px;margin:0 auto}
  .ec-pile{position:relative;overflow:hidden;width:100%;max-width:${PW}px;height:${PH}px;margin:0 auto;background:${PAPER};border-radius:32px;box-shadow:inset 0 0 0 1px ${LINE}}
  .ec-ball{position:absolute;left:0;top:0;display:grid;place-items:center;border-radius:50%;background:#fff;color:#fff;overflow:hidden;opacity:0;will-change:transform;box-shadow:0 14px 22px -12px rgba(42,27,12,.55),inset 0 -9px 16px rgba(42,27,12,.2),inset 0 7px 12px rgba(255,255,255,.6)}
  .ec-ball::after{content:"";position:absolute;left:15%;top:9%;width:44%;height:28%;border-radius:50%;background:radial-gradient(closest-side,rgba(255,255,255,.8),rgba(255,255,255,0));pointer-events:none}
  .ec-ball svg{width:38%;height:38%}
  .ec-ball img{width:100%;height:100%;object-fit:cover;transform:scale(1.12)}
  .ec-ball img.ec-so{width:68%;height:68%;border-radius:22%;transform:none}
  .ec-chips{list-style:none;margin:14px 0 0;padding:0;display:flex;flex-wrap:wrap;justify-content:center;gap:6px}
  .ec-chips li{padding:5px 12px;border-radius:999px;background:#fff;box-shadow:inset 0 0 0 1px ${LINE};font-size:12.5px;font-weight:500;color:${INK}}

  /* agents, kept small */
  .ag-tabs{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px}
  .ag-tab{padding:8px 16px;border-radius:999px;border:0;background:#fff;font-family:var(--font-display),system-ui,sans-serif;font-size:14px;font-weight:600;color:${MUTED};cursor:pointer;transition:background .2s ease,color .2s ease,box-shadow .2s ease}
  .ag-tab:hover{color:${DEEP};box-shadow:0 0 0 1.5px ${DEEP}}
  .ag-tab.on{background:${DEEP};color:#fff}
  .ag-stage{animation:cnIn .5s cubic-bezier(.2,.7,.2,1) both}
  .ag-head{margin:0 0 12px;font-family:var(--font-display),system-ui,sans-serif;font-size:17px;line-height:1.25;font-weight:600;color:${DEEP}}
  .ag-vis{position:relative;padding:0 0 30px 30px}
  .ag-shot{overflow:hidden;border-radius:16px;background:#fff;box-shadow:0 22px 44px -24px rgba(42,27,12,.5),0 0 0 1px ${LINE}}
  .ag-shot img{display:block;width:100%;height:176px;object-fit:cover;object-position:top left}
  .ag-actor{position:absolute;left:-4px;bottom:0;display:flex;align-items:flex-end;gap:4px}
  .ag-face{order:1;width:62px;height:62px;border-radius:50%;object-fit:cover;background:#fff;box-shadow:0 0 0 3px #fff,0 14px 28px -10px rgba(42,27,12,.55)}
  .ag-cur{order:2;width:26px;height:26px;margin:0 0 8px -4px;fill:#B45309;stroke:#fff;stroke-width:1.6;stroke-linejoin:round;filter:drop-shadow(0 3px 5px rgba(42,27,12,.3));animation:agCur 2.6s ease-in-out infinite}
  .ag-say{order:3;margin:0 0 36px 2px;max-width:210px;padding:7px 12px;border-radius:13px 13px 13px 4px;background:${DEEP};color:#fff;font-size:12.5px;font-weight:500;line-height:1.35;box-shadow:0 12px 24px -12px rgba(42,27,12,.6)}
  @keyframes agCur{50%{transform:translate(5px,-6px)}}
  .ag-list{list-style:none;margin:2px 0 0;padding:0}
  .ag-list li{display:flex;gap:11px;align-items:flex-start;padding:8px 0;border-top:1px solid rgba(180,83,9,.2)}
  .ag-list img{width:34px;height:34px;flex-shrink:0;border-radius:50%;object-fit:cover;box-shadow:0 0 0 2px #fff;background:#fff}
  .ag-list b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:14px;color:${DEEP}}
  .ag-list small{font-size:12.5px;color:${MUTED};margin-top:1px}
  .ag-list em{display:block;margin-top:2px;font-style:normal;font-size:12px;font-weight:600;color:#78350F}

  /* EVOQ applications: a hub and five marks, nothing more */
  .ea{display:flex;flex-direction:column;align-items:center;padding:30px 20px 34px;border-radius:32px;background:${PAPER};box-shadow:inset 0 0 0 1px ${LINE}}
  .ea-hub{display:flex;align-items:center;gap:12px;padding:10px 24px 10px 12px;border-radius:999px;background:#fff;box-shadow:0 16px 36px -18px rgba(42,27,12,.5),0 0 0 1px ${LINE}}
  .ea-hub img{width:36px;height:36px;border-radius:10px}
  .ea-hub b{font-family:var(--font-display),system-ui,sans-serif;font-size:18px;color:${DEEP}}
  .ea-stem{display:block;width:2px;height:30px;background:repeating-linear-gradient(${PRIMARY} 0 4px,transparent 4px 8px);opacity:.5}
  .ea-row{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px;width:100%}
  .ea-row li{display:flex;flex-direction:column;align-items:center;gap:10px;padding:18px 6px 14px;border-radius:20px;background:#fff;box-shadow:0 10px 24px -18px rgba(42,27,12,.45),0 0 0 1px ${LINE}}
  .ea-row b{font-family:var(--font-display),system-ui,sans-serif;font-size:14px;color:${DEEP}}

  @media (prefers-reduced-motion:reduce){.cn-v,.ag-stage,.ag-cur{animation:none}.cn-d{transition:none}}
  @media (max-width:1180px){.cn{grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:30px;padding:26px 32px}.cn-t{font-size:24px}}
  @media (max-width:980px){
    .cn-track{height:auto}
    .cn-stick{position:static;height:auto;min-height:0;max-height:none}
    .cn{height:auto;grid-template-columns:1fr;gap:24px;overflow:visible}
    .cn-r{height:auto}
  }
  @media (max-width:700px){
    .cn{padding:22px 16px 24px;border-radius:28px}
    .cn-t{font-size:22px;padding:16px 0}
    .ag-vis{padding:0 0 34px 0}
    .ag-shot img{height:150px}
    .ag-face{width:52px;height:52px}
    .ag-say{margin-bottom:30px;font-size:12px;max-width:160px}
    .ea-row{grid-template-columns:repeat(3,minmax(0,1fr))}
  }
`;
