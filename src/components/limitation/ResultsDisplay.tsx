'use client';

import type { CalculationResult, LegalOption } from '@/types/limitation';
import LawReferenceLink from '@/components/ui/LawReferenceLink';
import ShareButton from '@/components/shared/ShareButton';

interface ResultsDisplayProps {
  result: CalculationResult;
  summary: {
    totalOptions: number;
    activeOptions: number;
    expiredOptions: number;
    urgentOptions: number;
    mostUrgent: LegalOption | null;
  };
  onReset: () => void;
}

const ConfidenceBadge = ({ level }: { level: string }) => {
  const config = {
    high: { class: 'badge-success', icon: '\u2713', label: 'High Confidence' },
    medium: { class: 'badge-warning', icon: '~', label: 'Medium Confidence' },
    low: { class: 'badge-danger', icon: '!', label: 'Low Confidence' },
  };

  const { class: className, icon, label } = config[level as keyof typeof config] || config.medium;

  return (
    <span className={`badge ${className}`}>
      <span>{icon}</span>
      <span>{label}</span>
    </span>
  );
};

const UrgencyIndicator = ({ daysRemaining, isExpired }: { daysRemaining: number; isExpired: boolean }) => {
  if (isExpired) {
    return (
      <div className="flex items-center gap-2" style={{ color: 'var(--color-accent)' }}>
        <span className="text-2xl">{'\u26D4'}</span>
        <div>
          <span className="font-bold text-lg">EXPIRED</span>
          <p className="text-xs opacity-80">Limitation period has ended</p>
        </div>
      </div>
    );
  }

  if (daysRemaining <= 7) {
    return (
      <div className="flex items-center gap-2 animate-pulse-soft" style={{ color: 'var(--color-accent)' }}>
        <span className="text-2xl">{'\uD83D\uDEA8'}</span>
        <div>
          <span className="font-bold text-lg">{daysRemaining} days left</span>
          <p className="text-xs opacity-80">Urgent - Act immediately</p>
        </div>
      </div>
    );
  }

  if (daysRemaining <= 30) {
    return (
      <div className="flex items-center gap-2" style={{ color: 'var(--color-accent)' }}>
        <span className="text-2xl">{'\u23F0'}</span>
        <div>
          <span className="font-bold text-lg">{daysRemaining} days left</span>
          <p className="text-xs opacity-80">Time is limited</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2" style={{ color: 'var(--color-text-secondary)' }}>
      <span className="text-2xl">{'\u2713'}</span>
      <div>
        <span className="font-bold text-lg">{daysRemaining} days left</span>
        <p className="text-xs opacity-80">Sufficient time available</p>
      </div>
    </div>
  );
};

const getCardClass = (option: LegalOption): string => {
  if (option.isExpired) return 'option-card expired';
  if (option.daysRemaining <= 7) return 'option-card urgent';
  if (option.daysRemaining <= 30) return 'option-card warning';
  return 'option-card safe';
};

const OptionCard = ({ option, index }: { option: LegalOption; index: number }) => {
  return (
    <div
      className={`${getCardClass(option)} animate-fade-in`}
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{option.actionName}</h3>
          <p className="text-sm mt-1 flex items-center gap-1" style={{ color: 'var(--color-text-tertiary)' }}>
            <span>{'\u2192'}</span> {option.forum}
          </p>
        </div>
        <ConfidenceBadge level={option.confidenceLevel} />
      </div>

      {/* Description */}
      <p className="mb-5 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{option.description}</p>

      {/* Key Info Grid */}
      <div className="rounded-xl p-4 mb-5 border" style={{ background: 'var(--color-surface-muted)', borderColor: 'var(--color-border)' }}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide font-medium mb-1" style={{ color: 'var(--color-text-tertiary)' }}>Limitation Period</p>
            <p className="font-bold text-lg" style={{ color: 'var(--color-text-secondary)' }}>{option.limitationPeriod}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide font-medium mb-1" style={{ color: 'var(--color-text-tertiary)' }}>Last Date to File</p>
            <p className="font-bold" style={{ color: 'var(--color-text-primary)' }}>{option.formattedLastDate}</p>
          </div>
        </div>

        {option.excludedDays > 0 && (
          <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
            <div className="flex items-center gap-2" style={{ color: 'var(--color-text-secondary)' }}>
              <span>+{option.excludedDays} days excluded</span>
            </div>
            {option.excludedPeriodDescription && (
              <p className="text-xs mt-1 ml-6" style={{ color: 'var(--color-text-tertiary)' }}>{option.excludedPeriodDescription}</p>
            )}
          </div>
        )}
      </div>

      {/* Urgency Status */}
      <div className="mb-5 p-3 rounded-lg" style={{ background: 'var(--color-surface-muted)' }}>
        <UrgencyIndicator daysRemaining={option.daysRemaining} isExpired={option.isExpired} />
      </div>

      {/* Legal Reference - Collapsible Style */}
      <details className="group">
        <summary className="flex items-center gap-2 cursor-pointer text-sm transition-colors" style={{ color: 'var(--color-text-tertiary)' }}>
          <span className="transform group-open:rotate-90 transition-transform">{'\u25B6'}</span>
          <span>View Legal Reference</span>
        </summary>
        <div className="mt-3 pl-5 space-y-2" style={{ borderLeft: '2px solid var(--color-border)' }}>
          <p className="text-sm flex items-center gap-1.5 flex-wrap" style={{ color: 'var(--color-text-secondary)' }}>
            <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>Legal Basis:</span>
            <LawReferenceLink reference={option.lawReference} />
          </p>
          {option.section && (
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{option.section}</p>
          )}
          {option.additionalNotes && (
            <p className="text-sm italic" style={{ color: 'var(--color-text-tertiary)' }}>{option.additionalNotes}</p>
          )}
          <p className="text-xs mt-2" style={{ color: 'var(--color-text-tertiary)' }}>{option.confidenceExplanation}</p>
        </div>
      </details>
    </div>
  );
};

export default function ResultsDisplay({ result, summary, onReset }: ResultsDisplayProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Card */}
      <div className="card p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>Your Legal Options</h2>
            <p className="mt-1" style={{ color: 'var(--color-text-tertiary)' }}>Based on your case details</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onReset} className="btn btn-ghost">
              <span>{'\u2190'}</span>
              <span>New Calculation</span>
            </button>
            <ShareButton title="Limitation Period Calculation" text="Check out my limitation period calculation on Thakkadi" />
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="stat-card" style={{ background: 'var(--color-surface-muted)' }}>
            <p className="stat-value animate-count-up" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-primary)' }}>{summary.totalOptions}</p>
            <p className="stat-label" style={{ color: 'var(--color-text-secondary)' }}>Total Options</p>
          </div>
          <div className="stat-card" style={{ background: 'var(--color-surface-muted)' }}>
            <p className="stat-value animate-count-up" style={{ fontFamily: 'var(--font-mono)', animationDelay: '0.1s', color: 'var(--color-success)' }}>{summary.activeOptions}</p>
            <p className="stat-label" style={{ color: 'var(--color-text-secondary)' }}>Still Available</p>
          </div>
          <div className="stat-card" style={{ background: 'var(--color-surface-muted)' }}>
            <p className="stat-value animate-count-up" style={{ fontFamily: 'var(--font-mono)', animationDelay: '0.2s', color: 'var(--color-text-tertiary)' }}>{summary.expiredOptions}</p>
            <p className="stat-label" style={{ color: 'var(--color-text-secondary)' }}>Expired</p>
          </div>
          <div className="stat-card" style={{ background: 'var(--color-surface-muted)' }}>
            <p className="stat-value animate-count-up" style={{ fontFamily: 'var(--font-mono)', animationDelay: '0.3s', color: 'var(--color-accent)' }}>{summary.urgentOptions}</p>
            <p className="stat-label" style={{ color: 'var(--color-text-secondary)' }}>Urgent (&lt;7 days)</p>
          </div>
        </div>

        {/* Most Urgent Alert */}
        {summary.mostUrgent && !summary.mostUrgent.isExpired && (
          <div
            className={`alert ${
              summary.mostUrgent.daysRemaining <= 7
                ? 'alert-danger animate-pulse-soft'
                : summary.mostUrgent.daysRemaining <= 30
                ? 'alert-warning'
                : 'alert-info'
            }`}
          >
            <span className="text-xl">
              {summary.mostUrgent.daysRemaining <= 7 ? '\uD83D\uDEA8' : '\u23F0'}
            </span>
            <div>
              <p className="font-semibold">
                {summary.mostUrgent.daysRemaining <= 7 ? 'Urgent Action Required' : 'Next Deadline'}
              </p>
              <p className="text-sm mt-1">
                <span className="font-bold">{summary.mostUrgent.actionName}</span>
                {' expires on '}
                <span className="font-bold">{summary.mostUrgent.formattedLastDate}</span>
                {' \u2014 '}
                <span className="font-bold">{summary.mostUrgent.daysRemaining} days remaining</span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* No Options Message */}
      {result.options.length === 0 && (
        <div className="card p-8 text-center">
          <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>No Matching Options Found</h3>
          <p className="max-w-md mx-auto" style={{ color: 'var(--color-text-tertiary)' }}>
            This may be due to the specific combination of case type, court, and judgment type.
            Please consult a legal professional for guidance.
          </p>
        </div>
      )}

      {/* Options Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {result.options.map((option, index) => (
          <OptionCard key={`${option.action}-${index}`} option={option} index={index} />
        ))}
      </div>

      {/* Case Summary Card */}
      <div className="card p-6">
        <h3 className="font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
          <span>Case Details Used</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-xs uppercase tracking-wide font-medium mb-1" style={{ color: 'var(--color-text-tertiary)' }}>Case Type</p>
            <p className="font-semibold capitalize" style={{ color: 'var(--color-text-primary)' }}>{result.input.caseType}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide font-medium mb-1" style={{ color: 'var(--color-text-tertiary)' }}>Court</p>
            <p className="font-semibold capitalize" style={{ color: 'var(--color-text-primary)' }}>{result.input.courtLevel.replace(/_/g, ' ')}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide font-medium mb-1" style={{ color: 'var(--color-text-tertiary)' }}>Judgment Type</p>
            <p className="font-semibold capitalize" style={{ color: 'var(--color-text-primary)' }}>{result.input.judgmentType}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide font-medium mb-1" style={{ color: 'var(--color-text-tertiary)' }}>Judgment Date</p>
            <p className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              {new Date(result.input.judgmentDate).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>
        <p className="text-xs mt-4 pt-4" style={{ color: 'var(--color-text-tertiary)', borderTop: '1px solid var(--color-border)' }}>
          Calculated at: {new Date(result.calculatedAt).toLocaleString('en-IN')}
        </p>
      </div>

      {/* Disclaimer Card */}
      <div className="card p-6" style={{ background: 'var(--color-surface-muted)', borderColor: 'var(--color-border)' }}>
        <div className="flex items-start gap-4">
          <span className="text-3xl">!!</span>
          <div>
            <h3 className="font-bold mb-2" style={{ color: 'var(--color-accent)' }}>Important Disclaimer</h3>
            <div className="text-sm space-y-2" style={{ color: 'var(--color-text-secondary)' }}>
              <p>This tool provides <strong>indicative timelines</strong> based on general provisions of law.</p>
              <p>It is <strong>NOT legal advice</strong>. Actual limitation periods may vary based on:</p>
              <ul className="list-disc list-inside ml-2 space-y-1" style={{ color: 'var(--color-text-secondary)' }}>
                <li>Specific court rules and practice directions</li>
                <li>Judicial interpretation and discretion</li>
                <li>State-specific variations</li>
                <li>Individual case circumstances</li>
              </ul>
              <p className="font-medium mt-3" style={{ color: 'var(--color-text-secondary)' }}>
                Please consult a qualified legal professional before taking any action.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
