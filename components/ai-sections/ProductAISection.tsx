"use client";

/* eslint-disable @next/next/no-img-element -- plain <img> keeps this file portable to any React setup */

/**
 * EVOQ product microsites — "AI in <product>" section TEMPLATE.
 *
 * One component, one config object per product. Self-contained: needs only
 * React 18+ (no Tailwind, no animation library, no project CSS). Styles are
 * scoped under `.pai` and injected by the component itself.
 *
 *   import { ProductAISection } from "./ProductAISection";
 *   import { crmAI } from "./product-configs";
 *
 *   <ProductAISection config={crmAI} />
 *
 * See README.md for the config reference and the content rules.
 */

import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ config */
export type BoardItem = { title: string; meta?: string; tag?: string; flag?: boolean; initials?: string };
export type ListRow = { title: string; meta?: string; value?: string; tag?: string; flag?: boolean; initials?: string };

export type ProductWindow = {
  /** product logo shown top-left of the mock window (optional) */
  logo?: string;
  title: string; // e.g. "Pipeline"
  subtitle: string; // e.g. "12 open deals · $1.24M"
  action: string; // small button label, e.g. "New deal"
  /** "board" = columns of cards, "list" = table-like rows */
  layout: "board" | "list";
  columns?: { name: string; dot: string; items: BoardItem[] }[];
  rows?: ListRow[];
};

export type Scene = {
  /** what the user asks EVI */
  question: string;
  /** EVI's reply. Wrap words in **double asterisks** to bold them. */
  answer: string;
  agent: string; // e.g. "Follow-up agent"
  status?: string; // default "Awaiting approval"
  /** 3 steps. done:true shows a green check, false shows a pending clock */
  steps: { text: string; done: boolean }[];
  placeholder?: string;
};

export type ProductAIConfig = {
  id: string; // anchor id, e.g. "ai-in-crm"
  eyebrow: string; // e.g. "AI in EVOQ CRM"
  title: string;
  lead: string;
  body: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  window: ProductWindow;
  scenes: Scene[]; // 2–3 recommended
  /** which side the visual sits on at desktop widths. Alternate between neighbouring sections. */
  visualSide?: "left" | "right";
  /** brand accent for the mock window (buttons, avatars). Default EVOQ blue. */
  accent?: string;
  assets?: { eviLogo?: string };
};

const DEFAULT_ASSETS = { eviLogo: "/ai/ai-logo-icon.png" };

/* ----------------------------------------------------------------- helpers */
function useInView<T extends HTMLElement>(): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      const t = setTimeout(() => setSeen(true), 0);
      return () => clearTimeout(t);
    }
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}

/** scales a fixed-size composition down to the width of its column (desktop only) */
function ScaleFit({ width, height, children }: { width: number; height: number; children: React.ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = outer.current;
    if (!el) return;
    const measure = () => setScale(Math.min(1, el.clientWidth / width));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);
  return (
    <div ref={outer} style={{ height: height * scale }}>
      <div style={{ width, height, transform: `scale(${scale})`, transformOrigin: "top left", position: "relative" }}>{children}</div>
    </div>
  );
}

const Arrow = ({ size = 16, color = "#fff" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const Check = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0E9F6E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="m8.5 12.5 2.4 2.4L16 10" />
  </svg>
);
const Clock = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#B7791F" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </svg>
);

const initialsOf = (s: string) => s.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();

/** "**bold** text" -> React nodes */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) => (i % 2 ? <b key={i}>{part}</b> : <span key={i}>{part}</span>))}
    </>
  );
}

/* --------------------------------------------------------------- EVI panel */
function EviPanel({ scene, eviLogo, className = "" }: { scene: Scene; eviLogo?: string; className?: string }) {
  return (
    <div className={`pai-dock ${className}`}>
      <div className="pai-dock-in">
        <div className="pai-between">
          <span className="pai-flex" style={{ gap: 8 }}>
            {eviLogo ? <img src={eviLogo} alt="EVOQ AI" width={32} height={32} style={{ borderRadius: 10 }} /> : null}
            <b style={{ fontSize: 15, color: "#0C2472" }}>EVI</b>
          </span>
          <span className="pai-flex" style={{ gap: 6, fontSize: 11, fontWeight: 700, color: "#4747E0" }}>
            <i className="pai-dot pai-pulse" style={{ background: "#4747E0" }} />
            Online
          </span>
        </div>

        <div key={scene.question} className="pai-fade">
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
            <p className="pai-user">{scene.question}</p>
          </div>
          <p className="pai-evi">
            <Rich text={scene.answer} />
          </p>
          <div className="pai-agent">
            <div className="pai-between">
              <b style={{ fontSize: 12.5, color: "#0C2472" }}>{scene.agent}</b>
              <span className="pai-pill">{scene.status ?? "Awaiting approval"}</span>
            </div>
            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
              {scene.steps.map((r) => (
                <span key={r.text} className="pai-flex" style={{ gap: 8, fontSize: 12, color: "rgba(49,70,90,.85)" }}>
                  {r.done ? <Check /> : <Clock />}
                  {r.text}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ flex: 1 }} />
        <div className="pai-input">
          <p>{scene.placeholder ?? "Ask EVI anything…"}</p>
          <div className="pai-between" style={{ marginTop: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#4747E0" }}>@</span>
            <span className="pai-send">
              <Arrow size={15} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ product window */
function ProductWindowView({ w, accent, className = "" }: { w: ProductWindow; accent: string; className?: string }) {
  return (
    <div className={`pai-window ${className}`} style={{ ["--pai-accent" as string]: accent }}>
      <div className="pai-between" style={{ marginBottom: 18 }}>
        <span className="pai-flex" style={{ gap: 12 }}>
          {w.logo ? <img src={w.logo} alt="" style={{ height: 26, width: "auto" }} /> : null}
          {w.logo ? <span style={{ width: 1, height: 22, background: "#E4E7EF" }} /> : null}
          <span>
            <b style={{ display: "block", fontSize: 15, color: "#102A43" }}>{w.title}</b>
            <span style={{ fontSize: 11.5, color: "#667085" }}>{w.subtitle}</span>
          </span>
        </span>
        <span className="pai-btn-sm">{w.action}</span>
      </div>

      {w.layout === "board" ? (
        <div className="pai-cols">
          {(w.columns ?? []).map((c) => (
            <div key={c.name} className="pai-col">
              <p className="pai-flex" style={{ gap: 6, fontSize: 11, fontWeight: 700, color: "#475467", padding: "0 4px" }}>
                <i className="pai-dot" style={{ background: c.dot }} />
                {c.name}
              </p>
              <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
                {c.items.map((d) => (
                  <div key={d.title} className="pai-card" style={d.flag ? { boxShadow: "inset 3px 0 0 #F59E0B" } : undefined}>
                    <p className="pai-flex" style={{ gap: 6, fontSize: 11.5, fontWeight: 700, color: "#102A43" }}>
                      <span className="pai-avatar">{d.initials ?? initialsOf(d.title)}</span>
                      <span className="pai-ellipsis">{d.title}</span>
                    </p>
                    {d.meta ? <p style={{ marginTop: 6, fontSize: 11, color: "#475467" }}>{d.meta}</p> : null}
                    {d.tag ? <p style={{ marginTop: 2, fontSize: 10, fontWeight: 700, color: d.flag ? "#B7791F" : "#667085" }}>{d.tag}</p> : null}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="pai-list">
          {(w.rows ?? []).map((r) => (
            <div key={r.title} className="pai-listrow" style={r.flag ? { boxShadow: "inset 3px 0 0 #F59E0B" } : undefined}>
              <span className="pai-avatar" style={{ width: 28, height: 28, fontSize: 10 }}>{r.initials ?? initialsOf(r.title)}</span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <b className="pai-ellipsis" style={{ display: "block", fontSize: 12.5, color: "#102A43" }}>{r.title}</b>
                {r.meta ? <span style={{ fontSize: 11, color: "#667085" }}>{r.meta}</span> : null}
              </span>
              {r.value ? <b style={{ fontSize: 12.5, color: "#102A43" }}>{r.value}</b> : null}
              {r.tag ? (
                <span className="pai-chip" style={r.flag ? { background: "#FFF4DB", color: "#B7791F" } : { background: "#EEF1F6", color: "#475467" }}>
                  {r.tag}
                </span>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------- section */
export function ProductAISection({ config }: { config: ProductAIConfig }) {
  const c = config;
  const assets = { ...DEFAULT_ASSETS, ...c.assets };
  const accent = c.accent ?? "#2F6BFF";
  const right = c.visualSide === "right";
  const [ref, inView] = useInView<HTMLElement>();
  const [hold, setHold] = useState(false);
  const [i, setI] = useState(0);

  // the assistant steps through the example questions while the section is on screen
  useEffect(() => {
    if (!inView || hold || c.scenes.length < 2) return;
    const t = setTimeout(() => setI((n) => (n + 1) % c.scenes.length), 6500);
    return () => clearTimeout(t);
  }, [inView, hold, i, c.scenes.length]);

  const scene = c.scenes[i % c.scenes.length];

  return (
    <section id={c.id} ref={ref} className={`pai${right ? " pai-right" : ""}`} onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
      <style>{CSS}</style>
      <div className="pai-glow pai-glow-a" />
      <div className="pai-glow pai-glow-b" />
      <div className="pai-wrap">
        <div className="pai-visual">
          <div className="pai-desktop">
            <ScaleFit width={980} height={600}>
              <ProductWindowView w={c.window} accent={accent} className="pai-window-abs" />
              <EviPanel scene={scene} eviLogo={assets.eviLogo} className="pai-dock-abs" />
            </ScaleFit>
          </div>
          <div className="pai-mobile">
            <EviPanel scene={scene} eviLogo={assets.eviLogo} />
          </div>
        </div>

        <div className="pai-copy">
          <p className="pai-eyebrow">{c.eyebrow}</p>
          <h2>{c.title}</h2>
          <p className="pai-lead">{c.lead}</p>
          <p className="pai-body">{c.body}</p>
          <div className="pai-ctas">
            <a href={c.primaryCta.href} className="pai-cta pai-cta-primary">
              {c.primaryCta.label}
              <Arrow />
            </a>
            {c.secondaryCta ? (
              <a href={c.secondaryCta.href} className="pai-cta pai-cta-ghost">
                {c.secondaryCta.label}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductAISection;

/* ------------------------------------------------- styles (scoped to .pai) */
const CSS = `
.pai{position:relative;overflow:hidden;background:linear-gradient(180deg,#FBFBFF 0%,#F1EFFF 100%);padding:88px 24px;font-family:inherit;color:#102A43}
.pai *{box-sizing:border-box}
.pai-glow{position:absolute;border-radius:50%;filter:blur(60px);pointer-events:none}
.pai-glow-a{left:-140px;top:20px;width:420px;height:420px;background:radial-gradient(closest-side,#E4E1FF,rgba(228,225,255,0))}
.pai-glow-b{right:-120px;bottom:-60px;width:560px;height:420px;background:radial-gradient(closest-side,#DAD6FF,rgba(218,214,255,0))}
.pai-right .pai-glow-a{left:auto;right:-140px}
.pai-right .pai-glow-b{right:auto;left:-120px}
.pai-wrap{position:relative;max-width:1240px;margin:0 auto;display:grid;grid-template-columns:1.25fr .85fr;gap:48px;align-items:center}
.pai-right .pai-wrap{grid-template-columns:.85fr 1.25fr}
.pai-right .pai-visual{order:2}
.pai-visual{min-width:0}
.pai-mobile{display:none}
.pai-copy{max-width:480px}
.pai-eyebrow{margin:0;font-size:12.5px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:#4747E0}
.pai-copy h2{margin:18px 0 0;font-size:38px;line-height:1.12;letter-spacing:-.02em;font-weight:800;color:#102A43}
.pai-lead{margin:22px 0 0;font-size:16.5px;line-height:1.6;font-weight:600;color:#31465A}
.pai-body{margin:14px 0 0;font-size:15px;line-height:1.75;color:rgba(49,70,90,.75)}
.pai-ctas{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}
.pai-cta{display:inline-flex;align-items:center;gap:10px;border-radius:999px;padding:14px 26px;font-size:15px;font-weight:700;text-decoration:none;transition:transform .2s}
.pai-cta:hover{transform:translateY(-2px)}
.pai-cta-primary{background:linear-gradient(90deg,#4747E0,#5C5CFF);color:#fff;box-shadow:0 20px 40px -16px rgba(71,71,224,.6)}
.pai-cta-ghost{color:#4747E0;border:1.5px solid #C9C9FA;background:#fff}
.pai-flex{display:flex;align-items:center;margin:0}
.pai-between{display:flex;align-items:center;justify-content:space-between}
.pai-ellipsis{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.pai-dot{display:inline-block;width:8px;height:8px;border-radius:50%}
.pai-window{background:#fff;border-radius:22px;padding:22px;box-shadow:0 40px 90px -30px rgba(16,42,67,.35);outline:1px solid rgba(49,70,90,.08)}
.pai-window-abs{position:absolute;left:0;top:44px;width:700px;height:490px;overflow:hidden}
.pai-cols{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
.pai-col{background:#FAFBFC;border-radius:14px;padding:10px;outline:1px solid rgba(49,70,90,.06);min-height:330px}
.pai-card{background:#fff;border-radius:11px;padding:10px;outline:1px solid rgba(49,70,90,.08)}
.pai-avatar{display:inline-flex;align-items:center;justify-content:center;flex:none;width:20px;height:20px;border-radius:50%;background:color-mix(in srgb,var(--pai-accent,#2F6BFF) 14%,#fff);color:var(--pai-accent,#2F6BFF);font-size:8.5px;font-weight:800}
.pai-btn-sm{border-radius:999px;background:var(--pai-accent,#2F6BFF);color:#fff;font-size:11.5px;font-weight:700;padding:7px 16px}
.pai-list{display:flex;flex-direction:column;gap:8px}
.pai-listrow{display:flex;align-items:center;gap:12px;background:#FAFBFC;border-radius:12px;padding:12px 14px;outline:1px solid rgba(49,70,90,.06)}
.pai-chip{border-radius:999px;font-size:10.5px;font-weight:700;padding:4px 10px;white-space:nowrap}
.pai-dock{display:flex;flex-direction:column;border-radius:26px;background:linear-gradient(180deg,#4747E0,#5C5CFF);padding:1.5px;box-shadow:0 40px 80px -28px rgba(71,71,224,.6)}
.pai-dock-abs{position:absolute;right:0;top:34px;width:340px;height:540px}
.pai-dock-in{display:flex;flex:1;flex-direction:column;border-radius:24.5px;background:#fff;padding:20px}
.pai-user{margin:0;max-width:250px;border-radius:16px 16px 5px 16px;background:linear-gradient(90deg,#4747E0,#5C5CFF);color:#fff;padding:10px 14px;font-size:12.5px;font-weight:600;line-height:1.45}
.pai-evi{margin:12px 0 0;border-radius:16px 16px 16px 5px;background:#F5F5FF;color:#0C2472;padding:14px;font-size:12.5px;line-height:1.6}
.pai-agent{margin-top:12px;border:1px solid #E6E6FA;border-radius:14px;padding:14px}
.pai-pill{border-radius:999px;background:#FFF4DB;color:#B7791F;font-size:10px;font-weight:700;padding:4px 10px}
.pai-input{margin-top:16px;border:2px solid #4747E0;border-radius:18px;padding:12px;box-shadow:0 14px 30px -16px rgba(71,71,224,.6)}
.pai-input p{margin:0;font-size:13px;color:rgba(49,70,90,.5)}
.pai-send{display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#4747E0}
.pai-fade{animation:paiFade .5s ease}
.pai-pulse{animation:paiPulse 1.6s ease infinite}
@keyframes paiFade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@keyframes paiPulse{0%,100%{box-shadow:0 0 0 0 rgba(71,71,224,.4)}50%{box-shadow:0 0 0 6px rgba(71,71,224,0)}}
@media (prefers-reduced-motion:reduce){.pai-fade,.pai-pulse{animation:none}}
@media (max-width:1023px){
  .pai{padding:64px 20px}
  .pai-wrap,.pai-right .pai-wrap{grid-template-columns:1fr;gap:36px}
  .pai-copy{order:-1;max-width:none}
  .pai-right .pai-visual{order:0}
  .pai-copy h2{font-size:30px}
  .pai-desktop{display:none}
  .pai-mobile{display:block;max-width:480px}
}
`;
