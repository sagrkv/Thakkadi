import type { LegalSection } from '@/types/legal-reference';

const ACT_ID = 'family-courts-act-1984';

export const FAMILY_COURTS_SECTIONS: readonly LegalSection[] = [
  {
    id: `${ACT_ID}/section-19`,
    actId: ACT_ID,
    sectionType: 'section',
    number: '19',
    title: 'Appeal',
    fullText:
      '(1) Save as provided in sub-section (2) and notwithstanding anything contained in the Code of Civil Procedure, 1908 or in the Code of Criminal Procedure, 1973 or in any other law, an appeal shall lie from every judgment or order, not being an interlocutory order, of a Family Court to the High Court both on facts and on law.\n\n(2) No appeal shall lie from a decree or order passed by the Family Court with the consent of the parties or from an order passed under Chapter IX of the Code of Criminal Procedure, 1973:\n\nProvided that nothing in this sub-section shall apply to any appeal pending before a High Court or any order passed under Chapter IX of the Code of Criminal Procedure, 1973 before the commencement of the Family Courts (Amendment) Act, 1991.\n\n(3) Every appeal under this section shall be preferred within a period of thirty days from the date of the judgment or order of a Family Court.\n\n(4) The High Court may, of its own motion or otherwise, call for and examine the record of any proceeding in which the Family Court situate within its jurisdiction passed an order under Chapter IX of the Code of Criminal Procedure, 1973 for the purpose of satisfying itself as to the correctness, legality or propriety of the order, not being an interlocutory order, and, as to the regularity of such proceeding.\n\n(5) Except as aforesaid, no appeal or revision shall lie to any court from any judgment, order or decree of a Family Court.\n\n(6) An appeal preferred under sub-section (1) shall be heard by a Bench consisting of two or more Judges.',
    summary:
      'Appeal from Family Court to High Court within 30 days (shorter than standard 90 days). No appeal from consent decrees. High Court has revision powers over CrPC Chapter IX orders. Must be heard by a Bench of two or more Judges.',
    externalUrl: 'https://indiankanoon.org/doc/1411868/',
  },
] as const;
