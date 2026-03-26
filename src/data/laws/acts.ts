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
    lastVerified: '2026-03-26',
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
      { label: 'Indian Kanoon', url: 'https://indiankanoon.org/doc/161831507/' },
    ],
    lastVerified: '2026-03-26',
  },
  {
    id: 'crpc-1973',
    shortName: 'CrPC',
    fullName: 'The Code of Criminal Procedure, 1973',
    year: 1973,
    category: 'central_act',
    description:
      'The procedural law governing the administration of criminal justice in India. Provides for appeals, revision, and inherent powers of courts in criminal matters. Superseded by BNSS, 2023 (effective 01-07-2024), but remains relevant for pre-2024 cases.',
    externalLinks: [
      { label: 'India Code', url: 'https://www.indiacode.nic.in/handle/123456789/15247' },
      { label: 'Indian Kanoon', url: 'https://indiankanoon.org/doc/445276/' },
    ],
    lastVerified: '2026-03-26',
  },
  {
    id: 'bnss-2023',
    shortName: 'BNSS',
    fullName: 'The Bharatiya Nagarik Suraksha Sanhita, 2023',
    year: 2023,
    category: 'central_act',
    description:
      'Replaces the Code of Criminal Procedure, 1973 (effective 01-07-2024). Consolidates and amends the law relating to criminal procedure, including appeals, revision, and inherent powers of courts.',
    externalLinks: [
      { label: 'India Code', url: 'https://www.indiacode.nic.in/handle/123456789/20099' },
      { label: 'Indian Kanoon', url: 'https://indiankanoon.org/doc/91117739/' },
    ],
    lastVerified: '2026-03-26',
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
      { label: 'India Code', url: 'https://www.indiacode.nic.in/handle/123456789/15240' },
      { label: 'Indian Kanoon', url: 'https://indiankanoon.org/doc/237570/' },
    ],
    lastVerified: '2026-03-26',
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
      { label: 'SCI Website', url: 'https://www.sci.gov.in/supreme-court-rules-2013/' },
    ],
    lastVerified: '2026-03-26',
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
      { label: 'India Code (PDF)', url: 'https://www.indiacode.nic.in/bitstream/123456789/7625/1/16_of_1958_(e).pdf' },
    ],
    lastVerified: '2026-03-26',
  },
  {
    id: 'commercial-courts-act-2015',
    shortName: 'Commercial Courts Act',
    fullName: 'The Commercial Courts Act, 2015',
    year: 2015,
    category: 'central_act',
    description:
      'Provides for the constitution of Commercial Courts, Commercial Divisions, and Commercial Appellate Divisions in High Courts for adjudicating commercial disputes of specified value.',
    externalLinks: [
      { label: 'India Code', url: 'https://www.indiacode.nic.in/handle/123456789/2156' },
    ],
    lastVerified: '2026-03-26',
  },
  {
    id: 'consumer-protection-act-2019',
    shortName: 'Consumer Protection Act',
    fullName: 'The Consumer Protection Act, 2019',
    year: 2019,
    category: 'central_act',
    description:
      'Provides for protection of the interests of consumers, establishment of Consumer Disputes Redressal Commissions, and matters connected therewith. Replaces the Consumer Protection Act, 1986.',
    externalLinks: [
      { label: 'India Code', url: 'https://www.indiacode.nic.in/handle/123456789/15256' },
    ],
    lastVerified: '2026-03-26',
  },
  {
    id: 'family-courts-act-1984',
    shortName: 'Family Courts Act',
    fullName: 'The Family Courts Act, 1984',
    year: 1984,
    category: 'central_act',
    description:
      'Provides for the establishment of Family Courts for speedy settlement of disputes relating to marriage, family affairs, maintenance, custody, and guardianship.',
    externalLinks: [
      { label: 'India Code', url: 'https://www.indiacode.nic.in/handle/123456789/16127' },
    ],
    lastVerified: '2026-03-26',
  },
  {
    id: 'karnataka-stamp-act-1957',
    shortName: 'Karnataka Stamp Act',
    fullName: 'The Karnataka Stamp Act, 1957',
    year: 1957,
    category: 'state_act',
    description:
      'Consolidates and amends the law relating to stamps in Karnataka. Prescribes stamp duty rates for various instruments including conveyances, mortgages, leases, and powers of attorney.',
    externalLinks: [
      { label: 'India Code', url: 'https://www.indiacode.nic.in/handle/123456789/7744' },
    ],
    lastVerified: '2026-03-26',
  },
  {
    id: 'registration-act-1908',
    shortName: 'Registration Act',
    fullName: 'The Registration Act, 1908',
    year: 1908,
    category: 'central_act',
    description:
      'Provides for the registration of documents relating to immovable property. Prescribes which documents are compulsorily registrable and the procedure for registration.',
    externalLinks: [
      { label: 'India Code', url: 'https://www.indiacode.nic.in/handle/123456789/2190' },
    ],
    lastVerified: '2026-03-26',
  },
  {
    id: 'karnataka-court-fees-rules-1960',
    shortName: 'Karnataka Court Fees Rules',
    fullName: 'The Karnataka Court Fees and Suits Valuation Rules, 1960',
    year: 1960,
    category: 'state_act',
    description:
      'Rules framed under Section 78 of the Karnataka Court Fees and Suits Valuation Act, 1958. Prescribes procedural details for computation and payment of court fees.',
    externalLinks: [
      { label: 'India Code', url: 'https://www.indiacode.nic.in/handle/123456789/7744' },
    ],
    lastVerified: '2026-03-26',
  },
] as const;
