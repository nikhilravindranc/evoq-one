/* eslint-disable */
// @ts-nocheck
/*
 * EVOQ Billing behaviour (scroll reveal, sticky sub-menu, pop-up forms, billing-model tabs,
 * connector lines, pricing toggles, FAQ). Ported from the static site's billing.js.
 *
 * The original script ran once per full page load. Inside the app a page can mount and unmount
 * many times, so initBilling() returns a cleanup that removes every document/window listener
 * it added (through an AbortController).
 */
export function initBilling() {
  const ac = new AbortController();
  const patch = (target) => {
    const orig = target.addEventListener;
    target.addEventListener = function (type, fn, opts) {
      const o = typeof opts === "object" && opts ? opts : { capture: !!opts };
      return orig.call(this, type, fn, { ...o, signal: ac.signal });
    };
    return () => { delete target.addEventListener; };
  };
  const restore = [patch(document), patch(window)];
  try {
/*
 * EVOQ Billing — static page behaviour.
 *
 * Plain JavaScript, no dependencies. Every feature below is wired up through
 * data-* attributes in the HTML, so markup can be edited freely as long as
 * those attributes stay on the right elements. Nothing here talks to a server:
 * the forms only show their "thank you" state.
 *
 *   1. Scroll reveal ........ [data-reveal-group] / [data-reveal]
 *   2. Main header .......... desktop dropdowns, mobile drawer
 *   3. Billing sub-menu ..... sticks to the top once the page scrolls
 *   4. Modals ............... [data-open-modal="name"] opens [data-modal="name"]
 *   5. Billing models tabs .. [data-model-tab] / [data-model-panel]
 *   6. Connector diagram .... [data-connect-root] draws the dashed lines
 *   7. Pricing .............. Monthly/Yearly toggle, currency selector, prices
 *   8. FAQ accordion ........ [data-faq-item]
 */
(function () {
  "use strict";

  var $$ = function (sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  };
  var EASE = {
    smooth: "cubic-bezier(0.22, 1, 0.36, 1)", // the site's standard ease-out curve
    default: "cubic-bezier(0.25, 0.1, 0.25, 1)",
  };

  /* ------------------------------------------------------------------
   * 1. Scroll reveal
   *
   * A [data-reveal-group] starts animating once it scrolls into view.
   * Each [data-reveal] inside it fades up from `data-reveal-y` px below.
   * Group options (all optional):
   *   data-stagger="0.09"        seconds between consecutive items
   *   data-delay-children="0.05" seconds before the first item
   *   data-duration="0.58"       seconds per item
   *   data-ease="smooth|default"
   *   data-margin="-8%"          how far inside the viewport it must be
   *   data-amount="0.1"          fraction of the group that must be visible
   * An item may set its own data-reveal-delay (seconds) instead.
   * ------------------------------------------------------------------ */
  function initReveal() {
    var groups = $$("[data-reveal-group]");
    if (!groups.length) return;

    function play(group) {
      var stagger = parseFloat(group.dataset.stagger || "0");
      var first = parseFloat(group.dataset.delayChildren || "0");
      var duration = parseFloat(group.dataset.duration || "0.58");
      var ease = EASE[group.dataset.ease || "smooth"] || EASE.smooth;

      var items = $$("[data-reveal]", group).filter(function (el) {
        return el.closest("[data-reveal-group]") === group;
      });
      if (group.hasAttribute("data-reveal")) items.unshift(group);

      var delays = new Map();
      var index = 0;
      items.forEach(function (el) {
        var parent = el === group ? null : el.parentElement.closest("[data-reveal]");
        var nested = parent && parent !== group && group.contains(parent) && delays.has(parent);
        var delay;
        if (el.dataset.revealDelay != null) delay = parseFloat(el.dataset.revealDelay);
        else if (el === group) delay = 0;
        else if (nested) delay = delays.get(parent);
        else delay = first + index * stagger;
        if (!nested && el !== group) index++;
        delays.set(el, delay);

        el.style.setProperty("--reveal-duration", duration + "s");
        el.style.setProperty("--reveal-delay", delay + "s");
        el.style.setProperty("--reveal-ease", ease);
        el.classList.add("is-revealed");
        // Once finished, drop the reveal hooks so hover transitions behave normally.
        window.setTimeout(
          function () {
            el.removeAttribute("data-reveal");
            el.classList.remove("is-revealed");
            ["--reveal-duration", "--reveal-delay", "--reveal-ease", "--reveal-y"].forEach(function (p) {
              el.style.removeProperty(p);
            });
          },
          (delay + duration) * 1000 + 100,
        );
      });
    }

    if (!("IntersectionObserver" in window)) {
      groups.forEach(play);
      return;
    }
    groups.forEach(function (group) {
      var margin = group.dataset.margin || "0px";
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              io.disconnect();
              play(group);
            }
          });
        },
        { rootMargin: margin + " 0px " + margin + " 0px", threshold: parseFloat(group.dataset.amount || "0") },
      );
      io.observe(group);
    });
  }

  /* ------------------------------------------------------------------
   * 2. Main header
   * ------------------------------------------------------------------ */
  var CARET_ROTATE = function (btn, open) {
    var caret = btn.querySelector("[data-caret]");
    if (caret) caret.style.transform = open ? "rotate(180deg)" : "rotate(0deg)";
  };
  var X_ICON =
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"></path></svg>';

  function initHeader() {
    var header = document.querySelector("[data-site-header]");
    if (!header) return;

    /* Desktop dropdowns (Products / Solutions). One open at a time. */
    var navItems = $$("[data-nav-item]", header);
    function setNavOpen(item, open) {
      var btn = item.querySelector("[data-nav-toggle]");
      var menu = item.querySelector("[data-nav-menu]");
      menu.hidden = !open;
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      CARET_ROTATE(btn, open);
      var dot = btn.querySelector("[data-nav-dot]");
      if (open) {
        btn.setAttribute("data-nav-open", "true");
        btn.classList.add("bg-[#4747E0]", "shadow-[0_4px_14px_-4px_rgba(0,0,153,0.5)]");
        btn.dataset.closedColor = btn.style.color;
        btn.style.color = "";
        if (!dot) {
          dot = document.createElement("span");
          dot.className = "inline-block h-1.5 w-1.5 rounded-full bg-[#BDBDFF]";
          dot.setAttribute("data-nav-dot", "");
          btn.insertBefore(dot, btn.firstChild);
        }
      } else {
        btn.removeAttribute("data-nav-open");
        btn.classList.remove("bg-[#4747E0]", "shadow-[0_4px_14px_-4px_rgba(0,0,153,0.5)]");
        if (btn.dataset.closedColor) btn.style.color = btn.dataset.closedColor;
        if (dot) dot.remove();
        // Collapse any nested group so the menu reopens in its initial state.
        $$("[data-nested-list]", menu).forEach(function (l) {
          setNested(l.closest("li"), false);
        });
      }
    }
    function closeAllNav(except) {
      navItems.forEach(function (it) {
        if (it !== except && !it.querySelector("[data-nav-menu]").hidden) setNavOpen(it, false);
      });
    }
    navItems.forEach(function (item) {
      item.querySelector("[data-nav-toggle]").addEventListener("click", function () {
        var open = item.querySelector("[data-nav-menu]").hidden;
        closeAllNav(item);
        setNavOpen(item, open);
      });
    });
    document.addEventListener("mousedown", function (e) {
      if (
        navItems.some(function (it) {
          return it.contains(e.target);
        })
      )
        return;
      closeAllNav(null);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeAllNav(null);
    });

    /* Nested rows inside a dropdown (e.g. Solutions -> Healthcare). */
    function setNested(li, open) {
      var list = li && li.querySelector("[data-nested-list]");
      if (!list) return;
      var btn = li.querySelector("[data-nested-toggle]");
      list.hidden = !open;
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", (open ? "Collapse " : "Expand ") + btn.dataset.label);
      CARET_ROTATE(btn, open);
    }
    $$("[data-nested-toggle]", header).forEach(function (btn) {
      var li = btn.closest("li");
      var siblings = function () {
        return $$("[data-nested-toggle]", li.parentElement).map(function (b) {
          return b.closest("li");
        });
      };
      li.addEventListener("mouseenter", function () {
        siblings().forEach(function (other) {
          setNested(other, other === li);
        });
      });
      btn.addEventListener("click", function () {
        var open = li.querySelector("[data-nested-list]").hidden;
        siblings().forEach(function (other) {
          setNested(other, other === li && open);
        });
      });
    });

    /* Mobile drawer. */
    var burger = header.querySelector("[data-mobile-toggle]");
    var drawer = header.querySelector("[data-mobile-drawer]");
    if (burger && drawer) {
      var menuIcon = burger.innerHTML;
      var setDrawer = function (open) {
        drawer.hidden = !open;
        burger.setAttribute("aria-expanded", open ? "true" : "false");
        burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        burger.innerHTML = open ? X_ICON : menuIcon;
        if (!open)
          $$("[data-mobile-group]", drawer).forEach(function (g) {
            setGroup(g, false);
          });
      };
      burger.addEventListener("click", function () {
        setDrawer(drawer.hidden);
      });

      var setGroup = function (group, open) {
        var btn = group.querySelector("[data-mobile-group-toggle]");
        group.querySelector("[data-mobile-group-list]").hidden = !open;
        CARET_ROTATE(btn, open);
        if (!open)
          $$("[data-nested-list]", group).forEach(function (l) {
            setNested(l.closest("[data-nested-item]"), false);
          });
      };
      var groups = $$("[data-mobile-group]", drawer);
      groups.forEach(function (group) {
        group.querySelector("[data-mobile-group-toggle]").addEventListener("click", function () {
          var open = group.querySelector("[data-mobile-group-list]").hidden;
          groups.forEach(function (g) {
            setGroup(g, g === group && open);
          });
        });
      });
      $$("[data-mobile-nested-toggle]", drawer).forEach(function (btn) {
        var item = btn.closest("[data-nested-item]");
        btn.addEventListener("click", function () {
          var list = item.querySelector("[data-nested-list]");
          var open = list.hidden;
          list.hidden = !open;
          btn.setAttribute("aria-expanded", open ? "true" : "false");
          btn.setAttribute("aria-label", (open ? "Collapse " : "Expand ") + btn.dataset.label);
          CARET_ROTATE(btn, open);
        });
      });
      // Following a link or opening the Get Started form closes the drawer.
      $$("a, [data-open-modal]", drawer).forEach(function (el) {
        el.addEventListener("click", function () {
          setDrawer(false);
        });
      });
      // Mobile nested toggles reuse setNested via data-nested-item wrappers.
      setNested = (function (orig) {
        return function (li, open) {
          if (li && li.hasAttribute("data-nested-item")) {
            var list = li.querySelector("[data-nested-list]");
            var b = li.querySelector("[data-mobile-nested-toggle]");
            if (!list || !b) return;
            list.hidden = !open;
            b.setAttribute("aria-expanded", open ? "true" : "false");
            b.setAttribute("aria-label", (open ? "Collapse " : "Expand ") + b.dataset.label);
            CARET_ROTATE(b, open);
            return;
          }
          orig(li, open);
        };
      })(setNested);
    }
  }

  /* ------------------------------------------------------------------
   * 3. Billing sub-menu: sticky, then pinned with a shadow once scrolled.
   * ------------------------------------------------------------------ */
  function initSubmenu() {
    var bar = document.querySelector("[data-submenu]");
    if (!bar) return;
    var RESTING = ["sticky", "top-0", "border-b", "border-slate-200/80"];
    var PINNED = ["fixed", "top-0", "left-0", "right-0", "w-full", "shadow-[0_1px_12px_rgba(31,36,48,0.10)]"];
    var spacer = document.createElement("div");
    spacer.setAttribute("aria-hidden", "true");
    var pinned = false;
    function update() {
      var height = bar.offsetHeight;
      var next = window.scrollY > 16;
      if (next !== pinned) {
        pinned = next;
        if (pinned) {
          bar.classList.remove.apply(bar.classList, RESTING);
          bar.classList.add.apply(bar.classList, PINNED);
          spacer.style.height = height + "px";
          bar.parentNode.insertBefore(spacer, bar.nextSibling);
        } else {
          bar.classList.remove.apply(bar.classList, PINNED);
          bar.classList.add.apply(bar.classList, RESTING);
          spacer.remove();
        }
      } else if (pinned) {
        spacer.style.height = bar.offsetHeight + "px";
      }
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  /* ------------------------------------------------------------------
   * 4. Modals
   *   [data-open-modal="x"]  opens  [data-modal="x"]
   *   [data-modal-close]     closes the modal it sits in
   *   [data-modal-overlay]   clicking it (not its contents) closes
   *   [data-modal-switch="y"] closes this modal and opens modal y
   *   Inside: [data-view="form"] / [data-view="success"]
   * ------------------------------------------------------------------ */
  function initModals() {
    var openModal = null;

    function resetModal(modal) {
      $$("form", modal).forEach(function (f) {
        f.reset();
      });
      $$('[data-view="form"]', modal).forEach(function (v) {
        v.hidden = false;
      });
      $$('[data-view="success"]', modal).forEach(function (v) {
        v.hidden = true;
      });
      $$("[data-picker]", modal).forEach(resetPicker);
    }
    function open(name) {
      var modal = document.querySelector('[data-modal="' + name + '"]');
      if (!modal) return;
      if (openModal) close(openModal);
      resetModal(modal);
      modal.hidden = false;
      openModal = modal;
      document.body.style.overflow = "hidden";
    }
    function close(modal) {
      modal.hidden = true;
      if (openModal === modal) openModal = null;
      document.body.style.overflow = "";
    }

    document.addEventListener("click", function (e) {
      var opener = e.target.closest("[data-open-modal]");
      if (opener) {
        e.preventDefault();
        open(opener.getAttribute("data-open-modal"));
        return;
      }
      var sw = e.target.closest("[data-modal-switch]");
      if (sw) {
        open(sw.getAttribute("data-modal-switch"));
        return;
      }
      if (!openModal) return;
      if (e.target.closest("[data-modal-close]")) {
        close(openModal);
        return;
      }
      if (e.target.hasAttribute("data-modal-overlay")) close(openModal);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && openModal) close(openModal);
    });

    // Forms are front-end only: show the success view instead of sending anything.
    $$("[data-modal] form").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var modal = form.closest("[data-modal]");
        $$('[data-view="form"]', modal).forEach(function (v) {
          v.hidden = true;
        });
        $$('[data-view="success"]', modal).forEach(function (v) {
          v.hidden = false;
        });
      });
    });

    /* "Products of Interest" multi-select chips. */
    function chipStyle(chip, on, picker) {
      var accent = picker.dataset.accent;
      var border = picker.dataset.border;
      chip.setAttribute("aria-pressed", on ? "true" : "false");
      chip.style.border = "1px solid " + (on ? accent : border);
      chip.style.background = on ? accent : "#fff";
      chip.style.color = on ? "#fff" : "#1F2430";
    }
    function syncPicker(picker) {
      var chosen = $$("[data-chip]", picker)
        .filter(function (c) {
          return c.getAttribute("aria-pressed") === "true";
        })
        .map(function (c) {
          return c.textContent.trim();
        });
      var label = picker.querySelector("[data-picker-label]");
      label.textContent = chosen.length ? chosen.join(", ") : "Select products";
      label.style.color = chosen.length ? "#1F2430" : "#9BA8B7";
      var others = picker.querySelector("[data-picker-others]");
      if (others) {
        var show = chosen.indexOf("Others") !== -1;
        others.hidden = !show;
        if (!show) others.value = "";
      }
    }
    function setPickerOpen(picker, open) {
      picker.querySelector("[data-picker-list]").hidden = !open;
      CARET_ROTATE(picker.querySelector("[data-picker-toggle]"), open);
    }
    function resetPicker(picker) {
      $$("[data-chip]", picker).forEach(function (c) {
        chipStyle(c, false, picker);
      });
      setPickerOpen(picker, false);
      syncPicker(picker);
    }
    $$("[data-picker]").forEach(function (picker) {
      picker.querySelector("[data-picker-toggle]").addEventListener("click", function () {
        setPickerOpen(picker, picker.querySelector("[data-picker-list]").hidden);
      });
      $$("[data-chip]", picker).forEach(function (chip) {
        chip.addEventListener("click", function () {
          chipStyle(chip, chip.getAttribute("aria-pressed") !== "true", picker);
          syncPicker(picker);
          var others = picker.querySelector("[data-picker-others]");
          if (chip.textContent.trim() === "Others" && others && !others.hidden) others.focus();
        });
      });
      document.addEventListener("mousedown", function (e) {
        if (!picker.contains(e.target)) setPickerOpen(picker, false);
      });
    });
  }

  /* ------------------------------------------------------------------
   * 5. Billing models: clicking a scenario swaps the panel on the right.
   * ------------------------------------------------------------------ */
  function initModels() {
    $$("[data-models]").forEach(function (root) {
      var tabs = $$("[data-model-tab]", root);
      var grounds = $$("[data-model-ground]", root);
      var cards = $$("[data-model-card]", root);
      var floats = $$("[data-model-float]", root);
      var active = 0;
      var busy = null;

      function show(next) {
        if (next === active) return;
        var prev = active;
        active = next;
        tabs.forEach(function (t, i) {
          t.setAttribute("aria-pressed", i === next ? "true" : "false");
        });

        // Background: fade the old ground out, then the new one in (0.35s each).
        grounds[prev].style.transition = "opacity 0.35s " + EASE.smooth;
        grounds[prev].style.opacity = "0";
        // Card: exit upwards, then enter from below (0.3s each).
        var out = cards[prev];
        out.style.transition = "opacity 0.3s " + EASE.smooth + ", transform 0.3s " + EASE.smooth;
        out.style.opacity = "0";
        out.style.transform = "translateY(-14px)";
        if (floats[prev]) {
          floats[prev].style.transition = "opacity 0.3s " + EASE.smooth;
          floats[prev].style.opacity = "0";
        }

        window.clearTimeout(busy);
        busy = window.setTimeout(function () {
          cards.forEach(function (c, i) {
            if (i !== next) {
              c.hidden = true;
            }
          });
          grounds.forEach(function (g, i) {
            if (i !== next) g.style.opacity = "0";
          });
          floats.forEach(function (f, i) {
            if (i !== next) f.hidden = true;
          });
          if (floats[next]) {
            var f = floats[next];
            f.style.transition = "none";
            f.style.opacity = "0";
            f.hidden = false;
            void f.offsetWidth;
            f.style.transition = "opacity 0.35s " + EASE.smooth;
            f.style.opacity = "1";
          }
          var g = grounds[next];
          g.style.transition = "opacity 0.35s " + EASE.smooth;
          g.style.opacity = "1";
          var c = cards[next];
          c.style.transition = "none";
          c.style.opacity = "0";
          c.style.transform = "translateY(14px)";
          c.hidden = false;
          void c.offsetWidth; // restart the transition from the starting position
          c.style.transition = "opacity 0.3s " + EASE.smooth + ", transform 0.3s " + EASE.smooth;
          c.style.opacity = "1";
          c.style.transform = "none";
        }, 300);
      }
      tabs.forEach(function (tab, i) {
        tab.addEventListener("click", function () {
          show(i);
        });
      });
    });
  }

  /* ------------------------------------------------------------------
   * 6. Connector diagram (desktop only): dashed curves from each card to
   *    the hub, measured from the real rendered positions.
   * ------------------------------------------------------------------ */
  function initConnectors() {
    var LG = 1024;
    var COLOR = "#87CEFA";
    $$("[data-connect-root]").forEach(function (root) {
      var svg = null;
      function measure() {
        if (svg) {
          svg.remove();
          svg = null;
        }
        if (window.innerWidth < LG) return;
        var hub = root.querySelector("[data-connect-hub]");
        var circle = root.querySelector("[data-connect-hub-circle]");
        if (!hub || !circle) return;
        var c = root.getBoundingClientRect();
        var h = hub.getBoundingClientRect();
        var ci = circle.getBoundingClientRect();
        var hubY = ci.top + ci.height / 2 - c.top;
        var hubL = h.left - c.left;
        var hubR = h.right - c.left;
        var paths = [];
        $$("[data-connect-left]", root).forEach(function (el) {
          var r = el.getBoundingClientRect();
          var x = r.right - c.left,
            y = r.top + r.height / 2 - c.top,
            mid = (x + hubL) / 2;
          paths.push({
            d: "M " + x + "," + y + " C " + mid + "," + y + " " + mid + "," + hubY + " " + hubL + "," + hubY,
            x: x,
            y: y,
          });
        });
        $$("[data-connect-right]", root).forEach(function (el) {
          var r = el.getBoundingClientRect();
          var x = r.left - c.left,
            y = r.top + r.height / 2 - c.top,
            mid = (hubR + x) / 2;
          paths.push({
            d: "M " + hubR + "," + hubY + " C " + mid + "," + hubY + " " + mid + "," + y + " " + x + "," + y,
            x: x,
            y: y,
          });
        });
        if (!paths.length) return;
        var NS = "http://www.w3.org/2000/svg";
        svg = document.createElementNS(NS, "svg");
        svg.setAttribute("aria-hidden", "true");
        svg.setAttribute("class", "pointer-events-none absolute inset-0 hidden lg:block");
        svg.setAttribute("width", c.width);
        svg.setAttribute("height", c.height);
        svg.setAttribute("viewBox", "0 0 " + c.width + " " + c.height);
        paths.forEach(function (p) {
          var g = document.createElementNS(NS, "g");
          var path = document.createElementNS(NS, "path");
          path.setAttribute("d", p.d);
          path.setAttribute("stroke", COLOR);
          path.setAttribute("stroke-width", "1.8");
          path.setAttribute("stroke-dasharray", "4 3");
          path.setAttribute("fill", "none");
          var dot = document.createElementNS(NS, "circle");
          dot.setAttribute("cx", p.x);
          dot.setAttribute("cy", p.y);
          dot.setAttribute("r", "2.5");
          dot.setAttribute("fill", COLOR);
          g.appendChild(path);
          g.appendChild(dot);
          svg.appendChild(g);
        });
        // First in the container so it paints behind the cards and hub.
        root.insertBefore(svg, root.firstChild);
      }
      measure();
      if ("ResizeObserver" in window) new ResizeObserver(measure).observe(root);
      window.addEventListener("resize", measure);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
      // The reveal animation moves the diagram; re-measure once it settles.
      window.setTimeout(measure, 1500);
    });
  }

  /* ------------------------------------------------------------------
   * 7. Pricing: Monthly/Yearly + Rupees/Dollars, shared by the plan cards
   *    and the additional-user table.
   *      [data-price] data-inr / data-usd / data-inr-annual / data-usd-annual
   *      [data-cost]  data-inr / data-usd (falls back to its original text)
   * ------------------------------------------------------------------ */
  var RUPEE_ICON =
    '<svg xmlns="http://www.w3.org/2000/svg" width="0.78em" height="0.78em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-indian-rupee relative -top-[0.02em] -mr-[0.14em] inline-block align-baseline" aria-hidden="true"><path d="M6 3h12"></path><path d="M6 8h12"></path><path d="m6 13 8.5 8"></path><path d="M6 13h3"></path><path d="M9 13c6.667 0 6.667-10 0-10"></path></svg>';
  function escapeHtml(s) {
    return s.replace(/[&<>"]/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch];
    });
  }

  function initPricing() {
    var state = { region: "india", cycle: "monthly" };
    var PRIMARY = "var(--billing-primary, #00AB88)";
    var ACTION = "var(--billing-action, #2F695D)";
    var DEPTH = "var(--billing-depth, #0E342C)";

    function render() {
      var annual = state.cycle === "annual";
      $$("[data-price]").forEach(function (el) {
        var d = el.dataset;
        var price = state.region === "india" ? (annual && d.inrAnnual) || d.inr : (annual && d.usdAnnual) || d.usd;
        if (!price) return;
        el.innerHTML = price.charAt(0) === "₹" ? RUPEE_ICON + escapeHtml(price.slice(1)) : escapeHtml(price);
      });
      $$("[data-cost]").forEach(function (el) {
        if (el.dataset.fallback == null) el.dataset.fallback = el.textContent;
        var v = state.region === "india" ? el.dataset.inr : el.dataset.usd;
        el.textContent = v || el.dataset.fallback;
      });
      $$("[data-cycle]").forEach(function (btn) {
        var on = btn.dataset.cycle === state.cycle;
        btn.setAttribute("aria-pressed", on ? "true" : "false");
        btn.style.background = on ? PRIMARY : "";
        btn.style.color = on ? "#FFFFFF" : ACTION;
        var badge = btn.querySelector("[data-cycle-badge]");
        if (badge) badge.style.color = on ? "rgba(255,255,255,0.9)" : PRIMARY;
      });
      $$("[data-currency]").forEach(function (sel) {
        var opt = sel.querySelector('[data-currency-option="' + state.region + '"]');
        sel.querySelector("[data-currency-label]").textContent = opt.dataset.label;
        sel.querySelector("[data-currency-symbol]").textContent = opt.dataset.symbol;
        $$("[data-currency-option]", sel).forEach(function (o) {
          var on = o === opt;
          o.setAttribute("aria-selected", on ? "true" : "false");
          o.style.background = on ? "rgba(0,171,136,0.1)" : "transparent";
          o.querySelector("[data-currency-name]").style.color = on ? PRIMARY : DEPTH;
        });
      });
    }

    $$("[data-cycle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.cycle = btn.dataset.cycle;
        render();
      });
    });
    $$("[data-currency]").forEach(function (sel) {
      var toggle = sel.querySelector("[data-currency-toggle]");
      var list = sel.querySelector("[data-currency-list]");
      var setOpen = function (open) {
        list.hidden = !open;
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        toggle.querySelector("[data-caret]").classList.toggle("rotate-180", open);
      };
      toggle.addEventListener("click", function () {
        setOpen(list.hidden);
      });
      sel.addEventListener("focusout", function (e) {
        if (!sel.contains(e.relatedTarget)) setOpen(false);
      });
      $$("[data-currency-option]", sel).forEach(function (o) {
        o.addEventListener("click", function () {
          state.region = o.dataset.currencyOption;
          setOpen(false);
          render();
        });
      });
    });
    if (document.querySelector("[data-price], [data-cost]")) render();
  }

  /* ------------------------------------------------------------------
   * 8. FAQ accordion: each question opens independently.
   * ------------------------------------------------------------------ */
  function initFaq() {
    $$("[data-faq-item]").forEach(function (item) {
      var btn = item.querySelector("[data-faq-toggle]");
      var answer = item.querySelector("[data-faq-answer]");
      var icon = item.querySelector("[data-faq-icon]");
      var vertical = icon.querySelector("[data-faq-icon-vertical]");
      btn.addEventListener("click", function () {
        var open = answer.hidden;
        answer.hidden = !open;
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        icon.style.background = open ? "var(--billing-primary, #00AB88)" : "rgba(0,171,136,0.14)";
        icon.style.color = open ? "#FFFFFF" : "var(--billing-primary, #00AB88)";
        if (vertical) vertical.style.display = open ? "none" : "";
      });
    });
  }

  function init() {
    initReveal();
    initHeader();
    initSubmenu();
    initModals();
    initModels();
    initConnectors();
    initPricing();
    initFaq();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

  } finally {
    restore.forEach((r) => r());
  }
  return () => ac.abort();
}
