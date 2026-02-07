import {
  CaseInput,
  LegalOption,
  CalculationResult,
  AuditEntry,
  LimitationRule,
} from "@/types/limitation";
import {
  findApplicableRules,
  ACTION_NAMES,
  COURT_NAMES,
  CONFIDENCE_EXPLANATIONS,
} from "@/data/limitation-rules";
import {
  calculateLastDate,
  calculateDaysRemaining,
  isExpired,
  formatDisplayDate,
  validateDates,
} from "./date-calculator";
import { format } from "date-fns";

/**
 * Limitation Calculation Engine
 *
 * DESIGN PRINCIPLE: Deterministic, rule-based, fully auditable
 * NO AI/ML used in calculations
 */

const DISCLAIMER = `
IMPORTANT DISCLAIMER:
This tool provides indicative timelines based on general provisions of law.
It is NOT legal advice. Actual limitation periods may vary based on:
- Specific court rules and practice directions
- Judicial interpretation and discretion
- State-specific variations
- Individual case circumstances

Please consult a qualified legal professional before taking any action.
The creators of this tool are not liable for any decisions made based on this information.
`.trim();

/**
 * Main calculation function
 */
export function calculateLimitation(input: CaseInput): CalculationResult {
  const masterAuditLog: AuditEntry[] = [];

  const validation = validateDates(input.judgmentDate, input.certifiedCopy);
  if (!validation.isValid) {
    throw new Error(`Invalid input: ${validation.errors.join(", ")}`);
  }

  masterAuditLog.push({
    step: "Input validation",
    input: { caseInput: input },
    output: { isValid: true },
    timestamp: new Date().toISOString(),
  });

  const applicableRules = findApplicableRules(
    input.caseType,
    input.courtLevel,
    input.judgmentType
  );

  masterAuditLog.push({
    step: "Find applicable rules",
    input: {
      caseType: input.caseType,
      courtLevel: input.courtLevel,
      judgmentType: input.judgmentType,
    },
    output: { rulesFound: applicableRules.length, ruleIds: applicableRules.map((r) => r.id) },
    timestamp: new Date().toISOString(),
  });

  if (applicableRules.length === 0) {
    return {
      input,
      options: [],
      calculatedAt: new Date().toISOString(),
      disclaimer: DISCLAIMER,
      auditLog: masterAuditLog,
    };
  }

  const options: LegalOption[] = applicableRules.map((rule) => {
    return calculateOption(input, rule, masterAuditLog);
  });

  options.sort((a, b) => {
    if (a.isExpired !== b.isExpired) return a.isExpired ? 1 : -1;
    if (a.daysRemaining !== b.daysRemaining) return a.daysRemaining - b.daysRemaining;
    const confidenceOrder = { high: 0, medium: 1, low: 2 };
    return confidenceOrder[a.confidenceLevel] - confidenceOrder[b.confidenceLevel];
  });

  return {
    input,
    options,
    calculatedAt: new Date().toISOString(),
    disclaimer: DISCLAIMER,
    auditLog: masterAuditLog,
  };
}

function calculateOption(
  input: CaseInput,
  rule: LimitationRule,
  masterAuditLog: AuditEntry[]
): LegalOption {
  const { calculation, auditLog } = calculateLastDate(
    input.judgmentDate,
    rule.limitationDays,
    input.certifiedCopy,
    rule.copyExclusionAllowed
  );

  masterAuditLog.push({
    step: `Calculate ${rule.action} limitation`,
    input: { rule: rule.id, limitationDays: rule.limitationDays },
    output: {
      lastDate: format(calculation.lastDate, "yyyy-MM-dd"),
      excludedDays: calculation.excludedDays,
    },
    timestamp: new Date().toISOString(),
  });

  auditLog.forEach((entry) => {
    masterAuditLog.push({
      ...entry,
      step: `[${rule.action}] ${entry.step}`,
    });
  });

  const daysRemaining = calculateDaysRemaining(calculation.lastDate);
  const expired = isExpired(calculation.lastDate);

  return {
    action: rule.action,
    actionName: ACTION_NAMES[rule.action] || rule.action,
    description: getActionDescription(rule),
    forum: COURT_NAMES[rule.toCourt],
    forumCourt: rule.toCourt,
    limitationPeriod: formatLimitationPeriod(rule.limitationDays),
    limitationDays: rule.limitationDays,
    excludedDays: calculation.excludedDays,
    excludedPeriodDescription: calculation.excludedPeriodDescription,
    lastDate: format(calculation.lastDate, "yyyy-MM-dd"),
    formattedLastDate: formatDisplayDate(calculation.lastDate),
    daysRemaining: Math.max(0, daysRemaining),
    lawReference: rule.lawReference,
    section: rule.section,
    confidenceLevel: rule.confidenceLevel,
    confidenceExplanation: CONFIDENCE_EXPLANATIONS[rule.confidenceLevel],
    additionalNotes: rule.additionalNotes,
    isExpired: expired,
    calculation,
  };
}

function getActionDescription(rule: LimitationRule): string {
  const descriptions: Record<string, string> = {
    appeal: `File an appeal against the ${rule.fromCourt === "district_court" ? "decree" : "judgment/order"} in the ${COURT_NAMES[rule.toCourt]}.`,
    review: `File a review petition in the same court (${COURT_NAMES[rule.fromCourt]}) if there is an error apparent on the face of the record.`,
    revision: `File a revision petition in the ${COURT_NAMES[rule.toCourt]} to examine the legality or propriety of the order.`,
    slp: `File a Special Leave Petition in the Supreme Court under Article 136 of the Constitution.`,
    execution: `File an execution petition to enforce the decree in the ${COURT_NAMES[rule.toCourt]}.`,
    curative: `File a curative petition in the Supreme Court as a last resort after review is dismissed.`,
  };
  return descriptions[rule.action] || `Proceed with ${rule.action} in ${COURT_NAMES[rule.toCourt]}.`;
}

function formatLimitationPeriod(days: number): string {
  if (days >= 365) {
    const years = Math.floor(days / 365);
    const remainingDays = days % 365;
    if (remainingDays === 0) return `${years} year${years > 1 ? "s" : ""}`;
    return `${years} year${years > 1 ? "s" : ""} ${remainingDays} days`;
  }
  return `${days} days`;
}

/**
 * Get summary statistics for results
 */
export function getResultsSummary(result: CalculationResult): {
  totalOptions: number;
  activeOptions: number;
  expiredOptions: number;
  urgentOptions: number;
  mostUrgent: LegalOption | null;
} {
  const activeOptions = result.options.filter((o) => !o.isExpired);
  const expiredOptions = result.options.filter((o) => o.isExpired);
  const urgentOptions = activeOptions.filter((o) => o.daysRemaining <= 7);

  return {
    totalOptions: result.options.length,
    activeOptions: activeOptions.length,
    expiredOptions: expiredOptions.length,
    urgentOptions: urgentOptions.length,
    mostUrgent: activeOptions.length > 0 ? activeOptions[0] : null,
  };
}
