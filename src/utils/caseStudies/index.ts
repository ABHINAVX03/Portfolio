// src/utils/caseStudies/index.ts
//
// Registry mapping a project's slug (matches the "id" field in
// src/utils/projects/index.json) to its case-study content module.
//
// Adding a second case study later: write a new file in this folder
// shaped like uber-ride-platform.ts, then add one line here. The page
// component and every other file in this folder never need to change.

import { CaseStudyContent } from "./types";
import { uberRidePlatform } from "./uber-ride-platform";
import { portfolioPlatform } from "./portfolio-platform";
import { experienceSystem } from "./experience-system";
import { cpsync } from "./cpsync";
import { distributedReservationSystem } from "./distributed-reservation-system";

export const caseStudyRegistry: Record<string, CaseStudyContent> = {
  "uber-ride-platform": uberRidePlatform,
  "portfolio-platform": portfolioPlatform,
  "experience-system": experienceSystem,
  cpsync,
  "distributed-reservation-system": distributedReservationSystem,
};