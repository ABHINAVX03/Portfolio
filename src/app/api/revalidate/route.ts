import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

/**
 * On-Demand Incremental Static Regeneration (ISR) Webhook Endpoint
 * 
 * Supports webhook triggers from any Headless CMS (Sanity, Contentful, Strapi, Decap, GitHub Actions).
 * Allows updating posts, projects, or full pages immediately without a full site rebuild.
 *
 * Usage:
 *   POST /api/revalidate?secret=YOUR_REVALIDATION_SECRET
 *   Body: { "path": "/blog" } or { "tag": "posts" }
 *
 * Or query parameters:
 *   GET /api/revalidate?secret=YOUR_REVALIDATION_SECRET&path=/blog
 */

export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const secret =
      searchParams.get("secret") ||
      request.headers.get("x-revalidate-secret") ||
      request.headers.get("authorization")?.replace("Bearer ", "");

    const configuredSecret = process.env.REVALIDATION_SECRET || "portfolio-revalidate-token";

    if (secret !== configuredSecret) {
      return NextResponse.json(
        { error: "Invalid or missing revalidation secret" },
        { status: 401 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const path = searchParams.get("path") || (body as { path?: string })?.path;
    const tag = searchParams.get("tag") || (body as { tag?: string })?.tag;

    if (!path && !tag) {
      return NextResponse.json(
        { error: "Must specify either 'path' (e.g. /blog) or 'tag' (e.g. posts) to revalidate." },
        { status: 400 }
      );
    }

    const result: { path?: string; tag?: string } = {};

    if (path) {
      revalidatePath(path);
      result.path = path;
    }

    if (tag) {
      revalidateTag(tag);
      result.tag = tag;
    }

    return NextResponse.json({
      revalidated: true,
      ...result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { error: "Failed to revalidate content", details: String(error) },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get("secret");
  const configuredSecret = process.env.REVALIDATION_SECRET || "portfolio-revalidate-token";

  if (secret !== configuredSecret) {
    return NextResponse.json(
      { error: "Invalid or missing revalidation secret" },
      { status: 401 }
    );
  }

  const path = searchParams.get("path");
  const tag = searchParams.get("tag");

  if (!path && !tag) {
    return NextResponse.json(
      { error: "Must specify either 'path' (e.g. /blog) or 'tag' (e.g. posts) to revalidate." },
      { status: 400 }
    );
  }

  if (path) revalidatePath(path);
  if (tag) revalidateTag(tag);

  return NextResponse.json({
    revalidated: true,
    path: path || null,
    tag: tag || null,
    timestamp: new Date().toISOString(),
  });
}
