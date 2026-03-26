'use client';

import { useState } from 'react';
import {
  LIMITATION_RULES,
  ACTION_NAMES,
  COURT_NAMES,
  CONFIDENCE_EXPLANATIONS,
} from '@/data/limitation-rules';
import type { CaseType, CourtLevel, LimitationRule } from '@/types/limitation';
import LawReferenceLink from '@/components/ui/LawReferenceLink';

const TABS: { id: CaseType; label: string }[] = [
  { id: 'civil', label: 'Civil' },
  { id: 'criminal', label: 'Criminal' },
  { id: 'writ', label: 'Writ' },
];

const COURT_ORDER: CourtLevel[] = [
  'civil_judge_junior',
  'civil_judge_senior',
  'district_court',
  'jmfc',
  'cjm',
  'sessions_court',
  'family_court',
  'commercial_court',
  'consumer_district',
  'high_court',
  'supreme_court',
];

function formatPeriod(days: number): string {
  if (days >= 365 && days % 365 === 0) {
    const years = days / 365;
    return `${years} year${years > 1 ? 's' : ''}`;
  }
  if (days >= 365) {
    const years = Math.floor(days / 365);
    const remaining = days % 365;
    return `${years}y ${remaining}d`;
  }
  return `${days} days`;
}

function ConfidenceBadge({ level }: { level: string }) {
  const cls =
    level === 'high'
      ? 'badge-success'
      : level === 'medium'
        ? 'badge-warning'
        : 'badge-danger';
  return (
    <span className={`badge ${cls}`} title={CONFIDENCE_EXPLANATIONS[level]}>
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </span>
  );
}

function CopyExclusionIcon({ allowed }: { allowed: boolean }) {
  return allowed ? (
    <span
      className="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs"
      style={{ background: 'color-mix(in srgb, var(--color-success) 15%, transparent)', color: 'var(--color-success)' }}
      title="Copy exclusion allowed"
    >
      {'\u2713'}
    </span>
  ) : (
    <span
      className="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs"
      style={{ background: 'color-mix(in srgb, var(--color-error) 15%, transparent)', color: 'var(--color-error)' }}
      title="Copy exclusion not applicable"
    >
      {'\u2717'}
    </span>
  );
}

function ExpandableNotes({ rule }: { rule: LimitationRule }) {
  const [open, setOpen] = useState(false);
  const hasContent = rule.additionalNotes || (rule.applicableJudgmentTypes && rule.applicableJudgmentTypes.length > 0);
  if (!hasContent) return null;

  return (
    <div className="mt-1.5">
      <button
        onClick={() => setOpen(!open)}
        className="text-xs font-medium flex items-center gap-1"
        style={{ color: 'var(--color-text-tertiary)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
      >
        <span
          style={{
            display: 'inline-block',
            transition: 'transform 0.15s ease',
            transform: open ? 'rotate(90deg)' : 'rotate(0)',
            fontSize: '0.6rem',
          }}
        >
          {'\u25B6'}
        </span>
        {open ? 'Hide details' : 'Details'}
      </button>
      {open && (
        <div
          className="mt-1 text-xs rounded p-2"
          style={{
            background: 'var(--color-surface-muted)',
            color: 'var(--color-text-secondary)',
            border: '1px solid var(--color-border)',
            lineHeight: 1.5,
          }}
        >
          {rule.additionalNotes && <p className="mb-1">{rule.additionalNotes}</p>}
          {rule.applicableJudgmentTypes?.length > 0 && (
            <p style={{ color: 'var(--color-text-tertiary)' }}>
              Applies to: {rule.applicableJudgmentTypes.join(', ')} judgments
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function groupByCourt(rules: LimitationRule[]): Map<CourtLevel, LimitationRule[]> {
  const grouped = new Map<CourtLevel, LimitationRule[]>();
  for (const court of COURT_ORDER) {
    const courtRules = rules.filter((r) => r.fromCourt === court);
    if (courtRules.length > 0) {
      grouped.set(court, courtRules);
    }
  }
  return grouped;
}

function RulesTable({ rules }: { rules: LimitationRule[] }) {
  const grouped = groupByCourt(rules);

  return (
    <>
      {/* Desktop table */}
      <div className="rules-table-desktop">
        <div className="card" style={{ overflow: 'hidden' }}>
          <table className="rules-table">
            <thead>
              <tr>
                <th>Action</th>
                <th>Forum (To Court)</th>
                <th>Period</th>
                <th>Law Reference</th>
                <th>Confidence</th>
                <th style={{ textAlign: 'center' }}>Copy Excl.</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(grouped.entries()).map(([court, courtRules]) => (
                <CourtGroup key={court} court={court} rules={courtRules} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="rules-mobile-list">
        {Array.from(grouped.entries()).map(([court, courtRules]) => (
          <div key={court} className="mb-6">
            <h3
              className="text-sm font-bold mb-3 flex items-center gap-2"
              style={{ color: 'var(--color-text-primary)' }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: 'var(--color-accent)' }}
              />
              From {COURT_NAMES[court]}
            </h3>
            {courtRules.map((rule) => (
              <MobileRuleCard key={rule.id} rule={rule} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

function CourtGroup({ court, rules }: { court: CourtLevel; rules: LimitationRule[] }) {
  return (
    <>
      <tr className="rules-court-header">
        <td colSpan={6}>
          From {COURT_NAMES[court]}
        </td>
      </tr>
      {rules.map((rule) => (
        <tr key={rule.id}>
          <td>
            <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              {ACTION_NAMES[rule.action]}
            </span>
            <ExpandableNotes rule={rule} />
          </td>
          <td>{COURT_NAMES[rule.toCourt]}</td>
          <td>
            <span className="font-mono font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              {formatPeriod(rule.limitationDays)}
            </span>
          </td>
          <td>
            <LawReferenceLink reference={rule.lawReference} />
          </td>
          <td>
            <ConfidenceBadge level={rule.confidenceLevel} />
          </td>
          <td style={{ textAlign: 'center' }}>
            <CopyExclusionIcon allowed={rule.copyExclusionAllowed} />
          </td>
        </tr>
      ))}
    </>
  );
}

function MobileRuleCard({ rule }: { rule: LimitationRule }) {
  return (
    <div className="rules-mobile-card">
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>
          {ACTION_NAMES[rule.action]}
        </span>
        <ConfidenceBadge level={rule.confidenceLevel} />
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs mb-2">
        <div>
          <span style={{ color: 'var(--color-text-tertiary)' }}>To Court</span>
          <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>
            {COURT_NAMES[rule.toCourt]}
          </p>
        </div>
        <div>
          <span style={{ color: 'var(--color-text-tertiary)' }}>Period</span>
          <p className="font-mono font-semibold" style={{ color: 'var(--color-text-primary)' }}>
            {formatPeriod(rule.limitationDays)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-wrap mb-2">
        <LawReferenceLink reference={rule.lawReference} fontSize="0.65rem" />
        <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
          Copy Excl: <CopyExclusionIcon allowed={rule.copyExclusionAllowed} />
        </span>
      </div>
      <ExpandableNotes rule={rule} />
    </div>
  );
}

const TOTAL_RULES = LIMITATION_RULES.length;
const TAB_COUNTS: Record<CaseType, number> = {
  civil: LIMITATION_RULES.filter((r) => r.caseType === 'civil').length,
  criminal: LIMITATION_RULES.filter((r) => r.caseType === 'criminal').length,
  writ: LIMITATION_RULES.filter((r) => r.caseType === 'writ').length,
};

export default function LimitationRulesView() {
  const [activeTab, setActiveTab] = useState<CaseType>('civil');

  const filteredRules = LIMITATION_RULES.filter((r) => r.caseType === activeTab);

  return (
    <div>
      {/* Summary bar */}
      <div
        className="flex items-center gap-3 mb-5 p-3 rounded-lg"
        style={{
          background: 'var(--color-surface-muted)',
          border: '1px solid var(--color-border)',
        }}
      >
        <span className="text-sm font-semibold" style={{ color: 'var(--color-accent)' }}>
          {TOTAL_RULES} rules total
        </span>
        <span style={{ color: 'var(--color-text-tertiary)' }}>|</span>
        <div className="flex gap-2 text-xs">
          <span style={{ color: 'var(--color-text-secondary)' }}>Civil: {TAB_COUNTS.civil}</span>
          <span style={{ color: 'var(--color-text-secondary)' }}>Criminal: {TAB_COUNTS.criminal}</span>
          <span style={{ color: 'var(--color-text-secondary)' }}>Writ: {TAB_COUNTS.writ}</span>
        </div>
      </div>

      {/* Tab bar */}
      <div className="rules-tab-bar mb-6" role="tablist" aria-label="Case type filter">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls="rules-tabpanel"
            className={`rules-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            <span
              className="ml-1.5 text-xs font-normal"
              style={{ opacity: 0.6 }}
            >
              ({TAB_COUNTS[tab.id]})
            </span>
          </button>
        ))}
      </div>

      {/* Rules content */}
      <div id="rules-tabpanel" role="tabpanel" className="animate-in">
        <RulesTable rules={filteredRules} />
      </div>
    </div>
  );
}
