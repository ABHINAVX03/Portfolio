import { NextResponse } from "next/server";

const USERNAME = "ABHINAVX03";

export interface GithubLanguage {
  name: string;
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
  error?: string;
}

interface GithubRepo {
  stargazers_count?: number;
  language?: string;
}

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

    const topLanguages = Object.entries(languageCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    return NextResponse.json({
      username: user.login,
      profileUrl: user.html_url,
      avatarUrl: user.avatar_url,
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
      totalStars,
      topLanguages,
    });
  } catch (error) {
    return NextResponse.json({ error: "Unexpected GitHub API error" }, { status: 500 });
  }
}
