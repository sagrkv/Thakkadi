'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import BrandMark from './BrandMark';
import { usePathname } from 'next/navigation';

interface NavItem {
  readonly href: string;
  readonly label: string;
  readonly description?: string;
}

const CALCULATOR_ITEMS: readonly NavItem[] = [
  { href: '/limitation-calculator', label: 'Limitation Period', description: 'Calculate filing deadlines' },
  { href: '/court-fee-calculator', label: 'Court Fee', description: 'Ad valorem & fixed fees' },
  { href: '/stamp-duty-calculator', label: 'Stamp Duty', description: 'Duty, surcharge & cess' },
];

const NAV_ITEMS: readonly NavItem[] = [
  { href: '/laws', label: 'Legal Library' },
  { href: '/blog', label: 'Explainers' },
  { href: '/about', label: 'About' },
];

function HamburgerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="3" y1="6" x2="19" y2="6" />
      <line x1="3" y1="11" x2="19" y2="11" />
      <line x1="3" y1="16" x2="19" y2="16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="5" y1="5" x2="17" y2="17" />
      <line x1="17" y1="5" x2="5" y2="17" />
    </svg>
  );
}

export default function Header() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const switcherRef = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape' && mobileOpen) closeMobile();
    }
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileOpen, closeMobile]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => { closeMobile(); }, [pathname, closeMobile]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (mobileOpen && !dialog?.open) dialog?.showModal();
    if (!mobileOpen && dialog?.open) dialog.close();
  }, [mobileOpen]);

  useEffect(() => {
    if (switcherRef.current) switcherRef.current.open = false;
  }, [pathname]);

  const isCalculator = pathname.includes('-calculator');

  return (
    <header className="site-header no-print">
      <div className="header-inner max-w-5xl mx-auto px-4 py-4 relative z-10">
        <div className="flex items-center justify-between">
          {/* Logo + Wordmark */}
          <Link href="/" className="flex items-center gap-2.5" style={{ textDecoration: 'none' }}>
            <BrandMark className="header-logo-img" />
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.375rem',
                color: '#FFFCF6',
                letterSpacing: '-0.01em',
                lineHeight: 1,
                fontWeight: 700,
              }}
            >
              Thakkadi
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-desktop" aria-label="Main navigation">
            <details ref={switcherRef} className="calculator-switcher" onKeyDown={event => {
              if (event.key === 'Escape') { event.currentTarget.open = false; event.currentTarget.querySelector('summary')?.focus(); }
            }}>
              <summary className={`nav-link ${isCalculator || pathname === '/' ? 'active' : ''}`}>Calculators <span aria-hidden="true">▾</span></summary>
              <div className="calculator-switcher-list">
                {CALCULATOR_ITEMS.map(item => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? 'page' : undefined}>{item.label}<small>{item.description}</small></Link>)}
              </div>
            </details>
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
      <dialog
        ref={dialogRef}
        aria-label="Navigation menu"
        onKeyDown={event => {
          if (event.key !== 'Tab') return;
          const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button, a[href]'));
          const first = controls[0], last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
        }}
        onCancel={closeMobile}
        onClose={closeMobile}
        className={`mobile-menu-overlay ${mobileOpen ? 'open' : ''}`}
      >
        <button type="button" className="mobile-dialog-close" onClick={closeMobile}>Close menu <CloseIcon /></button>
        <nav className="mobile-menu-content" aria-label="Mobile navigation">
          <div className="mobile-menu-section">
            <p className="mobile-menu-section-heading">Calculators</p>
            {CALCULATOR_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`mobile-menu-link ${pathname.startsWith(item.href) ? 'active' : ''}`}
                onClick={closeMobile}
                tabIndex={mobileOpen ? 0 : -1}
              >
                <span className="mobile-menu-link-label">{item.label}</span>
                {item.description && (
                  <span className="mobile-menu-link-desc">{item.description}</span>
                )}
              </Link>
            ))}
          </div>
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
              </Link>
            ))}
          </div>
        </nav>
      </dialog>
    </header>
  );
}
