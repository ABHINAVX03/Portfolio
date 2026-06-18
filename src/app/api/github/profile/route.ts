import { NextResponse } from "next/server";

const USERNAME = "ABHINAVX03";

export interface GithubLanguage {
  name: string;
  count: number;
  percentage: number;
}

export interface GithubCommitWeek {
  week: string; // ISO date, e.g. "2026-03-23"
  count: number;
}

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
const COMMIT_ACTIVITY_WEEKS = 12;

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
    const languageCount: Record<string, number> = {};

    repos.forEach((repo) => {
      if (repo.language) {
        languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
      }
    });

    // count -> percentage normalization. This is a rough, repo-count-based
    // percentage (one repo = one vote for its dominant language), not a
    // byte-weighted one -- consistent with how `count` was already being
    // computed above, just expressed as a share of the total instead of
    // a raw integer. If you want byte-accurate percentages later, that
    // requires an additional GET /repos/{owner}/{repo}/languages call per
    // repo summed by bytes, which costs more of the unauthenticated quota.
    const totalLanguageVotes = Object.values(languageCount).reduce((a, b) => a + b, 0) || 1;

    const topLanguages = Object.entries(languageCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({
        name,
        count,
        percentage: Math.round((count / totalLanguageVotes) * 1000) / 10,
      }));

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

    const weeklyTotals = new Map<number, number>();
    commitActivityResults.forEach((repoWeeks) => {
      if (!repoWeeks) return;
      repoWeeks.forEach((wk) => {
        weeklyTotals.set(wk.week, (weeklyTotals.get(wk.week) || 0) + (wk.total || 0));
      });
    });

    const commitActivity: GithubCommitWeek[] = Array.from(weeklyTotals.entries())
      .sort((a, b) => a[0] - b[0])
      .slice(-COMMIT_ACTIVITY_WEEKS)
      .map(([weekUnix, count]) => ({
        week: new Date(weekUnix * 1000).toISOString().slice(0, 10),
        count,
      }));

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