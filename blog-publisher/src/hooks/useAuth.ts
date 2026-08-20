import { useEffect, useState } from 'react';
import { openUrl } from '@tauri-apps/plugin-opener';
import {
  clearGitHubSession,
  pollDeviceAuthorization,
  startDeviceAuthorization,
} from '../lib/github';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deviceCode, setDeviceCode] = useState<string | null>(null);
  const [verificationUri, setVerificationUri] = useState<string | null>(null);

  useEffect(() => {
    localStorage.removeItem('github_token');
  }, []);

  const login = async () => {
    setLoading(true);
    setError(null);
    try {
      const authorization = await startDeviceAuthorization();
      setDeviceCode(authorization.userCode);
      setVerificationUri(authorization.verificationUri);
      await openUrl(authorization.verificationUri);

      const deadline = Date.now() + authorization.expiresIn * 1000;
      let interval = authorization.interval * 1000;
      while (Date.now() < deadline) {
        await new Promise(resolve => window.setTimeout(resolve, interval));
        const result = await pollDeviceAuthorization(authorization.deviceCode);
        if (result.status === 'authorized') {
          setIsAuthenticated(true);
          setDeviceCode(null);
          setVerificationUri(null);
          return;
        }
        if (result.status === 'authorization_pending') continue;
        if (result.status === 'slow_down') {
          interval += 5000;
          continue;
        }
        throw new Error(result.message || `GitHub authorization failed: ${result.status}`);
      }
      throw new Error('GitHub authorization expired. Please try again.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in with GitHub');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await clearGitHubSession().catch(() => undefined);
    setIsAuthenticated(false);
    setDeviceCode(null);
    setVerificationUri(null);
  };

  return {
    login,
    logout,
    loading,
    error,
    isAuthenticated,
    deviceCode,
    verificationUri,
  };
}
