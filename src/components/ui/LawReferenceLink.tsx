'use client';

import Link from 'next/link';
import { parseLawReference } from '@/lib/legal-reference/parser';
import { buildSectionUrl } from '@/lib/legal-reference/url-builder';

interface LawReferenceLinkProps {
  /** The raw lawReference or section text (e.g., "Article 116, Limitation Act, 1963") */
  readonly reference: string;
  /** Optional act context for resolving ambiguous references (e.g., "karnataka-court-fees-act-1958") */
  readonly actContext?: string;
}

/**
 * Renders a law reference as a clickable badge linking to /laws/[act]#[section].
 * Falls back to a plain section-badge for unmatched references (e.g., case law citations).
 */
export default function LawReferenceLink({ reference, actContext }: LawReferenceLinkProps) {
  const matches = parseLawReference(reference, actContext);

  // No match — render plain badge (same as original behavior)
  if (matches.length === 0) {
    return (
      <span className="section-badge">
        {reference}
      </span>
    );
  }

  // Link to first matched section (covers single and multi-match cases)
  const url = buildSectionUrl(matches[0].sectionId);
  return (
    <Link
      href={url}
      className="section-badge-link"
      title={`View legal text: ${reference}`}
    >
      {reference}
      <svg
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        style={{ opacity: 0.5 }}
      >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    </Link>
  );
}
