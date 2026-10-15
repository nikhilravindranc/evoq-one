/*
 * EVOQ static-site shim.
 * Loaded before the page bundles. Replaces the server-dependent parts of the
 * original Next.js + Payload app so the site works as plain files: from any
 * folder, on any static host, or opened directly from disk (file://).
 */
(function () {
  "use strict";

  // Firefox gives pages opened from disk (file://) the origin "null"; the app builds URLs with
  // new URL(path, origin), which needs a valid base (the bundles use this, see origin-patch.mjs).
  window.__evoqOrigin = location.origin && location.origin !== "null" ? location.origin : "file://";

  var cfg = window.EVOQ_STATIC_CONFIG || {};
  var ROUTES = window.__EVOQ_ROUTES || {};          // "/billing/features" -> "billing-features.html"
  var ALIASES = window.__EVOQ_ALIASES || {};        // moved URLs: "/billing" -> "products-billing.html"
  var MISSING = window.__EVOQ_MISSING_ROUTES || [];
  var FILES = {};                                   // "billing-features.html" -> "/billing/features"
  for (var r in ROUTES) if (Object.prototype.hasOwnProperty.call(ROUTES, r)) FILES[ROUTES[r]] = r;
  var has = function (o, k) { return Object.prototype.hasOwnProperty.call(o, k); };

  // ---------------------------------------------------------------- current page
  function currentFile() {
    var seg = window.location.pathname.split("/").pop() || "index.html";
    try { seg = decodeURIComponent(seg); } catch (e) {}
    if (!/\.html?$/i.test(seg)) seg += ".html";     // hosts with extensionless "clean" URLs
    return seg;
  }
  var CURRENT_FILE = currentFile();
  // The app reads this through usePathname(), so pathname-based UI matches the original route.
  window.__EVOQ_ROUTE = has(FILES, CURRENT_FILE) ? FILES[CURRENT_FILE] : null;

  // ------------------------------------------------------------- route mapping
  // Resolve an href (original route, page file, or absolute URL) to { file, rest }.
  function resolve(href) {
    if (!href) return null;
    href = String(href);
    if (/^(#|mailto:|tel:|sms:|javascript:|data:|blob:)/i.test(href)) return null;
    var m = href.match(/^([^?#]*)(.*)$/);
    var p = m[1], rest = m[2];
    if (/^[a-z][a-z0-9+.\-]*:/i.test(p) || p.indexOf("//") === 0) {
      var u;
      try { u = new URL(href, window.location.href); } catch (e) { return null; }
      if (u.protocol !== "file:" && u.origin !== window.location.origin) return null;
      p = u.pathname; rest = u.search + u.hash;
      // On Windows, "/billing" resolved against file:///C:/site/page.html keeps the drive: /C:/billing
      if (u.protocol === "file:") p = p.replace(/^\/[A-Za-z]:(?=\/)/, "");
    }
    if (!p) return null;
    if (p.charAt(0) === "/") {
      var route = p.length > 1 ? p.replace(/\/+$/, "") : p;
      if (has(ROUTES, route)) return { file: ROUTES[route], rest: rest };
      if (has(ALIASES, route)) return { file: ALIASES[route], rest: rest };
      if (MISSING.indexOf(route) >= 0) return { file: "404.html", rest: "" };
    }
    var name = p.split("/").pop();
    try { name = decodeURIComponent(name); } catch (e) {}
    if (has(FILES, name) || name === "404.html") return { file: name, rest: rest };
    return null;
  }
  function toFileHref(href) {
    var d = resolve(href);
    return d ? d.file + d.rest : href;
  }
  window.__evoqHref = toFileHref;                   // used by bundles for window.location.href = ...

  // Links rendered after load (menus, modals) still carry original routes: point them at files.
  function fixAnchor(a) {
    var h = a.getAttribute("href");
    if (!h || h.charAt(0) !== "/" || h.charAt(1) === "/") return;
    var v = toFileHref(h);
    if (v !== h) a.setAttribute("href", v);
  }
  function fixTree(node) {
    if (!node || node.nodeType !== 1) return;
    if (node.tagName === "A") fixAnchor(node);
    if (node.querySelectorAll) {
      var list = node.querySelectorAll('a[href^="/"]');
      for (var i = 0; i < list.length; i++) fixAnchor(list[i]);
    }
  }
  if (window.MutationObserver) {
    new MutationObserver(function (records) {
      for (var i = 0; i < records.length; i++) {
        var rec = records[i];
        if (rec.type === "attributes") fixTree(rec.target);
        else for (var j = 0; j < rec.addedNodes.length; j++) fixTree(rec.addedNodes[j]);
      }
    }).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ["href"] });
  }
  document.addEventListener("DOMContentLoaded", function () { fixTree(document.body); });

  // Same-page links ("/billing#pricing" while on billing.html): scroll here instead of letting
  // the app router try to fetch the page from a server. Click handlers still run, and one that
  // calls preventDefault() (e.g. opens a modal) still cancels the navigation.
  window.addEventListener("click", function (e) {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
    if (!a || a.hasAttribute("download")) return;
    var target = a.getAttribute("target");
    if (target && target !== "_self") return;
    var href = a.getAttribute("href");
    if (!href || href.charAt(0) === "#") return;
    var d = resolve(href);
    if (!d || d.file !== CURRENT_FILE) return;
    var hashAt = d.rest.indexOf("#");
    var query = hashAt >= 0 ? d.rest.slice(0, hashAt) : d.rest;
    var hash = hashAt >= 0 ? d.rest.slice(hashAt) : "";
    if (query && query !== window.location.search) return;

    Event.prototype.preventDefault.call(e);
    var cancelled = false;
    e.preventDefault = function () { cancelled = true; };
    setTimeout(function () {
      if (cancelled) return;
      if (!hash) { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
      if (window.location.hash !== hash) { window.location.hash = hash; return; }
      var el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 0);
  }, true);

  // --------------------------------------------------------------------- fetch
  var nativeFetch = window.fetch;
  if (!nativeFetch) return;

  function header(h, name) {
    if (!h) return null;
    if (typeof h.get === "function") return h.get(name);
    for (var k in h) if (has(h, k) && k.toLowerCase() === name.toLowerCase()) return h[k];
    return null;
  }
  function jsonResponse(body, status) {
    return new Response(JSON.stringify(body), { status: status, headers: { "Content-Type": "application/json" } });
  }

  var noticeTimer;
  function showNotice(text) {
    var box = document.getElementById("evoq-static-notice");
    if (!box) {
      box = document.createElement("div");
      box.id = "evoq-static-notice";
      box.setAttribute("role", "alert");
      box.style.cssText = "position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:2147483647;" +
        "max-width:min(560px,calc(100vw - 32px));padding:14px 18px;border-radius:12px;background:#1F2430;color:#fff;" +
        "font:500 14px/1.5 system-ui,-apple-system,'Segoe UI',sans-serif;box-shadow:0 12px 32px rgba(0,0,0,.25)";
      document.body.appendChild(box);
    }
    box.textContent = text;
    box.style.display = "block";
    clearTimeout(noticeTimer);
    noticeTimer = setTimeout(function () { box.style.display = "none"; }, 9000);
  }

  window.fetch = function (input, init) {
    var url = typeof input === "string" ? input : (input && input.url) || String(input);
    var u;
    try { u = new URL(url, window.location.href); } catch (e) { return nativeFetch.apply(this, arguments); }
    var headers = (init && init.headers) || (input && input.headers);

    // Next.js app-router page requests (navigation + prefetch) need a server. Answer with a
    // non-RSC response whose url is the page file: the router then does a normal page load.
    if (header(headers, "RSC") === "1" || u.searchParams.has("_rsc")) {
      var d = resolve(u.href);
      var dest = new URL((d ? d.file : "404.html") + u.hash, window.location.href).href;
      var res = new Response(null, { status: 204 });
      try { Object.defineProperty(res, "url", { value: dest }); } catch (e) {}
      return Promise.resolve(res);
    }

    // Pages HEAD-check optional videos and fall back to artwork when one is absent. The set
    // of files is fixed in a static export, so answer locally (no request; works on file://).
    var method = String((init && init.method) || (input && input.method) || "GET").toUpperCase();
    var videoMatch = u.pathname.match(/\/(images\/[^\/]+\.(?:mp4|webm|mov))$/i);
    if (method === "HEAD" && videoMatch && (u.protocol === "file:" || u.origin === window.location.origin)) {
      var name = videoMatch[1];
      try { name = decodeURIComponent(name); } catch (e) {}
      var present = (window.__EVOQ_LOCAL_VIDEOS || []).indexOf(name) >= 0;
      return Promise.resolve(new Response(null, { status: present ? 200 : 404 }));
    }

    // Lead forms POST to /api/leads, a server route that no longer exists.
    if (/\/api\/leads\/?$/.test(u.pathname) && String((init && init.method) || "GET").toUpperCase() === "POST") {
      if (cfg.leadEndpoint) {
        return nativeFetch(cfg.leadEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: init.body,
        }).catch(function () {
          return jsonResponse({ errors: [{ message: "Submission failed. Please try again." }] }, 502);
        });
      }
      var msg = cfg.noEndpointMessage ||
        "This is an offline copy of the website, so forms can't be submitted. Please email sales@evoq.com instead.";
      showNotice(msg);
      return Promise.resolve(jsonResponse({ errors: [{ message: msg }] }, 503));
    }
    return nativeFetch.apply(this, arguments);
  };
})();
