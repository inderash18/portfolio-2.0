export interface GitHubRepoStats {
  stars: number;
  forks: number;
  language: string;
  updatedAt: string;
}

/**
 * Fetches real-time stars, forks, main language, and last-updated metrics for a repository.
 * Falls back to static counts if rate limited or if the repo is private/unavailable.
 * 
 * @param repoPath Format: 'username/repo-name' e.g. 'Inderash/CampusFinder-AI'
 * @param defaultStars Static stars count fallback
 * @param defaultForks Static forks count fallback
 */
export async function fetchGitHubStats(
  repoPath: string,
  defaultStars = 0,
  defaultForks = 0
): Promise<GitHubRepoStats> {
  const cleanRepo = repoPath.replace("https://github.com/", "");

  try {
    const response = await fetch(`https://api.github.com/repos/${cleanRepo}`, {
      next: { revalidate: 3600 }, // Cache response for 1 hour
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "inderash-portfolio",
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with status ${response.status}`);
    }

    const data = await response.json();

    return {
      stars: data.stargazers_count ?? defaultStars,
      forks: data.forks_count ?? defaultForks,
      language: data.language ?? "TypeScript",
      updatedAt: new Date(data.updated_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    };
  } catch (error) {
    console.warn(`Failed to fetch stats for ${cleanRepo}. Using static fallbacks.`, error);
    return {
      stars: defaultStars,
      forks: defaultForks,
      language: "JavaScript",
      updatedAt: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    };
  }
}
