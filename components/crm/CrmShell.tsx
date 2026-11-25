"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Topbar } from "@/components/hero/Topbar";
import { Footer } from "@/components/sections/Footer";
import { GetStartedModal } from "@/components/shared/GetStartedModal";
import { track } from "@/lib/track";
import { BLUE, BLUE_DEEP, BLUE_HOVER, BODY, HERO_GRADIENT, INK, LINE, PAGE } from "./palette";

/* The CRM product bar of the live microsite: the CRM logo, Features and Pricing, on a pale blue strip. */
function ProductBar({ pinned = false, active }: { pinned?: boolean; active: "home" | "features" | "pricing" }) {
  return (
    <div className={pinned ? "cv-bar cv-bar-fx" : "cv-bar"}>
      <div className="cv-bar-in">
        <Link href="/products/crm" className="cv-bar-logo" aria-label="EVOQ CRM overview" tabIndex={pinned ? -1 : undefined}><img src="/site/images/logo-crm-1.png" alt="CRM" width={84} height={34} /></Link>
        <nav aria-label="CRM" className="cv-bar-nav">
          <Link href="/products/crm/features" aria-current={active === "features" ? "page" : undefined} className={active === "features" ? "cur" : undefined} tabIndex={pinned ? -1 : undefined}>Features</Link>
          <Link href="/products/crm/pricing" aria-current={active === "pricing" ? "page" : undefined} className={active === "pricing" ? "cur" : undefined} tabIndex={pinned ? -1 : undefined}>Pricing</Link>
        </nav>
      </div>
    </div>
  );
}


/* Shell for the CRM page: a grey page, a rounded off white card that holds the header and the hero, the demo form and the footer. */

const DemoCtx = createContext<(location: string, title?: string) => void>(() => {});
export const useCrmDemo = () => useContext(DemoCtx);

export function CrmShell({ hero, children, active = "home" }: { hero: ReactNode; children?: ReactNode; active?: "home" | "features" | "pricing" }) {
  const [from, setFrom] = useState<{ loc: string; title: string } | null>(null);
  const open = useCallback((location: string, title = "Book a demo") => {
    track("click_demo_cta", { location, page: "crm" });
    setFrom({ loc: location, title });
  }, []);
  useEffect(() => { track("view_crm", { page: "crm" }); }, []);
  const bar = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  useEffect(() => {
    const el = bar.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setPinned(!e.isIntersecting && e.boundingClientRect.bottom < 0), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <DemoCtx.Provider value={open}>
      <div className="cv-root">
        <style>{css}</style>
        <div className="cv-page">
          <div className="cv-card">
            <header className="cv-top">
              <Topbar light darkCTA={false} theme={{ navBg: "rgba(255,255,255,.72)", navFg: INK, ctaBg: INK, ctaFg: "#FFFFFF", loginFg: INK }} />
            </header>
            <div ref={bar}><ProductBar active={active} /></div>
            {hero}
          </div>
        </div>
        <div className={`cv-pin${pinned ? " on" : ""}`}><ProductBar pinned active={active} /></div>
        <main>{children}</main>
        <Footer background={BLUE_DEEP} />
        <GetStartedModal isOpen={from !== null} onClose={() => setFrom(null)} title={from?.title ?? "Book a demo"} source={`crm_${from?.loc ?? "demo"}`} />
      </div>
    </DemoCtx.Provider>
  );
}

const css = `
  .cv-root{background:#fff;color:${BODY};font-family:var(--font-sans),system-ui,sans-serif;font-size:16px;line-height:1.6;min-height:100vh;overflow-x:clip}
  .cv-root h1,.cv-root h2,.cv-root h3,.cv-root h4{font-family:var(--font-display),system-ui,sans-serif;color:${INK};margin:0}
  /* The site heading scale (app/globals.css): H1 48, H2 38, H3 24, H4 18, with the phone steps. */
  .cv-root h1{font-size:var(--h1-size);line-height:1.08}
  .cv-root h2{font-size:var(--h2-size);line-height:1.12}
  .cv-root h3{font-size:var(--h3-size);line-height:1.2}
  .cv-root h4{font-size:var(--h4-size);line-height:1.3}
  .cv-root p{text-wrap:pretty;margin:0}
  .cv-page{background:${PAGE};padding:12px}
  .cv-card{max-width:1440px;margin:0 auto;background:${HERO_GRADIENT};border-radius:24px;border:1px solid ${LINE};overflow:hidden}
  .cv-top{position:relative;z-index:30}
  .cv-root section[id]{scroll-margin-top:76px}
  .cv-bar{background:#EFF6FF;border-top:1px solid rgba(15,23,42,.08);border-bottom:1px solid rgba(15,23,42,.08)}
  .cv-card .cv-bar{background:transparent;border-top-color:rgba(29,78,216,.1);border-bottom-color:rgba(29,78,216,.1)}
  .cv-bar-in{max-width:1232px;margin:0 auto;padding:0 16px;height:65px;display:flex;align-items:center;gap:50px}
  .cv-bar-logo{display:inline-flex;align-items:center}
  .cv-bar-logo img{display:block;height:34px;width:auto}
  .cv-bar-nav{display:flex;align-items:center;gap:26px}
  .cv-bar-nav a,.cv-bar-nav button{font-family:var(--font-sans),system-ui,sans-serif;font-size:15px;font-weight:500;line-height:1.2;color:#1F2937;background:none;border:0;padding:8px 0;cursor:pointer;text-decoration:none;transition:color .18s ease}
  .cv-bar-nav a:hover,.cv-bar-nav button:hover,.cv-bar-nav a.cur{color:${BLUE}}
  .cv-bar-nav a:focus-visible,.cv-bar-nav button:focus-visible,.cv-bar-logo:focus-visible{outline:3px solid ${BLUE};outline-offset:3px;border-radius:6px}
  .cv-pin{position:fixed;top:0;left:0;right:0;z-index:45;transform:translateY(-100%);visibility:hidden;transition:transform .3s ease,visibility 0s .3s;box-shadow:0 10px 28px -18px rgba(15,27,61,.45)}
  .cv-pin.on{transform:none;visibility:visible;transition:transform .3s ease}
  .cv-pin .cv-bar{border-top:0}
  .cv-shot{display:block;max-width:100%;height:auto;background:#fff}
  .cv-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:48px;padding:0 26px;border-radius:999px;font-family:var(--font-display),system-ui,sans-serif;font-size:15px;font-weight:600;text-decoration:none;cursor:pointer;border:1.5px solid transparent;transition:background .18s ease,border-color .18s ease,transform .12s ease;white-space:nowrap}
  .cv-btn.primary{background:${BLUE};border-color:${BLUE};color:#fff;box-shadow:0 12px 24px -12px rgba(29,78,216,.5)}
  .cv-btn.primary:hover{background:${BLUE_HOVER};border-color:${BLUE_HOVER};box-shadow:0 16px 30px -12px rgba(29,78,216,.55)}
  .cv-btn.ghost{background:#fff;color:${BLUE};border-color:${BLUE}}
  .cv-btn.ghost:hover{background:${BLUE_HOVER};border-color:${BLUE_HOVER};color:#fff}
  .cv-btn:active{transform:translateY(1px)}
  .cv-btn:focus-visible{outline:3px solid ${BLUE};outline-offset:3px}
  @media (min-width:640px){.cv-page{padding:16px}.cv-card{border-radius:32px}}
`;
