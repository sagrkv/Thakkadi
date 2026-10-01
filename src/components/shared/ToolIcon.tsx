type ToolKind = 'deadline' | 'fee' | 'document' | 'library';

export default function ToolIcon({ kind }: { readonly kind: ToolKind }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {kind === 'deadline' && <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4m10-4v4M3 11h18m-13 5 2 2 5-4" /></>}
      {kind === 'fee' && <><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M8 6h8M8 11h1m6 0h1m-8 4h1m6 0h1m-8 4h1m6 0h1" /></>}
      {kind === 'document' && <><path d="M14 2H5v20h14V7l-5-5Zm0 0v5h5M8 11h8m-8 4h5" /><circle cx="16" cy="18" r="3" /></>}
      {kind === 'library' && <><path d="M3 3h7a2 2 0 0 1 2 2v16a3 3 0 0 0-3-2H3V3Zm18 0h-7a2 2 0 0 0-2 2v16a3 3 0 0 1 3-2h6V3Z" /></>}
    </svg>
  );
}
