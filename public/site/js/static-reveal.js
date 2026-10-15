/*
 * Entrance animations for the static export.
 * Page content is visible in the HTML itself. Only when the browser can run the site's
 * animation code does this restore the animations' starting state (css/static-reveal.css);
 * the site's own scripts then animate each section in as it scrolls into view.
 * If the app has not started 3 seconds after load (scripts blocked or failed), the starting
 * state is removed again so nothing stays hidden. Printing is handled in the stylesheet.
 */
(function () {
  "use strict";
  var root = document.documentElement;
  if (!("IntersectionObserver" in window)) return;
  root.classList.add("evoq-anim");
  window.addEventListener("load", function () {
    setTimeout(function () { if (!window.next) root.classList.remove("evoq-anim"); }, 3000);
  });
})();
