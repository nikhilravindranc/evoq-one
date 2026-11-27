"use client";

import { CrmShell } from "./CrmShell";
import { CrmHero } from "./CrmHero";
import { CrmOutcomes } from "./CrmOutcomes";
import { CrmFeatures } from "./CrmFeatures";
import { CrmJobs } from "./CrmJobs";
import { CrmIntegrations } from "./CrmIntegrations";
import { CrmConnected } from "./CrmConnected";
import { CrmClose } from "./CrmClose";

/* The CRM home page: hero, features, outcomes, EVI jobs, integrations, works with EVOQ and the closing demo section. */
export function CrmHome() {
  return (
    <CrmShell hero={<CrmHero />}>
      <CrmFeatures />
      <CrmOutcomes />
      <CrmJobs />
      <CrmIntegrations />
      <CrmConnected />
      <CrmClose />
    </CrmShell>
  );
}
