import type { LegalSection } from '@/types/legal-reference';

const ACT_ID = 'commercial-courts-act-2015';

export const COMMERCIAL_COURTS_SECTIONS: readonly LegalSection[] = [
  {
    id: `${ACT_ID}/section-13`,
    actId: ACT_ID,
    sectionType: 'section',
    number: '13',
    title: 'Appeals from decrees of Commercial Courts and Commercial Divisions',
    fullText:
      '(1) Any person aggrieved by the decision of the Commercial Court or Commercial Division of a High Court may appeal to the Commercial Appellate Division of that High Court within a period of sixty days from the date of judgment or order, as the case may be:\n\nProvided that an appeal shall lie from such orders passed by a Commercial Division or a Commercial Court that are specifically enumerated under Order XLIII of the Code of Civil Procedure, 1908 as amended by this Act and section 37 of the Arbitration and Conciliation Act, 1996.\n\n(2) Notwithstanding anything contained in any other law for the time being in force or Letters Patent of a High Court, no appeal shall lie from any order or decree of a Commercial Division or Commercial Court otherwise than in accordance with the provisions of this Act.',
    summary:
      'Appeal to Commercial Appellate Division of High Court within 60 days. Overrides the standard 90-day limitation under Article 116. Only orders under Order XLIII CPC and Section 37 of Arbitration Act are appealable.',
    externalUrl: 'https://indiankanoon.org/doc/44411053/',
  },
] as const;
