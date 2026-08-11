import { test, expect } from "@playwright/test";

test("homepage renders key sections", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Abhinav/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Projects/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Contact/i })).toBeVisible();
});

test("blog and now pages are accessible", async ({ page }) => {
  await page.goto("/blog");
  await expect(page.getByRole("heading", { name: /Notes from the build/i })).toBeVisible();

  await page.goto("/now");
  await expect(page.getByRole("heading", { name: /What I’m up to lately/i })).toBeVisible();
});
