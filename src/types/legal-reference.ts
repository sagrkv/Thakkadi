export interface LegalAct {
  readonly id: string;
  readonly shortName: string;
  readonly fullName: string;
  readonly year: number;
  readonly category: 'central_act' | 'state_act' | 'constitution' | 'court_rules';
  readonly description: string;
  readonly externalLinks: readonly { label: string; url: string }[];
  readonly lastVerified: string;
}

export interface LegalSection {
  readonly id: string;
  readonly actId: string;
  readonly sectionType: 'article' | 'section' | 'order' | 'rule' | 'schedule';
  readonly number: string;
  readonly title: string;
  readonly fullText: string;
  readonly summary?: string;
  readonly externalUrl?: string;
}
