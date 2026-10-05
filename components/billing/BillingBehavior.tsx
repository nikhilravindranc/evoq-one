"use client";

import { useEffect } from "react";
import { initBilling } from "./billing-behavior";

/** Wires up the Billing pages' interactions (reveal animations, tabs, pricing toggles, FAQ, pop-ups). */
export function BillingBehavior() {
  useEffect(() => {
    document.documentElement.classList.add("js");
    const cleanup = initBilling();
    return () => {
      cleanup();
      document.documentElement.classList.remove("js");
      document.body.style.overflow = "";
    };
  }, []);
  return null;
}
