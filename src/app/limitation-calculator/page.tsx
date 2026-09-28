'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import InputForm from '@/components/limitation/InputForm';
import ResultsDisplay from '@/components/limitation/ResultsDisplay';
import Disclaimer from '@/components/shared/Disclaimer';
import type { CaseInput, CalculationResult, LegalOption } from '@/types/limitation';
import { calculateLimitation, getResultsSummary } from '@/lib/limitation/limitation-engine';
import { useUrlSync } from '@/lib/url-params/use-url-sync';
import { limitationParamsSchema } from '@/lib/url-params/schemas';

interface CalculationResponse {
  result: CalculationResult;
  summary: {
    totalOptions: number;
    activeOptions: number;
    expiredOptions: number;
    urgentOptions: number;
    mostUrgent: LegalOption | null;
  };
}

function LimitationCalculatorInner() {
  const { updateUrl } = useUrlSync(limitationParamsSchema);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<CalculationResponse | null>(null);

  const handleSubmit = (input: CaseInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = calculateLimitation(input);
      const summary = getResultsSummary(result);
      setData({ result, summary });

      updateUrl({
        ct: input.caseType,
        cl: input.courtLevel,
        jt: input.judgmentType,
        jd: input.judgmentDate,
        ca: input.certifiedCopy?.appliedDate,
        cr: input.certifiedCopy?.receivedDate,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Calculation failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setData(null);
    setError(null);
    updateUrl({ ct: undefined, cl: undefined, jt: undefined, jd: undefined, ca: undefined, cr: undefined });
  };

  return (
    <div className="px-4 pb-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 animate-fade-in">
          <h1
            className="text-2xl md:text-3xl font-bold mb-1"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
          >
            Limitation Period Calculator
          </h1>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            Under the <Link href="/laws/limitation-act-1963" style={{ color: 'var(--color-accent)', textDecoration: 'underline', textUnderlineOffset: '2px' }}>Limitation Act, 1963</Link>
          </p>
          <div className="mt-3">
            <Link href="/limitation-calculator/rules" className="rules-link">
              View All Rules
            </Link>
          </div>
        </div>

        {/* Intro */}
        <details className="intro-section no-print">
          <summary>About this tool</summary>
          <div className="intro-content">
            <p>
              This calculator computes post-judgment limitation periods under the Limitation Act, 1963 and related
              procedural laws. Enter your case type, court level, judgment type, and judgment date to see all available
              legal remedies — appeals, review petitions, Special Leave Petitions (SLP), curative petitions, and
              execution timelines — with their exact deadlines.
            </p>
            <p>
              The engine covers 42 limitation rules across 11 court levels, from the Civil Judge (Junior Division) to
              the Supreme Court of India. It accounts for certified copy exclusion under Section 12, holiday adjustment
              under Section 4, and special limitation periods for Family Courts, Commercial Courts, and Consumer Forums.
              All calculations are deterministic and run entirely in your browser — no data is sent to any server.
            </p>
          </div>
        </details>

        {/* Error Display */}
        {error && (
          <div className="mb-6 alert alert-danger animate-fade-in-scale">
            <span className="text-xl">!!</span>
            <div className="flex-1">
              <p className="font-semibold">Something went wrong</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
            <button
              onClick={handleReset}
              className="btn btn-ghost text-sm"
            >
              Try again
            </button>
          </div>
        )}

        {/* Main Content */}
        {data ? (
          <ResultsDisplay
            result={data.result}
            summary={data.summary}
            onReset={handleReset}
          />
        ) : (
          <InputForm onSubmit={handleSubmit} isLoading={isLoading} />
        )}

        {/* Disclaimer */}
        <footer className="mt-10">
          <Disclaimer />
          <div className="mt-3 text-center">
            <Link
              href="/feedback?calculator=limitation"
              className="feedback-issue-link"
            >
              Report an issue with these rules
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default function LimitationCalculatorPage() {
  return (
    <Suspense>
      <LimitationCalculatorInner />
    </Suspense>
  );
}
