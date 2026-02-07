import type { RefundInput, RefundResult, RefundScenario } from '@/types/court-fee';

interface RefundRule {
  readonly percentage: number;
  readonly description: string;
  readonly legalBasis: string;
}

const REFUND_RULES: Record<RefundScenario, RefundRule> = {
  adr_settlement: {
    percentage: 100,
    description: 'Full refund for settlement through ADR (Lok Adalat, Mediation, Arbitration, Conciliation)',
    legalBasis: '2020 Ordinance Amendment',
  },
  appeal_before_hearing: {
    percentage: 100,
    description: 'Full refund when appeal is disposed before hearing',
    legalBasis: 'Karnataka Court Fees Act',
  },
  plaint_rejected: {
    percentage: 50,
    description: '50% refund when plaint is rejected due to delay or unpaid deficiency',
    legalBasis: 'Karnataka Court Fees Act',
  },
  remand_order: {
    percentage: 100,
    description: 'Full refund of appeal fee on remand order',
    legalBasis: 'Karnataka Court Fees Act',
  },
  mistaken_payment: {
    percentage: 100,
    description: 'Full refund for mistaken or erroneous payment',
    legalBasis: 'Karnataka Court Fees Act',
  },
};

export const REFUND_SCENARIOS: readonly {
  value: RefundScenario;
  label: string;
}[] = [
  { value: 'adr_settlement', label: 'ADR Settlement (Lok Adalat, Mediation, etc.)' },
  { value: 'appeal_before_hearing', label: 'Appeal Disposed Before Hearing' },
  { value: 'plaint_rejected', label: 'Plaint Rejected (Delay / Unpaid Deficiency)' },
  { value: 'remand_order', label: 'Remand Order (Appeal)' },
  { value: 'mistaken_payment', label: 'Mistaken / Erroneous Payment' },
];

export function calculateRefund(input: RefundInput): RefundResult {
  const rule = REFUND_RULES[input.scenario];
  const refundAmount = Math.round(input.feesPaid * (rule.percentage / 100));

  return {
    refundPercentage: rule.percentage,
    refundAmount,
    description: rule.description,
    legalBasis: rule.legalBasis,
  };
}
