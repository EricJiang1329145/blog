// GitHub API helper for PAT authentication
const GITHUB_API = 'https://api.github.com';

export async function validateToken(token: string): Promise<boolean> {
  const response = await fetch(`${GITHUB_API}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
    },
  });
  return response.ok;
}

export async function getRepoInfo(token: string, owner: string, repo: string) {
  const response = await fetch(`${GITHUB_API}/repos/${owner}/${repo}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
    },
  });
  if (!response.ok) throw new Error('Repo not found');
  return response.json();
}