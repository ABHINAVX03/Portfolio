import { NextResponse } from "next/server";
import projectsData from "@/utils/projects/index.json";

// Builds a JSON Resume compliant object
// Spec: https://jsonresume.org/schema/
export async function GET() {
  const resume = {
    basics: {
      name: "Abhinav Gupta",
      label: "Software Development Engineer",
      image: "https://abhinavgupta.dev/avatar.jpg",
      email: "guptaabhinav697@gmail.com",
      phone: "+91 93152 31242",
      url: "https://abhinavgupta.dev",
      summary: "Software Development Engineer with strong object-oriented design fundamentals, hands-on experience in Java/Spring Boot backend systems, MERN stack, and Blockchain. Practiced in Agile development workflows. Deployed production systems end-to-end. 422 DSA problems solved; Codeforces Pupil (rating 1383).",
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
          url: "https://www.linkedin.com/in/abhinav-gupta-367369167/"
        }
      ]
    },
    work: [
      {
        name: "Codeeater",
        position: "Software Developer Intern",
        startDate: "2023-08-01",
        endDate: "2023-10-31",
        summary: "Designed and deployed Ethereum smart contracts in Solidity and integrated with React frontend.",
        highlights: [
          "Designed and deployed 3 Ethereum smart contracts in Solidity using OOP, covering 6+ on-chain operations with Ganache full test coverage.",
          "Integrated smart contracts with React frontend via Web3.js and MetaMask; applied gas-optimisation techniques reducing estimated gas costs by ~15%.",
          "Worked in an Agile team, participating in sprint planning and daily stand-ups; managed version control via Git on Linux across feature and release branches."
        ]
      }
    ],
    education: [
      {
        institution: "IIIT Vadodara (Indian Institute of Information Technology)",
        area: "Master of Computer Applications (MCA)",
        studyType: "Master's Degree",
        startDate: "2025-01-01",
        endDate: "2028-12-31",
        score: "8.5 / 10"
      },
      {
        institution: "Guru Gobind Singh Indraprastha University (GGSIPU)",
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
