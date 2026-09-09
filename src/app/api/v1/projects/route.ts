import { NextResponse } from "next/server";
import projectsData from "@/utils/projects/index.json";

export async function GET() {
  // Strip out any non-public internal paths, enhance URLs if necessary.
  const publicProjects = projectsData.projects.map((p) => ({
    id: p.id,
    name: p.name,
    type: p.type,
    description: p.description,
    tags: p.tags,
    repoUrl: p.repo,
    liveUrl: p.deploy,
    year: p.year,
    status: p.status,
    caseStudyUrl: `https://abhinavgupta.dev/projects/${p.id}`,
  }));

  return NextResponse.json({
    metadata: {
      total: publicProjects.length,
      developer: "Abhinav Gupta"
    },
    projects: publicProjects
  }, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200"
    }
  });
}
