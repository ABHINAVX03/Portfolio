import { NextResponse } from "next/server";

const skillsData = {
  categories: [
    {
      category: "Languages",
      items: ["C", "C++", "Java", "Python", "JavaScript", "TypeScript", "Solidity"]
    },
    {
      category: "Frontend",
      items: ["HTML", "CSS", "Tailwind CSS", "React.js", "Next.js", "Bootstrap"]
    },
    {
      category: "Backend & Database",
      items: ["Node.js", "Express.js", "Spring Boot", "MongoDB", "PostgreSQL", "REST APIs"]
    },
    {
      category: "Tools & Infra",
      items: ["Docker", "JWT", "Web3.js", "MetaMask", "Ganache", "Truffle", "GitHub"]
    }
  ],
  learningNow: [
    "Kafka event-driven architecture",
    "System design & HLD/LLD patterns",
    "Advanced Next.js performance",
    "Microservices observability"
  ],
  buildingNow: [
    "Backend notification pipeline prototype",
    "System design case-study writeups",
    "Consistent DSA grind routine"
  ],
  certifications: [
    "HackerRank Problem Solving",
    "HackerRank React Development",
    "Hackathon – HACKOUT '25",
    "TLE Eliminators Level 1",
    "TLE Eliminators Level 2",
    "Coding Society Representative · GGSIPU"
  ],
  codingProfiles: [
    { name: "LeetCode", meta: "300+ problems", url: "https://leetcode.com/u/ABHINAVX03/" },
    { name: "GeeksforGeeks", meta: "Active", url: "https://www.geeksforgeeks.org/user/ABHINAVX03/" },
    { name: "Codeforces", meta: "Competitive programming", url: "https://codeforces.com/profile/ABHINAVX03" },
    { name: "HackerRank", meta: "Java · React · PS", url: "https://www.hackerrank.com/profile/ABHINAVX03" },
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
