import type { LegalSection } from '@/types/legal-reference';

const ACT_ID = 'sc-rules-2013';

export const SC_RULES_SECTIONS: readonly LegalSection[] = [
  {
    id: `${ACT_ID}/order-xiii`,
    actId: ACT_ID,
    sectionType: 'order',
    number: 'XIII',
    title: 'Review',
    fullText:
      'Rule 1. The Court may review its judgment or order on grounds similar to those mentioned in Order XLVII, Rule 1 of the Code of Civil Procedure.\n\nRule 2. An application for review shall be filed within thirty days from the date of the judgment or order sought to be reviewed.\n\nRule 3. An application for review shall be by a petition accompanied by a certified copy of the judgment or order sought to be reviewed.\n\nRule 4. Unless otherwise ordered by the Court, an application for review shall be disposed of by circulation without oral arguments.\n\nRule 5. An application for review shall be disposed of by the same bench that delivered the judgment or order sought to be reviewed, if the bench is available.',
    summary:
      'Provides for review of Supreme Court judgments within 30 days, to be disposed of by the same bench, ordinarily by circulation.',
    externalUrl: 'https://www.sci.gov.in/supreme-court-rules',
  },
  {
    id: `${ACT_ID}/order-xxi`,
    actId: ACT_ID,
    sectionType: 'order',
    number: 'XXI',
    title: 'Criminal Appeals',
    fullText:
      'Rule 1. A petition for Special Leave to Appeal in a criminal matter shall be filed within ninety days from the date of the judgment, order or sentence sought to be appealed against.\n\nRule 2. The petition shall be accompanied by—\n(a) a certified copy of the judgment or order appealed against;\n(b) a certified copy of the judgment of the court of first instance;\n(c) such other documents as may be necessary.\n\nProviso: The Court may condone the delay in filing, on sufficient cause being shown.',
    summary:
      'Prescribes 90 days for filing SLP in criminal matters with the Supreme Court.',
    externalUrl: 'https://www.sci.gov.in/supreme-court-rules',
  },
  {
    id: `${ACT_ID}/order-xl`,
    actId: ACT_ID,
    sectionType: 'order',
    number: 'XL',
    title: 'Curative Petitions',
    fullText:
      'Based on the principles laid down in Rupa Ashok Hurra v. Ashok Hurra, (2002) 4 SCC 388:\n\nRule 1. A curative petition may be filed after a review petition has been dismissed, to prevent abuse of process and to cure gross miscarriage of justice.\n\nRule 2. The curative petition shall be filed within thirty days from the date of the order dismissing the review petition.\n\nRule 3. The petition shall specifically state—\n(a) that the review petition was dismissed;\n(b) the grounds of cure; and\n(c) a certificate by a Senior Advocate that the case raises grounds for curative relief.\n\nRule 4. The curative petition shall first be circulated to the three senior-most judges and the judges who passed the order complained of. Only if a majority of the judges so circulated are of the opinion that the matter needs hearing shall it be listed before the same bench (as far as possible).',
    summary:
      'Provides for curative petitions after dismissal of review, requiring certification by a Senior Advocate and circulation to senior judges.',
    externalUrl: 'https://www.sci.gov.in/supreme-court-rules',
  },
] as const;
