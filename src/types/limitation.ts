// Core type definitions for the India Limitation Calculator

export type CaseType = "civil" | "criminal" | "writ";

export type CourtLevel =
  // Civil subordinate courts
  | "civil_judge_junior" // Civil Judge (Junior Division)
  | "civil_judge_senior" // Civil Judge (Senior Division)
  | "district_court" // District Judge / Addl. District Judge
  // Criminal subordinate courts
  | "jmfc" // Judicial Magistrate First Class / Metropolitan Magistrate
  | "cjm" // Chief Judicial Magistrate
  | "sessions_court" // Sessions Court / Addl. Sessions Judge
  // Special courts
  | "family_court"
  | "commercial_court"
  | "consumer_district" // District Consumer Disputes Redressal Commission
  | "consumer_state" // State Consumer Commission (appeal destination only)
  // Higher courts
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
