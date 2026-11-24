"use client";

import { CrmV1Shell } from "./CrmV1Shell";
import { CrmV1Hero } from "./CrmV1Hero";
import { CrmV1Outcomes } from "./CrmV1Outcomes";
import { CrmV1Features } from "./CrmV1Features";
import { CrmV1Jobs } from "./CrmV1Jobs";
import { CrmV1Integrations } from "./CrmV1Integrations";
import { CrmV1Connected } from "./CrmV1Connected";
import { CrmV1Close } from "./CrmV1Close";

/* The CRM v1 home page: hero, outcomes, features, EVI jobs, integrations, works with EVOQ and the closing demo section. */
export function CrmV1Home() {
  return (
    <CrmV1Shell hero={<CrmV1Hero />}>
      <CrmV1Outcomes />
      <CrmV1Features />
      <CrmV1Jobs />
      <CrmV1Integrations />
      <CrmV1Connected />
      <CrmV1Close />
    </CrmV1Shell>
  );
}
