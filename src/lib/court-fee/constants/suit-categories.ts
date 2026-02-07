import type { SuitGroupInfo, SuitTypeDefinition } from '@/types/court-fee';

// ── Group metadata ───────────────────────────────────────────────────────────

export const SUIT_GROUPS: readonly SuitGroupInfo[] = [
  { id: 'A', label: 'Money & Recovery',       description: 'Money suits, mortgage claims, accounts, mesne profits',              icon: 'banknote' },
  { id: 'B', label: 'Property & Possession',  description: 'Declarations, injunctions, possession, pre-emption, easements',      icon: 'landmark' },
  { id: 'C', label: 'Partition',              description: 'Partition suits and joint possession recovery',                       icon: 'split' },
  { id: 'D', label: 'Specific Performance',   description: 'Sale, mortgage, lease, exchange contracts',                           icon: 'file-signature' },
  { id: 'E', label: 'Special / Fixed Fee',    description: 'Adoption, trust, cancellation, partnership, landlord-tenant',         icon: 'gavel' },
  { id: 'F', label: 'Residuary',              description: 'Revenue courts and civil courts residuary suits',                     icon: 'scroll' },
  { id: 'G', label: 'Appeals & Reviews',      description: 'Appeals, review petitions, insolvency, succession appeals',           icon: 'scale' },
  { id: 'H', label: 'Probate & Succession',   description: 'Probate, letters of administration, succession certificates',         icon: 'book-open' },
  { id: 'I', label: 'Writ Petitions',         description: 'Writ petitions under Art. 226/227, habeas corpus',                    icon: 'shield' },
] as const;

// ── Shared input field configs ───────────────────────────────────────────────

const AMOUNT_FIELD = {
  id: 'amount',
  label: 'Amount Claimed (Rs.)',
  placeholder: 'Enter amount in rupees',
  required: true,
} as const;

const MARKET_VALUE_FIELD = {
  id: 'marketValue',
  label: 'Market Value of Property (Rs.)',
  placeholder: 'Enter market value in rupees',
  required: true,
} as const;

const SHARE_VALUE_FIELD = {
  id: 'shareValue',
  label: "Value of Plaintiff's Share (Rs.)",
  placeholder: 'Enter share value in rupees',
  required: true,
} as const;

const PLAINT_VALUE_FIELD = {
  id: 'plaintValue',
  label: 'Amount Valued in Plaint (Rs.)',
  placeholder: 'Enter value as stated in plaint',
  required: true,
} as const;

const PROPERTY_VALUE_FIELD = {
  id: 'propertyValue',
  label: 'Value of Property (Rs.)',
  placeholder: 'Enter property value in rupees',
  required: true,
} as const;

// ── All suit type definitions ────────────────────────────────────────────────

export const SUIT_TYPES: readonly SuitTypeDefinition[] = [
  // ─── GROUP A: Money & Recovery ───────────────────────────────────────────
  {
    id: 'money_suit',
    group: 'A',
    label: 'Money Suit / Recovery of Debt',
    section: 'Art. 1',
    feeMethod: 'ad_valorem',
    inputFields: [AMOUNT_FIELD],
    valueBasis: 'Amount claimed',
  },
  {
    id: 'mortgage_money_recovery',
    group: 'A',
    label: 'Mortgage - Money Recovery',
    section: 'Sec 32(a)',
    feeMethod: 'ad_valorem',
    inputFields: [{ ...AMOUNT_FIELD, label: 'Amount Claimed on Mortgage (Rs.)' }],
    valueBasis: 'Amount claimed on mortgage',
  },
  {
    id: 'mortgage_co_mortgagee',
    group: 'A',
    label: 'Mortgage - Co-mortgagee Suit',
    section: 'Sec 32(b)',
    feeMethod: 'ad_valorem',
    inputFields: [{ ...AMOUNT_FIELD, label: 'Entire Mortgage Amount (Rs.)' }],
    valueBasis: 'Entire mortgage amount',
  },
  {
    id: 'mortgage_sub_mortgage',
    group: 'A',
    label: 'Mortgage - Sub-mortgage',
    section: 'Sec 32(c)',
    feeMethod: 'ad_valorem',
    inputFields: [{ ...AMOUNT_FIELD, label: 'Amount Claimed on Sub-mortgage (Rs.)' }],
    valueBasis: 'Amount claimed on sub-mortgage',
  },
  {
    id: 'mortgage_redemption',
    group: 'A',
    label: 'Mortgage - Redemption',
    section: 'Sec 32(d)',
    feeMethod: 'ad_valorem',
    comparison: 'higher',
    inputFields: [
      { id: 'amountDue', label: 'Amount Due (Rs.)', placeholder: 'Enter amount currently due', required: true },
      { id: 'principal', label: 'Principal Amount (Rs.)', placeholder: 'Enter original principal', helpText: 'Fee is on higher of: amount due OR 1/4 of principal', required: true },
    ],
    valueBasis: 'Higher of: amount due OR 1/4 of principal',
  },
  {
    id: 'mortgage_foreclosure',
    group: 'A',
    label: 'Mortgage - Foreclosure',
    section: 'Sec 32(e)',
    feeMethod: 'ad_valorem',
    comparison: 'sum',
    inputFields: [
      { id: 'principal', label: 'Principal Amount (Rs.)', placeholder: 'Enter principal', required: true },
      { id: 'interest', label: 'Interest Amount (Rs.)', placeholder: 'Enter interest', required: true },
    ],
    valueBasis: 'Principal + Interest',
  },
  {
    id: 'accounts',
    group: 'A',
    label: 'Suit for Accounts',
    section: 'Sec 33',
    feeMethod: 'ad_valorem',
    inputFields: [{ ...AMOUNT_FIELD, label: 'Amount Sued For (as estimated in plaint) (Rs.)' }],
    valueBasis: 'Amount sued for as estimated in plaint',
  },
  {
    id: 'mesne_profits',
    group: 'A',
    label: 'Mesne Profits',
    section: 'Sec 42',
    feeMethod: 'ad_valorem',
    inputFields: [{ ...AMOUNT_FIELD, label: 'Amount Estimated in Plaint (Rs.)' }],
    valueBasis: 'Amount estimated in plaint',
  },

  // ─── GROUP B: Property & Possession ──────────────────────────────────────
  {
    id: 'declaration_with_possession',
    group: 'B',
    label: 'Declaration + Possession',
    section: 'Sec 24(a)',
    feeMethod: 'ad_valorem',
    minimumValue: 1_000,
    inputFields: [MARKET_VALUE_FIELD],
    valueBasis: 'Market value of property (min Rs. 1,000)',
  },
  {
    id: 'declaration_with_injunction_immovable',
    group: 'B',
    label: 'Declaration + Consequential Injunction (Immovable)',
    section: 'Sec 24(b)',
    feeMethod: 'ad_valorem_fraction',
    fraction: 0.5,
    minimumValue: 1_000,
    inputFields: [MARKET_VALUE_FIELD],
    valueBasis: '1/2 of market value (min Rs. 1,000)',
  },
  {
    id: 'declaration_other',
    group: 'B',
    label: 'Declaration (Other Cases)',
    section: 'Sec 24(d)',
    feeMethod: 'ad_valorem',
    minimumValue: 1_000,
    inputFields: [PLAINT_VALUE_FIELD],
    valueBasis: 'Amount valued in plaint (min Rs. 1,000)',
  },
  {
    id: 'injunction_title_denied',
    group: 'B',
    label: 'Injunction (Title Denied, Immovable)',
    section: 'Sec 26(a)',
    feeMethod: 'ad_valorem_fraction',
    fraction: 0.5,
    minimumValue: 1_000,
    inputFields: [MARKET_VALUE_FIELD],
    valueBasis: '1/2 of market value (min Rs. 1,000)',
  },
  {
    id: 'injunction_other',
    group: 'B',
    label: 'Injunction (Other Cases)',
    section: 'Sec 26(b)/(c)',
    feeMethod: 'ad_valorem',
    minimumValue: 1_000,
    inputFields: [PLAINT_VALUE_FIELD],
    valueBasis: 'Amount valued in plaint (min Rs. 1,000)',
  },
  {
    id: 'possession_specific_relief',
    group: 'B',
    label: 'Possession (Specific Relief Act)',
    section: 'Sec 28',
    feeMethod: 'ad_valorem_fraction',
    fraction: 0.5,
    minimumValue: 1_000,
    inputFields: [MARKET_VALUE_FIELD],
    valueBasis: '1/2 of market value (min Rs. 1,000)',
  },
  {
    id: 'possession_other',
    group: 'B',
    label: 'Possession (Other)',
    section: 'Sec 29',
    feeMethod: 'ad_valorem',
    minimumValue: 1_000,
    inputFields: [MARKET_VALUE_FIELD],
    valueBasis: 'Market value (min Rs. 1,000)',
  },
  {
    id: 'pre_emption',
    group: 'B',
    label: 'Pre-emption',
    section: 'Sec 31',
    feeMethod: 'ad_valorem',
    comparison: 'lower',
    inputFields: [
      { id: 'saleConsideration', label: 'Sale Consideration (Rs.)', placeholder: 'Enter sale consideration', required: true },
      MARKET_VALUE_FIELD,
    ],
    valueBasis: 'Lower of: sale consideration OR market value',
  },
  {
    id: 'easements',
    group: 'B',
    label: 'Easements',
    section: 'Sec 30',
    feeMethod: 'ad_valorem',
    minimumValue: 1_000,
    inputFields: [PLAINT_VALUE_FIELD],
    valueBasis: 'Amount valued in plaint (min Rs. 1,000)',
  },

  // ─── GROUP C: Partition ──────────────────────────────────────────────────
  {
    id: 'partition_title_denied',
    group: 'C',
    label: 'Partition (Title Denied / Excluded from Possession)',
    section: 'Sec 35(1)',
    feeMethod: 'ad_valorem',
    inputFields: [{ ...SHARE_VALUE_FIELD, label: "Market Value of Plaintiff's Share (Rs.)" }],
    valueBasis: "Market value of plaintiff's share",
  },
  {
    id: 'partition_joint_possession',
    group: 'C',
    label: 'Partition (Joint Possession)',
    section: 'Sec 35(2)',
    feeMethod: 'fixed_tiered',
    fixedTiers: [
      { min: 0,      max: 3_000,  fee: 15 },
      { min: 3_001,  max: 5_000,  fee: 30 },
      { min: 5_001,  max: 10_000, fee: 100 },
      { min: 10_001, max: null,    fee: 200 },
    ],
    inputFields: [SHARE_VALUE_FIELD],
    valueBasis: "Value of plaintiff's share (fixed fee table)",
  },
  {
    id: 'joint_possession_recovery',
    group: 'C',
    label: 'Joint Possession Recovery',
    section: 'Sec 36',
    feeMethod: 'ad_valorem',
    inputFields: [{ ...SHARE_VALUE_FIELD, label: "Market Value of Plaintiff's Share (Rs.)" }],
    valueBasis: "Market value of plaintiff's share",
  },

  // ─── GROUP D: Specific Performance ───────────────────────────────────────
  {
    id: 'specific_perf_sale',
    group: 'D',
    label: 'Specific Performance - Sale',
    section: 'Sec 40(a)',
    feeMethod: 'ad_valorem',
    inputFields: [{ ...AMOUNT_FIELD, label: 'Amount of Consideration (Rs.)' }],
    valueBasis: 'Amount of consideration',
  },
  {
    id: 'specific_perf_mortgage',
    group: 'D',
    label: 'Specific Performance - Mortgage',
    section: 'Sec 40(b)',
    feeMethod: 'ad_valorem',
    inputFields: [{ ...AMOUNT_FIELD, label: 'Amount to be Secured by Mortgage (Rs.)' }],
    valueBasis: 'Amount to be secured by mortgage',
  },
  {
    id: 'specific_perf_lease',
    group: 'D',
    label: 'Specific Performance - Lease',
    section: 'Sec 40(c)',
    feeMethod: 'ad_valorem',
    comparison: 'sum',
    inputFields: [
      { id: 'finePremium', label: 'Fine / Premium (Rs.)', placeholder: 'Enter fine or premium amount', required: true },
      { id: 'avgAnnualRent', label: 'Average Annual Rent (Rs.)', placeholder: 'Enter average annual rent', required: true },
    ],
    valueBasis: 'Fine/premium + average annual rent',
  },
  {
    id: 'specific_perf_exchange',
    group: 'D',
    label: 'Specific Performance - Exchange',
    section: 'Sec 40(d)',
    feeMethod: 'ad_valorem',
    inputFields: [{ ...AMOUNT_FIELD, label: 'Consideration / Market Value of Property Sought (Rs.)' }],
    valueBasis: 'Consideration or market value of property sought',
  },
  {
    id: 'specific_perf_other',
    group: 'D',
    label: 'Specific Performance - Other',
    section: 'Sec 40(e)',
    feeMethod: 'ad_valorem',
    inputFields: [{ ...AMOUNT_FIELD, label: 'Market Value of Consideration (Rs.)' }],
    valueBasis: 'Market value of consideration',
  },

  // ─── GROUP E: Special / Fixed Fee ────────────────────────────────────────
  {
    id: 'adoption',
    group: 'E',
    label: 'Adoption',
    section: 'Sec 25',
    feeMethod: 'fixed_tiered',
    fixedTiers: [
      { min: 0,      max: 5_000,  fee: 25 },
      { min: 5_001,  max: 15_000, fee: 100 },
      { min: 15_001, max: null,    fee: 250 },
    ],
    inputFields: [PROPERTY_VALUE_FIELD],
    valueBasis: 'Value of property (fixed fee table)',
  },
  {
    id: 'trust_property',
    group: 'E',
    label: 'Trust Property',
    section: 'Sec 27',
    feeMethod: 'ad_valorem_fraction',
    fraction: 0.2,
    feeCap: 200,
    inputFields: [MARKET_VALUE_FIELD],
    valueBasis: 'Ad valorem on 1/5 of market value (max Rs. 200)',
  },
  {
    id: 'set_aside_attachment',
    group: 'E',
    label: 'Set Aside Attachment',
    section: 'Sec 39',
    feeMethod: 'ad_valorem_fraction',
    fraction: 0.25,
    comparison: 'lower',
    inputFields: [
      MARKET_VALUE_FIELD,
      { id: 'attachmentAmount', label: 'Attachment Amount (Rs.)', placeholder: 'Enter attachment amount', required: true },
    ],
    valueBasis: 'Ad valorem on 1/4 of market value OR attachment amount (lower)',
  },
  {
    id: 'cancellation',
    group: 'E',
    label: 'Cancellation of Decree/Document',
    section: 'Sec 38',
    feeMethod: 'ad_valorem',
    inputFields: [{ ...AMOUNT_FIELD, label: 'Value of Subject Matter (Rs.)' }],
    valueBasis: 'Value of subject matter',
  },
  {
    id: 'revenue_register',
    group: 'E',
    label: 'Revenue Register Entry',
    section: 'Sec 43',
    feeMethod: 'fixed',
    fixedAmount: 50,
    inputFields: [],
    valueBasis: 'Fixed fee - Rs. 50',
  },
  {
    id: 'public_matter',
    group: 'E',
    label: 'Public Matter (Religious Endowment, CPC 91-92)',
    section: 'Sec 44',
    feeMethod: 'fixed',
    fixedAmount: 50,
    inputFields: [],
    valueBasis: 'Fixed fee - Rs. 50',
  },
  {
    id: 'dissolution_partnership',
    group: 'E',
    label: 'Dissolution of Partnership',
    section: 'Sec 34',
    feeMethod: 'ad_valorem',
    inputFields: [{ ...AMOUNT_FIELD, label: "Plaintiff's Share Value (Rs.)" }],
    valueBasis: "Ad valorem on plaintiff's share value",
  },
  {
    id: 'landlord_tenant',
    group: 'E',
    label: 'Landlord-Tenant Disputes',
    section: 'Sec 41',
    feeMethod: 'ad_valorem',
    inputFields: [{ ...AMOUNT_FIELD, label: 'Annual Rent (Rs.)' }],
    valueBasis: 'Ad valorem on annual rent',
  },
  {
    id: 'administration',
    group: 'E',
    label: 'Administration Suit',
    section: 'Sec 37',
    feeMethod: 'fixed_tiered',
    fixedTiers: [
      { min: 0,      max: 5_000,  fee: 20 },
      { min: 5_001,  max: 10_000, fee: 100 },
      { min: 10_001, max: null,    fee: 200 },
    ],
    inputFields: [{ ...AMOUNT_FIELD, label: 'Value of Estate (Rs.)' }],
    valueBasis: 'Sec 47 rates based on estate value',
  },
  {
    id: 'interpleader',
    group: 'E',
    label: 'Interpleader Suit',
    section: 'Sec 45',
    feeMethod: 'fixed_tiered',
    fixedTiers: [
      { min: 0,      max: 5_000,  fee: 20 },
      { min: 5_001,  max: 10_000, fee: 100 },
      { min: 10_001, max: null,    fee: 200 },
    ],
    inputFields: [{ ...AMOUNT_FIELD, label: 'Amount in Dispute (Rs.)' }],
    valueBasis: 'Sec 47 rates based on dispute value',
  },

  // ─── GROUP F: Residuary ──────────────────────────────────────────────────
  {
    id: 'residuary_revenue',
    group: 'F',
    label: 'Residuary Suit (Revenue Court)',
    section: 'Sec 47',
    feeMethod: 'fixed',
    fixedAmount: 50,
    inputFields: [],
    valueBasis: 'Fixed fee - Rs. 50',
  },
  {
    id: 'residuary_civil',
    group: 'F',
    label: 'Residuary Suit (Civil Court)',
    section: 'Sec 47',
    feeMethod: 'fixed_tiered',
    fixedTiers: [
      { min: 0,      max: 5_000,  fee: 20 },
      { min: 5_001,  max: 10_000, fee: 100 },
      { min: 10_001, max: null,    fee: 200 },
    ],
    inputFields: [{ ...AMOUNT_FIELD, label: 'Value of Subject Matter (Rs.)' }],
    valueBasis: 'Sec 47 rates based on subject matter value',
  },

  // ─── GROUP G: Appeals & Reviews ──────────────────────────────────────────
  {
    id: 'appeal_general',
    group: 'G',
    label: 'Memorandum of Appeal (General)',
    section: 'Sec 49 / Art. 1',
    feeMethod: 'ad_valorem',
    inputFields: [{ ...AMOUNT_FIELD, label: 'Value of Subject Matter in Appeal (Rs.)' }],
    valueBasis: 'Same fee as court of first instance',
  },
  {
    id: 'appeal_compensation',
    group: 'G',
    label: 'Appeal on Compensation (Land Acquisition etc.)',
    section: 'Sec 48',
    feeMethod: 'difference_ad_valorem',
    inputFields: [
      { id: 'awardedAmount', label: 'Amount Awarded (Rs.)', placeholder: 'Enter amount awarded by court', required: true },
      { id: 'claimedAmount', label: 'Amount Claimed (Rs.)', placeholder: 'Enter amount originally claimed', required: true },
    ],
    valueBasis: 'Ad valorem on difference between awarded and claimed amounts',
  },
  {
    id: 'review_within_90d',
    group: 'G',
    label: 'Review Application (Within 90 Days)',
    section: 'Art. 5',
    feeMethod: 'fraction_of_fee',
    fraction: 0.5,
    inputFields: [{ ...AMOUNT_FIELD, label: 'Original Suit Value (Rs.)', helpText: 'The value on which the plaint fee was calculated' }],
    valueBasis: 'Half the plaint fee',
  },
  {
    id: 'review_after_90d',
    group: 'G',
    label: 'Review Application (After 90 Days)',
    section: 'Art. 5A',
    feeMethod: 'ad_valorem',
    inputFields: [{ ...AMOUNT_FIELD, label: 'Original Suit Value (Rs.)' }],
    valueBasis: 'Full plaint fee',
  },
  {
    id: 'kat_review',
    group: 'G',
    label: 'Review of KAT Order',
    section: 'Art. 5AA',
    feeMethod: 'fixed',
    fixedAmount: 20,
    inputFields: [],
    valueBasis: 'Fixed fee - Rs. 20',
  },
  {
    id: 'insolvency_petition',
    group: 'G',
    label: 'Insolvency Petition',
    section: 'Art. 2(a)',
    feeMethod: 'fraction_of_fee',
    fraction: 0.5,
    inputFields: [{ ...AMOUNT_FIELD, label: 'Value of Subject Matter (Rs.)' }],
    valueBasis: 'Half of Art. 1 scale',
  },
  {
    id: 'succession_appeal',
    group: 'G',
    label: 'Indian Succession Act Appeal',
    section: 'Art. 4',
    feeMethod: 'fraction_of_fee',
    fraction: 0.5,
    inputFields: [{ ...AMOUNT_FIELD, label: 'Value of Subject Matter (Rs.)' }],
    valueBasis: 'Half of Art. 1 scale',
  },

  // ─── GROUP H: Probate & Succession ───────────────────────────────────────
  {
    id: 'probate_standard',
    group: 'H',
    label: 'Probate / Letters of Administration',
    section: 'Art. 6',
    feeMethod: 'probate',
    inputFields: [{ ...AMOUNT_FIELD, label: 'Value of Estate (Rs.)' }],
    valueBasis: 'Probate fee tiers (nil / 3% / 5% with Rs. 30,000 cap)',
  },
  {
    id: 'probate_extended_cert',
    group: 'H',
    label: 'Extended Succession Certificate',
    section: 'Art. 6',
    feeMethod: 'probate',
    isExtendedProbate: true,
    inputFields: [{ ...AMOUNT_FIELD, label: 'Value of Estate (Rs.)' }],
    valueBasis: 'Probate fee tiers at 1.5x rate',
  },

  // ─── GROUP I: Writ Petitions ─────────────────────────────────────────────
  {
    id: 'writ_petition',
    group: 'I',
    label: 'Writ Petition (Art. 226/227)',
    section: 'Art. 226/227',
    feeMethod: 'fixed',
    fixedAmount: 100,
    inputFields: [],
    valueBasis: 'Fixed fee - Rs. 100',
  },
  {
    id: 'habeas_corpus',
    group: 'I',
    label: 'Habeas Corpus',
    section: 'Art. 226',
    feeMethod: 'exempt',
    inputFields: [],
    valueBasis: 'Exempt - no fee payable',
  },
] as const;

/**
 * Get all suit types for a given group
 */
export function getSuitTypesByGroup(group: string): readonly SuitTypeDefinition[] {
  return SUIT_TYPES.filter((st) => st.group === group);
}

/**
 * Get a single suit type definition by ID
 */
export function getSuitTypeById(id: string): SuitTypeDefinition | undefined {
  return SUIT_TYPES.find((st) => st.id === id);
}
