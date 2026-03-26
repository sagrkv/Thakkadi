export const COURT_FEE_FAQS = [
  {
    question: 'How is the ad valorem court fee calculated in Karnataka?',
    answer:
      'Ad valorem fees are calculated using the slab table in Schedule I of the Karnataka Court Fees & Suits Valuation Act, 1958 (as amended in 1993). You find the slab your suit value falls into and apply the formula: fee = base fee + rate \u00D7 (suit value \u2212 slab threshold). This is a single-slab lookup, not a cumulative marginal calculation.',
  },
  {
    question: 'What is the difference between money suits and property suits?',
    answer:
      'Money suits (e.g., recovery of debt, damages) use the claimed amount as the subject matter value. Property suits (e.g., partition, injunction) use the market value of the property in question. The court fee slab is the same, but how the "value" is determined differs based on the Suits Valuation Act provisions for each category.',
  },
  {
    question: 'Can I get a refund of court fees?',
    answer:
      'Yes, partial refunds are available under certain conditions — for example, if a suit is settled before judgment, withdrawn, or dismissed at an early stage. The refund percentage depends on the stage of the proceedings. Use the Refund Estimator tab in this calculator to estimate your refund amount.',
  },
  {
    question: 'How are appeal court fees calculated?',
    answer:
      'Appeal fees depend on the type of appeal. First appeals from original suits typically require the same ad valorem fee as the original suit. Second appeals and certain miscellaneous appeals may have fixed fees or reduced ad valorem rates. The calculator handles all these variations automatically based on the suit type you select.',
  },
  {
    question: 'Is there a minimum court fee?',
    answer:
      'Yes. The minimum ad valorem court fee under the Karnataka Act is \u20B9100 for suits valued up to \u20B9500. For most practical suit values, the fee is determined by the 14-tier slab table. Certain petition types (interlocutory applications, caveats, etc.) have separate fixed fees specified in the Act.',
  },
  {
    question: 'Which act governs court fees in Karnataka?',
    answer:
      'Court fees in Karnataka are governed by the Karnataka Court Fees and Suits Valuation Act, 1958 (Karnataka Act No. 16 of 1958), as amended by Act 2 of 1993. This is a state-specific law — other Indian states have their own court fee legislation. This calculator is specific to Karnataka courts.',
  },
] as const;
