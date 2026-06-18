// src/utils/caseStudies/types.ts
//
// One content module per case study. Keeps narrative content (which is
// long-form and won't fit the thin index.json schema used by the project
// grid) separate from layout. The grid card stays a teaser; this is the
// deep version someone reaches by clicking through.

export interface LifecycleStep {
  id: string;
  label: string;            // "Rider requests a ride"
  owningService: string;    // "Rider Service" -- which Spring Boot service owns this step
  detail: string;           // one sentence: what actually happens here
  isFailurePoint?: boolean; // true if a wrong boundary decision here caused a real bug
}

export interface BoundaryDecision {
  question: string;         // "Why is matching a separate service from booking?"
  decision: string;         // the actual choice you made, stated plainly
  reasoning: string;        // why, in terms of what would break otherwise
  tradeoff: string;         // honest cost of this choice -- extra hop, eventual consistency, etc.
}

export interface FailureScenario {
  title: string;            // "Fare calculated before trip end was recorded"
  whatHappened: string;     // concrete, specific -- not hypothetical hand-waving
  rootCause: string;        // which boundary was drawn wrong
  fix: string;              // what changed as a result
}

export interface CaseStudyContent {
  slug: string;             // matches the project id in index.json
  hero: {
    claim: string;          // one sentence, stated as an argument not a description
    subhead: string;
  };
  lifecycle: LifecycleStep[];
  decisions: BoundaryDecision[];
  failures: FailureScenario[];
  stack: { category: string; items: string[] }[];
  links: { repo: string | null; deploy: string | null };
}