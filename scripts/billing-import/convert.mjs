// Converts the static EVOQ Billing HTML pages into JSX components.
// Usage: node scripts/billing-import/convert.mjs <index.html> <ComponentName> <out.tsx>
//
// Only the page content is converted: the Billing sub-menu, every section, and the pop-up
// forms. The main site header and footer are dropped (the app provides its own Topbar and Footer).
import fs from "node:fs";

const [, , input, name, output] = process.argv;
const html = fs.readFileSync(input, "utf8");

/* ------------------------------------------------------------------ slice */
const bodyStart = html.indexOf("<body>") + 6;
const bodyEnd = html.lastIndexOf("</body>");
let body = html.slice(bodyStart, bodyEnd);
// strip the wrapper div (first element in body) and keep its inside
const wrapperOpenEnd = body.indexOf(">", body.indexOf("data-theme=")) + 1;
const wrapperClose = body.lastIndexOf("</div>");
const inside = body.slice(wrapperOpenEnd, wrapperClose);

const subMenu = inside.indexOf("<!-- ============ Billing sub-menu");
const footerStart = inside.indexOf("<footer");
const footerEnd = inside.indexOf("</footer>") + "</footer>".length;
if (subMenu < 0 || footerStart < 0) throw new Error("markers not found");
const content = inside.slice(subMenu, footerStart) + inside.slice(footerEnd);

/* -------------------------------------------------------------- tokenizer */
const VOID = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);
const BOOL = new Set(["hidden", "disabled", "required", "checked", "selected", "readonly", "open", "autofocus", "multiple", "defer", "async", "controls", "loop", "muted", "playsinline", "novalidate", "inert"]);
const RENAME = {
  class: "className", for: "htmlFor", tabindex: "tabIndex", colspan: "colSpan", rowspan: "rowSpan", maxlength: "maxLength",
  minlength: "minLength", autocomplete: "autoComplete", autofocus: "autoFocus", readonly: "readOnly", srcset: "srcSet",
  crossorigin: "crossOrigin", fetchpriority: "fetchPriority", novalidate: "noValidate", datetime: "dateTime", inputmode: "inputMode",
  enctype: "encType", playsinline: "playsInline", frameborder: "frameBorder", allowfullscreen: "allowFullScreen",
  "xlink:href": "xlinkHref", "xml:space": "xmlSpace", "xmlns:xlink": "xmlnsXlink", referrerpolicy: "referrerPolicy", contenteditable: "contentEditable",
  spellcheck: "spellCheck", accesskey: "accessKey", usemap: "useMap", cellpadding: "cellPadding", cellspacing: "cellSpacing",
};

function decode(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(parseInt(d, 10)))
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}

function tokenize(src) {
  const out = [];
  let i = 0;
  while (i < src.length) {
    if (src.startsWith("<!--", i)) {
      const e = src.indexOf("-->", i);
      out.push({ t: "comment", v: src.slice(i + 4, e) });
      i = e + 3;
    } else if (src[i] === "<" && /[a-zA-Z]/.test(src[i + 1] || "")) {
      // opening tag: scan to the closing > honouring quotes
      let j = i + 1, q = null;
      while (j < src.length) {
        const c = src[j];
        if (q) { if (c === q) q = null; }
        else if (c === '"' || c === "'") q = c;
        else if (c === ">") break;
        j++;
      }
      const raw = src.slice(i + 1, j);
      const selfClose = raw.endsWith("/");
      const m = raw.match(/^([a-zA-Z][\w:-]*)([\s\S]*?)\/?$/);
      out.push({ t: "open", tag: m[1], attrs: parseAttrs(m[2]), selfClose });
      i = j + 1;
    } else if (src.startsWith("</", i)) {
      const e = src.indexOf(">", i);
      out.push({ t: "close", tag: src.slice(i + 2, e).trim() });
      i = e + 1;
    } else {
      let j = i;
      while (j < src.length && src[j] !== "<") j++;
      // a stray "<" not starting a tag is plain text
      if (j === i) j = i + 1;
      out.push({ t: "text", v: src.slice(i, j) });
      i = j;
    }
  }
  return out;
}

function parseAttrs(s) {
  const attrs = [];
  const re = /([^\s=/>"']+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;
  let m;
  while ((m = re.exec(s))) {
    const val = m[2] ?? m[3] ?? m[4];
    attrs.push([m[1], val === undefined ? null : val]);
  }
  return attrs;
}

/* ------------------------------------------------------------------ build */
function parse(tokens) {
  const root = { children: [] };
  const stack = [root];
  for (const tk of tokens) {
    const top = stack[stack.length - 1];
    if (tk.t === "open") {
      const node = { tag: tk.tag, attrs: tk.attrs, children: [] };
      top.children.push(node);
      if (!VOID.has(tk.tag.toLowerCase()) && !tk.selfClose) stack.push(node);
    } else if (tk.t === "close") {
      // pop to the matching open
      for (let k = stack.length - 1; k > 0; k--) {
        if (stack[k].tag === tk.tag) { stack.length = k; break; }
      }
    } else {
      top.children.push(tk);
    }
  }
  return root;
}

const camel = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

function styleToObject(css) {
  const decls = [];
  let cur = "", depth = 0, q = null;
  for (const ch of css) {
    if (q) { cur += ch; if (ch === q) q = null; continue; }
    if (ch === '"' || ch === "'") { q = ch; cur += ch; continue; }
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (ch === ";" && depth === 0) { decls.push(cur); cur = ""; } else cur += ch;
  }
  if (cur.trim()) decls.push(cur);
  const parts = [];
  for (const d of decls) {
    const k = d.indexOf(":");
    if (k < 0) continue;
    const prop = d.slice(0, k).trim();
    const value = d.slice(k + 1).trim();
    if (!prop) continue;
    const key = prop.startsWith("--") ? JSON.stringify(prop) : camel(prop.replace(/^-ms-/, "ms-").replace(/^-webkit-/, "Webkit-"));
    parts.push(`${key}: ${JSON.stringify(value)}`);
  }
  const hasVar = decls.some((d) => d.trim().startsWith("--"));
  return `{{ ${parts.join(", ")} }${hasVar ? " as React.CSSProperties" : ""}}`;
}

function rewriteUrl(v) {
  v = v.replace(/^assets\/images\//, "/billing/images/");
  v = v.replace(/^index\.html(#.*)?$/, (_, h) => "/billing" + (h || ""));
  v = v.replace(/^features\.html(#.*)?$/, (_, h) => "/billing/features" + (h || ""));
  v = v.replace(/^pricing\.html(#.*)?$/, (_, h) => "/billing/pricing" + (h || ""));
  return v;
}

function attrToJsx(tag, [rawName, rawVal]) {
  const lower = rawName.toLowerCase();
  let name = RENAME[lower] ?? rawName;
  if (!RENAME[lower] && name.includes("-") && !name.startsWith("data-") && !name.startsWith("aria-")) name = camel(name);
  if (!RENAME[lower] && name.includes(":")) name = camel(name.replace(":", "-"));

  if (rawVal === null) return BOOL.has(lower) ? name : `${name}`;
  if (rawVal === "" && BOOL.has(lower)) return name;

  let val = decode(rawVal);
  if (lower === "style") return `style=${styleToObject(val)}`;
  if (lower === "src" || lower === "href") val = rewriteUrl(val);
  if (lower === "value" && ["input", "textarea", "select", "option"].includes(tag)) {
    if (tag !== "option") name = "defaultValue";
  }
  if (lower === "checked") name = "defaultChecked";
  if (["colSpan", "rowSpan", "rows", "cols", "maxLength", "minLength", "tabIndex", "size", "span"].includes(name) && /^-?\d+$/.test(val)) return `${name}={${val}}`;
  if (/^[^"{}\\\n<>&]*$/.test(val)) return `${name}="${val}"`;
  return `${name}={${JSON.stringify(val)}}`;
}

function textToJsx(text, prevIsEl, nextIsEl, atStart, atEnd) {
  const decoded = decode(text);
  const collapsed = decoded.replace(/[ \t\r\n\f]+/g, " ");
  if (collapsed.trim() === "") {
    // whitespace-only: keep a single space only when it sits between two inline siblings on one line
    return !text.includes("\n") && prevIsEl && nextIsEl ? `{" "}` : "";
  }
  const lead = /^\s/.test(decoded) && prevIsEl && !atStart;
  const trail = /\s$/.test(decoded) && nextIsEl && !atEnd;
  const core = collapsed.trim();
  const safe = /[{}<>]/.test(core) ? `{${JSON.stringify(core)}}` : core.replace(/&/g, "&amp;");
  return (lead ? `{" "}` : "") + safe + (trail ? `{" "}` : "");
}

function emit(node, indent) {
  const pad = "  ".repeat(indent);
  if (node.t === "comment") return `${pad}{/* ${node.v.trim().replace(/\*\//g, "* /")} */}\n`;
  if (node.t === "text") return "";
  const tag = node.tag;
  const attrs = node.attrs.map((a) => attrToJsx(tag.toLowerCase(), a));
  const open = `<${tag}${attrs.length ? " " + attrs.join(" ") : ""}`;
  if (VOID.has(tag.toLowerCase()) || (node.children.length === 0 && /^(path|circle|rect|line|polyline|polygon|ellipse|stop|use)$/i.test(tag))) {
    return `${pad}${open} />\n`;
  }
  const kids = node.children;
  let inner = "";
  kids.forEach((k, idx) => {
    if (k.t === "text") {
      const prevIsEl = idx > 0 && kids[idx - 1].tag !== undefined;
      const nextIsEl = idx < kids.length - 1 && kids[idx + 1].tag !== undefined;
      const s = textToJsx(k.v, prevIsEl, nextIsEl, idx === 0, idx === kids.length - 1);
      if (s) inner += `${pad}  ${s}\n`;
    } else inner += emit(k, indent + 1);
  });
  if (!inner.trim()) return `${pad}${open}></${tag}>\n`;
  return `${pad}${open}>\n${inner}${pad}</${tag}>\n`;
}

const tree = parse(tokenize(content));

// React wants the chosen option on <select defaultValue>, not selected on <option>
(function fixSelects(node) {
  if (!node.children) return;
  if (node.tag === "select") {
    const opts = node.children.filter((c) => c.tag === "option");
    const sel = opts.find((o) => o.attrs.some(([n]) => n === "selected"));
    if (sel) {
      const v = sel.attrs.find(([n]) => n === "value");
      const text = sel.children.filter((c) => c.t === "text").map((c) => c.v).join("").trim();
      node.attrs.push(["value", v ? v[1] : text]);
    }
    opts.forEach((o) => (o.attrs = o.attrs.filter(([n]) => n !== "selected")));
  }
  node.children.forEach(fixSelects);
})(tree);
let jsx = "";
for (const c of tree.children) jsx += emit(c, 3);

const file = `/* eslint-disable */
// Generated by scripts/billing-import/convert.mjs from the static Billing HTML. Edit the HTML source and re-run, or edit this file directly.
export function ${name}() {
  return (
    <>
${jsx}    </>
  );
}
`;
fs.writeFileSync(output, file);
console.log("wrote", output, `${(file.length / 1024).toFixed(0)} KB`);
