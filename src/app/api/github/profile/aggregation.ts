export interface GithubLanguage {
  name: string;
  count: number;
  percentage: number;
}

export interface GithubCommitWeek {
  week: string;
  count: number;
}

const COMMIT_ACTIVITY_WEEKS = 12;

export function buildLanguageSummary(repos: Array<{ language?: string }>): GithubLanguage[] {
  const languageCount: Record<string, number> = {};

  repos.forEach((repo) => {
    if (repo.language) {
      languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
    }
  });

  const totalLanguageVotes = Object.values(languageCount).reduce((a, b) => a + b, 0) || 1;

  return Object.entries(languageCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / totalLanguageVotes) * 1000) / 10,
    }));
}

export function buildCommitActivity(
  repoWeeks: Array<Array<{ week: number; total: number }> | null>
): GithubCommitWeek[] {
  const weeklyTotals = new Map<number, number>();

  repoWeeks.forEach((weeks) => {
    if (!weeks) return;
    weeks.forEach((wk) => {
      weeklyTotals.set(wk.week, (weeklyTotals.get(wk.week) || 0) + (wk.total || 0));
    });
  });

  return Array.from(weeklyTotals.entries())
    .sort((a, b) => a[0] - b[0])
    .slice(-COMMIT_ACTIVITY_WEEKS)
    .map(([weekUnix, count]) => ({
      week: new Date(weekUnix * 1000).toISOString().slice(0, 10),
      count,
    }));
}
