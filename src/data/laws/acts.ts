import type { LegalAct } from '@/types/legal-reference';

export const LEGAL_ACTS: readonly LegalAct[] = [
  {
    id: 'limitation-act-1963',
    shortName: 'Limitation Act',
    fullName: 'The Limitation Act, 1963',
    year: 1963,
    category: 'central_act',
    description:
      'Prescribes the time limits within which suits, appeals, and applications must be filed in courts. The First Division of the Schedule deals with suits, the Second with appeals, and the Third with applications.',
    externalLinks: [
      { label: 'India Code', url: 'https://www.indiacode.nic.in/handle/123456789/1565' },
      { label: 'Indian Kanoon', url: 'https://indiankanoon.org/doc/1317393/' },
    ],
    lastVerified: '2025-01-15',
  },
  {
    id: 'cpc-1908',
    shortName: 'CPC',
    fullName: 'The Code of Civil Procedure, 1908',
    year: 1908,
    category: 'central_act',
    description:
      'The procedural law governing civil litigation in India. Contains provisions for appeals, revision, review, and execution of decrees.',
    externalLinks: [
      { label: 'India Code', url: 'https://www.indiacode.nic.in/handle/123456789/2191' },
      { label: 'Indian Kanoon', url: 'https://indiankanoon.org/doc/100581/' },
    ],
    lastVerified: '2025-01-15',
  },
  {
    id: 'crpc-1973',
    shortName: 'CrPC',
    fullName: 'The Code of Criminal Procedure, 1973',
    year: 1973,
    category: 'central_act',
    description:
      'The procedural law governing the administration of criminal justice in India. Provides for appeals, revision, and inherent powers of courts in criminal matters.',
    externalLinks: [
      { label: 'India Code', url: 'https://www.indiacode.nic.in/handle/123456789/1611' },
      { label: 'Indian Kanoon', url: 'https://indiankanoon.org/doc/445276/' },
    ],
    lastVerified: '2025-01-15',
  },
  {
    id: 'constitution',
    shortName: 'Constitution',
    fullName: 'The Constitution of India',
    year: 1950,
    category: 'constitution',
    description:
      'The supreme law of India. Relevant articles include appeal provisions to the Supreme Court (Articles 132-136) and writ jurisdiction of High Courts (Articles 226-227).',
    externalLinks: [
      { label: 'India Code', url: 'https://www.indiacode.nic.in/handle/123456789/2013' },
      { label: 'Indian Kanoon', url: 'https://indiankanoon.org/doc/237570/' },
    ],
    lastVerified: '2025-01-15',
  },
  {
    id: 'sc-rules-2013',
    shortName: 'SC Rules',
    fullName: 'Supreme Court Rules, 2013',
    year: 2013,
    category: 'court_rules',
    description:
      'Rules of procedure and practice of the Supreme Court of India. Contains provisions for SLP, curative petitions, and review petitions before the Supreme Court.',
    externalLinks: [
      { label: 'SCI Website', url: 'https://www.sci.gov.in/supreme-court-rules' },
    ],
    lastVerified: '2025-01-15',
  },
  {
    id: 'karnataka-court-fees-act-1958',
    shortName: 'Karnataka Court Fees Act',
    fullName: 'The Karnataka Court Fees and Suits Valuation Act, 1958',
    year: 1958,
    category: 'state_act',
    description:
      'Governs the levy and collection of court fees in Karnataka for civil suits, appeals, petitions, and other proceedings. Schedule I prescribes ad valorem fees, while specific sections cover various suit types.',
    externalLinks: [
      { label: 'Karnataka Legislature', url: 'https://kla.kar.nic.in/assembly/acts.htm' },
    ],
    lastVerified: '2025-01-15',
  },
] as const;
