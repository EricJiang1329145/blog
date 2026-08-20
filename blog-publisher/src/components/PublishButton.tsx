import { useState } from 'react';
import { commitAndPush } from '../lib/git';

interface Props {
  filePath: string;
  content: string;
  onSuccess?: () => void;
}

export function PublishButton({ filePath, content, onSuccess }: Props) {
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const publish = async () => {
    setPublishing(true);
    setError(null);
    try {
      const timestamp = new Date().toISOString();
      const filename = filePath.split('/').pop() || 'unknown';
      const message = `publish: ${filename} ${timestamp}`;
      await commitAndPush(filePath, content, message);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={publish}
        disabled={publishing}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {publishing ? '发布中...' : '发布'}
      </button>
      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}
    </div>
  );
}
