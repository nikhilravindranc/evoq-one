"use client";

import { useMemo, useRef, useState } from "react";
import { Eyebrow } from "@/components/sections/shared";
import {
  CATEGORIES,
  CATEGORY_INK,
  INTEGRATIONS,
  PRODUCTS,
  PRODUCT_INK,
  PRODUCT_LABEL,
  blurbFor,
  integrationSupportsProduct,
  type CategoryKey,
  type Integration,
  type ProductKey,
} from "./data";

const PAGE_SIZE = 12;

// Short form used on each card's category line -- CATEGORIES carries the
// full label used in the sidebar ("Accounting & Finance"), this is the
// tighter one-or-two-word version that fits a 312px card without wrapping.
const CATEGORY_SHORT: Record<CategoryKey, string> = {
  all: "All",
  "accounting-finance": "Accounting",
  "commerce-payments": "Commerce",
  communication: "Communication",
  "erp-business": "ERP",
  marketing: "Marketing",
  productivity: "Productivity",
  "shipping-logistics": "Shipping",
  "customer-data": "Customer Data",
  other: "Other",
};

function initials(name: string) {
  const words = name.split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

function IntegrationLetterMark({ integration }: { integration: Integration }) {
  const ink = CATEGORY_INK[integration.categories[0]];
  return (
    <span
      className="ig-card-mark"
      style={{
        background: `${ink}1F`,
        color: ink,
        border: `1px solid ${ink}33`,
      }}
      aria-hidden="true"
    >
      {initials(integration.name)}
    </span>
  );
}

// Sidebar radio-style option, shared by both filter groups.
function FilterOption({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={`ig-filter-opt${active ? " active" : ""}`}
      onClick={onClick}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}

function getPageNumbers(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set<number>([1, total, current, current - 1, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out: (number | "…")[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - (sorted[i - 1] as number) > 1) out.push("…");
    out.push(p);
  });
  return out;
}

// Ring of EVOQ product marks orbiting the wordmark, standing in for the
// "logos around EVOQ" ecosystem visual -- real third-party integration
// logos aren't available as local assets, and EVOQ's own suite is the
// one set of marks we can draw accurately and on-brand.
const ORBIT_NODES: { key: ProductKey; x: number; y: number }[] = [
  { key: "crm", x: 350, y: 200 },
  { key: "campaigns", x: 306, y: 94 },
  { key: "hrms", x: 200, y: 50 },
  { key: "sync", x: 94, y: 94 },
  { key: "inventory", x: 50, y: 200 },
  { key: "billing", x: 94, y: 306 },
  { key: "serviceops", x: 200, y: 350 },
  { key: "desk", x: 306, y: 306 },
];

function EcosystemOrbit() {
  return (
    <svg viewBox="0 0 400 400" className="ig-orbit" aria-hidden="true">
      {ORBIT_NODES.map((n) => (
        <line
          key={`l-${n.key}`}
          x1="200"
          y1="200"
          x2={n.x}
          y2={n.y}
          stroke="rgba(31,36,48,0.1)"
          strokeWidth="1.5"
          strokeDasharray="3 5"
        />
      ))}
      <circle cx="200" cy="200" r="52" fill="#FFFFFF" stroke="rgba(31,36,48,0.06)" strokeWidth="1" />
      <circle cx="200" cy="200" r="52" fill="none" stroke="#4747E0" strokeWidth="2" opacity="0.15" />
      <text x="200" y="207" textAnchor="middle" fontFamily="var(--display)" fontWeight="800" fontSize="22" fill="#000099">
        E
      </text>
      {ORBIT_NODES.map((n) => (
        <g key={n.key}>
          <circle cx={n.x} cy={n.y} r="26" fill="#FFFFFF" stroke="rgba(31,36,48,0.06)" />
          <circle cx={n.x} cy={n.y} r="26" fill={PRODUCT_INK[n.key]} opacity="0.14" />
          <text
            x={n.x}
            y={n.y + 4.5}
            textAnchor="middle"
            fontFamily="var(--sans)"
            fontWeight="700"
            fontSize="11"
            fill={PRODUCT_INK[n.key]}
          >
            {PRODUCT_LABEL[n.key].slice(0, 2).toUpperCase()}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function IntegrationsPage() {
  const [heroQuery, setHeroQuery] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryKey>("all");
  const [product, setProduct] = useState<ProductKey | "all">("crm");
  const [page, setPage] = useState(1);

  const directoryRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return INTEGRATIONS.filter(
      (i) =>
        integrationSupportsProduct(i, product) &&
        (category === "all" || i.categories.includes(category)) &&
        (q === "" || i.name.toLowerCase().includes(q))
    );
  }, [query, category, product]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const clampedPage = Math.min(page, pageCount);
  const pageStart = (clampedPage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(pageStart, pageStart + PAGE_SIZE);

  function selectCategory(k: CategoryKey) {
    setCategory(k);
    setPage(1);
  }
  function selectProduct(k: ProductKey | "all") {
    setProduct(k);
    setPage(1);
  }
  function goToPage(p: number) {
    setPage(Math.min(Math.max(p, 1), pageCount));
    directoryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function submitHeroSearch(e: React.FormEvent) {
    e.preventDefault();
    setQuery(heroQuery);
    setPage(1);
    directoryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    searchInputRef.current?.focus();
  }

  const productLabel = product === "all" ? "All products" : PRODUCT_LABEL[product];
  const categoryLabel = CATEGORIES.find((c) => c.key === category)?.label ?? "All";

  return (
    <>
      {/* ── Hero ── */}
      <section className="ig-hero">
        <div className="ig-hero-inner">
          <div className="ig-hero-copy">
            <Eyebrow>Integrations</Eyebrow>
            <h1 className="evoq-h2">
              Connect EVOQ with the tools <span className="accent">you use</span>
            </h1>
            <p className="evoq-sub">
              Connect your EVOQ apps with the business systems, platforms, and services
              your teams already rely on.
            </p>
            <form className="ig-hero-search" onSubmit={submitHeroSearch}>
              <SearchIcon />
              <input
                type="text"
                value={heroQuery}
                onChange={(e) => setHeroQuery(e.target.value)}
                placeholder="Search integrations"
                aria-label="Search integrations"
              />
              <button type="submit">Search</button>
            </form>
          </div>
          <div className="ig-hero-visual" aria-hidden="true">
            <EcosystemOrbit />
          </div>
        </div>
      </section>

      {/* ── Directory ── */}
      <section className="ig-directory" ref={directoryRef}>
        <div className="ig-directory-inner">
          <aside className="ig-sidebar">
            <div className="ig-filter-group">
              <h6>Categories</h6>
              <div className="ig-filter-list">
                {CATEGORIES.map((c) => (
                  <FilterOption key={c.key} active={category === c.key} onClick={() => selectCategory(c.key)}>
                    {c.label}
                  </FilterOption>
                ))}
              </div>
            </div>

            <div className="ig-filter-group">
              <h6>EVOQ product</h6>
              <div className="ig-filter-list">
                {PRODUCTS.map((p) => (
                  <FilterOption key={p.key} active={product === p.key} onClick={() => selectProduct(p.key)}>
                    {p.label}
                  </FilterOption>
                ))}
                <FilterOption active={product === "all"} onClick={() => selectProduct("all")}>
                  All products
                </FilterOption>
              </div>
            </div>
          </aside>

          <div className="ig-results">
            <div className="ig-results-head">
              <h2 className="ig-results-title">{productLabel} integrations</h2>
              <div className="ig-results-search">
                <SearchIcon />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search integrations..."
                  aria-label="Search integrations"
                />
              </div>
            </div>

            <div className="ig-results-status">
              <span>
                Integrations for {productLabel}
                {category !== "all" ? ` + ${categoryLabel}` : ""}
              </span>
              <span className="ig-results-count">
                {filtered.length} integration{filtered.length === 1 ? "" : "s"}
              </span>
            </div>

            {pageItems.length > 0 ? (
              <div className="ig-grid">
                {pageItems.map((i) => (
                  <article className="ig-card" key={i.slug}>
                    <IntegrationLetterMark integration={i} />
                    <div className="ig-card-name">{i.name}</div>
                    <div className="ig-card-category">
                      {i.categories.map((c) => CATEGORY_SHORT[c]).join(" & ")}
                    </div>
                    <p className="ig-card-blurb">{blurbFor(i, product)}</p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="ig-empty">
                No integrations match this filter yet. Try a different category or product.
              </div>
            )}

            {pageCount > 1 && (
              <nav className="ig-pagination" aria-label="Pagination">
                <button
                  type="button"
                  className="ig-page-nav"
                  onClick={() => goToPage(clampedPage - 1)}
                  disabled={clampedPage === 1}
                >
                  <ChevronLeftIcon /> Previous
                </button>
                <div className="ig-page-numbers">
                  {getPageNumbers(clampedPage, pageCount).map((p, idx) =>
                    p === "…" ? (
                      <span key={`e-${idx}`} className="ig-page-ellipsis">…</span>
                    ) : (
                      <button
                        key={p}
                        type="button"
                        className={`ig-page-num${p === clampedPage ? " active" : ""}`}
                        onClick={() => goToPage(p)}
                        aria-current={p === clampedPage ? "page" : undefined}
                      >
                        {p}
                      </button>
                    )
                  )}
                </div>
                <button
                  type="button"
                  className="ig-page-nav"
                  onClick={() => goToPage(clampedPage + 1)}
                  disabled={clampedPage === pageCount}
                >
                  Next <ChevronRightIcon />
                </button>
              </nav>
            )}

            {filtered.length > 0 && (
              <div className="ig-showing">
                Showing {pageStart + 1}–{Math.min(pageStart + PAGE_SIZE, filtered.length)} of {filtered.length}{" "}
                integration{filtered.length === 1 ? "" : "s"}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function ChevronLeftIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ChevronRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
