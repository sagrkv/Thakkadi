import type { Metadata } from 'next';
import Link from 'next/link';
import ToolIcon from '@/components/shared/ToolIcon';
import ToolCard from '@/components/shared/ToolCard';
import BlogCard from '@/components/blog/BlogCard';
import { getAllPosts } from '@/lib/blog/parser';

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
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <div className="home-editorial">
      <section className="legal-hero">
        <div className="design-container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> Free legal tools · India</p>
            <h1>Legal calculations,<br /><em>with a clear trail.</em></h1>
            <p className="hero-description">Work out filing deadlines, Karnataka court fees, and stamp duty. See the breakdown. Follow the legal references.</p>
            <div className="hero-actions">
              <a href="#calculators" className="btn btn-primary">Find your calculator <span aria-hidden="true">↓</span></a>
              <Link href="/laws" className="hero-text-link">Explore the legal library <span aria-hidden="true">↗</span></Link>
            </div>
            <div className="hero-assurances"><span>No account needed</span><span>Calculations in your browser</span><span>Free &amp; open source</span></div>
          </div>
          <div className="example-sheet">
            <div className="sheet-heading"><span className="eyebrow">From value to provision</span><span className="sheet-mark" aria-hidden="true">§</span></div>
            <p className="sheet-caption">A court fee, explained.</p>
            <dl className="sheet-calculation">
              <div><dt>Example money claim</dt><dd>₹1,00,000</dd></div>
              <div className="sheet-result"><dt>Court fee</dt><dd>₹6,625</dd></div>
            </dl>
            <div className="sheet-source"><span className="eyebrow">The reference</span><p>Schedule I, Article 1</p><span>Karnataka Court Fees &amp; Suits Valuation Act, 1958</span></div>
            <Link href="/blog/karnataka-court-fees-explained" className="sheet-link">See the slab table &amp; worked examples <span aria-hidden="true">↗</span></Link>
            <p className="sheet-footnote">Illustrative money suit. Other proceedings may use different valuation rules.</p>
          </div>
        </div>
      </section>

      <section id="calculators" className="design-container tools-section">
        <div className="section-heading"><div><p className="eyebrow">The toolkit</p><h2>What are you working on?</h2></div><p>Three focused tools.<br />Choose the one for your matter.</p></div>
        <div className="tool-grid">
          <ToolCard href="/limitation-calculator" kind="deadline" number="01" jurisdiction="Across Indian courts" title="Filing deadlines" attribution="Limitation Act, 1963 & related laws" description="Find appeal, revision, and SLP deadlines from your judgment date. Account for certified copy time." linkText="Calculate limitation" />
          <ToolCard href="/court-fee-calculator" kind="fee" number="02" jurisdiction="Karnataka" title="Court fees" attribution="Karnataka Court Fees Act, 1958" description="Work out ad valorem and fixed fees for 48 suit types. Estimate a refund for settlement or withdrawal." linkText="Calculate court fee" />
          <ToolCard href="/stamp-duty-calculator" kind="document" number="03" jurisdiction="Karnataka" title="Stamp duty" attribution="Karnataka Stamp Act, 1957" description="Break down duty, registration fees, surcharge, and cess across 24 instrument types." linkText="Calculate stamp duty" />
        </div>
        <p className="toolkit-note">Planning a filing or transaction? Verify the applicable provisions and current rules before relying on a result.</p>
      </section>

      <section className="design-container reference-section">
        <div className="reference-panel">
          <div className="reference-copy"><span className="reference-icon"><ToolIcon kind="library" /></span><p className="eyebrow">Keep the source close</p><h2>Read the law<br />behind the number.</h2><p>Browse 13 archived Acts, source PDFs, and section reading aids. Use the original Act to verify the provisions relevant to your matter.</p><Link href="/laws" className="reference-link">Open the legal library <span aria-hidden="true">↗</span></Link></div>
          <div className="reference-list">
            <Link href="/laws/limitation-act-1963"><span className="reference-year">1963</span><span>Limitation Act<small>Filing periods &amp; exclusions</small></span><span aria-hidden="true">↗</span></Link>
            <Link href="/laws/karnataka-court-fees-act-1958"><span className="reference-year">1958</span><span>Karnataka Court Fees Act<small>Valuation, fee schedules &amp; refunds</small></span><span aria-hidden="true">↗</span></Link>
            <Link href="/laws/karnataka-stamp-act-1957"><span className="reference-year">1957</span><span>Karnataka Stamp Act<small>Instruments &amp; duties</small></span><span aria-hidden="true">↗</span></Link>
            <p>Reading aids are summaries. Refer to the source documents for the full text.</p>
          </div>
        </div>
      </section>

      {latestPosts.length > 0 && <section className="design-container reading-section"><div className="section-heading"><div><p className="eyebrow">Notes &amp; explainers</p><h2>A little context goes a long way.</h2></div><Link href="/blog" className="hero-text-link">All articles <span aria-hidden="true">↗</span></Link></div><div className="grid md:grid-cols-3 gap-5">{latestPosts.map((post) => <BlogCard key={post.slug} post={post} />)}</div></section>}
    </div>
  );
}
