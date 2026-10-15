/*
 * Static-site configuration.
 *
 * leadEndpoint: URL that receives lead-form submissions as a JSON POST
 *   (e.g. a Formspree / Getform / Basin endpoint, or your own API).
 *   While it is empty, forms cannot be submitted: they show their normal error
 *   state plus a notice with the message below, and nothing is sent or saved.
 *
 * noEndpointMessage: text shown when someone submits a form and no endpoint is set.
 */
window.EVOQ_STATIC_CONFIG = {
  leadEndpoint: "",
  noEndpointMessage: "This is an offline copy of the website, so forms can't be submitted. Please email sales@evoq.com instead.",
};
