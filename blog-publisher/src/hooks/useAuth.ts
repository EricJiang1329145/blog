import { useState, useEffect } from 'react';
import { getOAuthUrl, exchangeCodeForToken } from '../lib/github';
import { open } from '@tauri-apps/plugin-shell';

export function useAuth() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('github_token')
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle OAuth callback on app load
  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      if (code) {
        setLoading(true);
        try {
          const accessToken = await exchangeCodeForToken(code);
          localStorage.setItem('github_token', accessToken);
          setToken(accessToken);
          // Clean URL
          window.history.replaceState({}, '', '/');
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Auth failed');
        } finally {
          setLoading(false);
        }
      }
    };

    if (window.location.search.includes('code=')) {
      handleCallback();
    }
  }, []);

  const login = async () => {
    try {
      const url = getOAuthUrl();
      await open(url);
    } catch (err) {
      setError('Failed to open browser');
    }
  };

  const logout = () => {
    localStorage.removeItem('github_token');
    setToken(null);
  };

  return { token, login, logout, loading, error, isAuthenticated: !!token };
}