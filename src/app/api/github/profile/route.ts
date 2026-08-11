import { NextResponse } from "next/server";
import { buildCommitActivity, buildLanguageSummary, GithubCommitWeek, GithubLanguage } from "./aggregation";

const USERNAME = "ABHINAVX03";

export interface GithubProfileResponse {
  username: string;
  profileUrl: string;
  avatarUrl: string;
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  topLanguages: GithubLanguage[];
  commitActivity: GithubCommitWeek[];
  error?: string;
}

interface GithubRepo {
  name: string;
  stargazers_count?: number;
  language?: string;
  fork?: boolean;
  pushed_at?: string;
}

// How many of the most-recently-pushed-to repos to pull commit stats from.
// Kept small because each repo costs one extra unauthenticated request
// (60/hr shared limit), and stats/commit_activity can return 202 (still
// computing) on a cold cache -- more repos means more chances to hit that.
const COMMIT_ACTIVITY_REPO_COUNT = 5;

// Trim GitHub's 52-week response down to a readable window for the bar chart.
export async function GET(): Promise<NextResponse<GithubProfileResponse | { error: string }>> {
  try {
    const headers = {
      Accept: "application/vnd.github+json",
      "User-Agent": "portfolio-app",
    };

    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`, { headers, next: { revalidate: 3600 } }),
      fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`, { headers, next: { revalidate: 3600 } }),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 502 });
    }

    const user = await userRes.json();
    const repos: GithubRepo[] = await reposRes.json();

    const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
    // This is a repo-count-based language share. Byte-weighted language data
    // would require one additional API request per repository.
    const topLanguages = buildLanguageSummary(repos);

    // ── Commit activity, aggregated across the most recently pushed-to repos ──
    const candidateRepos = repos
      .filter((r) => !r.fork)
      .sort((a, b) => new Date(b.pushed_at ?? 0).getTime() - new Date(a.pushed_at ?? 0).getTime())
      .slice(0, COMMIT_ACTIVITY_REPO_COUNT);

    const commitActivityResults = await Promise.all(
      candidateRepos.map(async (repo) => {
        const res = await fetch(
          `https://api.github.com/repos/${USERNAME}/${repo.name}/stats/commit_activity`,
          { headers, next: { revalidate: 3600 } }
        );
        // 202 = GitHub is still computing stats for this repo (cold cache).
        // Treat as "no data yet" rather than throwing -- one slow repo
        // should not take down the whole route on first load.
        if (res.status === 202 || !res.ok) return null;
        const json = await res.json();
        return Array.isArray(json) ? (json as { week: number; total: number }[]) : null;
      })
    );

    const commitActivity = buildCommitActivity(commitActivityResults);

    return NextResponse.json({
      username: user.login,
      profileUrl: user.html_url,
      avatarUrl: user.avatar_url,
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
      totalStars,
      topLanguages,
      commitActivity,
    });
  } catch (error) {
    return NextResponse.json({ error: "Unexpected GitHub API error" }, { status: 500 });
  }
}
