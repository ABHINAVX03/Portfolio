import { describe, expect, it } from "@jest/globals";
import { buildCommitActivity, buildLanguageSummary } from "../aggregation";

describe("GitHub profile aggregation helpers", () => {
  it("summarizes language counts into percentages", () => {
    const languages = buildLanguageSummary([
      { language: "TypeScript" },
      { language: "TypeScript" },
      { language: "Java" },
      { language: "Python" },
    ]);

    expect(languages).toEqual([
      { name: "TypeScript", count: 2, percentage: 50 },
      { name: "Java", count: 1, percentage: 25 },
      { name: "Python", count: 1, percentage: 25 },
    ]);
  });

  it("aggregates commit activity across repos for the latest weeks", () => {
    const activity = buildCommitActivity([
      [{ week: 1_700_000_000, total: 3 }, { week: 1_700_086_400, total: 2 }],
      [{ week: 1_700_000_000, total: 4 }, { week: 1_700_172_800, total: 1 }],
      null,
    ]);

    expect(activity).toEqual([
      { week: "2023-11-14", count: 7 },
      { week: "2023-11-15", count: 2 },
      { week: "2023-11-16", count: 1 },
    ]);
  });
});
