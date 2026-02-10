import type { LegalSection } from '@/types/legal-reference';

const ACT_ID = 'limitation-act-1963';

export const LIMITATION_ACT_SECTIONS: readonly LegalSection[] = [
  {
    id: `${ACT_ID}/article-115`,
    actId: ACT_ID,
    sectionType: 'article',
    number: '115',
    title: 'Appeal from an order of conviction — to Session Court or High Court',
    fullText:
      'Description of suit or appeal: From a sentence of fine only, or a sentence of imprisonment not exceeding six months by a Sessions Court or a Metropolitan Magistrate or any Magistrate of the first class, or any other Magistrate exercising jurisdiction under special or local law.\n\nPeriod of limitation: Thirty days.\n\nTime from which period begins to run: The date of the sentence.',
    summary:
      'Prescribes 30 days for criminal appeals against sentences of fine only or imprisonment up to 6 months.',
    externalUrl: 'https://indiankanoon.org/doc/1096157/',
  },
  {
    id: `${ACT_ID}/article-116`,
    actId: ACT_ID,
    sectionType: 'article',
    number: '116',
    title: 'Appeal under CPC from a decree or order — to High Court or Appellate Court',
    fullText:
      'Description of suit or appeal: Appeal under the Code of Civil Procedure, 1908 (5 of 1908), to a High Court from any decree or order from which an appeal lies, to any court subordinate to a High Court.\n\nPeriod of limitation: Ninety days for appeal to High Court; Thirty days for appeal to any other court.\n\nTime from which period begins to run: The date of the decree or order.',
    summary:
      'Prescribes 90 days for first appeal to High Court and 30 days for appeal to subordinate courts under CPC.',
    externalUrl: 'https://indiankanoon.org/doc/1096157/',
  },
  {
    id: `${ACT_ID}/article-124`,
    actId: ACT_ID,
    sectionType: 'article',
    number: '124',
    title: 'Application for review of judgment — by a party to the suit',
    fullText:
      'Description of application: Review of judgment by any person considering himself aggrieved—\n(a) by a decree or order from which an appeal is allowed, but from which no appeal has been preferred;\n(b) by a decree or order from which no appeal is allowed; or\n(c) by a decision on a reference from a Court of Small Causes.\n\nPeriod of limitation: Thirty days.\n\nTime from which period begins to run: The date of the decree or order.',
    summary:
      'Prescribes 30 days for filing a review petition from the date of the decree or order.',
    externalUrl: 'https://indiankanoon.org/doc/1096157/',
  },
  {
    id: `${ACT_ID}/article-131`,
    actId: ACT_ID,
    sectionType: 'article',
    number: '131',
    title: 'Application for revision under Section 115, CPC',
    fullText:
      'Description of application: Any application for which no period of limitation is provided elsewhere in this Division.\n\nPeriod of limitation: Three years (in the case of revision under S.115 CPC, courts generally apply 90 days by analogy to Article 116).\n\nTime from which period begins to run: When the right to apply accrues.\n\nNote: While the residuary article prescribes 3 years, High Courts typically apply a 90-day period for revision petitions by analogy to first appeals under Article 116.',
    summary:
      'Residuary article prescribing 3 years, but courts apply 90 days for revision petitions by analogy.',
    externalUrl: 'https://indiankanoon.org/doc/1096157/',
  },
  {
    id: `${ACT_ID}/article-133`,
    actId: ACT_ID,
    sectionType: 'article',
    number: '133',
    title: 'Application for execution of any decree (other than a decree granting a mandatory injunction) or order of any civil court',
    fullText:
      'Description of application: Application for the execution of any decree (other than a decree granting a mandatory injunction) or order of any civil court.\n\nPeriod of limitation: Twelve years.\n\nTime from which period begins to run:\n(a) Where the decree or order is that of a court of first instance—the date of the decree or order, or where the decree or any subsequent order directs any payment of money or delivery of any property to be made at a certain date or at recurring periods, the date of default in making the payment or delivery in respect of which the applicant seeks to execute the decree.',
    summary:
      'Prescribes 12 years for execution of decrees from the date of decree or date of default.',
    externalUrl: 'https://indiankanoon.org/doc/1096157/',
  },
  {
    id: `${ACT_ID}/article-136`,
    actId: ACT_ID,
    sectionType: 'article',
    number: '136',
    title: 'Any application for which no period of limitation is provided elsewhere in this Division',
    fullText:
      'Description of application: Any application for which no period of limitation is provided elsewhere in this Division.\n\nPeriod of limitation: Three years.\n\nTime from which period begins to run: When the right to apply accrues.\n\nNote: This is the residuary article for applications. Applied where no specific article prescribes a time limit.',
    summary:
      'Residuary article prescribing 3 years for any application not specifically covered.',
    externalUrl: 'https://indiankanoon.org/doc/1096157/',
  },
] as const;
