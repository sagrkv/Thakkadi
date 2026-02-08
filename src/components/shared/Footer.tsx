import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer no-print">
      <div className="max-w-5xl mx-auto px-4 py-5 text-center space-y-2">
        <div>
          <span>Thakkadi</span>
          <span className="footer-rule" />
          <span>Legal Calculator Suite</span>
          <span className="footer-rule" />
          <span>For reference only</span>
        </div>
        <div className="text-xs" style={{ color: 'var(--color-neutral-400)' }}>
          Built for the Indian legal community
        </div>
        <div className="footer-links">
          <Link href="/feedback" className="footer-link">
            Send Feedback
          </Link>
          <span className="footer-link-sep">{'\u00B7'}</span>
          <a
            href="https://github.com/sagrkv/Thakkadi/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Report Issue on GitHub
          </a>
          <span className="footer-link-sep">{'\u00B7'}</span>
          <a
            href="https://github.com/sagrkv/Thakkadi"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            View Source
          </a>
        </div>
      </div>
    </footer>
  );
}
