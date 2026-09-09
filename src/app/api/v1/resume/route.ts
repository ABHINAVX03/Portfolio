import { NextResponse } from "next/server";
import projectsData from "@/utils/projects/index.json";

// Builds a JSON Resume compliant object
// Spec: https://jsonresume.org/schema/
export async function GET() {
  const resume = {
    basics: {
      name: "Abhinav Gupta",
      label: "Software Engineer",
      image: "https://abhinavgupta.dev/avatar.jpg",
      email: "your-email@gmail.com",
      url: "https://abhinavgupta.dev",
      summary: "Software Engineer focused on backend systems, full-stack architecture, and creating highly performant applications.",
      location: {
        city: "Delhi/NCT",
        countryCode: "IN",
        region: "Delhi"
      },
      profiles: [
        {
          network: "GitHub",
          username: "ABHINAVX03",
          url: "https://github.com/ABHINAVX03"
        },
        {
          network: "LinkedIn",
          username: "Abhinav Gupta",
          url: "https://www.linkedin.com/in/abhinavgupta03/"
        }
      ]
    },
    work: [
      {
        name: "Code Eater",
        position: "Blockchain Developer Trainee",
        startDate: "2023-08-01",
        endDate: "2023-10-31",
        summary: "Developed Ethereum smart contracts in Solidity for decentralized applications.",
        highlights: [
          "Built Ethereum smart contracts in Solidity for a marketplace and a Twitter-style DApp.",
          "Deployed and tested contracts locally with Ganache and Truffle.",
          "Integrated contracts with React frontend using Web3.js and MetaMask.",
          "Wrote modular, gas-efficient code following Solidity security best practices."
        ]
      }
    ],
    education: [
      {
        institution: "IIIT Vadodara",
        area: "Master of Computer Applications (MCA)",
        studyType: "Master's Degree",
        startDate: "2025-01-01",
        endDate: "2028-12-31",
        score: "8.51 / 10"
      },
      {
        institution: "Guru Gobind Singh Indraprastha University",
        area: "Bachelor of Computer Applications (BCA)",
        studyType: "Bachelor's Degree",
        startDate: "2021-01-01",
        endDate: "2024-12-31",
        score: "9.2 / 10"
      }
    ],
    skills: [
      {
        name: "Backend & Distributed Systems",
        keywords: [
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
        name: "Databases & Storage",
        keywords: [
          "PostgreSQL",
          "Neo4j (Graph DB)",
          "Redis (Cache & Rate Limiting)",
          "MongoDB",
          "Supabase"
        ]
      },
      {
        name: "Cloud & DevOps",
        keywords: [
          "AWS (EC2, S3, CloudFront)",
          "Docker",
          "Kubernetes",
          "CI/CD (GitHub Actions)",
          "Git / GitHub"
        ]
      },
      {
        name: "Frontend",
        keywords: [
          "React.js 18/19",
          "Next.js 15 (App Router)",
          "TypeScript",
          "Tailwind CSS",
          "HTML5 / CSS3"
        ]
      }
    ],
    projects: projectsData.projects.map(p => ({
      name: p.name,
      description: p.description,
      highlights: p.tags,
      url: p.deploy || p.repo
    }))
  };

  return NextResponse.json(resume, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200"
    }
  });
}
