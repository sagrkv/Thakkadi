'use client';

import { useState } from 'react';
import Link from 'next/link';
import InputForm from '@/components/limitation/InputForm';
import ResultsDisplay from '@/components/limitation/ResultsDisplay';
import Disclaimer from '@/components/shared/Disclaimer';
import type { CaseInput, CalculationResult, LegalOption } from '@/types/limitation';
import { calculateLimitation, getResultsSummary } from '@/lib/limitation/limitation-engine';

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

export default function LimitationCalculatorPage() {
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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Calculation failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setData(null);
    setError(null);
  };

  return (
    <div className="py-8 px-4 md:py-12 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl text-white text-3xl mb-4 shadow-lg"
            style={{ background: 'linear-gradient(to bottom right, var(--color-slate-600), var(--color-slate-700))' }}
          >
            {'\u2696'}
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold mb-3"
            style={{ color: 'var(--color-slate-900)', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
          >
            India Limitation Calculator
          </h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--color-neutral-600)' }}>
            Post-Judgment Legal Options Tool for India
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <span className="badge badge-success">Appeals</span>
            <span className="badge badge-success">Review</span>
            <span className="badge badge-success">SLP</span>
            <span className="badge badge-success">Execution</span>
          </div>
          <div className="mt-4">
            <Link href="/limitation-calculator/rules" className="rules-link">
              {'\u{1F4CB}'} View All Rules
            </Link>
          </div>
        </div>

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

        {/* How it works + Disclaimer */}
        <footer className="mt-12 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
          <div className="card p-6 mb-6">
            <h3 className="font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--color-slate-900)' }}>
              <span>How This Tool Works</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{ background: 'var(--color-slate-100)', color: 'var(--color-slate-600)' }}
                >
                  1
                </div>
                <div>
                  <p className="font-medium" style={{ color: 'var(--color-slate-900)' }}>Rule-Based Calculations</p>
                  <p className="text-sm" style={{ color: 'var(--color-neutral-500)' }}>Uses the Limitation Act, 1963 and procedural laws</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{ background: 'var(--color-slate-100)', color: 'var(--color-slate-600)' }}
                >
                  2
                </div>
                <div>
                  <p className="font-medium" style={{ color: 'var(--color-slate-900)' }}>Deterministic Engine</p>
                  <p className="text-sm" style={{ color: 'var(--color-neutral-500)' }}>No AI/ML in date calculations — fully predictable</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{ background: 'var(--color-slate-100)', color: 'var(--color-slate-600)' }}
                >
                  3
                </div>
                <div>
                  <p className="font-medium" style={{ color: 'var(--color-slate-900)' }}>Copy Exclusion</p>
                  <p className="text-sm" style={{ color: 'var(--color-neutral-500)' }}>Accounts for certified copy period (Section 12)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{ background: 'var(--color-slate-100)', color: 'var(--color-slate-600)' }}
                >
                  4
                </div>
                <div>
                  <p className="font-medium" style={{ color: 'var(--color-slate-900)' }}>Holiday Adjustment</p>
                  <p className="text-sm" style={{ color: 'var(--color-neutral-500)' }}>Adjusts for court holidays (Section 4)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <Disclaimer />
          </div>

          <div className="text-center text-sm" style={{ color: 'var(--color-neutral-500)' }}>
            <p className="mb-2">
              <span className="font-medium">Sources:</span> The Limitation Act, 1963 {'\u2022'} CPC {'\u2022'} CrPC {'\u2022'} Supreme Court Rules
            </p>
            <p className="text-xs" style={{ color: 'var(--color-neutral-400)' }}>
              For indicative purposes only. This is not legal advice.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
