import type { Metadata } from 'next';
import ToolCard from '@/components/shared/ToolCard';

export const metadata: Metadata = {
  title: {
    absolute: 'Thakkadi — Free Legal Calculators for Indian Lawyers',
  },
  description:
    'Free, open-source legal calculators for Indian lawyers and litigants. Calculate limitation periods, Karnataka court fees, and stamp duty. No login, no data stored, 100% client-side.',
  alternates: {
    canonical: 'https://thakkadi.in',
  },
};

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="homepage-hero">
        <div className="max-w-5xl mx-auto">
          <h1 className="homepage-title animate-fade-in">Thakkadi</h1>

          <p className="homepage-subtitle animate-fade-in">
            Free legal calculators for Indian lawyers
          </p>

          <div className="homepage-trust-line animate-fade-in">
            <span>100% client-side</span>
            <span className="homepage-trust-sep" aria-hidden="true" />
            <span>No login</span>
            <span className="homepage-trust-sep" aria-hidden="true" />
            <span>Open source</span>
          </div>
        </div>
      </section>

      {/* Tool Grid */}
      <section className="homepage-tools">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <ToolCard
              href="/limitation-calculator"
              title="Limitation Period Calculator"
              attribution="Under the Limitation Act, 1963"
              description="Calculate appeal, revision & SLP deadlines across 11 court levels. Covers post-judgment limitation periods with automatic date computation."
              linkText="Open Calculator"
            />
            <ToolCard
              href="/court-fee-calculator"
              title="Court Fee Calculator"
              attribution="Under the Karnataka Court Fees & Suits Valuation Act, 1958"
              description="Compute court fees for 50+ suit types across 9 categories. Includes ad valorem slabs, fixed fees, and refund estimation."
              linkText="Open Calculator"
            />
            <ToolCard
              href="/stamp-duty-calculator"
              title="Stamp Duty Calculator"
              attribution="Under the Karnataka Stamp Act, 1957 & Registration Act, 1908"
              description="Calculate stamp duty, registration fees, surcharge & cess for 24 instrument types. SC/ST rebate and location-based rates."
              linkText="Open Calculator"
            />
            <ToolCard
              href="/laws"
              title="Legal Reference Library"
              attribution="6 Acts &middot; ~50 Sections of Verbatim Legal Text"
              description="Browse the verbatim text of every legal provision referenced by our calculators. Cross-linked with section-level anchors for quick verification."
              linkText="Browse Library"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
