import { CaseStudyContent } from "./types";

export const experienceSystem: CaseStudyContent = {
  slug: "experience-system",
  hero: {
    claim: "Engineering depth is easiest to understand when the story is structured around choices and tradeoffs.",
    subhead: "I use case studies to make technical decisions legible, not just visible.",
  },
  lifecycle: [
    { id: "collect", label: "Collect the signal", owningService: "Learning", detail: "I pull together the technical and product context that matters most.", isFailurePoint: false },
    { id: "frame", label: "Frame the tradeoff", owningService: "Communication", detail: "The writeup explains the problem, constraints, and why one approach was chosen.", isFailurePoint: false },
    { id: "reflect", label: "Make it reusable", owningService: "Engineering", detail: "The case study becomes a reusable artifact for future product and engineering decisions.", isFailurePoint: false },
  ],
  decisions: [
    { question: "Should the story be purely technical or also personal?", decision: "Blend both, but keep the technical reasoning explicit.", reasoning: "A great case study shows how someone thinks, not just what they built.", tradeoff: "The narrative takes a bit more care to keep concise." },
  ],
  failures: [],
  stack: [
    { category: "Writing", items: ["Narrative design", "Decision framing", "Tradeoff articulation"] },
    { category: "Product", items: ["Context mapping", "Audience design", "Refinement loops"] },
  ],
  links: { repo: null, deploy: null },
};
