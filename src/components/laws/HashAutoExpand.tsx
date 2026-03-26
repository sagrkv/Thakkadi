'use client';

import { useEffect } from 'react';

/**
 * - Opens a <details> targeted by URL hash on mount / hash change.
 * - Expands all <details class="law-section-details"> before print (Cmd+P).
 */
export default function HashAutoExpand() {
  useEffect(() => {
    function expandHash() {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      const el = document.getElementById(hash);
      if (el instanceof HTMLDetailsElement && !el.open) {
        el.open = true;
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
    }

    function expandAllForPrint() {
      document.querySelectorAll<HTMLDetailsElement>('.law-section-details')
        .forEach((el) => { el.open = true; });
    }

    expandHash();
    window.addEventListener('hashchange', expandHash);
    window.addEventListener('beforeprint', expandAllForPrint);
    return () => {
      window.removeEventListener('hashchange', expandHash);
      window.removeEventListener('beforeprint', expandAllForPrint);
    };
  }, []);

  return null;
}
