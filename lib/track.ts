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

/* CTA clicks: `cta` names the button, `location` the section it sits in. */
export const trackCta = (cta: string, location: string) => track("cta_click", { cta, location });
