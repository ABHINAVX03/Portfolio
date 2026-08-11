import { caseStudyRegistry } from "@/utils/caseStudies";

describe("caseStudyRegistry", () => {
  it("includes the core case studies and their expected metadata", () => {
    expect(caseStudyRegistry["uber-ride-platform"]).toBeDefined();
    expect(caseStudyRegistry["portfolio-platform"]).toBeDefined();
    expect(caseStudyRegistry["experience-system"]).toBeDefined();
    expect(caseStudyRegistry["cpsync"]).toBeDefined();
    expect(caseStudyRegistry["distributed-reservation-system"]).toBeDefined();
  });

  it("provides lifecycle, decision, and failure content for a new case study", () => {
    const content = caseStudyRegistry["cpsync"];

    expect(content.lifecycle.length).toBeGreaterThan(0);
    expect(content.decisions.length).toBeGreaterThan(0);
    expect(content.failures.length).toBeGreaterThan(0);
    expect(content.stack.some((group) => group.category === "Backend")).toBe(true);
  });
});
