// ── Suit Groups ──────────────────────────────────────────────────────────────

export type SuitGroup =
  | 'A' // Money & Recovery
  | 'B' // Property & Possession
  | 'C' // Partition
  | 'D' // Specific Performance
  | 'E' // Special / Fixed Fee
  | 'F' // Residuary
  | 'G' // Appeals & Reviews
  | 'H' // Probate & Succession
  | 'I'; // Writ & Constitutional

export interface SuitGroupInfo {
  readonly id: SuitGroup;
  readonly label: string;
  readonly description: string;
  readonly icon: string;
}

// ── Fee Methods ──────────────────────────────────────────────────────────────

export type FeeMethod =
  | 'ad_valorem'           // Full ad valorem on value
  | 'ad_valorem_fraction'  // Ad valorem on fraction of value (1/2, 1/4, 1/5)
  | 'fixed'                // Fixed fee (Rs. 50, Rs. 100, etc.)
  | 'fixed_tiered'         // Fixed fee based on value tiers
  | 'exempt'               // No fee
  | 'probate'              // Probate tier system
  | 'fraction_of_fee'      // Fraction of computed fee (review = 1/2 of plaint fee)
  | 'difference_ad_valorem'; // Ad valorem on difference of two amounts

// ── Comparison Rule ──────────────────────────────────────────────────────────

export type ComparisonRule = 'higher' | 'lower' | 'sum' | 'none';

// ── Input Field Configuration ────────────────────────────────────────────────

export interface InputFieldConfig {
  readonly id: string;
  readonly label: string;
  readonly placeholder: string;
  readonly helpText?: string;
  readonly required: boolean;
}

// ── Fixed Fee Tier ───────────────────────────────────────────────────────────

export interface FixedFeeTier {
  readonly min: number;
  readonly max: number | null; // null = no upper limit
  readonly fee: number;
}

// ── Suit Type Definition ─────────────────────────────────────────────────────

export interface SuitTypeDefinition {
  readonly id: string;
  readonly group: SuitGroup;
  readonly label: string;
  readonly section: string;
  readonly feeMethod: FeeMethod;
  readonly fraction?: number;        // e.g. 0.5, 0.25, 0.2
  readonly fixedAmount?: number;      // for 'fixed' method
  readonly fixedTiers?: readonly FixedFeeTier[];
  readonly feeCap?: number;           // max fee (e.g. Rs. 200 for trust)
  readonly minimumValue?: number;     // min value before ad valorem (usually 1000)
  readonly inputFields: readonly InputFieldConfig[];
  readonly comparison?: ComparisonRule;
  readonly valueBasis: string;        // human-readable description
  readonly isExtendedProbate?: boolean;
}

// ── Calculator Input/Output ──────────────────────────────────────────────────

export interface CalculatorInput {
  readonly suitTypeId: string;
  readonly values: Record<string, number>;
}

export interface SlabApplication {
  readonly slabNumber: number;
  readonly slabLabel: string;
  readonly rangeMin: number;
  readonly rangeMax: number | null;
  readonly rate: number;
  readonly baseFee: number;
  readonly amountInSlab: number;
  readonly feeInSlab: number;
}

export interface BreakdownStep {
  readonly label: string;
  readonly value: string;
}

export interface FeeResult {
  readonly fee: number;
  readonly section: string;
  readonly suitLabel: string;
  readonly valueBasis: string;
  readonly effectiveValue: number;
  readonly breakdown: readonly BreakdownStep[];
  readonly slabApplied?: SlabApplication;
  readonly isExempt: boolean;
}

// ── Refund ───────────────────────────────────────────────────────────────────

export type RefundScenario =
  | 'adr_settlement'
  | 'appeal_before_hearing'
  | 'plaint_rejected'
  | 'remand_order'
  | 'mistaken_payment';

export interface RefundInput {
  readonly scenario: RefundScenario;
  readonly feesPaid: number;
}

export interface RefundResult {
  readonly refundPercentage: number;
  readonly refundAmount: number;
  readonly description: string;
  readonly legalBasis: string;
}

// ── Slab Definition ──────────────────────────────────────────────────────────

export interface SlabDefinition {
  readonly number: number;
  readonly label: string;
  readonly min: number;
  readonly max: number | null;
  readonly threshold: number;  // "amount exceeding Rs. X" — the value subtracted
  readonly rate: number;       // percentage as decimal (0.025 = 2.5%)
  readonly baseFee: number;    // stated base fee from the Act
}

// ── Calculator State (useReducer) ────────────────────────────────────────────

export type CalculatorStep = 'category' | 'suit_type' | 'input' | 'result';

export interface CalculatorState {
  readonly step: CalculatorStep;
  readonly selectedGroup: SuitGroup | null;
  readonly selectedSuitTypeId: string | null;
  readonly inputValues: Record<string, number>;
  readonly result: FeeResult | null;
  readonly error: string | null;
}

export type CalculatorAction =
  | { type: 'SELECT_GROUP'; group: SuitGroup }
  | { type: 'SELECT_SUIT_TYPE'; suitTypeId: string }
  | { type: 'SET_INPUT'; field: string; value: number }
  | { type: 'CALCULATE'; result: FeeResult }
  | { type: 'SET_ERROR'; error: string }
  | { type: 'GO_BACK' }
  | { type: 'RESET' };
