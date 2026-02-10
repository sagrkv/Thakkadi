import type { LegalSection } from '@/types/legal-reference';

const ACT_ID = 'karnataka-court-fees-act-1958';

export const KARNATAKA_COURT_FEES_SECTIONS: readonly LegalSection[] = [
  // ── Schedule I: Ad Valorem ─────────────────────────────────────────────────
  {
    id: `${ACT_ID}/schedule-i-article-1`,
    actId: ACT_ID,
    sectionType: 'schedule',
    number: 'Schedule I, Art. 1',
    title: 'Ad Valorem Fees on Plaints',
    fullText:
      'Schedule I — Table of Fees\n\nArticle 1: In suits for money (including suits for damages or compensation, or arrears of maintenance, of annuities or of other sums payable periodically) — ad valorem on the amount claimed.\n\nThe fee shall be computed on the value of the subject matter of the suit as set forth in the plaint, according to the following scale:\n\n(i) Up to Rs. 15,000 — 2.5%\n(ii) Rs. 15,001 to Rs. 30,000 — 3.0% (base Rs. 375)\n(iii) Rs. 30,001 to Rs. 50,000 — 3.5% (base Rs. 825)\n(iv) Rs. 50,001 to Rs. 1,00,000 — 4.0% (base Rs. 1,525)\n(v) Rs. 1,00,001 to Rs. 2,00,000 — 4.5% (base Rs. 3,525)\n(vi) Rs. 2,00,001 to Rs. 3,00,000 — 5.0% (base Rs. 8,025)\n(vii) Rs. 3,00,001 to Rs. 5,00,000 — 5.5% (base Rs. 13,025)\n(viii) Rs. 5,00,001 to Rs. 10,00,000 — 6.0% (base Rs. 24,025)\n(ix) Rs. 10,00,001 to Rs. 15,00,000 — 6.5% (base Rs. 54,025)\n(x) Rs. 15,00,001 to Rs. 20,00,000 — 7.0% (base Rs. 86,525)\n(xi) Rs. 20,00,001 to Rs. 30,00,000 — 7.5% (base Rs. 121,525)\n(xii) Rs. 30,00,001 to Rs. 40,00,000 — 7.5% (base Rs. 202,125)\n(xiii) Rs. 40,00,001 to Rs. 50,00,000 — 7.5% (base Rs. 202,125)\n(xiv) Rs. 50,00,001 to Rs. 75,00,000 — 7.5% (base Rs. 222,125)\n(xv) Rs. 75,00,001 to Rs. 1,00,00,000 — 7.5% (base Rs. 222,125)\n(xvi) Above Rs. 1,00,00,000 — 7.5% (base Rs. 222,125)\n\nNote: As amended by Act 2 of 1993.',
    summary:
      'Prescribes 16 slab-based ad valorem fee rates ranging from 2.5% to 7.5% on the value of subject matter in suits for money.',
    externalUrl: 'https://kla.kar.nic.in/assembly/acts.htm',
  },

  // ── Sections on specific suit types ────────────────────────────────────────
  {
    id: `${ACT_ID}/section-24`,
    actId: ACT_ID,
    sectionType: 'section',
    number: '24',
    title: 'Suits for declaratory decrees',
    fullText:
      'Section 24 — Computation of fees payable in certain suits:\n\n(a) In a suit for a declaratory decree with consequential relief of possession of immovable property, the fee shall be computed on the market value of the property.\n\n(b) In a suit for a declaratory decree with consequential relief by way of injunction relating to immovable property, the fee shall be computed on half the market value of the property.\n\n(c) [Omitted]\n\n(d) In other suits for declaratory decrees, the fee shall be computed on the amount or value of the subject matter as set forth in the plaint.\n\nProvided that in each of the above cases the minimum value for computation of fees shall not be less than Rs. 1,000.',
    summary:
      'Prescribes fee computation for declaratory suits: full market value for possession, half market value for injunction (immovable), plaint value for others. Minimum Rs. 1,000.',
    externalUrl: 'https://kla.kar.nic.in/assembly/acts.htm',
  },
  {
    id: `${ACT_ID}/section-25`,
    actId: ACT_ID,
    sectionType: 'section',
    number: '25',
    title: 'Suits relating to adoption',
    fullText:
      'Section 25 — In suits relating to adoption, court fees shall be computed on the value of the property at issue, as follows:\n\nWhere the value does not exceed Rs. 5,000 — Rs. 25\nWhere the value exceeds Rs. 5,000 but does not exceed Rs. 15,000 — Rs. 100\nWhere the value exceeds Rs. 15,000 — Rs. 250',
    summary:
      'Fixed fee tiers for adoption suits: Rs. 25, Rs. 100, or Rs. 250 based on property value.',
  },
  {
    id: `${ACT_ID}/section-26`,
    actId: ACT_ID,
    sectionType: 'section',
    number: '26',
    title: 'Suits for injunctions',
    fullText:
      'Section 26 — Computation of fees in suits for injunctions:\n\n(a) Where the title to immovable property is denied and an injunction is sought, the fee shall be computed on half the market value of the property (minimum Rs. 1,000).\n\n(b) In other suits for injunction relating to immovable property, the fee shall be computed on the amount as valued in the plaint (minimum Rs. 1,000).\n\n(c) In suits for injunction relating to movable property, the fee shall be computed on the amount as valued in the plaint (minimum Rs. 1,000).',
    summary:
      'Fees for injunction suits: half market value where title denied (immovable), plaint value for others. Minimum Rs. 1,000.',
  },
  {
    id: `${ACT_ID}/section-27`,
    actId: ACT_ID,
    sectionType: 'section',
    number: '27',
    title: 'Suits relating to trust property',
    fullText:
      'Section 27 — In suits relating to trust property, the fee shall be computed on one-fifth of the market value of the trust property.\n\nProvided that the fee shall not exceed Rs. 200.',
    summary:
      'Fee computed on 1/5 of market value of trust property, capped at Rs. 200.',
  },
  {
    id: `${ACT_ID}/section-28`,
    actId: ACT_ID,
    sectionType: 'section',
    number: '28',
    title: 'Suits for possession under the Specific Relief Act',
    fullText:
      'Section 28 — In a suit for possession of immovable property under the Specific Relief Act, the fee shall be computed on half the market value of the property.\n\nProvided that the minimum value for computation shall not be less than Rs. 1,000.',
    summary:
      'Fee computed on half the market value of immovable property in possession suits under Specific Relief Act. Minimum Rs. 1,000.',
  },
  {
    id: `${ACT_ID}/section-29`,
    actId: ACT_ID,
    sectionType: 'section',
    number: '29',
    title: 'Suits for possession (other)',
    fullText:
      'Section 29 — In other suits for possession of immovable property (not covered by Section 28), the fee shall be computed on the market value of the property.\n\nProvided that the minimum value for computation shall not be less than Rs. 1,000.',
    summary:
      'Fee computed on full market value for possession suits not under Specific Relief Act. Minimum Rs. 1,000.',
  },
  {
    id: `${ACT_ID}/section-30`,
    actId: ACT_ID,
    sectionType: 'section',
    number: '30',
    title: 'Suits relating to easements',
    fullText:
      'Section 30 — In suits relating to easements, the fee shall be computed on the amount valued in the plaint.\n\nProvided that the minimum value shall not be less than Rs. 1,000.',
    summary:
      'Fee computed on plaint value for easement suits. Minimum Rs. 1,000.',
  },
  {
    id: `${ACT_ID}/section-31`,
    actId: ACT_ID,
    sectionType: 'section',
    number: '31',
    title: 'Suits for pre-emption',
    fullText:
      'Section 31 — In suits for pre-emption, the fee shall be computed on whichever is lower:\n(a) the sale consideration stated in the sale deed, or\n(b) the market value of the property.',
    summary:
      'Fee computed on the lower of sale consideration or market value.',
  },
  {
    id: `${ACT_ID}/section-32`,
    actId: ACT_ID,
    sectionType: 'section',
    number: '32',
    title: 'Suits relating to mortgages',
    fullText:
      'Section 32 — Computation of fees in suits relating to mortgages:\n\n(a) In a suit for the recovery of money on a mortgage — on the amount claimed.\n\n(b) In a suit by a co-mortgagee for recovery of his share — on the entire mortgage amount.\n\n(c) In a suit for the recovery of money on a sub-mortgage — on the amount claimed.\n\n(d) In a suit for redemption — on the higher of: the amount due on the mortgage, or one-fourth of the principal secured by the mortgage.\n\n(e) In a suit for foreclosure — on the aggregate of the principal and interest due on the mortgage.',
    summary:
      'Prescribes fee computation for various mortgage suits: on amount claimed (recovery), entire mortgage amount (co-mortgagee), higher of amount due or 1/4 principal (redemption), principal + interest (foreclosure).',
  },
  {
    id: `${ACT_ID}/section-33`,
    actId: ACT_ID,
    sectionType: 'section',
    number: '33',
    title: 'Suits for accounts',
    fullText:
      'Section 33 — In a suit for an account, the fee shall be computed on the amount sued for as estimated in the plaint.',
    summary:
      'Fee computed on the amount sued for as estimated in the plaint.',
  },
  {
    id: `${ACT_ID}/section-34`,
    actId: ACT_ID,
    sectionType: 'section',
    number: '34',
    title: 'Suits for dissolution of partnership',
    fullText:
      'Section 34 — In a suit for the dissolution of a partnership, the fee shall be computed on the value of the plaintiff\'s share in the partnership assets.',
    summary:
      'Fee computed on the value of the plaintiff\'s share in partnership assets.',
  },
  {
    id: `${ACT_ID}/section-35`,
    actId: ACT_ID,
    sectionType: 'section',
    number: '35',
    title: 'Suits for partition',
    fullText:
      'Section 35 — Computation of fees in partition suits:\n\n(1) Where the plaintiff\'s title is denied or where the plaintiff is excluded from possession — ad valorem on the market value of the plaintiff\'s share.\n\n(2) Where the plaintiff is in joint possession — fixed fees based on the value of the plaintiff\'s share:\n  - Up to Rs. 3,000 — Rs. 15\n  - Rs. 3,001 to Rs. 5,000 — Rs. 30\n  - Rs. 5,001 to Rs. 10,000 — Rs. 100\n  - Above Rs. 10,000 — Rs. 200',
    summary:
      'Ad valorem on market value of share when title denied; fixed fees (Rs. 15 to Rs. 200) when in joint possession.',
  },
  {
    id: `${ACT_ID}/section-36`,
    actId: ACT_ID,
    sectionType: 'section',
    number: '36',
    title: 'Suits for recovery of joint possession',
    fullText:
      'Section 36 — In a suit for recovery of joint possession, the fee shall be computed on the market value of the plaintiff\'s share.',
    summary:
      'Fee computed on the market value of the plaintiff\'s share.',
  },
  {
    id: `${ACT_ID}/section-37`,
    actId: ACT_ID,
    sectionType: 'section',
    number: '37',
    title: 'Suits for administration',
    fullText:
      'Section 37 — In suits for administration, the fee shall be computed according to the rates prescribed in Section 47, based on the value of the estate.',
    summary:
      'Fee computed according to Section 47 rates based on estate value.',
  },
  {
    id: `${ACT_ID}/section-38`,
    actId: ACT_ID,
    sectionType: 'section',
    number: '38',
    title: 'Suits for cancellation of decree or instrument',
    fullText:
      'Section 38 — In suits for cancellation of a decree or other instrument, the fee shall be computed on the value of the subject matter of the suit.',
    summary:
      'Fee computed on the value of the subject matter of the suit.',
  },
  {
    id: `${ACT_ID}/section-39`,
    actId: ACT_ID,
    sectionType: 'section',
    number: '39',
    title: 'Suits to set aside attachment',
    fullText:
      'Section 39 — In suits to set aside an attachment, the fee shall be computed on one-fourth of the market value of the property or the amount of the claim under attachment, whichever is less.',
    summary:
      'Fee on 1/4 of market value or attachment amount, whichever is less.',
  },
  {
    id: `${ACT_ID}/section-40`,
    actId: ACT_ID,
    sectionType: 'section',
    number: '40',
    title: 'Suits for specific performance',
    fullText:
      'Section 40 — Computation of fees in suits for specific performance of a contract:\n\n(a) In case of a contract for the sale of property — on the amount of consideration.\n\n(b) In case of a contract to execute a mortgage — on the amount to be secured by the mortgage.\n\n(c) In case of a contract for a lease — on the aggregate of the fine or premium (if any) and the average annual rent.\n\n(d) In case of a contract for an exchange of property — on the consideration or the market value of the property sought, whichever is higher.\n\n(e) In any other case — on the market value of the consideration.',
    summary:
      'Fee computation for specific performance suits varies by contract type: sale consideration, mortgage amount, lease premium + rent, exchange value, or market value.',
  },
  {
    id: `${ACT_ID}/section-41`,
    actId: ACT_ID,
    sectionType: 'section',
    number: '41',
    title: 'Landlord-tenant disputes',
    fullText:
      'Section 41 — In suits between landlord and tenant, the fee shall be computed on the annual rent payable.',
    summary:
      'Fee computed on the annual rent payable.',
  },
  {
    id: `${ACT_ID}/section-42`,
    actId: ACT_ID,
    sectionType: 'section',
    number: '42',
    title: 'Suits for mesne profits',
    fullText:
      'Section 42 — In suits for mesne profits or for damages for breach of contract or other wrong, the fee shall be computed on the amount claimed as estimated in the plaint.',
    summary:
      'Fee computed on the amount claimed as estimated in the plaint.',
  },
  {
    id: `${ACT_ID}/section-43`,
    actId: ACT_ID,
    sectionType: 'section',
    number: '43',
    title: 'Suits for entry in revenue register',
    fullText:
      'Section 43 — In suits for directing entry in a revenue register, the court fee shall be a fixed amount of Rs. 50.',
    summary:
      'Fixed fee of Rs. 50.',
  },
  {
    id: `${ACT_ID}/section-44`,
    actId: ACT_ID,
    sectionType: 'section',
    number: '44',
    title: 'Suits relating to public matters (religious endowment, CPC S.91-92)',
    fullText:
      'Section 44 — In suits relating to public matters including religious endowments or under Sections 91 and 92 of the Code of Civil Procedure, the court fee shall be a fixed amount of Rs. 50.',
    summary:
      'Fixed fee of Rs. 50.',
  },
  {
    id: `${ACT_ID}/section-45`,
    actId: ACT_ID,
    sectionType: 'section',
    number: '45',
    title: 'Interpleader suits',
    fullText:
      'Section 45 — In interpleader suits, the fee shall be computed according to the rates prescribed in Section 47, based on the value of the subject matter in dispute.',
    summary:
      'Fee computed per Section 47 rates based on dispute value.',
  },
  {
    id: `${ACT_ID}/section-47`,
    actId: ACT_ID,
    sectionType: 'section',
    number: '47',
    title: 'Residuary suits',
    fullText:
      'Section 47 — In suits not otherwise provided for:\n\n(a) In a revenue court — a fixed fee of Rs. 50.\n\n(b) In a civil court — fixed fees based on value:\n  - Up to Rs. 5,000 — Rs. 20\n  - Rs. 5,001 to Rs. 10,000 — Rs. 100\n  - Above Rs. 10,000 — Rs. 200',
    summary:
      'Rs. 50 fixed fee in revenue courts; tiered fixed fees (Rs. 20/100/200) in civil courts based on value.',
  },
  {
    id: `${ACT_ID}/section-48`,
    actId: ACT_ID,
    sectionType: 'section',
    number: '48',
    title: 'Appeals on compensation (land acquisition)',
    fullText:
      'Section 48 — In appeals against awards of compensation under the Land Acquisition Act or similar statutes, the fee shall be computed ad valorem on the difference between the amount awarded by the court and the amount originally claimed.',
    summary:
      'Fee computed ad valorem on the difference between awarded and claimed amounts.',
  },
  {
    id: `${ACT_ID}/section-49`,
    actId: ACT_ID,
    sectionType: 'section',
    number: '49',
    title: 'Memoranda of appeal',
    fullText:
      'Section 49 — The fee payable on a memorandum of appeal shall be the same as the fee that would be payable on the plaint or petition in the court of first instance, computed on the value of the subject matter in appeal.',
    summary:
      'Appeal fee equals the fee payable in the court of first instance.',
  },

  // ── Schedule I: Additional Articles ────────────────────────────────────────
  {
    id: `${ACT_ID}/schedule-i-article-2a`,
    actId: ACT_ID,
    sectionType: 'schedule',
    number: 'Art. 2(a)',
    title: 'Insolvency petitions',
    fullText:
      'Article 2(a) — On a petition for insolvency, the fee shall be half the fee payable under Article 1.',
    summary:
      'Half of the Article 1 ad valorem scale.',
  },
  {
    id: `${ACT_ID}/schedule-i-article-4`,
    actId: ACT_ID,
    sectionType: 'schedule',
    number: 'Art. 4',
    title: 'Appeals under the Indian Succession Act',
    fullText:
      'Article 4 — On an appeal under the Indian Succession Act, the fee shall be half the fee payable under Article 1.',
    summary:
      'Half of the Article 1 ad valorem scale.',
  },
  {
    id: `${ACT_ID}/schedule-i-article-5`,
    actId: ACT_ID,
    sectionType: 'schedule',
    number: 'Art. 5',
    title: 'Application for review (within 90 days)',
    fullText:
      'Article 5 — On an application for review of judgment filed within 90 days, the fee shall be half the fee that was payable on the original plaint or memorandum of appeal.',
    summary:
      'Half the original plaint fee for review applications filed within 90 days.',
  },
  {
    id: `${ACT_ID}/schedule-i-article-5a`,
    actId: ACT_ID,
    sectionType: 'schedule',
    number: 'Art. 5A',
    title: 'Application for review (after 90 days)',
    fullText:
      'Article 5A — On an application for review of judgment filed after 90 days, the fee shall be the full fee that was payable on the original plaint or memorandum of appeal.',
    summary:
      'Full plaint fee for review applications filed after 90 days.',
  },
  {
    id: `${ACT_ID}/schedule-i-article-5aa`,
    actId: ACT_ID,
    sectionType: 'schedule',
    number: 'Art. 5AA',
    title: 'Review of Karnataka Appellate Tribunal order',
    fullText:
      'Article 5AA — On an application for review of an order of the Karnataka Appellate Tribunal — a fixed fee of Rs. 20.',
    summary:
      'Fixed fee of Rs. 20 for KAT review applications.',
  },
  {
    id: `${ACT_ID}/schedule-i-article-6`,
    actId: ACT_ID,
    sectionType: 'schedule',
    number: 'Art. 6',
    title: 'Probate, letters of administration and succession certificates',
    fullText:
      'Article 6 — On applications for probate, letters of administration, or succession certificates:\n\n(a) Where the value of the estate does not exceed Rs. 500 — Nil\n(b) Where the value exceeds Rs. 500 but does not exceed Rs. 1,000 — 3% of the value\n(c) Where the value exceeds Rs. 1,000 — 5% of the value\n\nProvided that the fee shall not exceed Rs. 30,000.\n\nFor extended succession certificates: the rates are computed at 1.5 times the above rates.',
    summary:
      'Tiered probate fees: nil up to Rs. 500, 3% up to Rs. 1,000, 5% above Rs. 1,000, capped at Rs. 30,000. Extended certificates at 1.5x.',
  },
] as const;
