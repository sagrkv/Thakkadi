'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ALL_SECTIONS, getActById } from '@/data/laws';
import { buildSectionUrl } from '@/lib/legal-reference/url-builder';
import { sectionTypeAbbrev } from '@/lib/legal-reference/section-utils';

export default function LawsSearch() {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];

    return ALL_SECTIONS.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.number.toLowerCase().includes(q) ||
        s.summary?.toLowerCase().includes(q) ||
        s.fullText.toLowerCase().includes(q)
    ).slice(0, 12);
  }, [query]);

  return (
    <div className="mb-8">
      <div className="relative">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: 'var(--color-neutral-400)' }}
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search across all legal provisions..."
          className="laws-search-input w-full py-2.5 pl-10 pr-4 text-sm rounded-lg"
          aria-label="Search legal provisions"
        />
      </div>

      {results.length > 0 && (
        <div
          className="mt-3 rounded-lg overflow-hidden"
          style={{
            border: '1px solid var(--color-neutral-200)',
            background: 'white',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          {results.map((section) => {
            const act = getActById(section.actId);
            return (
              <Link
                key={section.id}
                href={buildSectionUrl(section.id)}
                className="block px-4 py-3 transition-colors"
                style={{
                  borderBottom: '1px solid var(--color-neutral-100)',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--color-slate-50)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                }}
              >
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="section-badge" style={{ fontSize: '0.6rem' }}>
                    {sectionTypeAbbrev(section.sectionType)} {section.number}
                  </span>
                  <span
                    className="text-xs font-semibold"
                    style={{ color: 'var(--color-slate-800)' }}
                  >
                    {section.title}
                  </span>
                </div>
                <p
                  className="text-xs"
                  style={{ color: 'var(--color-neutral-500)' }}
                >
                  {act?.shortName ?? section.actId}
                </p>
              </Link>
            );
          })}
        </div>
      )}

      {query.trim().length >= 2 && results.length === 0 && (
        <p
          className="mt-3 text-xs text-center py-3"
          style={{ color: 'var(--color-neutral-500)' }}
        >
          No matching provisions found for &ldquo;{query}&rdquo;
        </p>
      )}
    </div>
  );
}
