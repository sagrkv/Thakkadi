'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', shortLabel: 'Home' },
    { href: '/limitation-calculator', label: 'Limitation Calculator', shortLabel: 'Limitation' },
    { href: '/court-fee-calculator', label: 'Court Fee Calculator', shortLabel: 'Court Fees' },
  ];

  return (
    <header className="site-header no-print">
      <div className="max-w-5xl mx-auto px-4 py-5 relative z-10">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3.5 text-decoration-none">
            <span className="header-logo" aria-hidden="true">{'\u2696'}</span>
            <div>
              <h1
                className="text-white text-2xl sm:text-3xl font-bold leading-tight"
                style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.015em' }}
              >
                Thakkadi
              </h1>
              <p
                className="text-xs hidden sm:block"
                style={{ color: 'rgba(188, 204, 220, 0.6)' }}
              >
                Legal Calculator Suite
              </p>
            </div>
          </Link>

          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${
                  item.href === '/'
                    ? pathname === '/'
                      ? 'active'
                      : ''
                    : pathname.startsWith(item.href)
                      ? 'active'
                      : ''
                }`}
                aria-label={item.label}
              >
                <span className="hidden sm:inline" aria-hidden="true">{item.label}</span>
                <span className="sm:hidden" aria-hidden="true">{item.shortLabel}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
