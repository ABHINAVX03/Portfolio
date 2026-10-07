// src/config/facts.ts

export const FACTS = {
  HEADLINE: "Software Development Engineer", // Derived from Resume JSON API
  AVAILABILITY: "Open to opportunities", // Derived from existing text
  HACKATHONS: ["Smart India Hackathon (SIH)", "Cerebro", "HACKOUT '25"],
  DSA_PLACEMENT: "500+",
  SKILLS_DEFENSIBLE: [
    "Java 21 (Virtual Threads)", "Spring Boot 3.3+", "Spring Cloud Gateway", "Apache Kafka", "Microservices", "Node.js", "Express.js", "REST APIs", "WebSocket (STOMP)",
    "PostgreSQL", "Neo4j (Graph DB)", "Redis", "MongoDB", "Supabase", "SQL",
    "React.js 18/19", "Next.js 15 (App Router)", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "HTML5 / CSS3",
    "AWS (EC2, S3, CloudFront)", "Docker", "CI/CD (GitHub Actions)", "Git / GitHub", "Postman",
    "C / C++", "Python", "Solidity", "OOP & Design Patterns", "Low-Level Design (LLD)", "High-Level Design (HLD)", "Data Structures & Algorithms"
  ],
  KUBERNETES_STATUS: "Currently Learning",
  BENCHMARK_NEXORA: {
    loadTool: "k6",
    testMachine: "AWS EC2",
    neo4jTier: "AuraDB",
    duration: "150s (progressively scaled)",
    latencies: "p50: 56.1ms, p95: 2197.3ms, p99: 3680.2ms (at peak 500 VUs)",
    concurrentMeaning: "Virtual Users simulating real user sessions and API polling",
    errorRateDef: "0.77% peak error rate (timeouts or non-200 responses)",
  },
  BOOKKARO: {
    title: "BookKaro",
    shortDescription: "A ride-booking platform with PostGIS spatial tracking and real-time JWT authentication.",
  },
  CPSYNC: {
    title: "CPSync",
    shortDescription: "An automated calendar sync service aggregating contests across Codeforces, LeetCode, CodeChef, and AtCoder using Caffeine caching and Spring Boot.",
    facts: [
      "Integrates with Google Calendar API v3 via OAuth2 and AES-256-GCM token encryption",
      "Aggregates data via REST APIs, GraphQL (LeetCode), and JSoup HTML scraping (AtCoder)",
      "Resolved fetcher timeouts and deadlocks using Java 21 Virtual Threads, bounded timeouts, and eager Caffeine cache warming",
      "Runs automated daily CRON jobs at 3:00 AM to synchronize user preferences without duplicates"
    ]
  },
};
