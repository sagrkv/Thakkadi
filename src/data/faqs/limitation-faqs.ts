export const LIMITATION_FAQS = [
  {
    question: 'What limitation periods does this calculator cover?',
    answer:
      'This tool covers post-judgment limitation periods under the Limitation Act, 1963 — including first appeals, second appeals, revision, review petitions, Special Leave Petitions (SLP) to the Supreme Court, curative petitions, and execution of decrees. It applies to civil, criminal, and writ matters across all court levels from subordinate courts to the Supreme Court.',
  },
  {
    question: 'How does the certified copy exclusion work?',
    answer:
      'Under Section 12 of the Limitation Act, 1963, the time spent obtaining a certified copy of the judgment or order is excluded from the limitation period. If you provide the dates you applied for and received the certified copy, the calculator will add those excluded days to your deadline, giving you a more accurate last date to file.',
  },
  {
    question: 'What happens if the last date falls on a holiday?',
    answer:
      'Under Section 4 of the Limitation Act, 1963, if the limitation period expires on a day when the court is closed, the filing may be made on the next day the court reopens. The calculator applies this adjustment automatically when the computed deadline falls on a Sunday or gazetted holiday.',
  },
  {
    question: 'What is a Special Leave Petition (SLP)?',
    answer:
      'An SLP under Article 136 of the Constitution of India allows any aggrieved party to seek permission from the Supreme Court to appeal against any order of any court or tribunal in India. The limitation period is generally 90 days from the date of the impugned order, with certified copy exclusion available.',
  },
  {
    question: 'What is a curative petition?',
    answer:
      'A curative petition is the last judicial remedy available in India. It can be filed after a review petition is dismissed by the Supreme Court. There is no strict statutory limitation, but the Supreme Court Rules, 2013 require it to be filed within a reasonable time. The calculator assigns a low-confidence estimate for this.',
  },
  {
    question: 'Which courts and tribunals does this tool cover?',
    answer:
      'The calculator covers 11 court levels: Civil Judge (Junior & Senior Division), District Court, JMFC, CJM, Sessions Court, Family Court, Commercial Court, Consumer Forums (District & State), High Court, and Supreme Court. It supports appeals, revision, and other remedies between these courts as prescribed by law.',
  },
] as const;
