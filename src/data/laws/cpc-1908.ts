import type { LegalSection } from '@/types/legal-reference';

const ACT_ID = 'cpc-1908';

export const CPC_SECTIONS: readonly LegalSection[] = [
  {
    id: `${ACT_ID}/section-115`,
    actId: ACT_ID,
    sectionType: 'section',
    number: '115',
    title: 'Revision',
    fullText:
      '(1) The High Court may call for the record of any case which has been decided by any Court subordinate to it and in which no appeal lies thereto, and if such subordinate Court appears—\n(a) to have exercised a jurisdiction not vested in it by law, or\n(b) to have failed to exercise a jurisdiction so vested, or\n(c) to have acted in the exercise of its jurisdiction illegally or with material irregularity,\nthe High Court may make such order in the case as it thinks fit.\n\nProvided that the High Court shall not, under this section, vary or reverse any decree or order against which an appeal lies either to the High Court or to any Court subordinate thereto.\n\nExplanation: In this section, the expression "any case which has been decided" includes any order made, or any order deciding an issue, in the course of a suit or other proceeding.',
    summary:
      'Confers revisional jurisdiction on High Courts over subordinate courts in cases where no appeal lies, on grounds of jurisdictional error or material irregularity.',
    externalUrl: 'https://indiankanoon.org/doc/1623150/',
  },
  {
    id: `${ACT_ID}/order-xlvii`,
    actId: ACT_ID,
    sectionType: 'order',
    number: 'XLVII',
    title: 'Review',
    fullText:
      'Rule 1. Application for review of judgment—\n(1) Any person considering himself aggrieved—\n(a) by a decree or order from which an appeal is allowed, but from which no appeal has been preferred,\n(b) by a decree or order from which no appeal is allowed, or\n(c) by a decision on a reference from a Court of Small Causes,\nand who, from the discovery of new and important matter or evidence which, after the exercise of due diligence, was not within his knowledge or could not be produced by him at the time when the decree was passed or order made, or on account of some mistake or error apparent on the face of the record, or for any other sufficient reason, desires to obtain a review of the decree passed or order made against him, may apply for a review of judgment to the court which passed the decree or made the order.\n\n(2) A party who is not appealing from a decree or order may apply for a review of judgment notwithstanding the pendency of an appeal by some other party except where the ground of such appeal is common to the applicant and the appellant, or when, being respondent, he can present to the Appellate Court the case on which he applies for the review.',
    summary:
      'Provides for review of judgments on grounds of discovery of new evidence, mistake apparent on the face of record, or other sufficient reason.',
    externalUrl: 'https://indiankanoon.org/doc/1067817/',
  },
  {
    id: `${ACT_ID}/order-xl`,
    actId: ACT_ID,
    sectionType: 'order',
    number: 'XL',
    title: 'Appointment of Receivers (referenced in execution context)',
    fullText:
      'Rule 1. Appointment of receivers—Where it appears to the Court to be just and convenient, the Court may by order—\n(a) appoint a receiver of any property, whether before or after decree;\n(b) remove any person from the possession or custody of the property;\n(c) commit the same to the possession, custody or management of the receiver; and\n(d) confer upon the receiver all such powers, as to bringing and defending suits and for the realization, management, protection, preservation and improvement of the property, the collection of the rents and profits thereof, the application and disposal of such rents and profits, and the execution of documents as the owner himself has, or such of those powers as the Court thinks fit.',
    summary:
      'Empowers courts to appoint receivers of property before or after decree, with powers as the court deems fit.',
    externalUrl: 'https://indiankanoon.org/doc/100581/',
  },
] as const;
