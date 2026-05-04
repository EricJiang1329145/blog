import { useState } from 'react';
import { cloneRepo } from '../lib/git';
import { appDataDir } from '@tauri-apps/api/path';

export function useRepo() {
  const [repoPath, setRepoPath] = useState<string | null>(
    localStorage.getItem('repo_path')
  );
  const [syncing, setSyncing] = useState(false);

  const sync = async (token: string) => {
    setSyncing(true);
    try {
      const baseDir = await appDataDir();
      const path = `${baseDir}/blog-repo`;
      await cloneRepo(token, path);
      setRepoPath(path);
      localStorage.setItem('repo_path', path);
    } finally {
      setSyncing(false);
    }
  };

  return { repoPath, sync, syncing };
}