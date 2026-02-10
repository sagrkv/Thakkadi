/**
 * Registry of regex patterns that map freeform lawReference strings to section IDs.
 * Patterns are tried in order; first match wins.
 */

interface RegistryEntry {
  readonly pattern: RegExp;
  readonly sectionId: string;
}

/**
 * Patterns for the Limitation Act limitation-rules lawReference strings.
 * These match patterns like "Article 116, Limitation Act" or "Article 124".
 */
const LIMITATION_ACT_PATTERNS: readonly RegistryEntry[] = [
  { pattern: /Article\s+115/i, sectionId: 'limitation-act-1963/article-115' },
  { pattern: /Article\s+116/i, sectionId: 'limitation-act-1963/article-116' },
  { pattern: /Article\s+124/i, sectionId: 'limitation-act-1963/article-124' },
  { pattern: /Article\s+131/i, sectionId: 'limitation-act-1963/article-131' },
  { pattern: /Article\s+133,?\s*Limitation/i, sectionId: 'limitation-act-1963/article-133' },
  { pattern: /Article\s+136,?\s*Limitation/i, sectionId: 'limitation-act-1963/article-136' },
];

/**
 * Patterns for the CPC.
 */
const CPC_PATTERNS: readonly RegistryEntry[] = [
  { pattern: /Section\s+115,?\s*CPC/i, sectionId: 'cpc-1908/section-115' },
  { pattern: /Order\s+XLVII/i, sectionId: 'cpc-1908/order-xlvii' },
  { pattern: /\bOrder\s+XL\b/i, sectionId: 'cpc-1908/order-xl' },
];

/**
 * Patterns for the CrPC.
 */
const CRPC_PATTERNS: readonly RegistryEntry[] = [
  { pattern: /Section\s+374,?\s*CrPC/i, sectionId: 'crpc-1973/section-374' },
  { pattern: /Section\s+379,?\s*CrPC/i, sectionId: 'crpc-1973/section-379' },
  { pattern: /Section\s+397[-\s,]*(?:401)?.*CrPC/i, sectionId: 'crpc-1973/section-397' },
  { pattern: /Section\s+482.*CrPC/i, sectionId: 'crpc-1973/section-482' },
];

/**
 * Patterns for the Constitution.
 */
const CONSTITUTION_PATTERNS: readonly RegistryEntry[] = [
  { pattern: /Article\s+132,?\s*Constitution/i, sectionId: 'constitution/article-132' },
  { pattern: /Article\s+133,?\s*Constitution/i, sectionId: 'constitution/article-133' },
  { pattern: /Article\s+134,?\s*Constitution/i, sectionId: 'constitution/article-134' },
  { pattern: /Article\s+136,?\s*Constitution/i, sectionId: 'constitution/article-136' },
  { pattern: /Art(?:icle)?\.?\s*226/i, sectionId: 'constitution/article-226' },
  { pattern: /Art(?:icle)?\.?\s*227/i, sectionId: 'constitution/article-227' },
];

/**
 * Patterns for SC Rules 2013.
 */
const SC_RULES_PATTERNS: readonly RegistryEntry[] = [
  { pattern: /SC\s*Rules?\s*Order\s*XIII/i, sectionId: 'sc-rules-2013/order-xiii' },
  { pattern: /SC\s*Rules?\s*Order\s*XXI/i, sectionId: 'sc-rules-2013/order-xxi' },
  { pattern: /Order\s+XL,?\s*(?:Supreme\s*Court|SC)\s*Rules/i, sectionId: 'sc-rules-2013/order-xl' },
];

/**
 * Patterns for Karnataka Court Fees Act (used with actContext).
 * These match the abbreviated section references used in suit-categories.ts.
 */
const KARNATAKA_CF_PATTERNS: readonly RegistryEntry[] = [
  { pattern: /^Art\.\s*1$/i, sectionId: 'karnataka-court-fees-act-1958/schedule-i-article-1' },
  { pattern: /^Schedule\s*I,?\s*Article\s*1$/i, sectionId: 'karnataka-court-fees-act-1958/schedule-i-article-1' },
  { pattern: /^Sec\s*24\(a\)$/i, sectionId: 'karnataka-court-fees-act-1958/section-24' },
  { pattern: /^Sec\s*24\(b\)$/i, sectionId: 'karnataka-court-fees-act-1958/section-24' },
  { pattern: /^Sec\s*24\(d\)$/i, sectionId: 'karnataka-court-fees-act-1958/section-24' },
  { pattern: /^Sec\s*25$/i, sectionId: 'karnataka-court-fees-act-1958/section-25' },
  { pattern: /^Sec\s*26\(a\)$/i, sectionId: 'karnataka-court-fees-act-1958/section-26' },
  { pattern: /^Sec\s*26\(b\)\/?\(c\)$/i, sectionId: 'karnataka-court-fees-act-1958/section-26' },
  { pattern: /^Sec\s*27$/i, sectionId: 'karnataka-court-fees-act-1958/section-27' },
  { pattern: /^Sec\s*28$/i, sectionId: 'karnataka-court-fees-act-1958/section-28' },
  { pattern: /^Sec\s*29$/i, sectionId: 'karnataka-court-fees-act-1958/section-29' },
  { pattern: /^Sec\s*30$/i, sectionId: 'karnataka-court-fees-act-1958/section-30' },
  { pattern: /^Sec\s*31$/i, sectionId: 'karnataka-court-fees-act-1958/section-31' },
  { pattern: /^Sec\s*32\([a-e]\)$/i, sectionId: 'karnataka-court-fees-act-1958/section-32' },
  { pattern: /^Sec\s*33$/i, sectionId: 'karnataka-court-fees-act-1958/section-33' },
  { pattern: /^Sec\s*34$/i, sectionId: 'karnataka-court-fees-act-1958/section-34' },
  { pattern: /^Sec\s*35\(1\)$/i, sectionId: 'karnataka-court-fees-act-1958/section-35' },
  { pattern: /^Sec\s*35\(2\)$/i, sectionId: 'karnataka-court-fees-act-1958/section-35' },
  { pattern: /^Sec\s*36$/i, sectionId: 'karnataka-court-fees-act-1958/section-36' },
  { pattern: /^Sec\s*37$/i, sectionId: 'karnataka-court-fees-act-1958/section-37' },
  { pattern: /^Sec\s*38$/i, sectionId: 'karnataka-court-fees-act-1958/section-38' },
  { pattern: /^Sec\s*39$/i, sectionId: 'karnataka-court-fees-act-1958/section-39' },
  { pattern: /^Sec\s*40\([a-e]\)$/i, sectionId: 'karnataka-court-fees-act-1958/section-40' },
  { pattern: /^Sec\s*41$/i, sectionId: 'karnataka-court-fees-act-1958/section-41' },
  { pattern: /^Sec\s*42$/i, sectionId: 'karnataka-court-fees-act-1958/section-42' },
  { pattern: /^Sec\s*43$/i, sectionId: 'karnataka-court-fees-act-1958/section-43' },
  { pattern: /^Sec\s*44$/i, sectionId: 'karnataka-court-fees-act-1958/section-44' },
  { pattern: /^Sec\s*45$/i, sectionId: 'karnataka-court-fees-act-1958/section-45' },
  { pattern: /^Sec\s*47$/i, sectionId: 'karnataka-court-fees-act-1958/section-47' },
  { pattern: /^Sec\s*48$/i, sectionId: 'karnataka-court-fees-act-1958/section-48' },
  { pattern: /^Sec\s*49\s*\/?\s*Art\.\s*1$/i, sectionId: 'karnataka-court-fees-act-1958/section-49' },
  { pattern: /^Art\.\s*2\(a\)$/i, sectionId: 'karnataka-court-fees-act-1958/schedule-i-article-2a' },
  { pattern: /^Art\.\s*4$/i, sectionId: 'karnataka-court-fees-act-1958/schedule-i-article-4' },
  { pattern: /^Art\.\s*5$/i, sectionId: 'karnataka-court-fees-act-1958/schedule-i-article-5' },
  { pattern: /^Art\.\s*5A$/i, sectionId: 'karnataka-court-fees-act-1958/schedule-i-article-5a' },
  { pattern: /^Art\.\s*5AA$/i, sectionId: 'karnataka-court-fees-act-1958/schedule-i-article-5aa' },
  { pattern: /^Art\.\s*6$/i, sectionId: 'karnataka-court-fees-act-1958/schedule-i-article-6' },
  { pattern: /^Art\.\s*226\/227$/i, sectionId: 'constitution/article-226' },
];

/**
 * Global patterns (tried when no actContext is provided).
 * Order matters: more specific patterns first.
 */
export const GLOBAL_PATTERNS: readonly RegistryEntry[] = [
  ...SC_RULES_PATTERNS,
  ...LIMITATION_ACT_PATTERNS,
  ...CPC_PATTERNS,
  ...CRPC_PATTERNS,
  ...CONSTITUTION_PATTERNS,
] as const;

/**
 * Context-specific patterns (tried when actContext matches).
 */
export const CONTEXT_PATTERNS: ReadonlyMap<string, readonly RegistryEntry[]> = new Map([
  ['karnataka-court-fees-act-1958', KARNATAKA_CF_PATTERNS],
]);
