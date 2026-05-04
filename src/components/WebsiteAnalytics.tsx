'use client';

import { useEffect, useState } from 'react';

let cachedPV: string | null = null;
let cachedUV: string | null = null;

export default function WebsiteAnalytics() {
  const [kvPV, setKvPV] = useState<number | null>(null);
  const [kvUV, setKvUV] = useState<number | null>(null);

  useEffect(() => {
    const pvEl = document.getElementById('busuanzi_value_site_pv');
    const uvEl = document.getElementById('busuanzi_value_site_uv');

    if (cachedPV && cachedUV) {
      if (pvEl) pvEl.textContent = cachedPV;
      if (uvEl) uvEl.textContent = cachedUV;
      return;
    }

    const capture = () => {
      if (pvEl?.textContent) cachedPV = pvEl.textContent;
      if (uvEl?.textContent) cachedUV = uvEl.textContent;
    };

    const obs = new MutationObserver(capture);
    if (pvEl) obs.observe(pvEl, { childList: true, characterData: true });
    if (uvEl) obs.observe(uvEl, { childList: true, characterData: true });

    capture();
    const timer = setTimeout(capture, 4000);

    return () => {
      capture();
      obs.disconnect();
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    fetch('/api/pageviews?site=true')
      .then(r => r.json() as Promise<{ pv?: number; uv?: number }>)
      .then(d => {
        if (d.pv) setKvPV(d.pv);
        if (d.uv) setKvUV(d.uv);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="card-paper p-5 font-[family-name:var(--font-sans)]">
      <h3 className="text-sm font-medium mb-4 text-text-muted">站点统计</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center p-3 rounded-lg bg-background">
          <span className="text-sm text-text-secondary">总访问量</span>
          <span className="text-accent font-semibold text-sm">
            {kvPV !== null ? (
              <span>{kvPV.toLocaleString()} <span className="text-xs ml-1 text-text-muted font-normal">次</span></span>
            ) : (
              <span>
                <span id="busuanzi_value_site_pv"></span>
                <span className="text-xs ml-1 text-text-muted font-normal">次</span>
              </span>
            )}
          </span>
        </div>
        <div className="flex justify-between items-center p-3 rounded-lg bg-background">
          <span className="text-sm text-text-secondary">访客数</span>
          <span className="text-accent-secondary font-semibold text-sm">
            {kvUV !== null ? (
              <span>{kvUV.toLocaleString()} <span className="text-xs ml-1 text-text-muted font-normal">人</span></span>
            ) : (
              <span>
                <span id="busuanzi_value_site_uv"></span>
                <span className="text-xs ml-1 text-text-muted font-normal">人</span>
              </span>
            )}
          </span>
        </div>
        <div className="text-xs text-center text-text-muted pt-1">
          由{' '}
          <a href="https://busuanzi.ibruce.info/" target="_blank" rel="noopener noreferrer" className="text-accent-secondary hover:text-accent transition-colors">
            不蒜子 & KV
          </a>{' '}
          提供
        </div>
      </div>
    </div>
  );
}
