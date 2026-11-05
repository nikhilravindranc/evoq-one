"use client";

import { AP_BASE, ApptShell, StartButton } from "./ApptShell";

/* Appointments pricing. The pricing content is still to come, so this page holds the place in the menu with a
   short note and the ways to get in touch. */

export function ApptPricing() {
  return (
    <ApptShell
      page="pricing"
      hero={
        <div className="ap-hd-in" style={{ padding: "72px 0 96px", maxWidth: 820 }}>
          <span className="ap-label">EVOQ Bookings · Appointment pricing</span>
          <h1 style={{ fontSize: 46, lineHeight: 1.08, letterSpacing: "-.025em", margin: "16px 0 0" }}>Pricing for EVOQ Appointments.</h1>
          <p className="ap-lead">Pricing details are being prepared. Tell us about your services, providers and locations and we will share what fits your organization.</p>
          <div className="ap-ctas">
            <StartButton location="pricing_hero" />
            <a href={AP_BASE} className="ap-btn secondary">Explore Appointments</a>
          </div>
        </div>
      }
    >
      <></>
    </ApptShell>
  );
}
