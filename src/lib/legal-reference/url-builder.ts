/**
 * Extract the anchor portion of a section ID (the part after the slash).
 * "limitation-act-1963/article-116" → "article-116"
 */
export function sectionAnchor(sectionId: string): string {
  const slash = sectionId.indexOf('/');
  return slash === -1 ? sectionId : sectionId.slice(slash + 1);
}

/**
 * Build a URL for a legal section.
 * Section IDs follow the format "actSlug/sectionAnchor".
 *
 * Examples:
 *   "limitation-act-1963/article-116" → "/laws/limitation-act-1963#article-116"
 *   "karnataka-court-fees-act-1958/section-24" → "/laws/karnataka-court-fees-act-1958#section-24"
 */
export function buildSectionUrl(sectionId: string): string {
  const slashIndex = sectionId.indexOf('/');
  if (slashIndex === -1) {
    return `/laws/${sectionId}`;
  }

  const actSlug = sectionId.slice(0, slashIndex);
  const anchor = sectionId.slice(slashIndex + 1);

  return `/laws/${actSlug}#${anchor}`;
}
