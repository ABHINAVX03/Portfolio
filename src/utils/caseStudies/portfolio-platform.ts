import { CaseStudyContent } from "./types";

export const portfolioPlatform: CaseStudyContent = {
  slug: "portfolio-platform",
  hero: {
    claim: "A portfolio should feel like a product experience, not a static resume.",
    subhead: "I redesigned my own platform to emphasize narrative, clarity, and a memorable first interaction.",
  },
  lifecycle: [
    { id: "discover", label: "Understand the narrative", owningService: "Experience", detail: "I mapped the story around engineering depth, product thinking, and personality.", isFailurePoint: false },
    { id: "design", label: "Shape the interaction model", owningService: "Experience", detail: "I balanced detailed content with motion, accessibility, and fast first paint.", isFailurePoint: false },
    { id: "ship", label: "Deliver a polished experience", owningService: "Experience", detail: "The result is a portfolio that invites exploration and communicates confidence.", isFailurePoint: false },
  ],
  decisions: [
    { question: "How should the portfolio communicate depth without overwhelming visitors?", decision: "Use layered sections with a clear narrative arc and concise guidance at each step.", reasoning: "A strong portfolio should feel intentional, not noisy.", tradeoff: "Some detail is intentionally deferred behind the main story." },
    { question: "How much motion is appropriate?", decision: "Apply motion for narrative emphasis and interaction feedback, not decoration.", reasoning: "Motion helps signal state changes without obscuring the content.", tradeoff: "The experience is more polished but requires careful performance tuning." },
  ],
  failures: [],
  stack: [
    { category: "Frontend", items: ["Next.js", "React", "TypeScript", "Framer Motion"] },
    { category: "Design", items: ["CSS Custom Properties", "Accessible color systems", "Responsive layout"] },
  ],
  links: { repo: null, deploy: null },
};
