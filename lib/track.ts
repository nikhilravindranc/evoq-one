/* Conversion tracking. No analytics provider is installed yet, so events are
   pushed onto window.dataLayer (picked up by Google Tag Manager / GA4 once a
   container is added) and re-dispatched as an "evoq:track" DOM event for any
   other listener. Calls are safe on the server and when nothing listens. */

type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function track(event: string, props: Props = {}) {
  if (typeof window === "undefined") return;
  const payload = { event, ...props };
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);
  window.dispatchEvent(new CustomEvent("evoq:track", { detail: payload }));
}

const here = () => (typeof window === "undefined" ? undefined : window.location.pathname);

/* CTA clicks: `cta` names the button, `location` the section it sits in. */
export const trackCta = (cta: string, location: string) => track("cta_click", { cta, location, page_path: here() });

/* Non-identifying context sent with a lead. Never pass a name, email, phone number or free text. */
export type LeadDetails = { source?: string; product?: string; industry?: string; org_type?: string };

let lastLead = { form: "", at: 0 };

/* One enquiry, one event. Call it only when the enquiry is actually accepted (after validation passes), never on a bare
   button click. `form` names the form ("contact", "get_started", "enquiry_modal", ...). A repeat of the same form within
   two seconds, such as a double click, is ignored. */
export function trackLead(form: string, details: LeadDetails = {}) {
  const now = Date.now();
  if (lastLead.form === form && now - lastLead.at < 2000) return;
  lastLead = { form, at: now };
  track("lead_submitted", { form, ...details, page_path: here() });
}
