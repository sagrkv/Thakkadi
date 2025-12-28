"use client";

import { CalculationResult, LegalOption } from "@/types";

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
    high: { class: "badge-success", icon: "✓", label: "High Confidence" },
    medium: { class: "badge-warning", icon: "~", label: "Medium Confidence" },
    low: { class: "badge-danger", icon: "!", label: "Low Confidence" },
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
      <div className="flex items-center gap-2 text-red-600">
        <span className="text-2xl">⛔</span>
        <div>
          <span className="font-bold text-lg">EXPIRED</span>
          <p className="text-xs opacity-80">Limitation period has ended</p>
        </div>
      </div>
    );
  }

  if (daysRemaining <= 7) {
    return (
      <div className="flex items-center gap-2 text-red-600 animate-pulse-soft">
        <span className="text-2xl">🚨</span>
        <div>
          <span className="font-bold text-lg">{daysRemaining} days left</span>
          <p className="text-xs opacity-80">Urgent - Act immediately</p>
        </div>
      </div>
    );
  }

  if (daysRemaining <= 30) {
    return (
      <div className="flex items-center gap-2 text-amber-600">
        <span className="text-2xl">⏰</span>
        <div>
          <span className="font-bold text-lg">{daysRemaining} days left</span>
          <p className="text-xs opacity-80">Time is limited</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-emerald-600">
      <span className="text-2xl">✅</span>
      <div>
        <span className="font-bold text-lg">{daysRemaining} days left</span>
        <p className="text-xs opacity-80">Sufficient time available</p>
      </div>
    </div>
  );
};

const getCardClass = (option: LegalOption): string => {
  if (option.isExpired) return "option-card expired";
  if (option.daysRemaining <= 7) return "option-card urgent";
  if (option.daysRemaining <= 30) return "option-card warning";
  return "option-card safe";
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
          <h3 className="text-xl font-bold text-gray-900">{option.actionName}</h3>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
            <span>→</span> {option.forum}
          </p>
        </div>
        <ConfidenceBadge level={option.confidenceLevel} />
      </div>

      {/* Description */}
      <p className="text-gray-600 mb-5 leading-relaxed">{option.description}</p>

      {/* Key Info Grid */}
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 mb-5 border border-gray-100">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">Limitation Period</p>
            <p className="font-bold text-indigo-600 text-lg">{option.limitationPeriod}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">Last Date to File</p>
            <p className="font-bold text-gray-900">{option.formattedLastDate}</p>
          </div>
        </div>

        {option.excludedDays > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2 text-emerald-600">
              <span>📋</span>
              <span className="font-semibold">+{option.excludedDays} days excluded</span>
            </div>
            {option.excludedPeriodDescription && (
              <p className="text-xs text-gray-500 mt-1 ml-6">{option.excludedPeriodDescription}</p>
            )}
          </div>
        )}
      </div>

      {/* Urgency Status */}
      <div className="mb-5 p-3 rounded-lg bg-gray-50">
        <UrgencyIndicator daysRemaining={option.daysRemaining} isExpired={option.isExpired} />
      </div>

      {/* Legal Reference - Collapsible Style */}
      <details className="group">
        <summary className="flex items-center gap-2 cursor-pointer text-sm text-gray-500 hover:text-indigo-600 transition-colors">
          <span className="transform group-open:rotate-90 transition-transform">▶</span>
          <span>View Legal Reference</span>
        </summary>
        <div className="mt-3 pl-5 border-l-2 border-indigo-200 space-y-2">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">Legal Basis:</span> {option.lawReference}
          </p>
          {option.section && (
            <p className="text-sm text-gray-600">{option.section}</p>
          )}
          {option.additionalNotes && (
            <p className="text-sm text-gray-500 italic">{option.additionalNotes}</p>
          )}
          <p className="text-xs text-gray-400 mt-2">{option.confidenceExplanation}</p>
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
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Your Legal Options</h2>
            <p className="text-gray-500 mt-1">Based on your case details</p>
          </div>
          <button onClick={onReset} className="btn btn-ghost">
            <span>←</span>
            <span>New Calculation</span>
          </button>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="stat-card bg-gradient-to-br from-indigo-50 to-indigo-100">
            <p className="stat-value text-indigo-600 animate-count-up">{summary.totalOptions}</p>
            <p className="stat-label text-indigo-500">Total Options</p>
          </div>
          <div className="stat-card bg-gradient-to-br from-emerald-50 to-emerald-100">
            <p className="stat-value text-emerald-600 animate-count-up" style={{ animationDelay: '0.1s' }}>{summary.activeOptions}</p>
            <p className="stat-label text-emerald-500">Still Available</p>
          </div>
          <div className="stat-card bg-gradient-to-br from-gray-50 to-gray-100">
            <p className="stat-value text-gray-600 animate-count-up" style={{ animationDelay: '0.2s' }}>{summary.expiredOptions}</p>
            <p className="stat-label text-gray-500">Expired</p>
          </div>
          <div className="stat-card bg-gradient-to-br from-red-50 to-red-100">
            <p className="stat-value text-red-600 animate-count-up" style={{ animationDelay: '0.3s' }}>{summary.urgentOptions}</p>
            <p className="stat-label text-red-500">Urgent (&lt;7 days)</p>
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
              {summary.mostUrgent.daysRemaining <= 7 ? '🚨' : '⏰'}
            </span>
            <div>
              <p className="font-semibold">
                {summary.mostUrgent.daysRemaining <= 7 ? 'Urgent Action Required' : 'Next Deadline'}
              </p>
              <p className="text-sm mt-1">
                <span className="font-bold">{summary.mostUrgent.actionName}</span>
                {' expires on '}
                <span className="font-bold">{summary.mostUrgent.formattedLastDate}</span>
                {' — '}
                <span className="font-bold">{summary.mostUrgent.daysRemaining} days remaining</span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* No Options Message */}
      {result.options.length === 0 && (
        <div className="card p-8 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Matching Options Found</h3>
          <p className="text-gray-500 max-w-md mx-auto">
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
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span>📋</span>
          <span>Case Details Used</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">Case Type</p>
            <p className="font-semibold text-gray-900 capitalize">{result.input.caseType}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">Court</p>
            <p className="font-semibold text-gray-900 capitalize">{result.input.courtLevel.replace(/_/g, ' ')}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">Judgment Type</p>
            <p className="font-semibold text-gray-900 capitalize">{result.input.judgmentType}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">Judgment Date</p>
            <p className="font-semibold text-gray-900">
              {new Date(result.input.judgmentDate).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-4 pt-4 border-t border-gray-200">
          Calculated at: {new Date(result.calculatedAt).toLocaleString("en-IN")}
        </p>
      </div>

      {/* Disclaimer Card */}
      <div className="card p-6 bg-gradient-to-br from-amber-50 to-white border-amber-200">
        <div className="flex items-start gap-4">
          <span className="text-3xl">⚠️</span>
          <div>
            <h3 className="font-bold text-amber-800 mb-2">Important Disclaimer</h3>
            <div className="text-sm text-amber-700 space-y-2">
              <p>This tool provides <strong>indicative timelines</strong> based on general provisions of law.</p>
              <p>It is <strong>NOT legal advice</strong>. Actual limitation periods may vary based on:</p>
              <ul className="list-disc list-inside ml-2 space-y-1 text-amber-600">
                <li>Specific court rules and practice directions</li>
                <li>Judicial interpretation and discretion</li>
                <li>State-specific variations</li>
                <li>Individual case circumstances</li>
              </ul>
              <p className="font-medium text-amber-800 mt-3">
                Please consult a qualified legal professional before taking any action.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
