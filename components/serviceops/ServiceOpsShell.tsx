"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { Topbar } from "@/components/hero/Topbar";
import { Footer } from "@/components/sections/Footer";
import { HsMotion } from "@/components/hospitality/HsMotion";
import { GetStartedModal } from "@/components/shared/GetStartedModal";
import { track } from "@/lib/track";
import { BAND, DEEP, FOOT, INK, LINE, MUTED, PAPER, PRIMARY, SAND, TINT } from "./palette";

/* Shell for the ServiceOps pages: the EVOQ top bar, the product bar (ServiceOps mark, Overview and Features),
   the demo form and the base styles shared by the home and features pages. Every surface is light. */

export const SO_BASE = "/products/serviceops-v1";
export type SoPage = "home" | "features";

const DemoCtx = createContext<(location: string) => void>(() => {});
export const useDemo = () => useContext(DemoCtx);

export function DemoButton({ location, className = "so-btn primary", children = "Get a demo" }: { location: string; className?: string; children?: ReactNode }) {
  const open = useDemo();
  return <button type="button" className={className} onClick={() => open(location)}>{children}</button>;
}

function ProductBar({ page, base }: { page: SoPage; base: string }) {
  const menu = [
    { k: "home", name: "Overview", href: base },
    { k: "features", name: "Features", href: `${base}/features` },
  ];
  return (
    <div className="so-bar">
      <div className="so-bar-in">
        <Link href={base} className="so-brand" aria-label="ServiceOps overview">
          <img src="/logos/ServiceOps.png" alt="ServiceOps" height={30} />
        </Link>
        <nav className="so-menu" aria-label="ServiceOps">
          {menu.map((m) => (
            <Link key={m.k} href={m.href} className={m.k === page ? "on" : ""} aria-current={m.k === page ? "page" : undefined}>{m.name}</Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

export function ServiceOpsShell({ page, hero, children, base = SO_BASE }: { page: SoPage; hero: ReactNode; children: ReactNode; base?: string }) {
  const [from, setFrom] = useState<string | null>(null);
  const open = useCallback((location: string) => {
    track("click_demo_cta", { location, page: `serviceops_${page}` });
    setFrom(location);
  }, [page]);
  useEffect(() => { track(`view_serviceops_${page}`, { page: "serviceops" }); }, [page]);
  return (
    <DemoCtx.Provider value={open}>
      <div className="so-root hs-root">
        <style>{css}</style>
        <HsMotion />
        <header className="so-hd">
          <span className="so-hd-bg" aria-hidden />
          <div className="so-hd-top"><Topbar light darkCTA={false} ctaColor={PRIMARY} /></div>
          <ProductBar page={page} base={base} />
          <div className="so-hd-body">{hero}</div>
        </header>
        <main>{children}</main>
        <Footer background={FOOT} />
        <GetStartedModal isOpen={from !== null} onClose={() => setFrom(null)} title="Get a demo" source={`serviceops_${from ?? "demo"}`} />
      </div>
    </DemoCtx.Provider>
  );
}

const css = `
  .so-root{overflow-x:clip;background:#fff;color:${INK};font-family:var(--font-sans),system-ui,sans-serif;font-size:16px;line-height:1.6;min-height:100vh}
  .so-root h1,.so-root h2,.so-root h3{font-family:var(--font-display),system-ui,sans-serif;color:${DEEP};font-weight:600;margin:0}
  .so-root p{text-wrap:pretty}
  .so-root main{position:relative}
  .so-out{padding:0 20px}
  .so-in{max-width:1240px;margin:0 auto}
  .so-sec{padding-top:104px;padding-bottom:104px;scroll-margin-top:60px}
  .so-white{background:#fff}
  .so-band{background:#fff}
  .so-band.so-sec{padding-top:24px;padding-bottom:24px}
  .so-band .so-in{background:${BAND};border-radius:40px;padding:48px 64px}
  .so-label{display:inline-block;font-family:var(--font-display),system-ui,sans-serif;font-size:13px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:${PRIMARY}}
  .so-h2{font-size:38px;line-height:1.12;letter-spacing:-.02em;text-wrap:balance}
  .so-lead{font-size:18px;line-height:1.6;color:${MUTED};margin:18px 0 0;max-width:62ch;text-wrap:pretty}
  .so-head{max-width:820px;margin-bottom:52px}
  .so-head .so-label{margin-bottom:14px}
  .so-head.c{max-width:900px}
  .so-head.wide{max-width:1160px}.so-head.wide .so-lead{max-width:1100px}

  .so-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:48px;padding:0 22px;border-radius:999px;font-family:var(--font-display),system-ui,sans-serif;font-size:15px;font-weight:600;text-decoration:none;cursor:pointer;border:1.5px solid transparent;transition:background .18s ease,border-color .18s ease,color .18s ease;white-space:nowrap}
  .so-btn.primary{background:${DEEP};color:#fff}.so-btn.primary:hover{background:${PRIMARY}}
  .so-btn.secondary{background:transparent;color:${DEEP};border-color:rgba(42,27,12,.28)}.so-btn.secondary:hover{background:#fff;border-color:${DEEP}}
  .so-btn svg{width:17px;height:17px}
  .so-root button:focus-visible,.so-root a:focus-visible{outline:2px solid ${PRIMARY};outline-offset:2px}
  .so-ctas{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}
  .so-badge{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:999px;font-style:normal;font-size:12px;font-weight:600;white-space:nowrap;line-height:1.5}
  .so-badge svg{width:12px;height:12px}
  .so-badge.ok{background:rgba(22,138,74,.1);color:#168A4A}.so-badge.warn{background:rgba(217,119,6,.14);color:#92400E}.so-badge.risk{background:rgba(194,65,12,.12);color:#C2410C}.so-badge.soft{background:${TINT};color:#78350F}
  .so-ic{width:40px;height:40px;border-radius:12px;background:${TINT};color:${PRIMARY};display:grid;place-items:center;flex-shrink:0}
  .so-ic svg{width:20px;height:20px}

  /* header and product bar */
  .so-hd{position:relative;isolation:isolate}
  .so-hd-bg{position:absolute;inset:0;z-index:-1;overflow:hidden;background:radial-gradient(40% 50% at 88% 14%,rgba(253,214,140,.42),rgba(253,214,140,0) 70%),linear-gradient(180deg,${PAPER} 0%,#fff 100%)}
  .so-hd-bg::after{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(42,27,12,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(42,27,12,.05) 1px,transparent 1px);background-size:88px 88px;-webkit-mask-image:linear-gradient(180deg,#000,transparent 85%);mask-image:linear-gradient(180deg,#000,transparent 85%)}
  .so-hd-top{position:relative;z-index:60}
  .so-hd-body{padding:0 20px}
  .so-hd-in{width:100%;max-width:1240px;margin:0 auto}
  .so-bar{position:relative;z-index:6;padding:0 20px;border-bottom:1px solid ${LINE}}
  .so-bar-in{max-width:1240px;margin:0 auto;display:flex;align-items:center;gap:28px;min-height:56px}
  .so-brand{display:flex;align-items:center;gap:10px;text-decoration:none;color:${DEEP};flex-shrink:0}
  .so-brand img{display:block;height:30px;width:auto}
  .so-menu{display:flex;gap:4px;margin-left:8px}
  .so-menu a{position:relative;padding:9px 16px;border-radius:999px;font-family:var(--font-display),system-ui,sans-serif;font-size:14.5px;font-weight:500;color:${MUTED};text-decoration:none;transition:background .18s ease,color .18s ease}
  .so-menu a:hover{background:rgba(180,83,9,.08);color:${DEEP}}
  .so-menu a.on{color:${DEEP};font-weight:600}
  .so-menu a.on::after{content:"";position:absolute;left:16px;right:16px;bottom:-12px;height:2.5px;border-radius:2px;background:${PRIMARY}}

  /* closing band: inset panel */
  .so-close{padding:0 20px 104px;background:#fff}
  .so-close-in{position:relative;overflow:hidden;max-width:1240px;margin:0 auto;border-radius:40px;padding:128px 40px;text-align:center;background:radial-gradient(45% 60% at 90% 0%,rgba(253,214,140,.5),rgba(253,214,140,0) 70%),${BAND}}
  .so-close-c{position:relative;z-index:1;max-width:1040px;margin:0 auto;display:flex;flex-direction:column;align-items:center}
  .so-close-c .so-h2{font-size:44px}
  .so-close-c .so-lead{margin-left:auto;margin-right:auto;font-size:19px;max-width:none;white-space:nowrap}
  .so-close-c .so-ctas{justify-content:center}
  .so-cs{position:absolute;pointer-events:none;z-index:0}
  .so-cs.ring{bottom:-180px;left:-100px;width:400px;height:400px;border-radius:50%;border:1.5px solid ${PRIMARY};opacity:.2}
  .so-cs.dots{top:48px;right:10%;width:96px;height:72px;background-image:radial-gradient(${PRIMARY} 1.4px,transparent 1.6px);background-size:16px 16px;opacity:.3}
  .so-cs.sun{bottom:56px;right:16%;width:64px;height:64px;border-radius:50%;background:${SAND};opacity:.7}

  .hs-rv{opacity:0;transform:translateY(24px);transition:opacity .7s cubic-bezier(.2,.7,.2,1),transform .7s cubic-bezier(.2,.7,.2,1);transition-delay:var(--hs-d,0ms)}
  .hs-rv.hs-in{opacity:1;transform:none}
  @media (prefers-reduced-motion:reduce){.hs-rv{transition:none;opacity:1;transform:none}}
  @media (max-width:860px){
    .so-h2{font-size:29px}
    .so-band .so-in{border-radius:28px;padding:56px 22px}
    .so-sec{padding-top:68px;padding-bottom:68px}
    .so-head{margin-bottom:36px}
    .so-bar-in{gap:14px;min-height:52px}
    .so-close-c .so-lead{white-space:normal;max-width:62ch}
    .so-close{padding:0 12px 64px}.so-close-in{border-radius:28px;padding:72px 18px}.so-close-c .so-h2{font-size:30px}.so-cs.dots{display:none}
  }
`;
