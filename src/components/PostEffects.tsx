'use client';

import { useEffect } from 'react';

export default function PostEffects() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // ---- copy button ----
      const copyBtn = target.closest('.copy-button');
      if (copyBtn) {
        const code = decodeURIComponent(copyBtn.getAttribute('data-code') || '');
        navigator.clipboard.writeText(code).then(() => {
          copyBtn.classList.add('copied');
          const svg = copyBtn.querySelector('svg');
          const label = copyBtn.lastChild;
          if (label) label.textContent = ' 已复制';
          setTimeout(() => {
            copyBtn.classList.remove('copied');
            if (label) label.textContent = ' 复制';
          }, 2000);
        });
        return;
      }

      // ---- footnote button ----
      const fnBtn = target.closest('.footnote-button');
      if (fnBtn) {
        e.preventDefault();
        const footnoteId = fnBtn.getAttribute('data-footnote-id');
        if (!footnoteId) return;

        const tooltip = document.getElementById(`footnote-tooltip-${footnoteId}`);
        const definition = document.getElementById(`footnote-${footnoteId}`);

        if (tooltip && definition && tooltip.style.display !== 'block') {
          document.querySelectorAll('.footnote-tooltip').forEach(el => {
            (el as HTMLElement).style.display = 'none';
          });
          tooltip.innerHTML = definition.innerHTML;
          tooltip.style.display = 'block';
        } else if (tooltip) {
          tooltip.style.display = 'none';
        }
        return;
      }

      // ---- close footnote tooltips when clicking outside ----
      if (!target.closest('.footnote-ref')) {
        document.querySelectorAll('.footnote-tooltip').forEach(el => {
          (el as HTMLElement).style.display = 'none';
        });
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
