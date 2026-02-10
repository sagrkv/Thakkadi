export default function LawsDisclaimer() {
  return (
    <div
      className="rounded-lg p-5 mt-8"
      style={{
        background: 'linear-gradient(135deg, var(--color-amber-50), var(--color-parchment-50))',
        border: '1px solid var(--color-amber-200)',
        borderLeft: '4px solid var(--color-amber-500)',
      }}
    >
      <h3
        className="text-sm font-bold mb-2 flex items-center gap-2"
        style={{ color: 'var(--color-amber-800)' }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        Attribution &amp; Verification
      </h3>
      <div className="text-xs space-y-1.5" style={{ color: 'var(--color-amber-700)', lineHeight: '1.6' }}>
        <p>
          Legal texts reproduced from <strong>public domain sources</strong> including
          Indian Kanoon, India Code (indiacode.nic.in), Karnataka State Legislature,
          and the Supreme Court of India website.
        </p>
        <p>
          While we strive for accuracy, <strong>this is not an official publication</strong>.
          Users should always verify legal text against the official gazette or
          authenticated copies available from government sources.
        </p>
        <p style={{ color: 'var(--color-amber-600)' }}>
          Each section includes an external link for independent verification.
        </p>
      </div>
    </div>
  );
}
