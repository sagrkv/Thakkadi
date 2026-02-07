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
      </div>
    </footer>
  );
}
