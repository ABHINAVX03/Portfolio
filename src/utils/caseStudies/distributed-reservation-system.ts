import { CaseStudyContent } from "./types";

export const distributedReservationSystem: CaseStudyContent = {
  slug: "distributed-reservation-system",
  hero: {
    claim:
      "Availability and booking history need different consistency guarantees, so the system has to make that boundary explicit instead of pretending one database transaction can solve everything.",
    subhead:
      "A distributed reservation service built with Spring Boot, Redis, Kafka, and AWS that separates short-lived lock ownership from durable event propagation.",
  },
  lifecycle: [
    {
      id: "reserve",
      label: "User attempts to reserve inventory",
      owningService: "Reservation Service",
      detail:
        "The reservation API accepts the request and tries to acquire a temporary lock in Redis for the inventory key so only one request can claim the seat or slot at a time.",
    },
    {
      id: "publish",
      label: "Booking event emitted to Kafka",
      owningService: "Reservation Service",
      detail:
        "Once the reservation is accepted, the service publishes a booking-created event so downstream systems can react without being tightly coupled to the reservation workflow.",
    },
    {
      id: "consume",
      label: "Consumers process the event",
      owningService: "Event consumers",
      detail:
        "Followers such as inventory reconciliation, billing, and analytics consume the booking event and update their local state asynchronously.",
      isFailurePoint: true,
    },
    {
      id: "settle",
      label: "Availability is reconciled and booking confirmed",
      owningService: "Reservation Service",
      detail:
        "The reservation eventually settles into a durable confirmed state, while Redis only holds the brief lock needed to prevent double-booking races.",
    },
  ],
  decisions: [
    {
      question: "Why does Redis own availability locking instead of the database?",
      decision:
        "Redis holds the short-lived lock for the inventory key because the reservation path needs sub-second contention control and the lock can safely expire if the request crashes mid-flight.",
      reasoning:
        "A database-level lock would be too slow and too expensive for a high-throughput inventory hot path. Redis gives quick, temporary occupancy control without making every reservation wait on a heavy transactional boundary.",
      tradeoff:
        "Redis locks are ephemeral, so the system must be able to recover from lock expiry and replay stale reservation state without corrupting the inventory view.",
    },
    {
      question: "Why does Kafka own the booking event stream instead of synchronous calls?",
      decision:
        "Kafka is the durable event backbone for booking milestones because downstream systems need to react independently and the reservation API should not block on each one of them.",
      reasoning:
        "If the reservation service called every downstream service synchronously, a single slow consumer could delay booking confirmation and make the API path brittle. Kafka decouples the core booking flow from follow-on workflows.",
      tradeoff:
        "The system gains resilience and scalability, but it also accepts eventual consistency and must design consumer retries and idempotency as first-class requirements.",
    },
  ],
  failures: [
    {
      title: "A stale Redis lock allowed a double-booking race",
      whatHappened:
        "During a failover window, a lock that should have expired was still considered active, so the service rejected a reservation even though the underlying booking had already been processed elsewhere.",
      rootCause:
        "The lock lifecycle relied on a timeout that was too conservative for the real workload and did not fully account for clock skew across nodes.",
      fix:
        "The lock implementation was revised to use a lease-based model and the reservation service now verifies the booking state before considering the lock authoritative.",
    },
    {
      title: "A consumer replay reprocessed the same booking event",
      whatHappened:
        "A consumer outage caused the same booking event to be replayed after recovery, producing duplicate billing updates until the consumer was hardened.",
      rootCause:
        "The downstream contract treated the event stream as idempotent by assumption instead of requiring a durable deduplication key.",
      fix:
        "Consumers now store a stable event identifier and ignore duplicates, making replay safe instead of destructive.",
    },
  ],
  stack: [
    { category: "Backend", items: ["Java", "Spring Boot", "Redis", "Kafka"] },
    { category: "Architecture", items: ["Distributed Systems", "Event-driven design", "Lease-based locking"] },
    { category: "Cloud", items: ["AWS", "Container orchestration"] },
    { category: "Data", items: ["Event streaming", "Durable messaging"] },
  ],
  links: {
    repo: "https://github.com/ABHINAVX03/Distributed-Reservation-System",
    deploy: null,
  },
};
