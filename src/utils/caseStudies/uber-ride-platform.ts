// src/utils/caseStudies/uber-ride-platform.ts
//
// Content for the flagship project's case-study page. This is the file
// that's actually worth your time -- the page component just renders
// whatever shape this returns, but the substance (does this prove you
// can reason about service boundaries) lives here.
//
// NOTE: the placeholders below (marked with [FILL IN]) need your real
// specifics. I've drafted realistic structure and wording based on what's
// already in your flagship card and project description, but I don't know
// your actual implementation details -- whether you genuinely separated
// matching from booking as distinct services, what really broke during
// development, etc. Replace placeholders with what actually happened.
// A case study that overclaims architecture you didn't build is worse
// than no case study -- a technical interviewer will ask "walk me through
// this" and the gap will show immediately.

import { CaseStudyContent } from "./types";

export const uberRidePlatform: CaseStudyContent = {
  slug: "uber-ride-platform",

  hero: {
    claim:
      "A ride only works if four things that don't trust each other -- rider, driver, trip, fare -- agree on what happened, in order, without any one of them blocking the rest.",
    subhead:
      "Backend for a ride-hailing platform: rider onboarding, driver matching, trip booking, and fare calculation as Spring Boot services with explicit boundaries.",
  },

  lifecycle: [
    {
      id: "request",
      label: "Rider requests a ride",
      owningService: "Rider Service",
      detail:
        "[FILL IN: does this validate the rider's account state -- e.g. no outstanding unpaid fare -- before even looking for a driver? If so, say that here; it's a real boundary decision.]",
    },
    {
      id: "match",
      label: "System finds an available driver",
      owningService: "Matching Service",
      detail:
        "[FILL IN: what's the actual matching logic? Nearest available driver? First-accept? This is the step most worth being specific about, since 'driver matching' is in your tags list but the case study currently doesn't say HOW.]",
    },
    {
      id: "accept",
      label: "Driver accepts the trip",
      owningService: "Matching Service → Trip Service handoff",
      detail:
        "[FILL IN: this is likely your most interesting boundary. Does Matching Service own the trip record the instant a driver accepts, or does ownership transfer to a separate Trip Service? That handoff point is exactly the kind of thing this page should make legible.]",
      isFailurePoint: true,
    },
    {
      id: "trip",
      label: "Trip is in progress",
      owningService: "Trip Service",
      detail:
        "[FILL IN: what state does Trip Service track during the ride itself -- status only, or location/route too?]",
    },
    {
      id: "fare",
      label: "Fare is calculated",
      owningService: "Fare Service",
      detail:
        "Fare calculation reads the completed trip record rather than the original request, so a fare is always computed from what actually happened on the road, not what was originally requested.",
      isFailurePoint: true,
    },
    {
      id: "settle",
      label: "Fare is settled",
      owningService: "Fare Service",
      detail:
        "[FILL IN: does this close the loop back to Rider Service, e.g. updating the rider's payment/account state? If there's no payment integration yet, say so plainly -- 'fare is calculated and recorded; payment settlement is the next service boundary to design' is an honest, still-impressive answer.]",
    },
  ],

  decisions: [
    {
      question: "Why is driver matching a separate service from trip booking?",
      decision:
        "[FILL IN: state plainly whether you actually built these as separate Spring Boot services/modules, or separate controllers within one service, or separate logical layers within one controller. Be exact -- 'service' implies independent deployability, which is a much stronger claim than 'separate class.']",
      reasoning:
        "[FILL IN: the real reason. Likely candidate: matching is a search/optimization problem that might need to retry or time out independently of booking, so coupling them would mean a slow match search blocks the booking flow even for rides that already matched fine.]",
      tradeoff:
        "[FILL IN: the honest cost. Likely candidate: an extra network hop or method call between match-found and booking-confirmed, plus the need to handle 'driver matched but then declined' as its own state rather than just retrying inline.]",
    },
    {
      question: "Why does fare calculation read the trip record instead of the original request?",
      decision:
        "Fare Service depends on Trip Service's completed record, not on the Rider Service's original ride request.",
      reasoning:
        "A requested ride and the ride that actually happened can differ -- route changes, wait time, a cancelled-and-restarted trip. Calculating fare from the request would price the ride that was asked for, not the ride that occurred.",
      tradeoff:
        "Fare can only be calculated after Trip Service marks a trip complete, which means there's a window where a trip has ended in the real world but the system hasn't yet produced a fare. [FILL IN: how is that window actually handled -- polling, an event, a status field the frontend checks?]",
    },
  ],

  failures: [
    {
      title: "[FILL IN: a real one]",
      whatHappened:
        "[This is the most valuable section on the whole page IF it's true and specific. A genuine 'I initially had X own Y, and that caused Z, so I moved the boundary' story is worth more than every other section combined, because it's the one thing a templated portfolio can't fake. If nothing like this happened yet because the project is still in-progress (your index.json marks it in-progress), it's completely fine to leave this section out entirely rather than inventing one -- see the page component notes on conditional rendering.]",
      rootCause: "[FILL IN]",
      fix: "[FILL IN]",
    },
  ],

  stack: [
    { category: "Backend", items: ["Java", "Spring Boot", "REST APIs", "OOP"] },
    { category: "Infra", items: ["Docker"] },
    // [FILL IN: add a Database row once you confirm what this project
    // actually persists to -- your index.json doesn't list one for this
    // project, unlike hospital-management which lists PostgreSQL. If
    // ride/trip state is in-memory or not yet persisted, that's worth
    // stating directly rather than omitting silently.]
  ],

  links: {
    repo: "https://github.com/ABHINAVX03/Book_Karo-backend-Spring-boot-",
    deploy: "https://book-car-frontend.vercel.app",
  },
};