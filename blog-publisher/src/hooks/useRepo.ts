import { useCallback, useState } from 'react';
import { syncRepo } from '../lib/git';

export function useRepo() {
  const [repoPath, setRepoPath] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sync = useCallback(async () => {
    setSyncing(true);
    setError(null);
    try {
      const path = await syncRepo();
      setRepoPath(path);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSyncing(false);
    }
  }, []);

  return { repoPath, sync, syncing, error };
}
