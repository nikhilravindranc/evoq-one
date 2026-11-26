"use client";
/* eslint-disable @next/next/no-img-element */

import { type ReactNode } from "react";
import { I } from "../theme";
import { FacilitiesShell, StartButton } from "./FacilitiesShell";
import { ACCENT, DEEP, INK, LINE, MIST_SOFT, MUTED, PRIMARY, OK, WARN, ERR } from "./palette";

const ST = (f: string) => `/bookings/facilities/${f}`;

function HeroSection() {
  return (
    <section className="fac-out fac-hero">
      <div className="fac-in">
        <div className="fac-hero-content">
          <span className="fac-label">EVOQ Bookings · Activities & Facility Booking</span>
          <h1 className="fac-h1">Accept online reservations for your courts, pools, halls and event venues.</h1>
          <p className="fac-hero-desc">Manage your resources and schedules, control who can book and when, and run the reservations, activities and events.</p>
          <div className="fac-hero-cta">
            <StartButton location="hero" className="fac-btn primary lg">Book a demo</StartButton>
            <button type="button" className="fac-btn secondary">Talk to an expert</button>
          </div>
        </div>

        <div className="fac-hero-visual">
          <div className="fac-hero-cards">
            <div className="fac-card-slot">
              <div className="fac-card-icon">🏐</div>
              <div className="fac-card-label">Sports Court</div>
            </div>
            <div className="fac-card-slot">
              <div className="fac-card-icon">🏊</div>
              <div className="fac-card-label">Swimming Pool</div>
            </div>
            <div className="fac-card-slot">
              <div className="fac-card-icon">🎾</div>
              <div className="fac-card-label">Tennis Court</div>
            </div>
            <div className="fac-card-slot">
              <div className="fac-card-icon">🏐</div>
              <div className="fac-card-label">Sports Hall</div>
            </div>
            <div className="fac-card-slot">
              <div className="fac-card-icon">🎉</div>
              <div className="fac-card-label">Banquet Hall</div>
            </div>
            <div className="fac-card-slot">
              <div className="fac-card-icon">🧘</div>
              <div className="fac-card-label">Activity Studio</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResourceManagementSection() {
  const resources = [
    { icon: "🏐", name: "Sports Court", desc: "Indoor and outdoor courts with capacity details" },
    { icon: "🏊", name: "Swimming Pool", desc: "Multiple pools with lane and depth information" },
    { icon: "🏢", name: "Sports Hall", desc: "Large multipurpose halls for events and activities" },
    { icon: "🏨", name: "Banquet Hall", desc: "Event spaces with seating and catering options" },
    { icon: "🏥", name: "Diagnostics Center", desc: "Medical facilities with equipment details" },
    { icon: "🏢", name: "Multi-location", desc: "Manage resources across multiple sites" },
  ];

  return (
    <section className="fac-out fac-sec fac-white">
      <div className="fac-in">
        <div className="fac-head c">
          <span className="fac-label">Bookable Resources</span>
          <h2 className="fac-h2">Show customers the details and capacity before they book.</h2>
          <p className="fac-lead">Add your spaces, amenities and resources with their capacity, images and booking information. From individual sports courts to event venues, maintain a clear catalogue of bookable resources.</p>
        </div>

        <div className="fac-grid-6">
          {resources.map((r) => (
            <div key={r.name} className="fac-resource-card">
              <div className="fac-card-icon-lg">{r.icon}</div>
              <h3>{r.name}</h3>
              <p>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AvailabilitySection() {
  return (
    <section className="fac-out fac-sec fac-band">
      <div className="fac-in">
        <div className="fac-head c">
          <span className="fac-label">Availability Control</span>
          <h2 className="fac-h2">Set when a court or room can be booked and for how long.</h2>
          <p className="fac-lead">Define when a facility is available, how long it can be reserved and which time slots can be booked. Account for recurring schedules, unavailable periods and different booking durations.</p>
        </div>

        <div className="fac-availability-visual">
          <div className="fac-calendar-mock">
            <div className="fac-cal-header">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span>
            </div>
            <div className="fac-cal-slots">
              {Array.from({ length: 15 }, (_, i) => {
                const status = i % 5 === 0 ? "unavailable" : i % 7 === 0 ? "pending" : "available";
                return <div key={i} className={`fac-slot ${status}`} />;
              })}
            </div>
            <div className="fac-cal-legend">
              <span><i className="fac-dot available" /> Available</span>
              <span><i className="fac-dot pending" /> Pending</span>
              <span><i className="fac-dot unavailable" /> Unavailable</span>
            </div>
          </div>
        </div>

        <div className="fac-features-list">
          <div className="fac-feature-item">
            <div className="fac-feature-icon">⏰</div>
            <div>
              <h4>Time slot management</h4>
              <p>Define available booking durations and time slots</p>
            </div>
          </div>
          <div className="fac-feature-item">
            <div className="fac-feature-icon">🔄</div>
            <div>
              <h4>Recurring schedules</h4>
              <p>Set up repeating availability patterns weekly or monthly</p>
            </div>
          </div>
          <div className="fac-feature-item">
            <div className="fac-feature-icon">🚫</div>
            <div>
              <h4>Blocked periods</h4>
              <p>Block time for maintenance, cleaning, or special events</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OnlineBookingSection() {
  const steps = [
    "Resource selection",
    "Date & time selection",
    "Booking summary",
    "Confirmation",
  ];

  return (
    <section className="fac-out fac-sec fac-white">
      <div className="fac-in">
        <div className="fac-head c">
          <span className="fac-label">Online Reservations</span>
          <h2 className="fac-h2">Let members and guests reserve facilities online.</h2>
          <p className="fac-lead">Publish a booking page where visitors can explore available facilities, select a date and time, review booking details and submit a reservation. Make the booking experience accessible through a hosted page or your existing website.</p>
        </div>

        <div className="fac-booking-flow">
          {steps.map((step, i) => (
            <div key={step} className="fac-flow-item">
              <div className="fac-flow-num">{i + 1}</div>
              <div className="fac-flow-label">{step}</div>
              {i < steps.length - 1 && <div className="fac-flow-arrow" aria-hidden>→</div>}
            </div>
          ))}
        </div>

        <p className="fac-note">{I.check} Customers can book at a time that suits them, without having to coordinate through calls and messages.</p>
      </div>
    </section>
  );
}

function BookingRulesSection() {
  return (
    <section className="fac-out fac-sec fac-band">
      <div className="fac-in">
        <div className="fac-head c">
          <span className="fac-label">Booking Administration</span>
          <h2 className="fac-h2">Control who can book and when.</h2>
          <p className="fac-lead">Set who can book, when reservations can be made and which conditions apply. Review incoming bookings, manage changes and keep reservation information accessible. Configure rules around public access, member eligibility, booking windows, capacity and approvals.</p>
        </div>

        <div className="fac-rules-container">
          <div className="fac-rules-col">
            <h3>Booking rules</h3>
            <ul className="fac-rules-list">
              <li><span className="fac-badge public">Public</span> Public booking available</li>
              <li><span className="fac-badge member">Member</span> Member-only access</li>
              <li><span className="fac-badge window">Window</span> Advanced booking window</li>
              <li><span className="fac-badge approval">Approval</span> Requires confirmation</li>
            </ul>
          </div>

          <div className="fac-rules-col">
            <h3>Reservation dashboard</h3>
            <div className="fac-reservation-list">
              <div className="fac-res-item">
                <span className="fac-time">09:00</span>
                <span className="fac-facility">Tennis Court A</span>
                <span className={`fac-status ok`}>Confirmed</span>
              </div>
              <div className="fac-res-item">
                <span className="fac-time">14:30</span>
                <span className="fac-facility">Swimming Pool</span>
                <span className={`fac-status warn`}>Pending</span>
              </div>
              <div className="fac-res-item">
                <span className="fac-time">16:00</span>
                <span className="fac-facility">Banquet Hall</span>
                <span className={`fac-status ok`}>Confirmed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ActivitiesSection() {
  const activities = [
    { name: "Fitness Sessions", icon: "💪", desc: "Schedule yoga, aerobics, and fitness classes" },
    { name: "Sports Coaching", icon: "🏆", desc: "Manage coaching sessions and training programs" },
    { name: "Organized Activities", icon: "⚽", desc: "Open tournaments, leagues, and competitions" },
    { name: "Member Programs", icon: "👥", desc: "Track participant limits and registrations" },
  ];

  return (
    <section className="fac-out fac-sec fac-white">
      <div className="fac-in">
        <div className="fac-head c">
          <span className="fac-label">Activities & Events</span>
          <h2 className="fac-h2">Schedule activities, sessions and events.</h2>
          <p className="fac-lead">Open scheduled activities and programs for registration. Manage sessions, participant limits and event bookings alongside your facility reservations.</p>
        </div>

        <div className="fac-grid-4">
          {activities.map((a) => (
            <div key={a.name} className="fac-activity-card">
              <div className="fac-activity-icon">{a.icon}</div>
              <h3>{a.name}</h3>
              <p>{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MemberExperienceSection() {
  return (
    <section className="fac-out fac-sec fac-band">
      <div className="fac-in">
        <div className="fac-head c">
          <span className="fac-label">Self-Service Booking</span>
          <h2 className="fac-h2">Keep members updated on their reservations.</h2>
          <p className="fac-lead">Members and guests can review their reservations and receive booking updates. Support different access rules depending on how your organization makes its facilities available.</p>
        </div>

        <div className="fac-member-visual">
          <div className="fac-member-phone">
            <div className="fac-phone-notch" />
            <div className="fac-phone-content">
              <div className="fac-phone-header">My Bookings</div>
              <div className="fac-phone-booking">
                <div className="fac-booking-date">Today</div>
                <div className="fac-booking-item">
                  <div className="fac-booking-time">09:00 AM</div>
                  <div className="fac-booking-details">
                    <strong>Tennis Court A</strong>
                    <small>60 mins</small>
                  </div>
                  <div className={`fac-booking-badge ok`}>Confirmed</div>
                </div>
              </div>
              <div className="fac-phone-booking">
                <div className="fac-booking-date">Tomorrow</div>
                <div className="fac-booking-item">
                  <div className="fac-booking-time">14:30 PM</div>
                  <div className="fac-booking-details">
                    <strong>Swimming Pool</strong>
                    <small>90 mins</small>
                  </div>
                  <div className={`fac-booking-badge warn`}>Pending</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClosingCTASection() {
  return (
    <section className="fac-out fac-sec fac-white">
      <div className="fac-in fac-cta-section">
        <h2>Bring healthcare operations and patient relationships together.</h2>
        <p>Discuss your organization&apos;s reservation requirements with the EVOQ team.</p>
        <div className="fac-cta-buttons">
          <StartButton location="cta" className="fac-btn primary lg">Book a demo</StartButton>
          <button type="button" className="fac-btn secondary lg">Talk to the team</button>
        </div>
      </div>
    </section>
  );
}

export function FacilitiesHome() {
  return (
    <FacilitiesShell
      page="home"
      hero={<HeroSection />}
    >
      <ResourceManagementSection />
      <AvailabilitySection />
      <OnlineBookingSection />
      <BookingRulesSection />
      <ActivitiesSection />
      <MemberExperienceSection />
      <ClosingCTASection />

      <style>{css}</style>
    </FacilitiesShell>
  );
}

const css = `
  .fac-h1 { font-size: 48px; line-height: 1.1; letter-spacing: -0.02em; text-wrap: balance; margin: 0 0 20px; color: ${DEEP}; }
  .fac-hero { padding: 80px 0 60px; }
  .fac-hero-content { margin-bottom: 60px; }
  .fac-hero-desc { font-size: 18px; color: ${MUTED}; margin: 20px 0; max-width: 600px; }
  .fac-hero-cta { display: flex; gap: 16px; margin-top: 32px; }
  .fac-btn.lg { padding: 14px 32px; font-size: 16px; }
  .fac-btn.secondary { background: transparent; color: ${PRIMARY}; border: 1px solid ${PRIMARY}; }
  .fac-btn.secondary:hover { background: rgba(74, 94, 115, 0.05); }

  .fac-hero-visual { position: relative; }
  .fac-hero-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 32px; }
  .fac-card-slot { background: ${MIST_SOFT}; padding: 20px; border-radius: 12px; text-align: center; }
  .fac-card-icon { font-size: 32px; margin-bottom: 12px; }
  .fac-card-label { font-size: 14px; font-weight: 500; color: ${DEEP}; }
  .fac-card-icon-lg { font-size: 48px; margin-bottom: 16px; }

  .fac-grid-6 { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 40px; }
  .fac-grid-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; margin-top: 40px; }

  .fac-resource-card { background: #fff; padding: 24px; border: 1px solid ${LINE}; border-radius: 12px; text-align: center; transition: all 0.2s; }
  .fac-resource-card:hover { border-color: ${ACCENT}; box-shadow: 0 4px 12px rgba(23, 162, 184, 0.1); }
  .fac-resource-card h3 { font-size: 16px; margin: 12px 0 8px; color: ${DEEP}; }
  .fac-resource-card p { font-size: 14px; color: ${MUTED}; margin: 0; line-height: 1.4; }

  .fac-availability-visual { background: #fff; padding: 32px; border-radius: 12px; margin: 40px 0; border: 1px solid ${LINE}; }
  .fac-calendar-mock { background: ${MIST_SOFT}; padding: 20px; border-radius: 8px; margin-bottom: 24px; }
  .fac-cal-header { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; margin-bottom: 12px; font-weight: 600; color: ${DEEP}; }
  .fac-cal-slots { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; }
  .fac-slot { height: 60px; border-radius: 8px; background: #fff; }
  .fac-slot.available { background: rgba(39, 174, 96, 0.1); }
  .fac-slot.pending { background: rgba(243, 156, 18, 0.1); }
  .fac-slot.unavailable { background: rgba(231, 76, 60, 0.1); }
  .fac-cal-legend { display: flex; gap: 24px; justify-content: center; margin-top: 16px; font-size: 14px; color: ${MUTED}; }
  .fac-dot { display: inline-block; width: 12px; height: 12px; border-radius: 50%; margin-right: 6px; }
  .fac-dot.available { background: ${OK}; }
  .fac-dot.pending { background: ${WARN}; }
  .fac-dot.unavailable { background: ${ERR}; }

  .fac-features-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; }
  .fac-feature-item { display: flex; gap: 16px; }
  .fac-feature-icon { font-size: 32px; flex-shrink: 0; }
  .fac-feature-item h4 { margin: 0 0 8px; font-size: 16px; color: ${DEEP}; }
  .fac-feature-item p { margin: 0; font-size: 14px; color: ${MUTED}; }

  .fac-booking-flow { display: flex; align-items: center; justify-content: center; gap: 8px; margin: 48px 0; flex-wrap: wrap; }
  .fac-flow-item { display: flex; align-items: center; gap: 12px; }
  .fac-flow-num { width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; background: ${ACCENT}; color: #fff; border-radius: 50%; font-weight: 600; }
  .fac-flow-label { font-size: 14px; color: ${INK}; min-width: 100px; }
  .fac-flow-arrow { color: ${MUTED}; font-size: 20px; }

  .fac-rules-container { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-top: 40px; }
  .fac-rules-col h3 { font-size: 18px; margin: 0 0 20px; color: ${DEEP}; }
  .fac-rules-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
  .fac-rules-list li { display: flex; align-items: center; gap: 12px; padding: 12px; background: #fff; border-radius: 8px; border: 1px solid ${LINE}; }
  .fac-badge { display: inline-flex; align-items: center; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; white-space: nowrap; }
  .fac-badge.public { background: rgba(23, 162, 184, 0.1); color: ${ACCENT}; }
  .fac-badge.member { background: rgba(74, 94, 115, 0.1); color: ${PRIMARY}; }
  .fac-badge.window { background: rgba(39, 174, 96, 0.1); color: ${OK}; }
  .fac-badge.approval { background: rgba(231, 76, 60, 0.1); color: ${ERR}; }

  .fac-reservation-list { display: flex; flex-direction: column; gap: 12px; }
  .fac-res-item { display: grid; grid-template-columns: 60px 1fr auto; gap: 12px; align-items: center; padding: 12px; background: #fff; border-radius: 8px; border: 1px solid ${LINE}; }
  .fac-time { font-weight: 600; color: ${PRIMARY}; }
  .fac-facility { font-size: 14px; color: ${INK}; }
  .fac-status { display: inline-flex; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; }
  .fac-status.ok { background: rgba(39, 174, 96, 0.1); color: ${OK}; }
  .fac-status.warn { background: rgba(243, 156, 18, 0.1); color: ${WARN}; }

  .fac-activity-card { background: #fff; padding: 24px; border: 1px solid ${LINE}; border-radius: 12px; text-align: center; transition: all 0.2s; }
  .fac-activity-card:hover { border-color: ${ACCENT}; box-shadow: 0 4px 12px rgba(23, 162, 184, 0.1); }
  .fac-activity-icon { font-size: 40px; margin-bottom: 16px; }
  .fac-activity-card h3 { font-size: 16px; margin: 12px 0 8px; color: ${DEEP}; }
  .fac-activity-card p { font-size: 14px; color: ${MUTED}; margin: 0; }

  .fac-member-visual { margin: 40px 0; }
  .fac-member-phone { width: 280px; margin: 0 auto; background: #000; border-radius: 32px; padding: 12px; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2); }
  .fac-phone-notch { height: 24px; background: #000; border-radius: 0 0 20px 20px; margin: 0 auto 8px; width: 150px; }
  .fac-phone-content { background: #fff; border-radius: 24px; padding: 16px; overflow: hidden; }
  .fac-phone-header { font-weight: 600; font-size: 14px; color: ${DEEP}; margin-bottom: 16px; }
  .fac-phone-booking { margin-bottom: 16px; }
  .fac-booking-date { font-size: 12px; font-weight: 600; color: ${MUTED}; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
  .fac-booking-item { display: grid; grid-template-columns: 60px 1fr auto; gap: 8px; align-items: center; padding: 8px; background: ${MIST_SOFT}; border-radius: 8px; }
  .fac-booking-time { font-size: 12px; font-weight: 600; color: ${PRIMARY}; }
  .fac-booking-details { }
  .fac-booking-details strong { display: block; font-size: 13px; color: ${DEEP}; margin-bottom: 2px; }
  .fac-booking-details small { font-size: 11px; color: ${MUTED}; }
  .fac-booking-badge { display: inline-flex; padding: 3px 8px; border-radius: 4px; font-size: 10px; font-weight: 600; }
  .fac-booking-badge.ok { background: rgba(39, 174, 96, 0.1); color: ${OK}; }
  .fac-booking-badge.warn { background: rgba(243, 156, 18, 0.1); color: ${WARN}; }

  .fac-cta-section { text-align: center; padding: 60px 20px; }
  .fac-cta-section h2 { font-size: 42px; margin-bottom: 16px; color: ${DEEP}; }
  .fac-cta-section p { font-size: 18px; color: ${MUTED}; margin-bottom: 32px; max-width: 600px; margin-left: auto; margin-right: auto; }
  .fac-cta-buttons { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }

  .fac-chrome { display: flex; align-items: center; gap: 8px; padding: 10px 12px; background: ${LINE}; border-radius: 8px 8px 0 0; }
  .fac-dots { display: flex; gap: 6px; }
  .fac-dots i { width: 8px; height: 8px; border-radius: 50%; background: ${MUTED}; }
  .fac-url { font-size: 12px; color: ${MUTED}; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .fac-win-b { background: #fff; padding: 20px; }

  @media (max-width: 768px) {
    .fac-h1 { font-size: 32px; }
    .fac-h2 { font-size: 28px; }
    .fac-hero-cta { flex-direction: column; }
    .fac-hero-cards { grid-template-columns: repeat(2, 1fr); }
    .fac-hero-cards .fac-card-slot:last-child { grid-column: 1 / -1; }
    .fac-rules-container { grid-template-columns: 1fr; }
    .fac-booking-flow { flex-direction: column; }
    .fac-flow-arrow { display: none; }
    .fac-cta-buttons { flex-direction: column; }
    .fac-btn.lg { width: 100%; }
  }

  @media (max-width: 480px) {
    .fac-h1 { font-size: 26px; }
    .fac-hero { padding: 40px 0; }
    .fac-sec { padding-top: 60px; padding-bottom: 60px; }
    .fac-hero-cards { grid-template-columns: 1fr; }
    .fac-grid-6 { grid-template-columns: repeat(2, 1fr); }
    .fac-grid-4 { grid-template-columns: 1fr; }
    .fac-member-phone { width: 100%; max-width: 280px; }
    .fac-res-item { grid-template-columns: 1fr; }
  }
`;
