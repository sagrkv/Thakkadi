import Link from 'next/link';

const TOOLS = [
  { label: 'Limitation Calculator', href: '/limitation-calculator' },
  { label: 'Court Fee Calculator', href: '/court-fee-calculator' },
  { label: 'Stamp Duty Calculator', href: '/stamp-duty-calculator' },
] as const;

const RESOURCES = [
  { label: 'Legal Library', href: '/laws' },
  { label: 'Blog', href: '/blog' },
  { label: 'Send Feedback', href: '/feedback' },
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
          <FooterColumn heading="Tools" links={TOOLS} />
          <FooterColumn heading="Resources" links={RESOURCES} />
          <FooterColumn heading="Company" links={COMPANY} />
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
