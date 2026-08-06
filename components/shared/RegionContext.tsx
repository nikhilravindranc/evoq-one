"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

export type Region = "India" | "USA";

type RegionContextValue = {
  region: Region;
  setRegion: (r: Region) => void;
};

const RegionContext = createContext<RegionContextValue | null>(null);

const STORAGE_KEY = "evoq-region";

export function RegionProvider({ children }: { children: React.ReactNode }) {
  const [region, setRegionState] = useState<Region>("India");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Region | null;
      if (stored === "India" || stored === "USA") {
        setRegionState(stored);
        return;
      }
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      if (!tz.includes("Kolkata") && !tz.includes("Calcutta")) setRegionState("USA");
    } catch {
      // keep default
    }
  }, []);

  const setRegion = useCallback((r: Region) => {
    setRegionState(r);
    try {
      window.localStorage.setItem(STORAGE_KEY, r);
    } catch {
      // ignore
    }
  }, []);

  return <RegionContext.Provider value={{ region, setRegion }}>{children}</RegionContext.Provider>;
}

export function useRegion() {
  const ctx = useContext(RegionContext);
  if (!ctx) throw new Error("useRegion must be used within a RegionProvider");
  return ctx;
}
