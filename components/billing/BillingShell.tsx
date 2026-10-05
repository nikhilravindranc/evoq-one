import { Topbar } from "@/components/hero/Topbar";
import { Footer } from "@/components/sections/Footer";
import { BillingBehavior } from "./BillingBehavior";

/* Brand variables the Billing pages' utility classes read (copied from the static pages' wrapper). */
const THEME = {
  "--color-primary": "#1a5d4a",
  "--color-secondary": "#0e342c",
  "--color-accent": "#00ab88",
  "--color-surface": "#eef1ef",
  "--color-ink": "#1c2033",
  "--color-muted": "#6a7087",
  "--color-primary-rgb": "26 93 74",
  "--color-secondary-rgb": "14 52 44",
  "--color-accent-rgb": "0 171 136",
  "--color-surface-rgb": "238 241 239",
  "--color-ink-rgb": "28 32 51",
  "--color-muted-rgb": "106 112 135",
  "--radius-brand": "1.25rem",
  "--shadow-soft": "0 16px 40px rgba(21, 30, 55, 0.08)",
} as React.CSSProperties;

export function BillingShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* hide-until-revealed styles apply only when JavaScript is running */}
      <script dangerouslySetInnerHTML={{ __html: 'document.documentElement.classList.add("js")' }} />
      <div style={{ background: "#eef1ef", position: "relative", zIndex: 60, borderBottom: "1px solid rgba(16,42,67,0.08)" }}>
        <Topbar darkCTA={false} light ctaColor="#00AB88" />
      </div>
      <div className="billing-scope min-h-screen bg-brand-surface text-brand-ink" style={THEME} data-theme="main">
        {children}
      </div>
      <Footer background="#d8ebe7" darkText />
      <BillingBehavior />
    </>
  );
}
