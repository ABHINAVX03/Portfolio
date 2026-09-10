import { NextResponse } from "next/server";

const skillsData = {
  categories: [
    {
      category: "Backend & Distributed Systems",
      items: [
        "Java 21 (Virtual Threads)",
        "Spring Boot 3.3+",
        "Spring Cloud Gateway",
        "Apache Kafka",
        "Microservices",
        "Node.js",
        "Express.js",
        "REST APIs",
        "WebSocket (STOMP)"
      ]
    },
    {
      category: "Databases & In-Memory",
      items: [
        "PostgreSQL",
        "Neo4j (Graph DB)",
        "Redis (Cache & Rate Limiting)",
        "MongoDB",
        "Supabase",
        "SQL"
      ]
    },
    {
      category: "Frontend & Web Engineering",
      items: [
        "React.js 18/19",
        "Next.js 15 (App Router)",
        "TypeScript",
        "JavaScript (ES6+)",
        "Tailwind CSS",
        "HTML5 / CSS3"
      ]
    },
    {
      category: "Cloud, DevOps & Tools",
      items: [
        "AWS (EC2, S3, CloudFront)",
        "Docker",
        "Kubernetes",
        "CI/CD (GitHub Actions)",
        "Git / GitHub",
        "Postman"
      ]
    },
    {
      category: "Languages & System Design",
      items: [
        "Java",
        "C / C++",
        "Python",
        "Solidity",
        "OOP & Design Patterns",
        "Low-Level Design (LLD)",
        "High-Level Design (HLD)",
        "Data Structures & Algorithms"
      ]
    }
  ],
  learningNow: [
    "Distributed consensus algorithms (Raft)",
    "Advanced Kubernetes cluster orchestration",
    "High-throughput event sourcing architectures",
    "Low-latency JVM memory tuning & profiling"
  ],
  buildingNow: [
    "Nexora distributed graph recommendation enhancements",
    "Real-time event streaming pipeline optimizations",
    "High-concurrency benchmark suites & load tests"
  ],
  certifications: [
    "Hackathon – Smart India Hackathon (SIH)",
    "Hackathon – Cerebro",
    "Hackathon – HACKOUT '25",
    "HackerRank Problem Solving",
    "HackerRank React Development",
    "TLE Eliminators Level 1 & 2",
    "Coding Society Representative · GGSIPU"
  ],
  codingProfiles: [
    { name: "LeetCode", meta: "500+ problems", url: "https://leetcode.com/u/ABHINAVX03/" },
    { name: "Codeforces", meta: "Pupil (1383)", url: "https://codeforces.com/profile/ABHINAVX03" },
    { name: "GeeksforGeeks", meta: "Active solver", url: "https://www.geeksforgeeks.org/user/ABHINAVX03/" },
    { name: "HackerRank", meta: "Java (5★) · React.js", url: "https://www.hackerrank.com/profile/ABHINAVX03" },
    { name: "GitHub", meta: "ABHINAVX03", url: "https://github.com/ABHINAVX03" }
  ]
};

export async function GET() {
  return NextResponse.json(skillsData, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200"
    }
  });
}
