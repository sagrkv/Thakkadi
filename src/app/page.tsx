import ToolCard from '@/components/shared/ToolCard';

export default function HomePage() {
  return (
    <div className="py-12 px-4 md:py-20 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-14 animate-fade-in">
          <h1
            className="text-5xl md:text-6xl font-extrabold mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.02em',
              background: 'linear-gradient(135deg, var(--color-slate-900) 0%, var(--color-slate-600) 60%, var(--color-amber-500) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Thakkadi
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--color-neutral-600)' }}
          >
            Free, open-source legal calculators for Indian lawyers and litigants.
            No login required. No data stored.
          </p>
          <div
            className="mt-6 inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full"
            style={{
              background: 'var(--color-amber-100)',
              color: 'var(--color-amber-800)',
              border: '1px solid var(--color-amber-200)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            100% Client-Side — Your data never leaves your browser
          </div>
        </div>

        {/* Tool Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <ToolCard
            href="/limitation-calculator"
            icon={'\u23F1'}
            title="Limitation Calculator"
            description="Calculate post-judgment limitation periods under the Limitation Act, 1963. Covers appeals, review, SLP, and execution timelines."
            tags={['All India', 'Appeals', 'SLP', 'Execution']}
          />
          <ToolCard
            href="/court-fee-calculator"
            icon={'\u20B9'}
            title="Court Fee Calculator"
            description="Compute court fees under the Karnataka Court Fees & Suits Valuation Act, 1958. Supports 50+ suit types across 9 categories."
            tags={['Karnataka', '50+ Suit Types', 'Refund Estimator']}
          />
        </div>

        {/* Info Section */}
        <div className="mt-16 text-center">
          <div
            className="rounded-xl p-6 md:p-8 max-w-3xl mx-auto"
            style={{
              background: 'linear-gradient(to bottom, var(--color-neutral-50), white)',
              border: '1px solid var(--color-neutral-200)',
              borderTop: '3px solid var(--color-amber-400)',
            }}
          >
            <div
              className="w-12 h-0.5 mx-auto mb-4 rounded-full"
              style={{ background: 'var(--color-amber-400)' }}
            />
            <h2
              className="text-lg font-bold mb-4"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-slate-800)', letterSpacing: '-0.01em' }}
            >
              Why Thakkadi?
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-sm text-left" style={{ color: 'var(--color-neutral-600)' }}>
              <div>
                <div className="flex items-center gap-2 font-bold mb-1.5" style={{ color: 'var(--color-slate-700)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-amber-500)' }}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  Deterministic
                </div>
                <p>No AI hallucinations. Pure rule-based engines computing from statute text.</p>
              </div>
              <div>
                <div className="flex items-center gap-2 font-bold mb-1.5" style={{ color: 'var(--color-slate-700)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-amber-500)' }}>
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  Private
                </div>
                <p>Everything runs in your browser. Zero server calls. Zero data collection.</p>
              </div>
              <div>
                <div className="flex items-center gap-2 font-bold mb-1.5" style={{ color: 'var(--color-slate-700)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-amber-500)' }}>
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  Free Forever
                </div>
                <p>Open source, no paywall, no login. Built for the legal community.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
