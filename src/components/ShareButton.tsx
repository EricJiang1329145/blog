'use client';

import { useState, useMemo } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface ShareButtonProps {
  slug: string;
  title: string;
}

export default function ShareButton({ slug }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

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
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  return (
    <div className="mb-12 font-[family-name:var(--font-sans)]">
      <h3 className="text-sm font-medium mb-4 text-text-muted">分享文章</h3>

      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={copyToClipboard}
          className="btn-primary text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
            <polyline points="16 6 12 2 8 6"></polyline>
            <line x1="12" y1="2" x2="12" y2="15"></line>
          </svg>
          {copied ? '链接已复制' : '复制链接'}
        </button>

        <button
          onClick={() => setShowQRCode(!showQRCode)}
          className="btn-primary text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
          {showQRCode ? '隐藏二维码' : '二维码'}
        </button>
      </div>

      {showQRCode && (
        <div className="flex flex-col items-center p-6 card-paper">
          <div className="mb-3 bg-white p-2 rounded-lg border border-card-border">
            <QRCodeSVG value={shareUrl} size={180} level="M" />
          </div>
          <p className="text-xs text-text-muted mt-2 break-all">{shareUrl}</p>
        </div>
      )}
    </div>
  );
}
