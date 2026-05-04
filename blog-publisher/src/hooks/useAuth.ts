import { useState } from 'react';
import { validateToken } from '../lib/github';

export function useAuth() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('github_token')
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveToken = async (newToken: string) => {
    setLoading(true);
    setError(null);
    try {
      const valid = await validateToken(newToken);
      if (valid) {
        localStorage.setItem('github_token', newToken);
        setToken(newToken);
      } else {
        setError('Invalid token');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Validation failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('github_token');
    setToken(null);
  };

  return { token, saveToken, logout, loading, error, isAuthenticated: !!token };
}