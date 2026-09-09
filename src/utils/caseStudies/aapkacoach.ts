import { CaseStudyContent } from "./types";

export const aapkacoach: CaseStudyContent = {
  slug: "aapka-couch",
  hero: {
    claim:
      "Scaling personalized AI coaching requires more than just API calls—it needs rigorous prompt chaining, response caching, and resilient edge delivery.",
    subhead:
      "A Next.js 16 and Supabase platform integrating DeepSeek AI to generate localized Indian meal plans and fitness regimens, monetized via Cashfree webhooks.",
  },
  lifecycle: [
    {
      id: "onboard",
      label: "Capture user biometrics and preferences",
      owningService: "React Frontend",
      detail:
        "The onboarding flow collects hyper-local preferences (e.g., regional Indian diets, exact allergy lists) to ensure the AI has sufficient context.",
    },
    {
      id: "generate",
      label: "Chain AI prompts for localized plans",
      owningService: "DeepSeek Integration",
      detail:
        "Instead of one massive prompt, the system chains smaller requests: one for macronutrient math, one for meal selection, and one for grocery lists, improving output structure and accuracy.",
    },
    {
      id: "cache",
      label: "Cache and persist results",
      owningService: "Supabase DB",
      detail:
        "Generated JSON payloads are cached to prevent redundant AI API costs. Row Level Security ensures users can only access their own coaching plans.",
    },
    {
      id: "monetize",
      label: "Unlock premium content via webhooks",
      owningService: "Cashfree Integration",
      detail:
        "A serverless webhook endpoint securely verifies Cashfree payment signatures before unlocking the generated 7-day plan in the user's dashboard.",
      isFailurePoint: true,
    },
  ],
  decisions: [
    {
      question: "Why use prompt chaining instead of a single zero-shot generation?",
      decision:
        "The AI pipeline was split into sequential steps: compute macros → select regional dishes → generate recipes.",
      reasoning:
        "LLMs struggle to do complex math (macro tracking) and creative generation (recipes) simultaneously. By separating the computational prompt from the creative prompt, the hallucination rate dropped significantly and the plans were nutritionally accurate.",
      tradeoff:
        "This increases the overall time-to-first-byte for the user, requiring optimistic UI loading states while the chained pipeline completes.",
    },
    {
      question: "Why use Supabase over a custom Node backend for this MVP?",
      decision:
        "Relying on Supabase's auto-generated PostgREST APIs and Row Level Security for all data fetching.",
      reasoning:
        "Since the core complexity lies in the AI chaining and UI presentation, building a custom CRUD backend would add unnecessary overhead. Supabase RLS directly protects user data at the database level, allowing the Next.js client to query safely.",
      tradeoff:
        "Business logic (like payment verification and AI generation) still has to live in Next.js Server Actions or API routes, creating a slightly hybrid backend model.",
    },
  ],
  failures: [
    {
      title: "Webhook signature verification failures dropped payments",
      whatHappened:
        "During early testing, users were successfully paying via Cashfree, but their dashboards remained locked. The serverless webhook endpoint was failing to verify the cryptographic signature.",
      rootCause:
        "Next.js API routes automatically parse the incoming request body as JSON, but crypto signature verification requires the raw, unmodified byte stream of the request.",
      fix:
        "Configured the specific Next.js API route to disable the default body parser, consumed the raw stream to verify the Cashfree signature, and then parsed the JSON manually.",
    },
    {
      title: "AI hallucinations broke the frontend JSON parsing",
      whatHappened:
        "The UI expects the AI meal plan to arrive in a strict JSON format. Occasionally, the LLM would wrap the JSON in markdown code blocks or add conversational preamble, causing `JSON.parse` to throw errors and crash the page.",
      rootCause:
        "The prompt instructed the AI to 'return JSON', but didn't structurally force it or strip surrounding text.",
      fix:
        "Added strict output parsers using regex to extract the JSON payload even if surrounded by markdown, and implemented a fallback retry mechanism if the payload failed schema validation.",
    },
  ],
  stack: [
    { category: "Frontend", items: ["Next.js 16", "React 19", "Tailwind CSS"] },
    { category: "AI & Logic", items: ["DeepSeek AI", "Prompt Chaining"] },
    { category: "Backend", items: ["Supabase (PostgreSQL)", "Row Level Security"] },
    { category: "Payments", items: ["Cashfree", "Serverless Webhooks"] },
  ],
  links: {
    repo: "https://github.com/ABHINAVX03/Aapka-Couch",
    deploy: "https://aapka-couch.vercel.app",
  },
};
