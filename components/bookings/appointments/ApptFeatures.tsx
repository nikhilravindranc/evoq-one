"use client";
/* eslint-disable @next/next/no-img-element */

import type { ReactNode } from "react";
import { ProductBadge } from "@/components/shared/ProductBadge";
import { I } from "../theme";
import { AP_BASE, ApptShell, StartButton } from "./ApptShell";
import { BAND, DEEP, INK, LINE, MIST_SOFT, MUTED, NEUTRAL, PRIMARY, VIS } from "./palette";

/* Appointment Features. Every section from the features brief, text-led and on white and warm paper bands:
   groups are plain lists under a top rule rather than cards, in the same language as the Appointments page. */

const PH = (f: string) => `/healthcare/pm/${f}`;

/* "Label: text" renders the label in bold */
function Bul({ t }: { t: string }) {
  const i = t.indexOf(": ");
  return (
    <li>
      {I.check}
      <span>{i > 0 && i < 30 ? <><b>{t.slice(0, i)}:</b> {t.slice(i + 2)}</> : t}</span>
    </li>
  );
}

function Group({ title, tag, items, icon }: { title: string; tag?: string; items: string[]; icon?: ReactNode }) {
  return (
    <div className="af-g">
      <div className="af-g-h">{icon && <span className="af-ic">{icon}</span>}<h3>{title}</h3></div>
      {tag && <p className="af-tag">{tag}</p>}
      <ul className="af-bul">{items.map((t) => <Bul key={t} t={t} />)}</ul>
    </div>
  );
}

function Item({ title, text, icon }: { title: string; text: string; icon: ReactNode }) {
  return (
    <div className="af-it">
      <span className="af-ic">{icon}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

const Why = ({ children }: { children: ReactNode }) => <p className="ap-note">{I.check}<span><b>Why it matters:</b> {children}</span></p>;

function Sec({ id, band, label, title, lead, children, wide }: { id: string; band?: boolean; label: string; title: string; lead: string; children: ReactNode; wide?: boolean }) {
  return (
    <section className={`ap-out ap-sec ${band ? "ap-band" : "ap-white"}`} id={id}>
      <div className="ap-in">
        <div className={`ap-head c${wide ? " wide" : ""}`} data-rv="0">
          <span className="ap-label">{label}</span>
          <h2 className="ap-h2">{title}</h2>
          <p className="ap-lead">{lead}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

export function ApptFeatures() {
  return (
    <ApptShell
      page="features"
      hero={
        <div className="ap-hd-in af-hero">
          <div>
            <span className="ap-label">EVOQ Bookings · Appointment features</span>
            <h1 className="af-h1">Every part of appointment scheduling, covered.</h1>
            <p className="ap-lead">From service configuration and provider availability to online booking and appointment administration, manage the details that shape how appointments are scheduled and delivered.</p>
            <p className="af-sub">EVOQ Appointments gives organizations control over their services, schedules, booking requirements and client-facing appointment experience.</p>
            <div className="ap-ctas">
              <StartButton location="features_hero" />
              <a href={AP_BASE} className="ap-btn secondary">Explore Appointments</a>
            </div>
          </div>
          <div className="af-vis">
            <span className="af-blob" aria-hidden />
            <img src={PH("stock-patient.jpg")} alt="Provider welcoming a client at a clinic desk" />
            <div className="af-chip tl"><i />Services · Providers · Locations</div>
            <div className="af-chip br"><span className="af-tick">{I.check}</span><span><b>Appointment confirmed</b><small>Dr. Priya · Thu 14:30</small></span></div>
          </div>
        </div>
      }
    >
      <style>{css}</style>

      {/* 2. service and provider management */}
      <Sec id="services" band label="Service & provider management" title="Organize services around the people who deliver them." wide
        lead="Every appointment starts with a service and the availability of someone qualified to deliver it. Define your service catalog, assign providers and configure the details that determine how each appointment can be booked.">
        <div className="af-two" data-rv="1">
          <Group icon={I.edit} title="Service Management" tag="Give every service its own booking configuration." items={[
            "Service Catalog: Create and organize the services available for booking.",
            "Service Details: Add descriptions, categories and pricing.",
            "Appointment Duration: Set the time required for each service.",
            "Preparation & Buffer Time: Account for preparation, recovery or transition time around appointments.",
            "Provider Assignment: Specify which providers can deliver each service.",
            "Location Assignment: Control where individual services are available.",
            "Group Services: Configure services that accommodate multiple participants, where supported.",
          ]} />
          <Group icon={I.people} title="Provider Management" tag="Keep provider profiles and schedules aligned with the services they offer." items={[
            "Create individual provider and staff profiles.",
            "Assign services to relevant providers.",
            "Configure provider working hours.",
            "Set provider availability by location.",
            "Manage individual provider schedules.",
            "View appointments assigned to each provider.",
            "Account for provider-specific availability and scheduling requirements.",
          ]} />
        </div>
        <Why>Service and provider configurations determine which appointments clients can request and which time slots are available to them.</Why>
      </Sec>

      {/* 3. online appointment booking */}
      <Sec id="booking" label="Online appointment booking" title="Let clients choose the service, provider and time that suit them." wide
        lead="Give clients a direct way to find available appointments without coordinating every booking through calls or messages. Your public booking page presents the services and available options configured by your organization.">
        <div className="af-sub-h" data-rv="0"><h3>A guided booking experience</h3></div>
        <ol className="af-steps" data-rv="1">
          {[
            ["Service selection", "Clients browse available services and review relevant descriptions and durations."],
            ["Provider selection", "Clients choose a preferred provider when provider selection is enabled."],
            ["Location selection", "Clients select an available service location where applicable."],
            ["Date & time selection", "Available appointment slots are presented according to configured scheduling rules."],
            ["Appointment details", "Clients provide their contact information and respond to relevant booking questions."],
            ["Booking confirmation", "Clients review their appointment details and complete the booking process."],
          ].map(([t, d], n) => (
            <li key={t}><span className="af-n">{n + 1}</span><h3>{t}</h3><p>{d}</p></li>
          ))}
        </ol>
        <div className="af-wrap" data-rv="2">
          <Group icon={I.layers} title="Booking page capabilities" items={[
            "Public-facing appointment booking page.",
            "Organization branding and booking information.",
            "Service and provider presentation.",
            "Location-based booking options.",
            "Mobile-friendly booking experience.",
            "Shareable booking page link.",
            "Website embedding options.",
          ]} />
        </div>
        <Why>Clients can understand their options and book an appointment through a consistent online experience.</Why>
      </Sec>

      {/* 4. appointment calendar and management */}
      <Sec id="calendar" band label="Appointment calendar & management" title="Stay on top of appointments throughout the day." wide
        lead="Give administrators and providers a clear view of scheduled appointments. Review upcoming bookings, monitor changes and manage the appointment calendar as daily schedules evolve.">
        <div className="af-two" data-rv="1">
          <Group icon={I.clock} title="Calendar Views" items={[
            "Day View: Focus on the appointments scheduled for a particular day.",
            "Week View: Review provider schedules and upcoming appointments across the week.",
            "Month View: Understand appointment distribution across the month.",
            "Provider Calendar: Review appointments assigned to individual providers.",
            "Location View: Organize appointment activity by service location.",
          ]} />
          <Group icon={I.rules} title="Appointment Administration" items={[
            "Create appointments manually.",
            "View upcoming and past appointments.",
            "Review appointment details and client information.",
            "Track booking statuses.",
            "Update appointment information.",
            "Reschedule appointments.",
            "Cancel appointments.",
            "Review changes to scheduled appointments.",
          ]} />
        </div>
        <Why>Maintain visibility into appointment activity and respond to scheduling changes without losing track of the overall calendar.</Why>
      </Sec>

      {/* 5. availability and scheduling rules */}
      <Sec id="availability" label="Availability & scheduling rules" title="Control when appointments can be booked."
        lead="Not every service or provider is available at every time. Configure the rules that determine when appointment slots are offered and how much time should be allocated to each booking.">
        <div className="af-grid4" data-rv="1">
          <Item icon={I.space} title="Operating Hours" text="Set organization and location operating hours to define when appointments can generally take place." />
          <Item icon={I.people} title="Provider Availability" text="Configure individual provider schedules, working hours and unavailable periods." />
          <Item icon={I.clock} title="Service Durations" text="Allocate the required time for each service so appointment slots reflect how long the service takes." />
          <Item icon={I.edit} title="Buffer & Preparation Times" text="Account for preparation, breaks and time between appointments." />
          <Item icon={I.appt} title="Booking Windows" text="Define how far in advance clients can schedule and any minimum notice required before an appointment." />
          <Item icon={I.oversight} title="Blocked Periods" text="Exclude holidays, breaks, leave and other unavailable periods from the booking calendar." />
          <Item icon={I.layers} title="Appointment Capacity" text="Configure capacity for appointment formats that allow multiple participants." />
          <Item icon={I.rules} title="Booking Policies" text="Define the rules governing appointment changes, cancellations and other booking conditions." />
        </div>
        <Why>Availability is determined by the combined requirements of services, providers, operating hours and scheduling policies.</Why>
      </Sec>

      {/* 6. appointment administration */}
      <Sec id="administration" band label="Appointment administration" title="Take care of the details before and after every booking." wide
        lead="Appointment management involves more than maintaining a calendar. Collect relevant information, communicate important updates and manage the administrative requirements associated with each appointment.">
        <div className="af-g5" data-rv="1">
          <Group icon={I.edit} title="Appointment Intake" tag="Collect relevant information during booking." items={[
            "Capture client contact details.", "Add custom booking questions.", "Configure service-specific intake fields.", "Set required and optional questions.", "Collect appointment preferences and relevant information.", "Include terms and consent acknowledgements where appropriate.",
          ]} />
          <Group icon={I.message} title="Confirmations & Reminders" tag="Keep clients and providers informed." items={[
            "Appointment confirmation messages.", "Upcoming appointment reminders.", "Cancellation notifications.", "Rescheduling notifications.", "Appointment updates.", "Provider notifications.", "Configurable notification content and supported communication channels.",
          ]} />
          <Group icon={I.layers} title="Payments & Deposits" tag="Include payment requirements in the booking process." items={[
            "Configure service pricing.", "Define deposit requirements where supported.", "Collect advance payments through supported payment integrations.", "Review appointment payment status.", "Track pending and completed payments.",
          ]} />
          <Group icon={I.appt} title="Rescheduling & Cancellations" tag="Manage appointment changes and booking policies." items={[
            "Update scheduled appointment times.", "Manage cancellations.", "Apply configured booking conditions.", "Review changes to appointment records.",
          ]} />
          <Group icon={I.people} title="Waitlist Management" tag="Keep track of clients looking for an available appointment." items={[
            "Add clients to a waitlist.", "Record preferred services and providers.", "Review and manage waitlist entries.", "Identify potential appointment openings.", "Support communication when suitable availability becomes available, where implemented.",
          ]} />
        </div>
        <Why>Keep appointment-related information and administrative requirements associated with the booking rather than handling every detail separately.</Why>
      </Sec>

      {/* 7. advanced appointment scheduling */}
      <Sec id="advanced" label="Advanced appointment scheduling" title="Support more ways to deliver services." wide
        lead="Some organizations schedule individual consultations. Others manage recurring sessions, group appointments or services across several locations. Configure appointment arrangements according to how your organization operates.">
        <div className="af-three" data-rv="1">
          <Group icon={I.people} title="Group Appointments" tag="Manage appointments that accommodate multiple participants." items={[
            "Configure group appointment capacity.", "Manage available places.", "Review participant bookings.", "Monitor group appointment schedules.",
          ]} />
          <Group icon={I.clock} title="Recurring Appointments" tag="Support services that take place on a recurring basis." items={[
            "Configure recurring appointment schedules where supported.", "Review scheduled sessions.", "Manage appointment availability across recurring sessions.",
          ]} />
          <Group icon={I.pin} title="Multi-Location Scheduling" tag="Coordinate appointments across branches and service locations." items={[
            "Create and manage multiple locations.", "Assign providers to relevant locations.", "Configure services by location.", "Set location-specific operating hours.", "Manage availability across locations.", "Review appointments by location.",
          ]} />
        </div>
        <Why>Accommodate different appointment formats and operating structures without treating every booking as an isolated calendar entry.</Why>
      </Sec>

      {/* 8. reports and appointment insights */}
      <Sec id="reports" band label="Reports & appointment insights" title="Understand appointment activity across your organization."
        lead="Use appointment data to review scheduling activity, identify patterns and understand how services and providers are being utilized.">
        <div className="af-grid3" data-rv="1">
          <Item icon={I.appt} title="Appointment Activity" text="Review appointment volumes, upcoming bookings and completed appointments." />
          <Item icon={I.oversight} title="Cancellation & No-Show Trends" text="Understand how frequently appointments are cancelled or missed." />
          <Item icon={I.people} title="Provider Activity" text="Review appointment distribution and activity across individual providers." />
          <Item icon={I.search} title="Service Demand" text="Identify which services receive the most appointment bookings." />
          <Item icon={I.pin} title="Location Performance" text="Compare appointment activity across service locations." />
          <Item icon={I.clock} title="Schedule Utilization" text="Review how appointment availability is being used across providers and services." />
        </div>
        <Why>Gain visibility into appointment demand and scheduling patterns to support operational decisions.</Why>
      </Sec>

      {/* 9. EVI */}
      <section className="ap-out ap-sec ap-white" id="evi">
        <div className="ap-in af-evi">
          <div data-rv="0">
            <span className="ap-label">EVI · AI assistance for appointments</span>
            <h2 className="ap-h2" style={{ marginTop: 14 }}>Work with your appointment schedule through natural language.</h2>
            <p className="ap-lead">EVI is evolving to help administrators understand appointment information, identify scheduling opportunities and prepare administrative actions.</p>
            <div className="af-evi-l">
              {[
                ["Appointment Intelligence", "Ask questions about appointment activity, provider schedules and upcoming bookings.", I.search],
                ["Availability Assistance", "Find suitable provider slots and identify potential scheduling gaps.", I.clock],
                ["Scheduling Insights", "Review appointment patterns, cancellations and potential scheduling conflicts.", I.oversight],
                ["Action Preparation", "Prepare appointment-related updates and administrative actions for review and approval before execution.", I.edit],
                ["Booking Assistance", "As client-facing AI capabilities develop, EVI can help interpret booking enquiries, identify relevant services and guide clients towards suitable appointment options.", I.message],
              ].map(([t, d, ic]) => (
                <div key={t as string} className="af-evi-i"><span className="af-ic">{ic}</span><span><b>{t}</b><small>{d}</small></span></div>
              ))}
            </div>
            <div className="ap-ctas"><a href="/products/ai" className="ap-btn secondary">Explore EVI</a></div>
          </div>
          <div className="af-ask" data-rv="1">
            <span className="af-blob" aria-hidden />
            <div className="af-ask-in">
              <span className="af-ask-k">Example requests</span>
              {["Show me tomorrow's appointments by provider.", "Find available consultation slots this week.", "Identify potential scheduling conflicts.", "Summarize cancellations from this month."].map((q) => (
                <div key={q} className="af-q">&ldquo;{q}&rdquo;</div>
              ))}
              <p className="af-ask-s">EVI is intended to help people work with appointment information and prepare actions, while keeping approval and control with the organization.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. integrations and the EVOQ ecosystem */}
      <Sec id="integrations" band label="Integrations & EVOQ ecosystem" title="Bring appointment information into your wider operations." wide
        lead="Appointment scheduling often involves more than one application. Supported integrations allow appointment information to work alongside the tools organizations use for calendars, communication, payments and client management.">
        <div className="af-grid5" data-rv="1">
          <Item icon={I.rules} title="Calendar Integrations" text="Coordinate appointment availability and schedules through supported calendar connections." />
          <Item icon={I.message} title="Communication Integrations" text="Use supported email and SMS services for appointment-related notifications." />
          <Item icon={I.layers} title="Payment Integrations" text="Support online payments and deposits through available payment connections." />
          <div className="af-it">
            <span className="af-ic">{I.space}</span>
            <h3>EVOQ Applications</h3>
            <p>Extend appointment-related processes through relevant EVOQ applications, including CRM and other connected services.</p>
            <span className="af-apps">{["bookings", "crm", "billing", "campaigns", "desk", "sync"].map((a) => <ProductBadge key={a} productKey={a} size={30} />)}</span>
          </div>
          <Item icon={I.other} title="External Applications" text="Explore additional connections as integrations become available." />
        </div>
        <Why>Appointment information can support wider operational processes without treating scheduling as an isolated activity.</Why>
      </Sec>

      {/* 11. final call to action */}
      <section className="ap-close">
        <div className="ap-close-in" data-rv="0">
          <span className="ap-cs ring" aria-hidden /><span className="ap-cs dots" aria-hidden /><span className="ap-cs sun" aria-hidden />
          <div className="ap-close-c">
            <h2 className="ap-h2">Make appointment scheduling work around your services.</h2>
            <p className="ap-lead">Configure services, coordinate provider availability and give clients a direct way to book appointments.</p>
            <div className="ap-ctas"><StartButton location="features_close" /><a href={AP_BASE} className="ap-btn secondary">Explore</a></div>
          </div>
        </div>
      </section>
    </ApptShell>
  );
}

const css = `
  .af-hero{display:grid;grid-template-columns:minmax(0,.95fr) minmax(0,1.05fr);gap:56px;align-items:center;padding:56px 0 80px}
  .af-h1{font-size:50px;line-height:1.06;letter-spacing:-.028em;margin:16px 0 0!important;text-wrap:balance}
  .af-sub{margin:14px 0 0;font-size:15.5px;line-height:1.6;color:${NEUTRAL};max-width:56ch}
  .af-vis{position:relative;padding:34px 0 34px 34px}
  .af-blob{position:absolute;z-index:0;right:0;top:0;bottom:0;left:22%;border-radius:200px 36px 36px 36px;background:#EEDDB9}
  .af-vis img{position:relative;z-index:1;display:block;width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:24px;box-shadow:0 34px 60px -34px rgba(30,45,34,.5)}
  .af-chip{position:absolute;z-index:2;display:inline-flex;align-items:center;gap:10px;padding:10px 16px;border-radius:999px;background:#fff;font-size:13px;font-weight:600;color:${DEEP};box-shadow:0 18px 36px -18px rgba(30,45,34,.55)}
  .af-chip.tl{left:0;top:6px}.af-chip.tl i{width:8px;height:8px;border-radius:50%;background:${PRIMARY}}
  .af-chip.br{right:18px;bottom:6px;border-radius:16px;padding:10px 16px 10px 10px}
  .af-chip.br span:last-child{display:grid}.af-chip.br b{font-size:13px}.af-chip.br small{font-size:12px;font-weight:500;color:${NEUTRAL}}
  .af-tick{width:30px;height:30px;border-radius:50%;background:rgba(22,138,74,.12);color:#168A4A;display:grid;place-items:center}.af-tick svg{width:15px;height:15px}

  .ap-note b{color:${DEEP}}
  .af-two{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:48px 56px}
  .af-three{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:44px 40px}
  .af-g5{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:44px 40px}
  .af-g5>.af-g{grid-column:span 2}.af-g5>.af-g:nth-child(n+4){grid-column:span 3}
  .af-g{border-top:2px solid ${DEEP};padding-top:20px}
  .af-g-h{display:flex;align-items:center;gap:12px}
  .af-g-h h3{font-size:22px;line-height:1.2}
  .af-ic{width:38px;height:38px;border-radius:12px;background:${VIS};color:${PRIMARY};display:grid;place-items:center;flex-shrink:0}
  .af-ic svg{width:19px;height:19px}
  .af-tag{margin:10px 0 0;font-size:15.5px;line-height:1.5;color:${MUTED}}
  .af-bul{list-style:none;margin:16px 0 0;padding:0;display:grid}
  .af-bul li{display:flex;gap:11px;align-items:flex-start;padding:10px 0;border-top:1px solid ${LINE};font-size:15px;line-height:1.5;color:${INK}}
  .af-bul li:first-child{border-top:0}
  .af-bul svg{width:15px;height:15px;color:${PRIMARY};flex-shrink:0;margin-top:5px}
  .af-bul b{font-family:var(--font-display),system-ui,sans-serif;color:${DEEP};font-weight:600}
  .af-wrap{max-width:640px;margin:48px auto 0}
  .af-sub-h{text-align:center;margin-bottom:26px}.af-sub-h h3{font-size:24px}
  .af-steps{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:34px 40px}
  .af-steps li{padding-top:18px;border-top:2px solid ${DEEP};display:grid;gap:6px;align-content:start}
  .af-n{width:30px;height:30px;border-radius:50%;background:${PRIMARY};color:#fff;display:grid;place-items:center;font-family:var(--font-display),system-ui,sans-serif;font-weight:600;font-size:14px}
  .af-steps h3{font-size:19px;margin-top:6px!important}
  .af-steps p,.af-it p{margin:0;font-size:15px;line-height:1.55;color:${MUTED}}
  .af-grid4,.af-grid3,.af-grid5{display:grid;gap:40px 36px}
  .af-grid4{grid-template-columns:repeat(4,minmax(0,1fr))}
  .af-grid3{grid-template-columns:repeat(3,minmax(0,1fr))}
  .af-grid5{grid-template-columns:repeat(6,minmax(0,1fr))}
  .af-grid5>.af-it{grid-column:span 2}.af-grid5>.af-it:nth-child(n+4){grid-column:span 3}
  .af-it{padding-top:18px;border-top:1px solid ${LINE};display:grid;gap:8px;align-content:start;justify-items:start}
  .af-it h3{font-size:18.5px;line-height:1.25;margin-top:4px!important}
  .af-apps{display:flex;flex-wrap:wrap;gap:8px;margin-top:6px}
  .ap-sec .ap-note{max-width:1000px;margin-left:auto;margin-right:auto}

  .af-evi{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:64px;align-items:center}
  .af-evi-l{display:grid;margin-top:22px}
  .af-evi-i{display:grid;grid-template-columns:38px minmax(0,1fr);gap:14px;align-items:start;padding:14px 0;border-top:1px solid ${LINE}}
  .af-evi-i:last-child{border-bottom:1px solid ${LINE}}
  .af-evi-i span:last-child{display:grid;gap:2px}.af-evi-i b{font-family:var(--font-display),system-ui,sans-serif;font-size:16.5px;color:${DEEP}}.af-evi-i small{font-size:14.5px;line-height:1.5;color:${MUTED}}
  .af-ask{position:relative;padding:52px 0 52px 0}
  .af-ask .af-blob{left:14%;background:#F1E4C9;border-radius:40px 200px 40px 40px}
  .af-ask-in{position:relative;z-index:1;margin-right:12%;display:grid;gap:12px;padding:26px;border-radius:22px;background:#fff;box-shadow:0 34px 64px -34px rgba(30,45,34,.5),0 0 0 1px rgba(30,45,34,.07)}
  .af-ask-k{font-family:var(--font-display),system-ui,sans-serif;font-size:11.5px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:${PRIMARY}}
  .af-q{padding:12px 16px;border-radius:16px 16px 16px 4px;background:${BAND};font-size:15px;color:${INK}}
  .af-q:nth-of-type(even){border-radius:16px 16px 4px 16px;background:${MIST_SOFT};justify-self:end}
  .af-ask-s{margin:6px 0 0;padding-top:14px;border-top:1px solid ${LINE};font-size:13.5px;line-height:1.5;color:${MUTED}}
  .ap-close-c .ap-h2{font-size:46px}

  @media (max-width:1100px){.af-grid4{grid-template-columns:repeat(2,minmax(0,1fr))}.af-g5>.af-g,.af-g5>.af-g:nth-child(n+4){grid-column:span 3}.af-g5{grid-template-columns:repeat(6,minmax(0,1fr))}.af-g5>.af-g:last-child{grid-column:span 6}}
  @media (max-width:980px){
    .af-hero,.af-evi{grid-template-columns:minmax(0,1fr)}
    .af-hero{gap:40px;padding:36px 0 56px}.af-h1{font-size:38px}
    .af-two,.af-three,.af-steps,.af-grid3{grid-template-columns:repeat(2,minmax(0,1fr))}
    .af-grid5{grid-template-columns:repeat(2,minmax(0,1fr))}.af-grid5>.af-it,.af-grid5>.af-it:nth-child(n+4){grid-column:span 1}
    .af-ask{padding:40px 0}
  }
  @media (max-width:640px){
    .af-h1{font-size:33px}
    .af-vis{padding:26px 0 26px 14px}.af-chip.tl{display:none}
    .af-two,.af-three,.af-steps,.af-grid3,.af-grid4,.af-grid5{grid-template-columns:minmax(0,1fr)}
    .af-g5{grid-template-columns:minmax(0,1fr)}.af-g5>.af-g,.af-g5>.af-g:nth-child(n+4),.af-g5>.af-g:last-child{grid-column:span 1}
    .af-ask-in{margin-right:0;padding:18px}.af-ask .af-blob{left:8%}
    .ap-close-c .ap-h2{font-size:30px}
  }
`;
