/**
 * India Code Registry
 *
 * Indexed metadata for acts on indiacode.nic.in.
 * Used to find correct handle URLs, PDF bitstream paths, and track act status.
 *
 * Interaction notes:
 * - Always use headed browser (never headless) — India Code blocks headless.
 * - PDF download via curl works with Referer header set to the handle page.
 * - PDF links found via DOM selector: a[href*='bitstream']
 * - Search via input#tequery on homepage, results at a[href*='view_type=search']
 * - Constitution is not listed as a regular act — separate handle (15240).
 * - SC Rules are not on India Code — hosted on sci.gov.in.
 *
 * Last indexed: 2026-03-26
 */

export interface IndiaCodeEntry {
  readonly actId: string;
  readonly indiaCodeHandle: string;
  readonly pdfBitstreamPath: string;
  readonly status: 'active' | 'repealed' | 'superseded';
  readonly supersededBy?: string;
  readonly actNumber: string;
  readonly fullTitle: string;
  readonly year: number;
  readonly source: 'indiacode' | 'sci.gov.in' | 'dpal.karnataka.gov.in';
  readonly lastIndexed: string;
}

export const INDIA_CODE_REGISTRY: readonly IndiaCodeEntry[] = [
  {
    actId: 'limitation-act-1963',
    indiaCodeHandle: '123456789/1565',
    pdfBitstreamPath: '/bitstream/123456789/1565/5/A1963-36.pdf',
    status: 'active',
    actNumber: 'Act 36 of 1963',
    fullTitle: 'The Limitation Act, 1963',
    year: 1963,
    source: 'indiacode',
    lastIndexed: '2026-03-26',
  },
  {
    actId: 'cpc-1908',
    indiaCodeHandle: '123456789/2191',
    pdfBitstreamPath: '/bitstream/123456789/2191/1/aA1908-05.pdf',
    status: 'active',
    actNumber: 'Act 5 of 1908',
    fullTitle: 'The Code of Civil Procedure, 1908',
    year: 1908,
    source: 'indiacode',
    lastIndexed: '2026-03-26',
  },
  {
    actId: 'crpc-1973',
    indiaCodeHandle: '123456789/15247',
    pdfBitstreamPath: '/bitstream/123456789/15272/1/the_code_of_criminal_procedure,_1973.pdf',
    status: 'superseded',
    supersededBy: 'bnss-2023',
    actNumber: 'Act 2 of 1974',
    fullTitle: 'The Code of Criminal Procedure, 1973',
    year: 1973,
    source: 'indiacode',
    lastIndexed: '2026-03-26',
  },
  {
    actId: 'bnss-2023',
    indiaCodeHandle: '123456789/20099',
    pdfBitstreamPath: '/bitstream/123456789/20099/1/eng.pdf',
    status: 'active',
    actNumber: 'Act 46 of 2023',
    fullTitle: 'The Bharatiya Nagarik Suraksha Sanhita, 2023',
    year: 2023,
    source: 'indiacode',
    lastIndexed: '2026-03-26',
  },
  {
    actId: 'constitution',
    indiaCodeHandle: '123456789/15240',
    pdfBitstreamPath: '/bitstream/123456789/19632/1/the_constitution_of_india.pdf',
    status: 'active',
    actNumber: '',
    fullTitle: 'The Constitution of India',
    year: 1950,
    source: 'indiacode',
    lastIndexed: '2026-03-26',
  },
  {
    actId: 'sc-rules-2013',
    indiaCodeHandle: '',
    pdfBitstreamPath: '',
    status: 'active',
    actNumber: '',
    fullTitle: 'Supreme Court Rules, 2013',
    year: 2013,
    source: 'sci.gov.in',
    lastIndexed: '2026-03-26',
  },
  {
    actId: 'karnataka-court-fees-act-1958',
    indiaCodeHandle: '',
    pdfBitstreamPath: '/bitstream/123456789/7625/1/16_of_1958_(e).pdf',
    status: 'active',
    actNumber: 'Act 16 of 1958',
    fullTitle: 'The Karnataka Court Fees and Suits Valuation Act, 1958',
    year: 1958,
    source: 'dpal.karnataka.gov.in',
    lastIndexed: '2026-03-26',
  },
  {
    actId: 'commercial-courts-act-2015',
    indiaCodeHandle: '123456789/2156',
    pdfBitstreamPath: '/bitstream/123456789/2156/1/a2016-04.pdf',
    status: 'active',
    actNumber: 'Act 4 of 2016',
    fullTitle: 'The Commercial Courts Act, 2015',
    year: 2015,
    source: 'indiacode',
    lastIndexed: '2026-03-26',
  },
  {
    actId: 'consumer-protection-act-2019',
    indiaCodeHandle: '123456789/15256',
    pdfBitstreamPath: '/bitstream/123456789/12808/1/the_consumer_protection_act,_2019_no._35_of_2019_date_09.08.2019.pdf',
    status: 'active',
    actNumber: 'Act 35 of 2019',
    fullTitle: 'The Consumer Protection Act, 2019',
    year: 2019,
    source: 'indiacode',
    lastIndexed: '2026-03-26',
  },
  {
    actId: 'family-courts-act-1984',
    indiaCodeHandle: '123456789/16127',
    pdfBitstreamPath: '/bitstream/123456789/16127/1/a1984__66.pdf',
    status: 'active',
    actNumber: 'Act 66 of 1984',
    fullTitle: 'The Family Courts Act, 1984',
    year: 1984,
    source: 'indiacode',
    lastIndexed: '2026-03-26',
  },
  {
    actId: 'karnataka-stamp-act-1957',
    indiaCodeHandle: '123456789/7744',
    pdfBitstreamPath: '/bitstream/123456789/7744/1/34_of_1957(e).pdf',
    status: 'active',
    actNumber: 'Act 34 of 1957',
    fullTitle: 'The Karnataka Stamp Act, 1957',
    year: 1957,
    source: 'indiacode',
    lastIndexed: '2026-03-26',
  },
  {
    actId: 'registration-act-1908',
    indiaCodeHandle: '123456789/2190',
    pdfBitstreamPath: '/bitstream/123456789/15937/1/the_registration_act,1908.pdf',
    status: 'active',
    actNumber: 'Act 16 of 1908',
    fullTitle: 'The Registration Act, 1908',
    year: 1908,
    source: 'indiacode',
    lastIndexed: '2026-03-26',
  },
  {
    actId: 'karnataka-court-fees-rules-1960',
    indiaCodeHandle: '',
    pdfBitstreamPath: '',
    status: 'active',
    actNumber: '',
    fullTitle: 'The Karnataka Court Fees and Suits Valuation Rules, 1960',
    year: 1960,
    source: 'indiacode',
    lastIndexed: '2026-03-26',
  },
] as const;

export function getRegistryEntry(actId: string): IndiaCodeEntry | undefined {
  return INDIA_CODE_REGISTRY.find((e) => e.actId === actId);
}

export function getIndiaCodeUrl(actId: string): string | undefined {
  const entry = getRegistryEntry(actId);
  if (!entry?.indiaCodeHandle) return undefined;
  return `https://www.indiacode.nic.in/handle/${entry.indiaCodeHandle}`;
}
