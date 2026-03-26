// ── Stamp Duty Categories ────────────────────────────────────────────────────

export type StampCategory =
  | 'conveyance'
  | 'gift_release'
  | 'mortgage'
  | 'lease'
  | 'power_of_attorney'
  | 'partition'
  | 'trust_will'
  | 'miscellaneous';

export interface StampCategoryInfo {
  readonly id: StampCategory;
  readonly label: string;
  readonly description: string;
  readonly icon: string;
}

// ── Duty Calculation Methods ─────────────────────────────────────────────────

export type DutyMethod =
  | 'tiered_ad_valorem'   // Cumulative marginal (sale deed): 2%/3%/5%
  | 'flat_percentage'     // Simple percentage of value
  | 'fixed_amount'        // Static rupee amount
  | 'fixed_location'      // Fixed amount based on location (family instruments)
  | 'nil';                // Zero duty (e.g. Will)

// ── Location Types ───────────────────────────────────────────────────────────

export type LocationType =
  | 'bbmp'       // BBMP / Corporation area
  | 'municipal'  // BMRDA / Municipal area
  | 'rural';     // Gram Panchayat / Rural

// ── Registration Fee Methods ─────────────────────────────────────────────────

export type RegistrationFeeMethod =
  | 'percentage'       // 2% of value (most instruments)
  | 'fixed'            // Fixed amount (e.g. Rs 200, Rs 1000)
  | 'per_thousand'     // Rate per Rs 1000 of value
  | 'nil';             // No registration (e.g. Will registration optional)

// ── Tiered Rate Slab ─────────────────────────────────────────────────────────

export interface TieredSlab {
  readonly min: number;
  readonly max: number | null;  // null = no upper limit
  readonly rate: number;        // decimal, e.g. 0.02 = 2%
}

// ── Location-Based Fixed Fees ────────────────────────────────────────────────

export interface LocationFees {
  readonly bbmp: number;
  readonly municipal: number;
  readonly rural: number;
}

// ── Instrument Definition ────────────────────────────────────────────────────

export interface InstrumentDefinition {
  readonly id: string;
  readonly category: StampCategory;
  readonly label: string;
  readonly section: string;                     // Act section reference
  readonly dutyMethod: DutyMethod;

  // For flat_percentage
  readonly rate?: number;                       // decimal, e.g. 0.05 = 5%
  readonly minimumDuty?: number;                // minimum duty floor

  // For fixed_amount
  readonly fixedDuty?: number;

  // For tiered_ad_valorem
  readonly tieredSlabs?: readonly TieredSlab[];

  // For fixed_location (family instruments)
  readonly locationFees?: LocationFees;

  // Family distinction
  readonly hasFamilyDistinction?: boolean;
  readonly familyDutyOverride?: {
    readonly dutyMethod: DutyMethod;
    readonly rate?: number;
    readonly fixedDuty?: number;
    readonly locationFees?: LocationFees;
  };

  // Input requirements
  readonly requiresValue: boolean;
  readonly requiresLocation: boolean;
  readonly requiresLeaseTerms?: boolean;
  readonly requiresShareCount?: boolean;
  readonly scstRebateEligible: boolean;

  // Registration fee
  readonly registrationFeeMethod: RegistrationFeeMethod;
  readonly registrationFeeRate?: number;        // for percentage method
  readonly registrationFeeFixed?: number;       // for fixed method
  readonly registrationFeePerThousand?: number; // for per_thousand method
  readonly registrationFeeMin?: number;         // minimum registration fee
  readonly registrationFeeMax?: number;         // maximum cap

  // Description
  readonly description: string;
}

// ── Calculator Input ─────────────────────────────────────────────────────────

export interface StampDutyInput {
  readonly instrumentId: string;
  readonly propertyValue?: number;
  readonly location?: LocationType;
  readonly isFamilyRelation?: boolean;
  readonly isScSt?: boolean;
  readonly isFirstProperty?: boolean;
  readonly leaseTermYears?: number;
  readonly shareCount?: number;
}

// ── Breakdown Step ───────────────────────────────────────────────────────────

export interface BreakdownStep {
  readonly label: string;
  readonly value: string;
  readonly isHighlight?: boolean;
  readonly isSubtotal?: boolean;
}

// ── Result ───────────────────────────────────────────────────────────────────

export interface StampDutyResult {
  readonly instrumentLabel: string;
  readonly section: string;
  readonly stampDuty: number;
  readonly surcharge: number;
  readonly cess: number;
  readonly scstRebate: number;
  readonly registrationFee: number;
  readonly totalPayable: number;
  readonly breakdown: readonly BreakdownStep[];
  readonly isNilDuty: boolean;
  readonly propertyValue: number;
  readonly location?: LocationType;
}

// ── Calculator State (useReducer) ────────────────────────────────────────────

export type StampDutyStep = 'category' | 'instrument' | 'input' | 'result';

export interface StampDutyState {
  readonly step: StampDutyStep;
  readonly selectedCategory: StampCategory | null;
  readonly selectedInstrumentId: string | null;
  readonly input: StampDutyInput;
  readonly result: StampDutyResult | null;
  readonly error: string | null;
}

export type StampDutyAction =
  | { type: 'SELECT_CATEGORY'; category: StampCategory }
  | { type: 'SELECT_INSTRUMENT'; instrumentId: string }
  | { type: 'SET_INPUT'; input: Partial<StampDutyInput> }
  | { type: 'CALCULATE'; result: StampDutyResult }
  | { type: 'SET_ERROR'; error: string }
  | { type: 'GO_BACK' }
  | { type: 'RESET' };
