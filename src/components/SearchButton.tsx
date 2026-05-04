'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface SearchItem {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  category?: string;
  date: string;
}

export default function SearchButton() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const [index, setIndex] = useState<SearchItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/search-index.json')
      .then(r => r.json() as Promise<SearchItem[]>)
      .then(data => setIndex(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(v => !v);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const search = useCallback((q: string) => {
    setQuery(q);
    if (!q.trim() || !index.length) { setResults([]); return; }
    const lower = q.toLowerCase();
    const filtered = index.filter(item =>
      item.title.toLowerCase().includes(lower) ||
      item.description.toLowerCase().includes(lower) ||
      item.tags.some(t => t.toLowerCase().includes(lower)) ||
      (item.category && item.category.toLowerCase().includes(lower))
    ).slice(0, 10);
    setResults(filtered);
  }, [index]);

  const handleSelect = (slug: string) => {
    setOpen(false);
    router.push(`/posts/${slug}`);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded text-text-secondary hover:text-accent transition-colors"
        aria-label="搜索"
        title="搜索 (Ctrl+K)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-lg mx-4 bg-card-bg border border-card-border rounded-xl shadow-2xl overflow-hidden">
            <div className="flex items-center border-b border-card-border px-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-muted shrink-0">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => search(e.target.value)}
                placeholder="搜索文章..."
                className="w-full px-3 py-4 bg-transparent text-foreground placeholder:text-text-muted outline-none font-[family-name:var(--font-sans)]"
              />
              <kbd className="hidden sm:inline-block text-xs text-text-muted bg-background px-1.5 py-0.5 rounded border border-card-border ml-2 shrink-0">ESC</kbd>
            </div>

            {results.length > 0 && (
              <ul className="max-h-72 overflow-y-auto py-2">
                {results.map(item => (
                  <li key={item.slug}>
                    <button
                      onClick={() => handleSelect(item.slug)}
                      className="w-full text-left px-4 py-3 hover:bg-background transition-colors"
                    >
                      <span className="block text-sm font-medium text-foreground truncate font-[family-name:var(--font-serif)]">
                        {item.title}
                      </span>
                      <span className="block text-xs text-text-muted mt-0.5 truncate font-[family-name:var(--font-sans)]">
                        {item.description}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {query && results.length === 0 && (
              <div className="px-4 py-8 text-center text-text-muted text-sm font-[family-name:var(--font-sans)]">
                未找到相关文章
              </div>
            )}

            {!query && (
              <div className="px-4 py-6 text-center text-text-muted text-xs font-[family-name:var(--font-sans)]">
                输入关键词搜索文章标题、描述和标签
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
