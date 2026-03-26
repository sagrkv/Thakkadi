import Link from 'next/link';

const CALCULATORS = [
  { label: 'Limitation Period', href: '/limitation-calculator' },
  { label: 'Court Fee', href: '/court-fee-calculator' },
  { label: 'Stamp Duty', href: '/stamp-duty-calculator' },
] as const;

const REFERENCE = [
  { label: 'Legal Library', href: '/laws' },
  { label: 'Limitation Act, 1963', href: '/laws/limitation-act-1963' },
  { label: 'CPC, 1908', href: '/laws/cpc-1908' },
  { label: 'Karnataka CF Act', href: '/laws/karnataka-court-fees-act-1958' },
  { label: 'Karnataka Stamp Act', href: '/laws/karnataka-stamp-act-1957' },
  { label: 'CrPC / BNSS', href: '/laws/crpc-1973' },
] as const;

const COMPANY = [
  { label: 'About', href: '/about' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
] as const;

function FooterColumn({
  heading,
  links,
}: {
  heading: string;
  links: ReadonlyArray<{ readonly label: string; readonly href: string }>;
}) {
  return (
    <div className="footer-column">
      <h3 className="footer-column-heading">{heading}</h3>
      <ul className="footer-column-list">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="footer-column-link">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer no-print">
      <div className="footer-inner">
        {/* Brand */}
        <div className="footer-brand">
          <span className="footer-brand-name">Thakkadi</span>
          <span className="footer-brand-tagline">
            Free legal calculators for the Indian legal community
          </span>
        </div>

        {/* Sitemap Grid */}
        <nav className="footer-grid" aria-label="Footer navigation">
          <FooterColumn heading="Calculators" links={CALCULATORS} />
          <FooterColumn heading="Reference" links={REFERENCE} />
          <FooterColumn heading="Company" links={COMPANY} />

          {/* Community column */}
          <div className="footer-column">
            <h3 className="footer-column-heading">Community</h3>
            <ul className="footer-column-list">
              <li>
                <Link href="/feedback" className="footer-column-link">
                  Send Feedback
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/sagrkv/Thakkadi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-column-link"
                >
                  GitHub
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                    className="footer-external-icon"
                  >
                    <path
                      d="M3.5 1.5H10.5V8.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.5 1.5L1.5 10.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Disclaimer */}
        <p className="footer-disclaimer">
          Indicative calculations based on general provisions of law.{' '}
          <strong>NOT legal advice.</strong> Consult a qualified legal
          professional.
        </p>

        {/* Copyright */}
        <p className="footer-copyright">
          &copy; 2025 Thakkadi &middot; Open Source &middot; Made in India
        </p>
      </div>
    </footer>
  );
}
