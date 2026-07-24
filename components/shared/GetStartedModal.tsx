"use client";

import { useEffect, useRef, useState } from "react";

const PRODUCTS = [
  "CRM",
  "Campaigns",
  "ServiceOps",
  "Desk",
  "Projects",
  "Sync",
  "HRMS",
  "Payroll",
  "HRMS Plus",
  "Skillberry",
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 10,
  border: "1px solid #E6EAF0",
  fontFamily: "var(--font-sans)",
  fontSize: 14,
  color: "#1F2430",
  background: "#fff",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-sans)",
  fontSize: 11.5,
  fontWeight: 700,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  color: "#5F6B7A",
  marginBottom: 8,
};

export function GetStartedModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [othersText, setOthersText] = useState("");
  const [productsOpen, setProductsOpen] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);

  const toggleProduct = (name: string) => {
    setSelectedProducts((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]
    );
  };
  const othersSelected = selectedProducts.includes("Others");

  useEffect(() => {
    if (!productsOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (productsRef.current && !productsRef.current.contains(e.target as Node))
        setProductsOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [productsOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
      setSelectedProducts([]);
      setOthersText("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(20,22,32,0.55)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 560,
          maxHeight: "90vh",
          overflowY: "auto",
          background: "#fff",
          borderRadius: 20,
          boxShadow: "0 40px 80px -20px rgba(15,18,28,0.45)",
          padding: "32px 36px 28px",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 24,
            right: 24,
            width: 36,
            height: 36,
            borderRadius: 10,
            border: "1px solid #E6EAF0",
            background: "#fff",
            color: "#5F6B7A",
            fontSize: 16,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ×
        </button>

        {submitted ? (
          <div style={{ padding: "40px 8px 24px", textAlign: "center" }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "var(--interactive)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                margin: "0 auto 20px",
              }}
            >
              ✓
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 22,
                fontWeight: 700,
                color: "#1F2430",
                margin: "0 0 8px",
              }}
            >
              You&apos;re all set
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 14.5,
                color: "#5F6B7A",
                margin: 0,
              }}
            >
              A member of our team will reach out shortly to schedule your walkthrough.
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--interactive)",
                marginBottom: 6,
              }}
            >
              EVOQ
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 26,
                fontWeight: 700,
                color: "#1F2430",
                margin: "0 0 6px",
                letterSpacing: "-0.01em",
              }}
            >
              Get Started
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 14.5,
                color: "#5F6B7A",
                margin: 0,
              }}
            >
              Tell us about your business.
            </p>

            <div style={{ height: 1, background: "#EDEFF3", margin: "22px 0" }} />

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>
                  Name <span style={{ color: "var(--interactive)" }}>*</span>
                </label>
                <input required type="text" placeholder="Jane Smith" style={inputStyle} />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>
                  Company <span style={{ color: "var(--interactive)" }}>*</span>
                </label>
                <input required type="text" placeholder="Acme Corporation" style={inputStyle} />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                  marginBottom: 20,
                }}
              >
                <div>
                  <label style={labelStyle}>
                    Work Email <span style={{ color: "var(--interactive)" }}>*</span>
                  </label>
                  <input required type="email" placeholder="jane@company.com" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Phone</label>
                  <input type="tel" placeholder="+1 (555) 000-0000" style={inputStyle} />
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Team Size</label>
                <select
                  defaultValue=""
                  style={{ ...inputStyle, cursor: "pointer", color: "#1F2430" }}
                >
                  <option value="" disabled>
                    Select range
                  </option>
                  <option value="1-10">1–10</option>
                  <option value="11-50">11–50</option>
                  <option value="51-200">51–200</option>
                  <option value="201-500">201–500</option>
                  <option value="500+">500+</option>
                </select>
              </div>

              <div style={{ marginBottom: 8 }} ref={productsRef}>
                <label style={labelStyle}>Products of Interest</label>
                <div style={{ position: "relative" }}>
                  <button
                    type="button"
                    onClick={() => setProductsOpen((o) => !o)}
                    style={{
                      ...inputStyle,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 8,
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        color: selectedProducts.length ? "#1F2430" : "#9BA8B7",
                      }}
                    >
                      {selectedProducts.length
                        ? selectedProducts.join(", ")
                        : "Select products"}
                    </span>
                    <span
                      style={{
                        flexShrink: 0,
                        transition: "transform 0.15s",
                        transform: productsOpen ? "rotate(180deg)" : "rotate(0deg)",
                        color: "#9BA8B7",
                        fontSize: 11,
                      }}
                    >
                      ▼
                    </span>
                  </button>

                  {productsOpen && (
                    <div
                      style={{
                        marginTop: 8,
                        background: "#fff",
                        border: "1px solid #E6EAF0",
                        borderRadius: 10,
                        padding: "14px 16px",
                        maxHeight: 220,
                        overflowY: "auto",
                      }}
                    >
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {PRODUCTS.map((item) => {
                          const active = selectedProducts.includes(item);
                          return (
                            <button
                              key={item}
                              type="button"
                              onClick={() => toggleProduct(item)}
                              aria-pressed={active}
                              style={{
                                padding: "7px 14px",
                                borderRadius: 999,
                                border: active
                                  ? "1px solid var(--interactive)"
                                  : "1px solid #E6EAF0",
                                background: active ? "var(--interactive)" : "#fff",
                                color: active ? "#fff" : "#1F2430",
                                fontFamily: "var(--font-sans)",
                                fontSize: 13,
                                fontWeight: 600,
                                cursor: "pointer",
                                transition: "background 0.12s, border-color 0.12s, color 0.12s",
                              }}
                            >
                              {item}
                            </button>
                          );
                        })}
                        <button
                          type="button"
                          onClick={() => toggleProduct("Others")}
                          aria-pressed={othersSelected}
                          style={{
                            padding: "7px 14px",
                            borderRadius: 999,
                            border: othersSelected
                              ? "1px solid var(--interactive)"
                              : "1px solid #E6EAF0",
                            background: othersSelected ? "var(--interactive)" : "#fff",
                            color: othersSelected ? "#fff" : "#1F2430",
                            fontFamily: "var(--font-sans)",
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "background 0.12s, border-color 0.12s, color 0.12s",
                          }}
                        >
                          Others
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {othersSelected && (
                  <input
                    type="text"
                    autoFocus
                    value={othersText}
                    onChange={(e) => setOthersText(e.target.value)}
                    placeholder="Tell us what you're looking for"
                    style={{ ...inputStyle, marginTop: 10 }}
                  />
                )}
              </div>

              <div style={{ height: 1, background: "#EDEFF3", margin: "20px 0 18px" }} />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 12.5,
                    color: "var(--interactive)",
                  }}
                >
                  * Required fields
                </span>
                <div style={{ display: "flex", gap: 10 }}>
                  <button
                    type="button"
                    onClick={onClose}
                    style={{
                      padding: "11px 20px",
                      borderRadius: 10,
                      border: "1px solid #E6EAF0",
                      background: "#fff",
                      color: "#1F2430",
                      fontFamily: "var(--font-sans)",
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "11px 22px",
                      borderRadius: 10,
                      border: 0,
                      background: "var(--interactive)",
                      color: "#fff",
                      fontFamily: "var(--font-sans)",
                      fontSize: 14,
                      fontWeight: 700,
                      cursor: "pointer",
                      boxShadow: "0 8px 24px -8px rgba(71,71,224,0.5)",
                    }}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
