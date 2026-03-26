import type { LegalSection } from '@/types/legal-reference';

const ACT_ID = 'bnss-2023';

export const BNSS_SECTIONS: readonly LegalSection[] = [
  {
    id: `${ACT_ID}/section-415`,
    actId: ACT_ID,
    sectionType: 'section',
    number: '415',
    title: 'Appeals from convictions',
    fullText:
      '(1) Any person convicted on a trial held by a High Court in its extraordinary original criminal jurisdiction may appeal to the Supreme Court.\n\n(2) Any person convicted on a trial held by a Sessions Judge or an Additional Sessions Judge or on a trial held by any other Court in which a sentence of imprisonment for more than seven years has been passed against him or against any other person convicted at the same trial, may appeal to the High Court.\n\n(3) Save as otherwise provided in sub-section (2), any person—\n(a) convicted on a trial held by a Metropolitan Magistrate or Assistant Sessions Judge or Magistrate of the first class, or of the second class, may appeal to the Court of Session.\n\n(4) When an appeal has been filed against a sentence passed under section 64, section 65, section 66, section 67, section 68, section 70 or section 71 of the Bharatiya Nyaya Sanhita, 2023, the appeal shall be disposed of within a period of six months from the date of filing of such appeal.',
    summary:
      'Provides for criminal appeals from convictions: to the Supreme Court from High Court trials, to the High Court from Sessions Court trials, and to the Sessions Court from Magistrate trials. Adds 6-month disposal timeline for certain BNS offences.',
    externalUrl: 'https://indiankanoon.org/doc/110095110/',
  },
  {
    id: `${ACT_ID}/section-420`,
    actId: ACT_ID,
    sectionType: 'section',
    number: '420',
    title: 'Appeal against conviction by High Court in certain cases',
    fullText:
      'Where the High Court has, on appeal, reversed an order of acquittal of an accused person and convicted him and sentenced him to death or to imprisonment for life or to imprisonment for a term of ten years or more, he may appeal to the Supreme Court.',
    summary:
      'Provides for appeal to the Supreme Court where the High Court reverses an acquittal and sentences to death, life imprisonment, or 10+ years. Corresponds to CrPC Section 379.',
    externalUrl: 'https://indiankanoon.org/doc/37878122/',
  },
  {
    id: `${ACT_ID}/section-438`,
    actId: ACT_ID,
    sectionType: 'section',
    number: '438',
    title: 'Calling for records to exercise powers of revision',
    fullText:
      '(1) The High Court or any Sessions Judge may call for and examine the record of any proceeding before any inferior Criminal Court situate within its or his local jurisdiction for the purpose of satisfying itself or himself as to the correctness, legality or propriety of any finding, sentence or order, recorded or passed, and as to the regularity of any proceedings of such inferior Court, and may, when calling for such record, direct that the execution of any sentence or order be suspended, and if the accused is in confinement, that he be released on bail or on his own bond pending the examination of the record.\n\nExplanation: All Magistrates, whether Executive or Judicial, exercising original or appellate jurisdiction, shall be deemed to be inferior to the Sessions Judge for the purposes of this sub-section and of section 439.\n\n(2) The powers of revision conferred by sub-section (1) shall not be exercised in relation to any interlocutory order passed in any appeal, inquiry, trial or other proceeding.\n\n(3) If an application under this section has been made by any person either to the High Court or to the Sessions Judge, no further application by the same person shall be entertained by the other of them.',
    summary:
      'Confers revisional jurisdiction on the High Court and Sessions Judge to examine the correctness, legality, or propriety of findings, sentences, or orders of subordinate criminal courts. Corresponds to CrPC Section 397.',
    externalUrl: 'https://indiankanoon.org/doc/28006784/',
  },
  {
    id: `${ACT_ID}/section-442`,
    actId: ACT_ID,
    sectionType: 'section',
    number: '442',
    title: "High Court's powers of revision",
    fullText:
      "(1) In the case of any proceeding the record of which has been called for by itself or which otherwise comes to its knowledge, the High Court may, in its discretion, exercise any of the powers conferred on a Court of Appeal by sections 427, 430, 431 and 432 or on a Court of Session by section 344 and, when the Judges composing the Court of revision are equally divided in opinion, the case shall be disposed of in the manner provided by section 433.\n\n(2) No order under this section shall be made to the prejudice of the accused or other person unless he has had an opportunity of being heard either personally or by an advocate in his own defence.\n\n(3) Nothing in this section shall be deemed to authorise a High Court to convert a finding of acquittal into one of conviction.\n\n(4) Where under this Sanhita an appeal lies and no appeal is brought, no proceeding by way of revision shall be entertained at the instance of the party who could have appealed.\n\n(5) Where under this Sanhita an appeal lies but an application for revision has been made to the High Court by any person and the High Court is satisfied that such application was made under the erroneous belief that no appeal lies thereto and that it is necessary in the interests of justice so to do, the High Court may treat the application for revision as a petition of appeal and deal with the same accordingly.",
    summary:
      "Specifies the High Court's powers in revision proceedings, including the limitation that acquittals cannot be converted to convictions. Adds provision to treat revision as appeal if filed under erroneous belief. Corresponds to CrPC Section 401.",
    externalUrl: 'https://indiankanoon.org/doc/23684293/',
  },
  {
    id: `${ACT_ID}/section-528`,
    actId: ACT_ID,
    sectionType: 'section',
    number: '528',
    title: 'Saving of inherent powers of High Court',
    fullText:
      'Nothing in this Sanhita shall be deemed to limit or affect the inherent powers of the High Court to make such orders as may be necessary to give effect to any order under this Sanhita, or to prevent abuse of the process of any Court or otherwise to secure the ends of justice.',
    summary:
      'Preserves the inherent powers of the High Court to prevent abuse of process and secure the ends of justice. Identical in substance to CrPC Section 482.',
    externalUrl: 'https://indiankanoon.org/doc/99044874/',
  },
] as const;
