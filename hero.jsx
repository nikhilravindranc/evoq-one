/* global React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakToggle, TweakSelect */

const { useEffect, useState, useRef } = React;

/* ---------- assets ---------- */

// Stock placeholder portraits — user can swap later
const PHOTOS = {
  sales: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&facepad=2.4&w=600&h=600&q=80",
  service: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2.6&w=600&h=600&q=80",
  operations: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=facearea&facepad=2.4&w=600&h=600&q=80",
  support: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=facearea&facepad=2.6&w=600&h=600&q=80",
  extra1: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2.6&w=400&h=400&q=80",
  extra2: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2.6&w=400&h=400&q=80",
  extra3: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2.6&w=400&h=400&q=80"
};

/* ---------- bits ---------- */

const ArrowRight = ({ size = 14, color = "currentColor" }) =>
<svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;


const Chevron = ({ size = 12 }) =>
<svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M3 4.5 6 7.5l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;


/* The EVOQ wordmark — three-bar sigma E + VOQ */
const EvoqMark = ({ height = 22, color = "currentColor" }) =>
<svg height={height} viewBox="0 0 132 30" fill="none" aria-label="EVOQ" role="img">
    <rect x="0" y="2" width="22" height="3.6" fill={color} />
    <rect x="0" y="13.2" width="22" height="3.6" fill={color} />
    <rect x="0" y="24.4" width="22" height="3.6" fill={color} />
    <path d="M28 2 L38 28 L48 2" stroke={color} strokeWidth="3.6" strokeLinejoin="miter" fill="none" />
    <circle cx="63" cy="15" r="11.5" stroke={color} strokeWidth="3.6" fill="none" />
    <circle cx="92" cy="15" r="11.5" stroke={color} strokeWidth="3.6" fill="none" />
    <path d="M97 22 L106 30" stroke={color} strokeWidth="3.6" strokeLinecap="round" />
  </svg>;


/* The center logo squircle — three thick black bars matching the EVOQ "E" */
const EvoqMonogram = ({ color = "#1F2430" }) =>
<svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden="true">
    <rect x="8" y="16" width="84" height="14" rx="2" fill={color} />
    <rect x="8" y="43" width="84" height="14" rx="2" fill={color} />
    <rect x="8" y="70" width="84" height="14" rx="2" fill={color} />
  </svg>;


const Dot = ({ color = "#1F2430", size = 8 }) =>
<span style={{
  display: "inline-block",
  width: size, height: size, borderRadius: "50%",
  background: color, flexShrink: 0
}} />;


/* ---------- topbar with products dropdown ---------- */

const PRODUCTS = [
{ name: "CRM", sub: "Sales & customer relationships" },
{ name: "Sync", sub: "Unify data across systems" },
{ name: "Skillberry", sub: "Learning & talent development" },
{ name: "Projects", sub: "Plan and run work end-to-end" },
{ name: "ServiceOps", sub: "Field service & operations" }];


function Topbar({ darkCTA }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    const onEsc = (e) => {if (e.key === "Escape") setOpen(false);};
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  return (
    <header className="topbar">
      <div className="brand"><EvoqMark height={22} color="#fff" /></div>

      <nav className="nav-pill" aria-label="Primary">
        <div className="nav-products" ref={wrapRef}>
          <button
            type="button"
            className={`nav-item ${open ? "active" : ""}`}
            aria-expanded={open}
            aria-haspopup="menu"
            onClick={() => setOpen((o) => !o)}>
            
            {open && <span className="indicator" />}
            <span>Products</span>
            <span className={`chev ${open ? "open" : ""}`}><Chevron /></span>
          </button>

          {open &&
          <div className="products-menu" role="menu">
              <div className="products-menu-eyebrow">EVOQ Suite</div>
              <ul>
                {PRODUCTS.map((p) =>
              <li key={p.name} role="menuitem">
                    <a href="#" className="product-row">
                      <span className="product-mark"><EvoqMonogram color="#000099" /></span>
                      <span className="product-text">
                        <span className="product-name">{p.name}</span>
                        <span className="product-sub">{p.sub}</span>
                      </span>
                      <span className="product-arrow"><ArrowRight size={12} /></span>
                    </a>
                  </li>
              )}
              </ul>
            </div>
          }
        </div>

        <a className="nav-item" href="#">Why EVOQ?</a>
        <a className="nav-item" href="#">Customers</a>
        <a className="nav-item" href="#">Resources</a>
      </nav>

      <button className={darkCTA ? "cta-dark" : "cta-light"}>
        <span>Contact Us</span>
        <span className="cta-icon"><ArrowRight color="currentColor" /></span>
      </button>
    </header>);

}

/* ---------- the hero ---------- */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "tileShape": "squircle",
  "gradientPreset": "twilight",
  "showLabels": true,
  "ctaStyle": "dark",
  "accentColor": "#BDBDFF",
  "showConnections": true,
  "showPulses": true
} /*EDITMODE-END*/;

const GRADIENT_PRESETS = {
  twilight: {
    label: "Twilight",
    css: `
      radial-gradient(120% 80% at 60% 0%,   #BDBDFF 0%,  #8484FF 22%, #5C5CFF 48%, #3333CC 72%, #000099 100%),
      radial-gradient(60%  50% at 20% 35%,  rgba(242,242,255,0.55) 0%, rgba(242,242,255,0) 60%)
    `
  },
  dawn: {
    label: "Dawn",
    css: `
      radial-gradient(110% 75% at 70% 10%,  #F2F2FF 0%,  #BDBDFF 18%, #8484FF 42%, #5C5CFF 70%, #3333CC 100%),
      radial-gradient(45% 40% at 25% 55%,   rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)
    `
  },
  midnight: {
    label: "Midnight",
    css: `
      radial-gradient(120% 80% at 50% -10%, #8484FF 0%, #5C5CFF 28%, #3333CC 60%, #000099 100%),
      radial-gradient(50% 50% at 30% 40%,   rgba(189,189,255,0.35) 0%, rgba(189,189,255,0) 65%)
    `
  },
  soft: {
    label: "Soft",
    css: `
      radial-gradient(100% 70% at 50% 0%,   #F2F2FF 0%,  #BDBDFF 35%, #8484FF 70%, #5C5CFF 100%)
    `
  }
};

/* ---------- collage geometry ----------
   Right column is ~580 wide × ~720 tall.
   Sizes and positions modeled on the Grevy reference — small/medium
   squircles loosely arranged around a slightly larger center brand mark. */
const TILES = [
// top arc
{ key: "sales", x: 82, y: 10, size: 178, photo: "sales", label: { name: "Sales", sub: "Drive revenue growth", dot: "#5C5CFF" } },
{ key: "extra1", x: 320, y: 44, size: 92, photo: "extra1" },
{ key: "extra2", x: 440, y: 120, size: 74, photo: "extra2" },
// middle row
{ key: "operations", x: 0, y: 210, size: 162, photo: "operations", label: { name: "Operations", sub: "Streamline processes", dot: "#5C5CFF" } },
// center logo
{ key: "logo", x: 198, y: 200, size: 196, isLogo: true },
{ key: "service", x: 412, y: 232, size: 152, photo: "service", label: { name: "Service", sub: "Deliver exceptional service", dot: "#5C5CFF" } },
// bottom row
{ key: "extra3", x: 60, y: 426, size: 86, photo: "extra3" },
{ key: "support", x: 188, y: 416, size: 164, photo: "support", label: { name: "Support", sub: "Enable your team", dot: "#5C5CFF" } }];


/* Connecting lines: logo center → each product tile center.
   Drawn behind tiles so endpoints appear to enter the squircles naturally. */
const tileCenter = (key) => {
  const t = TILES.find((t) => t.key === key);
  return { x: t.x + t.size / 2, y: t.y + t.size / 2 };
};
const LOGO_C = tileCenter("logo");
const CONNECTIONS = ["sales", "operations", "service", "support"].map((key, i) => {
  const c = tileCenter(key);
  return { key, x1: LOGO_C.x, y1: LOGO_C.y, x2: c.x, y2: c.y, delay: i * 0.7 };
});

function Hero() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const gradient = (GRADIENT_PRESETS[t.gradientPreset] || GRADIENT_PRESETS.twilight).css;
  const tileRadius =
  t.tileShape === "circle" ? "50%" :
  t.tileShape === "rounded" ? "20px" :
  "30%";

  const darkCTA = t.ctaStyle === "dark";

  return (
    <>
      <style>{`
        .hero {
          position: relative;
          width: 1328px;
          height: 840px;
          color: #fff;
          font-family: var(--sans);
          overflow: hidden;
          isolation: isolate;
        }
        .hero .bg {
          position: absolute; inset: 0;
          background: ${gradient};
          background-blend-mode: screen, normal;
        }
        .hero .grain {
          position: absolute; inset: 0;
          pointer-events: none;
          mix-blend-mode: overlay;
          opacity: .35;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.7 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
        }
        .hero .vignette {
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(120% 80% at 50% 110%, rgba(0, 0, 153, 0.75) 0%, rgba(0, 0, 153, 0) 55%);
        }

        /* topbar */
        .topbar {
          position: relative; z-index: 3;
          display: flex; align-items: center; justify-content: space-between;
          padding: 28px 80px;
        }
        .brand { color: #fff; display: inline-flex; align-items: center; gap: 10px; }

        .nav-pill {
          display: inline-flex; align-items: center; gap: 4px;
          padding: 6px;
          background: rgba(255,255,255,0.14);
          border: 1px solid rgba(255,255,255,0.22);
          backdrop-filter: blur(18px) saturate(140%);
          -webkit-backdrop-filter: blur(18px) saturate(140%);
          border-radius: 999px;
          font-family: var(--sans);
          font-size: 14px; font-weight: 500;
          color: rgba(255,255,255,0.92);
        }
        .nav-item {
          padding: 9px 16px; border-radius: 999px; cursor: pointer;
          display: inline-flex; align-items: center; gap: 6px;
          color: rgba(255,255,255,0.88);
          background: transparent; border: 0;
          font: inherit;
          text-decoration: none;
          transition: background .15s ease, color .15s ease;
        }
        .nav-item:hover { color: #fff; background: rgba(255,255,255,0.08); }
        .nav-item.active {
          background: #4747E0; color: #fff;
          box-shadow: 0 4px 14px -4px rgba(0, 0, 153, 0.5);
        }
        .nav-item .indicator { width: 6px; height: 6px; border-radius: 50%; background: #BDBDFF; }
        .nav-item .chev { display: inline-flex; transition: transform .2s ease; }
        .nav-item .chev.open { transform: rotate(180deg); }

        /* products dropdown */
        .nav-products { position: relative; }
        .products-menu {
          position: absolute;
          top: calc(100% + 14px);
          left: 50%;
          width: 340px;
          padding: 14px;
          background: rgba(255,255,255,0.96);
          color: #1F2430;
          border-radius: 22px;
          box-shadow:
            0 30px 60px -20px rgba(31, 36, 48,0.45),
            0 2px 6px rgba(31, 36, 48,0.08),
            inset 0 0 0 1px rgba(31, 36, 48,0.04);
          z-index: 50;
          opacity: 1;
          transform: translateX(-50%);
        }
        .products-menu::before {
          content: "";
          position: absolute;
          top: -7px; left: 50%;
          transform: translateX(-50%) rotate(45deg);
          width: 14px; height: 14px;
          background: rgba(255,255,255,0.96);
          border-radius: 3px;
          box-shadow: -1px -1px 0 rgba(31, 36, 48,0.04);
        }
        @keyframes menuIn {
          from { opacity: 0; transform: translate(-50%, -6px); }
          to   { opacity: 1; transform: translate(-50%, 0); }
        }
        .products-menu-eyebrow {
          font-family: var(--sans);
          font-size: 11px; font-weight: 600;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: #5F6B7A;
          padding: 6px 10px 10px;
        }
        .products-menu ul {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-direction: column; gap: 2px;
        }
        .product-row {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 10px;
          border-radius: 12px;
          text-decoration: none;
          color: #1F2430;
          transition: background .15s ease;
        }
        .product-row:hover { background: #F2F2FF; }
        .product-mark {
          width: 34px; height: 34px;
          border-radius: 9px;
          background: #F2F2FF;
          display: flex; align-items: center; justify-content: center;
          padding: 6px;
          flex-shrink: 0;
        }
        .product-mark svg { width: 100%; height: 100%; display: block; }
        .product-text { display: flex; flex-direction: column; line-height: 1.25; flex: 1; }
        .product-name { font-family: var(--sans); font-size: 14px; font-weight: 600; color: #1F2430; }
        .product-sub  { font-family: var(--sans); font-size: 12px; font-weight: 400; color: #5F6B7A; margin-top: 1px; }
        .product-arrow {
          width: 22px; height: 22px;
          border-radius: 50%;
          background: #4747E0;
          color: #fff;
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transform: translateX(-4px);
          transition: opacity .15s ease, transform .15s ease;
        }
        .product-row:hover .product-arrow { opacity: 1; transform: translateX(0); }

        .cta-dark, .cta-light {
          display: inline-flex; align-items: center; gap: 12px;
          padding: 12px 14px 12px 22px;
          border-radius: 999px;
          font-family: var(--sans);
          font-size: 14px; font-weight: 600;
          text-decoration: none;
          cursor: pointer; border: 0;
          transition: transform .15s ease, box-shadow .15s ease, background .15s ease;
        }
        .cta-dark {
          background: #4747E0; color: #fff;
          box-shadow: 0 10px 30px -10px rgba(0, 0, 153, 0.55), inset 0 0 0 1px rgba(255,255,255,0.08);
        }
        .cta-dark:hover { background: #3333CC; }
        .cta-light {
          background: #fff; color: #4747E0;
          box-shadow: 0 10px 30px -12px rgba(31, 36, 48, 0.4);
        }
        .cta-light:hover { transform: translateY(-1px); }
        .cta-dark:hover { transform: translateY(-1px); }
        .cta-icon {
          width: 28px; height: 28px; border-radius: 50%;
          display: inline-flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.18);
        }
        .cta-light .cta-icon { background: #4747E0; color: #fff; }

        /* content layout */
        .stage {
          position: relative; z-index: 2;
          display: grid;
          grid-template-columns: 1.05fr 1fr;
          align-items: stretch;
          padding: 0 80px 48px;
          gap: 32px;
          height: calc(100% - 92px);
        }

        /* left column */
        .left { display: flex; flex-direction: column; justify-content: center; padding: 28px 24px 0 0; }
        .kicker {
          display: inline-flex; align-items: center;
          gap: 14px;
          font-family: var(--display);
          font-weight: 600;
          font-size: 12px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--tint);
          margin-bottom: 28px;
          align-self: flex-start;
        }
        .kicker::before {
          content: "";
          width: 36px;
          height: 1px;
          background: var(--tint);
          opacity: .8;
        }
        .headline {
          font-family: var(--display);
          font-weight: 700;
          font-size: 48px;
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: #fff;
          margin: 0;
        }
        .headline .accent {
          color: ${t.accentColor};
          font-weight: 700;
        }
        .tagline {
          margin-top: 26px;
          font-family: var(--sans);
          font-style: italic;
          font-size: 18px; font-weight: 500;
          color: rgba(255,255,255,0.85);
        }
        .body-copy {
          margin-top: 20px;
          max-width: 52ch;
          font-family: var(--sans);
          font-size: 15.5px; line-height: 1.55;
          color: rgba(255,255,255,0.75);
        }
        .cta-row { display: flex; gap: 14px; align-items: center; margin-top: 40px; }
        .hairline {
          margin-top: 28px;
          height: 1px; width: 100%;
          background: linear-gradient(to right, rgba(255,255,255,0.45), rgba(255,255,255,0));
        }

        /* right column — photo collage (absolute positioned in a 580×720 box) */
        .collage {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 720px;
          transform: scale(0.92);
          transform-origin: top left;
        }
        .connections {
          position: absolute;
          top: 0; left: 0;
          width: 580px; height: 720px;
          pointer-events: none;
          z-index: 0;
          overflow: visible;
        }
        .tile {
          position: absolute;
          border-radius: ${tileRadius};
          background-size: cover; background-position: center 25%;
          z-index: 1;
          box-shadow:
            0 22px 40px -22px rgba(31, 36, 48, 0.55),
            inset 0 0 0 1px rgba(255,255,255,0.22);
        }
        .tile .photo {
          position: absolute; inset: 0;
          border-radius: inherit;
          overflow: hidden;
          background-size: cover; background-position: center 25%;
          background-image: inherit;
        }
        .tile .photo::after {
          content: ""; position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(31, 36, 48,0) 65%, rgba(31, 36, 48,0.28) 100%);
          pointer-events: none;
        }
        .tile.logo {
          background: #F2F2FF;
          display: flex; align-items: center; justify-content: center;
          padding: 30px;
          overflow: hidden;
          box-shadow:
            0 30px 60px -22px rgba(31, 36, 48,0.55),
            inset 0 0 0 1px rgba(255,255,255,0.7);
        }
        .tile.logo svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        /* product label chip */
        .chip {
          position: absolute;
          left: 50%;
          bottom: -12px;
          transform: translateX(-50%);
          display: inline-flex; align-items: center; gap: 8px;
          padding: 7px 12px 7px 10px;
          background: #ffffff;
          color: #1F2430;
          border-radius: 12px;
          font-family: var(--sans);
          font-size: 12px; font-weight: 600;
          white-space: nowrap;
          box-shadow: 0 10px 24px -10px rgba(31, 36, 48,0.45), inset 0 0 0 1px rgba(31, 36, 48,0.04);
          z-index: 2;
        }
        .chip .label { display: flex; flex-direction: column; line-height: 1.18; }
        .chip .label small { font-weight: 500; color: #5F6B7A; font-size: 10.5px; letter-spacing: .005em; }

        /* small grid-dot decoration like the EVOQ original */
        .grid-dots {
          position: absolute;
          width: 64px; height: 64px;
          background-image: radial-gradient(rgba(255,255,255,0.55) 1.2px, transparent 1.4px);
          background-size: 10px 10px;
          opacity: .55;
          pointer-events: none;
        }
      `}</style>

      <div className="hero-frame">
        <div className="hero" data-screen-label="01 Hero">
          <div className="bg" />
          <div className="grain" />
          <div className="vignette" />

          {/* TOP BAR */}
          <Topbar darkCTA={darkCTA} />

          {/* CONTENT */}
          <div className="stage">
            {/* LEFT */}
            <section className="left">
              <div>
                <h1 className="headline">
                  Every team.<br />
                  Every workflow.<br />
                  <span className="accent">Finally connected.</span>
                </h1>

                <p className="body-copy">
                  Your sales, service, operations, and support teams share one workspace.
                  Data flows between them automatically. Handoffs never get missed.
                </p>
              </div>

              <div>
                <div className="cta-row">
                  <button className="cta-dark">
                    <span>Get Started</span>
                    <span className="cta-icon"><ArrowRight color="#fff" /></span>
                  </button>
                </div>
                <div className="hairline" />
              </div>
            </section>

            {/* RIGHT — collage */}
            <section className="collage" aria-hidden="false">
              {/* connecting lines — logo center to each product tile */}
              {t.showConnections &&
              <svg className="connections" width="580" height="720" viewBox="0 0 580 720" aria-hidden="true">
                  <defs>
                    <radialGradient id="lineFade" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#BDBDFF" stopOpacity="0.0" />
                      <stop offset="35%" stopColor="#BDBDFF" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#BDBDFF" stopOpacity="0.0" />
                    </radialGradient>
                  </defs>
                  {CONNECTIONS.map((c) =>
                <g key={c.key}>
                      <line
                    x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
                    stroke="#BDBDFF" strokeOpacity="0.55"
                    strokeWidth="1.5"
                    strokeDasharray="4 6"
                    strokeLinecap="round" />
                  
                      {t.showPulses &&
                  <circle r="3.5" fill="#F2F2FF">
                          <animate
                      attributeName="opacity"
                      values="0;1;1;0"
                      keyTimes="0;0.1;0.9;1"
                      dur="2.4s"
                      begin={`${c.delay}s`}
                      repeatCount="indefinite" />
                    
                          <animateMotion
                      dur="2.4s"
                      begin={`${c.delay}s`}
                      repeatCount="indefinite"
                      path={`M${c.x1},${c.y1} L${c.x2},${c.y2}`} />
                    
                        </circle>
                  }
                    </g>
                )}
                </svg>
              }

              {/* decorative grid-dot accents */}
              <div className="grid-dots" style={{ top: 4, left: 280 }} />
              <div className="grid-dots" style={{ top: 360, right: -10 }} />

              {TILES.map((tile) => {
                const style = {
                  left: tile.x, top: tile.y,
                  width: tile.size, height: tile.size
                };
                if (tile.isLogo) {
                  return (
                    <div key={tile.key} className="tile logo" style={style}>
                      <EvoqMonogram color="#000099" />
                    </div>);

                }
                style.backgroundImage = `url(${PHOTOS[tile.photo]})`;
                return (
                  <div key={tile.key} className="tile" style={style}>
                    <div className="photo" style={{ backgroundImage: `url(${PHOTOS[tile.photo]})` }} />
                    {t.showLabels && tile.label &&
                    <div className="chip">
                        <Dot color={tile.label.dot} size={8} />
                        <span className="label">
                          {tile.label.name}
                          <small>{tile.label.sub}</small>
                        </span>
                      </div>
                    }
                  </div>);

              })}
            </section>
          </div>
        </div>
      </div>

      <TweaksPanel>
        <TweakSection label="Background">
          <TweakSelect
            label="Gradient"
            value={t.gradientPreset}
            options={Object.entries(GRADIENT_PRESETS).map(([k, v]) => ({ value: k, label: v.label }))}
            onChange={(v) => setTweak("gradientPreset", v)} />
          
        </TweakSection>

        <TweakSection label="Headline accent">
          <TweakColor
            label="Color"
            value={t.accentColor}
            options={["#BDBDFF", "#8484FF", "#F2F2FF", "#5C5CFF"]}
            onChange={(v) => setTweak("accentColor", v)} />
          
        </TweakSection>

        <TweakSection label="Photo tiles">
          <TweakRadio
            label="Shape"
            value={t.tileShape}
            options={[
            { value: "squircle", label: "Squircle" },
            { value: "rounded", label: "Rounded" },
            { value: "circle", label: "Circle" }]
            }
            onChange={(v) => setTweak("tileShape", v)} />
          
          <TweakToggle
            label="Show product labels"
            value={t.showLabels}
            onChange={(v) => setTweak("showLabels", v)} />
          
        </TweakSection>

        <TweakSection label="Connections">
          <TweakToggle
            label="Lines to products"
            value={t.showConnections}
            onChange={(v) => setTweak("showConnections", v)} />
          
          <TweakToggle
            label="Data flow pulses"
            value={t.showPulses}
            onChange={(v) => setTweak("showPulses", v)} />
          
        </TweakSection>

        <TweakSection label="Top CTA">
          <TweakRadio
            label="Color"
            value={t.ctaStyle}
            options={[
            { value: "dark", label: "Dark" },
            { value: "light", label: "Light" }]
            }
            onChange={(v) => setTweak("ctaStyle", v)} />
          
        </TweakSection>
      </TweaksPanel>
    </>);

}

ReactDOM.createRoot(document.getElementById("hero-mount")).render(<Hero />);