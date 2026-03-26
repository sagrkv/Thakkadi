'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  readonly href: string;
  readonly label: string;
  readonly description?: string;
}

const NAV_ITEMS: readonly NavItem[] = [
  { href: '/limitation-calculator', label: 'Limitation', description: 'Calculate filing deadlines' },
  { href: '/court-fee-calculator', label: 'Court Fee', description: 'Ad valorem & fixed fees' },
  { href: '/stamp-duty-calculator', label: 'Stamp Duty', description: 'Duty, surcharge & cess' },
  { href: '/laws', label: 'Laws', description: 'Browse legal provisions' },
  { href: '/about', label: 'About' },
];

function HamburgerIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="3" y1="6" x2="19" y2="6" />
      <line x1="3" y1="11" x2="19" y2="11" />
      <line x1="3" y1="16" x2="19" y2="16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="5" y1="5" x2="17" y2="17" />
      <line x1="17" y1="5" x2="5" y2="17" />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape' && mobileOpen) {
        closeMobile();
      }
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileOpen, closeMobile]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    closeMobile();
  }, [pathname, closeMobile]);

  return (
    <header className="site-header no-print">
      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Wordmark */}
          <Link
            href="/"
            className="text-decoration-none"
            style={{ textDecoration: 'none' }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.625rem',
                color: 'var(--color-accent)',
                letterSpacing: '-0.01em',
                lineHeight: 1,
              }}
            >
              Thakkadi
            </span>
          </Link>

          {/* Desktop Navigation — flat links */}
          <nav className="nav-desktop" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${pathname.startsWith(item.href) ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            type="button"
          >
            {mobileOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu-overlay ${mobileOpen ? 'open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <nav className="mobile-menu-content" aria-label="Mobile navigation">
          <div className="mobile-menu-section">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`mobile-menu-link ${pathname.startsWith(item.href) ? 'active' : ''}`}
                onClick={closeMobile}
                tabIndex={mobileOpen ? 0 : -1}
              >
                <span className="mobile-menu-link-label">{item.label}</span>
                {item.description && (
                  <span className="mobile-menu-link-desc">
                    {item.description}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
