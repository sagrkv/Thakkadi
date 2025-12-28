"use client";

import { useState } from "react";
import InputForm from "@/components/InputForm";
import ResultsDisplay from "@/components/ResultsDisplay";
import { CaseInput, CalculationResult, LegalOption } from "@/types";

interface CalculationResponse {
  success: boolean;
  result: CalculationResult;
  summary: {
    totalOptions: number;
    activeOptions: number;
    expiredOptions: number;
    urgentOptions: number;
    mostUrgent: LegalOption | null;
  };
  error?: string;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CalculationResponse | null>(null);

  const handleSubmit = async (input: CaseInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Calculation failed");
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <main className="min-h-screen py-8 px-4 md:py-12 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white text-3xl mb-4 shadow-lg">
            ⚖️
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Limitation Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Post-Judgment Legal Options Tool for India
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <span className="badge badge-success">Appeals</span>
            <span className="badge badge-success">Review</span>
            <span className="badge badge-success">SLP</span>
            <span className="badge badge-success">Execution</span>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 alert alert-danger animate-fade-in-scale">
            <span className="text-xl">⚠️</span>
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
        {result ? (
          <ResultsDisplay
            result={result.result}
            summary={result.summary}
            onReset={handleReset}
          />
        ) : (
          <InputForm onSubmit={handleSubmit} isLoading={isLoading} />
        )}

        {/* Footer */}
        <footer className="mt-12 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
          {/* How it works */}
          <div className="card p-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span>🔧</span>
              <span>How This Tool Works</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="font-medium text-gray-900">Rule-Based Calculations</p>
                  <p className="text-sm text-gray-500">Uses the Limitation Act, 1963 and procedural laws</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="font-medium text-gray-900">Deterministic Engine</p>
                  <p className="text-sm text-gray-500">No AI/ML in date calculations — fully predictable</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-medium text-gray-900">Copy Exclusion</p>
                  <p className="text-sm text-gray-500">Accounts for certified copy period (Section 12)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm flex-shrink-0">
                  4
                </div>
                <div>
                  <p className="font-medium text-gray-900">Holiday Adjustment</p>
                  <p className="text-sm text-gray-500">Adjusts for court holidays (Section 4)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Legal Sources */}
          <div className="text-center text-sm text-gray-500">
            <p className="mb-2">
              <span className="font-medium">Sources:</span> The Limitation Act, 1963 • CPC • CrPC • Supreme Court Rules
            </p>
            <p className="text-xs text-gray-400">
              For indicative purposes only. This is not legal advice.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
