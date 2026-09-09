import { describe, expect, it } from "@jest/globals";
import { getBlogPosts, getBlogPostBySlug } from "../posts";

describe("Blog posts content layer", () => {
  it("returns static blog posts list", async () => {
    const posts = await getBlogPosts();
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThanOrEqual(2);
    expect(posts[0]).toHaveProperty("slug");
    expect(posts[0]).toHaveProperty("title");
    expect(posts[0]).toHaveProperty("content");
  });

  it("finds a post by slug", async () => {
    const post = await getBlogPostBySlug("building-resilient-apis");
    expect(post).not.toBeNull();
    expect(post?.title).toContain("Building resilient APIs");
  });

  it("returns null for non-existent slug", async () => {
    const post = await getBlogPostBySlug("non-existent-article-slug");
    expect(post).toBeNull();
  });
});
