'use client';

import { useEffect, useState, useCallback } from 'react';

export default function ImageLightbox() {
  const [src, setSrc] = useState<string | null>(null);
  const [alt, setAlt] = useState('');

  const close = useCallback(() => {
    setSrc(null);
    setAlt('');
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.matches('img')) return;

      const img = target as HTMLImageElement;
      if (!img.src || img.closest('a')) return; // skip linked images

      e.preventDefault();
      setSrc(img.src);
      setAlt(img.alt || '');
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [close]);

  if (!src) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-zoom-out"
      onClick={close}
    >
      {/* The lightbox renders an arbitrary already-loaded article URL, so Next Image cannot optimize it. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="max-w-[92vw] max-h-[92vh] object-contain rounded shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      {alt && (
        <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm font-[family-name:var(--font-sans)]">
          {alt}
        </p>
      )}
    </div>
  );
}
