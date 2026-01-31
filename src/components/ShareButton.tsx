'use client';

import { useState, useMemo } from 'react';

interface ShareButtonProps {
  slug: string;
  title: string;
}

export default function ShareButton({ slug, title }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = useMemo(() => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/posts/${slug}`;
    }
    return `/posts/${slug}`;
  }, [slug]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      
      // 3秒后重置状态
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  return (
    <div className="mb-12">
      <h3 className="text-lg font-medium mb-4 text-foreground/80">分享文章</h3>
      <button
        onClick={copyToClipboard}
        className="flex items-center gap-2 bg-neon-green/10 hover:bg-neon-green/20 text-neon-green px-4 py-2 rounded-lg transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
          <polyline points="16 6 12 2 8 6"></polyline>
          <line x1="12" y1="2" x2="12" y2="15"></line>
        </svg>
        {copied ? '链接已复制！' : '复制分享链接'}
      </button>
      <p className="mt-2 text-sm text-foreground/60">
        分享到社交媒体或发送给朋友
      </p>
    </div>
  );
}
