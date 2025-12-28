// Core type definitions for the Limitation Calculator

export type CaseType = "civil" | "criminal" | "writ";

export type CourtLevel =
  | "district_court"
  | "sessions_court"
  | "high_court"
  | "supreme_court";

export type JudgmentType = "final" | "interim";

export type LegalAction =
  | "appeal"
  | "review"
  | "revision"
  | "slp"
  | "execution"
  | "curative";

export type ConfidenceLevel = "high" | "medium" | "low";

// Input types
export interface CertifiedCopyDates {
  appliedDate?: string; // ISO date string
  readyDate?: string;
  receivedDate?: string;
}

export interface CaseInput {
  judgmentDate: string; // ISO date string - mandatory
  caseType: CaseType;
  courtLevel: CourtLevel;
  judgmentType: JudgmentType;
  certifiedCopy?: CertifiedCopyDates;
}

// Rule Engine types
export interface LimitationRule {
  id: string;
  version: string;
  caseType: CaseType;
  fromCourt: CourtLevel;
  action: LegalAction;
  toCourt: CourtLevel;
  limitationDays: number;
  copyExclusionAllowed: boolean;
  lawReference: string;
  section?: string;
  additionalNotes?: string;
  confidenceLevel: ConfidenceLevel;
  applicableJudgmentTypes: JudgmentType[];
  conditions?: RuleCondition[];
}

export interface RuleCondition {
  type: "judgment_type" | "court_level" | "case_type";
  operator: "equals" | "not_equals" | "in";
  value: string | string[];
}

// Date calculation types
export interface DateCalculation {
  startDate: Date;
  limitationDays: number;
  excludedDays: number;
  excludedPeriodDescription?: string;
  lastDate: Date;
  isHolidayAdjusted: boolean;
  originalLastDate?: Date;
}

// Output types
export interface LegalOption {
  action: LegalAction;
  actionName: string;
  description: string;
  forum: string;
  forumCourt: CourtLevel;
  limitationPeriod: string;
  limitationDays: number;
  excludedDays: number;
  excludedPeriodDescription?: string;
  lastDate: string; // ISO date string
  formattedLastDate: string;
  daysRemaining: number;
  lawReference: string;
  section?: string;
  confidenceLevel: ConfidenceLevel;
  confidenceExplanation: string;
  additionalNotes?: string;
  isExpired: boolean;
  calculation: DateCalculation;
}

export interface CalculationResult {
  input: CaseInput;
  options: LegalOption[];
  calculatedAt: string;
  disclaimer: string;
  auditLog: AuditEntry[];
}

export interface AuditEntry {
  step: string;
  input: Record<string, unknown>;
  output: Record<string, unknown>;
  timestamp: string;
}

// UI State types
export interface WizardStep {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  isActive: boolean;
}

export interface FormState {
  currentStep: number;
  caseInput: Partial<CaseInput>;
  errors: Record<string, string>;
  isSubmitting: boolean;
}
