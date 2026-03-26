export default function LawsDisclaimer() {
  return (
    <div
      className="rounded-lg p-5 mt-8"
      style={{
        background: 'var(--color-surface-muted)',
        border: '1px solid var(--color-border)',
        borderLeft: '3px solid var(--color-accent)',
      }}
    >
      <h3
        className="text-sm font-bold mb-2 flex items-center gap-2"
        style={{ color: 'var(--color-accent)' }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        Attribution &amp; Verification
      </h3>
      <div className="text-xs space-y-1.5" style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
        <p>
          Legal texts reproduced from <strong style={{ color: 'var(--color-text-primary)' }}>public domain sources</strong> including
          Indian Kanoon, India Code (indiacode.nic.in), Karnataka State Legislature,
          and the Supreme Court of India website.
        </p>
        <p>
          Local PDF copies are archived with <strong style={{ color: 'var(--color-text-primary)' }}>SHA-256 hashes</strong> and
          download dates for integrity verification. You can independently verify any
          document by downloading from the official source and comparing hashes.
        </p>
        <p>
          While we strive for accuracy, <strong style={{ color: 'var(--color-text-primary)' }}>this is not an official publication</strong>.
          Users should always verify legal text against the official gazette or
          authenticated copies available from government sources.
        </p>
        <p style={{ color: 'var(--color-text-tertiary)' }}>
          Each section includes external links for independent verification where available.
        </p>
      </div>
    </div>
  );
}
