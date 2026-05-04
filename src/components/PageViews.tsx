'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const pageViewCache: Record<string, string> = {};

export default function PageViews() {
  const pathname = usePathname();
  const [kvCount, setKvCount] = useState<number | null>(null);
  const slug = pathname.split('/posts/')[1];

  useEffect(() => {
    const el = document.getElementById('busuanzi_value_page_pv');

    if (pageViewCache[pathname]) {
      if (el) el.textContent = pageViewCache[pathname];
      return;
    }

    const capture = () => {
      if (el?.textContent) pageViewCache[pathname] = el.textContent;
    };

    const obs = new MutationObserver(capture);
    if (el) obs.observe(el, { childList: true, characterData: true });

    capture();
    const timer = setTimeout(capture, 4000);

    return () => {
      capture();
      obs.disconnect();
      clearTimeout(timer);
    };
  }, [pathname]);

  useEffect(() => {
    if (!slug) return;
    fetch('/api/pageviews', { method: 'POST', body: JSON.stringify({ slug }) }).catch(() => {});
    fetch(`/api/pageviews?slug=${encodeURIComponent(slug)}`)
      .then(r => r.json() as Promise<{ pv?: number }>)
      .then(d => { if (d.pv) setKvCount(d.pv); })
      .catch(() => {});
  }, [slug]);

  return (
    <span className="text-text-muted text-xs font-[family-name:var(--font-sans)]">
      <span id="busuanzi_value_page_pv"></span>
      {kvCount !== null && <span className="ml-1">({kvCount})</span>}
      <span className="ml-0.5">次阅读</span>
    </span>
  );
}
