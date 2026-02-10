'use client';

import React, { useEffect, useState } from 'react';

/**
 * 网站数据分析组件
 * 使用不蒜子统计网站访问量
 */
export default function WebsiteAnalytics() {
  const [isClient, setIsClient] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  // 只在客户端执行
  useEffect(() => {
    setIsClient(true);
    setLoading(false);
    setScriptLoaded(true);
  }, []);

  return (
    <div className="bg-card-bg p-6 rounded-lg border border-neon-green/20">
      <h3 className="text-lg font-bold mb-4 neon-text-purple">网站数据分析</h3>
      <div className="space-y-4">
        <div className="text-foreground/70 space-y-4">
          <div className="flex justify-between items-center p-3 bg-card-bg/50 rounded-lg border border-neon-green/10">
            <span className="font-medium">站点总访问量</span>
            <span className="neon-text-green font-bold">
              <span id="busuanzi_value_site_pv"></span>
              <span className="text-sm ml-1">次</span>
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-card-bg/50 rounded-lg border border-neon-green/10">
            <span className="font-medium">站点访客数</span>
            <span className="neon-text-purple font-bold">
              <span id="busuanzi_value_site_uv"></span>
              <span className="text-sm ml-1">人次</span>
            </span>
          </div>
          <div className="text-xs text-center text-foreground/50 mt-4">
            数据统计由 <a href="https://busuanzi.ibruce.info/" target="_blank" rel="noopener noreferrer" className="hover:neon-text-green transition-all">不蒜子</a> 提供
          </div>
        </div>
      </div>
    </div>
  );
}
