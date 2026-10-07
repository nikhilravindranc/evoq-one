"use client";

import { useEffect, useState, type CSSProperties } from "react";

const G = "#1F2933";
const SL = "#64748B";
const CG = "#CBD5E1";
const PG = "#F1F5F9";
const BL = "#2563EB";

const SEGMENTS = ["Industrial manufacturing", "Equipment manufacturers", "Furniture & modular products", "Building products", "Medical devices", "Other configurable products"];

const input: CSSProperties = { width: "100%", boxSizing: "border-box", padding: "11px 13px", borderRadius: 9, border: `1px solid ${CG}`, fontFamily: "inherit", fontSize: 14, color: G, background: "#fff", outline: "none" };
const label: CSSProperties = { display: "block", fontSize: 11, fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase", color: SL, marginBottom: 7 };

/* Opens from any element carrying data-enquiry, so the server-rendered page needs no client wiring. */
export function EnquiryModal() {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("[data-enquiry]");
      if (!el) return;
      e.preventDefault();
      setDone(false);
      setOpen(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;
  return (
    <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(15,23,42,.55)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div role="dialog" aria-modal="true" aria-label="Connect with an expert" onClick={(e) => e.stopPropagation()} style={{ position: "relative", width: "100%", maxWidth: 540, maxHeight: "92vh", overflowY: "auto", background: "#fff", borderRadius: 16, boxShadow: "0 40px 80px -20px rgba(15,23,42,.5)", padding: "30px 32px 26px", fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
        <button type="button" aria-label="Close" onClick={() => setOpen(false)} style={{ position: "absolute", top: 18, right: 18, width: 34, height: 34, borderRadius: 9, border: `1px solid ${CG}`, background: "#fff", color: SL, fontSize: 18, cursor: "pointer" }}>×</button>
        {done ? (
          <div style={{ padding: "36px 8px 18px", textAlign: "center" }}>
            <div style={{ width: 54, height: 54, borderRadius: "50%", background: BL, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, margin: "0 auto 18px" }}>✓</div>
            <h2 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 700, color: G }}>Thanks, we have your enquiry</h2>
            <p style={{ margin: 0, fontSize: 14.5, color: SL, lineHeight: 1.6 }}>A manufacturing specialist from EVOQ will get in touch shortly to understand your operation.</p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
            <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: BL, marginBottom: 6 }}>EVOQ Manufacturing</div>
            <h2 style={{ margin: "0 0 6px", fontSize: 25, fontWeight: 700, color: G, letterSpacing: "-.01em" }}>Connect with an expert</h2>
            <p style={{ margin: 0, fontSize: 14, color: SL, lineHeight: 1.55 }}>Tell us about your products and operation. We will show how EVOQ fits.</p>
            <div style={{ height: 1, background: PG, margin: "20px 0" }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <div><label style={label}>Name *</label><input required type="text" placeholder="Jane Smith" style={input} /></div>
              <div><label style={label}>Company *</label><input required type="text" placeholder="Acme Industries" style={input} /></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <div><label style={label}>Work email *</label><input required type="email" placeholder="jane@company.com" style={input} /></div>
              <div><label style={label}>Phone</label><input type="tel" placeholder="+91 98765 43210" style={input} /></div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={label}>What do you manufacture?</label>
              <select defaultValue="" style={{ ...input, cursor: "pointer" }}>
                <option value="" disabled>Select a segment</option>
                {SEGMENTS.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={label}>How can we help?</label>
              <textarea rows={3} placeholder="Configurable products, quoting, delivery, service..." style={{ ...input, resize: "vertical" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 20 }}>
              <button type="button" onClick={() => setOpen(false)} style={{ padding: "11px 20px", borderRadius: 9, border: `1px solid ${CG}`, background: "#fff", color: G, fontFamily: "inherit", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
              <button type="submit" style={{ padding: "11px 22px", borderRadius: 9, border: 0, background: G, color: "#fff", fontFamily: "inherit", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Send enquiry</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
