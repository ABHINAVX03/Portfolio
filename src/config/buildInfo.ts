// Build metadata derived from Git repository
export const BUILD_INFO = {
  commitHash: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || "f9f962a",
  commitDate: "2026-10-07",
  drawnBy: "Abhinav Gupta",
};
