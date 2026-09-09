// src/utils/caseStudies/nexora.ts

import { CaseStudyContent } from "./types";

export const nexora: CaseStudyContent = {
  slug: "nexora",

  hero: {
    claim:
      "A social network is fundamentally four divergent computational workloads — graph traversal, high-velocity feeds, ACID profile updates, and async fan-out — that tear monolithic databases apart unless separated into polyglot persistence.",
    subhead:
      "Enterprise-grade distributed professional network: Java 21 Virtual Threads, Spring Cloud, Kafka event streams, Neo4j graph engine, PostgreSQL, and Redis deployed live on AWS EC2 & CloudFront.",
  },

  lifecycle: [
    {
      id: "gateway",
      label: "Ingress & Edge Rate Limiting",
      owningService: "Spring Cloud Gateway",
      detail:
        "Requests enter via Spring Cloud Gateway on Netty. Redis-backed Token Bucket rate limiters intercept traffic to prevent abuse, while JWT tokens are verified before routing downstream.",
    },
    {
      id: "concurrency",
      label: "Virtual Thread Execution",
      owningService: "Domain Microservices (Java 21 Loom)",
      detail:
        "Every incoming HTTP request is assigned a Java 21 Virtual Thread. Blocking I/O calls to PostgreSQL, Neo4j, or S3 unmount the virtual thread from the carrier thread, preserving throughput under 100k+ concurrency.",
    },
    {
      id: "graph",
      label: "Social Graph Traversal",
      owningService: "Connection Service → Neo4j",
      detail:
        "Connection requests and 1st-degree mutual network queries execute via Cypher in Neo4j AuraDB. Index-free adjacency resolves connection circles in constant time rather than multi-table recursive SQL joins.",
      isFailurePoint: true,
    },
    {
      id: "event",
      label: "Asynchronous Event Streaming",
      owningService: "Posts Service → Apache Kafka",
      detail:
        "When posts, likes, or comments occur, Posts Service immediately commits the record and publishes domain events to Kafka topics (post-created, post-liked), decoupling write latency from notification fan-out.",
    },
    {
      id: "fanout",
      label: "Notification Consumption & Badging",
      owningService: "Notification Service (Kafka Consumer)",
      detail:
        "Notification Service asynchronously consumes events from Kafka, persists audit alerts in PostgreSQL, and updates unread badge counters without blocking the originating author's post flow.",
      isFailurePoint: true,
    },
    {
      id: "cdn",
      label: "Edge Delivery & Zero-Disk I/O",
      owningService: "AWS S3 + CloudFront CDN",
      detail:
        "User avatars, resumes, and media attachments are uploaded to S3 buckets and distributed across AWS CloudFront's global edge network, delivering sub-15ms edge asset latency.",
    },
  ],

  decisions: [
    {
      question: "Why use Neo4j for social connections instead of relational PostgreSQL joins?",
      decision:
        "Connection Service owns a dedicated Neo4j graph database for all connection relationships, while user accounts and credentials remain in PostgreSQL.",
      reasoning:
        "Querying mutual connections or 2nd-degree networks in relational SQL requires recursive, self-referential JOINs that rapidly degrade to $O(N^2)$ as user counts grow. In Neo4j, relationships are stored as direct physical pointers (index-free adjacency), allowing graph traversals to execute in $O(k)$ time regardless of total graph size.",
      tradeoff:
        "Requires polyglot persistence and eventual consistency. When a user profile is created in PostgreSQL, a corresponding node must be created in Neo4j. If Neo4j write fails, reconciliation logic or an event listener must self-heal the graph node.",
    },
    {
      question: "Why adopt Java 21 Virtual Threads (Project Loom) across all microservices?",
      decision:
        "Configured Tomcat on Spring Boot 3.3 to use Java 21 Virtual Threads (`spring.threads.virtual.enabled=true`) across all downstream domain services.",
      reasoning:
        "Traditional platform threads map 1:1 to OS threads (costing ~1MB memory each). Under heavy concurrent load, thread pool exhaustion limits throughput long before CPU or memory is saturated. Virtual threads cost only a few hundred bytes and yield automatically during blocking database or network calls.",
      tradeoff:
        "Care must be taken to avoid thread pinning inside `synchronized` blocks. All locking primitives were audited and migrated to `java.util.concurrent.locks.ReentrantLock`.",
    },
    {
      question: "Why decouple notifications with Apache Kafka instead of direct synchronous REST?",
      decision:
        "All domain events (posts, likes, connection approvals, profile views) are pushed to Kafka topics. The Notification Service consumes these events asynchronously.",
      reasoning:
        "If a high-profile user with thousands of connections creates a post, sending notifications synchronously via HTTP would either freeze the author's request for seconds or drop alerts if downstream services experience transient latency. Kafka provides durable, replayable event delivery.",
      tradeoff:
        "Notifications are eventually consistent (typically ~50ms latency) rather than instantaneous in the same ACID database transaction.",
    },
  ],

  failures: [
    {
      title: "Relational join bottlenecks on mutual connection queries",
      whatHappened:
        "Early prototypes stored friendships in PostgreSQL junction tables. When generating mutual connection recommendations during high-load benchmarks, query response times spiked to 2.4s, choking database connection pools.",
      rootCause:
        "Relational databases are optimized for tabular projections, not graph edge traversals. Multi-hop relationship queries forced heavy table scans and index thrashing.",
      fix: "Extracted connection logic into a dedicated Connection Service powered by Neo4j graph database using Cypher queries, dropping recommendation latency to 12ms.",
    },
    {
      title: "Concurrent session token desynchronization",
      whatHappened:
        "Users logging into a second device caused intermittent authentication errors on their first device due to stale local token state.",
      rootCause:
        "JWT tokens are stateless by default and cannot be revoked without expiration. A single active session constraint required centralized state.",
      fix: "Implemented Redis-backed single active session tracking where new logins atomically invalidate prior session tokens in Redis, enforcing strict security without database hits.",
    },
  ],

  stack: [
    { category: "Backend Architecture", items: ["Java 21 (Virtual Threads)", "Spring Boot 3.3+", "Spring Cloud Gateway", "Netflix Eureka"] },
    { category: "Databases & Streaming", items: ["Apache Kafka", "Neo4j AuraDB", "PostgreSQL (ACID)", "Redis (LRU & Rate Limiting)"] },
    { category: "Frontend & Realtime", items: ["React 18", "TypeScript", "Tailwind CSS", "WebSocket (STOMP)"] },
    { category: "Cloud & Infrastructure", items: ["AWS EC2", "AWS S3", "AWS CloudFront CDN", "Docker", "GitHub Actions CI/CD"] },
  ],

  links: {
    repo: "https://github.com/ABHINAVX03/nexora",
    deploy: "https://nexoranetwork.site",
  },
};
