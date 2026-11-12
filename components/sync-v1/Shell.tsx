"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { Topbar } from "@/components/hero/Topbar";
import { Footer } from "@/components/sections/Footer";
import { HsMotion } from "@/components/hospitality/HsMotion";
import { GetStartedModal } from "@/components/shared/GetStartedModal";
import { track } from "@/lib/track";
import { GLYPHS } from "./glyphs";
import { APP, C, IMAGE_MARKS, SYNC_BASE } from "./data";

/* Shell for the Sync v1 pages: the EVOQ top bar, the Sync product bar, the demo form and the base styles. */

type PageKey = "overview" | "features" | "pricing";

const DemoCtx = createContext<(location: string, title?: string) => void>(() => {});
export const useDemo = () => useContext(DemoCtx);

export function Demo({ location, title, className = "sx-btn primary", children = "Book a walkthrough" }: { location: string; title?: string; className?: string; children?: ReactNode }) {
  const open = useDemo();
  return <button type="button" className={className} onClick={() => open(location, title)}>{children}</button>;
}

/* the Sync mark, drawn so it follows the grape palette */
export function SyncMark({ size = 30, bg = C.primary }: { size?: number; bg?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 432 432" aria-hidden>
      <rect x="8" y="8" width="416" height="416" rx="116" fill={bg} />
      <g fill="none" stroke="#fff" strokeWidth="26" strokeLinecap="round"><circle cx="277" cy="160" r="50" /><circle cx="153" cy="277" r="48" /><path d="M153 113V229" /><path d="M188 244L240 195" /></g>
    </svg>
  );
}

/* an app mark: simple-icons glyph on its brand colour, or the bundled image */
export function Mark({ id, size = 36, title }: { id: string; size?: number; title?: boolean }) {
  const g = GLYPHS[id];
  const a = APP(id);
  const r = Math.round(size * 0.26);
  if (g) {
    return (
      <span className="sx-mark" style={{ width: size, height: size, borderRadius: r, background: g.hex }} title={title ? a.name : undefined}>
        <svg viewBox="0 0 24 24" width={size * 0.58} height={size * 0.58} aria-hidden><path d={g.path} fill={g.fg} /></svg>
      </span>
    );
  }
  return (
    <span className="sx-mark img" style={{ width: size, height: size, borderRadius: r }} title={title ? a.name : undefined}>
      <img src={IMAGE_MARKS[id]} alt="" width={size} height={size} />
    </span>
  );
}

function ProductBar({ page }: { page: PageKey }) {
  const items: [PageKey, string, string][] = [["overview", "Overview", SYNC_BASE], ["features", "Features", `${SYNC_BASE}/features`], ["pricing", "Pricing", `${SYNC_BASE}/pricing`]];
  return (
    <div className="sx-bar">
      <div className="sx-bar-in">
        <Link href={SYNC_BASE} className="sx-brand" aria-label="EVOQ Sync overview"><SyncMark size={30} /><span>Sync</span></Link>
        <nav className="sx-menu" aria-label="EVOQ Sync">
          {items.map(([k, l, h]) => <Link key={k} href={h} className={page === k ? "on" : undefined} aria-current={page === k ? "page" : undefined}>{l}</Link>)}
        </nav>
        <Demo location="product_bar" className="sx-btn primary sm sx-bar-cta">Book a walkthrough</Demo>
      </div>
    </div>
  );
}

export function SyncShell({ children, page = "overview" }: { children: ReactNode; page?: PageKey }) {
  const [from, setFrom] = useState<{ loc: string; title: string } | null>(null);
  const open = useCallback((location: string, title = "Book a walkthrough") => {
    track("click_demo_cta", { location, page: `sync_v1_${page}` });
    setFrom({ loc: location, title });
  }, [page]);
  useEffect(() => { track("view_sync_v1", { page }); }, [page]);
  return (
    <DemoCtx.Provider value={open}>
      <div className="sx-root hs-root">
        <style>{baseCss}</style>
        <HsMotion />
        <header className="sx-hd">
          <div className="sx-top"><Topbar light darkCTA={false} theme={{ navBg: C.primary, navFg: "#FFFFFF", ctaBg: C.lime, ctaFg: C.limeInk, loginFg: C.ink }} /></div>
          <ProductBar page={page} />
        </header>
        <main>{children}</main>
        <Footer background={C.depth} socialHover={C.primary} />
        <GetStartedModal isOpen={from !== null} onClose={() => setFrom(null)} title={from?.title ?? "Book a walkthrough"} source={`sync_v1_${from?.loc ?? "demo"}`} />
      </div>
    </DemoCtx.Provider>
  );
}

/* closing band, shared by all three pages */
export function Closing({ title = "Your systems have been disagreeing for long enough.", text = "Bring the two systems that disagree most. We will set up the integration with you on a walkthrough, using your own fields." }: { title?: string; text?: string }) {
  return (
    <section className="sx-out sx-close-out">
      <div className="sx-in">
        <div className="sx-close" data-rv>
          <div className="sx-close-copy">
            <h2>{title}</h2>
            <p>{text}</p>
            <div className="sx-ctas">
              <Demo location="closing" className="sx-btn lime">Book a walkthrough</Demo>
              <Link href={`${SYNC_BASE}/pricing`} className="sx-btn ghost-dark">See how pricing works</Link>
            </div>
          </div>
          <div className="sx-close-art" aria-hidden>
            <div className="sx-close-pair"><Mark id="shopify" size={52} /><i /><SyncMark size={58} bg={C.action} /><i /><Mark id="netsuite" size={52} /></div>
            <div className="sx-close-card">
              <span className="sx-dot ok" />
              <div><b>Shopify orders to NetSuite sales orders</b><small>Test passed on sample data. Ready to switch on.</small></div>
              <span className="sx-switch on"><i /></span>
            </div>
            <img src="/sync-v1/characters/sync-pose-5.webp" alt="" className="sx-close-agent" />
          </div>
        </div>
      </div>
    </section>
  );
}

const baseCss = `
  .sx-root{background:#fff;color:${C.body};font-family:var(--font-sans),system-ui,sans-serif;font-size:16px;line-height:1.6;min-height:100vh;overflow-x:clip}
  .sx-root h1,.sx-root h2,.sx-root h3,.sx-root h4{font-family:var(--font-display),system-ui,sans-serif;color:${C.ink};font-weight:600;margin:0;letter-spacing:-.02em;text-wrap:balance}
  .sx-root p{text-wrap:pretty}
  .sx-root img{max-width:100%}
  .sx-out{padding:0 20px}
  .sx-in{max-width:1240px;margin:0 auto}
  .sx-sec{padding-top:104px;padding-bottom:104px;scroll-margin-top:60px}
  .sx-grey{background:${C.g1}}
  .sx-surface{background:${C.surface}}
  .sx-dark{background:${C.depth};color:#D9CCF0}
  .sx-dark h2,.sx-dark h3,.sx-dark h4{color:#fff}
  .sx-label{display:inline-flex;align-items:center;gap:8px;font-family:var(--font-display),system-ui,sans-serif;font-size:12.5px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:${C.primary}}
  .sx-dark .sx-label{color:${C.lime}}
  .sx-head{max-width:820px;margin-bottom:52px}
  .sx-head.c{margin-left:auto;margin-right:auto;text-align:center}
  .sx-head .sx-label{margin-bottom:14px}
  .sx-head p{margin:16px 0 0;font-size:18px;line-height:1.6;max-width:64ch}
  .sx-head.c p{margin-left:auto;margin-right:auto}
  .sx-dark .sx-head p{color:#CDBEE8}

  .sx-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:50px;padding:0 24px;border-radius:12px;font-family:var(--font-display),system-ui,sans-serif;font-size:15.5px;font-weight:600;text-decoration:none;cursor:pointer;border:1.5px solid transparent;transition:background .18s ease,border-color .18s ease,transform .12s ease,box-shadow .18s ease;white-space:nowrap}
  .sx-btn:active{transform:translateY(1px)}
  .sx-btn.sm{min-height:38px;padding:0 16px;font-size:14px;border-radius:10px}
  .sx-btn.primary{background:${C.primary};color:#fff;box-shadow:0 10px 24px -12px rgba(126,34,206,.7)}
  .sx-btn.primary:hover{background:#6B1DB0}
  .sx-btn.secondary{background:#fff;color:${C.ink};border-color:${C.line}}
  .sx-btn.secondary:hover{border-color:${C.primary};color:${C.primary}}
  .sx-btn.lime{background:${C.lime};color:${C.limeInk}}
  .sx-btn.lime:hover{background:#B5EF4F}
  .sx-btn.ghost-dark{background:transparent;color:#fff;border-color:rgba(255,255,255,.32)}
  .sx-btn.ghost-dark:hover{border-color:#fff;background:rgba(255,255,255,.06)}
  .sx-btn svg{width:17px;height:17px}
  .sx-root button:focus-visible,.sx-root a:focus-visible{outline:2px solid ${C.action};outline-offset:2px}
  .sx-ctas{display:flex;flex-wrap:wrap;gap:12px;margin-top:32px}

  .sx-mark{display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden}
  .sx-mark.img{background:#fff;box-shadow:inset 0 0 0 1px ${C.line}}
  .sx-mark.img img{width:100%;height:100%;object-fit:contain}
  .sx-dot{width:9px;height:9px;border-radius:50%;flex-shrink:0;background:${C.muted}}
  .sx-dot.ok{background:${C.ok}}.sx-dot.warn{background:${C.warn}}.sx-dot.err{background:${C.err}}
  .sx-switch{position:relative;width:40px;height:23px;border-radius:999px;background:#D4CFDC;flex-shrink:0;transition:background .2s ease}
  .sx-switch i{position:absolute;top:3px;left:3px;width:17px;height:17px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.2);transition:transform .2s ease}
  .sx-switch.on{background:${C.primary}}.sx-switch.on i{transform:translateX(17px)}

  .sx-hd{position:relative;background:#fff}
  .sx-top{position:relative;z-index:60}
  .sx-bar{position:sticky;top:0;z-index:50;padding:0 20px;background:rgba(255,255,255,.92);backdrop-filter:blur(10px);border-bottom:1px solid ${C.line};border-top:1px solid ${C.line}}
  .sx-bar-in{max-width:1240px;margin:0 auto;display:flex;align-items:center;gap:28px;min-height:58px}
  .sx-brand{display:flex;align-items:center;gap:10px;flex-shrink:0;text-decoration:none;font-family:var(--font-display),system-ui,sans-serif;font-size:19px;font-weight:600;color:${C.ink}}
  .sx-menu{display:flex;gap:4px}
  .sx-menu a{position:relative;padding:8px 14px;font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;font-weight:500;color:${C.muted};text-decoration:none;border-radius:8px;transition:color .15s ease,background .15s ease}
  .sx-menu a:hover{color:${C.ink};background:${C.g1}}
  .sx-menu a.on{color:${C.ink};font-weight:600}
  .sx-menu a.on::after{content:"";position:absolute;left:14px;right:14px;bottom:-16px;height:2.5px;border-radius:2px;background:${C.primary}}
  .sx-bar-cta{margin-left:auto}

  .sx-close-out{padding-top:24px;padding-bottom:104px}
  .sx-close{position:relative;display:grid;grid-template-columns:1.1fr .9fr;gap:40px;align-items:center;padding:64px;border-radius:28px;background:${C.depth};overflow:hidden;isolation:isolate}
  .sx-close::before{content:"";position:absolute;inset:0;z-index:-1;background:radial-gradient(600px 320px at 90% 0%,rgba(168,85,247,.45),transparent 70%),radial-gradient(420px 260px at 0% 100%,rgba(163,230,53,.12),transparent 70%)}
  .sx-close h2{--h2-size:38px;color:#fff}
  .sx-close p{margin:16px 0 0;font-size:18px;color:#D9CCF0;max-width:46ch}
  .sx-close-art{position:relative;min-height:300px}
  .sx-close-pair{display:flex;align-items:center;justify-content:center;gap:0;margin-top:10px}
  .sx-close-pair i{display:block;width:54px;height:2px;background:repeating-linear-gradient(90deg,${C.lime} 0 8px,transparent 8px 14px)}
  .sx-close-card{position:relative;z-index:2;display:flex;align-items:center;gap:14px;margin:34px 0 0;padding:16px 18px;border-radius:16px;background:#fff;box-shadow:0 24px 50px -20px rgba(0,0,0,.5);max-width:380px}
  .sx-close-card b{display:block;font-family:var(--font-display),system-ui,sans-serif;font-size:15px;color:${C.ink};line-height:1.3}
  .sx-close-card small{display:block;margin-top:3px;font-size:13px;color:${C.muted};line-height:1.4}
  .sx-close-card div{flex:1;min-width:0}
  .sx-close-agent{position:absolute;right:-20px;bottom:-64px;width:200px;height:auto;z-index:1}

  .hs-rv{opacity:0;transform:translateY(22px);transition:opacity .7s cubic-bezier(.2,.7,.2,1),transform .7s cubic-bezier(.2,.7,.2,1);transition-delay:var(--hs-d,0ms)}
  .hs-rv.hs-in{opacity:1;transform:none}
  @media (prefers-reduced-motion:reduce){.hs-rv{transition:none;opacity:1;transform:none}}
  @media (max-width:980px){
    .sx-close{grid-template-columns:1fr;padding:44px 28px}
    .sx-close-agent{width:150px;bottom:-52px;right:-10px}
  }
  @media (max-width:860px){
    .sx-sec{padding-top:68px;padding-bottom:68px}
    .sx-head{margin-bottom:36px}
    .sx-head p{font-size:16.5px}
    .sx-bar-in{gap:12px;min-height:52px}
    .sx-menu a{padding:8px 10px}
    .sx-menu a.on::after{bottom:-13px;left:10px;right:10px}
    .sx-bar-cta{display:none}
    .sx-close-out{padding-bottom:68px}
    .sx-close h2{--h2-size:28px}
    .sx-close p{font-size:16.5px}
  }
`;
