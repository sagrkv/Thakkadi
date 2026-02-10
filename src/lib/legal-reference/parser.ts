import { GLOBAL_PATTERNS, CONTEXT_PATTERNS } from './registry';

export interface ParsedReference {
  readonly sectionId: string;
  readonly matchedText: string;
}

/**
 * Parse a freeform lawReference string and return all matched section IDs.
 *
 * When actContext is provided, context-specific patterns are tried first
 * (e.g., "Art. 1" resolves to Karnataka Court Fees when actContext is set).
 *
 * If no actContext or context patterns don't match, global patterns are tried.
 * Multiple matches are possible (e.g., "Section 115, CPC read with Article 131").
 *
 * Returns an empty array for unmatched references (e.g., case law citations).
 */
export function parseLawReference(
  rawText: string,
  actContext?: string
): readonly ParsedReference[] {
  const matches: ParsedReference[] = [];
  const seen = new Set<string>();

  // Try context-specific patterns first
  if (actContext) {
    const contextPatterns = CONTEXT_PATTERNS.get(actContext);
    if (contextPatterns) {
      for (const entry of contextPatterns) {
        if (entry.pattern.test(rawText) && !seen.has(entry.sectionId)) {
          seen.add(entry.sectionId);
          matches.push({ sectionId: entry.sectionId, matchedText: rawText });
        }
      }
    }
  }

  // If no context matches, try global patterns
  if (matches.length === 0) {
    for (const entry of GLOBAL_PATTERNS) {
      if (entry.pattern.test(rawText) && !seen.has(entry.sectionId)) {
        seen.add(entry.sectionId);
        matches.push({ sectionId: entry.sectionId, matchedText: rawText });
      }
    }
  }

  return matches;
}
