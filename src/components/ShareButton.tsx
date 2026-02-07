'use client';

import { useState, useMemo, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { initAllButtonEffects } from "@/lib/buttonEffects";

interface ShareButtonProps {
  slug: string;
  title: string;
}

export default function ShareButton({ slug, title }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  useEffect(() => {
    // 初始化按钮效果
    initAllButtonEffects();
  }, []);

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
      
      {/* 分享选项按钮 */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={copyToClipboard}
          className={`flex items-center gap-2 bg-neon-green/10 text-neon-green px-4 py-2 rounded-lg share-button-strong btn-strong-interactive ${copied ? 'copied' : ''}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
            <polyline points="16 6 12 2 8 6"></polyline>
            <line x1="12" y1="2" x2="12" y2="15"></line>
          </svg>
          {copied ? '链接已复制！' : '复制分享链接'}
        </button>
        
        <button
          onClick={() => setShowQRCode(!showQRCode)}
          className="flex items-center gap-2 bg-neon-purple/10 text-neon-purple px-4 py-2 rounded-lg share-button-strong btn-strong-interactive"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
          {showQRCode ? '隐藏二维码' : '显示二维码'}
        </button>
      </div>
      
      {/* 二维码显示区域 */}
      {showQRCode && (
        <div className="flex flex-col items-center p-6 bg-card-bg rounded-lg border border-neon-purple/20 shadow-lg shadow-neon-purple/10">
          <div className="mb-4 bg-white p-2 rounded-lg">
            <QRCodeSVG value={shareUrl} size={200} level="M" />
          </div>
          <p className="text-center text-sm text-foreground/70">
            扫描二维码分享文章<br />
            <span className="text-xs mt-2 block text-foreground/50">{shareUrl}</span>
          </p>
        </div>
      )}
      
      <p className="mt-4 text-sm text-foreground/60">
        分享到社交媒体或发送给朋友
      </p>
    </div>
  );
}
