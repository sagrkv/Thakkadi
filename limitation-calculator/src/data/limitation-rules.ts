import { LimitationRule } from "@/types";

/**
 * Limitation Rules Database
 * Version: 1.0.0
 * Last Updated: 2024-01-01
 *
 * Sources:
 * - The Limitation Act, 1963
 * - Code of Civil Procedure, 1908
 * - Code of Criminal Procedure, 1973
 * - Supreme Court Rules, 2013
 * - High Court Rules (General)
 *
 * IMPORTANT: These rules are for procedural guidance only.
 * Actual limitation may vary based on specific circumstances,
 * court rules, and judicial discretion.
 */

export const LIMITATION_RULES: LimitationRule[] = [
  // ============================================
  // CIVIL CASES - District Court
  // ============================================
  {
    id: "civil_dc_appeal_hc",
    version: "1.0.0",
    caseType: "civil",
    fromCourt: "district_court",
    action: "appeal",
    toCourt: "high_court",
    limitationDays: 90,
    copyExclusionAllowed: true,
    lawReference: "Article 116, Limitation Act, 1963",
    section: "First Appeals under CPC",
    confidenceLevel: "high",
    applicableJudgmentTypes: ["final"],
    additionalNotes:
      "First appeal lies to High Court from decree of District Court in civil suits.",
  },
  {
    id: "civil_dc_review",
    version: "1.0.0",
    caseType: "civil",
    fromCourt: "district_court",
    action: "review",
    toCourt: "district_court",
    limitationDays: 30,
    copyExclusionAllowed: true,
    lawReference: "Order XLVII Rule 1, CPC read with Article 124",
    section: "Review of Judgment",
    confidenceLevel: "high",
    applicableJudgmentTypes: ["final", "interim"],
    additionalNotes:
      "Review lies on grounds of discovery of new matter, mistake or error apparent on face of record.",
  },
  {
    id: "civil_dc_revision_hc",
    version: "1.0.0",
    caseType: "civil",
    fromCourt: "district_court",
    action: "revision",
    toCourt: "high_court",
    limitationDays: 90,
    copyExclusionAllowed: true,
    lawReference: "Section 115, CPC read with Article 131",
    section: "Revision Petition",
    confidenceLevel: "medium",
    applicableJudgmentTypes: ["final", "interim"],
    additionalNotes:
      "Revision lies where no appeal lies. Subject to jurisdictional limits per State HC Rules.",
  },
  {
    id: "civil_dc_execution",
    version: "1.0.0",
    caseType: "civil",
    fromCourt: "district_court",
    action: "execution",
    toCourt: "district_court",
    limitationDays: 4380, // 12 years
    copyExclusionAllowed: false,
    lawReference: "Article 136, Limitation Act, 1963",
    section: "Execution of Decree",
    confidenceLevel: "high",
    applicableJudgmentTypes: ["final"],
    additionalNotes:
      "Execution can be filed within 12 years from date when decree becomes enforceable.",
  },

  // ============================================
  // CIVIL CASES - High Court (Original Side)
  // ============================================
  {
    id: "civil_hc_appeal_sc",
    version: "1.0.0",
    caseType: "civil",
    fromCourt: "high_court",
    action: "appeal",
    toCourt: "supreme_court",
    limitationDays: 90,
    copyExclusionAllowed: true,
    lawReference: "Article 133, Constitution; Article 116, Limitation Act",
    section: "Appeal to Supreme Court",
    confidenceLevel: "high",
    applicableJudgmentTypes: ["final"],
    additionalNotes:
      "Civil appeal requires certificate from HC or leave from SC. 90 days from judgment.",
  },
  {
    id: "civil_hc_review",
    version: "1.0.0",
    caseType: "civil",
    fromCourt: "high_court",
    action: "review",
    toCourt: "high_court",
    limitationDays: 30,
    copyExclusionAllowed: true,
    lawReference: "Order XLVII, CPC; Article 124, Limitation Act",
    section: "Review Petition",
    confidenceLevel: "high",
    applicableJudgmentTypes: ["final", "interim"],
    additionalNotes:
      "Review petition in HC follows same grounds as District Court reviews.",
  },
  {
    id: "civil_hc_slp",
    version: "1.0.0",
    caseType: "civil",
    fromCourt: "high_court",
    action: "slp",
    toCourt: "supreme_court",
    limitationDays: 90,
    copyExclusionAllowed: true,
    lawReference: "Article 136, Constitution; SC Rules Order XIII",
    section: "Special Leave Petition",
    confidenceLevel: "high",
    applicableJudgmentTypes: ["final", "interim"],
    additionalNotes:
      "SLP can be filed against any order/judgment. 90 days from date of order. Subject to SC discretion.",
  },
  {
    id: "civil_hc_execution",
    version: "1.0.0",
    caseType: "civil",
    fromCourt: "high_court",
    action: "execution",
    toCourt: "high_court",
    limitationDays: 4380,
    copyExclusionAllowed: false,
    lawReference: "Article 136, Limitation Act, 1963",
    section: "Execution of Decree",
    confidenceLevel: "high",
    applicableJudgmentTypes: ["final"],
    additionalNotes: "12 years from date decree becomes enforceable.",
  },

  // ============================================
  // CIVIL CASES - Supreme Court
  // ============================================
  {
    id: "civil_sc_review",
    version: "1.0.0",
    caseType: "civil",
    fromCourt: "supreme_court",
    action: "review",
    toCourt: "supreme_court",
    limitationDays: 30,
    copyExclusionAllowed: true,
    lawReference: "Order XL, Supreme Court Rules 2013",
    section: "Review Petition",
    confidenceLevel: "high",
    applicableJudgmentTypes: ["final"],
    additionalNotes:
      "Review in SC is extremely limited. Error apparent on face of record required.",
  },
  {
    id: "civil_sc_curative",
    version: "1.0.0",
    caseType: "civil",
    fromCourt: "supreme_court",
    action: "curative",
    toCourt: "supreme_court",
    limitationDays: 30,
    copyExclusionAllowed: true,
    lawReference: "Rupa Ashok Hurra v. Ashok Hurra (2002) 4 SCC 388",
    section: "Curative Petition",
    confidenceLevel: "medium",
    applicableJudgmentTypes: ["final"],
    additionalNotes:
      "Last remedy after review dismissed. Must be certified by Sr. Advocate. Very rare.",
  },

  // ============================================
  // CRIMINAL CASES - Sessions Court
  // ============================================
  {
    id: "criminal_sessions_appeal_hc",
    version: "1.0.0",
    caseType: "criminal",
    fromCourt: "sessions_court",
    action: "appeal",
    toCourt: "high_court",
    limitationDays: 60,
    copyExclusionAllowed: true,
    lawReference: "Section 374, CrPC; Article 115, Limitation Act",
    section: "Criminal Appeal",
    confidenceLevel: "high",
    applicableJudgmentTypes: ["final"],
    additionalNotes:
      "Appeal against conviction by Sessions Court lies to High Court within 60 days.",
  },
  {
    id: "criminal_sessions_revision_hc",
    version: "1.0.0",
    caseType: "criminal",
    fromCourt: "sessions_court",
    action: "revision",
    toCourt: "high_court",
    limitationDays: 90,
    copyExclusionAllowed: true,
    lawReference: "Section 397-401, CrPC",
    section: "Criminal Revision",
    confidenceLevel: "medium",
    applicableJudgmentTypes: ["final", "interim"],
    additionalNotes:
      "Revision where appeal does not lie or not preferred. HC can call for records.",
  },

  // ============================================
  // CRIMINAL CASES - High Court
  // ============================================
  {
    id: "criminal_hc_appeal_sc",
    version: "1.0.0",
    caseType: "criminal",
    fromCourt: "high_court",
    action: "appeal",
    toCourt: "supreme_court",
    limitationDays: 60,
    copyExclusionAllowed: true,
    lawReference: "Article 134, Constitution; Section 379, CrPC",
    section: "Criminal Appeal to SC",
    confidenceLevel: "high",
    applicableJudgmentTypes: ["final"],
    additionalNotes:
      "Appeal lies if HC certifies case fit for appeal or reverses acquittal to death sentence.",
  },
  {
    id: "criminal_hc_slp",
    version: "1.0.0",
    caseType: "criminal",
    fromCourt: "high_court",
    action: "slp",
    toCourt: "supreme_court",
    limitationDays: 60,
    copyExclusionAllowed: true,
    lawReference: "Article 136, Constitution; SC Rules Order XXI",
    section: "SLP (Criminal)",
    confidenceLevel: "high",
    applicableJudgmentTypes: ["final", "interim"],
    additionalNotes:
      "SLP in criminal matters has 60 days limitation (not 90 as civil).",
  },
  {
    id: "criminal_hc_review",
    version: "1.0.0",
    caseType: "criminal",
    fromCourt: "high_court",
    action: "review",
    toCourt: "high_court",
    limitationDays: 30,
    copyExclusionAllowed: true,
    lawReference: "Inherent Powers Section 482 CrPC",
    section: "Review (Criminal)",
    confidenceLevel: "low",
    applicableJudgmentTypes: ["final"],
    additionalNotes:
      "Review in criminal matters is not expressly provided but may be exercised through inherent powers.",
  },

  // ============================================
  // CRIMINAL CASES - Supreme Court
  // ============================================
  {
    id: "criminal_sc_review",
    version: "1.0.0",
    caseType: "criminal",
    fromCourt: "supreme_court",
    action: "review",
    toCourt: "supreme_court",
    limitationDays: 30,
    copyExclusionAllowed: true,
    lawReference: "Order XL, Supreme Court Rules 2013",
    section: "Review Petition (Criminal)",
    confidenceLevel: "high",
    applicableJudgmentTypes: ["final"],
    additionalNotes: "Same as civil review. Very limited grounds.",
  },
  {
    id: "criminal_sc_curative",
    version: "1.0.0",
    caseType: "criminal",
    fromCourt: "supreme_court",
    action: "curative",
    toCourt: "supreme_court",
    limitationDays: 30,
    copyExclusionAllowed: true,
    lawReference: "Rupa Ashok Hurra principle",
    section: "Curative Petition (Criminal)",
    confidenceLevel: "low",
    applicableJudgmentTypes: ["final"],
    additionalNotes:
      "Extremely rare. Must show gross miscarriage of justice. Death sentence cases given special consideration.",
  },

  // ============================================
  // WRIT CASES - High Court
  // ============================================
  {
    id: "writ_hc_slp",
    version: "1.0.0",
    caseType: "writ",
    fromCourt: "high_court",
    action: "slp",
    toCourt: "supreme_court",
    limitationDays: 90,
    copyExclusionAllowed: true,
    lawReference: "Article 136, Constitution",
    section: "SLP against Writ Order",
    confidenceLevel: "high",
    applicableJudgmentTypes: ["final", "interim"],
    additionalNotes:
      "SLP lies against any order of HC in writ jurisdiction. 90 days limitation.",
  },
  {
    id: "writ_hc_review",
    version: "1.0.0",
    caseType: "writ",
    fromCourt: "high_court",
    action: "review",
    toCourt: "high_court",
    limitationDays: 30,
    copyExclusionAllowed: true,
    lawReference: "Order XLVII CPC applied by analogy; HC Rules",
    section: "Review (Writ)",
    confidenceLevel: "medium",
    applicableJudgmentTypes: ["final"],
    additionalNotes:
      "Review of writ orders follows principles of Order XLVII CPC. Error apparent on record.",
  },
  {
    id: "writ_hc_appeal_sc",
    version: "1.0.0",
    caseType: "writ",
    fromCourt: "high_court",
    action: "appeal",
    toCourt: "supreme_court",
    limitationDays: 90,
    copyExclusionAllowed: true,
    lawReference: "Article 132/133, Constitution",
    section: "Appeal (Constitutional)",
    confidenceLevel: "medium",
    applicableJudgmentTypes: ["final"],
    additionalNotes:
      "Appeal lies if HC certifies substantial question of law of general importance.",
  },

  // ============================================
  // WRIT CASES - Supreme Court
  // ============================================
  {
    id: "writ_sc_review",
    version: "1.0.0",
    caseType: "writ",
    fromCourt: "supreme_court",
    action: "review",
    toCourt: "supreme_court",
    limitationDays: 30,
    copyExclusionAllowed: true,
    lawReference: "Order XL, SC Rules 2013",
    section: "Review (SC Writ)",
    confidenceLevel: "high",
    applicableJudgmentTypes: ["final"],
    additionalNotes: "Very limited. Error apparent on face of record.",
  },
  {
    id: "writ_sc_curative",
    version: "1.0.0",
    caseType: "writ",
    fromCourt: "supreme_court",
    action: "curative",
    toCourt: "supreme_court",
    limitationDays: 30,
    copyExclusionAllowed: true,
    lawReference: "Rupa Ashok Hurra doctrine",
    section: "Curative (SC Writ)",
    confidenceLevel: "low",
    applicableJudgmentTypes: ["final"],
    additionalNotes:
      "Last resort. Gross violation of principles of natural justice required.",
  },
];

// Helper function to find applicable rules
export function findApplicableRules(
  caseType: string,
  fromCourt: string,
  judgmentType: string
): LimitationRule[] {
  return LIMITATION_RULES.filter(
    (rule) =>
      rule.caseType === caseType &&
      rule.fromCourt === fromCourt &&
      rule.applicableJudgmentTypes.includes(judgmentType as "final" | "interim")
  );
}

// Get human-readable action names
export const ACTION_NAMES: Record<string, string> = {
  appeal: "Appeal",
  review: "Review Petition",
  revision: "Revision Petition",
  slp: "Special Leave Petition (SLP)",
  execution: "Execution Petition",
  curative: "Curative Petition",
};

// Get human-readable court names
export const COURT_NAMES: Record<string, string> = {
  district_court: "District Court",
  sessions_court: "Sessions Court",
  high_court: "High Court",
  supreme_court: "Supreme Court of India",
};

// Confidence level explanations
export const CONFIDENCE_EXPLANATIONS: Record<string, string> = {
  high: "Statutory provision with clear timeline. High certainty.",
  medium:
    "Based on court rules or judicial precedent. May vary by jurisdiction.",
  low: "Discretionary or rarely exercised remedy. Seek legal advice.",
};
