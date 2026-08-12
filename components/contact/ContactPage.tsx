"use client";

import { useState } from "react";
import { motion } from "framer-motion";

/* ── shared animation helpers ── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

export function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    countryCode: "+91",
    phone: "",
    companyName: "",
    product: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ fullName: "", workEmail: "", countryCode: "+91", phone: "", companyName: "", product: "", message: "" });
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* shared input style */
  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "11px 14px", fontSize: "15px",
    border: "1px solid var(--border)", borderRadius: "8px",
    background: "var(--white)", color: "var(--text)",
    transition: "border-color 150ms ease",
    fontFamily: "var(--font-sans, 'DM Sans', sans-serif)",
    outline: "none", boxSizing: "border-box",
  };
  const labelStyle: React.CSSProperties = {
    display: "block", fontSize: "13px", fontWeight: 600,
    color: "var(--text)", marginBottom: "8px",
    fontFamily: "var(--font-display, 'Figtree', sans-serif)",
  };

  return (
    <div style={{ fontFamily: "var(--font-sans, 'DM Sans', sans-serif)", background: "var(--white)" }}>

      {/* ── Hero + Form ── */}
      <section
        className="contact-hero-section"
        style={{ background: "var(--white)", borderBottom: "1px solid var(--border)", position: "relative", overflow: "hidden" }}
      >
        {/* Atmospheric blobs */}
        <div style={{ position: "absolute", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(92,92,255,0.08) 0%, transparent 65%)", top: "-250px", right: "-200px", pointerEvents: "none", zIndex: 0 }} />
        <div style={{ position: "absolute", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(5,150,105,0.06) 0%, transparent 70%)", bottom: "-150px", left: "-150px", pointerEvents: "none", zIndex: 0 }} />
        <div style={{ position: "absolute", width: "140px", height: "140px", background: "var(--crm-surface)", borderRadius: "24px", top: "40px", left: "5%", transform: "rotate(15deg)", opacity: 0.7, zIndex: 0 }} />
        <div style={{ position: "absolute", width: "100px", height: "100px", background: "var(--proj-surface)", borderRadius: "50%", bottom: "60px", right: "8%", opacity: 0.7, zIndex: 0 }} />

        <div className="contact-inner" style={{ position: "relative", zIndex: 1 }}>
          <div className="contact-hero-grid">

            {/* Left: Hero content */}
            <div style={{ paddingTop: "40px" }}>
              <motion.div {...fadeUp(0)} style={{ fontFamily: "var(--font-display, 'Figtree', sans-serif)", fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--primary)", marginBottom: "20px" }}>
                Contact Us
              </motion.div>

              <motion.h1 {...fadeUp(0.07)} style={{ fontFamily: "var(--font-display, 'Figtree', sans-serif)", fontSize: "clamp(36px, 4.5vw, 56px)", fontWeight: 800, color: "var(--text)", letterSpacing: "-2px", lineHeight: 1.05, marginBottom: "12px" }}>
                Get the answers<br />you need.
              </motion.h1>

              <motion.p {...fadeUp(0.13)} style={{ fontSize: "15px", color: "var(--primary)", fontStyle: "italic", fontWeight: 400, marginBottom: "24px" }}>
                Move forward faster.
              </motion.p>

              <motion.p {...fadeUp(0.18)} style={{ fontSize: "17px", color: "var(--body-text)", lineHeight: 1.75, fontWeight: 400, marginBottom: "28px", maxWidth: "480px" }}>
                Tell us what you want to do. We connect you to the right team and the next step.
              </motion.p>

              {/* Contact mini-cards */}
              <div className="contact-cards-grid">
                {[
                  { href: "mailto:support@evoq.com", label: "Support", email: "support@evoq.com", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="rgba(92,92,255,0.12)" stroke="var(--primary)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg> },
                  { href: "mailto:sales@evoq.com", label: "Sales", email: "sales@evoq.com", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="var(--primary)" strokeWidth="1.75" strokeLinecap="round"/><circle cx="9" cy="7" r="4" fill="rgba(92,92,255,0.12)" stroke="var(--primary)" strokeWidth="1.75"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="var(--primary)" strokeWidth="1.75" strokeLinecap="round"/></svg> },
                ].map((card, i) => (
                  <motion.a key={card.label} href={card.href} {...fadeUp(0.22 + i * 0.07)}
                    style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 18px", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "10px", color: "var(--text)", textDecoration: "none", fontSize: "15px", fontWeight: 600, fontFamily: "var(--font-display, 'Figtree', sans-serif)", transition: "all 150ms ease" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "var(--white)"; e.currentTarget.style.borderColor = "var(--primary)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "var(--bg)"; e.currentTarget.style.borderColor = "var(--border)"; }}
                  >
                    {card.icon}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "13px", color: "var(--body-text)", fontWeight: 400, marginBottom: "2px" }}>{card.label}</div>
                      <div>{card.email}</div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Address */}
              <motion.div {...fadeUp(0.35)} style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "12px", padding: "20px 24px" }}>
                <h3 style={{ fontFamily: "var(--font-display, 'Figtree', sans-serif)", fontSize: "14px", fontWeight: 700, color: "var(--text)", marginBottom: "16px", letterSpacing: "0.5px" }}>Address</h3>
                <div style={{ marginBottom: "16px" }}>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--primary)", marginBottom: "4px", fontFamily: "var(--font-display, 'Figtree', sans-serif)" }}>India</div>
                  <p style={{ fontSize: "14px", color: "var(--body-text)", lineHeight: 1.6, marginBottom: "4px" }}>264, 14, Old Madras Road, Bhattarahalli,<br />K R Puram, Bengaluru &#8211; 560049</p>
                  <p style={{ fontSize: "14px", color: "var(--text)", fontWeight: 500 }}>Ph: +91-9900931624</p>
                </div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--primary)", marginBottom: "4px", fontFamily: "var(--font-display, 'Figtree', sans-serif)" }}>USA</div>
                  <p style={{ fontSize: "14px", color: "var(--body-text)", lineHeight: 1.6 }}>2033 Gateway Place, Suite 500<br />San Jose, CA 95110</p>
                </div>
              </motion.div>
            </div>

            {/* Right: Contact form */}
            <motion.div {...fadeUp(0.12)}>
              <h2 style={{ fontFamily: "var(--font-display, 'Figtree', sans-serif)", fontSize: "22px", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.4px", marginBottom: "20px" }}>
                What do you want to do?
              </h2>

              {isSubmitted ? (
                <motion.div {...fadeIn(0)} style={{ background: "rgba(5,150,105,0.05)", border: "2px solid rgba(5,150,105,0.2)", borderRadius: "16px", padding: "32px", textAlign: "center" }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style={{ margin: "0 auto 16px" }}>
                    <circle cx="12" cy="12" r="10" fill="rgba(5,150,105,0.12)" stroke="var(--sync)" strokeWidth="1.75"/>
                    <polyline points="7 13 10 16 17 9" stroke="var(--sync)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <h3 style={{ fontFamily: "var(--font-display, 'Figtree', sans-serif)", fontSize: "20px", fontWeight: 700, color: "var(--text)", marginBottom: "8px" }}>Request received</h3>
                  <p style={{ fontSize: "15px", color: "var(--body-text)", lineHeight: 1.7 }}>We reply within 24 hours with the next step.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: "16px", padding: "32px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                  {/* Full Name */}
                  <div style={{ marginBottom: "20px" }}>
                    <label htmlFor="fullName" style={labelStyle}>Full Name</label>
                    <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "var(--primary)"}
                      onBlur={e => e.target.style.borderColor = "var(--border)"} />
                  </div>
                  {/* Work Email */}
                  <div style={{ marginBottom: "20px" }}>
                    <label htmlFor="workEmail" style={labelStyle}>Work Email</label>
                    <input type="email" id="workEmail" name="workEmail" value={formData.workEmail} onChange={handleChange} required style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "var(--primary)"}
                      onBlur={e => e.target.style.borderColor = "var(--border)"} />
                  </div>
                  {/* Phone */}
                  <div style={{ marginBottom: "20px" }}>
                    <label htmlFor="phone" style={labelStyle}>Phone</label>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <select id="countryCode" name="countryCode" value={formData.countryCode} onChange={handleChange} required
                        style={{ ...inputStyle, width: "80px", flex: "none", cursor: "pointer" }}
                        onFocus={e => e.target.style.borderColor = "var(--primary)"}
                        onBlur={e => e.target.style.borderColor = "var(--border)"}>
                        <option value="+91">+91</option>
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                        <option value="+971">+971</option>
                      </select>
                      <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required style={{ ...inputStyle, flex: 1 }}
                        onFocus={e => e.target.style.borderColor = "var(--primary)"}
                        onBlur={e => e.target.style.borderColor = "var(--border)"} />
                    </div>
                  </div>
                  {/* Company Name */}
                  <div style={{ marginBottom: "20px" }}>
                    <label htmlFor="companyName" style={labelStyle}>Company Name</label>
                    <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} required style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "var(--primary)"}
                      onBlur={e => e.target.style.borderColor = "var(--border)"} />
                  </div>
                  {/* Product */}
                  <div style={{ marginBottom: "20px" }}>
                    <label htmlFor="product" style={labelStyle}>Choose Product(s)</label>
                    <select id="product" name="product" value={formData.product} onChange={handleChange} required
                      style={{ ...inputStyle, cursor: "pointer" }}
                      onFocus={e => e.target.style.borderColor = "var(--primary)"}
                      onBlur={e => e.target.style.borderColor = "var(--border)"}>
                      <option value="" disabled>Select</option>
                      <option value="crm">CRM</option>
                      <option value="sync">Sync</option>
                      <option value="both">CRM &amp; Sync</option>
                    </select>
                  </div>
                  {/* Message */}
                  <div style={{ marginBottom: "24px" }}>
                    <label htmlFor="message" style={labelStyle}>Message</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={4} required
                      style={{ ...inputStyle, resize: "vertical" }}
                      onFocus={e => e.target.style.borderColor = "var(--primary)"}
                      onBlur={e => e.target.style.borderColor = "var(--border)"} />
                  </div>
                  {/* Submit */}
                  <button type="submit" style={{ width: "100%", padding: "13px 28px", fontSize: "15px", fontWeight: 600, fontFamily: "var(--font-display, 'Figtree', sans-serif)", background: "var(--interactive)", color: "var(--white)", border: "none", borderRadius: "8px", cursor: "pointer", transition: "background 150ms ease, transform 150ms ease", boxShadow: "0 10px 30px -10px rgba(0,0,153,0.4), inset 0 0 0 1px rgba(255,255,255,0.08)" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "var(--mid)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "var(--interactive)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                    Send request
                  </button>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Testimonial Band ── */}
      <motion.section {...fadeIn(0)} style={{ position: "relative", height: "280px", overflow: "hidden", borderBottom: "1px solid var(--border)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://images.unsplash.com/photo-1748346918817-0b1b6b2f9bab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2UlMjB0ZWFtfGVufDF8fHx8MTc3NTA4MzY1Nnww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Modern workspace"
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.4) saturate(0.8)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 60px" }}>
          <motion.div {...fadeUp(0.15)} style={{ maxWidth: "800px", textAlign: "center", color: "var(--white)", zIndex: 1 }}>
            <p style={{ fontFamily: "var(--font-display, 'Figtree', sans-serif)", fontSize: "28px", fontWeight: 700, letterSpacing: "-0.5px", lineHeight: 1.3 }}>
              &#8220;EVOQ helped us consolidate 5 tools into one platform. Our response time dropped by 60%.&#8221;
            </p>
            <p style={{ fontSize: "14px", marginTop: "16px", opacity: 0.85, letterSpacing: "0.5px" }}>
              &#8212; Operations Director, Mid-Market SaaS Company
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* ── What Happens Next ── */}
      <section className="contact-next-section" style={{ background: "var(--white)", borderBottom: "1px solid var(--border)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: "280px", height: "280px", background: "var(--sops-surface)", borderRadius: "50%", top: "-120px", left: "-120px", opacity: 0.5, zIndex: 0 }} />
        <div style={{ position: "absolute", width: "160px", height: "160px", background: "var(--sync-surface)", borderRadius: "24px", bottom: "-60px", right: "10%", transform: "rotate(-18deg)", opacity: 0.6, zIndex: 0 }} />

        <div className="contact-inner" style={{ position: "relative", zIndex: 1 }}>
          <motion.div {...fadeUp(0)} style={{ fontFamily: "var(--font-display, 'Figtree', sans-serif)", fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--primary)", marginBottom: "16px", textAlign: "center" }}>
            What Happens Next
          </motion.div>

          <motion.h2 {...fadeUp(0.07)} style={{ fontFamily: "var(--font-display, 'Figtree', sans-serif)", fontSize: "36px", fontWeight: 700, color: "var(--text)", letterSpacing: "-1px", marginBottom: "48px", textAlign: "center", lineHeight: 1.2 }}>
            Three clear steps
          </motion.h2>

          <div className="contact-steps-grid">
            {[
              { num: "1", title: "We review your request", desc: "Your message goes to the right team based on your intent", bg: "var(--crm-surface)", border: "rgba(29,78,216,0.15)", color: "var(--crm)", shape: { width: "80px", height: "80px", bg: "rgba(29,78,216,0.08)", radius: "50%", top: "-20px", right: "-20px" } },
              { num: "2", title: "We connect you to the right team", desc: "Sales, technical, or support &#8212; matched to your need", bg: "var(--sync-surface)", border: "rgba(5,150,105,0.15)", color: "var(--sync)", shape: { width: "60px", height: "60px", bg: "rgba(5,150,105,0.1)", radius: "12px", bottom: "-10px", left: "-10px", transform: "rotate(25deg)" } },
              { num: "3", title: "You get a clear next step", desc: "A real person replies with the next action within 24 hours", bg: "var(--proj-surface)", border: "rgba(124,58,237,0.15)", color: "var(--proj)", shape: { width: "90px", height: "90px", bg: "rgba(124,58,237,0.08)", radius: "24px", top: "-30px", left: "-30px", transform: "rotate(-15deg)" } },
            ].map((step, i) => (
              <motion.div key={step.num} {...fadeUp(0.1 + i * 0.1)}
                style={{ background: step.bg, border: `1px solid ${step.border}`, borderRadius: "16px", padding: "32px 28px", textAlign: "center", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", width: step.shape.width, height: step.shape.height, background: step.shape.bg, borderRadius: step.shape.radius, ...Object.fromEntries(Object.entries(step.shape).filter(([, v]) => v !== undefined)) }} />
                <div style={{ width: "56px", height: "56px", background: "var(--white)", border: `2px solid ${step.color}`, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontFamily: "var(--font-display, 'Figtree', sans-serif)", fontSize: "24px", fontWeight: 800, color: step.color, position: "relative", zIndex: 1 }}>
                  {step.num}
                </div>
                <h3 style={{ fontFamily: "var(--font-display, 'Figtree', sans-serif)", fontSize: "20px", fontWeight: 700, color: "var(--text)", marginBottom: "12px", lineHeight: 1.3, position: "relative", zIndex: 1 }}>{step.title}</h3>
                <p style={{ fontSize: "15px", color: "var(--body-text)", lineHeight: 1.7, position: "relative", zIndex: 1 }} dangerouslySetInnerHTML={{ __html: step.desc }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
