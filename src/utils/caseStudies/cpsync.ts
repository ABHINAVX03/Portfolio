import { CaseStudyContent } from "./types";

export const cpsync: CaseStudyContent = {
  slug: "cpsync",
  hero: {
    claim:
      "A sync system only feels simple until it has to survive retries, partial failures, and multiple concurrent updates without creating duplicate work.",
    subhead:
      "A Spring Boot + React project that syncs Codeforces submissions into a personal tracker, with the hard part being making the sync safe under failure and concurrent execution.",
  },
  lifecycle: [
    {
      id: "fetch",
      label: "Fetch latest Codeforces submissions",
      owningService: "Sync Service",
      detail:
        "The sync job requests the latest submission data from Codeforces and compares it with records already stored for the user.",
    },
    {
      id: "normalize",
      label: "Normalize and deduplicate the payload",
      owningService: "Sync Service",
      detail:
        "The service converts external problem metadata into internal domain objects and collapses duplicate updates before writing to the database.",
    },
    {
      id: "persist",
      label: "Persist the state change",
      owningService: "Sync Service",
      detail:
        "The system writes submission and problem records to the database and marks the latest sync timestamp so future runs can be incremental.",
      isFailurePoint: true,
    },
    {
      id: "notify",
      label: "Surface the change in the app",
      owningService: "React frontend",
      detail:
        "The UI reads the updated tracker data and shows the newly synced activities to the user in near real time.",
    },
  ],
  decisions: [
    {
      question: "Why make the sync idempotent instead of just retrying blindly?",
      decision:
        "The sync process now treats each Codeforces submission as a unique, stable event and writes it only once per external ID.",
      reasoning:
        "Without an idempotency guard, a partial DB write followed by a retry could create duplicate calendar entries, duplicate tracker rows, or repeated notifications. The sync has to be safe even when the external API and the local database disagree about what already happened.",
      tradeoff:
        "The extra deduplication step adds a small amount of bookkeeping, but it removes the risk of noisy double-booking and makes retries safe instead of destructive.",
    },
    {
      question: "Why was the scheduler parallelized carefully instead of simply firing more threads?",
      decision:
        "The scheduler uses bounded parallelism so the sync job can run quickly without overwhelming the outbound API or the database connection pool.",
      reasoning:
        "A naive parallel approach can turn a modest sync into a thundering herd of requests. That can overload the database pool or trigger rate-limit behavior from the upstream provider.",
      tradeoff:
        "The system is slightly more complex to reason about, but it keeps the throughput gain without turning the infrastructure into a bottleneck.",
    },
  ],
  failures: [
    {
      title: "A failed DB write caused duplicate calendar syncs",
      whatHappened:
        "The first version of the sync could retry after a database error and create a second Google Calendar event for the same Codeforces submission because the event creation was not guarded by a durable idempotency check.",
      rootCause:
        "The system treated the external sync as if it were a simple read-and-write loop, but the persistence boundary was not safe under retry.",
      fix:
        "The sync now writes a stable external-event key first, uses an upsert-style persistence flow, and only creates the calendar entry after the tracker record is confirmed to be durable.",
    },
    {
      title: "N+1 retrievals slowed the sync down under load",
      whatHappened:
        "A later audit found the sync path was issuing one query per submission when reconstructing related user and problem data, causing the sync to crawl as the dataset grew.",
      rootCause:
        "The domain logic was fetching nested data lazily instead of batching it at the repository boundary.",
      fix:
        "The repository layer was refactored to fetch the needed rows in bulk and the sync path was updated to work from normalized aggregates rather than walking the graph one item at a time.",
    },
  ],
  stack: [
    { category: "Backend", items: ["Java", "Spring Boot", "REST APIs", "OAuth2"] },
    { category: "Frontend", items: ["React", "TypeScript", "Next.js"] },
    { category: "Infra", items: ["Docker", "Google Calendar API"] },
    { category: "Data", items: ["PostgreSQL", "JPA / Hibernate"] },
  ],
  links: {
    repo: "https://github.com/ABHINAVX03/CPSync",
    deploy: null,
  },
};
