// src/utils/caseStudies/uber-ride-platform.ts

import { CaseStudyContent } from "./types";

export const uberRidePlatform: CaseStudyContent = {
  slug: "uber-ride-platform",

  hero: {
    claim:
      "A ride only works if four things that don't trust each other — rider, driver, trip, fare — agree on what happened, in order, without any one of them blocking the rest.",
    subhead:
      "Backend for a ride-hailing platform: rider onboarding, driver matching, trip booking, and fare calculation as Spring Boot services with explicit boundaries.",
  },

  lifecycle: [
    {
      id: "request",
      label: "Rider requests a ride",
      owningService: "Rider Service",
      detail:
        "Rider Service validates the account is active and has no unpaid outstanding fare before the request is forwarded. A rider with an unsettled balance is rejected at this step — not at payment — so the matching pipeline never runs for an unqualified request.",
    },
    {
      id: "match",
      label: "System finds an available driver",
      owningService: "Matching Service",
      detail:
        "Matching Service queries the driver pool for drivers marked AVAILABLE within a proximity radius of the pickup point. It selects the nearest available driver by straight-line distance. If no driver is found within the radius, the request fails fast rather than queuing indefinitely.",
    },
    {
      id: "accept",
      label: "Driver accepts the trip",
      owningService: "Matching Service → Trip Service handoff",
      detail:
        "When a driver accepts, Matching Service atomically flips the driver's status to ON_TRIP and hands ownership of the ride to Trip Service by creating a new Trip record with status ACCEPTED. From this point Matching Service has no further role — Trip Service owns the ride lifecycle.",
      isFailurePoint: true,
    },
    {
      id: "trip",
      label: "Trip is in progress",
      owningService: "Trip Service",
      detail:
        "Trip Service tracks trip status through ACCEPTED → STARTED → ENDED. It records start time on driver pickup confirmation and end time on drop-off confirmation. Route and location data are not stored — only the status transitions and timestamps needed for fare calculation.",
    },
    {
      id: "fare",
      label: "Fare is calculated",
      owningService: "Fare Service",
      detail:
        "Fare Service reads the completed Trip record — specifically the start and end timestamps and the pickup/dropoff coordinates stored at booking time — and applies a per-km + per-minute rate. It only runs after Trip Service marks the trip ENDED, ensuring fare is computed from what actually happened.",
      isFailurePoint: true,
    },
    {
      id: "settle",
      label: "Fare is recorded and rider balance updated",
      owningService: "Fare Service → Rider Service",
      detail:
        "After calculating the fare, Fare Service persists the fare record and notifies Rider Service to update the rider's outstanding-balance field. This closes the loop: a rider cannot request a new ride until that balance is cleared, which is checked at step one of the next request.",
    },
  ],

  decisions: [
    {
      question: "Why is driver matching a separate service from trip booking?",
      decision:
        "Matching and Trip are separate Spring Boot service layers with their own controllers, service classes, and data responsibilities. Matching Service owns driver availability; Trip Service owns ride lifecycle. They communicate via a direct service call at the handoff point.",
      reasoning:
        "Matching is a search problem — it may need to retry, time out, or fan out to multiple driver queries before finding a result. If matching logic lived inside the trip booking layer, a slow or failed search would block the booking flow even for rides that could otherwise proceed. Keeping them separate means matching can fail and retry without leaving a half-created trip record behind.",
      tradeoff:
        "The handoff between Matching and Trip is a synchronous call, which means if Trip Service is slow to create the ride record, the driver sees a delayed confirmation. An event-driven handoff (Matching publishes a 'driver accepted' event, Trip consumes it) would decouple this but adds a message broker to the stack — a complexity tradeoff not worth it at this scale.",
    },
    {
      question: "Why does fare calculation read the trip record instead of the original request?",
      decision:
        "Fare Service depends only on the completed Trip record. It has no direct dependency on the original booking request or on Rider Service.",
      reasoning:
        "A requested ride and the ride that actually happened can differ — the driver might take a longer route, the trip might be cancelled and restarted, or the end time might differ significantly from an estimated duration. Calculating fare from the original request would price what was asked for, not what occurred. Reading from the Trip record means fare always reflects reality.",
      tradeoff:
        "Fare can only be calculated after Trip Service marks a trip ENDED, which creates a short window where a trip has ended in the real world but no fare exists yet. The frontend polls the fare endpoint after receiving a trip-ended confirmation; if the fare isn't ready within a timeout, it displays a 'calculating fare' state. This eventual-consistency window is acceptable given that the alternative (synchronous fare calculation at trip end) would block the trip-end confirmation response.",
    },
    {
      question: "Why does Rider Service own the outstanding-balance check instead of Fare Service?",
      decision:
        "Rider Service is the gatekeeper for all ride requests. It checks outstanding balance as part of rider eligibility, not as part of fare processing.",
      reasoning:
        "If fare enforcement lived in Fare Service, a rider could successfully request a new ride while an unpaid fare was still being processed — the two services would have a race condition. Placing the check in Rider Service at request time ensures that eligibility is always evaluated against a consistent, settled state before any downstream work begins.",
      tradeoff:
        "Rider Service needs to know about fare records to do this check, which means it either calls Fare Service or reads a balance field that Fare Service updates. The current design has Fare Service write back to Rider Service after each fare settlement, which creates a coupling point. A cleaner approach would be an event — Fare Service emits 'fare settled', Rider Service updates balance — but again this requires a message broker.",
    },
  ],

  failures: [
    {
      title: "Driver marked ON_TRIP before Trip record existed",
      whatHappened:
        "In an early version, Matching Service flipped the driver's status to ON_TRIP immediately when the driver accepted, then called Trip Service to create the trip record. If the Trip Service call failed (database timeout, validation error), the driver was stuck with ON_TRIP status and no actual trip — invisible to the matching pool and unable to receive new requests until manually reset.",
      rootCause:
        "The boundary between Matching and Trip was wrong: Matching Service was making a state change (driver status) that should only happen as a consequence of a successful Trip creation, not as a precondition for it.",
      fix:
        "Reordered the sequence: Trip Service creates the trip record first and returns success, then Matching Service updates driver status. If Trip creation fails, driver status is never changed. The trip record is now the authoritative signal that a handoff occurred — driver status is a derived consequence, not an independent assertion.",
    },
    {
      title: "Fare calculated using request coordinates instead of actual trip coordinates",
      whatHappened:
        "Fare Service was reading pickup and dropoff coordinates from the original booking request payload rather than from the Trip record. For straightforward trips this produced correct results, but when a driver confirmed a different pickup point (common when the rider moved after booking), the fare was calculated from the wrong origin — sometimes significantly undercharging for longer actual routes.",
      rootCause:
        "Fare Service had an implicit dependency on the booking request shape, not just the Trip record. The boundary was leaky: Fare was reading data it should only get from Trip.",
      fix:
        "Trip Service was updated to record the actual confirmed pickup coordinates (from driver confirmation) rather than the originally requested coordinates. Fare Service now reads exclusively from the Trip record and has zero knowledge of the original booking request.",
    },
  ],

  stack: [
    { category: "Backend", items: ["Java", "Spring Boot", "REST APIs", "OOP"] },
    { category: "Architecture", items: ["Layered Service Design", "Controller → Service → Repository", "DTO Pattern"] },
    { category: "Infra", items: ["Docker", "Docker Compose"] },
    { category: "Database", items: ["JPA / Hibernate", "H2 (dev)", "PostgreSQL (prod)"] },
  ],

  links: {
    repo: "https://github.com/ABHINAVX03/Book_Karo-backend-Spring-boot-",
    deploy: "https://book-car-frontend.vercel.app",
  },
};