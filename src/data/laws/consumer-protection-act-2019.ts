import type { LegalSection } from '@/types/legal-reference';

const ACT_ID = 'consumer-protection-act-2019';

export const CONSUMER_PROTECTION_SECTIONS: readonly LegalSection[] = [
  {
    id: `${ACT_ID}/section-41`,
    actId: ACT_ID,
    sectionType: 'section',
    number: '41',
    title: 'Appeal against order of District Commission',
    fullText:
      'Any person aggrieved by an order made by the District Commission may prefer an appeal against such order to the State Commission on the grounds of facts or law within a period of forty-five days from the date of the order, in such form and manner, as may be prescribed:\n\nProvided that the State Commission may entertain an appeal after the expiry of the said period of forty-five days if it is satisfied that there was sufficient cause for not filing it within that period.\n\nProvided further that no appeal by a person who is required to pay any amount in terms of an order of the District Commission shall be entertained by the State Commission unless the appellant has deposited fifty per cent. of that amount in the manner as may be prescribed.\n\nProvided also that no appeal shall lie from an order made under sub-section (1) of section 81 by a District Commission following a settlement by mediation under section 80.',
    summary:
      'Appeal to State Commission within 45 days from District Commission orders. Requires 50% deposit of amount ordered. No appeal from mediated settlements.',
    externalUrl: 'https://indiankanoon.org/doc/191384772/',
  },
] as const;
