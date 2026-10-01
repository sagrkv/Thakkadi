/** The balance mark uses the same geometry as public/logo.svg and app/icon.svg. */
export default function BrandMark({ className, size = 36 }: { readonly className?: string; readonly size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="15" fill="#F2BB4E" />
      <g stroke="#1D3558" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 16v32M16 23h32M24 49h16M20 23l-7 14h14l-7-14ZM44 23l-7 14h14l-7-14Z" />
        <path d="M13 37c0 4 3 7 7 7s7-3 7-7M37 37c0 4 3 7 7 7s7-3 7-7" />
      </g>
      <circle cx="32" cy="16" r="3" fill="#1D3558" />
    </svg>
  );
}
