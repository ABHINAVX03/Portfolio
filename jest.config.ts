import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  transform: {
    "^.+\\.[tj]sx?$": ["ts-jest", { tsconfig: "tsconfig.json" }],
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.stories.{ts,tsx}",
    "!src/app/**",
    "src/app/api/github/profile/aggregation.ts",
    "!src/components/**/*.tsx",
    "!src/components/**/*.ts",
    "!src/utils/caseStudies/LifecycleDiagram.tsx",
    "!src/utils/caseStudies/BoundaryDecisionBlock.tsx",
    "!src/utils/caseStudies/FailureScenarioCard.tsx",
    "!src/utils/caseStudies/portfolio-platform.ts",
    "!src/utils/caseStudies/uber-ride-platform.ts",
    "!src/utils/caseStudies/experience-system.ts",
    "!src/utils/caseStudies/cpsync.ts",
    "!src/utils/caseStudies/distributed-reservation-system.ts",
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
};

export default config;
