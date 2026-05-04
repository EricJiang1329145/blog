import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export function TokenInput() {
  const { saveToken, loading, error } = useAuth();
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      saveToken(input.trim());
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Blog Publisher</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Enter your GitHub Personal Access Token to continue.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="ghp_xxxxxxxxxxxx"
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Validating...' : 'Continue'}
          </button>
        </form>
        <p className="mt-4 text-xs text-gray-400">
          Token needs <code>repo</code> scope. Create at github.com -&gt; Settings -&gt; Developer settings -&gt; Personal access tokens.
        </p>
      </div>
    </div>
  );
}